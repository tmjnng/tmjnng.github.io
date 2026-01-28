// MiniPhotoEdit - 文字工具模块
class TextTool {
    constructor(editor) {
        this.editor = editor;
        this.isActive = false;
        this.isEditing = false;
        this.currentTextElement = null;
        this.textElements = []; // 存储所有文本元素
        this.selectedElement = null;
        
        this.initTextTool();
    }
    
    initTextTool() {
        // 监听双击事件来编辑文本
        this.editor.canvas.addEventListener('dblclick', (e) => {
            if (this.editor.currentTool === 'text' && this.isEditing) {
                this.finishTextEdit();
            }
        });
    }
    
    activate() {
        this.isActive = true;
    }
    
    deactivate() {
        this.isActive = false;
        if (this.isEditing) {
            this.finishTextEdit();
        }
    }
    
    addText(x, y) {
        const text = document.getElementById('text-content').value || '双击编辑文字';
        const fontSize = parseInt(document.getElementById('text-size').value);
        const fontFamily = document.getElementById('text-font').value;
        const color = document.getElementById('text-color').value;
        
        // 创建文本对象
        const textObj = {
            id: Date.now(), // 简单的ID生成
            content: text,
            x: x,
            y: y,
            fontSize: fontSize,
            fontFamily: fontFamily,
            color: color,
            rotation: 0,
            scaleX: 1,
            scaleY: 1
        };
        
        this.textElements.push(textObj);
        this.renderText(textObj);
        
        // 保存状态
        this.editor.saveState();
    }
    
    renderText(textObj) {
        // 保存当前状态
        this.editor.ctx.save();
        
        // 移动到文本位置
        this.editor.ctx.translate(textObj.x, textObj.y);
        this.editor.ctx.rotate(textObj.rotation * Math.PI / 180);
        this.editor.ctx.scale(textObj.scaleX, textObj.scaleY);
        
        // 设置文本样式
        this.editor.ctx.font = `${textObj.fontSize}px ${textObj.fontFamily}`;
        this.editor.ctx.fillStyle = textObj.color;
        this.editor.ctx.textAlign = 'left';
        this.editor.ctx.textBaseline = 'top';
        
        // 绘制文本
        this.editor.ctx.fillText(textObj.content, 0, 0);
        
        // 恢复状态
        this.editor.ctx.restore();
    }
    
    renderAllTexts() {
        // 清除画布（保留底图）
        const imageData = this.editor.ctx.getImageData(0, 0, this.editor.canvas.width, this.editor.canvas.height);
        this.editor.ctx.putImageData(imageData, 0, 0);
        
        // 重新绘制所有文本
        this.textElements.forEach(textObj => {
            this.renderText(textObj);
        });
    }
    
