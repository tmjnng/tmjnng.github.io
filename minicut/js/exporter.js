// MiniCut - 视频导出模块

class VideoExporter {
    constructor(editor) {
        this.editor = editor;
        this.isExporting = false;
        this.exportProgress = 0;
        this.exportQuality = 'medium'; // low, medium, high, lossless
        
        this.initExportControls();
    }
    
    initExportControls() {
        document.getElementById('export-btn').addEventListener('click', () => {
            this.showExportOptions();
        });
    }
    
    showExportOptions() {
        // 创建导出选项对话框
        const dialog = document.createElement('div');
        dialog.className = 'export-dialog';
        dialog.innerHTML = `
            <div class="dialog-overlay"></div>
            <div class="dialog-content">
                <div class="dialog-header">
                    <h3>导出视频</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="export-options">
                    <div class="option-group">
                        <label>视频尺寸</label>
                        <select id="export-resolution">
                            <option value="480">480p</option>
                            <option value="720" selected>720p</option>
                            <option value="1080">1080p</option>
                            <option value="1440">1440p</option>
                            <option value="2160">4K</option>
                        </select>
                    </div>
                    <div class="option-group">
                        <label>帧率</label>
                        <select id="export-fps">
                            <option value="24">24 fps</option>
                            <option value="30" selected>30 fps</option>
                            <option value="60">60 fps</option>
                        </select>
                    </div>
                    <div class="option-group">
                        <label>质量</label>
                        <select id="export-quality">
                            <option value="low">低质量</option>
                            <option value="medium" selected>中等质量</option>
                            <option value="high">高质量</option>
                            <option value="lossless">无损质量</option>
                        </select>
                    </div>
                    <div class="option-group">
                        <label>格式</label>
                        <select id="export-format">
                            <option value="mp4" selected>MP4</option>
                            <option value="webm">WebM</option>
                            <option value="mov">MOV</option>
                        </select>
                    </div>
                    <div class="option-group">
                        <label>文件名</label>
                        <input type="text" id="export-filename" value="${this.editor.projectName || 'webcut-video'}" placeholder="输入文件名">
                    </div>
                </div>
                <div class="dialog-actions">
                    <button id="cancel-export" class="btn">取消</button>
                    <button id="start-export" class="btn btn-success">开始导出</button>
                </div>
                <div id="export-progress" class="export-progress" style="display: none;">
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress-fill"></div>
                    </div>
                    <div class="progress-text" id="progress-text">准备导出...</div>
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
        
        dialog.querySelector('#cancel-export').addEventListener('click', () => {
            document.body.removeChild(dialog);
        });
        
        dialog.querySelector('#start-export').addEventListener('click', () => {
            this.startExport(
                dialog.querySelector('#export-resolution').value,
                dialog.querySelector('#export-fps').value,
                dialog.querySelector('#export-quality').value,
                dialog.querySelector('#export-format').value,
                dialog.querySelector('#export-filename').value
            );
        });
    }
    
    async startExport(resolution, fps, quality, format, filename) {
        const dialog = document.querySelector('.export-dialog');
        const progressEl = dialog.querySelector('#export-progress');
        const progressFill = dialog.querySelector('#progress-fill');
        const progressText = dialog.querySelector('#progress-text');
        
        progressEl.style.display = 'block';
        
        try {
            this.isExporting = true;
            this.exportProgress = 0;
            
            // 更新进度
            progressText.textContent = '正在分析项目...';
            progressFill.style.width = '10%';
            
            // 这里是概念性的导出实现
            // 实际的浏览器端视频导出需要使用如 FFmpeg.wasm 等库
            await this.simulateExportProcess();
            
            // 更新进度
            progressText.textContent = '正在处理视频帧...';
            progressFill.style.width = '40%';
            
            // 模拟处理过程
            await this.simulateProcessing();
            
            progressText.textContent = '正在编码视频...';
            progressFill.style.width = '70%';
            
            // 模拟编码过程
            await this.simulateEncoding();
            
            progressText.textContent = '正在生成文件...';
            progressFill.style.width = '90%';
            
            // 模拟文件生成
            await this.simulateFileGeneration();
            
            progressText.textContent = '导出完成！';
            progressFill.style.width = '100%';
            
            // 完成导出
            setTimeout(() => {
                this.completeExport(filename, format);
                if (dialog.parentNode) {
                    dialog.parentNode.removeChild(dialog);
                }
            }, 500);
            
        } catch (error) {
            console.error('导出失败:', error);
            progressText.textContent = '导出失败: ' + error.message;
            this.isExporting = false;
            
            // 5秒后自动关闭对话框
            setTimeout(() => {
                if (dialog.parentNode) {
                    dialog.parentNode.removeChild(dialog);
                }
            }, 5000);
        }
    }
    
    async simulateExportProcess() {
        // 模拟导出过程
        return new Promise(resolve => {
            setTimeout(resolve, 500);
        });
    }
    
    async simulateProcessing() {
        // 模拟处理过程
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    }
    
    async simulateEncoding() {
        // 模拟编码过程
        return new Promise(resolve => {
            setTimeout(resolve, 1500);
        });
    }
    
    async simulateFileGeneration() {
        // 模拟文件生成
        return new Promise(resolve => {
            setTimeout(resolve, 500);
        });
    }
    
    completeExport(filename, format) {
        // 在实际实现中，这里会生成真实的视频文件
        // 但由于浏览器限制，我们只能提供概念演示
        
        // 创建一个虚拟的视频文件（在实际应用中，这将来自真实的视频处理）
        const videoBlob = new Blob([], { type: `video/${format}` });
        const url = URL.createObjectURL(videoBlob);
        
        // 创建下载链接
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.${format}`;
        
        // 模拟下载
        setTimeout(() => {
            alert(`视频导出完成!

在实际应用中，这将下载一个真实的视频文件。

当前实现使用浏览器端技术，完整导出功能需要集成FFmpeg.wasm或其他视频处理库。`);
        }, 300);
        
        this.isExporting = false;
    }
    
