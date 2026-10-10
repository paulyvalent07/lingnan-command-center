'use strict';
const KEY='lu-command-center-v1';
const COURSES=[
 {id:'BUS1103',name:'Financial Accounting',short:'Accounting',color:'var(--s1)'},
 {id:'BUS2108',name:'Global Business Environment',short:'GBE',color:'var(--s2)'},
 {id:'BUS2205',name:'Marketing Management',short:'Marketing',color:'var(--s3)'},
 {id:'BUS2105',name:'Microeconomics',short:'Micro',color:'var(--s4)'},
 {id:'BUS2202',name:'Organisational Behaviour',short:'OB',color:'var(--s5)'}
];
const KINDS={L:{n:'Lesson',color:'var(--s1)'},E:{n:'Exercises',color:'var(--s2)'},M:{n:'Mock / review',color:'var(--s3)'},A:{n:'Assignment',color:'var(--s4)'},F:{n:'Free work',color:'var(--mute)'}};
const GRADES=['A+','A','A-','B+','B','B-','C+','C'];
const DEADLINES=[
 {id:'d1',course:'BUS1103',title:'Midterm Test (ch. 1-4, 6)',when:'2026-10-25T12:00'},
 {id:'d2',course:'BUS1103',title:'MYOB project due',when:'2026-12-02T12:00'},
 {id:'d3',course:'BUS2108',title:'Midterm Test (ch. 1-6, 45 MCQ)',when:'2026-10-28T08:00'},
 {id:'d4',course:'BUS2108',title:'Group presentation',when:'2026-11-18T08:00'},
 {id:'d5',course:'BUS2108',title:'Group written report',when:'2026-11-22T17:00'},
 {id:'d6',course:'BUS2205',title:'Midterm Test (ch. 1,2,3,5,8,9)',when:'2026-10-26T17:00'},
 {id:'d7',course:'BUS2205',title:'Individual assignment (Godiva)',when:'2026-11-08T23:59'},
 {id:'d8',course:'BUS2205',title:'Final group presentation (tentative)',when:'2026-11-17T09:00'},
 {id:'d9',course:'BUS2105',title:'Mid-Term Test (ch. 1,3-6,8,9)',when:'2026-11-02T11:15'},
 {id:'d10',course:'BUS2105',title:'Group debate',when:'2026-11-30T09:30'},
 {id:'d11',course:'BUS2202',title:'Individual assignment (Stress Mgmt)',when:'2026-10-20T23:59'},
 {id:'d12',course:'BUS2202',title:'Group presentation',when:'2026-11-23T09:00'},
 {id:'d13',course:'ALL',title:'Final exams period starts (exact dates TBA)',when:'2026-12-08T09:00'}
];
const STAGES=[1,3,7,14,30];
const WORK=50*60,BREAK=15*60;
const WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const uid=()=>Math.random().toString(36).slice(2,10);
const dkey=d=>new Date(d).toLocaleDateString('sv');
const today=()=>dkey(Date.now());
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const C=id=>COURSES.find(c=>c.id===id)||{id,short:'All',name:'All courses',color:'var(--mute)'};
const fmt=m=>{m=Math.round(m);return Math.floor(m/60)+' h '+String(m%60).padStart(2,'0')};
const fmtMS=s=>{s=Math.max(0,Math.ceil(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
const fmtHMS=s=>{s=Math.max(0,Math.floor(s));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return [h,m,x].map(n=>String(n).padStart(2,'0')).join(':')};
const FOCUS={1:'😕',2:'🙂',3:'🔥'};

let S=load();
function load(){
 let d={};
 try{d=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
 const st=Object.assign({daily:4,weekly:24,theme:'auto',target:{},confidence:{},quota:{0:5,1:3,2:0,3:5,4:5,5:5,6:5}},d.settings||{});
 if(st.weekly===20)st.weekly=24;
 COURSES.forEach(c=>{if(!st.target[c.id])st.target[c.id]='A-';if(st.confidence[c.id]==null)st.confidence[c.id]=0});
 return Object.assign({sessions:[],redo:[],deadlines:DEADLINES,active:null,course:'BUS1103',planDone:{},extraPlan:[],brk:null},d,{settings:st});
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}

let view='today',insR='d',insBy='course',wakeLock=null;
const TOP=[['today','Today','◎'],['timetable','Week','▤'],['insights','Insights','▲'],['more','More','⋯']];
const SUB=['redo','plan','sessions','targets','data'];
function setTheme(t){S.settings.theme=t;document.documentElement.dataset.theme=t;save();
 document.querySelectorAll('#theme button').forEach(b=>b.classList.toggle('on',b.dataset.t===t))}
function navOn(k){return view===k||(k==='more'&&SUB.includes(view))}
function nav(){
 document.getElementById('nav').innerHTML=TOP.map(([k,l])=>`<button data-v="${k}" class="${navOn(k)?'on':''}">${l}</button>`).join('');
 document.getElementById('bnav').innerHTML=TOP.map(([k,l,i])=>`<button data-v="${k}" class="${navOn(k)?'on':''}"><b>${i}</b>${l}</button>`).join('');
}

/* ---------- time helpers ---------- */
function minsOn(day,course){return S.sessions.filter(s=>dkey(s.start)===day&&(!course||s.course===course)).reduce((a,s)=>a+s.minutes,0)}
function weekStart(d=new Date()){const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return x}
function weekDays(off=0){const w=weekStart();w.setDate(w.getDate()+off*7);return [...Array(7)].map((_,i)=>{const d=new Date(w);d.setDate(w.getDate()+i);return dkey(d)})}
function streak(){let n=0,d=new Date();if(!minsOn(dkey(d)))d.setDate(d.getDate()-1);while(minsOn(dkey(d))>0){n++;d.setDate(d.getDate()-1)}return n}
function activeSecs(){return S.active?(Date.now()-S.active.startTs)/1000:0}
function nextDeadline(course){const now=Date.now();return S.deadlines.filter(d=>(d.course===course||d.course==='ALL')&&new Date(d.when)>now).sort((a,b)=>new Date(a.when)-new Date(b.when))[0]}
function countdown(when){const ms=new Date(when)-Date.now();if(ms<0)return'passed';const d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5);return d>0?`${d} d ${h} h`:`${h} h`}
function urgent(when){const ms=new Date(when)-Date.now();return ms>0&&ms<4*864e5}

/* ---------- plan helpers ---------- */
function planAll(){return (typeof PLAN!=='undefined'?PLAN:[]).concat(S.extraPlan||[])}
function itemsOn(day){return planAll().filter(p=>p.date===day)}
function overdue(){const t=today();return planAll().filter(p=>p.date<t&&!S.planDone[p.id])}
function todayList(){return overdue().concat(itemsOn(today()))}
function nextBlock(){
 const l=todayList().find(p=>!S.planDone[p.id]);if(l)return l;
 return planAll().filter(p=>p.date>today()&&!S.planDone[p.id]).sort((a,b)=>a.date.localeCompare(b.date))[0];
}
function quotaOf(day){const q=(S.settings.quota||{})[new Date(day+'T12:00').getDay()];return q==null?5:q}
function exSet(key){return key&&typeof EXERCISES!=='undefined'?EXERCISES[key]:null}

function planRow(p){
 const x=C(p.course);const done=!!S.planDone[p.id];const od=p.date<today()&&!done;
 return `<div class="blk ${done?'done':''}" style="--c:${x.color}"><button class="chk ${done?'on':''}" data-act="pdone" data-id="${p.id}" aria-label="Mark done">${done?'✓':''}</button>
 <div class="bt"><div class="tt">${esc(p.title)}</div><div class="mute small">${x.short} · ${KINDS[p.kind].n}${od?` · <b class="late">from ${p.date.slice(5)}</b>`:''}</div></div>
 ${exSet(p.ex)?`<button class="btn sm" data-act="exopen" data-key="${esc(p.ex)}">Practice</button>`:''}
 ${done?'':`<button class="play-sm" data-act="pstart" data-id="${p.id}" aria-label="Start">▶</button>`}</div>`;
}

/* ---------- views ---------- */
function head(title,sub){return `<div class="head"><div>${sub?`<small>${sub}</small>`:''}<h2>${title}</h2></div></div>`}
function subhead(title){return `<button class="btn link back" data-v="more">← More</button>`+head(title)}

function vToday(){
 const day=today();
 const title=new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'});
 const el=S.active?activeSecs():0;
 const mins=minsOn(day)+(S.active&&S.active.mode==='free'?Math.floor(el/60):0);
 const g=S.settings.daily*60,pct=Math.min(100,mins/g*100);
 const list=todayList(),nb=nextBlock();
 const due=S.redo.filter(r=>r.due<=day).length;
 let main='';
 if(S.active)main=activeCard();
 else{
  if(S.brk&&Date.now()<S.brk.until)main+=`<div class="card brk"><div class="row sp"><span>☕ Break <b id="brk">${fmtMS((S.brk.until-Date.now())/1000)}</b></span><button class="btn sm" data-act="skipbrk">Skip</button></div></div>`;
  main+=nb?`<button class="play" data-act="pstart" data-id="${nb.id}" style="--c:${C(nb.course).color}"><span class="pl">▶ Start deep work</span><span class="ps">${esc(nb.title)}</span><span class="ps">${C(nb.course).short} · ${KINDS[nb.kind].n}${nb.date>day?' · '+nb.date.slice(5):''}</span></button>`
   :`<div class="card"><p>Nothing left in your plan. Start a free session or add a lesson.</p></div>`;
  main+=`<div class="row" style="justify-content:center;margin-top:8px"><button class="btn link" data-act="freeopen">Free session</button><button class="btn link" data-act="lessonopen">+ Add a lesson</button></div>`;
 }
 return head(title,'')+`<div class="card prog"><div class="row sp"><div class="big">${fmt(mins)}</div><span class="mute">goal ${S.settings.daily} h</span></div><div class="bar"><i style="width:${pct}%"></i></div></div>
 ${main}
 <div class="card" style="margin-top:16px"><div class="card-h"><h3>Today's blocks</h3><span class="mute small">${list.filter(p=>S.planDone[p.id]).length}/${list.length}</span></div>
 ${list.length?list.map(planRow).join(''):'<p class="mute">Rest day. Nothing planned.</p>'}</div>
 ${due?`<button class="btn" style="width:100%;margin-top:12px" data-v="redo">${due} exercise${due>1?'s':''} to redo</button>`:''}`;
}
function activeCard(){
 const a=S.active,el=activeSecs(),x=C(a.course);
 if(a.mode==='block'&&el>=WORK)return `<div class="card focus" style="--c:${x.color}"><h3>Block done 🎉</h3><p class="mute" style="margin:6px 0 14px">How was your focus?</p>
  <div class="row" style="justify-content:space-around"><button class="emo" data-act="rate" data-f="1">😕<span>Low</span></button><button class="emo" data-act="rate" data-f="2">🙂<span>OK</span></button><button class="emo" data-act="rate" data-f="3">🔥<span>Deep</span></button></div></div>`;
 const free=a.mode==='free';
 return `<div class="card focus" style="--c:${x.color}"><div class="mute small">${x.short} · ${KINDS[a.kind||'F'].n}</div><div class="tt" style="margin:4px 0">${esc(a.title||'Free work')}</div>
  <div class="timer" id="timer">${free?fmtHMS(el):fmtMS(WORK-el)}</div>
  ${free?'':`<div class="bar" style="margin-bottom:14px"><i id="tbar" style="width:${Math.min(100,el/WORK*100)}%"></i></div>`}
  <div class="row"><button class="btn pri" style="flex:1" data-act="stop">${free?'Stop and save':'Stop early'}</button><button class="btn link" data-act="cancel">Discard</button></div></div>`;
}
function vTimetable(){
 const off=S.tw||0;const days=weekDays(off);
 const all=days.flatMap(itemsOn);const dn=all.filter(p=>S.planDone[p.id]).length;
 const rows=days.map(d=>{const it=itemsOn(d);const dt=new Date(d+'T12:00');
  const lab=dt.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'});
  const dls=S.deadlines.filter(x=>String(x.when).slice(0,10)===d).map(x=>`<span class="pill urgent">${esc(C(x.course).short)} · ${esc(x.title)}</span>`).join(' ');
  const dd=it.filter(p=>S.planDone[p.id]).length;
  return `<div class="card"><div class="card-h"><h3>${lab}${d===today()?' · today':''}</h3><span class="mute small">${it.length?dd+'/'+it.length:''}</span></div>
  ${dls?`<div style="margin-bottom:8px">${dls}</div>`:''}${it.length?it.map(planRow).join(''):`<p class="mute small">${dt.getDay()===2?'Rest day.':'Free.'}</p>`}</div>`}).join('');
 return head('Week')+`<div class="card" style="margin-bottom:16px"><div class="row sp"><button class="btn sm" data-act="tprev">←</button><button class="btn sm" data-act="tnow">This week</button><button class="btn sm" data-act="tnext">→</button></div>
 <div class="row sp" style="margin-top:12px"><span class="mute small">${dn}/${all.length} blocks done</span><button class="btn sm pri" data-act="lessonopen">+ Add a lesson</button></div>
 <div class="bar" style="margin-top:8px"><i style="width:${all.length?dn/all.length*100:0}%"></i></div></div><div class="col">${rows}</div>`;
}

/* ----- insights ----- */
function bucketKey(r,ts){const d=new Date(ts);if(r==='d')return dkey(d);if(r==='w')return dkey(weekStart(d));return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')}
function buckets(r){
 const out=[];const now=new Date();now.setHours(0,0,0,0);
 if(r==='d')for(let i=29;i>=0;i--){const d=new Date(now);d.setDate(d.getDate()-i);out.push({key:dkey(d),label:String(d.getDate()),full:d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'}),goal:S.settings.daily*60})}
 if(r==='w'){const ws=weekStart();for(let i=11;i>=0;i--){const d=new Date(ws);d.setDate(d.getDate()-i*7);const l=d.toLocaleDateString('en-GB',{day:'numeric',month:'short'});out.push({key:dkey(d),label:l,full:'Week of '+l,goal:S.settings.weekly*60})}}
 if(r==='m')for(let i=5;i>=0;i--){const d=new Date(now.getFullYear(),now.getMonth()-i,1);out.push({key:d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'),label:d.toLocaleDateString('en-GB',{month:'short'}),full:d.toLocaleDateString('en-GB',{month:'long',year:'numeric'}),goal:0})}
 return out;
}
function stackChart(){
 const bs=buckets(insR);const idx={};bs.forEach((b,i)=>idx[b.key]=i);
 const keys=insBy==='course'?COURSES.map(c=>c.id):['L','E','M','A','F'];
 const col=k=>insBy==='course'?C(k).color:KINDS[k].color;
 const nm=k=>insBy==='course'?C(k).short:KINDS[k].n;
 bs.forEach(b=>{b.v={};b.t=0});
 S.sessions.forEach(s=>{const i=idx[bucketKey(insR,s.start)];if(i==null)return;const k=insBy==='course'?s.course:(s.kind||'F');const b=bs[i];b.v[k]=(b.v[k]||0)+s.minutes;b.t+=s.minutes});
 const goal=bs[0].goal;const max=Math.max(60,goal*1.1,...bs.map(x=>x.t));const H=150;
 const cols=bs.map(x=>{const segs=keys.filter(k=>x.v[k]).map(k=>`<div class="seg" style="height:${Math.max(2,x.v[k]/max*H)}px;background:${col(k)}"></div>`).join('');
  const tip=`${x.full}: ${fmt(x.t)}`+keys.filter(k=>x.v[k]).map(k=>` · ${nm(k)} ${fmt(x.v[k])}`).join('');
  return `<div class="bcol" data-act="tip" data-tip="${esc(tip)}" title="${esc(tip)}"><div class="stk">${segs}</div></div>`}).join('');
 const every=insR==='d'?5:insR==='w'?2:1;
 const labs=bs.map((x,i)=>`<span>${(bs.length-1-i)%every===0?x.label:''}</span>`).join('');
 const tot=bs.reduce((a,x)=>a+x.t,0);
 const rows=bs.slice().reverse().map(x=>`<tr><td>${esc(x.full)}</td><td>${fmt(x.t)}</td>${keys.map(k=>`<td>${x.v[k]?fmt(x.v[k]):'–'}</td>`).join('')}</tr>`).join('');
 return `<div class="chart" style="height:${H}px">${goal?`<div class="goal" style="bottom:${goal/max*H}px"><span>goal</span></div>`:''}<div class="cols">${cols}</div></div>
 <div class="axis">${labs}</div><div class="tipline mute small" id="tipline">Tap a bar for details · total ${fmt(tot)}</div>
 <div class="legend">${keys.map(k=>`<span class="lg"><i class="dot" style="background:${col(k)}"></i>${nm(k)}</span>`).join('')}</div>
 <details><summary class="mute small">Table</summary><div style="overflow:auto"><table class="tbl"><tr><th>Period</th><th>Total</th>${keys.map(k=>`<th>${nm(k)}</th>`).join('')}</tr>${rows}</table></div></details>`;
}
function hourData(){
 const m=Array(24).fill(0),f=Array(24).fill(0),n=Array(24).fill(0);
 S.sessions.forEach(s=>{let t=s.start,rem=s.minutes,g=0;
  while(rem>0&&g++<48){const d=new Date(t);const toNext=Math.max(0.01,60-d.getMinutes()-d.getSeconds()/60);const use=Math.min(rem,toNext);m[d.getHours()]+=use;rem-=use;t+=use*60000}
  if(s.focus){const h=new Date(s.start).getHours();f[h]+=s.focus;n[h]++}});
 return {m,f,n};
}
function hourChart(){
 const {m,f,n}=hourData();const max=Math.max(30,...m);const H=110;
 const cols=m.map((v,h)=>{const tip=`${String(h).padStart(2,'0')}:00 · ${fmt(v)}${n[h]?` · focus ${(f[h]/n[h]).toFixed(1)}/3 ${FOCUS[Math.round(f[h]/n[h])]}`:''}`;
  return `<div class="bcol" data-act="tip2" data-tip="${esc(tip)}" title="${esc(tip)}"><div class="stk">${v?`<div class="seg" style="height:${Math.max(2,v/max*H)}px;background:var(--s1)"></div>`:''}</div></div>`}).join('');
 const labs=m.map((_,h)=>`<span>${h%6===0?h:''}</span>`).join('');
 let best=-1,bv=0;n.forEach((c,h)=>{if(c>=2&&f[h]/c>bv){bv=f[h]/c;best=h}});
 const msg=best>=0?`Best focus around ${String(best).padStart(2,'0')}:00 (${bv.toFixed(1)}/3 ${FOCUS[Math.round(bv)]})`:'Rate a few blocks (😕 🙂 🔥) to see when you focus best.';
 return `<div class="chart" style="height:${H}px"><div class="cols">${cols}</div></div><div class="axis">${labs}</div><div class="tipline mute small" id="tipline2">${msg}</div>`;
}
function weekdayChart(){
 const m=Array(7).fill(0);S.sessions.forEach(s=>{m[(new Date(s.start).getDay()+6)%7]+=s.minutes});
 const max=Math.max(60,...m);const H=110;const names=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
 return `<div class="chart" style="height:${H}px"><div class="cols">${m.map((v,i)=>`<div class="bcol wide" title="${names[i]} ${fmt(v)}"><div class="stk">${v?`<div class="seg" style="height:${Math.max(2,v/max*H)}px;background:var(--s1)"></div>`:''}</div></div>`).join('')}</div></div>
 <div class="axis">${names.map(x=>`<span>${x}</span>`).join('')}</div>`;
}
function vInsights(){
 const seg=(opts,cur,act)=>`<div class="tabs" style="margin:0">${opts.map(([k,l])=>`<button class="${cur===k?'on':''}" data-act="${act}" data-k="${k}">${l}</button>`).join('')}</div>`;
 return head('Insights')+`<div class="card"><div class="card-h"><h3>Time worked</h3></div>
 <div class="row" style="margin-bottom:14px;flex-wrap:wrap">${seg([['d','30 days'],['w','12 weeks'],['m','6 months']],insR,'insr')}${seg([['course','By course'],['kind','By type']],insBy,'insby')}</div>${stackChart()}</div>
 <div class="card" style="margin-top:16px"><div class="card-h"><h3>When you work</h3><span class="mute small">hour of day</span></div>${hourChart()}</div>
 <div class="card" style="margin-top:16px"><div class="card-h"><h3>Which days</h3></div>${weekdayChart()}</div>
 <p class="mute small" style="margin-top:12px">Streak: ${streak()} day${streak()===1?'':'s'}</p>`;
}

/* ----- more + sub views ----- */
function vMore(){
 const due=S.redo.filter(r=>r.due<=today()).length;
 const it=(v,t,s)=>`<button class="menu" data-v="${v}"><b>${t}</b><span class="mute small">${s}</span></button>`;
 return head('More')+`<div class="col">${it('redo','Exercises to redo',due?due+' due today':'Spaced repetition')}${it('plan','Deadlines','Exams and assignments')}${it('sessions','Sessions','History, add or edit')}${it('targets','Targets','Grade goals per course')}${it('data','Settings and data','Goals, backup')}</div>`;
}
function redoRow(r){const x=C(r.course);
 return `<div class="line"><span><i class="dot" style="background:${x.color}"></i>${esc(r.title)} <span class="mute small">${x.short} · step ${r.stage+1}/${STAGES.length}</span></span><span class="row"><button class="btn sm pri" data-act="rok" data-id="${r.id}">Got it</button><button class="btn sm" data-act="rko" data-id="${r.id}">Missed</button><button class="x" data-act="rdel" data-id="${r.id}">×</button></span></div>`}
function vRedo(){
 const day=today();const all=[...S.redo].sort((a,b)=>a.due.localeCompare(b.due));
 return subhead('Exercises to redo')+`<div class="card"><div class="card-h"><h3>${all.length} exercises</h3><button class="btn pri sm" data-act="newredo">New exercise</button></div>
 <p class="mute small" style="margin-bottom:10px">"Got it" moves it to the next interval (1, 3, 7, 14, 30 days). "Missed" brings it back tomorrow.</p>
 ${all.map(r=>r.due<=day?redoRow(r):`<div class="line"><span><i class="dot" style="background:${C(r.course).color}"></i>${esc(r.title)}</span><span class="row"><span class="pill">${r.due}</span><button class="x" data-act="rdel" data-id="${r.id}">×</button></span></div>`).join('')||'<p class="mute">Empty. Add the exercises you got wrong.</p>'}</div>`;
}
function vPlan(){
 const list=[...S.deadlines].sort((a,b)=>new Date(a.when)-new Date(b.when));
 return subhead('Deadlines')+`<div class="card"><div class="card-h"><h3>Exams and assignments</h3><button class="btn sm" data-act="newdl">Add</button></div>
 ${list.map(d=>{const x=C(d.course);const past=new Date(d.when)<Date.now();
 return `<div class="line" style="${past?'opacity:.45':''}"><span><i class="dot" style="background:${x.color}"></i>${esc(d.title)}<br><span class="mute small">${x.id} · ${new Date(d.when).toLocaleString('en-GB',{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</span></span>
 <span class="row"><span class="pill ${urgent(d.when)?'urgent':''}">${countdown(d.when)}</span><button class="x" data-act="dldel" data-id="${d.id}">×</button></span></div>`}).join('')}</div>`;
}
function sessRow(s){const x=C(s.course);
 return `<div class="sess"><div class="row sp"><div><i class="dot" style="background:${x.color}"></i><b>${x.short}</b> <span class="mono">${fmt(s.minutes)}</span> ${s.focus?FOCUS[s.focus]:''}
 <p>${new Date(s.start).toLocaleString('en-GB',{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})} · ${KINDS[s.kind||'F'].n}</p>${s.title?`<p>${esc(s.title)}</p>`:''}</div>
 <div class="row"><button class="btn sm" data-act="sedit" data-id="${s.id}">Edit</button><button class="btn sm danger" data-act="sdel" data-id="${s.id}">Delete</button></div></div></div>`;
}
function vSessions(){
 const all=[...S.sessions].sort((a,b)=>b.start-a.start);
 return subhead('Sessions')+`<div class="card"><div class="card-h"><h3>${all.length} sessions</h3><button class="btn sm" data-act="manual">Add</button></div>${all.map(sessRow).join('')||'<p class="mute">No session yet.</p>'}</div>`;
}
function vTargets(){
 const rows=COURSES.map(c=>{const nd=nextDeadline(c.id);const conf=S.settings.confidence[c.id]||0;
  const tot=S.sessions.filter(s=>s.course===c.id).reduce((a,s)=>a+s.minutes,0);
  return `<div class="card"><div class="row sp"><h3><i class="dot" style="background:${c.color}"></i>${c.short}</h3><span class="mute small">${nd?esc(nd.title)+' · '+countdown(nd.when):''}</span></div>
  <div class="mute small" style="margin:6px 0">Total worked ${fmt(tot)}</div>
  <div class="row"><div class="field" style="flex:1;margin:0"><label>Target grade</label><select data-act="target" data-id="${c.id}">${GRADES.map(g=>`<option ${S.settings.target[c.id]===g?'selected':''}>${g}</option>`).join('')}</select></div>
  <div class="field" style="flex:2;margin:0"><label>Confidence ${conf}%</label><input type="range" min="0" max="100" step="5" value="${conf}" data-act="conf" data-id="${c.id}"></div></div></div>`}).join('');
 return subhead('Targets')+`<div class="col">${rows}</div>`;
}
function vData(){
 const q=S.settings.quota;
 return subhead('Settings and data')+`<div class="card"><div class="field"><label>Daily work goal (hours)</label><input type="number" step="0.5" min="1" max="12" value="${S.settings.daily}" data-act="daily"></div>
 <div class="field"><label>Weekly work goal (hours)</label><input type="number" step="1" min="1" max="80" value="${S.settings.weekly}" data-act="weekly"></div>
 <div class="field"><label>Blocks per weekday (50 min each), used when adding lessons</label><div class="row" style="flex-wrap:wrap">${[1,2,3,4,5,6,0].map(d=>`<div style="width:56px"><div class="mute small" style="text-align:center">${WD[d]}</div><input type="number" min="0" max="9" value="${q[d]}" data-act="quota" data-d="${d}" style="padding:8px 4px;text-align:center"></div>`).join('')}</div></div>
 <div class="row" style="flex-wrap:wrap"><button class="btn" data-act="notif">Enable alerts</button><button class="btn pri" data-act="export">Export backup</button><label class="btn">Import backup<input type="file" accept=".json" id="imp" hidden></label></div>
 <p class="mute small" style="margin-top:14px">Data stays on this device. Export regularly to move it between phone and laptop.</p>
 <div style="margin-top:18px"><button class="btn danger" data-act="reset">Erase everything</button></div></div>`;
}
const VMAP={today:vToday,timetable:vTimetable,insights:vInsights,more:vMore,redo:vRedo,plan:vPlan,sessions:vSessions,targets:vTargets,data:vData};
function render(){
 const f=document.activeElement;const id=f&&f.id;const val=f&&f.value;
 nav();document.getElementById('main').innerHTML=(VMAP[view]||vToday)();
 if(id){const n=document.getElementById(id);if(n&&n.tagName==='INPUT'){n.value=val;n.focus()}}
}

/* ---------- modals ---------- */
const M=document.getElementById('modal');
function modal(html){M.innerHTML=`<div class="box">${html}</div>`;M.classList.remove('hidden')}
function close(){M.classList.add('hidden');M.innerHTML=''}
const courseSel=(v,id='m-course')=>`<select id="${id}">${COURSES.map(c=>`<option value="${c.id}" ${c.id===v?'selected':''}>${c.short} (${c.id})</option>`).join('')}</select>`;
const localDT=ms=>{const d=new Date(ms-new Date(ms).getTimezoneOffset()*6e4);return d.toISOString().slice(0,16)};
function sessionModal(s){
 const e=!!s;s=s||{course:S.course,kind:'F',start:Date.now()-3600e3,minutes:50,title:'',focus:0};
 modal(`<h3>${e?'Edit session':'Add a finished session'}</h3>
 <div class="field"><label>Course</label>${courseSel(s.course)}</div>
 <div class="field"><label>Type</label><select id="m-kind">${Object.keys(KINDS).map(k=>`<option value="${k}" ${(s.kind||'F')===k?'selected':''}>${KINDS[k].n}</option>`).join('')}</select></div>
 <div class="field"><label>Start</label><input type="datetime-local" id="m-start" value="${localDT(s.start)}"></div>
 <div class="field"><label>Minutes</label><input type="number" id="m-min" value="${Math.round(s.minutes)}" min="1"></div>
 <div class="field"><label>What did you work on?</label><input type="text" id="m-title" value="${esc(s.title||'')}"></div>
 <div class="field"><label>Focus</label><select id="m-focus"><option value="0">Not rated</option>${[1,2,3].map(n=>`<option value="${n}" ${s.focus===n?'selected':''}>${FOCUS[n]}</option>`).join('')}</select></div>
 <div class="row"><button class="btn pri" data-act="msave" data-id="${e?s.id:''}">Save</button><button class="btn" data-act="mclose">Cancel</button></div>`);
}
function freeModal(){modal(`<h3>Free session</h3><div class="field"><label>Course</label>${courseSel(S.course)}</div>
 <div class="field"><label>What will you work on? (optional)</label><input type="text" id="m-title"></div>
 <div class="row"><button class="btn pri" data-act="freego">Start</button><button class="btn" data-act="mclose">Cancel</button></div>`)}
function lessonModal(){modal(`<h3>Add a lesson</h3>
 <p class="mute small" style="margin-bottom:12px">The app finds the free blocks before your next deadline for this course and adds the lesson, then its exercises.</p>
 <div class="field"><label>Course</label>${courseSel(S.course)}</div>
 <div class="field"><label>Lesson</label><input type="text" id="m-title" placeholder="e.g. Ch.10 · Perfect competition"></div>
 <div class="field"><label>Lesson blocks (50 min each)</label><select id="m-n"><option>1</option><option selected>2</option><option>3</option></select></div>
 <div class="field"><label>Exercises block after it</label><select id="m-ex"><option value="1" selected>Yes</option><option value="0">No</option></select></div>
 <div class="row"><button class="btn pri" data-act="lessongo">Add to plan</button><button class="btn" data-act="mclose">Cancel</button></div>`)}
function redoModal(){modal(`<h3>New exercise to redo</h3><div class="field"><label>Course</label>${courseSel(S.course)}</div>
 <div class="field"><label>Exercise</label><input type="text" id="m-title" placeholder="e.g. E6-3 sales returns"></div>
 <div class="row"><button class="btn pri" data-act="rsave">Add</button><button class="btn" data-act="mclose">Cancel</button></div>`)}
function dlModal(){modal(`<h3>New deadline</h3><div class="field"><label>Course</label><select id="m-course">${COURSES.map(c=>`<option value="${c.id}">${c.short}</option>`).join('')}<option value="ALL">All courses</option></select></div>
 <div class="field"><label>Title</label><input type="text" id="m-title"></div><div class="field"><label>Date and time</label><input type="datetime-local" id="m-when"></div>
 <div class="row"><button class="btn pri" data-act="dlsave">Add</button><button class="btn" data-act="mclose">Cancel</button></div>`)}
function exModal(key){const s=exSet(key);if(!s)return;
 modal(`<h3>${esc(s.title)}</h3>${s.note?`<p class="mute small" style="margin-bottom:10px">${esc(s.note)}</p>`:''}
 ${s.items.map((it,i)=>`<div class="exq"><b>${i+1}.</b> ${esc(it.q)}<details><summary class="mute small">Show answer</summary><p>${esc(it.a)}</p></details></div>`).join('')}
 <div class="row" style="margin-top:12px"><button class="btn" data-act="mclose">Close</button></div>`);
}
function addLesson(course,title,n,withEx){
 const nd=nextDeadline(course);const start=new Date();start.setHours(0,0,0,0);
 let limit=new Date(start);limit.setDate(limit.getDate()+14);
 if(nd){const l=new Date(nd.when);l.setHours(0,0,0,0);l.setDate(l.getDate()-1);if(l>=start)limit=l}
 const days=[];for(let d=new Date(start);d<=limit;d.setDate(d.getDate()+1))days.push(dkey(d));
 const spare=d=>quotaOf(d)-itemsOn(d).length;
 const made=[];
 const place=(from,kind,t)=>{let i=days.findIndex((d,ix)=>ix>=from&&spare(d)>0);if(i<0)i=Math.max(0,days.length-1);
  const p={id:'x'+uid(),date:days[i],course,kind,title:t};S.extraPlan.push(p);made.push(p);return i};
 let last=0;
 for(let i=0;i<n;i++)last=place(last,'L',title+(n>1?` (${i+1}/${n})`:''));
 if(withEx){const after=days.findIndex((d,ix)=>ix>last&&spare(d)>0);place(after>=0?after:last,'E',title+' · exercises')}
 save();
 return made;
}

/* ---------- actions ---------- */
function ping(){
 try{navigator.vibrate&&navigator.vibrate([250,120,250])}catch(e){}
 try{const Ctx=window.AudioContext||window.webkitAudioContext;const c=new Ctx();const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.frequency.value=880;g.gain.value=.15;o.start();setTimeout(()=>{o.stop();c.close()},450)}catch(e){}
 try{if('Notification' in window&&Notification.permission==='granted')new Notification('Block done',{body:'Rate your focus and take a 15 min break.'})}catch(e){}
}
async function keepAwake(on){try{if(on&&'wakeLock' in navigator){wakeLock=await navigator.wakeLock.request('screen')}else if(wakeLock){await wakeLock.release();wakeLock=null}}catch(e){}}
function askNotif(){try{if('Notification' in window&&Notification.permission==='default')Notification.requestPermission()}catch(e){}}
function finishBlock(minutes,focus,done){
 const a=S.active;if(!a)return;
 S.sessions.push({id:uid(),course:a.course,kind:a.kind,title:a.title,start:a.startTs,minutes:Math.round(minutes*10)/10,focus:focus||0,planId:a.planId||null,mode:a.mode});
 if(done&&a.planId)S.planDone[a.planId]=true;
 S.active=null;keepAwake(false);
}
const A={
 pstart(el){if(S.active){view='today';render();return}
  const p=planAll().find(x=>x.id===el.dataset.id);if(!p)return;askNotif();
  S.active={mode:'block',course:p.course,kind:p.kind,title:p.title,planId:p.id,startTs:Date.now()};S.brk=null;S.course=p.course;
  view='today';save();render();keepAwake(true);window.scrollTo(0,0)},
 rate(el){finishBlock(50,+el.dataset.f,true);S.brk={until:Date.now()+BREAK*1000};save();render()},
 stop(){const a=S.active;const m=activeSecs()/60;
  if(a.mode==='free'){if(m>=1)finishBlock(m,0,false);else S.active=null}
  else{if(m>=1)finishBlock(m,0,m>=45);else S.active=null}
  keepAwake(false);save();render()},
 cancel(){if(confirm('Discard this session?')){S.active=null;keepAwake(false);save();render()}},
 skipbrk(){S.brk=null;save();render()},
 freeopen(){freeModal()},
 freego(){const c=document.getElementById('m-course').value,t=document.getElementById('m-title').value.trim();askNotif();
  S.course=c;S.active={mode:'free',course:c,kind:'F',title:t||'Free work',startTs:Date.now()};S.brk=null;close();save();render();keepAwake(true)},
 pdone(el){S.planDone[el.dataset.id]=!S.planDone[el.dataset.id];save();render()},
 exopen(el){exModal(el.dataset.key)},
 lessonopen(){lessonModal()},
 lessongo(){const t=document.getElementById('m-title').value.trim();if(!t)return;
  const made=addLesson(document.getElementById('m-course').value,t,+document.getElementById('m-n').value,document.getElementById('m-ex').value==='1');
  modal(`<h3>Added to your plan</h3>${made.map(p=>`<div class="line"><span>${esc(p.title)}</span><span class="mute small">${new Date(p.date+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})}</span></div>`).join('')}<div class="row" style="margin-top:14px"><button class="btn pri" data-act="mclose">OK</button></div>`);render()},
 tprev(){S.tw=(S.tw||0)-1;save();render()},tnext(){S.tw=(S.tw||0)+1;save();render()},tnow(){S.tw=0;save();render()},
 insr(el){insR=el.dataset.k;render()},insby(el){insBy=el.dataset.k;render()},
 tip(el){const t=document.getElementById('tipline');if(t)t.textContent=el.dataset.tip},
 tip2(el){const t=document.getElementById('tipline2');if(t)t.textContent=el.dataset.tip},
 manual(){sessionModal()},
 sedit(el){sessionModal(S.sessions.find(s=>s.id===el.dataset.id))},
 sdel(el){if(confirm('Delete this session?')){S.sessions=S.sessions.filter(s=>s.id!==el.dataset.id);save();render()}},
 msave(el){
  const v={course:document.getElementById('m-course').value,kind:document.getElementById('m-kind').value,start:new Date(document.getElementById('m-start').value).getTime(),
   minutes:+document.getElementById('m-min').value||0,title:document.getElementById('m-title').value.trim(),focus:+document.getElementById('m-focus').value};
  if(!v.minutes||isNaN(v.start))return;
  if(el.dataset.id)Object.assign(S.sessions.find(s=>s.id===el.dataset.id),v);else S.sessions.push(Object.assign({id:uid(),mode:'manual'},v));
  save();close();render()},
 mclose(){close()},
 newredo(){redoModal()},
 rsave(){const t=document.getElementById('m-title').value.trim();if(!t)return;const d=new Date();d.setDate(d.getDate()+1);
  S.redo.push({id:uid(),course:document.getElementById('m-course').value,title:t,stage:0,due:dkey(d)});save();close();render()},
 rok(el){const r=S.redo.find(x=>x.id===el.dataset.id);if(r.stage>=STAGES.length-1){S.redo=S.redo.filter(x=>x!==r)}else{r.stage++;const d=new Date();d.setDate(d.getDate()+STAGES[r.stage]);r.due=dkey(d)}save();render()},
 rko(el){const r=S.redo.find(x=>x.id===el.dataset.id);r.stage=0;const d=new Date();d.setDate(d.getDate()+1);r.due=dkey(d);save();render()},
 rdel(el){S.redo=S.redo.filter(x=>x.id!==el.dataset.id);save();render()},
 newdl(){dlModal()},
 dlsave(){const t=document.getElementById('m-title').value.trim(),w=document.getElementById('m-when').value;if(!t||!w)return;
  S.deadlines.push({id:uid(),course:document.getElementById('m-course').value,title:t,when:w});save();close();render()},
 dldel(el){S.deadlines=S.deadlines.filter(x=>x.id!==el.dataset.id);save();render()},
 notif(){askNotif()},
 export(){const b=new Blob([JSON.stringify(S,null,1)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='lingnan-cc-backup-'+today()+'.json';a.click()},
 reset(){if(confirm('Erase ALL data on this device?')){localStorage.removeItem(KEY);S=load();render()}}
};
document.addEventListener('click',e=>{
 const nb=e.target.closest('[data-v]');if(nb){view=nb.dataset.v;render();window.scrollTo(0,0);return}
 const tb=e.target.closest('#theme [data-t]');if(tb){setTheme(tb.dataset.t);return}
 const el=e.target.closest('[data-act]');if(el&&A[el.dataset.act]&&!['SELECT','INPUT'].includes(el.tagName))A[el.dataset.act](el);
});
document.addEventListener('change',e=>{
 const el=e.target;
 if(el.id==='imp'){const f=el.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);localStorage.setItem(KEY,JSON.stringify(d));S=load();render();alert('Backup imported.')}catch(x){alert('Invalid file.')}};r.readAsText(f);return}
 const a=el.dataset&&el.dataset.act;if(!a)return;
 if(a==='target'){S.settings.target[el.dataset.id]=el.value;save();render()}
 if(a==='daily'){S.settings.daily=+el.value||4;save()}
 if(a==='weekly'){S.settings.weekly=+el.value||24;save()}
 if(a==='quota'){S.settings.quota[el.dataset.d]=Math.max(0,+el.value||0);save()}
 if(a==='conf'){S.settings.confidence[el.dataset.id]=+el.value;save();render()}
});
M.addEventListener('click',e=>{if(e.target===M)close()});

/* ---------- ticking ---------- */
function tick(){
 if(S.active){
  const el=activeSecs();
  if(S.active.mode==='block'){
   if(el>=WORK&&!S.active.alerted){S.active.alerted=true;save();ping();render();return}
   const t=document.getElementById('timer');if(t&&el<WORK)t.textContent=fmtMS(WORK-el);
   const b=document.getElementById('tbar');if(b)b.style.width=Math.min(100,el/WORK*100)+'%';
  }else{const t=document.getElementById('timer');if(t)t.textContent=fmtHMS(el)}
 }else if(S.brk){
  const left=(S.brk.until-Date.now())/1000;
  if(left<=0){S.brk=null;save();ping();if(view==='today')render()}
  else{const b=document.getElementById('brk');if(b)b.textContent=fmtMS(left)}
 }
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden){render();if(S.active)keepAwake(true)}});

setTheme(S.settings.theme);
render();
setInterval(tick,1000);
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
