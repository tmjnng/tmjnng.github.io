// BCrypt加密工具
function bcryptEncrypt() {
  const input = document.getElementById('bcrypt-input').value;
  const saltRounds = parseInt(document.getElementById('bcrypt-rounds').value) || 10;
  const result = document.getElementById('bcrypt-result');
  
  try {
    if (!input) throw new Error('请输入要加密的密码');
    
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(input, salt);
    
    result.textContent = hash;
    result.style.color = '#333';
  } catch (e) {
    result.textContent = '加密失败: ' + e.message;
    result.style.color = '#f2777a';
  }
}

function bcryptVerify() {
  const input = document.getElementById('bcrypt-input').value;
  const hashToVerify = document.getElementById('bcrypt-verify-hash').value;
  const result = document.getElementById('bcrypt-result');
  
  try {
    if (!input) throw new Error('请输入要验证的密码');
    if (!hashToVerify) throw new Error('请输入要验证的哈希值');
    
    const isValid = bcrypt.compareSync(input, hashToVerify);
    
    if (isValid) {
      result.textContent = '密码验证通过';
      result.style.color = '#5cb85c';
    } else {
      result.textContent = '密码验证失败';
      result.style.color = '#f2777a';
    }
  } catch (e) {
    result.textContent = '验证失败: ' + e.message;
    result.style.color = '#f2777a';
  }
}
