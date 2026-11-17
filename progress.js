/* ---------- Progress tabs (Writing and Tage Mage): visual summary of scores, time and vocabulary. ---------- */
const pgWeeks=n=>{const ws=weekStart(),o=[];for(let i=n-1;i>=0;i--){const a=new Date(ws);a.setDate(a.getDate()-i*7);const b=new Date(a);b.setDate(b.getDate()+7);o.push({a:a.getTime(),b:b.getTime(),lab:a.toLocaleDateString('en-GB',{day:'numeric',month:'short'})})}return o};
const pgDay=ts=>new Date(ts).toLocaleDateString('en-GB',{day:'numeric',month:'short'});
const pgNum=(v,d=1)=>v==null||isNaN(v)?'—':(Math.round(v*Math.pow(10,d))/Math.pow(10,d)).toString();
function pgMins(m){return effEvents().filter(e=>e.m===m)}
function pgTimeCard(m,col,title){
 const ev=pgMins(m),W=pgWeeks(8),v=W.map(w=>ev.filter(e=>e.ts>=w.a&&e.ts<w.b).reduce((s,e)=>s+e.sec/60,0)),max=Math.max(30,...v),H=84,tot=ev.reduce((s,e)=>s+e.sec/60,0);
 return `<div class="card" style="margin-top:14px"><div class="card-h"><h3>${title||'Effective time'}</h3><span class="mute small">${fmt(tot)} in total</span></div>
 <div class="tmh" style="height:${H+14}px;margin-top:18px">${v.map(x=>`<div style="height:${x<=0?2:Math.max(4,x/max*H)}px;background:${col};${x<=0?'opacity:.25':''}">${x>0?`<b>${fmtAx(Math.round(x))}</b>`:''}</div>`).join('')}</div>
 <div class="axis">${W.map((w,i)=>`<span>${i%2?'':w.lab}</span>`).join('')}</div>
 <div class="tipline mute small">Per week, last 8 weeks. Counts only time spent really working, not time with the app open.</div></div>`;
}
function pgLine(pts,o){
 const n=pts.length,H=o.h||130,max=o.max,X=i=>n>1?i/(n-1)*92+4:50,Y=v=>Math.max(0,Math.min(100,v/max*100));
 const poly=pts.map((p,i)=>`${X(i).toFixed(1)},${(100-Y(p.v)).toFixed(1)}`).join(' ');
 const avg=pts.map((p,i)=>{const s=pts.slice(Math.max(0,i-2),i+1);return s.reduce((a,x)=>a+x.v,0)/s.length}),apoly=avg.map((v,i)=>`${X(i).toFixed(1)},${(100-Y(v)).toFixed(1)}`).join(' ');
 const dots=pts.map((p,i)=>`<button class="pgd" data-act="pgtip" data-tip="${esc(p.tip||'')}" style="left:${X(i)}%;bottom:${Y(p.v)}%;--c:${p.c||o.col}" aria-label="${esc(p.tip||'')}"></button>`).join('');
 const grid=[0,.25,.5,.75,1].map(f=>`<div class="pgg" style="bottom:${f*100}%"><span>${Math.round(max*f)}</span></div>`).join('');
 return `<div class="pgw"><div class="pgc" style="height:${H}px">${grid}<svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="${poly}" class="pgl" style="stroke:${o.col}"/>${n>=4?`<polyline points="${apoly}" class="pga" style="stroke:${o.col}"/>`:''}</svg>${dots}</div></div>
 <div class="tipline mute small" id="pgtip">${esc(o.msg||'Tap a point for details')}</div>`;
}
const pgBar=(p,c)=>`<div class="tmb"><i style="width:${Math.round(Math.max(0,Math.min(1,p||0))*100)}%;background:${c}"></i></div>`;
const wScore=x=>{const v=parseFloat(String(x.score==null?'':x.score).replace(',','.'));return isNaN(v)?null:v};
const WKC={essay:'#0a84ff',theme:'#b45309',version:'#16a34a'},WKN={essay:'Essay',theme:'Thème',version:'Version'};

