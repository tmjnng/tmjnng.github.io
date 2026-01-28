// MiniPhotoEdit - 绘图工具模块
class DrawTool {
    constructor(editor) {
        this.editor = editor;
        this.isDrawing = false;
        this.isErasing = false;
        this.lastX = 0;
        this.lastY = 0;
        this.currentPath = [];
        this.paths = []; // 存储所有绘制路径
        this.currentShape = null;
        this.isCreatingShape = false;
        
        this.initDrawTool();
    }
    
    initDrawTool() {
        // 绑定鼠标事件
        this.editor.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.editor.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.editor.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.editor.canvas.addEventListener('mouseout', (e) => this.handleMouseOut(e));
    }
    
    handleMouseDown(e) {
        if (this.editor.currentTool !== 'brush' && this.editor.currentTool !== 'shape') return;
        
        const rect = this.editor.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.isDrawing = true;
        this.lastX = x;
        this.lastY = y;
        
        if (this.editor.currentTool === 'shape') {
            this.startShape(x, y);
        } else {
            this.startDrawing(x, y);
        }
    }
    
    handleMouseMove(e) {
        if (!this.isDrawing || !this.editor.image) return;
        
        const rect = this.editor.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (this.editor.currentTool === 'shape' && this.isCreatingShape) {
            this.updateShape(x, y);
        } else if (this.editor.currentTool === 'brush') {
            this.continueDrawing(x, y);
        }
        
        this.lastX = x;
        this.lastY = y;
    }
    
    handleMouseUp(e) {
        if (!this.isDrawing) return;
        
        if (this.editor.currentTool === 'shape' && this.isCreatingShape) {
            this.endShape();
        } else if (this.editor.currentTool === 'brush') {
            this.endDrawing();
        }
        
        this.isDrawing = false;
    }
    
    handleMouseOut(e) {
        if (this.isDrawing) {
            if (this.editor.currentTool === 'shape' && this.isCreatingShape) {
                this.endShape();
            } else if (this.editor.currentTool === 'brush') {
                this.endDrawing();
            }
            
            this.isDrawing = false;
        }
    }
    
    startDrawing(x, y) {
        // 开始新的绘制路径
        this.currentPath = [{
            x: x,
            y: y,
            tool: 'brush',
            size: parseInt(document.getElementById('brush-size').value),
            color: document.getElementById('brush-color').value,
            opacity: parseInt(document.getElementById('brush-opacity').value) / 100
        }];
        
        // 设置绘制样式
        this.editor.tempCtx.globalCompositeOperation = 'source-over';
        this.editor.tempCtx.lineWidth = this.currentPath[0].size;
        this.editor.tempCtx.lineCap = 'round';
        this.editor.tempCtx.lineJoin = 'round';
        this.editor.tempCtx.strokeStyle = this.currentPath[0].color;
        this.editor.tempCtx.globalAlpha = this.currentPath[0].opacity;
        
        this.editor.tempCtx.beginPath();
        this.editor.tempCtx.moveTo(x, y);
    }
    
    continueDrawing(x, y) {
        // 添加当前点到路径
        this.currentPath.push({
            x: x,
            y: y,
            tool: 'brush',
            size: parseInt(document.getElementById('brush-size').value),
            color: document.getElementById('brush-color').value,
            opacity: parseInt(document.getElementById('brush-opacity').value) / 100
        });
        
        // 绘制线条
        this.editor.tempCtx.lineTo(x, y);
        this.editor.tempCtx.stroke();
    }
    
    endDrawing() {
        if (this.currentPath.length > 0) {
            // 将路径添加到路径数组
            this.paths.push([...this.currentPath]);
            
            // 将临时画布内容绘制到主画布
            this.editor.ctx.drawImage(this.editor.tempCanvas, 0, 0);
            
            // 清除临时画布
            this.editor.tempCtx.clearRect(0, 0, this.editor.tempCanvas.width, this.editor.tempCanvas.height);
            
            // 保存状态
            this.editor.saveState();
        }
    }
    
    startShape(x, y) {
        this.isCreatingShape = true;
        this.currentShape = {
            startX: x,
            startY: y,
            endX: x,
            endY: y,
            type: 'rectangle', // 默认为矩形
            size: parseInt(document.getElementById('brush-size').value),
            color: document.getElementById('brush-color').value,
            opacity: parseInt(document.getElementById('brush-opacity').value) / 100
        };
    }
    
