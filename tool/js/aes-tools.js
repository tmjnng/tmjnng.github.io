// AES加密解密工具
function toggleIVInput() {
  const mode = document.getElementById('aes-mode').value;
  const ivContainer = document.getElementById('iv-container');
  
  if (mode === 'ecb') {
    ivContainer.style.display = 'none';
    ivContainer.style.visibility = 'hidden';
    ivContainer.style.height = '0';
    ivContainer.style.margin = '0';
    ivContainer.style.padding = '0';
  } else {
    ivContainer.style.display = 'block';
    ivContainer.style.visibility = 'visible';
    ivContainer.style.height = 'auto';
    ivContainer.style.margin = '0';
    ivContainer.style.padding = '0';
  }
}

// 填充方式实现
function pkcs5Pad(data, blockSize = 8) {
  // PKCS#5 固定使用8字节块大小
  const paddingLength = 8 - (data.length % 8);
  const padded = new Uint8Array(data.length + paddingLength);
  padded.set(data);
  for (let i = data.length; i < padded.length; i++) {
    padded[i] = paddingLength;
  }
  return padded;
}

function pkcs5Unpad(data) {
  const paddingLength = data[data.length - 1];
  if (paddingLength > data.length || paddingLength > 8) {
    throw new Error('Invalid PKCS#5 padding');
  }
  return data.slice(0, data.length - paddingLength);
}

function pkcs7Pad(data, blockSize = 16) {
  // PKCS#7 支持任意块大小（1-255字节）
  const paddingLength = blockSize - (data.length % blockSize);
  const padded = new Uint8Array(data.length + paddingLength);
  padded.set(data);
  for (let i = data.length; i < padded.length; i++) {
    padded[i] = paddingLength;
  }
  return padded;
}

function pkcs7Unpad(data) {
  const paddingLength = data[data.length - 1];
  if (paddingLength > data.length || paddingLength > 255) {
    throw new Error('Invalid PKCS#7 padding');
  }
  return data.slice(0, data.length - paddingLength);
}

function zerosPad(data, blockSize = 16) {
  const paddingLength = blockSize - (data.length % blockSize);
  const padded = new Uint8Array(data.length + paddingLength);
  padded.set(data);
  return padded;
}

function zerosUnpad(data) {
  let i = data.length - 1;
  while (i >= 0 && data[i] === 0) i--;
  return data.slice(0, i + 1);
}

function iso10126Pad(data, blockSize = 16) {
  const paddingLength = blockSize - (data.length % blockSize);
  const padded = new Uint8Array(data.length + paddingLength);
  padded.set(data);
  for (let i = data.length; i < padded.length - 1; i++) {
    padded[i] = Math.floor(Math.random() * 256);
  }
  padded[padded.length - 1] = paddingLength;
  return padded;
}

function iso10126Unpad(data) {
  const paddingLength = data[data.length - 1];
  if (paddingLength > data.length) {
    throw new Error('Invalid ISO10126 padding');
  }
  return data.slice(0, data.length - paddingLength);
}

function ansiX923Pad(data, blockSize = 16) {
  const paddingLength = blockSize - (data.length % blockSize);
  const padded = new Uint8Array(data.length + paddingLength);
  padded.set(data);
  for (let i = data.length; i < padded.length - 1; i++) {
    padded[i] = 0;
  }
  padded[padded.length - 1] = paddingLength;
  return padded;
}

function ansiX923Unpad(data) {
  const paddingLength = data[data.length - 1];
  if (paddingLength > data.length) {
    throw new Error('Invalid ANSI X.923 padding');
  }
  return data.slice(0, data.length - paddingLength);
}

function iso7816Pad(data, blockSize = 16) {
  const paddingLength = blockSize - (data.length % blockSize);
  const padded = new Uint8Array(data.length + paddingLength);
  padded.set(data);
  padded[data.length] = 0x80;
  for (let i = data.length + 1; i < padded.length; i++) {
    padded[i] = 0;
  }
  return padded;
}

function iso7816Unpad(data) {
  let i = data.length - 1;
  while (i >= 0 && data[i] === 0) i--;
  if (i >= 0 && data[i] === 0x80) {
    return data.slice(0, i);
  }
  throw new Error('Invalid ISO/IEC 7816-4 padding');
}

