/* ---------- Tage Mage: generators, runner, notebook, plan ---------- */
const TMK=Object.fromEntries(TM_SECS.map(s=>[s.k,s]));
const tmRng=seed=>{let a=seed>>>0;const f=()=>{a+=0x6D2B79F5;let t=Math.imul(a^a>>>15,1|a);t^=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};f.int=(lo,hi)=>lo+Math.floor(f()*(hi-lo+1));f.pick=a=>a[Math.floor(f()*a.length)];f.shuf=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(f()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};return f};
const tmHash=s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
const tmnf=x=>String(Math.round(x*100)/100).replace('.',',');
const tmgcd=(a,b)=>b?tmgcd(b,a%b):a;
const tmfrac=(n,d)=>{const g=tmgcd(n,d);return (n/g)+'/'+(d/g)};

/* numeric question: correct value + candidate wrong values */
function mkNum(r,q,ans,naive,fmt,e,step,allowNeg){
 const seen=new Set([fmt(ans)]),wr=[];
 const intAns=Number.isInteger(ans),add=v=>{if(!isFinite(v)||(intAns&&!Number.isInteger(v)))return;if(!allowNeg&&v<=0)return;const f=fmt(v);if(seen.has(f))return;seen.add(f);wr.push(f)};
 naive.forEach(add);
 [1,-1,2,-2,3,-3,4,-4,5,-5].forEach(k=>{if(wr.length<4)add(ans+k*step)});
 return {q,o:[fmt(ans)].concat(wr.slice(0,4)),a:0,e};
}
const pctS=v=>(v>0?'+':'')+tmnf(v)+' %';
const TMHARM=[];[20,24,30,36,40,45,48,50,60,72,80,90,120].forEach((a,i,A)=>A.slice(i+1).forEach(b=>{const h=2*a*b/(a+b);if(Number.isInteger(h))TMHARM.push([a,b,h])}));
const TMWORK=[[12,6],[10,15],[20,30],[12,4],[6,3],[30,45],[24,12],[40,60],[8,8],[18,9],[16,48]].filter(([m,n])=>Number.isInteger(m*n/(m+n)));
const TM_CALC=[
 r=>{let a,b,net;do{a=r.pick([10,20,25,30,40,50]);b=r.pick([10,20,25,30,40,50]);net=(100+a)*(100-b)/100-100}while(!Number.isInteger(net)||net===0);
  return mkNum(r,`Un prix augmente de ${a} % puis baisse de ${b} %. Quelle est la variation totale, en pourcentage ?`,net,[a-b,(a-b)/2],pctS,`Coefficients : (1 + ${a}/100) x (1 - ${b}/100) = ${tmnf((100+a)*(100-b)/10000)}, soit ${pctS(net)}. On ne soustrait pas les pourcentages.`,1,true)},
 r=>{const R=r.pick([[2,3,5],[1,2,3],[3,4,5],[2,5,3],[1,3,4]]),u=r.pick([20,30,40,50,60,100]),sum=R[0]+R[1]+R[2],T=sum*u,mx=Math.max(...R);
  return mkNum(r,`Trois associés se partagent un bénéfice de ${T} € dans le rapport ${R.join(' : ')}. Quelle est la plus grande part ?`,mx*u,[T/3,(mx+1)*u,T/mx],v=>tmnf(v)+' €',`Une part vaut ${T} / ${sum} = ${u} €. La plus grande est ${mx} x ${u} = ${mx*u} €.`,u)},
 r=>{const [a,b,h]=r.pick(TMHARM);
  return mkNum(r,`Un cycliste fait l'aller à ${a} km/h et le retour, sur le même trajet, à ${b} km/h. Quelle est sa vitesse moyenne sur l'ensemble ?`,h,[(a+b)/2],v=>tmnf(v)+' km/h',`Vitesse moyenne = distance totale / temps total = 2 x ${a} x ${b} / (${a} + ${b}) = ${tmnf(h)} km/h. Ce n'est pas la moyenne arithmétique.`,2)},
 r=>{let V1,V2,c1,c2,res;do{V1=r.int(2,6);V2=r.int(2,6);c1=r.pick([10,20,30,40,50,60]);c2=r.pick([10,20,30,40,50,60]);res=(V1*c1+V2*c2)/(V1+V2)}while(c1===c2||Math.abs(res*10-Math.round(res*10))>1e-9);
  return mkNum(r,`On mélange ${V1} litres d'une solution à ${c1} % d'alcool et ${V2} litres d'une solution à ${c2} %. Quelle est la concentration finale ?`,res,[(c1+c2)/2],v=>tmnf(v)+' %',`Alcool pur : ${V1} x ${c1}/100 + ${V2} x ${c2}/100 ; volume total ${V1+V2} L. Concentration = ${tmnf(res)} %.`,2.5)},
 r=>{let n,notes,S,m,x;do{n=r.int(3,5);notes=Array.from({length:n},()=>r.int(8,16));S=notes.reduce((a,b)=>a+b,0);m=r.int(11,14);x=m*(n+1)-S}while(x<0||x>20);
  return mkNum(r,`Un étudiant a obtenu ${notes.join(', ')} aux ${n} premiers contrôles. Quelle note doit-il obtenir au suivant pour avoir une moyenne de ${m} ?`,x,[m],v=>tmnf(v),`Somme visée : ${m} x ${n+1} = ${m*(n+1)}. Il a déjà ${S}. Il lui faut ${x}.`,1)},
 r=>{const [m,n]=r.pick(TMWORK),d=m*n/(m+n);
  return mkNum(r,`Un ouvrier seul termine un chantier en ${m} jours, un autre en ${n} jours. Travaillant ensemble, en combien de jours le terminent-ils ?`,d,[(m+n)/2],v=>tmnf(v)+' jours',`Par jour : 1/${m} + 1/${n} = ${m+n}/${m*n} du chantier. Durée : ${m*n}/${m+n} = ${tmnf(d)} jours.`,1)},
 r=>{const C=r.pick([1000,2000,5000,10000]),t=r.pick([5,10,20]),f=C*Math.pow(1+t/100,2);
  return mkNum(r,`Un capital de ${C} € est placé à ${t} % d'intérêts composés pendant 2 ans. Quel est le capital final ?`,f,[C*(1+2*t/100)],v=>tmnf(v)+' €',`${C} x (1 + ${t}/100)² = ${tmnf(f)} €. Les intérêts de la 2e année portent aussi sur les intérêts de la 1re.`,C*t/200)},
 r=>{const x=r.int(2,15),k=r.pick([2,3,4,5,6,7]),c=r.int(1,12),d=k*x-c;
  return mkNum(r,`On multiplie un nombre par ${k}, puis on retranche ${c} : on obtient ${d}. Quel est ce nombre ?`,x,[(d-c)/k,d/k,x+1],v=>tmnf(v),`${k}x - ${c} = ${d}, donc ${k}x = ${d+c} et x = ${x}.`,1)},
 r=>{const rate=r.pick([5,10,12,15,20]),m1=r.pick([3,4,5,6]),h1=r.pick([2,3,4,5]),m2=m1+r.int(1,4),h2=r.pick([2,3,4,6]),p=rate*m1*h1,a=rate*m2*h2;
  return mkNum(r,`${m1} machines fabriquent ${p} pièces en ${h1} heures. Combien de pièces fabriquent ${m2} machines en ${h2} heures ?`,a,[p*m2/m1,p*h2/h1],v=>tmnf(v),`Cadence : ${p} / (${m1} x ${h1}) = ${rate} pièces par machine et par heure. ${m2} x ${h2} x ${rate} = ${a}.`,rate)},
 r=>{let orig,pc,fin;do{orig=r.pick([40,60,80,120,150,200,250,400]);pc=r.pick([10,20,25,30,40]);fin=orig*(100-pc)/100}while(!Number.isInteger(fin));
  return mkNum(r,`Après une remise de ${pc} %, un article coûte ${fin} €. Quel était son prix initial ?`,orig,[fin*(1+pc/100),fin+pc],v=>tmnf(v)+' €',`Prix final = prix initial x ${tmnf((100-pc)/100)}. Prix initial = ${fin} / ${tmnf((100-pc)/100)} = ${orig} €. Ajouter ${pc} % au prix final est une erreur classique.`,orig/10)},
 r=>{let R,B,n,num,den;do{R=r.int(3,6);B=r.int(2,5);n=R+B;num=R*(R-1);den=n*(n-1)}while(num/den>0.9);
  const ans=tmfrac(num,den),cand=[tmfrac(R*R,n*n),tmfrac(R,n),tmfrac(R*(R-1),n*n),tmfrac(R-1,n-1),tmfrac(R*(R-1)*2,n*(n-1)*3)],wr=[];cand.forEach(c=>{if(c!==ans&&!wr.includes(c)&&wr.length<4)wr.push(c)});for(let k=1;wr.length<4;k++){const c=tmfrac(num+k,den+k);if(c!==ans&&!wr.includes(c))wr.push(c)}
  return {q:`Une urne contient ${R} boules rouges et ${B} boules bleues. On tire deux boules successivement, sans remise. Quelle est la probabilité d'obtenir deux boules rouges ?`,o:[ans].concat(wr),a:0,e:`P = ${R}/${n} x ${R-1}/${n-1} = ${num}/${den} = ${ans}. Sans remise, le dénominateur du 2e tirage diminue.`}},
 r=>{let k,m,n,b,ok=false;for(let t=0;t<200&&!ok;t++){k=r.pick([3,4,5]);m=r.pick([2,3]);n=r.int(2,12);if(k>m&&n*(m-1)%(k-m)===0){b=n*(m-1)/(k-m);ok=b>0}}
  if(!ok){k=3;m=2;n=6;b=6}
  return mkNum(r,`Ana a ${k} fois l'âge de Bob. Dans ${n} ans, elle aura ${m} fois l'âge qu'aura alors Bob. Quel est l'âge actuel d'Ana ?`,k*b,[b,k*b+n],v=>tmnf(v)+' ans',`${k}b + ${n} = ${m}(b + ${n}) donne b(${k} - ${m}) = ${n*(m-1)}, donc b = ${b} et Ana a ${k*b} ans.`,k)},
 r=>{const p=r.pick([20,30,40,60,80]),q=r.pick([25,50,40,20,10]);if(p*q%100)return TM_CALC[12](r);
  return mkNum(r,`${p} % des employés d'une entreprise sont des femmes ; ${q} % d'entre elles sont cadres. Quel pourcentage de l'effectif représentent les femmes cadres ?`,p*q/100,[q,(p+q)/2,p-q],v=>tmnf(v)+' %',`${p} % x ${q} % = ${p}/100 x ${q}/100 = ${tmnf(p*q/100)} %.`,2)},
 r=>{const A=r.pick([40,50,60,80,120,200]),pc=r.pick([10,20,25,30,40,50]),up=r.pick([1,-1]),B=A*(1+up*pc/100);if(!Number.isInteger(B))return TM_CALC[13](r);
  const wrong=(B-A)/B*100;
  return mkNum(r,`Un prix passe de ${A} € à ${B} €. Quelle est la variation en pourcentage ?`,up*pc,[Math.round(wrong*10)/10,up*pc*2],pctS,`(${B} - ${A}) / ${A} = ${pctS(up*pc)}. On divise par la valeur de départ.`,5,true)}
];