function wriProg(){
 const T=wriT(),L=T.list.slice().sort((a,b)=>a.ts-b.ts),G=L.filter(x=>wScore(x)!=null);
 const l5=G.slice(-5),p5=G.slice(-10,-5),avg=a=>a.length?a.reduce((s,x)=>s+wScore(x),0)/a.length:null;
 const a5=avg(l5),b5=avg(p5),best=G.reduce((m,x)=>Math.max(m,wScore(x)),0);
 const ev=pgMins('wri'),tot=ev.reduce((s,e)=>s+e.sec/60,0),ws=weekStart().getTime(),wk=ev.filter(e=>e.ts>=ws).reduce((s,e)=>s+e.sec/60,0);
 const words=L.reduce((s,x)=>s+(x.words||0),0);
 const stats=`<div class="stats" style="margin-bottom:10px"><div class="stat"><b>${L.length}</b><span>exercises</span></div><div class="stat"><b>${a5==null?'—':pgNum(a5)}</b><span>avg of last 5 /20</span></div><div class="stat"><b>${G.length?pgNum(best):'—'}</b><span>best /20</span></div></div>
 <div class="stats" style="margin-bottom:14px"><div class="stat"><b>${fmt(wk)}</b><span>this week</span></div><div class="stat"><b>${fmt(tot)}</b><span>effective, total</span></div><div class="stat"><b>${words}</b><span>words written</span></div></div>`;
 let curve;
 if(!G.length)curve=`<div class="empty">Save an exercise with Claude's feedback pasted in: the /20 score is read from it automatically and plotted here.</div>`;
 else{
  const pts=G.slice(-25).map(x=>({v:wScore(x),c:WKC[x.kind]||'#888',tip:`${pgDay(x.ts)} · ${WKN[x.kind]||x.kind} · ${wLangName(x.lang)} ${x.lvl} · ${pgNum(wScore(x))}/20`}));
  const msg=a5==null?'':`Last 5 average ${pgNum(a5)}/20${b5!=null?` · ${a5-b5>=0?'+':''}${pgNum(a5-b5)} vs the 5 before`:''}. Tap a point for details.`;
  curve=`<div class="card"><div class="card-h"><h3>Score over time</h3><span class="mute small">/20, dashed = rolling average</span></div>${pgLine(pts,{max:20,col:'var(--accent)',msg})}
  <div class="legend">${Object.keys(WKN).map(k=>`<span class="lg"><i style="background:${WKC[k]}"></i>${WKN[k]}</span>`).join('')}</div></div>`}
 const kinds=Object.keys(WKN).map(k=>{const l=L.filter(x=>x.kind===k),g=l.filter(x=>wScore(x)!=null),a=avg(g),lst=g.length?wScore(g[g.length-1]):null;
  return `<div class="cell"><span class="t"><b>${WKN[k]}</b><span>${l.length} done${g.length?` · average ${pgNum(a)}/20 · last ${pgNum(lst)}/20`:' · no score yet'}</span>${pgBar((a||0)/20,WKC[k])}</span></div>`}).join('');
 const langs=['en','it','es'].map(k=>{const l=L.filter(x=>x.lang===k);if(!l.length)return '';const g=l.filter(x=>wScore(x)!=null),a=avg(g);
  return `<div class="cell"><span class="t"><b>${wLangName(k)}</b><span>${l.length} done${g.length?` · average ${pgNum(a)}/20`:''}</span>${pgBar((a||0)/20,'var(--accent)')}</span></div>`}).join('');
 const V=T.vocab,st=V.map(v=>vcGet(v)),mature=st.filter(s=>s&&s.i>=21).length,learn=st.filter(s=>s&&s.i<21).length,fresh=V.length-mature-learn;
 const seg=(n,c)=>n?`<i style="flex:${n};background:${c}"></i>`:'';
 const vocab=`<div class="card" style="margin-top:14px"><div class="card-h"><h3>Vocabulary</h3><span class="mute small">${V.length} words · ${vocDue().length} due now</span></div>
 ${V.length?`<div class="pgs">${seg(mature,'var(--green)')}${seg(learn,'var(--orange)')}${seg(fresh,'var(--l3)')}</div>
 <div class="legend"><span class="lg"><i style="background:var(--green)"></i>Mature ${mature}</span><span class="lg"><i style="background:var(--orange)"></i>Learning ${learn}</span><span class="lg"><i style="background:var(--l3)"></i>New ${fresh}</span></div>
 <p class="mute small" style="margin:8px 0 0">${['en','it','es'].map(l=>wLangName(l)+' '+V.filter(v=>v.lang===l).length).join(' · ')}. A word is mature once its next review is 3 weeks away or more.</p>`:`<p class="mute small" style="margin:0">Words from Claude's VOCAB: block show up here.</p>`}</div>`;
 const hist=L.length?`<div class="eyebrow" style="margin:22px 0 6px">Past exercises</div><div class="grp">${[...L].reverse().map(x=>{const o=WRIOPEN===x.id;return `<div class="tmm"><button class="cell" data-act="wriopen" data-id="${x.id}"><span class="t"><b style="font-size:15px;white-space:normal">${x.topic?esc(x.topic):(WKN[x.kind]||'Exercise')}</b><span>${WKN[x.kind]||x.kind} · ${wLangName(x.lang)} ${x.lvl}</span><span>${pgDay(x.ts)} · ${x.words} words${wScore(x)!=null?' · '+pgNum(wScore(x))+'/20':''}</span></span>${ic(o?'chevd':'chev','chev')}</button>
  ${o?`<div class="tmx">${x.src?`<p class="tmp">${esc(x.src)}</p>`:''}<p style="white-space:pre-line">${esc(x.text)}</p>${x.fb?`<p class="mute small" style="white-space:pre-line">${esc(x.fb)}</p>`:''}<div style="display:flex;gap:8px;align-items:center;margin-top:8px"><input type="text" inputmode="decimal" class="wsedit" data-wsid="${x.id}" value="${esc(x.score||'')}" placeholder="/20" style="width:70px;text-align:center"><button class="btn tint sm" data-act="wriscore" data-id="${x.id}">Set score</button><button class="btn red sm" data-act="wridel" data-id="${x.id}">Delete</button></div></div>`:''}</div>`}).join('')}</div>`:'';
 return stats+curve+`<div class="eyebrow" style="margin:18px 0 6px">By type</div><div class="grp">${kinds}</div>${langs?`<div class="eyebrow" style="margin:18px 0 6px">By language</div><div class="grp">${langs}</div>`:''}`+pgTimeCard('wri','#ff9f0a')+vocab+hist;
}

