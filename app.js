// ── App state ────────────────────────────────────────────────
const A = {
  ctrlKey: 'Escape',
  ctrlLabel: 'Esc',
  lesson: 0,
  done: new Set(),
  tab: 'practice',
  stats: {},
  lang: 'en', // default to English based on context
};

// ── Buffer state ─────────────────────────────────────────────
let B = {
  lines: [], cursor: {l:0,c:0},
  mark: null, markOn: false,
  killRing: [], krIdx: 0,
  prefix: null,
  isSrch: false, srchQ: '', srchDir: 'f', srchMatches: [], srchIdx: -1, srchOrigin: null,
  isMx: false, mxQ: '',
  isQr: false, qrPhase: 0, qrSearch: '', qrReplace: '', qrQ: '', qrMatches: [], qrIdx: 0,
  isLink: false, linkQ: '', linkPhase: 0,
  rcState: 0, scrollTop: 0,
  cmdCnt: {}, startTime: Date.now(),
};

const VL = 14; // visible lines

// ── Helpers ──────────────────────────────────────────────────
function h(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function clamp(){
  B.cursor.l = Math.max(0, Math.min(B.lines.length-1, B.cursor.l));
  B.cursor.c = Math.max(0, Math.min(B.lines[B.cursor.l].length, B.cursor.c));
}

function scrollTo(){
  if(B.cursor.l < B.scrollTop) B.scrollTop = B.cursor.l;
  else if(B.cursor.l >= B.scrollTop + VL) B.scrollTop = B.cursor.l - VL + 1;
}

function wordChar(ch){ return /\w/.test(ch||''); }

function fwdWord(){
  let {l,c} = B.cursor, lines = B.lines;
  let safety = 0;
  while(safety++ < 1000){
    if(c >= lines[l].length){
      if(l < lines.length-1){l++;c=0;}else break;
      continue;
    }
    if(!wordChar(lines[l][c])){c++;continue;}
    while(c < lines[l].length && wordChar(lines[l][c]))c++;
    break;
  }
  B.cursor={l,c};
}

function bwdWord(){
  let {l,c} = B.cursor, lines = B.lines;
  if(c===0&&l===0)return;
  c--;
  if(c<0){l--;c=lines[l].length-1;}
  let safety=0;
  while(safety++ < 1000 && !wordChar(lines[l][c]||'')){
    c--;
    if(c<0){if(l>0){l--;c=lines[l].length-1;}else{c=0;break;}}
  }
  while(c>0 && wordChar(lines[l][c-1]||''))c--;
  B.cursor={l,c};
}

function killToRing(text){
  if(!text)return;
  B.killRing.unshift(text);
  if(B.killRing.length>30)B.killRing.pop();
  B.krIdx=0;
}

function regionBounds(){
  if(!B.mark)return null;
  let a=B.mark, b=B.cursor;
  if(a.l>b.l||(a.l===b.l&&a.c>b.c))[a,b]=[b,a];
  return{s:a,e:b};
}

function regionText(){
  const r=regionBounds(); if(!r)return '';
  const{s,e}=r, lines=B.lines;
  if(s.l===e.l)return lines[s.l].slice(s.c,e.c);
  let t=lines[s.l].slice(s.c);
  for(let i=s.l+1;i<e.l;i++)t+='\n'+lines[i];
  t+='\n'+lines[e.l].slice(0,e.c);
  return t;
}

function deleteRegion(){
  const r=regionBounds(); if(!r)return;
  const{s,e}=r, lines=B.lines;
  if(s.l===e.l){
    lines[s.l]=lines[s.l].slice(0,s.c)+lines[s.l].slice(e.c);
  } else {
    const nl=lines[s.l].slice(0,s.c)+lines[e.l].slice(e.c);
    lines.splice(s.l,e.l-s.l+1,nl);
  }
  B.cursor={...s}; B.mark=null; B.markOn=false;
}

function inRegion(l,c){
  const r=regionBounds(); if(!r||!B.markOn)return false;
  const{s,e}=r;
  if(l<s.l||l>e.l)return false;
  if(l===s.l&&l===e.l)return c>=s.c&&c<e.c;
  if(l===s.l)return c>=s.c;
  if(l===e.l)return c<e.c;
  return true;
}

function findAll(q){
  if(!q)return[];
  const matches=[], ql=q.toLowerCase();
  B.lines.forEach((line,li)=>{
    const ll=line.toLowerCase(); let i=0;
    while((i=ll.indexOf(ql,i))!==-1){matches.push({l:li,c:i,len:q.length});i++;}
  });
  return matches;
}

function reEsc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}

function mb(type,text){
  const el=document.getElementById('mb-text');
  el.className='mb'+(type?' mb-'+type:'');
  el.textContent=text;
}

