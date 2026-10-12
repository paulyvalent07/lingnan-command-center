/* ================= BUS2205 · Marketing: classify, compute, decide ================= */
{
 // C(id,title,stem,cols,items[,min]) : cols=[[header,[options]],...]; items=[text, answer|[answers], why?]
 const C=(id,title,stem,cols,items,min)=>({id,t:'cls',min:min||3,sec:'Active drills',title,stem:[stem],cols:cols.map(([h,opts])=>({h,opts})),items:items.map(([t,a,why])=>({t,a:Array.isArray(a)?a:[a],why}))});
 const K=(id,title,stem,parts,expl,min)=>({id,t:'calc',min:min||parts.length,sec:'Active drills',title,stem:[stem],parts,expl});
 const FORCES=['Social','Economic','Technological','Competitive','Regulatory'];
 BUILD['BUS2205:1']=[
  C('mk1-a','Marketing mix or environmental force?','Can the firm directly set it? Decide whether each item is a controllable 4P element or an uncontrollable environmental force, then name which one.',
   [['Type',['Controllable (4P)','Uncontrollable (environment)']],['Which one?',['Product','Price','Promotion','Place','Social','Economic','Technological','Competitive','Regulatory']]],[
   ['A firm cuts its list price by 10% for the holiday season.',['Controllable (4P)','Price']],
   ['A new law bans the collection of customer data without consent.',['Uncontrollable (environment)','Regulatory']],
   ['A rival launches a cheaper, almost identical product.',['Uncontrollable (environment)','Competitive']],
   ['The firm signs a distribution deal with a national retailer.',['Controllable (4P)','Place']],
   ['Consumers’ real incomes fall during a recession.',['Uncontrollable (environment)','Economic']],
   ['The firm redesigns its packaging and adds a feature.',['Controllable (4P)','Product']],
   ['The firm starts a social-media advertising campaign.',['Controllable (4P)','Promotion']],
   ['AI chatbots become common, changing how customers get support.',['Uncontrollable (environment)','Technological']],
   ['Younger consumers care more about sustainability.',['Uncontrollable (environment)','Social']]],5),
  C('mk1-b','Needs, wants and exchange','Which term fits each statement?',
   [['Concept',['Need','Want','Market','Exchange','Marketing mix']]],[
   ['A person must eat to survive.','Need'],
   ['“I need food” becomes “I want sushi” because of culture and personality.','Want'],
   ['People with both the desire and the ability to buy a specific offering.','Market'],
   ['The trade of things of value so that each party is better off afterwards.','Exchange'],
   ['The controllable blend of product, price, promotion and place.','Marketing mix']]),
  C('mk1-c','Four conditions for an exchange','Which of these is a condition for an exchange to occur?',
   [['Condition?',['Required','Not required']]],[
   ['Two or more parties with unsatisfied needs.','Required'],
   ['A desire and ability to have those needs satisfied.','Required'],
   ['A way for the parties to communicate.','Required'],
   ['Something to exchange.','Required'],
   ['The parties must be in the same country.','Not required','Exchange does not depend on geography.'],
   ['The exchange must involve money.','Not required','Barter and ideas can be exchanged too.']],4)];

 BUILD['BUS2205:2']=[
  K('mk2-a','Marketing metrics: dollar sales and market share','Cafe Aurora sold 150,000 drinks at an average price of $30 in the year; the whole industry sold $30,000,000. Compute each metric.',[
   {l:'Dollar sales',n:4500000,pre:'$',x:'30 × 150,000.'},
   {l:'Dollar market share (%)',n:15,u:'%',x:'4,500,000 ÷ 30,000,000 = 15%.'},
   {l:'Next year the firm sells $5,400,000 in an industry of $36,000,000. Market share (%)',n:15,u:'%',x:'Sales grew 20% but so did the industry: share is unchanged.'}]),
  K('mk2-b','Unit market share and average price','A phone maker sold $12,000,000 of phones, i.e. 20,000 units. The industry sold 100,000 units.',[
   {l:'Average price per unit',n:600,pre:'$',x:'12,000,000 ÷ 20,000.'},
   {l:'Unit market share (%)',n:20,u:'%',x:'20,000 ÷ 100,000.'},
   {l:'If the industry dollar sales were $80,000,000, the firm’s dollar market share (%) is',n:15,u:'%',x:'12 ÷ 80 = 15%. Unit share (20%) and dollar share (15%) differ when the firm’s price is below the industry average.'}]),
  C('mk2-c','BCG matrix: name the category','Classify each SBU by market share and market growth.',
   [['BCG category',['Star','Cash cow','Question mark','Dog']]],[
   ['High market share in a fast-growing market.','Star'],
   ['High market share in a slow-growing, mature market.','Cash cow','Generates cash that can fund other SBUs.'],
   ['Low market share in a fast-growing market.','Question mark'],
   ['Low market share in a slow-growing market.','Dog'],
   ['A product with a small share of a market growing 3% a year.','Dog'],
   ['A leading product in a market growing 25% a year that still needs heavy investment.','Star']]),
  C('mk2-d','Ansoff: product × market','Decide whether the product and the market are current or new, then name the strategy.',
   [['Product',['Current','New']],['Market',['Current','New']],['Strategy',['Market penetration','Market development','Product development','Diversification']]],[
   ['A coffee chain runs a loyalty programme to sell more of its existing drinks to its existing customers.',['Current','Current','Market penetration']],
   ['The same chain opens in a new country with its existing menu.',['Current','New','Market development']],
   ['It launches a line of bottled iced coffee for its existing customers.',['New','Current','Product development']],
   ['It launches a new line of clothing sold to a new customer group.',['New','New','Diversification','Highest risk, potentially highest reward.']]],4),
  C('mk2-e','SWOT cell and generic action','Is the item internal or external, positive or negative, and what is the matching action?',
   [['Cell',['Strength','Weakness','Opportunity','Threat']],['Action',['Build on it','Correct it','Exploit it','Avoid it']]],[
   ['The firm has a well-known brand.',['Strength','Build on it']],
   ['The firm has an outdated distribution system.',['Weakness','Correct it']],
   ['A growing segment of health-conscious consumers.',['Opportunity','Exploit it']],
   ['A new competitor with deep pockets is entering the market.',['Threat','Avoid it']]],4),
  C('mk2-f','Strategy or tactic? Plan or evaluation?','Which term does each statement describe?',
   [['Term',['Marketing strategy','Marketing tactic','Planning gap','Positive deviation','Negative deviation','Action item list','Gantt chart']]],[
   ['Target time-pressed students on Friday afternoons with a value combo.','Marketing strategy'],
   ['Post an Instagram Story every Friday at 1 pm.','Marketing tactic'],
   ['The difference between the goal and what current efforts will achieve.','Planning gap'],
   ['Sales come in above plan: capitalise on it.','Positive deviation'],
   ['Sales come in below plan: fix it.','Negative deviation'],
   ['A table of task, person responsible, deadline and deliverable.','Action item list'],
   ['A graph of the programme schedule showing sequential and concurrent tasks.','Gantt chart']],5),
  C('mk2-g','Levels of strategy','At which level is each decision made?',
   [['Level',['Corporate','SBU','Functional']]],[
   ['The CMO and top management decide which businesses the group should be in.','Corporate'],
   ['One division decides how to beat its own direct competitors.','SBU'],
   ['The marketing department builds its advertising calendar.','Functional'],
   ['Setting the overall direction across all businesses.','Corporate']],3)];

 BUILD['BUS2205:3']=[
  C('mk3-a','Which environmental force?','Classify each trend.',
   [['Force',FORCES]],[
   ['Rise of micro-influencers and conscious consumerism.','Social'],
   ['Shift to subscription business models and the circular economy.','Economic'],
   ['Social commerce on Instagram and the rollout of 5G.','Technological'],
   ['Rivals using chatbots and machine learning to compete.','Competitive'],
   ['GDPR and antitrust scrutiny of big technology firms.','Regulatory'],
   ['Population ageing and rising ethnic diversity.','Social'],
   ['Inflation reduces consumers’ spending power.','Economic'],
   ['A government introduces a sugar tax.','Regulatory']],5),
  C('mk3-b','Generational cohorts','Which cohort does each description fit?',
   [['Cohort',['Baby Boomers','Generation X','Generation Y (Millennials)','Generation Z']]],[
   ['Born 1946–1964: a large wave now at or beyond retirement age.','Baby Boomers'],
   ['Born 1965–1980: the “baby bust”, self-reliant.','Generation X'],
   ['Born 1981–1996: tech-savvy, expect brands to be socially responsible.','Generation Y (Millennials)'],
   ['Born 1997–2010: the most diverse so far, independent and financially responsible.','Generation Z']],4),
  C('mk3-c','Key terms of the environment','Name the concept.',
   [['Term',['Environmental scanning','Demographics','Multicultural marketing','Value consciousness','Culture']]],[
   ['Continually acquiring information on events outside the organisation to spot trends.','Environmental scanning'],
   ['Describing a population by age, gender, income, location and similar facts.','Demographics'],
   ['Marketing mix actions reflecting the attitudes, ancestry and lifestyles of different races.','Multicultural marketing'],
   ['Concern for the best quality, features and performance for a given price.','Value consciousness'],
   ['The values, ideas and attitudes learned and shared among the members of a group.','Culture']])];

 BUILD['BUS2205:5']=[
  C('mk5-a','Stage of the purchase decision process','Which of the five stages is each consumer in?',
   [['Stage',['Problem recognition','Information search','Alternative evaluation','Purchase decision','Postpurchase behaviour']]],[
   ['Her laptop keeps crashing and she realises she needs a new one.','Problem recognition'],
   ['He reads reviews and asks friends which brand to pick.','Information search'],
   ['She narrows the options to three brands and compares price and battery life.','Alternative evaluation'],
   ['He decides which store to buy from and when.','Purchase decision'],
   ['After buying, she wonders whether she paid too much.','Postpurchase behaviour','Cognitive dissonance.']]),
  C('mk5-b','Information sources and problem solving','Name the source or the type of problem solving.',
   [['Concept',['Internal search','Personal source','Public source','Marketer-dominated source','Extended problem solving','Limited problem solving','Routine problem solving']]],[
   ['Remembering which brand she liked last time.','Internal search'],
   ['Asking a friend for a recommendation.','Personal source'],
   ['Reading an independent consumer review site.','Public source'],
   ['Watching an advertisement or talking to a salesperson.','Marketer-dominated source'],
   ['Buying a first car: lots of research, comparison, high involvement.','Extended problem solving'],
   ['Picking up the usual brand of toothpaste.','Routine problem solving'],
   ['Choosing between a few brands of jeans after a short comparison.','Limited problem solving']],5),
  C('mk5-c','Maslow and the motive behind the purchase','Which level of Maslow’s hierarchy does each purchase mainly satisfy?',
   [['Level',['Physiological','Safety','Social','Personal (esteem)','Self-actualisation']]],[
   ['Buying groceries.','Physiological'],
   ['Buying home insurance.','Safety'],
   ['Joining a brand community or using a social app.','Social'],
   ['Buying a luxury watch to signal success.','Personal (esteem)'],
   ['Enrolling in a course to reach one’s full potential.','Self-actualisation']]),
  C('mk5-d','Psychological concepts','Name the concept.',
   [['Concept',['Selective exposure','Selective comprehension','Selective retention','Perceived risk','Stimulus generalisation','Stimulus discrimination','Cognitive dissonance']]],[
   ['She only notices advertisements for brands she already likes.','Selective exposure'],
   ['He interprets a neutral ad in a way that fits his existing beliefs.','Selective comprehension'],
   ['She remembers only the positive points of the brand she chose.','Selective retention'],
   ['A free trial and a warranty reduce the anxiety of an uncertain purchase.','Perceived risk'],
   ['A shopper trusts a new product because it carries a trusted parent brand.','Stimulus generalisation'],
   ['A shopper can tell a genuine brand from a knock-off.','Stimulus discrimination'],
   ['Tension felt after an expensive purchase.','Cognitive dissonance']],5),
  C('mk5-e','Sociocultural influences','Name the concept.',
   [['Concept',['Opinion leader','Associative group','Aspiration group','Dissociative group','Brand community','Consumer socialisation','Subculture']]],[
   ['A fitness influencer whose advice followers act on.','Opinion leader'],
   ['The club you already belong to.','Associative group'],
   ['Professional athletes a teenager would like to be part of.','Aspiration group'],
   ['A group whose image you want to avoid being linked with.','Dissociative group'],
   ['Owners of the same motorbike brand who meet and share experiences.','Brand community'],
   ['Children learning to be consumers by shopping with parents.','Consumer socialisation']],4),
  C('mk5-f','Changing attitudes: which approach?','A brand wants to change consumers’ attitudes. Which of the three approaches is it using?',
   [['Approach',['Change beliefs about the brand','Change the importance of attributes','Add a new attribute']]],[
   ['A cereal ad convinces buyers that it really is lower in sugar than they thought.','Change beliefs about the brand'],
   ['A car maker argues that safety matters more than horsepower.','Change the importance of attributes'],
   ['A phone maker adds water resistance to its next model.','Add a new attribute']],3),
  C('mk5-g','Family roles and VALS','Name the family role or the VALS motivation.',
   [['Concept',['Information gatherer','Influencer','Decision maker','Purchaser','User','Ideals','Achievement','Self-expression']]],[
   ['The teenager who researches phones online for the family.','Information gatherer'],
   ['The child who pushes for a particular cereal.','Influencer'],
   ['The parent who finally chooses and pays for the holiday.','Decision maker'],
   ['The grandchild who actually wears the new coat.','User'],
   ['Thinkers and Believers, guided by knowledge and principles.','Ideals'],
   ['Achievers and Strivers, who project success to others.','Achievement'],
   ['Experiencers and Makers, who seek activity, variety and risk.','Self-expression']],5),
  K('mk5-h','Retention arithmetic','A firm has 2,000 customers. Satisfied customers tell about 3 other people and dissatisfied ones tell about 9. 1,500 customers are satisfied and 500 are dissatisfied.',[
   {l:'People told by the satisfied customers',n:4500,x:'1,500 × 3.'},
   {l:'People told by the dissatisfied customers',n:4500,x:'500 × 9. One in four customers is unhappy, but they speak as loudly as the other three quarters combined.'},
   {l:'About 90% of the dissatisfied customers will not buy again: customers lost',n:450,x:'0.9 × 500.'}])];

 BUILD['BUS2205:8']=[
  C('mk8-a','Which type of research?','Exploratory, descriptive or causal?',
   [['Type',['Exploratory','Descriptive','Causal']]],[
   ['A firm is unsure why sales are falling and runs a few depth interviews to find hypotheses.','Exploratory'],
   ['A survey measuring who buys the product, how often and where.','Descriptive'],
   ['An experiment testing whether a lower price causes higher sales.','Causal'],
   ['A focus group used to get preliminary ideas about a vague problem.','Exploratory'],
   ['A study of the age profile of the brand’s buyers.','Descriptive']]),
  C('mk8-b','Secondary or primary data? Source type','Classify the data.',
   [['Data',['Secondary','Primary']],['Detail',['Internal','External','Observational','Questionnaire','Experiment']]],[
   ['The firm’s own sales records from last year.',['Secondary','Internal']],
   ['Census Bureau population reports.',['Secondary','External']],
   ['A mystery shopper recording how staff greet customers.',['Primary','Observational']],
   ['An online survey designed for this project.',['Primary','Questionnaire']],
   ['A test market with two prices in two cities.',['Primary','Experiment']],
   ['Nielsen TV ratings bought from a syndicated panel.',['Secondary','External']]],5),
  C('mk8-c','Observation methods and idea tools','Name the method.',
   [['Method',['Mechanical observation','Personal observation','Ethnographic research','Neuromarketing','Focus group','Mall-intercept interview','Panel','Test market']]],[
   ['A People Meter records which programmes a household watches.','Mechanical observation'],
   ['Researchers watch consumers in their own homes during their routine.','Ethnographic research'],
   ['Brain responses to an advertisement are measured.','Neuromarketing'],
   ['A facilitator leads 8–12 consumers through about 10 guided questions.','Focus group'],
   ['Shoppers are stopped in a mall and asked to answer a questionnaire.','Mall-intercept interview'],
   ['A sample of consumers measured repeatedly over time.','Panel'],
   ['A new product is sold in a small geographic area before a full rollout.','Test market']],5),
  C('mk8-d','Question formats','Which question format is each?',
   [['Format',['Open-ended','Dichotomous','Multiple-choice','Attitudinal','Semantic differential']]],[
   ['“What do you like about this product?”','Open-ended'],
   ['“Have you bought it before? Yes / No.”','Dichotomous'],
   ['“Which store do you use most: A, B, C or D?”','Multiple-choice'],
   ['“Rate your agreement: strongly disagree … strongly agree.”','Attitudinal'],
   ['“Cheap  1 2 3 4 5  Expensive.”','Semantic differential']]),
  C('mk8-e','The five-step research approach','Which step is each activity?',
   [['Step',['1 · Define the problem','2 · Develop the research plan','3 · Collect relevant information','4 · Develop findings','5 · Take marketing action']]],[
   ['Set specific, measurable research objectives.','1 · Define the problem'],
   ['Specify constraints such as budget and time, and decide on the sampling method.','2 · Develop the research plan'],
   ['Hand out questionnaires and gather sales reports.','3 · Collect relevant information'],
   ['Use cross-tabulation to explain why the results look as they do.','4 · Develop findings'],
   ['Recommend a price change and evaluate the decision afterwards.','5 · Take marketing action']]),
  C('mk8-f','Forecasting technique','Name the sales-forecasting technique.',
   [['Technique',['Direct forecast','Lost-horse forecast','Survey of buyers’ intentions','Salesforce survey forecast','Linear trend extrapolation']]],[
   ['The manager simply estimates next year’s sales without intermediate steps.','Direct forecast'],
   ['Start from last year’s sales and list factors that could raise or lower them.','Lost-horse forecast'],
   ['Ask prospective customers how likely they are to buy.','Survey of buyers’ intentions'],
   ['Ask the sales team for their estimates.','Salesforce survey forecast'],
   ['Extend the straight-line pattern of past sales into the future.','Linear trend extrapolation']]),
  K('mk8-g','Trend extrapolation','A firm’s sales were 400, 450, 500 and 550 (thousand units) in the last four years.',[
   {l:'Average yearly increase (thousand units)',n:50,x:'(550 − 400) ÷ 3.'},
   {l:'Linear-trend forecast for next year (thousand units)',n:600,x:'550 + 50.'},
   {l:'Forecast two years from now (thousand units)',n:650,x:'A straight-line trend assumes the past pattern continues, which is a weakness if the environment changes.'}])];

 BUILD['BUS2205:9']=[
  C('mk9-a','Basis of segmentation','Which basis does each variable belong to?',
   [['Basis',['Geographic','Demographic','Psychographic','Behavioural']]],[
   ['Climate of the region where customers live.','Geographic'],
   ['Household income and family size.','Demographic'],
   ['Values, activities, interests and opinions (VALS).','Psychographic'],
   ['Usage rate or brand loyalty.','Behavioural'],
   ['Benefits sought, such as “whitening” in toothpaste.','Behavioural'],
   ['City or country.','Geographic'],
   ['Age and gender.','Demographic'],
   ['Lifestyle and personality.','Psychographic']],5),
  C('mk9-b','Segmentation strategy and trade-offs','Name the concept.',
   [['Concept',['One product, multiple segments','Multiple products, multiple segments','Segment of one','Cannibalisation','Organisational synergy','Usage rate','80/20 rule']]],[
   ['A car maker offers different models for different segments.','Multiple products, multiple segments'],
   ['A product built to order only when there is an actual order.','Segment of one'],
   ['A new budget brand steals sales from the firm’s own premium brand.','Cannibalisation'],
   ['A better-functioning organisation results from serving several segments well.','Organisational synergy'],
   ['About 80% of sales come from about 20% of customers.','80/20 rule'],
   ['The quantity consumed or number of store visits in a period.','Usage rate'],
   ['A single, largely unchanged product marketed to several segments.','One product, multiple segments']],5),
  C('mk9-c','Positioning','Name the positioning idea.',
   [['Concept',['Head-to-head positioning','Differentiation positioning','Perceptual map','Positioning statement','Repositioning']]],[
   ['Competing on the same attributes for the same core segment as an established rival.','Head-to-head positioning'],
   ['Emphasising attributes the competitors do not own to reach a less contested space.','Differentiation positioning'],
   ['A two-axis diagram showing how consumers rate competing brands.','Perceptual map'],
   ['States the target segment, the category and the key points of difference.','Positioning statement'],
   ['Changing how consumers see the brand relative to competitors.','Repositioning']]),
  C('mk9-d','Perceptual map: reading the map','On a map with Price (low to high) on the X axis and Perceived quality (low to high) on the Y axis, which position is each brand in?',
   [['Quadrant',['Low price, high quality','High price, high quality','Low price, low quality','High price, low quality']]],[
   ['Brand A is priced far below the average and is rated highly for quality.','Low price, high quality','Likely a crowded or very attractive space.'],
   ['Brand B is expensive and rated top for quality (a premium brand).','High price, high quality'],
   ['Brand C is cheap and rated poorly for quality.','Low price, low quality'],
   ['Brand D is expensive but rated poorly for quality.','High price, low quality','Vulnerable: customers see little value for the price.']],4),
  K('mk9-e','Market-product grid: size the opportunity','A cafe estimates yearly demand (in $000) for each segment and product. Work out the totals.',
   [{l:'Students × coffee: 120; students × snacks: 80. Total student demand ($000)',n:200,x:'120 + 80.'},
    {l:'Office workers × coffee: 150; office workers × snacks: 30. Total office demand ($000)',n:180,x:'150 + 30.'},
    {l:'Coffee demand across both segments ($000)',n:270,x:'120 + 150.'},
    {l:'Which cell is the largest opportunity?',opts:['Students × coffee','Students × snacks','Office workers × coffee','Office workers × snacks'],key:'Office workers × coffee',x:'150 is the highest value in the grid.'}]),
  K('mk9-f','80/20 rule','A loyalty-card database has 10,000 customers and total yearly sales of $2,000,000. Heavy users are the top 20% of customers and bring 80% of sales.',[
   {l:'Number of heavy users',n:2000,x:'20% × 10,000.'},
   {l:'Yearly sales from heavy users ($)',n:1600000,pre:'$',x:'80% × 2,000,000.'},
   {l:'Average yearly spend of a heavy user ($)',n:800,pre:'$',x:'1,600,000 ÷ 2,000.'},
   {l:'Average yearly spend of the other customers ($)',n:50,pre:'$',x:'400,000 ÷ 8,000. A heavy user is worth 16 times a light user: that is why frequency marketing rewards usage rate.'}])];
}
