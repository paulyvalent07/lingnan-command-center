# Built exercises ("you build the answer") — how to add them for a new chapter

Every chapter must have BOTH: the Word lesson (notes + exercises with answers, in content.js) AND built drills
(dropdowns / numeric inputs the student fills in, graded with explanations). New chapters: write the drills in `bdata9.js`.

Rules
- Key = `BUILD['BUS2205:4']` (COURSE:chapter number, the same id as in content.js). Replace, never duplicate.
- 4 to 8 exercises per chapter, covering EVERY concept, formula, framework and worked example of the chapter's slides/Word notes
  and every question of the Word exercises (nothing left only as text). Mix types. Ids unique: `<course 2 letters><chapter>-<letter>` (e.g. mk4-a).
- Every answer must be correct and consistent (recompute every number). Each wrong choice must teach: add `why`/`x`/`note` explanations.
- Student language is English. All text in the exercises in English.
- After writing: run `node validate_b.js` (must print `ALL OK`), then bump `sw.js` version and push.

Types (helpers C, K, E, G are already defined at the top of bdata9.js)
1. Classify  `C(id,title,stem,cols,items,min)` — cols=[[header,[options]],...]; items=[[text, answer|[answer per col], why?],...]
   `C('mk4-a','Which stage?','Decide…',[['Stage',['Awareness','Evaluation','Purchase']]],[['She compares three brands online.','Evaluation','why…'],...],4)`
2. Calculate `K(id,title,stem,parts,expl,min)` — parts: `{l:'Label',n:15,u:'%',pre:'$',x:'working'}` numeric (tolerance 0.5%),
   or a choice `{l:'Label',opts:['A','B'],key:'A',x:'why'}`.
3. Effects `E(id,title,stem,cols,eo,txs,min)` — cols=['Demand curve','Supply curve']; eo=[[code,label],...] e.g. `[['R','Shifts right'],['L','Shifts left'],['0','No shift']]`;
   txs=[[text,[code per col],note?],...].
4. Table `G(id,title,stem,cols,rows,tol,expl,min)` — cols=[{h:'Country',g:true} (given/readonly), {h:'Cost'} (student fills)], rows=[[...numbers or text...]], tol=0.01.
5. Accounting only (BUS1103): `je` (journal entries) and `fs` (statements) — copy the shapes from bdata.js (TX/D/K helpers, FR/F2 rows).
Examples to copy: bdata6.js (Marketing), bdata7.js (Micro), bdata8.js (GBE), bdata5.js (OB).
