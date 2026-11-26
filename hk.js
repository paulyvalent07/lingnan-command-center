/* ---------- Hong Kong (Hub): fiches for jury questions, journal of impressions, people met. Content in hkdata*.js ---------- */
const hkT=()=>{if(!S.hk)S.hk={};const T=S.hk;['t','q','z','n'].forEach(k=>{T[k]=T[k]||{}});T.j=T.j||[];T.p=T.p||[];T.log=T.log||[];return T};
const hkMerge=(a,b)=>{const o={};['q','z','n'].forEach(k=>{o[k]=Object.assign({},a&&a[k]);Object.entries((b&&b[k])||{}).forEach(([id,v])=>{const y=o[k][id];if(!y||(v.ts||0)>=(y.ts||0))o[k][id]=v})});o.t={};['j','p','log'].forEach(k=>{o[k]=pcMergeList(a&&a[k],b&&b[k])});return o};
let HKV={page:null,unit:null,tab:'notes',open:null,run:null,mock:null,pend:null,msg:''};
const HK_TAGS=['Society','Food','Study','Work','Politics','Language','Other'];
const HK_GOAL=10;
const hkUnit=id=>HK.units.find(u=>u.id===id);
const hkQid=(u,i)=>u.id+'q'+i,hkZid=(u,i)=>u.id+'z'+i;
const hkQItem=id=>{const m=id.match(/^(h\d+)z(\d+)$/);if(!m)return null;const u=hkUnit(m[1]);return u&&u.quiz[+m[2]]?{u,z:u.quiz[+m[2]]}:null};
const hkQQ=id=>{const m=id.match(/^(h\d+)q(\d+)$/);if(!m)return null;const u=hkUnit(m[1]);return u&&u.qs[+m[2]]?{u,q:u.qs[+m[2]]}:null};
const hkDraft=()=>pcLS('lu-hk-draft')||{};
document.addEventListener('input',e=>{const el=e.target;if(el&&el.dataset&&el.dataset.hkf){const d=hkDraft();d[el.dataset.hkf]=el.value;pcLS('lu-hk-draft',d);if(el.dataset.hkf==='jt'){const b=document.querySelector('[data-act=hkjsave]');if(b)b.disabled=el.value.trim().length<5}if(el.dataset.hkf==='pn'){const b=document.querySelector('[data-act=hkpsave]');if(b)b.disabled=el.value.trim().length<2}}});
function hkProg(u){const T=hkT(),nq=u.qs.length,nz=u.quiz.length;const rd=T.n[u.id]?1:0,kq=u.qs.filter((_,i)=>(T.q[hkQid(u,i)]||{}).r===3).length,kz=u.quiz.filter((_,i)=>(T.z[hkZid(u,i)]||{}).ok).length;return {rd,kq,nq,kz,nz,pct:(rd+kq/nq+kz/nz)/3}}
const hkLocal=()=>hkT().p.filter(x=>!x.del&&x.local).length;
function hkTileSub(){const l=hkLocal(),all=HK.units.map(hkProg),done=all.filter(p=>p.pct>=.95).length;return done?done+' of '+all.length+' fiches done':(l?l+'/'+HK_GOAL+' locals met':'Fiches and jury questions')}
function hkStats(){const T=hkT(),all=HK.units.map(hkProg),z=Object.values(T.z),ok=z.filter(x=>x.ok).length;return {read:all.reduce((a,p)=>a+p.rd,0),n:all.length,qs:all.reduce((a,p)=>a+p.kq,0),nq:all.reduce((a,p)=>a+p.nq,0),acc:z.length?Math.round(ok/z.length*100):null}}
function hkPick(pool,n){const T=hkT();const sc=id=>{const a=T.z[id];return !a?0:a.ok?2+(a.ts/1e13):-1+(a.ts/1e13)};return stShuf(pool).sort((x,y)=>sc(x)-sc(y)).slice(0,n).map(id=>({id,idx:stShuf([0,1,2,3]),a:null}))}
const hkZIds=us=>us.flatMap(u=>u.quiz.map((_,i)=>hkZid(u,i)));
const hkMist=()=>{const T=hkT();return hkZIds(HK.units).filter(id=>T.z[id]&&!T.z[id].ok)};
const hkDate=ts=>{const d=new Date(ts);return d.getDate()+' '+['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]};
/* ---- views ---- */
function vHk(){
 const sub=HKV.run||HKV.mock||HKV.unit||HKV.page;
 const nav=sub?`<div class="navbar"><button class="back" data-act="hkup">${ic('chevl')}${HKV.run||HKV.mock?(HKV.unit?'Fiche':'Hong Kong'):(HKV.unit?'Hong Kong':'Hong Kong')}</button></div>`:navbar('Hub');
 let b;
 if(HKV.mock)b=hkMockView();else if(HKV.run)b=hkRunView();else if(HKV.unit)b=hkUnitView();else if(HKV.page==='journal')b=hkJournal();else if(HKV.page==='people')b=hkPeople();else b=hkHome();
 return `<div class="view">${nav}${b}</div>`;
}
function hkHome(){
 const s=hkStats(),T=hkT(),m=hkMist().length,l=hkLocal(),nj=T.j.filter(x=>!x.del).length;
 const rows=HK.units.map((u,i)=>{const p=hkProg(u);return `<button class="cell has-ico" data-act="hkunit" data-id="${u.id}"><span class="sq" style="--c:#2563eb"><b style="font-size:15px">${i+1}</b></span><span class="t"><b style="white-space:normal">${esc(u.title)}</b><span style="white-space:normal">${esc(u.sub)}</span><span>${p.rd?'Read':'Not read'} · ${p.kq}/${p.nq} answers · ${p.kz}/${p.nz} quiz</span>${stBar(p.pct,'#2563eb')}</span>${ic('chev','chev')}</button>`}).join('');
 return `${title('Hong Kong','Fiches for your jury questions')}
 <p class="mute" style="margin:0 0 12px">What to know, what to say and what to notice. The current-affairs facts are dated: check the news before each interview.</p>
 <div class="stats" style="margin-bottom:14px"><div class="stat"><b>${s.read}/${s.n}</b><span>fiches read</span></div><div class="stat"><b>${s.qs}/${s.nq}</b><span>answers solid</span></div><div class="stat"><b>${s.acc==null?'—':s.acc+' %'}</b><span>quiz right</span></div></div>
 <div class="eyebrow" style="margin:6px 0">My Hong Kong</div>
 <div class="grp"><button class="cell" data-act="hkpage" data-k="journal"><span class="t"><b>What struck me</b><span>${nj?nj+' notes':'Write down what you notice, while it is fresh'}</span></span>${ic('chev','chev')}</button><button class="cell" data-act="hkpage" data-k="people"><span class="t"><b>People I met</b><span>${l} of ${HK_GOAL} conversations with locals${stBar(l/HK_GOAL,'#2563eb')}</span></span>${ic('chev','chev')}</button></div>
 <div class="eyebrow" style="margin:16px 0 6px">The fiches</div><div class="grp">${rows}</div>
 <div style="margin-top:14px"><button class="btn" data-act="hkmix">Mixed quiz · 10 questions</button></div>
 ${m?`<div style="margin-top:10px"><button class="btn tint" data-act="hkmixm">Redo my quiz mistakes (${m})</button></div>`:''}
 <div style="margin-top:10px"><button class="btn tint" data-act="hkmock">Jury mock · 5 questions</button></div>`;
}
function hkUnitView(){
 const u=hkUnit(HKV.unit),T=hkT(),tab=HKV.tab;
 const tabs=`<div class="segc" style="margin:6px 0 14px">${[['notes','Notes'],['qs','Jury'],['quiz','Quiz']].map(([k,l])=>`<button class="${tab===k?'on':''}" data-act="hktab" data-k="${k}">${l}</button>`).join('')}</div>`;
 let body='';
 if(tab==='notes'){
  const rd=!!T.n[u.id];
  body=`<div class="card" style="margin-bottom:12px"><ul style="margin:0;padding-left:18px">${u.notes.map(n=>`<li style="margin:7px 0">${esc(n)}</li>`).join('')}</ul></div>
  <div class="eyebrow" style="margin:14px 0 6px">Key terms</div><div class="grp">${u.terms.map((t,i)=>{const id=u.id+'t'+i,o=HKV.open===id;return `<div class="tmm"><button class="cell" data-act="hkopen" data-id="${id}"><span class="t"><b style="font-size:15px;white-space:normal">${esc(t[0])}</b><span style="white-space:normal">${esc(t[1])}</span></span>${ic(o?'chevd':'chev','chev')}</button>${o?`<div class="tmx"><p>${esc(t[2])}</p></div>`:''}</div>`}).join('')}</div>
  <div style="margin-top:14px"><button class="btn ${rd?'gray':''}" data-act="hkread">${rd?'Marked as read · tap to undo':'Mark as read'}</button></div>`;
 }else if(tab==='qs'){
  const d=hkDraft();
  body=`<p class="mute" style="margin:0 0 10px">Answer aloud first, as in front of the jury, then compare with the model and rate yourself. Where a model has [brackets] or says "replace", put your own experience in.</p><div class="grp">`+u.qs.map((x,i)=>{
   const id=hkQid(u,i),s=T.q[id],o=HKV.open===id,lab=s?['','Needs work','OK','Solid'][s.r]:'To do';
   return `<div class="tmm"><button class="cell" data-act="hkopen" data-id="${id}"><span class="t"><b style="font-size:15px;white-space:normal">${esc(x[0])}</b></span><span class="badge ${s&&s.r===3?'':'red'}" style="${s&&s.r===3?'background:var(--fill);color:var(--label)':''}">${lab}</span>${ic(o?'chevd':'chev','chev')}</button>${o?`<div class="tmx"><textarea class="pcta" data-hkf="${id}" rows="4" placeholder="Key points of your answer (optional)">${esc(d[id]||'')}</textarea>${HKV.pend===id?`<div class="card" style="margin-top:8px;white-space:pre-line">${esc(x[1])}</div><div class="eyebrow" style="margin:12px 0 6px">How was your answer?</div><div class="chips"><button class="btn sm red" data-act="hkrate" data-id="${id}" data-r="1">Needs work</button><button class="btn sm gray" data-act="hkrate" data-id="${id}" data-r="2">OK</button><button class="btn sm" data-act="hkrate" data-id="${id}" data-r="3">Solid</button></div>`:`<div style="margin-top:8px"><button class="btn sm" data-act="hkshow" data-id="${id}">Show model answer</button></div>`}</div>`:''}</div>`}).join('')+`</div>`;
 }else{
  const ids=u.quiz.map((_,i)=>hkZid(u,i)),done=ids.filter(id=>T.z[id]).length,m=ids.filter(id=>T.z[id]&&!T.z[id].ok).length;
  body=`<p class="mute" style="margin:0 0 10px">${u.quiz.length} questions. Wrong ones come back first. ${done?done+' seen.':''}</p><button class="btn" data-act="hkquiz" data-id="${u.id}">Start the quiz</button>${m?`<div style="margin-top:10px"><button class="btn tint" data-act="hkquizm" data-id="${u.id}">Redo my mistakes (${m})</button></div>`:''}`;
 }
 return `${title(esc(u.title),'Hong Kong · fiche '+(HK.units.indexOf(u)+1)+'/'+HK.units.length)}${tabs}${body}`;
}
function hkRunView(){
 const R=HKV.run;
 if(R.done){const ok=R.items.filter(x=>x.a===0).length;
  return `${title('Quiz result','Hong Kong')}<div class="stats" style="margin-bottom:14px"><div class="stat"><b>${ok}/${R.items.length}</b><span>right</span></div><div class="stat"><b>${Math.round(ok/R.items.length*100)} %</b><span>score</span></div><div class="stat"><b>${Math.round((Date.now()-R.t0)/60000)||1}</b><span>min</span></div></div>
  ${R.items.filter(x=>x.a!==0).length?`<div class="eyebrow" style="margin:16px 0 6px">To remember</div><div class="grp">${R.items.filter(x=>x.a!==0).map(x=>{const q=hkQItem(x.id).z;return `<div class="cell"><span class="t"><b style="font-size:15px;white-space:normal">${esc(q[0])}</b><span style="white-space:normal">${esc(q[1])} — ${esc(q[3])}</span></span></div>`}).join('')}</div>`:''}
  <div style="margin-top:16px"><button class="btn" data-act="hkend">Done</button></div>`}
 const it=R.items[R.i],qi=hkQItem(it.id),z=qi.z,lock=it.a!=null,last=R.i===R.items.length-1,opts=[z[1],...z[2]];
 return `<div class="tmtop"><span>${esc(qi.u.title)}</span><span>${R.i+1}/${R.items.length}</span></div><p class="tmq">${esc(z[0])}</p>
 <div class="tmos">${it.idx.map((oi,k)=>{let c='';if(lock)c=oi===0?'ok':k===it.pk?'bad':'';return `<button class="tmo ${c}" data-act="hkpick" data-i="${k}"><b>${tmL(k)}</b><span>${esc(opts[oi])}</span></button>`}).join('')}</div>
 ${lock?`<div class="card tmexp"><b>${it.a===0?'Correct.':'Not quite.'}</b> ${esc(z[3])}</div><div style="margin-top:12px"><button class="btn" data-act="hknext">${last?'See result':'Next'}</button></div>`:''}
 <div style="margin-top:12px"><button class="btn gray" data-act="hkquit">Stop</button></div>`;
}
function hkMockView(){
 const M=HKV.mock;
 if(M.i>=M.items.length){const T=hkT(),sc=M.items.map(id=>(T.q[id]||{}).r||0);
  return `${title('Jury mock done','Hong Kong')}<div class="card" style="margin:10px 0"><b>${sc.filter(x=>x===3).length} solid, ${sc.filter(x=>x===2).length} OK, ${sc.filter(x=>x===1).length} to rework</b><p class="mute">Questions rated "Needs work" stay at the top of your next mock.</p></div><button class="btn" data-act="hkmockend">Done</button>`}
 const id=M.items[M.i],x=hkQQ(id),d=hkDraft();
 return `<div class="tmtop"><span>${esc(x.u.title)}</span><span>${M.i+1}/${M.items.length}</span></div>
 <div class="card"><div class="eyebrow">Jury</div><p class="tmq" style="margin:6px 0 0">${esc(x.q[0])}</p></div>
 <p class="mute small" style="margin:8px 4px">Answer aloud, about 90 seconds. Then compare.</p>
 <textarea class="pcta" data-hkf="${id}" rows="3" placeholder="Notes (optional)">${esc(d[id]||'')}</textarea>
 ${M.show?`<div class="card" style="margin-top:10px;white-space:pre-line">${esc(x.q[1])}</div><div class="eyebrow" style="margin:12px 0 6px">How was your answer?</div><div class="chips"><button class="btn sm red" data-act="hkmrate" data-r="1">Needs work</button><button class="btn sm gray" data-act="hkmrate" data-r="2">OK</button><button class="btn sm" data-act="hkmrate" data-r="3">Solid</button></div>`:`<div style="margin-top:10px"><button class="btn" data-act="hkmshow">Show model answer</button></div>`}
 <div style="margin-top:12px"><button class="btn gray" data-act="hkmockend">Stop</button></div>`;
}
function hkJournal(){
 const T=hkT(),d=hkDraft(),tag=d.jtag||'Society',L=T.j.filter(x=>!x.del).slice().reverse();
 return `${title('What struck me','Hong Kong')}<p class="mute" style="margin:0 0 10px">One observation a day is enough: a scene, a sentence you heard, something that surprised you. Say what you saw, why it surprised you, and what it tells you. These notes become your interview stories.</p>
 <textarea class="pcta" data-hkf="jt" rows="4" placeholder="Today I noticed…">${esc(d.jt||'')}</textarea>
 <div class="chips" style="margin:8px 0">${HK_TAGS.map(t=>`<button class="btn sm ${tag===t?'':'gray'}" data-act="hkjtag" data-v="${t}">${t}</button>`).join('')}</div>
 <button class="btn" data-act="hkjsave" ${(d.jt||'').trim().length<5?'disabled':''}>Save note</button>
 ${L.length>=3?`<div style="margin-top:10px"><button class="btn tint" data-act="hkjcopy">Copy my notes for Claude: turn them into interview stories</button></div>`:''}
 <div class="eyebrow" style="margin:18px 0 6px">${L.length} note${L.length===1?'':'s'}</div>
 <div class="grp">${L.map(x=>`<div class="cell"><span class="t"><b style="font-size:15px;white-space:normal;font-weight:500">${esc(x.txt)}</b><span>${esc(x.tag)} · ${hkDate(x.ts)}</span></span><button class="btn sm gray" data-act="hkjdel" data-id="${x.id}">Delete</button></div>`).join('')}</div>`;
}
function hkPeople(){
 const T=hkT(),d=hkDraft(),loc=!!d.ploc,L=T.p.filter(x=>!x.del).slice().reverse(),l=hkLocal();
 return `${title('People I met','Hong Kong')}<p class="mute" style="margin:0 0 10px">Goal: ${HK_GOAL} real conversations with Hongkongese people, not only exchange students. Write down who, where and the sentence that taught you something. The best jury stories come from here.</p>
 <div class="card" style="margin-bottom:12px"><b>${l} of ${HK_GOAL}</b> local conversations${stBar(Math.min(1,l/HK_GOAL),'#2563eb')}<p class="mute small" style="margin:8px 0 0">Ideas: a classmate in a group project, a stall owner or cha chaan teng regular, a local society or sports club, a language exchange, a neighbour in the dorm, a volunteering day.</p></div>
 <input class="pcta" style="padding:10px 12px;margin-bottom:8px" data-hkf="pn" placeholder="First name or description" value="${esc(d.pn||'')}">
 <input class="pcta" style="padding:10px 12px;margin-bottom:8px" data-hkf="pw" placeholder="Where and how we met" value="${esc(d.pw||'')}">
 <textarea class="pcta" data-hkf="pl" rows="3" placeholder="What I learned or what surprised me">${esc(d.pl||'')}</textarea>
 <div class="chips" style="margin:8px 0"><button class="btn sm ${loc?'':'gray'}" data-act="hkploc">${loc?'✓ ':''}Hongkongese (local)</button></div>
 <button class="btn" data-act="hkpsave" ${(d.pn||'').trim().length<2?'disabled':''}>Save</button>
 <div class="eyebrow" style="margin:18px 0 6px">${L.length} conversation${L.length===1?'':'s'}</div>
 <div class="grp">${L.map(x=>`<div class="cell"><span class="t"><b style="font-size:15px;white-space:normal">${esc(x.name)}${x.local?' · local':''}</b><span style="white-space:normal">${esc([x.where,x.learn].filter(Boolean).join(' — '))}</span><span>${hkDate(x.ts)}</span></span><button class="btn sm gray" data-act="hkpdel" data-id="${x.id}">Delete</button></div>`).join('')}</div>`;
}
/* ---- actions ---- */
function hkSecs(t0,n,per){return Math.min((Date.now()-(t0||Date.now()))/1000,n*per)}
Object.assign(A,{
 hkup(){if(HKV.mock||HKV.run){HKV.mock=null;HKV.run=null}else if(HKV.unit){HKV.unit=null;HKV.open=null;HKV.pend=null}else HKV.page=null;render();window.scrollTo(0,0)},
 hkunit(el){HKV.unit=el.dataset.id;HKV.tab='notes';HKV.open=null;HKV.pend=null;render();window.scrollTo(0,0)},
 hkpage(el){HKV.page=el.dataset.k;render();window.scrollTo(0,0)},
 hktab(el){HKV.tab=el.dataset.k;HKV.open=null;HKV.pend=null;render()},
 hkopen(el){const id=el.dataset.id;HKV.open=HKV.open===id?null:id;HKV.pend=null;render()},
 hkread(){const T=hkT(),id=HKV.unit;if(T.n[id])delete T.n[id];else{T.n[id]={ts:Date.now()};effAdd('hk',240)}save();render()},
 hkshow(el){HKV.pend=el.dataset.id;render()},
 hkrate(el){const T=hkT();T.q[el.dataset.id]={r:+el.dataset.r,ts:Date.now()};save();effAdd('hk',60);HKV.pend=null;render()},
 hkquiz(el){const u=hkUnit(el.dataset.id),it=hkPick(u.quiz.map((_,i)=>hkZid(u,i)),u.quiz.length);HKV.run={items:it,i:0,done:false,t0:Date.now()};render();window.scrollTo(0,0)},
 hkquizm(el){const u=hkUnit(el.dataset.id),T=hkT(),ids=u.quiz.map((_,i)=>hkZid(u,i)).filter(id=>T.z[id]&&!T.z[id].ok);if(!ids.length)return;HKV.run={items:hkPick(ids,9),i:0,done:false,t0:Date.now()};render();window.scrollTo(0,0)},
 hkmix(){HKV.run={items:hkPick(hkZIds(HK.units),10),i:0,done:false,t0:Date.now()};render();window.scrollTo(0,0)},
 hkmixm(){const ids=hkMist();if(!ids.length)return;HKV.run={items:hkPick(ids,10),i:0,done:false,t0:Date.now()};render();window.scrollTo(0,0)},
 hkpick(el){const R=HKV.run,it=R.items[R.i];if(it.a!=null)return;const k=+el.dataset.i;it.pk=k;it.a=it.idx[k];const T=hkT(),y=T.z[it.id]||{n:0};T.z[it.id]={ok:it.a===0,n:(y.n||0)+1,ts:Date.now()};save();render()},
 hknext(){const R=HKV.run;if(R.i<R.items.length-1){R.i++;render();window.scrollTo(0,0)}else{R.done=true;effAdd('hk',hkSecs(R.t0,R.items.length,90));const T=hkT();T.log.push({id:pcId(),ts:Date.now(),ok:R.items.filter(x=>x.a===0).length,n:R.items.length});save();render();window.scrollTo(0,0)}},
 hkquit(){const R=HKV.run,ans=R.items.filter(x=>x.a!=null);if(ans.length){effAdd('hk',hkSecs(R.t0,ans.length,90));R.items=ans;R.done=true}else HKV.run=null;render()},
 hkend(){HKV.run=null;render();window.scrollTo(0,0)},
 hkmock(){const T=hkT(),ids=HK.units.flatMap(u=>u.qs.map((_,i)=>hkQid(u,i)));const sc=id=>{const s=T.q[id];return !s?0.5+Math.random():s.r===1?0.2+Math.random()*0.2:s.r===2?1+Math.random():3+Math.random()};HKV.mock={items:stShuf(ids.sort((a,b)=>sc(a)-sc(b)).slice(0,5)),i:0,show:false,t0:Date.now()};render();window.scrollTo(0,0)},
 hkmshow(){HKV.mock.show=true;render()},
 hkmrate(el){const M=HKV.mock,T=hkT();T.q[M.items[M.i]]={r:+el.dataset.r,ts:Date.now()};save();M.i++;M.show=false;if(M.i>=M.items.length)effAdd('hk',hkSecs(M.t0,M.items.length,150));render();window.scrollTo(0,0)},
 hkmockend(){const M=HKV.mock;if(M&&M.i>0&&M.i<M.items.length)effAdd('hk',hkSecs(M.t0,M.i,150));HKV.mock=null;render();window.scrollTo(0,0)},
 hkjtag(el){const d=hkDraft();d.jtag=el.dataset.v;pcLS('lu-hk-draft',d);render()},
 hkjsave(){const d=hkDraft(),t=(d.jt||'').trim();if(t.length<5)return;const T=hkT();T.j.push({id:pcId(),ts:Date.now(),mod:Date.now(),txt:t,tag:d.jtag||'Society'});d.jt='';pcLS('lu-hk-draft',d);effAdd('hk',90);save();render()},
 hkjdel(el){const x=hkT().j.find(y=>y.id===el.dataset.id);if(x){x.del=1;x.mod=Date.now();save();render()}},
 hkjcopy(el){const L=hkT().j.filter(x=>!x.del).slice(-15).map(x=>'- ['+x.tag+'] '+x.txt).join('\n');pcCopy(`I am an exchange student in Hong Kong and I prepare interviews for business schools and internships (in French and English). Here are my raw notes about what struck me:\n\n${L}\n\nTurn them into 3 interview stories. For each: a title, then Situation, what I observed or did, what I learned, and how it connects to a career in finance or venture capital (about 120 words, first person, natural spoken English). Then tell me which notes are too vague and what concrete detail I should add.`,el)},
 hkploc(){const d=hkDraft();d.ploc=!d.ploc;pcLS('lu-hk-draft',d);render()},
 hkpsave(){const d=hkDraft(),n=(d.pn||'').trim();if(n.length<2)return;const T=hkT();T.p.push({id:pcId(),ts:Date.now(),mod:Date.now(),name:n,where:(d.pw||'').trim(),learn:(d.pl||'').trim(),local:!!d.ploc});['pn','pw','pl','ploc'].forEach(k=>delete d[k]);pcLS('lu-hk-draft',d);effAdd('hk',120);save();render()},
 hkpdel(el){const x=hkT().p.find(y=>y.id===el.dataset.id);if(x){x.del=1;x.mod=Date.now();save();render()}}
});
VMAP.hk=vHk;
