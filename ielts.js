/* ---------- IELTS (Hub): dashboard, four skills, review of missed words and questions. Content in ieltsdata1/2.js ---------- */
const IE_SK=[['listen','Listening','#0ea5e9','headphones'],['read','Reading','#16a34a','book'],['write','Writing','#f59e0b','pen'],['speak','Speaking','#e11d48','globe']];
const IE_STEPS=[1,3,7];
const IE_L=[[39,9],[37,8.5],[35,8],[32,7.5],[30,7],[26,6.5],[23,6],[18,5.5],[16,5],[13,4.5],[10,4],[0,3.5]];
const IE_R=[[39,9],[37,8.5],[35,8],[33,7.5],[30,7],[27,6.5],[23,6],[19,5.5],[15,5],[13,4.5],[10,4],[0,3.5]];
const ieBandOf=(sk,raw40)=>(( sk==='listen'?IE_L:IE_R).find(x=>raw40>=x[0])||[0,3])[1];
const ieRound=x=>Math.round(x*2)/2;
const ieFmt=b=>b==null?'—':(b%1?String(b):b+'.0');
const ieT=()=>{if(!S.ielts)S.ielts={};const T=S.ielts;T.sc=T.sc||[];T.err=T.err||[];T.wr=T.wr||[];T.sp=T.sp||[];T.cfg=T.cfg||{target:8,test:'',start:'2027-01-04',ts:0};return T};
const ieMerge=(a,b)=>{const o={};['sc','err','wr','sp'].forEach(k=>{o[k]=pcMergeList(a&&a[k],b&&b[k])});const ca=a&&a.cfg,cb=b&&b.cfg;o.cfg=cb&&(!ca||(cb.ts||0)>=(ca.ts||0))?cb:ca;return o};
let IE={page:null,run:null,rr:null,wr:null,sp:null,p2:null,speaking:false,open:null,msg:''};
let IEIV=null;
const ieDay=n=>{const d=new Date();d.setDate(d.getDate()+n);return dkey(d)};
const ieSet=(sk,id)=>sk==='read'?IELTS.read.find(x=>x.id===id):IELTS.listen.find(x=>x.id===id);
const ieLast=sk=>{const l=ieT().sc.filter(x=>x.sk===sk);return l.length?l[l.length-1]:null};
function ieOverall(){const v=IE_SK.map(s=>ieLast(s[0])).filter(Boolean);if(!v.length)return null;return {b:ieRound(v.reduce((a,x)=>a+x.band,0)/v.length),n:v.length}}
const ieVocab=()=>wriT().vocab.filter(v=>String(v.id).startsWith('ie_'));
const ieErrOpen=()=>ieT().err.filter(e=>(e.box||0)<3);
const ieErrDue=()=>ieErrOpen().filter(e=>(e.due||'')<=today());
function ieVocDue(){const q=vocQueue(),isie=c=>String(c.vid).startsWith('ie_'),st=c=>String(c.vid).startsWith('ie_st_');
 const intro=Object.entries(S.vc||{}).filter(([k,s])=>k.startsWith('v:ie_st_')&&s.fd===today()).length;let room=Math.max(0,8-intro);
 const fresh=q.fresh.filter(isie).filter(c=>{if(!st(c))return true;if(room>0){room--;return true}return false});
 return q.due.filter(isie).concat(fresh)}
