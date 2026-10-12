/* ================= AI tutor: ask for an explanation of an exercise you got wrong =================
   - With your own Anthropic API key (kept only in this browser): chat inside the app.
   - Without a key: copy a ready-made prompt (statement + your answers + the solution) and open Claude. */
const TUT={msgs:{},cur:null,busy:false};
const TK={key:'lu-tutor-key',model:'lu-tutor-model',lang:'lu-tutor-lang'};
const tget=(k,d)=>{try{return localStorage.getItem(k)||d}catch(e){return d}};
const tset=(k,v)=>{try{v?localStorage.setItem(k,v):localStorage.removeItem(k)}catch(e){}};
const tPlain=s=>typeof CD!=='undefined'&&CD.strip?CD.strip(String(s==null?'':s)):String(s==null?'':s).replace(/\*\*/g,'');
const tNum=n=>typeof bn==='function'?bn(n):String(n);

/* ----- build the context text for one exercise ----- */
function tStem(stem){return (stem||[]).map(s=>typeof s==='string'?tPlain(s):s.rows.map(r=>r.map(tPlain).join(' | ')).join('\n')).join('\n')}
function tSelText(v){return v==null||v===''?'(blank)':String(v)}
function tBuilder(ex,id){
 const st=bst(id),v=st.v||{},out=[];
 out.push(`EXERCISE: ${ex.title}`);out.push(tStem(ex.stem));
 const al=a=>Array.isArray(a)?a[0]:a;
 if(ex.t==='je'){
  ex.txs.forEach((tx,ti)=>{
   out.push(`\nTransaction ${tx.k||ti+1}: ${tPlain(tx.text)}`);
   const n=(st.n&&st.n[ti])||tx.lines.length,mine=[];
   for(let li=0;li<Math.max(n,tx.lines.length);li++){const a=v[`${ti}.${li}.a`],s=v[`${ti}.${li}.s`],m=v[`${ti}.${li}.m`];if(a||s||m)mine.push(`${tSelText(s)} ${tSelText(a)} ${tSelText(m)}`)}
   (tx.pre||[]).forEach((p,pi)=>{const u=v[`${ti}.p${pi}`];out.push(`  Student's ${p.l||'pre-question'}: ${tSelText(u)} (correct: ${p.opts?p.key:p.n})`)});
   out.push('  Student entry: '+(mine.length?mine.join(' ; '):'(nothing)'));
   out.push('  Correct entry: '+(tx.lines.length?tx.lines.map(l=>`${l.s==='D'?'Debit':'Credit'} ${al(l.a)} ${tNum(l.n)}`).join(' ; '):'no entry'));
   if(tx.why)out.push('  Note: '+tPlain(tx.why))});
 }else if(ex.t==='fs'){
  out.push(`\nStudent's statement (head: ${tSelText(v['h.s'])} / ${tSelText(v['h.d'])}):`);
  const nr=Math.max(ex.rows.length,(st.n&&st.n.r)||0),cn=(ex.cols||[1]).length;
  for(let ri=0;ri<nr;ri++){const l=v[ri+'.l'];const vals=[];for(let ci=0;ci<cn;ci++)vals.push(tSelText(v[`${ri}.c${ci}`]));if(l||vals.some(x=>x!=='(blank)'))out.push(`  ${tSelText(l)}: ${vals.join(' | ')}`)}
  out.push('\nCorrect statement:');
  ex.rows.forEach(r=>{const vals=(r.v||[r.n]).map(x=>x==null?'—':tNum(x));out.push(`  ${r.disp||al(r.l)}: ${vals.join(' | ')}`)});
 }else if(ex.t==='eff'){
  const eo=(typeof bEO==='function'?bEO(ex):[['+','Increase'],['-','Decrease'],['0','No effect']]),nm=c=>(eo.find(o=>o[0]===c)||[])[1]||tSelText(c);
  ex.txs.forEach((tx,ti)=>{out.push(`\n${tx.k||''} ${tPlain(tx.text)}`);out.push('  Student: '+ex.cols.map((c,ci)=>`${c}: ${v[`${ti}.${ci}`]?nm(v[`${ti}.${ci}`]):'(blank)'}`).join(' ; '));out.push('  Correct: '+ex.cols.map((c,ci)=>`${c}: ${nm(tx.e[ci])}`).join(' ; '));if(tx.note)out.push('  Note: '+tPlain(tx.note))});
 }else if(ex.t==='cls'){
  ex.items.forEach((it,ii)=>{out.push(`\n${it.k||''} ${tPlain(it.t)}`);out.push('  Student: '+ex.cols.map((c,ci)=>`${c.h}: ${tSelText(v[`${ii}.${ci}`])}`).join(' ; '));out.push('  Correct: '+ex.cols.map((c,ci)=>`${c.h}: ${c.num?tNum(it.a[ci]||0):al(it.a[ci])}`).join(' ; '));if(it.why)out.push('  Note: '+tPlain(it.why))});
 }else if(ex.t==='calc'){
  ex.parts.forEach((p,pi)=>{out.push(`\n${tPlain(p.l)}`);out.push(`  Student: ${tSelText(v[String(pi)])}`);out.push(`  Correct: ${p.opts?p.key:(p.pre||'')+tNum(p.n)+(p.u||'')}`);if(p.x)out.push('  Method: '+tPlain(p.x))});
  if(ex.expl)out.push('\nExplanation: '+tPlain(ex.expl));
 }else if(ex.t==='grid'){
  out.push('\nStudent filled cells (row.column: value):');
  ex.rows.forEach((r,ri)=>r.forEach((x,ci)=>{if(!ex.cols[ci].g&&x!=null)out.push(`  ${r[0]} / ${ex.cols[ci].h}: student ${tSelText(v[`${ri}.${ci}`])} (correct ${tNum(x)})`)}));
  if(ex.expl)out.push('\nExplanation: '+tPlain(ex.expl));
 }
 return out.join('\n');
}
function tQuestion(q,id){
 const st=(typeof xstate==='function'?xstate(id):{}),out=['QUESTION:',tStem(q.stem&&q.stem.length?q.stem:[CD.qFront(q)])];
 if(q.kind==='mcq'){out.push(q.opts.map(o=>`${o.k}. ${tPlain(o.x)}`).join('\n'));out.push(`Student chose: ${st.sel||'(none)'}; correct answer: ${q.key}`);if(q.expl)out.push('Explanation: '+tPlain(q.expl))}
 else if(q.kind==='match'){const L=i=>String.fromCharCode(65+i);out.push(q.rows.map((r,i)=>`${i+1}. ${tPlain(r.t)} -> ${tPlain(r.d)} (student: ${(st.m||[])[i]||'blank'})`).join('\n'))}
 else if(q.parts&&q.parts.every(p=>p.n!=null)){q.parts.forEach((p,i)=>out.push(`${p.l||p.lab||'Answer'}: student ${(st.v||[])[i]||'blank'}; correct ${p.n}${p.x?' ('+tPlain(p.x)+')':''}`))}
 else{if(st.num)out.push('Student result: '+st.num);if(st.txt)out.push("Student's answer: "+st.txt);out.push('Official solution: '+tPlain(CD.ansText(q)))}
 return out.join('\n');
}
function tutorContext(id){
 const r=QREG[id];if(!r)return '';
 const c=r.ctx||{};
 const head=`Course: ${c.course||''} · lesson ${c.num||''} ${c.lt?'('+tPlain(c.lt)+')':''}`;
 try{return head+'\n\n'+(r.b?tBuilder(r.ex,id):tQuestion(r.q,id))}catch(e){return head+'\n\n(could not read the exercise: '+e.message+')'}
}
const tSystem=()=>`You are a patient tutor for a first-year business exchange student at Lingnan University (Hong Kong). The student just attempted an exercise in a study app and wants to understand where the reasoning went wrong. ${tget(TK.lang,'fr')==='fr'?'Answer in French, but keep accounting, economics and marketing technical terms in English (account names, formulas, theory names).':'Answer in English.'} Be concise: short paragraphs, no filler. Start from what the student actually answered, say precisely which step or idea is off and why, then show the correct reasoning step by step (with the numbers). Give a quick memory rule when useful. Never invent data that is not in the exercise. If the student asks for another example, make a small new one with different numbers. Use **bold** for key terms and "- " for short lists; no tables.`;

