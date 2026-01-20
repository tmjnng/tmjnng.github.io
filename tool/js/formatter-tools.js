// Combined Formatter Tools (JSON/XML/SQL)

function formatData() {
  const mode = document.getElementById('formatter-mode').value;
  if (mode === 'json') {
    formatJson('formatter-input', 'formatter-result');
  } else if (mode === 'xml') {
    formatXml('formatter-input', 'formatter-result');
  } else if (mode === 'sql') {
    formatSql('formatter-input', 'formatter-result');
  }
}

function minifyData() {
  const mode = document.getElementById('formatter-mode').value;
  if (mode === 'json') {
    minifyJson('formatter-input', 'formatter-result');
  } else if (mode === 'xml') {
    minifyXml('formatter-input', 'formatter-result');
  } else if (mode === 'sql') {
    minifySql('formatter-input', 'formatter-result');
  }
}
