// 颜色转换工具
function hexToRgb() {
  const input = document.getElementById('color-input').value;
  const result = document.getElementById('color-result');
  const langData = i18n[currentLang];
  
  try {
    const hex = input.replace(/^#/, '');
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
      throw new Error(langData.invalidHexColor);
    }
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    result.textContent = `RGB(${r}, ${g}, ${b})`;
    result.style.color = '#333';
  } catch (e) {
    result.textContent = e.message;
    result.style.color = '#f2777a';
  }
}

function rgbToHex() {
  const input = document.getElementById('color-input').value;
  const result = document.getElementById('color-result');
  const langData = i18n[currentLang];
  
  try {
    const match = input.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
      throw new Error(langData.invalidRgbColor);
    }
    
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      throw new Error(langData.rgbRangeError);
    }
    
    const toHex = (val) => {
      const hex = val.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    result.textContent = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    result.style.color = '#333';
  } catch (e) {
    result.textContent = e.message;
    result.style.color = '#f2777a';
  }
}