/* ----- markdown-lite for answers ----- */
function tMd(s){
 const e=String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 const inl=t=>t.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/`(.+?)`/g,'<code>$1</code>');
 let out='',list=false;
 e.split('\n').forEach(line=>{
  const m=/^\s*[-*•]\s+(.*)$/.exec(line),h=/^#{1,4}\s+(.*)$/.exec(line);
  if(m){if(!list){out+='<ul>';list=true}out+=`<li>${inl(m[1])}</li>`;return}
  if(list){out+='</ul>';list=false}
  if(h)out+=`<h6>${inl(h[1])}</h6>`;else if(line.trim())out+=`<p>${inl(line)}</p>`;
 });
 if(list)out+='</ul>';return out;
}

/* ----- UI ----- */
const tEl=()=>{let n=document.getElementById('tutor');if(!n){n=document.createElement('section');n.id='tutor';document.body.appendChild(n)}return n};
function tTitle(id){const r=QREG[id];return r?(r.b?r.ex.title:tPlain((r.q.stem&&r.q.stem[0]&&typeof r.q.stem[0]==='string'?r.q.stem[0]:CD.qFront(r.q))).slice(0,70)):'Exercise'}
function tRender(){
 const n=tEl(),id=TUT.cur;if(!id){n.classList.remove('on');return}
 const key=tget(TK.key,''),msgs=TUT.msgs[id]||[];
 const chips=!msgs.length?`<div class="tchips">${['Explain my mistakes','Walk me through the solution','Give me a similar example'].map(c=>`<button class="tchip" data-act="tchip" data-t="${c}">${c}</button>`).join('')}</div>`:'';
 n.innerHTML=`<div class="tbox"><div class="thead"><div><b>Tutor</b><small>${esc(tTitle(id))}</small></div><div><button class="tic" data-act="tset" title="Settings">⚙︎</button><button class="tic" data-act="tclose" title="Close">✕</button></div></div>
 <div class="tbody" id="tbody">${msgs.length?msgs.map(m=>`<div class="tm ${m.role}">${m.role==='user'?`<p>${esc(m.text)}</p>`:tMd(m.text||'…')}</div>`).join(''):`<div class="tm hint"><p>${key?'Ask anything about this exercise, or tap a suggestion.':'Add your Anthropic API key (⚙︎) to chat here, or copy the prompt below and paste it into Claude.'}</p></div>`}${chips}</div>
 <div class="tfoot">${key?`<div class="tin2"><textarea id="tin" rows="1" placeholder="Ask about this exercise…"></textarea><button class="btn tint sm" data-act="tsend" ${TUT.busy?'disabled':''}>${TUT.busy?'…':'Send'}</button></div>`:`<div class="tfb"><button class="btn tint sm" data-act="tcopy">Copy prompt</button><button class="btn sm" data-act="topen">Copy and open Claude</button></div>`}${key?'<div class="tfb"><button class="link" data-act="tcopy">Copy the prompt instead</button></div>':''}</div></div>`;
 n.classList.add('on');
 const b=document.getElementById('tbody');if(b)b.scrollTop=b.scrollHeight;
}
function tSettings(){
 const n=tEl(),key=tget(TK.key,''),model=tget(TK.model,'claude-haiku-5-5'),lang=tget(TK.lang,'fr');
 n.innerHTML=`<div class="tbox"><div class="thead"><div><b>Tutor settings</b><small>Stored only on this device</small></div><div><button class="tic" data-act="tback">←</button></div></div>
 <div class="tbody tset">
 <label>Anthropic API key<input id="tkey" type="password" autocomplete="off" placeholder="sk-ant-…" value="${esc(key)}"></label>
 <p class="tnote">Create it yourself at console.anthropic.com (separate from a claude.ai subscription, billed per use). It is saved only in this browser and sent only to Anthropic. Without a key you can still copy the prompt into Claude.</p>
 <label>Model<select id="tmodel"><option value="claude-haiku-5-5" ${model==='claude-haiku-5-5'?'selected':''}>Haiku 5.5 · fast, cheapest</option><option value="claude-sonnet-5-5" ${model==='claude-sonnet-5-5'?'selected':''}>Sonnet 5.5 · deeper explanations</option></select></label>
 <label>Explanations in<select id="tlang"><option value="fr" ${lang==='fr'?'selected':''}>French (terms in English)</option><option value="en" ${lang==='en'?'selected':''}>English</option></select></label>
 <div class="tfb"><button class="btn tint sm" data-act="tsave">Save</button><button class="link" data-act="tforget">Remove key</button></div></div></div>`;
 n.classList.add('on');
}
function tPrompt(id){
 return `I am a student and I just did this exercise in my study app. Please explain where my reasoning went wrong and show the correct reasoning step by step. ${tget(TK.lang,'fr')==='fr'?'Answer in French but keep technical terms in English.':'Answer in English.'}\n\n${tutorContext(id)}`;
}
async function tCopy(text){
 try{await navigator.clipboard.writeText(text);return true}catch(e){
  try{const t=document.createElement('textarea');t.value=text;document.body.appendChild(t);t.select();const ok=document.execCommand('copy');t.remove();return ok}catch(x){return false}}
}
function tToast(m){const n=tEl();let t=n.querySelector('.ttoast');if(!t){t=document.createElement('div');t.className='ttoast';n.appendChild(t)}t.textContent=m;t.classList.add('on');clearTimeout(tToast.h);tToast.h=setTimeout(()=>t.classList.remove('on'),1800)}

