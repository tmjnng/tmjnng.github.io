// 随机数生成工具

function generateRandomString() {
  const lengthInput = document.getElementById('random-length');
  const includeUppercase = document.getElementById('random-uppercase').checked;
  const includeLowercase = document.getElementById('random-lowercase').checked;
  const includeNumbers = document.getElementById('random-numbers').checked;
  const includeSymbols = document.getElementById('random-symbols').checked;
  const result = document.getElementById('random-result');
  
  const length = parseInt(lengthInput.value) || 16;
  
  let charset = '';
  if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (includeNumbers) charset += '0123456789';
  if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  if (charset === '') {
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  }
  
  let resultStr = '';
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < length; i++) {
    resultStr += charset[randomValues[i] % charset.length];
  }
  
  result.textContent = resultStr;
  result.style.color = '#333';
}

function copyRandomResult() {
  copyResult('random-result');
}
