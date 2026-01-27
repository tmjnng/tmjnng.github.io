function generateQRCode() {
  const input = document.getElementById('qrcode-input').value;
  const size = parseInt(document.getElementById('qrcode-size').value);
  const resultDiv = document.getElementById('qrcode-result');

  if (!input) {
    resultDiv.innerHTML = `<span style="color: red;">${i18n[langData.currentLang].qrcodeError}: ${i18n[langData.currentLang].qrcodeErrorInput}</span>`;
    return;
  }

  // 清空结果区域
  resultDiv.innerHTML = '';

  // 创建Canvas元素
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  resultDiv.appendChild(canvas);

  // 生成二维码
  const ctx = canvas.getContext('2d');
  
  // 简单的二维码生成实现（使用QR Code算法）
  // 这里使用一个简化的实现，实际项目中可以使用完整的QR Code库
  const qrData = input;
  const qrMatrix = generateQRMatrix(qrData);
  
  // 绘制二维码
  drawQRCode(ctx, qrMatrix, size);
}

function clearQRCode() {
  document.getElementById('qrcode-input').value = '';
  document.getElementById('qrcode-result').innerHTML = '';
}

function downloadQRCode() {
  const resultDiv = document.getElementById('qrcode-result');
  const canvas = resultDiv.querySelector('canvas');
  
  if (!canvas) {
    alert(i18n[langData.currentLang].qrcodeErrorDownload);
    return;
  }
  
  // 创建下载链接
  const dataURL = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'qrcode.png';
  a.click();
}

// 简化的QR码矩阵生成函数
function generateQRMatrix(data) {
  // 这里使用一个简化的实现，实际项目中应该使用完整的QR码算法
  // 为了演示，我们创建一个简单的矩阵
  const size = 21; // 最小QR码尺寸
  const matrix = Array(size).fill().map(() => Array(size).fill(0));
  
  // 添加定位图案
  addFinderPatterns(matrix, size);
  
  // 添加数据（简化版）
  const binaryData = textToBinary(data);
  let dataIndex = 0;
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // 跳过定位图案区域
      if (!isFinderPatternArea(i, j, size)) {
        matrix[i][j] = binaryData[dataIndex % binaryData.length];
        dataIndex++;
      }
    }
  }
  
  return matrix;
}

// 添加定位图案
function addFinderPatterns(matrix, size) {
  // 左上角定位图案
  drawFinderPattern(matrix, 0, 0);
  // 右上角定位图案
  drawFinderPattern(matrix, 0, size - 7);
  // 左下角定位图案
  drawFinderPattern(matrix, size - 7, 0);
}

// 绘制定位图案
function drawFinderPattern(matrix, startX, startY) {
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      if (i === 0 || i === 6 || j === 0 || j === 6) {
        matrix[startX + i][startY + j] = 1;
      } else if (i === 1 || i === 5 || j === 1 || j === 5) {
        matrix[startX + i][startY + j] = 0;
      } else {
        matrix[startX + i][startY + j] = 1;
      }
    }
  }
}

// 检查是否是定位图案区域
function isFinderPatternArea(x, y, size) {
  return (x < 7 && y < 7) || // 左上角
         (x < 7 && y >= size - 7) || // 右上角
         (x >= size - 7 && y < 7); // 左下角
}

// 文本转二进制
function textToBinary(text) {
  const binary = [];
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    for (let j = 7; j >= 0; j--) {
      binary.push((charCode >> j) & 1);
    }
  }
  return binary;
}

// 绘制二维码
function drawQRCode(ctx, matrix, size) {
  const cellSize = size / matrix.length;
  
  // 清空画布
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);
  
  // 绘制二维码
  ctx.fillStyle = '#000000';
  
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 1) {
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  }
}