async function tAsk(text){
 const id=TUT.cur,key=tget(TK.key,'');if(!id||!key||TUT.busy||!text.trim())return;
 const msgs=TUT.msgs[id]=TUT.msgs[id]||[];
 msgs.push({role:'user',text:text.trim()});
 const reply={role:'assistant',text:''};msgs.push(reply);TUT.busy=true;tRender();
 const ctxMsg=`Here is the exercise and my answers:\n\n${tutorContext(id)}`;
 const api=[{role:'user',content:ctxMsg},{role:'assistant',content:'Understood. What would you like to know about this exercise?'}];
 msgs.slice(0,-1).forEach(m=>api.push({role:m.role,content:m.text}));
 try{
  const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:tget(TK.model,'claude-haiku-5-5'),max_tokens:1400,stream:true,system:tSystem(),messages:api})});
  if(!res.ok){let m='';try{const j=await res.json();m=(j.error&&j.error.message)||''}catch(e){}throw new Error(res.status===401?'The API key was rejected (401). Check it in ⚙︎.':(m||('Error '+res.status)))}
  const rd=res.body.getReader(),dec=new TextDecoder();let buf='';
  const upd=()=>{const bl=document.querySelectorAll('#tbody .tm.assistant'),b=bl[bl.length-1];if(b){b.innerHTML=tMd(reply.text||'…');const bb=document.getElementById('tbody');if(bb)bb.scrollTop=bb.scrollHeight}};
  for(;;){const {done,value}=await rd.read();if(done)break;buf+=dec.decode(value,{stream:true});
   let i;while((i=buf.indexOf('\n'))>=0){const line=buf.slice(0,i).trim();buf=buf.slice(i+1);
    if(!line.startsWith('data:'))continue;const d=line.slice(5).trim();if(!d||d==='[DONE]')continue;
    try{const j=JSON.parse(d);if(j.type==='content_block_delta'&&j.delta&&j.delta.text){reply.text+=j.delta.text;upd()}else if(j.type==='error')throw new Error((j.error&&j.error.message)||'Stream error')}catch(e){if(e instanceof SyntaxError)continue;throw e}}}
  if(!reply.text)reply.text='(empty answer)';
 }catch(e){reply.text='⚠︎ '+(e.message==='Failed to fetch'?'Network error: check your connection.':e.message)}
 TUT.busy=false;tRender();
}

