// XML格式化工具
function formatXml() {
  const input = document.getElementById('xml-input').value;
  const result = document.getElementById('xml-result');
  try {
    const xmlDoc = new DOMParser().parseFromString(input, 'text/xml');
    if (xmlDoc.getElementsByTagName('parsererror').length) {
      throw new Error(i18n[currentLang].xmlError);
    }
    const serializer = new XMLSerializer();
    let formatted = serializer.serializeToString(xmlDoc);
    formatted = formatted.replace(/></g, '>\n<');
    
    // 添加缩进
    let indent = 0;
    const lines = formatted.split('\n');
    const formattedLines = [];
    
    for (let line of lines) {
      line = line.trim();
      if (line === '') continue;
      
      if (line.startsWith('</')) {
        indent--;
      }
      
      formattedLines.push('  '.repeat(indent) + line);
      
      if (line.startsWith('<') && !line.startsWith('</') && !line.endsWith('/>')) {
        indent++;
      }
    }
    
    result.textContent = formattedLines.join('\n');
    result.style.color = '#333';
  } catch (e) {
    result.textContent = i18n[currentLang].xmlError + ': ' + e.message;
    result.style.color = '#f2777a';
  }
}

function minifyXml() {
  const input = document.getElementById('xml-input').value;
  const result = document.getElementById('xml-result');
  try {
    const xmlDoc = new DOMParser().parseFromString(input, 'text/xml');
    if (xmlDoc.getElementsByTagName('parsererror').length) {
      throw new Error(i18n[currentLang].xmlError);
    }
    const serializer = new XMLSerializer();
    const minified = serializer.serializeToString(xmlDoc).replace(/\s+/g, ' ').trim();
    result.textContent = minified;
    result.style.color = '#333';
  } catch (e) {
    result.textContent = i18n[currentLang].xmlError + ': ' + e.message;
    result.style.color = '#f2777a';
  }
}