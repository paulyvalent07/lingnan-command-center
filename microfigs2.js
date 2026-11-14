/* BUS2105 Micro diagrams, part 2: utility, preferences, costs (chapters 8, 9, 11). See microfigs.js for the helpers. */
const mfSmall=(t,xl,yl,o)=>{const a=mfPlot(Object.assign({w:200,h:170,l:24,r:8,t:26,b:22,fs:10},o||{}));a.axes(xl||'X',yl||'Y');if(t)a.title(t);return a};

/* ===== Chapter 8: Utility and demand ===== */
{const a=mfPlot({});a.axes('Movies (per month)','Cola (cans per month)');a.seg([0,80],[100,0],MFC.d);a.area([[0,0],[0,80],[100,0]],MFC.d,.1);
 a.txt(6,8,'Affordable',{c:MFC.d,b:1,dx:4});a.txt(62,76,'Unaffordable',{c:MFC.o,b:1});a.txt(100,0,'Budget line',{a:'end',dx:-2,dy:-26,c:MFC.d,b:1,s:10});
 a.dot(30,56,MFC.g);a.txt(30,56,'A (spends all income)',{dx:6,dy:-6,s:10});a.dot(20,30,MFC.k);a.txt(20,30,'B (money left over)',{dx:6,dy:14,s:10});a.dot(70,50,MFC.o);a.txt(70,50,'C',{dx:6,dy:-6});
 a.txt(0,80,'Income / price of cola',{dx:6,dy:-6,s:10,c:MFC.k});a.txt(100,0,'Income / price of movies',{a:'end',dx:0,dy:-10,s:10,c:MFC.k});
 mfFig('u8a',[a.html('Budget line')],'The budget line shows every combination of two goods the consumer can just afford. Points on it use all the income; points inside leave money unspent; points outside cannot be bought. The slope is the relative price: what you give up of one good to get one more of the other.')}
{const tu=q=>10*q-.5*q*q,A=mfPlot({w:340,h:190,t:20,b:34,xm:10,ym:55});A.axes('Quantity consumed','Total utility');A.title('Total utility');
 const pts=[];for(let q=0;q<=10;q+=.25)pts.push([q,tu(q)]);A.line(pts,MFC.g);for(let q=0;q<=10;q++)A.dot(q,tu(q),MFC.g,2.8);A.guide(10,50,{noy:true});A.txt(10,50,'Maximum (satiation)',{a:'end',dx:-6,dy:-8,s:10,b:1});
 const M=mfPlot({w:340,h:190,t:20,b:34,xm:10,ym:11});M.axes('Quantity consumed','Marginal utility');M.title('Marginal utility');
 for(let q=1;q<=10;q++){const m=tu(q)-tu(q-1);M.area([[q-.8,0],[q-.8,m],[q-.2,m],[q-.2,0]],MFC.o,.5)}
 M.fn(q=>10.5-q,.5,10.5,MFC.o,{w:1.6,dash:'4 3'});M.txt(10,11,'MU = 0 where TU peaks',{a:'end',dx:-4,dy:2,s:10,b:1});
 mfFig('u8b',[A.html('Total utility'),M.html('Marginal utility')],'Total utility rises as you consume more, but at a decreasing rate; marginal utility (the extra utility from one more unit) falls: the principle of diminishing marginal utility. When marginal utility hits zero, total utility is at its maximum.')}

