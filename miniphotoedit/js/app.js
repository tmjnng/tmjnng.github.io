// MiniPhotoEdit - 主应用脚本
class PhotoEditor {
    constructor() {
        this.canvas = document.getElementById('main-canvas');
        this.tempCanvas = document.getElementById('temp-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.tempCtx = this.tempCanvas.getContext('2d');
        
        this.currentTool = 'move';
        this.currentFilter = 'none';
        this.isDrawing = false;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.image = null;
        this.history = [];
        this.historyStep = -1;
        
        this.initEventListeners();
        this.setupCanvas();
    }
    
    initEventListeners() {
        // 工具选择
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.contains('tool-btn') ? 
                    e.target.classList.add('active') : 
                    e.target.parentElement.classList.add('active');
                
                this.currentTool = e.target.dataset.tool || e.target.parentElement.dataset.tool;
                this.onToolChange();
            });
        });
        
        // 滤镜选择
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                this.currentFilter = e.target.dataset.filter;
                this.applyFilter();
            });
        });
        
        // 图像上传
        const uploadBtn = document.getElementById('upload-btn');
        const imageUpload = document.getElementById('image-upload');
        
        console.log('初始化上传功能...');
        console.log('uploadBtn:', uploadBtn);
        console.log('imageUpload:', imageUpload);
        
        if (uploadBtn && imageUpload) {
            uploadBtn.addEventListener('click', () => {
                console.log('点击上传按钮');
                imageUpload.click();
            });
            
            imageUpload.addEventListener('change', (e) => {
                console.log('文件选择改变');
                const file = e.target.files[0];
                console.log('选择的文件:', file);
                
                if (file && file.type.match('image.*')) {
                    console.log('开始加载图片');
                    this.loadImage(file);
                } else {
                    console.error('无效的文件类型');
                }
            });
            
            console.log('上传功能初始化完成');
        } else {
            console.error("Upload button or image upload input not found!");
        }
        
        // 撤销/重做
        document.getElementById('undo-btn').addEventListener('click', () => this.undo());
        document.getElementById('redo-btn').addEventListener('click', () => this.redo());
        
        // 保存
        document.getElementById('save-btn').addEventListener('click', () => this.saveImage());
        
        // 旋转和翻转
        document.getElementById('rotate-left-btn').addEventListener('click', () => this.rotateImage(-90));
        document.getElementById('rotate-right-btn').addEventListener('click', () => this.rotateImage(90));
        document.getElementById('flip-horizontal-btn').addEventListener('click', () => this.flipImage('horizontal'));
        document.getElementById('flip-vertical-btn').addEventListener('click', () => this.flipImage('vertical'));
        
        // 重置
        document.getElementById('reset-btn').addEventListener('click', () => this.resetImage());
        
        // 画布事件
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('mouseout', (e) => this.handleMouseOut(e));
        
        // 调整参数
        document.getElementById('brightness').addEventListener('input', () => this.applyAdjustments());
        document.getElementById('contrast').addEventListener('input', () => this.applyAdjustments());
        document.getElementById('saturation').addEventListener('input', () => this.applyAdjustments());
        document.getElementById('hue').addEventListener('input', () => this.applyAdjustments());
        document.getElementById('blur').addEventListener('input', () => this.applyAdjustments());
    }
    
    setupCanvas() {
        // 设置画布初始尺寸
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.tempCanvas.width = 800;
        this.tempCanvas.height = 600;
        
        // 绘制占位符
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#95a5a6';
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('点击此处或拖拽图片到此处开始编辑', this.canvas.width / 2, this.canvas.height / 2);
        
        // 设置画布容器点击和拖拽上传
        this.setupCanvasUpload();
    }
    
    setupCanvasUpload() {
        const canvasContainer = document.querySelector('.canvas-container');
        if (!canvasContainer) return;
        
        // 点击画布容器触发上传（仅在没有图片时）
        canvasContainer.addEventListener('click', (e) => {
            if (!this.image && e.target === this.canvas) {
                console.log('点击画布，触发上传');
                document.getElementById('image-upload').click();
            }
        });
        
        // 拖拽上传
        canvasContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            canvasContainer.style.borderColor = '#3498db';
            canvasContainer.style.borderStyle = 'dashed';
            canvasContainer.style.borderWidth = '3px';
        });
        
        canvasContainer.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            canvasContainer.style.borderColor = '';
            canvasContainer.style.borderStyle = '';
            canvasContainer.style.borderWidth = '';
        });
        
        canvasContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // 恢复样式
            canvasContainer.style.borderColor = '';
            canvasContainer.style.borderStyle = '';
            canvasContainer.style.borderWidth = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (file.type.match('image.*')) {
                    console.log('拖拽上传图片:', file);
                    this.loadImage(file);
                } else {
                    alert('请拖拽图片文件！');
                }
            }
        });
    }
    
    loadImage(file) {
        console.log('loadImage被调用，文件:', file);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log('FileReader读取完成');
            const img = new Image();
            img.onload = () => {
                console.log('图片加载完成，尺寸:', img.width, 'x', img.height);
                
                // 调整画布大小以适应图片
                this.canvas.width = Math.min(img.width, 800);
                this.canvas.height = Math.min(img.height, 600);
                this.tempCanvas.width = this.canvas.width;
                this.tempCanvas.height = this.canvas.height;
                
                this.image = img;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
                
                // 重置画布容器样式
                const canvasContainer = document.querySelector('.canvas-container');
                if (canvasContainer) {
                    canvasContainer.style.borderColor = '';
                    canvasContainer.style.borderStyle = '';
                    canvasContainer.style.borderWidth = '';
                }
                
                // 保存历史记录
                this.saveState();
                
                console.log('图片加载并绘制完成');
            };
            img.onerror = () => {
                console.error('图片加载失败');
            };
            img.src = e.target.result;
        };
        reader.onerror = () => {
            console.error('FileReader读取失败');
        };
        reader.readAsDataURL(file);
    }
    
    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.dragStartX = x;
        this.dragStartY = y;
        
        switch(this.currentTool) {
            case 'move':
                this.isDragging = true;
                break;
            case 'brush':
                this.isDrawing = true;
                this.drawStart(x, y);
                break;
            case 'text':
                this.addText(x, y);
                break;
            case 'crop':
                // 裁剪工具的处理将在crop-tool.js中实现
                break;
        }
    }
    
    handleMouseMove(e) {
        if (!this.image) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (this.isDragging && this.currentTool === 'move') {
            // 移动图片（暂时简单实现）
        }
        
        if (this.isDrawing && this.currentTool === 'brush') {
            this.drawMove(x, y);
        }
    }
    
    handleMouseUp(e) {
        if (this.isDrawing) {
            this.drawEnd();
        }
        this.isDragging = false;
    }
    
    handleMouseOut(e) {
        if (this.isDrawing) {
            this.drawEnd();
        }
        this.isDragging = false;
    }
    
    onToolChange() {
        // 清除临时画布
        this.tempCtx.clearRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);
        
        switch(this.currentTool) {
            case 'crop':
                // 显示裁剪框
                document.getElementById('crop-overlay').style.display = 'block';
                break;
            default:
                // 隐藏裁剪框
                document.getElementById('crop-overlay').style.display = 'none';
        }
    }
    
    saveState() {
        // 限制历史记录数量
        if (this.historyStep < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyStep + 1);
        }
        
        // 创建当前画布状态的副本
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.history.push(imageData);
        this.historyStep = this.history.length - 1;
        
        // 启用/禁用撤销重做按钮
        document.getElementById('undo-btn').disabled = this.historyStep <= 0;
        document.getElementById('redo-btn').disabled = this.historyStep >= this.history.length - 1;
    }
    
    undo() {
        if (this.historyStep > 0) {
            this.historyStep--;
            this.ctx.putImageData(this.history[this.historyStep], 0, 0);
            
            document.getElementById('undo-btn').disabled = this.historyStep <= 0;
            document.getElementById('redo-btn').disabled = this.historyStep >= this.history.length - 1;
        }
    }
    
    redo() {
        if (this.historyStep < this.history.length - 1) {
            this.historyStep++;
            this.ctx.putImageData(this.history[this.historyStep], 0, 0);
            
            document.getElementById('undo-btn').disabled = this.historyStep <= 0;
            document.getElementById('redo-btn').disabled = this.historyStep >= this.history.length - 1;
        }
    }
    
    applyFilter() {
        if (!this.image) return;
        
        // 应用滤镜
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.filter = this.getFilterStyle();
        this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.filter = 'none'; // 重置滤镜
        
        // 保存状态到历史记录
        this.saveState();
    }
    
    getFilterStyle() {
        switch(this.currentFilter) {
            case 'grayscale':
                return 'grayscale(100%)';
            case 'sepia':
                return 'sepia(100%)';
            case 'invert':
                return 'invert(100%)';
            case 'vintage':
                return 'sepia(50%) contrast(120%) brightness(90%) saturate(80%)';
            case 'lomo':
                return 'contrast(150%) saturate(130%)';
            case 'clarity':
                return 'contrast(120%) saturate(120%) brightness(110%)';
            case 'hazy':
                return 'contrast(80%) saturate(130%) brightness(120%) blur(1px)';
            default:
                return 'none';
        }
    }
    
    applyAdjustments() {
        if (!this.image) return;
        
        const brightnessElement = document.getElementById('brightness');
        const contrastElement = document.getElementById('contrast');
        const saturationElement = document.getElementById('saturation');
        const hueElement = document.getElementById('hue');
        const blurElement = document.getElementById('blur');
        
        if (!(brightnessElement && contrastElement && saturationElement && hueElement && blurElement)) {
            console.error("Adjustment elements not found!");
            return;
        }
        
        const brightness = parseInt(brightnessElement.value);
        const contrast = parseInt(contrastElement.value);
        const saturation = parseInt(saturationElement.value);
        const hue = parseInt(hueElement.value);
        const blur = parseFloat(blurElement.value);
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 组合所有调整效果
        this.ctx.filter = `
            brightness(${100 + brightness}%)
            contrast(${100 + contrast}%)
            saturate(${100 + saturation}%)
            hue-rotate(${hue}deg)
            blur(${blur}px)
        `;
        
        this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.filter = 'none'; // 重置滤镜
    }
    
    rotateImage(degrees) {
        if (!this.image) return;
        
        // 保存当前状态
        this.saveState();
        
        // 计算旋转后的新尺寸
        const radians = degrees * Math.PI / 180;
        const sin = Math.abs(Math.sin(radians));
        const cos = Math.abs(Math.cos(radians));
        const newWidth = this.image.height * sin + this.image.width * cos;
        const newHeight = this.image.height * cos + this.image.width * sin;
        
        // 创建临时画布进行旋转
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = newWidth;
        tempCanvas.height = newHeight;
        
        // 旋转并绘制图像
        tempCtx.translate(newWidth / 2, newHeight / 2);
        tempCtx.rotate(radians);
        tempCtx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
        
        // 更新主画布
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
        this.tempCanvas.width = newWidth;
        this.tempCanvas.height = newHeight;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(tempCanvas, 0, 0);
        
        // 更新引用图像
        this.image = new Image();
        this.image.src = tempCanvas.toDataURL();
    }
    
    flipImage(direction) {
        if (!this.image) return;
        
        // 保存当前状态
        this.saveState();
        
        // 创建临时画布进行翻转
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = this.image.width;
        tempCanvas.height = this.image.height;
        
        // 翻转并绘制图像
        tempCtx.save();
        if (direction === 'horizontal') {
            tempCtx.translate(this.image.width, 0);
            tempCtx.scale(-1, 1);
        } else if (direction === 'vertical') {
            tempCtx.translate(0, this.image.height);
            tempCtx.scale(1, -1);
        }
        tempCtx.drawImage(this.image, 0, 0);
        tempCtx.restore();
        
        // 更新主画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(tempCanvas, 0, 0);
        
        // 更新引用图像
        this.image = new Image();
        this.image.src = tempCanvas.toDataURL();
    }
    
    resetImage() {
        if (!this.image) return;
        
        // 恢复到原始图像
        this.canvas.width = this.image.naturalWidth;
        this.canvas.height = this.image.naturalHeight;
        this.tempCanvas.width = this.canvas.width;
        this.tempCanvas.height = this.canvas.height;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.image, 0, 0);
        
        // 重置所有调整滑块
        document.getElementById('brightness').value = 0;
        document.getElementById('contrast').value = 0;
        document.getElementById('saturation').value = 0;
        document.getElementById('hue').value = 0;
        document.getElementById('blur').value = 0;
        
        // 重置滤镜
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.filter-btn[data-filter="none"]').classList.add('active');
        this.currentFilter = 'none';
        
        // 清空历史记录
        this.history = [];
        this.historyStep = -1;
        document.getElementById('undo-btn').disabled = true;
        document.getElementById('redo-btn').disabled = true;
    }
    
    saveImage() {
        if (!this.image && !this.ctx) return;
        
        // 创建一个临时链接下载图片
        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    }
    
    // 画笔相关方法（将在draw-tool.js中扩展）
    drawStart(x, y) {
        this.isDrawing = true;
        this.tempCtx.beginPath();
        this.tempCtx.moveTo(x, y);
    }
    
    drawMove(x, y) {
        if (!this.isDrawing) return;
        
        // 获取画笔设置
        const brushSize = document.getElementById('brush-size').value;
        const brushColor = document.getElementById('brush-color').value;
        const brushOpacity = document.getElementById('brush-opacity').value / 100;
        
        this.tempCtx.globalCompositeOperation = 'source-over';
        this.tempCtx.lineWidth = brushSize;
        this.tempCtx.lineCap = 'round';
        this.tempCtx.lineJoin = 'round';
        this.tempCtx.strokeStyle = brushColor;
        this.tempCtx.globalAlpha = brushOpacity;
        
        this.tempCtx.lineTo(x, y);
        this.tempCtx.stroke();
    }
    
    drawEnd() {
        if (!this.isDrawing) return;
        
        // 将临时画布上的内容绘制到主画布上
        this.ctx.drawImage(this.tempCanvas, 0, 0);
        this.tempCtx.clearRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);
        
        this.isDrawing = false;
        this.saveState();
    }
    
    // 文字相关方法（将在text-tool.js中扩展）
    addText(x, y) {
        const text = document.getElementById('text-content').value || '双击编辑文字';
        const fontSize = document.getElementById('text-size').value;
        const fontFamily = document.getElementById('text-font').value;
        const color = document.getElementById('text-color').value;
        
        this.ctx.font = `${fontSize}px ${fontFamily}`;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
        
        this.saveState();
    }
}

// 初始化编辑器
document.addEventListener('DOMContentLoaded', () => {
    window.photoEditor = new PhotoEditor();
    
    // 更新画笔大小显示
    const brushSizeSlider = document.getElementById('brush-size');
    const brushSizeValue = document.getElementById('brush-size-value');
    brushSizeValue.textContent = brushSizeSlider.value;
    brushSizeSlider.addEventListener('input', () => {
        brushSizeValue.textContent = brushSizeSlider.value;
    });
    
    // 更新画笔透明度显示
    const brushOpacitySlider = document.getElementById('brush-opacity');
    const brushOpacityValue = document.getElementById('brush-opacity-value');
    brushOpacityValue.textContent = brushOpacitySlider.value + '%';
    brushOpacitySlider.addEventListener('input', () => {
        brushOpacityValue.textContent = brushOpacitySlider.value + '%';
    });
});