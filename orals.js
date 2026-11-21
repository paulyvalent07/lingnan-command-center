/* ---------- Orals: texts to learn for each oral presentation / debate ----------
   One entry per oral. Each entry has sections (usually one per slide): text = what Mayeul says, img = screenshot of the slide.
   Slide screenshots go in the orals/ folder (png). A section without a text is shown as "missing" until the text is added.
   Add or edit entries in ORALS. Progress (learned sections, reading mode) is stored on this device only. */
const ORALS=[
 {id:'bus2205',course:'BUS2205',title:'Pop Bakery Paris launch plan',kind:'Group oral',when:'2026-11-24T09:00',
  deposit:'PPT deposit: Sun 15 Nov, 23:59',
  part:'Slides 7 to 9',mine:'Person 3 of 7 · slides 7 to 9 (printed numbers 07 to 09 on the Canva deck: differentiation table, competitive landscape, SWOT) · about 3 minutes',
  note:'Figures come from the live Canva deck (Nov 2026): Hermé Chou Mogador 10 euros, Grolet Fleur Vanille 18 euros, Kitsuné cappuccino 6.50 euros (Uber Eats), Pop Bakery proposed 8 to 12 euros. In the deck the Different table (printed 07) comes before the Competitive Landscape slide (08): ask your group if that order is final. Oral date: 24 Nov.',
  sections:[
   {id:"s7",label:"Slide 7",head:"What Makes Pop Bakery Different?",img:"orals/bus2205-s7.png",
    text:"Now we compare Pop Bakery with three Paris brands. The table shows one selected item per brand. Hermé is at 10 euros, in a boutique, and its appeal is craft. Grolet is at 18 euros, with showpieces, and his appeal is the chef. Kitsuné is at 6 euros 50, a café, and its appeal is lifestyle. Pop Bakery is proposed at 8 to 12 euros, as a themed café, and our appeal is the characters. So we are not the cheapest and not the most expensive. We are the only one built around characters. Be careful: these are selected items, Kitsuné is a delivery price, and our price is a proposal."},
   {id:"s8",label:"Slide 8",head:"Competitive Landscape",img:"orals/bus2205-s8.png",
    text:"Let us look at who we compete with. Two direct competitors sell pastries to the same customers. Pierre Hermé, with the Chou Mogador at 10 euros. Cédric Grolet Opéra, with the Fleur Vanille at 18 euros. One indirect competitor meets a similar need in another way: Café Kitsuné, with a cappuccino at 6 euros 50, delivery price. These are selected items, not full price ranges. Our sources are the official websites and Kitsuné on Uber Eats, in November 2026. Our rivals are strong on craft, so quality is what we must match."},
   {id:"s9",label:"Slide 9",head:"SWOT and Strategic Implications",img:"orals/bus2205-s9.png",
    text:"Now our SWOT. Strengths: recognisable characters and a distinctive visual identity. Weaknesses: limited credibility in Paris food, and complex pastry designs. Opportunities: gift occasions and pop-culture communities. Threats: dependence on a trend, and the risk that our taste disappoints compared with our rivals. So the implication is clear. The characters bring people in, but taste and credibility make them come back. We must prove the quality, and keep the designs simple enough to make well. This is a team analysis for the proposed Paris launch. Next, we move to the market segmentation, to choose who we aim at."}
  ]},
 {id:'bus2202',course:'BUS2202',title:"Back to the Office, Back to Motivation? Amazon's 5-Day Return-to-Office Policy",kind:'Group presentation',when:'2026-11-23T09:00',tentative:true,
  deposit:'PPT deposit: Tue 17 Nov, 23:59 · printed notes-format PPT with AI-use declaration at class 12',
  part:'Four slides (guide slides 7 and 8)',mine:'Equity and organisational justice, then EVLN, commitment and stress. Equity theory, equity at Amazon, organisational justice at Amazon, then EVLN. Four slides in the group deck, which teammates keep editing, so find them by title, not by number. Your part must last 3 minutes: about 320 words at your pace of 100 words per minute (the whole group has 15 min + 5 min Q&A, in English).',
  note:'After your four slides come your teammates\' critical evaluation, recommendations and conclusion. The date is not settled (18 or 23 Nov): confirm with the lecturer. Turnitin limits: 20% AI, 10% similarity. Marking: the analysis is 70% of the grade, and judging whether Amazon\'s actions worked is one of 8 criteria. Do not just tell the story.',
  sections:[
    {id:'s11',label:"Slide 1 of 4 \u00b7 guide slide 7",head:"Equity theory",img:'orals/bus2202-s11.png',
     text:"Those employees who stop caring are also asking a simple question: is this fair? Equity theory says they compare what they put in with what they get out, and that is their ratio. Then they compare it with colleagues, with other companies, or with their own past. So when the ratio looks worse, they feel inequity, and they restore the balance themselves: they do less, or they leave."},
    {id:'s12',label:"Slide 2 of 4 \u00b7 guide slide 7",head:"Equity at Amazon: theory vs what Amazon did",img:'orals/bus2202-s12.png',
     text:"Let us now compare the theory with Amazon. First, inputs went up: five days a week, full car parks, some people working in hallways, and the commute on top. But outcomes stayed flat, because there was no extra reward, and the flexibility people valued most was removed. As a result, the ratio got worse, and the rules did not help, since exceptions needed an executive's approval. So, as the theory predicts, employees restore equity: less effort, or an exit."},
    {id:'s14',label:"Slide 3 of 4 \u00b7 guide slide 7",head:"Organisational justice at Amazon: theory vs what Amazon did",img:'orals/bus2202-s14.png',
     text:"Equity is really about distributive justice, what people receive. Yet organisational justice asks more: was the process fair, and were people treated well? On procedure, the rule came top-down, by memo, with no real appeal. On respect, the AWS CEO, Matt Garman, said that people who dislike it can go to other companies. And on honest reasons, staff doubted the Jassy memo, and the rule was final. In short, the rule may be allowed, but the process and the tone make it feel unfair, and therefore trust falls."},
    {id:'s15',label:"Slide 4 of 4 \u00b7 guide slide 8",head:"Reactions: EVLN",img:'orals/bus2202-s15.png',
     text:"So how do people react to this unfairness? The EVLN model gives four answers. Exit comes first: in a Blind survey of 2,585 employees, 73% were thinking of leaving. Voice is weak, because there is no real appeal. Loyalty then becomes the loyalty of need, as people stay for the job market, not out of attachment. And finally neglect: one employee wrote that they would check out until a performance plan. In the end, the rule pushes people to leave, to stay silent, or to disengage."},
   {id:'g0',label:'Guide',head:'Main question and 5 key dates',text:'',outline:["Main question: did the 5-day rule really improve culture and collaboration, or did it mainly damage motivation, trust and commitment?","Feb/May 2023: Amazon asks office staff to come in 3 days a week; a few protests and a walkout.","16 Sept 2024: CEO Andy Jassy memo: 5 days a week from 2 Jan 2025, to strengthen culture and run like the world's biggest start-up. Exceptions only with an executive's approval.","17-19 Sept 2024: Blind survey of 2,585 employees: 91% dissatisfied, 73% considering leaving, 32% know someone who already quit. AWS CEO Matt Garman: those who don't like it can go to other companies.","Jan-May 2025: the rule starts but offices are short of space: return delayed in New York, Atlanta, Houston, Nashville and elsewhere; complaints about parking, meeting rooms, people still on video calls at the office.","Oct 2025: Amazon cuts 14,000 office jobs. Per Reuters sources, RTO did not make enough people leave; some employees who didn't badge in were treated as resignations, without severance."]},
   {id:'g1',label:'Guide · slide 1',head:'Cover',text:'',outline:["Module code and title: BUS2202 Organisational Behaviour","Title: Back to the Office, Back to Motivation? Amazon's 5-Day Return-to-Office Policy","FULL names and student numbers of ALL members"]},
   {id:'g2',label:'Slides 2-3 (guide)',head:'Introduction and context',text:'',outline:["On the slides: Amazon in numbers (about 350,000 office employees); timeline 2023 (3 days) → Sept 2024 memo → Jan 2025 start → delays for lack of desks → Oct 2025 layoffs; Amazon's official reasons: culture, collaboration, learning, speed.","To say: open with a strong number (91% dissatisfied) or a question to the class (“Would you accept going to the office 5 days out of 5?”).","Explain what RTO (return to office) is, and that hybrid work had become normal since Covid.","Present Amazon's view fairly first: Jassy thinks being together is better for culture and innovation.","Course link: remote and hybrid work trend (Ch.1)."]},
   {id:'g3',label:'Guide · slide 4',head:'The OB problem',text:'',outline:["On the slide: Amazon's goals; employee reaction (91% dissatisfied, 73% considering leaving); one sentence: a decision imposed from the top that risks lowering motivation, engagement and retention.","To say: announce that we use course theories to explain WHY employees reacted so strongly.","Course link: definitions of motivation and commitment (Ch.5)."]},
   {id:'tips',label:'Tips',head:'How to deliver your analysis',text:'',mine:true,outline:["For each theory: 1) explain it in one sentence, 2) link it to a fact about Amazon, 3) say the “so what” for Amazon.","Do not just tell the story: the marking also asks whether Amazon's actions worked.","Course links: Ch.5 (expectancy, intrinsic/extrinsic, four drives), Ch.1 (MARS).","Herzberg and Self-Determination Theory are not in the course slides: mention them only briefly as “beyond the course”."]},
   {id:'g8',label:'Guide · slide 9',head:'Critical evaluation',text:'',outline:["Did it reach its goals? Culture and collaboration vs lack of desks and people still on video calls.","Hidden goal? Reuters: RTO did not create enough voluntary exits, then 14,000 layoffs.","Research: S&P 500 firms that imposed RTO had 14% more departures, especially among women, managers and skilled staff (Pittsburgh study).","In Amazon's favour: Ch.1 says remote work can bring isolation, less informal communication and a weaker culture.","Give a clear opinion: the goal (culture) is legitimate, but the method (one 5-day rule, no consultation) damaged motivation and trust.","Course links: benefits and risks of remote work (Ch.1); building affective commitment through justice and trust (Ch.4)."]},
   {id:'g9',label:'Guide · slides 10-11',head:'Recommendations',text:'',outline:["1. Team-level hybrid: each team picks 3 shared “anchor days” to collaborate (gives back autonomy, keeps culture; team cohesion and norms, Ch.8).","2. Judge results, not badges: SMART goals and regular, specific feedback (fixes the performance → reward link; Ch.5).","3. Restore fairness: surveys and consultation before decisions, a real exceptions and appeals system run locally, honest communication (procedural and interactional justice; Ch.5).","4. Transformational leadership: leaders explain the vision, lead by example and build buy-in instead of threatening (Ch.12).","For each: what to do, which problem it fixes, why it is feasible for Amazon. Mention that other companies use organised hybrid successfully."]},
   {id:'g10',label:'Slides 12-14',head:'Conclusion, references, AI declaration',text:'',outline:["3 key messages + the answer to our main question.","References in APA format.","AI declaration: which tools, for what, and how we changed the output."]}
  ]},
 {id:'bus2108',course:'BUS2108',title:'GP Batteries: where to build the new factory (Germany or Vietnam)',kind:'Group presentation',when:'2026-11-18T08:00',
  deposit:'PPT on Turnitin before 11:00 on the day · written report due Sun 22 Nov, 17:00',
  part:'Slides 13 to 15',mine:'Person 5 of 6 · slides 13 to 15 (culture, management, ethics) · about 303 words, around 2 min at a calm pace, 2 min 30 at your own pace (cut from 554 on 18 Nov). Rewritten 18 Nov in a spoken style: the slides are the support and are not read aloud, few figures and each with its meaning, creative transitions. Person 6 (slides 16 to 18) gives the final recommendation.',
  note:'Slide numbers checked against the live deck: Hofstede values on slide 13 are HK 68/25/29/61, Germany 35/67/65/83, Vietnam 70/20/30/57. English scores: EF English Proficiency Index 2025, Germany 615 (4th), Vietnam 500 (64th of 123).',
  sections:[
   {id:'s13',label:'Slide 13',head:'Cultural Distance from Hong Kong',img:'orals/bus2108-s13.png',
    text:"Costs and regulations tell us where a factory can run, but people are the ones who run it. So how close are Vietnam and Germany to our Hong Kong headquarters? Hofstede gives us four dimensions: power distance, individualism, uncertainty avoidance and long-term orientation. And the gap is striking. On power distance, Hong Kong and Vietnam both sit around 70. Germany? Half of that. On individualism, Germany scores 67, while Hong Kong and Vietnam stay around 20 to 25. The same pattern repeats on all four. So Vietnam is the culturally closest option, and Germany is the one that will ask us to adapt."},
   {id:'s14',label:'Slide 14',head:'Managing Local Teams',img:'orals/bus2108-s14.png',
    text:"But a score only matters if it changes how we manage. And since everything starts with communication, let us begin with language. Germany ranks fourth in the world on the EF English index, and with a low power distance, employees expect to be consulted, through works councils. So our Hong Kong managers would have to share decisions. Vietnam flips the picture: English ranks 64th out of 123, so we would invest in training and in visual safety instructions. But hierarchy feels familiar there. In short, Germany asks for a change of management style, Vietnam for a change of communication method."},
   {id:'s15',label:'Slide 15',head:'Ethics and CSR in the Supply Chain',img:'orals/bus2108-s15.png',
    text:"Managing people well also means treating them fairly, and not only our own staff. In a battery factory, ethics is not a bonus, it is a risk. Three places: working conditions at our suppliers, pollution, and responsible sourcing of nickel, now regulated by the EU Batteries Regulation. So we recommend one global standard, never the weakest local one. Why? Because 30% of GP's sales are in Europe, and one scandal would hit a brand built on trust. We now have the costs, the rules, the people and the ethics. Turning them into one decision is the job of my colleague."}
  ]},
 {id:'bus2105',course:'BUS2105',title:'Group debate',kind:'Debate (15%)',when:'2026-11-30T09:30',
  deposit:'Topics A to H on Moodle',
  part:'To be defined',mine:'Topic, side and arguments: not added yet.',note:'',
  sections:[{id:'todo',label:'Text',head:'Not added yet',text:''}]}
];

