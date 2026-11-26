/* ---------- Hub v2: grouped layouts (Tiles / List / Focus), calm colours, calendar folded away ---------- */
const HUB_G=[
 {id:'study',t:'Study',c:'#6366f1'},
 {id:'tests',t:'Tests and languages',c:'#e0457b'},
 {id:'career',t:'Career',c:'#0e9488'},
 {id:'more',t:'Read and train',c:'#d98a1c'}];
let HUBMODE=(()=>{try{return localStorage.getItem('lu-hub-mode')||'tiles'}catch(e){return 'tiles'}})();
let HUBCAL=(()=>{try{return localStorage.getItem('lu-hub-cal')==='1'}catch(e){return false}})();
function hubItems(){
 const q=cardQueue(),n=q.all.length,days=weekDays(S.tw||0),all=days.flatMap(itemsOn),dn=all.filter(p=>S.planDone[p.id]).length;
 const fn=(x)=>typeof x==='function';
 const o=(g,v,i,t,sub,badge)=>({g,v,i,t,sub,badge:badge||0});
 const ext=(g,i,t,txt,web,sc,img)=>({g,i,t,img,ext:1,sub:IOS?'Opens the app':web?'Opens '+txt:'iPhone app only',href:IOS?'shortcuts://run-shortcut?name='+sc:web,off:!IOS&&!web});
 return [
  o('study','cards','cards','Cards',n?q.due.length+' due · '+q.fresh.length+' new':'Nothing due',q.due.length),
  o('study','timetable','cal','Week',dn+' of '+all.length+' blocks done'),
  {g:'study',i:'grid',t:'Anki',ext:1,sub:'AnkiWeb decks',href:'https://ankiweb.net/decks/'},
  o('tests','tage','target','Tage Mage',fn(tmNextSub)?tmNextSub():'Test prep'),
  o('tests','ielts','book','IELTS',fn(ieTileSub)?ieTileSub():'Target band 8',fn(ieDue)?ieDue():0),
  o('tests','wri','pen','Writing',fn(vocDue)?vocDue().length+' words due':'EN · IT · ES'),
  o('tests','orals','people','Orals',fn(orTileSub)?orTileSub():'Texts to learn'),
  o('career','stage','cap','Stage',fn(stTileSub)?stTileSub():'Interview prep',(fn(stDue)?stDue():0)+(fn(stFu)?stFu():0)),
  o('career','hk','trend','Hong Kong',fn(hkTileSub)?hkTileSub():'Fiches and jury questions'),
  o('more','news','globe','News',fn(nwTile)?nwTile():'Newsletter',fn(nwUnread)?nwUnread():0),
  ext('more','doc','El País','elpais.com','https://elpais.com/','ElPais','elpais'),
  ext('more','play','LinkedIn Learning','linkedin.com/learning','https://www.linkedin.com/learning/','Learning','learning'),
  ext('more','pawn','Chess','chess.com','https://www.chess.com/home','Chess','chess'),
  ext('more','calc','Mental Arithmetic','','','Mentalarithmetic','mental'),
  ext('more','globe','Guess The Country','','','GuessTheCountry','guess')];
}
const hubIcon=(x,c)=>x.img?`<img src="icons/${x.img}.png" alt="" style="width:100%;height:100%;border-radius:inherit;display:block">`:ic(x.i);
function hubOpen(x,cls,inner,style){
 if(x.ext){return x.off?`<div class="${cls} off" style="${style}">${inner}</div>`:`<a class="${cls}" href="${x.href}" ${IOS?'':'target="_blank" rel="noopener"'} style="${style}">${inner}</a>`}
 return `<button class="${cls}" data-act="open" data-v="${x.v}" style="${style}">${inner}</button>`;
}
function hubTile(x,c){
 const inner=`<span class="hq ${x.img?'im':''}">${hubIcon(x,c)}</span><span class="ht"><b>${esc(x.t)}</b><span>${esc(x.sub)}</span></span>${x.badge?`<span class="badge red hb">${x.badge}</span>`:''}`;
 return hubOpen(x,'hc',inner,'--c:'+c);
}
function hubRow(x,c){
 const inner=`<span class="sq ${x.img?'im':''}" style="--c:${c}">${hubIcon(x,c)}</span><span class="t"><b>${esc(x.t)}</b><span>${esc(x.sub)}</span></span>${x.badge?`<span class="badge red">${x.badge}</span>`:''}${x.ext?ic('chev','chev'):ic('chev','chev')}`;
 return hubOpen(x,'cell has-ico',inner,'');
}
function hubNext(){
 const now=new Date(),up=S.deadlines.filter(d=>new Date(d.when)>now).sort((a,b)=>new Date(a.when)-new Date(b.when)).slice(0,2);
 const rows=up.map(d=>{const x=C(d.course);return `<div class="hn"><i style="background:${x.color}"></i><span class="t"><b>${esc(d.title)}</b><span>${x.id==='ALL'?'All courses':x.short}</span></span><span class="badge ${urgent(d.when)?'red':''}">${countdown(d.when)}</span></div>`}).join('');
 return `<div class="card hnext"><div class="hnh"><span class="eyebrow">Next up</span><button class="btn sm gray" data-act="hubcal">${HUBCAL?'Hide calendar':'Calendar'}</button></div>${rows||'<p class="mute small" style="margin:6px 0 0">No deadline ahead.</p>'}</div>${HUBCAL?`<div style="margin-top:12px">${calendarCard()}</div>`:''}`;
}
function vHub2(){
 const items=hubItems(),mode=HUBMODE;
 const seg=`<div class="segc" style="margin:4px 0 14px">${[['tiles','Tiles'],['list','List'],['focus','Focus']].map(([k,l])=>`<button class="${mode===k?'on':''}" data-act="hubmode" data-k="${k}">${l}</button>`).join('')}</div>`;
 let body='';
 const groups=HUB_G.map(g=>({g,l:items.filter(x=>x.g===g.id)}));
 const head=g=>`<div class="hgh"><i style="background:${g.c}"></i>${g.t}</div>`;
 if(mode==='tiles')body=groups.map(({g,l})=>`${head(g)}<div class="hubg">${l.map(x=>hubTile(x,g.c)).join('')}</div>`).join('');
 else if(mode==='list')body=groups.map(({g,l})=>`${head(g)}<div class="grp">${l.map(x=>hubRow(x,g.c)).join('')}</div>`).join('');
 else{
  const need=items.filter(x=>x.badge>0&&!x.ext);
  const col=x=>HUB_G.find(g=>g.id===x.g).c;
  body=`<div class="card hneed"><div class="eyebrow" style="margin-bottom:6px">Needs you now</div>${need.length?`<div class="grp" style="background:none">${need.map(x=>hubRow(x,col(x))).join('')}</div>`:`<p style="margin:6px 0 2px"><b>All clear.</b> <span class="mute">Nothing is due today. Pick what you feel like below.</span></p>`}</div>`+groups.map(({g,l})=>`${head(g)}<div class="grp">${l.map(x=>hubRow(x,g.c)).join('')}</div>`).join('');
 }
 return `<div class="view">${title('Hub')}${seg}${hubNext()}<div style="height:6px"></div>${body}<div class="sf">On iPhone the app tiles run a Shortcut with the app's name without spaces (Shortcuts > New shortcut > Open App). On a computer they open the website.</div></div>`;
}
Object.assign(A,{
 hubmode(el){HUBMODE=el.dataset.k;try{localStorage.setItem('lu-hub-mode',HUBMODE)}catch(e){}render()},
 hubcal(){HUBCAL=!HUBCAL;try{localStorage.setItem('lu-hub-cal',HUBCAL?'1':'0')}catch(e){}render()}
});
VMAP.hub=vHub2;
