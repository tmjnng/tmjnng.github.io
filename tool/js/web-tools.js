// HTML/CSS/JS 在线工具

// HTML 格式化
function formatHtml(html) {
  let result = '';
  let indent = 0;
  const tab = '  ';
  
  html = html.replace(/>\s+</g, '><');
  
  for (let i = 0; i < html.length; i++) {
    const char = html[i];
    
    if (char === '<' && html[i + 1] === '/') {
      indent--;
      result += '\n' + tab.repeat(Math.max(0, indent));
    } else if (char === '<' && html[i + 1] !== '!') {
      if (result.length > 0 && result[result.length - 1] !== '\n') {
        result += '\n' + tab.repeat(indent);
      }
      indent++;
    } else if (char === '<' && html[i + 1] === '!') {
      result += char;
      continue;
    }
    
    result += char;
    
    if (char === '>' && html[i - 1] !== '/' && html[i - 1] !== '!') {
      const tagName = html.substring(i + 1).match(/^([a-zA-Z0-9-]+)/);
      if (tagName && ['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'wbr'].includes(tagName[1].toLowerCase())) {
        indent--;
      }
    }
  }
  
  return result.trim();
}

// HTML 压缩
function minifyHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/\s*=\s*/g, '=')
    .replace(/\s*>/g, '>')
    .replace(/<\s*/g, '<')
    .trim();
}

// CSS 格式化
function formatCss(css) {
  let result = '';
  let indent = 0;
  const tab = '  ';
  
  css = css.replace(/\s+/g, ' ');
  css = css.replace(/{\s*/g, '{\n' + tab.repeat(indent + 1));
  css = css.replace(/;(?!\s*})/g, ';\n' + tab.repeat(indent + 1));
  css = css.replace(/}\s*/g, '\n' + tab.repeat(indent) + '}\n');
  
  css = css.split('\n').filter(line => line.trim()).map(line => {
    if (line.includes('{') && !line.includes('}')) {
      return tab.repeat(indent++) + line.trim();
    } else if (line.includes('}')) {
      indent = Math.max(0, indent - 1);
      return tab.repeat(indent) + line.trim();
    } else if (line.trim()) {
      return tab.repeat(indent) + line.trim();
    }
    return line;
  }).join('\n');
  
  return css.trim();
}

// CSS 压缩
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/{\s*/g, '{')
    .replace(/;\s*/g, ';')
    .replace(/\s*}\s*/g, '}')
    .replace(/:\s*/g, ':')
    .replace(/,\s*/g, ',')
    .replace(/;\}/g, '}')
    .trim();
}

// JavaScript 格式化
function formatJs(js) {
  let result = '';
  let indent = 0;
  const tab = '  ';
  let inString = false;
  let stringChar = '';
  let prevChar = '';
  
  for (let i = 0; i < js.length; i++) {
    const char = js[i];
    const nextChar = js[i + 1] || '';
    
    if (inString) {
      result += char;
      if (char === '\\' && i < js.length - 1) {
        result += js[++i];
      } else if (char === stringChar) {
        inString = false;
      }
      continue;
    }
    
    if (char === '"' || char === "'" || char === '`') {
      result += char;
      inString = true;
      stringChar = char;
      continue;
    }
    
    if (char === '/' && nextChar === '/') {
      const endIndex = js.indexOf('\n', i);
      result += js.substring(i, endIndex === -1 ? js.length : endIndex);
      i = endIndex === -1 ? js.length - 1 : endIndex - 1;
      continue;
    }
    
    if (char === '/' && nextChar === '*') {
      const endIndex = js.indexOf('*/', i);
      result += js.substring(i, endIndex === -1 ? js.length : endIndex + 2);
      i = endIndex === -1 ? js.length - 1 : endIndex + 1;
      continue;
    }
    
    if (['{', '[', '('].includes(char)) {
      if (prevChar && ![' ', '\n', ';', '{'].includes(prevChar)) {
        result += ' ';
      }
      result += char + '\n' + tab.repeat(++indent);
      i++;
      while (js[i] === ' ' || js[i] === '\n') i++;
      i--;
    } else if (['}', ']', ')'].includes(char)) {
      indent = Math.max(0, indent - 1);
      if (result[result.length - 1] === '\n') {
        result += tab.repeat(indent);
      }
      result += char;
      if (nextChar && ![';', ',', '}', ')', ']', ' ', '\n'].includes(nextChar)) {
        result += ' ';
      }
    } else if (char === ';') {
      result += char + '\n' + tab.repeat(indent);
    } else if (char === ',') {
      result += char + ' ';
    } else {
      result += char;
    }
    
    prevChar = char;
  }
  
  return result.trim();
}