/* ---- state (this device only) ---- */
const orLS=()=>{try{return JSON.parse(localStorage.getItem('lu-orals')||'null')||{mode:'read',done:{}}}catch(e){return {mode:'read',done:{}}}};
const orSet=o=>{try{localStorage.setItem('lu-orals',JSON.stringify(o))}catch(e){}};
let ORREV={};
const orWords=t=>(String(t).trim().match(/\S+/g)||[]).length;
const orHas=s=>!!(s.text&&s.text.trim());
const orOf=id=>ORALS.find(o=>o.id===id);
const orCol=c=>(typeof C==='function'?C(c).color:'var(--accent)');
function orStats(o){const st=orLS(),t=o.sections.filter(x=>orHas(x)&&!x.rest);return {total:t.length,done:t.filter(s=>st.done[o.id+':'+s.id]).length,words:t.reduce((a,s)=>a+orWords(s.text),0)}}
function orCue(text){return text.split(/(?<=[.!?])\s+/).map(s=>{const w=s.split(/\s+/);return w.length<=3?s:w.slice(0,3).join(' ')+' …'}).join(' ')}
function orTileSub(){const all=ORALS.map(orStats);const t=all.reduce((a,x)=>a+x.total,0),d=all.reduce((a,x)=>a+x.done,0);return t?d+' of '+t+' texts learned':'Texts to learn'}

