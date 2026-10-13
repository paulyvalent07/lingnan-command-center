#!/usr/bin/env python3
"""Convert the 5 Word synthesis files into content.js (lessons + exercises shown inside the app).

Usage:  python3 sync_courses.py <folder-with-the-5-docx> [content.js]

The files are found by course code in the file name (BUS1103_..., BUS2108_..., ...).
Structure expected in each .docx (the same one the weekly update produces):
  Heading 1 ........ "Chapitre 3 - ..." / "Chapter 3 ..." / "Ch. 3 ..."  -> one lesson
  Heading 2/3 ...... a title containing exercice/exercise/practice/corrigé/solution/QCM/MCQ/quiz
                     starts the exercises part of that lesson; any other title is lesson notes.
  Paragraph starting with "Réponse:", "Answer:", "Solution:", "Corrigé:" -> hidden answer in the app.
  Anything before the first chapter, or after the last one (checklist, final mixed test) -> "extras".
Re-run it each time a .docx changes, then push content.js to GitHub.
Courses with no .docx in the folder keep their previous content (merge mode), so you can sync one course at a time.
"""
import sys, re, json, datetime as dt
from pathlib import Path
from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph

COURSES = {
    "BUS1103": "Financial Accounting", "BUS2108": "Global Business Environment",
    "BUS2205": "Marketing Management", "BUS2105": "Microeconomics", "BUS2202": "Organisational Behaviour",
}
CH = re.compile(r"(?:chapitre|chapter|chap\.?|ch\.?|lesson|le[cç]on)\s*(\d+)", re.I)
EX = re.compile(r"exercic|exercise|practice|corrig|solution|qcm|mcq|quiz|entra[iî]nement|worksheet", re.I)
ANS = re.compile(r"^\s*(?:r[ée]ponse|(?:suggested |model |official )?answer|(?:official )?solution|corrig[ée]|correction)\s*(?:\([^)]*\))?\s*[:：]\s*", re.I)


def iter_blocks(doc):
    for el in doc.element.body.iterchildren():
        tag = el.tag.rsplit("}", 1)[-1]
        if tag == "p":
            yield Paragraph(el, doc)
        elif tag == "tbl":
            yield Table(el, doc)


def runs_text(p):
    """Paragraph text with **bold** kept as markers (the app turns them into <b>)."""
    out = []
    for r in p.runs:
        t = r.text
        if not t: continue
        out.append(f"**{t}**" if r.bold and t.strip() else t)
    s = "".join(out).replace("****", "")
    return s.strip()


def lesson_id(heading):
    m = CH.search(heading)
    if m: return m.group(1)
    if re.search(r"ethic", heading, re.I): return "eth"
    return None


KEY = re.compile(r"^\s*(?:\*\*)?\s*(answer key|answers? and (?:reasoning|explanations?)|model answers?|worked solutions?|solutions?)\b", re.I)


def move_answer_keys(lessons):
    """An 'Answer Key' section left inside the lesson notes is moved onto the exercise page:
    each answer goes right after its question (matched by Q-number) so the exercises page holds everything."""
    moved = 0
    for L in lessons.values():
        notes, ex = L.get("notes", []), L.get("ex", [])
        start = next((i for i, b in enumerate(notes) if b.get("t") == "h" and re.match(r"^\s*(?:\d+\.\d+\s*)?(answer key|answers?|suggested solutions?)\b", b.get("x", ""), re.I)), None)
        if start is None:
            continue
        end = next((i for i in range(start + 1, len(notes)) if notes[i].get("t") == "h" and notes[i].get("l", 9) <= 2), len(notes))
        key, cur, ans = notes[start:end], None, {}
        for b in key[1:]:
            if b.get("t") == "h":
                m = re.match(r"^\s*Q?(\d+)", b.get("x", ""), re.I)
                cur = m.group(1) if m else None
            elif cur:
                ans.setdefault(cur, []).append(b)
        if not ans or not ex:
            continue
        out, i, used = [], 0, 0
        qh = lambda b: b.get("t") == "h" and re.match(r"^\s*Q(\d+)", b.get("x", ""), re.I)
        while i < len(ex):
            b = ex[i]
            m = qh(b)
            out.append(b); i += 1
            if m:
                while i < len(ex) and not (ex[i].get("t") == "h"):
                    out.append(ex[i]); i += 1
                if m.group(1) in ans:
                    out.extend(ans.pop(m.group(1))); used += 1
        if used:
            L["ex"] = out
            L["notes"] = notes[:start] + notes[end:]
            moved += used
    return moved


