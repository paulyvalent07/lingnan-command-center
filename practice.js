/* ---------- Daily debate (critical thinking) and Writing / translation practice ----------
   AI feedback model: Daily builds a ready-made prompt, you paste it in a Claude chat, then log the result here. */
const pcLS=(k,v)=>{try{if(v===undefined)return JSON.parse(localStorage.getItem(k)||'null');if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}};
const pcId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const pcLabel={en:'English',it:'Italian',es:'Spanish',fr:'French'};
function pcCopy(text,btn){
 const done=()=>{if(btn){const o=btn.dataset.o||btn.innerHTML;btn.dataset.o=o;btn.innerHTML='<b>Copied. Paste it in a Claude chat.</b>';clearTimeout(btn._t);btn._t=setTimeout(()=>{btn.innerHTML=o},2200)}};
 const fb=()=>{const t=document.createElement('textarea');t.value=text;t.style.cssText='position:fixed;opacity:0';document.body.appendChild(t);t.select();try{document.execCommand('copy')}catch(e){}t.remove();done()};
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(text).then(done,fb);else fb();
}
function pcMergeList(a,b){const m=new Map();[...(a||[]),...(b||[])].forEach(x=>{const y=m.get(x.id);if(!y||(x.ts||0)>=(y.ts||0))m.set(x.id,x)});return [...m.values()].sort((x,y)=>(x.ts||0)-(y.ts||0))}
const debT=()=>{if(!S.deb)S.deb={list:[]};if(!S.deb.list)S.deb.list=[];return S.deb};
const wriT=()=>{if(!S.wri)S.wri={list:[],vocab:[]};S.wri.list=S.wri.list||[];S.wri.vocab=S.wri.vocab||[];return S.wri};
const pcMerge=(a,b)=>({list:pcMergeList(a&&a.list,b&&b.list),vocab:pcMergeList(a&&a.vocab,b&&b.vocab)});

/* ---- shared timer ---- */
let PCMIN={deb:10,wri:30};
function pcTimerHtml(k){
 const t=pcLS('lu-pc-timer'),on=t&&t.k===k&&t.end>Date.now();
 return `<div class="card pct"><div class="card-h"><h3 id="pctimer" class="tmt">${on?fmtMS((t.end-Date.now())/1000):fmtMS(PCMIN[k]*60)}</h3>
 <button class="btn sm ${on?'red':''}" data-act="pctoggle" data-k="${k}">${on?'Stop':'Start timer'}</button></div>
 <div class="segc">${(k==='deb'?[10,15,20]:[20,30,45]).map(m=>`<button class="${PCMIN[k]===m?'on':''}" data-act="pcmin" data-k="${k}" data-m="${m}">${m} min</button>`).join('')}</div></div>`;
}
setInterval(()=>{const el=document.getElementById('pctimer');if(!el)return;const t=pcLS('lu-pc-timer');
 if(t&&t.end>Date.now()&&t.k===(view==='deb'?'deb':'wri'))el.textContent=fmtMS((t.end-Date.now())/1000);
 else if(t&&t.end&&t.end<=Date.now()&&t.k===(view==='deb'?'deb':'wri')){el.textContent="Time's up";el.style.color='var(--red)'}},500);

/* ---- drafts live outside the synced state, so typing never triggers a re-render ---- */
const dDraft=()=>pcLS('lu-deb-draft')||{};
const wDraft=()=>pcLS('lu-wri-draft')||{kind:'essay',lang:'en',lvl:'B2',course:'BUS2202'};
let dTO=null;
document.addEventListener('input',e=>{const el=e.target;if(!el.dataset)return;
 if(el.dataset.df){const d=dDraft();d[el.dataset.df]=el.value;pcLS('lu-deb-draft',d)}
 if(el.dataset.wf){const d=wDraft();d[el.dataset.wf]=el.value;pcLS('lu-wri-draft',d);if(el.dataset.wf==='text'){const w=document.getElementById('wcount');if(w)w.textContent=pcWords(el.value)+' words'}}});
const pcWords=t=>(t.trim().match(/\S+/g)||[]).length;

