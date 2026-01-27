function testRegex() {
  const pattern = document.getElementById('regex-pattern').value;
  const testText = document.getElementById('regex-test-text').value;
  const flagG = document.getElementById('regex-flag-g').checked;
  const flagI = document.getElementById('regex-flag-i').checked;
  const flagM = document.getElementById('regex-flag-m').checked;
  const flagS = document.getElementById('regex-flag-s').checked;
  const resultDiv = document.getElementById('regex-result');

  if (!pattern) {
    resultDiv.innerHTML = `<span style="color: red;">${i18n[currentLang].regexError}: ${i18n[currentLang].regexErrorPattern}</span>`;
    return;
  }

  if (!testText) {
    resultDiv.innerHTML = `<span style="color: red;">${i18n[currentLang].regexError}: ${i18n[currentLang].regexErrorTestText}</span>`;
    return;
  }

  let flags = '';
  if (flagG) flags += 'g';
  if (flagI) flags += 'i';
  if (flagM) flags += 'm';
  if (flagS) flags += 's';

  try {
    const regex = new RegExp(pattern, flags);
    const matches = [];
    let match;

    if (flagG) {
      let lastIndex = 0;
      while ((match = regex.exec(testText)) !== null) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
          input: match.input
        });
        if (regex.lastIndex === lastIndex) {
          regex.lastIndex++;
        }
        lastIndex = regex.lastIndex;
      }
    } else {
      match = regex.exec(testText);
      if (match) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
          input: match.input
        });
      }
    }

    let resultHTML = '';
    if (matches.length === 0) {
      resultHTML = `<span style="color: orange;">${i18n[currentLang].regexNoMatch}</span>`;
    } else {
      resultHTML += `<strong>${i18n[currentLang].regexMatchResults} (${matches.length} ${i18n[currentLang].regexMatches}):</strong>\n\n`;
      matches.forEach((m, idx) => {
        resultHTML += `<strong>${i18n[currentLang].regexMatchResults} #${idx + 1}:</strong>\n`;
        resultHTML += `  ${i18n[currentLang].regexMatchContent}: "${escapeHtml(m.match)}"\n`;
        resultHTML += `  ${i18n[currentLang].regexPosition}: ${m.index}\n`;
        if (m.groups.length > 0) {
          resultHTML += `  ${i18n[currentLang].regexCaptureGroups}:\n`;
          m.groups.forEach((group, groupIdx) => {
            resultHTML += `    $${groupIdx + 1}: "${escapeHtml(group)}"\n`;
          });
        }
        resultHTML += '\n';
      });

      resultHTML += `<strong>${i18n[currentLang].regexHighlight}:</strong>\n`;
      let highlightedText = escapeHtml(testText);
      let offset = 0;
      matches.forEach((m) => {
        const start = m.index + offset;
        const end = start + m.match.length;
        const before = highlightedText.substring(0, start);
        const matchText = highlightedText.substring(start, end);
        const after = highlightedText.substring(end);
        highlightedText = before + `<span style="background-color: yellow; font-weight: bold;">${matchText}</span>` + after;
        offset += `<span style="background-color: yellow; font-weight: bold;">`.length + `</span>`.length;
      });
      resultHTML += highlightedText;
    }

    resultDiv.innerHTML = resultHTML;
  } catch (error) {
    resultDiv.innerHTML = `<span style="color: red;">${i18n[currentLang].regexError}: ${escapeHtml(error.message)}</span>`;
  }
}

function clearRegexResults() {
  document.getElementById('regex-pattern').value = '';
  document.getElementById('regex-test-text').value = '';
  document.getElementById('regex-flag-g').checked = false;
  document.getElementById('regex-flag-i').checked = false;
  document.getElementById('regex-flag-m').checked = false;
  document.getElementById('regex-flag-s').checked = false;
  document.getElementById('regex-result').innerHTML = '';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