async function aesEncrypt() {
  const input = document.getElementById('aes-input').value;
  const key = document.getElementById('aes-key').value;
  const mode = document.getElementById('aes-mode').value;
  const iv = document.getElementById('aes-iv').value;
  const result = document.getElementById('aes-result');
  
  try {
    // 验证输入
    if (!input) {
      throw new Error('请输入要加密的文本');
    }
    if (!key) {
      throw new Error('请输入密钥');
    }
    if (mode !== 'ecb' && !iv) {
      throw new Error('请输入IV');
    }
    
    // 获取输入格式
    const inputFormat = document.querySelector('input[name="aes-input-format"]:checked').value;
    // 获取输出格式
    const outputFormat = document.querySelector('input[name="aes-output-format"]:checked').value;
    // 获取填充方式
    const padding = document.getElementById('aes-padding') ? document.getElementById('aes-padding').value : 'pkcs7';
    
    // 处理输入数据
    let data = input;
    if (inputFormat === 'base64') {
      data = base64ToBytes(input);
    } else if (inputFormat === 'hex') {
      data = hexToBytes(input);
    } else {
      // UTF-8
      data = new TextEncoder().encode(input);
    }
    
    // 处理密钥
    const keyBytes = await importKey(key, mode);
    
    // 处理IV
    let ivBytes = null;
    if (mode !== 'ecb') {
      ivBytes = hexToBytes(iv);
      if (ivBytes.length !== 16) {
        throw new Error('IV must be 16 bytes');
      }
    }
    
    // 应用填充
    if (padding !== 'none') {
      switch (padding) {
        case 'pkcs5':
          data = pkcs5Pad(data);
          break;
        case 'pkcs7':
          data = pkcs7Pad(data);
          break;
        case 'zeros':
          data = zerosPad(data);
          break;
        case 'iso10126':
          data = iso10126Pad(data);
          break;
        case 'ansiX923':
          data = ansiX923Pad(data);
          break;
        case 'iso7816':
          data = iso7816Pad(data);
          break;
      }
    }
    
    // 加密
    let encrypted;
    if (mode === 'ecb') {
      // 使用CBC模式模拟ECB，IV为全零
      const zeroIV = new Uint8Array(16);
      encrypted = await crypto.subtle.encrypt(
        {
          name: 'AES-CBC',
          iv: zeroIV
        },
        keyBytes,
        data
      );
    } else if (mode === 'cbc') {
      encrypted = await crypto.subtle.encrypt(
        {
          name: 'AES-CBC',
          iv: ivBytes
        },
        keyBytes,
        data
      );
    } else {
      encrypted = await crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: ivBytes,
          tagLength: 128
        },
        keyBytes,
        data
      );
    }
    
    // 转换输出格式
    const encryptedBytes = new Uint8Array(encrypted);
    let output;
    if (outputFormat === 'base64') {
      output = bytesToBase64(encryptedBytes);
    } else if (outputFormat === 'hex') {
      output = bytesToHex(encryptedBytes);
    } else {
      // UTF-8 (可能会有乱码，因为加密结果是二进制数据)
      output = new TextDecoder().decode(encryptedBytes);
    }
    
    result.textContent = output;
    result.style.color = '#333';
  } catch (e) {
    result.textContent = '加密失败: ' + e.message;
    result.style.color = '#f2777a';
  }
}

