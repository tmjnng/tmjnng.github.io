/**
 * 颜色提取器模块
 * 提供提取图片主色调的功能
 */

class ColorExtractor {
    /**
     * 提取图片主色调
     * @param {HTMLImageElement} image - 要提取颜色的图片
     * @param {number} count - 要提取的颜色数量
     * @returns {Array<string>} - 提取的主色调数组 (hex格式)
     */
    static extractDominantColors(image, count = 5) {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;

        // 统计颜色出现次数
        const colorMap = new Map();

        // 每10个像素采样一次，提高性能
        for (let i = 0; i < data.length; i += 4 * 10) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            // 忽略透明度高的像素
            if (a > 128) {
                // 颜色量化，减少颜色数量
                const quantizedR = Math.floor(r / 32) * 32;
                const quantizedG = Math.floor(g / 32) * 32;
                const quantizedB = Math.floor(b / 32) * 32;

                const color = `${quantizedR},${quantizedG},${quantizedB}`;
                colorMap.set(color, (colorMap.get(color) || 0) + 1);
            }
        }

        // 按出现次数排序，取前count个
        const sortedColors = Array.from(colorMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, count)
            .map(([color]) => {
                const [r, g, b] = color.split(',').map(Number);
                return this.rgbToHex(r, g, b);
            });

        return sortedColors;
    }

    /**
     * 获取图片平均颜色
     * @param {HTMLImageElement} image - 要分析的图片
     * @returns {string} - 平均颜色 (hex格式)
     */
    static getAverageColor(image) {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;

        let r = 0, g = 0, b = 0, count = 0;

        // 每5个像素采样一次
        for (let i = 0; i < data.length; i += 4 * 5) {
            const alpha = data[i + 3];
            if (alpha > 128) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
                count++;
            }
        }

        if (count === 0) return '#ffffff';

        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        return this.rgbToHex(r, g, b);
    }

    /**
     * 获取图片的主色调和辅助色
     * @param {HTMLImageElement} image - 要分析的图片
     * @returns {object} - 包含主色调和辅助色的对象
     */
    static getColorPalette(image) {
        const dominantColors = this.extractDominantColors(image, 5);
        const averageColor = this.getAverageColor(image);

        return {
            primary: dominantColors[0] || averageColor,
            secondary: dominantColors[1] || averageColor,
            accent: dominantColors[2] || averageColor,
            palette: dominantColors,
            average: averageColor
        };
    }

    /**
     * 计算颜色亮度
     * @param {string} hex - 十六进制颜色值
     * @returns {number} - 亮度值 (0-255)
     */
    static getBrightness(hex) {
        const [r, g, b] = this.hexToRgb(hex);
        return (r * 299 + g * 587 + b * 114) / 1000;
    }

    /**
     * 判断颜色是否为浅色
     * @param {string} hex - 十六进制颜色值
     * @returns {boolean} - 是否为浅色
     */
    static isLightColor(hex) {
        return this.getBrightness(hex) > 128;
    }

    /**
     * 获取与背景色对比度高的文本颜色
     * @param {string} backgroundColor - 背景色 (hex格式)
     * @returns {string} - 文本颜色 ('#ffffff' 或 '#000000')
     */
    static getContrastTextColor(backgroundColor) {
        return this.isLightColor(backgroundColor) ? '#000000' : '#ffffff';
    }

    /**
     * 辅助方法: RGB转十六进制
     * @param {number} r - 红色通道
     * @param {number} g - 绿色通道
     * @param {number} b - 蓝色通道
     * @returns {string} - 十六进制颜色值
     */
    static rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    /**
     * 辅助方法: 十六进制转RGB
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
     * 生成互补色
     * @param {string} hex - 十六进制颜色值
     * @returns {string} - 互补色 (hex格式)
     */
    static getComplementaryColor(hex) {
        const [r, g, b] = this.hexToRgb(hex);
        return this.rgbToHex(255 - r, 255 - g, 255 - b);
    }

    /**
     * 生成颜色渐变
     * @param {string} startColor - 起始颜色 (hex格式)
     * @param {string} endColor - 结束颜色 (hex格式)
     * @param {number} steps - 渐变步数
     * @returns {Array<string>} - 渐变色数组
     */
    static generateGradient(startColor, endColor, steps = 10) {
        const start = this.hexToRgb(startColor);
        const end = this.hexToRgb(endColor);
        const gradient = [];

        for (let i = 0; i < steps; i++) {
            const t = i / (steps - 1);
            const r = Math.round(start[0] + (end[0] - start[0]) * t);
            const g = Math.round(start[1] + (end[1] - start[1]) * t);
            const b = Math.round(start[2] + (end[2] - start[2]) * t);
            gradient.push(this.rgbToHex(r, g, b));
        }

        return gradient;
    }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ColorExtractor;
} else {
    window.ColorExtractor = ColorExtractor;
}

// 全局函数
getAverageColor = ColorExtractor.getAverageColor;
extractDominantColors = ColorExtractor.extractDominantColors;
getColorPalette = ColorExtractor.getColorPalette;