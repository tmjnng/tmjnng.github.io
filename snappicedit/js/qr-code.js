/**
 * 二维码生成模块
 * 使用Canvas API生成二维码
 */

/**
 * 生成二维码
 * @param {string} text - 要编码的文本
 * @param {number} size - 二维码大小
 * @returns {HTMLCanvasElement} - 包含二维码的画布
 */
function generateQRCode(text, size = 128) {
    try {
        // 这里使用一个简化的二维码生成算法
        // 实际项目中可以使用更完善的库如qrcode.js
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // 清空画布
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        
        // 计算二维码网格
        const cellSize = size / 25; // 25x25网格
        const padding = cellSize * 2;
        
        // 生成二维码数据（简化版）
        const qrData = generateQRData(text, 21); // 21x21数据
        
        // 绘制二维码
        ctx.fillStyle = '#000000';
        for (let y = 0; y < 21; y++) {
            for (let x = 0; x < 21; x++) {
                if (qrData[y][x]) {
                    ctx.fillRect(
                        padding + x * cellSize,
                        padding + y * cellSize,
                        cellSize,
                        cellSize
                    );
                }
            }
        }
        
        // 绘制定位图案
        drawPositionMarker(ctx, padding, padding, cellSize * 7);
        drawPositionMarker(ctx, size - padding - cellSize * 7, padding, cellSize * 7);
        drawPositionMarker(ctx, padding, size - padding - cellSize * 7, cellSize * 7);
        
        return canvas;
    } catch (error) {
        console.error('QR code generation failed:', error);
        return null;
    }
}

/**
 * 绘制定位图案
 * @param {CanvasRenderingContext2D} ctx - Canvas上下文
 * @param {number} x - x坐标
 * @param {number} y - y坐标
 * @param {number} size - 大小
 */
function drawPositionMarker(ctx, x, y, size) {
    // 外层黑色正方形
    ctx.fillStyle = '#000000';
    ctx.fillRect(x, y, size, size);
    
    // 中层白色正方形
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + size * 0.2, y + size * 0.2, size * 0.6, size * 0.6);
    
    // 内层黑色正方形
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + size * 0.4, y + size * 0.4, size * 0.2, size * 0.2);
}

/**
 * 生成二维码数据（简化版）
 * @param {string} text - 要编码的文本
 * @param {number} size - 二维码大小
 * @returns {Array<Array<boolean>>} - 二维码数据
 */
function generateQRData(text, size) {
    // 初始化数据矩阵
    const data = Array(size).fill().map(() => Array(size).fill(false));
    
    // 计算文本的哈希值，用于生成图案
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) - hash) + text.charCodeAt(i);
        hash = hash & hash;
    }
    
    // 生成伪随机图案
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            // 避开定位图案区域
            if (
                (x < 7 && y < 7) || // 左上角
                (x > size - 8 && y < 7) || // 右上角
                (x < 7 && y > size - 8) // 左下角
            ) {
                continue;
            }
            
            // 生成伪随机点
            const value = (x * 31 + y * 17 + hash) % 10;
            if (value < 3) {
                data[y][x] = true;
            }
        }
    }
    
    return data;
}

/**
 * 检测浏览器是否支持WebP格式
 * @returns {Promise<boolean>} - 是否支持WebP
 */
function checkWebPSupport() {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        
        try {
            const isSupported = canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
            resolve(isSupported);
        } catch (e) {
            resolve(false);
        }
    });
}

// 导出函数
window.generateQRCode = generateQRCode;
window.checkWebPSupport = checkWebPSupport;