async function aesDecrypt() {
  const input = document.getElementById('aes-input').value;
  const key = document.getElementById('aes-key').value;
  const mode = document.getElementById('aes-mode').value;
  const iv = document.getElementById('aes-iv').value;
  const result = document.getElementById('aes-result');
  
  try {
    // 验证输入
    if (!input) {
      throw new Error('请输入要解密的文本');
    }
    if (!key) {
      throw new Error('请输入密钥');
    }
    if (mode !== 'ecb' && !iv) {
      throw new Error('请输入IV');
    }
    
    // 获取输入格式
    const inputFormat = document.querySelector('input[name="aes-input-format"]:checked').value;
    // 获取输出格式
    const outputFormat = document.querySelector('input[name="aes-output-format"]:checked').value;
    // 获取填充方式
    const padding = document.getElementById('aes-padding') ? document.getElementById('aes-padding').value : 'pkcs7';
    
    // 处理输入数据
    let data = input;
    if (inputFormat === 'base64') {
      data = base64ToBytes(input);
    } else if (inputFormat === 'hex') {
      data = hexToBytes(input);
    } else {
      // UTF-8
      data = new TextEncoder().encode(input);
    }
    
    // 处理密钥
    const keyBytes = await importKey(key, mode);
    
    // 处理IV
    let ivBytes = null;
    if (mode !== 'ecb') {
      ivBytes = hexToBytes(iv);
      if (ivBytes.length !== 16) {
        throw new Error('IV must be 16 bytes');
      }
    }
    
    // 解密
    let decrypted;
    if (mode === 'ecb') {
      // 使用CBC模式模拟ECB，IV为全零
      const zeroIV = new Uint8Array(16);
      decrypted = await crypto.subtle.decrypt(
        {
          name: 'AES-CBC',
          iv: zeroIV
        },
        keyBytes,
        data
      );
    } else if (mode === 'cbc') {
      decrypted = await crypto.subtle.decrypt(
        {
          name: 'AES-CBC',
          iv: ivBytes
        },
        keyBytes,
        data
      );
    } else {
      decrypted = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: ivBytes,
          tagLength: 128
        },
        keyBytes,
        data
      );
    }
    
    // 转换输出格式
    const decryptedBytes = new Uint8Array(decrypted);
    
    // 应用去填充
    if (padding !== 'none') {
      switch (padding) {
        case 'pkcs5':
          decryptedBytes = pkcs5Unpad(decryptedBytes);
          break;
        case 'pkcs7':
          decryptedBytes = pkcs7Unpad(decryptedBytes);
          break;
        case 'zeros':
          decryptedBytes = zerosUnpad(decryptedBytes);
          break;
        case 'iso10126':
          decryptedBytes = iso10126Unpad(decryptedBytes);
          break;
        case 'ansiX923':
          decryptedBytes = ansiX923Unpad(decryptedBytes);
          break;
        case 'iso7816':
          decryptedBytes = iso7816Unpad(decryptedBytes);
          break;
      }
    }
    
    let output;
    if (outputFormat === 'base64') {
      output = bytesToBase64(decryptedBytes);
    } else if (outputFormat === 'hex') {
      output = bytesToHex(decryptedBytes);
    } else {
      // UTF-8
      output = new TextDecoder().decode(decryptedBytes);
    }
    
    result.textContent = output;
    result.style.color = '#333';
  } catch (e) {
    result.textContent = '解密失败: ' + e.message;
    result.style.color = '#f2777a';
  }
}

async function importKey(key, mode) {
  // 处理密钥长度
  let keyData = new TextEncoder().encode(key);
  
  // 确保密钥长度符合AES要求
  // AES支持16字节(AES-128)、24字节(AES-192)或32字节(AES-256)
  if (keyData.length !== 16 && keyData.length !== 24 && keyData.length !== 32) {
    // 对于非标准长度，优先截断到16字节（AES-128）
    // 这与大多数在线AES工具的行为一致
    keyData = keyData.slice(0, 16);
  }
  
  // Web Crypto API不支持AES-ECB，所有模式都使用AES-CBC
  // ECB模式将在加密/解密时使用全零IV模拟
  const algorithm = mode === 'gcm' ? 'AES-GCM' : 'AES-CBC';
  
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    algorithm,
    false,
    ['encrypt', 'decrypt']
  );
}

// 辅助函数：Base64转字节
function base64ToBytes(base64) {
  const binaryString = window.atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// 辅助函数：字节转Base64
function bytesToBase64(bytes) {
  const binaryString = String.fromCharCode(...bytes);
  return window.btoa(binaryString);
}

// 辅助函数：Hex转字节
function hexToBytes(hex) {
  hex = hex.replace(/\s/g, '');
  const length = hex.length / 2;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

// 辅助函数：字节转Hex
function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}