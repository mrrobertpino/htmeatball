let inspectOn = false;
let inspectRanges = new Map();
const extraHelp = {
  text: ['Text', 'Plain text displays words without adding a tag. Put it inside a paragraph or container.', 'Hello, world!'],
  raw: ['Custom code', 'This block preserves code that does not have a dedicated block. Edit its source directly.', ''],
  rule: ['CSS selector', 'A selector chooses which HTML elements to style. Use p for paragraphs, .card for a class, or #title for an ID.', '.card {\n  color: purple;\n}'],
  'font-style': ['Font style', 'Makes letters italic or returns them to normal.', 'font-style: italic;'],
  'text-decoration': ['Text decoration', 'Adds an underline or a line through text, or removes decoration with none.', 'text-decoration: underline;'],
  gap: ['Gap', 'Sets space between items in a flex or grid layout.', 'gap: 12px;'],
  height: ['Height', 'Sets how tall an element is.', 'height: 100px;']
};
function createBlockHelpButton(key, language) {
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'block-help'; button.textContent = '?';
  button.title = 'What does this block do?';
  button.setAttribute('aria-label', 'Explain ' + key);
  button.onkeydown = e => e.stopPropagation();
  button.onclick = e => { e.stopPropagation(); showBlockHelp(key, language); };
  return button;
}
function showBlockHelp(key, language) {
  let item = BLOCK_HELP[language].find(x => x.key === key);
  if (!item && /^h[1-6]$/.test(key)) item = BLOCK_HELP.html[0];
  const fallback = extraHelp[key] || extraHelp.raw;
  item ||= {label: fallback[0], desc: fallback[1], insert: fallback[2]};
  let dialog = document.querySelector('#block-explanation');
  if (!dialog) {
    dialog = document.createElement('dialog'); dialog.id = 'block-explanation';
    dialog.setAttribute('aria-labelledby', 'block-help-title');
    dialog.innerHTML = '<button type="button" aria-label="Close explanation">×</button><h2 id="block-help-title"></h2><p></p><h3>Code</h3><pre></pre><h3>What it makes</h3><iframe title="Block example" sandbox=""></iframe>';
    dialog.querySelector('button').onclick = () => dialog.close();
    document.body.append(dialog);
  }
  dialog.querySelector('h2').textContent = item.label;
  dialog.querySelector('p').textContent = item.desc;
  dialog.querySelector('pre').textContent = item.insert;
  const demo = item.demo || (language === 'css' && key !== 'rule' && key !== 'raw'
    ? '<div style="display:grid;'+item.insert+'">Example text<span>Another item</span></div>'
    : '<p>Use this block to build your page.</p>');
  dialog.querySelector('iframe').srcdoc = '<base href="'+new URL('.',location.href).href+'"><style>body{font:16px system-ui;padding:12px;color:#26344a;background:white}</style>'+demo;
  dialog.showModal();
}

document.querySelector('#format-code').onclick = async () => {
  const button = document.querySelector('#format-code');
  const language = tab, original = state[language];
  button.disabled = true;
  try {
    const formatted = await prettier.format(original, {
      parser: {html:'html',css:'css',js:'babel'}[language],
      plugins: Object.values(prettierPlugins), tabWidth: 2,
      htmlWhitespaceSensitivity: 'strict'
    });
    if (state[language] !== original) { notify('Code changed while formatting. Please try again.'); return; }
    commit(); state[language] = formatted; commit();
    if (tab === language) { mode = 'text'; setView(); }
    preview(); notify('Formatting cleaned up. Undo restores the previous version.');
  } catch (error) {
    notify('Could not format: '+String(error.message).split('\n')[0]);
  } finally { button.disabled = false; }
};