/* conditions minimales: exact check by enumeration over integers 1..9 */
function genCond(r,target){
 const D=[];for(let x=1;x<=9;x++)for(let y=1;y<=9;y++)D.push([x,y]);
 const mk=(x0,y0)=>{const k=r.int(0,9);
  const T=[()=>{const s=x0+y0;return ['x + y = '+s,(x,y)=>x+y===s]},()=>{const d=x0-y0;return ['x - y = '+d,(x,y)=>x-y===d]},()=>{const p=x0*y0;return ['x × y = '+p,(x,y)=>x*y===p]},
   ()=>{const c=r.int(1,5);return ['x + '+c+' = '+(x0+c),(x,y)=>x+c===x0+c]},()=>{const c=r.int(2,4);return x0*c<=40?[c+'x = '+(c*x0),(x,y)=>c*x===c*x0]:null},()=>['x² = '+(x0*x0),(x,y)=>x*x===x0*x0],()=>{const m=x0/y0;return Number.isInteger(m)&&m>1?['x = '+m+' × y',(x,y)=>x===m*y]:null},()=>[x0%2?'x est impair':'x est pair',(x,y)=>x%2===x0%2],()=>[x0>y0?'x > y':'x < y',x0>y0?(x,y)=>x>y:(x,y)=>x<y],
   ()=>['y = '+y0,(x,y)=>y===y0],()=>{const c=x0>1?x0-r.int(1,Math.min(3,x0-1)):0;return c?['x > '+c,(x,y)=>x>c]:null},()=>{const c=x0<9?x0+r.int(1,Math.min(3,9-x0)):0;return c?['x < '+c,(x,y)=>x<c]:null},()=>{const s=y0>1?'y est '+(y0%2?'impair':'pair'):null;return s?[s,(x,y)=>y%2===y0%2]:null}];
  for(let t=0;t<10;t++){const g=T[(k+t)%T.length]();if(g)return g}return null};
 for(let tries=0;tries<4000;tries++){
  const x0=r.int(1,9),y0=r.int(1,9),s1=mk(x0,y0),s2=mk(x0,y0);if(!s1||!s2||s1[0]===s2[0])continue;
  const xs=f=>new Set(D.filter(([x,y])=>f(x,y)).map(d=>d[0]));
  const A1=xs(s1[1]),A2=xs(s2[1]),AB=xs((x,y)=>s1[1](x,y)&&s2[1](x,y));
  const a=A1.size===1,b=A2.size===1,c=AB.size===1;
  const cls=a&&!b?0:b&&!a?1:!a&&!b&&c?2:a&&b?3:4;
  if(cls!==target)continue;
  const L=s=>'{'+[...s].sort((p,q)=>p-q).join(', ')+'}';
  const e=`Avec (1) seule, x peut valoir ${L(A1)}. Avec (2) seule : ${L(A2)}. Ensemble : ${L(AB)}.`;
  return {q:`x et y sont des entiers compris entre 1 et 9. Quelle est la valeur de x ?\n(1) ${s1[0]}\n(2) ${s2[0]}`,o:TM_CM.slice(),a:target,e,fixed:true};
 }
 return null;
}