function vOrals(){
 const rows=ORALS.map(o=>{const s=orStats(o),col=orCol(o.course),ready=s.total>0;
  const sub=ready?`${s.done}/${s.total} learned · ${s.words} words · about ${Math.max(1,Math.round(s.words/130))} min`:(o.sections.some(x=>x.outline)?'Outline only, no spoken text yet':'Text missing');
  return `<button class="cell has-ico" data-act="open" data-v="oral" data-p="${o.id}"><span class="sq" style="--c:${col}">${ic('people')}</span><span class="t"><b>${esc(o.course)} · ${esc(o.kind)}</b><span style="white-space:normal">${esc(o.title)}</span><span style="color:${col};font-weight:600">Your part: ${esc(o.part||'')}</span><span>${esc(sub)}</span></span>${ready?'':'<span class="badge red">to add</span>'}${typeof countdown==='function'?`<span class="badge ${typeof urgent==='function'&&urgent(o.when)?'red':''}">${countdown(o.when)}</span>`:''}${ic('chev','chev')}</button>`}).join('');
 return `<div class="view">${navbar('Hub')}${title('Orals','Texts to learn')}<div class="grp" style="margin-top:12px">${rows}</div>
 <div class="sf">Open an oral to learn your part (not the whole oral). Slide screenshots appear above each part once the images are added to the orals folder.</div></div>`;
}