    updateShape(x, y) {
        if (!this.currentShape) return;
        
        // 更新形状结束点
        this.currentShape.endX = x;
        this.currentShape.endY = y;
        
        // 临时绘制形状以便预览
        this.editor.tempCtx.clearRect(0, 0, this.editor.tempCanvas.width, this.editor.tempCanvas.height);
        
        this.editor.tempCtx.globalCompositeOperation = 'source-over';
        this.editor.tempCtx.lineWidth = this.currentShape.size;
        this.editor.tempCtx.strokeStyle = this.currentShape.color;
        this.editor.tempCtx.globalAlpha = this.currentShape.opacity;
        this.editor.tempCtx.setLineDash([]);
        
        const width = this.currentShape.endX - this.currentShape.startX;
        const height = this.currentShape.endY - this.currentShape.startY;
        
        switch(this.currentShape.type) {
            case 'rectangle':
                this.editor.tempCtx.strokeRect(
                    this.currentShape.startX,
                    this.currentShape.startY,
                    width,
                    height
                );
                break;
                
            case 'circle':
                const radius = Math.sqrt(width * width + height * height);
                this.editor.tempCtx.beginPath();
                this.editor.tempCtx.arc(
                    this.currentShape.startX,
                    this.currentShape.startY,
                    radius,
                    0,
                    Math.PI * 2
                );
                this.editor.tempCtx.stroke();
                break;
                
            case 'line':
                this.editor.tempCtx.beginPath();
                this.editor.tempCtx.moveTo(this.currentShape.startX, this.currentShape.startY);
                this.editor.tempCtx.lineTo(this.currentShape.endX, this.currentShape.endY);
                this.editor.tempCtx.stroke();
                break;
        }
    }
    
    endShape() {
        if (this.currentShape) {
            // 将形状添加到路径数组
            this.paths.push({...this.currentShape});
            
            // 绘制最终形状到主画布
            this.editor.ctx.globalCompositeOperation = 'source-over';
            this.editor.ctx.lineWidth = this.currentShape.size;
            this.editor.ctx.strokeStyle = this.currentShape.color;
            this.editor.ctx.globalAlpha = this.currentShape.opacity;
            this.editor.ctx.setLineDash([]);
            
            const width = this.currentShape.endX - this.currentShape.startX;
            const height = this.currentShape.endY - this.currentShape.startY;
            
            switch(this.currentShape.type) {
                case 'rectangle':
                    this.editor.ctx.strokeRect(
                        this.currentShape.startX,
                        this.currentShape.startY,
                        width,
                        height
                    );
                    break;
                    
                case 'circle':
                    const radius = Math.sqrt(width * width + height * height);
                    this.editor.ctx.beginPath();
                    this.editor.ctx.arc(
                        this.currentShape.startX,
                        this.currentShape.startY,
                        radius,
                        0,
                        Math.PI * 2
                    );
                    this.editor.ctx.stroke();
                    break;
                    
                case 'line':
                    this.editor.ctx.beginPath();
                    this.editor.ctx.moveTo(this.currentShape.startX, this.currentShape.startY);
                    this.editor.ctx.lineTo(this.currentShape.endX, this.currentShape.endY);
                    this.editor.ctx.stroke();
                    break;
            }
            
            // 清除临时画布
            this.editor.tempCtx.clearRect(0, 0, this.editor.tempCanvas.width, this.editor.tempCanvas.height);
            
            // 保存状态
            this.editor.saveState();
            
            this.currentShape = null;
            this.isCreatingShape = false;
        }
    }
    
    // 橡皮擦功能
    enableEraser() {
        this.isErasing = true;
        this.editor.tempCtx.globalCompositeOperation = 'destination-out';
    }
    
    disableEraser() {
        this.isErasing = false;
        this.editor.tempCtx.globalCompositeOperation = 'source-over';
    }
    
    // 清除画布
    clearCanvas() {
        if (confirm('确定要清除所有绘制内容吗？此操作不可撤销。')) {
            this.editor.ctx.clearRect(0, 0, this.editor.canvas.width, this.editor.canvas.height);
            this.editor.ctx.drawImage(this.editor.image, 0, 0, this.editor.canvas.width, this.editor.canvas.height);
            
            // 清空路径数组
            this.paths = [];
            this.currentPath = [];
            
            // 保存状态
            this.editor.saveState();
        }
    }
    
    // 更改画笔大小
    setBrushSize(size) {
        // 这个功能已经在UI中实现，这里提供接口
        document.getElementById('brush-size').value = size;
        document.getElementById('brush-size-value').textContent = size;
    }
    
    // 更改画笔颜色
    setBrushColor(color) {
        document.getElementById('brush-color').value = color;
    }
    
    // 更改画笔透明度
    setBrushOpacity(opacity) {
        document.getElementById('brush-opacity').value = opacity * 100;
        document.getElementById('brush-opacity-value').textContent = (opacity * 100) + '%';
    }
    
    // 绘制预设形状
    drawPresetShape(shapeType, centerX, centerY, size) {
        this.editor.ctx.save();
        this.editor.ctx.globalCompositeOperation = 'source-over';
        this.editor.ctx.lineWidth = parseInt(document.getElementById('brush-size').value);
        this.editor.ctx.strokeStyle = document.getElementById('brush-color').value;
        this.editor.ctx.globalAlpha = parseInt(document.getElementById('brush-opacity').value) / 100;
        
        switch(shapeType) {
            case 'arrow':
                this.drawArrow(centerX, centerY, size);
                break;
            case 'star':
                this.drawStar(centerX, centerY, size);
                break;
            case 'heart':
                this.drawHeart(centerX, centerY, size);
                break;
        }
        
        this.editor.ctx.restore();
        this.editor.saveState();
    }
    
