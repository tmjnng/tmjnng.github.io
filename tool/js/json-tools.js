// JSON格式化工具
function formatJson() {
  const input = document.getElementById('json-input').value;
  const result = document.getElementById('json-result');
  try {
    const parsed = JSON.parse(input);
    result.textContent = JSON.stringify(parsed, null, 2);
    result.style.color = '#333';
  } catch (e) {
    result.textContent = i18n[currentLang].jsonError + e.message;
    result.style.color = '#f2777a';
  }
}

function minifyJson() {
  const input = document.getElementById('json-input').value;
  const result = document.getElementById('json-result');
  try {
    const parsed = JSON.parse(input);
    result.textContent = JSON.stringify(parsed);
    result.style.color = '#333';
  } catch (e) {
    result.textContent = i18n[currentLang].jsonError + e.message;
    result.style.color = '#f2777a';
  }
}