function tmProg(){
 const T=tmT(),att=T.att.slice().sort((a,b)=>a.ts-b.ts),m=tmMocks(),last=m[m.length-1],best=m.reduce((a,b)=>Math.max(a,b.score),0);
 const ev=pgMins('tage'),tot=ev.reduce((s,e)=>s+e.sec/60,0),ws=weekStart().getTime(),wk=ev.filter(e=>e.ts>=ws).reduce((s,e)=>s+e.sec/60,0);
 const cut=Date.now()-30*864e5,r30=att.filter(a=>a.ts>=cut),n30=r30.reduce((s,a)=>s+a.n,0),ok30=r30.reduce((s,a)=>s+a.ok,0);
 const nd=k=>{const d=tmDays(k);return d>=0?d:null},nx=nd('j')!=null?'j':nd('n')!=null?'n':null;
 const stats=`<div class="stats" style="margin-bottom:10px"><div class="stat"><b>${nx?nd(nx):'—'}</b><span>days to ${nx?TM_DEF[nx][1].toLowerCase():'next sitting'}</span></div><div class="stat"><b>${att.length}</b><span>tests done</span></div><div class="stat"><b>${n30?Math.round(ok30/n30*100)+' %':'—'}</b><span>right · 30 days</span></div></div>
 <div class="stats" style="margin-bottom:14px"><div class="stat"><b>${last?last.score:'—'}</b><span>last mock /600</span></div><div class="stat"><b>${m.length?best:'—'}</b><span>best mock</span></div><div class="stat"><b>${fmt(wk)}</b><span>this week</span></div></div>`;
 if(!att.length)return stats+`<div class="empty">Your drills and mocks will be charted here: scores, accuracy per subtest and time worked.</div>`+pgTimeCard('tage','#af52de');
 const mc=m.length?`<div class="card"><div class="card-h"><h3>Mock scores</h3><span class="mute small">/600, indicative</span></div>${pgLine(m.slice(-15).map(a=>({v:a.score,tip:`${pgDay(a.ts)} · ${a.hard?'hard ':''}mock · ${a.score}/600 (${a.ok}/${a.n} right)`})),{max:600,col:'#e11d48',msg:m.length>1?`First ${m[0].score}, last ${last.score}, ${last.score-m[0].score>=0?'+':''}${last.score-m[0].score} overall. Tap a point for details.`:'Tap the point for details'})}</div>`:'';
 const ac=`<div class="card" style="${m.length?'margin-top:14px':''}"><div class="card-h"><h3>Accuracy per test</h3><span class="mute small">% right, all tests</span></div>${pgLine(att.slice(-25).map(a=>({v:Math.round(a.ok/a.n*100),c:a.kind==='mock'?'#e11d48':'#af52de',tip:`${pgDay(a.ts)} · ${a.kind==='mock'?'Full mock':(TMK[Object.keys(a.secs)[0]]||{n:'Drill'}).n+(a.review?' · mistakes':'')}${a.hard?' · hard':''} · ${a.ok}/${a.n} right`})),{max:100,col:'#af52de'})}
 <div class="legend"><span class="lg"><i style="background:#af52de"></i>Drill</span><span class="lg"><i style="background:#e11d48"></i>Mock</span></div></div>`;
 const secs=TM_SECS.map(s=>{let ok=0,n=0,t=0,ok3=0,n3=0;att.forEach(a=>{const r=a.secs[s.k];if(!r)return;ok+=r.ok;n+=r.n;t+=r.t||0;if(a.ts>=cut){ok3+=r.ok;n3+=r.n}});return {s,ok,n,t,ok3,n3}}).filter(x=>x.n);
 const sec=secs.length?`<div class="eyebrow" style="margin:18px 0 6px">By subtest</div><div class="grp">${secs.map(x=>{const p=x.ok/x.n,p3=x.n3?x.ok3/x.n3:null,tr=p3==null?'':p3-p>.03?' ▲':p3-p<-.03?' ▼':'';
  return `<div class="cell has-ico"><span class="sq" style="--c:${x.s.c}">${ic(x.s.i)}</span><span class="t"><b>${x.s.n}</b><span>${Math.round(p*100)} % right overall${p3!=null?` · ${Math.round(p3*100)} % in 30 days${tr}`:''} · ${x.n} answered · ${fmt(x.t/60)}</span>${pgBar(p,x.s.c)}</span></div>`}).join('')}</div>`:'';
 const mist=Object.keys(T.mist).length,notebook=`<div class="grp" style="margin-top:14px"><div class="cell"><span class="t"><b>Mistake notebook</b><span>${mist} question${mist===1?'':'s'} waiting${T.fixed?` · ${T.fixed} cleared so far`:''}</span></span></div></div>`;
 const hist=`<div class="eyebrow" style="margin:22px 0 6px">Past tests</div><div class="grp">${[...att].reverse().slice(0,40).map(a=>{const s=(a.kind==='mock'?'Full mock':(TMK[Object.keys(a.secs)[0]]||{n:'Drill'}).n+(a.review?' · mistakes':''))+(a.hard?' · hard':'');
  return `<div class="cell"><span class="t"><b>${s}</b><span>${pgDay(a.ts)} · ${a.ok}/${a.n} right${a.score!=null?' · '+a.score+'/600':''}${a.partial?' · stopped early':''}</span></span><span class="badge ${a.ok/a.n>=.7?'green':a.ok/a.n>=.5?'blue':'red'}">${Math.round(a.ok/a.n*100)} %</span></div>`}).join('')}</div>`;
 return stats+mc+ac+sec+pgTimeCard('tage','#af52de')+notebook+hist;
}
Object.assign(A,{pgtip(el){const t=document.getElementById('pgtip');if(t)t.textContent=el.dataset.tip}});
