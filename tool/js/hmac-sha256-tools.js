// HMAC-SHA256加密工具
async function hmacSha256Encrypt() {
  const input = document.getElementById('hmac-sha256-input').value;
  const key = document.getElementById('hmac-sha256-key').value;
  const result = document.getElementById('hmac-sha256-result');
  
  try {
    if (!input) throw new Error('请输入要加密的文本');
    if (!key) throw new Error('请输入密钥');
    
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const data = encoder.encode(input);
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
    const hashArray = Array.from(new Uint8Array(signature));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    result.textContent = hashHex;
    result.style.color = '#333';
  } catch (e) {
    result.textContent = '加密失败: ' + e.message;
    result.style.color = '#f2777a';
  }
}

async function hmacSha256Verify() {
  const input = document.getElementById('hmac-sha256-input').value;
  const key = document.getElementById('hmac-sha256-key').value;
  const hashToVerify = document.getElementById('hmac-sha256-verify-hash').value;
  const result = document.getElementById('hmac-sha256-result');
  
  try {
    if (!input) throw new Error('请输入要验证的文本');
    if (!key) throw new Error('请输入密钥');
    if (!hashToVerify) throw new Error('请输入要验证的哈希值');
    
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const data = encoder.encode(input);
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
    const hashArray = Array.from(new Uint8Array(signature));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    if (hashHex.toLowerCase() === hashToVerify.toLowerCase()) {
      result.textContent = '验证通过: ' + hashHex;
      result.style.color = '#5cb85c';
    } else {
      result.textContent = '验证失败: 期望值 ' + hashToVerify + '\n实际值 ' + hashHex;
      result.style.color = '#f2777a';
    }
  } catch (e) {
    result.textContent = '验证失败: ' + e.message;
    result.style.color = '#f2777a';
  }
}
