/* ---------- Stage: internship interview preparation (Hub). Content lives in stagedata*.js ---------- */
const STAGE={cats:[{id:'fin',title:'Finance and financing',sub:'Venture capital, private equity and LBO, audit, valuation',color:'#0e7490'}],units:[]};
const ST_PLANNED=[['Strategy and marketing','Frameworks, case questions'],['Hospitality and real estate','Hotels, asset management'],['Sport, travel and experience business','Your long-term concept'],['Behavioural and motivation','Stories, strengths, fit']];
const stT=()=>{if(!S.stage)S.stage={};['t','q','z'].forEach(k=>{S.stage[k]=S.stage[k]||{}});S.stage.log=S.stage.log||[];return S.stage};
const stMerge=(a,b)=>{const o={};['t','q','z'].forEach(k=>{o[k]=Object.assign({},a&&a[k]);Object.entries((b&&b[k])||{}).forEach(([id,v])=>{const y=o[k][id];if(!y||(v.ts||0)>=(y.ts||0))o[k][id]=v})});o.log=pcMergeList(a&&a.log,b&&b.log);return o};
let ST={cat:null,unit:null,tab:'terms',open:null,run:null,fc:null,mock:null,pend:null};
const stDraft=()=>pcLS('lu-st-draft')||{};
document.addEventListener('input',e=>{const el=e.target;if(el&&el.dataset&&el.dataset.stf){const d=stDraft();d[el.dataset.stf]=el.value;pcLS('lu-st-draft',d)}});
const stShuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const stDay=n=>{const d=new Date();d.setDate(d.getDate()+n);return dkey(d)};
const stBar=(p,c)=>`<div style="height:6px;border-radius:3px;background:var(--fill);margin-top:6px"><div style="height:100%;width:${Math.round(Math.min(1,p)*100)}%;border-radius:3px;background:${c}"></div></div>`;
const stUnit=id=>STAGE.units.find(u=>u.id===id);
const stUnits=cat=>STAGE.units.filter(u=>u.cat===cat);
const stTid=(u,i)=>u.id+'t'+i, stQid=(u,i)=>u.id+'q'+i, stZid=(u,i)=>u.id+'z'+i;
const stQItem=id=>{const m=id.match(/^(f\d+)z(\d+)$/);if(!m)return null;const u=stUnit(m[1]);return u&&u.quiz[+m[2]]?{u,z:u.quiz[+m[2]]}:null};
const stQQ=id=>{const m=id.match(/^(f\d+)q(\d+)$/);if(!m)return null;const u=stUnit(m[1]);return u&&u.qs[+m[2]]?{u,q:u.qs[+m[2]]}:null};
function stProg(u){
 const T=stT(),nt=u.terms.length,nq=u.qs.length,nz=u.quiz.length;
 const kt=u.terms.filter((_,i)=>(T.t[stTid(u,i)]||{}).b>=2).length;
 const kq=u.qs.filter((_,i)=>(T.q[stQid(u,i)]||{}).r===3).length;
 const kz=u.quiz.filter((_,i)=>(T.z[stZid(u,i)]||{}).ok).length;
 return {kt,nt,kq,nq,kz,nz,pct:(kt/nt+kq/nq+kz/nz)/3};
}
function stDue(){const T=stT(),t=today();let n=0;STAGE.units.forEach(u=>u.terms.forEach((_,i)=>{const x=T.t[stTid(u,i)];if(x&&x.due<=t)n++}));return n}
function stTileSub(){const d=stDue();if(d)return d+' terms to review';const all=STAGE.units.map(stProg),done=all.filter(p=>p.pct>=.95).length;return done?done+' of '+all.length+' units done':'Interview prep'}
function stQueue(u){const T=stT(),t=today();const due=[],fresh=[];u.terms.forEach((x,i)=>{const s=T.t[stTid(u,i)];if(!s)fresh.push(i);else if(s.due<=t)due.push(i)});return due.concat(fresh)}
function stRate(id,r){const T=stT();T.q[id]={r,ts:Date.now()};save()}
function stGrade(id,ok){const T=stT(),s=T.t[id],steps=[0,0,3,7,14,30];const b=!ok?1:(s&&s.b>=2?Math.min(5,s.b+1):2);T.t[id]={b,due:stDay(steps[b]),ts:Date.now()};save()}
function stPick(pool,n){const T=stT();const sc=id=>{const a=T.z[id];return !a?0:a.ok?2+(a.ts/1e13):-1+(a.ts/1e13)};
 return stShuf(pool).sort((x,y)=>sc(x)-sc(y)).slice(0,n).map(id=>({id,idx:stShuf([0,1,2,3]),a:null}))}