/* logic: number and letter series */
function genSeq(r){
 const kind=r.int(0,6);let seq=[],rule='',len=7,n=r.int(2,12);
 const L=i=>String.fromCharCode(65+((i%26)+26)%26);
 if(kind===0){const d=r.int(3,9);seq=Array.from({length:len},(_,i)=>n+i*d);rule=`Suite arithmétique : on ajoute ${d} à chaque terme.`}
 else if(kind===1){const q=r.pick([2,3]);n=r.int(1,4);seq=Array.from({length:6},(_,i)=>n*Math.pow(q,i));rule=`Suite géométrique : chaque terme est multiplié par ${q}.`}
 else if(kind===2){const a=r.int(3,7),b=r.int(1,a-1);seq=[n+5];for(let i=1;i<len;i++)seq.push(seq[i-1]+(i%2?a:-b));rule=`On alterne +${a} et -${b}.`}
 else if(kind===3){const d0=r.int(1,3),c=r.int(1,2);seq=[n];let d=d0;for(let i=1;i<len;i++){seq.push(seq[i-1]+d);d+=c}rule=`Les écarts successifs augmentent de ${c} à chaque pas (${d0}, ${d0+c}, ${d0+2*c}...).`}
 else if(kind===4){const a=r.int(1,5),b=r.int(2,6);seq=[a,b];for(let i=2;i<len;i++)seq.push(seq[i-1]+seq[i-2]);rule='Chaque terme est la somme des deux précédents.'}
 else if(kind===5){const c=r.int(-3,9),m=r.int(1,3);seq=Array.from({length:len},(_,i)=>m*(i+2)*(i+2)+c);rule=`Les termes suivent la formule ${m===1?'':m+' x '}n² ${c<0?'- '+(-c):'+ '+c} pour n = 2, 3, 4...`}
 else{const s=r.int(0,5),d0=r.int(1,2);const ls=[s];let d=d0;for(let i=1;i<6;i++){ls.push(ls[i-1]+d);d++}
  const ans=L(ls[5]);const wr=[];[1,-1,2,-2,3].forEach(k=>{const c=L(ls[5]+k);if(c!==ans&&!wr.includes(c)&&wr.length<4)wr.push(c)});
  return {q:`Quelle lettre complète la suite ?\n${ls.slice(0,5).map(L).join(' - ')} - ?`,o:[ans].concat(wr),a:0,e:`Les décalages dans l'alphabet augmentent de 1 à chaque pas : ${Array.from({length:4},(_,i)=>d0+i).join(', ')}, puis ${d0+4}. La lettre cherchée est ${ans}.`}}
 const ans=seq[seq.length-1],shown=seq.slice(0,-1),ch=[];
 [1,-1,2,-2,3,-3,5].forEach(k=>{const v=ans+k;if(v!==ans&&!ch.includes(v)&&ch.length<4)ch.push(v)});
 return {q:`Quel nombre complète la suite ?\n${shown.join(' ; ')} ; ?`,o:[String(ans)].concat(ch.map(String)),a:0,e:rule+' Le terme suivant est '+ans+'.'};
}