// ── Render ───────────────────────────────────────────────────
// ── Syntax highlighting ────────────────────────────────────
function getLineColors(line, mode){
  const C=new Array(line.length).fill('');
  function paint(s,e,c){for(let i=s;i<Math.min(e,line.length);i++)C[i]=c;}
  function paintRe(re,c){
    let m;
    const r=new RegExp(re.source,'g');
    while((m=r.exec(line))!==null)paint(m.index,m.index+m[0].length,c);
  }

  if(mode==='org'||mode==='journal'){
    // Heading stars + title
    const hm=line.match(/^(\*+)( +)(.*?)$/);
    if(hm){
      const stars=hm[1].length;
      const starColor=stars===1?'purple':stars===2?'purple2':'dim';
      paint(0,hm[1].length,starColor);
      // Title after stars (keep fg-dim unless has TODO/DONE)
      const titleStart=hm[1].length+hm[2].length;
      // Check for TODO/DONE inside heading
      const todoM=line.match(/\b(TODO)\b/);
      const doneM=line.match(/\b(DONE)\b/);
      if(todoM){paint(todoM.index,todoM.index+4,'red');}
      if(doneM){paint(doneM.index,doneM.index+4,'green');}
    }
    // Inline TODO/DONE anywhere
    const todoM=line.match(/\bTODO\b/);
    if(todoM&&!line.startsWith('*'))paint(todoM.index,todoM.index+4,'red');
    const doneM=line.match(/\bDONE\b/);
    if(doneM&&!line.startsWith('*'))paint(doneM.index,doneM.index+4,'green');
    // Active timestamps <YYYY-MM-DD ...>
    paintRe(/<\d{4}-\d{2}-\d{2}[^>]*>/,'cyan');
    // Inactive timestamps [YYYY-MM-DD ...]
    paintRe(/\[\d{4}-\d{2}-\d{2}[^\]]*\]/,'blue');
    // Checkboxes [ ] [x] [X]
    let cbm;
    const cbRe=/\[([ xX])\]/g;
    while((cbm=cbRe.exec(line))!==null){
      paint(cbm.index,cbm.index+3,cbm[1]===' '?'yellow':'green');
    }
    // Links [[...][...]]
    paintRe(/\[\[[^\]]+\](?:\[[^\]]*\])?\]/,'blue');
    // Properties :PROP:
    paintRe(/:[A-Z_]+:/,'muted');
    // Comment lines
    if(line.trimStart().startsWith('#'))paint(0,line.length,'muted');
    // Bold *text*
    paintRe(/\*[^*\n]+\*/,'bold');
    // Italic /text/
    paintRe(/\/[^/\n]+\//,'cyan');
    // Code ~text~
    paintRe(/~[^~\n]+~/,'yellow');
    // Verbatim =text=
    paintRe(/=[^=\n]+=/,'yellow');
  }

  if(mode==='elisp'){
    // Strings first (so keywords inside strings aren't highlighted)
    const strRanges=[];
    let sm;
    const strRe=/"[^"\\]*(?:\\.[^"\\]*)*"/g;
    while((sm=strRe.exec(line))!==null){
      strRanges.push([sm.index,sm.index+sm[0].length]);
      paint(sm.index,sm.index+sm[0].length,'yellow');
    }
    function inStr(i){return strRanges.some(([s,e])=>i>=s&&i<e);}
    // Comments ; ...
    for(let i=0;i<line.length;i++){
      if(line[i]===';'&&!inStr(i)){paint(i,line.length,'muted');break;}
    }
    // Special forms / keywords
    const kwRe=/\b(setq|after!|defun|defvar|defcustom|let|let\*|lambda|if|when|unless|cond|and|or|not|progn|require|use-package|add-hook|add-to-list|setopt|defalias|evil-set-initial-state|doom-theme|doom-font|font-spec)\b/g;
    let km;
    while((km=kwRe.exec(line))!==null)if(!inStr(km.index))paint(km.index,km.index+km[0].length,'blue');
    // Quoted symbols 'symbol
    const symRe=/'[\w-]+/g;
    let qm;
    while((qm=symRe.exec(line))!==null)if(!inStr(qm.index))paint(qm.index,qm.index+qm[0].length,'cyan');
    // Numbers
    paintRe(/\b\d+\b/,'yellow');
    // Parentheses
    for(let i=0;i<line.length;i++){
      if((line[i]==='('||line[i]===')')&&!inStr(i)&&C[i]==='')C[i]='dim';
    }
  }

  if(mode==='c'){
    const strRanges=[];
    let sm;
    const strRe2=/"[^"\\]*(?:\\.[^"\\]*)*"/g;
    while((sm=strRe2.exec(line))!==null){
      strRanges.push([sm.index,sm.index+sm[0].length]);
      paint(sm.index,sm.index+sm[0].length,'yellow');
    }
    function inStr2(i){return strRanges.some(([s,e])=>i>=s&&i<e);}
    // Block comments /* ... */
    paintRe(/\/\*[^*]*(?:\*(?!\/)[^*]*)*\*\//,'muted');
    // Line comments //
    for(let i=0;i<line.length-1;i++){
      if(line[i]==='/'&&line[i+1]==='/'&&!inStr2(i)){paint(i,line.length,'muted');break;}
    }
    // C keywords
    const ckw=/\b(static|void|const|int|char|unsigned|return|if|else|for|while|do|struct|typedef|enum|switch|case|break|continue|NULL|true|false|guint|gpointer|gboolean|gchar|gint)\b/g;
    let km;
    while((km=ckw.exec(line))!==null)if(!inStr2(km.index))paint(km.index,km.index+km[0].length,'blue');
    // GTK/GLib types (CamelCase or ALL_CAPS macros)
    const typeRe=/\b(GtkListView|CualiWindow|GObject|GType|gboolean|gchar|guint|gpointer)\b/g;
    let tm;
    while((tm=typeRe.exec(line))!==null)if(!inStr2(tm.index))paint(tm.index,tm.index+tm[0].length,'purple');
    // Macros / function-like ALL_CAPS
    const macRe=/\b(g_return_if_fail|CUALI_WINDOW|CUALI_IS_WINDOW|G_OBJECT|GTK_WIDGET|g_assert|G_TYPE_[A-Z_]+)\b/g;
    let mm;
    while((mm=macRe.exec(line))!==null)if(!inStr2(mm.index))paint(mm.index,mm.index+mm[0].length,'cyan');
    // Numbers
    paintRe(/\b\d+\b/,'yellow');
    // Punctuation { } ( ) [ ]
    for(let i=0;i<line.length;i++){
      if('{})([;'.includes(line[i])&&!inStr2(i)&&C[i]==='')C[i]='dim';
    }
  }

  return C;
}

function render(){
  const container=document.getElementById('buf-lines');
  const{lines,cursor,scrollTop,isSrch,srchMatches,srchIdx}=B;
  // Determine syntax mode from current lesson buffer
  const L=LESSONS[A.lang][A.lesson];
  const bufMode=L?L.buf:'org';
  const sset={};
  if(isSrch) srchMatches.forEach((m,i)=>{
    if(!sset[m.l])sset[m.l]=[];
    sset[m.l].push({c:m.c,len:m.len,cur:i===srchIdx});
  });
  let out='';
  const end=Math.min(scrollTop+VL,lines.length);
  for(let li=scrollTop;li<end;li++){
    const line=lines[li], isCL=li===cursor.l;
    const synColors=getLineColors(line,bufMode);
    let lhtml='';
    for(let ci=0;ci<=line.length;ci++){
      const ch=ci<line.length?line[ci]:'';
      const isCur=isCL&&ci===cursor.c;
      if(ci===line.length){
        const isBugEol=(B.bugs||[]).find(b=>b.l===li&&b.c===ci);
        if(isBugEol&&isCur) lhtml+=`<span class="cursor-eol">🐛</span>`;
        else if(isBugEol) lhtml+=`<span class="sy-bug">🐛</span>`;
        else if(isCur) lhtml+=`<span class="cursor-eol"></span>`;
        else if(isCL&&cursor.c===line.length) lhtml+=`<span class="cursor-eol"></span>`;
        break;
      }
      // Check if bug is here
      const isBug=(B.bugs||[]).find(b=>b.l===li&&b.c===ci);
      let cls='';
      let charToRender=ch;
      
      if(isBug&&isCur){ cls='cursor-b'; charToRender='🐛'; }
      else if(isCur) cls='cursor-b';
      else if(isBug){ cls='sy-bug'; charToRender='🐛'; }
      else {
        let inS=false,isC=false;
        if(sset[li]) for(const m of sset[li]) if(ci>=m.c&&ci<m.c+m.len){inS=true;isC=m.cur;}
        if(isC) cls='smc';
        else if(inS) cls='sm';
        else if(inRegion(li,ci)) cls='rgn';
        else if(synColors[ci]) cls='sy-'+synColors[ci];
      }
      lhtml+=cls?`<span class="${cls}">${h(charToRender)}</span>`:h(charToRender);
    }
    if(isCL&&line.length===0&&cursor.c===0) lhtml=`<span class="cursor-eol"></span>`;
    out+=`<div class="bline"><div class="lnum">${li+1}</div><div class="lcont">${lhtml||'&nbsp;'}</div></div>`;
  }
  const shown=end-scrollTop;
  for(let i=shown;i<VL;i++) out+=`<div class="bline"><div class="lnum" style="opacity:.2">~</div><div class="lcont" style="color:var(--fg-muted)">~</div></div>`;
  container.innerHTML=out;
  document.getElementById('ml-pos').textContent=`L${cursor.l+1}:C${cursor.c}`;
}

// ── isearch helpers ──────────────────────────────────────────
function srchUpdate(){
  B.srchMatches=findAll(B.srchQ);
  if(!B.srchQ){mb('prompt','I-search: ');if(B.srchOrigin)B.cursor={...B.srchOrigin};render();return;}
  if(!B.srchMatches.length){mb('error',`Failing i-search: "${B.srchQ}"`);render();return;}
  const org=B.srchOrigin||{l:0,c:0};
  let found=-1;
  if(B.srchDir==='f'){
    for(let i=0;i<B.srchMatches.length;i++){
      const m=B.srchMatches[i];
      if(m.l>org.l||(m.l===org.l&&m.c>=org.c)){found=i;break;}
    }
    if(found===-1)found=0;
  } else {
    for(let i=B.srchMatches.length-1;i>=0;i--){
      const m=B.srchMatches[i];
      if(m.l<org.l||(m.l===org.l&&m.c<org.c)){found=i;break;}
    }
    if(found===-1)found=B.srchMatches.length-1;
  }
  B.srchIdx=found;
  const m=B.srchMatches[found];
  B.cursor={l:m.l,c:m.c+m.len};
  scrollTo();
  mb('prompt',`I-search: ${B.srchQ}█ (${found+1}/${B.srchMatches.length})`);
  render();
}

function srchNext(){
  B.srchMatches=findAll(B.srchQ);
  if(!B.srchMatches.length){mb('error',`Failing i-search: "${B.srchQ}"`);return;}
  const{l,c}=B.cursor;
  let found=-1;
  if(B.srchDir==='f'){
    for(let i=0;i<B.srchMatches.length;i++){
      const m=B.srchMatches[i];
      if(m.l>l||(m.l===l&&m.c>=c)){found=i;break;}
    }
    if(found===-1)found=0;
  } else {
    for(let i=B.srchMatches.length-1;i>=0;i--){
      const m=B.srchMatches[i];
      if(m.l<l||(m.l===l&&m.c<c-B.srchQ.length-1)){found=i;break;}
    }
    if(found===-1)found=B.srchMatches.length-1;
  }
  B.srchIdx=found;
  const m=B.srchMatches[found];
  B.cursor={l:m.l,c:m.c+m.len};
  scrollTo();
  mb('prompt',`I-search: ${B.srchQ}█ (${found+1}/${B.srchMatches.length})`);
  render();
}

// ── Execute command ──────────────────────────────────────────
function exec(cmd){
  const L=LESSONS[A.lang][A.lesson];
  const req=L.req.includes(cmd);
  const st=A.stats[A.lesson];
  if(st)st.attempts=(st.attempts||0)+1;

  switch(cmd){
    // Movement
    case 'C-f':
      if(B.cursor.c<B.lines[B.cursor.l].length)B.cursor.c++;
      else if(B.cursor.l<B.lines.length-1){B.cursor.l++;B.cursor.c=0;}
      scrollTo();mb('','');break;
    case 'C-b':
      if(B.cursor.c>0)B.cursor.c--;
      else if(B.cursor.l>0){B.cursor.l--;B.cursor.c=B.lines[B.cursor.l].length;}
      scrollTo();mb('','');break;
    case 'C-n':
      if(B.cursor.l<B.lines.length-1){B.cursor.l++;B.cursor.c=Math.min(B.cursor.c,B.lines[B.cursor.l].length);}
      scrollTo();mb('','');break;
    case 'C-p':
      if(B.cursor.l>0){B.cursor.l--;B.cursor.c=Math.min(B.cursor.c,B.lines[B.cursor.l].length);}
      scrollTo();mb('','');break;
    case 'C-a':B.cursor.c=0;mb('success','beginning-of-line');break;
    case 'C-e':B.cursor.c=B.lines[B.cursor.l].length;mb('success','end-of-line');break;
    case 'M-f':fwdWord();scrollTo();mb('success','forward-word');break;
    case 'M-b':bwdWord();scrollTo();mb('success','backward-word');break;
    case 'M-<':
      B.mark={...B.cursor};B.cursor={l:0,c:0};B.scrollTop=0;
      mb('success','beginning-of-buffer (mark saved)');break;
    case 'M->':
      B.mark={...B.cursor};
      B.cursor={l:B.lines.length-1,c:B.lines[B.lines.length-1].length};
      scrollTo();mb('success','end-of-buffer (mark saved)');break;
    case 'C-v':
      B.scrollTop=Math.min(B.scrollTop+VL,Math.max(0,B.lines.length-VL));
      B.cursor.l=Math.min(B.cursor.l+VL,B.lines.length-1);
      B.cursor.c=Math.min(B.cursor.c,B.lines[B.cursor.l].length);
      mb('success','scroll-up');break;
    case 'M-v':
      B.scrollTop=Math.max(0,B.scrollTop-VL);
      B.cursor.l=Math.max(0,B.cursor.l-VL);
      B.cursor.c=Math.min(B.cursor.c,B.lines[B.cursor.l].length);
      mb('success','scroll-down');break;
    case 'C-l':{
      B.rcState=(B.rcState+1)%3;
      const pos=['centro','top','bottom'][B.rcState];
      if(B.rcState===0)B.scrollTop=Math.max(0,B.cursor.l-Math.floor(VL/2));
      else if(B.rcState===1)B.scrollTop=B.cursor.l;
      else B.scrollTop=Math.max(0,B.cursor.l-VL+1);
      mb('success',`recenter → ${pos}`);break;}

    // Editing
    case 'DEL':
    case 'Backspace':{
      const{l,c}=B.cursor;
      if(c>0){B.lines[l]=B.lines[l].slice(0,c-1)+B.lines[l].slice(c);B.cursor.c--;}
      else if(l>0){
        const prev=B.lines[l-1].length;
        B.lines[l-1]=B.lines[l-1]+B.lines[l];
        B.lines.splice(l,1);B.cursor.l--;B.cursor.c=prev;
      }
      mb('','');if(req)trackCmd('DEL');render();return;}
    case 'C-d':{
      const{l,c}=B.cursor;
      if(c<B.lines[l].length)B.lines[l]=B.lines[l].slice(0,c)+B.lines[l].slice(c+1);
      else if(l<B.lines.length-1){B.lines[l]=B.lines[l]+B.lines[l+1];B.lines.splice(l+1,1);}
      mb('success','delete-char');break;}
    case 'M-DEL':{
      const prev={...B.cursor};bwdWord();
      const t=B.lines[B.cursor.l].slice(B.cursor.c,prev.c);
      B.lines[B.cursor.l]=B.lines[B.cursor.l].slice(0,B.cursor.c)+B.lines[B.cursor.l].slice(prev.c);
      killToRing(t);mb('success',`backward-kill-word: "${t.slice(0,15)}"`);break;}
    case 'M-d':{
      const sc=B.cursor.c,sl=B.cursor.l,prev2={...B.cursor};
      fwdWord();
      const t=B.lines[sl].slice(sc,B.cursor.c);
      B.lines[sl]=B.lines[sl].slice(0,sc)+B.lines[sl].slice(B.cursor.c);
      B.cursor=prev2;killToRing(t);mb('success',`kill-word: "${t.slice(0,15)}"`);break;}
    case 'C-k':{
      const{l,c}=B.cursor,rest=B.lines[l].slice(c);
      if(rest.length){B.lines[l]=B.lines[l].slice(0,c);killToRing(rest);mb('success',`kill-line: "${rest.slice(0,20)}${rest.length>20?'…':''}"`);}
      else if(l<B.lines.length-1){B.lines.splice(l+1,1);killToRing('\n');mb('success','kill-line (newline)');}
      break;}
    case 'C-SPC':
      if(B.markOn&&B.mark&&B.mark.l===B.cursor.l&&B.mark.c===B.cursor.c){B.markOn=false;B.mark=null;mb('info','Mark deactivated');}
      else{B.mark={...B.cursor};B.markOn=true;mb('success','Mark set');}
      break;
    case 'C-w':
      if(!B.mark){mb('error','No mark set');break;}
      {const t=regionText();killToRing(t);deleteRegion();mb('success',`kill-region: ${t.length} chars`);}break;
    case 'M-w':
      if(!B.mark){mb('error','No mark set');break;}
      {const t=regionText();killToRing(t);B.markOn=false;mb('success',`copy-region: ${t.length} chars`);}break;
    case 'C-y':{
      if(!B.killRing.length){mb('error','Kill ring is empty');break;}
      const text=B.killRing[0],parts=text.split('\n');
      const{l,c}=B.cursor;
      if(parts.length===1){
        B.lines[l]=B.lines[l].slice(0,c)+text+B.lines[l].slice(c);B.cursor.c=c+text.length;
      } else {
        const after=B.lines[l].slice(c);
        B.lines[l]=B.lines[l].slice(0,c)+parts[0];
        for(let i=1;i<parts.length-1;i++)B.lines.splice(l+i,0,parts[i]);
        const ll=parts[parts.length-1];
        B.lines.splice(l+parts.length-1,0,ll+after);
        B.cursor={l:l+parts.length-1,c:ll.length};
      }
      scrollTo();B.krIdx=0;mb('success','yank');break;}
    case 'M-y':
      if(!B.killRing.length){mb('error','Kill ring is empty');break;}
      B.krIdx=(B.krIdx+1)%B.killRing.length;
      mb('info',`yank-pop: item ${B.krIdx+1}/${B.killRing.length}: "${B.killRing[B.krIdx].slice(0,20)}"`);break;
    case 'C-t':{
      const{l,c}=B.cursor,ln=B.lines[l];
      if(c>0&&c<=ln.length){
        const a=ln[c-1],b=ln[c]||'';
        B.lines[l]=ln.slice(0,c-1)+(b||a)+(b?a:'')+ln.slice(c+(b?1:0));
        if(b)B.cursor.c++;mb('success','transpose-chars');}break;}
    case 'M-u':{
      const sc=B.cursor.c,sl=B.cursor.l;
      fwdWord();
      const ec=B.cursor.c;
      B.lines[sl]=B.lines[sl].slice(0,sc)+B.lines[sl].slice(sc,ec).toUpperCase()+B.lines[sl].slice(ec);
      mb('success','upcase-word');break;}
    case 'M-l':{
      const sc2=B.cursor.c,sl2=B.cursor.l;
      fwdWord();const ec2=B.cursor.c;
      B.lines[sl2]=B.lines[sl2].slice(0,sc2)+B.lines[sl2].slice(sc2,ec2).toLowerCase()+B.lines[sl2].slice(ec2);
      mb('success','downcase-word');break;}
    case 'C-o':
      B.lines.splice(B.cursor.l+1,0,'');mb('success','open-line');break;
    case 'M-q':{
      let{l}=B.cursor,s=l,e=l;
      while(s>0&&B.lines[s-1].trim())s--;
      while(e<B.lines.length-1&&B.lines[e+1].trim())e++;
      const txt=B.lines.slice(s,e+1).join(' ').replace(/\s+/g,' ').trim();
      const words=txt.split(' ');let cur='',wrapped=[];
      for(const w of words){
        if((cur+' '+w).trim().length<=65)cur=(cur+' '+w).trim();
        else{if(cur)wrapped.push(cur);cur=w;}
      }
      if(cur)wrapped.push(cur);
      B.lines.splice(s,e-s+1,...wrapped);mb('success','fill-paragraph');break;}

    // Isearch
    case 'C-s':
      if(!B.isSrch){B.isSrch=true;B.srchDir='f';B.srchQ='';B.srchOrigin={...B.cursor};B.srchIdx=-1;B.srchMatches=[];mb('prompt','I-search: ');}
      else srchNext();
      break;
    case 'C-r':
      if(!B.isSrch){B.isSrch=true;B.srchDir='b';B.srchQ='';B.srchOrigin={...B.cursor};B.srchIdx=-1;B.srchMatches=[];mb('prompt','I-search backward: ');}
      else{B.srchDir='b';srchNext();}
      break;

    // M-x
    case 'M-x':B.isMx=true;B.mxQ='';mb('prompt','M-x ');break;

    // C-g
    case 'C-g':
      if(B.isMx){B.isMx=false;B.mxQ='';mb('error','Quit');}
      else if(B.isSrch){B.isSrch=false;B.srchQ='';B.srchMatches=[];if(B.srchOrigin)B.cursor={...B.srchOrigin};B.srchOrigin=null;mb('error','Quit');}
      else if(B.isQr){B.isQr=false;mb('error','Quit');}
      else if(B.isLink){B.isLink=false;mb('error','Quit');}
      else if(B.prefix){B.prefix=null;mb('error','Quit');}
      else if(B.markOn){B.markOn=false;mb('error','Mark deactivated');}
      else mb('error','Quit');
      break;

    // C-x sequences
    case 'C-x 2':renderWinDemo('h');mb('success','split-window-below');break;
    case 'C-x 3':renderWinDemo('v');mb('success','split-window-right');break;
    case 'C-x o':renderWinDemo('o');mb('success','other-window');break;
    case 'C-x 0':renderWinDemo('0');mb('success','delete-window');break;
    case 'C-x 1':renderWinDemo('1');mb('success','delete-other-windows');break;

    // M-%
    case 'M-%':B.isQr=true;B.qrPhase=0;B.qrQ='';B.qrSearch='';B.qrReplace='';mb('prompt','Query replace: ');break;

    // Org
    case 'TAB':{
      const ln=B.lines[B.cursor.l];
      if(ln.startsWith('*'))mb('success','org-cycle (collapsed/expanded)');
      else{const sp='  ';B.lines[B.cursor.l]=B.lines[B.cursor.l].slice(0,B.cursor.c)+sp+B.lines[B.cursor.l].slice(B.cursor.c);B.cursor.c+=sp.length;mb('success','indent');}
      break;}
    case 'S-TAB':mb('success','org-shifttab (global cycle)');break;
    case 'M-RET':{
      const ln=B.lines[B.cursor.l];
      const stars=(ln.match(/^\*+/)||['*'])[0];
      B.lines.splice(B.cursor.l+1,0,stars+' ');
      B.cursor={l:B.cursor.l+1,c:stars.length+1};
      scrollTo();mb('success','org-meta-return');break;}
    case 'M-ArrowUp':
      if(B.cursor.l>0){[B.lines[B.cursor.l],B.lines[B.cursor.l-1]]=[B.lines[B.cursor.l-1],B.lines[B.cursor.l]];B.cursor.l--;scrollTo();mb('success','org-move-subtree-up');}break;
    case 'M-ArrowDown':
      if(B.cursor.l<B.lines.length-1){[B.lines[B.cursor.l],B.lines[B.cursor.l+1]]=[B.lines[B.cursor.l+1],B.lines[B.cursor.l]];B.cursor.l++;scrollTo();mb('success','org-move-subtree-down');}break;
    case 'M-ArrowLeft':
      if(B.lines[B.cursor.l].startsWith('**')){B.lines[B.cursor.l]=B.lines[B.cursor.l].slice(1);mb('success','org-promote-heading');}break;
    case 'M-ArrowRight':
      if(B.lines[B.cursor.l].startsWith('*')){B.lines[B.cursor.l]='*'+B.lines[B.cursor.l];mb('success','org-demote-heading');}break;
    case 'C-c C-t':{
      const ln=B.lines[B.cursor.l];
      if(!ln.startsWith('*')){mb('error','Not on a heading');break;}
      if(ln.includes(' TODO '))B.lines[B.cursor.l]=ln.replace(' TODO ',' DONE ');
      else if(ln.includes(' DONE '))B.lines[B.cursor.l]=ln.replace(' DONE ',' ').replace(/\s+/,' ');
      else B.lines[B.cursor.l]=ln.replace(/^(\*+) /,'$1 TODO ');
      mb('success','org-todo cycled');break;}
    case 'C-c C-l':B.isLink=true;B.linkPhase=0;B.linkQ='';mb('prompt','Link: ');break;
    case 'C-c C-o':{
      const ln=B.lines[B.cursor.l];const m=ln.match(/\[\[([^\]]+)\]/);
      mb(m?'success':'error',m?`Abriendo: ${m[1]}`:'No link at point');break;}
    case 'C-c C-c':mb('success','org-ctrl-c-ctrl-c');break;
    case 'C-c .':{
      const now=new Date();const days=['dom','lun','mar','mié','jue','vie','sáb'];
      const ts=`<${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${days[now.getDay()]}>`;
      const{l,c}=B.cursor;B.lines[l]=B.lines[l].slice(0,c)+ts+B.lines[l].slice(c);B.cursor.c+=ts.length;
      mb('success',`Inserted active timestamp: ${ts}`);break;}
    case 'C-c !':{
      const now2=new Date();const days2=['dom','lun','mar','mié','jue','vie','sáb'];
      const ts2=`[${now2.getFullYear()}-${String(now2.getMonth()+1).padStart(2,'0')}-${String(now2.getDate()).padStart(2,'0')} ${days2[now2.getDay()]}]`;
      const{l,c}=B.cursor;B.lines[l]=B.lines[l].slice(0,c)+ts2+B.lines[l].slice(c);B.cursor.c+=ts2.length;
      mb('success',`Inserted inactive timestamp: ${ts2}`);break;}

    default:
      if(cmd&&(cmd.startsWith('C-')||cmd.startsWith('M-')))mb('error',`${cmd}: not bound in this lesson`);
      return;
  }
  if(req)trackCmd(cmd);
  render();
}

// ── Progress tracking ─────────────────────────────────────────
function trackCmd(cmd){
  B.cmdCnt[cmd]=(B.cmdCnt[cmd]||0)+1;
  const st=A.stats[A.lesson];if(st)st.correct=(st.correct||0)+1;
  updateProgress();checkCompletion();
}

function updateProgress(){
  const L=LESSONS[A.lang][A.lesson];
  if(L.auto||L.need===0){document.getElementById('pfill').style.width='100%';document.getElementById('plabel').textContent='✓ completado';return;}
  let cnt=0;for(const c of L.req)cnt+=B.cmdCnt[c]||0;
  const pct=Math.min(cnt/L.need,1)*100;
  document.getElementById('pfill').style.width=pct+'%';
  document.getElementById('plabel').textContent=`${Math.min(cnt,L.need)} / ${L.need} acciones`;
}

function checkCompletion(){
  const L=LESSONS[A.lang][A.lesson];if(L.auto)return;
  if(typeof L.validate==='function'){
    if(L.validate(B))completeSelf(A.lesson);
    return;
  }
  let cnt=0;for(const c of L.req)cnt+=B.cmdCnt[c]||0;
  if(cnt>=L.need)completeSelf(A.lesson);
}

function completeSelf(idx){
  if(A.done.has(idx))return;
  A.done.add(idx);save();renderSidebar();updateNext();
  const t=document.getElementById('toast');
  document.getElementById('toast-msg').textContent=`"${LESSONS[A.lang][idx].title}" completado 🎉`;
  t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000);
}

// ── Load lesson ───────────────────────────────────────────────
const FNAMES={org:'tesis.org',elisp:'config.el',journal:'journal.org',c:'cuali.c',bugs:'bugs.txt'};
const MODES={org:'Org',elisp:'Emacs-Lisp',journal:'Org',c:'C',bugs:'Fundamental'};

function loadLesson(idx){
  A.lesson=idx;
  if(!A.stats[idx])A.stats[idx]={attempts:0,correct:0,errors:0,startTime:Date.now()};
  const L=LESSONS[A.lang][idx];
  B.lines=[...BUFS[A.lang][L.buf]];
  B.cursor={l:0,c:0};B.mark=null;B.markOn=false;B.prefix=null;
  B.isSrch=false;B.srchQ='';B.srchMatches=[];B.isMx=false;B.mxQ='';
  B.isQr=false;B.isLink=false;B.rcState=0;B.scrollTop=0;B.cmdCnt={};
  B.startTime=Date.now();
  B.bugs=[];if(B.bugInterval){clearInterval(B.bugInterval);B.bugInterval=null;}
  const n=String(idx+1).padStart(2,'0');
  document.getElementById('l-num').textContent=`Lección ${n} — ${L.cat}`;
  document.getElementById('l-title').textContent=L.title;
  document.getElementById('l-theory').innerHTML=L.theory;
  document.getElementById('ex-before').textContent=L.ex.b;
  document.getElementById('ex-after').textContent=L.ex.a;
  document.getElementById('ex-toggle').classList.remove('open');
  document.getElementById('ex-content').classList.remove('show');
  document.getElementById('ml-file').textContent=FNAMES[L.buf];
  document.getElementById('ml-mode').textContent=`[${MODES[L.buf]}]`;
  if(L.auto)setTimeout(()=>completeSelf(idx),600);
  renderSidebar();updateNext();updateProgress();renderStats();
  mb('info','Buffer listo. Usa tu tecla Ctrl para empezar.');
  render();
  setTimeout(()=>document.getElementById('buf-area').focus(),80);
  if(L.hasBugs)startBugLevel();
}

// ── Bug Minigame ──────────────────────────────────────────────
function startBugLevel(){
  // Spawn initial bugs
  B.bugs=[];
  for(let i=0;i<5;i++){
    B.bugs.push({l:Math.floor(Math.random()*B.lines.length),c:Math.floor(Math.random()*20)});
  }
  B.bugInterval=setInterval(()=>{
    if(!B.bugs)return;
    const {l,c}=B.cursor;
    let hit=false;
    for(const bug of B.bugs){
      // Simple chase logic (50% chance to move towards player, 50% random)
      const lineLen=B.lines[bug.l]?B.lines[bug.l].length:0;
      if(Math.random()<0.5){
        if(bug.l<l)bug.l=Math.min(B.lines.length-1,bug.l+1);
        else if(bug.l>l)bug.l=Math.max(0,bug.l-1);
        else if(bug.c<c)bug.c=Math.min(lineLen,bug.c+1);
        else if(bug.c>c)bug.c=Math.max(0,bug.c-1);
      } else {
        const dir=Math.floor(Math.random()*4);
        if(dir===0)bug.l=Math.max(0,bug.l-1);
        if(dir===1)bug.l=Math.min(B.lines.length-1,bug.l+1);
        if(dir===2)bug.c=Math.max(0,bug.c-1);
        if(dir===3)bug.c=Math.min(lineLen,bug.c+1);
      }
      // Ensure bounds
      if(bug.l>=B.lines.length)bug.l=B.lines.length-1;
      const blen=B.lines[bug.l]?B.lines[bug.l].length:0;
      if(bug.c>blen)bug.c=blen;
      
      // Hit detection
      if(bug.l===B.cursor.l&&bug.c===B.cursor.c)hit=true;
    }
    render();
    if(hit){
      clearInterval(B.bugInterval);
      mb('error','¡Un bug te alcanzó! Reiniciando nivel...');
      setTimeout(()=>loadLesson(A.lesson),1000);
    }
  },400);
}

// ── Sidebar ───────────────────────────────────────────────────
function renderSidebar(){
  const sb=document.getElementById('sidebar');
  let out='',lastCat='';
  LESSONS[A.lang].forEach((L,i)=>{
    if(L.cat!==lastCat){if(lastCat)out+='<div style="height:6px"></div>';out+=`<div class="sb-cat">${L.cat}</div>`;lastCat=L.cat;}
    const active=i===A.lesson,done=A.done.has(i);
    const locked=i>0&&!A.done.has(i-1)&&!A.done.has(i)&&i!==A.lesson;
    const cls=['sb-item',active?'active':'',done?'done':'',locked?'locked':''].filter(Boolean).join(' ');
    const chk=locked?'🔒':(done?'✓':String(i+1).padStart(2,'0'));
    const badges=L.keys?L.keys.slice(0,3).map(k=>`<span class="badge" style="font-size:0.65rem;padding:0 4px">${k}</span>`).join(''):'';
    out+=`<div class="${cls}" data-i="${i}" role="button" tabindex="${locked?-1:0}"><div class="sb-i">${chk}</div><div class="sb-t" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${L.title}</div><div class="sb-ks">${badges}</div></div>`;
  });
  sb.innerHTML=out;
  sb.querySelectorAll('.sb-item:not(.locked)').forEach(el=>{
    el.addEventListener('click',()=>{
      loadLesson(+el.dataset.i);
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('sb-overlay').classList.remove('show');
    });
  });
}

// ── Next button ───────────────────────────────────────────────
function updateNext(){
  const btn=document.getElementById('next-btn');
  const ni=A.lesson+1;
  if(ni>=LESSONS[A.lang].length){btn.innerHTML='¡Completado! 🎉';btn.onclick=null;return;}
  document.getElementById('next-name').textContent=LESSONS[A.lang][ni].title;
  btn.onclick=()=>loadLesson(ni);
}

// ── Stats panel ───────────────────────────────────────────────
function renderStats(){
  const pnl=document.getElementById('stats-pnl');
  const st=A.stats[A.lesson];if(!st){pnl.innerHTML='';return;}
  const L=LESSONS[A.lang][A.lesson];
  const elapsed=Math.round((Date.now()-(st.startTime||Date.now()))/1000);
  let rows='';
  for(const c of L.req)rows+=`<div class="strow"><span class="stlbl">${c}</span><span class="stval">${B.cmdCnt[c]||0} usos</span></div>`;
  pnl.innerHTML=`<div class="strow"><span class="stlbl">Intentos</span><span class="stval">${st.correct||0}</span></div>
<div class="strow"><span class="stlbl">Errores</span><span class="stval" style="color:var(--red)">${st.errors||0}</span></div>
<div class="strow"><span class="stlbl">Tiempo</span><span class="stval">${elapsed}s</span></div>${rows}`;
}

// ── Window demo ───────────────────────────────────────────────
let wdState='single',wdActive=0;
function renderWinDemo(act){
  // Append/update demo just below example block for lesson 15
  let demo=document.getElementById('win-demo');
  if(!demo){
    demo=document.createElement('div');
    demo.id='win-demo';
    demo.style.cssText='border:1px solid var(--border);border-radius:6px;overflow:hidden;margin-bottom:16px;height:100px;max-width:65ch';
    document.getElementById('ex-block').after(demo);
  }
  if(act==='h'){wdState='h';wdActive=0;}
  else if(act==='v'){wdState='v';wdActive=0;}
  else if(act==='o'){wdActive=1-wdActive;}
  else{wdState='single';wdActive=0;}
  if(wdState==='single'||act==='0'||act==='1'){
    demo.innerHTML=`<div style="height:100%;background:var(--bg-panel);padding:8px;font-size:11px;color:var(--fg-dim);border:1px solid var(--purple)">▶ tesis.org [única ventana]</div>`;
  } else if(wdState==='h'){
    const a=wdActive===0,b=wdActive===1;
    demo.innerHTML=`<div style="display:flex;flex-direction:column;height:100%;gap:1px">
<div style="flex:1;background:${a?'var(--bg-panel)':'var(--bg)'};padding:6px;font-size:11px;color:${a?'var(--fg-dim)':'var(--fg-muted)'};border:1px solid ${a?'var(--purple)':'var(--border)'}">${a?'▶':' '} tesis.org</div>
<div style="flex:1;background:${b?'var(--bg-panel)':'var(--bg)'};padding:6px;font-size:11px;color:${b?'var(--fg-dim)':'var(--fg-muted)'};border:1px solid ${b?'var(--purple)':'var(--border)'}">${b?'▶':' '} tesis.org</div></div>`;
  } else {
    const a=wdActive===0,b=wdActive===1;
    demo.innerHTML=`<div style="display:flex;height:100%;gap:1px">
<div style="flex:1;background:${a?'var(--bg-panel)':'var(--bg)'};padding:6px;font-size:11px;color:${a?'var(--fg-dim)':'var(--fg-muted)'};border:1px solid ${a?'var(--purple)':'var(--border)'}">${a?'▶':' '} tesis.org</div>
<div style="flex:1;background:${b?'var(--bg-panel)':'var(--bg)'};padding:6px;font-size:11px;color:${b?'var(--fg-dim)':'var(--fg-muted)'};border:1px solid ${b?'var(--purple)':'var(--border)'}">${b?'▶':' '} tesis.org</div></div>`;
  }
}

// ── Tetris easter egg ─────────────────────────────────────────
let tetrisOn=false,tetInt=null,tetCdInt=null,tetCd=10;
let tetGrid=[],tetPiece=null,tetPos={x:3,y:0},tetColor=0;
const TCOLORS=['#b48eff','#6ae4b9','#79a8ff','#ff5f59','#d0bc00','#44bc44','#c678dd'];
const TPIECES=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,0],[1,1,1]],[[0,1,1],[1,1,0]],[[1,1,0],[0,1,1]],[[1,0],[1,0],[1,1]],[[0,1],[0,1],[1,1]]];