/* ===== Chapter 9: Possibilities, preferences and choices ===== */
{const A=mfSmall('Price of movies doubles','Movies','Cola',{w:340,h:200,l:30,t:22,b:30,fs:11});A.seg([0,80],[100,0],MFC.k,{w:1.6,op:.8});A.seg([0,80],[50,0],MFC.d);A.txt(100,0,'BL0',{a:'end',dx:-4,dy:-8,s:10});A.txt(50,0,'BL1',{c:MFC.d,dx:-4,dy:-8,s:10,a:'end'});A.arrow([70,25],[40,25],MFC.d);A.txt(55,25,'pivots',{a:'middle',dy:-8,s:10,c:MFC.d});
 const B=mfSmall('Income changes','Movies','Cola',{w:340,h:200,l:30,t:22,b:30,fs:11});B.seg([0,80],[100,0],MFC.k,{w:1.6,op:.8});B.seg([0,100],[100,20],MFC.g);B.seg([0,60],[75,0],MFC.s);B.txt(100,20,'Income up',{a:'end',c:MFC.g,dx:0,dy:-8,s:10});B.txt(75,0,'Income down',{a:'end',c:MFC.s,dx:-6,dy:-8,s:10});B.txt(100,0,'BL0',{a:'end',dx:-2,dy:-8,s:10});
 mfFig('p9a',[A.html('Price change'),B.html('Income change')],'A change in price rotates the budget line around the intercept of the good whose price did not change. A change in income shifts it in parallel; the slope (relative price) stays the same.')}
{const a=mfPlot({});a.axes('Movies','Cola');[[1200,'I0'],[2400,'I1'],[3600,'I2']].forEach(([k,l])=>{a.fn(q=>k/q,k/100,100,MFC.p,{w:2});a.txt(100,k/100,l,{c:MFC.p,b:1,a:'end',dx:0,dy:-8})});
 a.dot(24,100,MFC.k);a.dot(60,40,MFC.k);a.txt(24,100,'A',{dx:6,dy:8});a.txt(60,40,'B',{dx:6,dy:-6});a.dot(60,60,MFC.g);a.txt(60,60,'C',{dx:6,dy:-6});
 mfFig('p9b',[a.html('Indifference curves')],'An indifference curve joins all combinations that give the same satisfaction (A and B). Curves further from the origin are preferred (C beats B). They slope downward, never cross, and are bowed toward the origin.')}
{const a=mfPlot({});a.axes('Movies','Cola');a.fn(q=>2400/q,24,100,MFC.p);const tg=(x,c,l)=>{const y=2400/x,m=-2400/(x*x),h=14;a.seg([x-h,y-m*h],[x+h,y+m*h],c,{w:1.8,dash:'4 3'},0,100);a.dot(x,y,c);a.txt(x,y,l,{dx:8,dy:-8,s:10,b:1,c})};
 tg(30,MFC.o,'MRS = 2.7');tg(60,MFC.g,'MRS = 0.7');
 mfFig('p9c',[a.html('MRS')],'The marginal rate of substitution (MRS) is the magnitude of the slope of the indifference curve: how much of one good you will give up for one more unit of the other. It falls as you move down the curve: diminishing MRS, which is why the curve is bowed.')}
{const mk=(t,f)=>{const a=mfSmall(t,'X','Y');f(a);return a.html(t)};
 mfFig('p9d',[
 mk('Close substitutes',a=>{a.fn(q=>100-q+8*Math.sin(q/16)*0+((q-50)*(q-50))/180,0,100,MFC.p)}),
 mk('Ordinary goods',a=>{a.fn(q=>2400/q,24,100,MFC.p)}),
 mk('Perfect substitutes',a=>{a.seg([0,80],[80,0],MFC.p);a.seg([0,50],[50,0],MFC.p,{w:1.4,op:.6})}),
 mk('Perfect complements',a=>{a.line([[35,100],[35,35],[100,35]],MFC.p);a.line([[20,100],[20,20],[100,20]],MFC.p,{w:1.4,op:.6})})
 ],'The more easily one good replaces another, the flatter and straighter the indifference curves. Perfect substitutes: straight lines (MRS constant). Perfect complements (left and right shoes): L-shaped curves.',2)}
{const a=mfPlot({});a.axes('Movies','Cola');a.seg([0,80],[100,0],MFC.d);a.fn(q=>2000/q,22,100,MFC.p);a.fn(q=>1000/q,10,100,MFC.p,{w:1.5,dash:'4 3',op:.7});a.fn(q=>3200/q,35,100,MFC.p,{w:1.5,dash:'4 3',op:.7});
 a.guide(50,40,{xl:'50',yl:'40'});a.dot(50,40,MFC.g,4.5);a.txt(50,40,'Best affordable choice',{dx:-2,dy:44,a:'end',b:1,c:MFC.g,s:10});a.txt(50,40,'MRS = relative price',{dx:-2,dy:57,a:'end',s:10});
 a.dot(14.6,68.5,MFC.k,3);a.dot(85.4,11.7,MFC.k,3);a.txt(100,1,'Budget line',{a:'end',c:MFC.d,dx:0,dy:-26,s:10,b:1});a.txt(100,98,'Dashed curves: lower (affordable) and higher (unaffordable)',{a:'end',s:9,c:MFC.k,dy:0});
 mfFig('p9e',[a.html('Best affordable choice')],'The best affordable choice is on the budget line at the point where an indifference curve just touches it (tangency). There the MRS equals the relative price. Points on lower curves are affordable but worse; higher curves are better but unaffordable.')}
{const A=mfPlot({w:340,h:230});A.axes('Movies','Cola');A.seg([0,80],[60,0],MFC.k,{w:1.6,op:.8});A.seg([0,80],[100,0],MFC.d);A.fn(q=>1200/q,15,100,MFC.p,{w:1.6});A.fn(q=>2000/q,25,100,MFC.p,{w:1.6});
 A.dot(30,40,MFC.k);A.dot(50,40,MFC.g);A.txt(30,40,'A',{dx:-12,dy:-6,b:1});A.txt(50,40,'B',{dx:8,dy:-6,b:1,c:MFC.g});A.arrow([31,40],[49,40],MFC.g,{dash:'3 3'});A.txt(40,40,'Price-consumption curve',{a:'middle',dy:24,s:10,c:MFC.g});A.txt(60,0,'BL0',{dx:-4,dy:-8,a:'end',s:10});A.txt(100,0,'BL1 (cheaper movies)',{a:'end',c:MFC.d,dy:-8,s:10});
 const D=mfPlot({w:340,h:200,ym:2});D.axes('Quantity of movies','Price of a movie');D.seg([10,1.867],[75,.133],MFC.d,{w:2},0,2);D.dot(30,1.33,MFC.k);D.dot(50,.8,MFC.g);D.txt(30,1.33,'A',{dx:8,dy:-6,b:1});D.txt(50,.8,'B',{dx:8,dy:-6,b:1,c:MFC.g});D.txt(75,.133,'Demand',{c:MFC.d,b:1,dx:2,dy:-10,a:'end'});
 mfFig('p9f',[A.html('Price change'),D.html('Demand curve')],'When the price of movies falls, the budget line pivots out and the best affordable choice moves from A to B. Plotting the price against the quantity chosen at each price traces out the demand curve.')}
{const a=mfPlot({w:340,h:260});a.axes('Movies','Cola');a.seg([0,80],[60,0],MFC.k,{w:1.6,op:.8});a.seg([0,80],[100,0],MFC.d);a.seg([0,62],[77.5,0],MFC.o,{dash:'5 4'});
 a.fn(q=>1200/q,15,100,MFC.p,{w:1.6});a.fn(q=>2000/q,25,100,MFC.p,{w:1.6});
 a.dot(30,40,MFC.k);a.dot(38.7,31,MFC.o);a.dot(50,40,MFC.g);a.txt(30,40,'A',{dx:-12,dy:-6,b:1});a.txt(38.7,31,'B',{dx:4,dy:18,b:1,c:MFC.o});a.txt(50,40,'C',{dx:8,dy:-6,b:1,c:MFC.g});
 a.arrow([31,38],[37.5,32],MFC.o);a.txt(100,98,'Substitution effect: A → B',{c:MFC.o,b:1,s:10,a:'end'});a.arrow([40,31],[49,39],MFC.g);a.txt(100,90,'Income effect: B → C',{c:MFC.g,b:1,s:10,a:'end'});
 a.txt(100,82,'Dashed line: slope of BL1,',{a:'end',s:9,c:MFC.o});a.txt(100,76,'touching the original curve',{a:'end',s:9,c:MFC.o});
 mfFig('p9g',[a.html('Substitution and income effects')],'A fall in the price of movies has two effects. Substitution effect (A to B): movies are relatively cheaper, so you substitute towards them, staying on the same indifference curve. Income effect (B to C): lower prices raise your real income, so you can reach a higher curve.')}

