// SQL格式化工具
function formatSql() {
  const input = document.getElementById('sql-input').value;
  const result = document.getElementById('sql-result');
  try {
    const formatted = sqlFormatter(input);
    result.textContent = formatted;
    result.style.color = '#333';
  } catch (e) {
    result.textContent = i18n[currentLang].sqlError + ': ' + e.message;
    result.style.color = '#f2777a';
  }
}

function minifySql() {
  const input = document.getElementById('sql-input').value;
  const result = document.getElementById('sql-result');
  try {
    const minified = sqlMinifier(input);
    result.textContent = minified;
    result.style.color = '#333';
  } catch (e) {
    result.textContent = i18n[currentLang].sqlError + ': ' + e.message;
    result.style.color = '#f2777a';
  }
}

// SQL格式化函数
function sqlFormatter(sql) {
  sql = sql.trim();
  sql = sql.replace(/\s+/g, ' ');
  
  const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TABLE', 'VIEW', 'INDEX', 'TRIGGER', 'PROCEDURE', 'FUNCTION', 'BEGIN', 'END', 'IF', 'ELSE', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END CASE'];
  
  let formatted = sql;
  let indentLevel = 0;
  const indentSize = 2;
  
  formatted = formatted.replace(/\(/g, ' (\n' + ' '.repeat(++indentLevel * indentSize));
  formatted = formatted.replace(/\)/g, '\n' + ' '.repeat(--indentLevel * indentSize) + ')');
  
  for (const keyword of keywords) {
    const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
    formatted = formatted.replace(regex, (match) => '\n' + ' '.repeat(indentLevel * indentSize) + match.toUpperCase());
  }
  
  formatted = formatted.replace(/,/g, ',\n' + ' '.repeat((indentLevel + 1) * indentSize));
  formatted = formatted.replace(/\n(\s*)(AND|OR)/gi, '\n$1  $2');
  formatted = formatted.replace(/\n+/g, '\n');
  
  return formatted.trim();
}

// SQL压缩函数
function sqlMinifier(sql) {
  sql = sql.replace(/--.*$/gm, '');
  sql = sql.replace(/\/\*[\s\S]*?\*\//g, '');
  sql = sql.trim();
  sql = sql.replace(/\s+/g, ' ');
  return sql;
}