function startTetris(){
  tetrisOn=true;tetGrid=Array.from({length:20},()=>Array(10).fill(0));
  tetCd=10;tetSpawn();
  document.getElementById('tetris-ov').classList.add('show');
  tetInt=setInterval(()=>{tetDrop();tetRender();},250);
  tetCdInt=setInterval(()=>{tetCd--;document.getElementById('t-cd').textContent=tetCd;if(tetCd<=0)stopTetris();},1000);
  mb('success','M-x tetris — cerrará en 10s, Esc para salir');
}

function stopTetris(){
  tetrisOn=false;clearInterval(tetInt);clearInterval(tetCdInt);
  document.getElementById('tetris-ov').classList.remove('show');
  mb('info','Tetris: ¡juego terminado!');
}

function tetSpawn(){
  const pi=Math.floor(Math.random()*TPIECES.length);
  tetPiece=TPIECES[pi];tetColor=Math.floor(Math.random()*TCOLORS.length);
  tetPos={x:Math.floor((10-tetPiece[0].length)/2),y:0};
}

function tetCollides(){
  for(let r=0;r<tetPiece.length;r++) for(let c=0;c<tetPiece[r].length;c++)
    if(tetPiece[r][c]){const ny=tetPos.y+r,nx=tetPos.x+c;if(ny>=20||nx<0||nx>=10||tetGrid[ny][nx])return true;}
  return false;
}

