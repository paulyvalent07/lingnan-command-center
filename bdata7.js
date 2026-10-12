/* ================= BUS2105 · Microeconomics: shift it, solve it, compute the table ================= */
{
 const C=(id,title,stem,cols,items,min)=>({id,t:'cls',min:min||3,sec:'Active drills',title,stem:[stem],cols:cols.map(([h,opts])=>({h,opts})),items:items.map(([t,a,why])=>({t,a:Array.isArray(a)?a:[a],why}))});
 const K=(id,title,stem,parts,expl,min)=>({id,t:'calc',min:min||parts.length,sec:'Active drills',title,stem:Array.isArray(stem)?stem:[stem],parts,expl});
 const E=(id,title,stem,cols,eo,txs,min)=>({id,t:'eff',min:min||3,sec:'Active drills',title,stem:[stem],cols,eo,txs:txs.map(([text,e,note],i)=>({k:'('+'abcdefghij'[i]+')',text,e,note}))});
 const G=(id,title,stem,cols,rows,tol,expl,min)=>({id,t:'grid',min:min||3,sec:'Active drills',title,stem:Array.isArray(stem)?stem:[stem],cols,rows,tol,expl});
 const SH=[['R','Shifts right (increase)'],['L','Shifts left (decrease)'],['0','No shift: movement along the curve or nothing']];
 const EQ=[['+','Rises'],['-','Falls'],['?','Ambiguous']];

 BUILD['BUS2105:1']=[
  C('mi1-a','Positive or normative?','A positive statement says what is; a normative one says what ought to be.',
   [['Statement',['Positive','Normative']]],[
   ['A 10% rise in the minimum wage will reduce youth employment by 3%.','Positive','Testable, even if it turns out to be false.'],
   ['The minimum wage should be raised.','Normative'],
   ['Inflation was 3.2% last year.','Positive'],
   ['The government ought to reduce unemployment before it reduces inflation.','Normative'],
   ['Rent control reduces the quantity of housing supplied.','Positive'],
   ['Income should be shared more equally.','Normative']]),
  C('mi1-b','Key terms','Name the concept.',
   [['Concept',['Scarcity','Incentive','Microeconomics','Macroeconomics','Opportunity cost','Marginal benefit','Efficiency','Equity']]],[
   ['Our inability to satisfy all our wants.','Scarcity'],
   ['A reward that encourages an action or a penalty that discourages one.','Incentive'],
   ['The study of the choices of households and firms and how they interact in markets.','Microeconomics'],
   ['The study of national unemployment, inflation and growth.','Macroeconomics'],
   ['The best alternative forgone when a choice is made.','Opportunity cost'],
   ['The gain from consuming one more unit.','Marginal benefit'],
   ['No one can be made better off without making someone else worse off.','Efficiency'],
   ['Fair shares.','Equity']],5),
  C('mi1-c','Factors of production and their payment','Name the factor and the income it earns.',
   [['Factor',['Land','Labor','Capital','Entrepreneurship']],['Payment',['Rent','Wages','Interest','Profit']]],[
   ['A bakery’s ovens and delivery van.',['Capital','Interest']],
   ['The oil under a farm.',['Land','Rent']],
   ['The work time and effort of the bakery staff.',['Labor','Wages']],
   ['The owner who organises the other three and takes the risk.',['Entrepreneurship','Profit']]],4),
  K('mi1-d','Opportunity cost of a trip','Mia gives up a summer job paying $5,000 to go on a trip. The trip costs $2,000 for travel and accommodation. She would have paid $1,000 of rent whether she travels or not.',[
   {l:'Opportunity cost of the trip ($)',n:7000,pre:'$',x:'5,000 forgone pay + 2,000 trip cost = 7,000. The rent is paid either way, so it is not an opportunity cost.'}],
   null,1),
  G('mi1-e','Production possibility frontier: opportunity cost','An economy can produce these combinations. Work out the opportunity cost of each extra pizza, in burgers given up (the slope of the frontier).',
   [{h:'Point',g:true},{h:'Pizzas',g:true},{h:'Burgers',g:true},{h:'Opportunity cost of the extra pizza (burgers)'}],
   [['A',0,30,null],['B',1,28,2],['C',2,24,4],['D',3,18,6],['E',4,10,8],['F',5,0,10]],0.01,
   'The cost of one more pizza rises as more pizzas are made: resources are not equally good at both jobs. That is why the PPF bows outward.'),
  C('mi1-f','On or inside the frontier?','Using the frontier above, where is each point? (Points A–F are on the frontier.)',
   [['Position',['Attainable and efficient (on the PPF)','Attainable but inefficient (inside)','Unattainable (outside)']]],[
   ['3 pizzas and 18 burgers.','Attainable and efficient (on the PPF)'],
   ['3 pizzas and 10 burgers.','Attainable but inefficient (inside)'],
   ['4 pizzas and 20 burgers.','Unattainable (outside)','The frontier at 4 pizzas is 10 burgers.'],
   ['2 pizzas and 24 burgers.','Attainable and efficient (on the PPF)'],
   ['1 pizza and 20 burgers.','Attainable but inefficient (inside)']],4)];

 BUILD['BUS2105:3']=[
  E('mi3-a','Which curve shifts?','Pizza is a normal good. For each event in the pizza market, say what happens to the demand curve and to the supply curve.',
   ['Demand curve','Supply curve'],SH,[
   ['Consumers’ incomes rise.',['R','0']],
   ['The price of cheese, an ingredient, rises.',['0','L']],
   ['The price of burgers, a substitute, rises.',['R','0']],
   ['A faster oven technology is adopted.',['0','R']],
   ['The price of pizza itself falls.',['0','0'],'A change in the good’s own price moves us along the curves; it shifts neither.'],
   ['Producers expect the price of pizza to rise next month.',['0','L'],'Sellers hold back supply to sell later at the higher price.'],
   ['More pizzerias open.',['0','R']],
   ['The population grows.',['R','0']]],6),
  E('mi3-b','Predict the new equilibrium','For each pair of shifts, what happens to the equilibrium price and quantity?',
   ['Equilibrium price','Equilibrium quantity'],EQ,[
   ['Demand increases, supply unchanged.',['+','+']],
   ['Demand decreases, supply unchanged.',['-','-']],
   ['Supply increases, demand unchanged.',['-','+']],
   ['Supply decreases, demand unchanged.',['+','-']],
   ['Demand increases and supply increases.',['?','+'],'Both shifts raise quantity; they push price in opposite directions.'],
   ['Demand increases and supply decreases.',['+','?'],'Both shifts raise price; they push quantity in opposite directions.'],
   ['Demand decreases and supply increases.',['-','?']],
   ['Demand decreases and supply decreases.',['?','-']]],6),
  K('mi3-c','Find the equilibrium','Demand: Qd = 100 − 2P. Supply: Qs = 20 + 2P (quantities in thousands, price in dollars).',[
   {l:'Equilibrium price ($)',n:20,pre:'$',x:'100 − 2P = 20 + 2P → 80 = 4P → P = 20.'},
   {l:'Equilibrium quantity (thousands)',n:60,x:'100 − 40 = 60.'},
   {l:'At a price of $15, the shortage (thousands)',n:20,x:'Qd = 70, Qs = 50: shortage of 20, so the price rises.'},
   {l:'At a price of $25, the surplus (thousands)',n:20,x:'Qd = 50, Qs = 70: surplus of 20, so the price falls.'},
   {l:'Demand rises to Qd = 120 − 2P. New equilibrium price ($)',n:25,pre:'$',x:'120 − 2P = 20 + 2P → P = 25.'},
   {l:'New equilibrium quantity (thousands)',n:70,x:'20 + 2 × 25 = 70. A demand increase raised both price and quantity.'}]),
  C('mi3-d','Shift or movement along the curve?','Is each event a shift of a curve or a movement along it?',
   [['What happens',['Shift of demand','Shift of supply','Movement along demand','Movement along supply']]],[
   ['Income rises and people buy more of a normal good.','Shift of demand'],
   ['The price of the good falls and the quantity demanded rises.','Movement along demand'],
   ['A new technology lowers production costs.','Shift of supply'],
   ['The price rises and firms produce a larger quantity.','Movement along supply'],
   ['A fall in the price of a complement raises purchases of the good.','Shift of demand'],
   ['A drought raises farmers’ costs.','Shift of supply']],5),
  C('mi3-e','Shortage, surplus or equilibrium?','The equilibrium price is $20. What happens at each price, and which way does the price move?',
   [['Market state',['Shortage','Surplus','Equilibrium']],['Price pressure',['Rises','Falls','Stays']]],[
   ['The price is $14.',['Shortage','Rises']],
   ['The price is $26.',['Surplus','Falls']],
   ['The price is $20.',['Equilibrium','Stays']],
   ['Quantity demanded exceeds quantity supplied.',['Shortage','Rises']]],4)];

 BUILD['BUS2105:4']=[
  K('mi4-a','Price elasticity by the midpoint method','The price of a streaming plan falls from $10 to $8 and the quantity demanded rises from 40 to 60 (thousand subscribers).',[
   {l:'Average quantity (thousands)',n:50,x:'(40 + 60) ÷ 2.'},
   {l:'Percentage change in quantity (%)',n:40,u:'%',x:'20 ÷ 50 = 40%.'},
   {l:'Average price ($)',n:9,pre:'$',x:'(10 + 8) ÷ 2.'},
   {l:'Percentage change in price (%, absolute value)',n:22.22,u:'%',tol:.05,x:'2 ÷ 9 = 22.2%.'},
   {l:'Price elasticity of demand',n:1.8,tol:.02,ph:'0.0',x:'40 ÷ 22.2 = 1.8.'},
   {l:'Is demand elastic, inelastic or unit elastic?',opts:['Elastic','Inelastic','Unit elastic'],key:'Elastic',x:'PED > 1.'},
   {l:'Total revenue before ($000)',n:400,pre:'$',x:'10 × 40.'},
   {l:'Total revenue after ($000)',n:480,pre:'$',x:'8 × 60: a price cut raises revenue when demand is elastic.'}]),
  C('mi4-b','Elastic, inelastic or unit elastic?','Classify each case.',
   [['Demand is',['Perfectly inelastic','Inelastic','Unit elastic','Elastic','Perfectly elastic']]],[
   ['PED = 0 and the demand curve is vertical.','Perfectly inelastic'],
   ['PED = 0.4.','Inelastic'],
   ['PED = 1.','Unit elastic'],
   ['PED = 3.5.','Elastic'],
   ['PED is infinite and the demand curve is horizontal.','Perfectly elastic'],
   ['A 10% price rise cuts quantity demanded by 4%.','Inelastic'],
   ['A 5% price rise cuts quantity demanded by 20%.','Elastic']],5),
  C('mi4-c','Price change and total revenue','What happens to total revenue?',
   [['Demand is',['Elastic','Inelastic','Unit elastic']],['Total revenue',['Rises','Falls','Unchanged']]],[
   ['The price rises and total revenue falls.',['Elastic','Falls']],
   ['The price rises and total revenue rises.',['Inelastic','Rises']],
   ['The price falls and total revenue rises.',['Elastic','Rises']],
   ['The price falls and total revenue falls.',['Inelastic','Falls']],
   ['The price changes and total revenue stays the same.',['Unit elastic','Unchanged']]],4),
  C('mi4-d','What makes demand more or less elastic?','Is demand for each good likely to be more or less elastic?',
   [['Demand is',['More elastic','Less elastic']]],[
   ['A good with many close substitutes (one brand of cola).','More elastic'],
   ['A necessity (insulin).','Less elastic'],
   ['A luxury with a big share of the budget (a cruise).','More elastic'],
   ['A good over a long time period, when buyers can adjust.','More elastic'],
   ['A good over a very short time period.','Less elastic'],
   ['A broadly defined good (food) compared with a narrow one (pizza).','Less elastic']],5),
  K('mi4-e','Income and cross elasticities','Use the percentage changes to compute each elasticity.',[
   {l:'Income rises 8% and quantity demanded of a good rises 12%. Income elasticity',n:1.5,tol:.02,ph:'0.0',x:'12 ÷ 8 = 1.5.'},
   {l:'That good is…',opts:['Normal, income elastic','Normal, income inelastic','Inferior'],key:'Normal, income elastic',x:'Positive and above 1.'},
   {l:'Income rises 10% and the quantity of instant noodles falls 5%. Income elasticity',n:-0.5,signed:true,tol:.02,ph:'0.0',x:'−5 ÷ 10 = −0.5: negative, so inferior.'},
   {l:'The price of tea rises 10% and the quantity of coffee demanded rises 4%. Cross elasticity',n:0.4,tol:.02,ph:'0.0',x:'4 ÷ 10.'},
   {l:'Tea and coffee are…',opts:['Substitutes','Complements'],key:'Substitutes',x:'Positive cross elasticity.'}]),
  C('mi4-f','Elasticity of supply','Is supply more or less elastic?',
   [['Supply is',['More elastic','Less elastic']]],[
   ['Output can easily be increased by using spare capacity.','More elastic'],
   ['A good that needs scarce inputs and a long time to produce (a fine wine).','Less elastic'],
   ['A long period after a price change, when firms can build new plants.','More elastic'],
   ['A short period after a price change.','Less elastic']],3)];

 BUILD['BUS2105:5']=[
  K('mi5-a','Surplus and efficiency','Marginal benefit: P = 12 − Q. Marginal cost: P = 2 + Q (Q in units, P in dollars).',[
   {l:'Equilibrium quantity',n:5,x:'12 − Q = 2 + Q → Q = 5.'},
   {l:'Equilibrium price ($)',n:7,pre:'$',x:'12 − 5 = 7.'},
   {l:'Consumer surplus ($)',n:12.5,pre:'$',x:'Triangle: ½ × 5 × (12 − 7) = 12.5.'},
   {l:'Producer surplus ($)',n:12.5,pre:'$',x:'Triangle: ½ × 5 × (7 − 2) = 12.5.'},
   {l:'Total surplus ($)',n:25,pre:'$'},
   {l:'A quota limits output to 3 units. Marginal benefit at Q = 3 ($)',n:9,pre:'$',x:'12 − 3.'},
   {l:'Marginal cost at Q = 3 ($)',n:5,pre:'$',x:'2 + 3.'},
   {l:'Deadweight loss ($)',n:4,pre:'$',x:'Triangle: ½ × (5 − 3) × (9 − 5) = 4. Units 4 and 5 are worth more than they cost but are not produced.'}]),
  C('mi5-b','Resource allocation methods','Which allocation method is each?',
   [['Method',['Market price','Command','Majority rule','Contest','First-come first-served','Lottery','Personal characteristics','Force']]],[
   ['Tickets go to whoever queues first.','First-come first-served'],
   ['A manager tells staff which tasks to do.','Command'],
   ['Voters choose how to spend the city budget.','Majority rule'],
   ['The prize goes to the best entry.','Contest'],
   ['Winners are drawn at random.','Lottery'],
   ['Seats are offered to those who can pay the highest price.','Market price'],
   ['A job is given to the person who is related to the owner.','Personal characteristics'],
   ['Resources are taken by theft or war.','Force']],6),
  C('mi5-c','Over- or underproduction?','Compare marginal social benefit (MSB) with marginal social cost (MSC) at the quantity produced.',
   [['Outcome',['Efficient','Underproduction','Overproduction']]],[
   ['MSB is greater than MSC.','Underproduction'],
   ['MSB is less than MSC.','Overproduction'],
   ['MSB equals MSC.','Efficient'],
   ['A pollution cost is not paid by the producer, so private cost is below social cost.','Overproduction'],
   ['A price ceiling restricts quantity below the equilibrium.','Underproduction'],
   ['A subsidy pushes output beyond the equilibrium.','Overproduction']],5),
  C('mi5-d','Consumer or producer surplus?','Which surplus is described?',
   [['Surplus',['Consumer surplus','Producer surplus']]],[
   ['The value received in excess of the price paid.','Consumer surplus'],
   ['The amount received in excess of the minimum supply price.','Producer surplus'],
   ['The area under the demand curve and above the price.','Consumer surplus'],
   ['The area above the supply curve and below the price.','Producer surplus']],3),
  K('mi5-e','Surplus from willingness to pay','A pizza sells at $5. Marie’s willingness to pay for her 1st, 2nd, 3rd and 4th slices is $10, $8, $6 and $4.',[
   {l:'Slices Marie buys',n:3,x:'She buys while her willingness to pay is at least $5.'},
   {l:'Her consumer surplus ($)',n:9,pre:'$',x:'(10 − 5) + (8 − 5) + (6 − 5) = 9.'},
   {l:'The price falls to $4. Her slices',n:4},
   {l:'Her new consumer surplus ($)',n:12,pre:'$',x:'(10 − 4) + (8 − 4) + (6 − 4) + (4 − 4) = 12.'}],null,4)];

 BUILD['BUS2105:6']=[
  K('mi6-a','A tax on sellers','Demand: Qd = 100 − 2P. Supply: Qs = 20 + 2P. The equilibrium without tax is P = $20 and Q = 60. Sellers now have to pay a $4 tax per unit.',[
   {l:'New price paid by buyers ($)',n:22,pre:'$',x:'100 − 2P = 20 + 2(P − 4) → 100 − 2P = 12 + 2P → P = 22.'},
   {l:'Price received by sellers after the tax ($)',n:18,pre:'$',x:'22 − 4.'},
   {l:'New quantity',n:56,x:'100 − 2 × 22.'},
   {l:'Tax paid by buyers per unit ($)',n:2,pre:'$',x:'22 − 20.'},
   {l:'Tax borne by sellers per unit ($)',n:2,pre:'$',x:'20 − 18. Equal slopes mean an equal split.'},
   {l:'Government tax revenue ($)',n:224,pre:'$',x:'4 × 56.'},
   {l:'Deadweight loss ($)',n:8,pre:'$',x:'½ × 4 × (60 − 56).'}]),
  K('mi6-b','The cigarette tax','Without a tax, cigarettes sell at $6 a pack and 350 million packs a year. A $3 tax per pack is introduced. Buyers then pay $8, sellers receive $5 and 325 million packs are sold.',[
   {l:'Tax wedge per pack ($)',n:3,pre:'$',x:'8 − 5.'},
   {l:'Burden on buyers per pack ($)',n:2,pre:'$',x:'8 − 6.'},
   {l:'Burden on sellers per pack ($)',n:1,pre:'$',x:'6 − 5.'},
   {l:'Share of the tax borne by buyers (%)',n:66.7,u:'%',tol:.5,x:'2 ÷ 3. Buyers bear more because their demand is less elastic than supply.'},
   {l:'Tax revenue (million dollars)',n:975,pre:'$',x:'3 × 325.'}]),
  C('mi6-c','Binding or not? Result','The equilibrium price is $20. Is the rule binding, and what does it cause?',
   [['Binding?',['Binding','Not binding']],['Result',['Shortage','Surplus (unemployment)','No effect']]],[
   ['A rent ceiling of $15.',['Binding','Shortage']],
   ['A rent ceiling of $25.',['Not binding','No effect']],
   ['A minimum wage of $25 (equilibrium wage $20).',['Binding','Surplus (unemployment)']],
   ['A minimum wage of $15 (equilibrium wage $20).',['Not binding','No effect']]],4),
  C('mi6-d','Who bears more of the tax?','Tax incidence depends on elasticity, not on who pays the government.',
   [['Bears more of the tax',['Buyers','Sellers','Equal split']]],[
   ['Demand is less elastic than supply.','Buyers'],
   ['Supply is less elastic than demand.','Sellers'],
   ['Demand and supply are equally elastic.','Equal split'],
   ['Demand is perfectly inelastic.','Buyers','Buyers cannot reduce purchases, so the whole tax passes to them.'],
   ['Supply is perfectly inelastic.','Sellers']],4),
  C('mi6-e','Government actions','Name the policy or the effect.',
   [['Concept',['Price ceiling','Price floor','Tax wedge','Production quota','Subsidy','Black market','Search activity']]],[
   ['A regulated maximum price.','Price ceiling'],
   ['A regulated minimum price (minimum wage).','Price floor'],
   ['The gap between the price buyers pay and the price sellers receive.','Tax wedge'],
   ['A limit on the quantity a firm may produce.','Production quota'],
   ['A payment from the government to producers that encourages overproduction.','Subsidy'],
   ['An illegal market where the ceiling price is evaded.','Black market'],
   ['Time spent looking for housing when rent is capped.','Search activity']],5)];

 BUILD['BUS2105:8']=[
  G('mi8-a','Ben’s total utility','Ben has $32 a month. E-books cost $8; coffee costs $4. His marginal utility is 40, 32, 24, 16 for the 1st–4th e-book and 20, 16, 14, 12, 10, 8, 6, 4 for the 1st–8th coffee. Each row spends exactly $32. Compute total utility from each good and overall.',
   [{h:'Combination',g:true},{h:'Total utility from e-books'},{h:'Total utility from coffee'},{h:'Total utility'}],
   [['0 e-books, 8 coffees',0,90,90],['1 e-book, 6 coffees',40,80,120],['2 e-books, 4 coffees',72,62,134],['3 e-books, 2 coffees',96,36,132],['4 e-books, 0 coffees',112,0,112]],0.01,
   'Total utility is the sum of the marginal utilities. Ben’s best affordable choice is 2 e-books and 4 coffees (134).',5),
  G('mi8-b','Marginal utility per dollar','Compute the marginal utility per dollar of each extra unit (MU ÷ price). E-book price $8; coffee price $4.',
   [{h:'Unit',g:true},{h:'E-book MU',g:true},{h:'E-book MU per $'},{h:'Coffee MU',g:true},{h:'Coffee MU per $'}],
   [['1st',40,5,20,5],['2nd',32,4,16,4],['3rd',24,3,14,3.5],['4th',16,2,12,3]],0.01,
   'At 2 e-books and 4 coffees, the next e-book offers 3 per dollar and the last coffee 3 per dollar: equal, hence equilibrium.',4),
  K('mi8-c','Utility-maximising rule','Use your tables.',[
   {l:'MU per dollar of the 3rd e-book',n:3,x:'24 ÷ 8.'},
   {l:'MU per dollar of the 4th coffee',n:3,x:'12 ÷ 4.'},
   {l:'Ben’s utility-maximising combination',opts:['0 e-books, 8 coffees','1 e-book, 6 coffees','2 e-books, 4 coffees','3 e-books, 2 coffees'],key:'2 e-books, 4 coffees',x:'The ratios are equal and the budget is used up.'},
   {l:'Maximum total utility',n:134}]),
  C('mi8-d','Which way should the consumer move?','Compare the marginal utility per dollar of goods X and Y.',
   [['Advice',['Buy more X, less Y','Buy more Y, less X','Stay: equilibrium']]],[
   ['MUx/Px = 5 and MUy/Py = 3.','Buy more X, less Y'],
   ['MUx/Px = 2 and MUy/Py = 4.','Buy more Y, less X'],
   ['MUx/Px = 3 and MUy/Py = 3 and the whole budget is spent.','Stay: equilibrium'],
   ['MUx = 24, Px = $8 and MUy = 8, Py = $4.','Buy more X, less Y','24 ÷ 8 = 3 and 8 ÷ 4 = 2.']],4),
  C('mi8-e','Utility concepts','Name the concept.',
   [['Concept',['Total utility','Marginal utility','Diminishing marginal utility','Budget line','Marginal utility per dollar']]],[
   ['The total satisfaction from all units consumed.','Total utility'],
   ['The extra satisfaction from one more unit.','Marginal utility'],
   ['Marginal utility falls as more of a good is consumed.','Diminishing marginal utility'],
   ['The limit of affordable combinations of two goods.','Budget line'],
   ['MU divided by price.','Marginal utility per dollar']])];

 BUILD['BUS2105:9']=[
  K('mi9-a','Lisa’s budget line','Lisa has $40. A movie costs $8 and a can of soda costs $4. Movies are on the horizontal axis.',[
   {l:'Maximum movies if she buys no soda',n:5,x:'40 ÷ 8.'},
   {l:'Maximum soda if she sees no movie',n:10,x:'40 ÷ 4.'},
   {l:'Relative price of a movie (soda given up per movie)',n:2,x:'8 ÷ 4 = slope of the budget line.'},
   {l:'Income falls to $24. Maximum movies',n:3,x:'24 ÷ 8: the line shifts inward, parallel.'},
   {l:'Income back to $40; the movie price falls to $4. Maximum movies',n:10,x:'40 ÷ 4.'},
   {l:'Then the maximum soda is',n:10,x:'Unchanged: the line rotates around the soda intercept.'},
   {l:'At her best affordable point, her MRS equals',n:2,x:'MRS = relative price = 8/4 (original prices).'}],null,5),
  C('mi9-b','How does the budget line move?','Movies are on the horizontal axis and soda on the vertical axis.',
   [['Budget line',['Parallel shift outward','Parallel shift inward','Rotates: movie intercept changes','Rotates: soda intercept changes','Does not change']]],[
   ['Income falls, prices unchanged.','Parallel shift inward'],
   ['Income rises, prices unchanged.','Parallel shift outward'],
   ['The price of a movie rises.','Rotates: movie intercept changes'],
   ['The price of soda falls.','Rotates: soda intercept changes'],
   ['Income and both prices double.','Does not change','Real income and relative price are both unchanged.']],4),
  C('mi9-c','Substitution and income effects','A price fall makes the good cheaper. What happens to the quantity bought because of each effect?',
   [['Substitution effect',['Increases quantity','Decreases quantity']],['Income effect',['Increases quantity','Decreases quantity']]],[
   ['The price of a normal good falls.',['Increases quantity','Increases quantity']],
   ['The price of an inferior good falls.',['Increases quantity','Decreases quantity'],'The negative income effect works against the substitution effect, but normally does not dominate.'],
   ['Real income has risen and the good is normal.',['Increases quantity','Increases quantity']]],3),
  C('mi9-d','Preferences','Name the concept.',
   [['Concept',['Budget equation','Real income','Relative price','Indifference curve','Marginal rate of substitution','Giffen good']]],[
   ['Px·Qx + Py·Qy = Y.','Budget equation'],
   ['Income expressed as a quantity of goods.','Real income'],
   ['The price of one good divided by the price of another.','Relative price'],
   ['A line joining combinations the consumer finds equally satisfying.','Indifference curve'],
   ['The rate at which a person will give up one good to get another and stay equally satisfied.','Marginal rate of substitution'],
   ['A good whose demand curve slopes upward because the income effect dominates.','Giffen good']],5)];

 BUILD['BUS2105:11']=[
  G('mi11-a','Product curves','A knitting firm hires workers. Compute marginal product (MP = change in TP) and average product (AP = TP ÷ workers).',
   [{h:'Workers',g:true},{h:'Total product',g:true},{h:'Marginal product'},{h:'Average product'}],
   [[1,10,10,10],[2,25,15,12.5],[3,35,10,11.67],[4,42,7,10.5],[5,45,3,9]],0.05,
   'MP rises at first (specialisation), then falls: diminishing marginal returns set in after the 2nd worker. AP is at its highest where MP crosses it.',4),
  G('mi11-b','Cost table','Fixed cost is $100. Complete the cost table.',
   [{h:'Output',g:true},{h:'Total fixed cost',g:true},{h:'Total variable cost',g:true},{h:'Total cost'},{h:'Marginal cost'},{h:'Average fixed cost'},{h:'Average variable cost'},{h:'Average total cost'}],
   [[1,100,50,150,50,100,50,150],[2,100,80,180,30,50,40,90],[3,100,120,220,40,33.33,40,73.33],[4,100,180,280,60,25,45,70],[5,100,260,360,80,20,52,72]],0.05,
   'Marginal cost cuts average variable cost and average total cost at their minimum points. ATC is lowest at an output of 4 here (70) and MC (80 at the 5th unit) is then above ATC.',6),
  C('mi11-c','Fixed or variable? Short or long run?','Classify each cost in the short run.',
   [['Cost',['Fixed cost','Variable cost','Sunk cost']]],[
   ['Rent on the factory building.','Fixed cost'],
   ['Wages of the extra workers hired for the weekend shift.','Variable cost'],
   ['Cotton bought for the next batch.','Variable cost'],
   ['The money already spent on a custom machine that cannot be resold.','Sunk cost','Sunk costs are irrelevant to current decisions.'],
   ['Insurance premium on the plant.','Fixed cost']],4),
  C('mi11-d','Cost curve relationships','What happens to the average cost when the marginal cost is where it is?',
   [['Average cost is',['Falling','Rising','At its minimum']]],[
   ['MC is below ATC.','Falling'],
   ['MC is above ATC.','Rising'],
   ['MC equals ATC.','At its minimum'],
   ['MC is below AVC.','Falling']],3),
  C('mi11-e','Returns and scale','Name the concept.',
   [['Concept',['Diminishing marginal returns','Economies of scale','Constant returns to scale','Diseconomies of scale','Short run','Long run']]],[
   ['A time frame in which at least one resource, usually plant size, is fixed.','Short run'],
   ['A time frame in which all resources can be varied.','Long run'],
   ['Marginal product falls as more labor is added to a fixed plant.','Diminishing marginal returns'],
   ['Long-run average cost falls as plant size increases.','Economies of scale'],
   ['Long-run average cost is flat as plant size increases.','Constant returns to scale'],
   ['Long-run average cost rises as plant size increases.','Diseconomies of scale']],5),
  K('mi11-f','Choosing the plant','To make 13 sweaters a day, the average total cost is $7.69 with 1 machine, $6.80 with 2, $7.69 with 3 and $9.50 with 4.',[
   {l:'The least-cost plant for 13 sweaters a day',opts:['1 machine','2 machines','3 machines','4 machines'],key:'2 machines',x:'Lowest ATC.'},
   {l:'Total cost of 13 sweaters with that plant ($)',n:88.4,pre:'$',tol:.2,x:'6.80 × 13 = 88.40. This point lies on the long-run average cost curve.'}],null,2)];
}
