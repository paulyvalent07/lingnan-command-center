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
}
