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
function pcMergeList(a,b){const m=new Map();[...(a||[]),...(b||[])].forEach(x=>{const y=m.get(x.id);if(!y||(x.mod||x.ts||0)>=(y.mod||y.ts||0))m.set(x.id,x)});return [...m.values()].sort((x,y)=>(x.ts||0)-(y.ts||0))}
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
let effLast=0;
const pcTyped=d=>{const n=Date.now(),g=n-effLast;effLast=n;if(g>0&&g<60000)d.eff=(d.eff||0)+g/1000};
const pcTimed=k=>{const t=pcLS('lu-pc-timer');if(!t||t.k!==k)return 0;const dur=PCMIN[k]*60;return Math.max(0,Math.min(dur,dur-(t.end-Date.now())/1000))};
document.addEventListener('input',e=>{const el=e.target;if(!el.dataset)return;
 if(el.dataset.df){const d=dDraft();d[el.dataset.df]=el.value;pcTyped(d);pcLS('lu-deb-draft',d)}
 if(el.dataset.wf){const d=wDraft();d[el.dataset.wf]=el.value;if(el.dataset.wf==='text')pcTyped(d);pcLS('lu-wri-draft',d);if(el.dataset.wf==='text'){const w=document.getElementById('wcount');if(w)w.textContent=pcWords(el.value)+' words'}if(el.dataset.wf==='topic'){el.style.height='auto';el.style.height=el.scrollHeight+'px'}}});
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
 if(String(course).startsWith('cat:')){const c=course.slice(4),l=WTOPICS.filter(x=>x[0]===c);return l.length?l[Math.floor(Math.random()*l.length)][1]:''}
 const C_=(typeof CONTENT!=='undefined'&&CONTENT.courses&&CONTENT.courses[course])||null;if(!C_)return '';
 const ls=Object.values(C_.lessons||{}).map(x=>x.title).filter(Boolean);if(!ls.length)return '';
 return ls[Math.floor(Math.random()*ls.length)];
}
function wriPassagePrompt(w){
 const lang=w.kind==='theme'?'French':wLangName(w.lang),cat=String(w.course||'').startsWith('cat:'),tp=w.topic?`on the theme: ${w.topic}${cat?' (treat it as a general-interest text, not a business one)':' (business / economics context)'}`:cat?`on a ${w.course.slice(4).toLowerCase()} theme`:'on a business or economics theme';
 return `Write a passage of about 120 words in ${lang}, ${tp}. Level ${w.lvl}. Register: press article or professional report. Include 6 to 8 expressions that are hard to translate (idioms, false friends, subjunctive, set phrases). Output only the text, with no title and no commentary.`}
