'use strict';
const KEY='lu-command-center-v1';
const COURSES=[
 {id:'BUS1103',name:'Financial Accounting',short:'Accounting',color:'#22b07d'},
 {id:'BUS2108',name:'Global Business Environment',short:'GBE',color:'#f5a524'},
 {id:'BUS2205',name:'Marketing Management',short:'Marketing',color:'#ec5f9b'},
 {id:'BUS2105',name:'Microeconomics',short:'Micro',color:'#5b9bf5'},
 {id:'BUS2202',name:'Organisational Behaviour',short:'OB',color:'#a06bf0'}
];
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
const uid=()=>Math.random().toString(36).slice(2,10);
const dkey=d=>new Date(d).toLocaleDateString('sv');
const today=()=>dkey(Date.now());
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const C=id=>COURSES.find(c=>c.id===id)||{id,short:'All',name:'All courses',color:'#8d93a8'};
const fmt=m=>{m=Math.round(m);return Math.floor(m/60)+' h '+String(m%60).padStart(2,'0')};
const fmtS=s=>{s=Math.max(0,Math.floor(s));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return [h,m,x].map(n=>String(n).padStart(2,'0')).join(':')};

let S=load();
function load(){
 let d={};
 try{d=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
 return Object.assign({
  settings:{daily:4,weekly:20,theme:'auto',target:{BUS1103:'A-',BUS2108:'A-',BUS2205:'A-',BUS2105:'A-',BUS2202:'A-'},confidence:{BUS1103:0,BUS2108:0,BUS2205:0,BUS2105:0,BUS2202:0}},
  sessions:[],priorities:{},redo:[],deadlines:DEADLINES,active:null,draft:[],course:'BUS1103',planDone:{},tw:0
 },d,{settings:Object.assign({daily:4,weekly:20,theme:'auto',target:{},confidence:{}},d.settings||{})});
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}

let view='today',tick=null;
const VIEWS=[['today','Today','◎'],['timetable','Timetable','▤'],['redo','Exercises to redo','↻'],['plan','Planning','▦'],['sessions','Sessions','☰'],['progress','Progress','▲'],['data','Data','⚙']];
const SHORT={today:'Today',timetable:'Week',redo:'Redo',plan:'Dates',sessions:'Sessions',progress:'Progress',data:'Data'};

function setTheme(t){S.settings.theme=t;document.documentElement.dataset.theme=t;save();
 document.querySelectorAll('#theme button').forEach(b=>b.classList.toggle('on',b.dataset.t===t))}

function nav(){
 const mk=(f)=>VIEWS.map(([k,l,i])=>f(k,l,i)).join('');
 document.getElementById('nav').innerHTML=mk((k,l)=>`<button data-v="${k}" class="${view===k?'on':''}">${l}</button>`);
 document.getElementById('bnav').innerHTML=mk((k,l,i)=>`<button data-v="${k}" class="${view===k?'on':''}"><b>${i}</b>${SHORT[k]}</button>`);
}

/* ---------- time helpers ---------- */
function minsOn(day,course){return S.sessions.filter(s=>dkey(s.start)===day&&(!course||s.course===course)).reduce((a,s)=>a+s.minutes,0)}
function weekStart(d=new Date()){const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return x}
function weekDays(){const w=weekStart();return [...Array(7)].map((_,i)=>{const d=new Date(w);d.setDate(w.getDate()+i);return dkey(d)})}
function weekMins(){const ds=weekDays();return ds.reduce((a,d)=>a+minsOn(d),0)}
function isoWeek(d=new Date()){const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const n=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-n);const y=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t-y)/864e5+1)/7)}
function streak(){let n=0,d=new Date();if(!minsOn(dkey(d)))d.setDate(d.getDate()-1);while(minsOn(dkey(d))>0){n++;d.setDate(d.getDate()-1)}return n}
function activeSecs(){return S.active?(Date.now()-S.active.startTs)/1000:0}
function nextDeadline(course){const now=Date.now();return S.deadlines.filter(d=>(d.course===course||d.course==='ALL')&&new Date(d.when)>now).sort((a,b)=>new Date(a.when)-new Date(b.when))[0]}
function countdown(when){const ms=new Date(when)-Date.now();if(ms<0)return'passed';const d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5);return d>0?`${d} d ${h} h`:`${h} h`}
function urgent(when){const ms=new Date(when)-Date.now();return ms>0&&ms<4*864e5}