def convert(path):
    doc = Document(path)
    lessons, extras = {}, []
    cur, part = None, "notes"
    amode = None          # None | "key" (until next heading) | "label" (while list items / tables follow)
    buf = []              # accumulating answer lines
    last_short = None

    def target():
        return lessons[cur][part] if cur else extras

    def flush():
        nonlocal buf
        if buf:
            target().append({"t": "a", "x": "\n".join(buf)})
        buf = []

    for b in iter_blocks(doc):
        if isinstance(b, Table):
            flush()
            rows = [[c.text.strip() for c in r.cells] for r in b.rows]
            target().append({"t": "table", "rows": rows})
            continue
        text = runs_text(b)
        if not text: continue
        style = ((b.style.name if b.style is not None else "") or "").lower()
        hm = re.match(r"heading (\d)", style)
        lvl = int(hm.group(1)) if hm else (1 if style == "title" else 0)
        if lvl:
            flush(); amode = None; last_short = None
            text = text.replace("**", "").strip()
            if lvl == 1:
                lid = lesson_id(text)
                if lid:
                    cur, part = lid, "notes"
                    lessons.setdefault(cur, {"title": re.sub(r"^\s*(?:chapitre|chapter|chap\.?|ch\.?|lesson|le[cç]on)\s*\d+\s*(?:\([^)]*\))?\s*[:\-–—·.]*\s*", "", text, flags=re.I) or text, "notes": [], "ex": []})
                else:
                    cur, part = None, "notes"
                    extras.append({"t": "h", "l": 1, "x": text})
                continue
            if cur and EX.search(text): part = "ex"
            elif cur and lvl == 2: part = "notes"
            target().append({"t": "h", "l": lvl, "x": text})
            if KEY.match(text): amode = "key"
            continue
        plain = text.replace("**", "").strip()
        is_list = "list" in style
        if last_short is not None:
            first_bold = bool(b.runs) and bool(b.runs[0].bold)
            if (not is_list and not first_bold and not re.match(r"^(\d+[.)]|q\d|[a-e][.)]\s)", plain, re.I)
                    and not ANS.match(plain) and not KEY.match(plain)):
                last_short["x"] += "\n" + text
                last_short = None
                continue
            last_short = None
        if amode == "label" and not is_list:
            flush(); amode = None
        if amode:
            buf.append(("• " if is_list else "") + text)
            continue
        m = ANS.match(plain)
        if m or (KEY.match(plain) and len(plain) < 80):
            rest = ANS.sub("", plain) if m else re.sub(r"^\s*(answer key|answers? and \w+|model answers?|worked solutions?|solutions?)\s*[:：\-–—]?\s*", "", plain, flags=re.I)
            if len(rest) == 0:          # bare label: what follows is the answer
                amode = "label" if (m and not KEY.match(plain) or "suggested" in plain.lower()) else "key"
                if re.match(r"^(answer key|official solution|solution)", plain, re.I) and not m:
                    amode = "key"
                continue
            blk = {"t": "a", "x": rest}
            target().append(blk)
            last_short = blk if (m and len(rest) <= 14) else None
            if not m: amode = "key"
            continue
        if is_list:
            target().append({"t": "li", "x": text})
        else:
            target().append({"t": "p", "x": text})
    flush()
    return lessons, extras


def main():
    src = Path(sys.argv[1])
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else Path(__file__).with_name("content.js")
    data = {"synced": None, "courses": {}}
    if out.exists():   # merge mode: courses without a new .docx keep their previous content
        try:
            txt = out.read_text(encoding="utf-8")
            data = json.loads(txt[txt.index("CONTENT=") + 8:].rstrip().rstrip(";"))
        except Exception as e:
            print("!! could not read previous content.js, starting empty:", e)
    data["synced"] = dt.datetime.now().strftime("%Y-%m-%d %H:%M")
    for code, name in COURSES.items():
        files = sorted(src.glob(f"{code}*.docx"))
        if not files:
            data["courses"].setdefault(code, {"file": None, "mtime": None, "lessons": {}, "extras": []})
            print(f"-- {code}: no new .docx, previous content kept")
            continue
        f = files[-1]
        lessons, extras = convert(f)
        mv = move_answer_keys(lessons)
        if mv: print(f"   {code}: {mv} answers moved from the notes to the exercises page")
        data["courses"][code] = {"file": f.name, "mtime": dt.datetime.fromtimestamp(f.stat().st_mtime).strftime("%Y-%m-%d"), "lessons": lessons, "extras": extras}
        print(f"ok {code}: {f.name} -> {len(lessons)} lessons, "
              f"{sum(len(v['ex']) for v in lessons.values())} exercise blocks, {len(extras)} extra blocks")
    out.write_text("// Generated by sync_courses.py from the 5 Word synthesis files. Do not edit by hand.\nconst CONTENT=" +
                   json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("wrote", out)


if __name__ == "__main__":
    if len(sys.argv) > 2 and sys.argv[1] == "--fix":      # python3 sync_courses.py --fix content.js
        p = Path(sys.argv[2]); raw = p.read_text(encoding="utf-8")
        d = json.loads(raw[raw.index("const CONTENT=") + 14:].rstrip().rstrip(";"))
        n = sum(move_answer_keys(c["lessons"]) for c in d["courses"].values())
        p.write_text(raw[:raw.index("const CONTENT=")] + "const CONTENT=" + json.dumps(d, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
        print("answers moved:", n)
    else:
        main()