/* ===== Chapter 11: Output and costs ===== */
const mfMC=q=>4-.18*q+.003*q*q,mfAVC=q=>4-.09*q+.001*q*q,mfFC=120,mfATC=q=>mfAVC(q)+mfFC/q,mfTVC=q=>4*q-.09*q*q+.001*q*q*q;
{const L=[0,10,25,45,60,70,76,79,80],mp=L.map((v,i)=>i?v-L[i-1]:0),ap=L.map((v,i)=>i?v/i:0);
 const A=mfPlot({w:340,h:190,t:20,b:34,xm:8,ym:90});A.axes('Labour (workers)','Total product');A.title('Total product');A.line(L.map((v,i)=>[i,v]),MFC.g);L.forEach((v,i)=>A.dot(i,v,MFC.g,2.8));A.txt(2,25,'Increasing returns',{s:10,dx:-4,dy:-14,c:MFC.k});A.txt(5,70,'Diminishing returns',{s:10,dx:-18,dy:34,c:MFC.k});
 const B=mfPlot({w:340,h:190,t:20,b:34,xm:8,ym:24});B.axes('Labour (workers)','Product per worker');B.title('Marginal and average product');
 B.line(mp.slice(1).map((v,i)=>[i+.5,v]),MFC.o);B.line(ap.slice(1).map((v,i)=>[i+1,v]),MFC.d);B.txt(3.5,20,'MP',{c:MFC.o,b:1,dx:-12,dy:-8});B.txt(6,12.7,'AP',{c:MFC.d,b:1,dx:4,dy:-10});B.txt(4.5,23,'MP cuts AP at its maximum',{s:10,a:'start'});
 mfFig('c11a',[A.html('Total product'),B.html('MP and AP')],'In the short run extra workers share a fixed amount of capital. First marginal product rises (specialisation), then falls: the law of diminishing returns. Average product rises while MP is above it and falls when MP is below it, so MP crosses AP at its peak.')}
{const T=mfPlot({w:340,h:230,t:18,b:34,ym:700});T.axes('Output','Cost');T.hline(mfFC,0,100,MFC.k,{});const tvc=[],tc=[];for(let q=0;q<=100;q+=2){tvc.push([q,mfTVC(q)]);tc.push([q,mfFC+mfTVC(q)])}T.line(tvc,MFC.o);T.line(tc,MFC.d);
 T.txt(100,120,'TFC',{a:'end',dy:-6,b:1,c:MFC.k});T.txt(100,500,'TVC',{a:'end',dy:12,b:1,c:MFC.o});T.txt(100,620,'TC = TFC + TVC',{a:'end',dy:-8,b:1,c:MFC.d});
 mfFig('c11b',[T.html('Total costs')],'Total fixed cost (TFC) does not change with output. Total variable cost (TVC) rises with output, at first slowly then faster. Total cost is their sum, so the TC curve is the TVC curve lifted by the fixed cost.')}
{const a=mfPlot({w:340,h:270,ym:10});a.axes('Output','Cost per unit');
 a.fn(q=>mfMC(q),0,100,MFC.s,{w:2.4},90);a.fn(mfATC,12,100,MFC.d,{w:2.2},90);a.fn(mfAVC,0,100,MFC.g,{w:2.2},90);a.fn(q=>mfFC/q,12,100,MFC.p,{w:2},90);
 a.dot(45,mfAVC(45),MFC.g);a.dot(61,mfATC(61),MFC.d);a.guide(45,mfAVC(45),{noy:true});a.guide(61,mfATC(61),{noy:true});
 a.txt(84,mfMC(84),'MC',{c:MFC.s,b:1,dx:4,dy:-6});a.txt(100,mfATC(100),'ATC',{c:MFC.d,b:1,a:'end',dy:-8});a.txt(100,mfAVC(100),'AVC',{c:MFC.g,b:1,a:'end',dy:12});a.txt(13,mfFC/13,'AFC',{c:MFC.p,b:1,dx:6,dy:4});
 a.txt(45,mfAVC(45),'min AVC',{dx:-6,dy:-14,s:10,a:'end'});a.txt(61,mfATC(61),'min ATC',{dx:6,dy:-14,s:10});
 mfFig('c11c',[a.html('Cost curves')],'Average fixed cost (AFC) falls as output grows. ATC = AFC + AVC is U-shaped. MC cuts both AVC and ATC at their minimum points: when marginal cost is below the average the average falls, when it is above the average rises. MC is U-shaped because of diminishing returns.')}
{const mk=(t,f)=>{const a=mfSmall(t,'Output','Cost',{ym:10,w:340,h:230,l:30,t:22,b:32,fs:11});f(a);return a.html(t)};
 mfFig('c11d',[
 mk('Better technology',a=>{[[1,MFC.k,.6],[.75,MFC.s,1]].forEach(([k,c,o])=>{a.fn(q=>mfMC(q)*k,0,100,c,{op:o},90);a.fn(q=>mfATC(q)*k,12,100,MFC.d,{op:o},90)});a.txt(100,9.6,'Grey: before',{s:10,a:'end',c:MFC.k,b:1})}),
 mk('Higher fixed cost',a=>{a.fn(mfMC,0,100,MFC.s,{},90);a.fn(mfAVC,0,100,MFC.g,{},90);a.fn(mfATC,12,100,MFC.d,{op:.6},90);a.fn(q=>mfAVC(q)+170/q,15,100,MFC.d,{},90);a.txt(100,9.6,'ATC (two blues): before and after',{s:9,a:'end',c:MFC.k})})
 ],'A cost-saving technology lowers the marginal and average cost curves. A rise in a fixed cost (rent, equipment) shifts only the fixed cost curves: AFC and ATC move up, while MC and AVC do not change.')}
{const lr=q=>3+.0011*(q-55)*(q-55),d=q=>.0022*(q-55),a=mfPlot({w:340,h:250,ym:7});a.axes('Output','Cost per unit');a.fn(lr,10,100,MFC.s,{w:3});
 [20,38,55,75].forEach(k=>{const f=q=>lr(k)+d(k)*(q-k)+.0042*(q-k)*(q-k);a.fn(f,Math.max(5,k-26),Math.min(100,k+26),MFC.d,{w:1.6,op:.85},40);a.dot(k,lr(k),MFC.d,2.6)});
 a.txt(100,lr(100),'LRAC',{c:MFC.s,b:1,a:'end',dx:-4,dy:18});a.txt(50,6.7,'Blue: short-run curves (SRAC)',{c:MFC.d,s:10,a:'middle',b:1});
 a.txt(4,2.3,'Economies of scale',{s:10,b:1,c:MFC.g});a.txt(4,1.7,'(LRAC falling)',{s:10,c:MFC.g});a.txt(100,2.3,'Diseconomies of scale',{s:10,dx:0,b:1,c:MFC.o,a:'end'});a.txt(100,1.7,'(LRAC rising)',{s:10,c:MFC.o,a:'end'});a.guide(55,3,{noy:true,xl:'Minimum efficient scale'});
 mfFig('c11e',[a.html('Long-run average cost')],'Each short-run average cost curve (SRAC) is for a given plant size. The long-run average cost curve (LRAC) touches the lowest SRAC at each output. LRAC falls with economies of scale, bottoms out at the minimum efficient scale, then rises with diseconomies of scale.')}
