/* ---------- Tage Mage Logique, in the official layout ----------
   Questions 1 to 9: intersection of two series (a row and a column cross on the "?" cell).
   Questions 10 to 15: spatial series (three figures, find the fourth among five).
   Everything is generated and checked by construction, so the answer is always unique. */
const LT=i=>String.fromCharCode(64+i);              /* 1 -> A */
const LR=ch=>ch.charCodeAt(0)-64;
const LVOW=new Set(['A','E','I','O','U','Y']);
const lets=s=>[...s].map(LR);
const digs=n=>String(n).split('').map(Number);
const NDOM=[];for(let n=100;n<=999;n++)NDOM.push(String(n));
const LDOM=[];for(let a=1;a<=26;a++)for(let b=1;b<=26;b++)for(let c=1;c<=26;c++)LDOM.push(LT(a)+LT(b)+LT(c));
const sgn=v=>v>=0?'+'+v:String(v);

/* property = {id, desc, sig(item), c, k:'n'|'l'} : an item satisfies it when sig(item)===c */
function nProps(r){const dsum=r.int(9,19),dp=r.pick([12,18,24,36,48]),dl=r.pick([0,1,2,-1,-2,3]);
 return [
  {id:'m7',d:'tous les nombres sont des multiples de 7',sig:s=>+s%7,c:0},
  {id:'m9',d:'tous les nombres sont des multiples de 9',sig:s=>+s%9,c:0},
  {id:'m11',d:'tous les nombres sont des multiples de 11',sig:s=>+s%11,c:0},
  {id:'m13',d:'tous les nombres sont des multiples de 13',sig:s=>+s%13,c:0},
  {id:'ds'+dsum,d:`la somme des chiffres de chaque nombre vaut ${dsum}`,sig:s=>digs(s).reduce((a,b)=>a+b,0),c:dsum},
  {id:'dp'+dp,d:`le produit des chiffres de chaque nombre vaut ${dp}`,sig:s=>digs(s).reduce((a,b)=>a*b,1),c:dp},
  {id:'fl'+dl,d:dl===0?'le premier et le dernier chiffre de chaque nombre sont identiques':dl>0?`le premier chiffre de chaque nombre est supérieur de ${dl} au dernier`:`le premier chiffre de chaque nombre est inférieur de ${-dl} au dernier`,sig:s=>{const d=digs(s);return d[0]-d[2]},c:dl},
  {id:'mid',d:'le chiffre du milieu est la somme des deux autres',sig:s=>{const d=digs(s);return d[1]-(d[0]+d[2])},c:0},
  {id:'inc',d:'les chiffres de chaque nombre sont strictement croissants',sig:s=>{const d=digs(s);return d[0]<d[1]&&d[1]<d[2]?1:0},c:1},
  {id:'ev',d:'tous les chiffres de chaque nombre sont pairs',sig:s=>digs(s).every(x=>x%2===0)?1:0,c:1},
  {id:'od',d:'tous les chiffres de chaque nombre sont impairs',sig:s=>digs(s).every(x=>x%2===1)?1:0,c:1}
 ].map(p=>Object.assign(p,{k:'n'}))}
