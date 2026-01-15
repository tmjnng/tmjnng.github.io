// Base64编码解码工具
function base64Encode() {
  const input = document.getElementById('base64-input').value;
  const result = document.getElementById('base64-result');
  
  try {
    const encoded = btoa(unescape(encodeURIComponent(input)));
    result.textContent = encoded;
    result.style.color = '#333';
  } catch (e) {
    result.textContent = i18n[currentLang].base64Error + e.message;
    result.style.color = '#f2777a';
  }
}

function base64Decode() {
  const input = document.getElementById('base64-input').value;
  const result = document.getElementById('base64-result');
  
  try {
    const decoded = decodeURIComponent(escape(atob(input)));
    result.textContent = decoded;
    result.style.color = '#333';
  } catch (e) {
    result.textContent = i18n[currentLang].base64Error + e.message;
    result.style.color = '#f2777a';
  }
}