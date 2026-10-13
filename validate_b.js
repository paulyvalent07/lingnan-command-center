const fs=require('fs'),vm=require('vm'),path=require('path');const DIR=__dirname;
const ctx={console};ctx.window=ctx;vm.createContext(ctx);
for(const f of fs.readdirSync(DIR).filter(f=>/^bdata\d*\.js$/.test(f)).sort())vm.runInContext(fs.readFileSync(path.join(DIR,f),'utf8'),ctx);
vm.runInContext('this.__r={BUILD,COA,SUBT}',ctx);
const {BUILD,COA,SUBT}=ctx.__r;
const names=new Set(COA.flatMap(g=>g[1]));const subt=new Set(SUBT);
let bad=0,n=0;const err=(id,m)=>{bad++;console.log('ERR',id,m)};
const alt=a=>Array.isArray(a)?a:[a];
const ids=new Set();
for(const lid of Object.keys(BUILD))for(const ex of BUILD[lid]){
 n++;if(ids.has(ex.id))err(ex.id,'duplicate id');ids.add(ex.id);
 if(!ex.title)err(ex.id,'no title');
 if(ex.t==='je'){
  ex.txs.forEach((tx,i)=>{let d=0,c=0;tx.lines.forEach(l=>{if(!alt(l.a).some(a=>names.has(a)))err(ex.id,'unknown account '+l.a+' in tx '+i);if(!(l.n>0))err(ex.id,'bad amount');l.s==='D'?d+=l.n:c+=l.n});
   if(Math.abs(d-c)>0.5)err(ex.id,`tx ${tx.k} unbalanced D${d} C${c}`);
   (tx.pre||[]).forEach(p=>{if(p.opts&&!p.opts.includes(p.key))err(ex.id,'pre key not in opts')})});
 }else if(ex.t==='fs'){
  const pool=ex.labels?new Set(ex.labels):new Set([...names,...subt]);
  ex.rows.forEach(r=>{if(!alt(r.l).some(a=>pool.has(a)))err(ex.id,'label not in pool: '+alt(r.l)[0]);
   const v=r.v||[r.n];if(v.some(x=>x!=null&&isNaN(x)))err(ex.id,'NaN')});
  const get=l=>{const r=ex.rows.find(r=>alt(r.l)[0]===l);return r?(r.v||[r.n]):null};
  const ta=get('Total assets'),tle=get('Total liabilities and stockholders’ equity'),tl=get('Total liabilities'),se=get('Total stockholders’ equity');
  if(ta&&tle&&Math.abs(ta[0]-tle[0])>0.5)err(ex.id,'BS does not balance '+ta[0]+' vs '+tle[0]);
  if(tl&&se&&ta&&Math.abs(tl[0]+se[0]-ta[0])>0.5)err(ex.id,'L+SE != A');
  const tot=get('Totals');if(tot&&ex.cols){const s=[0,0];ex.rows.filter(r=>alt(r.l)[0]!=='Totals').forEach(r=>r.v.forEach((x,i)=>s[i]+=x||0));if(Math.abs(s[0]-tot[0])>0.5||Math.abs(s[1]-tot[1])>0.5)err(ex.id,`TB sums ${s} vs ${tot}`)}
  // income statement checks
  const sr=get('Sales revenue')||get('Service revenue'),ni=get('Net income'),pre=get('Pretax income'),tax=get('Income tax expense');
  if(pre&&tax&&ni&&Math.abs(pre[0]-tax[0]-ni[0])>0.5)err(ex.id,'IS: pretax - tax != NI');
 }else if(ex.t==='cls'){
  ex.items.forEach((it,i)=>{ex.cols.forEach((c,ci)=>{if(c.num){if(it.a[ci]==null)err(ex.id,'num ans missing '+i)}else if(!alt(it.a[ci]).some(a=>c.opts.includes(a)))err(ex.id,`item ${i} col ${ci} answer "${it.a[ci]}" not in opts`)})});
 }else if(ex.t==='eff'){
  const eo=(ex.eo||[['+'],['-'],['0']]).map(o=>o[0]);ex.txs.forEach((tx,i)=>{if(tx.e.length!==ex.cols.length||tx.e.some(e=>!eo.includes(e)))err(ex.id,'eff bad '+i)})
 }else if(ex.t==='calc'){
  ex.parts.forEach((p,i)=>{if(p.opts){if(!p.opts.includes(p.key))err(ex.id,'calc key not in opts')}else if(typeof p.n!=='number'||isNaN(p.n))err(ex.id,'calc n')});
 }else if(ex.t==='grid'){ex.rows.forEach((r,i)=>{if(r.length!==ex.cols.length)err(ex.id,'grid row len '+i);r.forEach((v,ci)=>{if(!ex.cols[ci].g&&v!=null&&typeof v!=='number')err(ex.id,'grid non-num')})})
 }else if(ex.t!=='mcq')err(ex.id,'unknown type '+ex.t);
}
console.log(n+' exercises',bad?bad+' problems':'ALL OK');