function lProps(r){const ls=r.int(28,48),g1=r.pick([1,2,3,4,5,-1,-2,-3]),g2=r.pick([1,2,3,4,5,-1,-2,-3]),vc=r.pick([0,1,2]);
 return [
  {id:'ls'+ls,d:`la somme des rangs alphabétiques des trois lettres vaut ${ls}`,sig:s=>lets(s).reduce((a,b)=>a+b,0),c:ls},
  {id:'g1'+g1,d:`la 2e lettre est ${Math.abs(g1)} rang${Math.abs(g1)>1?'s':''} ${g1>0?'après':'avant'} la 1re`,sig:s=>{const l=lets(s);return l[1]-l[0]},c:g1},
  {id:'g2'+g2,d:`la 3e lettre est ${Math.abs(g2)} rang${Math.abs(g2)>1?'s':''} ${g2>0?'après':'avant'} la 2e`,sig:s=>{const l=lets(s);return l[2]-l[1]},c:g2},
  {id:'ap',d:'les rangs des trois lettres forment une progression régulière (même écart entre la 1re et la 2e, et entre la 2e et la 3e)',sig:s=>{const l=lets(s);return l[0]+l[2]-2*l[1]},c:0},
  {id:'vc'+vc,d:`chaque groupe contient exactement ${vc} voyelle${vc>1?'s':''} (A, E, I, O, U, Y)`,sig:s=>[...s].filter(x=>LVOW.has(x)).length,c:vc},
  {id:'alpha',d:'les trois lettres sont dans l\'ordre alphabétique strict',sig:s=>{const l=lets(s);return l[0]<l[1]&&l[1]<l[2]?1:0},c:1},
  {id:'sum3',d:'le rang de la 3e lettre est la somme des rangs des deux premières',sig:s=>{const l=lets(s);return l[0]+l[1]-l[2]},c:0},
  {id:'fl',d:'la 1re et la 3e lettre sont identiques',sig:s=>{const l=lets(s);return l[0]-l[2]},c:0}
 ].map(p=>Object.assign(p,{k:'l'}))}
const isPr=n=>{if(n<2)return false;for(let d=2;d*d<=n;d++)if(n%d===0)return false;return true};
const HARD_N=[
 {id:'pr',d:'tous les nombres sont premiers',sig:s=>isPr(+s)?1:0,c:1},
 {id:'pal',d:'chaque nombre se lit de la même façon de gauche à droite et de droite à gauche',sig:s=>s[0]===s[2]?1:0,c:1},
 {id:'dsq',d:'la somme des chiffres de chaque nombre est un carré parfait (1, 4, 9, 16 ou 25)',sig:s=>[1,4,9,16,25].includes(digs(s).reduce((a,b)=>a+b,0))?1:0,c:1}
].map(p=>Object.assign(p,{k:'n'}));
const HARD_L=[
 {id:'pv',d:'chaque groupe commence par une voyelle et se termine par une consonne',sig:s=>LVOW.has(s[0])&&!LVOW.has(s[2])?1:0,c:1},
 {id:'dbl',d:'chaque groupe contient exactement deux lettres identiques',sig:s=>new Set(s).size===2?1:0,c:1},
 {id:'mid',d:'la lettre du milieu est la moyenne (arrondie à l\'entier inférieur) des rangs des deux autres',sig:s=>{const l=lets(s);return l[1]-Math.floor((l[0]+l[2])/2)},c:0}
].map(p=>Object.assign(p,{k:'l'}));
const EASYIDS=new Set(['ev','od','inc','alpha','fl','vc0','vc1','vc2','g1','g2']);
const LCACHE=new Map();
function pItems(p){const key=p.k+p.id;if(!LCACHE.has(key))LCACHE.set(key,(p.k==='n'?NDOM:LDOM).filter(s=>p.sig(s)===p.c));return LCACHE.get(key)}
const pOk=(p,s)=>p.sig(s)===p.c;