/* ---------- views ---------- */
function header(sub,title){
 const t=minsOn(today());
 return `<div class="head"><div><small>${sub}</small><h2>${title}</h2></div>
 <div class="kpis"><div class="kpi"><b id="kt">${fmt(t+Math.floor(activeSecs()/60))}</b><span>Today / ${S.settings.daily} h</span></div>
 <div class="kpi"><b>${fmt(weekMins())}</b><span>Week / ${S.settings.weekly} h</span></div></div></div>`;
}
function vToday(){
 const d=new Date();const day=today();
 const title=d.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'});
 const c=S.active?S.active.course:S.course;
 const objs=S.active?S.active.objectives:S.draft;
 const tabs=COURSES.map(x=>`<button data-act="course" data-id="${x.id}" class="${c===x.id?'on':''}" ${S.active&&S.active.course!==x.id?'disabled':''}>${x.short}</button>`).join('');
 const ol=objs.map((o,i)=>`<div class="obj ${o.done?'done':''}"><button class="chk ${o.done?'on':''}" data-act="otoggle" data-i="${i}">${o.done?'✓':''}</button><span>${esc(o.t)}</span><button class="x" data-act="odel" data-i="${i}">×</button></div>`).join('');
 const nd=nextDeadline(c);
 const run=S.active?`<div class="timer" id="timer">${fmtS(activeSecs())}</div>
   <div class="row"><button class="btn pri" data-act="stop" style="flex:1">Stop and save session</button><button class="btn" data-act="cancel">Discard</button></div>`
  :`<div class="row"><button class="btn pri" data-act="start">Start session</button><button class="btn link" data-act="manual">Add a finished session</button></div>`;
 const sessToday=S.sessions.filter(s=>dkey(s.start)===day).sort((a,b)=>b.start-a.start);
 const per=COURSES.map(x=>[x,minsOn(day,x.id)]).filter(a=>a[1]>0);
 const pr=S.priorities[day]||[];
 const prh=pr.map((p,i)=>`<div class="pri-row ${p.done?'done':''}"><span class="n">${i+1}</span><span>${esc(p.t)}</span><button class="btn sm ${p.done?'':'pri'}" data-act="ptoggle" data-i="${i}">${p.done?'Undo':'Done'}</button><button class="x" data-act="pdel" data-i="${i}">×</button></div>`).join('');
 const due=S.redo.filter(r=>r.due<=day);
 const g=S.settings.daily*60,pct=Math.min(100,minsOn(day)/g*100);
 return header(`WEEK ${isoWeek()} · TARGET ${S.settings.target[c]||'A-'}`,title)+`<div class="grid"><div class="col">
 <div class="card"><div class="card-h"><h3>Deep work session</h3><span class="mute small">${nd?`${esc(nd.title)} in ${countdown(nd.when)}`:'free timer'}</span></div>
  <div class="tabs">${tabs}</div>
  <div class="mute small" style="margin-bottom:6px">Session goals · ${objs.filter(o=>o.done).length}/${objs.length}</div>${ol}
  <div class="row" style="margin:14px 0"><input type="text" id="newobj" placeholder="e.g. Ch. 6: redo E6-3 without the solution"><button class="btn" data-act="oadd">Add</button></div>${run}</div>
 ${plannedCard(day)}
 <div class="card"><div class="card-h"><h3>Exercises to redo</h3><button class="btn sm" data-act="newredo">New exercise</button></div>
  ${due.length?due.map(r=>redoRow(r)).join(''):'<p class="mute">Nothing to redo today.</p>'}</div>
 <div class="card"><div class="card-h"><h3>Three priorities</h3><span class="mute">${pr.filter(p=>p.done).length}/${pr.length}</span></div>${prh}
  ${pr.length<3?`<div class="row" style="margin-top:12px"><input type="text" id="newpri" placeholder="Priority #${pr.length+1}"><button class="btn" data-act="padd">Add</button></div>`:''}</div>
 </div><div class="col"><div class="card"><div class="card-h"><h3>Today's hours</h3><button class="btn sm" data-act="manual">Add a finished session</button></div>
  <div class="big">${fmt(minsOn(day))}</div><div class="bar"><i style="width:${pct}%"></i></div><div class="mute small" style="margin:6px 0 12px">Goal ${S.settings.daily} h</div>
  ${per.map(([x,m])=>`<div class="line"><span><i class="dot" style="background:${x.color}"></i>${x.short}</span><b>${fmt(m)}</b></div>`).join('')}
  ${sessToday.map(sessRow).join('')||'<p class="mute small">No session yet. Start one!</p>'}</div></div></div>`;
}
function sessRow(s){const x=C(s.course);
 return `<div class="sess"><div class="row sp"><div><i class="dot" style="background:${x.color}"></i><b>${x.short}</b> <span style="font-family:ui-monospace,monospace">${fmt(s.minutes)}</span>
 <p>${new Date(s.start).toLocaleString('en-GB',{weekday:'long',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})} · ${s.mode==='manual'?'manual entry':'deep work'} · goals ${s.objectives.filter(o=>o.done).length}/${s.objectives.length}</p>
 ${s.objectives.map(o=>`<p>${o.done?'✓':'○'} ${esc(o.t)}</p>`).join('')}</div>
 <div class="row"><button class="btn sm" data-act="sedit" data-id="${s.id}">Edit</button><button class="btn sm danger" data-act="sdel" data-id="${s.id}">Delete</button></div></div></div>`;
}
function redoRow(r){const x=C(r.course);
 return `<div class="obj"><span><i class="dot" style="background:${x.color}"></i>${esc(r.title)} <span class="pill">${x.short} · step ${r.stage+1}/${STAGES.length}</span></span>
 <button class="btn sm pri" data-act="rok" data-id="${r.id}">Got it</button><button class="btn sm" data-act="rko" data-id="${r.id}">Missed</button><button class="x" data-act="rdel" data-id="${r.id}">×</button></div>`;
}
function vRedo(){
 const day=today();const all=[...S.redo].sort((a,b)=>a.due.localeCompare(b.due));
 return header('SPACED REPETITION','Exercises to redo')+`<div class="card"><div class="card-h"><h3>${all.length} exercises</h3><button class="btn pri sm" data-act="newredo">New exercise</button></div>
 <p class="mute small" style="margin-bottom:10px">"Got it" pushes the exercise to the next interval (1, 3, 7, 14, 30 days). "Missed" brings it back tomorrow.</p>
 ${all.map(r=>`<div class="line"><span>${redoTitle(r)}</span><span class="row"><span class="pill ${r.due<=day?'urgent':''}">${r.due<=day?'due today':r.due}</span>
 <button class="x" data-act="rdel" data-id="${r.id}">×</button></span></div>`).join('')||'<p class="mute">Empty. Add the exercises you got wrong.</p>'}</div>`;
}
function redoTitle(r){const x=C(r.course);return `<i class="dot" style="background:${x.color}"></i>${esc(r.title)} <span class="mute small">${x.short}</span>`}
function vPlan(){
 const list=[...S.deadlines].sort((a,b)=>new Date(a.when)-new Date(b.when));
 return header('COUNTDOWNS','Planning')+`<div class="card"><div class="card-h"><h3>Deadlines and exams</h3><button class="btn sm" data-act="newdl">Add</button></div>
 ${list.map(d=>{const x=C(d.course);const past=new Date(d.when)<Date.now();
 return `<div class="line" style="${past?'opacity:.45':''}"><span><i class="dot" style="background:${x.color}"></i>${esc(d.title)}<br><span class="mute small">${x.id} · ${new Date(d.when).toLocaleString('en-GB',{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</span></span>
 <span class="row"><span class="pill ${urgent(d.when)?'urgent':''}">${countdown(d.when)}</span><button class="x" data-act="dldel" data-id="${d.id}">×</button></span></div>`}).join('')}</div>
 <div class="card" style="margin-top:20px"><h3 style="margin-bottom:6px">Suggested split for today</h3><p class="mute small" style="margin-bottom:10px">Based on the next deadline of each course (closer = more time).</p>${suggest()}</div>`;
}
function suggest(){
 const w=COURSES.map(c=>{const d=nextDeadline(c.id);const days=d?Math.max(1,(new Date(d.when)-Date.now())/864e5):60;return [c,1/days,d]});
 const tot=w.reduce((a,x)=>a+x[1],0);
 return w.sort((a,b)=>b[1]-a[1]).map(([c,v,d])=>{const m=Math.round(v/tot*S.settings.daily*60/5)*5;
 return `<div class="line"><span><i class="dot" style="background:${c.color}"></i>${c.short}${d?` <span class="mute small">→ ${esc(d.title)}</span>`:''}</span><b>${fmt(m)}</b></div>`}).join('');
}
function vSessions(){
 const all=[...S.sessions].sort((a,b)=>b.start-a.start);
 return header('HISTORY','Sessions')+`<div class="card"><div class="card-h"><h3>${all.length} sessions</h3><button class="btn sm" data-act="manual">Add</button></div>${all.map(sessRow).join('')||'<p class="mute">No session yet.</p>'}</div>`;
}
function vProgress(){
 const ds=weekDays();const maxM=Math.max(S.settings.daily*60,...ds.map(d=>minsOn(d)));
 const bars=ds.map(d=>{const label=new Date(d+'T12:00').toLocaleDateString('en-GB',{weekday:'short'});
  const segs=COURSES.map(c=>{const m=minsOn(d,c.id);return m?`<div style="height:${m/maxM*140}px;background:${c.color}"></div>`:''}).join('');
  return `<div class="day"><div class="stack">${segs}</div><span class="mute small">${label}</span><span class="small">${minsOn(d)?fmt(minsOn(d)):'–'}</span></div>`}).join('');
 const wk=weekMins();
 const rows=COURSES.map(c=>{const m=ds.reduce((a,d)=>a+minsOn(d,c.id),0);const tot=S.sessions.filter(s=>s.course===c.id).reduce((a,s)=>a+s.minutes,0);
  const conf=S.settings.confidence[c.id]||0;const nd=nextDeadline(c.id);
  return `<div class="card"><div class="row sp"><h3><i class="dot" style="background:${c.color}"></i>${c.short}</h3><span class="mute small">${nd?esc(nd.title)+' · '+countdown(nd.when):''}</span></div>
  <div class="row sp small mute" style="margin:8px 0"><span>This week ${fmt(m)}</span><span>Total ${fmt(tot)}</span></div>
  <div class="row"><div class="field" style="flex:1;margin:0"><label>Target grade</label><select data-act="target" data-id="${c.id}">${GRADES.map(g=>`<option ${S.settings.target[c.id]===g?'selected':''}>${g}</option>`).join('')}</select></div>
  <div class="field" style="flex:2;margin:0"><label>Confidence ${conf}%</label><input type="range" min="0" max="100" step="5" value="${conf}" data-act="conf" data-id="${c.id}"></div></div></div>`}).join('');
 return header('THIS WEEK','Progress')+`<div class="grid"><div class="col"><div class="card"><div class="card-h"><h3>Hours per day</h3><span class="mute small">goal ${S.settings.daily} h/day</span></div><div class="days">${bars}</div>
 <div class="bar"><i style="width:${Math.min(100,wk/(S.settings.weekly*60)*100)}%"></i></div><p class="mute small" style="margin-top:6px">${fmt(wk)} of ${S.settings.weekly} h this week</p></div>
 <div class="card"><h3>Streak</h3><div class="big">${streak()} day${streak()===1?'':'s'}</div><p class="mute small">Consecutive days with at least one session.</p></div></div>
 <div class="col">${rows}</div></div>`;
}
function vData(){
 return header('SETTINGS','Data')+`<div class="card"><div class="field"><label>Daily hours goal</label><input type="number" step="0.5" min="1" max="12" value="${S.settings.daily}" data-act="daily"></div>
 <div class="field"><label>Weekly hours goal</label><input type="number" step="1" min="1" max="80" value="${S.settings.weekly}" data-act="weekly"></div>
 <div class="row"><button class="btn pri" data-act="export">Export backup (JSON)</button><label class="btn">Import backup<input type="file" accept=".json" id="imp" hidden></label></div>
 <p class="mute small" style="margin-top:14px">Data stays on this device. Export regularly, and use the same file to move data from laptop to phone.</p>
 <div style="margin-top:18px"><button class="btn danger" data-act="reset">Erase everything</button></div></div>`;
}

/* ---------- study timetable ---------- */
const KIND={L:'Lesson',E:'Exercises',M:'Mock / review',A:'Assignment'};
function planAll(){return (typeof PLAN!=='undefined')?PLAN:[]}
function planItems(day){return planAll().filter(p=>p.date===day)}
function planRow(p){const x=C(p.course);const done=!!S.planDone[p.id];
 return `<div class="obj ${done?'done':''}"><button class="chk ${done?'on':''}" data-act="pdone" data-id="${p.id}">${done?'✓':''}</button>
 <span><span class="mute small">${p.start}–${p.end}</span> <i class="dot" style="background:${x.color}"></i>${esc(p.title)} <span class="pill">${KIND[p.kind]||''}</span></span>
 ${done?'':`<button class="btn sm" data-act="pstart" data-id="${p.id}">Start</button>`}</div>`}
function plannedCard(day){const it=planItems(day);
 const dn=it.filter(p=>S.planDone[p.id]).length;
 return `<div class="card"><div class="card-h"><h3>Planned today</h3><span class="mute small">${dn}/${it.length} blocks</span></div>
 ${it.length?it.map(planRow).join(''):'<p class="mute">Nothing planned today. Rest or catch up.</p>'}
 <p class="mute small" style="margin-top:10px">Each block = 50 min work + 15 min break.</p></div>`}
function vTimetable(){
 const off=S.tw||0;const ws=weekStart();ws.setDate(ws.getDate()+off*7);
 const days=[...Array(7)].map((_,i)=>{const d=new Date(ws);d.setDate(ws.getDate()+i);return dkey(d)});
 const all=days.flatMap(planItems);const dn=all.filter(p=>S.planDone[p.id]).length;
 const rows=days.map(d=>{const it=planItems(d);const dt=new Date(d+'T12:00');
  const lab=dt.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'});
  const dls=S.deadlines.filter(x=>String(x.when).slice(0,10)===d).map(x=>`<span class="pill urgent" style="margin-right:6px">${esc(C(x.course).short)} · ${esc(x.title)}</span>`).join('');
  const dd=it.filter(p=>S.planDone[p.id]).length;
  const empty=dt.getDay()===2?'Rest day.':'No block planned.';
  return `<div class="card"><div class="card-h"><h3>${lab}${d===today()?' · today':''}</h3><span class="mute small">${it.length?dd+'/'+it.length+' blocks':''}</span></div>
  ${dls?`<div style="margin-bottom:8px">${dls}</div>`:''}${it.length?it.map(planRow).join(''):`<p class="mute small">${empty}</p>`}</div>`}).join('');
 const per=COURSES.map(c=>[c,all.filter(p=>p.course===c.id).length]).filter(a=>a[1]);
 return header('50 MIN WORK + 15 MIN BREAK','Timetable')+`<div class="card" style="margin-bottom:20px">
 <div class="row sp"><button class="btn sm" data-act="tprev">← Previous</button><button class="btn sm" data-act="tnow">This week</button><button class="btn sm" data-act="tnext">Next →</button></div>
 <p class="mute small" style="margin:12px 0 6px">${days[0].slice(5)} to ${days[6].slice(5)} · ${dn}/${all.length} blocks done</p>
 <div class="bar"><i style="width:${all.length?dn/all.length*100:0}%"></i></div>
 <div style="margin-top:10px">${per.map(([c,n])=>`<span class="pill" style="margin-right:6px"><i class="dot" style="background:${c.color}"></i>${c.short} ${n}</span>`).join('')}</div></div>
 <div class="col">${rows}</div>`;
}
const VMAP={today:vToday,timetable:vTimetable,redo:vRedo,plan:vPlan,sessions:vSessions,progress:vProgress,data:vData};
function render(keepFocus){
 const f=document.activeElement;const id=f&&f.id;const val=f&&f.value;
 nav();document.getElementById('main').innerHTML=VMAP[view]();
 if(keepFocus&&id){const n=document.getElementById(id);if(n){n.value=val;n.focus()}}
 clearInterval(tick);
 if(S.active)tick=setInterval(()=>{const t=document.getElementById('timer');if(t)t.textContent=fmtS(activeSecs());
  const k=document.getElementById('kt');if(k)k.textContent=fmt(minsOn(today())+Math.floor(activeSecs()/60))},1000);
}

/* ---------- modals ---------- */
const M=document.getElementById('modal');
function modal(html){M.innerHTML=`<div class="box">${html}</div>`;M.classList.remove('hidden')}
function close(){M.classList.add('hidden');M.innerHTML=''}
const courseSel=(v)=>`<select id="m-course">${COURSES.map(c=>`<option value="${c.id}" ${c.id===v?'selected':''}>${c.id} · ${c.short}</option>`).join('')}</select>`;
const localDT=ms=>{const d=new Date(ms-new Date(ms).getTimezoneOffset()*6e4);return d.toISOString().slice(0,16)};
function sessionModal(s){
 const e=!!s;s=s||{course:S.course,start:Date.now()-3600e3,minutes:60,objectives:[]};
 modal(`<h3>${e?'Edit session':'Add a finished session'}</h3>
 <div class="field"><label>Course</label>${courseSel(s.course)}</div>
 <div class="field"><label>Start</label><input type="datetime-local" id="m-start" value="${localDT(s.start)}"></div>
 <div class="field"><label>Duration (minutes)</label><input type="number" id="m-min" value="${Math.round(s.minutes)}" min="1"></div>
 <div class="field"><label>Goals (one per line, prefix ✓ if done)</label><textarea id="m-obj" rows="4" style="width:100%;background:var(--panel2);border:1px solid var(--line);border-radius:10px;padding:10px;color:inherit">${esc(s.objectives.map(o=>(o.done?'✓ ':'')+o.t).join('\n'))}</textarea></div>
 <div class="row"><button class="btn pri" data-act="msave" data-id="${e?s.id:''}">Save</button><button class="btn" data-act="mclose">Cancel</button></div>`);
}
function redoModal(){modal(`<h3>New exercise to redo</h3><div class="field"><label>Course</label>${courseSel(S.course)}</div>
 <div class="field"><label>Exercise</label><input type="text" id="m-title" placeholder="e.g. E6-3 sales returns"></div>
 <div class="row"><button class="btn pri" data-act="rsave">Add</button><button class="btn" data-act="mclose">Cancel</button></div>`)}
function dlModal(){modal(`<h3>New deadline</h3><div class="field"><label>Course</label><select id="m-course">${COURSES.map(c=>`<option value="${c.id}">${c.id} · ${c.short}</option>`).join('')}<option value="ALL">All courses</option></select></div>
 <div class="field"><label>Title</label><input type="text" id="m-title"></div><div class="field"><label>Date and time</label><input type="datetime-local" id="m-when"></div>
 <div class="row"><button class="btn pri" data-act="dlsave">Add</button><button class="btn" data-act="mclose">Cancel</button></div>`)}

/* ---------- actions ---------- */
const A={
 pdone(el){S.planDone[el.dataset.id]=!S.planDone[el.dataset.id];save();render()},
 pstart(el){const p=planAll().find(x=>x.id===el.dataset.id);if(!p)return;const o={t:p.title,done:false};
  if(S.active){S.active.objectives.push(o)}else{S.course=p.course;S.draft.push(o)}
  view='today';render();window.scrollTo(0,0);save()},
 tprev(){S.tw=(S.tw||0)-1;save();render()},
 tnext(){S.tw=(S.tw||0)+1;save();render()},
 tnow(){S.tw=0;save();render()},
 course(el){S.course=el.dataset.id;save();render()},
 oadd(){const i=document.getElementById('newobj');const t=i.value.trim();if(!t)return;(S.active?S.active.objectives:S.draft).push({t,done:false});save();render()},
 otoggle(el){const o=(S.active?S.active.objectives:S.draft)[+el.dataset.i];o.done=!o.done;save();render()},
 odel(el){(S.active?S.active.objectives:S.draft).splice(+el.dataset.i,1);save();render()},
 start(){S.active={course:S.course,startTs:Date.now(),objectives:S.draft.slice()};S.draft=[];save();render()},
 stop(){const a=S.active;const m=(Date.now()-a.startTs)/60000;if(m>=1)S.sessions.push({id:uid(),course:a.course,start:a.startTs,minutes:m,mode:'deep',objectives:a.objectives});S.active=null;save();render()},
 cancel(){if(confirm('Discard this running session?')){S.draft=S.active.objectives;S.active=null;save();render()}},
 padd(){const i=document.getElementById('newpri');const t=i.value.trim();if(!t)return;(S.priorities[today()]=S.priorities[today()]||[]).push({t,done:false});save();render()},
 ptoggle(el){const p=S.priorities[today()][+el.dataset.i];p.done=!p.done;save();render()},
 pdel(el){S.priorities[today()].splice(+el.dataset.i,1);save();render()},
 manual(){sessionModal()},
 sedit(el){sessionModal(S.sessions.find(s=>s.id===el.dataset.id))},
 sdel(el){if(confirm('Delete this session?')){S.sessions=S.sessions.filter(s=>s.id!==el.dataset.id);save();render()}},
 msave(el){
  const o=document.getElementById('m-obj').value.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>({t:l.replace(/^✓\s*/,''),done:l.startsWith('✓')}));
  const v={course:document.getElementById('m-course').value,start:new Date(document.getElementById('m-start').value).getTime(),minutes:+document.getElementById('m-min').value||0,objectives:o};
  if(!v.minutes||isNaN(v.start))return;
  if(el.dataset.id){Object.assign(S.sessions.find(s=>s.id===el.dataset.id),v)}else S.sessions.push(Object.assign({id:uid(),mode:'manual'},v));
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
 if(a==='weekly'){S.settings.weekly=+el.value||20;save()}
 if(a==='conf'){S.settings.confidence[el.dataset.id]=+el.value;save();render()}
});
document.addEventListener('keydown',e=>{
 if(e.key!=='Enter')return;
 if(e.target.id==='newobj')A.oadd();
 if(e.target.id==='newpri')A.padd();
});
M.addEventListener('click',e=>{if(e.target===M)close()});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)render()});

setTheme(S.settings.theme);
render();
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
