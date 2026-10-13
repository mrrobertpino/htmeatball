// Textball's text features, integrated with HTMeatbalL's state and undo history.
const editorSource=document.querySelector('#source');
const originalPageSource=pageSource;
pageSource=function(){
  if(!/<(?:html|head|body)\b/i.test(state.html))return originalPageSource();
  const doc=new DOMParser().parseFromString(state.html,'text/html');
  if(state.cssOn){const style=doc.createElement('style');style.textContent=state.css;doc.head.append(style);}
  if(state.jsOn){const script=doc.createElement('script');script.textContent=state.js;doc.body.append(script);}
  return '<!DOCTYPE html>\n'+doc.documentElement.outerHTML;
};
const originalBuildPreview=buildPreviewSource;
buildPreviewSource=function(){
  if(!/<(?:html|head|body)\b/i.test(state.html))return originalBuildPreview();
  inspectRanges=new Map();let i=0;
  const marked=state.html.replace(/<!--[\s\S]*?-->|<(script|style|textarea|title)\b[^>]*>[\s\S]*?<\/\1\s*>|<[a-zA-Z][\w:-]*(?:"[^"]*"|'[^']*'|[^'">])*?>/gi,(token,raw,offset)=>{
    if(token.startsWith('<!--'))return token;
    const opening=token.match(/^<[\w:-]+(?:"[^"]*"|'[^']*'|[^'">])*?>/)[0],id=String(i++);
    inspectRanges.set(id,{start:offset,end:offset+opening.length,text:opening});
    return token.replace(/^<([\w:-]+)/,'<$1 data-htm-inspect="'+id+'"');
  });
  const saved=state.html;let result;try{state.html=marked;result=pageSource();}finally{state.html=saved;}
  return result.replace('</body>','<script>('+previewInspector.toString()+')();<\/script></body>');
};
const originalParse=parse;
parse=function(html){return /<(?:html|head|body)\b/i.test(html)?[{id:++serial,tag:'raw',raw:html,children:[]}]:originalParse(html);};
editorSource.wrap='off';
const textWrap=document.createElement('div');textWrap.id='text-wrap';
editorSource.before(textWrap);textWrap.append(editorSource);
const colors=document.createElement('pre');colors.id='code-colors';colors.setAttribute('aria-hidden','true');textWrap.prepend(colors);
function paintCode(){
  textWrap.style.display=editorSource.style.display==='none'?'none':'flex';
  let code=esc(editorSource.value);
  if(tab==='css')code=highlightCSS(editorSource.value);
  if(tab==='html')code=editorSource.value.replace(/<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<\/?([a-zA-Z][\w:-]*)(?:"[^"]*"|'[^']*'|[^'">])*?>|[^<]+|</gi,(token,raw,tag)=>tag?'<span class="ink-'+(defs[/^h[1-6]$/.test(tag)?'h1':tag]?.[1]||'purple')+'">'+esc(token)+'</span>':esc(token));
  colors.innerHTML=code+'\n';colors.scrollTop=editorSource.scrollTop;colors.scrollLeft=editorSource.scrollLeft;
}
const originalSetView=setView;setView=function(){originalSetView();paintCode();};
editorSource.addEventListener('input',paintCode);editorSource.addEventListener('scroll',paintCode);
function insertTextBlock(payload,pos){
  let start=pos??editorSource.selectionStart,end=pos??editorSource.selectionEnd;
  if(tab==='html'){
    if(start!==end&&!safeHTMLSelection(editorSource.value,start,end)){
      notify('Select complete tags or text between tags to wrap a selection.');return;
    }
    const safeStart=safeHTMLPosition(editorSource.value,start);
    if(start===end)end=safeStart;
    start=safeStart;
  }
  let snippet;
  if(tab==='css')snippet=payload.kind==='rule'?'body {\n  color: purple;\n}':payload.prop+': '+cssProps[payload.prop][2]+';';
  else if(payload.tag){
    const selected=editorSource.value.slice(start,end);
    snippet=emphasis.includes(payload.tag)&&selected?'<'+payload.tag+'>'+selected+'</'+payload.tag+'>':serialize([make(payload.tag)]);
  } else return;
  commit();editorSource.setRangeText(snippet,start,end,'end');
  state[tab]=editorSource.value;commit();paintCode();preview();editorSource.focus();
}
editorSource.addEventListener('dragover',e=>{if(e.dataTransfer.types.includes('application/x-playset')){e.preventDefault();editorSource.classList.add('drag-target');}});
editorSource.addEventListener('dragleave',()=>editorSource.classList.remove('drag-target'));
editorSource.addEventListener('drop',e=>{
  let payload;try{payload=JSON.parse(e.dataTransfer.getData('application/x-playset'));}catch{return;}
  if((tab==='html'&&!payload.tag)||(tab==='css'&&payload.lang!=='css')||tab==='js')return;
  e.preventDefault();editorSource.classList.remove('drag-target');
  const style=getComputedStyle(editorSource),rect=editorSource.getBoundingClientRect(),canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');ctx.font=style.font;
  const lines=editorSource.value.split('\n'),line=Math.max(0,Math.min(lines.length-1,Math.floor((e.clientY-rect.top-parseFloat(style.paddingTop)+editorSource.scrollTop)/parseFloat(style.lineHeight))));
  const col=Math.max(0,Math.min(lines[line].length,Math.round((e.clientX-rect.left-parseFloat(style.paddingLeft)+editorSource.scrollLeft)/ctx.measureText('M').width)));
  insertTextBlock(payload,lines.slice(0,line).reduce((n,s)=>n+s.length+1,0)+col);
});
const css=document.createElement('style');css.textContent=`
#text-wrap{position:relative;flex:1;min-height:0;background:#202638;overflow:hidden}#text-wrap .source,#code-colors{position:absolute;inset:0;margin:0;border:0;padding:22px;font:14px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace;tab-size:2;white-space:pre;overflow:auto;width:100%;height:100%;letter-spacing:normal}#text-wrap .source{color:transparent;caret-color:white;background:transparent;z-index:1;-webkit-text-fill-color:transparent}#code-colors{color:#e3eafa;pointer-events:none}#text-wrap .source::selection{background:#7464ba88}.ink-blue{color:#8bbcff}.ink-purple{color:#c4a0ff}.ink-green{color:#73dfb4}.ink-orange{color:#ffc178}.ink-pink{color:#ff91c1}.ink-teal{color:#72e4ee}.ink-amber{color:#ffe179}.ink-gray{color:#b9c7db}.drag-target{outline:3px dashed #ffc178;outline-offset:-4px}
`;
document.head.append(css);
const cssInk=document.createElement('style');cssInk.textContent='.ink-value{color:#b4e0aa}.ink-comment{color:#98a6bf;font-style:italic}';document.head.append(cssInk);
paintCode();