Object.assign(A,{
 tutor(el){const id=el.dataset.q;TUT.cur=id;tRender();const ta=document.getElementById('tin');if(ta&&innerWidth>700)ta.focus()},
 tclose(){TUT.cur=null;tEl().classList.remove('on')},
 tset(){tSettings()},
 tback(){tRender()},
 tsave(){const k=(document.getElementById('tkey').value||'').trim();tset(TK.key,k);tset(TK.model,document.getElementById('tmodel').value);tset(TK.lang,document.getElementById('tlang').value);tRender();tToast(k?'Saved':'Saved (no key: copy mode)')},
 tforget(){tset(TK.key,'');tRender();tToast('Key removed')},
 tchip(el){tAsk(el.dataset.t)},
 tsend(){const ta=document.getElementById('tin');if(!ta)return;const v=ta.value;ta.value='';tAsk(v)},
 async tcopy(){tToast(await tCopy(tPrompt(TUT.cur))?'Prompt copied':'Could not copy')},
 async topen(){const ok=await tCopy(tPrompt(TUT.cur));tToast(ok?'Prompt copied: paste it in Claude':'Could not copy');window.open('https://claude.ai/new','_blank','noopener')}
});
document.addEventListener('keydown',e=>{if(e.target&&e.target.id==='tin'&&e.key==='Enter'&&!e.shiftKey){e.preventDefault();A.tsend()}if(e.key==='Escape'&&TUT.cur)A.tclose()});
document.addEventListener('input',e=>{const t=e.target;if(t&&t.id==='tin'){t.style.height='auto';t.style.height=Math.min(140,t.scrollHeight)+'px'}});
function tutorHtml(id){return `<div class="xbar tutbar"><button class="btn tint sm tutbtn" data-act="tutor" data-q="${id}">See why</button></div>`}