/* ====================  DEBATE  ==================== */
const DEB_THEMES=['Review: take a past debate and test it against new facts','Markets and macroeconomics','Trade, geopolitics and power','Corporate strategy and business models','Technology, AI and work','Society, public policy and the business of sport','Wildcard: the thing that surprised you most this week'];
const debTheme=()=>DEB_THEMES[new Date().getDay()];
const DEB_FIELDS=[['pos','1. My position','In one or two sentences: what do I think, and why?'],['facts','2. Facts to challenge','What am I taking for granted? What would I need to verify, and where?'],['qs','3. Questions nobody asked','Five questions that the coverage skips. Who benefits? What is missing? What would change my mind?'],['con','4. The strongest case against me','Argue the other side as well as its smartest defender would.'],['les','5. Lessons and links','What general principle does this show? Link it to a course concept or to another event.']];
function debStreak(){const d=new Set(debT().list.map(x=>x.day));let n=0,c=new Date();if(!d.has(dkey(c)))c.setDate(c.getDate()-1);while(d.has(dkey(c))){n++;c.setDate(c.getDate()-1)}return n}
function debTopicPrompt(){return `I am a business student at Lingnan University (Hong Kong) training my critical thinking. Today's theme: ${debTheme()}.\nUse web search to find ONE significant current-affairs story from the last 48 hours that fits this theme and matters for business, economics or geopolitics. Give me:\n1) the headline, source and date;\n2) the 5 key facts, each with a source link;\n3) two claims in the coverage that are contested or weakly supported;\n4) three stakeholders and what each one wants.\nDo NOT give your own opinion or conclusion yet: I will form mine first. Reply in English, concise.`}
function debChallengePrompt(d){const f=k=>(d[k]||'(left blank)').trim();return `Act as a demanding debate coach. Topic: ${d.topic||'(see below)'}.\nI worked on it for ${d.mins||'?'} minutes. Here is my work:\n\nMY POSITION:\n${f('pos')}\n\nFACTS I WOULD CHALLENGE:\n${f('facts')}\n\nQUESTIONS NOBODY ASKED:\n${f('qs')}\n\nSTRONGEST CASE AGAINST ME:\n${f('con')}\n\nLESSONS AND LINKS:\n${f('les')}\n\nPlease:\n1) Check my factual claims with web search and flag anything wrong or unverified.\n2) Name the 3 weakest points in my reasoning (name the fallacy or bias when there is one).\n3) Rate 1 to 5, one sentence each: (a) rigour with facts, (b) quality of my questions, (c) strength of my counter-argument, (d) depth of lessons and links.\n4) Give me 3 questions I did not ask that could change my mind.\n5) End with a one-line takeaway I should remember.\nBe blunt, no flattery. Reply in English.`}
function vDeb(){
 const T=debT(),tab=DEBTAB,d=dDraft(),streak=debStreak();
 const tabs=`<div class="segc" style="margin:6px 0 14px">${[['today','Today'],['log','Log ('+T.list.length+')']].map(([k,l])=>`<button class="${tab===k?'on':''}" data-act="debtab" data-k="${k}">${l}</button>`).join('')}</div>`;
 let body='';
 if(tab==='today'){
  const rate=(k,l)=>`<div class="cell"><span class="t"><b>${l}</b></span><select data-df="r_${k}" class="rs">${['—',1,2,3,4,5].map(v=>`<option value="${v==='—'?'':v}" ${String(d['r_'+k]||'')===(v==='—'?'':String(v))?'selected':''}>${v}</option>`).join('')}</select></div>`;
  body=`<div class="card"><div class="card-h"><h3>Today's theme</h3><span class="badge blue">${streak} day streak</span></div><p>${debTheme()}</p>
  <div style="margin-top:12px"><button class="btn tint" data-act="debcopy1">${ic('doc')} Copy the topic prompt</button></div>
  <div class="sf" style="margin:8px 0 0">Paste it in a Claude chat: it finds a story from the last 48 hours with sources, without giving its opinion.</div></div>
  <div class="grp fgrp" style="margin-top:14px"><div class="cell"><input type="text" data-df="topic" value="${esc(d.topic||'')}" placeholder="Topic or headline you will debate" style="flex:1;width:100%;max-width:none;text-align:left;font-size:17px;border:0;outline:0;background:transparent"></div></div>
  <div style="margin-top:14px">${pcTimerHtml('deb')}</div>
  ${DEB_FIELDS.map(([k,l,ph])=>`<div class="eyebrow" style="margin:16px 0 6px">${l}</div><textarea class="pcta" data-df="${k}" rows="4" placeholder="${esc(ph)}">${esc(d[k]||'')}</textarea>`).join('')}
  <div style="margin-top:16px"><button class="btn" data-act="debcopy2">${ic('doc')} Copy the challenge prompt for Claude</button></div>
  <div class="sf">Paste it in the same Claude chat: it checks your facts, finds weak reasoning, rates you and suggests better questions.</div>
  <div class="card" style="margin-top:16px"><div class="card-h"><h3>Log the result</h3></div><div class="grp" style="background:var(--fill)">${rate('a','Rigour with facts (1-5)')}${rate('b','Quality of my questions')}${rate('c','Counter-argument')}${rate('d','Lessons and links')}</div>
  <textarea class="pcta" data-df="take" rows="2" placeholder="One-line takeaway to remember" style="margin-top:10px">${esc(d.take||'')}</textarea>
  <div style="margin-top:12px"><button class="btn" data-act="debsave">Save this debate</button></div></div>`;
 }else{
  const L=[...T.list].reverse(),avg=k=>{const v=T.list.map(x=>+x['r_'+k]).filter(Boolean);return v.length?(v.reduce((a,b)=>a+b,0)/v.length).toFixed(1):'—'};
  body=T.list.length?`<div class="stats" style="margin-bottom:14px"><div class="stat"><b>${T.list.length}</b><span>debates</span></div><div class="stat"><b>${streak}</b><span>day streak</span></div><div class="stat"><b>${avg('b')}</b><span>avg questions /5</span></div></div>
  <div class="grp">${L.map(x=>{const o=DEBOPEN===x.id;return `<div class="tmm"><button class="cell" data-act="debopen" data-id="${x.id}"><span class="t"><b style="font-size:15px">${esc(x.topic||'Untitled')}</b><span>${new Date(x.ts).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}${x.take?' · '+esc(x.take.slice(0,60)):''}</span></span>${ic(o?'chevd':'chev','chev')}</button>
  ${o?`<div class="tmx">${DEB_FIELDS.map(([k,l])=>x[k]?`<p><b>${l}</b><br><span style="white-space:pre-line">${esc(x[k])}</span></p>`:'').join('')}<p class="mute small">Ratings: facts ${x.r_a||'—'} · questions ${x.r_b||'—'} · counter ${x.r_c||'—'} · lessons ${x.r_d||'—'}</p><button class="btn red sm" data-act="debdel" data-id="${x.id}">Delete</button></div>`:''}</div>`}).join('')}</div>`:`<div class="empty">Your debates will be listed here.</div>`;
 }
 return `<div class="view">${navbar('Hub')}${title('Daily debate','Critical thinking')}${tabs}${body}</div>`;
}