function vOral(){
 const o=orOf(param);if(!o)return vOrals();
 const st=orLS(),mode=st.mode||'read',s=orStats(o),col=orCol(o.course);
 const modes=`<div class="segc" style="margin:14px 0">${[['read','Read'],['cue','Cue words'],['hide','Recite']].map(([k,l])=>`<button class="${mode===k?'on':''}" data-act="ormode" data-k="${k}">${l}</button>`).join('')}</div>`;
 const isMine=x=>!x.rest&&(!x.outline||x.mine);
 const card=(x,rest)=>{
  const key=o.id+':'+x.id,done=!!st.done[key];
  const img=x.img?`<img class="orimg" src="${x.img}" alt="${esc(x.label+' '+x.head)}" loading="lazy" onerror="this.outerHTML='<div class=&quot;orph&quot;>Slide screenshot not added yet</div>'">`:'';
  if(x.outline)return `<div class="card ${rest?'':'ormine'}" style="margin-top:14px;${rest?'':'--mc:'+col}"><div class="card-h"><h3>${esc(x.label)} · ${esc(x.head)}</h3></div><ul class="orol">${x.outline.map(l=>`<li>${esc(l)}</li>`).join('')}</ul></div>`;
  if(!orHas(x))return `<div class="card" style="margin-top:14px"><div class="card-h"><h3>${esc(x.head)}</h3><span class="badge red">to add</span></div><p class="mute small">The spoken text is not here yet. Send it to Claude to add it.</p></div>`;
  const shown=mode==='read'?x.text:mode==='cue'?orCue(x.text):x.text;
  const hidden=mode==='hide'&&!ORREV[key];
  return `<div class="card ${rest?'':'ormine'}" style="margin-top:14px;--mc:${col}"><div class="card-h"><h3>${esc(x.label)} · ${esc(x.head)}</h3><span class="badge">${orWords(x.text)} words</span></div>${img}
  <p class="ortx ${hidden?'blur':''}" ${mode==='hide'?`data-act="orreveal" data-k="${key}"`:''}>${esc(shown)}</p>
  ${mode==='hide'?`<div class="sf" style="margin:4px 0 8px">${hidden?'Say it out loud, then tap the text to check.':'Tap the text to hide it again.'}</div>`:''}
  ${rest?'':`<button class="btn ${done?'gray':'tint'}" data-act="ordone" data-k="${key}">${ic('check')} ${done?'Learned (tap to undo)':'Mark as learned'}</button>`}</div>`};
 const mineSecs=o.sections.filter(isMine).map(x=>card(x,false)).join('');
 const restList=o.sections.filter(x=>!isMine(x));
 const restSecs=restList.length?`<details class="orrest"><summary>Rest of the oral · for context, not your part</summary>${restList.map(x=>card(x,true)).join('')}</details>`:'';
 const secs=mineSecs+restSecs;
 return `<div class="view">${navbar('Orals')}${title(esc(o.title),esc(o.course)+' · '+esc(o.kind))}
 <div class="grp" style="margin-top:12px"><div class="cell"><span class="t"><b>${typeof fmtD==='function'?fmtD({when:o.when}):esc(o.when)}${o.tentative?' (tentative)':''}</b><span style="white-space:normal">${esc(o.deposit)}</span></span>${typeof countdown==='function'?`<span class="badge ${typeof urgent==='function'&&urgent(o.when)?'red':''}">${countdown(o.when)}</span>`:''}</div>
 </div>
 <div class="card ormine" style="margin-top:12px;--mc:${col}"><div class="card-h"><h3>YOUR PART · ${esc(o.part||'')}</h3>${s.total?`<span class="badge">${s.done}/${s.total} learned</span>`:''}</div><p class="small" style="margin:4px 0 2px;white-space:normal">${esc(o.mine)}</p></div>
 ${o.note?`<div class="sf" style="white-space:normal">${esc(o.note)}</div>`:''}
 ${s.total?modes:''}${secs}</div>`;
}

