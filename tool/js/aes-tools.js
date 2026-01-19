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

// Helper to get CryptoJS padding object from string
function getCryptoJSPadding(padding) {
  switch (padding) {
    case 'pkcs7':
    case 'pkcs5': // Treat PKCS5 as PKCS7 for AES
      return CryptoJS.pad.Pkcs7;
    case 'zeros':
      return CryptoJS.pad.ZeroPadding;
    case 'none':
      return CryptoJS.pad.NoPadding;
    case 'iso10126':
      return CryptoJS.pad.Iso10126;
    case 'ansiX923':
      return CryptoJS.pad.AnsiX923;
    case 'iso7816':
      // CryptoJS doesn't have a direct equivalent for ISO/IEC 7816-4 padding.
      // It's similar to ZeroPadding with a mandatory 0x80 byte.
      // We will fall back to Pkcs7 for ECB mode as a safe default.
      return CryptoJS.pad.Pkcs7;
    default:
      return CryptoJS.pad.Pkcs7;
  }
}


// --- Custom Padding for Web Crypto API ---
function pkcs5Pad(data, blockSize = 8) {
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
// --- End Custom Padding ---


async function aesEncrypt() {
  const input = document.getElementById('aes-input').value;
  const key = document.getElementById('aes-key').value;
  const mode = document.getElementById('aes-mode').value;
  const iv = document.getElementById('aes-iv').value;
  const result = document.getElementById('aes-result');
  
  try {
    // --- Input Validation ---
    if (!input) throw new Error('请输入要加密的文本');
    if (!key) throw new Error('请输入密钥');
    if (mode !== 'ecb' && !iv) throw new Error('请输入IV');

    const inputFormat = document.querySelector('input[name="aes-input-format"]:checked').value;
    const outputFormat = document.querySelector('input[name="aes-output-format"]:checked').value;
    const padding = document.getElementById('aes-padding').value;

    // --- ECB Mode using CryptoJS ---
    if (mode === 'ecb') {
      const keyParsed = CryptoJS.enc.Utf8.parse(key);
      
      let data;
      if (inputFormat === 'hex') {
        data = CryptoJS.enc.Hex.parse(input);
      } else if (inputFormat === 'base64') {
        data = CryptoJS.enc.Base64.parse(input);
      } else { // utf8
        data = CryptoJS.enc.Utf8.parse(input);
      }

      const encrypted = CryptoJS.AES.encrypt(data, keyParsed, {
        mode: CryptoJS.mode.ECB,
        padding: getCryptoJSPadding(padding)
      });

      let output;
      if (outputFormat === 'hex') {
        output = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
      } else { // base64
        output = encrypted.toString();
      }
      
      result.textContent = output;
      result.style.color = '#333';
      return; // Done with ECB path
    }

    // --- CBC / GCM Mode using Web Crypto API ---
    let data;
    if (inputFormat === 'base64') {
      data = base64ToBytes(input);
    } else if (inputFormat === 'hex') {
      data = hexToBytes(input);
    } else { // utf8
      data = new TextEncoder().encode(input);
    }
    
    const keyBytes = await importKey(key, mode);
    
    const ivBytes = hexToBytes(iv);
    if (ivBytes.length !== 16) {
      throw new Error('IV must be 16 bytes');
    }
    
    // Apply custom padding for Web Crypto
    if (padding !== 'none') {
      switch (padding) {
        case 'pkcs5': data = pkcs5Pad(data); break;
        case 'pkcs7': data = pkcs7Pad(data); break;
        case 'zeros': data = zerosPad(data); break;
        case 'iso10126': data = iso10126Pad(data); break;
        case 'ansiX923': data = ansiX923Pad(data); break;
        case 'iso7816': data = iso7816Pad(data); break;
      }
    }
    
    let encrypted;
    if (mode === 'cbc') {
      encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv: ivBytes }, keyBytes, data);
    } else { // gcm
      encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: ivBytes, tagLength: 128 }, keyBytes, data);
    }
    
    const encryptedBytes = new Uint8Array(encrypted);
    let output;
    if (outputFormat === 'base64') {
      output = bytesToBase64(encryptedBytes);
    } else if (outputFormat === 'hex') {
      output = bytesToHex(encryptedBytes);
    } else { // utf8
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
    // --- Input Validation ---
    if (!input) throw new Error('请输入要解密的文本');
    if (!key) throw new Error('请输入密钥');
    if (mode !== 'ecb' && !iv) throw new Error('请输入IV');

    const outputFormat = document.querySelector('input[name="aes-output-format"]:checked').value;
    const padding = document.getElementById('aes-padding').value;

    // --- ECB Mode using CryptoJS ---
    if (mode === 'ecb') {
      const keyParsed = CryptoJS.enc.Utf8.parse(key);
      
      // Input for decryption is a CipherParams object or a base64 string.
      // CryptoJS auto-handles Base64. For Hex, we need to create a CipherParams object.
      let ciphertext = input;
      const inputFormat = document.querySelector('input[name="aes-input-format"]:checked').value;
      if (inputFormat === 'hex') {
          ciphertext = { ciphertext: CryptoJS.enc.Hex.parse(input) };
      }

      const decrypted = CryptoJS.AES.decrypt(ciphertext, keyParsed, {
        mode: CryptoJS.mode.ECB,
        padding: getCryptoJSPadding(padding)
      });

      let output;
      if (outputFormat === 'hex') {
        output = decrypted.toString(CryptoJS.enc.Hex);
      } else if (outputFormat === 'base64') {
        output = decrypted.toString(CryptoJS.enc.Base64);
      } else { // utf8
        output = decrypted.toString(CryptoJS.enc.Utf8);
      }

      if (!output) {
        throw new Error("解密失败，请检查密钥、填充方式或密文是否正确。");
      }
      
      result.textContent = output;
      result.style.color = '#333';
      return; // Done with ECB path
    }

    // --- CBC / GCM Mode using Web Crypto API ---
    const inputFormat = document.querySelector('input[name="aes-input-format"]:checked').value;
    let data;
    if (inputFormat === 'base64') {
      data = base64ToBytes(input);
    } else if (inputFormat === 'hex') {
      data = hexToBytes(input);
    } else { // utf8
      data = new TextEncoder().encode(input);
    }
    
    const keyBytes = await importKey(key, mode);
    
    const ivBytes = hexToBytes(iv);
    if (ivBytes.length !== 16) {
      throw new Error('IV must be 16 bytes');
    }
    
    let decrypted;
    if (mode === 'cbc') {
      decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: ivBytes }, keyBytes, data);
    } else { // gcm
      decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBytes, tagLength: 128 }, keyBytes, data);
    }
    
    let decryptedBytes = new Uint8Array(decrypted);
    
    // Apply custom un-padding for Web Crypto
    if (padding !== 'none') {
      switch (padding) {
        case 'pkcs5': decryptedBytes = pkcs5Unpad(decryptedBytes); break;
        case 'pkcs7': decryptedBytes = pkcs7Unpad(decryptedBytes); break;
        case 'zeros': decryptedBytes = zerosUnpad(decryptedBytes); break;
        case 'iso10126': decryptedBytes = iso10126Unpad(decryptedBytes); break;
        case 'ansiX923': decryptedBytes = ansiX923Unpad(decryptedBytes); break;
        case 'iso7816': decryptedBytes = iso7816Unpad(decryptedBytes); break;
      }
    }
    
    let output;
    if (outputFormat === 'base64') {
      output = bytesToBase64(decryptedBytes);
    } else if (outputFormat === 'hex') {
      output = bytesToHex(decryptedBytes);
    } else { // utf8
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
  let keyData = new TextEncoder().encode(key);
  if (keyData.length !== 16 && keyData.length !== 24 && keyData.length !== 32) {
    keyData = keyData.slice(0, 16);
  }
  
  const algorithm = mode === 'gcm' ? 'AES-GCM' : 'AES-CBC';
  
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    algorithm,
    false,
    ['encrypt', 'decrypt']
  );
}

// --- Helper Functions for Web Crypto API ---
function base64ToBytes(base64) {
  const binaryString = window.atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function bytesToBase64(bytes) {
  const binaryString = String.fromCharCode(...bytes);
  return window.btoa(binaryString);
}

function hexToBytes(hex) {
  hex = hex.replace(/\s/g, '');
  const length = hex.length / 2;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}
