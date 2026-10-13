// Tokenize before escaping so syntax colors never interpret user code as markup.
function highlightCSS(code) {
  let result='',position=0,paren=0,declaration=false,expectValue=false;
  const stack=[];
  const token= /\/\*[\s\S]*?(?:\*\/|$)|"(?:\\[\s\S]|[^"\\])*(?:"|$)|'(?:\\[\s\S]|[^'\\])*(?:'|$)|[{}:;()]|[^{}:;()"'\/]+|\/[\s\S]?/g;
  function span(text,color){return '<span class="ink-'+color+'">'+esc(text)+'</span>';}
  for(const match of code.matchAll(token)){
    const text=match[0];result+=esc(code.slice(position,match.index));position=match.index+text.length;
    if(text.startsWith('/*')){result+=span(text,'comment');continue;}
    if(text[0]==='"'||text[0]==="'"){result+=span(text,'value');continue;}
    if(text==='('){paren++;result+=esc(text);continue;}
    if(text===')'){paren=Math.max(0,paren-1);result+=esc(text);continue;}
    if(paren){result+=span(text,'value');continue;}
    if(text==='{'){
      const before=code.slice(0,match.index),header=before.slice(Math.max(before.lastIndexOf('{'),before.lastIndexOf('}'),before.lastIndexOf(';'))+1).trim();
      stack.push({declaration,expectValue});
      declaration=!/^@(media|supports|container|layer|keyframes|document|scope|starting-style)\b/i.test(header);expectValue=false;result+=esc(text);continue;
    }
    if(text==='}'){const parent=stack.pop();declaration=parent?.declaration||false;expectValue=false;result+=esc(text);continue;}
    if(text===';'){expectValue=false;result+=esc(text);continue;}
    if(text===':'){
      if(declaration)expectValue=true;
      result+=esc(text);continue;
    }
    if(!text.trim()){result+=esc(text);continue;}
    const rest=code.slice(position).trimStart();
    // A nested selector's colon is distinct from a property followed by a value.
    const property=declaration&&!expectValue&&/^(?:--[\w-]+|[a-z-]+)$/i.test(text.trim())&&rest.startsWith(':')&&rest.indexOf('{')!==0;
    if(property)result+=span(text,cssProps[text.trim().toLowerCase()]?.[1]||'gray');
    else if(expectValue)result+=span(text,'value');
    else result+=span(text,'purple');
  }
  return result+esc(code.slice(position));
}