    // 获取项目统计信息
    getProjectStats() {
        const totalDuration = this.editor.duration;
        const clipCount = this.editor.clips.length;
        const videoClips = this.editor.clips.filter(c => c.type === 'video').length;
        const imageClips = this.editor.clips.filter(c => c.type === 'image').length;
        const textClips = this.editor.clips.filter(c => c.type === 'text').length;
        
        return {
            totalDuration: totalDuration,
            clipCount: clipCount,
            videoClips: videoClips,
            imageClips: imageClips,
            textClips: textClips
        };
    }
    
    // 预估文件大小
    estimateFileSize(duration, resolution, quality) {
        // 简单的文件大小估算
        // 实际大小取决于编码效率、内容复杂度等因素
        let baseSizePerMinute = 50; // MB per minute for 720p medium quality
        
        // 分辨率调整因子
        const resolutionFactor = {
            '480': 0.5,
            '720': 1,
            '1080': 2,
            '1440': 4,
            '2160': 8
        }[resolution] || 1;
        
        // 质量调整因子
        const qualityFactor = {
            'low': 0.5,
            'medium': 1,
            'high': 2,
            'lossless': 4
        }[quality] || 1;
        
        const estimatedSize = (duration / 60) * baseSizePerMinute * resolutionFactor * qualityFactor;
        return Math.round(estimatedSize * 100) / 100; // 保留两位小数
    }
    
    // 检查浏览器是否支持导出功能
    checkBrowserSupport() {
        const support = {
            canvas: !!window.HTMLCanvasElement,
            video: !!document.createElement('video').canPlayType,
            blob: !!window.Blob,
            url: !!window.URL && !!window.URL.createObjectURL
        };
        
        // 检查支持的视频格式
        const videoEl = document.createElement('video');
        support.supportedFormats = {
            mp4: !!videoEl.canPlayType('video/mp4'),
            webm: !!videoEl.canPlayType('video/webm'),
            mov: false // 浏览器通常不支持直接编码MOV
        };
        
        return support;
    }
    
    // 优化导出设置建议
    suggestOptimalSettings() {
        const stats = this.getProjectStats();
        const browserSupport = this.checkBrowserSupport();
        
        // 根据项目复杂度和浏览器能力提供建议
        let suggestedResolution = '720';
        let suggestedQuality = 'medium';
        let suggestedFormat = 'mp4';
        
        // 如果项目较长或包含大量片段，建议较低的设置
        if (stats.totalDuration > 120 || stats.clipCount > 20) {
            suggestedQuality = 'medium';
            suggestedResolution = '720';
        }
        
        // 根据浏览器支持选择格式
        if (browserSupport.supportedFormats.mp4) {
            suggestedFormat = 'mp4';
        } else if (browserSupport.supportedFormats.webm) {
            suggestedFormat = 'webm';
        }
        
        return {
            resolution: suggestedResolution,
            quality: suggestedQuality,
            format: suggestedFormat,
            estimatedSize: this.estimateFileSize(stats.totalDuration, suggestedResolution, suggestedQuality)
        };
    }
    