/* ---- picking questions ---- */
const tmT=()=>{if(!S.tage)S.tage={};const T=S.tage;T.att=T.att||[];T.mist=T.mist||{};T.seen=T.seen||{};T.dates=T.dates||{};T.cleared=T.cleared||{};T.fixed=T.fixed||0;return T};
function tmMerge(a,b){a=a||{};b=b||{};
 const att=new Map();[...(a.att||[]),...(b.att||[])].forEach(x=>att.set(x.id,x));
 const cl=Object.assign({},a.cleared);Object.entries(b.cleared||{}).forEach(([k,v])=>{cl[k]=Math.max(cl[k]||0,v)});
 const mist={};[a.mist||{},b.mist||{}].forEach(m=>Object.entries(m).forEach(([k,v])=>{const y=mist[k];if(!y||v.ts>=y.ts)mist[k]=v}));
 Object.keys(mist).forEach(k=>{if((cl[k]||0)>=mist[k].ts)delete mist[k]});
 const seen=Object.assign({},a.seen);Object.entries(b.seen||{}).forEach(([k,v])=>{seen[k]=Math.max(seen[k]||0,v)});
 const dates=Object.assign({},a.dates);Object.entries(b.dates||{}).forEach(([k,v])=>{if(!dates[k]||v[1]>=dates[k][1])dates[k]=v});
 return {att:[...att.values()].sort((x,y)=>x.ts-y.ts),mist,seen,dates,cleared:cl,fixed:Math.max(a.fixed||0,b.fixed||0)};
}
const TM_DEF={j:['2027-06-12','Spring 2027 sitting'],n:['2027-10-30','Autumn 2027 sitting']};
function tmDate(k){const d=(tmT().dates||{})[k];return d?d[0]:TM_DEF[k][0]}
function tmDays(k){return Math.ceil((new Date(tmDate(k)+'T12:00:00')-Date.now())/864e5)}
function prepQ(q,seed){
 const o=Object.assign({},q),r=tmRng(tmHash(seed+'|'+q.id));
 if(q.t&&TM_TEXTS[q.t])o.x=TM_TEXTS[q.t];
 if(!q.fixed){const idx=r.shuf([0,1,2,3,4]);o.o=idx.map(i=>q.o[i]);o.a=idx.indexOf(q.a)}
 else o.o=q.o.slice();
 return o;
}
function tmGen(sec,r,seed,i){
 let q=null;
 if(sec==='calc'){q=TM_CALC[(r.int(0,99)+i)%TM_CALC.length](r);q.id='g:calc:'+seed+':'+i}
 if(sec==='cond'){q=genCond(r,[0,1,2,3,4][(i+r.int(0,4))%5])||genCond(r,2);q.id='g:cond:'+seed+':'+i}
 q.s=sec;return q;
}
function tmPick(sec,n,seed){
 const T=tmT(),r=tmRng(tmHash(seed+sec)),seen=T.seen||{};
 const stat=TM_STATIC.filter(q=>q.s===sec&&(!TMHARD||q.d===3));
 const byAge=a=>r.shuf(a).sort((p,q)=>(seen[p.id]||0)-(seen[q.id]||0));
 let out=[];
 if(sec==='comp'){
  const ids=Object.keys(TM_TEXTS).filter(t=>stat.some(q=>q.t===t)),age=t=>Math.max(...stat.filter(q=>q.t===t).map(q=>seen[q.id]||0));
  const order=r.shuf(ids).sort((a,b)=>age(a)-age(b));
  for(const t of order){if(out.length>=n)break;out.push(...stat.filter(q=>q.t===t))}
  out=out.slice(0,n);
 }else if(sec==='calc'){
  out=byAge(stat).slice(0,Math.min(stat.length,Math.round(n*(TMHARD?1:0.25))));
  for(let i=0;out.length<n;i++)out.push(tmGen(sec,r,seed,i));
  out=r.shuf(out);
 }else if(sec==='logi'){
  const ni=Math.round(n*0.6);
  for(let i=0;i<n;i++){const q=i<ni?genInter(r,TMHARD):genSpat(r,TMHARD);q.id='g:logi:'+seed+':'+i;q.s='logi';out.push(q)}
 }else if(sec==='cond'){
  const hand=Math.min(stat.length,Math.round(n*(TMHARD?1:0.4)));
  out=byAge(stat).slice(0,hand);
  for(let i=0;out.length<n;i++)out.push(tmGen(sec,r,seed,i));
  out=r.shuf(out);
 }else out=byAge(stat).slice(0,n);
 /* ladder: easy first, hard last (stable), like the real subtests; text groups and logic grids keep their order */
 if(sec!=='comp'&&sec!=='logi')out=out.map((q,i)=>[q,i]).sort((a,b)=>((a[0].d||2)-(b[0].d||2))||a[1]-b[1]).map(x=>x[0]);
 return out.map(q=>prepQ(q,seed));
}

