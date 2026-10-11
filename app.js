'use strict';
/* Lingnan Command Center · Apple-style rebuild
   Today (one big Deep Work button) -> pick lessons -> session screen opens the course page */
const KEY='lu-command-center-v1';
const COURSES=[
 {id:'BUS1103',name:'Financial Accounting',short:'Accounting',color:'var(--s1)',ic:'calc'},
 {id:'BUS2108',name:'Global Business Environment',short:'GBE',color:'var(--s2)',ic:'globe'},
 {id:'BUS2205',name:'Marketing Management',short:'Marketing',color:'var(--s3)',ic:'target'},
 {id:'BUS2105',name:'Microeconomics',short:'Micro',color:'var(--s4)',ic:'trend'},
 {id:'BUS2202',name:'Organisational Behaviour',short:'OB',color:'var(--s5)',ic:'people'}
];
const KINDS={L:{n:'Lesson',color:'var(--s1)',ic:'doc'},E:{n:'Exercises',color:'var(--s2)',ic:'clip'},M:{n:'Mock / review',color:'var(--s3)',ic:'flag'},A:{n:'Assignment',color:'var(--s4)',ic:'pen'},F:{n:'Free work',color:'var(--l2)',ic:'timer'}};
const GRADES=['A+','A','A-','B+','B','B-','C+','C'];
const STAGES=[1,3,7,14,30];
const WORK=50*60,BREAK=10*60;
const WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const uid=()=>Math.random().toString(36).slice(2,10);
const dkey=d=>new Date(d).toLocaleDateString('sv');
const today=()=>dkey(Date.now());
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const md=s=>esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
const C=id=>COURSES.find(c=>c.id===id)||{id,short:'All',name:'All courses',color:'var(--l2)',ic:'book'};
const fmt=m=>{m=Math.round(m);return Math.floor(m/60)+' h '+String(m%60).padStart(2,'0')};
const fmtMS=s=>{s=Math.max(0,Math.ceil(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
const fmtHMS=s=>{s=Math.max(0,Math.floor(s));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return [h,m,x].map(n=>String(n).padStart(2,'0')).join(':')};
const FOCUS={1:'😕',2:'🙂',3:'🔥'};
const $=id=>document.getElementById(id);

/* ---------- icons (custom line icons in the SF Symbols style) ---------- */
const IC={
 play:'<path d="M8 5.3v13.4a.7.7 0 001.05.6l11-6.7a.7.7 0 000-1.2l-11-6.7A.7.7 0 008 5.3z"/>',
 timer:'<circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4.2l2.6 1.6M9.5 3h5"/>',
 book:'<path d="M5 4.5A1.5 1.5 0 016.5 3H19v15H6.5A1.5 1.5 0 005 19.5zM5 19.5A1.5 1.5 0 006.5 21H19v-3"/>',
 cal:'<rect x="3.5" y="5" width="17" height="15.5" rx="3.2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
 chart:'<path d="M6 20v-8M12 20V5M18 20v-5" stroke-width="2.6"/>',
 more:'<circle cx="12" cy="12" r="9"/><path d="M8 12h.01M12 12h.01M16 12h.01" stroke-width="2.8"/>',
 check:'<path d="M5.5 12.5l4.2 4.2L18.5 7.5"/>',
 chev:'<path d="M9.5 5.5L16 12l-6.5 6.5"/>',
 chevl:'<path d="M14.5 5.5L8 12l6.5 6.5"/>',
 chevd:'<path d="M5.5 9.5L12 16l6.5-6.5"/>',
 x:'<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 doc:'<path d="M7 3h7l4.5 4.5V20a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z"/><path d="M14 3v4.5h4.5M9 12.5h6M9 16h6"/>',
 cards:'<rect x="3.5" y="7" width="13" height="13" rx="2.5"/><path d="M7.5 4h11a2 2 0 012 2v11"/>',
 clip:'<rect x="5" y="4.5" width="14" height="16.5" rx="3"/><path d="M9 3.5h6v3H9zM9 12h6M9 16h3.5"/>',
 flag:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.2"/>',
 target:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r=".6"/>',
 pen:'<path d="M4.5 19.5l.9-4L16.8 4.2a1.7 1.7 0 012.4 0l.6.6a1.7 1.7 0 010 2.4L8.5 18.6z"/>',
 calc:'<rect x="5" y="3" width="14" height="18" rx="3"/><path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" stroke-width="2.4"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
 trend:'<path d="M3.5 17l5.5-6 4 4 7-8M15.5 7H20.5V12"/>',
 people:'<circle cx="9" cy="8.5" r="3"/><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M16 5.8a3 3 0 010 5.4M18.5 14c1.6.7 2.5 2.3 2.5 4.5"/>',
 flame:'<path d="M12 3c1 3.5 5.5 5.5 5.5 10.2a5.5 5.5 0 01-11 0c0-2.2 1-3.4 2.2-4.4.2 1.4.9 2.2 2 2.4-.6-3 0-5.2 1.3-8.2z"/>',
 redo:'<path d="M20 12a8 8 0 11-2.4-5.7M20 4v4.6h-4.6"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
 cap:'<path d="M2.5 9.5L12 5l9.5 4.5L12 14zM6.5 11.8V16c0 1 2.5 2.5 5.5 2.5s5.5-1.5 5.5-2.5v-4.2"/>',
 cup:'<path d="M5 9h11v5a4 4 0 01-4 4H9a4 4 0 01-4-4zM16 10h1.5a2.5 2.5 0 010 5H16M8 3.5v2M12 3.5v2"/>',
 sync:'<path d="M4 12a8 8 0 0113.7-5.6L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 01-13.7 5.6L4 15.5M4 20v-4.5h4.5"/>',
 down:'<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8h.01" stroke-width="2.4"/>'
};
const FILLED=new Set(['play']);
const ic=(n,extra='')=>`<svg class="ic ${FILLED.has(n)?'f':''} ${extra}" viewBox="0 0 24 24" aria-hidden="true">${IC[n]||''}</svg>`;

/* ---------- state ---------- */
function mergeDl(saved,hide){
 hide=hide||{};const off=new Set(DEADLINES.map(x=>x.id));
 const out=DEADLINES.filter(x=>!hide[x.id]).map(x=>Object.assign({},x,{off:1}));
 (saved||[]).forEach(x=>{if(!off.has(x.id)&&!x.off)out.push(x)});
 return out;
}
let S=load();
function load(){
 let d={};
 try{d=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
 const st=Object.assign({daily:4,weekly:24,theme:'auto',target:{},confidence:{},quota:{0:6,1:3,2:0,3:6,4:6,5:6,6:6}},d.settings||{});
 if(st.weekly===20)st.weekly=24;
 COURSES.forEach(c=>{if(!st.target[c.id])st.target[c.id]='A-';if(st.confidence[c.id]==null)st.confidence[c.id]=0});
 const s=Object.assign({sessions:[],redo:[],deadlines:[],active:null,course:'BUS1103',planDone:{},extraPlan:[],brk:null,auto:{},mod:0,reads:[],mast:{},cards:{},xcards:[],flags:{}},d,{settings:st});
 if(!s.mig2){const q=st.quota;Object.keys(q).forEach(k=>{if(q[k]===5)q[k]=6});s.extraPlan=(s.extraPlan||[]).filter(p=>!(p.course==='BUS2202'&&p.lid&&!(s.planDone||{})[p.id]));Object.keys(s.auto||{}).forEach(k=>{if(k.indexOf('BUS2202:')===0)delete s.auto[k]});s.mig2=1}
 s.dlHide=s.dlHide||{};s.deadlines=mergeDl(s.deadlines,s.dlHide);
 if(s.active&&s.active.mode==='block'&&!s.active.items){s.active.items=[s.active.planId];s.active.cur=s.active.planId;s.active.tab='lesson'}
 return s;
}
function save(){S.mod=Date.now();try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}if(typeof schedulePush==='function')schedulePush()}

let view='today',param=null,hist=[],insR='d',insBy='course',lTab='lesson',wakeLock=null,sessOpen=false,P=null;
const TABS=[['today','Today','timer'],['courses','Courses','book'],['cards','Cards','cards'],['timetable','Week','cal'],['insights','Insights','chart'],['more','More','more']];
const SUB=['redo','plan','sessions','targets','data'];
function tabOn(k){return view===k||(k==='cards'&&view==='study')||(k==='courses'&&(view==='course'||view==='lesson'))||(k==='more'&&SUB.includes(view))}
function setTheme(t){S.settings.theme=t;document.documentElement.dataset.theme=t;save()}
function tabbar(){$('tabbar').innerHTML=TABS.map(([k,l,i])=>`<button data-tab="${k}" class="${tabOn(k)?'on':''}" aria-label="${l}">${ic(i)}<span>${l}</span></button>`).join('')}

/* ---------- time helpers ---------- */
function minsOn(day,course){return S.sessions.filter(s=>dkey(s.start)===day&&(!course||s.course===course)).reduce((a,s)=>a+s.minutes,0)}
const mastOf=id=>S.mast&&S.mast[id]?S.mast[id].p:null;
const mastTxt=id=>{const m=mastOf(id);return m==null?'':' · '+m+'%'};
function readMin(day,course){return Math.floor(S.reads.filter(r=>r.day===day&&(!course||r.course===course)).reduce((a,r)=>a+r.sec,0)/60)}
function weekStart(d=new Date()){const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return x}
function weekDays(off=0){const w=weekStart();w.setDate(w.getDate()+off*7);return [...Array(7)].map((_,i)=>{const d=new Date(w);d.setDate(w.getDate()+i);return dkey(d)})}
function streak(){let n=0,d=new Date();if(!minsOn(dkey(d)))d.setDate(d.getDate()-1);while(minsOn(dkey(d))>0){n++;d.setDate(d.getDate()-1)}return n}
function activeSecs(){const a=S.active;return a?((a.endTs||a.pausedAt||Date.now())-a.startTs-(a.pms||0))/1000:0}
function nextDeadline(course){const now=Date.now();return S.deadlines.filter(d=>(d.course===course||d.course==='ALL')&&new Date(d.when)>now).sort((a,b)=>new Date(a.when)-new Date(b.when))[0]}
function countdown(when){const ms=new Date(when)-Date.now();if(ms<0)return'passed';const d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5);return d>0?`${d} d ${h} h`:`${h} h`}
function urgent(when){const ms=new Date(when)-Date.now();return ms>0&&ms<4*864e5}
function whenLabel(date){
 const t=today();if(date===t)return'Today';
 const tm=new Date();tm.setDate(tm.getDate()+1);if(date===dkey(tm))return'Tomorrow';
 const l=new Date(date+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});
 return date<t?'Overdue · '+l:l;
}

/* ---------- plan, lessons, "most behind" ---------- */
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
const cleanTitle=t=>String(t).replace(/\s*·\s*official.*$/,'').replace(/\s*\(\d\/\d\)\s*$/,'').replace(/^Ch\.[\d\-& ]+\s*·\s*/,'').replace(/\s*·\s*exercises$/,'');
const noOff=t=>String(t).replace(/\s*·\s*official.*$/,'');
const shortTitle=t=>noOff(t).replace(/\s*\(\d\/\d\)\s*$/,'');
const pLids=p=>p.lids||(p.lid?[p.lid]:[]);
function lessonsOf(course){
 const m=new Map();
 planAll().filter(p=>p.course===course).sort((a,b)=>a.date.localeCompare(b.date)).forEach(p=>{
  pLids(p).forEach(lid=>{
   if(!m.has(lid))m.set(lid,{id:lid,course,num:lid.split(':')[1],title:null,L:[],E:[]});
   const l=m.get(lid);(p.kind==='L'?l.L:l.E).push(p);
   if(p.kind==='L'&&!l.title)l.title=cleanTitle(p.title);
  });
 });
 const doc=courseDoc(course);
 if(doc&&doc.lessons)Object.keys(doc.lessons).forEach(num=>{const id=course+':'+num;if(!m.has(id))m.set(id,{id,course,num,title:doc.lessons[num].title,L:[],E:[],unplanned:true})});
 const rank=l=>/^\d+$/.test(l.num)?+l.num:/^x/.test(l.num)?900:500;
 return [...m.values()].map(l=>{if(!l.title)l.title=(/^\d+$/.test(l.num)?'Chapter '+l.num:'Lesson');return l}).sort((a,b)=>rank(a)-rank(b));
}
const lessonName=l=>(/^\d+$/.test(l.num)?'Ch.'+l.num+' · ':'')+l.title;
function lessonProg(l){const n=(a)=>a.filter(p=>S.planDone[p.id]).length;return {Lt:l.L.length,Ld:n(l.L),Et:l.E.length,Ed:n(l.E)}}
function courseStat(cid){
 const t=today(),b=planAll().filter(p=>p.course===cid),nd=nextDeadline(cid),ndDay=nd?dkey(nd.when):null;
 const over=b.filter(p=>p.date<t&&!S.planDone[p.id]).length;
 const rem=b.filter(p=>!S.planDone[p.id]&&(!ndDay||p.date<=ndDay)).length;
 const days=nd?Math.max(1,Math.ceil((new Date(nd.when)-Date.now())/864e5)):30;
 return {over,rem,nd,pressure:rem/days,done:b.filter(p=>S.planDone[p.id]).length,total:b.length};
}
/* the course you are most behind on, and the block to start with */
function suggest(){
 const st=COURSES.map(c=>Object.assign({c},courseStat(c.id)));
 const behind=st.filter(x=>x.over>0).sort((a,b)=>b.over-a.over||b.pressure-a.pressure)[0];
 if(behind){
  const it=planAll().filter(p=>p.course===behind.c.id&&!S.planDone[p.id]).sort((a,b)=>a.date.localeCompare(b.date))[0];
  return {course:behind.c.id,item:it,why:`${behind.over} block${behind.over>1?'s':''} behind schedule`,behind:true};
 }
 const nb=nextBlock();
 if(!nb)return null;
 const s=courseStat(nb.course);
 return {course:nb.course,item:nb,why:nb.date===today()?"On today's plan":(s.nd?`${s.nd.title} in ${countdown(s.nd.when)}`:'Next in your plan'),behind:false};
}
function pickItems(cid){
 return planAll().filter(p=>p.course===cid&&!S.planDone[p.id]).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,14);
}

