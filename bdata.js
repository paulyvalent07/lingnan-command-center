/* Exercises where YOU build the entry, the statement or the table (dropdowns for accounts, Dr/Cr, line titles, periods).
   Types: je (journal entries), fs (statement / trial balance, 1+ columns), eff (effect on the equation), cls (classify), calc (numbers). */
const COA=[
 ['Assets',['Cash','Short-term investments','Accounts receivable','Notes receivable (short-term)','Interest receivable','Rent receivable','Allowance for doubtful accounts','Inventory','Supplies','Small tools','Prepaid insurance','Prepaid rent','Prepaid advertising','Prepaid expenses','Other current assets','Long-term investments','Notes receivable (long-term)','Land','Buildings','Equipment','Property, plant, and equipment','Accumulated depreciation','Operating lease assets','Intangible assets','Other noncurrent assets']],
 ['Liabilities',['Accounts payable','Accrued liabilities payable','Wages payable','Utilities payable','Rent payable','Interest payable','Income taxes payable','Dividends payable','Unearned revenue','Short-term notes payable','Long-term notes payable','Short-term debt','Long-term debt','Long-term operating lease liabilities','Other noncurrent liabilities']],
 ['Stockholders’ equity',['Common stock','Additional paid-in capital','Retained earnings','Dividends declared','Income summary']],
 ['Revenues',['Sales revenue','Service revenue','Interest revenue','Rent revenue','Sales returns and allowances','Sales discounts']],
 ['Expenses',['Cost of goods sold','Cost of sales','Wages expense','Salaries expense','Rent expense','Utilities expense','Repairs expense','Supplies expense','Insurance expense','Advertising expense','Depreciation expense','Interest expense','Income tax expense','Bad debt expense','Credit card discount expense','Miscellaneous expenses','Other operating expenses']]
];
const SUBT=['Total revenues','Net sales','Total expenses','Total operating expenses','Gross profit','Operating income','Pretax income','Net income','Earnings per share','Total current assets','Total assets','Total current liabilities','Total liabilities','Total stockholders’ equity','Total liabilities and stockholders’ equity','Totals'];
const D=(a,n)=>({a,n,s:'D'}),K=(a,n)=>({a,n,s:'C'});
const TX=(k,text,lines,note,pre)=>({k,text,lines,note,pre});
const FR=(l,n,x)=>Object.assign({l,n},x||{});
const F2=(l,...v)=>({l,v});
const ADJ=['Deferred revenue','Deferred expense','Accrued revenue','Accrued expense','Depreciation'];
const ELEM=['Asset','Liability','Stockholders’ equity','Revenue','Expense'];
const STMT4=['Balance sheet','Income statement','Statement of stockholders’ equity','Statement of cash flows'];
const PRIN=['Monetary unit assumption','Historical cost principle','Materiality','Periodicity assumption','Economic entity assumption','Going concern assumption','Revenue recognition principle','Expense recognition (matching) principle'];
const CLS5=['Current asset','Noncurrent asset','Current liability','Noncurrent liability','Stockholders’ equity'];
const CF3=['Operating','Investing','Financing','No cash effect'];

const BUILD={};

