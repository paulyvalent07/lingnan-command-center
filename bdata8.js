/* ================= BUS2108 · Global Business Environment: diagnose, compute, decide ================= */
{
 const C=(id,title,stem,cols,items,min)=>({id,t:'cls',min:min||3,sec:'Active drills',title,stem:[stem],cols:cols.map(([h,opts])=>({h,opts})),items:items.map(([t,a,why])=>({t,a:Array.isArray(a)?a:[a],why}))});
 const K=(id,title,stem,parts,expl,min)=>({id,t:'calc',min:min||parts.length,sec:'Active drills',title,stem:Array.isArray(stem)?stem:[stem],parts,expl});
 const G=(id,title,stem,cols,rows,tol,expl,min)=>({id,t:'grid',min:min||3,sec:'Active drills',title,stem:Array.isArray(stem)?stem:[stem],cols,rows,tol,expl});
 const HOF=['Power distance','Individualism / collectivism','Uncertainty avoidance','Masculinity / femininity','Long-term orientation','Indulgence / restraint'];
 const INT=['Free trade area','Customs union','Common market','Economic union','Political union'];

 BUILD['BUS2108:1']=[
  C('gb1-a','Globalization of markets or of production?','Which facet of globalization does each situation show?',
   [['Facet',['Globalization of markets','Globalization of production']]],[
   ['Consumers around the world buy the same smartphone and drink the same cola.','Globalization of markets'],
   ['A jet is assembled from components made in a dozen countries.','Globalization of production'],
   ['Oil, aluminium and wheat are traded in one worldwide market.','Globalization of markets'],
   ['A firm moves its call centre to wherever labor and quality are best.','Globalization of production'],
   ['A coffee chain sells the same product in every major city.','Globalization of markets']]),
  C('gb1-b','Which global institution?','Name the institution.',
   [['Institution',['WTO','IMF','World Bank','UN','G20']]],[
   ['Polices the world trading system and enforces trade rules.','WTO'],
   ['Lender of last resort that requires policy reform in return for loans.','IMF'],
   ['Makes low-interest loans to promote economic development.','World Bank'],
   ['Promotes peace, security and human rights among 193 members.','UN'],
   ['The 19 largest economies plus the EU, the main forum for crisis response after 2008–09.','G20']]),
  C('gb1-c','Drivers and terms','Name the driver or concept.',
   [['Concept',['Declining trade and investment barriers','Technological change','Containerisation','Moore’s Law','Foreign direct investment','Exporting']]],[
   ['Successive GATT rounds and the WTO cut tariffs after WWII.','Declining trade and investment barriers'],
   ['The microprocessor and the internet make it cheap for buyers and sellers to find each other.','Technological change'],
   ['Standard shipping boxes collapse the cost and time of freight.','Containerisation'],
   ['Computing power doubles about every two years.','Moore’s Law'],
   ['Investing resources abroad to build or control a business there.','Foreign direct investment'],
   ['Selling goods or services to consumers in another country.','Exporting']],5)];

 BUILD['BUS2108:2']=[
  C('gb2-a','Which political system?','Classify each description.',
   [['System',['Democracy','Communist totalitarianism','Theocratic totalitarianism','Tribal totalitarianism','Right-wing totalitarianism','Social democracy']]],[
   ['Free elections, free media and a non-political bureaucracy.','Democracy'],
   ['A single party controls all spheres of life and owns the means of production.','Communist totalitarianism'],
   ['Religious principles are the basis of absolute control.','Theocratic totalitarianism'],
   ['One tribe monopolises power.','Tribal totalitarianism'],
   ['Economic freedom is allowed but political freedom is restricted to block communism.','Right-wing totalitarianism'],
   ['Collectivist goals pursued by democratic means.','Social democracy']]),
  C('gb2-b','Collectivism or individualism?','Which philosophy underlies each statement?',
   [['Philosophy',['Collectivism','Individualism']]],[
   ['The good of society as a whole comes before individual rights.','Collectivism'],
   ['Individual economic and political freedom is paramount and the state should be limited.','Individualism'],
   ['The state should own the means of production.','Collectivism'],
   ['Traced to Aristotle and refined by Hume, Smith and Mill.','Individualism'],
   ['Traced to Plato and to Karl Marx.','Collectivism']]),
  C('gb2-c','Common law or civil law?','Which legal system?',
   [['Legal system',['Common law','Civil law']]],[
   ['Based on tradition, precedent and custom; judges interpret.','Common law'],
   ['Based on a detailed codified set of laws.','Civil law'],
   ['Found in the UK, the US and most former British colonies.','Common law'],
   ['Found in Germany, France, Japan and Russia.','Civil law'],
   ['Contracts tend to be long and spell out every contingency.','Common law','Courts rely on what was actually agreed.'],
   ['Contracts can be shorter because the code fills the gaps.','Civil law']]),
  C('gb2-d','Legal and political risk','Name the concept.',
   [['Concept',['Property rights','Patent','Copyright','Trademark','Product liability','Corruption','CISG']]],[
   ['Exclusive rights to make, use and sell an invention.','Patent'],
   ['The rights of authors, artists and publishers over their work.','Copyright'],
   ['A protected name or design that identifies a firm’s products.','Trademark'],
   ['A firm is held responsible for injury caused by its product.','Product liability'],
   ['Rights over the use of a resource and the income from it, which officials can threaten by extortion.','Property rights'],
   ['Higher levels of it go with lower FDI, trade and growth.','Corruption'],
   ['A uniform set of rules for international sales contracts.','CISG']],5)];

 BUILD['BUS2108:3']=[
  K('gb3-a','Why PPP matters','A pizza-maker in Hong Kong sells 5,000 pizzas at US$15 each. A pizza-maker in Manila sells the same 5,000 pizzas at US$5 each.',[
   {l:'Hong Kong contribution to GDP (US$)',n:75000,pre:'$',x:'5,000 × 15.'},
   {l:'Manila contribution to GDP (US$)',n:25000,pre:'$',x:'5,000 × 5.'},
   {l:'Hong Kong output as a multiple of Manila’s in nominal terms',n:3,x:'75,000 ÷ 25,000. The real output is identical (5,000 pizzas): PPP adjustment removes the price difference.'}]),
  K('gb3-b','Level versus growth','Country A’s GDP is $2,000 billion and it grows by 1%. Country B’s GDP is $400 billion and it grows by 8%. Population: A has 50 million people and B has 20 million.',[
   {l:'A’s GDP per capita ($)',n:40000,pre:'$',x:'2,000bn ÷ 50m.'},
   {l:'B’s GDP per capita ($)',n:20000,pre:'$',x:'400bn ÷ 20m.'},
   {l:'A’s GDP growth in dollars (billion)',n:20,pre:'$',x:'1% × 2,000.'},
   {l:'B’s GDP growth in dollars (billion)',n:32,pre:'$',x:'8% × 400. The smaller economy adds more new demand: why growth matters more than level to an international firm.'}]),
  C('gb3-b2','Measures of development','Name the measure or tax.',
   [['Concept',['GDP','GNI','HDI','PPP adjustment','Direct tax','Indirect tax']]],[
   ['Output produced within a country’s borders.','GDP'],
   ['Income earned by a country’s residents, including income earned abroad.','GNI'],
   ['A UN index blending income with health and education indicators.','HDI'],
   ['Corrects for price differences between countries.','PPP adjustment'],
   ['Personal income tax and capital gains tax.','Direct tax'],
   ['VAT / GST charged on goods and services.','Indirect tax']]),
  C('gb3-c','Which economic system?','Classify each description.',
   [['System',['Market economy','Command economy','Mixed economy']]],[
   ['The state decides what is produced and at what price.','Command economy'],
   ['Prices are set by supply and demand with minimal government intervention.','Market economy'],
   ['Most goods are privately produced, but the state runs some key industries.','Mixed economy'],
   ['Privately owned firms, with the state providing health care and regulation.','Mixed economy']],3)];

 BUILD['BUS2108:4']=[
  C('gb4-a','Which Hofstede dimension?','Name the dimension each description fits.',
   [['Dimension',HOF]],[
   ['Subordinates accept and expect that power is unequally distributed.','Power distance'],
   ['Self-image is “we”; loyalty to the in-group and indirect communication.','Individualism / collectivism','Collectivism.'],
   ['Low tolerance for ambiguity; strict rules to minimise the unknown.','Uncertainty avoidance'],
   ['Values assertiveness, competition and achievement (Japan scores 95).','Masculinity / femininity'],
   ['Pragmatism, thrift and perseverance; delayed gratification.','Long-term orientation'],
   ['Free gratification of desires and leisure; more spending on leisure.','Indulgence / restraint'],
   ['Managers consult staff and flat organisations are the norm.','Power distance','Low power distance.']],6),
  C('gb4-b','High or low on the dimension?','Read each statement and say whether it describes a high or low score.',
   [['Dimension',['Power distance','Uncertainty avoidance','Individualism','Masculinity']],['Score',['High','Low']]],[
   ['Hong Kong and Singapore: flexible workforce and fast-adapting organisations.',['Uncertainty avoidance','Low']],
   ['Malaysia: hierarchy accepted without need for justification.',['Power distance','High']],
   ['Sweden, the lowest scorer, values cooperation and quality of life.',['Masculinity','Low']],
   ['Australia: personal achievement and rights come first.',['Individualism','High']],
   ['Greece: relies on strict rules and procedures.',['Uncertainty avoidance','High']]],4),
  C('gb4-c','Hofstede table: read the scores','Use the textbook scores (PDI, UAI, IDV, MAS, LTO): Australia 36/51/90/61/31; Brazil 69/76/38/49/65; Canada 39/48/80/52/23; Germany 35/65/67/66/31; UK 35/35/89/66/25.',
   [['Answer',['Australia','Brazil','Canada','Germany','United Kingdom']]],[
   ['Highest power distance.','Brazil'],
   ['Highest individualism.','Australia'],
   ['Lowest uncertainty avoidance.','United Kingdom'],
   ['Highest long-term orientation.','Brazil'],
   ['Lowest long-term orientation.','Canada']]),
  K('gb4-d','Cultural gap: Hong Kong manager in Brazil','Compare power distance: Brazil 69 and the United Kingdom 35. Individualism: Brazil 38 and the United Kingdom 89.',[
   {l:'Power distance gap (Brazil − UK)',n:34,x:'69 − 35.'},
   {l:'Individualism gap (UK − Brazil)',n:51,x:'89 − 38.'},
   {l:'The larger gap is on…',opts:['Power distance','Individualism'],key:'Individualism',x:'51 > 34.'},
   {l:'A manager moving from the UK to Brazil should expect staff to be more…',opts:['Directive and group-oriented','Consultative and individualistic'],key:'Directive and group-oriented',x:'Higher power distance and collectivism.'}]),
  C('gb4-e','Norms, values and ethics stances','Name the concept.',
   [['Concept',['Values','Folkways','Mores','Cultural relativism','Cultural universalism','Cultural distance','Cross-cultural literacy']]],[
   ['Underlying beliefs that give context to a society’s rules.','Values'],
   ['Etiquette and manners.','Folkways'],
   ['Core rules that are central to how society functions.','Mores'],
   ['“When in Rome, do as the Romans do.”','Cultural relativism'],
   ['The same ethical standards apply wherever the firm operates.','Cultural universalism'],
   ['The difference between the home and the host culture.','Cultural distance'],
   ['Understanding other cultures without falling into stereotyping.','Cross-cultural literacy']],5)];

 BUILD['BUS2108:5']=[
  C('gb5-a','Which ethical issue area?','Name the area.',
   [['Area',['Employment practices','Human rights','Environmental pollution','Corruption']]],[
   ['Overcrowded dormitories and weak safety standards in a factory.','Employment practices'],
   ['Should the firm keep operating where freedom of speech and assembly is denied?','Human rights'],
   ['A shared resource is over-used because nobody bears its full cost.','Environmental pollution','Tragedy of the commons.'],
   ['A side payment is made to win a contract.','Corruption'],
   ['A bribe to obtain a licence from an official.','Corruption'],
   ['Discrimination in hiring.','Employment practices']]),
  C('gb5-b','The seven managerial actions','Which action is each?',
   [['Action',['Hiring and promotion','Organisational culture and leadership','Decision-making processes','Ethics officers','Moral courage','CSR as a cornerstone','Sustainable strategies']]],[
   ['The firm promotes people who show strong personal ethics.','Hiring and promotion'],
   ['Leaders repeatedly model the code of conduct.','Organisational culture and leadership'],
   ['The firm adds supplier sustainability to the criteria for choosing suppliers.','Decision-making processes'],
   ['An internal ombudsperson monitors compliance.','Ethics officers'],
   ['A manager walks away from a profitable but unethical deal.','Moral courage'],
   ['The firm funds a long-term conservation foundation.','CSR as a cornerstone']],5),
  C('gb5-c','The three-question test','Apply the test. Does the decision pass?',
   [['Passes?',['Passes','Fails']]],[
   ['Falls within the code of ethics, you would be comfortable if it were on social media, and your family would approve.','Passes'],
   ['It breaks the code of ethics but would probably not be noticed.','Fails'],
   ['You would not want the decision made public.','Fails'],
   ['People you respect would object to it.','Fails']],3),
  C('gb5-d','Sourcing terms','Name the term.',
   [['Term',['Outsourcing','Insourcing','Offshoring','Offshore outsourcing','Nearshoring','Just-in-time']]],[
   ['Buying from an outside supplier.','Outsourcing'],
   ['Bringing a previously outsourced activity back in-house.','Insourcing'],
   ['Buying from the firm’s own operations located abroad.','Offshoring'],
   ['Buying from a third-party supplier in another country.','Offshore outsourcing'],
   ['Moving sourcing to a nearby, often bordering, country.','Nearshoring'],
   ['Materials arrive just as needed, leaving no buffer stock.','Just-in-time']],5)];

 BUILD['BUS2108:6']=[
  G('gb6-a','Comparative advantage','Country X and Country Y each make cloth and wine using labor only. Compute the opportunity cost of each good in the other good.',
   [{h:'Country',g:true},{h:'Hours per unit of cloth',g:true},{h:'Hours per unit of wine',g:true},{h:'Opportunity cost of 1 cloth (units of wine)'},{h:'Opportunity cost of 1 wine (units of cloth)'}],
   [['X',2,3,0.67,1.5],['Y',4,12,0.33,3]],0.01,
   'X is more efficient in both goods (absolute advantage in both). But Y gives up less wine to make cloth (0.33 against 0.67), and X gives up less cloth to make wine (1.5 against 3).',4),
  K('gb6-b','Who specialises?','Use the opportunity costs above.',[
   {l:'Absolute advantage in cloth',opts:['Country X','Country Y'],key:'Country X',x:'2 hours is fewer than 4.'},
   {l:'Absolute advantage in wine',opts:['Country X','Country Y'],key:'Country X',x:'3 hours is fewer than 12.'},
   {l:'Comparative advantage in cloth',opts:['Country X','Country Y'],key:'Country Y',x:'Lowest opportunity cost: 0.33 wine.'},
   {l:'Comparative advantage in wine',opts:['Country X','Country Y'],key:'Country X',x:'Lowest opportunity cost: 1.5 cloth.'}]),
  K('gb6-c','Gains from trade','X and Y agree to trade 1 wine for 2 cloth. Making 1 wine at home costs X 1.5 cloth and costs Y 3 cloth.',[
   {l:'X makes 1 wine and sells it abroad for 2 cloth. Gain per wine (cloth)',n:0.5,tol:.01,x:'2 − 1.5.'},
   {l:'Y buys 1 wine for 2 cloth instead of making it. Saving per wine (cloth)',n:1,x:'3 − 2.'},
   {l:'Which exchange price makes both countries better off?',opts:['1 wine = 1 cloth','1 wine = 2.5 cloth','1 wine = 4 cloth'],key:'1 wine = 2.5 cloth',x:'Between X’s cost (1.5) and Y’s cost (3). At 1 cloth X loses; at 4 Y loses.'}]),
  C('gb6-d','Which trade theory?','Name the theory or economist.',
   [['Theory',['Mercantilism','Absolute advantage','Comparative advantage','Heckscher–Ohlin','Leontief paradox','Product life cycle','New trade theory','Porter’s diamond']]],[
   ['Exports are good and imports are bad.','Mercantilism'],
   ['A country should specialise in what it makes more efficiently than any other country (Smith).','Absolute advantage'],
   ['Even a country with no absolute advantage gains by specialising where it is relatively least inefficient (Ricardo).','Comparative advantage'],
   ['Countries export goods that intensively use the factors they hold in relative abundance.','Heckscher–Ohlin'],
   ['The capital-abundant US exported a mix of capital- and labor-intensive goods.','Leontief paradox'],
   ['Products are invented in developed countries and later made in developing countries (Vernon).','Product life cycle'],
   ['First movers in industries with large economies of scale can lock in dominance (Krugman).','New trade theory'],
   ['Factor conditions, demand conditions, related industries and rivalry explain national competitiveness.','Porter’s diamond']],6),
  C('gb6-e','Porter’s diamond: which element?','Name the element of the diamond.',
   [['Element',['Factor conditions','Demand conditions','Related and supporting industries','Firm strategy, structure and rivalry']]],[
   ['Sophisticated, demanding domestic buyers push firms to innovate.','Demand conditions'],
   ['Excellent education and infrastructure.','Factor conditions'],
   ['A cluster of competitive local suppliers.','Related and supporting industries'],
   ['Intense domestic competition drives innovation.','Firm strategy, structure and rivalry']],4)];

 BUILD['BUS2108:7']=[
  C('gb7-a','Which trade policy instrument?','Name the instrument.',
   [['Instrument',['Tariff','Subsidy','Quota','Voluntary export restraint','Local content requirement','Administrative policy']]],[
   ['A tax on imports.','Tariff'],
   ['A government payment to local producers so they can compete with imports.','Subsidy'],
   ['A numerical limit on imports of a good.','Quota'],
   ['The exporting country agrees, under pressure, to limit its own exports.','Voluntary export restraint'],
   ['At least 60% of a car’s value must be produced locally.','Local content requirement'],
   ['Slow customs clearance and burdensome paperwork on imports.','Administrative policy']]),
  K('gb7-b','A tariff in numbers','A country imports 10,000 bicycles a year at $100 each. It introduces a 15% ad valorem tariff.',[
   {l:'Tariff per bicycle ($)',n:15,pre:'$',x:'15% × 100.'},
   {l:'Price paid by importers inside the country ($)',n:115,pre:'$',x:'100 + 15.'},
   {l:'Government revenue if imports stay at 10,000 ($)',n:150000,pre:'$',x:'15 × 10,000.'},
   {l:'The tariff protects…',opts:['Local producers at consumers’ expense','Consumers at producers’ expense'],key:'Local producers at consumers’ expense',x:'Higher prices fall on consumers; domestic producers gain.'},
   {l:'Revenue if the tariff reduces imports to 8,000 ($)',n:120000,pre:'$',x:'15 × 8,000.'}],null,5),
  C('gb7-c','Political or economic argument for intervention?','Which kind of argument is each?',
   [['Argument',['Political','Economic']]],[
   ['Protect jobs in a concentrated, vocal industry.','Political'],
   ['Protect national security, for example limiting Huawei equipment.','Political'],
   ['Retaliate against another country’s trade barriers.','Political'],
   ['Support an infant industry until it can compete.','Economic'],
   ['Help a domestic firm win a first-mover advantage in a strategic industry.','Economic'],
   ['Ban unsafe imports to protect consumers.','Political']],5),
  C('gb7-d','Who wins, who loses?','Think about the effect of a tariff on each group.',
   [['Effect',['Gains','Loses']]],[
   ['Domestic producers of the protected good.','Gains'],
   ['Domestic consumers of the good.','Loses'],
   ['The government (tariff revenue).','Gains'],
   ['Foreign exporters.','Loses']],4)];

 BUILD['BUS2108:8']=[
  C('gb8-a','FDI or portfolio investment?','The threshold for FDI is a stake above 10% with management control.',
   [['Type',['FDI','Portfolio investment']]],[
   ['A fund buys 2% of a foreign company’s shares.','Portfolio investment'],
   ['A firm buys 60% of a foreign company and appoints its management.','FDI'],
   ['A firm builds a new factory abroad.','FDI'],
   ['A pension fund buys foreign government bonds.','Portfolio investment'],
   ['A firm acquires a 15% stake with a seat on the board.','FDI']]),
  C('gb8-b','Flow, stock or production?','Name the measure of FDI.',
   [['Measure',['FDI flow','FDI stock','Production from FDI']]],[
   ['New investment from one country to another in a given year.','FDI flow'],
   ['The cumulative value of all FDI made to date.','FDI stock'],
   ['The value of goods and services produced by FDI-funded operations.','Production from FDI'],
   ['The figure usually quoted in the headline “FDI up 8% this year”.','FDI flow']]),
  C('gb8-c','Type of outward FDI','Which entry type?',
   [['Type',['Greenfield investment','Acquisition','Joint venture']]],[
   ['A firm builds a brand-new plant abroad from scratch.','Greenfield investment'],
   ['A firm buys an existing foreign competitor and takes over its operations.','Acquisition'],
   ['A firm shares ownership and profits with a local partner to ease entry.','Joint venture'],
   ['The most common form of FDI by volume.','Acquisition'],
   ['Slow to establish against entrenched local competitors.','Greenfield investment']]),
  C('gb8-d','Dunning’s OLI: which advantage?','FDI occurs when all three advantages hold. Which one is each?',
   [['Advantage',['Ownership','Location','Internalisation']]],[
   ['Nike’s design and brand capability.','Ownership'],
   ['Lower-cost, skilled manufacturing labor in Vietnam.','Location'],
   ['Keeping know-how inside the firm rather than licensing it to a local competitor.','Internalisation'],
   ['The firm can do something more efficiently than local rivals.','Ownership'],
   ['Producing in the foreign country makes more sense than producing at home.','Location']])];

 BUILD['BUS2108:9']=[
  C('gb9-a','Level of economic integration','Name the level.',
   [['Level',INT]],[
   ['Tariff-free trade between members; each sets its own tariffs on outsiders.','Free trade area'],
   ['A free trade area plus a common external tariff.','Customs union'],
   ['A customs union plus free movement of capital and labor.','Common market'],
   ['A common market plus a common currency and harmonised taxes.','Economic union'],
   ['An economic union plus shared social and defence policy.','Political union']]),
  C('gb9-b','What is each level missing?','The deeper level includes everything beneath it. Which one is the minimum for each feature?',
   [['Minimum level',INT]],[
   ['A common external tariff.','Customs union'],
   ['No work permits needed between members.','Common market'],
   ['A common currency.','Economic union'],
   ['A shared defence policy.','Political union'],
   ['Tariff-free trade between members.','Free trade area']]),
  C('gb9-c','Trade creation or trade diversion?','Before the agreement each country imports from the cheapest source after tariffs. Which effect occurs?',
   [['Effect',['Trade creation','Trade diversion']],['Net welfare',['Gain','Loss']]],[
   ['Low-cost producers inside the area replace less efficient domestic producers.',['Trade creation','Gain']],
   ['Efficient producers outside the area are replaced by less efficient producers inside it because of preferential tariffs.',['Trade diversion','Loss']],
   ['A French firm buys from a cheaper German producer instead of a high-cost French one.',['Trade creation','Gain']],
   ['A Mexican buyer switches from a cheaper Asian supplier to a costlier US supplier once NAFTA removes tariffs.',['Trade diversion','Loss']]],4),
  K('gb9-d','A trade-diversion example','Home produces widgets at $15. Member B produces at $12. Outsider C produces at $10. Home puts a 30% tariff on outsiders and on B.',[
   {l:'Price of C’s widgets at Home before the agreement ($)',n:13,pre:'$',x:'10 × 1.3.'},
   {l:'Price of B’s widgets at Home before the agreement ($)',n:15.6,pre:'$',tol:.05,x:'12 × 1.3.'},
   {l:'Before: Home buys from…',opts:['Home producers','B','C'],key:'C',x:'$13 is the lowest price (domestic is $15).'},
   {l:'After a free trade area with B: Home buys from…',opts:['Home producers','B','C'],key:'B',x:'B at $12 is below C at $13.'},
   {l:'This is…',opts:['Trade creation','Trade diversion'],key:'Trade diversion',x:'The cheaper producer (C at $10) is replaced by a costlier one (B at $12). Consumers pay less ($12 against $13) but the world uses more resources.'}]),
  C('gb9-e','Common currency: benefit or cost?','Is each effect a benefit or a cost of a common currency?',
   [['Effect',['Benefit','Cost']]],[
   ['No exchange-rate uncertainty for cross-border trade within the area.','Benefit'],
   ['Members lose independent control of interest rates.','Cost'],
   ['Lower transaction costs for firms and travellers.','Benefit'],
   ['Greece needs higher interest rates while Germany needs lower ones.','Cost'],
   ['Price transparency across countries boosts trade and investment.','Benefit']],4)];

 BUILD['BUS2108:10']=[
  K('gb10-a','Hedging a payment with a forward contract','A Hong Kong importer has to pay €100,000 in six months. Today the spot rate is HK$8.50 per euro and the six-month forward rate is HK$8.60.',[
   {l:'Cost at today’s spot rate (HK$)',n:850000,pre:'HK$',x:'100,000 × 8.50.'},
   {l:'Cost locked in with the forward contract (HK$)',n:860000,pre:'HK$',x:'100,000 × 8.60.'},
   {l:'In six months the spot rate is HK$9.00. Cost if not hedged (HK$)',n:900000,pre:'HK$',x:'100,000 × 9.00.'},
   {l:'Saving from having hedged (HK$)',n:40000,pre:'HK$',x:'900,000 − 860,000.'},
   {l:'Instead, the spot rate in six months is HK$8.20. Cost if not hedged (HK$)',n:820000,pre:'HK$',x:'100,000 × 8.20.'},
   {l:'Extra cost of having hedged in that case (HK$)',n:40000,pre:'HK$',x:'860,000 − 820,000. A hedge removes uncertainty, in return for a premium or the loss of a favourable move.'}],null,6),
  K('gb10-b','Big Mac index','A Big Mac costs US$5.50 in the United States and HK$22 in Hong Kong. The market exchange rate is HK$7.80 per US$.',[
   {l:'Implied PPP rate (HK$ per US$)',n:4,tol:.02,x:'22 ÷ 5.50 = 4.00.'},
   {l:'Hong Kong Big Mac price in US$ at the market rate',n:2.82,pre:'$',tol:.02,x:'22 ÷ 7.80 = 2.82.'},
   {l:'The Hong Kong dollar looks…',opts:['Undervalued against the US dollar','Overvalued against the US dollar'],key:'Undervalued against the US dollar',x:'The Big Mac converts to fewer US dollars than in the US.'},
   {l:'Degree of misvaluation (%)',n:-48.7,u:'%',signed:true,tol:.3,x:'2.82 ÷ 5.50 − 1 = −48.7%.'}],null,4),
  K('gb10-c','Currency conversion','The rate is HK$7.80 per US$ and US$1.08 per euro.',[
   {l:'HK$ price of a US$200 item',n:1560,pre:'HK$',x:'200 × 7.80.'},
   {l:'US$ price of a €500 item',n:540,pre:'$',x:'500 × 1.08.'},
   {l:'HK$ per euro',n:8.42,tol:.02,x:'7.80 × 1.08 = 8.424.'},
   {l:'The euro rises to US$1.20. The HK$ price of €500 now',n:4680,pre:'HK$',x:'500 × 1.20 × 7.80 = 4,680. European goods are now more expensive for Hong Kong buyers.'}],null,4),
  C('gb10-d','Which type of exchange rate risk?','Name the risk.',
   [['Risk',['Transaction risk','Translation risk','Economic risk']]],[
   ['The rate moves between signing a contract and the payment date.','Transaction risk'],
   ['A stronger home currency makes foreign profits look smaller in the consolidated accounts.','Translation risk'],
   ['A customer country’s currency falls and demand for the firm’s imported goods drops.','Economic risk'],
   ['The firm must pay a foreign supplier in six months in the supplier’s currency.','Transaction risk'],
   ['Consolidating a foreign subsidiary’s earnings into the parent’s statements.','Translation risk']]),
  C('gb10-e','Direction of the currency','What should happen to the currency, according to PPP and the International Fisher effect?',
   [['Currency',['Depreciates','Appreciates']]],[
   ['A country has persistently higher inflation than its trading partners.','Depreciates'],
   ['A country has persistently lower inflation than its trading partners.','Appreciates'],
   ['A country has higher nominal interest rates, implying higher expected inflation.','Depreciates'],
   ['A country has lower expected inflation, shown by lower nominal interest rates.','Appreciates']],4)];

 BUILD['BUS2108:11']=[
  C('gb11-a','Fixed or floating?','Which exchange rate system fits each statement?',
   [['System',['Fixed','Floating']]],[
   ['Discourages currency speculation and imposes monetary discipline.','Fixed'],
   ['Lets chronic trade imbalances correct themselves through currency movements.','Floating'],
   ['Removes national monetary-policy autonomy because the peg must be defended.','Fixed'],
   ['Preserves independent monetary policy.','Floating'],
   ['Exposed to speculation and volatility.','Floating'],
   ['Removes a tool for correcting trade imbalances.','Fixed']]),
  C('gb11-b','The impossible trinity','A country can have at most two of: a fixed exchange rate, independent monetary policy and free capital flows. Which one is given up?',
   [['Given up',['Fixed exchange rate','Independent monetary policy','Free capital flows']]],[
   ['Hong Kong: a peg to the US dollar with free capital flows.','Independent monetary policy'],
   ['A country that wants its own interest-rate policy and a peg, so it imposes capital controls.','Free capital flows'],
   ['The US: independent policy and free capital flows.','Fixed exchange rate'],
   ['Eurozone members: a shared currency and open capital markets.','Independent monetary policy']]),
  C('gb11-c','Monetary history and the IMF','Name the concept.',
   [['Concept',['Gold standard','Bretton Woods','IMF','Currency board','Conditionality','Peg']]],[
   ['Currencies are convertible into a fixed quantity of gold.','Gold standard'],
   ['The 1944 conference that created the IMF and the dollar-based fixed-rate system.','Bretton Woods'],
   ['Lender of last resort for countries in balance-of-payments difficulty.','IMF'],
   ['The central bank must exchange the local currency at the fixed rate, backed 1:1 by reserves.','Currency board'],
   ['Policy reforms required in return for IMF loans.','Conditionality'],
   ['Fixing the value of a currency to another currency.','Peg']],5)];
}
