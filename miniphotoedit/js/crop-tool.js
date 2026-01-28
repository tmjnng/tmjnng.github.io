// MiniPhotoEdit - 裁剪工具模块
class CropTool {
    constructor(editor) {
        this.editor = editor;
        this.isActive = false;
        this.isResizing = false;
        this.isMoving = false;
        this.cropBox = null;
        this.startX = 0;
        this.startY = 0;
        this.startRect = null;
        this.resizeDirection = null;
        
        this.initCropTool();
    }
    
    initCropTool() {
        this.cropOverlay = document.getElementById('crop-overlay');
        this.cropBox = document.querySelector('.crop-box');
        
        // 裁剪框事件监听
        this.cropBox.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('crop-handle')) {
                // 处理调整大小
                this.isResizing = true;
                this.resizeDirection = e.target.dataset.direction;
            } else {
                // 处理移动
                this.isMoving = true;
            }
            
            const rect = this.cropBox.getBoundingClientRect();
            const canvasRect = this.editor.canvas.getBoundingClientRect();
            
            this.startX = e.clientX;
            this.startY = e.clientY;
            this.startRect = {
                left: rect.left - canvasRect.left,
                top: rect.top - canvasRect.top,
                width: rect.width,
                height: rect.height
            };
            
            e.preventDefault();
        });
        
        // 鼠标移动事件
        document.addEventListener('mousemove', (e) => {
            if (this.isResizing || this.isMoving) {
                this.handleResizeMove(e);
            }
        });
        
        // 鼠标释放事件
        document.addEventListener('mouseup', () => {
            if (this.isResizing || this.isMoving) {
                this.handleResizeEnd();
            }
        });
    }
    
    activate() {
        this.isActive = true;
        this.showCropBox();
    }
    
    deactivate() {
        this.isActive = false;
        this.hideCropBox();
    }
    
    showCropBox() {
        this.cropOverlay.style.display = 'block';
        
        // 设置裁剪框为画布的一半大小，居中显示
        const canvas = this.editor.canvas;
        const boxSize = {
            width: canvas.width / 2,
            height: canvas.height / 2
        };
        
        this.cropBox.style.width = boxSize.width + 'px';
        this.cropBox.style.height = boxSize.height + 'px';
        this.cropBox.style.left = (canvas.width / 2 - boxSize.width / 2) + 'px';
        this.cropBox.style.top = (canvas.height / 2 - boxSize.height / 2) + 'px';
    }
    
    hideCropBox() {
        this.cropOverlay.style.display = 'none';
    }
    
    handleResizeMove(e) {
        if (!this.isActive) return;
        
        const deltaX = e.clientX - this.startX;
        const deltaY = e.clientY - this.startY;
        
        if (this.isResizing) {
            this.resizeCropBox(deltaX, deltaY);
        } else if (this.isMoving) {
            this.moveCropBox(deltaX, deltaY);
        }
        
        // 更新起始位置
        this.startX = e.clientX;
        this.startY = e.clientY;
        
        // 更新起始矩形
        const rect = this.cropBox.getBoundingClientRect();
        const canvasRect = this.editor.canvas.getBoundingClientRect();
        this.startRect = {
            left: rect.left - canvasRect.left,
            top: rect.top - canvasRect.top,
            width: rect.width,
            height: rect.height
        };
    }
    
    resizeCropBox(deltaX, deltaY) {
        const canvas = this.editor.canvas;
        const canvasRect = canvas.getBoundingClientRect();
        const cropRect = this.cropBox.getBoundingClientRect();
        
        let newLeft = this.startRect.left;
        let newTop = this.startRect.top;
        let newWidth = this.startRect.width;
        let newHeight = this.startRect.height;
        
        // 根据拖动方向调整裁剪框
        switch(this.resizeDirection) {
            case 'nw': // 左上角
                newLeft += deltaX;
                newTop += deltaY;
                newWidth -= deltaX;
                newHeight -= deltaY;
                break;
            case 'ne': // 右上角
                newTop += deltaY;
                newWidth += deltaX;
                newHeight -= deltaY;
                break;
            case 'sw': // 左下角
                newLeft += deltaX;
                newWidth -= deltaX;
                newHeight += deltaY;
                break;
            case 'se': // 右下角
                newWidth += deltaX;
                newHeight += deltaY;
                break;
            case 'n': // 上边
                newTop += deltaY;
                newHeight -= deltaY;
                break;
            case 'e': // 右边
                newWidth += deltaX;
                break;
            case 's': // 下边
                newHeight += deltaY;
                break;
            case 'w': // 左边
                newLeft += deltaX;
                newWidth -= deltaX;
                break;
        }
        
        // 边界检查
        newLeft = Math.max(0, newLeft);
        newTop = Math.max(0, newTop);
        newWidth = Math.max(20, newWidth); // 最小宽度
        newHeight = Math.max(20, newHeight); // 最小高度
        
        // 确保裁剪框不超过画布边界
        newLeft = Math.min(canvas.width - newWidth, newLeft);
        newTop = Math.min(canvas.height - newHeight, newTop);
        
        // 应用新尺寸
        this.cropBox.style.left = newLeft + 'px';
        this.cropBox.style.top = newTop + 'px';
        this.cropBox.style.width = newWidth + 'px';
        this.cropBox.style.height = newHeight + 'px';
    }
    
    moveCropBox(deltaX, deltaY) {
        const canvas = this.editor.canvas;
        const newLeft = Math.max(0, Math.min(
            this.startRect.left + deltaX,
            canvas.width - this.startRect.width
        ));
        const newTop = Math.max(0, Math.min(
            this.startRect.top + deltaY,
            canvas.height - this.startRect.height
        ));
        
        this.cropBox.style.left = newLeft + 'px';
        this.cropBox.style.top = newTop + 'px';
    }
    
    handleResizeEnd() {
        this.isResizing = false;
        this.isMoving = false;
        this.resizeDirection = null;
    }
    
    getCropArea() {
        const canvasRect = this.editor.canvas.getBoundingClientRect();
        const cropRect = this.cropBox.getBoundingClientRect();
        
        return {
            x: cropRect.left - canvasRect.left,
            y: cropRect.top - canvasRect.top,
            width: cropRect.width,
            height: cropRect.height
        };
    }
    
    performCrop() {
        if (!this.editor.image) return;
        
        const cropArea = this.getCropArea();
        
        // 创建新画布用于裁剪
        const croppedCanvas = document.createElement('canvas');
        const croppedCtx = croppedCanvas.getContext('2d');
        
        croppedCanvas.width = cropArea.width;
        croppedCanvas.height = cropArea.height;
        
        // 从原画布裁剪指定区域
        croppedCtx.drawImage(
            this.editor.canvas,
            cropArea.x, cropArea.y, cropArea.width, cropArea.height,
            0, 0, cropArea.width, cropArea.height
        );
        
        // 更新编辑器的画布
        this.editor.canvas.width = cropArea.width;
        this.editor.canvas.height = cropArea.height;
        this.editor.tempCanvas.width = cropArea.width;
        this.editor.tempCanvas.height = cropArea.height;
        
        this.editor.ctx.clearRect(0, 0, this.editor.canvas.width, this.editor.canvas.height);
        this.editor.ctx.drawImage(croppedCanvas, 0, 0);
        
        // 更新图像引用
        this.editor.image = new Image();
        this.editor.image.src = croppedCanvas.toDataURL();
        
        // 隐藏裁剪框
        this.hideCropBox();
        
        // 保存状态
        this.editor.saveState();
    }
}