/* ---------- content from the Word files ---------- */
function courseDoc(cid){return (typeof CONTENT!=='undefined'&&CONTENT.courses&&CONTENT.courses[cid])||null}
function blocksHtml(arr,ctx){
 let out='',ul=false,ti=0;
 for(const b of arr){
  if(b.t!=='li'&&ul){out+='</ul>';ul=false}
  if(b.t==='h')out+=b.l<=2?`<h4>${md(b.x)}</h4>`:`<h5>${md(b.x)}</h5>`;
  else if(b.t==='p')out+=`<p>${md(b.x)}</p>`;
  else if(b.t==='li'){if(!ul){out+='<ul>';ul=true}out+=`<li>${md(b.x)}</li>`}
  else if(b.t==='a')out+=`<details><summary>Show answer</summary>${String(b.x).split('\n').map(s=>`<p>${md(s)}</p>`).join('')}</details>`;
  else if(b.t==='table'){out+=`<div class="tw"><table>${b.rows.map(r=>`<tr>${r.map(c=>`<td>${md(c)}</td>`).join('')}</tr>`).join('')}</table></div>`;if(ctx&&tPractical(b.rows))out+=`<button class="btn tint sm tprac" data-act="tpractice" data-lid="${ctx.lid}" data-k="${ctx.k}" data-i="${ti}">${ic('clip')} Fill it in from memory · ~${tMins(b.rows)} min</button>`;ti++}
 }
 return out+(ul?'</ul>':'');
}
function syncLine(cid){
 const d=courseDoc(cid);
 if(!d||!d.file)return'No Word file linked';
 const n=Object.keys(d.lessons||{}).length;
 return n?`${d.file} · updated ${d.mtime||'?'}`:`${d.file} · not synced yet`;
}
function lessonBody(l){
 const d=courseDoc(l.course),doc=d&&d.lessons&&d.lessons[l.num];
 const todo=l.L.map(p=>`<div class="cell"><button class="chk green ${S.planDone[p.id]?'on':''}" data-act="pdone" data-id="${p.id}" aria-label="Done">${ic('check')}</button><span class="t"><b>${esc(p.title)}</b><span>${whenLabel(p.date)}${mastTxt(p.id)}</span></span></div>`).join('');
 if(doc&&doc.notes&&doc.notes.length)return `<div class="doc">${blocksHtml(doc.notes,{lid:l.id,k:'notes'})}</div><div class="sh">Study blocks</div><div class="grp">${todo}</div>`;
 return `<div class="empty">${ic('doc')}<b>Lesson text not synced yet</b>The synthesis for this lesson will appear here from ${esc(d&&d.file||'your Word file')} after the next sync.</div>
 <div class="sh">Study blocks</div><div class="grp">${todo||'<div class="cell"><span class="t mute">No study block planned.</span></div>'}</div>`;
}
function officialOf(p){const m=/official (.+?)(?: \+ practice set)?$/.exec(p.title);return m?m[1]:(/·\s*(.+)$/.exec(p.title)||[])[1]||''}
function exBody(l){
 const d=courseDoc(l.course),doc=d&&d.lessons&&d.lessons[l.num];
 let out='';
 if(l.E.length)out+=`<div class="grp">${l.E.map(p=>`<div class="cell"><button class="chk green ${S.planDone[p.id]?'on':''}" data-act="pdone" data-id="${p.id}" aria-label="Done">${ic('check')}</button><span class="t"><b>${esc(p.title.split(' · ')[0])}</b><span>${esc(officialOf(p))}${officialOf(p)?' · ':''}${whenLabel(p.date)}${mastTxt(p.id)}</span></span></div>`).join('')}</div>`;
 const keys=[...new Set(l.E.map(p=>p.ex).filter(Boolean))];
 keys.forEach(k=>{const s=exSet(k);if(!s)return;
  out+=`<div class="sh">${esc(s.title)}</div><div class="grp">${s.items.map((it,i)=>`<div class="q"><span class="n">${i+1}.</span>${esc(it.q)}<details><summary>Show answer</summary><p>${esc(it.a)}</p></details></div>`).join('')}</div>${s.note?`<div class="sf">${esc(s.note)}</div>`:''}`});
 if(doc&&doc.ex&&doc.ex.length)out+=`<div class="sh">From your Word file</div><div class="doc">${blocksHtml(doc.ex,{lid:l.id,k:'ex'})}</div>`;
 const has=keys.some(k=>exSet(k))||(doc&&doc.ex&&doc.ex.length);
 if(!has)out+=`<div class="empty" style="margin-top:12px">${ic('clip')}<b>No practice set written yet</b>Do the official exercises above. Original practice questions are added by the weekly update.</div>`;
 return out;
}
function briefBody(p){
 const extras=(courseDoc(p.course)||{}).extras||[];
 const msg=p.kind==='M'?'Closed book, 50 minutes. Then mark every mistake and add it to "Exercises to redo".':'Work in your own document. Keep the brief and the rubric open next to it.';
 return `<div class="empty">${ic(KINDS[p.kind].ic)}<b>${esc(KINDS[p.kind].n)}</b>${msg}</div>${p.kind==='M'&&extras.length?`<div class="sh">Checklist and mixed test</div><div class="doc">${blocksHtml(extras)}</div>`:''}`;
}
function lessonsFor(p){const all=lessonsOf(p.course);return pLids(p).map(id=>all.find(l=>l.id===id)).filter(Boolean)}

/* ---------- rows ---------- */
function planRow(p){
 const x=C(p.course),done=!!S.planDone[p.id],od=p.date<today()&&!done;
 return `<div class="cell has-ico ${done?'done':''}" style="--c:${x.color}">
  <button class="chk ${done?'on':''}" data-act="pdone" data-id="${p.id}" aria-label="Mark done">${ic('check')}</button>
  <button class="t" style="text-align:left;flex:1;min-width:0" data-act="prow" data-id="${p.id}"><b>${esc(p.title)}</b><span>${x.short} · ${KINDS[p.kind].n}${mastTxt(p.id)}${od?` · <i class="late" style="font-style:normal">${whenLabel(p.date)}</i>`:''}</span></button>
  <span class="sq" style="--c:${x.color}">${ic(KINDS[p.kind].ic)}</span></div>`;
}
const navbar=(back,right='')=>`<div class="navbar">${back?`<button class="back" data-act="back">${ic('chevl')}${esc(back)}</button>`:'<span></span>'}${right}</div>`;
const title=(t,eb)=>`${eb?`<div class="eyebrow" style="margin-top:10px">${eb}</div>`:''}<h1 class="lt">${t}</h1>`;
const ringSvg=(size,r,w,pct,color)=>{const c=2*Math.PI*r;return `<svg class="ring" viewBox="0 0 ${size} ${size}" aria-hidden="true"><circle class="tr" cx="${size/2}" cy="${size/2}" r="${r}" stroke-width="${w}"/><circle class="pg" cx="${size/2}" cy="${size/2}" r="${r}" stroke-width="${w}" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c*(1-Math.min(1,Math.max(0,pct)))).toFixed(1)}"${color?` style="stroke:${color}"`:''}/></svg>`};

/* ---------- views ---------- */
function vToday(){
 const day=today(),el=S.active?activeSecs():0;
 const mins=minsOn(day)+(S.active&&S.active.mode==='free'?Math.floor(el/60):0);
 const g=S.settings.daily*60,pct=mins/g;
 const list=todayList(),sg=suggest();
 const due=S.redo.filter(r=>r.due<=day).length,st=streak();
 let btn,lab;
 if(S.active){
  const free=S.active.mode==='free',left=free?el:WORK-el;
  btn=`<button class="go" data-act="sopen" aria-label="Open session"><span id="htimer" style="font-size:34px;font-weight:700;font-variant-numeric:tabular-nums">${free?fmtHMS(el):fmtMS(left)}</span></button>`;
  lab=`<div class="lab">In session</div><div class="sub">Tap to open your course</div>`;
 }else{
  btn=`<button class="go" data-act="pstart" aria-label="Start Deep Work">${ic('play')}</button>`;
  lab=`<div class="lab">Start Deep Work</div><div class="sub">${fmt(mins)} of ${S.settings.daily} h${st?` · ${ic('flame','')} ${st}-day streak`:''}</div>${readMin(day)?`<div class="sub" style="margin-top:2px">+ ${fmt(readMin(day))} of review</div>`:''}`;
 }
 const brk=(!S.active&&S.brk&&Date.now()<S.brk.until)?`<div class="grp" style="margin-top:14px"><div class="cell"><span class="sq" style="--c:var(--orange)">${ic('cup')}</span><span class="t"><b>Break</b><span>Back to it when the timer ends</span></span><b id="brk" class="v" style="font-size:20px;color:var(--label)">${fmtMS((S.brk.until-Date.now())/1000)}</b><button class="btn tint sm" data-act="skipbrk">Skip</button></div></div>`:'';
 let sug='';
 if(!S.active&&sg&&sg.item){
  const x=C(sg.course);
  sug=`<div class="sug"><div class="sh" style="margin-top:0">Suggested next</div><div class="grp"><button class="cell has-ico" data-act="pstart" style="--c:${x.color}"><span class="sq big" style="--c:${x.color}">${ic(x.ic)}</span><span class="t"><b>${esc(shortTitle(sg.item.title))}</b><span>${x.short} · ${KINDS[sg.item.kind].n}</span><span class="why">${esc(sg.why)}</span></span>${ic('chev','chev')}</button></div></div>`;
 }else if(!S.active&&!sg){
  sug=`<div class="sug"><div class="grp"><div class="cell"><span class="t"><b>Plan complete</b><span>Start a free session or add a lesson.</span></span></div></div></div>`;
 }
 return `<div class="view">${title('Today',new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'}))}
 <div class="hero"><div class="ringwrap">${ringSvg(252,112,14,pct)}${btn}</div>${lab}</div>
 ${brk}${sug}
 <div class="sh">Today's plan · ${list.filter(p=>S.planDone[p.id]).length}/${list.length}</div>
 <div class="grp">${list.length?list.map(planRow).join(''):'<div class="cell"><span class="t"><b>Nothing planned today</b><span>Start Deep Work to get ahead.</span></span></div>'}</div>
 <div class="grp" style="margin-top:14px"><button class="cell has-ico" data-act="freeopen"><span class="sq" style="--c:var(--accent)">${ic('timer')}</span><span class="t"><b>Free session</b></span>${ic('chev','chev')}</button><button class="cell has-ico" data-act="lessonopen"><span class="sq" style="--c:var(--green)">${ic('plus')}</span><span class="t"><b>Add a lesson</b></span>${ic('chev','chev')}</button>
 ${cardsRow()}
 ${due?`<button class="cell has-ico" data-v="redo" data-act="open"><span class="sq" style="--c:var(--orange)">${ic('redo')}</span><span class="t"><b>${due} exercise${due>1?'s':''} to redo</b></span>${ic('chev','chev')}</button>`:''}</div></div>`;
}