function wriFeedbackPrompt(w){
 const L=wLangName(w.lang),end=`End with a block that starts exactly with "VOCAB:" followed by one line for every mistake, word or expression worth learning (no limit on the number; do not leave any out) in the format: term in ${L} | French translation | short example in ${L}, taken from my mistakes. The second column must be the FRENCH translation (not an English definition).`;
 if(w.kind==='essay')return `Act as a ${L} writing tutor (target level ${w.lvl}). Essay question: ${w.topic||'(free topic)'}.\nHere is my essay (${pcWords(w.text||'')} words):\n\n${(w.text||'').trim()}\n\nGive me: 1) an estimated CEFR level; 2) three points of feedback on structure and argument; 3) every language mistake as "my wording → correction (rule)", up to 12; 4) a corrected version; 5) a grade using this exact scale: ${WRI_SCALE.essay.map(x=>x[0]+' /'+x[1]).join(', ')} (that adds up to 20), then ONE last line in exactly this form: FINAL SCORE: X/20 (the sum of the parts, half points allowed). Be blunt. ${end}`;
 const from=w.kind==='theme'?'French':L,to=w.kind==='theme'?L:'French';
 return `Act as a translation tutor. Here is a ${from} source text and my translation into ${to} (level ${w.lvl}).\n\nSOURCE (${from}):\n${(w.src||'').trim()}\n\nMY TRANSLATION (${to}):\n${(w.text||'').trim()}\n\nGive me: 1) every mistake as "my wording → correction (rule)", including mistranslations, false friends, grammar and register; 2) a model translation; 3) a grade using this exact scale: ${WRI_SCALE.tr.map(x=>x[0]+' /'+x[1]).join(', ')} (that adds up to 20), then ONE last line in exactly this form: FINAL SCORE: X/20 (the sum of the parts, half points allowed). Be blunt. ${end}`;
}
function wriParseVocab(txt,lang){
 txt=String(txt||'');const lines=txt.split('\n');
 /* the LAST line that opens the block: "VOCAB:", "**VOCAB:**", "## Vocabulary", ... (an earlier mention of the word in the prose must not count) */
 let h=-1;lines.forEach((l,i)=>{if(/^[\s#*_>`\-]*(vocab(ulary|ulaire)?)\b[^|]{0,40}$/i.test(l)||/^[\s#*_>`\-]*vocab:/i.test(l))h=i});
 if(h<0)return [];
 let rest=lines.slice(h+1);const same=lines[h].replace(/^[\s#*_>`\-]*vocab\w*\s*[:：]?\**\s*/i,'');if(same.includes('|'))rest.unshift(same);
 const out=[],seen={};
 rest.forEach(l=>{
  l=l.replace(/^[\s>\-\*\u2022\d\.\)]+/,'').replace(/^\|/,'').replace(/\|\s*$/,'').trim();
  if(!l||/^[\s:\-|]+$/.test(l))return;
  const p=l.split('|').map(x=>x.replace(/\*\*|`/g,'').trim());if(p.length<2)return;
  if(/^(term|terme|word|mot|expression)\b/i.test(p[0])&&/(french|fran|translation|traduction)/i.test(p[1]))return;
  const t=p[0].replace(/^["“]|["”]$/g,''),k=t.toLowerCase();if(!t||!p[1]||seen[k])return;seen[k]=1;out.push({term:t,tr:p[1],note:(p.slice(2).join(' | ')||'')});
 });return out;
}
const WINT=[1,3,7,14,30];
function wriAddVocab(x){const T=wriT(),items=wriParseVocab(x.fb||'',x.lang);let n=0;
 items.forEach((v,i)=>{const id='x'+x.id+'_'+i;if(T.vocab.some(o=>o.id===id||(o.lang===x.lang&&o.term.toLowerCase()===v.term.toLowerCase())))return;T.vocab.push({id,lang:x.lang,term:v.term,tr:v.tr,note:v.note,box:0,due:today(),ts:Date.now()});n++});return n}
/* words extracted by an older version only on the Extract button: recover them from saved exercises of the last week */
function wriRecover(){const T=wriT(),lim=Date.now()-7*864e5;let ch=0;T.list.forEach(x=>{if(x.fb&&x.ts>=lim&&/VOCAB/i.test(x.fb)&&(!x.vx||!T.vocab.some(v=>String(v.id).startsWith('x'+x.id+'_')))){if(wriAddVocab(x)||!x.vx){x.vx=1;x.mod=Date.now();ch++}}});if(ch)save()}
/* vocabulary uses the same cards, swipe screen and spaced repetition as the course flashcards (state in S.vc) */
const VNEW=30;
function vcGet(v){const s=S.vc&&S.vc['v:'+v.id];if(s)return s;
 if((v.box||0)>0||(v.due||'')>today())return {n:v.box||0,i:WINT[Math.min(v.box||0,WINT.length-1)]||1,e:2.5,f:0,due:new Date((v.due||today())+'T00:00:00').getTime(),ts:v.ts||1,fd:''};
 return null}
function vcSeed(id){const v=wriT().vocab.find(x=>'v:'+x.id===id);return v?vcGet(v):null}
function vocCards(){return wriT().vocab.map(v=>({id:'v:'+v.id,v:1,vid:v.id,c:'wri',lang:v.lang,lt:wLangName(v.lang),q:VDIR==='fr'?v.tr:v.term,a:(VDIR==='fr'?v.term:v.tr)+(v.note?'\n\n'+v.note:'')}))}
const vocCard=id=>vocCards().find(c=>c.id===id);
function vocQueue(){
 const now=Date.now(),due=[],fr=[];
 vocCards().forEach(c=>{const s=vcGet(wriT().vocab.find(x=>x.id===c.vid));if(s){if(s.due<=now)due.push([s.due,c])}else fr.push(c)});
 due.sort((a,b)=>a[0]-b[0]);
 const intro=Object.values(S.vc||{}).filter(s=>s.fd===today()).length;
 return {due:due.map(x=>x[1]),fresh:fr.slice(0,Math.max(0,VNEW-intro))};
}
const vocDue=()=>{const q=vocQueue();return q.due.concat(q.fresh)};
function startVocStudy(){const q=vocQueue(),ids=q.due.concat(q.fresh).map(c=>c.id);if(!ids.length)return;
 STUDY={course:null,vocab:true,queue:ids,flipped:false,done:0,again:0,t:Date.now()};hist.push([view,param]);view='study';param=null;render();window.scrollTo(0,0)}
const WRI_SCALE={tr:[['Accuracy of meaning (no mistranslation, omission or false friend)',8],['Grammar, spelling and agreement',6],['Naturalness and register',6]],essay:[['Task and argument',6],['Structure and coherence',4],['Grammar and vocabulary accuracy',6],['Range and style',4]]};
const wriScaleTxt=k=>WRI_SCALE[k==='essay'?'essay':'tr'].map(x=>x[0].split(' (')[0]+' '+x[1]).join(' · ');
function wriExtractScore(t){
 t=String(t||'').replace(/\*\*|__/g,'');
 const fin=t.match(/final\s+(?:score|grade|note)\s*[:=\-–—]?\s*(\d{1,2}(?:[.,]\d{1,2})?)/i);
 if(fin){const v=parseFloat(fin[1].replace(',','.'));if(v>=0&&v<=20)return v}
 const re=/(\d{1,2}(?:[.,]\d{1,2})?)\s*(?:\/|out of|sur)\s*20\b/gi,all=[];let m;
 while((m=re.exec(t))){const v=parseFloat(m[1].replace(',','.'));if(v>=0&&v<=20)all.push({v,i:m.index})}
 if(all.length){const kw=/total|overall|final|global|moyenne|average/i;
  const w=all.filter(x=>kw.test(t.slice(t.lastIndexOf('\n',x.i)+1,x.i+30)));if(w.length)return w[w.length-1].v;
  if(all.length>1){const lines=new Set(all.map(x=>t.lastIndexOf('\n',x.i)));if(lines.size>1)return Math.round(all.reduce((s,x)=>s+x.v,0)/all.length*2)/2}
  return all[all.length-1].v}
 const c=t.replace(/(?:out of|sur|\/)\s*20\b/gi,' ');
 const m2=c.match(/(?:score|grade|rating|note|mark)(?:\s+(?:finale?|final|overall|globale?))?\s*[:=\-–—]\s*(\d{1,2}(?:[.,]\d{1,2})?)(?!\d)/i);
 if(m2){const v=parseFloat(m2[1].replace(',','.'));if(v>=0&&v<=20)return v}
 return null}
const wriHint=fb=>{const s=wriExtractScore(fb);return s!=null?'Score read from the feedback: '+s+'/20':(String(fb||'').trim()?'No /20 score found in the feedback yet':"The /20 score is read from Claude's feedback when you save.")};
document.addEventListener('input',e=>{const el=e.target;if(el&&el.dataset&&el.dataset.wf==='fb'){const h=document.getElementById('wscorehint');if(h)h.textContent=wriHint(el.value)}});
function vWri(){
 wriRecover();
 const w=wDraft(),T=wriT(),tab=WRITAB;
 const seg=(opts,cur,act)=>`<div class="segc" style="flex:1">${opts.map(([k,l])=>`<button class="${String(cur)===String(k)?'on':''}" data-act="${act}" data-k="${k}">${l}</button>`).join('')}</div>`;
 const tabs=`<div class="segc" style="margin:6px 0 14px">${[['write','Write'],['vocab','Vocab ('+vocDue().length+' due)'],['prog','Progress']].map(([k,l])=>`<button class="${tab===k?'on':''}" data-act="writab" data-k="${k}">${l}</button>`).join('')}</div>`;
 let body='';
 if(tab==='write'){
  const on=(w.text||'').trim()||(w.src||'').trim(),kd=WRI_KINDS.find(k=>k[0]===w.kind)||WRI_KINDS[0];
  const TY=[['theme','Thème','French → '+wLangName(w.lang),'redo','var(--orange)'],['version','Version',wLangName(w.lang)+' → French','doc','var(--green)'],['essay','Essay','Argued answer in '+wLangName(w.lang),'pen','var(--accent)']];
  body=(on?`<div class="card" style="margin-bottom:14px"><div class="card-h"><h3>Exercise in progress</h3></div><p class="mute small" style="margin:0 0 10px">${esc(kd[1])} · ${wLangName(w.lang)} ${w.lvl} · ${pcWords(w.text||'')} words written</p><div style="display:flex;gap:10px"><button class="btn" data-act="wresume">Resume</button><button class="btn gray" data-act="wdiscard">Discard</button></div></div>`:'')+
  `<div class="eyebrow" style="margin:4px 0 8px">Choose an exercise</div>
  <div class="wtypes">${TY.map(([k,n,s,ico,c])=>`<button class="wtype ${w.kind===k?'on':''}" data-act="wrikind" data-k="${k}" style="--c:${c}"><span class="sq" style="--c:${c}">${ic(ico)}</span><b>${n}</b><span>${esc(s)}</span></button>`).join('')}</div>
  <div class="stack" style="margin-top:14px">${seg([['en','English'],['it','Italian'],['es','Spanish']],w.lang,'wrilang')}${seg([['B1','B1'],['B2','B2'],['C1','C1']],w.lvl,'wrilvl')}</div>
  <div class="eyebrow" style="margin:16px 0 6px">Timer</div><div class="segc">${[[0,'Off'],[20,'20 min'],[30,'30 min'],[45,'45 min']].map(([m,l])=>`<button class="${PCMIN.wri===m?'on':''}" data-act="wtimer" data-m="${m}">${l}</button>`).join('')}</div>
  ${w.kind==='essay'?`<div class="eyebrow" style="margin:16px 0 6px">Questions</div><div class="chips">${WRICATS.map(([k,l])=>`<button class="chip ${WRIMODE===k?'on':''}" style="--c:var(--accent)" data-act="wrimode" data-k="${k}">${l}</button>`).join('')}</div>`:`<div class="eyebrow" style="margin:16px 0 6px">Theme of the text</div><div class="chips">${COURSES.map(c=>`<button class="chip ${w.course===c.id?'on':''}" style="--c:${c.color}" data-act="wricourse" data-id="${c.id}"><i></i>${c.short}</button>`).join('')}${WRICATS.filter(x=>x[0]!=='mix'&&x[0]!=='news').map(([k,l])=>`<button class="chip ${w.course==='cat:'+k?'on':''}" style="--c:var(--accent)" data-act="wricourse" data-id="cat:${k}">${l}</button>`).join('')}</div>`}
  <div style="margin-top:18px"><button class="btn" data-act="wstart">${ic('play')} Start ${esc(kd[1].split(' ')[0])}</button></div>
  <div class="sf">${w.kind==='essay'?'You get a question on the next page.':'On the next page, Daily gives you a prompt that makes Claude write the source text. Paste it on the left, translate on the right.'} Press Finish when you are done, then paste Claude's correction to get your /20 and your vocabulary.</div>`;
 }else if(tab==='vocab'){
  const q=vocQueue(),n=q.due.length+q.fresh.length,V=T.vocab;
  body=`<div class="stats" style="margin-bottom:14px"><div class="stat"><b>${q.due.length}</b><span>due</span></div><div class="stat"><b>${q.fresh.length}</b><span>new</span></div><div class="stat"><b>${V.length}</b><span>words saved</span></div></div>`+
  `<div class="segc" style="margin-bottom:10px">${[['fr','French → '+wLangName(w.lang)],['en',wLangName(w.lang)+' → French']].map(([k,l])=>`<button class="${VDIR===k?'on':''}" data-act="vocdir" data-k="${k}">${l}</button>`).join('')}</div>`+
  `<button class="btn" data-act="vocstudy" ${n?'':'disabled'}>${ic('play')} Study vocabulary${n?' · '+n+' card'+(n>1?'s':''):''}</button>`+
  (n?'':`<div class="empty" style="margin-top:12px">Nothing due. New words arrive when you extract vocabulary from Claude's feedback.</div>`)+
  `<div class="sf">Same cards as the course flashcards: tap to flip, swipe right if you knew it, left if not, or use Again / Hard / Good / Easy. ${['en','it','es'].map(l=>wLangName(l)+' '+V.filter(v=>v.lang===l).length).join(' · ')}.</div>`+
  `<div class="grp fgrp" style="margin-top:16px"><div class="cell"><input type="text" id="vnew" placeholder="Add a word: term | meaning" style="flex:1;width:100%;max-width:none;text-align:left;font-size:17px;border:0;outline:0;background:transparent"></div><button class="cell has-ico" data-act="vocadd"><span class="sq" style="--c:var(--green)">${ic('plus')}</span><span class="t"><b>Add to ${wLangName(w.lang)}</b></span></button></div>`+
  (V.length?`<details style="margin-top:14px"><summary class="mute small" style="padding:4px 4px">All words (${V.length})</summary><div class="grp" style="margin-top:8px">${[...V].reverse().map(v=>`<div class="cell"><span class="t"><b style="font-size:15px;white-space:normal">${esc(v.term)}</b><span>${esc(v.tr)} · ${wLangName(v.lang)}</span></span><button class="btn red sm" data-act="vocdel" data-id="${v.id}">Delete</button></div>`).join('')}</div></details>`:'');
 }else{
  body=wriProg();
 }
 return `<div class="view">${navbar('Hub')}${title('Writing','EN · IT · ES')}${tabs}${body}</div>`;
}

/* ---- actions ---- */
let WRIMODE=(()=>{try{return localStorage.getItem('lu-wri-mode')||'mix'}catch(e){return 'mix'}})();
let DEBTAB='today',DEBOPEN=null,WRITAB='write',WRIOPEN=null;
let VDIR=(()=>{try{return localStorage.getItem('lu-voc-dir')||'fr'}catch(e){return 'fr'}})();
const wSet=(k,v)=>{const d=wDraft();d[k]=v;pcLS('lu-wri-draft',d)};
Object.assign(A,{
 debtab(el){DEBTAB=el.dataset.k;render()},
 debopen(el){DEBOPEN=DEBOPEN===el.dataset.id?null:el.dataset.id;render()},
 debcopy1(el){pcCopy(debTopicPrompt(),el)},
 debcopy2(el){const d=dDraft();d.mins=PCMIN.deb;pcCopy(debChallengePrompt(d),el)},
 debsave(){const d=dDraft();if(!(d.topic||'').trim()&&!(d.pos||'').trim()){alert('Add a topic or your position first.');return}
  const ef=Math.max(d.eff||0,pcTimed('deb'));effAdd('deb',ef);
  debT().list.push(Object.assign({},d,{id:pcId(),ts:Date.now(),day:today(),mins:PCMIN.deb,eff:Math.round(ef)}));save();pcLS('lu-deb-draft',null);DEBTAB='log';render();window.scrollTo(0,0)},
 debdel(el){if(!confirm('Delete this debate?'))return;const T=debT();T.list=T.list.filter(x=>x.id!==el.dataset.id);save();render()},
 pctoggle(el){const k=el.dataset.k,t=pcLS('lu-pc-timer');if(t&&t.k===k&&t.end>Date.now())pcLS('lu-pc-timer',null);else pcLS('lu-pc-timer',{k,end:Date.now()+PCMIN[k]*60000});render()},
 pcmin(el){PCMIN[el.dataset.k]=+el.dataset.m;pcLS('lu-pc-timer',null);render()},
 writab(el){WRITAB=el.dataset.k;render()},
 wrikind(el){wSet('kind',el.dataset.k);render()},
 wrilang(el){wSet('lang',el.dataset.k);render()},
 wrilvl(el){wSet('lvl',el.dataset.k);render()},
 wricourse(el){wSet('course',el.dataset.id);render()},
 writopic(){const w=wDraft();if(w.kind==='essay'){const t=wriPickTopic(WRIMODE,w.topic);const d=wDraft();d.topic=t.q;d.cat=t.c;d.ctx=t.ctx||'';pcLS('lu-wri-draft',d);render();return}
  const t=wriTopic(w.course);if(!t)return;wSet('topic',t);render()},
 wrimode(el){WRIMODE=el.dataset.k;try{localStorage.setItem('lu-wri-mode',WRIMODE)}catch(e){}render()},
 wricopy0(el){pcCopy(wriPassagePrompt(wDraft()),el)},
 wricopy1(el){const w=wDraft();if(!(w.text||'').trim()){alert('Write something first.');return}pcCopy(wriFeedbackPrompt(w),el)},
 wricopy1x(el){const x=wriT().list.find(y=>y.id===el.dataset.id);if(x)pcCopy(wriFeedbackPrompt(x),el)},
 wtimer(el){PCMIN.wri=+el.dataset.m;render()},
 wstart(){const w=wDraft();if((w.text||'').trim()&&!confirm('Replace the exercise in progress?'))return;
  const d=Object.assign({},w,{text:'',src:'',fb:'',score:'',eff:0,t0:Date.now()});
  if(d.kind==='essay'){const q=wriPickTopic(WRIMODE,'');d.topic=q.q;d.cat=q.c;d.ctx=q.ctx||''}else{d.topic='';d.cat='';d.ctx='';const th=wriTopic(d.course);if(th)d.topic=th}
  pcLS('lu-wri-draft',d);pcLS('lu-pc-timer',PCMIN.wri>0?{k:'wri',end:Date.now()+PCMIN.wri*60000}:null);effLast=0;
  hist.push([view,param]);view='wex';param=null;render();window.scrollTo(0,0)},
 wresume(){hist.push([view,param]);view='wex';param=null;render();window.scrollTo(0,0)},
 wdiscard(){if(!confirm('Discard the exercise in progress?'))return;const d=wDraft();Object.assign(d,{text:'',src:'',fb:'',score:'',eff:0,t0:0});pcLS('lu-wri-draft',d);pcLS('lu-pc-timer',null);render()},
 wfinish(){const w=wDraft();if(!(w.text||'').trim()){alert('Write something first.');return}
  const ef=Math.max(w.eff||0,pcTimed("wri"));effAdd('wri',ef);
  const x={id:pcId(),ts:Date.now(),kind:w.kind,lang:w.lang,lvl:w.lvl,topic:w.topic||'',src:w.src||'',text:w.text,fb:'',score:'',words:pcWords(w.text),eff:Math.round(ef)};
  wriT().list.push(x);save();
  pcLS('lu-wri-draft',Object.assign({},w,{text:'',src:'',fb:'',score:'',topic:'',eff:0,t0:0}));pcLS('lu-pc-timer',null);
  view='wfb';param=x.id;render();window.scrollTo(0,0)},
 wfbopen(el){hist.push([view,param]);view='wfb';param=el.dataset.id;render();window.scrollTo(0,0)},
 wfbsave(){const x=wriT().list.find(y=>y.id===param),ta=document.getElementById('wfbtxt');if(!x||!ta)return;const fb=ta.value.trim();if(!fb){alert("Paste Claude's answer first.");return}
  const sc=document.getElementById('wfbsc'),man=((sc&&sc.value)||'').trim().replace(',','.'),ex=wriExtractScore(fb);
  x.fb=fb;x.score=man&&!isNaN(parseFloat(man))&&parseFloat(man)<=20?man:(ex!=null?String(ex):'');x.mod=Date.now();
  wriAddVocab(x);x.vx=1;save();pcLS('lu-wfb-'+x.id,null);
  if(!x.score)alert('Saved, but no /20 score was found in the answer. You can type it below.');render()},
 wfbvocab(el){const x=wriT().list.find(y=>y.id===el.dataset.id);if(!x)return;const n=wriAddVocab(x);x.vx=1;x.mod=Date.now();save();alert(n?n+' word'+(n===1?'':'s')+' added to your flashcards.':'No new words found (VOCAB: block missing or already saved).');render()},
 wstudyvoc(){startVocStudy()},
 wdone(){A.back();WRITAB='prog';render()},
 wriopen(el){WRIOPEN=WRIOPEN===el.dataset.id?null:el.dataset.id;render()},
 wridel(el){if(!confirm('Delete this exercise?'))return;const T=wriT();T.list=T.list.filter(x=>x.id!==el.dataset.id);save();render()},
 vocdir(el){VDIR=el.dataset.k;try{localStorage.setItem('lu-voc-dir',VDIR)}catch(e){}render()},
 vocstudy(){startVocStudy()},
 vocdel(el){if(!confirm('Delete this word?'))return;const T=wriT();T.vocab=T.vocab.filter(v=>v.id!==el.dataset.id);if(S.vc)delete S.vc['v:'+el.dataset.id];save();render()},
 wriscore(el){const x=wriT().list.find(y=>y.id===el.dataset.id),inp=document.querySelector('.wsedit[data-wsid="'+el.dataset.id+'"]');if(!x||!inp)return;const v=inp.value.trim().replace(',','.');if(v&&(isNaN(parseFloat(v))||parseFloat(v)>20||parseFloat(v)<0)){alert('Enter a number between 0 and 20.');return}x.score=v;x.mod=Date.now();save();render()},
 vocadd(){const el=document.getElementById('vnew'),p=(el&&el.value||'').split('|').map(s=>s.trim());if(p.length<2||!p[0]||!p[1]){alert('Type: term | meaning');return}
  wriT().vocab.push({id:pcId(),lang:wDraft().lang,term:p[0],tr:p[1],note:p[2]||'',box:0,due:today(),ts:Date.now()});save();render()}
});
function vWex(){
 const w=wDraft(),isT=w.kind!=='essay',from=w.kind==='theme'?'French':wLangName(w.lang),to=w.kind==='theme'?wLangName(w.lang):'French';
 const toL=w.kind==='essay'?wLangName(w.lang):(w.kind==='theme'?wLangName(w.lang):'French'),kd=(WRI_KINDS.find(k=>k[0]===w.kind)||WRI_KINDS[0])[1].split(' ')[0];
 const tm=pcLS('lu-pc-timer'),cd=tm&&tm.k==='wri',chip=cd?`<span class="wchip" id="pctimer">${tm.end>Date.now()?fmtMS((tm.end-Date.now())/1000):"Time's up"}</span>`:`<span class="wchip" id="wexel">${fmtMS((Date.now()-(w.t0||Date.now()))/1000)}</span>`;
 const left=isT?`<div class="wpane"><div class="wph"><b>Source · ${from}</b><button class="btn tint sm" data-act="wricopy0">Copy prompt for a text</button></div>
   <div class="wth"><input type="text" data-wf="topic" value="${esc(w.topic||'')}" placeholder="Theme (optional)"><button class="btn gray sm" data-act="writopic">New theme</button></div>
   <textarea class="wta" data-wf="src" placeholder="Paste the ${from} text Claude gave you here">${esc(w.src||'')}</textarea></div>`
  :`<div class="wpane"><div class="wph"><b>Question</b><button class="btn tint sm" data-act="writopic">New question</button></div>
   <textarea class="wta wq" data-wf="topic" rows="5" placeholder="Essay question">${esc(w.topic||'')}</textarea>
   <div class="chips" style="margin-top:8px">${WRICATS.map(([k,l])=>`<button class="chip ${WRIMODE===k?'on':''}" style="--c:var(--accent)" data-act="wrimode" data-k="${k}">${l}</button>`).join('')}</div>${w.cat?`<p class="mute small" style="margin:8px 2px 0">${esc(w.cat)}${w.ctx?' · '+esc(w.ctx):''}</p>`:''}</div>`;
 return `<div class="view wexv">${navbar('Writing')}
 <div class="wexh"><div><b>${kd}</b><span class="mute small"> · ${wLangName(w.lang)} ${w.lvl}</span></div>${chip}<button class="btn sm" data-act="wfinish">Finish</button></div>
 <div class="wsplit ${isT?'':'ess'}">${left}
  <div class="wpane"><div class="wph"><b>${w.kind==='essay'?'Your essay':'Your translation'} · ${toL}</b><span class="mute small" id="wcount">${pcWords(w.text||'')} words</span></div>
   <textarea class="wta" data-wf="text" placeholder="Write here">${esc(w.text||'')}</textarea></div></div></div>`;
}
function vWfb(){
 const x=wriT().list.find(y=>y.id===param);
 if(!x)return `<div class="view">${navbar('Writing')}<div class="empty"><b>Exercise not found</b></div></div>`;
 const kd={essay:'Essay',theme:'Thème',version:'Version'}[x.kind]||'Exercise',sc=wScore(x);
 const head=`<div class="done-card" style="padding:22px 16px"><div class="tick">${ic('check')}</div><h1 class="lt" style="margin:0;font-size:26px">${x.fb?'Exercise corrected':'Exercise saved'}</h1><p class="mute" style="margin:6px 0 0">${kd} · ${wLangName(x.lang)} ${x.lvl} · ${x.words} words${x.eff?' · '+fmt(x.eff/60)+' worked':''}</p></div>`;
 let body;
 if(x.fb){
  const V=wriParseVocab(x.fb,x.lang).length,inV=wriT().vocab.filter(v=>String(v.id).startsWith('x'+x.id+'_')).length;
  body=`<div class="card" style="margin-top:14px;text-align:center"><div class="eyebrow">Your grade</div><div class="wscore">${sc!=null?pgNum(sc)+'<small>/20</small>':'—'}</div>
   ${sc==null?`<div class="sf">No /20 found in the answer. Type it here:</div>`:''}
   <div style="display:flex;gap:8px;justify-content:center;align-items:center;margin-top:8px"><input type="text" inputmode="decimal" class="wsedit" data-wsid="${x.id}" value="${esc(x.score||'')}" placeholder="/20" style="width:70px;text-align:center"><button class="btn tint sm" data-act="wriscore" data-id="${x.id}">${sc==null?'Set score':'Change'}</button></div></div>
   <div class="card" style="margin-top:12px"><div class="card-h"><h3>Vocabulary</h3><span class="mute small">${inV||V} word${(inV||V)===1?'':'s'}</span></div><p class="mute small" style="margin:0 0 10px">${V?`${inV} added to your flashcards${inV<V?' (the rest were already there)':''}.`:'No VOCAB: block in the answer.'}</p>${V&&(!x.vx||inV<V)?`<button class="btn tint" data-act="wfbvocab" data-id="${x.id}">Add the words</button>`:''}${vocDue().length?`<button class="btn" data-act="wstudyvoc" style="margin-top:8px">${ic('play')} Study vocabulary · ${vocDue().length}</button>`:''}</div>
   <details style="margin-top:12px"><summary class="mute small" style="padding:4px">Claude's answer</summary><p class="mute small" style="white-space:pre-line">${esc(x.fb)}</p></details>`;
 }else{
  const dr=pcLS('lu-wfb-'+x.id)||'';
  body=`<div class="card" style="margin-top:14px"><div class="card-h"><h3>1 · Get the correction</h3></div><p class="mute small" style="margin:0 0 10px">Copy the prompt, paste it in a Claude chat, and copy the answer back here.</p><button class="btn" data-act="wricopy1x" data-id="${x.id}">${ic('doc')} Copy the correction prompt</button></div>
   <div class="card" style="margin-top:12px"><div class="card-h"><h3>2 · Paste Claude's answer</h3></div><textarea class="pcta wfbta" id="wfbtxt" data-wfb="${x.id}" rows="14" placeholder="Paste here, including the FINAL SCORE and VOCAB: lines">${esc(dr)}</textarea>
   <div class="sf" id="wfbhint" style="margin-top:6px">${esc(wriHint(dr))}</div>
   <div style="display:flex;gap:8px;align-items:center;margin-top:10px"><input type="text" inputmode="decimal" id="wfbsc" placeholder="/20 (auto)" style="width:96px;text-align:center" class="wsedit"><button class="btn" data-act="wfbsave" style="flex:1">Save correction</button></div></div>
   <p class="mute small" style="margin:12px 4px 0">You can also do this later: the exercise stays in your Progress tab with an "Add correction" button.</p>`;
 }
 return `<div class="view wfbv">${navbar('Writing')}${head}${body}<div style="margin-top:18px"><button class="btn ${x.fb?'':'gray'}" data-act="wdone">${x.fb?'Done':'Later'}</button></div></div>`;
}
document.addEventListener('input',e=>{const el=e.target;if(el&&el.dataset&&el.dataset.wfb){pcLS('lu-wfb-'+el.dataset.wfb,el.value);const h=document.getElementById('wfbhint');if(h)h.textContent=wriHint(el.value)}});
setInterval(()=>{const el=document.getElementById('wexel');if(el&&view==='wex'){const d=wDraft();el.textContent=fmtMS((Date.now()-(d.t0||Date.now()))/1000)}},1000);
/* big writing boxes grow with their text, so the page scrolls instead of the box */
const wGrow=el=>{el.style.height='auto';el.style.height=Math.max(el.scrollHeight+4,0)+'px'};
const wGrowAll=()=>document.querySelectorAll('.wta:not(.wq),.wfbta').forEach(wGrow);
document.addEventListener('input',e=>{const el=e.target;if(el&&el.matches&&el.matches('.wta:not(.wq),.wfbta'))wGrow(el)});
window.addEventListener('resize',wGrowAll);
{const m=document.getElementById('main');if(m)new MutationObserver(wGrowAll).observe(m,{childList:true,subtree:true})}
setTimeout(wGrowAll,300);
VMAP.deb=vDeb;VMAP.wri=vWri;VMAP.wex=vWex;VMAP.wfb=vWfb;