function tetDrop(){
  tetPos.y++;
  if(tetCollides()){
    tetPos.y--;
    for(let r=0;r<tetPiece.length;r++) for(let c=0;c<tetPiece[r].length;c++)
      if(tetPiece[r][c]&&tetPos.y+r>=0)tetGrid[tetPos.y+r][tetPos.x+c]=tetColor+1;
    for(let r=19;r>=0;r--){if(tetGrid[r].every(c=>c)){tetGrid.splice(r,1);tetGrid.unshift(Array(10).fill(0));}}
    tetSpawn();
  }
}

function tetRender(){
  const d=tetGrid.map(row=>[...row]);
  for(let r=0;r<tetPiece.length;r++) for(let c=0;c<tetPiece[r].length;c++)
    if(tetPiece[r][c]&&tetPos.y+r>=0&&tetPos.y+r<20)d[tetPos.y+r][tetPos.x+c]=tetColor+1;
  const gr=document.getElementById('t-grid');
  let s='<span style="color:var(--border)">┌────────────────────┐\n</span>';
  for(const row of d){
    s+='<span style="color:var(--border)">│</span>';
    for(const cell of row)s+=cell?`<span style="color:${TCOLORS[cell-1]}">██</span>`:'  ';
    s+='<span style="color:var(--border)">│\n</span>';
  }
  s+='<span style="color:var(--border)">└────────────────────┘</span>';
  gr.innerHTML=s;
}

