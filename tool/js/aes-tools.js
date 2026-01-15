// AES加密解密工具
function aesEncrypt() {
  const input = document.getElementById('aes-input').value;
  const key = document.getElementById('aes-key').value;
  const mode = document.getElementById('aes-mode').value;
  const result = document.getElementById('aes-result');
  
  try {
    // 这里可以添加实际的AES加密实现
    // 目前只是一个占位符
    result.textContent = `AES Encrypted (${mode}): ${input}`;
    result.style.color = '#333';
  } catch (e) {
    result.textContent = i18n[currentLang].cryptoError + e.message;
    result.style.color = '#f2777a';
  }
}

function aesDecrypt() {
  const input = document.getElementById('aes-input').value;
  const key = document.getElementById('aes-key').value;
  const mode = document.getElementById('aes-mode').value;
  const result = document.getElementById('aes-result');
  
  try {
    // 这里可以添加实际的AES解密实现
    // 目前只是一个占位符
    result.textContent = `AES Decrypted (${mode}): ${input}`;
    result.style.color = '#333';
  } catch (e) {
    result.textContent = i18n[currentLang].cryptoError + e.message;
    result.style.color = '#f2777a';
  }
}