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
}