/* ---- run engine ---- */
let TMR=null,TMTAB='train',TMLEN=15,TMRELAX=false,TMOPEN=null,TMHARD=false;
try{TMHARD=localStorage.getItem('lu-tm-hard')==='1'}catch(e){}
const TMRK='lu-tm-run';
function tmSaveRun(){try{if(TMR&&!TMR.saved)localStorage.setItem(TMRK,JSON.stringify(TMR));else localStorage.removeItem(TMRK)}catch(e){}}
function tmLoadRun(){try{const r=JSON.parse(localStorage.getItem(TMRK)||'null');if(r&&!r.done)TMR=r}catch(e){}}
function tmStart(kind,secs,n,relax,custom){
 const id='r'+Date.now(),seed=id;
 const S_=secs.map(k=>({k,qs:custom?custom:tmPick(k,n,seed),ans:[],t0:null,end:null,limit:kind==='mock'?1200:(relax?0:n*80)}));
 TMR={v:1,kind,id,relax:!!relax,hard:!!TMHARD&&!custom,secs:S_,si:0,qi:0,started:Date.now(),done:false};
 if(kind==='drill'){TMR.secs[0].t0=Date.now()}
 tmSaveRun();
}
const tmCur=()=>TMR&&TMR.secs[TMR.si];
function tmRemain(){const s=tmCur();if(!s||!s.t0)return null;return s.limit?s.limit-(Date.now()-s.t0)/1000:(Date.now()-s.t0)/1000}
function tmFinishSection(auto){
 const s=tmCur();s.end=Date.now();
 if(TMR.si<TMR.secs.length-1){TMR.si++;TMR.qi=0}else tmComplete();
 tmSaveRun();render();window.scrollTo(0,0);
}
function tmComplete(){
 TMR.done=true;if(TMR.saved)return;TMR.saved=true;
 const T=tmT(),now=Date.now(),res={};let ok=0,n=0;
 TMR.secs.forEach(s=>{
  const g=res[s.k]||(res[s.k]={ok:0,n:0,t:0});g.t+=Math.round(((s.end||now)-(s.t0||now))/1000);
  s.qs.forEach((q,i)=>{const a=s.ans[i],r=res[q.s]||(res[q.s]={ok:0,n:0,t:0});r.n++;n++;
   if(!q.gen&&!String(q.id).startsWith('g:'))T.seen[q.id]=now;
   if(a===q.a){r.ok++;ok++;const m=T.mist[q.id];if(m){m.streak=(m.streak||0)+1;if(m.streak>=2){delete T.mist[q.id];T.cleared[q.id]=now;T.fixed=(T.fixed||0)+1}}}
   else if(a!=null){const m=T.mist[q.id]||{};T.mist[q.id]={s:q.s,q:q.q,o:q.o,a:q.a,e:q.e,x:q.x||'',fixed:!!q.fixed,grid:q.grid||null,fig:q.fig||null,osvg:!!q.osvg,ts:now,n:(m.n||0)+1,streak:0}}
  })});
 const rec={id:TMR.id,ts:now,kind:TMR.kind,relax:TMR.relax,secs:res,ok,n};
 if(TMR.hard)rec.hard=1;
 if(TMR.review)rec.review=1;
 if(TMR.kind==='mock')rec.score=Math.round(ok/n*600);
 T.att.push(rec);TMR.rec=rec;save();
}
function tmAnswer(i){
 const s=tmCur(),q=s.qs[TMR.qi];
 if(TMR.relax&&s.ans[TMR.qi]!=null)return;
 s.ans[TMR.qi]=i;tmSaveRun();render();
}