/* ====================  WRITING  ==================== */
const WRI_KINDS=[['essay','Essay'],['theme','Thème (FR → …)'],['version','Version (… → FR)']];
const wLangName=l=>pcLabel[l]||l;
function wriTopic(course){
 const C_=(typeof CONTENT!=='undefined'&&CONTENT.courses&&CONTENT.courses[course])||null;if(!C_)return '';
 const ls=Object.values(C_.lessons||{}).map(x=>x.title).filter(Boolean);if(!ls.length)return '';
 return ls[Math.floor(Math.random()*ls.length)];
}
function wriPassagePrompt(w){
 const lang=w.kind==='theme'?'French':wLangName(w.lang),tp=w.topic?`on the theme: ${w.topic} (business / economics context)`:'on a business or economics theme';
 return `Write a passage of about 120 words in ${lang}, ${tp}. Level ${w.lvl}. Register: press article or professional report. Include 6 to 8 expressions that are hard to translate (idioms, false friends, subjunctive, set phrases). Output only the text, with no title and no commentary.`}
function wriFeedbackPrompt(w){
 const L=wLangName(w.lang),end=`End with a block that starts exactly with "VOCAB:" followed by up to 8 lines in the format: term | meaning | short example, taken from my mistakes.`;
 if(w.kind==='essay')return `Act as a ${L} writing tutor (target level ${w.lvl}). Essay question: ${w.topic||'(free topic)'}.\nHere is my essay (${pcWords(w.text||'')} words):\n\n${(w.text||'').trim()}\n\nGive me: 1) an estimated CEFR level; 2) three points of feedback on structure and argument; 3) every language mistake as "my wording → correction (rule)", up to 12; 4) a corrected version; 5) a score out of 20. Be blunt. ${end}`;
 const from=w.kind==='theme'?'French':L,to=w.kind==='theme'?L:'French';
 return `Act as a translation tutor. Here is a ${from} source text and my translation into ${to} (level ${w.lvl}).\n\nSOURCE (${from}):\n${(w.src||'').trim()}\n\nMY TRANSLATION (${to}):\n${(w.text||'').trim()}\n\nGive me: 1) every mistake as "my wording → correction (rule)", including mistranslations, false friends, grammar and register; 2) a model translation; 3) a score out of 20 for accuracy, naturalness and grammar. Be blunt. ${end}`;
}
function wriParseVocab(txt,lang){
 const i=txt.search(/VOCAB:?/i);if(i<0)return [];
 return txt.slice(i).split('\n').slice(1).map(l=>l.replace(/^[\s\-\*\d\.\)]+/,'').trim()).filter(l=>l.split('|').length>=2).map(l=>{const p=l.split('|').map(s=>s.trim());return {term:p[0].replace(/\*\*/g,''),tr:p[1].replace(/\*\*/g,''),note:(p[2]||'').replace(/\*\*/g,'')}}).filter(x=>x.term&&x.tr);
}
const WINT=[1,3,7,14,30];
const vocDue=()=>wriT().vocab.filter(v=>(v.due||'')<=today());
function vWri(){
 const w=wDraft(),T=wriT(),tab=WRITAB;
 const seg=(opts,cur,act)=>`<div class="segc" style="flex:1">${opts.map(([k,l])=>`<button class="${String(cur)===String(k)?'on':''}" data-act="${act}" data-k="${k}">${l}</button>`).join('')}</div>`;
 const tabs=`<div class="segc" style="margin:6px 0 14px">${[['write','Write'],['vocab','Vocab ('+vocDue().length+' due)'],['log','Log']].map(([k,l])=>`<button class="${tab===k?'on':''}" data-act="writab" data-k="${k}">${l}</button>`).join('')}</div>`;
 let body='';
 if(tab==='write'){
  const isT=w.kind!=='essay';
  body=`<div class="stack" style="margin-bottom:8px">${seg(WRI_KINDS,w.kind,'wrikind')}</div>
  <div class="stack" style="margin-bottom:8px">${seg([['en','English'],['it','Italian'],['es','Spanish']],w.lang,'wrilang')}${seg([['B1','B1'],['B2','B2'],['C1','C1']],w.lvl,'wrilvl')}</div>
  <div class="grp fgrp" style="margin-top:12px"><div class="cell"><input type="text" data-wf="topic" value="${esc(w.topic||'')}" placeholder="${w.kind==='essay'?'Essay question':'Theme (optional)'}" style="flex:1;width:100%;max-width:none;text-align:left;font-size:17px;border:0;outline:0;background:transparent"></div>
  <button class="cell has-ico" data-act="writopic"><span class="sq" style="--c:var(--accent)">${ic('redo')}</span><span class="t"><b>Pick a topic from my courses</b><span>${esc((COURSES.find(c=>c.id===w.course)||COURSES[0]).short)} · tap again for another · long list in Courses</span></span></button></div>
  <div class="chips" style="margin-top:8px">${COURSES.map(c=>`<button class="chip ${w.course===c.id?'on':''}" style="--c:${c.color}" data-act="wricourse" data-id="${c.id}"><i></i>${c.short}</button>`).join('')}</div>
  ${isT?`<div style="margin-top:6px"><button class="btn tint" data-act="wricopy0">${ic('doc')} Copy the prompt that creates the source text</button></div>
  <div class="eyebrow" style="margin:16px 0 6px">Source text (${w.kind==='theme'?'French':wLangName(w.lang)})</div><textarea class="pcta" data-wf="src" rows="6" placeholder="Paste the text Claude gave you here">${esc(w.src||'')}</textarea>`:''}
  <div style="margin-top:14px">${pcTimerHtml('wri')}</div>
  <div class="eyebrow" style="margin:16px 0 6px;display:flex;justify-content:space-between"><span>${w.kind==='essay'?'Your essay':'Your translation'} (${w.kind==='theme'?wLangName(w.lang):w.kind==='version'?'French':wLangName(w.lang)})</span><span id="wcount">${pcWords(w.text||'')} words</span></div>
  <textarea class="pcta" data-wf="text" rows="12" placeholder="Write here">${esc(w.text||'')}</textarea>
  <div style="margin-top:14px"><button class="btn" data-act="wricopy1">${ic('doc')} Copy the correction prompt for Claude</button></div>
  <div class="eyebrow" style="margin:18px 0 6px">Claude's feedback</div><textarea class="pcta" data-wf="fb" rows="6" placeholder="Paste Claude's answer here, including the VOCAB: block">${esc(w.fb||'')}</textarea>
  <div class="grp fgrp" style="margin-top:10px"><div class="cell"><label>Score /20</label><input type="text" inputmode="decimal" data-wf="score" value="${esc(w.score||'')}" placeholder="optional" style="text-align:right"></div></div>
  <div style="margin-top:12px;display:flex;gap:10px"><button class="btn tint" data-act="wrivocab">Extract vocabulary</button><button class="btn" data-act="wrisave">Save exercise</button></div>
  <div class="sf">Vocabulary comes from the VOCAB: lines of Claude's feedback and goes into spaced review.</div>`;
 }else if(tab==='vocab'){
  const due=vocDue(),cur=due[0];
  body=`<div class="stats" style="margin-bottom:14px"><div class="stat"><b>${due.length}</b><span>due now</span></div><div class="stat"><b>${T.vocab.length}</b><span>words saved</span></div><div class="stat"><b>${['en','it','es'].map(l=>T.vocab.filter(v=>v.lang===l).length).join('·')}</b><span>EN · IT · ES</span></div></div>`+
  (cur?`<div class="card"><div class="eyebrow">${wLangName(cur.lang)}</div><h3 style="font-size:26px;margin:6px 0 12px">${esc(cur.term)}</h3>${VREV?`<p>${esc(cur.tr)}</p>${cur.note?`<p class="mute small" style="margin-top:6px">${esc(cur.note)}</p>`:''}<div style="display:flex;gap:10px;margin-top:16px"><button class="btn red" data-act="vocko" data-id="${cur.id}">Missed</button><button class="btn" data-act="vocok" data-id="${cur.id}">Knew it</button></div>`:`<button class="btn tint" data-act="vocshow">Show meaning</button>`}</div>`:`<div class="empty">Nothing due. New words arrive when you extract vocabulary from Claude's feedback.</div>`)+
  `<div class="grp fgrp" style="margin-top:16px"><div class="cell"><input type="text" id="vnew" placeholder="Add a word: term | meaning" style="flex:1;width:100%;max-width:none;text-align:left;font-size:17px;border:0;outline:0;background:transparent"></div><button class="cell has-ico" data-act="vocadd"><span class="sq" style="--c:var(--green)">${ic('plus')}</span><span class="t"><b>Add to ${wLangName(w.lang)}</b></span></button></div>`;
 }else{
  const L=[...T.list].reverse();
  body=L.length?`<div class="grp">${L.map(x=>{const o=WRIOPEN===x.id;return `<div class="tmm"><button class="cell" data-act="wriopen" data-id="${x.id}"><span class="t"><b style="font-size:15px">${x.kind==='essay'?'Essay':x.kind==='theme'?'Thème':'Version'} · ${wLangName(x.lang)} ${x.lvl}</b><span>${new Date(x.ts).toLocaleDateString('en-GB',{day:'numeric',month:'short'})} · ${x.words} words${x.score?' · '+esc(x.score)+'/20':''}${x.topic?' · '+esc(x.topic.slice(0,40)):''}</span></span>${ic(o?'chevd':'chev','chev')}</button>
  ${o?`<div class="tmx">${x.src?`<p class="tmp">${esc(x.src)}</p>`:''}<p style="white-space:pre-line">${esc(x.text)}</p>${x.fb?`<p class="mute small" style="white-space:pre-line">${esc(x.fb)}</p>`:''}<button class="btn red sm" data-act="wridel" data-id="${x.id}">Delete</button></div>`:''}</div>`}).join('')}</div>`:`<div class="empty">Saved exercises will be listed here.</div>`;
 }
 return `<div class="view">${navbar('Hub')}${title('Writing','EN · IT · ES')}${tabs}${body}</div>`;
}