    drawArrow(startX, startY, size) {
        const angle = Math.atan2(size, size);
        const headLength = size / 3;
        
        this.editor.ctx.beginPath();
        this.editor.ctx.moveTo(startX, startY);
        this.editor.ctx.lineTo(startX + size, startY);
        this.editor.ctx.lineTo(startX + size - headLength, startY - headLength);
        this.editor.ctx.moveTo(startX + size, startY);
        this.editor.ctx.lineTo(startX + size - headLength, startY + headLength);
        this.editor.ctx.stroke();
    }
    
    drawStar(centerX, centerY, size) {
        const spikes = 5;
        const outerRadius = size;
        const innerRadius = size / 2;
        
        let rot = Math.PI / 2 * 3;
        let x = centerX;
        let y = centerY;
        let step = Math.PI / spikes;
        
        this.editor.ctx.beginPath();
        this.editor.ctx.moveTo(centerX, centerY - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            x = centerX + Math.cos(rot) * outerRadius;
            y = centerY + Math.sin(rot) * outerRadius;
            this.editor.ctx.lineTo(x, y);
            rot += step;
            
            x = centerX + Math.cos(rot) * innerRadius;
            y = centerY + Math.sin(rot) * innerRadius;
            this.editor.ctx.lineTo(x, y);
            rot += step;
        }
        
        this.editor.ctx.lineTo(centerX, centerY - outerRadius);
        this.editor.ctx.closePath();
        this.editor.ctx.stroke();
    }
    
    drawHeart(centerX, centerY, size) {
        const heartSize = size / 2;
        this.editor.ctx.beginPath();
        this.editor.ctx.moveTo(centerX, centerY);
        
        // 左侧弧线
        this.editor.ctx.bezierCurveTo(
            centerX, centerY - heartSize / 2,
            centerX - heartSize, centerY - heartSize / 2,
            centerX - heartSize, centerY
        );
        
        // 左侧下弧线
        this.editor.ctx.bezierCurveTo(
            centerX - heartSize, centerY + heartSize,
            centerX, centerY + heartSize * 1.5,
            centerX, centerY + heartSize
        );
        
        // 右侧下弧线
        this.editor.ctx.bezierCurveTo(
            centerX, centerY + heartSize,
            centerX + heartSize, centerY + heartSize * 1.5,
            centerX + heartSize, centerY
        );
        
        // 右侧弧线
        this.editor.ctx.bezierCurveTo(
            centerX + heartSize, centerY - heartSize / 2,
            centerX, centerY - heartSize / 2,
            centerX, centerY
        );
        
        this.editor.ctx.closePath();
        this.editor.ctx.stroke();
    }
}

// 扩展主编辑器以集成绘图功能
document.addEventListener('DOMContentLoaded', () => {
    if (window.photoEditor) {
        window.photoEditor.drawTool = new DrawTool(window.photoEditor);
        
        // 重写绘图相关方法
        const originalDrawStart = window.photoEditor.drawStart;
        window.photoEditor.drawStart = function(x, y) {
            if (this.currentTool === 'brush' && this.drawTool) {
                this.drawTool.startDrawing(x, y);
            } else if (originalDrawStart) {
                originalDrawStart.call(this, x, y);
            }
        };
        
        const originalDrawMove = window.photoEditor.drawMove;
        window.photoEditor.drawMove = function(x, y) {
            if (this.currentTool === 'brush' && this.drawTool) {
                this.drawTool.continueDrawing(x, y);
            } else if (originalDrawMove) {
                originalDrawMove.call(this, x, y);
            }
        };
        
        const originalDrawEnd = window.photoEditor.drawEnd;
        window.photoEditor.drawEnd = function() {
            if (this.currentTool === 'brush' && this.drawTool) {
                this.drawTool.endDrawing();
            } else if (originalDrawEnd) {
                originalDrawEnd.call(this);
            }
        };
    }
});

// 绘图工具快捷键
document.addEventListener('keydown', (e) => {
    if (window.photoEditor && window.photoEditor.drawTool) {
        // 按E键切换橡皮擦
        if (e.key.toLowerCase() === 'e') {
            if (window.photoEditor.currentTool === 'brush') {
                if (window.photoEditor.drawTool.isErasing) {
                    window.photoEditor.drawTool.disableEraser();
                } else {
                    window.photoEditor.drawTool.enableEraser();
                }
            }
        }
        // 按C键清除画布
        else if (e.key.toLowerCase() === 'c') {
            if (window.photoEditor.currentTool === 'brush') {
                window.photoEditor.drawTool.clearCanvas();
            }
        }
    }
});