Object.assign(A,{
 ormode(el){const st=orLS();st.mode=el.dataset.k;orSet(st);ORREV={};render()},
 orreveal(el){ORREV[el.dataset.k]=!ORREV[el.dataset.k];render()},
 ordone(el){const st=orLS();st.done[el.dataset.k]=!st.done[el.dataset.k];if(!st.done[el.dataset.k])delete st.done[el.dataset.k];orSet(st);render()}
});
VMAP.orals=vOrals;VMAP.oral=vOral;

(function(){const css=document.createElement('style');css.textContent=`
.orimg{display:block;width:100%;height:auto;border-radius:12px;margin:10px 0;border:1px solid var(--sep);background:var(--fill)}
.orph{display:grid;place-items:center;aspect-ratio:16/9;margin:10px 0;border-radius:12px;background:var(--fill);color:var(--l2);font-size:13px}
.ortx{font-size:17px;line-height:1.6;margin:8px 0 12px;white-space:pre-line}
.ormine{border-left:4px solid var(--mc,#c2410c)}
.orrest{margin-top:22px}.orrest>summary{cursor:pointer;font-size:14px;color:var(--l2);padding:10px 4px}
.ortx.blur{filter:blur(7px);user-select:none}
.orol{margin:8px 0 4px;padding-left:20px;font-size:15px;line-height:1.5}.orol li{margin:4px 0}`;document.head.appendChild(css)})();
