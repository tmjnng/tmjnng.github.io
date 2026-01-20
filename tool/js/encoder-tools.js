// Combined Encoder/Decoder Tools (Base64/URL)

function encodeData() {
  const mode = document.getElementById('encoder-mode').value;
  if (mode === 'base64') {
    base64Encode('encoder-input', 'encoder-result');
  } else if (mode === 'url') {
    urlEncode('encoder-input', 'encoder-result');
  }
}

function decodeData() {
  const mode = document.getElementById('encoder-mode').value;
  if (mode === 'base64') {
    base64Decode('encoder-input', 'encoder-result');
  } else if (mode === 'url') {
    urlDecode('encoder-input', 'encoder-result');
  }
}
