/* ================= NEW CHAPTERS · built exercises added by the weekly Moodle update =================
   One block per new chapter:  BUILD['BUS2205:4']=[ C(...), K(...), E(...), G(...) ];
   (key = COURSE:chapter number, same as the lesson id in content.js). See BUILDERS.md for the format.
   Check with:  node validate_b.js   (must print ALL OK) */
{
 const C=(id,title,stem,cols,items,min)=>({id,t:'cls',min:min||3,sec:'Active drills',title,stem:[stem],cols:cols.map(([h,opts])=>({h,opts})),items:items.map(([t,a,why])=>({t,a:Array.isArray(a)?a:[a],why}))});
 const K=(id,title,stem,parts,expl,min)=>({id,t:'calc',min:min||parts.length,sec:'Active drills',title,stem:Array.isArray(stem)?stem:[stem],parts,expl});
 const E=(id,title,stem,cols,eo,txs,min)=>({id,t:'eff',min:min||3,sec:'Active drills',title,stem:[stem],cols,eo,txs:txs.map(([text,e,note],i)=>({k:'('+'abcdefghij'[i]+')',text,e,note}))});
 const G=(id,title,stem,cols,rows,tol,expl,min)=>({id,t:'grid',min:min||3,sec:'Active drills',title,stem:Array.isArray(stem)?stem:[stem],cols,rows,tol,expl});
 /* ---- new chapters go below ---- */

 /* ================= BUS1103 · Chapter 7 (part 1): inventory and cost of goods sold ================= */
 const Cr=(a,n)=>({a,n,s:'C'});
 BUILD['BUS1103:7']=[
  C('b7-a','What goes into the cost of inventory?','Inventory is recorded at all costs needed to bring an item to a usable, salable condition and location. Decide how each item is treated.',
   [['Treatment',['Added to inventory cost','Deducted from inventory cost','Not inventory cost (period expense)']]],[
   ['Invoice price of the merchandise','Added to inventory cost'],
   ['Freight-in (FOB shipping point, paid by the buyer)','Added to inventory cost'],
   ['Inspection and preparation costs before the goods can be sold','Added to inventory cost'],
   ['Purchase returns and allowances','Deducted from inventory cost','They reduce what was paid for the goods.'],
   ['Purchase discounts taken for early payment','Deducted from inventory cost','The discount reduces the cost of inventory; it is not a revenue.'],
   ['Sales commissions paid to the company’s own sales staff','Not inventory cost (period expense)','Selling costs go to SG&A.'],
   ['Advertising for the product','Not inventory cost (period expense)','Selling costs go to SG&A.'],
   ['General administrative salaries','Not inventory cost (period expense)','Not needed to bring the goods to a salable condition.'],
   ['Freight-out to deliver goods to customers','Not inventory cost (period expense)','Delivery to customers is a selling cost.']],6),
  C('b7-b','Perpetual or periodic? FOB point?','Classify each statement.',
   [['Concept',['Perpetual system','Periodic system','FOB shipping point','FOB destination']]],[
   ['Records are updated continuously for every purchase and sale; the system used in this course.','Perpetual system'],
   ['Records are updated only at the end of the period; rare today and not covered here.','Periodic system'],
   ['The buyer pays and owns the goods in transit, so freight is added to Inventory.','FOB shipping point'],
   ['The seller keeps title and risk in transit and pays the shipping cost itself.','FOB destination'],
   ['Each sale needs two entries: the revenue and the cost of goods sold.','Perpetual system']],4),
  {id:'b7-c',t:'je',min:7,sec:'Active drills',title:'Purchases, returns, discounts, freight and sales (perpetual system)',
   stem:['Record each event as a journal entry under the perpetual inventory system. Use Inventory for merchandise and Cost of goods sold when goods are sold.'],
   txs:[
    TX('(a)','Coral Supplies buys $4,000 of merchandise on account, terms 2/10, n/30.',[D('Inventory',4000),Cr('Accounts payable',4000)],'A purchase simply increases Inventory.'),
    TX('(b)','Three days later Coral returns $400 of defective merchandise to the supplier before paying.',[D('Accounts payable',400),Cr('Inventory',400)],'A return reduces both Inventory and Accounts payable.'),
    TX('(c)','Coral pays the remaining balance within the discount period.',[D('Accounts payable',3600),Cr('Cash',3528),Cr('Inventory',72)],'The discount applies only to what is still owed: 2% × $3,600 = $72 reduces Inventory. Cash paid = $3,600 − $72 = $3,528.'),
    TX('(d)','Z-Mart owes $1,200 for merchandise bought on account (terms 2/10, n/30) and pays within the 10 days.',[D('Accounts payable',1200),Cr('Cash',1176),Cr('Inventory',24)],'2% × $1,200 = $24. The discount reduces the cost of inventory (not a revenue).'),
    TX('(e)','The buyer pays $150 cash for freight on goods bought FOB shipping point.',[D('Inventory',150),Cr('Cash',150)],'Freight-in is part of the cost of inventory.'),
    TX('(f)','Palmdale sells merchandise for $5,500 cash; the merchandise had cost $3,850.',[D('Cash',5500),Cr('Sales revenue',5500),D('Cost of goods sold',3850),Cr('Inventory',3850)],'Two entries: revenue received, then the cost of the goods sold.'),
    TX('(g)','Z-Mart sells $2,400 of merchandise on credit; the merchandise cost $1,600.',[D('Accounts receivable',2400),Cr('Sales revenue',2400),D('Cost of goods sold',1600),Cr('Inventory',1600)],'Gross profit on this sale = 2,400 − 1,600 = $800.')]},
  K('b7-d','Cost of goods sold equation','Beginning inventory + Purchases − Ending inventory = Cost of goods sold.',[
   {l:'Riverside Hardware: BI $62,000, purchases $184,000 (net, freight-in included), EI $48,000. Goods available for sale',n:246000,pre:'$',x:'62,000 + 184,000.'},
   {l:'Riverside Hardware: cost of goods sold',n:198000,pre:'$',x:'246,000 − 48,000.'},
   {l:'Palmdale: sales $5,500, cost $3,850. Gross profit',n:1650,pre:'$',x:'5,500 − 3,850.'},
   {l:'A shop has BI $30,000, purchases $70,000 and COGS $64,000. Ending inventory',n:36000,pre:'$',x:'EI = BI + purchases − COGS = 100,000 − 64,000.'},
   {l:'Supplier invoice $2,500, terms 2/10, n/30, paid on day 8. Cash paid',n:2450,pre:'$',x:'Discount 2% × 2,500 = 50; cash = 2,450.'}],'The equation links the income statement (COGS) and the balance sheet (ending inventory).',4),
  E('b7-e','Choosing a cost flow method','Which way does the method change each figure, comparing FIFO and LIFO?',['Cost of goods sold','Ending inventory','Net income'],[['H','Higher'],['L','Lower'],['=','Same']],[
   ['Prices are rising: FIFO compared with LIFO.',['L','H','H'],'FIFO sends the oldest, cheaper costs to COGS and keeps the newest, dearer costs in inventory.'],
   ['Prices are rising: LIFO compared with FIFO.',['H','L','L'],'LIFO sends the newest, dearer costs to COGS.'],
   ['Prices are falling: FIFO compared with LIFO.',['H','L','L'],'With falling prices the oldest costs are the highest, so FIFO gives higher COGS.'],
   ['Prices stay constant: FIFO compared with LIFO.',['=','=','='],'With constant unit costs every method gives the same result.']],4),
  C('b7-f','Which costing method?','Match each description to a method.',
   [['Method',['Specific identification','FIFO','LIFO','Weighted average']]],[
   ['The oldest unit costs go to cost of goods sold.','FIFO'],
   ['The newest unit costs go to cost of goods sold.','LIFO'],
   ['The newest unit costs stay in ending inventory.','FIFO'],
   ['One average unit cost of all goods available is used for both COGS and ending inventory.','Weighted average'],
   ['Tracks the actual cost of each item sold; fits houses and fine jewelry.','Specific identification'],
   ['Not allowed under IFRS.','LIFO']],4),
  {id:'b7-g',t:'fs',min:7,sec:'Active drills',title:'Riverside Hardware — build the cost of goods sold and gross profit section',cap:'Gross profit section of the income statement',head:['Income statement (extract)','For the year ended …'],
   labels:['Net sales','Beginning inventory','Purchases','Goods available for sale','Ending inventory','Cost of goods sold','Gross profit','Freight-out','Advertising expense'],
   stem:['Riverside Hardware reports: net sales $300,000; beginning inventory $62,000; purchases $184,000 (net of returns and discounts, freight-in included); ending inventory $48,000.','Required: build the section down to gross profit. Only the lines that belong (freight-out and advertising are selling expenses, below gross profit).'],
   rows:[FR('Net sales',300000),FR('Beginning inventory',62000),FR('Purchases',184000),FR('Goods available for sale',246000,{tot:1}),FR('Ending inventory',48000),FR('Cost of goods sold',198000,{tot:1}),FR('Gross profit',102000,{tot:1})],
   note:'62,000 + 184,000 = 246,000 available; − 48,000 = 198,000 COGS; 300,000 − 198,000 = 102,000 gross profit.'}
 ];

 /* ================= BUS2105 · Chapter 12: perfect competition ================= */
 const UP=[['+','Increases'],['-','Decreases'],['0','Unchanged']];
 BUILD['BUS2105:12']=[
  C('mi12-a','Produce or shut down?','A price-taking firm compares the market price with its costs. Decide what it does and what its result is. (Shutdown point: price = minimum AVC.)',
   [['Decision',['Produce (P = MC)','Shut down (produce zero)','Indifferent (shutdown point)']],['Result',['Economic profit','Zero economic profit','Economic loss smaller than total fixed cost','Economic loss equal to total fixed cost']]],[
   ['Price $18, minimum AVC $12, ATC at the chosen output $15.',['Produce (P = MC)','Economic profit'],'Price is above ATC: profit = (18 − 15) per unit.'],
   ['Price $9, minimum AVC $12.',['Shut down (produce zero)','Economic loss equal to total fixed cost'],'Price does not even cover AVC. Shutting down limits the loss to TFC.'],
   ['Price $14, minimum AVC $12, ATC at the chosen output $16.',['Produce (P = MC)','Economic loss smaller than total fixed cost'],'P covers AVC (14 > 12) and part of fixed cost, so the loss is smaller than TFC.'],
   ['Price $12, equal to minimum AVC.',['Indifferent (shutdown point)','Economic loss equal to total fixed cost'],'At the shutdown point the firm loses exactly TFC whether it produces or not.'],
   ['Price $16, equal to ATC at the chosen output.',['Produce (P = MC)','Zero economic profit'],'P = ATC: revenue covers all costs including normal profit.']],4),
  G('mi12-b','The firm’s output decision: MR = MC','A price taker faces a market price of $26 per unit, so MR = $26 at every quantity. Complete the table (TR = P × Q, MC = change in TC, profit = TR − TC).',
   [{h:'Quantity',g:true},{h:'Total cost ($)',g:true},{h:'Total revenue ($)'},{h:'Marginal cost ($)'},{h:'Profit ($)'}],
   [[0,50,0,null,-50],[1,66,26,16,-40],[2,80,52,14,-28],[3,96,78,16,-18],[4,116,104,20,-12],[5,140,130,24,-10],[6,170,156,30,-14]],0.01,
   'Profit is highest (least negative) at 5 units: MC = 24 is still below MR = 26 but the 6th unit has MC = 30 > 26. The firm should produce 5 units and lose $10, less than its $50 fixed cost, so it does not shut down.',6),
  K('mi12-c','Using the table','Use your completed table (price $26).',[
   {l:'Profit-maximizing quantity',n:5,x:'Produce while MC ≤ MR: the 5th unit costs 24, the 6th costs 30.'},
   {l:'Economic loss at that quantity ($)',n:10,pre:'$',x:'TR 130 − TC 140.'},
   {l:'Total fixed cost ($)',n:50,pre:'$',x:'Total cost at zero output.'},
   {l:'Decision',opts:['Produce 5 units','Shut down'],key:'Produce 5 units',x:'Producing loses 10, less than the 50 lost when shut down (revenue covers all variable cost and part of fixed cost).'}],'A firm shuts down only when it would lose more by producing than the total fixed cost.',4),
  E('mi12-d','Entry, exit and the long run','Perfect competition. Say what happens in each step.',['Number of firms','Market price','Each firm’s economic profit'],UP,[
   ['Market demand rises (short run, before entry).',['0','+','+'],'Firms cannot change their number instantly; the higher price creates economic profit.'],
   ['Economic profit attracts new firms (the long-run adjustment after the demand increase).',['+','-','-'],'Entry shifts market supply right: price falls back toward minimum ATC and profit toward zero.'],
   ['Market demand falls (short run, before exit).',['0','-','-'],'Price falls below ATC: firms make economic losses.'],
   ['Losses push firms out (the long-run adjustment after the demand decrease).',['-','+','+'],'Exit shifts supply left: price rises back to minimum ATC and losses disappear.']],4),
  C('mi12-e','Key terms of perfect competition','Match each definition.',
   [['Term',['Price taker','Marginal revenue','Shutdown point','Normal profit','Long-run equilibrium']]],[
   ['A firm that must accept the market price because it cannot influence it.','Price taker'],
   ['The change in total revenue from selling one more unit; equals the price for a price taker.','Marginal revenue'],
   ['The price equals minimum AVC; below it the firm produces zero.','Shutdown point'],
   ['The opportunity cost of capital, already included in total cost.','Normal profit'],
   ['Price equals minimum ATC and every firm earns zero economic profit.','Long-run equilibrium']],4),
  K('mi12-f','Efficiency of perfect competition','Assume no externalities.',[
   {l:'The market demand curve is the',opts:['Marginal social benefit curve','Marginal social cost curve'],key:'Marginal social benefit curve',x:'Demand shows what each extra unit is worth to buyers.'},
   {l:'The market supply curve is the',opts:['Marginal social benefit curve','Marginal social cost curve'],key:'Marginal social cost curve',x:'Supply is the sum of the firms’ MC curves.'},
   {l:'At the competitive equilibrium, marginal social benefit is … marginal social cost',opts:['greater than','equal to','less than'],key:'equal to',x:'Quantity demanded = quantity supplied, so MSB = MSC.'},
   {l:'The competitive outcome',opts:['Maximizes total surplus (efficient)','Creates a deadweight loss'],key:'Maximizes total surplus (efficient)',x:'With MSB = MSC no mutually beneficial trade is left.'}],'Perfect competition allocates resources efficiently.',4)
 ];

 /* ================= BUS2105 · Chapter 13: monopoly ================= */
 BUILD['BUS2105:13']=[
  C('mi13-a','Barriers to entry','Which type of barrier protects each monopoly?',
   [['Barrier',['Natural','Ownership','Legal']]],[
   ['A local water distribution network: one firm serves the town at lower cost than two could.','Natural','Economies of scale make a natural monopoly.'],
   ['A firm that controls almost all of the world supply of a key resource, as De Beers did with diamonds.','Ownership'],
   ['A drug company holds a patent on its medicine.','Legal'],
   ['The state grants a postal service an exclusive public franchise.','Legal'],
   ['One electricity grid is so large that duplicating it would cost more than serving everyone with a single one.','Natural'],
   ['The author of a bestseller holds the copyright.','Legal'],
   ['A company owns the only mine of a rare mineral.','Ownership']],5),
  K('mi13-b','Why marginal revenue is below price','A single-price monopoly sells 2 units at a price of $16. To sell 3 units it must cut the price to $14 on every unit.',[
   {l:'Total revenue at 2 units ($)',n:32,pre:'$',x:'2 × 16.'},
   {l:'Total revenue at 3 units ($)',n:42,pre:'$',x:'3 × 14.'},
   {l:'Marginal revenue of the 3rd unit ($)',n:10,pre:'$',x:'42 − 32 = 10, which is below the price of 14: the lower price also applies to the first 2 units (a $4 loss).'},
   {l:'Where demand is elastic, MR is',opts:['Positive','Zero','Negative'],key:'Positive',x:'Cutting the price raises total revenue.'},
   {l:'Where demand is unit elastic, MR is',opts:['Positive','Zero','Negative'],key:'Zero',x:'Total revenue is at its maximum.'},
   {l:'Where demand is inelastic, MR is',opts:['Positive','Zero','Negative'],key:'Negative',x:'A price cut lowers total revenue, so a monopoly never operates here.'}],'MR < P for every single-price monopoly because the price cut applies to all units sold.',4),
  K('mi13-c','Monopoly versus competition (numbers)','Demand is P = 100 − 2Q, so MR = 100 − 4Q. Marginal cost is constant at $20 and there are no fixed costs.',[
   {l:'Monopoly quantity (MR = MC)',n:20,x:'100 − 4Q = 20, so Q = 20.'},
   {l:'Monopoly price ($)',n:60,pre:'$',x:'Read the demand curve at Q = 20: 100 − 2 × 20.'},
   {l:'Competitive quantity (P = MC)',n:40,x:'100 − 2Q = 20, so Q = 40.'},
   {l:'Competitive price ($)',n:20,pre:'$',x:'P = MC = 20.'},
   {l:'Monopoly economic profit ($)',n:800,pre:'$',x:'(60 − 20) × 20.'},
   {l:'Consumer surplus under monopoly ($)',n:400,pre:'$',x:'½ × (100 − 60) × 20.'},
   {l:'Deadweight loss ($)',n:400,pre:'$',x:'½ × (60 − 20) × (40 − 20).'}],'The monopoly produces half the competitive quantity at three times the price here.',6),
  E('mi13-d','Monopoly, competition and price discrimination','Compare the outcomes.',['Output','Deadweight loss','Producer surplus (profit)'],[['H','Higher'],['L','Lower'],['=','Same']],[
   ['A single-price monopoly compared with perfect competition.',['L','H','H'],'It restricts output, causing a deadweight loss, and captures part of the consumer surplus.'],
   ['A price-discriminating monopoly compared with a single-price monopoly.',['H','L','H'],'Selling more units to price-sensitive buyers raises output and profit and shrinks the deadweight loss.'],
   ['A perfectly price-discriminating monopoly compared with perfect competition.',['=','=','H'],'It produces the competitive output (no deadweight loss) but takes all the consumer surplus as profit.']],3),
  K('mi13-e','Price discrimination: a numeric case','A monopoly has constant MC = $20. Business travellers: 1,000 trips at any price up to $100. Leisure travellers: 3,000 trips at $60, and 4,000 trips at $50. Compare one price with two prices.',[
   {l:'Best single price ($)',n:60,pre:'$',x:'At $60 it sells 4,000 trips and earns 4,000 × 40 = 160,000; at $50 it sells 5,000 and earns 150,000; at $100 only 1,000 and earns 80,000.'},
   {l:'Profit at the best single price ($)',n:160000,pre:'$',x:'4,000 × (60 − 20).'},
   {l:'Profit with discrimination: business at $100, leisure at $50 ($)',n:200000,pre:'$',x:'1,000 × 80 + 4,000 × 30 = 80,000 + 120,000.'},
   {l:'Total trips sold with discrimination',n:5000,x:'1,000 + 4,000, against 4,000 with a single price.'}],'Discrimination raises profit and increases output toward the efficient quantity, but leaves consumers worse off than under competition.',4),
  C('mi13-f','Regulating a natural monopoly','Which regulatory rule is described?',
   [['Rule',['Marginal-cost pricing','Average-cost pricing','Rate-of-return regulation','Price-cap regulation']]],[
   ['Price = MC: the efficient quantity, but price is below ATC so the firm makes a loss.','Marginal-cost pricing'],
   ['Price = ATC: the firm breaks even, but output is below the efficient quantity.','Average-cost pricing'],
   ['The regulator allows a target (normal) return on the firm’s capital.','Rate-of-return regulation'],
   ['The regulator sets a maximum price and the firm keeps any savings from cutting costs.','Price-cap regulation']],3),
  K('mi13-g','Natural monopoly: why marginal-cost pricing causes a loss','HarborWater is a natural monopoly (ATC is still falling where demand crosses it). Marginal cost at that quantity is $2.',[
   {l:'Under marginal-cost pricing the price is ($)',n:2,pre:'$',x:'P = MC = 2.'},
   {l:'At that quantity, ATC is … the price',opts:['above','equal to','below'],key:'above',x:'ATC is still falling, so it is above MC.'},
   {l:'So the firm makes',opts:['An economic loss','An economic profit'],key:'An economic loss',x:'Price below ATC means revenue does not cover total cost.'},
   {l:'A solution that keeps the efficient quantity',opts:['A government subsidy','Average-cost pricing'],key:'A government subsidy',x:'A subsidy (or a fixed access fee) covers the fixed cost while the price stays at MC. Average-cost pricing reduces output below the efficient quantity.'}],'',4)
 ];

 /* ================= BUS2105 · Chapter 14: monopolistic competition ================= */
 BUILD['BUS2105:14']=[
  C('mi14-a','Which market structure?','Match each feature.',
   [['Structure',['Perfect competition','Monopolistic competition','Monopoly']]],[
   ['Many firms selling identical products; each is a price taker.','Perfect competition'],
   ['Many firms selling slightly differentiated products, with free entry and exit.','Monopolistic competition'],
   ['One firm, no close substitute and a barrier to entry.','Monopoly'],
   ['In the long run price equals minimum ATC.','Perfect competition'],
   ['In the long run there is excess capacity and a positive markup, with zero economic profit.','Monopolistic competition'],
   ['Can keep an economic profit in the long run because entry is blocked.','Monopoly'],
   ['The firm’s demand curve is horizontal.','Perfect competition'],
   ['The firm’s demand curve slopes down but is very elastic because substitutes are close.','Monopolistic competition']],6),
  E('mi14-b','Entry and exit for a typical firm','Monopolistic competition, product differentiation unchanged. What happens to an existing firm?',['Demand for its product','Profit-maximizing quantity','Price','Economic profit'],UP,[
   ['New firms enter in response to short-run economic profit.',['-','-','-','-'],'Each firm loses market share: demand shifts left, so MR = MC occurs at a smaller quantity and a lower price. Entry continues until profit is zero.'],
   ['Firms exit because of short-run economic losses.',['+','+','+','+'],'Remaining firms gain market share: demand shifts right until losses disappear.']],2),
  K('mi14-c','Excess capacity and markup','BrewCraft Coffee earns zero economic profit. It produces 80 cups an hour at an ATC of $3.50 a cup, which equals its price; marginal cost at that output is $2.50. Its ATC-minimizing scale is 110 cups an hour.',[
   {l:'Excess capacity (cups per hour)',n:30,x:'110 − 80.'},
   {l:'Markup, price minus marginal cost ($ per cup)',n:1,pre:'$',x:'3.50 − 2.50.'},
   {l:'Excess capacity as a percentage of the efficient scale (%)',n:27.3,u:'%',x:'30 ÷ 110.'},
   {l:'Is this a long-run equilibrium of monopolistic competition?',opts:['Yes','No'],key:'Yes',x:'Zero economic profit together with output below the ATC-minimizing quantity is the textbook long-run outcome.'},
   {l:'In perfect competition the markup in the long run is',opts:['Zero','Positive'],key:'Zero',x:'P = MC because the firm’s demand curve is horizontal.'}],'Excess capacity and a positive markup come from the downward-sloping firm demand curve.',4),
  K('mi14-d','Advertising and average total cost','A firm with no advertising produces 25 units at an ATC of $60. By advertising, it sells 100 units at an ATC of $40.',[
   {l:'Total cost without advertising ($)',n:1500,pre:'$',x:'25 × 60.'},
   {l:'Total cost with advertising ($)',n:4000,pre:'$',x:'100 × 40.'},
   {l:'Change in ATC ($ per unit)',n:20,pre:'$',x:'Average cost falls by 60 − 40 = 20.'},
   {l:'Advertising is a … cost',opts:['Fixed','Variable'],key:'Fixed',x:'It does not depend on the quantity produced.'},
   {l:'Effect of advertising on marginal cost',opts:['None','Raises it','Lowers it'],key:'None',x:'It raises ATC at every quantity (a fixed cost) but leaves MC unchanged.'},
   {l:'Why can ATC fall?',opts:['Demand rises, output is larger, and the fixed cost is spread over more units','Advertising lowers MC'],key:'Demand rises, output is larger, and the fixed cost is spread over more units',x:'The extra output spreads the fixed selling cost.'}],'',5),
  C('mi14-e','Key terms','Match each definition.',
   [['Term',['Product differentiation','Excess capacity','Markup','Signaling']]],[
   ['Making a product slightly different from competitors’ products, giving the firm a downward-sloping demand curve.','Product differentiation'],
   ['Producing less than the quantity that minimizes ATC.','Excess capacity'],
   ['The amount by which price exceeds marginal cost.','Markup'],
   ['Using a costly, visible action such as expensive advertising to convey unobservable quality.','Signaling']],3),
  K('mi14-f','Efficiency and variety','Long-run monopolistic competition.',[
   {l:'In the long run price is … marginal cost',opts:['greater than','equal to','less than'],key:'greater than',x:'The downward-sloping demand curve gives a positive markup.'},
   {l:'Holding variety fixed, the quantity produced is',opts:['Less than the efficient quantity','Equal to the efficient quantity','More than the efficient quantity'],key:'Less than the efficient quantity',x:'MSB > MSC at the firm’s output.'},
   {l:'Excess capacity is a … and product variety is a …',opts:['loss, gain','gain, loss'],key:'loss, gain',x:'Consumers lose from output below the efficient scale but gain from many differentiated options; the efficient variety balances the two.'},
   {l:'Why is it misleading to regulate monopolistic competition like monopoly?',opts:['Pricing every firm at MC would remove the incentive to differentiate, reducing variety','Because firms earn large economic profit'],key:'Pricing every firm at MC would remove the incentive to differentiate, reducing variety',x:'Variety is valuable and costly to provide.'}],'',4)
 ];

 /* ================= BUS2105 · Chapter 15: oligopoly ================= */
 BUILD['BUS2105:15']=[
  C('mi15-a','Name the concept','Match each description to the term.',
   [['Term',['Oligopoly','Cartel','Payoff matrix','Nash equilibrium','Dominant strategy','Tit-for-tat','Limit pricing','Predatory pricing','Tying arrangement','Resale price maintenance']]],[
   ['A small number of firms compete and barriers prevent entry.','Oligopoly'],
   ['A group of firms that agree to limit output, raise price and increase profit; illegal.','Cartel'],
   ['A table showing each player’s payoff for every combination of actions.','Payoff matrix'],
   ['Each player makes the best choice for herself given the choice of the other.','Nash equilibrium'],
   ['An action that is best for a player whatever the other player does.','Dominant strategy'],
   ['Cooperate this period if the rival cooperated last period; cheat if the rival cheated.','Tit-for-tat'],
   ['The highest price consistent with keeping a potential entrant out.','Limit pricing'],
   ['A price set below cost to drive rivals out and later raise the price; economists doubt it occurs.','Predatory pricing'],
   ['A product is sold only if the buyer also buys another product.','Tying arrangement'],
   ['A manufacturer and a distributor agree on the resale price.','Resale price maintenance']],7),
  K('mi15-b','The prisoners’ dilemma','Art and Bob are questioned separately. If both confess each gets 3 years; if both deny each gets 2 years; if one confesses and the other denies, the confessor gets 1 year and the other 10 years.',[
   {l:'If Bob confesses, Art’s best reply is to',opts:['Confess','Deny'],key:'Confess',x:'Confessing gives 3 years against 10 for denying.'},
   {l:'If Bob denies, Art’s best reply is to',opts:['Confess','Deny'],key:'Confess',x:'Confessing gives 1 year against 2 for denying.'},
   {l:'Nash equilibrium: sentence for each prisoner (years)',n:3,x:'Confessing is a dominant strategy for both, so both confess and serve 3 years.'},
   {l:'Total years served by both prisoners in the Nash equilibrium',n:6,x:'3 + 3.'},
   {l:'Total years served by both if both deny',n:4,x:'2 + 2: better for both, but not an equilibrium.'}],'Each player’s dominant strategy leads to an outcome that is worse for both than cooperating.',5),
  K('mi15-c','Honest or lie?','Two players who cannot communicate answer a question. Both honest: $100 each. One honest, one lies: the liar gets $500 and the honest player $0. Both lie: $50 each.',[
   {l:'If the other player is honest, the best reply (payoff $)',n:500,pre:'$',x:'Lying gives $500 against $100 for being honest.'},
   {l:'If the other player lies, the best reply (payoff $)',n:50,pre:'$',x:'Lying gives $50 against $0 for being honest.'},
   {l:'The dominant strategy is to',opts:['Be honest','Lie'],key:'Lie',x:'Lying is best whatever the other does.'},
   {l:'Equilibrium payoff for each player ($)',n:50,pre:'$',x:'Both lie, so each gets $50.'},
   {l:'Total payoff lost compared with both being honest ($)',n:100,pre:'$',x:'Both honest: 100 + 100 = 200; equilibrium: 50 + 50 = 100; loss 100.'}],'It is a prisoners’ dilemma: the equilibrium is worse for both than cooperation.',5),
  K('mi15-d','Trick and Gear: comply or cheat','Both comply: $2 million each per week. Both cheat: $0 each. Trick complies and Gear cheats: Trick −$1 million, Gear $4.5 million (and the reverse).',[
   {l:'If Gear complies, Trick’s profit from cheating minus its profit from complying ($ million)',n:2.5,pre:'$',x:'4.5 − 2.'},
   {l:'If Gear cheats, Trick’s profit from cheating minus from complying ($ million)',n:1,pre:'$',x:'0 − (−1).'},
   {l:'Dominant strategy of each firm',opts:['Comply','Cheat'],key:'Cheat',x:'Cheating is better whatever the rival does.'},
   {l:'Joint profit if both comply ($ million)',n:4,pre:'$',x:'2 + 2: the cartel (monopoly) outcome.'},
   {l:'Joint profit in the Nash equilibrium ($ million)',n:0,pre:'$',x:'Both cheat: price and quantity are competitive and profit is zero.'}],'Both firms cheat, so the cartel collapses into the competitive outcome.',5),
  K('mi15-e','The game of chicken (R&D)','Apple and Nokia each value a new touch-screen technology at $12 million, but developing it costs $9 million and the result cannot be patented, so both can use it whoever pays. (Payoffs are the value of the technology minus any R&D cost.)',[
   {l:'Payoff of a firm that does the R&D when the other does none ($ million)',n:3,pre:'$',x:'12 − 9.'},
   {l:'Payoff of the firm that does no R&D when the other does it ($ million)',n:12,pre:'$',x:'It gets the technology for free.'},
   {l:'If Apple does R&D, Nokia’s best reply is',opts:['Do R&D','Do no R&D'],key:'Do no R&D',x:'12 against 3.'},
   {l:'If Apple does no R&D, Nokia’s best reply is',opts:['Do R&D','Do no R&D'],key:'Do R&D',x:'3 against 0.'},
   {l:'Number of Nash equilibria',n:2,x:'Either Apple or Nokia does the R&D; the model cannot say which.'}],'In chicken the equilibrium is that exactly one firm incurs the cost.',5),
  C('mi15-f','Which game or strategy?','Classify each situation.',
   [['Game',['Prisoners’ dilemma','Game of chicken','Repeated game','Sequential entry game']]],[
   ['Two firms each gain by cheating on a cartel but both end up with zero profit.','Prisoners’ dilemma'],
   ['Kleenex and Puffs each spend heavily on R&D although both would be better off if neither did.','Prisoners’ dilemma'],
   ['An unpatentable technology benefits both firms, so each prefers the other to pay for the R&D.','Game of chicken'],
   ['Rivals meet every period, so a cheater can be punished next period; collusion can be sustained.','Repeated game'],
   ['An incumbent chooses a price, then a potential entrant decides whether to enter; solved by backward induction.','Sequential entry game']],5),
  K('mi15-g','Sequential entry (backward induction)','Agile chooses the monopoly price or the competitive price; then Wanabe enters or stays out. Payoffs ($ million, Agile · Wanabe): monopoly price and entry −1 · 2; monopoly price and stay out 6 · 0; competitive price and entry 0 · −1; competitive price and stay out 0 · 0.',[
   {l:'If Agile sets the monopoly price, Wanabe’s best reply is',opts:['Enter','Stay out'],key:'Enter',x:'2 against 0.'},
   {l:'Agile’s payoff after the monopoly price ($ million)',n:-1,pre:'$',x:'Wanabe enters, so Agile gets −1.'},
   {l:'If Agile sets the competitive price, Wanabe’s best reply is',opts:['Enter','Stay out'],key:'Stay out',x:'0 against −1.'},
   {l:'Agile’s payoff after the competitive price ($ million)',n:0,pre:'$',x:'Wanabe stays out.'},
   {l:'Agile therefore sets the',opts:['Monopoly price','Competitive price'],key:'Competitive price',x:'0 is better than −1.'}],'The incumbent deters entry by pricing competitively; limit pricing is a cheaper way to do the same.',5),
  C('mi15-h','Which antitrust issue?','Classify each practice.',
   [['Practice',['Price fixing','Resale price maintenance','Tying arrangement','Predatory pricing']],['Treatment',['Always illegal','Debated: may be efficient or harmful']]],[
   ['Two rivals agree on the price they will both charge.',['Price fixing','Always illegal'],'If proved, there is no defense.'],
   ['A manufacturer sets the price at which retailers must resell its product.',['Resale price maintenance','Debated: may be efficient or harmful'],'Inefficient if it supports monopoly pricing; efficient if it encourages good retail service.'],
   ['A software seller will license its operating system only if buyers also take its browser.',['Tying arrangement','Debated: may be efficient or harmful'],'It may allow price discrimination, or may be genuine product innovation.'],
   ['A firm sets prices below cost to drive rivals out, planning to raise prices afterwards.',['Predatory pricing','Debated: may be efficient or harmful'],'Economists doubt it happens because the loss is certain and the later gain is not.']],4),
 ];
 /* ================= BUS2205 · Chapters 10-11 ================= */
 BUILD['BUS2205:10']=[
  C('mk10-a','Classify the consumer product','Classify each purchase.',
   [['Type',['Convenience','Shopping','Specialty','Unsought']]],[
   ['A pack of toothpaste bought on the way home.','Convenience'],
   ['Comparing three TVs on price, quality and style.','Shopping'],
   ['A Rolex watch with no acceptable substitute.','Specialty'],
   ['Burial insurance the consumer did not plan to buy.','Unsought'],
   ['Hand soap bought weekly with minimum effort.','Convenience'],
   ['A flight ticket after comparing airlines.','Shopping']],6),
  C('mk10-b','Type of innovation','Classify each innovation by the learning it requires of the consumer, or by the firm’s perspective.',
   [['Type',['Continuous','Dynamically continuous','Discontinuous','Line extension','Brand extension','Jump in innovation']]],[
   ['A new color of an existing phone.','Continuous'],
   ['A feature requiring small changes in behavior.','Dynamically continuous'],
   ['A product needing entirely new consumption patterns.','Discontinuous'],
   ['A new shade added to a foundation line.','Line extension'],
   ['A famous drink brand placed on an energy bar.','Brand extension'],
   ['A radically new battery.','Jump in innovation']],6),
  C('mk10-c','Stage of the process','Match each activity with the new-product stage.',
   [['Stage',['Strategy development','Idea generation','Screening and evaluation','Business analysis','Development','Market testing','Commercialization']]],[
   ['Crowdsourcing and R&D labs produce a pool of concepts.','Idea generation'],
   ['Concept tests eliminate ideas that warrant no further effort.','Screening and evaluation'],
   ['Financial projections and marketing strategy are specified.','Business analysis'],
   ['A prototype is built and tested in the lab.','Development'],
   ['A simulated test market is run.','Market testing'],
   ['Full-scale production and launch.','Commercialization'],
   ['The role of the product in the firm’s objectives is defined.','Strategy development']],7),
  K('mk10-d','New Product Vitality Index','A firm earns $300 million total revenue, of which $75 million comes from products introduced in the last few years.',[
   {l:'New Product Vitality Index (%)',n:25,x:'75 / 300 = 25%.'},
   {l:'Is it within the “good” range of 20-30%?',opts:['Yes','No'],key:'Yes',x:'25% lies within 20-30%.'},
   {l:'Revenue from new products would be 18% of total if new-product revenue were ($ million)',n:54,x:'0.18 × 300 = 54.'}],'Vitality index = revenue from new products ÷ total revenue.',4),
  C('mk10-e','Reasons for failure','Which reason for new-product failure does each case show?',
   [['Reason',['Insignificant point of difference','Bad timing','No economical access to buyers','Poor product quality','Incomplete protocol','Organizational inertia']]],[
   ['The product is nearly identical to existing brands.','Insignificant point of difference'],
   ['Launched just as demand collapsed.','Bad timing'],
   ['Retailers refuse shelf space.','No economical access to buyers'],
   ['Frequent defects.','Poor product quality'],
   ['No clear target market or customer needs defined before development.','Incomplete protocol'],
   ['Managers reject good ideas because they were not invented here.','Organizational inertia']],6),
 ];
 BUILD['BUS2205:11']=[
  C('mk11-a','Life-cycle stage','Name the stage.',
   [['Stage',['Introduction','Growth','Maturity','Decline']]],[
   ['Few competitors; inform and educate.','Introduction'],
   ['Profits peak; more versions are added.','Growth'],
   ['Maximum outlets; reminder-oriented promotion.','Maturity'],
   ['Fewer outlets; best-sellers; minimal promotion.','Decline'],
   ['Skimming or penetration pricing.','Introduction'],
   ['Sales slow and few new buyers remain; competitors leave.','Maturity'],
   ['Harvesting or deletion.','Decline']],7),
  K('mk11-b','Adopter categories','A market has 2,000 potential adopters.',[
   {l:'Innovators (number)',n:50,x:'2.5% × 2,000.'},
   {l:'Early adopters (number)',n:270,x:'13.5% × 2,000.'},
   {l:'Early majority (number)',n:680,x:'34% × 2,000.'},
   {l:'Laggards (number)',n:320,x:'16% × 2,000.'},
   {l:'Total reached once the late majority has also adopted (number)',n:1680,x:'(2.5 + 13.5 + 34 + 34)% = 84% × 2,000.'}],'The five categories sum to 100%: 2.5, 13.5, 34, 34, 16.',5),
  C('mk11-c','Barriers to adoption','Which barrier does each statement show?',
   [['Barrier',['Usage','Value','Risk','Psychological']]],[
   ['Electric cars do not fit consumers’ driving habits.','Usage'],
   ['An electric car carries a price premium over gas cars.','Value'],
   ['Uncertainty about actual ownership costs.','Risk'],
   ['The product conflicts with a person’s culture or image.','Psychological'],
   ['Buyers fear physical, economic or social harm.','Risk']],5),
  C('mk11-d','Branding strategy','Name the strategy.',
   [['Strategy',['Multiproduct branding','Multibranding','Private branding','Mixed branding','Co-branding','Brand extension','Subbranding']]],[
   ['One name for all products in a class.','Multiproduct branding'],
   ['Each product has a distinct name for a different segment.','Multibranding'],
   ['A manufacturer sells under the retailer’s name.','Private branding'],
   ['Own brand plus the reseller’s brand.','Mixed branding'],
   ['Two strong brands paired for mutual benefit.','Co-branding'],
   ['Current brand used in a different product class.','Brand extension'],
   ['Corporate brand combined with a new brand.','Subbranding']],7),
  C('mk11-e','Repositioning and modification','Classify each move.',
   [['Move',['Product modification','Market modification','Trading up','Trading down','Downsizing']]],[
   ['Adding premium features and better materials.','Trading up'],
   ['Reducing features and price.','Trading down'],
   ['Less product in the same package at the same price.','Downsizing'],
   ['Finding new customers for the product.','Market modification'],
   ['Changing quality, performance or appearance.','Product modification'],
   ['Creating a new use situation.','Market modification']],6),
  C('mk11-f','Packaging benefits','Which benefit of packaging?',
   [['Benefit',['Communication','Functional','Perceptual']]],[
   ['The label lists ingredients and use.','Communication'],
   ['The package protects the product in storage.','Functional'],
   ['Licensed character heads build the brand in the consumer’s mind.','Perceptual'],
   ['The package is easy to open and carry.','Functional']],4),
 ];
 /* ================= BUS2205 · Chapters 13-15, 18-20 ================= */
 BUILD['BUS2205:13']=[
  K('mk13-a','Value ratio','Value = perceived benefits ÷ price. Product A: benefits 80, price $20. Product B: benefits 90, price $30.',[
   {l:'Value of A',n:4,x:'80 / 20.'},
   {l:'Value of B',n:3,x:'90 / 30.'},
   {l:'Better value',opts:['A','B'],key:'A',x:'4.0 is greater than 3.0.'}],'Value = benefits ÷ price.',4),
  C('mk13-b','Elastic or inelastic','Price falls by 10%. Classify demand and the effect on revenue from the quantity change.',
   [['Result',['Elastic, revenue rises','Inelastic, revenue falls']]],[
   ['Quantity rises 25%.','Elastic, revenue rises'],
   ['Quantity rises 4%.','Inelastic, revenue falls'],
   ['Quantity rises 12%.','Elastic, revenue rises'],
   ['Quantity rises 6%.','Inelastic, revenue falls'],
   ['A necessity such as medicine.','Inelastic, revenue falls']],5),
  K('mk13-c','Break-even','Price $20, unit variable cost $12, fixed cost $60,000.',[
   {l:'Unit contribution ($)',n:8,x:'20 − 12.'},
   {l:'Break-even quantity (units)',n:7500,x:'60,000 / 8.'},
   {l:'Total revenue at 10,000 units ($)',n:200000,x:'20 × 10,000.'},
   {l:'Total cost at 10,000 units ($)',n:180000,x:'60,000 + 12 × 10,000.'},
   {l:'Profit at 10,000 units ($)',n:20000,x:'200,000 − 180,000.'}],'Break-even = fixed cost ÷ (price − unit variable cost).',5),
  C('mk13-d','Movement or shift','Movement along the demand curve or shift of the curve?',
   [['Answer',['Movement along','Shift']]],[
   ['The firm cuts its own price.','Movement along'],
   ['Consumer income rises.','Shift'],
   ['Consumer tastes change.','Shift'],
   ['A rival lowers its price, changing demand at every price.','Shift'],
   ['The firm raises its own price.','Movement along']],5),
 ];
 BUILD['BUS2205:14']=[
  C('mk14-a','Approach to pricing','Classify each method.',
   [['Approach',['Demand-oriented','Cost-oriented','Profit-oriented','Competition-oriented']]],[
   ['Skimming pricing.','Demand-oriented'],
   ['Standard markup pricing.','Cost-oriented'],
   ['Target return-on-sales pricing.','Profit-oriented'],
   ['Loss-leader pricing.','Competition-oriented'],
   ['Bundle pricing.','Demand-oriented'],
   ['Target ROI pricing.','Profit-oriented'],
   ['Customary pricing.','Competition-oriented'],
   ['Experience curve pricing.','Cost-oriented']],8),
  K('mk14-b','Pricing calculations','Compute each price.',[
   {l:'Cost $60, markup 40% on selling price: price ($)',n:100,x:'60 / (1 − 0.40).'},
   {l:'Total cost $100,000, target profit $25,000, 5,000 units: price ($)',n:25,x:'(100,000 + 25,000) / 5,000.'},
   {l:'Unit cost $48, target return on sales 20%: price ($)',n:60,x:'48 / (1 − 0.20).'},
   {l:'Total cost $200,000, ROI 12% on $500,000, 10,000 units: price ($)',n:26,x:'(200,000 + 60,000) / 10,000.'}],'Use the formula for each method.',4),
  C('mk14-c','Name the pricing strategy','Match the description.',
   [['Strategy',['Skimming','Penetration','Prestige','Price lining','Odd-even','Bundle','Yield management','Price war','Price fixing','Price discrimination']]],[
   ['Highest initial price that desiring customers will pay.','Skimming'],
   ['Low initial price to reach the mass market.','Penetration'],
   ['High price to attract status-conscious consumers.','Prestige'],
   ['A line of products at several price points.','Price lining'],
   ['$999 instead of $1,000.','Odd-even'],
   ['Several products in a single package price.','Bundle'],
   ['Different prices to maximize revenue for fixed capacity.','Yield management'],
   ['Successive price cutting by competitors.','Price war'],
   ['A conspiracy among firms to set prices.','Price fixing'],
   ['Different prices to different buyers for like goods.','Price discrimination']],10),
 ];
 BUILD['BUS2205:15']=[
  C('mk15-a','Channel function','Classify each function.',
   [['Type',['Transactional','Logistical','Facilitating']]],[
   ['Selling.','Transactional'],['Risk taking.','Transactional'],['Buying.','Transactional'],
   ['Sorting.','Logistical'],['Transporting.','Logistical'],['Storing.','Logistical'],['Assorting.','Logistical'],
   ['Financing.','Facilitating'],['Grading.','Facilitating'],['Marketing information and research.','Facilitating']],10),
  C('mk15-b','Vertical marketing systems','Classify each.',
   [['Type',['Corporate','Contractual','Administered']]],[
   ['A producer owns its retail stores.','Corporate'],
   ['A retailer owns the factory that makes its goods.','Corporate'],
   ['Independent grocers form a cooperative with a warehouse.','Contractual'],
   ['A car maker franchises its dealers.','Contractual'],
   ['A wholesaler-sponsored voluntary chain.','Contractual'],
   ['Coordination achieved through one powerful member’s size, without ownership or contract.','Administered']],6),
  C('mk15-c','Distribution coverage','Which coverage strategy fits?',
   [['Strategy',['Intensive','Selective','Exclusive']]],[
   ['Chewing gum.','Intensive'],['A Rolex watch.','Exclusive'],['A television.','Selective'],['Soft drinks.','Intensive'],['A luxury car sold by one dealer per region.','Exclusive']],5),
  C('mk15-d','Utilities and supply chains','Match.',
   [['Answer',['Time utility','Place utility','Form utility','Possession utility','Responsive supply chain','Efficient supply chain']]],[
   ['Having the product available when the consumer wants it.','Time utility'],
   ['Having the product where the consumer wants it.','Place utility'],
   ['Making the product more appealing.','Form utility'],
   ['Helping the consumer take possession (credit, delivery).','Possession utility'],
   ['Dell: customized systems with express shipping.','Responsive supply chain'],
   ['Walmart: cross-docking and reliable low prices.','Efficient supply chain']],6),
 ];
 BUILD['BUS2205:18']=[
  C('mk18-a','Promotional elements','Which element?',
   [['Element',['Advertising','Personal selling','Public relations','Sales promotion','Direct marketing']]],[
   ['Mass; fees paid for space or time.','Advertising'],
   ['Customized; immediate feedback; extremely expensive per exposure.','Personal selling'],
   ['Mass; no direct payment to media; most credible.','Public relations'],
   ['Mass; changes behavior in the short run; easily abused.','Sales promotion'],
   ['Customized; database management is expensive; declining response.','Direct marketing']],5),
  C('mk18-b','Mass or customized','Classify.',
   [['Type',['Mass','Customized']]],[
   ['Advertising.','Mass'],['Personal selling.','Customized'],['Public relations.','Mass'],['Sales promotion.','Mass'],['Direct marketing.','Customized']],5),
 ];
 BUILD['BUS2205:19']=[
  C('mk19-a','Type of advertisement','Classify each ad.',
   [['Type',['Pioneering','Competitive','Reminder']]],[
   ['Announces a new electric car.','Pioneering'],
   ['Compares a tablet with a rival.','Competitive'],
   ['Reminds buyers before Mother’s Day.','Reminder'],
   ['Informs consumers about a new category of product.','Pioneering'],
   ['Persuades consumers to choose this brand over others.','Competitive']],5),
  C('mk19-b','Choose the medium','Which medium fits?',
   [['Medium',['Television','Radio','Magazines','Newspapers','Directories','Internet','Out-of-home','Direct mail']]],[
   ['Reaches 96% of households; high cost and short exposure.','Television'],
   ['Low cost; reaches 88% of adults; no visual element.','Radio'],
   ['High-quality color and long ad life; long lead time.','Magazines'],
   ['Local coverage; quick changes; short life and poor color.','Newspapers'],
   ['Rural and older segments; competes with Google.','Directories'],
   ['Interactive; advertising fatigue; hard to measure.','Internet'],
   ['Low cost; short message; low selectivity.','Out-of-home'],
   ['Highly selective; junk-mail image.','Direct mail']],8),
  C('mk19-c','Consumer sales promotion','Which tool?',
   [['Tool',['Coupons','Deals','Premiums','Contests','Sweepstakes','Samples','Loyalty programs','Point-of-purchase displays','Rebates','Product placements']]],[
   ['Offer of a discounted price.','Coupons'],
   ['Short-term price reduction.','Deals'],
   ['Free or low-price item with purchase.','Premiums'],
   ['Consumers apply skills to win a prize.','Contests'],
   ['Prize drawing; sales drop afterwards.','Sweepstakes'],
   ['Free trial-size product; high cost.','Samples'],
   ['Rewards accumulate with purchases.','Loyalty programs'],
   ['Signs holding products in high-traffic areas.','Point-of-purchase displays'],
   ['Cash back with proof of purchase.','Rebates'],
   ['Brand shown in a movie.','Product placements']],10),
 ];
 BUILD['BUS2205:20']=[
  C('mk20-a','Social media content types','Classify the content.',
   [['Type',['Educational','Inspirational','Interactive','Connecting','Promotional','Newsworthy','Entertaining']]],[
   ['A how-to video.','Educational'],
   ['A motivating customer story.','Inspirational'],
   ['A poll for followers.','Interactive'],
   ['A post that builds a community of fans.','Connecting'],
   ['A discount offer.','Promotional'],
   ['A company announcement.','Newsworthy'],
   ['A funny clip.','Entertaining']],7),
  C('mk20-b','Key terms','Match the definition.',
   [['Term',['Social media','User-generated content','Influencer marketing','Social media marketing program']]],[
   ['Online media where users submit comments, photos and videos.','Social media'],
   ['Content created by end users and publicly available.','User-generated content'],
   ['Recruiting people to advocate the brand to their followers.','Influencer marketing'],
   ['The part of IMC that creates content people will share.','Social media marketing program']],4),
 ];
 /* ================= Extensions: BUS1103 Ch6-7, BUS2108 Ch6-7 (added to the existing chapter drills) ================= */
 BUILD['BUS1103:6'].push(
  K('b6-bank1','Bank reconciliation: Emporium (Nov. 30)','Cash account $27,202; bank statement $29,279. Outstanding checks $1,525 and $1,459. Deposit in transit $1,675. The bank collected a $780 note and charged a $10 fee (credited $770). NSF check $67. Check #3445 was written for $2,450 but recorded as $2,540. Bank service charge $25.',[
   {l:'Total outstanding checks ($)',n:2984,x:'1,525 + 1,459.'},
   {l:'Bank side: correct cash balance ($)',n:27970,x:'29,279 + 1,675 − 2,984.'},
   {l:'Effect of the error on check #3445 on the book balance ($, add)',n:90,x:'The payment was recorded $90 too high, so cash is understated: add 90.'},
   {l:'Book side: correct cash balance ($)',n:27970,x:'27,202 + 770 + 90 − 67 − 25.'},
   {l:'Journal entry for the NSF check: debit',opts:['Accounts receivable','Cash','Bank charges expense'],key:'Accounts receivable',x:'The customer still owes the money: debit A/R 67, credit Cash 67.'}],'Both sides must agree at $27,970.',5),
  K('b6-bank2','Bank reconciliation: Presto (June 30)','Book balance $13,319; bank $13,710. Outstanding checks $2,410. Deposits in transit $1,720 and $32. NSF check $175. Check No. 210 for $352 was recorded as $325. Service charge $30. Electronic transfer debit memo $540. The bank collected a note of $500 plus $15 interest and charged a $10 fee.',[
   {l:'Bank side: correct balance ($)',n:13052,x:'13,710 + 1,752 − 2,410.'},
   {l:'Net note collection added to books ($)',n:505,x:'500 + 15 − 10.'},
   {l:'Error on check No. 210: adjustment to book cash ($, deduct)',n:27,x:'352 − 325: cash was overstated by 27.'},
   {l:'Book side: correct balance ($)',n:13052,x:'13,319 + 505 − 175 − 27 − 30 − 540.'},
   {l:'Entry for the $27 error: debit',opts:['Accounts payable','Cash','Bank charges expense'],key:'Accounts payable',x:'More was paid to the supplier than recorded: debit A/P 27, credit Cash 27.'}],'The reconciled balance is $13,052 on both sides.',5),
  K('b6-offic1','E6-3 and P6-7 results (official)','Use the official solutions: sales revenue and discounts.',[
   {l:'E6-3: sales discount on Customer D’s payment ($)',n:243,x:'3% × ($9,000 − $900) = $243.'},
   {l:'E6-3: net sales ($)',n:13757,x:'14,900 − 900 − 243.'},
   {l:'P6-7: net sales revenue ($)',n:309320,x:'316,000 − 4,000 − 2,680.'},
   {l:'P6-7: bad debt expense ($)',n:1155,x:'(81,000 − 4,000) × 1.5%.'}],'Net sales = sales − returns − discounts.',4),
  K('b6-offic2','E6-21, E6-22 and P6-3 results (official)','Use the official solutions.',[
   {l:'E6-21: net accounts receivable ($)',n:28975,x:'29,300 − 325.'},
   {l:'E6-22: net accounts receivable ($)',n:9700,x:'9,950 − 250.'},
   {l:'P6-3: estimated allowance ($)',n:4661,x:'450 + 2,475 + 1,736.'},
   {l:'P6-3: bad debt expense ($)',n:3741,x:'4,661 − 920.'},
   {l:'P6-3: net accounts receivable ($)',n:44039,x:'48,700 − 4,661.'}],'Aging method: required allowance minus current balance.',5)
 );
 BUILD['BUS1103:7'].push(
  K('b7-fifo','Beacon: FIFO perpetual','Beacon: May 1 inventory 15 @ $150; May 6 buy 35 @ $175; May 9 sell 18; May 17 buy 8 @ $225; May 25 buy 10 @ $229; May 30 sell 30. Retail: $600 and $700.',[
   {l:'Goods available for sale ($)',n:12465,x:'2,250 + 6,125 + 1,800 + 2,290.'},
   {l:'May 9 COGS ($)',n:2775,x:'15 × 150 + 3 × 175.'},
   {l:'May 30 COGS ($)',n:5250,x:'30 units from the remaining 32 @ $175.'},
   {l:'Ending inventory ($)',n:4440,x:'2 × 175 + 8 × 225 + 10 × 229.'},
   {l:'Gross profit ($)',n:23775,x:'31,800 − 8,025.'}],'COGS + ending inventory = 12,465.',5),
  K('b7-wac','Beacon: weighted average perpetual','Same Beacon data. Recompute the average cost after each purchase.',[
   {l:'Average cost after May 6 ($ per unit)',n:167.5,x:'(2,250 + 6,125) / 50.'},
   {l:'May 9 COGS ($)',n:3015,x:'18 × 167.50.'},
   {l:'Average cost after May 25 ($ per unit)',n:189,x:'(5,360 + 1,800 + 2,290) / 50.'},
   {l:'May 30 COGS ($)',n:5670,x:'30 × 189.'},
   {l:'Ending inventory ($)',n:3780,x:'20 × 189.'}],'Recompute the average after every purchase.',5),
  K('b7-si','Beacon: specific identification','May 9 sale: 8 units from beginning inventory and 10 from the May 6 purchase. May 30 sale: 20 units from the May 6 purchase and 10 from the May 25 purchase.',[
   {l:'May 9 COGS ($)',n:2950,x:'8 × 150 + 10 × 175.'},
   {l:'May 30 COGS ($)',n:5790,x:'20 × 175 + 10 × 229.'},
   {l:'Total COGS ($)',n:8740,x:'2,950 + 5,790.'},
   {l:'Ending inventory ($)',n:3725,x:'7 × 150 + 5 × 175 + 8 × 225.'},
   {l:'Method giving the highest gross profit',opts:['FIFO','Weighted average','Specific identification'],key:'FIFO',x:'FIFO has the lowest COGS ($8,025): rising costs.'}],'Compare: COGS FIFO 8,025; WAC 8,685; specific ID 8,740.',5),
  C('b7-lcnrv','Lower of cost or NRV','Decide for each item whether a write-down is needed.',
   [['Decision',['Write down to NRV','No write-down']]],[
   ['Notebooks: cost $250, NRV $200.','Write down to NRV','NRV is below cost: write down $50 per unit.'],
   ['Printers: cost $100, NRV $110.','No write-down','NRV above cost; holding gains are not recognized.'],
   ['Seasonal goods: cost $40, NRV $35.','Write down to NRV','NRV below cost.'],
   ['Tablets: cost $300, NRV $300.','No write-down','NRV equals cost.']],4),
  K('b7-lcnrv2','HP write-down','1,000 notebooks: cost $250 each, NRV $200 each.',[
   {l:'Write-down ($)',n:50000,x:'(250 − 200) × 1,000.'},
   {l:'Debit side of the entry',opts:['Cost of goods sold','Inventory','Sales revenue'],key:'Cost of goods sold',x:'The holding loss is added to cost of goods sold; credit Inventory.'}],'Debit COGS, credit Inventory.',2),
  C('b7-fob','Who owns the goods? (E7-1)','Does each item require an adjustment to the physical count?',
   [['Adjustment',['Add to ending inventory','No adjustment']]],[
   ['Goods purchased, in transit, FOB shipping point.','Add to ending inventory','The buyer owns them once shipped.'],
   ['Samples held by a customer on trial.','Add to ending inventory','Still owned by the vendor; no sale.'],
   ['Goods shipped to customers FOB shipping point.','No adjustment','Ownership passed at shipment; they are not in the count.'],
   ['Goods sold and in transit, FOB destination.','Add to ending inventory','Seller owns them until they arrive.']],4)
 );
 BUILD['BUS2108:7'].push(
  K('g7-tariff','Tariff calculation','A Hong Kong toy costs HKD 100 to export to Country A.',[
   {l:'Price with a 20% ad valorem tariff (HKD)',n:120,x:'100 × 1.20.'},
   {l:'Price with a specific tariff of HKD 15 per toy (HKD)',n:115,x:'100 + 15.'},
   {l:'Price with a 35% ad valorem tariff (HKD)',n:135,x:'100 × 1.35.'}],'Ad valorem: proportion of value; specific: fixed charge per unit.',3),
  C('g7-instr','Which instrument?','Classify each policy.',
   [['Instrument',['Tariff','Subsidy','Import quota','Voluntary export restraint','Local content requirement','Administrative policy','Antidumping duty']]],[
   ['The exporting country caps its car shipments at the importer’s request.','Voluntary export restraint'],
   ['Streaming services must invest in local films.','Local content requirement'],
   ['Duty on goods sold abroad below fair value.','Antidumping duty'],
   ['Government payment to domestic farmers.','Subsidy'],
   ['Bureaucratic rules that delay imports.','Administrative policy'],
   ['Direct cap on the quantity imported.','Import quota'],
   ['A tax on imports.','Tariff']],7),
  C('g7-who','Who gains and who loses?','Who benefits?',
   [['Beneficiary',['Producers','Consumers','Government']]],[
   ['Tariffs: protection from foreign competitors.','Producers'],
   ['Tariffs: revenue.','Government'],
   ['Free trade: lower prices.','Consumers'],
   ['Subsidies: help against low-cost imports.','Producers'],
   ['Quota rent for those allowed to import.','Producers']],5),
  C('g7-lcr','Local content requirements','Advantage or disadvantage?',
   [['Type',['Advantage','Disadvantage']]],[
   ['Job creation.','Advantage'],['Higher costs.','Disadvantage'],['Skills and technological development.','Advantage'],['Trade retaliation.','Disadvantage'],['Industrial diversification.','Advantage'],['Market misallocation.','Disadvantage']],6),
  C('g7-arg','Arguments for intervention','Political or economic argument?',
   [['Type',['Political','Economic']]],[
   ['Protecting national security.','Political'],['Infant industry argument.','Economic'],['Strategic trade policy.','Economic'],['Protecting jobs and industries.','Political'],['Protecting human rights.','Political']],5),
 );
 BUILD['BUS2108:6'].push(
  C('g6-bop','Balance of payments accounts','Classify each transaction.',
   [['Account',['Current account','Capital account','Financial account']]],[
   ['Exports of iron ore.','Current account'],
   ['Debt forgiveness.','Capital account'],
   ['Emergency food aid.','Current account','Secondary income (current transfer).'],
   ['Buying 15% of the voting shares of a foreign company.','Financial account','Direct investment: 10% or more of voting power.'],
   ['Dividends received from abroad.','Current account','Primary income.'],
   ['Buying a small stake of foreign shares without influence.','Financial account','Portfolio investment.'],
   ['Selling a brand name to a foreign owner.','Capital account','Non-produced, non-financial asset.']],7),
  C('g6-cd','Credit or debit?','Entry in the home country’s balance of payments.',
   [['Entry',['Credit','Debit']]],[
   ['Export of wheat.','Credit'],['Payment for imported oil.','Debit'],['Wages earned by residents abroad.','Credit'],['Dividends paid to foreign shareholders.','Debit']],4),
  K('g6-calc','Trade balance','A country exports goods worth $90 billion and services $30 billion, and imports goods worth $80 billion and services $20 billion.',[
   {l:'Trade balance ($ billion)',n:20,x:'(90 + 30) − (80 + 20).'},
   {l:'Surplus or deficit?',opts:['Surplus','Deficit'],key:'Surplus',x:'Exports exceed imports.'}],'Trade balance = exports − imports of goods and services.',2),
  K('g6-concepts','BoP concepts','Answer.',[
   {l:'The total balance of payments should equal',opts:['Zero','Exports','GDP'],key:'Zero',x:'Every transaction has two offsetting entries.'},
   {l:'The item that makes the BoP balance',opts:['Net errors and omissions','Reserve assets','Secondary income'],key:'Net errors and omissions',x:'It covers measurement errors and unrecorded transactions.'},
   {l:'Direct investment means voting power of at least (%)',n:10,x:'10 percent or more of voting power.'}],'Review the structure of the BoP.',3)
 );
 BUILD['BUS1103:7'].push(
  K('b7-e713','E7-13: Sanchez lower of cost or NRV','A: 30 units, cost $20, NRV $15. B: 55 units, cost $40, NRV $44. C: 35 units, cost $52, NRV $55. D: 15 units, cost $27, NRV $32.',[
   {l:'Item A: lower of cost or NRV, total ($)',n:450,x:'30 × 15 (NRV is lower).'},
   {l:'Item B: lower of cost or NRV, total ($)',n:2200,x:'55 × 40 (cost is lower).'},
   {l:'Item C: lower of cost or NRV, total ($)',n:1820,x:'35 × 52.'},
   {l:'Item D: lower of cost or NRV, total ($)',n:405,x:'15 × 27.'},
   {l:'Ending inventory valuation ($)',n:4875,x:'450 + 2,200 + 1,820 + 405.'},
   {l:'Increase in cost of goods sold from the write-down ($)',n:150,x:'Total cost 5,025 − 4,875.'}],'Apply the rule item by item, then add.',6),
  K('b7-e722','E7-22: cash discounts, gross method','Scott’s Cycles: sale of $1,500 (cost $975), terms 2/15, n/30, on Feb. 1. Purchase of $9,000 on Mar. 4, terms 3/10, n/30.',[
   {l:'Cash received if paid Feb. 9 ($)',n:1470,x:'1,500 − 2% × 1,500.'},
   {l:'Sales discounts recorded Feb. 9 ($)',n:30,x:'0.02 × 1,500.'},
   {l:'Cash received if paid Mar. 2 ($)',n:1500,x:'After the discount period: full amount.'},
   {l:'Cash paid on Mar. 12 ($)',n:8730,x:'9,000 − 3% × 9,000.'},
   {l:'Credit to Inventory on Mar. 12 ($)',n:270,x:'The purchase discount reduces inventory cost.'},
   {l:'Cash paid on Mar. 28 ($)',n:9000,x:'After the discount period.'}],'Gross method: record the full invoice, then record the discount only if taken.',6)
 );
}

