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
}