function genInter(r,hard){
 for(let tries=0;tries<800;tries++){
  const kind=r.pick(['n','l']);let props=(kind==='n'?nProps:lProps)(r);const dom=kind==='n'?NDOM:LDOM;
  if(hard)props=props.filter(p=>!EASYIDS.has(p.id)&&!/^(g1|g2|vc)/.test(p.id)).concat(kind==='n'?HARD_N:HARD_L);
  const PV=r.pick(props);let PH,prog=null;
  if(r.int(0,hard?2:3)===0)prog=kind;else PH=r.pick(props.filter(p=>p.id!==PV.id));
  const vItems=pItems(PV);if(vItems.length<10)continue;
  let x,H,hdesc,hpass;
  if(!prog){
   const hItems=pItems(PH);if(hItems.length<10)continue;
   const both=vItems.filter(s=>pOk(PH,s));if(both.length<3||both.length>vItems.length*.6)continue;
   x=r.pick(both);const p=r.int(0,4);
   const hs=r.shuf(hItems.filter(s=>s!==x&&!pOk(PV,s)));if(hs.length<4)continue;
   H={items:hs.slice(0,4),p};hdesc=PH.d;hpass=s=>pOk(PH,s);
  }else{
   x=r.pick(vItems);const p=r.int(0,4);
   if(kind==='n'){const d=r.pick([11,13,17,19,23,29,31,-11,-13,-17,-19,-23]),a=+x-p*d,items=[];let ok=true;
    for(let i=0;i<5;i++){const v=a+i*d;if(v<100||v>999)ok=false;if(i!==p)items.push(String(v))}
    if(!ok)continue;H={items,p,ordered:true};hdesc=`les nombres forment une suite arithmétique de raison ${sgn(d)}`;hpass=s=>s===x}
   else{const k=r.pick([1,2,3,-1,-2]),f=LR(x[0]),items=[];let ok=true;
    for(let i=0;i<5;i++){const v=f+(i-p)*k;if(v<1||v>26)ok=false;if(i!==p)items.push(LT(v)+LT(r.int(1,26))+LT(r.int(1,26)))}
    if(!ok)continue;H={items,p,ordered:true};hdesc=`les premières lettres se suivent avec un pas de ${sgn(k)} dans l'alphabet`;hpass=s=>s[0]===x[0]}
  }
  const q=r.int(0,4),vs=r.shuf(vItems.filter(s=>s!==x&&!hpass(s)));if(vs.length<4)continue;
  const V={items:vs.slice(0,4),p:q};
  const used=new Set([x,...H.items,...V.items]);if(used.size!==9)continue;
  /* distractors: satisfy only one rule (or none) */
  const pool=r.shuf(dom.slice(0,dom.length)).slice(0,6000);const honly=[],vonly=[],none=[];
  for(const s of pool){if(used.has(s))continue;const h=hpass(s),v=pOk(PV,s);if(h&&v)continue;if(h&&honly.length<2)honly.push(s);else if(v&&vonly.length<2)vonly.push(s);else if(!h&&!v&&none.length<2)none.push(s);if(honly.length>=2&&vonly.length>=2)break}
  const dis=[...honly,...vonly];for(const s of none)if(dis.length<4)dis.push(s);
  if(dis.length<4||new Set(dis).size!==4)continue;
  /* build the two series, with the "?" on the crossing */
  const place=(S,pos)=>{const arr=S.ordered?S.items:r.shuf(S.items);const out=[];let j=0;for(let i=0;i<5;i++)out.push(i===pos?'?':arr[j++]);return out};
  const row=place(H,H.p),col=place(V,V.p);
  const noun=kind==='n'?'nombre':'groupe de lettres';
  return {q:`Quel ${noun} complète la case marquée d'un point d'interrogation, à l'intersection de la ligne et de la colonne ?`,
   grid:{h:row,v:col,p:H.p,q:V.p},o:[x,...dis],a:0,_t:{both:s=>hpass(s)&&pOk(PV,s)},
   e:`Ligne : ${hdesc}. Colonne : ${PV.d}. Seule la proposition ${x} respecte les deux règles à la fois ; les autres n'en respectent qu'une (ou aucune).`};
 }
 return null;
}