const stZIds=us=>us.flatMap(u=>u.quiz.map((_,i)=>stZid(u,i)));
function stMistakes(us){const T=stT();return stZIds(us).filter(id=>T.z[id]&&!T.z[id].ok)}
function stStats(){const T=stT(),all=STAGE.units.map(stProg);const z=Object.values(T.z),ok=z.filter(x=>x.ok).length;
 return {terms:all.reduce((a,p)=>a+p.kt,0),nt:all.reduce((a,p)=>a+p.nt,0),qs:all.reduce((a,p)=>a+p.kq,0),nq:all.reduce((a,p)=>a+p.nq,0),acc:z.length?Math.round(ok/z.length*100):null}}
/* ---- views ---- */
function stBack(){return ST.cat?(ST.unit?'Path':'Stage'):'Hub'}
function vStage(){
 const nav=ST.cat?`<div class="navbar"><button class="back" data-act="stup">${ic('chevl')}${esc(stBack())}</button></div>`:navbar('Hub');
 if(ST.mock)return `<div class="view">${nav}${stMockView()}</div>`;
 if(ST.run)return `<div class="view">${nav}${stRunView()}</div>`;
 if(ST.fc)return `<div class="view">${nav}${stFcView()}</div>`;
 if(!ST.cat)return `<div class="view">${nav}${title('Stage','Internship interview preparation')}${stHome()}</div>`;
 if(!ST.unit)return `<div class="view">${nav}${stCatView()}</div>`;
 return `<div class="view">${nav}${stUnitView()}</div>`;
}
function stHome(){
 const s=stStats(),d=stDue();
 const cats=STAGE.cats.map(c=>{const us=stUnits(c.id),ps=us.map(stProg),avg=ps.reduce((a,p)=>a+p.pct,0)/(ps.length||1);
  return `<button class="cell has-ico" data-act="stcat" data-id="${c.id}"><span class="sq" style="--c:${c.color}">${ic('cap')}</span><span class="t"><b>${esc(c.title)}</b><span style="white-space:normal">${us.length} units · ${esc(c.sub)}</span>${stBar(avg,c.color)}</span>${ic('chev','chev')}</button>`}).join('');
 const plan=ST_PLANNED.map(([a,b])=>`<div class="cell"><span class="t"><b class="mute" style="font-size:15px">${esc(a)}</b><span>${esc(b)} · planned</span></span></div>`).join('');
 return `<p class="mute" style="margin:0 0 12px">A path of terms, theories and interview answers to master before you apply. Terms carry the French name, because the interviews will be in French.</p>
 <div class="stats" style="margin-bottom:14px"><div class="stat"><b>${s.terms}/${s.nt}</b><span>terms known</span></div><div class="stat"><b>${s.qs}/${s.nq}</b><span>answers solid</span></div><div class="stat"><b>${s.acc==null?'—':s.acc+' %'}</b><span>quiz right</span></div></div>
 <div class="eyebrow" style="margin:6px 0">Categories</div><div class="grp">${cats}</div>
 <div style="margin-top:14px"><button class="btn" data-act="stmock">Mock interview · 5 questions</button></div>
 ${d?`<div style="margin-top:10px"><button class="btn tint" data-act="stdue">Review ${d} terms due</button></div>`:''}
 <div class="eyebrow" style="margin:18px 0 6px">Coming next</div><div class="grp">${plan}</div>`;
}
function stCatView(){
 const c=STAGE.cats.find(x=>x.id===ST.cat),us=stUnits(c.id),m=stMistakes(us).length;
 const rows=us.map((u,i)=>{const p=stProg(u);return `<button class="cell has-ico" data-act="stunit" data-id="${u.id}"><span class="sq" style="--c:${c.color}"><b style="font-size:15px">${i+1}</b></span><span class="t"><b style="white-space:normal">${esc(u.title)}</b><span style="white-space:normal">${esc(u.sub)}</span><span>${p.kt}/${p.nt} terms · ${p.kq}/${p.nq} answers · ${p.kz}/${p.nz} quiz</span>${stBar(p.pct,c.color)}</span>${ic('chev','chev')}</button>`}).join('');
 return `${title(esc(c.title),'The path')}<p class="mute" style="margin:0 0 12px">Work the units in order. Each one has the terms, the interview questions with a model answer, and a quiz.</p>
 <div class="grp">${rows}</div>
 <div style="margin-top:14px"><button class="btn" data-act="stmix">Mixed quiz · 10 questions</button></div>
 ${m?`<div style="margin-top:10px"><button class="btn tint" data-act="stmixm">Redo my quiz mistakes (${m})</button></div>`:''}
 <div style="margin-top:10px"><button class="btn tint" data-act="stmock">Mock interview · 5 questions</button></div>`;
}
function stUnitView(){
 const u=stUnit(ST.unit),c=STAGE.cats.find(x=>x.id===u.cat),T=stT(),tab=ST.tab;
 const tabs=`<div class="segc" style="margin:6px 0 14px">${[['terms','Terms'],['qs','Interview'],['quiz','Quiz']].map(([k,l])=>`<button class="${tab===k?'on':''}" data-act="sttab" data-k="${k}">${l}</button>`).join('')}</div>`;
 let body='';
 if(tab==='terms'){
  const q=stQueue(u).length;
  body=`<div style="margin-bottom:12px"><button class="btn" data-act="stfc" data-id="${u.id}" ${q?'':'disabled'}>${q?'Study '+q+' terms as flashcards':'All terms reviewed for today'}</button></div><div class="grp">`+u.terms.map((t,i)=>{
   const id=stTid(u,i),s=T.t[id],o=ST.open===id,b=s?(s.b>=2?'Known':'Again'):'New';
   return `<div class="tmm"><button class="cell" data-act="stopen" data-id="${id}"><span class="t"><b style="font-size:15px;white-space:normal">${esc(t[0])}</b><span style="white-space:normal">${esc(t[1])}</span></span><span class="badge ${s&&s.b>=2?'':'red'}" style="${s&&s.b>=2?'background:var(--fill);color:var(--label)':''}">${b}</span>${ic(o?'chevd':'chev','chev')}</button>${o?`<div class="tmx"><p>${esc(t[2])}</p><p><b>In the interview</b><br>${esc(t[3])}</p><div class="chips" style="margin-top:6px"><button class="btn sm" data-act="stknow" data-id="${id}" data-ok="1">I know it</button><button class="btn sm gray" data-act="stknow" data-id="${id}" data-ok="0">Review again</button></div></div>`:''}</div>`}).join('')+`</div>`;
 }else if(tab==='qs'){
  const d=stDraft();
  body=`<p class="mute" style="margin:0 0 10px">Say your answer aloud first, as in the interview, then read the model answer and rate yourself honestly. Questions marked solid count towards the unit.</p><div class="grp">`+u.qs.map((x,i)=>{
   const id=stQid(u,i),s=T.q[id],o=ST.open===id,lab=s?['','Needs work','OK','Solid'][s.r]:'To do';
   return `<div class="tmm"><button class="cell" data-act="stopen" data-id="${id}"><span class="t"><b style="font-size:15px;white-space:normal">${esc(x[0])}</b></span><span class="badge ${s&&s.r===3?'':'red'}" style="${s&&s.r===3?'background:var(--fill);color:var(--label)':''}">${lab}</span>${ic(o?'chevd':'chev','chev')}</button>${o?stQBody(id,x,d):''}</div>`}).join('')+`</div>`;
 }else{
  const ids=u.quiz.map((_,i)=>stZid(u,i)),done=ids.filter(id=>T.z[id]).length,m=ids.filter(id=>T.z[id]&&!T.z[id].ok).length;
  body=`<p class="mute" style="margin:0 0 10px">${u.quiz.length} questions. Wrong ones come back first. ${done?done+' seen.':''}</p><button class="btn" data-act="stquiz" data-id="${u.id}">Start the quiz</button>${m?`<div style="margin-top:10px"><button class="btn tint" data-act="stquizm" data-id="${u.id}">Redo my mistakes (${m})</button></div>`:''}`;
 }
 return `${title(esc(u.title),'Unit '+(stUnits(u.cat).indexOf(u)+1)+' · '+esc(c.title))}${tabs}${body}`;
}
function stQBody(id,x,d){
 return `<div class="tmx"><textarea class="pcta" data-stf="${id}" rows="4" placeholder="Key points of your answer (optional)">${esc(d[id]||'')}</textarea>
 ${ST.pend===id?`<div class="card" style="margin-top:8px;white-space:pre-line">${esc(x[1])}</div><div class="eyebrow" style="margin:12px 0 6px">How was your answer?</div><div class="chips"><button class="btn sm red" data-act="strate" data-id="${id}" data-r="1">Needs work</button><button class="btn sm gray" data-act="strate" data-id="${id}" data-r="2">OK</button><button class="btn sm" data-act="strate" data-id="${id}" data-r="3">Solid</button></div>`
 :`<div style="margin-top:8px"><button class="btn sm" data-act="stshow" data-id="${id}">Show model answer</button></div>`}</div>`;
}
const stFcView=()=>{const F=ST.fc,u=stUnit(F.u);
 if(F.i>=F.q.length)return `${title('Done','Flashcards')}<div class="card" style="margin:10px 0"><b>${F.q.length} terms reviewed</b><p class="mute">Terms you marked known come back in 3, 7, 14 then 30 days.</p></div><button class="btn" data-act="stfcend">Back to the unit</button>`;
 const i=F.q[F.i],t=u.terms[i];
 return `<div class="tmtop"><span>${esc(u.title)}</span><span>${F.i+1}/${F.q.length}</span></div>
 <div class="card" style="min-height:230px;display:flex;flex-direction:column;justify-content:center;text-align:center;padding:22px" data-act="stflip"><div style="font-size:22px;font-weight:700">${esc(t[0])}</div>${F.flip?`<div class="mute" style="margin-top:4px">${esc(t[1])}</div><p style="margin-top:14px;text-align:left">${esc(t[2])}</p><p style="text-align:left"><b>In the interview</b><br>${esc(t[3])}</p>`:`<div class="mute" style="margin-top:14px">Define it out loud, then tap to flip.</div>`}</div>
 ${F.flip?`<div class="tmnav"><button class="btn gray" data-act="stfcnext" data-ok="0">Again</button><button class="btn" data-act="stfcnext" data-ok="1">Got it</button></div>`:`<div style="margin-top:14px"><button class="btn tint" data-act="stflip">Flip</button></div>`}
 <div style="margin-top:12px"><button class="btn gray" data-act="stfcend">Stop</button></div>`};