    startTextEdit(elementId) {
        const textObj = this.textElements.find(t => t.id === elementId);
        if (!textObj) return;
        
        this.selectedElement = textObj;
        this.isEditing = true;
        
        // 创建输入框
        const input = document.createElement('input');
        input.type = 'text';
        input.value = textObj.content;
        input.style.position = 'absolute';
        input.style.left = (textObj.x) + 'px';
        input.style.top = (textObj.y) + 'px';
        input.style.fontSize = textObj.fontSize + 'px';
        input.style.fontFamily = textObj.fontFamily;
        input.style.color = textObj.color;
        input.style.border = '1px solid #3498db';
        input.style.padding = '5px';
        input.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        input.style.zIndex = '1000';
        
        document.body.appendChild(input);
        input.focus();
        input.select();
        
        this.currentTextElement = input;
        
        // 监听回车键或失焦事件
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.finishTextEdit();
            } else if (e.key === 'Escape') {
                document.body.removeChild(input);
                this.isEditing = false;
            }
        });
        
        input.addEventListener('blur', () => {
            setTimeout(() => {
                if (this.isEditing) {
                    this.finishTextEdit();
                }
            }, 100);
        });
    }
    
    finishTextEdit() {
        if (this.currentTextElement && this.selectedElement) {
            // 更新文本内容
            this.selectedElement.content = this.currentTextElement.value;
            
            // 重新渲染所有文本
            this.renderAllTexts();
            
            // 移除输入框
            document.body.removeChild(this.currentTextElement);
            
            // 保存状态
            this.editor.saveState();
        }
        
        this.currentTextElement = null;
        this.selectedElement = null;
        this.isEditing = false;
    }
    
    deleteText(elementId) {
        this.textElements = this.textElements.filter(t => t.id !== elementId);
        this.renderAllTexts();
        
        // 保存状态
        this.editor.saveState();
    }
    
    updateTextProperties(elementId, properties) {
        const textObj = this.textElements.find(t => t.id === elementId);
        if (!textObj) return;
        
        Object.assign(textObj, properties);
        this.renderAllTexts();
        
        // 保存状态
        this.editor.saveState();
    }
    
    // 选中文本元素
    selectText(x, y) {
        // 简单的碰撞检测，实际应用中可能需要更复杂的算法
        for (let i = this.textElements.length - 1; i >= 0; i--) {
            const textObj = this.textElements[i];
            
            // 获取文本的边界框
            this.editor.ctx.save();
            this.editor.ctx.font = `${textObj.fontSize}px ${textObj.fontFamily}`;
            const textWidth = this.editor.ctx.measureText(textObj.content).width;
            this.editor.ctx.restore();
            
            // 简单的矩形检测
            if (x >= textObj.x && x <= textObj.x + textWidth && 
                y >= textObj.y && y <= textObj.y + textObj.fontSize) {
                this.selectedElement = textObj;
                return textObj;
            }
        }
        
        this.selectedElement = null;
        return null;
    }
    
    // 移动文本
    moveText(elementId, newX, newY) {
        const textObj = this.textElements.find(t => t.id === elementId);
        if (!textObj) return;
        
        textObj.x = newX;
        textObj.y = newY;
        
        this.renderAllTexts();
    }
}

// 扩展主编辑器以集成文字功能
document.addEventListener('DOMContentLoaded', () => {
    if (window.photoEditor) {
        window.photoEditor.textTool = new TextTool(window.photoEditor);
        
        // 重写添加文本的方法
        const originalAddText = window.photoEditor.addText;
        window.photoEditor.addText = function(x, y) {
            if (this.currentTool === 'text' && this.textTool) {
                this.textTool.addText(x, y);
            } else if (originalAddText) {
                originalAddText.call(this, x, y);
            }
        };
        
        // 处理文本工具的选择事件
        const originalHandleMouseDown = window.photoEditor.handleMouseDown;
        window.photoEditor.handleMouseDown = function(e) {
            if (originalHandleMouseDown) {
                originalHandleMouseDown.call(this, e);
            }
            
            if (this.currentTool === 'text' && this.textTool) {
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // 如果点击了已存在的文本，则选中它
                const clickedText = this.textTool.selectText(x, y);
                if (clickedText) {
                    // 可以在这里添加选中文本的视觉反馈
                    console.log("选中文本:", clickedText);
                }
            }
        };
    }
});

// 添加文本样式预设
class TextStylePresets {
    static getPresets() {
        return {
            title: {
                fontSize: 36,
                fontFamily: 'SimHei',
                color: '#000000',
                fontWeight: 'bold'
            },
            subtitle: {
                fontSize: 24,
                fontFamily: 'SimSun',
                color: '#333333',
                fontWeight: 'normal'
            },
            caption: {
                fontSize: 16,
                fontFamily: 'Arial',
                color: '#666666',
                fontWeight: 'normal'
            },
            watermark: {
                fontSize: 48,
                fontFamily: 'Arial',
                color: 'rgba(255, 255, 255, 0.5)',
                fontWeight: 'bold'
            }
        };
    }
    
    static applyPreset(presetName, callback) {
        const presets = this.getPresets();
        const preset = presets[presetName];
        
        if (preset && callback) {
            // 更新UI控件
            if (preset.fontSize) document.getElementById('text-size').value = preset.fontSize;
            if (preset.fontFamily) document.getElementById('text-font').value = preset.fontFamily;
            if (preset.color) document.getElementById('text-color').value = preset.color.replace(/rgba?\([^)]+\)/, '#000000'); // 简单处理RGBA颜色
            
            // 更新显示值
            document.getElementById('text-size').dispatchEvent(new Event('input'));
            
            callback(preset);
        }
    }
}