const ieDue=()=>ieVocDue().length+ieErrDue().length;
function ieTileSub(){const d=ieDue();if(d)return d+' to review';const o=ieOverall(),t=ieT().cfg.target;return o?'Est. '+ieFmt(o.b)+' · target '+ieFmt(t):'Target band '+ieFmt(t)}
function ieDaysTo(ds){return Math.ceil((new Date(ds+'T00:00:00')-new Date(today()+'T00:00:00'))/864e5)}
/* ---- checking ---- */
const ieNorm=s=>String(s==null?'':s).toLowerCase().replace(/[£$%]/g,'').replace(/[.,;:!?'"]/g,'').replace(/\s+/g,' ').trim();
function ieCheck(q,v){if(v==null||v==='')return false;if(q.t==='tfng')return v===q.a;if(q.t==='mcq')return +v===q.a;const n=ieNorm(v);return [q.a].concat(q.alt||[]).some(x=>ieNorm(x)===n)}
function ieAnsTxt(q){if(q.t==='tfng')return {T:'True',F:'False',NG:'Not given'}[q.a];if(q.t==='mcq')return tmL(q.a)+'. '+q.o[q.a];return q.a}
function ieMyTxt(q,v){if(v==null||v==='')return '(blank)';if(q.t==='tfng')return {T:'True',F:'False',NG:'Not given'}[v];if(q.t==='mcq')return tmL(+v)+'. '+q.o[+v];return v}
function ieQHtml(q,i,ans,lock,act){
 const v=ans[i],ok=lock?ieCheck(q,v):null;
 let inp='';
 if(q.t==='tfng')inp=`<div class="chips" style="margin-top:6px">${[['T','True'],['F','False'],['NG','Not given']].map(([k,l])=>`<button class="btn sm ${v===k?'':'gray'}" ${lock?'disabled':''} data-act="${act}" data-i="${i}" data-v="${k}">${l}</button>`).join('')}</div>`;
 else if(q.t==='mcq')inp=`<div class="tmos" style="margin-top:6px">${q.o.map((o,k)=>{let c='';if(lock)c=k===q.a?'ok':(+v===k?'bad':'');return `<button class="tmo ${c}" ${lock?'disabled':''} style="${!lock&&+v===k&&v!=null?'outline:2px solid var(--accent)':''}" data-act="${act}" data-i="${i}" data-v="${k}"><b>${tmL(k)}</b><span>${esc(o)}</span></button>`}).join('')}</div>`;
 else inp=`<input class="pcta" style="margin-top:6px;padding:9px 12px;border-radius:12px" ${lock?'disabled':''} data-ief="fill" data-i="${i}" value="${esc(v||'')}" placeholder="Your answer" autocomplete="off" autocapitalize="off" spellcheck="false">`;
 const res=lock?`<div class="card tmexp" style="margin-top:6px"><b>${ok?'Correct.':'Not quite.'}</b> ${ok?'':'You wrote: '+esc(ieMyTxt(q,v))+'. Answer: <b>'+esc(ieAnsTxt(q))+'</b>. '}${esc(q.e||'')}</div>`:'';
 return `<div class="card" style="margin-bottom:10px"><div class="eyebrow">Question ${i+1}${lock?(ok?' · ✓':' · ✗'):''}</div><p style="margin:4px 0 0">${esc(q.q)}</p>${inp}${res}</div>`;
}
/* ---- listening player (browser speech synthesis) ---- */
function ieStop(){try{if('speechSynthesis' in window)speechSynthesis.cancel()}catch(e){}IE.speaking=false;ieSpeakUi()}
function ieSpeakUi(){const b=document.getElementById('ie-play');if(b)b.textContent=IE.speaking?'Stop':'Play the recording'}
function ieSpeak(d,accent){
 if(!('speechSynthesis' in window)){IE.msg='This device has no voice player: use the transcript button and read it aloud with a friend.';render();return}
 const sy=speechSynthesis;sy.cancel();
 const vs=sy.getVoices(),pre=accent.toLowerCase().replace('_','-'),pool=vs.filter(v=>v.lang.replace('_','-').toLowerCase().startsWith(pre)),any=vs.filter(v=>/^en/i.test(v.lang)),P=pool.length?pool:any;
 const spk={};let k=0;d.lines.forEach(l=>{if(!(l[0] in spk))spk[l[0]]=k++});
 const seq=d.lines.map((l,i)=>{const u=new SpeechSynthesisUtterance(l[1]);u.lang=accent;const si=spk[l[0]];if(P.length)u.voice=P[si%P.length];u.pitch=si?1.12:0.92;u.rate=0.92;u.onend=()=>{if(i===d.lines.length-1){IE.speaking=false;ieSpeakUi()}};u.onerror=()=>{IE.speaking=false;ieSpeakUi()};return u});
 IE.speaking=true;seq.forEach(u=>sy.speak(u));ieSpeakUi();
}
/* ---- timer ---- */
function ieTick(){
 const el=document.getElementById('ie-tm');
 if(view!=='ielts'||!el){clearInterval(IEIV);IEIV=null;return}
 const end=+el.dataset.end,rem=Math.round((end-Date.now())/1000),a=Math.abs(rem),t=Math.floor(a/60)+':'+String(a%60).padStart(2,'0');
 el.textContent=(rem<0?'+':'')+t;el.style.color=rem<0?'var(--red)':'';
 if(IE.p2&&IE.p2.phase==='prep'&&rem<=0){IE.p2={phase:'talk',end:Date.now()+120000,c:IE.p2.c};try{navigator.vibrate&&navigator.vibrate(200)}catch(e){}render()}
}
const ieTm=end=>`<span id="ie-tm" data-end="${end}" style="font-variant-numeric:tabular-nums;font-weight:700">…</span>`;
function ieTimerOn(){if(!IEIV)IEIV=setInterval(ieTick,500);setTimeout(ieTick,30)}
/* ---- views ---- */
function ieBack(){if(IE.rr||IE.run||IE.wr||IE.sp){const f=IE_SK.concat([['review','À revoir']]).find(x=>x[0]===IE.page);return f?f[1]:'IELTS'}return IE.page?'IELTS':'Hub'}
function vIelts(){
 const T=ieT(),sub=IE.rr||IE.run||IE.wr||IE.sp||IE.page;
 const nav=sub?`<div class="navbar"><button class="back" data-act="ieup">${ic('chevl')}${esc(ieBack())}</button></div>`:navbar('Hub');
 let body;
 if(IE.rr)body=ieRedoView();
 else if(IE.run)body=IE.run.sk==='read'?ieReadRun():ieListenRun();
 else if(IE.wr)body=ieWriteRun();
 else if(IE.sp)body=ieSpeakRun();
 else if(IE.page==='listen'||IE.page==='read')body=ieSetList(IE.page);
 else if(IE.page==='write')body=ieWriteList();
 else if(IE.page==='speak')body=ieSpeakList();
 else if(IE.page==='review')body=ieReview();
 else if(IE.page==='tips')body=ieTips();
 else if(IE.page==='plan')body=iePlan();
 else body=ieHome();
 if(document.getElementById('ie-tm')||/id="ie-tm"/.test(body))ieTimerOn();
 return `<div class="view">${nav}${body}</div>`;
}
function ieSpark(){
 const sc=ieT().sc.slice(-40);if(sc.length<2)return `<p class="mute small" style="margin:8px 0">The score curve appears after your second result.</p>`;
 const W=320,H=120,x=i=>10+i*(W-20)/(sc.length-1),y=b=>H-10-(b-4)/5*(H-20);
 const lines=IE_SK.map(([k,,c])=>{const pts=sc.map((s,i)=>s.sk===k?[x(i),y(s.band)]:null).filter(Boolean);return pts.length>1?`<polyline fill="none" stroke="${c}" stroke-width="2" points="${pts.map(p=>p.join(',')).join(' ')}"/>`:pts.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="${c}"/>`).join('')}).join('');
 const t=ieT().cfg.target;
 return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto"><line x1="10" x2="${W-10}" y1="${y(t)}" y2="${y(t)}" stroke="currentColor" stroke-opacity=".35" stroke-dasharray="4 4"/><text x="${W-12}" y="${y(t)-3}" font-size="9" text-anchor="end" fill="currentColor" opacity=".6">target ${ieFmt(t)}</text>${lines}</svg><div class="chips" style="margin-top:4px">${IE_SK.map(([,l,c])=>`<span class="mute small"><b style="color:${c}">●</b> ${l}</span>`).join(' ')}</div>`;
}
function ieHome(){
 const T=ieT(),cfg=T.cfg,o=ieOverall(),due=ieDue();
 const d1=ieDaysTo('2027-03-01'),d2=ieDaysTo('2027-04-01'),dt=cfg.test?ieDaysTo(cfg.test):null;
 const cd=dt!=null?(dt>=0?dt:'—'):(d1>0?d1:(d2>0?d2:'—'));
 const cdl=dt!=null?'days to your test':(d1>0?'days to 1 March':'days to 1 April');
 const skills=IE_SK.map(([k,l,c,i])=>{const s=ieLast(k),n=T.sc.filter(x=>x.sk===k).length;return `<button class="cell has-ico" data-act="iepage" data-k="${k}"><span class="sq" style="--c:${c}">${ic(k==='listen'?'play':i)}</span><span class="t"><b>${l}</b><span>${s?'Last '+ieFmt(s.band)+(s.self?' (self-rated)':'')+' · '+n+' done':'Not started'}</span>${stBar(s?Math.max(0,(s.band-4)/(Math.max(cfg.target,s.band)-4)):0,c)}</span>${ic('chev','chev')}</button>`}).join('');
 return `${title('IELTS','Academic · test in March or April 2027')}
 <div class="stats" style="margin-bottom:14px"><div class="stat"><b>${ieFmt(cfg.target)}</b><span>target band</span></div><div class="stat"><b>${o?ieFmt(o.b):'—'}</b><span>estimated now${o&&o.n<4?' ('+o.n+'/4)':''}</span></div><div class="stat"><b>${cd}</b><span>${cdl}</span></div></div>
 <div class="grp">${skills}</div>
 <div style="margin-top:14px"><button class="btn ${due?'':'tint'}" data-act="iepage" data-k="review">À revoir${due?' · '+due+' due':''}</button></div>
 <div class="card" style="margin-top:14px"><div class="eyebrow">Score curve</div>${ieSpark()}<p class="mute small" style="margin:6px 0 0">Listening and Reading bands are estimated from the raw score on the official /40 scale; practice sets are shorter, so treat them as a guide. Writing and Speaking come from Claude's feedback or your own estimate.</p></div>
 <div class="grp" style="margin-top:14px"><button class="cell" data-act="iepage" data-k="plan"><span class="t"><b>12-week plan</b><span>From early January to the test</span></span>${ic('chev','chev')}</button><button class="cell" data-act="iepage" data-k="tips"><span class="t"><b>Strategies, band converter, descriptors</b><span>What each band asks for</span></span>${ic('chev','chev')}</button></div>
 <div class="card" style="margin-top:14px"><div class="eyebrow">Settings</div><div class="chips" style="margin:8px 0">${[7,7.5,8,8.5,9].map(b=>`<button class="btn sm ${cfg.target===b?'':'gray'}" data-act="ietarget" data-v="${b}">${ieFmt(b)}</button>`).join('')}</div>
 <label class="mute small">Exact test date (optional)</label><input type="date" class="pcta" style="padding:8px 12px" data-ief="test" value="${esc(cfg.test||'')}"></div>`;
}
function ieSetList(sk){
 const L=sk==='read'?IELTS.read:IELTS.listen,T=ieT(),name=sk==='read'?'Reading':'Listening';
 const rows=L.map(d=>{const h=T.sc.filter(x=>x.sk===sk&&x.src===d.id),b=h.length?h[h.length-1]:null;return `<button class="cell" data-act="ieset" data-k="${sk}" data-id="${d.id}"><span class="t"><b style="white-space:normal">${esc(d.title)}</b><span>${sk==='read'?d.qs.length+' questions · '+d.min+' min':d.sec+' · '+d.qs.length+' questions'}${b?' · last '+b.raw+'/'+b.n:''}</span></span>${ic('chev','chev')}</button>`}).join('');
 const tip=sk==='read'?'Original passages written for practice, with the question types of the real test (True/False/Not Given, matching headings, completion, multiple choice). The 20-minute timer is shown but does not stop you.':'Original recordings read aloud by your device voice, in British or American English. Play once, as in the real test. The transcript opens only after you submit.';
 return `${title(name,'IELTS')}<p class="mute" style="margin:0 0 12px">${tip}</p><div class="grp">${rows}</div>
 <div class="eyebrow" style="margin:16px 0 6px">Tips</div><div class="card"><ul style="margin:0;padding-left:18px">${IELTS.tips[sk==='read'?'reading':'listening'].map(t=>`<li style="margin:4px 0">${esc(t)}</li>`).join('')}</ul></div>`;
}
function ieReadRun(){
 const R=IE.run,d=ieSet('read',R.id),lock=R.done;
 const pass=d.paras.map(p=>`<p style="margin:0 0 10px"><b>${p[0]}</b>&nbsp; ${esc(p[1])}</p>`).join('');
 const qs=d.qs.map((q,i)=>ieQHtml(q,i,R.ans,lock,'ieans')).join('');
 return `${title(esc(d.title),'Reading · '+d.qs.length+' questions')}
 ${lock?ieResultBar(R,d):`<div class="card" style="display:flex;justify-content:space-between;align-items:center"><span class="mute">Time</span><span style="font-size:22px">${ieTm(R.end)}</span></div>`}
 <div class="card" style="margin:10px 0">${pass}</div>${qs}
 ${lock?`<button class="btn" data-act="ieend">Done</button>`:`<button class="btn" data-act="iesubmit">Submit and mark</button>`}`;
}
function ieResultBar(R,d){
 const n=d.qs.length,raw=d.qs.filter((q,i)=>ieCheck(q,R.ans[i])).length,b=ieBandOf(R.sk,Math.round(raw/n*40));
 return `<div class="stats" style="margin:10px 0"><div class="stat"><b>${raw}/${n}</b><span>correct</span></div><div class="stat"><b>${ieFmt(b)}</b><span>estimated band</span></div><div class="stat"><b>${n-raw}</b><span>sent to review</span></div></div>`;
}
function ieListenRun(){
 const R=IE.run,d=ieSet('listen',R.id),lock=R.done;
 const accents=[['en-GB','British'],['en-US','American'],['en-AU','Australian']];
 const ac=R.accent||d.accent;
 const qs=d.qs.map((q,i)=>ieQHtml(q,i,R.ans,lock,'ieans')).join('');
 return `${title(esc(d.title),'Listening · '+d.sec)}
 ${lock?ieResultBar(R,d):`<div class="card"><div class="chips" style="margin-bottom:10px">${accents.map(([k,l])=>`<button class="btn sm ${ac===k?'':'gray'}" data-act="ieacc" data-v="${k}">${l}</button>`).join('')}</div><button class="btn" id="ie-play" data-act="ieplay">${IE.speaking?'Stop':'Play the recording'}</button><p class="mute small" style="margin:8px 0 0">Plays: ${R.plays}. In the real test you hear it once. Read the questions first, then play.${IE.msg?'<br><b>'+esc(IE.msg)+'</b>':''}</p></div>`}
 <div style="margin-top:10px">${qs}</div>
 ${lock?`<div class="card"><div class="eyebrow">Transcript</div>${d.lines.map(l=>`<p style="margin:6px 0"><b>${l[0]}:</b> ${esc(l[1])}</p>`).join('')}</div><div style="margin-top:12px"><button class="btn" data-act="ieend">Done</button></div>`:`<button class="btn" data-act="iesubmit">Submit and mark</button>`}`;
}
/* ---- writing ---- */
const ieTable=(h,r)=>`<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:14px"><tr>${h.map(x=>`<th style="text-align:left;padding:5px 8px;border-bottom:1px solid var(--fill)">${esc(x)}</th>`).join('')}</tr>${r.map(row=>`<tr>${row.map(x=>`<td style="padding:5px 8px;border-bottom:1px solid var(--fill)">${esc(x)}</td>`).join('')}</tr>`).join('')}</table></div>`;
const ieWP=(kind,id)=>(kind==='w1'?IELTS.w1:IELTS.w2).find(x=>x.id===id);
function ieWBody(kind,p){return kind==='w1'?`<p style="margin:0 0 8px">${esc(p.q)}</p>${p.head?ieTable(p.head,p.rows):`<ol style="margin:6px 0;padding-left:20px">${p.steps.map(s=>`<li style="margin:4px 0">${esc(s)}</li>`).join('')}</ol>`}`:`<p style="margin:0">${esc(p.q)}</p>`}
function ieWriteList(){
 const T=ieT();
 const row=(k,p,i)=>{const h=T.wr.filter(x=>x.pid===p.id),b=h.length?h[h.length-1].band:null;return `<button class="cell" data-act="iewstart" data-k="${k}" data-id="${p.id}"><span class="t"><b style="font-size:15px;white-space:normal">${esc(k==='w1'?p.type+' · '+p.title:p.type)}</b><span style="white-space:normal">${esc(k==='w1'?p.q.slice(0,90)+'…':p.q.slice(0,110)+'…')}</span>${h.length?`<span>${h.length} attempt${h.length>1?'s':''} · last ${b!=null?ieFmt(b):'no band'}</span>`:''}</span>${ic('chev','chev')}</button>`};
 return `${title('Writing','IELTS')}${ieMsg()}<p class="mute" style="margin:0 0 12px">Write under the timer, copy the prompt to Claude, paste its feedback back. The band, your mistakes and the words to learn go into À revoir automatically.</p>
 <div class="eyebrow" style="margin:6px 0">Task 2 · essay (40 min, 250 words)</div><div class="grp">${IELTS.w2.map((p,i)=>row('w2',p,i)).join('')}</div>
 <div class="eyebrow" style="margin:16px 0 6px">Task 1 · data and process (20 min, 150 words)</div><div class="grp">${IELTS.w1.map((p,i)=>row('w1',p,i)).join('')}</div>
 <div class="eyebrow" style="margin:16px 0 6px">Tips</div><div class="card"><ul style="margin:0;padding-left:18px">${IELTS.tips.writing.map(t=>`<li style="margin:4px 0">${esc(t)}</li>`).join('')}</ul></div>`;
}
const ieMsg=()=>IE.msg?`<div class="card" style="margin-bottom:10px"><b>${esc(IE.msg)}</b></div>`:'';
const ieDraft=()=>pcLS('lu-ie-draft')||{};
document.addEventListener('input',e=>{const el=e.target;if(!el||!el.dataset||!el.dataset.ief)return;const f=el.dataset.ief;
 if(f==='fill'){const R=IE.rr?IE.rr:IE.run;if(R)(IE.rr?IE.rr.ans:IE.run.ans)[+el.dataset.i]=el.value}
 else if(f==='test'){const c=ieT().cfg;c.test=el.value;c.ts=Date.now();save()}
 else if(f==='conv'){}
 else{const d=ieDraft();d[el.dataset.k||f]=el.value;pcLS('lu-ie-draft',d);if(f==='tr'){const bt=document.querySelector('[data-act=iescopy]');if(bt)bt.disabled=pcWords(el.value)<15}if(f==='wr'){const w=document.getElementById('ie-wc'),W=IE.wr,m=W&&W.kind==='w1'?150:250,n=pcWords(el.value);if(w){w.textContent=n+' words';w.style.color=n>=m?'var(--green)':''}const bt=document.querySelector('[data-act=iewdone]');if(bt)bt.disabled=n<20}}});
function ieWPrompt(kind,p,text){
 const t1=kind==='w1',data=t1?(p.head?'\nData:\n'+[p.head].concat(p.rows).map(r=>r.join(' | ')).join('\n'):'\nDiagram description:\n'+p.steps.join('\n')):'';
 return `Act as a strict IELTS Academic writing examiner. This is Task ${t1?1:2}.\nQuestion: ${p.q}${data}\n\nMy answer (${pcWords(text)} words):\n\n${text.trim()}\n\nGive me: 1) a band (half bands allowed) for each criterion: ${t1?'Task Achievement':'Task Response'}, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy, then the overall band; 2) every language mistake as "my wording → correction (rule)", up to 15, one per line; 3) the three changes that would lift me to band 8 or above; 4) a band 8.5 rewrite of my weakest paragraph. Be blunt. Then end with ONE line in exactly this form: FINAL BAND: X.X\nAfter it, add a block that starts exactly with "VOCAB:" followed by one line for every word or collocation worth learning (better wording for my weak spots, include them all) in the format: term in English | French translation | short example in English. The second column must be the FRENCH translation.`;
}
function ieSPrompt(kind,c,text){
 return `Act as a strict IELTS Speaking examiner. Part ${kind}. Question or cue card: ${c}\n\nThis is a transcript of my spoken answer (from dictation, so ignore punctuation and spelling of the transcript):\n\n${text.trim()}\n\nGive me: 1) a band (half bands allowed) for Fluency and Coherence, Lexical Resource and Grammatical Range and Accuracy (you cannot hear me, so skip Pronunciation and say so), then an estimated overall band; 2) every language mistake as "my wording → correction (rule)", one per line; 3) better phrases I could have used; 4) one model answer at band 8. Be blunt. End with ONE line in exactly this form: FINAL BAND: X.X\nAfter it, add a block that starts exactly with "VOCAB:" followed by one line per word or expression worth learning in the format: term in English | French translation | short example in English. The second column must be the FRENCH translation.`;
}
function ieParseBand(t){t=String(t||'').replace(/\*\*|__/g,'');let m=t.match(/final\s+band\s*[:=\-–—]?\s*(\d(?:[.,]\d)?)/i)||t.match(/overall\s+band[^0-9\n]{0,25}(\d(?:[.,]\d)?)/i);if(!m)return null;const v=parseFloat(m[1].replace(',','.'));return v>=1&&v<=9?ieRound(v):null}
function ieParseMist(t){
 const lines=String(t||'').split('\n'),h=lines.findIndex(l=>/^[\s#*_>`\-]*vocab/i.test(l)),use=h>=0?lines.slice(0,h):lines,out=[];
 use.forEach(l=>{if(!/→|->/.test(l))return;const p=l.replace(/^[\s>\-*•\d.)]+/,'').split(/→|->/);if(p.length<2)return;const w=p[0].replace(/\*\*|`|["“”]/g,'').replace(/^my wording\s*:?/i,'').trim(),f=p.slice(1).join('→').replace(/\*\*|`/g,'').trim();if(w.length>=2&&w.length<=180&&f.length>=2&&out.length<15)out.push({w,f})});return out}
function ieAddVocab(txt,tag){const T=wriT();const items=wriParseVocab(/vocab/i.test(txt)?txt:'VOCAB:\n'+txt,'en');let n=0;
 items.forEach((v,i)=>{const id='ie_'+tag+'_'+i;if(T.vocab.some(o=>o.id===id||(o.lang==='en'&&o.term.toLowerCase()===v.term.toLowerCase())))return;T.vocab.push({id,lang:'en',term:v.term,tr:v.tr,note:(v.note||'')+(v.note?' ':'')+'(IELTS)',box:0,due:today(),ts:Date.now()});n++});return n}
function ieAddErr(o){const T=ieT(),id=o.id,y=T.err.find(e=>e.id===id);const e=Object.assign({ts:Date.now(),mod:Date.now(),box:0,due:ieDay(1),n:0},o);if(y){y.box=0;y.due=ieDay(1);y.mod=Date.now();return}T.err.push(e)}
function ieWriteRun(){
 const W=IE.wr,p=ieWP(W.kind,W.pid),d=ieDraft(),text=d['wr:'+W.pid]||'',min=W.kind==='w1'?150:250,n=pcWords(text);
 const head=`${title(W.kind==='w1'?p.type+' · '+p.title:'Task 2 · '+p.type,'Writing')}<div class="card" style="margin-bottom:10px">${ieWBody(W.kind,p)}</div>`;
 if(W.step==='fb'){
  const fb=d['fb:'+W.pid]||'';
  return `${head}<div class="card"><b>${n} words</b><p class="mute small" style="margin:4px 0 10px">1. Copy the prompt, paste it in a Claude chat. 2. Paste Claude's full feedback below. 3. Save: the band, the mistakes and the vocabulary are read from it.</p>
  <button class="btn" data-act="iewcopy">Copy the prompt for Claude</button></div>
  <textarea class="pcta" data-ief="fb" data-k="fb:${W.pid}" rows="8" style="margin-top:10px" placeholder="Paste Claude's feedback here (it must contain FINAL BAND and the VOCAB block)">${esc(fb)}</textarea>
  <p class="mute small" id="ie-fbhint" style="margin:6px 4px">${IE.msg?esc(IE.msg):''}</p>
  <div style="margin-top:8px"><button class="btn" data-act="iewsave">Save feedback</button></div>
  <div style="margin-top:10px"><button class="btn gray" data-act="iewback">Back to my text</button></div>`}
 return `${head}<div class="card" style="display:flex;justify-content:space-between;align-items:center"><span class="mute">Time left</span><span style="font-size:22px">${ieTm(W.end)}</span></div>
 <details style="margin:10px 0"><summary class="mute">Ideas for this question</summary><div class="card" style="margin-top:6px">${p.tip?esc(p.tip):`<ul style="margin:0;padding-left:18px">${p.ideas.map(t=>`<li style="margin:4px 0">${esc(t)}</li>`).join('')}</ul>`}</div></details>
 <textarea class="pcta" data-ief="wr" data-k="wr:${W.pid}" rows="16" placeholder="Write here. Minimum ${min} words.">${esc(text)}</textarea>
 <div style="display:flex;justify-content:space-between;margin:6px 4px"><span id="ie-wc" style="${n>=min?'color:var(--green)':''}">${n} words</span><span class="mute small">minimum ${min}</span></div>
 <div style="margin-top:8px"><button class="btn" data-act="iewdone" ${n<20?'disabled':''}>I have finished: get feedback</button></div>`;
}
/* ---- speaking ---- */
function ieSpeakList(){
 const T=ieT(),r=s=>T.sp.filter(x=>x.pid===s).length;
 const p1=IELTS.s1.map(c=>`<button class="cell" data-act="iesp" data-k="1" data-id="${c.id}"><span class="t"><b>${esc(c.topic)}</b><span>${c.hk?'Hong Kong · ':''}5 questions${r(c.id)?' · '+r(c.id)+' attempts':''}</span></span>${ic('chev','chev')}</button>`).join('');
 const p2=IELTS.s2.map(c=>`<button class="cell" data-act="iesp" data-k="2" data-id="${c.id}"><span class="t"><b style="white-space:normal;font-size:15px">${esc(c.topic)}</b><span>${c.hk?'Hong Kong · ':''}1 min prep, 2 min talk, then Part 3${r(c.id)?' · '+r(c.id)+' attempts':''}</span></span>${ic('chev','chev')}</button>`).join('');
 return `${title('Speaking','IELTS')}${ieMsg()}<p class="mute" style="margin:0 0 12px">Answer aloud, record yourself if you can, then dictate or type what you said and let Claude mark it. Hong Kong cards double as practice for your school interviews.</p>
 <div class="eyebrow" style="margin:6px 0">Part 2 and 3 · cue cards</div><div class="grp">${p2}</div>
 <div class="eyebrow" style="margin:16px 0 6px">Part 1 · everyday topics</div><div class="grp">${p1}</div>
 <div class="eyebrow" style="margin:16px 0 6px">Tips</div><div class="card"><ul style="margin:0;padding-left:18px">${IELTS.tips.speaking.map(t=>`<li style="margin:4px 0">${esc(t)}</li>`).join('')}</ul></div>`;
}
function ieSpeakRun(){
 const S_=IE.sp,d=ieDraft(),tr=d['tr:'+S_.id]||'',fb=d['sfb:'+S_.id]||'';
 let card;
 if(S_.k==='1'){const c=IELTS.s1.find(x=>x.id===S_.id);card=`<div class="card"><div class="eyebrow">Examiner</div><ol style="margin:6px 0 0;padding-left:20px">${c.qs.map(q=>`<li style="margin:6px 0">${esc(q)}</li>`).join('')}</ol><p class="mute small" style="margin:8px 0 0">Answer each in 2 or 3 sentences: answer, reason, example.</p></div>`}
 else{const c=IELTS.s2.find(x=>x.id===S_.id),P=IE.p2;
  card=`<div class="card"><div class="eyebrow">Part 2 · cue card</div><p class="tmq" style="margin:6px 0">${esc(c.topic)}</p><p class="mute small" style="margin:0">You should say:</p><ul style="margin:4px 0 0;padding-left:18px">${c.cue.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
  <div class="card" style="margin-top:10px;display:flex;justify-content:space-between;align-items:center"><span class="mute">${!P?'Ready?':P.phase==='prep'?'Preparation':'Speak now'}</span>${P?`<span style="font-size:24px">${ieTm(P.end)}</span>`:`<button class="btn sm" data-act="iep2go">Start 1 min preparation</button>`}</div>
  <div class="card" style="margin-top:10px"><div class="eyebrow">Part 3 · discussion</div><ol style="margin:6px 0 0;padding-left:20px">${c.p3.map(q=>`<li style="margin:6px 0">${esc(q)}</li>`).join('')}</ol></div>`}
 return `${title(S_.k==='1'?IELTS.s1.find(x=>x.id===S_.id).topic:'Part 2 and 3','Speaking')}${card}
 <div class="eyebrow" style="margin:16px 0 6px">Then: mark it</div>
 <textarea class="pcta" data-ief="tr" data-k="tr:${S_.id}" rows="6" placeholder="Type or dictate what you said (your phone keyboard has a microphone key)">${esc(tr)}</textarea>
 <div style="margin-top:8px"><button class="btn" data-act="iescopy" ${pcWords(tr)<15?'disabled':''}>Copy the prompt for Claude</button></div>
 <textarea class="pcta" data-ief="sfb" data-k="sfb:${S_.id}" rows="6" style="margin-top:10px" placeholder="Paste Claude's feedback here">${esc(fb)}</textarea>
 <p class="mute small" style="margin:6px 4px">${IE.msg?esc(IE.msg):''}</p>
 <div style="margin-top:6px"><button class="btn" data-act="iessave">Save feedback</button></div>
 <div class="card" style="margin-top:12px"><div class="eyebrow">Or just rate yourself</div><div class="chips" style="margin-top:8px">${[5,5.5,6,6.5,7,7.5,8,8.5].map(b=>`<button class="btn sm gray" data-act="iesself" data-v="${b}">${ieFmt(b)}</button>`).join('')}</div></div>`;
}
/* ---- review (À revoir) ---- */
function ieReview(){
 const T=ieT(),vv=ieVocab(),vd=ieVocDue().length,eo=ieErrOpen(),ed=ieErrDue(),mast=T.err.filter(e=>(e.box||0)>=3).length;
 const known=vv.filter(v=>{const s=vcGet(v);return s&&s.n>=2}).length;
 const qd=ed.filter(e=>e.sk!=='wm').length,wd=ed.filter(e=>e.sk==='wm').length;
 return `${title('À revoir','IELTS')}<p class="mute" style="margin:0 0 12px">Everything you missed collects here: words from Claude's feedback and failed questions from Listening and Reading, plus the corrections from your writing. Spaced recall at 1, 3 and 7 days, then a question counts as mastered.</p>
 <div class="stats" style="margin-bottom:14px"><div class="stat"><b>${vd}</b><span>words due</span></div><div class="stat"><b>${ed.length}</b><span>questions due</span></div><div class="stat"><b>${mast}</b><span>mastered</span></div></div>
 <div class="grp" style="margin-bottom:14px"><div class="cell"><span class="t"><b>Vocabulary</b><span>${vv.length} words saved · ${known} known · ${vd} due today</span></span></div><div class="cell"><span class="t"><b>Failed questions</b><span>${eo.length} open (${eo.filter(e=>e.sk==='listen').length} listening, ${eo.filter(e=>e.sk==='read').length} reading, ${eo.filter(e=>e.sk==='wm').length} writing corrections) · ${mast} mastered</span></span></div></div>
 <button class="btn" data-act="ievoc" ${vd?'':'disabled'}>${vd?'Learn missed vocabulary · '+vd+' cards':'No words due'}</button>
 <div style="margin-top:10px"><button class="btn tint" data-act="ierr" data-m="due" ${ed.length?'':'disabled'}>${ed.length?'Redo what is due · '+ed.length:'No question due today'}</button></div>
 <div style="margin-top:10px"><button class="btn gray" data-act="ierr" data-m="all" ${eo.length?'':'disabled'}>Redo all open mistakes · ${eo.length}</button></div>
 <div class="eyebrow" style="margin:18px 0 6px">Add words</div>
 <textarea class="pcta" data-ief="add" data-k="add" rows="4" placeholder="Paste a VOCAB block, or one line each: term | French | example">${esc(ieDraft().add||'')}</textarea>
 <p class="mute small" style="margin:6px 4px">${IE.msg?esc(IE.msg):''}</p>
 <div style="margin-top:6px"><button class="btn sm" data-act="ieadd">Add to my words</button> <button class="btn sm gray" data-act="iestarter">Add the ${IELTS.vocab.length} starter words</button></div>`;
}
function ieRedoView(){
 const R=IE.rr;
 if(R.i>=R.items.length){return `${title('Session done','À revoir')}<div class="stats" style="margin:10px 0"><div class="stat"><b>${R.ok}/${R.items.length}</b><span>right</span></div></div><p class="mute">Right answers move to the next interval (3 days, then 7, then mastered). Wrong ones return tomorrow.</p><button class="btn" data-act="ieup">Back</button>`}
 const e=R.items[R.i];
 if(e.sk==='wm'){
  return `${title('Fix this sentence','À revoir · '+(R.i+1)+'/'+R.items.length)}<div class="card"><p class="tmq" style="margin:0">${esc(e.w)}</p><p class="mute small" style="margin:6px 0 0">This is what you wrote. Correct it.</p></div>
  ${R.show?`<div class="card" style="margin-top:10px"><b>Correction</b><p style="margin:6px 0 0">${esc(e.f)}</p></div><div class="chips" style="margin-top:12px"><button class="btn sm gray" data-act="iergrade" data-ok="0">Not yet</button><button class="btn sm" data-act="iergrade" data-ok="1">I had it</button></div>`:`<textarea class="pcta" data-ief="rr" data-k="rr" rows="3" style="margin-top:10px" placeholder="Your correction (optional)"></textarea><div style="margin-top:10px"><button class="btn" data-act="ieershow">Show the correction</button></div>`}`}
 const d=ieSet(e.sk,e.src),q=d.qs[e.qi],lock=R.show;
 const ctx=e.sk==='read'?`<details style="margin:10px 0"><summary class="mute">Open the passage</summary><div class="card" style="margin-top:6px">${d.paras.map(p=>`<p style="margin:0 0 8px"><b>${p[0]}</b>&nbsp; ${esc(p[1])}</p>`).join('')}</div></details>`:`<div class="card" style="margin:10px 0"><button class="btn sm" id="ie-play" data-act="ieplay">${IE.speaking?'Stop':'Play the recording'}</button>${lock?`<details style="margin-top:8px"><summary class="mute">Transcript</summary>${d.lines.map(l=>`<p style="margin:6px 0"><b>${l[0]}:</b> ${esc(l[1])}</p>`).join('')}</details>`:''}</div>`;
 return `${title(esc(d.title),'À revoir · '+(R.i+1)+'/'+R.items.length)}${ctx}${ieQHtml(q,e.qi,R.ans,lock,'ieans')}
 ${lock?`<button class="btn" data-act="ieernext">${R.i===R.items.length-1?'Finish':'Next'}</button>`:`<button class="btn" data-act="iercheck">Check</button>`}`;
}
/* ---- tips, converter, plan ---- */
function ieTips(){
 const conv=sk=>(sk==='listen'?IE_L:IE_R).map(([n,b])=>`<tr><td style="padding:4px 8px">${n}${n===39?'–40':''}+</td><td style="padding:4px 8px"><b>${ieFmt(b)}</b></td></tr>`).join('');
 const sec=(k,l)=>`<div class="eyebrow" style="margin:16px 0 6px">${l}</div><div class="card"><ul style="margin:0;padding-left:18px">${IELTS.tips[k].map(t=>`<li style="margin:4px 0">${esc(t)}</li>`).join('')}</ul></div>`;
 const bd=(l,a)=>`<div class="eyebrow" style="margin:16px 0 6px">${l}</div><div class="grp">${a.map(x=>`<div class="cell"><span class="t"><b>Band ${x[0]}</b><span style="white-space:normal">${esc(x[1])}</span></span></div>`).join('')}</div>`;
 return `${title('Strategies and bands','IELTS')}
 <div class="card"><div class="eyebrow">Band converter (Listening and Reading, /40)</div><div style="display:flex;gap:10px;align-items:center;margin:8px 0"><input id="ie-conv" class="pcta" type="number" min="0" max="40" placeholder="Raw score" style="padding:9px 12px;border-radius:12px" data-ief="conv"><span id="ie-convout" style="font-weight:700;min-width:120px"></span></div>
 <div style="display:flex;gap:18px;flex-wrap:wrap"><table style="font-size:13px"><tr><th colspan="2" style="text-align:left;padding:4px 8px">Listening</th></tr>${conv('listen')}</table><table style="font-size:13px"><tr><th colspan="2" style="text-align:left;padding:4px 8px">Reading (Academic)</th></tr>${conv('read')}</table></div>
 <p class="mute small" style="margin:8px 0 0">Approximate published thresholds; the real boundaries vary slightly from one test to another.</p></div>
 ${sec('listening','Listening')}${sec('reading','Reading')}${sec('writing','Writing')}${sec('speaking','Speaking')}
 ${bd('Writing: what each band looks like',IELTS.bands.w)}${bd('Speaking: what each band looks like',IELTS.bands.s)}
 <p class="mute small" style="margin:10px 4px">Summaries in my own words, based on the public band descriptors. Writing and Speaking are each marked on four equal criteria; the overall band is the mean of the four skills, rounded to the nearest half band.</p>`;
}
document.addEventListener('input',e=>{const el=e.target;if(el&&el.id==='ie-conv'){const n=parseInt(el.value,10),o=document.getElementById('ie-convout');if(o)o.textContent=isNaN(n)||n<0||n>40?'':'Listening '+ieFmt(ieBandOf('listen',n))+' · Reading '+ieFmt(ieBandOf('read',n))}});
function iePlan(){
 const cfg=ieT().cfg,st=cfg.start||'2027-01-04',n=ieDaysTo(st),wk=n<=0?Math.floor(-n/7):-1;
 return `${title('12-week plan','IELTS')}<p class="mute" style="margin:0 0 12px">${n>0?'Starts on '+st+' (in '+n+' days). Until then: 10 minutes of review vocabulary a day and one Listening or Reading set a week.':'Started on '+st+'.'} Daily minimum: 10 minutes of À revoir.</p>
 <div class="grp">${IELTS.plan.map((p,i)=>`<div class="cell" style="${i===wk?'outline:2px solid var(--accent)':''}"><span class="t"><b>${p[0]}${i===wk?' · this week':''}</b><span style="white-space:normal">${esc(p[1])}</span></span></div>`).join('')}</div>`;
}
/* ---- actions ---- */
function ieFinishSet(){
 const R=IE.run,d=ieSet(R.sk,R.id),n=d.qs.length,raw=d.qs.filter((q,i)=>ieCheck(q,R.ans[i])).length,b=ieBandOf(R.sk,Math.round(raw/n*40));
 const T=ieT();T.sc.push({id:'s'+pcId(),ts:Date.now(),sk:R.sk,src:R.id,raw,n,band:b,self:false});
 d.qs.forEach((q,i)=>{if(!ieCheck(q,R.ans[i]))ieAddErr({id:'e_'+R.id+'_'+i,sk:R.sk,src:R.id,qi:i})});
 effAdd('ielts',Math.min(3600,(Date.now()-R.t0)/1000));R.done=true;save();
}
function ieNextErr(){const R=IE.rr;R.i++;R.show=false;R.ans={};ieStop();render();window.scrollTo(0,0)}
Object.assign(A,{
 ieup(){if(IE.rr){IE.rr=null}else if(IE.run){ieStop();IE.run=null}else if(IE.wr){IE.wr=null}else if(IE.sp){IE.sp=null;IE.p2=null}else IE.page=null;IE.msg='';render();window.scrollTo(0,0)},
 iepage(el){IE.page=el.dataset.k;IE.msg='';render();window.scrollTo(0,0)},
 ietarget(el){const c=ieT().cfg;c.target=+el.dataset.v;c.ts=Date.now();save();render()},
 ieset(el){const sk=el.dataset.k,d=ieSet(sk,el.dataset.id);IE.msg='';IE.run={sk,id:d.id,t0:Date.now(),end:sk==='read'?Date.now()+(d.min||20)*60000:0,ans:{},done:false,plays:0,accent:d.accent};render();window.scrollTo(0,0)},
 ieans(el){const y=window.scrollY,i=+el.dataset.i,R=IE.rr||IE.run;if(!R||R.done||(IE.rr&&IE.rr.show))return;R.ans[i]=el.dataset.v;render();window.scrollTo(0,y)},
 ieacc(el){const R=IE.run;R.accent=el.dataset.v;ieStop();const y=window.scrollY;render();window.scrollTo(0,y)},
 ieplay(){const R=IE.run||IE.rr&&{sk:'listen',id:IE.rr.items[IE.rr.i].src,accent:null};if(!R)return;if(IE.speaking){ieStop();return}const d=ieSet('listen',R.id);IE.msg='';if(IE.run)IE.run.plays++;ieSpeak(d,R.accent||d.accent);},
 iesubmit(){const R=IE.run;ieStop();ieFinishSet();render();window.scrollTo(0,0)},
 ieend(){ieStop();IE.run=null;render();window.scrollTo(0,0)},
 iewstart(el){const k=el.dataset.k,p=ieWP(k,el.dataset.id);IE.wr={kind:k,pid:p.id,step:'write',t0:Date.now(),end:Date.now()+(k==='w1'?20:40)*60000};IE.msg='';render();window.scrollTo(0,0)},
 iewdone(){IE.wr.step='fb';render();window.scrollTo(0,0)},
 iewback(){IE.wr.step='write';IE.msg='';render()},
 iewcopy(el){const W=IE.wr,p=ieWP(W.kind,W.pid);pcCopy(ieWPrompt(W.kind,p,ieDraft()['wr:'+W.pid]||''),el)},
 iewsave(){
  const W=IE.wr,d=ieDraft(),fb=d['fb:'+W.pid]||'',txt=d['wr:'+W.pid]||'',band=ieParseBand(fb);
  if(!fb.trim()){IE.msg='Paste the feedback first.';render();return}
  if(band==null){IE.msg='No "FINAL BAND: X.X" line found. Ask Claude to end with it, then paste again.';render();return}
  const T=ieT(),id=pcId(),nv=ieAddVocab(fb,id),ms=ieParseMist(fb);
  T.wr.push({id,ts:Date.now(),mod:Date.now(),kind:W.kind,pid:W.pid,text:txt,fb,band,words:pcWords(txt)});
  T.sc.push({id:'s'+id,ts:Date.now(),sk:'write',src:W.pid,band,self:false});
  ms.forEach((m,i)=>ieAddErr({id:'e_w'+id+'_'+i,sk:'wm',src:id,qi:i,w:m.w,f:m.f}));
  effAdd('ielts',Math.min(3600,(Date.now()-W.t0)/1000));
  const dd=ieDraft();delete dd['wr:'+W.pid];delete dd['fb:'+W.pid];pcLS('lu-ie-draft',dd);
  save();IE.wr=null;IE.page='write';IE.msg='Saved: band '+ieFmt(band)+', '+nv+' words and '+ms.length+' corrections added to À revoir.';render();window.scrollTo(0,0)},
 iesp(el){IE.sp={k:el.dataset.k,id:el.dataset.id,t0:Date.now()};IE.p2=null;IE.msg='';render();window.scrollTo(0,0)},
 iep2go(){IE.p2={phase:'prep',end:Date.now()+60000};render()},
 iescopy(el){const S_=IE.sp,c=S_.k==='1'?IELTS.s1.find(x=>x.id===S_.id).qs.join(' / '):IELTS.s2.find(x=>x.id===S_.id).topic+' (cue: '+IELTS.s2.find(x=>x.id===S_.id).cue.join('; ')+')';pcCopy(ieSPrompt(S_.k,c,ieDraft()['tr:'+S_.id]||''),el)},
 iessave(){
  const S_=IE.sp,d=ieDraft(),fb=d['sfb:'+S_.id]||'',band=ieParseBand(fb);
  if(!fb.trim()){IE.msg='Paste the feedback first.';render();return}
  if(band==null){IE.msg='No "FINAL BAND: X.X" line found.';render();return}
  const T=ieT(),id=pcId(),nv=ieAddVocab(fb,id),ms=ieParseMist(fb);
  T.sp.push({id,ts:Date.now(),mod:Date.now(),pid:S_.id,k:S_.k,band,fb});
  T.sc.push({id:'s'+id,ts:Date.now(),sk:'speak',src:S_.id,band,self:false});
  ms.forEach((m,i)=>ieAddErr({id:'e_s'+id+'_'+i,sk:'wm',src:id,qi:i,w:m.w,f:m.f}));
  effAdd('ielts',Math.min(1800,(Date.now()-S_.t0)/1000));
  const dd=ieDraft();delete dd['tr:'+S_.id];delete dd['sfb:'+S_.id];pcLS('lu-ie-draft',dd);
  save();IE.sp=null;IE.p2=null;IE.page='speak';IE.msg='Saved: band '+ieFmt(band)+', '+nv+' words and '+ms.length+' corrections added to À revoir.';render();window.scrollTo(0,0)},
 iesself(el){const S_=IE.sp,T=ieT(),b=+el.dataset.v;T.sc.push({id:'s'+pcId(),ts:Date.now(),sk:'speak',src:S_.id,band:b,self:true});T.sp.push({id:pcId(),ts:Date.now(),mod:Date.now(),pid:S_.id,k:S_.k,band:b,fb:''});effAdd('ielts',Math.min(1800,(Date.now()-S_.t0)/1000));save();IE.sp=null;IE.p2=null;IE.page='speak';render();window.scrollTo(0,0)},
 ievoc(){const ids=ieVocDue().map(c=>c.id);if(!ids.length)return;STUDY={course:null,vocab:true,back:'ielts',queue:ids,flipped:false,done:0,again:0,t:Date.now()};hist.push([view,param]);view='study';param=null;render();window.scrollTo(0,0)},
 ierr(el){const l=el.dataset.m==='due'?ieErrDue():ieErrOpen();const items=l.slice().sort((a,b)=>(a.due||'').localeCompare(b.due||'')).slice(0,15);if(!items.length)return;IE.rr={items,i:0,ok:0,show:false,ans:{},t0:Date.now()};render();window.scrollTo(0,0)},
 iercheck(){const R=IE.rr;R.show=true;render()},
 ieershow(){IE.rr.show=true;render()},
 iergrade(el){const R=IE.rr,e=R.items[R.i],ok=el.dataset.ok==='1';ieErrGrade(e,ok);if(ok)R.ok++;effAdd('ielts',40);ieNextErr()},
 ieernext(){const R=IE.rr,e=R.items[R.i],d=ieSet(e.sk,e.src),ok=ieCheck(d.qs[e.qi],R.ans[e.qi]);ieErrGrade(e,ok);if(ok)R.ok++;effAdd('ielts',40);ieNextErr()},
 ieadd(){const d=ieDraft(),txt=d.add||'';if(!txt.trim()){IE.msg='Nothing to add.';render();return}const n=ieAddVocab(txt,'m'+pcId());d.add='';pcLS('lu-ie-draft',d);save();IE.msg=n?n+' words added.':'No new word found (format: term | French | example).';render()},
 iestarter(){const T=wriT();let n=0;IELTS.vocab.forEach((v,i)=>{const id='ie_st_'+i;if(T.vocab.some(o=>o.id===id||(o.lang==='en'&&o.term.toLowerCase()===v[0].toLowerCase())))return;T.vocab.push({id,lang:'en',term:v[0],tr:v[1],note:v[2]+' (IELTS)',box:0,due:today(),ts:Date.now()});n++});save();IE.msg=n+' starter words added. They come in as new cards, a few per day.';render()}
});
function ieErrGrade(e,ok){const T=ieT(),x=T.err.find(y=>y.id===e.id);if(!x)return;x.n=(x.n||0)+1;if(ok){x.box=(x.box||0)+1;x.due=x.box>=3?'9999-12-31':ieDay(IE_STEPS[x.box])}else{x.box=0;x.due=ieDay(1)}x.mod=Date.now();save()}
VMAP.ielts=vIelts;
