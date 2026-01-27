/**
 * 图片处理器模块
 * 提供图片处理的核心功能
 */

class ImageProcessor {
    /**
     * 调整图片大小
     * @param {HTMLImageElement} image - 原始图片
     * @param {number} width - 目标宽度
     * @param {number} height - 目标高度
     * @param {string} mode - 缩放模式: 'contain' 或 'cover'
     * @returns {HTMLCanvasElement} - 调整大小后的画布
     */
    static resizeImage(image, width, height, mode = 'contain') {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        let drawWidth, drawHeight, offsetX, offsetY;

        if (mode === 'contain') {
            // 等比缩放
            const scale = Math.min(width / image.width, height / image.height);
            drawWidth = image.width * scale;
            drawHeight = image.height * scale;
            offsetX = (width - drawWidth) / 2;
            offsetY = (height - drawHeight) / 2;
        } else {
            // 居中裁剪
            const scale = Math.max(width / image.width, height / image.height);
            drawWidth = image.width * scale;
            drawHeight = image.height * scale;
            offsetX = (width - drawWidth) / 2;
            offsetY = (height - drawHeight) / 2;
        }

        ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
        return canvas;
    }

    /**
     * 应用色键抠图
     * @param {HTMLImageElement} image - 原始图片
     * @param {string} chromaColor - 要抠除的颜色 (hex格式)
     * @param {number} threshold - 阈值
     * @returns {HTMLCanvasElement} - 抠图后的画布
     */
    static applyChromaKey(image, chromaColor, threshold = 50) {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;

        const [r, g, b] = this.hexToRgb(chromaColor);

        for (let i = 0; i < data.length; i += 4) {
            const dr = data[i] - r;
            const dg = data[i + 1] - g;
            const db = data[i + 2] - b;
            const distance = Math.sqrt(dr * dr + dg * dg + db * db);

            if (distance < threshold) {
                data[i + 3] = 0; // 设置透明度为0
            }
        }

        ctx.putImageData(imageData, 0, 0);
        return canvas;
    }

    /**
     * 压缩图片
     * @param {HTMLCanvasElement} canvas - 原始画布
     * @param {number} quality - 压缩质量 (0-1)
     * @param {string} format - 输出格式: 'jpeg', 'png', 'webp'
     * @returns {Promise<Blob>} - 压缩后的图片Blob
     */
    static compressImage(canvas, quality = 0.6, format = 'jpeg') {
        return new Promise((resolve) => {
            const mimeType = `image/${format}`;
            canvas.toBlob(resolve, mimeType, quality);
        });
    }

    /**
     * 生成缩略图
     * @param {HTMLImageElement} image - 原始图片
     * @param {number} size - 缩略图尺寸 (正方形)
     * @returns {HTMLCanvasElement} - 缩略图画布
     */
    static generateThumbnail(image, size = 150) {
        return this.resizeImage(image, size, size, 'cover');
    }

    /**
     * 转换图片格式
     * @param {HTMLCanvasElement} canvas - 原始画布
     * @param {string} format - 目标格式: 'jpeg', 'png', 'webp'
     * @param {number} quality - 压缩质量 (0-1)
     * @returns {Promise<Blob>} - 转换后的图片Blob
     */
    static convertFormat(canvas, format = 'jpeg', quality = 0.8) {
        return this.compressImage(canvas, quality, format);
    }

