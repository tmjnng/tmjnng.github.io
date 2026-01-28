// MiniPhotoEdit - 滤镜工具模块
class FilterTool {
    constructor(editor) {
        this.editor = editor;
        this.filters = {
            none: () => this.applyNone(),
            grayscale: (ctx, canvas) => this.applyGrayscale(ctx, canvas),
            sepia: (ctx, canvas) => this.applySepia(ctx, canvas),
            invert: (ctx, canvas) => this.invertColors(ctx, canvas),
            vintage: (ctx, canvas) => this.applyVintage(ctx, canvas),
            lomo: (ctx, canvas) => this.applyLomo(ctx, canvas),
            clarity: (ctx, canvas) => this.applyClarity(ctx, canvas),
            hazy: (ctx, canvas) => this.applyHazy(ctx, canvas)
        };
    }
    
    applyFilter(filterName) {
        if (!this.editor.image) return;
        
        if (this.filters[filterName]) {
            this.filters[filterName](this.editor.ctx, this.editor.canvas);
            this.editor.saveState();
        }
    }
    
    applyNone() {
        // 重置到原始图像
        this.editor.ctx.clearRect(0, 0, this.editor.canvas.width, this.editor.canvas.height);
        this.editor.ctx.drawImage(this.editor.image, 0, 0, this.editor.canvas.width, this.editor.canvas.height);
    }
    
    applyGrayscale(ctx, canvas) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            data[i] = gray;     // R
            data[i + 1] = gray; // G
            data[i + 2] = gray; // B
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    applySepia(ctx, canvas) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));     // Red
            data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168)); // Green
            data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131)); // Blue
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    invertColors(ctx, canvas) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];       // R
            data[i + 1] = 255 - data[i + 1]; // G
            data[i + 2] = 255 - data[i + 2]; // B
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    applyVintage(ctx, canvas) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            // 减少对比度和饱和度
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // 应用怀旧效果
            data[i] = Math.min(255, r * 1.1);
            data[i + 1] = Math.min(255, g * 0.9);
            data[i + 2] = Math.min(255, b * 0.7);
            
            // 添加轻微噪点效果
            const noise = (Math.random() - 0.5) * 20;
            data[i] = Math.max(0, Math.min(255, data[i] + noise));
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    applyLomo(ctx, canvas) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            // 提高对比度和饱和度
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            
            // 应用LOMO效果 - 提高对比度
            r = (r - 128) * 1.5 + 128;
            g = (g - 128) * 1.3 + 128;
            b = (b - 128) * 1.2 + 128;
            
            // 高光部分增强
            if (r > 255) r = 255;
            if (g > 255) g = 255;
            if (b > 255) b = 255;
            
            // 阴影部分加深
            if (r < 0) r = 0;
            if (g < 0) g = 0;
            if (b < 0) b = 0;
            
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    applyClarity(ctx, canvas) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            // 提高对比度和饱和度
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            
            // 增强对比度
            r = (r - 128) * 1.2 + 128;
            g = (g - 128) * 1.2 + 128;
            b = (b - 128) * 1.2 + 128;
            
            // 增加饱和度
            const avg = (r + g + b) / 3;
            r = avg + (r - avg) * 1.1;
            g = avg + (g - avg) * 1.1;
            b = avg + (b - avg) * 1.1;
            
            if (r > 255) r = 255;
            if (g > 255) g = 255;
            if (b > 255) b = 255;
            
            if (r < 0) r = 0;
            if (g < 0) g = 0;
            if (b < 0) b = 0;
            
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    applyHazy(ctx, canvas) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            // 降低对比度，增加亮度
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            
            // 使图像更亮
            r = Math.min(255, r * 1.2);
            g = Math.min(255, g * 1.2);
            b = Math.min(255, b * 1.3);
            
            // 降低对比度
            r = (r - 128) * 0.8 + 128;
            g = (g - 128) * 0.8 + 128;
            b = (b - 128) * 0.8 + 128;
            
            // 增加轻微朦胧感
            const blurFactor = 0.9;
            r = r * blurFactor + 128 * (1 - blurFactor);
            g = g * blurFactor + 128 * (1 - blurFactor);
            b = b * blurFactor + 150 * (1 - blurFactor); // 略微偏暖色调
            
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    // 高级滤镜 - 使用卷积矩阵
    applyConvolution(ctx, canvas, matrix) {
        const weights = (function(matrix) {
            var result = 0;
            for (var i = 0; i < 9; ++i) {
                result += matrix[i];
            }
            return result === 0 ? 1 : result;
        })(matrix);
        
        const side = Math.round(Math.sqrt(matrix.length));
        const halfSide = Math.floor(side / 2);
        
        const src = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const sw = src.width;
        const sh = src.height;
        const srcBuff = src.data;
        const output = ctx.createImageData(sw, sh);
        const dstBuff = output.data;
        
        for (let y = 0; y < sh; y++) {
            for (let x = 0; x < sw; x++) {
                const dstOff = (y * sw + x) * 4;
                let r = 0, g = 0, b = 0;
                
                for (let cy = 0; cy < side; cy++) {
                    for (let cx = 0; cx < side; cx++) {
                        const scy = y + cy - halfSide;
                        const scx = x + cx - halfSide;
                        
                        if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                            const srcOff = (scy * sw + scx) * 4;
                            const wt = matrix[cy * side + cx];
                            
                            r += srcBuff[srcOff] * wt;
                            g += srcBuff[srcOff + 1] * wt;
                            b += srcBuff[srcOff + 2] * wt;
                        }
                    }
                }
                
                dstBuff[dstOff] = r / weights;
                dstBuff[dstOff + 1] = g / weights;
                dstBuff[dstOff + 2] = b / weights;
                dstBuff[dstOff + 3] = srcBuff[dstOff + 3]; // Alpha
            }
        }
        
        ctx.putImageData(output, 0, 0);
    }
    
    // 模糊滤镜
    applyBlur(ctx, canvas) {
        const blurMatrix = [
            1/9, 1/9, 1/9,
            1/9, 1/9, 1/9,
            1/9, 1/9, 1/9
        ];
        
        this.applyConvolution(ctx, canvas, blurMatrix);
    }
    
    // 锐化滤镜
    applySharpen(ctx, canvas) {
        const sharpenMatrix = [
            0, -1, 0,
            -1, 5, -1,
            0, -1, 0
        ];
        
        this.applyConvolution(ctx, canvas, sharpenMatrix);
    }
}

// 扩展主编辑器以集成滤镜功能
document.addEventListener('DOMContentLoaded', () => {
    if (window.photoEditor) {
        window.photoEditor.filterTool = new FilterTool(window.photoEditor);
        
        // 重写滤镜应用方法
        const originalApplyFilter = window.photoEditor.applyFilter;
        window.photoEditor.applyFilter = function() {
            if (this.filterTool && this.image) {
                this.filterTool.applyFilter(this.currentFilter);
            } else if (originalApplyFilter) {
                originalApplyFilter.call(this);
            }
        };
    }
});