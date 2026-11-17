/* ---------- News (Hub): weekly newsletter of fiches. Data in news.js (NEWS) and briefs.js (BRIEFS, shown as an older edition). ---------- */
const NW={ed:0,tag:'all'};
function nwS(){S.news=S.news||{read:{},saved:{}};S.news.read=S.news.read||{};S.news.saved=S.news.saved||{};return S.news}
function nwMerge(a,b){a=a||{};b=b||{};const o={read:Object.assign({},a.read,b.read),saved:Object.assign({},a.saved)};
 Object.entries(b.saved||{}).forEach(([k,v])=>{const y=o.saved[k];if(!y||(v.ts||0)>=(y.ts||0))o.saved[k]=v});return o}
function nwNorm(s){
 if(s.args)return s;
 const q=s.qs||[],o=Object.assign({},s);
 o.dek=s.dek||(q[0]&&q[0].q)||'';
 o.parties=s.parties||(s.view?[['The overall picture',s.view]]:[]);
 o.args=q.length?{t:q[0].q,pl:'For',cl:'Against',pro:q.map(x=>x.pro),con:q.map(x=>x.con)}:null;
 o.ask=s.ask||q.map(x=>x.q);
 o.causes=s.causes||[];o.conseq=s.conseq||null;o.watch=s.watch||(s.deeper||[]);
 return o}
function nwEds(){const e=(typeof NEWS!=='undefined'?NEWS:[]).slice();
 (typeof BRIEFS!=='undefined'?BRIEFS:[]).forEach(b=>{if(!e.some(x=>x.date===b.date))e.push(Object.assign({},b,{stories:(b.stories||[]).map(nwNorm)}))});
 return e.sort((a,b)=>a.date<b.date?1:-1)}
