/* ---------- builder exercises: the student builds the entry / statement / table himself ---------- */
/* ex types: je (journal entries), fs (statement or trial balance), eff (effect on the equation), cls (classify), calc (numbers), mcq */
const bnum=s=>{const t=String(s==null?'':s).trim();return t===''?0:parseNum(t)};
const bn=n=>(Math.round(n*100)/100).toLocaleString('en-US',{maximumFractionDigits:2});
const bcls=(chk,ok)=>chk?(ok?'ok':'bad'):'';
const bst=id=>{const s=xstate(id);if(!s.v)s.v={};if(!s.n)s.n={};return s};
const battr=(id,k)=>`data-bq="${id}" data-bk="${esc(k)}"`;
const bOpt=(arr,val)=>arr.map(o=>{const v=Array.isArray(o)?o[0]:o,t=Array.isArray(o)?o[1]:o;return `<option value="${esc(v)}" ${v===val?'selected':''}>${esc(t)}</option>`}).join('');
function bAcctOpts(val,labels){
 if(labels)return bOpt(labels,val);
 return COA.map(g=>`<optgroup label="${esc(g[0])}">${bOpt(g[1],val)}</optgroup>`).join('');
}
const bSel=(id,k,optsHtml,ph,dis,cls)=>`<select class="bs ${cls||''}" ${battr(id,k)} ${dis?'disabled':''}><option value="">${esc(ph)}</option>${optsHtml}</select>`;
const bIn=(id,k,val,dis,ph)=>`<input class="tin bin" ${battr(id,k)} inputmode="decimal" autocomplete="off" value="${esc(val||'')}" ${dis?'disabled':''} placeholder="${esc(ph||'0')}">`;
const bShuf=(arr,seed)=>{if(!arr||arr.length<3)return arr;let h=2166136261;for(const ch of String(seed)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}const r=()=>{h+=0x6D2B79F5;let t=Math.imul(h^h>>>15,1|h);t^=t+Math.imul(t^t>>>7,61|t);return((t^t>>>14)>>>0)/4294967296};const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const bAlt=a=>Array.isArray(a)?a:[a];
const bShow=a=>bAlt(a)[0];
const bStmtList=['Income statement','Balance sheet','Statement of stockholders’ equity','Statement of cash flows','Trial balance','T-account'];
const bDateList=['For the year ended …','For the month ended …','At … (a point in time)'];

/* ----- journal entries ----- */
function bJeLines(ex,st,ti){return Math.max(st.n[ti]||0,2)}
function bJeKey(tx){if(!tx.lines.length)return `<div class="bkey"><p><b>No journal entry.</b> ${tx.note?md(tx.note):''}</p></div>`;return `<div class="bkey"><table>${tx.lines.map(l=>`<tr><td class="${l.s==='C'?'ind':''}">${esc(bShow(l.a))}</td><td>${l.s==='D'?bn(l.n):''}</td><td>${l.s==='C'?bn(l.n):''}</td></tr>`).join('')}</table>${tx.note?`<p>${md(tx.note)}</p>`:''}</div>`}
function bJeGrade(ex,st){
 return ex.txs.map((tx,ti)=>{
  const exp=tx.lines.map(l=>({...l,used:false})),nl=bJeLines(ex,st,ti),user=[];
  for(let li=0;li<nl;li++){const a=st.v[`${ti}.${li}.a`]||'',s=st.v[`${ti}.${li}.s`]||'',m=st.v[`${ti}.${li}.m`]||'';if(a||s||m)user.push({li,a,s:s==='Debit'?'D':s==='Credit'?'C':'',m})}
  const res={};
  user.forEach(u=>{const k=exp.findIndex(e=>!e.used&&e.s===u.s&&bAlt(e.a).includes(u.a)&&numOk(u.m,e.n)&&bnum(u.m)>=0);
   if(k>=0){exp[k].used=true;res[u.li]={ok:true}}
   else{const near=exp.find(e=>!e.used&&bAlt(e.a).includes(u.a));res[u.li]={ok:false,msg:near?(near.s!==u.s?'Right account, wrong side':'Right account, check the amount'):'This account is not in the entry'}}});
  const pre=(tx.pre||[]).map((p,pi)=>{const v=st.v[`${ti}.p${pi}`]||'';return p.opts?v===p.key:numOk(v,p.n)});
  const ok=(exp.length?user.length>0:user.length===0)&&exp.every(e=>e.used)&&user.every(u=>res[u.li].ok)&&pre.every(Boolean);
  return {ok,res,pre}});
}
function bJe(ex,id,st,chk){
 const g=chk?st.g:null;
 return ex.txs.map((tx,ti)=>{
  const gt=g&&g[ti],nl=bJeLines(ex,st,ti);
  let h=`<div class="btx ${bcls(chk,gt&&gt.ok)}"><div class="btt">${tx.k?`<b>${esc(tx.k)}</b> `:''}${md(tx.text)}</div>`;
  (tx.pre||[]).forEach((p,pi)=>{const v=st.v[`${ti}.p${pi}`]||'',good=chk&&gt.pre[pi];
   h+=`<div class="bpre ${chk?(good?'ok':'bad'):''}"><span>${esc(p.l)}</span>${p.opts?bSel(id,`${ti}.p${pi}`,bOpt(p.opts,v),'Choose…',chk):bIn(id,`${ti}.p${pi}`,v,chk,p.ph||'amount')}${chk&&!good?`<em>${p.opts?esc(p.key):bn(p.n)}</em>`:''}</div>`});
  h+=`<div class="bhead"><span>Account</span><span>Dr / Cr</span><span>Amount</span></div>`;
  for(let li=0;li<nl;li++){
   const k=`${ti}.${li}`,a=st.v[k+'.a']||'',s=st.v[k+'.s']||'',m=st.v[k+'.m']||'',r=chk&&gt.res[li];
   h+=`<div class="bln ${r?(r.ok?'ok':'bad'):''}">${bSel(id,k+'.a',bAcctOpts(a),'Account…',chk,'acc')}${bSel(id,k+'.s',bOpt(['Debit','Credit'],s),'Dr / Cr',chk,'dc')}${bIn(id,k+'.m',m,chk)}${!chk&&nl>1?`<span class="bgrip" data-mv="je" data-q="${id}" data-i="${ti}" title="Drag to reorder">≡</span>`:''}${!chk&&nl>2?`<button class="bx" data-act="bdel" data-q="${id}" data-i="${ti}" data-l="${li}" title="Remove this line">×</button>`:''}${r&&!r.ok?`<small>${esc(r.msg)}</small>`:''}</div>`}
  if(!chk&&nl<7)h+=`<button class="link" data-act="badd" data-q="${id}" data-i="${ti}">+ Add a line</button>`;
  if(chk)h+=gt.ok?`<div class="bgood">✓ ${tx.note?md(tx.note):'Correct'}</div>`:`<div class="bwant"><b>Correct entry</b>${bJeKey(tx)}</div>`;
  return h+'</div>'}).join('');
}
function bJeCards(ex,st,id){const out=[];ex.txs.forEach((tx,ti)=>{if(!st.g[ti].ok)out.push({id:id+':t'+ti,q:`${ex.title}\n${bStemTxt(ex)}\n— ${tx.k||''} ${CD.strip(tx.text)} Journal entry?`,a:tx.lines.map(l=>(l.s==='D'?'Dr ':'   Cr ')+bShow(l.a)+' '+bn(l.n)).join('\n')+(tx.note?'\n'+CD.strip(tx.note):'')})});return out}

/* ----- statements / trial balance / SE statement ----- */
const bCols=ex=>ex.cols||['Amount'];
const bRowVals=r=>r.v||[r.n!=null?r.n:r.d];
function bFsGrade(ex,st){
 const cols=bCols(ex),exp=ex.rows.map(r=>({...r,vals:bRowVals(r),used:false})),nr=Math.max(st.n.r||0,ex.rows.length),user=[];
 for(let ri=0;ri<nr;ri++){const l=st.v[ri+'.l']||'',vals=cols.map((_,ci)=>st.v[`${ri}.c${ci}`]||'');if(l||vals.some(x=>x))user.push({ri,l,vals})}
 const res={},ords=[];
 user.forEach(u=>{
  const k=exp.findIndex(e=>!e.used&&bAlt(e.l).includes(u.l)&&e.vals.every((v,ci)=>v==null?!bnum(u.vals[ci]):numOk(u.vals[ci],v)));
  if(k>=0){exp[k].used=true;res[u.ri]={ok:true};ords.push(k)}
  else{const near=exp.find(e=>!e.used&&bAlt(e.l).includes(u.l));res[u.ri]={ok:false,msg:near?'Right line, check the amount':(u.l?'This line is not expected here':'Pick a line title')}}});
 const miss=exp.filter(e=>!e.used).map(e=>bShow(e.l));
 const inOrder=ords.every((x,i)=>i===0||x>ords[i-1]);
 const head=ex.head?{s:(st.v['h.s']||'')===ex.head[0],d:(st.v['h.d']||'')===ex.head[1]}:null;
 const ok=!miss.length&&user.every(u=>res[u.ri].ok)&&(!head||(head.s&&head.d));
 return {ok,res,miss,inOrder,head,score:exp.filter(e=>e.used).length,total:exp.length};
}
function bFsKey(ex){const cols=bCols(ex);
 return `<div class="tw bkey"><table>${ex.cols?`<tr><td></td>${cols.map(c=>`<td><b>${esc(c)}</b></td>`).join('')}</tr>`:''}${ex.rows.map(r=>{const v=bRowVals(r);return `<tr class="${r.tot?'tot':''}"><td>${esc(r.disp||bShow(r.l))}</td>${v.map(x=>`<td>${x==null?'':bn(x)}</td>`).join('')}</tr>`}).join('')}</table>${ex.note?`<p>${md(ex.note)}</p>`:''}</div>`}
function bFs(ex,id,st,chk){
 const cols=bCols(ex),g=chk?st.g:null,nr=Math.max(st.n.r||0,ex.rows.length);
 const lopts=v=>ex.labels?bOpt(ex.labels,v):bAcctOpts(v)+`<optgroup label="Totals and subtotals">${bOpt(SUBT,v)}</optgroup>`;
 let h='';
 if(ex.head)h+=`<div class="bhd"><span>Heading</span>${bSel(id,'h.s',bOpt(bStmtList,st.v['h.s']||''),'Which statement?',chk,g&&!g.head.s?'bad':'')}${bSel(id,'h.d',bOpt(bDateList,st.v['h.d']||''),'Which period line?',chk,g&&!g.head.d?'bad':'')}</div>`;
 h+=`<div class="bfs" style="--nc:${cols.length}">`;
 if(ex.cols)h+=`<div class="bfh"><span></span>${cols.map(c=>`<b>${esc(c)}</b>`).join('')}</div>`;
 for(let ri=0;ri<nr;ri++){
  const l=st.v[ri+'.l']||'',r=chk&&g.res[ri];
  h+=`<div class="bfr ${r?(r.ok?'ok':'bad'):''}">${bSel(id,ri+'.l',lopts(l),'Line…',chk,'lab')}${cols.map((_,ci)=>bIn(id,`${ri}.c${ci}`,st.v[`${ri}.c${ci}`],chk,cols.length>1?'':'amount')).join('')}${!chk&&nr>1?`<span class="bgrip" data-mv="fs" data-q="${id}" title="Drag to reorder">≡</span>`:''}${!chk&&nr>ex.rows.length?`<button class="bx" data-act="bfdel" data-q="${id}" data-l="${ri}" title="Remove this line">×</button>`:''}${r&&!r.ok?`<small>${esc(r.msg)}</small>`:''}</div>`}
 h+='</div>';
 if(!chk&&nr<ex.rows.length+6)h+=`<button class="link" data-act="brow" data-q="${id}">+ Add a line</button>`;
 if(chk){
  h+=g.ok?`<div class="bgood">✓ Correct${!g.inOrder?' · but check the usual order of a statement':''}</div>`:`<div class="bwant"><b>${g.miss.length?`Missing: ${esc(g.miss.join(', '))}`:'Check the lines in red'}</b>${bFsKey(ex)}</div>`;
  if(g.ok&&!g.inOrder)h+=`<div class="bwant"><b>Usual order</b>${bFsKey(ex)}</div>`}
 return h;
}

/* ----- effect on the accounting equation ----- */
const bEffO=[['+','Increase'],['-','Decrease'],['0','No effect']];const bEO=ex=>ex.eo||bEffO;
function bEffGrade(ex,st){
 const rows=ex.txs.map((tx,ti)=>{const c=tx.e.map((e,ci)=>(st.v[`${ti}.${ci}`]||'')===e);return {ok:c.every(Boolean),c}});
 return {rows,ok:rows.every(r=>r.ok),score:rows.filter(r=>r.ok).length,total:rows.length};
}
function bEff(ex,id,st,chk){
 const g=chk?st.g:null,cols=ex.cols;
 let h=`<div class="bhead eff"><span></span>${cols.map(c=>`<span>${esc(c)}</span>`).join('')}</div>`;
 ex.txs.forEach((tx,ti)=>{const r=chk&&g.rows[ti];
  h+=`<div class="btx ${bcls(chk,r&&r.ok)}"><div class="btt">${tx.k?`<b>${esc(tx.k)}</b> `:''}${md(tx.text)}</div><div class="beff">${cols.map((c,ci)=>{const v=st.v[`${ti}.${ci}`]||'',good=chk&&r.c[ci];
   return `<label class="${chk?(good?'ok':'bad'):''}"><i>${esc(c)}</i>${bSel(id,`${ti}.${ci}`,bOpt(bEO(ex),v),'—',chk)}${chk&&!good?`<em>${esc((bEO(ex).find(o=>o[0]===tx.e[ci])||[])[1])}</em>`:''}</label>`}).join('')}</div>${chk&&tx.note?`<p class="bnote">${md(tx.note)}</p>`:''}</div>`});
 return h;
}

/* ----- classification (dropdown per column, optional number column) ----- */
function bClsGrade(ex,st){
 const rows=ex.items.map((it,ii)=>{const c=ex.cols.map((col,ci)=>{const v=st.v[`${ii}.${ci}`]||'';return col.num?numOk(v,it.a[ci]||0)||(!bnum(v)&&!(it.a[ci]||0)):bAlt(it.a[ci]).includes(v)});return {ok:c.every(Boolean),c}});
 return {rows,ok:rows.every(r=>r.ok),score:rows.filter(r=>r.ok).length,total:rows.length};
}
function bCls(ex,id,st,chk){
 const g=chk?st.g:null;
 let h=`<div class="bhead cls"><span></span>${ex.cols.map(c=>`<span>${esc(c.h)}</span>`).join('')}</div>`;
 ex.items.forEach((it,ii)=>{const r=chk&&g.rows[ii];
  h+=`<div class="bit ${bcls(chk,r&&r.ok)}"><div class="btt">${it.k?`<b>${esc(it.k)}</b> `:''}${md(it.t)}</div><div class="bcols">${ex.cols.map((col,ci)=>{const v=st.v[`${ii}.${ci}`]||'',good=chk&&r.c[ci];
   const f=col.num?bIn(id,`${ii}.${ci}`,v,chk,'amount'):bSel(id,`${ii}.${ci}`,bOpt(bShuf(col.opts,id+ci),v),'Choose…',chk);
   return `<label class="${chk?(good?'ok':'bad'):''}"><i>${esc(col.h)}</i>${f}${chk&&!good?`<em>${col.num?bn(it.a[ci]||0):esc(bShow(it.a[ci]))}</em>`:''}</label>`}).join('')}</div>${chk&&it.why&&!r.ok?`<p class="bnote">${md(it.why)}</p>`:''}</div>`});
 return h;
}

/* ----- numeric parts ----- */
function bCalcGrade(ex,st){
 const rows=ex.parts.map((p,pi)=>{const v=st.v[String(pi)]||'';return p.opts?v===p.key:(()=>{const a=bnum(v),n=p.n,t=p.tol!=null?p.tol:Math.max(.01,Math.abs(n)*.005);return v.trim()!==''&&!isNaN(a)&&(Math.abs(a-n)<=t||(!p.signed&&Math.abs(Math.abs(a)-Math.abs(n))<=t))})()});
 return {rows,ok:rows.every(Boolean),score:rows.filter(Boolean).length,total:rows.length};
}
function bCalc(ex,id,st,chk){
 const g=chk?st.g:null;
 let h=ex.parts.map((p,pi)=>{const v=st.v[String(pi)]||'',good=chk&&g.rows[pi];
  return `<div class="xpr ${chk?(good?'ok':'bad'):''}"><span class="pl">${esc(p.l)}</span>${p.opts?bSel(id,String(pi),bOpt(bShuf(p.opts,id+pi),v),'Choose…',chk):`${p.pre?`<span class="bu">${esc(p.pre)}</span>`:''}${bIn(id,String(pi),v,chk,p.ph||'your number')}${p.u?`<span class="bu">${esc(p.u)}</span>`:''}`}${chk&&!good?`<span class="pv"><b>${p.opts?esc(p.key):esc((p.pre||'')+bn(p.n)+(p.u||''))}</b></span>`:''}${chk&&p.x?`<p class="pw">${md(p.x)}</p>`:''}</div>`}).join('');
 if(chk&&ex.expl)h+=`<div class="bgood" style="margin-top:8px">${md(ex.expl)}</div>`;
 return h;
}


/* ----- grid: a table where some columns are given and the others are computed by the student ----- */
function bGridGrade(ex,st){
 let ok=0,tot=0;const res={};
 ex.rows.forEach((r,ri)=>r.forEach((v,ci)=>{if(ex.cols[ci].g||v==null)return;tot++;const u=st.v[`${ri}.${ci}`]||'',a=bnum(u),t=ex.tol!=null?ex.tol:Math.max(.01,Math.abs(v)*.005);const good=String(u).trim()!==''&&!isNaN(a)&&Math.abs(a-v)<=t;res[`${ri}.${ci}`]=good;if(good)ok++}));
 return {ok:ok===tot,score:ok,total:tot,res};
}
function bGrid(ex,id,st,chk){
 const g=chk?st.g:null;
 return `<div class="tw bgrid"><table><tr>${ex.cols.map(c=>`<th>${esc(c.h)}</th>`).join('')}</tr>${ex.rows.map((r,ri)=>`<tr>${r.map((v,ci)=>{
  if(ex.cols[ci].g)return `<td class="gv">${esc(v)}</td>`;
  if(v==null)return `<td class="gv">—</td>`;
  const k=`${ri}.${ci}`,u=st.v[k]||'',good=chk&&g.res[k];
  return `<td class="${chk?(good?'ok':'bad'):''}">${bIn(id,k,u,chk,'?')}${chk&&!good?`<em>${bn(v)}</em>`:''}</td>`}).join('')}</tr>`).join('')}</table></div>${chk&&ex.expl?`<div class="bgood" style="margin-top:8px">${md(ex.expl)}</div>`:''}`;
}

/* ----- card ----- */
const BG={je:bJeGrade,fs:bFsGrade,eff:bEffGrade,cls:bClsGrade,calc:bCalcGrade,grid:bGridGrade};
const BR={je:bJe,fs:bFs,eff:bEff,cls:bCls,calc:bCalc,grid:bGrid};
function bCards(ex,st,id){
 const g=st.g,out=[];
 if(ex.t==='je')return bJeCards(ex,st,id);
 if(ex.t==='cls')ex.items.forEach((it,ii)=>{if(!g.rows[ii].ok)out.push({id:id+':i'+ii,q:`${ex.title}\n${bStemTxt(ex)}\n— ${CD.strip(it.t)}`,a:ex.cols.map((c,ci)=>`${c.h}: ${c.num?bn(it.a[ci]||0):bShow(it.a[ci])}`).join(' · ')+(it.why?'\n'+CD.strip(it.why):'')})});
 else if(ex.t==='eff')ex.txs.forEach((tx,ti)=>{if(!g.rows[ti].ok)out.push({id:id+':e'+ti,q:`${ex.title}\n${bStemTxt(ex)}\n— ${CD.strip(tx.text)} Effect on ${ex.cols.join(' / ')}?`,a:tx.e.map((e,ci)=>`${ex.cols[ci]}: ${(bEO(ex).find(o=>o[0]===e)||[])[1]}`).join(' · ')+(tx.note?'\n'+CD.strip(tx.note):'')})});
 else if(ex.t==='calc')ex.parts.forEach((p,pi)=>{if(!g.rows[pi])out.push({id:id+':c'+pi,q:`${ex.title} — ${CD.strip(p.l)}\n${bStemTxt(ex)}`,a:(p.opts?p.key:(p.pre||'')+bn(p.n)+(p.u||''))+(p.x?'\n'+CD.strip(p.x):'')+(ex.expl&&pi===0?'\n'+CD.strip(ex.expl):'')})});
 else if(ex.t==='grid')out.push({id:id+':g',q:`${ex.title}\n${bStemTxt(ex)}\n— complete the table (${ex.cols.filter(c=>!c.g).map(c=>c.h).join(', ')})`,a:ex.rows.map(r=>r.map((v,ci)=>v==null?'—':bn(v)).join(' | ')).join('\n')+(ex.expl?'\n'+CD.strip(ex.expl):'')});
 else if(ex.t==='fs')out.push({id:id+':f',q:`${ex.title}\n${bStemTxt(ex)}\n— build it: ${CD.strip(ex.cap||'statement')}`,a:ex.rows.map(r=>{const v=bRowVals(r);return `${r.disp||bShow(r.l)}: ${v.map(x=>x==null?'—':bn(x)).join(' | ')}`}).join('\n')});
 return out;
}
const bStem=(ex)=>(ex.stem||[]).map(s=>typeof s==='string'?`<p class="xs">${/^[a-z]\.\s|^\(?\d+[.)]\s|^•/.test(s)?'':''}${md(s)}</p>`:`<div class="tw xtw"><table>${s.rows.map((r,ri)=>`<tr>${r.map((c,ci)=>`<td>${md(c)}</td>`).join('')}</tr>`).join('')}</table></div>`).join('');
const bStemTxt=ex=>{const t=(ex.stem||[]).map(s=>typeof s==='string'?CD.strip(s):s.rows.map(r=>r.map(c=>CD.strip(String(c))).join(' | ')).join('\n')).join('\n');return t.length>700?t.slice(0,700)+'…':t};
const bHasData=ex=>(ex.stem||[]).some(s=>typeof s!=='string')||(ex.stem||[]).filter(s=>typeof s==='string').join(' ').length>380;
const bStemBox=(ex,id,st)=>{if(!(ex.stem||[]).length)return '';if(!bHasData(ex))return `<div class="bstem flat">${bStem(ex)}</div>`;const hid=!!st.sh;return `<div class="bstem ${hid?'hid':''}"><button class="link bsh" data-act="bstem" data-q="${id}">${hid?'▸ Show the data':'▾ Hide the data'}</button>${hid?'':bStem(ex)}</div>`};
function bCard(ex,ctx){
 const id='b:'+ex.id;QREG[id]={b:true,ex,ctx};
 if(ex.t==='mcq'){const q={kind:'mcq',n:ex.num,stem:ex.stem,opts:ex.opts.map((x,i)=>({k:'ABCDE'[i],x})),key:ex.key,expl:ex.expl,t:[{t:'p',x:[].concat(ex.stem).join(' ')}]};return qCard(q,ctx)}
 const st=bst(id),chk=!!st.chk,prev=(S.exr||{})[id];
 if(!BR[ex.t])return '';
 const body=BR[ex.t](ex,id,st,chk);
 const g=st.g,sc=chk&&g?(ex.t==='je'?`${g.filter(x=>x.ok).length}/${g.length} entries correct`:(g.total!=null?`${g.score}/${g.total} correct`:'')):'';
 const badge=!chk&&prev?`<span class="xprev ${prev.ok?'ok':'bad'}">${prev.ok?'✓ last time':'✗ last time'}</span>`:'';
 const res=chk?`<div class="xr ${st.ok?'ok':'bad'}"><b>${esc(sc||(st.ok?'Correct':'Not quite'))}</b></div>`:'';
 return `<div class="xq bq ${bHasData(ex)?'wide':''} ${chk?(st.ok?'ok':'bad'):''}" data-qid="${id}">${badge}<h5 class="bh">${esc(ex.title)}${ex.min?` <small>~${ex.min} min</small>`:''}</h5><div class="bsplit ${bHasData(ex)?'two':''}">${bStemBox(ex,id,st)}<div class="bright">${ex.ctx?`<details class="xctx"><summary>${esc(ex.ctx.title)}</summary>${ex.ctx.lines.map(s=>`<p>${md(s)}</p>`).join('')}</details>`:''}<div class="bbody">${body}</div>${!chk?`<div class="xbar"><button class="btn tint sm" data-act="bcheck" data-q="${id}">Check</button><button class="link" data-act="bgive" data-q="${id}">Show the solution</button></div>`:`${res}${st.ok||typeof tutorHtml!=='function'?'':tutorHtml(id)}<div class="xbar"><button class="link" data-act="xretry" data-q="${id}">Try again</button></div>`}</div></div></div>`;
}
function bGrade(id,give){
 const r=QREG[id],ex=r.ex,st=bst(id);
 st.g=BG[ex.t](ex,st);
 st.ok=ex.t==='je'?st.g.every(x=>x.ok):st.g.ok;
 if(give&&st.ok)st.ok=false;
 st.chk=true;
 if(!st.ok){const cards=bCards(ex,st,id);if(cards.length)holdMissed(id,null,r.ctx,cards)}
 xrecord(id,st.ok);xrefresh(id);
}
document.addEventListener('input',e=>{const el=e.target;if(el.dataset&&el.dataset.bq){const st=bst(el.dataset.bq);st.v[el.dataset.bk]=el.value}});
document.addEventListener('change',e=>{const el=e.target;if(el.dataset&&el.dataset.bq){const st=bst(el.dataset.bq);st.v[el.dataset.bk]=el.value}});
Object.assign(A,{
 bcheck(el){bGrade(el.dataset.q,false)},
 bgive(el){bGrade(el.dataset.q,true)},
 badd(el){const st=bst(el.dataset.q),i=+el.dataset.i,ex=QREG[el.dataset.q].ex;st.n[i]=Math.min(8,bJeLines(ex,st,i)+1);xrefresh(el.dataset.q)},
 bstem(el){const st=bst(el.dataset.q);st.sh=!st.sh;xrefresh(el.dataset.q)},
 bdel(el){const st=bst(el.dataset.q),ti=+el.dataset.i,li=+el.dataset.l,ex=QREG[el.dataset.q].ex,nl=bJeLines(ex,st,ti);for(let k=li;k<nl;k++)['a','s','m'].forEach(f=>{const nk=`${ti}.${k+1}.${f}`;if(k+1<nl&&st.v[nk]!=null)st.v[`${ti}.${k}.${f}`]=st.v[nk];else delete st.v[`${ti}.${k}.${f}`]});st.n[ti]=Math.max(2,nl-1);xrefresh(el.dataset.q)},
 bfdel(el){const st=bst(el.dataset.q),li=+el.dataset.l,ex=QREG[el.dataset.q].ex,cols=bCols(ex),nr=Math.max(st.n.r||0,ex.rows.length);const fl=['l',...cols.map((_,i)=>'c'+i)];for(let k=li;k<nr;k++)fl.forEach(f=>{const key=f==='l'?`${k}.l`:`${k}.${f}`,nk=f==='l'?`${k+1}.l`:`${k+1}.${f}`;if(k+1<nr&&st.v[nk]!=null)st.v[key]=st.v[nk];else delete st.v[key]});st.n.r=Math.max(ex.rows.length,nr-1);xrefresh(el.dataset.q)},
 brow(el){const st=bst(el.dataset.q),ex=QREG[el.dataset.q].ex;st.n.r=Math.max(st.n.r||0,ex.rows.length)+1;xrefresh(el.dataset.q)},
});

/* ----- drag a row up or down with the grip ----- */
let bmv=null;
document.addEventListener('pointerdown',e=>{const g=e.target.closest&&e.target.closest('.bgrip');if(!g)return;
 const row=g.parentElement,cls=row.classList.contains('bfr')?'bfr':'bln',par=row.parentElement,sib=[...par.children].filter(c=>c.classList&&c.classList.contains(cls));
 bmv={g,row,sib,rects:sib.map(s=>s.getBoundingClientRect()),from:sib.indexOf(row),to:sib.indexOf(row),y:e.clientY,q:g.dataset.q,kind:g.dataset.mv,ti:g.dataset.i};
 try{g.setPointerCapture(e.pointerId)}catch(_){}row.classList.add('mv');e.preventDefault()});
document.addEventListener('pointermove',e=>{if(!bmv)return;const dy=e.clientY-bmv.y,m=bmv;m.row.style.transform=`translateY(${dy}px)`;
 const c=m.rects[m.from].top+m.rects[m.from].height/2+dy;let to=m.from;m.rects.forEach((r,i)=>{if(i<m.from&&c<r.top+r.height/2)to=Math.min(to,i);if(i>m.from&&c>r.top+r.height/2)to=Math.max(to===m.from?m.from:to,i)});
 m.to=to;const h=m.rects[m.from].height+6;m.sib.forEach((s,i)=>{if(s===m.row)return;s.style.transform=(to<m.from&&i>=to&&i<m.from)?`translateY(${h}px)`:(to>m.from&&i<=to&&i>m.from)?`translateY(${-h}px)`:''})});
const bmvEnd=()=>{if(!bmv)return;const m=bmv;bmv=null;m.sib.forEach(s=>{s.style.transform=''});m.row.classList.remove('mv');
 if(m.to===m.from)return;const st=bst(m.q),n=m.sib.length,ord=[...Array(n).keys()];ord.splice(m.from,1);ord.splice(m.to,0,m.from);const old=Object.assign({},st.v);
 if(m.kind==='fs'){const ex=QREG[m.q].ex,fl=['l',...bCols(ex).map((_,i)=>'c'+i)];ord.forEach((o,k)=>fl.forEach(f=>{const ok=`${o}.${f}`,nk=`${k}.${f}`;if(old[ok]!=null)st.v[nk]=old[ok];else delete st.v[nk]}))}
 else{const ti=m.ti;ord.forEach((o,k)=>['a','s','m'].forEach(f=>{const ok=`${ti}.${o}.${f}`,nk=`${ti}.${k}.${f}`;if(old[ok]!=null)st.v[nk]=old[ok];else delete st.v[nk]}))}
 xrefresh(m.q)};
document.addEventListener('pointerup',bmvEnd);document.addEventListener('pointercancel',bmvEnd);