// ── Key handler ───────────────────────────────────────────────
let ctrlPending=false;

function handleKey(e){
  if(modalOpen)return;
  if(tetrisOn){if(e.key==='Escape')stopTetris();return;}
  const tgt=e.target;
  if(tgt.tagName==='INPUT'||tgt.tagName==='TEXTAREA')return;

  const isCtrl=(e.key===A.ctrlKey||e.code===A.ctrlKey)&&!e.altKey;
  const isMeta=e.altKey&&!e.ctrlKey;

  // ── Isearch mode ──
  if(B.isSrch){
    if(isCtrl){e.preventDefault();ctrlPending=true;return;}
    if(ctrlPending){
      ctrlPending=false;e.preventDefault();
      const k=e.key.toLowerCase();
      if(k==='g')exec('C-g');else if(k==='s')exec('C-s');else if(k==='r')exec('C-r');
      return;
    }
    if(e.key==='Enter'){e.preventDefault();B.isSrch=false;B.srchMatches=[];mb('success',`Found: "${B.srchQ}"`);render();return;}
    if(e.key==='Backspace'){e.preventDefault();B.srchQ=B.srchQ.slice(0,-1);srchUpdate();return;}
    if(e.key==='Escape'){e.preventDefault();exec('C-g');return;}
    if(e.key.length===1&&!isMeta){e.preventDefault();B.srchQ+=e.key;srchUpdate();return;}
    return;
  }

  // ── M-x mode ──
  if(B.isMx){
    if(e.key==='Enter'){
      e.preventDefault();const q=B.mxQ.trim().toLowerCase();B.isMx=false;B.mxQ='';
      if(q==='tetris')startTetris();
      else if(q==='fill-paragraph')exec('M-q');
      else if(q==='beginning-of-buffer')exec('M-<');
      else if(q==='end-of-buffer')exec('M->');
      else if(q==='undo')mb('info','undo: buffer reset (not implemented in demo)');
      else mb('error',`No command: ${q}`);
      return;
    }
    if(e.key==='Backspace'){e.preventDefault();B.mxQ=B.mxQ.slice(0,-1);mb('prompt',`M-x ${B.mxQ}`);return;}
    if(e.key==='Escape'||(isCtrl&&e.key.toLowerCase()==='g')){e.preventDefault();ctrlPending=false;exec('C-g');return;}
    if(isCtrl){e.preventDefault();ctrlPending=false;exec('C-g');return;}
    if(e.key.length===1&&!isMeta&&!isCtrl){e.preventDefault();B.mxQ+=e.key;mb('prompt',`M-x ${B.mxQ}█`);return;}
    return;
  }

  // ── Query-replace mode ──
  if(B.isQr){
    if(e.key==='Escape'||isCtrl){e.preventDefault();ctrlPending=false;exec('C-g');return;}
    if(e.key==='Enter'){
      e.preventDefault();
      if(B.qrPhase===0){B.qrSearch=B.qrQ;B.qrQ='';B.qrPhase=1;mb('prompt',`Query replace "${B.qrSearch}" with: `);}
      else{
        B.qrReplace=B.qrQ;B.qrQ='';B.qrMatches=findAll(B.qrSearch);B.qrIdx=0;
        if(!B.qrMatches.length){B.isQr=false;mb('error',`No matches for "${B.qrSearch}"`);}
        else{const m=B.qrMatches[0];B.cursor={l:m.l,c:m.c};scrollTo();render();mb('prompt',`Replace "${B.qrSearch}" → "${B.qrReplace}"? (y/n/!/q)`);}
      }return;
    }
    if(B.qrPhase===1&&!B.qrQ&&B.qrMatches.length){
      e.preventDefault();
      if(e.key==='y'){
        const m=B.qrMatches[B.qrIdx];
        B.lines[m.l]=B.lines[m.l].slice(0,m.c)+B.qrReplace+B.lines[m.l].slice(m.c+m.len);
        B.qrIdx++;
        if(B.qrIdx>=B.qrMatches.length){B.isQr=false;mb('success',`Replaced ${B.qrIdx} occurrence(s)`);}
        else{const nm=B.qrMatches[B.qrIdx];B.cursor={l:nm.l,c:nm.c};scrollTo();mb('prompt',`Replace? (y/n/!/q) ${B.qrIdx+1}/${B.qrMatches.length}`);}
        render();
      } else if(e.key==='n'){
        B.qrIdx++;
        if(B.qrIdx>=B.qrMatches.length){B.isQr=false;mb('info','No more matches');}
        else{const nm=B.qrMatches[B.qrIdx];B.cursor={l:nm.l,c:nm.c};scrollTo();mb('prompt',`Replace? ${B.qrIdx+1}/${B.qrMatches.length}`);render();}
      } else if(e.key==='!'){
        let cnt=0;
        for(let i=B.qrIdx;i<B.qrMatches.length;i++){
          B.lines[B.qrMatches[i].l]=B.lines[B.qrMatches[i].l].replace(new RegExp(reEsc(B.qrSearch),'g'),B.qrReplace);cnt++;
        }
        B.isQr=false;mb('success',`Replaced ${cnt} occurrence(s)`);render();
      } else if(e.key==='q'){B.isQr=false;mb('error','Quit');}
      return;
    }
    if(e.key.length===1&&!isCtrl&&!isMeta){e.preventDefault();B.qrQ+=e.key;mb('prompt',B.qrPhase===0?`Query replace: ${B.qrQ}`:`Replace "${B.qrSearch}" with: ${B.qrQ}`);return;}
    if(e.key==='Backspace'){e.preventDefault();B.qrQ=B.qrQ.slice(0,-1);return;}
    return;
  }

  // ── Org link mode ──
  if(B.isLink){
    if(e.key==='Escape'||isCtrl){e.preventDefault();ctrlPending=false;exec('C-g');return;}
    if(e.key==='Enter'){
      e.preventDefault();
      if(B.linkPhase===0){B.linkPhase=1;const tmp=B.linkQ;B.linkQ='';mb('prompt',`Description (for [[${tmp}][…]]): `);B.linkQ=tmp+'|';}
      else{
        const parts=B.linkQ.split('|');const link=`[[${parts[0]}][${parts[1]||parts[0]}]]`;
        const{l,c}=B.cursor;B.lines[l]=B.lines[l].slice(0,c)+link+B.lines[l].slice(c);B.cursor.c+=link.length;
        B.isLink=false;mb('success','Link inserted');render();
      }return;
    }
    if(e.key==='Backspace'){e.preventDefault();B.linkQ=B.linkQ.slice(0,-1);return;}
    if(e.key.length===1&&!isCtrl&&!isMeta){e.preventDefault();B.linkQ+=e.key;mb('prompt',B.linkPhase===0?`Link: ${B.linkQ}`:`Description: ${B.linkQ.split('|')[1]||''}`);return;}
    return;
  }

  // ── Normal mode ──

  // Chosen ctrl key → ctrlPending
  if(isCtrl){
    e.preventDefault();ctrlPending=true;
    if(!B.prefix)mb('prompt',`${A.ctrlLabel}-`);
    return;
  }

  // Complete pending prefix
  if(B.prefix){
    e.preventDefault();
    let second;
    if(ctrlPending){ctrlPending=false;second='C-'+e.key.toLowerCase();}
    else if(isMeta)second='M-'+e.key;
    else second=e.key;
    const p=B.prefix;B.prefix=null;
    const twoKey={
      'C-x 2':'C-x 2','C-x 3':'C-x 3','C-x o':'C-x o','C-x 0':'C-x 0','C-x 1':'C-x 1',
      'C-c C-t':'C-c C-t','C-c t':'C-c C-t',
      'C-c C-l':'C-c C-l','C-c l':'C-c C-l',
      'C-c C-o':'C-c C-o','C-c o':'C-c C-o',
      'C-c C-c':'C-c C-c','C-c c':'C-c C-c',
      'C-c .':'C-c .','C-c !':'C-c !',
    };
    const full=p+' '+second;
    const cmd=twoKey[full];
    if(cmd)exec(cmd);
    else mb('error',`${full}: undefined`);
    return;
  }

  // Execute with ctrlPending
  if(ctrlPending){
    e.preventDefault();ctrlPending=false;
    let cmd;
    if(e.key===' ')cmd='C-SPC';
    else if(e.key==='Backspace')cmd='DEL';
    else if(e.key==='Delete')cmd='C-d';
    else cmd='C-'+e.key.toLowerCase();
    if(cmd==='C-x'||cmd==='C-c'){B.prefix=cmd;mb('prompt',`${cmd} -`);}
    else exec(cmd);
    return;
  }

  // Meta combos
  if(isMeta){
    e.preventDefault();
    let cmd;
    if(e.key==='Backspace')cmd='M-DEL';
    else if(e.key==='ArrowUp')cmd='M-ArrowUp';
    else if(e.key==='ArrowDown')cmd='M-ArrowDown';
    else if(e.key==='ArrowLeft')cmd='M-ArrowLeft';
    else if(e.key==='ArrowRight')cmd='M-ArrowRight';
    else if(e.key==='Enter')cmd='M-RET';
    else cmd='M-'+e.key;
    exec(cmd);
    return;
  }

  // Tab / Backspace
  if(e.key==='Tab'){e.preventDefault();exec(e.shiftKey?'S-TAB':'TAB');return;}
  if(e.key==='Backspace'){e.preventDefault();exec('DEL');return;}
}

