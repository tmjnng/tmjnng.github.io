class SnapPicEdit {
    constructor() {
        this.images = [];
        this.currentImageIndex = 0;
        this.canvas = document.getElementById('preview-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }

    init() {
        this.bindEvents();
        this.initCanvas();
        this.loadImages();
    }

    bindEvents() {
        // 图片上传事件
        document.getElementById('image-upload').addEventListener('change', (e) => this.handleImageUpload(e));
        
        // 分辨率设置事件
        document.getElementById('width-input').addEventListener('input', () => this.updateCanvas());
        document.getElementById('height-input').addEventListener('input', () => this.updateCanvas());
        document.getElementById('keep-ratio').addEventListener('change', () => this.updateCanvas());
        
        // 背景色事件
        document.getElementById('background-color').addEventListener('input', () => this.updateCanvas());
        document.getElementById('transparent-bg').addEventListener('change', () => this.updateCanvas());
        
        // 缩放模式事件
        document.getElementById('scale-mode').addEventListener('change', () => this.updateCanvas());
        
        // 文字水印事件
        document.getElementById('watermark-text').addEventListener('input', () => this.updateCanvas());
        document.getElementById('watermark-font').addEventListener('change', () => this.updateCanvas());
        document.getElementById('watermark-size').addEventListener('input', () => this.updateCanvas());
        document.getElementById('watermark-color').addEventListener('input', () => this.updateCanvas());
        document.getElementById('watermark-position').addEventListener('change', () => this.updateCanvas());
        
        // 图片处理事件
        document.getElementById('quality-slider').addEventListener('input', (e) => {
            document.getElementById('quality-value').textContent = e.target.value;
            this.updateCanvas();
        });
        document.getElementById('output-format').addEventListener('change', () => this.updateCanvas());
        
        // 高级功能事件
        document.getElementById('extract-colors').addEventListener('click', () => this.extractColors());
        document.getElementById('chroma-key').addEventListener('change', (e) => {
            document.getElementById('chroma-color').disabled = !e.target.checked;
            this.updateCanvas();
        });
        document.getElementById('chroma-color').addEventListener('input', () => this.updateCanvas());
        document.getElementById('generate-thumbnail').addEventListener('change', (e) => {
            document.getElementById('thumbnail-size').disabled = !e.target.checked;
            this.updateCanvas();
        });
        document.getElementById('thumbnail-size').addEventListener('input', () => this.updateCanvas());

        
        // 导出事件
        document.getElementById('export-single').addEventListener('click', () => this.exportImage());
        document.getElementById('export-batch').addEventListener('click', () => this.exportBatch());
        
        // 语言选择事件
        document.getElementById('language-selector').addEventListener('change', (e) => {
            updateLanguage(e.target.value);
        });
    }

    initCanvas() {
        const width = parseInt(document.getElementById('width-input').value);
        const height = parseInt(document.getElementById('height-input').value);
        this.canvas.width = width;
        this.canvas.height = height;
        this.clearCanvas();
    }

    clearCanvas() {
        const transparent = document.getElementById('transparent-bg').checked;
        if (transparent) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            const bgColor = document.getElementById('background-color').value;
            this.ctx.fillStyle = bgColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    handleImageUpload(e) {
        const files = e.target.files;
        if (files.length === 0) return;

        this.images = [];
        this.currentImageIndex = 0;

        Array.from(files).forEach((file, index) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        this.images.push({
                            file: file,
                            image: img,
                            url: event.target.result
                        });
                        this.updateImagePreview();
                        if (index === 0) {
                            this.updateCanvas();
                        }
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    updateImagePreview() {
        const container = document.getElementById('image-preview-container');
        container.innerHTML = '';

        this.images.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image.url;
            img.className = `image-preview ${index === this.currentImageIndex ? 'active' : ''}`;
            img.addEventListener('click', () => {
                this.currentImageIndex = index;
                this.updateImagePreview();
                this.updateCanvas();
            });
            container.appendChild(img);
        });
    }

    updateCanvas() {
        const width = parseInt(document.getElementById('width-input').value);
        const height = parseInt(document.getElementById('height-input').value);
        
        this.canvas.width = width;
        this.canvas.height = height;
        
        this.clearCanvas();
        
        if (this.images.length > 0) {
            this.drawCurrentImage();
            this.drawWatermark();
        }
    }

    drawCurrentImage() {
        if (this.images.length === 0) return;
        
        const image = this.images[this.currentImageIndex].image;
        const scaleMode = document.getElementById('scale-mode').value;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (scaleMode === 'contain') {
            // 等比缩放
            const scale = Math.min(this.canvas.width / image.width, this.canvas.height / image.height);
            drawWidth = image.width * scale;
            drawHeight = image.height * scale;
            offsetX = (this.canvas.width - drawWidth) / 2;
            offsetY = (this.canvas.height - drawHeight) / 2;
        } else {
            // 居中裁剪
            const scale = Math.max(this.canvas.width / image.width, this.canvas.height / image.height);
            drawWidth = image.width * scale;
            drawHeight = image.height * scale;
            offsetX = (this.canvas.width - drawWidth) / 2;
            offsetY = (this.canvas.height - drawHeight) / 2;
        }
        
        // 应用自动抠图
        if (document.getElementById('chroma-key').checked) {
            this.applyChromaKey(image, offsetX, offsetY, drawWidth, drawHeight);
        } else {
            this.ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
        }
    }

    applyChromaKey(image, x, y, width, height) {
        // 创建临时画布进行抠图
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = image.width;
        tempCanvas.height = image.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(image, 0, 0);
        
        const imageData = tempCtx.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;
        
        const chromaColor = document.getElementById('chroma-color').value;
        const [r, g, b] = this.hexToRgb(chromaColor);
        const threshold = 50;
        
        for (let i = 0; i < data.length; i += 4) {
            const dr = data[i] - r;
            const dg = data[i + 1] - g;
            const db = data[i + 2] - b;
            const distance = Math.sqrt(dr * dr + dg * dg + db * db);
            
            if (distance < threshold) {
                data[i + 3] = 0; // 设置透明度为0
            }
        }
        
        tempCtx.putImageData(imageData, 0, 0);
        this.ctx.drawImage(tempCanvas, x, y, width, height);
    }

    drawWatermark() {
        const text = document.getElementById('watermark-text').value;
        if (!text) return;
        
        const font = document.getElementById('watermark-font').value;
        const size = parseInt(document.getElementById('watermark-size').value);
        const color = document.getElementById('watermark-color').value;
        const position = document.getElementById('watermark-position').value;
        
        this.ctx.font = `${size}px ${font}`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        let x, y;
        switch (position) {
            case 'top-left':
                this.ctx.textAlign = 'left';
                this.ctx.textBaseline = 'top';
                x = 20;
                y = 20;
                break;
            case 'top-right':
                this.ctx.textAlign = 'right';
                this.ctx.textBaseline = 'top';
                x = this.canvas.width - 20;
                y = 20;
                break;
            case 'bottom-left':
                this.ctx.textAlign = 'left';
                this.ctx.textBaseline = 'bottom';
                x = 20;
                y = this.canvas.height - 20;
                break;
            case 'bottom-right':
                this.ctx.textAlign = 'right';
                this.ctx.textBaseline = 'bottom';
                x = this.canvas.width - 20;
                y = this.canvas.height - 20;
                break;
            default:
                x = this.canvas.width / 2;
                y = this.canvas.height / 2;
        }
        
        this.ctx.fillText(text, x, y);
    }



    extractColors() {
        if (this.images.length === 0) return;
        
        const image = this.images[this.currentImageIndex].image;
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, image.width, image.height);
        const colors = this.getDominantColors(imageData, 5);
        
        this.displayColorPalette(colors);
    }

    getDominantColors(imageData, count) {
        const data = imageData.data;
        const colorMap = new Map();
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            if (a > 128) {
                const color = `${r},${g},${b}`;
                colorMap.set(color, (colorMap.get(color) || 0) + 1);
            }
        }
        
        return Array.from(colorMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, count)
            .map(([color]) => {
                const [r, g, b] = color.split(',').map(Number);
                return this.rgbToHex(r, g, b);
            });
    }

    displayColorPalette(colors) {
        const container = document.getElementById('color-palette');
        container.innerHTML = '';
        
        colors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color;
            swatch.title = color;
            container.appendChild(swatch);
        });
    }

    exportImage() {
        if (this.images.length === 0) return;
        
        const format = document.getElementById('output-format').value;
        const quality = parseFloat(document.getElementById('quality-slider').value);
        
        let mimeType, extension;
        switch (format) {
            case 'jpg':
                mimeType = 'image/jpeg';
                extension = 'jpg';
                break;
            case 'png':
                mimeType = 'image/png';
                extension = 'png';
                break;
            case 'webp':
                mimeType = 'image/webp';
                extension = 'webp';
                break;
        }
        
        this.canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `edited-image-${Date.now()}.${extension}`;
            a.click();
            URL.revokeObjectURL(url);
        }, mimeType, quality);
    }

    exportBatch() {
        if (this.images.length === 0) return;
        
        const format = document.getElementById('output-format').value;
        const quality = parseFloat(document.getElementById('quality-slider').value);
        
        let mimeType, extension;
        switch (format) {
            case 'jpg':
                mimeType = 'image/jpeg';
                extension = 'jpg';
                break;
            case 'png':
                mimeType = 'image/png';
                extension = 'png';
                break;
            case 'webp':
                mimeType = 'image/webp';
                extension = 'webp';
                break;
        }
        
        this.images.forEach((image, index) => {
            this.currentImageIndex = index;
            this.updateCanvas();
            
            setTimeout(() => {
                this.canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `edited-image-${index + 1}-${Date.now()}.${extension}`;
                    a.click();
                    URL.revokeObjectURL(url);
                }, mimeType, quality);
            }, index * 300);
        });
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : [0, 0, 0];
    }

    rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    loadImages() {
        // 可以从localStorage加载保存的图片
        const savedImages = localStorage.getItem('snappicedit-images');
        if (savedImages) {
            try {
                const images = JSON.parse(savedImages);
                // 加载图片逻辑
            } catch (e) {
                console.error('Failed to load saved images:', e);
            }
        }
    }

    saveImages() {
        // 保存图片到localStorage
        const imageData = this.images.map(img => ({
            url: img.url,
            name: img.file.name
        }));
        localStorage.setItem('snappicedit-images', JSON.stringify(imageData));
    }
}

// 初始化应用
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new SnapPicEdit();
    window.app = app;
});

// 工具函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}