    // 生成导出报告
    generateExportReport(settings) {
        const stats = this.getProjectStats();
        const estimatedSize = this.estimateFileSize(
            stats.totalDuration, 
            settings.resolution, 
            settings.quality
        );
        
        return {
            projectName: this.editor.projectName,
            exportSettings: settings,
            projectStats: stats,
            estimatedFileSize: estimatedSize,
            exportTime: new Date().toISOString(),
            browserSupport: this.checkBrowserSupport()
        };
    }
    
    // 导出项目为可分享的链接（概念性）
    exportAsLink() {
        // 在实际应用中，这可能会将项目数据上传到云端进行处理
        // 但在这里我们只提供概念演示
        const projectData = {
            projectName: this.editor.projectName,
            clips: this.editor.clips,
            duration: this.editor.duration,
            effects: this.editor.effectsManager ? this.editor.effectsManager.exportEffects() : {}
        };
        
        const encodedData = btoa(JSON.stringify(projectData));
        const shareableLink = `${window.location.origin}${window.location.pathname}?project=${encodedData}`;
        
        // 复制到剪贴板
        navigator.clipboard.writeText(shareableLink).then(() => {
            alert('项目分享链接已复制到剪贴板！');
        }).catch(err => {
            console.error('无法复制链接: ', err);
            alert('无法复制分享链接，请手动复制: ' + shareableLink);
        });
        
        return shareableLink;
    }
    
    // 导出项目数据
    exportProjectData() {
        const projectData = {
            projectName: this.editor.projectName,
            clips: this.editor.clips,
            duration: this.editor.duration,
            currentTime: this.editor.currentTime,
            zoomLevel: this.editor.zoomLevel,
            effects: this.editor.effectsManager ? this.editor.effectsManager.exportEffects() : {},
            timeline: this.editor.timelineManager ? this.editor.timelineManager.exportTimeline() : {}
        };
        
        const dataStr = JSON.stringify(projectData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = this.editor.projectName + '_project.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
    
    // 导入项目数据
    importProjectData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const projectData = JSON.parse(event.target.result);
                    
                    // 恢复项目数据
                    this.editor.projectName = projectData.projectName;
                    this.editor.clips = projectData.clips;
                    this.editor.duration = projectData.duration;
                    this.editor.currentTime = projectData.currentTime;
                    this.editor.zoomLevel = projectData.zoomLevel;
                    
                    // 更新UI
                    document.getElementById('project-name').textContent = this.editor.projectName;
                    
                    // 重新渲染时间轴
                    this.editor.renderAllClips();
                    
                    // 恢复特效设置
                    if (this.editor.effectsManager && projectData.effects) {
                        this.editor.effectsManager.importEffects(projectData.effects);
                    }
                    
                    // 恢复时间轴设置
                    if (this.editor.timelineManager && projectData.timeline) {
                        this.editor.timelineManager.importTimeline(projectData.timeline);
                    }
                    
                    resolve(projectData);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    }
}

// 扩展主编辑器以集成导出功能
document.addEventListener('DOMContentLoaded', () => {
    if (window.videoEditor) {
        window.videoEditor.exporter = new VideoExporter(window.videoEditor);
        
        // 重写导出项目方法
        const originalExport = window.videoEditor.exportProject;
        window.videoEditor.exportProject = function() {
            if (this.exporter) {
                // 显示导出选项而不是简单的警告
                this.exporter.showExportOptions();
            } else if (originalExport) {
                originalExport.call(this);
            }
        };
        
        // 添加额外的导出相关按钮事件
        const exportMenuBtn = document.createElement('button');
        exportMenuBtn.className = 'btn btn-small';
        exportMenuBtn.textContent = '项目';
        exportMenuBtn.id = 'project-menu-btn';
        
        // 将项目菜单按钮添加到界面中
        const headerRight = document.querySelector('.header-right');
        if (headerRight) {
            const saveBtn = document.getElementById('save-btn');
            if (saveBtn) {
                saveBtn.insertAdjacentElement('afterend', exportMenuBtn);
                
                exportMenuBtn.addEventListener('click', () => {
                    const menu = document.createElement('div');
                    menu.className = 'dropdown-menu';
                    menu.style.cssText = `
                        position: absolute;
                        background: #4a4a4a;
                        border: 1px solid #666;
                        border-radius: 4px;
                        padding: 10px;
                        z-index: 1000;
                        min-width: 150px;
                    `;
                    menu.innerHTML = `
                        <div class="menu-item" id="export-project-data">导出项目文件</div>
                        <div class="menu-item" id="import-project-data">导入项目文件</div>
                        <div class="menu-item" id="export-as-link">生成分享链接</div>
                    `;
                    
                    const rect = exportMenuBtn.getBoundingClientRect();
                    menu.style.top = rect.bottom + 'px';
                    menu.style.left = rect.left + 'px';
                    
                    document.body.appendChild(menu);
                    
                    // 导出项目数据
                    document.getElementById('export-project-data').addEventListener('click', () => {
                        window.videoEditor.exporter.exportProjectData();
                        document.body.removeChild(menu);
                    });
                    
                    // 导入项目数据
                    document.getElementById('import-project-data').addEventListener('click', () => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.json';
                        input.onchange = (e) => {
                            const file = e.target.files[0];
                            if (file) {
                                window.videoEditor.exporter.importProjectData(file)
                                    .then(() => console.log('项目导入成功'))
                                    .catch(err => console.error('项目导入失败:', err));
                            }
                        };
                        input.click();
                        document.body.removeChild(menu);
                    });
                    
                    // 生成分享链接
                    document.getElementById('export-as-link').addEventListener('click', () => {
                        window.videoEditor.exporter.exportAsLink();
                        document.body.removeChild(menu);
                    });
                    
                    // 点击外部关闭菜单
                    const closeMenu = (e) => {
                        if (!menu.contains(e.target) && e.target !== exportMenuBtn) {
                            document.body.removeChild(menu);
                            document.removeEventListener('click', closeMenu);
                        }
                    };
                    setTimeout(() => document.addEventListener('click', closeMenu), 100);
                });
            }
        }
    }
});