// ── Persistence ───────────────────────────────────────────────
function save(){
  try{localStorage.setItem('emacs-hero',JSON.stringify({ctrlKey:A.ctrlKey,ctrlLabel:A.ctrlLabel,lesson:A.lesson,done:[...A.done]}));}catch(e){}
}

function load(){
  try{
    const s=JSON.parse(localStorage.getItem('emacs-hero')||'null');
    if(s){
      A.ctrlKey=s.ctrlKey||'Escape';A.ctrlLabel=s.ctrlLabel||'Esc';
      A.lesson=s.lesson||0;A.done=new Set(s.done||[]);
      A.lang=s.lang||'en';
      return true;
    }
  }catch(e){}
  return false;
}

function save(){
  localStorage.setItem('emacs-hero',JSON.stringify({...A,done:[...A.done]}));
}

// ── i18n ──────────────────────────────────────────────────────
function setLang(lang){
  A.lang=lang;
  save();
  document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
  
  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if(dict[key]) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if(dict[key]) el.placeholder = dict[key];
  });
  
  document.title = dict.title;
  if(A.lesson !== null && document.getElementById('l-title').textContent !== '') {
    loadLesson(A.lesson); // Re-render current lesson text
  }
}

// ── Onboarding ────────────────────────────────────────────────
function initModal(){
  const overlay=document.getElementById('modal-overlay');
  const ci=document.getElementById('custom-input');
  let selKey='Escape',selLabel='Esc';
  const opts=document.querySelectorAll('.kopt');
  opts.forEach(btn=>{
    btn.addEventListener('click',()=>{
      opts.forEach(b=>b.classList.remove('sel'));btn.classList.add('sel');
      if(btn.dataset.key==='custom'){
        ci.style.display='block';ci.focus();
        ci.onkeydown=e=>{e.preventDefault();selKey=e.code;selLabel=e.key===' '?'Space':e.key;ci.value=selLabel;updatePrev(selLabel);};
      } else {
        ci.style.display='none';selKey=btn.dataset.key;selLabel=btn.dataset.label;updatePrev(selLabel);
      }
    });
  });
  document.getElementById('modal-start').addEventListener('click',()=>{
    A.ctrlKey=selKey;A.ctrlLabel=selLabel;
    document.getElementById('ctrl-badge').textContent=`${selLabel}=Ctrl`;
    overlay.style.display='none';modalOpen=false;save();loadLesson(A.lesson);
  });
  document.getElementById('ctrl-badge').addEventListener('click',()=>{overlay.style.display='flex';modalOpen=true;});
}