const nwKey=(ed,s)=>ed.date+'/'+s.id;
function nwFind(k){const [d,id]=String(k).split('/');const ed=nwEds().find(x=>x.date===d);const s=ed&&ed.stories.find(x=>x.id===id);return s?{ed,s}:null}
function nwWords(s){const t=[s.head,s.dek,s.why,(s.facts||[]).join(' '),(s.causes||[]).join(' '),(s.parties||[]).map(p=>p.join(' ')).join(' '),s.args?[s.args.t].concat(s.args.pro,s.args.con).join(' '):'',s.conseq?[].concat(s.conseq.short,s.conseq.long).join(' '):'',(s.ask||[]).join(' ')].join(' ');return t.split(/\s+/).length}
const nwMin=s=>Math.max(2,Math.round(nwWords(s)/190));
function nwUnread(){const e=nwEds()[0];if(!e)return 0;const r=nwS().read;return e.stories.filter(s=>!r[nwKey(e,s)]).length}
function nwTile(){const n=nwUnread(),e=nwEds()[0];return n?n+' new stor'+(n>1?'ies':'y'):(e?'Edition of '+nwDate(e.date):'Newsletter')}
function nwDate(d){try{return new Date(d+'T12:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'})}catch(e){return d}}
function nwDateL(d){try{return new Date(d+'T12:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}catch(e){return d}}
const nwUl=a=>a&&a.length?`<ul class="nwl">${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'';
const nwH=(t,c)=>`<div class="nwh"${c?` style="--c:${c}"`:''}>${esc(t)}</div>`;

function vNews(){
 const eds=nwEds(),R=nwS();
 if(!eds.length)return `<div class="view">${navbar('Hub')}${title('News','Weekly newsletter')}<div class="empty"><b>No edition yet</b>The first one arrives with the next weekly update.</div></div>`;
 const ed=eds[Math.min(NW.ed,eds.length-1)],st=ed.stories;
 const tags=[...new Set(st.map(s=>s.tag))];
 const savedN=Object.values(R.saved).filter(x=>x.on).length;
 const f=NW.tag==='saved'?eds.flatMap(e=>e.stories.map(s=>({e,s}))).filter(x=>(R.saved[nwKey(x.e,x.s)]||{}).on):st.filter(s=>NW.tag==='all'||s.tag===NW.tag).map(s=>({e:ed,s}));
 const chips=`<div class="chips"><button class="chip ${NW.tag==='all'?'on':''}" style="--c:var(--accent)" data-act="nwtag" data-k="all">All</button>${tags.map(t=>{const c=(st.find(s=>s.tag===t)||{}).c||'#888';return `<button class="chip ${NW.tag===t?'on':''}" style="--c:${c}" data-act="nwtag" data-k="${esc(t)}"><i></i>${esc(t)}</button>`}).join('')}<button class="chip ${NW.tag==='saved'?'on':''}" style="--c:#f59e0b" data-act="nwtag" data-k="saved"><i></i>Saved${savedN?` · ${savedN}`:''}</button></div>`;
 const row=x=>{const k=nwKey(x.e,x.s),rd=R.read[k];return `<button class="cell nwrow" data-act="nwopen" data-v="nstory" data-p="${esc(k)}"><span class="nwdot" style="background:${x.s.c||'#888'}"></span><span class="t"><b>${esc(x.s.head)}</b><span>${esc(x.s.dek||'')}</span><span class="nwmeta">${esc(x.s.tag)} · ${nwMin(x.s)} min${rd?'':' · <em class="nwnew">New</em>'}${(R.saved[k]||{}).on?' · ★':''}</span></span><span class="chev">${ic('chev')}</span></button>`};
 const eds2=eds.length>1?`<div class="eyebrow" style="margin:22px 0 6px">Editions</div><div class="grp">${eds.map((e,i)=>`<button class="cell" data-act="nwed" data-k="${i}"><span class="t"><b>${esc(e.title||'Edition')}</b><span>${nwDateL(e.date)} · ${e.stories.length} stories</span></span>${i===NW.ed?`<span class="badge blue">Open</span>`:''}</button>`).join('')}</div>`:'';
 return `<div class="view">${navbar('Hub')}${title('News','Weekly newsletter')}
 <div class="card nwhero"><div class="eyebrow">${nwDateL(ed.date)}</div><h3 style="margin:4px 0 8px">${esc(ed.title||'')}</h3><p style="margin:0;line-height:1.45">${esc(ed.intro||'')}</p></div>
 <div style="height:12px"></div>${chips}
 ${f.length?`<div class="grp">${f.map(row).join('')}</div>`:`<div class="empty"><b>Nothing here</b>${NW.tag==='saved'?'Open a story and tap Save to keep it.':'No stories in this filter.'}</div>`}
 <p class="mute small" style="margin:14px 4px 0">Each fiche gives the facts, the context, the causes, what each side says, the arguments for and against, and what could follow. A new edition is added every week.</p>
 ${eds2}</div>`}

function vNStory(){
 const h=nwFind(param);
 if(!h)return `<div class="view">${navbar('News')}<div class="empty"><b>Story not found</b></div></div>`;
 const {ed,s0}= {ed:h.ed,s0:h.s},s=nwNorm(s0),k=nwKey(ed,s),R=nwS(),sv=(R.saved[k]||{}).on;
 const c=s.c||'#0a84ff',idx=ed.stories.findIndex(x=>x.id===s.id),nx=ed.stories[idx+1];
 const sec=(t,body)=>body?`<div class="card nwsec">${nwH(t,c)}${body}</div>`:'';
 const A_=s.args;
 const sides=A_?`<div class="card nwsec">${nwH('The question',c)}<p class="nwq">${esc(A_.t)}</p>
  <div class="nwpc"><div class="nwpro"><b>${esc(A_.pl||'For')}</b>${nwUl(A_.pro)}</div><div class="nwcon"><b>${esc(A_.cl||'Against')}</b>${nwUl(A_.con)}</div></div></div>`:'';
 const parties=s.parties&&s.parties.length?`<div class="card nwsec">${nwH('Who says what',c)}${s.parties.map(p=>`<div class="nwpt"><b>${esc(p[0])}</b><span>${esc(p[1])}</span></div>`).join('')}</div>`:'';
 const cq=s.conseq?`<div class="card nwsec">${nwH('What could follow',c)}${s.conseq.short&&s.conseq.short.length?`<div class="nwsub">Short term</div>${nwUl(s.conseq.short)}`:''}${s.conseq.long&&s.conseq.long.length?`<div class="nwsub">Longer term</div>${nwUl(s.conseq.long)}`:''}</div>`:'';
 const links=(s.links||[]).length?`<div class="card nwsec">${nwH('In your courses',c)}${s.links.map(l=>`<div class="nwpt"><b>${esc(l[0])}</b><span>${esc(l[1])}</span></div>`).join('')}</div>`:'';
 const src=(s.src||[]).length?`<div class="card nwsec">${nwH('Sources',c)}${s.src.map(x=>`<a class="nwsrc" href="${esc(x[1])}" target="_blank" rel="noopener">${esc(x[0])}</a>`).join('')}${s.conf?`<p class="mute small" style="margin:8px 0 0"><b>How solid is this?</b> ${esc(s.conf)}</p>`:''}</div>`:'';
 return `<div class="view nwstory">${navbar('News')}
 <div class="eyebrow" style="margin-top:10px;color:${c}">${esc(s.tag)} · ${nwMin(s)} min read · ${nwDate(ed.date)}</div>
 <h1 class="lt" style="margin-top:4px">${esc(s.head)}</h1>
 ${s.dek?`<p class="nwdek">${esc(s.dek)}</p>`:''}
 ${sec('The facts',nwUl(s.facts))}
 ${sec('Why it matters',`<p class="nwp">${esc(s.why||'')}</p>`)}
 ${sec('Why this is happening',nwUl(s.causes))}
 ${parties}${sides}${cq}
 ${sec('Ask yourself',s.ask&&s.ask.length?`<ol class="nwl nwol">${s.ask.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`:'')}
 ${sec('Keep an eye on',nwUl(s.watch))}
 ${links}${src}
 <div class="nwbar"><button class="btn tint" data-act="nwsave" data-k="${esc(k)}">${sv?'★ Saved':'☆ Save'}</button>${nx?`<button class="btn" data-act="nwopen" data-v="nstory" data-p="${esc(nwKey(ed,nx))}" data-rep="1">Next story</button>`:`<button class="btn gray" data-act="back">Back to edition</button>`}</div></div>`}

VMAP.news=vNews;VMAP.nstory=vNStory;
Object.assign(A,{
 nwtag(el){NW.tag=el.dataset.k;render()},
 nwed(el){NW.ed=+el.dataset.k;NW.tag='all';render();window.scrollTo(0,0)},
 nwopen(el){const k=el.dataset.p;if(el.dataset.rep){flushRead();view='nstory';param=k;render();window.scrollTo(0,0)}else A.open(el);nwS().read[k]=Date.now();save()},
 nwsave(el){const R=nwS(),k=el.dataset.k,on=!(R.saved[k]||{}).on;R.saved[k]={on,ts:Date.now()};save();render()}
});
/* time spent reading counts as effective time (only while the page is visible and the person is active) */
let nwAct=0,nwPend=0;['touchstart','scroll','click','keydown'].forEach(ev=>document.addEventListener(ev,()=>{nwAct=Date.now()},{passive:true}));
setInterval(()=>{if((view==='news'||view==='nstory')&&!document.hidden&&Date.now()-nwAct<60000){nwPend+=5;if(nwPend>=60){effAdd('news',nwPend);nwPend=0;save()}}},5000);