function vCourses(){
 const rows=COURSES.map(c=>{const s=courseStat(c.id);
  return `<button class="cell has-ico" data-act="open" data-v="course" data-p="${c.id}" style="--c:${c.color}"><span class="sq big" style="--c:${c.color}">${ic(c.ic)}</span><span class="t"><b>${c.name}</b><span>${s.done}/${s.total} blocks${s.nd?' · '+esc(s.nd.title)+' in '+countdown(s.nd.when):''}</span></span>${s.over?`<span class="badge red">${s.over} behind</span>`:''}${ic('chev','chev')}</button>`}).join('');
 const synced=typeof CONTENT!=='undefined'&&CONTENT.synced;
 return `<div class="view">${title('Courses','Lingnan · 5 courses')}<div class="grp">${rows}</div>
 <div class="sf">${synced?'Lessons synced from your Word files on '+esc(CONTENT.synced)+'.':'Linked to your 5 Word synthesis files. Lessons appear here after the next sync.'}</div></div>`;
}
function vCourse(){
 const c=C(param),s=courseStat(c.id),ls=lessonsOf(c.id);
 const other=planAll().filter(p=>p.course===c.id&&(p.kind==='M'||p.kind==='A')).sort((a,b)=>a.date.localeCompare(b.date));
 const lrow=l=>{if(l.unplanned)return `<div class="cell has-ico"><button class="t" style="text-align:left;flex:1;min-width:0" data-act="open" data-v="lesson" data-p="${l.id}"><b>${esc(lessonName(l))}</b><span>New from your Word file · not planned yet</span></button><button class="btn sm tint" data-act="plannew" data-id="${l.id}">Add to plan</button></div>`;const g=lessonProg(l);const full=g.Lt&&g.Ld===g.Lt&&(!g.Et||g.Ed===g.Et);
  return `<button class="cell has-ico" data-act="open" data-v="lesson" data-p="${l.id}"><span class="chk green ${full?'on':''}" style="pointer-events:none">${ic('check')}</span><span class="t"><b>${esc(lessonName(l))}</b><span>${g.Lt?`Lesson ${g.Ld}/${g.Lt}`:''}${g.Et?` · Exercises ${g.Ed}/${g.Et}`:''}</span></span>${ic('chev','chev')}</button>`};
 return `<div class="view">${navbar('Courses')}${title(c.name,c.id)}
 <div class="stats" style="margin:10px 0 14px"><div class="stat"><b>${s.done}/${s.total}</b><span>blocks done</span></div><div class="stat"><b style="${s.over?'color:var(--red)':''}">${s.over}</b><span>behind</span></div><div class="stat"><b>${s.nd?countdown(s.nd.when).split(' ').slice(0,2).join(' '):'–'}</b><span>${s.nd?'to '+esc(s.nd.title.split(' (')[0].slice(0,16)):'no deadline'}</span></div></div>
 <button class="btn" data-act="pstart" data-course="${c.id}">${ic('play')} Work on ${c.short}</button>
 <div class="sh">Lessons</div><div class="grp">${ls.map(lrow).join('')||'<div class="cell"><span class="t mute">No lesson planned.</span></div>'}</div>
 ${other.length?`<div class="sh">Reviews and assignments</div><div class="grp">${other.map(planRow).join('')}</div>`:''}
 <div class="sh">Word synthesis</div><div class="grp"><div class="cell has-ico"><span class="sq" style="--c:var(--accent)">${ic('doc')}</span><span class="t"><b>${esc(syncLine(c.id))}</b></span></div></div>
 <div class="row c" style="margin-top:8px"><button class="link" data-act="lessonopen" data-course="${c.id}">Add a lesson</button></div></div>`;
}
function readChip(l){
 const day=today(),t=readMin(day,l.course),all=Math.floor(S.reads.filter(r=>r.lid===l.id).reduce((a,r)=>a+r.sec,0)/60);
 return `<div class="sf" style="margin:10px 0 0">${ic('clock','')} Reading mode: no session needed. Time is tracked as review (${t?fmt(readMin(day)):'0 min'} today${all?` · ${fmt(all)} on this chapter`:''}).</div>`;
}
function vLesson(){
 const cid=String(param).split(':')[0],l=lessonsOf(cid).find(x=>x.id===param),c=C(cid);
 if(!l)return `<div class="view">${navbar('Back')}${title('Lesson')}<div class="empty">Lesson not found.</div></div>`;
 const g=lessonProg(l);
 return `<div class="view">${navbar(c.short)}${title(esc(l.title),(/^\d+$/.test(l.num)?'Chapter '+l.num+' · ':'')+c.name)}
 <div class="segc tabs-s" style="margin-top:10px"><button class="${lTab==='lesson'?'on':''}" data-act="ltab" data-k="lesson">Lesson ${g.Lt?g.Ld+'/'+g.Lt:''}</button><button class="${lTab==='ex'?'on':''}" data-act="ltab" data-k="ex">Exercises ${g.Et?g.Ed+'/'+g.Et:''}</button></div>
 ${readChip(l)}
 ${lTab==='lesson'?lessonBody(l):exBody(l)}
 <div style="margin-top:18px"><button class="btn tint" data-act="pstart" data-course="${c.id}" data-ids="${[...l.L,...l.E].filter(p=>!S.planDone[p.id]).map(p=>p.id).slice(0,1).join(',')}">${ic('play')} Study this now</button></div></div>`;
}
function vTimetable(){
 const off=S.tw||0,days=weekDays(off);
 const all=days.flatMap(itemsOn),dn=all.filter(p=>S.planDone[p.id]).length;
 const rows=days.map(d=>{const it=itemsOn(d),dt=new Date(d+'T12:00');
  const lab=dt.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'});
  const dls=S.deadlines.filter(x=>String(x.when).slice(0,10)===d).map(x=>`<div class="cell"><span class="sq" style="--c:var(--red)">${ic('flag')}</span><span class="t"><b>${esc(x.title)}</b><span>${esc(C(x.course).short)} · ${new Date(x.when).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</span></span></div>`).join('');
  return `<div class="sh">${lab}${d===today()?' · today':''}</div><div class="grp">${dls}${it.length?it.map(planRow).join(''):(dls?'':`<div class="cell"><span class="t mute">${dt.getDay()===2?'Rest day':'Free'}</span></div>`)}</div>`}).join('');
 return `<div class="view">${title('Week',dn+' of '+all.length+' blocks done')}
 <div class="row sp" style="margin:8px 0 6px"><div class="segc" style="flex:1"><button data-act="tprev">←</button><button class="${off===0?'on':''}" data-act="tnow">This week</button><button data-act="tnext">→</button></div></div>
 <div class="bar" style="margin:12px 4px 0"><i style="width:${all.length?dn/all.length*100:0}%"></i></div>${rows}
 <div class="row c" style="margin-top:14px"><button class="link" data-act="lessonopen">Add a lesson</button></div></div>`;
}

