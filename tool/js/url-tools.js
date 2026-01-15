// URL编码解码工具
function urlEncode() {
  const input = document.getElementById('url-input').value;
  const result = document.getElementById('url-result');
  
  try {
    const encoded = encodeURIComponent(input);
    result.textContent = encoded;
    result.style.color = '#333';
  } catch (e) {
    result.textContent = i18n[currentLang].urlError + e.message;
    result.style.color = '#f2777a';
  }
}

function urlDecode() {
  const input = document.getElementById('url-input').value;
  const result = document.getElementById('url-result');
  
  try {
    const decoded = decodeURIComponent(input);
    result.textContent = decoded;
    result.style.color = '#333';
  } catch (e) {
    result.textContent = i18n[currentLang].urlError + e.message;
    result.style.color = '#f2777a';
  }
}