function updatePrev(lbl){
  document.getElementById('kprev').innerHTML=`
<div><span class="kk">${lbl} + f</span>  →  <span class="kr">C-f  (forward-char)</span></div>
<div><span class="kk">Alt + f</span>  →  <span class="kr">M-f  (forward-word)</span></div>
<div><span class="kk">${lbl} + SPC</span>  →  <span class="kr">C-SPC  (set-mark)</span></div>`;
}

// ── Tabs ──────────────────────────────────────────────────────
function switchTab(t){
  A.tab=t;
  document.querySelectorAll('.btab').forEach(b=>b.classList.toggle('active',b.dataset.tab===t));
  const ba=document.getElementById('buf-area');
  const sp=document.getElementById('stats-pnl');
  const cp=document.getElementById('cheatsheet-pnl');
  ba.style.display='none'; sp.classList.remove('active'); cp.classList.remove('active');
  
  if(t==='practice'){
    ba.style.display='';
    ba.focus();
  } else if(t==='stats'){
    sp.classList.add('active');
    renderStats();
  } else if(t==='cheatsheet'){
    cp.classList.add('active');
    renderCheatsheet();
  }
}

// ── Modal flag ──────────────────────────────────────────────
let modalOpen=true;

// ── Init ──────────────────────────────────────────────────────
function init(){
  const hasSaved=load();
  const overlay=document.getElementById('modal-overlay');
  const landing=document.getElementById('landing');
  
  setLang(A.lang);

  if(hasSaved){
    document.getElementById('btn-learn').textContent = I18N[A.lang].btn_continue;
  }
  
  // Show landing by default
  landing.style.display='flex';
  
  document.getElementById('btn-learn').addEventListener('click',()=>{
    landing.style.display='none';
    if(hasSaved){
      document.getElementById('ctrl-badge').textContent=`${A.ctrlLabel}=Ctrl`;
      loadLesson(A.lesson);
      overlay.style.display='none';
      modalOpen=false;
    } else {
      overlay.style.display='flex';
      modalOpen=true;
    }
  });

  const whyModal = document.getElementById('why-modal');
  document.getElementById('btn-why').addEventListener('click',()=>{
    whyModal.style.display='flex';
  });
  document.getElementById('why-close').addEventListener('click',()=>{
    whyModal.style.display='none';
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => setLang(e.target.dataset.lang));
  });

  initModal();
  // Example toggle
  document.getElementById('ex-toggle').addEventListener('click',()=>{
    document.getElementById('ex-toggle').classList.toggle('open');
    document.getElementById('ex-content').classList.toggle('show');
  });
  // Tabs
  document.querySelectorAll('.btab').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.tab)));
  // Key events
  document.addEventListener('keydown',handleKey);
  // Buffer focus on click
  document.getElementById('buf-wrap').addEventListener('click',()=>document.getElementById('buf-area').focus());
  // Mobile
  document.getElementById('hamburger').addEventListener('click',()=>{
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sb-overlay').classList.toggle('show');
  });
  document.getElementById('sb-overlay').addEventListener('click',()=>{
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sb-overlay').classList.remove('show');
  });
}