// JavaScript 压缩
function minifyJs(js) {
  let result = '';
  let inString = false;
  let stringChar = '';
  
  for (let i = 0; i < js.length; i++) {
    const char = js[i];
    const nextChar = js[i + 1] || '';
    
    if (inString) {
      result += char;
      if (char === '\\' && i < js.length - 1) {
        result += js[++i];
      } else if (char === stringChar) {
        inString = false;
      }
      continue;
    }
    
    if (char === '"' || char === "'" || char === '`') {
      result += char;
      inString = true;
      stringChar = char;
      continue;
    }
    
    if (char === '/' && nextChar === '/') {
      const endIndex = js.indexOf('\n', i);
      i = endIndex === -1 ? js.length - 1 : endIndex - 1;
      continue;
    }
    
    if (char === '/' && nextChar === '*') {
      const endIndex = js.indexOf('*/', i);
      i = endIndex === -1 ? js.length - 1 : endIndex + 1;
      continue;
    }
    
    if (!/\s/.test(char)) {
      result += char;
    }
  }
  
  result = result
    .replace(/;\}/g, '}')
    .replace(/}\s*else/g, '}else')
    .replace(/else\s*{/g, 'else{')
    .replace(/;\s*/g, ';')
    .replace(/\s*,\s*/g, ',')
    .replace(/\s*:\s*/g, ':');
  
  return result;
}

// JavaScript 简单混淆
function obfuscateJs(js) {
  const minified = minifyJs(js);
  
  const varMap = new Map();
  let varCounter = 0;
  
  function getVarName() {
    const name = '_0x' + varCounter.toString(16);
    varCounter++;
    return name;
  }
  
  let result = minified.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, (match) => {
    if (['function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'var', 'let', 'const', 'new', 'this', 'true', 'false', 'null', 'undefined', 'typeof', 'instanceof'].includes(match)) {
      return match;
    }
    
    if (!varMap.has(match)) {
      varMap.set(match, getVarName());
    }
    
    return varMap.get(match);
  });
  
  return result;
}

// 主函数
function webTool() {
  const input = document.getElementById('web-input').value;
  const mode = document.getElementById('web-mode').value;
  const action = document.getElementById('web-action').value;
  const result = document.getElementById('web-result');
  
  if (!input.trim()) {
    result.textContent = '';
    return;
  }
  
  try {
    switch (mode) {
      case 'html':
        result.textContent = action === 'format' ? formatHtml(input) : minifyHtml(input);
        break;
      case 'css':
        result.textContent = action === 'format' ? formatCss(input) : minifyCss(input);
        break;
      case 'js':
        if (action === 'format') {
          result.textContent = formatJs(input);
        } else if (action === 'minify') {
          result.textContent = minifyJs(input);
        } else if (action === 'obfuscate') {
          result.textContent = obfuscateJs(input);
        }
        break;
      default:
        result.textContent = input;
    }
    result.style.color = '#333';
  } catch (e) {
    result.textContent = i18n[currentLang].conversionFailed + e.message;
    result.style.color = '#f2777a';
  }
}