/* ================= CHAPTER 1 ================= */
{
 const stmtPair=(tag,corp,period,rev,exp,tax,cash,ar,inv,ap,cs,div,mn)=>{
  const pre=rev-exp,ni=pre-tax,re=ni-(div||0),ta=cash+ar+inv,tl=ap+tax,se=cs+re;
  const common=`${tag} · ${corp} was organized on January 1 of the current year. ${period==='month'?'At the end of January':'At the end of the year'}, the following financial data are available:`;
  const data={rows:[["Total revenues","$"+rev.toLocaleString('en-US')],["Total expenses (excluding income taxes)",exp.toLocaleString('en-US')],["Income tax expense (all unpaid at the end of the period)",tax.toLocaleString('en-US')],["Cash",cash.toLocaleString('en-US')],["Receivables from customers (all collectible)",ar.toLocaleString('en-US')],["Merchandise inventory (count at cost)",inv.toLocaleString('en-US')],["Payables to suppliers for merchandise purchased",ap.toLocaleString('en-US')],["Common stock",cs.toLocaleString('en-US')]]};
  const note=div?`Dividends: ${div}.`:'No dividends were declared or paid, so ending retained earnings = net income.';
  return [
   {id:`b1-${tag}-is`,t:'fs',min:4,sec:'Official practice · build the statements',title:`${tag} · ${corp} — build the income statement`,cap:'Income statement',head:['Income statement',period==='month'?'For the month ended …':'For the year ended …'],
    stem:[common,data,note,'Required: build the income statement from the data. Only the lines that belong in it.'],
    rows:[FR('Total revenues',rev),FR('Total expenses',exp),FR('Pretax income',pre,{tot:1}),FR('Income tax expense',tax),FR('Net income',ni,{tot:1})]},
   {id:`b1-${tag}-bs`,t:'fs',min:6,title:`${tag} · ${corp} — build the balance sheet`,cap:'Balance sheet',head:['Balance sheet','At … (a point in time)'],
    stem:[`${tag} (continued) · same data:`,data,'Required: build the balance sheet (use your net income for retained earnings). Income taxes are unpaid; no dividends. Check that it balances.'],
    rows:[FR('Cash',cash),FR('Accounts receivable',ar),FR('Inventory',inv),FR('Total assets',ta,{tot:1}),FR('Accounts payable',ap),FR('Income taxes payable',tax),FR('Total liabilities',tl,{tot:1}),FR('Common stock',cs),FR('Retained earnings',re),FR('Total stockholders’ equity',se,{tot:1}),FR('Total liabilities and stockholders’ equity',tl+se,{tot:1})],
    note:`Retained earnings = net income ${ni.toLocaleString('en-US')} (first period, no dividends). Assets ${ta.toLocaleString('en-US')} = liabilities ${tl.toLocaleString('en-US')} + equity ${se.toLocaleString('en-US')}.`}];
 };
 const e13=(()=>{const ni22=31000,ni23=42000,d22=14200,d23=18700,cs=100000,re22=ni22-d22,re23=re22+ni23-d23;
  return {id:'b1-e1-13',t:'fs',min:5,title:'E1-13 · Plummer Stonework — statement of stockholders’ equity',cap:'Statement of stockholders’ equity',head:['Statement of stockholders’ equity','For the year ended …'],cols:['Common stock','Retained earnings'],
   labels:['Balance, December 31, 2022','Net income','Dividends','Issuance of common stock','Balance, December 31, 2023','Balance, January 1, 2022'],
   stem:['Plummer Stonework Corporation was organized on January 1, 2022. For its first two years it reported:',{rows:[["Net income for 2022","$31,000"],["Net income for 2023","42,000"],["Dividends for 2022","14,200"],["Dividends for 2023","18,700"],["Total assets at the end of 2022","130,000"],["Total assets at the end of 2023","250,000"],["Common stock at the end of 2022","100,000"],["Common stock at the end of 2023","100,000"]]},'Required: prepare the statement of stockholders’ equity for 2023. Only the data you need.'],
   rows:[F2('Balance, December 31, 2022',cs,re22),F2('Net income',null,ni23),F2('Dividends',null,d23),F2('Balance, December 31, 2023',cs,re23)],
   note:`Opening RE 2023 = 31,000 − 14,200 = ${re22.toLocaleString('en-US')}. Closing RE = ${re22.toLocaleString('en-US')} + 42,000 − 18,700 = ${re23.toLocaleString('en-US')}. Total assets are a distractor.`}})();
 const harbor=(()=>{const rev=96000,sal=41000,rent=18000,ins=3000,tax=7400,pre=rev-sal-rent-ins,ni=pre-tax,re=0+ni-5000,ta=38000+12500+8000,tl=9500+7400,se=20000+re;
  return [
  {id:'b1-harb-is',t:'fs',min:4,sec:'Putting it all together',title:'Harbor Consulting — build the income statement',cap:'Income statement',head:['Income statement','For the year ended …'],
   stem:['Harbor Consulting Corp. had these account balances at the end of its first year, in random order (all in $):',{rows:[["Cash","38,000"],["Accounts receivable","12,500"],["Service revenue","96,000"],["Salaries expense","41,000"],["Rent expense","18,000"],["Common stock","20,000"],["Accounts payable","9,500"],["Income tax expense","7,400"],["Retained earnings (beginning)","0"],["Dividends declared","5,000"],["Equipment","8,000"],["Income taxes payable","7,400"],["Insurance expense","3,000"]]},'Required: build the income statement. Watch out: not every account belongs in it.'],
   rows:[FR('Service revenue',rev),FR('Salaries expense',sal),FR('Rent expense',rent),FR('Insurance expense',ins),FR('Pretax income',pre,{tot:1}),FR('Income tax expense',tax),FR('Net income',ni,{tot:1})],
   note:'Dividends are not an expense: they never appear on the income statement.'},
  {id:'b1-harb-bs',t:'fs',min:6,title:'Harbor Consulting — build the balance sheet',cap:'Balance sheet',head:['Balance sheet','At … (a point in time)'],
   stem:['Same data. Compute ending retained earnings yourself (beginning + net income − dividends) and build the balance sheet.'],
   rows:[FR('Cash',38000),FR('Accounts receivable',12500),FR('Equipment',8000),FR('Total assets',ta,{tot:1}),FR('Accounts payable',9500),FR('Income taxes payable',7400),FR('Total liabilities',tl,{tot:1}),FR('Common stock',20000),FR('Retained earnings',re),FR('Total stockholders’ equity',se,{tot:1}),FR('Total liabilities and stockholders’ equity',tl+se,{tot:1})],
   note:`Retained earnings = 0 + ${ni.toLocaleString('en-US')} − 5,000 = ${re.toLocaleString('en-US')}.`}]})();
 BUILD['BUS1103:1']=[
  {id:'b1-cls1',t:'cls',min:3,sec:'Warm-up drills',title:'What is it, and on which statement?',
   stem:['For each account, name its element and the statement it appears on.'],
   cols:[{h:'Element',opts:ELEM},{h:'Statement',opts:['Balance sheet','Income statement']}],
   items:[
    {t:'Cash',a:['Asset','Balance sheet']},{t:'Accounts payable',a:['Liability','Balance sheet']},{t:'Common stock',a:['Stockholders’ equity','Balance sheet']},
    {t:'Service revenue',a:['Revenue','Income statement']},{t:'Salaries expense',a:['Expense','Income statement']},{t:'Merchandise inventory',a:['Asset','Balance sheet']},
    {t:'Income taxes payable',a:['Liability','Balance sheet']},{t:'Retained earnings',a:['Stockholders’ equity','Balance sheet']},{t:'Receivables from customers',a:['Asset','Balance sheet']},
    {t:'Rent expense',a:['Expense','Income statement']},{t:'Interest revenue',a:['Revenue','Income statement']},{t:'Notes payable',a:['Liability','Balance sheet']}]},
  {id:'b1-cls2',t:'cls',min:3,title:'Which statement reports it?',stem:['Pick the statement where each item is mainly reported.'],
   cols:[{h:'Statement',opts:STMT4}],
   items:[
    {t:'Total liabilities at December 31',a:['Balance sheet']},{t:'Net income for the year',a:['Income statement']},{t:'Dividends declared during the year',a:['Statement of stockholders’ equity'],why:'Dividends reduce retained earnings: they are shown in the statement of stockholders’ equity (not in the income statement).'},
    {t:'Cash paid to buy equipment',a:['Statement of cash flows']},{t:'Cost of goods sold',a:['Income statement']},{t:'Beginning retained earnings of the year',a:['Statement of stockholders’ equity']},
    {t:'Cash collected from customers',a:['Statement of cash flows']},{t:'Inventory held at year-end',a:['Balance sheet']}]},
  {id:'b1-cls3',t:'cls',min:3,title:'Accounting assumptions and principles',stem:['Name the assumption or principle each situation illustrates.'],
   cols:[{h:'Principle',opts:PRIN}],
   items:[
    {k:'(i)',t:'A company reports its assets and results in HK dollars, without adjusting for inflation over the years.',a:['Monetary unit assumption']},
    {k:'(ii)',t:'A retailer records a laptop bought for $8,000 at $8,000, even though a similar laptop now sells for $9,500.',a:['Historical cost principle']},
    {k:'(iii)',t:'A company does not separately disclose a $40 stationery expense in multi-million-dollar statements.',a:['Materiality']},
    {k:'(iv)',t:'Although it operates continuously, a company produces a full set of statements every 3 months.',a:['Periodicity assumption']},
    {k:'(v)',t:'A sole proprietor records his personal car separately from his shop’s records.',a:['Economic entity assumption']},
    {k:'(vi)',t:'A company records revenue when it delivers the goods, not when the customer places the order.',a:['Revenue recognition principle']},
    {k:'(vii)',t:'The salaries of the sales team are recorded as expenses in the same period as the revenue they helped earn.',a:['Expense recognition (matching) principle']},
    {k:'(viii)',t:'Assets are not reported at liquidation value because the company is assumed to operate indefinitely.',a:['Going concern assumption']}]},
  {id:'b1-calc1',t:'calc',min:4,sec:'The accounting equation',title:'Nova Traders — building the equation',
   stem:['At the start of the year, Nova Traders Ltd. had total assets of $420,000 and total liabilities of $150,000. During the year: net income $60,000, additional common stock issued for $25,000 cash, dividends paid $18,000. No other equity transactions.'],
   parts:[{l:'(a) Beginning stockholders’ equity',n:270000,pre:'$'},{l:'(b) Ending stockholders’ equity',n:337000,pre:'$',x:'270,000 + 60,000 + 25,000 − 18,000'},{l:'(c) Ending total assets if ending liabilities are $165,000',n:502000,pre:'$',x:'Assets = liabilities + equity = 165,000 + 337,000'}],
   expl:'Equation: Assets = Liabilities + Stockholders’ equity. Equity changes with stock issued, net income and dividends.'},
  ...stmtPair('E1-11','Painter Corporation','month',305000,189000,25000,65150,44700,94500,25950,62400,0),
  ...stmtPair('E1-12','Analytics Corporation','year',299000,184000,34500,70150,34500,96600,26450,59800,0),
  e13,
  ...harbor
 ];
}
