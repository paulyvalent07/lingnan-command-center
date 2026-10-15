const V='lu-cc-v49';
const FILES=['./','index.html','style.css','app.js','plan.js','exercises.js','statements.js','bdata.js','bdata2.js','bdata3.js','bdata4.js','bdata5.js','bdata6.js','bdata7.js','bdata8.js','bdata9.js','bengine.js','tutor.js','content.js','cards.js','deadlines.js','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));
});
