/* Flashcards: deck generated from content.js + spaced repetition (Anki-like SM-2). Pure functions, no DOM. */
(function(g){
const strip=s=>String(s||'').replace(/\*\*/g,'').replace(/\s+/g,' ').trim();
const hash=s=>{let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))>>>0;return h.toString(36)};
const NUM=/^[\$€£(−\-–]?\s*\(?[\d][\d,]*(\.\d+)?\)?\s*(%|[kKmM])?$/;
const isNum=c=>{const t=strip(c).replace(/[\$€£\s]/g,'');return t.length>0&&NUM.test(t)};
const isPl=t=>{const h=strip(t).replace(/\(.*?\)/g,'').split(/ (?:of|to|for|in|and|vs\.?|from|on|by) |[,/:;]/)[0].trim();const w=h.split(/\s+/).pop()||'';return /[a-z]s$/i.test(w)&&!/(ss|us|is|ics|ness|ous|'s|’s)$/i.test(w)&&!/^(business|gas|bias|lens|series|news|physics)$/i.test(w)};
const be=t=>isPl(t)?'are':'is';
const Q=(t,s)=>'What '+be(t)+' '+t+(s?' '+s:'')+'?';
const nq=t=>String(t).replace(/[“”"]/g,'').replace(/^\(?\d+[.)]\s*/,'').trim();
function cut(s,n){s=String(s);if(s.length<=n)return s;const k=s.slice(0,n);const i=Math.max(k.lastIndexOf('. '),k.lastIndexOf('; '));return (i>n*.5?k.slice(0,i+1):k.trimEnd()+'…')}
function numTable(rows){let n=0,t=0;rows.forEach((r,ri)=>r.forEach((c,ci)=>{if(ci>0&&strip(c)){t++;if(isNum(c))n++}}));return {n,t,ratio:t?n/t:0}}

function tq(label,h){
 label=nq(label);const hl=strip(h).replace(/[.…]+$/,'').trim(),l=hl.toLowerCase();
 if(/^definition$|^meaning$|^description$/.test(l))return Q(label);
 if(/^examples?\b/.test(l))return 'Give an example of '+label+'.';
 if(/^(what|how|who|when|where|why|which)\b/.test(l)){
  if(/^what happens/.test(l))return 'What happens in '+label+'?';
  if(/^how it works/.test(l))return 'How '+(isPl(label)?'do ':'does ')+label+' work?';
  if(/^what it covers/.test(l))return 'What '+(isPl(label)?'do ':'does ')+label+' cover?';
  return hl.charAt(0).toUpperCase()+hl.slice(1)+' — '+label+'?';
 }
 if(/^best when/.test(l))return 'When '+be(label)+' '+label+' best used?';
 if(/^(role|focus|purpose|period|goal|aim|effect|impact|function|key (idea|point)|payment earned|workplace relevance)$/.test(l))return 'What is the '+l+' of '+label+'?';
 return label+' — '+l.replace(/^./,m=>m)+'?';
}
function buildDeck(CONTENT){
 const out=[],seen=new Set();
 const add=(c,l,lt,sec,src,q,a)=>{
  q=String(q).trim();a=String(a).trim();
  if(q.length<4||a.length<2)return;
  const id=c+':'+l+':'+hash(strip(q));
  if(seen.has(id))return;seen.add(id);
  out.push({id,c,l:c+':'+l,lt,sec,src,q,a});
 };
 const courses=(CONTENT&&CONTENT.courses)||{};
 for(const c in courses){
  const lessons=courses[c].lessons||{};
  for(const n in lessons){
   const L=lessons[n],lt=L.title||'';
   /* ---- notes: bullets and tables ---- */
   let sec=lt;
   (L.notes||[]).forEach(b=>{
    if(b.t==='h'){sec=strip(b.x);return}
    if(/Extraction gap/i.test(b.x||''))return;
    if(b.t==='li'){
     const raw=String(b.x||'');
     let term,def,m=raw.match(/^\*\*(.+?)\*\*\s*(.+)$/);
     if(m){term=strip(m[1]).replace(/[:：\-–—\s]+$/,'');def=strip(m[2])}
     else{
      m=strip(raw).match(/^([^:—–]{3,70}?)\s*(?::|—|–| - )\s+(.{20,})$/);
      if(m&&m[1].split(' ').length<=9&&!/[?]$/.test(m[1])&&(m[1].match(/,/g)||[]).length<=1&&!/^["“]/.test(m[1])){term=m[1];def=m[2]}
     }
     if(!term||!def)return;
     def=def.replace(/^[—–\-:\s]+/,'');
     if(def.length<15||term.length>80||/^[A-Z][.)]\s/.test(term)||/^e\.?g\.?[ ,]/i.test(def)||/context example/i.test(term))return;
     const s2=strip(sec).replace(/^\d+(\.\d+)*[.)]?\s+/,'').split(/ — | \(/)[0].slice(0,50);
     const t2=term.replace(/^\d+[.)]\s+/,'');
     const fn=/\b(when|with|of|to|for|than|by|from)$/i.test(t2),long=t2.split(' ').length>=5||/[.!]$/.test(t2);
     const weak=t2.split(' ').length<=2&&t2.length<16||fn||/^(definition|location|step \d|example|purpose|result|impact)/i.test(t2);
     const T=nq(t2),s3=s2.replace(/^\(?\d+[.)]\s*/,'');let q;
     if(long)q='Explain: '+T.replace(/[.!]$/,'');
     else if(/^definition$/i.test(T))q='What is the definition of '+s2+'?';
     else if(fn)q='In '+s2+': '+T+' …?';
     else if(/^(why|how|what|when|who|which)\b/i.test(T))q=T.charAt(0).toUpperCase()+T.slice(1)+' ('+s2+')?';
     else if(weak&&s2.length>=12&&!s2.toLowerCase().includes(T.toLowerCase()))q='What '+be(T)+' '+T+(/^step \d/i.test(T)?' of ':' in ')+s3+'?';
     else q=Q(T);
     add(c,n,lt,sec,'b',q,cut(def.charAt(0).toUpperCase()+def.slice(1),420));
    }else if(b.t==='table'&&b.rows&&b.rows.length>=2){
     const rows=b.rows,H=rows[0].map(strip);
     if(H.filter(Boolean).length<2||H.length>5||H.some(x=>x.length>60)||H.some(x=>/debit|credit/i.test(x)))return;
     if(numTable(rows).ratio>0.4)return;
     const body=rows.slice(1);
     const firsts=body.map(r=>strip(r[0]));
     const dup=new Set(firsts).size<firsts.length;
     const HQ=/^(term|concept|name|item|definition)$/i.test(H[0]);
     body.forEach(r=>{
      const cells=r.map(strip);
      if(!cells[0]||cells[0].length>90||/^(debit|credit)\b/i.test(cells[0])||cells.slice(1).every(x=>!x))return;
      let q,a;
      if(dup&&cells.length>=3){q='When '+H[0]+' is '+nq(cells[0])+' and '+H[1]+' is '+nq(cells[1])+', what happens to '+H.slice(2).join(' / ')+'?';a=cells.slice(2).map((x,i)=>H[i+2]+': '+x).join('\n')}
      else if(cells.length===2){q=HQ||/mean|defin|descri|explan/i.test(H[1])?Q(nq(cells[0])):tq(cells[0],H[1]);a=cells[1]}
      else{cells.slice(1).forEach((x,i)=>{if(x&&H[i+1])add(c,n,lt,sec,'t',tq(cells[0],H[i+1]),cut(x,420))});return}
      if(!a||a.length<2)return;
      add(c,n,lt,sec,'t',q,cut(a,520));
     });
    }
   });
   /* ---- exercises: question / answer pairs ---- */
   const pool=new Map();let cur=null,esec=lt;
   (L.ex||[]).forEach(b=>{
    if(b.t==='h'){esec=strip(b.x);if(!/answer|key|solution/i.test(b.x)){pool.clear();cur=null}return}
    if(b.t==='p'||b.t==='li'){
     const t=String(b.x||'');
     if(/Extraction gap|^These are the exact/i.test(t))return;
     const m=t.match(/^\*{0,2}\s*[QA]?(\d+)[.)]\s*/i);
     if(m&&b.t==='p'){cur={n:m[1],t:[t],a:null};pool.set(m[1],cur)}
     else if(cur&&!cur.a)cur.t.push(t);
     else if(b.t==='p'){cur={n:null,t:[t],a:null};pool.set('u'+pool.size+t.length,cur)}
     return;
    }
    if(b.t==='a'){
     const lines=String(b.x).split('\n');
     const marks=[];lines.forEach((ln,i)=>{const m=ln.match(/^\*{0,2}\s*[QA]?(\d+)[.)]\s*/i);if(m)marks.push([i,m[1]])});
     if(marks.length>=2){
      marks.forEach(([i,num],k)=>{const q=pool.get(num);if(q&&!q.a)q.a=lines.slice(i,k+1<marks.length?marks[k+1][0]:undefined).join('\n')});
     }else if(cur&&!cur.a){cur.a=String(b.x)}
     else if(marks.length===1){const q=pool.get(marks[0][1]);if(q&&!q.a)q.a=String(b.x)}
     cur=null;
    }
   });
   pool.forEach(q=>{
    if(!q.a)return;
    const front=q.t.map(strip).join('\n').replace(/^(?:[QA]?\d+[.)]\s*)/i,'');
    if(front.length<12||front.length>900)return;
    add(c,n,lt,esec,'x',front,cut(strip(q.a).replace(/^[QA]?\d+[.)]\s*/i,'')||q.a,640));
   });
  }
 }
 return out;
}

/* ---- scheduling (SM-2 style, Anki-like four grades) ---- */
const DAY=864e5,MIN=6e4;
function fresh(){return {n:0,i:0,e:2.5,f:0,due:0,ts:0,fd:''}}
function grade(st,gr,now){
 const s=Object.assign(fresh(),st||{});now=now||Date.now();
 if(!s.fd)s.fd=new Date(now).toISOString().slice(0,10);
 if(gr===0){if(s.n>0)s.f++;s.e=Math.max(1.3,s.e-.2);s.n=0;s.i=0;s.due=now+10*MIN}
 else{
  if(s.n===0)s.i=gr===1?1:gr===2?1:4;
  else if(gr===1){s.i=Math.max(s.i+1,Math.round(s.i*1.2));s.e=Math.max(1.3,s.e-.15)}
  else if(gr===2)s.i=s.i<=1?3:Math.max(s.i+1,Math.round(s.i*s.e));
  else{s.i=Math.max(s.i+2,Math.round(s.i*s.e*1.3));s.e+=.15}
  s.n++;s.due=now+s.i*DAY;
 }
 s.ts=now;return s;
}
function label(st,gr,now){
 const s=grade(st,gr,now);
 if(gr===0)return '10 min';
 return s.i>=30?Math.round(s.i/30)+' mo':s.i+' d';
}
const api={buildDeck,grade,label,fresh,isNum,numTable,strip,hash};
if(typeof module!=='undefined')module.exports=api;else g.CARDS=api;
})(typeof window!=='undefined'?window:globalThis);