function previewInspector() {
  let on = false;
  const nodes = new Map();
  document.querySelectorAll('[data-htm-inspect]').forEach(el => {
    nodes.set(el, el.getAttribute('data-htm-inspect'));
    el.removeAttribute('data-htm-inspect');
  });
  const outline = document.createElement('div');
  outline.style.cssText = 'position:fixed;pointer-events:none;border:3px solid #ffc652;z-index:2147483647;display:none;box-sizing:border-box';
  document.body.append(outline);
  let selected = null;
  function paint() {
    if (!on || !selected || !selected.isConnected) { outline.style.display='none'; return; }
    const r=selected.getBoundingClientRect();
    Object.assign(outline.style,{display:'block',left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});
  }
  addEventListener('message',e=>{
    if(e.source!==parent || e.data?.type!=='htm-inspect-mode')return;
    on=!!e.data.on; paint();
  });
  addEventListener('scroll',paint,true); addEventListener('resize',paint);
  document.addEventListener('click',e=>{
    if(!on)return;
    e.preventDefault();e.stopImmediatePropagation();
    let el=e.target;while(el && !nodes.has(el))el=el.parentElement;
    if(!el)return;selected=el;paint();
    parent.postMessage({type:'htm-select',id:nodes.get(el)},'*');
  },true);
}
function buildPreviewSource() {
  inspectRanges = new Map();
  let index = 0;
  // Consume comments and raw-text elements whole so their contents are not mistaken for tags.
  const tokens = /<!--[\s\S]*?-->|<(script|style|textarea|title)\b(?:"[^"]*"|'[^']*'|[^'">])*?>[\s\S]*?<\/\1\s*>|<[a-zA-Z][\w:-]*(?:"[^"]*"|'[^']*'|[^'">])*?>/gi;
  const marked = state.html.replace(tokens,(token,raw,offset)=>{
    if(token.startsWith('<!--'))return token;
    const opening = token.match(/^<[\w:-]+(?:"[^"]*"|'[^']*'|[^'">])*?>/)[0];
    const id=String(index++);
    inspectRanges.set(id,{start:offset,end:offset+opening.length,text:opening});
    return token.replace(/^<([\w:-]+)/, '<$1 data-htm-inspect="'+id+'"');
  });
  const source=pageSource();
  const bodyStart=source.indexOf('<body>')+6;
  const instrumented=source.slice(0,bodyStart)+marked+source.slice(bodyStart+state.html.length);
  const end=instrumented.lastIndexOf('</body>');
  return instrumented.slice(0,end)+'<script>('+previewInspector.toString()+')();<\/script>'+instrumented.slice(end);
}
function sendInspectMode() {
  document.querySelector('#preview').contentWindow.postMessage({type:'htm-inspect-mode',on:inspectOn},'*');
}
document.querySelector('#preview').addEventListener('load',sendInspectMode);
document.querySelector('#inspect').onclick=()=>{
  inspectOn=!inspectOn;
  const button=document.querySelector('#inspect');
  button.setAttribute('aria-pressed',String(inspectOn));
  button.textContent=inspectOn?'Stop inspect':'Inspect';
  sendInspectMode();
  notify(inspectOn?'Click something in the preview to find its HTML tag.':'Inspect off.');
};
window.addEventListener('message',e=>{
  if(e.source!==document.querySelector('#preview').contentWindow || !inspectOn || e.data?.type!=='htm-select')return;
  const hit=inspectRanges.get(e.data.id);if(!hit)return;
  if(state.html.slice(hit.start,hit.end)!==hit.text)return;
  document.querySelector('[data-tab="html"]').click();
  document.querySelector('#text-mode').click();
  const source=document.querySelector('#source');source.focus();source.setSelectionRange(hit.start,hit.end);
  source.scrollTop=Math.max(0,(state.html.slice(0,hit.start).split('\n').length-1)*parseFloat(getComputedStyle(source).lineHeight)-source.clientHeight/2);
  document.querySelector('#note').textContent='Selected '+hit.text+' — use its tag, class, or ID as a CSS selector.';
});