    /**
     * 叠加水印
     * @param {HTMLCanvasElement} canvas - 原始画布
     * @param {string} text - 水印文字
     * @param {object} options - 水印选项
     * @returns {HTMLCanvasElement} - 带水印的画布
     */
    static addWatermark(canvas, text, options = {}) {
        const { 
            font = '24px Arial',
            color = '#000000',
            position = 'bottom-right',
            opacity = 1
        } = options;

        const ctx = canvas.getContext('2d');
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.font = font;
        ctx.fillStyle = color;

        let x, y;
        const padding = 20;

        switch (position) {
            case 'top-left':
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                x = padding;
                y = padding;
                break;
            case 'top-right':
                ctx.textAlign = 'right';
                ctx.textBaseline = 'top';
                x = canvas.width - padding;
                y = padding;
                break;
            case 'bottom-left':
                ctx.textAlign = 'left';
                ctx.textBaseline = 'bottom';
                x = padding;
                y = canvas.height - padding;
                break;
            case 'bottom-right':
                ctx.textAlign = 'right';
                ctx.textBaseline = 'bottom';
                x = canvas.width - padding;
                y = canvas.height - padding;
                break;
            case 'center':
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                x = canvas.width / 2;
                y = canvas.height / 2;
                break;
            default:
                ctx.textAlign = 'right';
                ctx.textBaseline = 'bottom';
                x = canvas.width - padding;
                y = canvas.height - padding;
        }

        ctx.fillText(text, x, y);
        ctx.restore();
        return canvas;
    }

    /**
     * 叠加二维码
     * @param {HTMLCanvasElement} canvas - 原始画布
     * @param {HTMLCanvasElement} qrCanvas - 二维码画布
     * @param {string} position - 位置: 'bottom-right', 'bottom-left', 'top-right', 'top-left'
     * @returns {HTMLCanvasElement} - 带二维码的画布
     */
    static addQRCode(canvas, qrCanvas, position = 'bottom-right') {
        const ctx = canvas.getContext('2d');
        const qrSize = qrCanvas.width;
        const padding = 20;

        let x, y;

        switch (position) {
            case 'top-left':
                x = padding;
                y = padding;
                break;
            case 'top-right':
                x = canvas.width - qrSize - padding;
                y = padding;
                break;
            case 'bottom-left':
                x = padding;
                y = canvas.height - qrSize - padding;
                break;
            case 'bottom-right':
            default:
                x = canvas.width - qrSize - padding;
                y = canvas.height - qrSize - padding;
        }

        ctx.drawImage(qrCanvas, x, y, qrSize, qrSize);
        return canvas;
    }

    /**
     * 辅助方法: 十六进制颜色转RGB
     * @param {string} hex - 十六进制颜色值
     * @returns {Array<number>} - RGB颜色数组
     */
    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : [0, 0, 0];
    }

    /**
     * 辅助方法: RGB颜色转十六进制
     * @param {number} r - 红色通道
     * @param {number} g - 绿色通道
     * @param {number} b - 蓝色通道
     * @returns {string} - 十六进制颜色值
     */
    static rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    /**
     * 批量处理图片
     * @param {Array<object>} images - 图片数组
     * @param {object} options - 处理选项
     * @returns {Promise<Array<Blob>>} - 处理后的图片Blob数组
     */
    static async batchProcess(images, options = {}) {
        const { 
            width = 500,
            height = 500,
            scaleMode = 'contain',
            quality = 0.6,
            format = 'jpeg',
            watermark = null,
            generateThumbnails = false,
            thumbnailSize = 150
        } = options;

        const results = [];

        for (const imageObj of images) {
            const image = imageObj.image;
            
            // 调整大小
            const resizedCanvas = this.resizeImage(image, width, height, scaleMode);
            
            // 添加水印
            let processedCanvas = resizedCanvas;
            if (watermark) {
                processedCanvas = this.addWatermark(resizedCanvas, watermark.text, watermark.options);
            }
            
            // 压缩和转换格式
            const blob = await this.compressImage(processedCanvas, quality, format);
            results.push(blob);
            
            // 生成缩略图
            if (generateThumbnails) {
                const thumbnailCanvas = this.generateThumbnail(image, thumbnailSize);
                const thumbnailBlob = await this.compressImage(thumbnailCanvas, 0.7, 'jpeg');
                results.push({
                    blob: thumbnailBlob,
                    isThumbnail: true,
                    originalIndex: results.length - 1
                });
            }
        }

        return results;
    }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageProcessor;
} else {
    window.ImageProcessor = ImageProcessor;
}