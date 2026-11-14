/* BUS2105 Micro: diagrams drawn as inline SVG and inserted into the lessons under the matching heading (see MFMAP at the end of microfigs3.js).
   mfPlot() draws one chart in a 0..xm / 0..ym data space; figures are registered in MFLIB[id] = {svgs, cap, grid}. Numbers are illustrative. */
const MFC={d:'#0a84ff',s:'#e11d48',g:'#16a34a',o:'#d97706',p:'#8b5cf6',t:'#0f766e',k:'#8e8e93'};
const MFLIB={};let MFN=0;
function mfClip(p0,p1,lo,hi){let [x0,y0]=p0,[x1,y1]=p1;if((y0<lo&&y1<lo)||(y0>hi&&y1>hi))return null;
 const at=y=>[x0+(x1-x0)*(y-y0)/(y1-y0),y];if(y0<lo)[x0,y0]=at(lo);else if(y0>hi)[x0,y0]=at(hi);if(y1<lo)[x1,y1]=at(lo);else if(y1>hi)[x1,y1]=at(hi);return [[x0,y0],[x1,y1]]}
function mfPlot(o){o=o||{};const W=o.w||340,H=o.h||250,L=o.l||40,R=o.r||14,T=o.t||18,B=o.b||36,xm=o.xm||100,ym=o.ym||100,fs=o.fs||11,id=++MFN;
 const X=v=>L+v/xm*(W-L-R),Y=v=>H-B-v/ym*(H-T-B);let g='',defs='';const mk={};
 const P=a=>a.map(p=>X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1)).join(' ');
 const marker=c=>{const k=c.replace(/\W/g,'');if(!mk[k]){mk[k]=1;defs+=`<marker id="m${id}${k}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" fill="${c}"/></marker>`}return `m${id}${k}`};
 const a={X,Y,
  axes(xl,yl){g+=`<path class="ax" d="M${L} ${T-4}V${H-B}H${W-R+4}"/><text x="${W-R}" y="${H-B+Math.min(27,B-6)}" text-anchor="end" font-size="${fs}">${xl||''}</text><text transform="translate(${fs+1} ${(T+H-B)/2}) rotate(-90)" text-anchor="middle" font-size="${fs}">${yl||''}</text>`;return a},
  line(p,c,q){q=q||{};g+=`<polyline points="${P(p)}" fill="none" stroke="${c||MFC.k}" stroke-width="${q.w||2.2}" stroke-linecap="round" stroke-linejoin="round"${q.dash?` stroke-dasharray="${q.dash}"`:''}${q.op?` opacity="${q.op}"`:''}/>`;return a},
  seg(p0,p1,c,q,lo,hi){const s=mfClip(p0,p1,lo==null?0:lo,hi==null?ym:hi);if(s)a.line(s,c,q);return a},
  fn(f,x0,x1,c,q,n){n=n||60;let cur=[];const out=[];for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n,y=f(x);if(y>=0&&y<=ym)cur.push([x,y]);else if(cur.length){out.push(cur);cur=[]}}if(cur.length)out.push(cur);out.forEach(s=>a.line(s,c,q));return a},
  area(p,c,op,st){g+=`<polygon points="${P(p)}" fill="${c}" fill-opacity="${op||.18}" stroke="${st?c:'none'}" stroke-width="${st?1.2:0}"/>`;return a},
  guide(x,y,q){q=q||{};if(x!=null)g+=`<line class="gd" x1="${X(x)}" y1="${Y(y)}" x2="${X(x)}" y2="${Y(0)}"/>`;if(y!=null&&q.noy!==true)g+=`<line class="gd" x1="${X(0)}" y1="${Y(y)}" x2="${X(x)}" y2="${Y(y)}"/>`;
   if(q.xl)g+=`<text x="${X(x)}" y="${Y(0)+13}" text-anchor="middle" font-size="${fs}">${q.xl}</text>`;if(q.yl)g+=`<text x="${X(0)-5}" y="${Y(y)+4}" text-anchor="end" font-size="${fs}">${q.yl}</text>`;return a},
  hline(y,x0,x1,c,q){return a.line([[x0,y],[x1,y]],c,q)},
  dot(x,y,c,r){g+=`<circle cx="${X(x)}" cy="${Y(y)}" r="${r||3.6}" fill="${c||'currentColor'}"/>`;return a},
  txt(x,y,s,q){q=q||{};g+=`<text x="${X(x)+(q.dx||0)}" y="${Y(y)+(q.dy||0)}" text-anchor="${q.a||'start'}" font-size="${q.s||fs}"${q.c?` fill="${q.c}"`:''}${q.b?' font-weight="700"':''}${q.rot?` transform="rotate(${q.rot} ${X(x)+(q.dx||0)} ${Y(y)+(q.dy||0)})"`:''}>${s}</text>`;return a},
  arrow(p0,p1,c,q){q=q||{};c=c||MFC.k;g+=`<line x1="${X(p0[0])}" y1="${Y(p0[1])}" x2="${X(p1[0])}" y2="${Y(p1[1])}" stroke="${c}" stroke-width="${q.w||1.6}" marker-end="url(#${marker(c)})"${q.both?` marker-start="url(#${marker(c)})"`:''}${q.dash?` stroke-dasharray="${q.dash}"`:''}/>`;return a},
  title(s){g+=`<text x="${L+4}" y="${T-5}" font-size="${fs+1}" font-weight="700">${s}</text>`;return a},
  html(lab){return `<svg class="mfs" viewBox="0 0 ${W} ${H}" role="img" aria-label="${lab||'Diagram'}"><defs>${defs}</defs>${g}</svg>`}};
 return a}