/* ---- actions ---- */
let DEBTAB='today',DEBOPEN=null,WRITAB='write',WRIOPEN=null,VREV=false;
const wSet=(k,v)=>{const d=wDraft();d[k]=v;pcLS('lu-wri-draft',d)};
Object.assign(A,{
 debtab(el){DEBTAB=el.dataset.k;render()},
 debopen(el){DEBOPEN=DEBOPEN===el.dataset.id?null:el.dataset.id;render()},
 debcopy1(el){pcCopy(debTopicPrompt(),el)},
 debcopy2(el){const d=dDraft();d.mins=PCMIN.deb;pcCopy(debChallengePrompt(d),el)},
 debsave(){const d=dDraft();if(!(d.topic||'').trim()&&!(d.pos||'').trim()){alert('Add a topic or your position first.');return}
  debT().list.push(Object.assign({},d,{id:pcId(),ts:Date.now(),day:today(),mins:PCMIN.deb}));save();pcLS('lu-deb-draft',null);DEBTAB='log';render();window.scrollTo(0,0)},
 debdel(el){if(!confirm('Delete this debate?'))return;const T=debT();T.list=T.list.filter(x=>x.id!==el.dataset.id);save();render()},
 pctoggle(el){const k=el.dataset.k,t=pcLS('lu-pc-timer');if(t&&t.k===k&&t.end>Date.now())pcLS('lu-pc-timer',null);else pcLS('lu-pc-timer',{k,end:Date.now()+PCMIN[k]*60000});render()},
 pcmin(el){PCMIN[el.dataset.k]=+el.dataset.m;pcLS('lu-pc-timer',null);render()},
 writab(el){WRITAB=el.dataset.k;render()},
 wrikind(el){wSet('kind',el.dataset.k);render()},
 wrilang(el){wSet('lang',el.dataset.k);render()},
 wrilvl(el){wSet('lvl',el.dataset.k);render()},
 wricourse(el){wSet('course',el.dataset.id);render()},
 writopic(){const w=wDraft(),t=wriTopic(w.course);if(!t)return;wSet('topic',w.kind==='essay'?'Explain and critically evaluate: '+t+'. Use at least two concepts from the chapter and one real example.':t);render()},
 wricopy0(el){pcCopy(wriPassagePrompt(wDraft()),el)},
 wricopy1(el){const w=wDraft();if(!(w.text||'').trim()){alert('Write something first.');return}pcCopy(wriFeedbackPrompt(w),el)},
 wrivocab(){const w=wDraft(),items=wriParseVocab(w.fb||'',w.lang),T=wriT();let n=0;
  items.forEach(x=>{if(T.vocab.some(v=>v.lang===w.lang&&v.term.toLowerCase()===x.term.toLowerCase()))return;T.vocab.push({id:pcId(),lang:w.lang,term:x.term,tr:x.tr,note:x.note,box:0,due:today(),ts:Date.now()});n++});
  save();alert(n?n+' word'+(n===1?'':'s')+' added to your review.':items.length?'Those words are already saved.':'No VOCAB: block found in the feedback.');render()},
 wrisave(){const w=wDraft();if(!(w.text||'').trim()){alert('Nothing to save yet.');return}
  wriT().list.push({id:pcId(),ts:Date.now(),kind:w.kind,lang:w.lang,lvl:w.lvl,topic:w.topic||'',src:w.src||'',text:w.text,fb:w.fb||'',score:w.score||'',words:pcWords(w.text)});save();
  pcLS('lu-wri-draft',Object.assign({},w,{text:'',src:'',fb:'',score:'',topic:''}));pcLS('lu-pc-timer',null);WRITAB='log';render();window.scrollTo(0,0)},
 wriopen(el){WRIOPEN=WRIOPEN===el.dataset.id?null:el.dataset.id;render()},
 wridel(el){if(!confirm('Delete this exercise?'))return;const T=wriT();T.list=T.list.filter(x=>x.id!==el.dataset.id);save();render()},
 vocshow(){VREV=true;render()},
 vocok(el){const v=wriT().vocab.find(x=>x.id===el.dataset.id);if(!v)return;v.box=Math.min(WINT.length-1,(v.box||0)+1);const d=new Date();d.setDate(d.getDate()+WINT[v.box]);v.due=dkey(d);v.ts=Date.now();VREV=false;save();render()},
 vocko(el){const v=wriT().vocab.find(x=>x.id===el.dataset.id);if(!v)return;v.box=0;const d=new Date();d.setDate(d.getDate()+1);v.due=dkey(d);v.ts=Date.now();VREV=false;save();render()},
 vocadd(){const el=document.getElementById('vnew'),p=(el&&el.value||'').split('|').map(s=>s.trim());if(p.length<2||!p[0]||!p[1]){alert('Type: term | meaning');return}
  wriT().vocab.push({id:pcId(),lang:wDraft().lang,term:p[0],tr:p[1],note:p[2]||'',box:0,due:today(),ts:Date.now()});save();render()}
});
VMAP.deb=vDeb;VMAP.wri=vWri;
