// 时间戳转换工具
function timestampToDate() {
  const input = document.getElementById('timestamp-input').value;
  const result = document.getElementById('timestamp-result');
  const langData = i18n[currentLang];
  
  try {
    let timestamp = parseInt(input);
    
    // 处理秒级和毫秒级时间戳
    const date = new Date(timestamp.toString().length === 10 ? timestamp * 1000 : timestamp);
    result.textContent = date.toString();
    result.style.color = '#333';
  } catch (e) {
    result.textContent = e.message;
    result.style.color = '#f2777a';
  }
}

function dateToTimestamp() {
  const input = document.getElementById('timestamp-input').value;
  const result = document.getElementById('timestamp-result');
  const langData = i18n[currentLang];
  
  try {
    const date = new Date(input);
    if (isNaN(date.getTime())) {
      throw new Error(langData.invalidDateFormat);
    }
    
    result.textContent = Math.floor(date.getTime() / 1000);
    result.style.color = '#333';
  } catch (e) {
    result.textContent = e.message;
    result.style.color = '#f2777a';
  }
}