const mfFig=(id,svgs,cap,grid)=>{MFLIB[id]={svgs:[].concat(svgs),cap,grid:grid||0}};
function mfHtml(id){const f=MFLIB[id];if(!f)return '';return `<figure class="mfig"><div class="mfp${f.grid?' g'+f.grid:''}">${f.svgs.join('')}</div><figcaption>${f.cap}</figcaption></figure>`}
/* standard demand and supply (Q 0..100, P 0..100), equilibrium at (50, 50) */
const mfD=(sh)=>q=>90-.8*(q-(sh||0)),mfS=(sh)=>q=>10+.8*(q-(sh||0));
const mfSD=(o)=>{const a=mfPlot(o);a.axes('Quantity','Price');return a};

/* ===== Chapter 1: What is economics? ===== */
{const bx=(x,y,w,h,lines,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${c}" fill-opacity=".14" stroke="${c}" stroke-width="1.5"/>`+lines.map((t,i)=>`<text x="${x+w/2}" y="${y+h/2+4+(i-(lines.length-1)/2)*14}" text-anchor="middle" font-weight="700">${t}</text>`).join('');
 const ar=(x1,y1,x2,y2,c)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="1.8" marker-end="url(#cf${c.slice(1)})"/>`;
 const lab=(x,y,an,lines,c)=>lines.map((t,i)=>`<text x="${x}" y="${y+i*12}" text-anchor="${an}" font-size="10.5" fill="${c}">${t}</text>`).join('');
 const defs=[MFC.d,MFC.s].map(c=>`<marker id="cf${c.slice(1)}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L8 4L0 8z" fill="${c}"/></marker>`).join('');
 const svg=`<svg class="mfs" viewBox="0 0 340 290" role="img" aria-label="Circular flow"><defs>${defs}</defs>${bx(115,8,110,36,['Firms'],MFC.s)}${bx(115,246,110,36,['Households'],MFC.d)}${bx(8,119,98,52,['Factor','markets'],MFC.g)}${bx(234,119,98,52,['Goods','markets'],MFC.o)}
 ${ar(128,246,56,173,MFC.d)}${ar(56,119,128,44,MFC.s)}${ar(212,44,284,119,MFC.s)}${ar(284,173,212,246,MFC.d)}
 ${lab(4,206,'start',['Labour, land,','capital'],MFC.d)}${lab(4,84,'start',['Wages, rent,','interest, profit'],MFC.s)}${lab(336,84,'end',['Goods and','services'],MFC.s)}${lab(336,206,'end',['Spending','on goods'],MFC.d)}</svg>`;
 mfFig('circ',[svg],'Circular flow: households supply factors of production to firms through factor markets and receive incomes; firms supply goods and services through goods markets and receive spending. Government and the rest of the world add more flows.')}

/* ===== Chapter 3: Demand and supply ===== */
{const a=mfSD({});a.fn(mfD(0),0,100,MFC.d);a.fn(mfD(15),0,100,MFC.d,{dash:'5 4'});a.fn(mfD(-15),0,100,MFC.d,{dash:'5 4'});
 a.txt(0,90,'D0',{c:MFC.d,b:1,dx:4,dy:-6});a.txt(15,90,'D1',{c:MFC.d,dx:4,dy:-6});a.txt(0,78,'D2',{c:MFC.d,dx:4,dy:14});
 a.dot(22,72);a.dot(42,56);a.arrow([23,71],[41,57],MFC.k);a.txt(32,60,'Move along D0',{dx:6,dy:30,s:10});
 a.arrow([75,30],[90,30],MFC.g);a.arrow([75,30],[60,30],MFC.s);a.txt(100,100,'Increase: shifts right',{c:MFC.g,a:'end',b:1,s:10,dy:-4});a.txt(100,92,'Decrease: shifts left',{c:MFC.s,a:'end',b:1,s:10,dy:-4});
 mfFig('d3a',[a.html('Demand shifts')],'A change in the price moves you along the same demand curve. A change in any other influence (income, prices of related goods, preferences, expectations, population) shifts the whole curve: right for an increase (D1), left for a decrease (D2).')}
{const a=mfSD({});a.fn(mfS(0),0,100,MFC.s);a.fn(mfS(15),15,100,MFC.s,{dash:'5 4'});a.fn(mfS(-15),0,100,MFC.s,{dash:'5 4'});
 a.txt(100,90,'S0',{c:MFC.s,b:1,a:'end',dx:2,dy:-6});a.txt(100,78,'S1',{c:MFC.s,a:'end',dx:2,dy:12});a.txt(94,100,'S2',{c:MFC.s,a:'end',dy:4});
 a.arrow([50,50],[65,50],MFC.g);a.arrow([50,50],[35,50],MFC.d);a.txt(0,100,'Increase: shifts right',{c:MFC.g,b:1,s:10,dy:-4,dx:4});a.txt(0,92,'Decrease: shifts left',{c:MFC.d,b:1,s:10,dy:-4,dx:4});
 mfFig('d3b',[a.html('Supply shifts')],'A change in the price moves you along the supply curve. A change in input prices, technology, the number of sellers, expectations or the prices of related goods in production shifts it: right for an increase (S1), left for a decrease (S2).')}
{const a=mfSD({});a.fn(mfD(0),0,100,MFC.d);a.fn(mfS(0),0,100,MFC.s);a.txt(100,10,'D',{c:MFC.d,b:1,dy:-6,dx:2,a:'end'});a.txt(100,90,'S',{c:MFC.s,b:1,dx:2,dy:-6,a:'end'});
 a.guide(50,50,{xl:'Q*',yl:'P*'});a.dot(50,50);
 a.dim=0;a.seg([25,70],[75,70],MFC.o,{w:1.4,dash:'4 3'});a.arrow([25,70],[75,70],MFC.o,{both:1});a.txt(50,70,'Surplus',{a:'middle',dy:-6,c:MFC.o,b:1});a.arrow([40,76],[40,62],MFC.o,{w:1.4});a.txt(40,75,'P falls',{a:'end',dx:-4,dy:4,s:10,c:MFC.o});
 a.seg([25,30],[75,30],MFC.o,{w:1.4,dash:'4 3'});a.arrow([25,30],[75,30],MFC.o,{both:1});a.txt(50,30,'Shortage',{a:'middle',dy:16,c:MFC.o,b:1});a.arrow([60,24],[60,38],MFC.o,{w:1.4});a.txt(60,24,'P rises',{dx:4,dy:2,s:10,c:MFC.o});
 mfFig('d3c',[a.html('Equilibrium')],'Equilibrium is where the curves cross. Above it, quantity supplied exceeds quantity demanded (a surplus) so the price falls; below it, a shortage pushes the price up.')}
{const cs=[['Demand and supply both increase',20,20],['Demand up, supply down',20,-20],['Demand down, supply up',-20,20],['Demand and supply both decrease',-20,-20]];
 const sv=cs.map(([t,dd,ss])=>{const a=mfPlot({w:200,h:175,l:22,r:8,t:26,b:20,fs:10});a.axes('Q','P');a.title(t.replace('Demand','D').replace('supply','S').replace('Demand','D'));
  a.fn(mfD(0),0,100,MFC.k,{w:1.4,op:.7});a.fn(mfS(0),0,100,MFC.k,{w:1.4,op:.7});a.fn(mfD(dd),0,100,MFC.d,{w:2});a.fn(mfS(ss),0,100,MFC.s,{w:2});
  const q=(100+0.8*dd+0.8*ss+0)/1.6*0+((90+.8*dd)-(10-.8*ss))/1.6,p=mfD(dd)(q);a.dot(50,50,MFC.k,3);a.dot(q,p,MFC.g,4);
  a.txt(q,p,(q>50.5?'Q↑':q<49.5?'Q↓':'Q ?')+' '+(p>50.5?'P↑':p<49.5?'P↓':'P ?'),{dx:6,dy:16,s:10,b:1,c:MFC.g});return a.html(t)});
 mfFig('d3d',sv,'Grey: original curves. Coloured: after the shifts. When demand and supply move in the same direction, quantity moves that way and the price effect is ambiguous; when they move in opposite directions the price moves with demand and the quantity effect is ambiguous. The sizes of the shifts decide the ambiguous one.',2)}

/* ===== Chapter 4: Elasticity ===== */
{const a=mfSD({});const f=q=>90-.9*q;a.fn(f,0,100,MFC.d);a.dot(50,45);a.guide(50,45,{xl:'',yl:''});
 a.area([[0,90],[50,45],[0,45]],MFC.g,.12);a.area([[50,45],[100,0],[50,0]],MFC.o,.12);
 a.txt(2,58,'Elastic  (|E| > 1)',{c:MFC.g,b:1,dx:4});a.txt(50,45,'|E| = 1 at the midpoint',{dx:8,dy:-8,b:1,s:10});a.txt(100,28,'Inelastic  (|E| < 1)',{c:MFC.o,b:1,a:'end',dx:-6});
 a.txt(0,90,'|E| = ∞',{dx:6,dy:-6,s:10,c:MFC.k});a.txt(100,0,'|E| = 0',{dx:2,dy:-8,a:'end',s:10,c:MFC.k});
 mfFig('e4a',[a.html('Elasticity along a linear demand curve')],'Along a straight-line demand curve the slope never changes but the elasticity does: elastic in the upper half, unit elastic at the midpoint, inelastic in the lower half. Elasticity is a ratio of percentage changes, not a slope.')}
{const mk=(t,f,lab)=>{const a=mfPlot({w:200,h:165,l:22,r:8,t:26,b:20,fs:10});a.axes('Q','P');a.title(t);f(a);return a.html(t)};
 mfFig('e4b',[
 mk('Perfectly inelastic',a=>{a.seg([50,0],[50,100],MFC.d);a.txt(50,90,'|E| = 0',{dx:6,s:10})}),
 mk('Inelastic',a=>{a.seg([30,95],[70,5],MFC.d);a.txt(50,50,'|E| < 1',{dx:10,s:10})}),
 mk('Unit elastic',a=>{a.fn(q=>2000/q,20,100,MFC.d);a.txt(50,40,'|E| = 1',{dx:10,dy:-6,s:10})}),
 mk('Elastic',a=>{a.seg([5,70],[95,30],MFC.d);a.txt(50,50,'|E| > 1',{dx:10,dy:-16,s:10})}),
 mk('Perfectly elastic',a=>{a.hline(50,0,100,MFC.d);a.txt(50,50,'|E| = ∞',{dx:0,dy:-8,a:'middle',s:10})})
 ],'Five demand cases. The flatter the curve, the more sensitive quantity is to price; vertical means quantity does not respond at all, horizontal means buyers will pay no more than one price.',2)}
{const T=mfPlot({w:340,h:190,t:20,b:14,ym:100});T.axes('','Price');T.fn(q=>90-.9*q,0,100,MFC.d);T.guide(50,45);T.txt(50,5,'Elastic ◀  ▶ Inelastic',{a:'middle',s:10,dy:-0,c:MFC.k});T.txt(98,12,'Demand',{c:MFC.d,a:'end',b:1});
 const B=mfPlot({w:340,h:190,t:20,b:34,ym:2200});B.axes('Quantity','Total revenue');B.fn(q=>q*(90-.9*q),0,100,MFC.g);B.guide(50,2025,{noy:true});B.dot(50,2025,MFC.g);B.txt(50,2025,'Maximum total revenue',{dx:8,dy:-8,b:1,c:MFC.g});
 B.txt(10,500,'Price cut raises TR',{c:MFC.g,s:10,dy:-24,dx:4});B.txt(100,900,'Price cut lowers TR',{c:MFC.o,s:10,a:'end',dx:-4});
 mfFig('e4c',[T.html('Demand'),B.html('Total revenue')],'Total revenue = price × quantity. When demand is elastic, cutting the price raises revenue; when it is inelastic, cutting the price lowers it. Revenue is highest where elasticity equals 1.')}
{const mk=(t,f)=>{const a=mfPlot({w:200,h:165,l:22,r:8,t:26,b:20,fs:10});a.axes('Q','P');a.title(t);f(a);return a.html(t)};
 mfFig('e4d',[
 mk('Perfectly inelastic',a=>{a.seg([50,0],[50,100],MFC.s)}),
 mk('Inelastic',a=>{a.seg([20,0],[100,80],MFC.s);a.txt(70,30,'ε < 1',{s:10,dx:8,dy:8})}),
 mk('Unit elastic',a=>{a.seg([0,0],[100,100],MFC.s);a.txt(70,70,'ε = 1',{s:10,dx:8,dy:14})}),
 mk('Elastic',a=>{a.seg([0,30],[100,80],MFC.s);a.txt(70,65,'ε > 1',{s:10,dx:8,dy:14})}),
 mk('Perfectly elastic',a=>{a.hline(50,0,100,MFC.s)})
 ],'Supply elasticity depends on how easily producers can raise output: a straight supply line through the origin is unit elastic; one that cuts the price axis is elastic; one that cuts the quantity axis is inelastic. In the short run supply is usually less elastic than in the long run.',2)}

/* ===== Chapter 5: Efficiency and equity ===== */
{const a=mfSD({});a.area([[0,90],[0,50],[50,50]],MFC.d,.22);a.area([[0,10],[0,50],[50,50]],MFC.s,.22);
 a.fn(mfD(0),0,100,MFC.d);a.fn(mfS(0),0,100,MFC.s);a.guide(50,50,{xl:'Q*',yl:'P*'});a.dot(50,50);
 a.txt(8,62,'Consumer surplus',{b:1,c:MFC.d,dx:2,dy:-0});a.txt(8,38,'Producer surplus',{b:1,c:MFC.s,dx:2,dy:6});
 a.txt(100,86,'Supply = marginal cost',{c:MFC.s,a:'end',s:10,dx:2,dy:-6});a.txt(100,16,'Demand = marginal benefit',{c:MFC.d,a:'end',s:10,dx:2,dy:-8});
 mfFig('f5a',[a.html('Consumer and producer surplus')],'Consumer surplus is what buyers would pay minus what they do pay (area under demand, above price). Producer surplus is what sellers receive minus their minimum acceptable price (area above supply, under price). Demand is marginal benefit; supply is marginal cost.')}
{const a=mfSD({});a.fn(mfD(0),0,100,MFC.d);a.fn(mfS(0),0,100,MFC.s);a.area([[30,66],[30,34],[50,50]],MFC.o,.3,1);a.area([[70,34],[70,66],[50,50]],MFC.o,.3,1);
 a.guide(30,50,{noy:true,xl:'Q1'});a.guide(70,50,{noy:true,xl:'Q2'});a.dot(50,50);a.txt(50,50,'Efficient quantity',{dx:2,dy:20,a:'middle',s:10,b:1});
 a.txt(30,66,'Under-production',{dx:-6,dy:-16,a:'middle',s:10,c:MFC.o,b:1});a.txt(30,66,'MB > MC',{dx:-6,dy:-4,a:'middle',s:10,c:MFC.o});
 a.txt(70,66,'Over-production',{dx:4,dy:-14,a:'middle',s:10,c:MFC.o,b:1});a.txt(70,66,'MC > MB',{dx:4,dy:-2,a:'middle',s:10,c:MFC.o});
 mfFig('f5b',[a.html('Deadweight loss')],'Efficiency means marginal benefit equals marginal cost. Below that quantity (Q1) the last unit is worth more than it costs but is not produced; above it (Q2) units cost more than they are worth. The orange triangles are the deadweight loss: surplus that disappears.')}

/* ===== Chapter 6: Government actions in markets ===== */
{const a=mfSD({});a.fn(mfD(0),0,100,MFC.d);a.fn(mfS(0),0,100,MFC.s);a.dot(50,50,MFC.k,3);
 a.hline(35,0,100,MFC.o,{dash:'6 4'});a.txt(0,35,'Rent ceiling',{c:MFC.o,dx:4,dy:-6,b:1});
 const qs=31.25,qd=68.75;a.guide(qs,35,{noy:true,xl:'Qs'});a.guide(qd,35,{noy:true,xl:'Qd'});a.dot(qs,35,MFC.s);a.dot(qd,35,MFC.d);
 a.arrow([qs,22],[qd,22],MFC.o,{both:1});a.txt(50,22,'Shortage',{a:'middle',dy:-5,c:MFC.o,b:1});
 a.seg([qs,35],[qs,65],MFC.k,{dash:'3 3',w:1});a.dot(qs,65,MFC.o);a.txt(qs,65,'Black-market rent',{dx:6,dy:-6,s:10,c:MFC.o,b:1});
 a.area([[qs,35],[qs,65],[50,50]],MFC.o,.25,1);a.txt(100,86,'Supply',{c:MFC.s,a:'end',b:1,dx:2,dy:-6});a.txt(100,10,'Demand',{c:MFC.d,a:'end',b:1,dx:2,dy:-6});
 mfFig('g6a',[a.html('Rent ceiling')],'A rent ceiling below the equilibrium rent leaves quantity demanded above quantity supplied: a housing shortage. Housing is allocated by queues and black markets, searching takes time, and the market is inefficient (shaded deadweight loss).')}
{const a=mfPlot({});a.axes('Quantity of labour','Wage rate');a.fn(mfD(0),0,100,MFC.d);a.fn(mfS(0),0,100,MFC.s);a.dot(50,50,MFC.k,3);
 a.hline(65,0,100,MFC.o,{dash:'6 4'});a.txt(2,65,'Minimum wage',{c:MFC.o,b:1,dy:-6,dx:4});
 const qd=31.25,qs=68.75;a.guide(qd,65,{noy:true,xl:'Ld'});a.guide(qs,65,{noy:true,xl:'Ls'});a.dot(qd,65,MFC.d);a.dot(qs,65,MFC.s);
 a.arrow([qd,78],[qs,78],MFC.o,{both:1});a.txt(50,78,'Unemployment',{a:'middle',dy:-5,c:MFC.o,b:1});
 a.txt(100,86,'Labour supply',{c:MFC.s,a:'end',b:1,dx:2,dy:-6});a.txt(100,10,'Labour demand',{c:MFC.d,a:'end',b:1,dx:2,dy:-6});
 mfFig('g6b',[a.html('Minimum wage')],'A minimum wage above the equilibrium wage reduces the quantity of labour demanded and raises the quantity supplied, so there is unemployment. Workers who keep their jobs gain; those who lose them, and firms, lose.')}
{const t=20,a=mfSD({});const S2=q=>10+t+.8*q;a.fn(mfD(0),0,100,MFC.d);a.fn(mfS(0),0,100,MFC.s);a.fn(q=>S2(q),0,100,MFC.s,{dash:'5 4'});
 const q1=37.5,pb=60,ps=40;a.dot(50,50,MFC.k,3);a.guide(q1,pb,{xl:'Q1',yl:'60'});a.hline(ps,0,q1,MFC.k,{w:1,dash:'3 3'});a.dot(q1,pb,MFC.d);a.dot(q1,ps,MFC.s);
 a.txt(0,ps,'40',{a:'end',dx:-5,dy:4,s:11});a.txt(0,50,'50',{a:'end',dx:-5,dy:4,s:11});a.hline(50,0,50,MFC.k,{w:1,dash:'3 3'});
 a.area([[0,ps],[q1,ps],[q1,pb],[0,pb]],MFC.g,.2);a.area([[q1,pb],[q1,ps],[50,50]],MFC.o,.3,1);
 a.txt(2,50,'Tax revenue',{b:1,c:MFC.g,dx:6,dy:-26,s:10});a.txt(q1,40,'Deadweight loss',{c:MFC.o,s:10,b:1,dx:8,dy:20});
 a.txt(100,86,'S',{c:MFC.s,b:1,a:'end',dx:2,dy:-6});a.txt(100,92,'S + tax',{c:MFC.s,a:'end',dx:2,dy:-8,b:1});a.txt(100,10,'D',{c:MFC.d,b:1,a:'end',dx:2,dy:-6});
 mfFig('g6c',[a.html('Tax')],'A tax on sellers shifts supply up by the tax (20). Buyers pay 60 (10 more than before), sellers keep 40 (10 less): the burden is shared. The green rectangle is tax revenue; the orange triangle is the deadweight loss.')}
{const mk=(t,ds,ss,note)=>{const a=mfPlot({w:200,h:190,l:22,r:8,t:26,b:20,ym:120,fs:10});a.axes('Q','P');a.title(t);const D=q=>50-ds*(q-50),S=q=>50+ss*(q-50),x=-20/(ds+ss),q1=50+x;
  a.fn(D,0,100,MFC.d);a.fn(S,0,100,MFC.s);a.fn(q=>S(q)+20,0,100,MFC.s,{dash:'5 4'});a.dot(50,50,MFC.k,3);const pb=D(q1),ps=S(q1);a.dot(q1,pb,MFC.g,3.6);a.dot(q1,ps,MFC.g,3.6);
  a.txt(q1,pb,'Pb',{dx:-8,dy:-8,s:10,b:1,c:MFC.g,a:'end'});a.txt(q1,ps,'Ps',{dx:-8,dy:14,s:10,b:1,c:MFC.g,a:'end'});
  a.txt(100,112,note,{a:'end',s:10,b:1,c:MFC.o});return a.html(t)};
 mfFig('g6d',[mk('Inelastic demand, elastic supply',1.5,.4,'Buyers pay most'),mk('Elastic demand, inelastic supply',.4,1.5,'Sellers pay most')],'Same tax of 20, different burden. The less elastic side of the market cannot easily walk away, so it bears more of the tax. Pb = price buyers pay, Ps = price sellers keep, P0 = price before the tax.',2)}
{const t=20,a=mfSD({});const q1=37.5;a.fn(mfD(0),0,100,MFC.d);a.fn(mfS(0),0,100,MFC.s);a.fn(q=>30+.8*q,0,100,MFC.s,{dash:'5 4'});
 a.area([[0,90],[0,60],[q1,60]],MFC.d,.25);a.area([[0,10],[0,40],[q1,40]],MFC.s,.25);a.area([[0,40],[q1,40],[q1,60],[0,60]],MFC.g,.22);a.area([[q1,60],[q1,40],[50,50]],MFC.o,.35,1);
 a.guide(q1,60,{xl:'Q1',noy:true});a.dot(50,50,MFC.k,3);
 a.txt(2,76,'Consumer surplus',{b:1,c:MFC.d,s:10,dx:4});a.txt(2,25,'Producer surplus',{b:1,c:MFC.s,s:10,dx:4,dy:4});a.txt(2,50,'Tax revenue',{b:1,c:MFC.g,s:10,dx:4,dy:4});a.txt(50,50,'Deadweight loss',{c:MFC.o,s:10,b:1,dx:8,dy:18});
 mfFig('g6e',[a.html('Taxes and efficiency')],'The tax cuts the quantity from 50 to 37.5. Consumer and producer surplus shrink; part of the loss becomes tax revenue, but the orange triangle is lost to everyone. The bigger the tax (and the more elastic the market), the bigger that loss.')}
{const a=mfSD({});const S2=q=>-10+.8*q;a.fn(mfD(0),0,100,MFC.d);a.fn(mfS(0),0,100,MFC.s);a.fn(S2,13,100,MFC.s,{dash:'5 4'});a.dot(50,50,MFC.k,3);
 const q1=62.5;a.guide(q1,40,{xl:'Q1',yl:'40'});a.hline(60,0,q1,MFC.k,{w:1,dash:'3 3'});a.txt(0,60,'60',{a:'end',dx:-5,dy:4});a.dot(q1,40,MFC.d);a.dot(q1,60,MFC.s);
 a.area([[50,50],[q1,60],[q1,40]],MFC.o,.35,1);a.txt(q1,60,'Over-production',{dx:-6,dy:-8,a:'end',s:10,b:1,c:MFC.o});
 a.txt(100,86,'S',{c:MFC.s,b:1,a:'end',dx:2,dy:-6});a.txt(100,72,'S + subsidy',{c:MFC.s,a:'end',dx:2,dy:12,b:1});a.txt(100,10,'D',{c:MFC.d,b:1,a:'end',dx:2,dy:-6});
 mfFig('g6f',[a.html('Subsidy')],'A subsidy of 20 shifts supply down. Buyers pay 40, sellers receive 60 (price plus subsidy), and output rises beyond the efficient quantity: marginal cost exceeds marginal benefit on the extra units (orange). A production quota does the opposite: it fixes output below the efficient level.')}