let csRendered=false;
function renderCheatsheet(){
  const dict = I18N[A.lang];
  const cp=document.getElementById('cheatsheet-pnl');
  cp.innerHTML=`
    <div style="margin-bottom:20px;font-size:12px;color:var(--fg-dim);line-height:1.6">
      ${dict.cs_intro}
    </div>

    <!-- GENERAL -->
    <h3 style="color:var(--blue);font-size:13px;margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border);padding-bottom:4px">${dict.cs_gen}</h3>
    <div class="cs-grid">
      <div class="cs-card">
        <div class="cs-header"><div class="cs-dot" style="background:var(--blue)"></div><span class="cs-title" style="color:var(--blue)">${dict.cs_gen_1}</span></div>
        <div class="cs-body">
          <div class="cs-row"><div class="cs-keys"><kbd class="blue">C-f</kbd> / <kbd class="blue">C-b</kbd></div><div class="cs-desc">${dict.desc.char_fwd_bwd}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="blue">C-n</kbd> / <kbd class="blue">C-p</kbd></div><div class="cs-desc">${dict.desc.line_nxt_prv}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="blue">M-f</kbd> / <kbd class="blue">M-b</kbd></div><div class="cs-desc">${dict.desc.word_fwd_bwd}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="blue">C-a</kbd> / <kbd class="blue">C-e</kbd></div><div class="cs-desc">${dict.desc.line_beg_end}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="blue">M-&lt;</kbd> / <kbd class="blue">M-&gt;</kbd></div><div class="cs-desc">${dict.desc.buf_beg_end}</div></div>
        </div>
      </div>
      <div class="cs-card">
        <div class="cs-header"><div class="cs-dot" style="background:var(--yellow)"></div><span class="cs-title" style="color:var(--yellow)">${dict.cs_gen_2}</span></div>
        <div class="cs-body">
          <div class="cs-row"><div class="cs-keys"><kbd class="yellow">C-SPC</kbd></div><div class="cs-desc">${dict.desc.mark_act}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="yellow">M-w</kbd> / <kbd class="yellow">C-w</kbd></div><div class="cs-desc">${dict.desc.copy_cut}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="yellow">C-y</kbd></div><div class="cs-desc">${dict.desc.yank}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="yellow">M-y</kbd></div><div class="cs-desc">${dict.desc.yank_pop}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="magenta">C-/</kbd></div><div class="cs-desc">${dict.desc.undo}</div></div>
        </div>
      </div>
    </div>

    <!-- PROSA / ESSAY -->
    <h3 style="color:var(--cyan);font-size:13px;margin-top:24px;margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border);padding-bottom:4px">${dict.cs_prose}</h3>
    <div class="cs-grid">
      <div class="cs-card">
        <div class="cs-header"><div class="cs-dot" style="background:var(--red)"></div><span class="cs-title" style="color:var(--red)">${dict.cs_prose_1}</span></div>
        <div class="cs-body">
          <div class="cs-row"><div class="cs-keys"><kbd class="red">C-d</kbd></div><div class="cs-desc">${dict.desc.del_char_fwd}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="red">M-DEL</kbd> / <kbd class="red">M-d</kbd></div><div class="cs-desc">${dict.desc.del_word_bwd_fwd}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="red">C-k</kbd></div><div class="cs-desc">${dict.desc.kill_line}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="red">M-k</kbd></div><div class="cs-desc">${dict.desc.kill_sentence}</div></div>
        </div>
      </div>
      <div class="cs-card">
        <div class="cs-header"><div class="cs-dot" style="background:var(--cyan)"></div><span class="cs-title" style="color:var(--cyan)">${dict.cs_prose_2}</span></div>
        <div class="cs-body">
          <div class="cs-row"><div class="cs-keys"><kbd class="cyan">M-q</kbd></div><div class="cs-desc">${dict.desc.fill_para}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="cyan">C-t</kbd> / <kbd class="cyan">M-t</kbd></div><div class="cs-desc">${dict.desc.trans_char_word}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="cyan">M-u</kbd> / <kbd class="cyan">M-l</kbd></div><div class="cs-desc">${dict.desc.upcase_downcase}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="cyan">M-c</kbd></div><div class="cs-desc">${dict.desc.capitalize}</div></div>
        </div>
      </div>
    </div>

    <!-- ORG-MODE / POETRY -->
    <h3 style="color:var(--purple);font-size:13px;margin-top:24px;margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border);padding-bottom:4px">${dict.cs_org}</h3>
    <div class="cs-grid">
      <div class="cs-card">
        <div class="cs-header"><div class="cs-dot" style="background:var(--purple)"></div><span class="cs-title" style="color:var(--purple)">${dict.cs_org_1}</span></div>
        <div class="cs-body">
          <div class="cs-row"><div class="cs-keys"><kbd class="purple">TAB</kbd></div><div class="cs-desc">${dict.desc.org_cycle}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="purple">M-RET</kbd></div><div class="cs-desc">${dict.desc.org_new_heading}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="purple">C-c C-t</kbd></div><div class="cs-desc">${dict.desc.org_todo}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="purple">C-c .</kbd></div><div class="cs-desc">${dict.desc.org_timestamp}</div></div>
        </div>
      </div>
      <div class="cs-card">
        <div class="cs-header"><div class="cs-dot" style="background:var(--green)"></div><span class="cs-title" style="color:var(--green)">${dict.cs_org_2}</span></div>
        <div class="cs-body">
          <div class="cs-row"><div class="cs-keys"><kbd class="green">C-o</kbd></div><div class="cs-desc">${dict.desc.poetry_open_line}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="green">C-a TAB</kbd></div><div class="cs-desc">${dict.desc.poetry_indent}</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="green">M-↑</kbd> / <kbd class="green">M-↓</kbd></div><div class="cs-desc">${dict.desc.poetry_move}</div></div>
        </div>
      </div>
    </div>

    <!-- CODING -->
          <div class="cs-row"><div class="cs-keys"><kbd class="orange">M-%</kbd></div><div class="cs-desc">Query replace (reemplazar confirmando)</div></div>
        </div>
      </div>
      <div class="cs-card">
        <div class="cs-header"><div class="cs-dot" style="background:var(--fg-dim)"></div><span class="cs-title" style="color:var(--fg-dim)">Sistema y Ventanas</span></div>
        <div class="cs-body">
          <div class="cs-row"><div class="cs-keys"><kbd class="blue">C-x 2</kbd> / <kbd class="blue">C-x 3</kbd></div><div class="cs-desc">Dividir ventana H / V</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="blue">C-x o</kbd></div><div class="cs-desc">Saltar a otra ventana</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="blue">M-x</kbd></div><div class="cs-desc">Ejecutar comando por nombre</div></div>
          <div class="cs-row"><div class="cs-keys"><kbd class="red">C-g</kbd></div><div class="cs-desc">Cancelar comando actual</div></div>
        </div>
      </div>
    </div>
  `;
  csRendered=true;
}

document.addEventListener('DOMContentLoaded',init);