// 扩展主编辑器以集成裁剪功能
document.addEventListener('DOMContentLoaded', () => {
    if (window.photoEditor) {
        window.photoEditor.cropTool = new CropTool(window.photoEditor);
        
        // 添加裁剪确认按钮事件
        // 我们可以添加一个上下文菜单或者按钮来执行裁剪
        document.addEventListener('keydown', (e) => {
            // 如果按下了Enter键且当前是裁剪工具
            if (e.key === 'Enter' && window.photoEditor.currentTool === 'crop' && window.photoEditor.cropTool.isActive) {
                window.photoEditor.cropTool.performCrop();
            }
            // 如果按下了ESC键，取消裁剪
            else if (e.key === 'Escape' && window.photoEditor.currentTool === 'crop') {
                window.photoEditor.cropTool.hideCropBox();
            }
        });
        
        // 重写工具更改处理以集成裁剪工具
        const originalOnToolChange = window.photoEditor.onToolChange;
        window.photoEditor.onToolChange = function() {
            if (originalOnToolChange) {
                originalOnToolChange.call(this);
            }
            
            if (this.currentTool === 'crop' && this.image) {
                if (this.cropTool) {
                    this.cropTool.activate();
                } else {
                    // 如果尚未初始化，则初始化
                    this.cropTool = new CropTool(this);
                    this.cropTool.activate();
                }
            } else if (this.cropTool) {
                this.cropTool.deactivate();
            }
        };
    }
});