function stRunView(){
 const R=ST.run;
 if(R.done){const ok=R.items.filter(x=>x.a===0).length;
  return `${title('Quiz result','Stage')}<div class="stats" style="margin-bottom:14px"><div class="stat"><b>${ok}/${R.items.length}</b><span>right</span></div><div class="stat"><b>${Math.round(ok/R.items.length*100)} %</b><span>score</span></div><div class="stat"><b>${Math.round((Date.now()-R.t0)/60000)||1}</b><span>min</span></div></div>
  ${R.items.filter(x=>x.a!==0).length?`<div class="eyebrow" style="margin:16px 0 6px">To remember</div><div class="grp">${R.items.filter(x=>x.a!==0).map(x=>{const q=stQItem(x.id).z;return `<div class="cell"><span class="t"><b style="font-size:15px;white-space:normal">${esc(q[0])}</b><span style="white-space:normal">${esc(q[1])} — ${esc(q[3])}</span></span></div>`}).join('')}</div>`:''}
  <div style="margin-top:16px"><button class="btn" data-act="stend">Done</button></div>`}
 const it=R.items[R.i],z=stQItem(it.id).z,lock=it.a!=null,last=R.i===R.items.length-1,opts=[z[1],...z[2]];
 return `<div class="tmtop"><span>${esc(stQItem(it.id).u.title)}</span><span>${R.i+1}/${R.items.length}</span></div><p class="tmq">${esc(z[0])}</p>
 <div class="tmos">${it.idx.map((oi,k)=>{let c='';if(lock)c=oi===0?'ok':k===it.pk?'bad':'';return `<button class="tmo ${c}" data-act="stpick" data-i="${k}"><b>${tmL(k)}</b><span>${esc(opts[oi])}</span></button>`}).join('')}</div>
 ${lock?`<div class="card tmexp"><b>${it.a===0?'Correct.':'Not quite.'}</b> ${esc(z[3])}</div><div style="margin-top:12px"><button class="btn" data-act="stnext">${last?'See result':'Next'}</button></div>`:''}
 <div style="margin-top:12px"><button class="btn gray" data-act="stquit">Stop</button></div>`;
}
function stMockView(){
 const M=ST.mock;
 if(M.i>=M.items.length){const T=stT(),sc=M.items.map(id=>(T.q[id]||{}).r||0);
  return `${title('Mock interview done','Stage')}<div class="card" style="margin:10px 0"><b>${sc.filter(x=>x===3).length} solid, ${sc.filter(x=>x===2).length} OK, ${sc.filter(x=>x===1).length} to rework</b><p class="mute">Questions rated "Needs work" stay at the top of your next mock.</p></div><button class="btn" data-act="stmockend">Done</button>`}
 const id=M.items[M.i],x=stQQ(id),d=stDraft();
 return `<div class="tmtop"><span>${esc(x.u.title)}</span><span>${M.i+1}/${M.items.length}</span></div>
 <div class="card"><div class="eyebrow">Interviewer</div><p class="tmq" style="margin:6px 0 0">${esc(x.q[0])}</p></div>
 <p class="mute small" style="margin:8px 4px">Answer aloud, about 90 seconds. Then compare.</p>
 <textarea class="pcta" data-stf="${id}" rows="3" placeholder="Notes (optional)">${esc(d[id]||'')}</textarea>
 ${M.show?`<div class="card" style="margin-top:10px;white-space:pre-line">${esc(x.q[1])}</div><div class="eyebrow" style="margin:12px 0 6px">How was your answer?</div><div class="chips"><button class="btn sm red" data-act="stmrate" data-r="1">Needs work</button><button class="btn sm gray" data-act="stmrate" data-r="2">OK</button><button class="btn sm" data-act="stmrate" data-r="3">Solid</button></div>`:`<div style="margin-top:10px"><button class="btn" data-act="stmshow">Show model answer</button></div>`}
 <div style="margin-top:12px"><button class="btn gray" data-act="stmockend">Stop</button></div>`;
}
/* ---- actions ---- */
function stSecs(t0,n,per){return Math.min((Date.now()-(t0||Date.now()))/1000,n*per)}
Object.assign(A,{
 stup(){if(ST.mock||ST.run||ST.fc){ST.mock=null;ST.run=null;ST.fc=null}else if(ST.unit){ST.unit=null;ST.open=null;ST.pend=null}else ST.cat=null;render();window.scrollTo(0,0)},
 stcat(el){ST.cat=el.dataset.id;render();window.scrollTo(0,0)},
 stunit(el){ST.unit=el.dataset.id;ST.tab='terms';ST.open=null;ST.pend=null;render();window.scrollTo(0,0)},
 sttab(el){ST.tab=el.dataset.k;ST.open=null;ST.pend=null;render()},
 stopen(el){const id=el.dataset.id;ST.open=ST.open===id?null:id;ST.pend=null;render()},
 stknow(el){stGrade(el.dataset.id,el.dataset.ok==='1');render()},
 stshow(el){ST.pend=el.dataset.id;render()},
 strate(el){stRate(el.dataset.id,+el.dataset.r);effAdd('stage',60);ST.pend=null;render()},
 stfc(el){const u=stUnit(el.dataset.id),q=stQueue(u);if(!q.length)return;ST.fc={u:u.id,q,i:0,flip:false,t0:Date.now()};render();window.scrollTo(0,0)},
 stdue(){const T=stT(),t=today();for(const u of STAGE.units){const q=[];u.terms.forEach((_,i)=>{const s=T.t[stTid(u,i)];if(s&&s.due<=t)q.push(i)});if(q.length){ST.cat=u.cat;ST.unit=u.id;ST.tab='terms';ST.fc={u:u.id,q,i:0,flip:false,t0:Date.now()};render();window.scrollTo(0,0);return}}},
 stflip(){if(ST.fc){ST.fc.flip=!ST.fc.flip;render()}},
 stfcnext(el){const F=ST.fc,u=stUnit(F.u);stGrade(stTid(u,F.q[F.i]),el.dataset.ok==='1');F.i++;F.flip=false;if(F.i>=F.q.length)effAdd('stage',stSecs(F.t0,F.q.length,40));render();window.scrollTo(0,0)},
 stfcend(){const F=ST.fc;if(F&&F.i<F.q.length&&F.i>0)effAdd('stage',stSecs(F.t0,F.i,40));ST.fc=null;render()},
 stquiz(el){const u=stUnit(el.dataset.id),it=stPick(u.quiz.map((_,i)=>stZid(u,i)),u.quiz.length);ST.run={items:it,i:0,done:false,t0:Date.now()};render();window.scrollTo(0,0)},
 stquizm(el){const u=stUnit(el.dataset.id),it=stPick(stMistakes([u]),9);if(!it.length)return;ST.run={items:it,i:0,done:false,t0:Date.now()};render();window.scrollTo(0,0)},
 stmix(){const it=stPick(stZIds(stUnits(ST.cat)),10);ST.run={items:it,i:0,done:false,t0:Date.now()};render();window.scrollTo(0,0)},
 stmixm(){const it=stPick(stMistakes(stUnits(ST.cat)),10);if(!it.length)return;ST.run={items:it,i:0,done:false,t0:Date.now()};render();window.scrollTo(0,0)},
 stpick(el){const R=ST.run,it=R.items[R.i];if(it.a!=null)return;const k=+el.dataset.i;it.pk=k;it.a=it.idx[k];const T=stT(),y=T.z[it.id]||{n:0};T.z[it.id]={ok:it.a===0,n:(y.n||0)+1,ts:Date.now()};save();render()},
 stnext(){const R=ST.run;if(R.i<R.items.length-1){R.i++;render();window.scrollTo(0,0)}else{R.done=true;effAdd('stage',stSecs(R.t0,R.items.length,90));const T=stT();T.log.push({id:pcId(),ts:Date.now(),day:today(),ok:R.items.filter(x=>x.a===0).length,n:R.items.length});save();render();window.scrollTo(0,0)}},
 stquit(){const R=ST.run,ans=R.items.filter(x=>x.a!=null);if(ans.length){effAdd('stage',stSecs(R.t0,ans.length,90));R.items=ans;R.done=true}else ST.run=null;render()},
 stend(){ST.run=null;render();window.scrollTo(0,0)},
 stmock(){const T=stT();const ids=STAGE.units.flatMap(u=>u.qs.map((_,i)=>stQid(u,i)));const sc=id=>{const s=T.q[id];return !s?0.5+Math.random():s.r===1?0.2+Math.random()*0.2:s.r===2?1+Math.random():3+Math.random()};
  const pick=ids.sort((a,b)=>sc(a)-sc(b)).slice(0,5);ST.mock={items:stShuf(pick),i:0,show:false,t0:Date.now()};ST.cat=ST.cat||STAGE.cats[0].id;render();window.scrollTo(0,0)},
 stmshow(){ST.mock.show=true;render()},
 stmrate(el){const M=ST.mock;stRate(M.items[M.i],+el.dataset.r);M.i++;M.show=false;if(M.i>=M.items.length)effAdd('stage',stSecs(M.t0,M.items.length,150));render();window.scrollTo(0,0)},
 stmockend(){const M=ST.mock;if(M&&M.i>0&&M.i<M.items.length)effAdd('stage',stSecs(M.t0,M.i,150));ST.mock=null;render();window.scrollTo(0,0)}
});
VMAP.stage=vStage;