/* ---- views ---- */
const tmAcc=sec=>{let ok=0,n=0;tmT().att.forEach(a=>{const r=a.secs[sec];if(r){ok+=r.ok;n+=r.n}});return {ok,n,p:n?ok/n:null}};
const tmMocks=()=>tmT().att.filter(a=>a.kind==='mock');
const tmWeekStart=()=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return d.getTime()};
function tmNextSub(){const d=tmDays('j')>=0?tmDays('j'):tmDays('n');return d>=0?'J-'+d+' to the next sitting':'Set your test dates'}
const tmBar=(p,c)=>`<div class="tmb"><i style="width:${Math.round((p||0)*100)}%;background:${c}"></i></div>`;
function tmPlan(){
 const nextK=tmDays('j')>=0?'j':'n',days=tmDays(nextK),wk=Math.max(0,Math.ceil(days/7));
 const ws=tmWeekStart(),att=tmT().att.filter(a=>a.ts>=ws),dr=att.filter(a=>a.kind==='drill').length,mk=att.filter(a=>a.kind==='mock').length;
 let ph,drT,mkT,rvT,txt;
 if(days<0){return `<div class="card"><h3>Study plan</h3><p class="mute" style="margin-top:8px">Both sittings are in the past. Update the dates on the Train tab.</p></div>`}
 if(wk>16){ph='Foundation';drT=3;mkT=0;rvT=1;txt='Learn the formats and fix basics. One drill per section type, slowly. No mock yet unless you want a baseline.'}
 else if(wk>4){ph='Build';drT=4;mkT=wk%2?0:1;rvT=1;txt='Mix targeted drills with one full mock every two weeks. Always review the mistakes the day after.'}
 else{ph='Sprint';drT=3;mkT=1;rvT=2;txt='One full mock a week under real conditions (2 hours, no pause), then review. Drills only on your weakest sections.'}
 const weak=TM_SECS.map(s=>({s,a:tmAcc(s.k)})).filter(x=>x.a.n>=5).sort((a,b)=>a.a.p-b.a.p).slice(0,2);
 const mist=Object.keys(tmT().mist).length;
 const row=(t,done,goal,sub)=>`<div class="cell"><span class="t"><b>${t}</b><span>${sub}</span></span><span class="badge ${done>=goal?'green':'blue'}">${done}/${goal}</span></div>`;
 return `<div class="card"><div class="card-h"><h3>This week</h3><span class="badge blue">${ph} phase</span></div>
 <p class="mute small" style="margin-bottom:10px">${wk} week${wk===1?'':'s'} to ${TM_DEF[nextK][1].toLowerCase()} (${tmDate(nextK)}). ${txt}</p>
 <div class="grp" style="background:var(--fill)">${row('Section drills',dr,drT,weak.length?'Focus: '+weak.map(x=>x.s.n).join(' and '):'Start with one drill in each section as a baseline')}
 ${mkT?row('Full mock',mk,mkT,'2 hours, real conditions'):''}
 ${row('Mistake review',Math.min(rvT,tmT().att.filter(a=>a.ts>=ws&&a.kind==='drill'&&a.review).length),rvT,mist?mist+' question'+(mist===1?'':'s')+' waiting in your notebook':'Notebook is empty')}</div></div>
 <div class="sf">Targets adapt to the time left. They are a guide, not a rule: during Lingnan exam weeks keep it light.</div>`;
}
function tmTrain(){
 const nd=k=>{const d=tmDays(k);return d>=0?d:'—'};
 const run=TMR&&!TMR.done?`<button class="btn" style="margin-bottom:14px" data-act="tmresume">${ic('play')} Resume your ${TMR.kind==='mock'?'mock test':'drill'}</button>`:'';
 const cd=k=>`<div class="stat"><b>${nd(k)}</b><span>days · ${TM_DEF[k][1]}</span><input type="date" class="tmd" data-tmd="${k}" value="${tmDate(k)}"></div>`;
 const m=tmMocks(),last=m[m.length-1],best=m.reduce((a,b)=>Math.max(a,b.score),0);
 return `${run}<div class="stats tm2">${cd('j')}${cd('n')}</div>
 <div class="stats" style="margin:10px 0 14px"><div class="stat"><b>${last?last.score:'—'}</b><span>last mock /600</span></div><div class="stat"><b>${m.length?best:'—'}</b><span>best mock</span></div><div class="stat"><b>${tmT().att.filter(a=>a.kind==='drill').length}</b><span>drills done</span></div></div>
 <div class="card"><div class="card-h"><h3>Section drills</h3></div>
 <div class="segc" style="margin-bottom:8px">${[[0,'Standard'],[1,'Hard · maximum']].map(([k,l])=>`<button class="${(TMHARD?1:0)===k?'on':''}" data-act="tmhard" data-k="${k}">${l}</button>`).join('')}</div>
 <div class="stack" style="margin-bottom:8px"><div class="segc" style="flex:1">${[10,15].map(n=>`<button class="${TMLEN===n?'on':''}" data-act="tmlen" data-k="${n}">${n} questions</button>`).join('')}</div>
 <div class="segc" style="flex:1">${[[0,'Timed'],[1,'Instant feedback']].map(([k,l])=>`<button class="${(TMRELAX?1:0)===k?'on':''}" data-act="tmrelax" data-k="${k}">${l}</button>`).join('')}</div></div>
 <div class="grp" style="margin-top:10px">${TM_SECS.map(s=>{const a=tmAcc(s.k);return `<button class="cell has-ico" data-act="tmdrill" data-k="${s.k}"><span class="sq" style="--c:${s.c}">${ic(s.i)}</span><span class="t"><b>${s.n}</b><span>${a.n?Math.round(a.p*100)+' % right · '+a.n+' answered':'No data yet'}</span>${tmBar(a.p,s.c)}</span>${ic('chev','chev')}</button>`}).join('')}</div>
 <div class="sf">Timed drills allow 80 seconds per question, like the real test (15 questions in 20 minutes). Standard orders questions from easy to hard. Hard keeps only the toughest tier: long academic texts, multi-step calculation with trap answers, two-case data-sufficiency items, quantifier and conditional logic, and combined-rule grids.</div></div>
 <div style="margin-top:14px"><button class="btn" data-act="tmmock">${ic('timer')} ${TMHARD?'Hard full mock':'Full mock test'} · 90 questions · 2 h</button></div>
 <div class="sf">Six subtests of 15 questions and 20 minutes each, in order, without going back. The score is an indicative estimate out of 600; the real scale is not linear.</div>`;
}
function tmMist(){
 const M=tmT().mist,ids=Object.keys(M).sort((a,b)=>M[b].ts-M[a].ts);
 if(!ids.length)return `<div class="empty">No mistakes yet. Wrong answers from drills and mocks land here, and leave after two correct answers in a row.${tmT().fixed?'<br>Already cleared: '+tmT().fixed+'.':''}</div>`;
 const grp=TM_SECS.map(s=>{const l=ids.filter(i=>M[i].s===s.k);if(!l.length)return '';
  return `<div class="eyebrow" style="margin:16px 0 6px">${s.n} · ${l.length}</div><div class="grp">${l.map(i=>{const m=M[i],open=TMOPEN===i;
   return `<div class="tmm"><button class="cell" data-act="tmopen" data-id="${esc(i)}"><span class="t"><b style="font-size:15px;white-space:pre-line">${esc(m.q.split('\n')[0].slice(0,140))}</b><span>missed ${m.n} time${m.n===1?'':'s'}${m.streak?' · '+m.streak+' right since':''}</span></span>${ic(open?'chevd':'chev','chev')}</button>
   ${open?`<div class="tmx">${m.x?`<p class="tmp">${esc(m.x)}</p>`:''}<p style="white-space:pre-line">${esc(m.q)}</p>${tmExtra(m)}<p class="tmok"><b>Answer:</b> ${tmOptH(m,m.a)}</p><p class="mute small">${esc(m.e||'')}</p></div>`:''}</div>`}).join('')}</div>`}).join('');
 return `<button class="btn" data-act="tmredo" style="margin-bottom:6px">${ic('redo')} Redo my mistakes (${Math.min(15,ids.length)} questions)</button>${grp}`;
}
function tmHist(){
 const A=[...tmT().att].reverse();
 if(!A.length)return `<div class="empty">Your drills and mocks will be listed here.</div>`;
 const m=tmMocks(),H=70,max=600;
 const chart=m.length>1?`<div class="card" style="margin-bottom:14px"><div class="card-h"><h3>Mock scores</h3><span class="mute small">/600, indicative</span></div><div class="tmh">${m.slice(-12).map(a=>`<div style="height:${Math.max(4,a.score/max*H)}px" title="${a.score}"><b>${a.score}</b></div>`).join('')}</div></div>`:'';
 return chart+`<div class="grp">${A.slice(0,40).map(a=>{const d=new Date(a.ts).toLocaleDateString('en-GB',{day:'numeric',month:'short'}),s=(a.kind==='mock'?'Full mock':(TMK[Object.keys(a.secs)[0]]||{n:'Drill'}).n+(a.review?' · mistakes':''))+(a.hard?' · hard':'');
  return `<div class="cell"><span class="t"><b>${s}</b><span>${d} · ${a.ok}/${a.n} right${a.kind==='mock'?' · '+a.score+'/600':''}</span></span><span class="badge ${a.ok/a.n>=.7?'green':a.ok/a.n>=.5?'blue':'red'}">${Math.round(a.ok/a.n*100)} %</span></div>`}).join('')}</div>`;
}
function vTage(){
 const tabs=[['train','Train'],['plan','Plan'],['mist','Mistakes'+(Object.keys(tmT().mist).length?' ('+Object.keys(tmT().mist).length+')':'')],['hist','History']];
 const body=TMTAB==='plan'?tmPlan():TMTAB==='mist'?tmMist():TMTAB==='hist'?tmHist():tmTrain();
 return `<div class="view">${navbar('Hub')}${title('Tage Mage','Test prep')}
 <div class="segc" style="margin:6px 0 14px">${tabs.map(([k,l])=>`<button class="${TMTAB===k?'on':''}" data-act="tmtab" data-k="${k}">${l}</button>`).join('')}</div>${body}</div>`;
}
const tmOptH=(q,i)=>q.osvg?q.o[i]:esc(q.o[i]);
function tmExtra(q){
 let h='';
 if(q.grid){const g=q.grid;let c='';for(let i=0;i<5;i++)for(let j=0;j<5;j++){
   let v='',k='tmgc';if(i===g.q)v=g.h[j];else if(j===g.p)v=g.v[i];else k='tmgc e';
   if(v==='?')k+=' qm';c+=`<div class="${k}">${v==null?'':esc(v)}</div>`}
  h+=`<div class="tmgrid">${c}</div>`}
 if(q.fig){h+=`<div class="tmseq">${q.fig.map(s=>`<div>${s}</div>`).join('')}<div class="tmqf"><span>?</span></div></div>`}
 return h;
}
const tmL=i=>String.fromCharCode(65+i);
function vTmRun(){
 if(!TMR)return vTage();
 if(TMR.done)return tmResults();
 const s=tmCur(),sec=TMK[s.k];
 if(!s.t0){
  return `<div class="view">${navbar('')}${title(sec.n,'Subtest '+(TMR.si+1)+' of '+TMR.secs.length)}
  <div class="card" style="margin-top:12px"><p>${s.qs.length} questions · ${Math.round(s.limit/60)} minutes. You cannot come back to a subtest once it is finished. Unanswered questions count as wrong, so guess when time is short.</p></div>
  <div style="margin-top:16px"><button class="btn" data-act="tmbegin">Start the subtest</button></div>
  <div style="margin-top:10px"><button class="btn red" data-act="tmquit">Abandon the mock</button></div></div>`;
 }
 const i=TMR.qi,q=s.qs[i],a=s.ans[i],lock=TMR.relax&&a!=null;
 const rem=tmRemain();
 const dots=s.qs.map((_,k)=>`<button class="tmd2 ${k===i?'cur':''} ${s.ans[k]!=null?'got':''}" data-act="tmgo" data-i="${k}">${k+1}</button>`).join('');
 const opts=q.o.map((t,k)=>{let c='';if(lock){c=k===q.a?'ok':k===a?'bad':''}else if(a===k)c='on';
  return `<button class="tmo ${c}" data-act="tmpick" data-i="${k}"><b>${tmL(k)}</b><span>${q.osvg?t:esc(t)}</span></button>`}).join('');
 const last=i===s.qs.length-1;
 return `<div class="view tmv"><div class="tmtop"><span>${sec.n} · ${i+1}/${s.qs.length}</span><span class="tmt" id="tmtimer">${fmtMS(rem)}</span></div>
 <div class="tmdots">${dots}</div>
 ${q.x?`<div class="card tmpass"><p>${esc(q.x)}</p></div>`:''}
 <p class="tmq">${esc(q.q)}</p>${tmExtra(q)}<div class="${q.osvg?'tmos tmosv':'tmos'}">${opts}</div>
 ${lock?`<div class="card tmexp"><b>${a===q.a?'Correct.':'Not quite.'}</b> ${esc(q.e||'')}</div>`:''}
 <div class="tmnav"><button class="btn gray" data-act="tmprev" ${i?'':'disabled'}>Previous</button>${last?`<button class="btn" data-act="tmend">${TMR.kind==='mock'?'Finish subtest':'Finish'}</button>`:`<button class="btn" data-act="tmnext">Next</button>`}</div>
 <div style="margin-top:12px"><button class="btn red" data-act="tmquit">Abandon</button></div></div>`;
}
function tmResults(){
 const r=TMR.rec,T=tmT();
 const rows=Object.keys(r.secs).map(k=>{const x=r.secs[k],sec=TMK[k];return `<div class="cell has-ico"><span class="sq" style="--c:${sec.c}">${ic(sec.i)}</span><span class="t"><b>${sec.n}</b><span>${x.ok}/${x.n} right · ${Math.floor(x.t/60)} min ${x.t%60} s</span>${tmBar(x.ok/x.n,sec.c)}</span><span class="badge ${x.ok/x.n>=.7?'green':x.ok/x.n>=.5?'blue':'red'}">${Math.round(x.ok/x.n*100)} %</span></div>`}).join('');
 const wrong=[],shownX=new Set();TMR.secs.forEach(s=>s.qs.forEach((q,i)=>{if(s.ans[i]!==q.a)wrong.push([q,s.ans[i]])}));
 const rev=wrong.map(([q,a])=>{const px=q.x&&!shownX.has(q.x);if(q.x)shownX.add(q.x);return `<div class="tmm"><div class="tmx">${px?`<p class="tmp">${esc(q.x)}</p>`:q.x?`<p class="tmp">${esc(q.x.slice(0,70))}…</p>`:''}<p style="white-space:pre-line"><b>${esc(q.q)}</b></p>${tmExtra(q)}<p class="tmbad">${a==null?'No answer':'Your answer: '+tmOptH(q,a)}</p><p class="tmok"><b>Answer:</b> ${tmOptH(q,q.a)}</p><p class="mute small">${esc(q.e||'')}</p></div></div>`}).join('');
 return `<div class="view">${navbar('')}${title(TMR.kind==='mock'?'Mock result':'Drill result',r.ok+' of '+r.n+' right')}
 <div class="stats" style="margin:10px 0 14px"><div class="stat"><b>${Math.round(r.ok/r.n*100)} %</b><span>accuracy</span></div>${r.score!=null?`<div class="stat"><b>${r.score}</b><span>/600 indicative</span></div>`:''}<div class="stat"><b>${wrong.length}</b><span>to review</span></div></div>
 <div class="grp">${rows}</div>
 <div style="margin-top:16px"><button class="btn" data-act="tmdone">Back to Tage Mage</button></div>
 ${wrong.length?`<div class="eyebrow" style="margin:20px 0 6px">Mistakes and skipped</div><div class="grp">${rev}</div><div class="sf">Answered wrongly: saved in your notebook (skipped ones are not).</div>`:'<div class="card" style="margin-top:14px"><b>Clean sheet.</b> Nothing to review.</div>'}</div>`;
}