/* ---- spatial series ---- */
const SV={w:60};
function figSvg(f){
 const dk='var(--label)',bg='var(--card)';let g='';
 const cell=i=>({x:12+(i%3)*18,y:12+Math.floor(i/3)*18});
 if(f.sh==='arrow'){g=`<polygon points="30,9 43,26 35,26 35,50 25,50 25,26 17,26" fill="${f.fill?dk:'none'}" stroke="${dk}" stroke-width="2.2" stroke-linejoin="round" transform="rotate(${f.rot} 30 30)"/>`}
 else if(f.sh==='poly'){const n=f.n,pts=[];for(let i=0;i<n;i++){const a=(-90+f.rot+i*360/n)*Math.PI/180;pts.push((30+19*Math.cos(a)).toFixed(1)+','+(30+19*Math.sin(a)).toFixed(1))}
  g=`<polygon points="${pts.join(' ')}" fill="${f.fill?dk:'none'}" stroke="${dk}" stroke-width="2.2" stroke-linejoin="round"/>`}
 else if(f.sh==='dot'){for(let i=0;i<9;i++){const c=cell(i);g+=`<circle cx="${c.x}" cy="${c.y}" r="1.6" fill="${dk}" opacity=".25"/>`}const c=cell(f.pos);g+=`<circle cx="${c.x}" cy="${c.y}" r="5.5" fill="${dk}"/>`}
 else if(f.sh==='fillgrid'){for(let i=0;i<9;i++){const c=cell(i),on=f.cells.includes(i);g+=`<rect x="${c.x-7}" y="${c.y-7}" width="14" height="14" rx="2" fill="${on?dk:'none'}" stroke="${dk}" stroke-width="1.2" opacity="${on?1:.55}"/>`}}
 else if(f.sh==='circles'){for(let i=0;i<9;i++){const c=cell(i);if(f.cells.includes(i))g+=`<circle cx="${c.x}" cy="${c.y}" r="6" fill="${dk}"/>`}}
 return `<svg class="tmfig" viewBox="0 0 60 60" aria-hidden="true"><rect x="1" y="1" width="58" height="58" rx="6" fill="${bg}" stroke="${dk}" stroke-opacity=".35"/>${g}</svg>`;
}
const BORDER=[0,1,2,5,8,7,6,3];
const fkey=f=>{if(f.sh==='poly'){const per=360/f.n,m=Math.round((((f.rot%per)+per)%per)*10)/10;return 'p'+f.n+'|'+m+'|'+f.fill}return JSON.stringify(f)};
function uniqFigs(correct,cands,r){const seen=new Set([fkey(correct)]),out=[];for(const c of cands){const k=fkey(c);if(seen.has(k))continue;seen.add(k);out.push(c);if(out.length===4)break}return out}
function genSpat(r,hard){
 const fam=hard?r.pick([4,4,6,7]):r.int(0,5);let seq,ok,cand,rule;
 if(fam===0){const s=r.pick([45,90,135]),d=r.pick([1,-1]),r0=r.int(0,7)*45,R=i=>((r0+d*s*i)%360+360)%360,F=rot=>({sh:'arrow',rot:((rot%360)+360)%360,fill:1});
  seq=[F(R(0)),F(R(1)),F(R(2))];ok=F(R(3));cand=[F(R(2)),F(R(4)),F(R(3)+45),F(R(3)-45),F(R(3)+90),F(R(3)+180),F(R(1))];
  rule=`La flèche tourne de ${s}° ${d>0?'dans le sens des aiguilles d\'une montre':'dans le sens inverse'} à chaque case.`}
 else if(fam===1){const k=r.pick([1,2,3]),i0=r.int(0,7),P=i=>BORDER[((i0+k*i)%8+8)%8],F=pos=>({sh:'dot',pos});
  seq=[F(P(0)),F(P(1)),F(P(2))];ok=F(P(3));cand=[F(P(4)),F(P(2)),F(P(1)),F(4),F(BORDER[(i0+k*3+1)%8]),F(BORDER[((i0+k*3-1)%8+8)%8])];
  rule=`Le point avance de ${k} case${k>1?'s':''} sur le bord, dans le sens des aiguilles d'une montre, à chaque case.`}
 else if(fam===2){const m=r.pick([1,2]),order=[0,1,2,5,4,3,6,7,8],F=n=>({sh:'fillgrid',cells:order.slice(0,n)}),rev=n=>({sh:'fillgrid',cells:[8,7,6,3,4,5,2,1,0].slice(0,n)});
  seq=[F(m),F(2*m),F(3*m)];ok=F(4*m);cand=[F(3*m),F(5*m),rev(4*m),F(4*m-1),F(4*m+1),F(2*m)];
  rule=`${m} case${m>1?'s':''} de plus est noircie${m>1?'s':''} à chaque figure, en suivant le sens de lecture.`}
 else if(fam===3){const n0=r.pick([3,4]),f0=r.int(0,1),F=(n,fl)=>({sh:'poly',n,rot:0,fill:fl});
  seq=[F(n0,f0),F(n0+1,1-f0),F(n0+2,f0)];ok=F(n0+3,1-f0);cand=[F(n0+3,f0),F(n0+4,1-f0),F(n0+2,1-f0),F(n0+4,f0),F(n0+1,f0)];
  rule=`Le polygone gagne un côté à chaque figure, et le remplissage alterne (plein, vide, plein...).`}
 else if(fam===6){const n0=r.pick([3,4]),th=n0===4?r.pick([15,45]):r.pick([15,30,45]),f0=r.int(0,1),F=(i,fl)=>({sh:'poly',n:n0+i,rot:(th*i)%360,fill:fl});
  seq=[F(0,f0),F(1,1-f0),F(2,f0)];ok=F(3,1-f0);cand=[F(3,f0),F(4,1-f0),Object.assign(F(3,1-f0),{rot:0}),Object.assign(F(3,1-f0),{rot:(th*4)%360}),F(2,1-f0),Object.assign(F(4,f0),{rot:(th*3)%360})];
  rule=`Trois règles à la fois : le polygone gagne un côté, tourne de ${th}° et son remplissage alterne à chaque figure.`}
 else if(fam===7){const s0=r.pick([1,2]),i0=r.int(0,7),P=k=>BORDER[((i0+k)%8+8)%8],F=pos=>({sh:'dot',pos});
  const a0=0,a1=s0,a2=2*s0+1,a3=3*s0+3;
  seq=[F(P(a0)),F(P(a1)),F(P(a2))];ok=F(P(a3));cand=[F(P(a2+s0+1)),F(P(a3+1)),F(P(a3-1)),F(P(a2+s0)),F(P(a2+s0+3))];
  rule=`Le point avance sur le bord, dans le sens des aiguilles d'une montre, d'un pas de plus à chaque figure : ${s0}, puis ${s0+1}, puis ${s0+2}.`}
 else if(fam===4){const s=r.pick(hard?[45,90,135]:[45,90]),d=r.pick([1,-1]),r0=r.int(0,3)*45,f0=r.int(0,1),F=(i,fl)=>({sh:'arrow',rot:(((r0+d*s*i)%360)+360)%360,fill:fl});
  seq=[F(0,f0),F(1,1-f0),F(2,f0)];ok=F(3,1-f0);cand=[F(3,f0),F(4,1-f0),F(2,1-f0),{sh:'arrow',rot:(((r0+d*s*3+45)%360)+360)%360,fill:1-f0},{sh:'arrow',rot:(((r0+d*s*3-45)%360)+360)%360,fill:1-f0},F(1,f0)];
  rule=`Deux règles à la fois : la flèche tourne de ${s}° ${d>0?'dans le sens des aiguilles d\'une montre':'dans le sens inverse'}, et son remplissage alterne.`}
 else{const c0=r.int(1,3),order=[4,0,8,2,6,1,7,3,5],F=n=>({sh:'circles',cells:order.slice(0,n)}),G=n=>({sh:'circles',cells:[0,1,2,3,4,5,6,7,8].slice(0,n)});
  seq=[F(c0),F(c0+1),F(c0+2)];ok=F(c0+3);cand=[F(c0+2),F(c0+4),F(c0+1),G(c0+3),F(c0+5)];
  rule=`Un rond de plus apparaît à chaque figure, toujours aux mêmes emplacements.`}
 const dis=uniqFigs(ok,cand,r);
 for(let k=0;dis.length<4;k++){const c=Object.assign({},ok);if(c.rot!=null)c.rot=(c.rot+60+k*15)%360;else if(c.pos!=null)c.pos=(c.pos+1+k)%9;else if(c.n)c.n+=1+k;else if(c.cells)c.cells=c.cells.slice(0,Math.max(1,c.cells.length-1-k));if(!dis.some(d=>fkey(d)===fkey(c))&&fkey(c)!==fkey(ok))dis.push(c)}
 return {q:'Trois figures se suivent selon une règle. Quelle figure doit remplacer le point d\'interrogation ?',fig:seq.map(figSvg),o:[ok,...dis].map(figSvg),a:0,osvg:true,
  e:rule+' La réponse est la seule figure qui respecte la règle.'};
}