// 添加导出相关的CSS样式
document.addEventListener('DOMContentLoaded', () => {
    const exportStyles = document.createElement('style');
    exportStyles.textContent = `
        .export-dialog {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
        }
        
        .export-dialog .dialog-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
        }
        
        .export-dialog .dialog-content {
            position: relative;
            width: 80%;
            max-width: 600px;
            margin: 5% auto;
            background-color: #2d2d2d;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
        
        .export-dialog .dialog-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid #333;
        }
        
        .export-dialog .dialog-header h3 {
            margin: 0;
            color: #4CAF50;
        }
        
        .export-dialog .close-btn {
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
        
        .export-options {
            padding: 20px;
        }
        
        .option-group {
            margin-bottom: 15px;
        }
        
        .option-group label {
            display: block;
            margin-bottom: 5px;
            color: #ccc;
        }
        
        .option-group select,
        .option-group input {
            width: 100%;
            padding: 8px;
            background-color: #333;
            border: 1px solid #444;
            border-radius: 4px;
            color: white;
        }
        
        .export-dialog .dialog-actions {
            padding: 0 20px 20px;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
        
        .export-progress {
            padding: 0 20px 20px;
        }
        
        .progress-bar {
            width: 100%;
            height: 20px;
            background-color: #333;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(to right, #4CAF50, #2196F3);
            width: 0%;
            transition: width 0.3s ease;
        }
        
        .progress-text {
            text-align: center;
            color: #ccc;
            font-size: 14px;
        }
        
        .dropdown-menu {
            position: absolute;
            background: #4a4a4a;
            border: 1px solid #666;
            border-radius: 4px;
            padding: 5px 0;
            z-index: 1000;
            min-width: 150px;
        }
        
        .menu-item {
            padding: 8px 15px;
            cursor: pointer;
            color: white;
            font-size: 14px;
        }
        
        .menu-item:hover {
            background-color: #5a5a5a;
        }
    `;
    
    document.head.appendChild(exportStyles);
});