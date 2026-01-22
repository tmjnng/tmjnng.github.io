// Unicode编码转换工具

// Unicode转义序列转字符串
function unicodeToString(str) {
  return str.replace(/\\u([0-9a-fA-F]{4})/g, function(match, hex) {
    return String.fromCharCode(parseInt(hex, 16));
  });
}

// 字符串转Unicode转义序列
function stringToUnicode(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code <= 0xFFFF) {
      result += '\\u' + ('0000' + code.toString(16).toUpperCase()).slice(-4);
    } else {
      const surrogate1 = 0xD800 + Math.floor((code - 0x10000) / 0x400);
      const surrogate2 = 0xDC00 + ((code - 0x10000) % 0x400);
      result += '\\u' + ('0000' + surrogate1.toString(16).toUpperCase()).slice(-4);
      result += '\\u' + ('0000' + surrogate2.toString(16).toUpperCase()).slice(-4);
    }
  }
  return result;
}

// Unicode转HTML实体
function unicodeToHtmlEntity(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code <= 0xFFFF) {
      result += '&#' + code + ';';
    } else {
      const surrogate1 = 0xD800 + Math.floor((code - 0x10000) / 0x400);
      const surrogate2 = 0xDC00 + ((code - 0x10000) % 0x400);
      result += '&#' + surrogate1 + ';&#' + surrogate2 + ';';
    }
  }
  return result;
}

// HTML实体转Unicode
function htmlEntityToUnicode(str) {
  return str.replace(/&#([0-9]+);/g, function(match, num) {
    return String.fromCharCode(parseInt(num, 10));
  });
}

// Unicode转十六进制
function unicodeToHex(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    result += code.toString(16).toUpperCase().padStart(4, '0') + ' ';
  }
  return result.trim();
}

// 十六进制转Unicode
function hexToUnicode(str) {
  const hex = str.replace(/\s+/g, '');
  let result = '';
  for (let i = 0; i < hex.length; i += 4) {
    const code = parseInt(hex.substr(i, 4), 16);
    result += String.fromCharCode(code);
  }
  return result;
}

// UTF-8编码转十六进制
function utf8ToHex(str) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let result = '';
  for (let i = 0; i < bytes.length; i++) {
    result += bytes[i].toString(16).toUpperCase().padStart(2, '0') + ' ';
  }
  return result.trim();
}

// 十六进制转UTF-8
function hexToUtf8(str) {
  const hex = str.replace(/\s+/g, '');
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  const decoder = new TextDecoder();
  return decoder.decode(new Uint8Array(bytes));
}

// URL编码（Unicode感知）
function unicodeUrlEncode(str) {
  return encodeURIComponent(str);
}

// URL解码（Unicode感知）
function unicodeUrlDecode(str) {
  return decodeURIComponent(str);
}

// 主转换函数
function unicodeConvert() {
  const input = document.getElementById('unicode-input').value;
  const mode = document.getElementById('unicode-mode').value;
  const result = document.getElementById('unicode-result');
  
  if (!input.trim()) {
    result.textContent = '';
    return;
  }
  
  try {
    switch (mode) {
      case 'unicode-escape':
        result.textContent = stringToUnicode(input);
        break;
      case 'unescape':
        result.textContent = unicodeToString(input);
        break;
      case 'html-entity':
        result.textContent = unicodeToHtmlEntity(input);
        break;
      case 'html-entity-decode':
        result.textContent = htmlEntityToUnicode(input);
        break;
      case 'unicode-hex':
        result.textContent = unicodeToHex(input);
        break;
      case 'unicode-hex-decode':
        result.textContent = hexToUnicode(input);
        break;
      case 'utf8-hex':
        result.textContent = utf8ToHex(input);
        break;
      case 'utf8-hex-decode':
        result.textContent = hexToUtf8(input);
        break;
      case 'url-encode':
        result.textContent = unicodeUrlEncode(input);
        break;
      case 'url-decode':
        result.textContent = unicodeUrlDecode(input);
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