/* ----- insights ----- */
function bucketKey(r,ts){const d=new Date(ts);if(r==='d')return dkey(d);if(r==='w')return dkey(weekStart(d));return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')}
function buckets(r){
 const out=[],now=new Date();now.setHours(0,0,0,0);
 if(r==='d')for(let i=29;i>=0;i--){const d=new Date(now);d.setDate(d.getDate()-i);out.push({key:dkey(d),label:String(d.getDate()),full:d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'}),goal:S.settings.daily*60})}
 if(r==='w'){const ws=weekStart();for(let i=11;i>=0;i--){const d=new Date(ws);d.setDate(d.getDate()-i*7);const l=d.toLocaleDateString('en-GB',{day:'numeric',month:'short'});out.push({key:dkey(d),label:l,full:'Week of '+l,goal:S.settings.weekly*60})}}
 if(r==='m')for(let i=5;i>=0;i--){const d=new Date(now.getFullYear(),now.getMonth()-i,1);out.push({key:d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'),label:d.toLocaleDateString('en-GB',{month:'short'}),full:d.toLocaleDateString('en-GB',{month:'long',year:'numeric'}),goal:0})}
 return out;
}
function stackChart(){
 const bs=buckets(insR),idx={};bs.forEach((b,i)=>idx[b.key]=i);
 const keys=insBy==='course'?COURSES.map(c=>c.id):['L','E','M','A','F'];
 const col=k=>insBy==='course'?C(k).color:KINDS[k].color;
 const nm=k=>insBy==='course'?C(k).short:KINDS[k].n;
 bs.forEach(b=>{b.v={};b.t=0});
 S.sessions.forEach(s=>{const i=idx[bucketKey(insR,s.start)];if(i==null)return;const b=bs[i];
  const parts=insBy==='course'?[{k:s.course,m:s.minutes}]:(s.parts&&s.parts.length?s.parts:[{k:s.kind||'F',m:s.minutes}]);
  parts.forEach(p=>{b.v[p.k]=(b.v[p.k]||0)+p.m});b.t+=s.minutes});
 const goal=bs[0].goal,max=Math.max(60,goal*1.1,...bs.map(x=>x.t)),H=150;
 const cols=bs.map(x=>{const segs=keys.filter(k=>x.v[k]).map(k=>`<div class="seg" style="height:${Math.max(2,x.v[k]/max*H)}px;background:${col(k)}"></div>`).join('');
  const tip=`${x.full}: ${fmt(x.t)}`+keys.filter(k=>x.v[k]).map(k=>` · ${nm(k)} ${fmt(x.v[k])}`).join('');
  return `<div class="bcol" data-act="tip" data-tip="${esc(tip)}" title="${esc(tip)}"><div class="stk">${segs}</div></div>`}).join('');
 const every=insR==='d'?5:insR==='w'?2:1;
 const labs=bs.map((x,i)=>`<span>${(bs.length-1-i)%every===0?x.label:''}</span>`).join('');
 const tot=bs.reduce((a,x)=>a+x.t,0);
 const rows=bs.slice().reverse().map(x=>`<tr><td>${esc(x.full)}</td><td>${fmt(x.t)}</td>${keys.map(k=>`<td>${x.v[k]?fmt(x.v[k]):'–'}</td>`).join('')}</tr>`).join('');
 return `<div class="chart" style="height:${H}px">${goal?`<div class="goal" style="bottom:${goal/max*H}px"><span>goal</span></div>`:''}<div class="cols">${cols}</div></div>
 <div class="axis">${labs}</div><div class="tipline mute small" id="tipline">Tap a bar for details · total ${fmt(tot)}</div>
 <div class="legend">${keys.map(k=>`<span class="lg"><i style="background:${col(k)}"></i>${nm(k)}</span>`).join('')}</div>
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
 const {m,f,n}=hourData(),max=Math.max(30,...m),H=110;
 const cols=m.map((v,h)=>{const tip=`${String(h).padStart(2,'0')}:00 · ${fmt(v)}${n[h]?` · focus ${(f[h]/n[h]).toFixed(1)}/3 ${FOCUS[Math.round(f[h]/n[h])]}`:''}`;
  return `<div class="bcol" data-act="tip2" data-tip="${esc(tip)}" title="${esc(tip)}"><div class="stk">${v?`<div class="seg" style="height:${Math.max(2,v/max*H)}px;background:var(--s1)"></div>`:''}</div></div>`}).join('');
 const labs=m.map((_,h)=>`<span>${h%6===0?h:''}</span>`).join('');
 let best=-1,bv=0;n.forEach((c,h)=>{if(c>=2&&f[h]/c>bv){bv=f[h]/c;best=h}});
 const msg=best>=0?`Best focus around ${String(best).padStart(2,'0')}:00 (${bv.toFixed(1)}/3 ${FOCUS[Math.round(bv)]})`:'Rate a few blocks (😕 🙂 🔥) to see when you focus best.';
 return `<div class="chart" style="height:${H}px"><div class="cols">${cols}</div></div><div class="axis">${labs}</div><div class="tipline mute small" id="tipline2">${msg}</div>`;
}
function weekdayChart(){
 const m=Array(7).fill(0);S.sessions.forEach(s=>{m[(new Date(s.start).getDay()+6)%7]+=s.minutes});
 const max=Math.max(60,...m),H=110,names=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
 return `<div class="chart" style="height:${H}px"><div class="cols">${m.map((v,i)=>`<div class="bcol wide" title="${names[i]} ${fmt(v)}"><div class="stk">${v?`<div class="seg" style="height:${Math.max(2,v/max*H)}px;background:var(--s1)"></div>`:''}</div></div>`).join('')}</div></div>
 <div class="axis">${names.map(x=>`<span>${x}</span>`).join('')}</div>`;
}
function reviewCard(){
 const days=weekDays(0),names=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],m=days.map(d=>readMin(d)),tot=m.reduce((a,b)=>a+b,0),max=Math.max(30,...m),H=90;
 const per=COURSES.map(c=>({c,v:days.reduce((a,d)=>a+readMin(d,c.id),0)})).filter(x=>x.v);
 return `<div class="card" style="margin-top:14px"><div class="card-h"><h3>Review & reading</h3><span class="mute small">${fmt(tot)} this week · not counted in your focus goal</span></div>
 <div class="chart" style="height:${H}px"><div class="cols">${m.map((v,i)=>`<div class="bcol wide" title="${names[i]} ${fmt(v)}"><div class="stk">${v?`<div class="seg" style="height:${Math.max(2,v/max*H)}px;background:var(--s3)"></div>`:''}</div></div>`).join('')}</div></div>
 <div class="axis">${names.map(x=>`<span>${x}</span>`).join('')}</div>
 ${per.length?`<div class="tipline mute small">${per.map(x=>x.c.short+' '+fmt(x.v)).join(' · ')}</div>`:'<div class="tipline mute small">Open a lesson and read: the time is counted automatically while the page is open.</div>'}</div>`;
}
function vInsights(){
 const seg=(opts,cur,act)=>`<div class="segc" style="flex:1">${opts.map(([k,l])=>`<button class="${cur===k?'on':''}" data-act="${act}" data-k="${k}">${l}</button>`).join('')}</div>`;
 const st=streak(),week=weekDays(0).reduce((a,d)=>a+minsOn(d),0);
 return `<div class="view">${title('Insights','Your work')}
 <div class="stats" style="margin:10px 0 14px"><div class="stat"><b>${fmt(minsOn(today()))}</b><span>today</span></div><div class="stat"><b>${fmt(week)}</b><span>this week</span></div><div class="stat"><b>${st}</b><span>day streak</span></div></div>
 <div class="card"><div class="card-h"><h3>Time worked</h3></div>
 <div class="stack" style="margin-bottom:14px">${seg([['d','30 days'],['w','12 weeks'],['m','6 months']],insR,'insr')}${seg([['course','By course'],['kind','By type']],insBy,'insby')}</div>${stackChart()}</div>
 <div class="card" style="margin-top:14px"><div class="card-h"><h3>When you work</h3><span class="mute small">hour of day</span></div>${hourChart()}</div>
 <div class="card" style="margin-top:14px"><div class="card-h"><h3>Which days</h3></div>${weekdayChart()}</div>
 ${reviewCard()}</div>`;
}

/* ----- more + sub views ----- */
function vMore(){
 const due=S.redo.filter(r=>r.due<=today()).length;
 const it=(v,t,s,i,col,badge)=>`<button class="cell has-ico" data-act="open" data-v="${v}"><span class="sq" style="--c:${col}">${ic(i)}</span><span class="t"><b>${t}</b><span>${s}</span></span>${badge||''}${ic('chev','chev')}</button>`;
 return `<div class="view">${title('More')}<div class="grp">${it('redo','Exercises to redo','Spaced repetition','redo','var(--orange)',due?`<span class="badge red">${due}</span>`:'')}${it('plan','Deadlines','Exams and assignments','flag','var(--red)')}${it('sessions','Sessions','History, add or edit','clock','var(--accent)')}${it('targets','Targets','Grade goals per course','cap','var(--green)')}${it('data','Settings','Goals, theme, backup','gear','#8e8e93')}</div></div>`;
}
function vRedo(){
 const day=today(),all=[...S.redo].sort((a,b)=>a.due.localeCompare(b.due));
 const row=r=>{const x=C(r.course),isDue=r.due<=day;
  return `<div class="cell has-ico"><span class="sq" style="--c:${x.color}">${ic(x.ic)}</span><span class="t"><b>${esc(r.title)}</b><span>${x.short} · step ${r.stage+1}/${STAGES.length}${isDue?'':' · '+r.due}</span></span>${isDue?`<button class="btn sm" data-act="rok" data-id="${r.id}">Got it</button><button class="btn sm gray" data-act="rko" data-id="${r.id}">Missed</button>`:''}<button class="xbtn" data-act="rdel" data-id="${r.id}" aria-label="Delete">${ic('x')}</button></div>`};
 return `<div class="view">${navbar('More')}${title('To redo')}<div class="grp">${all.map(row).join('')||'<div class="cell"><span class="t mute">Empty. Add the exercises you got wrong.</span></div>'}</div>
 <div class="sf">"Got it" moves it to the next interval (1, 3, 7, 14, 30 days). "Missed" brings it back tomorrow.</div><div style="margin-top:16px"><button class="btn tint" data-act="newredo">${ic('plus')} New exercise</button></div></div>`;
}
function vPlan(){
 const list=[...S.deadlines].sort((a,b)=>new Date(a.when)-new Date(b.when));
 return `<div class="view">${navbar('More')}${title('Deadlines')}<div class="grp">${list.map(d=>{const x=C(d.course),past=new Date(d.when)<Date.now();
  return `<div class="cell has-ico" style="${past?'opacity:.45':''}"><span class="sq" style="--c:${x.color}">${ic(x.ic)}</span><span class="t"><b>${esc(d.title)}</b><span>${x.id==='ALL'?'All':x.id} · ${new Date(d.when).toLocaleString('en-GB',{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</span></span><span class="badge ${urgent(d.when)?'red':''}">${countdown(d.when)}</span><button class="xbtn" data-act="dldel" data-id="${d.id}" aria-label="Delete">${ic('x')}</button></div>`}).join('')}</div>
 <div style="margin-top:16px"><button class="btn tint" data-act="newdl">${ic('plus')} Add deadline</button></div></div>`;
}
function vSessions(){
 const all=[...S.sessions].sort((a,b)=>b.start-a.start);
 const row=s=>{const x=C(s.course);
  return `<div class="cell has-ico"><span class="sq" style="--c:${x.color}">${ic(x.ic)}</span><span class="t"><b>${x.short} · ${fmt(s.minutes)} ${s.focus?FOCUS[s.focus]:''}</b><span>${new Date(s.start).toLocaleString('en-GB',{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})} · ${KINDS[s.kind||'F'].n}${s.title?' · '+esc(s.title):''}</span></span><button class="btn sm gray" data-act="sedit" data-id="${s.id}">Edit</button><button class="xbtn" data-act="sdel" data-id="${s.id}" aria-label="Delete">${ic('x')}</button></div>`};
 return `<div class="view">${navbar('More')}${title('Sessions',all.length+' sessions')}<div class="grp">${all.map(row).join('')||'<div class="cell"><span class="t mute">No session yet.</span></div>'}</div><div style="margin-top:16px"><button class="btn tint" data-act="manual">${ic('plus')} Add a finished session</button></div></div>`;
}
function vTargets(){
 const rows=COURSES.map(c=>{const nd=nextDeadline(c.id),conf=S.settings.confidence[c.id]||0,tot=S.sessions.filter(s=>s.course===c.id).reduce((a,s)=>a+s.minutes,0);
  return `<div class="sh">${c.short}</div><div class="grp fgrp"><div class="cell"><label>Target grade</label><select data-act="target" data-id="${c.id}">${GRADES.map(g=>`<option ${S.settings.target[c.id]===g?'selected':''}>${g}</option>`).join('')}</select></div>
  <div class="cell"><label>Confidence ${conf}%</label><input type="range" min="0" max="100" step="5" value="${conf}" data-act="conf" data-id="${c.id}" style="max-width:50%"></div>
  <div class="cell"><label>Total worked</label><span class="v">${fmt(tot)}</span></div>${nd?`<div class="cell"><label>Next</label><span class="v">${esc(nd.title.slice(0,24))} · ${countdown(nd.when)}</span></div>`:''}</div>`}).join('');
 return `<div class="view">${navbar('More')}${title('Targets')}${rows}</div>`;
}
function vData(){
 const q=S.settings.quota,th=S.settings.theme;
 return `<div class="view">${navbar('More')}${title('Settings')}
 <div class="sh">Appearance</div><div class="segc"><button class="${th==='auto'?'on':''}" data-act="theme" data-k="auto">Auto</button><button class="${th==='light'?'on':''}" data-act="theme" data-k="light">Light</button><button class="${th==='dark'?'on':''}" data-act="theme" data-k="dark">Dark</button></div>
 <div class="sh">Goals</div><div class="grp fgrp"><div class="cell"><label>Daily work goal (hours)</label><input type="number" step="0.5" min="1" max="12" value="${S.settings.daily}" data-act="daily" style="width:70px"></div><div class="cell"><label>Weekly work goal (hours)</label><input type="number" step="1" min="1" max="80" value="${S.settings.weekly}" data-act="weekly" style="width:70px"></div></div>
 <div class="sh">Blocks per weekday</div><div class="card"><div class="flexw">${[1,2,3,4,5,6,0].map(d=>`<div class="quota"><div class="mute small" style="text-align:center;margin-bottom:4px">${WD[d]}</div><input type="number" min="0" max="9" value="${q[d]}" data-act="quota" data-d="${d}"></div>`).join('')}</div></div><div class="sf">Used when you add a lesson: 50 min per block.</div>
 <div class="sh">Data</div><div class="grp"><button class="cell has-ico" data-act="notif"><span class="sq" style="--c:var(--red)">${ic('flag')}</span><span class="t"><b>Enable alerts</b></span></button><button class="cell has-ico" data-act="export"><span class="sq" style="--c:var(--accent)">${ic('down')}</span><span class="t"><b>Export backup</b></span></button><label class="cell has-ico"><span class="sq" style="--c:var(--green)">${ic('sync')}</span><span class="t"><b>Import backup</b></span><input type="file" accept=".json" id="imp" hidden></label></div>
 <div class="sh">Cloud sync (phone + laptop)</div>${CL.token&&CL.gid
 ?`<div class="grp"><div class="cell"><span class="t"><b>Connected</b><span>${esc(CL.status||'')}</span></span></div><button class="cell has-ico" data-act="csync"><span class="sq" style="--c:var(--green)">${ic('sync')}</span><span class="t"><b>Sync now</b></span></button><button class="cell has-ico" data-act="ccopy"><span class="sq" style="--c:var(--accent)">${ic('down')}</span><span class="t"><b>Copy token for another device</b></span></button><button class="cell has-ico" data-act="cdisc"><span class="sq" style="--c:var(--red)">${ic('flag')}</span><span class="t"><b>Disconnect this device</b></span></button></div>`
 :`<div class="grp fgrp"><div class="cell"><input id="cl-token" type="password" placeholder="GitHub token (gist permission only)" autocomplete="off" style="flex:1;width:100%;max-width:none;text-align:left;font-size:17px;border:0;outline:0;background:transparent"></div><button class="cell has-ico" data-act="cconnect"><span class="sq" style="--c:var(--accent)">${ic('sync')}</span><span class="t"><b>Connect</b><span>${esc(CL.status||'Same token on every device')}</span></span></button></div><div class="sf">Stored only on this device. Your progress is saved in a private GitHub gist, never in the public repo.</div>`}
 <div class="sf">Backups remain available below.</div>
 <div style="margin-top:22px"><button class="btn red" data-act="reset">Erase everything</button></div></div>`;
}
const VMAP={cards:vCards,study:vStudy,today:vToday,courses:vCourses,course:vCourse,lesson:vLesson,timetable:vTimetable,insights:vInsights,more:vMore,redo:vRedo,plan:vPlan,sessions:vSessions,targets:vTargets,data:vData};
function render(){
 const f=document.activeElement,id=f&&f.id,val=f&&f.value;
 tabbar();$('main').innerHTML=(VMAP[view]||vToday)();
 if(id){const n=$(id);if(n&&n.tagName==='INPUT'){n.value=val;n.focus()}}
 renderMini();
}

/* ---------- sheets ---------- */
function openSheet(ttl,body,foot){
 $('layer').innerHTML=`<div class="dim" data-act="sclose"></div><div class="sheet" role="dialog" aria-label="${esc(ttl)}"><div class="grab"></div><div class="sb"><h3>${ttl}</h3><button class="xbtn" data-act="sclose" aria-label="Close">${ic('x')}</button></div><div class="sc" id="sc">${body}</div>${foot!==undefined?`<div class="sf2" id="sf">${foot}</div>`:''}</div>`;
}
function setSheet(body,foot){const a=$('sc');if(a)a.innerHTML=body;const f=$('sf');if(f&&foot!==undefined)f.innerHTML=foot}
function closeSheet(){
 const L=$('layer'),d=L.querySelector&&L.querySelector('.dim'),s=L.querySelector&&L.querySelector('.sheet');
 if(!s){L.innerHTML='';return}
 d.classList.add('out');s.classList.add('out');setTimeout(()=>{if(L.querySelector('.sheet')===s)L.innerHTML=''},300);
}
const courseSel=(v,id='m-course')=>`<select id="${id}">${COURSES.map(c=>`<option value="${c.id}" ${c.id===v?'selected':''}>${c.short}</option>`).join('')}</select>`;
const fld=(label,inner)=>`<div class="cell"><label>${label}</label>${inner}</div>`;
const localDT=ms=>{const d=new Date(ms-new Date(ms).getTimezoneOffset()*6e4);return d.toISOString().slice(0,16)};

/* picker: Start Deep Work -> suggestion + choose lessons for this 50 min block */
function openPicker(course,pre){
 const sg=suggest();
 course=course||(sg&&sg.course)||S.course;
 let sel=[];
 if(pre&&pre.length)sel=pre.slice();
 else if(sg&&sg.course===course&&sg.item)sel=[sg.item.id];
 else{const f=pickItems(course)[0];if(f)sel=[f.id]}
 P={course,sel};
 openSheet('Deep Work',pickerBody(sg),pickerFoot());
}
function pickerBody(sg){
 sg=sg||suggest();
 const items=pickItems(P.course),st=courseStat(P.course);
 const chips=COURSES.map(c=>{const s=courseStat(c.id);return `<button class="chip ${c.id===P.course?'on':''}" data-act="pcourse" data-id="${c.id}" style="--c:${c.color}"><i></i>${c.short}${s.over?` <b>${s.over}</b>`:''}</button>`}).join('');
 const why=sg&&sg.course===P.course?sg.why:(st.over?`${st.over} block${st.over>1?'s':''} behind schedule`:(st.nd?`${st.nd.title} in ${countdown(st.nd.when)}`:''));
 const rows=items.map(p=>{const on=P.sel.includes(p.id),od=p.date<today();
  return `<button class="cell has-ico" data-act="ptoggle" data-id="${p.id}"><span class="chk ${on?'on':''}">${ic('check')}</span><span class="t"><b>${esc(noOff(p.title))}</b><span>${KINDS[p.kind].n} · ${od?`<i class="late" style="font-style:normal">${whenLabel(p.date)}</i>`:whenLabel(p.date)}</span></span><span class="sq" style="--c:${C(p.course).color}">${ic(KINDS[p.kind].ic)}</span></button>`}).join('');
 return `<div class="chips">${chips}</div><div class="sh" style="margin-top:0">${C(P.course).name}${why?' · '+esc(why):''}</div><div class="grp">${rows||'<div class="cell"><span class="t mute">Everything planned is done for this course.</span></div>'}</div>
 <div class="sf">Tick the lessons or exercises for this 50 minute block. The course page opens as soon as you start.</div>
 <div class="row c" style="margin-top:6px"><button class="link" data-act="freeopen">Free session instead</button></div>`;
}
function pickerFoot(){const n=P.sel.length;return `<button class="btn" data-act="pgo" ${n?'':'disabled'}>${ic('play')} Start · 50 min${n>1?' · '+n+' selected':''}</button>`}
function freeModal(){openSheet('Free session',`<div class="grp fgrp">${fld('Course',courseSel(S.course))}${fld('Topic','<input type="text" id="m-title" placeholder="Optional" style="text-align:right">')}</div>`,`<button class="btn" data-act="freego">${ic('play')} Start</button>`)}
function lessonModal(cid){openSheet('Add a lesson',`<div class="sf" style="margin:0 0 10px">The app finds the free blocks before the next deadline of this course, adds the lesson, then its exercises.</div>
 <div class="grp fgrp">${fld('Course',courseSel(cid||S.course))}${fld('Lesson','<input type="text" id="m-title" placeholder="e.g. Ch.10 · Perfect competition" style="text-align:right">')}${fld('Lesson blocks','<select id="m-n"><option>1</option><option selected>2</option><option>3</option></select>')}${fld('Exercises block after','<select id="m-ex"><option value="1" selected>Yes</option><option value="0">No</option></select>')}</div>`,`<button class="btn" data-act="lessongo">Add to plan</button>`)}
function sessionModal(s){
 const e=!!s;s=s||{course:S.course,kind:'F',start:Date.now()-3600e3,minutes:50,title:'',focus:0};
 openSheet(e?'Edit session':'Add a finished session',`<div class="grp fgrp">${fld('Course',courseSel(s.course))}${fld('Type',`<select id="m-kind">${Object.keys(KINDS).map(k=>`<option value="${k}" ${(s.kind||'F')===k?'selected':''}>${KINDS[k].n}</option>`).join('')}</select>`)}${fld('Start',`<input type="datetime-local" id="m-start" value="${localDT(s.start)}">`)}${fld('Minutes',`<input type="number" id="m-min" value="${Math.round(s.minutes)}" min="1" style="width:80px">`)}${fld('Focus',`<select id="m-focus"><option value="0">Not rated</option>${[1,2,3].map(n=>`<option value="${n}" ${s.focus===n?'selected':''}>${FOCUS[n]}</option>`).join('')}</select>`)}</div>
 <div class="grp fgrp" style="margin-top:12px">${fld('What',`<input type="text" id="m-title" value="${esc(s.title||'')}" placeholder="Optional" style="text-align:right">`)}</div>`,`<button class="btn" data-act="msave" data-id="${e?s.id:''}">Save</button>`);
}
function redoModal(){openSheet('New exercise to redo',`<div class="grp fgrp">${fld('Course',courseSel(S.course))}${fld('Exercise','<input type="text" id="m-title" placeholder="e.g. E6-3 sales returns" style="text-align:right">')}</div>`,`<button class="btn" data-act="rsave">Add</button>`)}
function dlModal(){openSheet('New deadline',`<div class="grp fgrp">${fld('Course',`<select id="m-course">${COURSES.map(c=>`<option value="${c.id}">${c.short}</option>`).join('')}<option value="ALL">All courses</option></select>`)}${fld('Title','<input type="text" id="m-title" style="text-align:right">')}${fld('When','<input type="datetime-local" id="m-when">')}</div>`,`<button class="btn" data-act="dlsave">Add</button>`)}
function addLesson(course,ttl,n,withEx,lidOverride,opt){
 opt=opt||{};
 const nd=nextDeadline(course),start=opt.start?new Date(opt.start):new Date();start.setHours(0,0,0,0);
 let limit=new Date(start);limit.setDate(limit.getDate()+14);
 if(nd){const l=new Date(nd.when);l.setHours(0,0,0,0);l.setDate(l.getDate()-1);if(l>=start)limit=l}
 if(opt.limit&&opt.limit>=start)limit=new Date(opt.limit);
 const days=[];for(let d=new Date(start);d<=limit;d.setDate(d.getDate()+1))days.push(dkey(d));
 const spare=d=>quotaOf(d)-itemsOn(d).length,made=[],lid=lidOverride||course+':x'+uid();
 const place=(from,kind,t)=>{let i=days.findIndex((d,ix)=>ix>=from&&spare(d)>0);if(i<0)i=Math.max(0,days.length-1);
  const p={id:'x'+uid(),date:days[i],course,kind,title:t,lid};S.extraPlan.push(p);made.push(p);return i};
 let last=Math.min(opt.from||0,Math.max(0,days.length-1));
 for(let i=0;i<n;i++)last=place(last,'L',ttl+(n>1?` (${i+1}/${n})`:''));
 if(withEx){const after=days.findIndex((d,ix)=>ix>last&&spare(d)>0);place(after>=0?after:last,'E',ttl+' · exercises')}
 save();return made;
}

/* ---------- automatic planning (new lessons from the Word files, new dates) ---------- */
const dayAdd=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const d0=d=>{const x=new Date(d);x.setHours(0,0,0,0);return x};
function finalsStart(){const f=S.deadlines.find(x=>/final exam/i.test(x.title));return f?d0(f.when):dayAdd(d0(Date.now()),60)}
function autoPlan(){
 S.auto=S.auto||{};let ch=false;const now=d0(Date.now()),horizon=dayAdd(finalsStart(),-1);
 // 1) lessons that exist in the Word files but not in the plan
 COURSES.forEach(c=>{
  const un=lessonsOf(c.id).filter(l=>l.unplanned&&!S.auto[l.id]).sort((a,b)=>(+a.num||99)-(+b.num||99));
  if(!un.length)return;
  const own=planAll().filter(p=>p.course===c.id&&(p.kind==='L'||p.kind==='E')).map(p=>p.date).sort();
  let start=own.length?dayAdd(new Date(own[own.length-1]+'T12:00'),1):now;if(start<now)start=now;
  const days=Math.max(un.length,Math.round((horizon-start)/864e5)),step=own.length?Math.max(1,Math.floor(days/un.length)):0;
  un.forEach((l,i)=>{addLesson(c.id,lessonName(l),2,true,l.id,{start,limit:horizon,from:i*step});S.auto[l.id]=1;ch=true});
 });
 // 2) preparation blocks for deadlines nobody planned yet (starts ~10 days before)
 const spreadOn=(course,kind,title,n,from,to,dl)=>{
  const days=[];for(let d=d0(from);d<=to;d=dayAdd(d,1))days.push(dkey(d));if(!days.length)days.push(dkey(to));
  const spare=d=>quotaOf(d)-itemsOn(d).length;
  for(let i=0;i<n;i++){
   const tgt=Math.min(days.length-1,Math.floor(i*days.length/n));
   let j=days.findIndex((d,ix)=>ix>=tgt&&spare(d)>0);if(j<0)j=tgt;
   S.extraPlan.push({id:'x'+uid(),date:days[j],course,kind,title:title+(n>1?` (${i+1}/${n})`:''),dl});
  }
  ch=true;
 };
 S.deadlines.forEach(dl=>{
  const when=new Date(dl.when);if(when<=now||/final exam/i.test(dl.title)||dl.course==='ALL')return;
  const key='dl:'+dl.id;if(S.auto[key])return;S.auto[key]=1;
  const lo=dayAdd(d0(when),-12),has=planAll().some(p=>p.course===dl.course&&(p.kind==='M'||p.kind==='A')&&new Date(p.date+'T12:00')>=lo&&new Date(p.date+'T12:00')<=d0(when));
  if(has)return;
  const t=dl.title,exam=/mid-?term|test|quiz|exam/i.test(t),pres=/presentation|debate|pitch/i.test(t);
  const n=exam?3:pres?4:5;
  spreadOn(dl.course,exam?'M':'A',t+' · prep',n,new Date(Math.max(+now,+dayAdd(d0(when),-10))),dayAdd(d0(when),-1),dl.id);
 });
 // 3) final exam review, 4 blocks per course in the 2 weeks before the finals
 COURSES.forEach(c=>{const key='final:'+c.id;if(S.auto[key]||finalsStart()<=now)return;S.auto[key]=1;
  spreadOn(c.id,'M','Final exam review · '+c.short,4,new Date(Math.max(+now,+dayAdd(finalsStart(),-14))),horizon,'final');});
 if(ch)save();return ch;
}

/* ---------- cloud sync: one private GitHub gist shared by phone and laptop ---------- */
const CKEY='lu-cc-cloud',GDESC='Lingnan Command Center sync';
let CL=(()=>{try{return JSON.parse(localStorage.getItem(CKEY))||{}}catch(e){return{}}})(),pushT=null,syncing=false;
const saveCL=()=>{try{localStorage.setItem(CKEY,JSON.stringify(CL))}catch(e){}};
const snap=()=>{const x=Object.assign({},S);delete x.active;delete x.brk;return x};
async function gh(path,opt){
 const r=await fetch('https://api.github.com'+path,Object.assign({},opt,{headers:{'Authorization':'Bearer '+CL.token,'Accept':'application/vnd.github+json','Content-Type':'application/json'}}));
 if(!r.ok)throw new Error('HTTP '+r.status);return r.json();
}
function mergeState(r){
 const L=S,newer=(r.mod||0)>(L.mod||0)?r:L,older=newer===r?L:r;
 const o=Object.assign({},older,newer);
 const m=new Map();[...(older.sessions||[]),...(newer.sessions||[])].forEach(x=>m.set(x.id,x));
 o.sessions=[...m.values()].sort((a,b)=>a.start-b.start);
 o.planDone=Object.assign({},older.planDone,newer.planDone);
 o.auto=Object.assign({},older.auto,newer.auto);
 const rm=new Map();[...(older.reads||[]),...(newer.reads||[])].forEach(x=>{const y=rm.get(x.id);if(!y||x.sec>y.sec)rm.set(x.id,x)});o.reads=[...rm.values()];
 o.mast=Object.assign({},older.mast);Object.entries(newer.mast||{}).forEach(([k,v])=>{const y=o.mast[k];if(!y||v.ts>=y.ts)o.mast[k]=v});
 o.cards=Object.assign({},older.cards);Object.entries(newer.cards||{}).forEach(([k,v])=>{const y=o.cards[k];if(!y||(v.ts||0)>=(y.ts||0))o.cards[k]=v});
 o.flags=Object.assign({},older.flags);Object.entries(newer.flags||{}).forEach(([k,v])=>{const y=o.flags[k];if(!y||(v.ts||0)>=(y.ts||0))o.flags[k]=v});
 const xm=new Map();[...(older.xcards||[]),...(newer.xcards||[])].forEach(x=>xm.set(x.id,x));o.xcards=[...xm.values()];
 o.dlHide=Object.assign({},older.dlHide,newer.dlHide);
 o.settings=newer.settings||older.settings;
 o.active=L.active;o.brk=L.brk;o.mod=Math.max(L.mod||0,r.mod||0);
 o.deadlines=mergeDl(o.deadlines,o.dlHide);
 return o;
}
function setCS(t,ok){CL.status=t;CL.ok=ok!==false;saveCL();if(view==='data')render()}
async function cloudPull(){
 if(!CL.token||!CL.gid||syncing||typeof fetch==='undefined')return;
 syncing=true;
 try{
  const g=await gh('/gists/'+CL.gid),f=g.files&&g.files['state.json'];
  let txt=f&&f.content;if(f&&f.truncated&&f.raw_url)txt=await (await fetch(f.raw_url)).text();
  const remote=txt?JSON.parse(txt):null;
  if(remote){
   const before=JSON.stringify(snap());
   S=mergeState(remote);autoPlan();
   try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}
   if(JSON.stringify(snap())!==before&&!S.active&&!sessOpen)render();
   if(JSON.stringify(snap())!==JSON.stringify(remote))await cloudPush(true);
  }else await cloudPush(true);
  setCS('Synced '+new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}));
 }catch(e){setCS('Offline or token problem ('+e.message+')',false)}
 syncing=false;
}
async function cloudPush(now){
 if(!CL.token||!CL.gid||typeof fetch==='undefined')return;
 try{await gh('/gists/'+CL.gid,{method:'PATCH',body:JSON.stringify({files:{'state.json':{content:JSON.stringify(snap())}}})});if(!now)setCS('Synced '+new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}))}
 catch(e){setCS('Not synced yet ('+e.message+')',false)}
}
function schedulePush(){if(!CL.token||!CL.gid)return;clearTimeout(pushT);pushT=setTimeout(()=>cloudPush(),2500)}
async function cloudConnect(token){
 CL={token:token.trim()};
 try{
  const list=await gh('/gists?per_page=100');let g=list.find(x=>x.description===GDESC);
  if(!g)g=await gh('/gists',{method:'POST',body:JSON.stringify({description:GDESC,public:false,files:{'state.json':{content:JSON.stringify(snap())}}})});
  CL.gid=g.id;saveCL();await cloudPull();
  return true;
 }catch(e){CL={};saveCL();return false}
}

/* ---------- session screen (opens the course page) ---------- */
function curItem(){const a=S.active;return a&&a.items?planAll().find(p=>p.id===a.cur):null}
function sessRing(pct,color){return `<div class="tr">${ringSvg(92,40,7,pct,color).replace('class="pg"','class="pg" id="sring"')}<span class="timer" id="stimer" style="font-size:21px"></span></div>`}
function renderSession(){
 const el=$('sess');
 if(!S.active){sessOpen=false;el.classList.remove('open');el.innerHTML='';return}
 const a=S.active,x=C(a.course);
 el.classList.toggle('open',sessOpen);
 const secs=activeSecs(),free=a.mode==='free';
 const fin=!free&&(a.endTs||secs>=WORK);
 if(fin){
  const mins=Math.min(50,Math.round(secs/60*10)/10);
  const items=(a.items||[]).map(id=>planAll().find(p=>p.id===id)).filter(Boolean);
  if(!a.mast)a.mast={};
  el.innerHTML=`<div class="sess-h"><div class="sess-top"><span style="width:30px"></span><span class="eyebrow">${x.short} · Deep Work</span><span style="width:30px"></span></div></div>
  <div class="sess-b"><div><div class="done-card"><div class="tick">${ic('check')}</div><h1 class="lt" style="margin:0;font-size:28px">${secs>=WORK?'Block complete':fmt(mins)+' logged'}</h1><p class="mute">Tell me how much you took in.</p></div>
  <div class="sh">How much did you master?</div>${items.map(p=>{const v=(a.mast||{})[p.id],ex=p.kind==='E';return `<div class="mq"><b>${esc(shortTitle(p.title))}</b><span>${ex?'How did the exercises go?':'Share of this lesson you really understood'}</span><div class="pcts">${[0,25,50,75,100].map(n=>`<button class="${v===n?'on':''}" data-act="mpct" data-id="${p.id}" data-p="${n}">${n}%</button>`).join('')}</div></div>`}).join('')}
  <div class="sh" style="text-align:center">How was your focus?</div>
  <div class="rate"><button data-act="rate" data-f="1">😕<span>Low</span></button><button data-act="rate" data-f="2">🙂<span>OK</span></button><button data-act="rate" data-f="3">🔥<span>Deep</span></button></div></div></div>`;
  return;
 }
 const p=curItem(),ls=p?lessonsFor(p):[];
 const cur=free?'Free work':shortTitle(p?p.title:'');
 let body='';
 if(free)body=`<div class="empty">${ic('timer')}<b>${esc(a.title||'Free work')}</b>Stop when you are done. The time is added to ${x.name}.</div>`;
 else{
  const chips=(a.items.length>1)?`<div class="chips">${a.items.map(id=>planAll().find(q=>q.id===id)).filter(Boolean).map(q=>`<button class="chip ${q.id===a.cur?'on':''}" data-act="scur" data-id="${q.id}" style="--c:${x.color}"><i></i>${esc(shortTitle(q.title).slice(0,28))}</button>`).join('')}</div>`:'';
  if(ls.length){
   const tabs=`<div class="segc tabs-s"><button class="${a.tab!=='ex'?'on':''}" data-act="stab" data-k="lesson">${ic('doc')} Lesson</button><button class="${a.tab==='ex'?'on':''}" data-act="stab" data-k="ex">${ic('clip')} Exercises</button></div>`;
   body=chips+tabs+ls.map(l=>`${ls.length>1?`<div class="sh">${esc(lessonName(l))}</div>`:''}${a.tab==='ex'?exBody(l):lessonBody(l)}`).join('');
  }else body=chips+(p?briefBody(p):'');
 }
 const sub=free?'Free session':x.short+' · '+KINDS[p?p.kind:'F'].n+(a.items.length>1?' · '+a.items.length+' selected':'');
 const paused=!!a.pausedAt;
 el.innerHTML=`<div class="sess-h c"><div class="sess-row"><button class="xbtn" data-act="smin" aria-label="Minimize">${ic('chevd')}</button><div class="info"><b>${esc(cur)}</b><span>${esc(sub)}</span></div><button class="tpill ${paused?'p':''}" data-act="spause" aria-label="Pause or resume"><span id="stimer"></span><em>${paused?'Resume':'Pause'}</em></button></div><div class="sbar"><i id="sbar" style="background:${x.color}"></i></div></div>
  <div class="sess-b"><div>${body}</div></div>
  <div class="sess-f"><div><button class="btn gray sm" data-act="stop">${free?'Stop and save':'Finish early'}</button><button class="btn red sm" data-act="cancel" aria-label="Discard">${ic('x')}</button></div></div>`;
 updateTimers();
}
function updateTimers(){
 const a=S.active;if(!a)return;
 const secs=activeSecs(),free=a.mode==='free',txt=free?fmtHMS(secs):fmtMS(WORK-secs),pct=free?0:secs/WORK;
 ['stimer','htimer','mtimer'].forEach(id=>{const n=$(id);if(n)n.textContent=id==='stimer'&&free?fmtMS(secs):txt});
 const sb=$('sbar');if(sb)sb.style.width=(Math.min(1,pct)*100).toFixed(1)+'%';
 [['sring',2*Math.PI*40],['mring',2*Math.PI*15]].forEach(([id,c])=>{const n=$(id);if(n&&n.style)n.style.strokeDashoffset=(c*(1-Math.min(1,pct))).toFixed(1)});
}
function renderMini(){
 const m=$('mini'),a=S.active;
 if(!a||sessOpen){m.innerHTML='';return}
 const x=C(a.course),p=curItem();
 const free=a.mode==='free';
 m.innerHTML=`<div class="mini" data-act="sopen" role="button" aria-label="Open session"><div class="mr">${ringSvg(38,15,4,0,x.color).replace('class="pg"','class="pg" id="mring"')}${`<span style="position:relative;color:${x.color};font-size:15px;display:grid">${ic(x.ic)}</span>`}</div><div class="mt"><b>${esc(free?'Free session':shortTitle(p?p.title:''))}</b><span>${a.pausedAt?'Paused · ':''}${x.short} · tap to open</span></div><span class="tm" id="mtimer"></span></div>`;
 updateTimers();
}
function syncUI(){render();renderSession();renderMini()}

/* ---------- actions ---------- */
function ping(){
 try{navigator.vibrate&&navigator.vibrate([250,120,250])}catch(e){}
 try{const Ctx=window.AudioContext||window.webkitAudioContext;const c=new Ctx();const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.frequency.value=880;g.gain.value=.15;o.start();setTimeout(()=>{o.stop();c.close()},450)}catch(e){}
 try{if('Notification' in window&&Notification.permission==='granted')new Notification('Block done',{body:'Rate your focus and take a 15 min break.'})}catch(e){}
}
async function keepAwake(on){try{if(on&&'wakeLock' in navigator){wakeLock=await navigator.wakeLock.request('screen')}else if(wakeLock){await wakeLock.release();wakeLock=null}}catch(e){}}
function askNotif(){try{if('Notification' in window&&Notification.permission==='default')Notification.requestPermission()}catch(e){}}
function finishSession(minutes,focus,doneIds){
 const a=S.active;if(!a)return;
 const items=(a.items||[]).map(id=>planAll().find(p=>p.id===id)).filter(Boolean);
 const kind=a.mode==='free'?'F':(items[0]?items[0].kind:'F');
 const parts={};items.forEach(p=>{parts[p.kind]=(parts[p.kind]||0)+minutes/items.length});
 S.sessions.push({id:uid(),course:a.course,kind,title:a.mode==='free'?a.title:items.map(p=>shortTitle(p.title)).join(' + '),start:a.startTs,minutes:Math.round(minutes*10)/10,focus:focus||0,planId:items[0]?items[0].id:null,planIds:items.map(p=>p.id),parts:items.length>1?Object.keys(parts).map(k=>({k,m:Math.round(parts[k]*10)/10})):undefined,mode:a.mode});
 (doneIds||[]).forEach(id=>{S.planDone[id]=true});
 S.active=null;sessOpen=false;keepAwake(false);
}
const A={
 pstart(el){
  if(S.active){sessOpen=true;syncUI();return}
  askNotif();
  const ids=el&&el.dataset&&el.dataset.ids?el.dataset.ids.split(',').filter(Boolean):null;
  openPicker(el&&el.dataset&&el.dataset.course,ids);
 },
 prow(el){if(S.active){sessOpen=true;syncUI();return}const p=planAll().find(x=>x.id===el.dataset.id);if(p){askNotif();openPicker(p.course,[p.id])}},
 pcourse(el){const sg=suggest();P.course=el.dataset.id;const f=sg&&sg.course===P.course&&sg.item?sg.item:pickItems(P.course)[0];P.sel=f?[f.id]:[];setSheet(pickerBody(sg),pickerFoot())},
 ptoggle(el){const id=el.dataset.id,i=P.sel.indexOf(id);if(i>=0)P.sel.splice(i,1);else P.sel.push(id);setSheet(pickerBody(),pickerFoot())},
 pgo(){
  if(!P||!P.sel.length)return;
  const order=pickItems(P.course).map(p=>p.id);
  const items=P.sel.slice().sort((a,b)=>order.indexOf(a)-order.indexOf(b));
  const first=planAll().find(p=>p.id===items[0]);
  S.active={mode:'block',course:P.course,items,cur:items[0],tab:first&&first.kind==='E'?'ex':'lesson',startTs:Date.now(),alerted:false,fin:null};
  S.brk=null;S.course=P.course;sessOpen=true;P=null;
  closeSheet();save();syncUI();keepAwake(true);
 },
 sclose(){closeSheet()},
 sopen(){sessOpen=true;syncUI()},
 smin(){sessOpen=false;syncUI()},
 scur(el){const a=S.active;a.cur=el.dataset.id;const p=curItem();a.tab=p&&p.kind==='E'?'ex':'lesson';save();renderSession()},
 stab(el){S.active.tab=el.dataset.k;save();renderSession()},
 ltab(el){lTab=el.dataset.k;render()},
 mpct(el){const a=S.active;a.mast=a.mast||{};a.mast[el.dataset.id]=+el.dataset.p;save();renderSession()},
 fitem(el){const a=S.active,id=el.dataset.id,i=a.fin.indexOf(id);if(i>=0)a.fin.splice(i,1);else a.fin.push(id);save();renderSession()},
 rate(el){const a=S.active,secs=activeSecs(),m=a.mast||{},ids=[];
  Object.keys(m).forEach(id=>{S.mast[id]={p:m[id],ts:Date.now()};const p=planAll().find(q=>q.id===id);if(m[id]>=70)ids.push(id);
   if(p&&p.kind==='E'&&m[id]<=50){const t=C(p.course).short+' · '+shortTitle(p.title);if(!S.redo.some(r=>r.title===t)){const d=new Date();d.setDate(d.getDate()+1);S.redo.push({id:uid(),course:p.course,title:t,stage:0,due:dkey(d)})}}});
  finishSession(Math.min(50,secs/60),+el.dataset.f,ids);S.brk={until:Date.now()+BREAK*1000};save();syncUI()},
 stop(){
  const a=S.active,m=activeSecs()/60;
  if(a.mode==='free'){if(m>=1)finishSession(m,0,[]);else{S.active=null;sessOpen=false}keepAwake(false);save();syncUI();return}
  if(m<1){S.active=null;sessOpen=false;keepAwake(false);save();syncUI();return}
  a.endTs=a.pausedAt||Date.now();save();renderSession();renderMini();
 },
 cancel(){if(confirm('Discard this session?')){S.active=null;sessOpen=false;keepAwake(false);save();syncUI()}},
 spause(){const a=S.active;if(!a||a.endTs)return;if(a.pausedAt){a.pms=(a.pms||0)+Date.now()-a.pausedAt;a.pausedAt=null}else a.pausedAt=Date.now();save();renderSession();renderMini()},
 skipbrk(){S.brk=null;save();render()},
 freeopen(){freeModal()},
 freego(){const c=$('m-course').value,t=$('m-title').value.trim();askNotif();
  S.course=c;S.active={mode:'free',course:c,items:[],title:t||'Free work',startTs:Date.now()};S.brk=null;sessOpen=true;closeSheet();save();syncUI();keepAwake(true)},
 pdone(el){S.planDone[el.dataset.id]=!S.planDone[el.dataset.id];save();render();if(S.active)renderSession()},
 lessonopen(el){lessonModal(el&&el.dataset&&el.dataset.course)},
 plannew(el){const cid=el.dataset.id.split(':')[0],l=lessonsOf(cid).find(x=>x.id===el.dataset.id);if(!l)return;
  addLesson(cid,(/^\d+$/.test(l.num)?'Ch.'+l.num+' · ':'')+l.title,2,true,l.id);render()},
 lessongo(){const t=$('m-title').value.trim();if(!t)return;
  const made=addLesson($('m-course').value,t,+$('m-n').value,$('m-ex').value==='1');
  setSheet(`<div class="grp">${made.map(p=>`<div class="cell"><span class="t"><b>${esc(p.title)}</b><span>${new Date(p.date+'T12:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})}</span></span></div>`).join('')}</div>`,`<button class="btn" data-act="sclose">Done</button>`);render()},
 open(el){flushRead();hist.push([view,param]);view=el.dataset.v;param=el.dataset.p||null;if(view==='lesson')lTab='lesson';render();window.scrollTo(0,0)},
 back(){flushRead();const h=hist.pop();view=h?h[0]:'today';param=h?h[1]:null;render();window.scrollTo(0,0)},
 tprev(){S.tw=(S.tw||0)-1;save();render()},tnext(){S.tw=(S.tw||0)+1;save();render()},tnow(){S.tw=0;save();render()},
 insr(el){insR=el.dataset.k;render()},insby(el){insBy=el.dataset.k;render()},
 tip(el){const t=$('tipline');if(t)t.textContent=el.dataset.tip},
 tip2(el){const t=$('tipline2');if(t)t.textContent=el.dataset.tip},
 theme(el){setTheme(el.dataset.k);render()},
 manual(){sessionModal()},
 sedit(el){sessionModal(S.sessions.find(s=>s.id===el.dataset.id))},
 sdel(el){if(confirm('Delete this session?')){S.sessions=S.sessions.filter(s=>s.id!==el.dataset.id);save();render()}},
 msave(el){
  const v={course:$('m-course').value,kind:$('m-kind').value,start:new Date($('m-start').value).getTime(),minutes:+$('m-min').value||0,title:$('m-title').value.trim(),focus:+$('m-focus').value};
  if(!v.minutes||isNaN(v.start))return;
  if(el.dataset.id)Object.assign(S.sessions.find(s=>s.id===el.dataset.id),v);else S.sessions.push(Object.assign({id:uid(),mode:'manual'},v));
  save();closeSheet();render()},
 newredo(){redoModal()},
 rsave(){const t=$('m-title').value.trim();if(!t)return;const d=new Date();d.setDate(d.getDate()+1);
  S.redo.push({id:uid(),course:$('m-course').value,title:t,stage:0,due:dkey(d)});save();closeSheet();render()},
 rok(el){const r=S.redo.find(x=>x.id===el.dataset.id);if(r.stage>=STAGES.length-1){S.redo=S.redo.filter(x=>x!==r)}else{r.stage++;const d=new Date();d.setDate(d.getDate()+STAGES[r.stage]);r.due=dkey(d)}save();render()},
 rko(el){const r=S.redo.find(x=>x.id===el.dataset.id);r.stage=0;const d=new Date();d.setDate(d.getDate()+1);r.due=dkey(d);save();render()},
 rdel(el){S.redo=S.redo.filter(x=>x.id!==el.dataset.id);save();render()},
 newdl(){dlModal()},
 dlsave(){const t=$('m-title').value.trim(),w=$('m-when').value;if(!t||!w)return;
  S.deadlines.push({id:uid(),course:$('m-course').value,title:t,when:w});save();closeSheet();render()},
 dldel(el){const d=S.deadlines.find(x=>x.id===el.dataset.id);if(d&&d.off)S.dlHide[d.id]=1;S.deadlines=S.deadlines.filter(x=>x.id!==el.dataset.id);save();render()},
 notif(){askNotif()},
 async cconnect(){const v=($('cl-token')||{}).value;if(!v||v.length<20){alert('Paste your GitHub token first.');return}CL.status='Connecting…';const ok=await cloudConnect(v);if(!ok)alert('Could not connect. The token needs the "gist" permission only.');render()},
 csync(){cloudPull().then(()=>render())},
 cdisc(){if(confirm('Disconnect this device from the cloud? Your data stays here.')){CL={};saveCL();render()}},
 async ccopy(){try{await navigator.clipboard.writeText(CL.token||'');alert('Token copied. Paste it on your other device in Settings > Cloud sync.')}catch(e){alert('Copy failed.')}},
 export(){const b=new Blob([JSON.stringify(S,null,1)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='lingnan-cc-backup-'+today()+'.json';a.click()},
 reset(){if(confirm('Erase ALL data on this device?')){localStorage.removeItem(KEY);S=load();sessOpen=false;syncUI()}}
};
document.addEventListener('click',e=>{
 const tb=e.target.closest('[data-tab]');
 if(tb){flushRead();view=tb.dataset.tab;param=null;hist=[];if(S.tw&&view==='timetable'){}render();window.scrollTo(0,0);return}
 const el=e.target.closest('[data-act]');
 if(el&&A[el.dataset.act]&&!['SELECT','INPUT'].includes(el.tagName))A[el.dataset.act](el,e);
});
document.addEventListener('change',e=>{
 const el=e.target;
 if(el.id==='imp'){const f=el.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);localStorage.setItem(KEY,JSON.stringify(d));S=load();syncUI();alert('Backup imported.')}catch(x){alert('Invalid file.')}};r.readAsText(f);return}
 const a=el.dataset&&el.dataset.act;if(!a)return;
 if(a==='target'){S.settings.target[el.dataset.id]=el.value;save()}
 if(a==='daily'){S.settings.daily=+el.value||4;save()}
 if(a==='weekly'){S.settings.weekly=+el.value||24;save()}
 if(a==='quota'){S.settings.quota[el.dataset.d]=Math.max(0,+el.value||0);save()}
 if(a==='conf'){S.settings.confidence[el.dataset.id]=+el.value;save();render()}
});

/* ---------- reading time (automatic, separate from focus sessions) ---------- */
let rd={act:Date.now(),carry:0};
['scroll','click','touchstart','keydown','mousemove'].forEach(ev=>document.addEventListener(ev,()=>{rd.act=Date.now()},{passive:true}));
function readTick(){
 if(S.active||document.hidden)return;
 const st=view==='study'&&STUDY&&STUDY.queue.length?cardById(STUDY.queue[0]):null;
 if(!st&&(view!=='lesson'||!param))return;
 if(Date.now()-rd.act>120000)return;
 rd.carry++;rd.lid=st?st.c+':cards':String(param);
 if(rd.carry>=30){addRead(rd.lid,rd.carry);rd.carry=0}
}
function addRead(lid,sec){
 const id=today()+'|'+lid;let r=S.reads.find(x=>x.id===id);
 if(!r){r={id,course:lid.split(':')[0],lid,day:today(),sec:0};S.reads.push(r)}
 r.sec+=sec;save();
}
function flushRead(){if(rd.carry>=5&&rd.lid&&(view==='lesson'||view==='study'))addRead(rd.lid,rd.carry);rd.carry=0}

/* ---------- ticking ---------- */
function tick(){
 readTick();
 const a=S.active;
 if(a){
  if(a.mode==='block'&&!a.endTs&&activeSecs()>=WORK){a.endTs=a.startTs+(a.pms||0)+WORK*1000;a.alerted=true;sessOpen=true;save();ping();syncUI();return}
  updateTimers();
 }else if(S.brk){
  const left=(S.brk.until-Date.now())/1000;
  if(left<=0){S.brk=null;save();ping();if(view==='today')render()}
  else{const b=$('brk');if(b)b.textContent=fmtMS(left)}
 }
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden){tick();render();renderSession();if(S.active)keepAwake(true);cloudPull()}});

/* ---------- flashcards ---------- */
const NEWDAY=20;
const CD=window.CARDS||{};
let STUDY=null,DECK=null;
function deck(){if(!DECK)DECK=(CD.buildDeck&&typeof CONTENT!=='undefined')?CD.buildDeck(CONTENT):[];return DECK}
function allCards(){return deck().concat(S.xcards||[])}
function cardById(id){return allCards().find(c=>c.id===id)}
function unlocked(){const t=today(),set=new Set();planAll().forEach(p=>{if(p.date<=t||S.planDone[p.id])pLids(p).forEach(l=>set.add(l))});return set}
const nfl=()=>Object.values(S.flags||{}).filter(f=>f.on).length;
const flagged=id=>S.flags&&S.flags[id]&&S.flags[id].on;
function cardQueue(course){
 const now=Date.now(),un=unlocked(),all=allCards().filter(c=>(!course||c.c===course)&&!flagged(c.id));
 const dueC=all.filter(c=>S.cards[c.id]&&S.cards[c.id].due<=now).sort((a,b)=>S.cards[a.id].due-S.cards[b.id].due);
 const introduced=Object.values(S.cards).filter(s=>s.fd===today()).length;
 const left=Math.max(0,NEWDAY-introduced);
 const fresh=all.filter(c=>!S.cards[c.id]);
 const err=fresh.filter(c=>c.src==='e');
 let pool=fresh.filter(c=>c.src!=='e'&&(un.size?un.has(c.l):true));
 /* round-robin across courses so one subject does not take all new cards */
 const by={};pool.forEach(c=>(by[c.c]=by[c.c]||[]).push(c));
 const rr=[];let more=true;while(more){more=false;Object.keys(by).forEach(k=>{if(by[k].length){rr.push(by[k].shift());more=true}})}
 const nw=err.concat(rr.slice(0,course?Math.min(left,NEWDAY):left));
 return {due:dueC,fresh:nw,all:dueC.concat(nw)};
}
function cardsRow(){
 const q=cardQueue(),n=q.all.length;if(!n)return'';
 return `<button class="cell has-ico" data-v="cards" data-act="open"><span class="sq" style="--c:var(--accent)">${ic('cards')}</span><span class="t"><b>Flashcards</b><span>${q.due.length} due · ${q.fresh.length} new · ~${Math.max(1,Math.round(n/4))} min</span></span>${ic('chev','chev')}</button>`;
}
function vCards(){
 const q=cardQueue(),day=today();
 const doneToday=Object.values(S.cards).filter(s=>s.ts&&dkey(s.ts)===day).length;
 const rows=COURSES.map(c=>{const k=cardQueue(c.id);const tot=allCards().filter(x=>x.c===c.id).length,seen=allCards().filter(x=>x.c===c.id&&S.cards[x.id]).length;
  return `<button class="cell has-ico" data-act="cstart" data-course="${c.id}" ${k.all.length?'':'disabled'} style="--c:${c.color}"><span class="sq big" style="--c:${c.color}">${ic(c.ic)}</span><span class="t"><b>${esc(c.short)}</b><span>${k.due.length} due · ${k.fresh.length} new · ${seen}/${tot} learned</span></span>${ic('chev','chev')}</button>`}).join('');
 const xc=(S.xcards||[]).length;
 return `<div class="view">${title('Flashcards')}
 <div class="grp"><div class="cell"><span class="t"><b>${q.due.length} due · ${q.fresh.length} new</b><span>About ${Math.max(1,Math.round(q.all.length/4))} min · ${doneToday} reviewed today · counts as extra review time</span></span></div></div>
 <div style="margin:14px 0"><button class="btn" data-act="cstart" ${q.all.length?'':'disabled'}>${ic('play')} Study all</button></div>
 <div class="sh">By course</div><div class="grp">${rows}</div>
 ${nfl()?`<div class="grp" style="margin-top:14px"><button class="cell has-ico" data-act="cflagged"><span class="sq" style="--c:var(--orange)">⚑</span><span class="t"><b>To rework</b><span>${nfl()} flagged card${nfl()>1?'s':''}, hidden from study</span></span>${ic('chev','chev')}</button></div>`:''}
 <div class="sf">Tap a card to flip it. Swipe right if you knew it, left if not (it comes back soon). Or use Again / Hard / Good / Easy. ${xc?`${xc} card${xc>1?'s':''} came from your own mistakes.`:'Mistakes in fill-in tables become cards here.'}</div></div>`;
}
function vStudy(){
 const st=STUDY;if(!st)return vCards();
 const c=st.queue.length?cardById(st.queue[0]):null;
 if(!c){return `<div class="view">${navbar('Cards','')}<div class="done-card"><div class="tick">${ic('check')}</div><h1 class="lt" style="margin:0;font-size:28px">Session done</h1><p class="mute">${st.done} answers · ${st.again} to see again soon</p></div><div style="margin-top:20px"><button class="btn" data-act="cexit">Back to cards</button></div></div>`}
 const x=C(c.c),nl=s=>md(s).replace(/\n/g,'<br>'),S0=S.cards[c.id];
 const btn=(g,n,cl)=>`<button class="cg ${cl}" data-act="cgrade" data-g="${g}"><b>${n}</b><span>${CD.label(S0,g)}</span></button>`;
 return `<div class="view study">${navbar('Cards',`<span class="mute" style="font-size:14px">${st.queue.length} left</span>`)}
 <div class="fc ${st.flipped?'flip':''}" id="fc"><button class="fc-flag" data-act="cflag" aria-label="Flag this card to rework" title="Flag to rework">⚑</button><div class="fc-top"><i style="background:${x.color}"></i>${esc(x.short)} · ${esc(c.sec||c.lt||'')}</div>
  <div class="fc-q">${nl(c.q)}</div>
  ${st.flipped?`<div class="fc-sep"></div><div class="fc-a">${nl(c.a)}</div>`:`<div class="fc-hint">Tap to show the answer</div>`}</div>
 ${st.flipped?`<div class="cgs">${btn(0,'Again','r')}${btn(1,'Hard','o')}${btn(2,'Good','g')}${btn(3,'Easy','b')}</div><div class="fc-tip">← swipe left: again · swipe right: good →</div>`:''}</div>`;
}
function startStudy(course){
 const q=cardQueue(course).all;if(!q.length)return;
 STUDY={course:course||null,queue:q.map(c=>c.id),flipped:false,done:0,again:0};
 hist.push([view,param]);view='study';param=null;render();window.scrollTo(0,0);
}
function cgrade(g){
 if(!STUDY||!STUDY.queue.length)return;
 const id=STUDY.queue.shift();S.cards[id]=CD.grade(S.cards[id],g);
 STUDY.done++;if(g===0){STUDY.again++;STUDY.queue.splice(Math.min(3,STUDY.queue.length),0,id)}
 STUDY.flipped=false;save();render();window.scrollTo(0,0);
}
let drag=null;
document.addEventListener('pointerdown',e=>{const f=e.target.closest&&e.target.closest('#fc');if(!f||view!=='study'||e.target.closest('.fc-flag'))return;drag={x:e.clientX,dx:0,el:f};try{f.setPointerCapture(e.pointerId)}catch(_){}});
document.addEventListener('pointermove',e=>{if(!drag)return;drag.dx=e.clientX-drag.x;if(!STUDY||!STUDY.flipped)return;const d=drag.dx;drag.el.style.transform=`translateX(${d}px) rotate(${d/25}deg)`;drag.el.classList.toggle('sw-r',d>60);drag.el.classList.toggle('sw-l',d<-60)});
document.addEventListener('pointerup',()=>{if(!drag)return;const d=drag.dx,el=drag.el;drag=null;
 if(Math.abs(d)<8){if(STUDY&&!STUDY.flipped){STUDY.flipped=true;render()}return}
 if(STUDY&&STUDY.flipped&&d>100)cgrade(2);else if(STUDY&&STUDY.flipped&&d<-100)cgrade(0);else{el.style.transform='';el.classList.remove('sw-r','sw-l')}});
document.addEventListener('keydown',e=>{if(view!=='study'||!STUDY||/INPUT|TEXTAREA/.test((e.target||{}).tagName||''))return;
 if(e.key===' '||e.key==='Enter'){e.preventDefault();if(!STUDY.flipped){STUDY.flipped=true;render()}}
 else if(STUDY.flipped&&'1234'.includes(e.key))cgrade(+e.key-1)});

/* ---------- fill-in tables ---------- */
const parseNum=s=>{let t=String(s).replace(/[\$€£\s,]/g,'').replace(/[−–]/g,'-');let neg=/^\(.*\)$/.test(t);t=t.replace(/[()%]/g,'');let v=parseFloat(t);if(isNaN(v))return NaN;return neg?-Math.abs(v):v};
function tPractical(rows){const t=CD.numTable(rows);return t.n>=4&&t.ratio>=.5}
function tMins(rows){return Math.max(3,Math.round(CD.numTable(rows).n*.6))}
let TP=null;
function tableOf(lid,k,i){const [cid,num]=String(lid).split(':'),d=courseDoc(cid),doc=d&&d.lessons&&d.lessons[num];if(!doc)return null;const tbs=(doc[k]||[]).filter(b=>b.t==='table');const lastH=(()=>{let h='',n=-1;for(const b of doc[k]||[]){if(b.t==='h')h=CD.strip(b.x);if(b.t==='table'){n++;if(n===i)return h}}return''})();return tbs[i]?{rows:tbs[i].rows,h:lastH,cid,num,lt:doc.title}:null}
function tpBody(done){
 const t=TP,R=t.rows;let ii=0,cap='';
 const trs=R.map((r,ri)=>{
  if(ri===0&&r.slice(1).every(c=>!String(c).trim())){cap=CD.strip(r[0]);return''}
  return `<tr>${r.map((c,ci)=>{
   if(ci>0&&CD.isNum(c)){const id=ii++,u=t.ans[id];
    if(!done)return `<td><input class="tin" id="ti${id}" inputmode="decimal" autocomplete="off" value="${esc(u==null?'':u)}"></td>`;
    const ok=t.res[id];return `<td class="${ok?'tok':'tbad'}">${ok?md(c):`<s>${esc(u||'—')}</s> <b>${md(c)}</b>`}</td>`}
   return `<td>${md(c)}</td>`}).join('')}</tr>`}).join('');
 t.cap=cap;
 return `${cap?`<p class="mute" style="margin:0 0 8px"><b>${esc(cap)}</b></p>`:''}${t.h?`<p class="mute" style="margin:0 0 8px;font-size:13px">${esc(t.h)}</p>`:''}<div class="tw"><table>${trs}</table></div>${done?`<p style="margin-top:12px"><b>${t.score}/${t.n} correct</b> · ${t.mins} min taken (planned ~${t.est})${t.wrong?` · ${t.wrong} mistake${t.wrong>1?'s':''} added to your flashcards`:''}</p>`:'<p class="mute" style="font-size:13px;margin-top:10px">Type each amount from memory (no $ or commas needed). Brackets or minus signs count for negatives.</p>'}`;
}
Object.assign(A,{
 cstart(el){startStudy(el&&el.dataset&&el.dataset.course||null)},
 cflip(){if(STUDY){STUDY.flipped=true;render()}},
 cgrade(el){cgrade(+el.dataset.g)},
 cflag(){if(!STUDY||!STUDY.queue.length)return;const id=STUDY.queue.shift();S.flags[id]={on:true,ts:Date.now()};STUDY.flipped=false;save();render()},
 cunflag(el){S.flags[el.dataset.id]={on:false,ts:Date.now()};save();A.cflagged()},
 cflagged(){const l=allCards().filter(c=>flagged(c.id));openSheet('To rework',l.length?`<div class="grp">${l.map(c=>`<div class="cell"><span class="t"><b style="font-size:14px">${esc(c.q.slice(0,120))}</b><span>${esc(C(c.c).short)} · ${esc((c.sec||'').slice(0,50))}</span></span><button class="btn tint sm" data-act="cunflag" data-id="${c.id}">Restore</button></div>`).join('')}</div>`:'<p class="mute">Nothing flagged.</p>',l.length?'<button class="btn" data-act="ccopy2">Copy the list</button>':'')},
 ccopy2(){const t=allCards().filter(c=>flagged(c.id)).map(c=>`[${c.c} ${c.l}] ${c.q.replace(/\n/g,' / ')} => ${c.a.replace(/\n/g,' / ')}`).join('\n');try{navigator.clipboard.writeText(t)}catch(e){}const b=$('sf');if(b)b.innerHTML='<button class="btn" data-act="sclose">Copied. Close</button>'},
 cexit(){STUDY=null;const h=hist.pop();view='cards';param=null;render();window.scrollTo(0,0)},
 tpractice(el){
  const t=tableOf(el.dataset.lid,el.dataset.k,+el.dataset.i);if(!t)return;
  TP=Object.assign(t,{ans:{},res:{},t0:Date.now(),est:tMins(t.rows),n:CD.numTable(t.rows).n});
  openSheet('Fill it in',tpBody(false),`<button class="btn" data-act="tcheck">Check my answers</button>`);
 },
 tcheck(){
  const t=TP;if(!t)return;let id=0,ok=0,wrong=0;
  const cells=[];const R=t.rows;
  R.forEach((r,ri)=>{if(ri===0&&r.slice(1).every(c=>!String(c).trim()))return;r.forEach((c,ci)=>{if(ci>0&&CD.isNum(c)){cells.push({id:id++,v:c,lab:CD.strip(r[0]),col:CD.strip(R[ri>0&&R[0].slice(1).some(x=>String(x).trim())?0:0][ci]||'')})}})});
  cells.forEach(c=>{const inp=$('ti'+c.id),u=inp?inp.value.trim():'';t.ans[c.id]=u;const a=parseNum(u),b=parseNum(c.v);const good=!isNaN(a)&&Math.abs(a-b)<=Math.max(.01,Math.abs(b)*.005);t.res[c.id]=good;if(good)ok++;else{wrong++;
   const q=`${t.cap||t.h||t.lt} — ${c.lab}${c.col&&R[0].slice(1).some(x=>String(x).trim())&&R[0][1]!==''?` (${c.col})`:''}`,idc='x:'+CD.hash(t.cid+t.num+q);
   const ex=(S.xcards||[]).find(x=>x.id===idc);if(!ex)S.xcards.push({id:idc,c:t.cid,l:t.cid+':'+t.num,lt:t.lt,sec:t.h||t.cap||'',src:'e',q:q,a:CD.strip(c.v)});delete S.cards[idc]}});
  t.score=ok;t.wrong=wrong;t.mins=Math.max(1,Math.round((Date.now()-t.t0)/60000));
  save();setSheet(tpBody(true),`<button class="btn" data-act="sclose">Done</button>`);
 },
});

setTheme(S.settings.theme);
autoPlan();
syncUI();
cloudPull();
setInterval(()=>{if(!document.hidden&&!S.active)cloudPull()},120000);
setInterval(tick,1000);
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