/* ---- actions ---- */
function tmTick(){
 if(!TMR||TMR.done||view!=='tmrun')return;
 const s=tmCur();if(!s||!s.t0)return;
 const rem=tmRemain(),el=document.getElementById('tmtimer');
 if(el)el.textContent=fmtMS(rem);
 if(s.limit&&rem<=0)tmFinishSection(true);
}
setInterval(tmTick,500);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)tmTick()});
document.addEventListener('change',e=>{const el=e.target;if(el.dataset&&el.dataset.tmd){const T=tmT();T.dates=T.dates||{};T.dates[el.dataset.tmd]=[el.value,Date.now()];save();render()}});
Object.assign(A,{
 tmtab(el){TMTAB=el.dataset.k;render()},
 tmlen(el){TMLEN=+el.dataset.k;render()},
 tmhard(el){TMHARD=el.dataset.k==='1';try{localStorage.setItem('lu-tm-hard',TMHARD?'1':'0')}catch(e){}render()},
 tmrelax(el){TMRELAX=el.dataset.k==='1';render()},
 tmdrill(el){tmStart('drill',[el.dataset.k],TMLEN,TMRELAX);hist.push([view,param]);view='tmrun';render();window.scrollTo(0,0)},
 tmmock(){if(!confirm('Start a full '+(TMHARD?'HARD ':'')+'mock test? It takes about 2 hours and cannot be paused.'))return;tmStart('mock',TM_SECS.map(s=>s.k),15,false);hist.push([view,param]);view='tmrun';render();window.scrollTo(0,0)},
 tmresume(){view='tmrun';render();window.scrollTo(0,0)},
 tmbegin(){const s=tmCur();s.t0=Date.now();tmSaveRun();render();window.scrollTo(0,0)},
 tmpick(el){tmAnswer(+el.dataset.i)},
 tmnext(){const s=tmCur();if(TMR.qi<s.qs.length-1){TMR.qi++;tmSaveRun();render();window.scrollTo(0,0)}},
 tmprev(){if(TMR.qi>0){TMR.qi--;tmSaveRun();render();window.scrollTo(0,0)}},
 tmgo(el){TMR.qi=+el.dataset.i;tmSaveRun();render();window.scrollTo(0,0)},
 tmend(){const s=tmCur(),un=s.qs.filter((_,i)=>s.ans[i]==null).length;if(un&&!confirm(un+' question'+(un===1?' is':'s are')+' unanswered. Finish anyway?'))return;tmFinishSection(false)},
 tmquit(){if(!confirm('Abandon this run? Nothing will be saved.'))return;TMR=null;tmSaveRun();view='tage';hist=[['hub',null]];render();window.scrollTo(0,0)},
 tmdone(){TMR=null;tmSaveRun();view='tage';hist=[['hub',null]];render();window.scrollTo(0,0)},
 tmopen(el){TMOPEN=TMOPEN===el.dataset.id?null:el.dataset.id;render()},
 tmredo(){
  const M=tmT().mist,ids=Object.keys(M).sort((a,b)=>(M[b].n-M[a].n)||(M[a].ts-M[b].ts)).slice(0,15);if(!ids.length)return;
  const qs=ids.map(i=>{const m=M[i],r=tmRng(tmHash(Date.now()+i));let o=m.o.slice(),a=m.a;if(!m.fixed){const ix=r.shuf([0,1,2,3,4]);o=ix.map(k=>m.o[k]);a=ix.indexOf(m.a)}return {id:i,s:m.s,q:m.q,o,a,e:m.e,x:m.x,fixed:m.fixed,grid:m.grid,fig:m.fig,osvg:m.osvg,gen:true}});
  tmStart('drill',['mix'],qs.length,true,qs);TMR.review=true;TMR.secs[0].k=qs[0].s;tmSaveRun();hist.push([view,param]);view='tmrun';render();window.scrollTo(0,0)
 }
});
VMAP.tage=vTage;VMAP.tmrun=vTmRun;
tmLoadRun();