/* ================= BUS1103 · Mock midterm A (2h30 · 100 marks · closed book) ================= */
{
 BUILD['BUS1103:mock1']=[{"id":"mk1-q01","t":"mcq","num":"1","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q1 · Ch.1","stem":["The assumption that the transactions of a business are recorded separately from the personal transactions of its owners is the:"],"opts":["Economic entity assumption","Going concern assumption","Monetary unit assumption","Periodicity assumption"],"key":"A","expl":"Economic (separate) entity assumption: the business is the unit being accounted for. Going concern is about continuing operations, periodicity about reporting in periods."},{"id":"mk1-q02","t":"mcq","num":"2","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q2 · Ch.1","stem":["Where is the ending balance of retained earnings reported?"],"opts":["On the income statement only","On the statement of cash flows only","On the income statement and the statement of cash flows","On the balance sheet and on the statement of stockholders’ equity"],"key":"D","expl":"Net income increases retained earnings in the statement of stockholders’ equity; the ending balance is carried to the balance sheet."},{"id":"mk1-q03","t":"mcq","num":"3","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q3 · Ch.1","stem":["A company records the purchase of a $30 stapler as an expense immediately instead of depreciating it over several years, because the amount could not change any user’s decision. Which concept justifies this?"],"opts":["Materiality","Full disclosure","Conservatism","Expense recognition (matching)"],"key":"A","expl":"Materiality: immaterial items do not need to follow the normal principles strictly."},{"id":"mk1-q04","t":"mcq","num":"4","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q4 · Ethics","stem":["Which of the following is NOT one of the five fundamental principles of the HKICPA Code of Ethics?"],"opts":["Objectivity","Integrity","Profitability","Confidentiality"],"key":"C","expl":"The five principles are integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour."},{"id":"mk1-q05","t":"mcq","num":"5","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q5 · Ethics","stem":["An accountant tells a friend which company her audit client is about to acquire so that the friend can buy shares before the announcement. Which principle is breached most directly?"],"opts":["Professional competence and due care","Professional behaviour","Objectivity","Confidentiality"],"key":"D","expl":"Information obtained through a professional relationship must not be disclosed or exploited without authority: confidentiality."},{"id":"mk1-q06","t":"mcq","num":"6","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q6 · Ethics","stem":["In the six-step ethical decision-making process, which step comes immediately after identifying the stakeholders?"],"opts":["Consider the likely effects of the decision on the stakeholders","Choose the best course of action","Identify the relevant ethical principles","Identify the alternative courses of action"],"key":"A","expl":"Order: (1) the ethical issue, (2) the stakeholders, (3) the likely effects on them, (4) the relevant principles, (5) the alternatives, (6) the best course of action."},{"id":"mk1-q07","t":"mcq","num":"7","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q7 · Ch.1–2","stem":["A company buys a machine: invoice price $40,000, delivery $1,500, installation and testing $2,500, first-year insurance $900, and a $300 repair one month after use starts. What amount is debited to Equipment?"],"opts":["$44,900","$43,000","$45,200","$44,000"],"key":"D","expl":"Historical cost = all costs to acquire the asset and make it ready for use: 40,000 + 1,500 + 2,500 = 44,000. Insurance for a later period (prepaid) and repairs after use are not part of the cost."},{"id":"mk1-q08","t":"mcq","num":"8","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q8 · Ch.2","stem":["Which of these accounts normally has a debit balance?"],"opts":["Accounts payable","Unearned revenue","Retained earnings","Dividends declared"],"key":"D","expl":"Assets, expenses and dividends declared increase with debits. Liabilities, revenues and equity (except dividends) increase with credits."},{"id":"mk1-q09","t":"mcq","num":"9","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q9 · Ch.2–3","stem":["A customer pays $900 on account. The bookkeeper records Dr Cash 900 and Cr Service revenue 900. Which statement is correct?"],"opts":["Cash is overstated by $900","Revenue and accounts receivable are both overstated by $900, and the trial balance still balances","Revenue is overstated by $900, but accounts receivable is correct","The trial balance does not balance"],"key":"B","expl":"The right entry is Dr Cash, Cr Accounts receivable. Crediting revenue overstates revenue (and net income) and leaves receivable too high; debits still equal credits, so the trial balance cannot detect the error."},{"id":"mk1-q10","t":"mcq","num":"10","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q10 · Ch.2","stem":["Which item is classified as a noncurrent asset on a classified balance sheet?"],"opts":["Inventory expected to be sold within 90 days","Land held for a future plant site","Prepaid rent for the next six months","Accounts receivable due in 45 days"],"key":"B","expl":"Current assets are cash and items expected to be used or turned into cash within one year or the operating cycle. Land held for future use is noncurrent."},{"id":"mk1-q11","t":"mcq","num":"11","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q11 · Ch.1–2","stem":["Beginning retained earnings are $15,000. For the year: revenues $90,000, expenses $70,000 (all paid), dividends declared $8,000 of which $3,000 are still unpaid. What are the ending retained earnings?"],"opts":["$24,000","$30,000","$35,000","$27,000"],"key":"D","expl":"Dividends reduce retained earnings when DECLARED (8,000), whether or not paid: 15,000 + (90,000 − 70,000) − 8,000 = 27,000."},{"id":"mk1-q12","t":"mcq","num":"12","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q12 · Ch.3","stem":["Under accrual accounting, revenue is recognized when:"],"opts":["The invoice is mailed","Control of the goods or services is transferred to the customer","The customer places an order","Cash is collected"],"key":"B","expl":"Revenue recognition principle: record revenue when the company transfers goods or services to customers, whatever the timing of the cash."},{"id":"mk1-q13","t":"mcq","num":"13","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q13 · Ch.3","stem":["Employees earned $9,000 of wages in December. The company paid $2,500 in December and the remaining wages in January. What are December wages expense and December cash paid for wages?"],"opts":["Expense $2,500; cash paid $9,000","Expense $6,500; cash paid $2,500","Expense $9,000; cash paid $2,500","Expense $9,000; cash paid $9,000"],"key":"C","expl":"Accrual accounting records the full 9,000 as December expense; only 2,500 left the bank in December. The 6,500 is Wages payable at year-end."},{"id":"mk1-q14","t":"mcq","num":"14","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q14 · Ch.3","stem":["On October 1 a company pays $12,000 for a one-year insurance policy. What is the correct entry on October 1?"],"opts":["Dr Prepaid insurance 12,000; Cr Insurance expense 12,000","Dr Insurance expense 12,000; Cr Cash 12,000","Dr Cash 12,000; Cr Prepaid insurance 12,000","Dr Prepaid insurance 12,000; Cr Cash 12,000"],"key":"D","expl":"Paying in advance creates an asset (prepaid insurance). It becomes an expense gradually through adjusting entries."},{"id":"mk1-q15","t":"mcq","num":"15","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q15 · Ch.3","stem":["A company reports net sales $80,000, cost of goods sold $48,000, SG&A expense $20,000, interest revenue $500, interest expense $2,000 and income tax expense $1,800. What is net income?"],"opts":["$10,200","$8,700","$10,500","$12,000"],"key":"B","expl":"Operating income 80,000 − 48,000 − 20,000 = 12,000; + 500 − 2,000 = pretax income 10,500; − tax 1,800 = net income 8,700."},{"id":"mk1-q16","t":"mcq","num":"16","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q16 · Ch.4","stem":["Which of the following is an adjusting entry for ACCRUED REVENUE?"],"opts":["Recording the part of prepaid insurance that has expired","Recording wages owed to employees but not yet paid","Recording interest earned on a note receivable but not yet received","Recording the part of customer deposits that has now been earned"],"key":"C","expl":"Accrued revenue = earned but not yet received or recorded (Dr receivable, Cr revenue). Earned customer deposits are deferred revenue, expired prepaid insurance is a deferred expense and unpaid wages are an accrued expense."},{"id":"mk1-q17","t":"mcq","num":"17","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q17 · Ch.4","stem":["Equipment costing $50,000 is bought on October 1. Residual value is $5,000 and the useful life is 5 years (straight-line). What is depreciation expense for the year ended December 31?"],"opts":["$2,500","$2,250","$750","$9,000"],"key":"B","expl":"(50,000 − 5,000) ÷ 5 = 9,000 per year; × 3/12 = 2,250. Residual value is deducted; the fraction of the year is applied."},{"id":"mk1-q18","t":"mcq","num":"18","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q18 · Ch.4","stem":["Which account is NOT closed at the end of the year?"],"opts":["Dividends declared","Accumulated depreciation","Service revenue","Wages expense"],"key":"B","expl":"Accumulated depreciation is a permanent (balance sheet) account. Revenues, expenses and dividends declared are temporary accounts."},{"id":"mk1-q19","t":"mcq","num":"19","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q19 · Ch.4","stem":["After revenues and expenses have been closed, Income summary has a credit balance of $18,000. What is the next closing entry?"],"opts":["Dr Income summary 18,000; Cr Dividends declared 18,000","Dr Retained earnings 18,000; Cr Cash 18,000","Dr Income summary 18,000; Cr Retained earnings 18,000","Dr Retained earnings 18,000; Cr Income summary 18,000"],"key":"C","expl":"A credit balance in Income summary is net income. Debit Income summary to clear it and credit Retained earnings."},{"id":"mk1-q20","t":"mcq","num":"20","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q20 · Ch.4","stem":["At year-end two adjustments were forgotten: accrued wages of $2,000 and the expired part of prepaid insurance, $1,500. What is the effect on the year-end statements?"],"opts":["Net income overstated by $3,500; liabilities understated by $2,000; assets overstated by $1,500","Net income overstated by $3,500; liabilities understated by $3,500","Net income understated by $3,500; assets overstated by $1,500","Net income overstated by $2,000; liabilities understated by $2,000"],"key":"A","expl":"Missing Dr Wages expense / Cr Wages payable (expenses −2,000, liabilities −2,000) and Dr Insurance expense / Cr Prepaid insurance (expenses −1,500, assets +1,500 too high). Expenses are 3,500 too low, so net income is 3,500 too high."},{"id":"mk1-q21","t":"mcq","num":"21","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q21 · Ch.6","stem":["Goods are shipped on December 29 FOB destination and arrive on January 3. The seller pays the freight. When does the seller record the sale, and who owns the goods in transit at December 31?"],"opts":["December; the buyer owns them","January; the seller owns them","January; the buyer owns them","December; the seller owns them"],"key":"B","expl":"FOB destination: title passes on delivery (January 3). At December 31 the goods are still the seller’s, and the sale is recorded in January."},{"id":"mk1-q22","t":"mcq","num":"22","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q22 · Ch.6","stem":["A store makes a $2,000 sale paid by credit card. The card company charges a 3% fee. Which entry is correct?"],"opts":["Dr Cash 1,940; Dr Credit card discount expense 60; Cr Sales revenue 2,000","Dr Cash 1,940; Cr Sales revenue 1,940","Dr Cash 1,940; Dr Sales discounts 60; Cr Sales revenue 2,000","Dr Cash 2,000; Cr Sales revenue 2,000"],"key":"A","expl":"The card fee is an SG&A expense, not a contra-revenue, so sales revenue stays at the full 2,000."},{"id":"mk1-q23","t":"mcq","num":"23","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q23 · Ch.6","stem":["A $4,000 sale on account (terms 2/10, n/30) is invoiced on March 5. On March 8 the customer returns $500 of goods; on March 14 it pays the balance. How much cash is received?"],"opts":["$3,500","$3,440","$3,430","$3,920"],"key":"C","expl":"Balance owed after the return: 4,000 − 500 = 3,500. Paid on day 9 (within 10 days): 3,500 × 98% = 3,430. The discount applies to the balance after returns."},{"id":"mk1-q24","t":"mcq","num":"24","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q24 · Ch.6","stem":["Gross sales are $90,000 (of which $20,000 were credit card sales). Sales returns are $4,000, sales discounts are $1,500 and credit card fees are $600. What are net sales?"],"opts":["$84,500","$88,500","$85,400","$83,900"],"key":"A","expl":"Net sales = 90,000 − 4,000 − 1,500 = 84,500. The credit card fee is an SG&A expense, not a deduction from net sales."},{"id":"mk1-q25","t":"mcq","num":"25","sec":"Part A · Multiple choice (25 marks · 1 mark each · about 30 min)","title":"Q25 · Ch.6","stem":["A customer returns merchandise with a selling price of $600 that was bought on account and not yet paid. Which entry is correct?"],"opts":["Dr Accounts receivable 600; Cr Sales returns and allowances 600","Dr Sales discounts 600; Cr Accounts receivable 600","Dr Sales revenue 600; Cr Cash 600","Dr Sales returns and allowances 600; Cr Accounts receivable 600"],"key":"D","expl":"Returns reduce revenue through the contra-revenue account Sales returns and allowances, and reduce what the customer owes."},{"id":"mk1-p1a","t":"je","min":16,"sec":"Problem 1 · Northgate Surf School (Chapter 2) · 15 marks · about 20 min","title":"Problem 1 (a)–(i) · Journal entries (9 marks)","stem":["Northgate Surf School began operations on January 1. Record each transaction as a journal entry."],"txs":[{"k":"(a)","text":"The owners invest $40,000 cash in the business in exchange for common stock.","lines":[{"a":"Cash","n":40000,"s":"D"},{"a":"Common stock","n":40000,"s":"C"}]},{"k":"(b)","text":"Northgate borrows $15,000 from a bank and signs a one-year note.","lines":[{"a":"Cash","n":15000,"s":"D"},{"a":"Short-term notes payable","n":15000,"s":"C"}]},{"k":"(c)","text":"It buys surfboards for $18,000: $6,000 in cash, the rest on account.","lines":[{"a":"Equipment","n":18000,"s":"D"},{"a":"Cash","n":6000,"s":"C"},{"a":"Accounts payable","n":12000,"s":"C"}]},{"k":"(d)","text":"It pays $2,400 cash for twelve months of rent in advance.","lines":[{"a":"Prepaid rent","n":2400,"s":"D"},{"a":"Cash","n":2400,"s":"C"}],"note":"An advance payment is an asset (prepaid rent), not yet an expense."},{"k":"(e)","text":"It gives lessons for $13,000: $9,000 is received in cash and $4,000 is billed to customers.","lines":[{"a":"Cash","n":9000,"s":"D"},{"a":"Accounts receivable","n":4000,"s":"D"},{"a":"Service revenue","n":13000,"s":"C"}]},{"k":"(f)","text":"It collects $1,500 from customers billed in (e).","lines":[{"a":"Cash","n":1500,"s":"D"},{"a":"Accounts receivable","n":1500,"s":"C"}],"note":"Collecting a receivable only swaps one asset for another; no new revenue."},{"k":"(g)","text":"It pays wages of $3,100 in cash.","lines":[{"a":"Wages expense","n":3100,"s":"D"},{"a":"Cash","n":3100,"s":"C"}]},{"k":"(h)","text":"It pays $5,000 on account to the surfboard supplier and declares and pays dividends of $1,000.","lines":[{"a":"Accounts payable","n":5000,"s":"D"},{"a":"Dividends declared","n":1000,"s":"D"},{"a":"Cash","n":6000,"s":"C"}]},{"k":"(i)","text":"A local school pays Northgate $2,000 in advance for lessons that will start next month.","lines":[{"a":"Cash","n":2000,"s":"D"},{"a":"Unearned revenue","n":2000,"s":"C"}],"note":"Cash received before the service is performed creates a liability, not revenue."}]},{"id":"mk1-p1b","t":"calc","min":6,"sec":"Problem 1 · Northgate Surf School (Chapter 2) · 15 marks · about 20 min","title":"Problem 1 (j) · Balances after the nine entries (6 marks)","stem":["Using your entries (a)–(i), compute the following at the end of the period."],"parts":[{"l":"Cash ($)","n":50000,"pre":"$","x":"40,000 + 15,000 − 6,000 − 2,400 + 9,000 + 1,500 − 3,100 − 6,000 + 2,000 = 50,000."},{"l":"Total assets ($)","n":72900,"pre":"$","x":"Cash 50,000 + receivable 2,500 + prepaid rent 2,400 + equipment 18,000 = 72,900."},{"l":"Total liabilities ($)","n":24000,"pre":"$","x":"Accounts payable 7,000 + notes payable 15,000 + unearned revenue 2,000 = 24,000."},{"l":"Net income ($)","n":9900,"pre":"$","x":"Revenue 13,000 − wages 3,100 = 9,900. The 2,000 deposit is NOT revenue yet and dividends are not an expense."},{"l":"Ending retained earnings ($)","n":8900,"pre":"$","x":"Net income 9,900 − dividends 1,000 = 8,900."},{"l":"Total stockholders’ equity ($)","n":48900,"pre":"$","x":"Common stock 40,000 + retained earnings 8,900 = 48,900. Check: 24,000 + 48,900 = 72,900 = total assets."}],"expl":"The accounting equation must balance: assets 72,900 = liabilities 24,000 + common stock 40,000 + retained earnings 8,900."},{"id":"mk1-p2","t":"je","min":22,"sec":"Problem 2 · Alder Creek Adventures Ltd. (Chapter 4) · 16 marks · about 25 min","title":"Problem 2 (a)–(h) · Adjusting entries (16 marks · 2 each: type + entry)","stem":["Alder Creek Adventures Ltd. runs guided outdoor trips. Its year ends December 31, 2026. The unadjusted trial balance is:",{"rows":[["Account","Debit","Credit"],["Cash","46,000",""],["Accounts receivable","9,700",""],["Supplies","3,000",""],["Prepaid insurance","4,800",""],["Equipment","42,000",""],["Accounts payable","","11,900"],["Unearned revenue","","7,000"],["Short-term notes payable","","10,000"],["Common stock","","50,000"],["Retained earnings (January 1)","","6,200"],["Dividends declared","6,000",""],["Service revenue","","79,800"],["Wages expense","41,400",""],["Rent expense","12,000",""],["Totals","164,900","164,900"]]},"For each item (a)–(h), choose the type of adjustment and record the adjusting entry."],"txs":[{"k":"(a)","text":"Supplies on hand at December 31 total $1,000.","lines":[{"a":"Supplies expense","n":2000,"s":"D"},{"a":"Supplies","n":2000,"s":"C"}],"note":"Supplies available 3,000 − on hand 1,000 = 2,000 used.","pre":[{"l":"Type of adjustment","opts":["Deferred revenue","Deferred expense","Accrued revenue","Accrued expense","Depreciation"],"key":"Deferred expense"}]},{"k":"(b)","text":"The insurance premium of $4,800 bought a 12-month policy that started on July 1.","lines":[{"a":"Insurance expense","n":2400,"s":"D"},{"a":"Prepaid insurance","n":2400,"s":"C"}],"note":"4,800 × 6/12 = 2,400 expired (July–December).","pre":[{"l":"Type of adjustment","opts":["Deferred revenue","Deferred expense","Accrued revenue","Accrued expense","Depreciation"],"key":"Deferred expense"}]},{"k":"(c)","text":"The equipment ($42,000) was bought on July 1. Useful life 7 years, no residual value, straight-line.","lines":[{"a":"Depreciation expense","n":3000,"s":"D"},{"a":"Accumulated depreciation","n":3000,"s":"C"}],"note":"42,000 ÷ 7 = 6,000 per year × 6/12 = 3,000. ","pre":[{"l":"Type of adjustment","opts":["Deferred revenue","Deferred expense","Accrued revenue","Accrued expense","Depreciation"],"key":"Depreciation"}]},{"k":"(d)","text":"Of the $7,000 in Unearned revenue (customer prepayments), $5,000 has now been earned.","lines":[{"a":"Unearned revenue","n":5000,"s":"D"},{"a":"Service revenue","n":5000,"s":"C"}],"note":"The liability shrinks as the service is performed.","pre":[{"l":"Type of adjustment","opts":["Deferred revenue","Deferred expense","Accrued revenue","Accrued expense","Depreciation"],"key":"Deferred revenue"}]},{"k":"(e)","text":"Services worth $3,000 were performed in December but not yet billed or recorded.","lines":[{"a":"Accounts receivable","n":3000,"s":"D"},{"a":"Service revenue","n":3000,"s":"C"}],"note":"Earned but not recorded: receivable up, revenue up.","pre":[{"l":"Type of adjustment","opts":["Deferred revenue","Deferred expense","Accrued revenue","Accrued expense","Depreciation"],"key":"Accrued revenue"}]},{"k":"(f)","text":"Employees earned $1,800 of wages in the last days of December; they will be paid in January.","lines":[{"a":"Wages expense","n":1800,"s":"D"},{"a":"Wages payable","n":1800,"s":"C"}],"pre":[{"l":"Type of adjustment","opts":["Deferred revenue","Deferred expense","Accrued revenue","Accrued expense","Depreciation"],"key":"Accrued expense"}]},{"k":"(g)","text":"The $10,000 note payable carries 6% annual interest and was issued on September 1. No interest has been paid or recorded.","lines":[{"a":"Interest expense","n":200,"s":"D"},{"a":"Interest payable","n":200,"s":"C"}],"note":"10,000 × 6% × 4/12 = 200 (September–December).","pre":[{"l":"Type of adjustment","opts":["Deferred revenue","Deferred expense","Accrued revenue","Accrued expense","Depreciation"],"key":"Accrued expense"}]},{"k":"(h)","text":"Income tax expense for the year is estimated at $5,000, to be paid next year.","lines":[{"a":"Income tax expense","n":5000,"s":"D"},{"a":"Income taxes payable","n":5000,"s":"C"}],"note":"Income tax comes last: it depends on pretax income after all other adjustments.","pre":[{"l":"Type of adjustment","opts":["Deferred revenue","Deferred expense","Accrued revenue","Accrued expense","Depreciation"],"key":"Accrued expense"}]}]},{"id":"mk1-p3a","t":"fs","min":8,"cap":"Income statement","head":["Income statement","For the year ended …"],"sec":"Problem 3 · Financial statements (Chapters 1 and 3) · 14 marks · about 20 min","title":"Problem 3 (a) · Income statement (6 marks)","stem":["Alder Creek Adventures Ltd. (Problem 2). Unadjusted trial balance at December 31, 2026:",{"rows":[["Account","Debit","Credit"],["Cash","46,000",""],["Accounts receivable","9,700",""],["Supplies","3,000",""],["Prepaid insurance","4,800",""],["Equipment","42,000",""],["Accounts payable","","11,900"],["Unearned revenue","","7,000"],["Short-term notes payable","","10,000"],["Common stock","","50,000"],["Retained earnings (January 1)","","6,200"],["Dividends declared","6,000",""],["Service revenue","","79,800"],["Wages expense","41,400",""],["Rent expense","12,000",""],["Totals","164,900","164,900"]]},"Adjusting information (a)–(h) from Problem 2:",{"rows":[["Item","Adjusting information"],["(a)","Supplies on hand at December 31 total $1,000."],["(b)","The insurance premium of $4,800 bought a 12-month policy that started on July 1."],["(c)","The equipment ($42,000) was bought on July 1. Useful life 7 years, no residual value, straight-line."],["(d)","Of the $7,000 in Unearned revenue (customer prepayments), $5,000 has now been earned."],["(e)","Services worth $3,000 were performed in December but not yet billed or recorded."],["(f)","Employees earned $1,800 of wages in the last days of December; they will be paid in January."],["(g)","The $10,000 note payable carries 6% annual interest and was issued on September 1. No interest has been paid or recorded."],["(h)","Income tax expense for the year is estimated at $5,000, to be paid next year."]]},"There is NO adjusted trial balance: use the unadjusted trial balance and your own adjusting entries (a)–(h). Prepare the income statement for 2026, with subtotals for total operating expenses, operating income and pretax income."],"rows":[{"l":"Service revenue","n":87800},{"l":"Wages expense","n":43200},{"l":"Rent expense","n":12000},{"l":"Supplies expense","n":2000},{"l":"Insurance expense","n":2400},{"l":"Depreciation expense","n":3000},{"l":"Total operating expenses","n":62600,"tot":1},{"l":"Operating income","n":25200,"tot":1},{"l":"Interest expense","n":200},{"l":"Pretax income","n":25000,"tot":1},{"l":"Income tax expense","n":5000},{"l":"Net income","n":20000,"tot":1}],"note":"Operating expenses 62,600 = 43,200 + 12,000 + 2,000 + 2,400 + 3,000. Operating income 25,200; pretax 25,000; net income 20,000. Dividends never appear on the income statement."},{"id":"mk1-p3b","t":"fs","min":5,"cap":"Statement of stockholders’ equity","head":["Statement of stockholders’ equity","For the year ended …"],"cols":["Common stock","Retained earnings"],"labels":["Balance, January 1, 2026","Net income","Dividends","Balance, December 31, 2026","Issuance of common stock"],"sec":"Problem 3 · Financial statements (Chapters 1 and 3) · 14 marks · about 20 min","title":"Problem 3 (b) · Statement of stockholders’ equity (3 marks)","stem":["Alder Creek Adventures Ltd. (Problem 2). Unadjusted trial balance at December 31, 2026:",{"rows":[["Account","Debit","Credit"],["Cash","46,000",""],["Accounts receivable","9,700",""],["Supplies","3,000",""],["Prepaid insurance","4,800",""],["Equipment","42,000",""],["Accounts payable","","11,900"],["Unearned revenue","","7,000"],["Short-term notes payable","","10,000"],["Common stock","","50,000"],["Retained earnings (January 1)","","6,200"],["Dividends declared","6,000",""],["Service revenue","","79,800"],["Wages expense","41,400",""],["Rent expense","12,000",""],["Totals","164,900","164,900"]]},"Adjusting information (a)–(h) from Problem 2:",{"rows":[["Item","Adjusting information"],["(a)","Supplies on hand at December 31 total $1,000."],["(b)","The insurance premium of $4,800 bought a 12-month policy that started on July 1."],["(c)","The equipment ($42,000) was bought on July 1. Useful life 7 years, no residual value, straight-line."],["(d)","Of the $7,000 in Unearned revenue (customer prepayments), $5,000 has now been earned."],["(e)","Services worth $3,000 were performed in December but not yet billed or recorded."],["(f)","Employees earned $1,800 of wages in the last days of December; they will be paid in January."],["(g)","The $10,000 note payable carries 6% annual interest and was issued on September 1. No interest has been paid or recorded."],["(h)","Income tax expense for the year is estimated at $5,000, to be paid next year."]]},"Prepare Alder Creek’s statement of stockholders’ equity for 2026. No stock was issued during the year."],"rows":[{"l":"Balance, January 1, 2026","v":[50000,6200]},{"l":"Net income","v":[null,20000]},{"l":"Dividends","v":[null,6000]},{"l":"Balance, December 31, 2026","v":[50000,20200]}],"note":"Beginning retained earnings 6,200 + net income 20,000 − dividends 6,000 = 20,200. The retained-earnings balance is the figure carried to the balance sheet."},{"id":"mk1-p3c","t":"fs","min":9,"cap":"Balance sheet","head":["Balance sheet","At … (a point in time)"],"sec":"Problem 3 · Financial statements (Chapters 1 and 3) · 14 marks · about 20 min","title":"Problem 3 (c) · Classified balance sheet (5 marks)","stem":["Alder Creek Adventures Ltd. (Problem 2). Unadjusted trial balance at December 31, 2026:",{"rows":[["Account","Debit","Credit"],["Cash","46,000",""],["Accounts receivable","9,700",""],["Supplies","3,000",""],["Prepaid insurance","4,800",""],["Equipment","42,000",""],["Accounts payable","","11,900"],["Unearned revenue","","7,000"],["Short-term notes payable","","10,000"],["Common stock","","50,000"],["Retained earnings (January 1)","","6,200"],["Dividends declared","6,000",""],["Service revenue","","79,800"],["Wages expense","41,400",""],["Rent expense","12,000",""],["Totals","164,900","164,900"]]},"Adjusting information (a)–(h) from Problem 2:",{"rows":[["Item","Adjusting information"],["(a)","Supplies on hand at December 31 total $1,000."],["(b)","The insurance premium of $4,800 bought a 12-month policy that started on July 1."],["(c)","The equipment ($42,000) was bought on July 1. Useful life 7 years, no residual value, straight-line."],["(d)","Of the $7,000 in Unearned revenue (customer prepayments), $5,000 has now been earned."],["(e)","Services worth $3,000 were performed in December but not yet billed or recorded."],["(f)","Employees earned $1,800 of wages in the last days of December; they will be paid in January."],["(g)","The $10,000 note payable carries 6% annual interest and was issued on September 1. No interest has been paid or recorded."],["(h)","Income tax expense for the year is estimated at $5,000, to be paid next year."]]},"Prepare Alder Creek’s classified balance sheet at December 31, 2026."],"rows":[{"l":"Cash","n":46000},{"l":"Accounts receivable","n":12700},{"l":"Supplies","n":1000},{"l":"Prepaid insurance","n":2400},{"l":"Total current assets","n":62100,"tot":1},{"l":"Equipment","n":42000},{"l":"Accumulated depreciation","n":3000},{"l":"Total assets","n":101100,"tot":1},{"l":"Accounts payable","n":11900},{"l":"Unearned revenue","n":2000},{"l":"Wages payable","n":1800},{"l":"Interest payable","n":200},{"l":"Income taxes payable","n":5000},{"l":"Short-term notes payable","n":10000},{"l":"Total current liabilities","n":30900,"tot":1},{"l":"Total liabilities","n":30900,"tot":1},{"l":"Common stock","n":50000},{"l":"Retained earnings","n":20200},{"l":"Total stockholders’ equity","n":70200,"tot":1},{"l":"Total liabilities and stockholders’ equity","n":101100,"tot":1}],"note":"Equipment 42,000 − accumulated depreciation 3,000 = 39,000 book value. Total assets 101,100 = liabilities 30,900 + equity 70,200. Unearned revenue (2,000) is a liability: the service is still owed."},{"id":"mk1-p4a","t":"je","min":7,"sec":"Problem 4 · Closing entries (Chapter 4) · 6 marks · about 8 min","title":"Problem 4 (a) · Closing entries, Income summary method (5 marks)","stem":["Alder Creek Adventures Ltd. (Problem 2). Unadjusted trial balance at December 31, 2026:",{"rows":[["Account","Debit","Credit"],["Cash","46,000",""],["Accounts receivable","9,700",""],["Supplies","3,000",""],["Prepaid insurance","4,800",""],["Equipment","42,000",""],["Accounts payable","","11,900"],["Unearned revenue","","7,000"],["Short-term notes payable","","10,000"],["Common stock","","50,000"],["Retained earnings (January 1)","","6,200"],["Dividends declared","6,000",""],["Service revenue","","79,800"],["Wages expense","41,400",""],["Rent expense","12,000",""],["Totals","164,900","164,900"]]},"Adjusting information (a)–(h) from Problem 2:",{"rows":[["Item","Adjusting information"],["(a)","Supplies on hand at December 31 total $1,000."],["(b)","The insurance premium of $4,800 bought a 12-month policy that started on July 1."],["(c)","The equipment ($42,000) was bought on July 1. Useful life 7 years, no residual value, straight-line."],["(d)","Of the $7,000 in Unearned revenue (customer prepayments), $5,000 has now been earned."],["(e)","Services worth $3,000 were performed in December but not yet billed or recorded."],["(f)","Employees earned $1,800 of wages in the last days of December; they will be paid in January."],["(g)","The $10,000 note payable carries 6% annual interest and was issued on September 1. No interest has been paid or recorded."],["(h)","Income tax expense for the year is estimated at $5,000, to be paid next year."]]},"Record the closing entries for Alder Creek at December 31, 2026 (Income summary method)."],"txs":[{"k":"Step 1","text":"Close the revenue account to Income summary.","lines":[{"a":"Service revenue","n":87800,"s":"D"},{"a":"Income summary","n":87800,"s":"C"}],"note":"Revenue has a credit balance, so debit it to bring it to zero."},{"k":"Step 2","text":"Close the expense accounts to Income summary.","lines":[{"a":"Income summary","n":67800,"s":"D"},{"a":"Wages expense","n":43200,"s":"C"},{"a":"Rent expense","n":12000,"s":"C"},{"a":"Supplies expense","n":2000,"s":"C"},{"a":"Insurance expense","n":2400,"s":"C"},{"a":"Depreciation expense","n":3000,"s":"C"},{"a":"Interest expense","n":200,"s":"C"},{"a":"Income tax expense","n":5000,"s":"C"}],"note":"7 expense credits (62,800 + 5,000 tax = 67,800) against one debit to Income summary."},{"k":"Step 3","text":"Close Income summary to Retained earnings.","lines":[{"a":"Income summary","n":20000,"s":"D"},{"a":"Retained earnings","n":20000,"s":"C"}],"note":"Income summary now has a credit balance of 87,800 − 67,800 = 20,000 = net income."},{"k":"Step 4","text":"Close Dividends declared to Retained earnings.","lines":[{"a":"Retained earnings","n":6000,"s":"D"},{"a":"Dividends declared","n":6000,"s":"C"}],"note":"Dividends are not an expense: they never pass through Income summary."}]},{"id":"mk1-p4b","t":"calc","min":1,"sec":"Problem 4 · Closing entries (Chapter 4) · 6 marks · about 8 min","title":"Problem 4 (b) · After closing (1 mark)","stem":["Alder Creek Adventures Ltd. (Problem 2). Unadjusted trial balance at December 31, 2026:",{"rows":[["Account","Debit","Credit"],["Cash","46,000",""],["Accounts receivable","9,700",""],["Supplies","3,000",""],["Prepaid insurance","4,800",""],["Equipment","42,000",""],["Accounts payable","","11,900"],["Unearned revenue","","7,000"],["Short-term notes payable","","10,000"],["Common stock","","50,000"],["Retained earnings (January 1)","","6,200"],["Dividends declared","6,000",""],["Service revenue","","79,800"],["Wages expense","41,400",""],["Rent expense","12,000",""],["Totals","164,900","164,900"]]},"Adjusting information (a)–(h) from Problem 2:",{"rows":[["Item","Adjusting information"],["(a)","Supplies on hand at December 31 total $1,000."],["(b)","The insurance premium of $4,800 bought a 12-month policy that started on July 1."],["(c)","The equipment ($42,000) was bought on July 1. Useful life 7 years, no residual value, straight-line."],["(d)","Of the $7,000 in Unearned revenue (customer prepayments), $5,000 has now been earned."],["(e)","Services worth $3,000 were performed in December but not yet billed or recorded."],["(f)","Employees earned $1,800 of wages in the last days of December; they will be paid in January."],["(g)","The $10,000 note payable carries 6% annual interest and was issued on September 1. No interest has been paid or recorded."],["(h)","Income tax expense for the year is estimated at $5,000, to be paid next year."]]},"After all closing entries are posted, what is the balance of Retained earnings at December 31, 2026?"],"parts":[{"l":"Retained earnings, after closing ($)","n":20200,"pre":"$","x":"6,200 + 20,000 − 6,000 = 20,200, the same figure as on the balance sheet."}],"expl":"All temporary accounts now have a zero balance."},{"id":"mk1-p5a","t":"je","min":16,"sec":"Problem 5 · Sunridge Cycles (Chapter 6, sales revenue) · 14 marks · about 20 min","title":"Problem 5 (a) · Sales journal entries (10 marks)","stem":["Sunridge Cycles sells bicycles and accessories. Record the sales-side journal entry for each event 1–10. (Cost of goods sold is outside this exam: ignore it.)"],"txs":[{"k":"1","text":"June 1: Sale on account of $4,000, terms 2/10, n/30.","lines":[{"a":"Accounts receivable","n":4000,"s":"D"},{"a":"Sales revenue","n":4000,"s":"C"}]},{"k":"2","text":"June 2: Credit card sales of $3,000. The card company deposits the amount less a 3% fee.","lines":[{"a":"Cash","n":2910,"s":"D"},{"a":"Credit card discount expense","n":90,"s":"D"},{"a":"Sales revenue","n":3000,"s":"C"}],"note":"The fee is an SG&A expense; sales revenue stays at the full 3,000."},{"k":"3","text":"June 3: Cash sales of $2,500.","lines":[{"a":"Cash","n":2500,"s":"D"},{"a":"Sales revenue","n":2500,"s":"C"}]},{"k":"4","text":"June 5: Sale on account of $1,500, terms 2/10, n/30.","lines":[{"a":"Accounts receivable","n":1500,"s":"D"},{"a":"Sales revenue","n":1500,"s":"C"}]},{"k":"5","text":"June 7: The customer in event 4 returns goods with a selling price of $300 (not yet paid for).","lines":[{"a":"Sales returns and allowances","n":300,"s":"D"},{"a":"Accounts receivable","n":300,"s":"C"}]},{"k":"6","text":"June 9: The customer in event 1 pays in full.","lines":[{"a":"Cash","n":3920,"s":"D"},{"a":"Sales discounts","n":80,"s":"D"},{"a":"Accounts receivable","n":4000,"s":"C"}],"note":"Paid on day 9: 4,000 × 2% = 80 discount; cash 3,920."},{"k":"7","text":"June 14: The customer in event 4 pays the balance due.","lines":[{"a":"Cash","n":1176,"s":"D"},{"a":"Sales discounts","n":24,"s":"D"},{"a":"Accounts receivable","n":1200,"s":"C"}],"note":"Balance 1,500 − 300 = 1,200; paid on day 9, discount 1,200 × 2% = 24; cash 1,176."},{"k":"8","text":"June 18: Sale on account of $2,000, terms 2/10, n/30.","lines":[{"a":"Accounts receivable","n":2000,"s":"D"},{"a":"Sales revenue","n":2000,"s":"C"}]},{"k":"9","text":"June 20: A customer who paid cash on June 3 returns goods with a selling price of $500 and receives a cash refund.","lines":[{"a":"Sales returns and allowances","n":500,"s":"D"},{"a":"Cash","n":500,"s":"C"}],"note":"The refund is paid in cash, so the credit is Cash, not Accounts receivable."},{"k":"10","text":"June 30: The customer in event 8 pays.","lines":[{"a":"Cash","n":2000,"s":"D"},{"a":"Accounts receivable","n":2000,"s":"C"}],"note":"June 30 is day 12: the discount period (10 days) has passed, so the full 2,000 is paid and no discount is recorded."}]},{"id":"mk1-p5b","t":"calc","min":6,"sec":"Problem 5 · Sunridge Cycles (Chapter 6, sales revenue) · 14 marks · about 20 min","title":"Problem 5 (b) · Net sales and cash (4 marks)","stem":["Using events 1–10, complete the following. Net cash received is after the cash refund in event 9. The credit card fee is the 90 recorded in event 2."],"parts":[{"l":"Gross sales revenue ($)","n":13000,"pre":"$","x":"4,000 + 3,000 + 2,500 + 1,500 + 2,000 = 13,000."},{"l":"Net sales ($)","n":12096,"pre":"$","x":"13,000 − returns and allowances (300 + 500) − sales discounts (80 + 24) = 12,096. The 90 credit card fee is NOT deducted."},{"l":"Net cash received, events 1–10 ($)","n":12006,"pre":"$","x":"2,910 + 2,500 + 3,920 + 1,176 − 500 + 2,000 = 12,006."},{"l":"Credit card fee (90) is reported in","opts":["Deducted from gross sales to get net sales","SG&A (operating) expense","Reduction of accounts receivable","Cost of goods sold"],"key":"SG&A (operating) expense","x":"The fee is the cost of accepting cards: a selling and administrative expense."}],"expl":"Net sales = gross sales − sales returns and allowances − sales discounts."},{"id":"mk1-p6a","t":"cls","min":5,"sec":"Problem 6 · Ethics, HKICPA Code (Ethics session) · 10 marks · about 15 min","title":"Problem 6 (a) · The six-step process (6 marks)","stem":["Priya is a CPA working in the accounting department of Harbour Toys Ltd., a Hong Kong company. A bank loan covenant requires profit of at least $30,000, and the draft profit is $25,000. The CFO tells Priya to record $60,000 of December wages in January so that profit meets the covenant. In the same week, a friend who works for a competitor asks Priya for the company’s unpublished gross margin.","Priya works through the six-step ethical decision-making process. Match each of her actions to the step it belongs to."],"cols":[{"h":"Step","opts":["1. Identify the ethical issue","2. Identify the stakeholders","3. Consider the likely effects on stakeholders","4. Identify the relevant ethical principles","5. Identify alternative courses of action","6. Choose the best course of action"]}],"items":[{"t":"Priya sees that the CFO is asking her to record December wages in January.","a":["1. Identify the ethical issue"],"why":"She has recognised that there is an ethical problem."},{"t":"She lists the bank, the shareholders, the employees and the auditors.","a":["2. Identify the stakeholders"],"why":"Stakeholders are the people affected by the decision."},{"t":"She asks what would happen to the bank’s lending decision and to her own career if she complied.","a":["3. Consider the likely effects on stakeholders"],"why":"This is the likely effect of the decision on the stakeholders."},{"t":"She links the request to integrity and professional behaviour.","a":["4. Identify the relevant ethical principles"],"why":"She matches the facts to the HKICPA principles."},{"t":"She lists four options: comply, refuse, escalate to the audit committee, or seek confidential advice from the HKICPA.","a":["5. Identify alternative courses of action"],"why":"Alternatives come before the choice."},{"t":"She decides to refuse, document the request and escalate it to the audit committee.","a":["6. Choose the best course of action"],"why":"The final decision comes last."}]},{"id":"mk1-p6b","t":"calc","min":5,"sec":"Problem 6 · Ethics, HKICPA Code (Ethics session) · 10 marks · about 15 min","title":"Problem 6 (b)–(e) · Principles and decision (4 marks)","stem":["Priya is a CPA working in the accounting department of Harbour Toys Ltd., a Hong Kong company. A bank loan covenant requires profit of at least $30,000, and the draft profit is $25,000. The CFO tells Priya to record $60,000 of December wages in January so that profit meets the covenant. In the same week, a friend who works for a competitor asks Priya for the company’s unpublished gross margin.","(b) Which fundamental principle does the CFO’s request breach most directly? (c) By how much would profit be overstated if Priya complied? (d) Which principle stops Priya from giving her friend the gross margin? (e) What is Priya’s best course of action?"],"parts":[{"l":"(b) Principle breached by the CFO","opts":["Integrity","Objectivity","Professional competence and due care","Confidentiality","Professional behaviour"],"key":"Integrity","x":"Integrity: being straightforward and honest, not associated with misleading information."},{"l":"(c) Profit overstated by ($)","n":60000,"pre":"$","x":"Expenses are too low by 60,000, so profit is overstated: real profit would be 25,000 − 60,000 = −35,000."},{"l":"(d) Principle: friend’s request","opts":["Integrity","Objectivity","Professional competence and due care","Confidentiality","Professional behaviour"],"key":"Confidentiality","x":"Confidential information must not be disclosed to third parties without authority."},{"l":"(e) Priya’s best course","opts":["Refuse to postpone the expense, document the request and escalate it internally","Comply, because the CFO is her superior","Record the wages in January but tell nobody","Resign immediately and tell the bank"],"key":"Refuse to postpone the expense, document the request and escalate it internally","x":"Wages belong to December (accrual accounting). She should refuse, keep a record and use internal channels first (audit committee, then professional advice)."}],"expl":"HKICPA principles: integrity, objectivity, professional competence and due care, confidentiality, professional behaviour."}];
 window.MOCK=Object.assign(window.MOCK||{},{'BUS1103:mock1':{title:'Mock midterm A · 2h30 · 100 marks',notes:[{"t":"h","l":2,"x":"Exam conditions"},{"t":"p","x":"**Mock midterm A · 100 marks · 2h30 · closed book.** Same shape as the real paper (25 multiple-choice questions + long problems), covering Ch.1–4, Ch.6 (sales revenue only) and HKICPA ethics. It is deliberately harder than the practice sets: no adjusted trial balance is handed to you, the stems give no hints, and you choose every account, amount and statement line yourself."},{"t":"li","x":"Part A · 25 multiple-choice questions · 25 marks · about 30 min"},{"t":"li","x":"Problem 1 · Northgate Surf School (Ch.2) · 15 marks · about 20 min"},{"t":"li","x":"Problem 2 · Adjusting entries, Alder Creek Adventures · 16 marks · about 25 min"},{"t":"li","x":"Problem 3 · Income statement, equity statement, balance sheet · 14 marks · about 20 min"},{"t":"li","x":"Problem 4 · Closing entries · 6 marks · about 8 min"},{"t":"li","x":"Problem 5 · Sunridge Cycles (Ch.6 sales revenue) · 14 marks · about 20 min"},{"t":"li","x":"Problem 6 · HKICPA ethics case · 10 marks · about 15 min"},{"t":"p","x":"Total about 138 min, leaving about 12 min to check your work. Set a 150-minute timer on your phone (the app timer is 50-minute blocks), put the book away, and only then tap **Check**. Problems 2–4 use ONE company: your own adjusting entries feed the statements and closing entries."}]}});
}
