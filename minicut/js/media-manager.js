// MiniCut - 媒体管理模块

class MediaManager {
    constructor(editor) {
        this.editor = editor;
        this.mediaLibrary = [];
        this.uploadQueue = [];
        
        this.initMediaUpload();
        this.initDragAndDrop();
    }
    
    initMediaUpload() {
        const uploadBtn = document.getElementById('upload-btn');
        const mediaUpload = document.getElementById('media-upload');
        
        uploadBtn.addEventListener('click', () => {
            mediaUpload.click();
        });
        
        mediaUpload.addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files);
        });
        
        // 导入模板功能
        document.getElementById('import-template').addEventListener('click', () => {
            this.importTemplate();
        });
    }
    
    initDragAndDrop() {
        const mediaItems = document.getElementById('media-items');
        
        mediaItems.addEventListener('dragover', (e) => {
            e.preventDefault();
            mediaItems.classList.add('drag-over');
        });
        
        mediaItems.addEventListener('dragleave', (e) => {
            e.preventDefault();
            mediaItems.classList.remove('drag-over');
        });
        
        mediaItems.addEventListener('drop', (e) => {
            e.preventDefault();
            mediaItems.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            this.handleFileSelect(files);
        });
    }
    
    handleFileSelect(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (this.isValidMediaFile(file)) {
                this.addMediaFile(file);
            }
        }
    }
    
    isValidMediaFile(file) {
        const validTypes = [
            'video/mp4', 'video/mov', 'video/avi', 'video/mkv', 
            'video/webm', 'video/flv', 'video/wmv', 'video/quicktime',
            'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'
        ];
        
        return validTypes.includes(file.type) || 
               /\.(mp4|mov|avi|mkv|webm|flv|wmv|quicktime|jpeg|jpg|png|gif|webp|svg)$/i.test(file.name);
    }
    
    addMediaFile(file) {
        const mediaItem = {
            id: `media_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            file: file,
            name: file.name,
            size: this.formatFileSize(file.size),
            type: this.getFileType(file),
            thumbnail: null,
            duration: 0
        };
        
        this.mediaLibrary.push(mediaItem);
        this.generateThumbnail(mediaItem);
        this.renderMediaItem(mediaItem);
        
        // 如果这是第一个媒体文件，设置为预览
        if (this.mediaLibrary.length === 1) {
            this.editor.setPreviewSource(file);
        }
    }
    
    getFileType(file) {
        if (file.type.startsWith('video/')) {
            return 'video';
        } else if (file.type.startsWith('image/')) {
            return 'image';
        }
        return 'other';
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    generateThumbnail(mediaItem) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 60;
        
        // 对于图片，直接绘制缩略图
        if (mediaItem.type === 'image') {
            const img = new Image();
            const url = URL.createObjectURL(mediaItem.file);
            
            img.onload = () => {
                // 绘制缩略图
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                mediaItem.thumbnail = canvas.toDataURL();
                URL.revokeObjectURL(url);
            };
            
            img.src = url;
        }
        // 对于视频，使用第一个帧作为缩略图
        else if (mediaItem.type === 'video') {
            const video = document.createElement('video');
            const self = this;
            
            video.preload = 'metadata';
            video.onloadeddata = function() {
                // 设置视频时间为0并绘制第一帧
                video.currentTime = 0;
                
                video.onseeked = function() {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    mediaItem.thumbnail = canvas.toDataURL();
                    video.remove();
                };
            };
            
            video.onerror = function() {
                // 如果无法生成缩略图，使用默认图标
                self.drawDefaultIcon(ctx, mediaItem.type);
                mediaItem.thumbnail = canvas.toDataURL();
                video.remove();
            };
            
            video.src = URL.createObjectURL(mediaItem.file);
        }
    }
    
    drawDefaultIcon(ctx, type) {
        ctx.fillStyle = '#333';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        ctx.fillStyle = type === 'video' ? '#2196F3' : '#FF9800';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(type === 'video' ? '▶' : '🖼', ctx.canvas.width/2, ctx.canvas.height/2);
    }
    
    renderMediaItem(mediaItem) {
        const mediaItems = document.getElementById('media-items');
        
        // 如果之前显示的是占位符，移除它
        if (mediaItems.querySelector('.placeholder-message')) {
            mediaItems.innerHTML = '';
        }
        
        const mediaItemEl = document.createElement('div');
        mediaItemEl.className = `media-item ${mediaItem.type}`;
        mediaItemEl.draggable = true;
        mediaItemEl.dataset.id = mediaItem.id;
        
        // 创建缩略图或图标
        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'media-thumb';
        thumbDiv.innerHTML = `<i>${mediaItem.type === 'video' ? '▶' : '🖼'}</i>`;
        
        // 创建信息区域
        const infoDiv = document.createElement('div');
        infoDiv.className = 'media-info';
        infoDiv.innerHTML = `
            <div class="media-name">${mediaItem.name}</div>
            <div class="media-meta">${mediaItem.size} • ${mediaItem.type.toUpperCase()}</div>
        `;
        
        mediaItemEl.appendChild(thumbDiv);
        mediaItemEl.appendChild(infoDiv);
        
        // 添加拖拽事件
        this.setupDragEvents(mediaItemEl, mediaItem);
        
        // 添加点击事件，将媒体添加到时间轴
        mediaItemEl.addEventListener('click', () => {
            this.addToTimeline(mediaItem);
        });
        
        mediaItems.appendChild(mediaItemEl);
    }
    
    setupDragEvents(mediaItemEl, mediaItem) {
        mediaItemEl.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', mediaItem.id);
            e.dataTransfer.setData('media-item', JSON.stringify(mediaItem));
        });
    }
    
    addToTimeline(mediaItem) {
        // 将媒体文件添加到编辑器的时间轴
        const clip = this.editor.addMediaToTimeline(mediaItem.file);
        
        // 如果还没有预览视频，设置为当前视频
        if (!this.editor.previewVideo.src) {
            this.editor.setPreviewSource(mediaItem.file);
        }
    }
    
    importTemplate() {
        // 这里可以实现导入预设模板的功能
        const templates = [
            {
                name: '社交媒体视频',
                description: '适合社交媒体分享的视频模板',
                thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60" viewBox="0 0 100 60"><rect width="100" height="60" fill="%232196F3"/><text x="50" y="30" font-family="Arial" font-size="12" fill="white" text-anchor="middle">社交媒体</text></svg>'
            },
            {
                name: '产品展示',
                description: '用于展示产品的视频模板',
                thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60" viewBox="0 0 100 60"><rect width="100" height="60" fill="%234CAF50"/><text x="50" y="30" font-family="Arial" font-size="12" fill="white" text-anchor="middle">产品展示</text></svg>'
            },
            {
                name: '教程视频',
                description: '教育性质的教程视频模板',
                thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60" viewBox="0 0 100 60"><rect width="100" height="60" fill="%23FF9800"/><text x="50" y="30" font-family="Arial" font-size="12" fill="white" text-anchor="middle">教程</text></svg>'
            }
        ];
        
        // 显示模板选择对话框
        this.showTemplateDialog(templates);
    }
    
    showTemplateDialog(templates) {
        // 创建模板选择对话框
        const dialog = document.createElement('div');
        dialog.className = 'template-dialog';
        dialog.innerHTML = `
            <div class="dialog-overlay"></div>
            <div class="dialog-content">
                <div class="dialog-header">
                    <h3>选择模板</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="template-list">
                    ${templates.map(template => `
                        <div class="template-item" data-name="${template.name}">
                            <img src="${template.thumbnail}" alt="${template.name}">
                            <div class="template-info">
                                <h4>${template.name}</h4>
                                <p>${template.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // 关闭对话框
        dialog.querySelector('.close-btn').addEventListener('click', () => {
            document.body.removeChild(dialog);
        });
        
        dialog.querySelector('.dialog-overlay').addEventListener('click', () => {
            document.body.removeChild(dialog);
        });
        
        // 模板选择事件
        dialog.querySelectorAll('.template-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const templateName = e.currentTarget.dataset.name;
                alert(`选择了模板: ${templateName}\n\n在完整版本中，这将加载预设的项目配置。`);
                document.body.removeChild(dialog);
            });
        });
    }
    
    // 添加CSS样式到页面头部
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .template-dialog {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
            }
            
            .dialog-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
            }
            
            .dialog-content {
                position: relative;
                width: 80%;
                max-width: 800px;
                margin: 5% auto;
                background-color: #2d2d2d;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            }
            
            .dialog-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                border-bottom: 1px solid #333;
            }
            
            .dialog-header h3 {
                margin: 0;
                color: #4CAF50;
            }
            
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .template-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 15px;
                padding: 20px;
            }
            
            .template-item {
                background-color: #333;
                border: 1px solid #444;
                border-radius: 6px;
                padding: 10px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .template-item:hover {
                background-color: #3a3a3a;
                border-color: #4CAF50;
                transform: translateY(-2px);
            }
            
            .template-item img {
                width: 100%;
                height: 60px;
                object-fit: cover;
                border-radius: 4px;
                margin-bottom: 10px;
            }
            
            .template-item h4 {
                margin: 0 0 5px 0;
                color: #4CAF50;
            }
            
            .template-item p {
                margin: 0;
                font-size: 14px;
                color: #aaa;
            }
            
            .media-thumb {
                width: 40px;
                height: 40px;
                background-color: #333;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .media-thumb i {
                font-size: 20px;
            }
            
            .media-info {
                flex: 1;
                overflow: hidden;
            }
            
            .media-name {
                font-size: 14px;
                font-weight: 500;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .media-meta {
                font-size: 12px;
                color: #aaa;
            }
            
            .drag-over {
                border: 2px dashed #4CAF50;
                background-color: rgba(76, 175, 80, 0.1);
            }
        `;
        
        document.head.appendChild(style);
    }
}

// 扩展主编辑器以集成媒体管理功能
document.addEventListener('DOMContentLoaded', () => {
    if (window.videoEditor) {
        window.videoEditor.mediaManager = new MediaManager(window.videoEditor);
        window.videoEditor.mediaManager.addStyles();
    }
});