// MiniCut - 在线视频编辑器主应用

class VideoEditor {
    constructor() {
        this.projectName = '未命名项目';
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.zoomLevel = 100; // 时间轴缩放级别
        this.clips = []; // 存储所有剪辑片段
        this.selectedClip = null;
        this.playbackRate = 1.0;
        this.volume = 1.0;
        this.isDragging = false;
        this.dragOffsetX = 0;
        
        this.previewVideo = document.getElementById('preview-video');
        this.playBtn = document.getElementById('play-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.currentTimeEl = document.getElementById('current-time');
        this.totalTimeEl = document.getElementById('total-time');
        this.playhead = document.getElementById('playhead');
        
        this.initEventListeners();
        this.initPreviewCanvas();
    }
    
    initEventListeners() {
        // 播放控制
        this.playBtn.addEventListener('click', () => this.play());
        this.pauseBtn.addEventListener('click', () => this.pause());
        
        // 项目控制
        document.getElementById('save-btn').addEventListener('click', () => this.saveProject());
        document.getElementById('export-btn').addEventListener('click', () => this.exportProject());
        document.getElementById('rename-project').addEventListener('click', () => this.renameProject());
        
        // 预览控制
        document.getElementById('zoom-in').addEventListener('click', () => this.zoomTimeline(10));
        document.getElementById('zoom-out').addEventListener('click', () => this.zoomTimeline(-10));
        
        // 属性面板控制
        document.getElementById('clip-volume').addEventListener('input', (e) => this.updateClipVolume(e.target.value));
        document.getElementById('clip-opacity').addEventListener('input', (e) => this.updateClipOpacity(e.target.value));
        document.getElementById('clip-speed').addEventListener('change', (e) => this.updateClipSpeed(e.target.value));
        document.getElementById('add-text-btn').addEventListener('click', () => this.addTextOverlay());
        
        // 监听视频时间更新
        this.previewVideo.addEventListener('timeupdate', () => this.onTimeUpdate());
        this.previewVideo.addEventListener('loadedmetadata', () => this.onMetadataLoaded());
        
        // 时间轴拖拽
        this.setupTimelineDrag();
    }
    
    initPreviewCanvas() {
        this.previewCanvas = document.getElementById('preview-canvas');
        this.previewCtx = this.previewCanvas.getContext('2d');
    }
    
    play() {
        if (this.previewVideo.src) {
            this.previewVideo.playbackRate = this.playbackRate;
            this.previewVideo.volume = this.volume;
            this.previewVideo.play();
            this.isPlaying = true;
            this.playBtn.style.display = 'none';
            this.pauseBtn.style.display = 'inline-block';
        }
    }
    
    pause() {
        this.previewVideo.pause();
        this.isPlaying = false;
        this.playBtn.style.display = 'inline-block';
        this.pauseBtn.style.display = 'none';
    }
    
    onTimeUpdate() {
        this.currentTime = this.previewVideo.currentTime;
        this.updatePlayheadPosition();
        this.updateCurrentTimeDisplay();
    }
    
    onMetadataLoaded() {
        this.duration = this.previewVideo.duration || 0;
        this.updateTotalTimeDisplay();
        this.setupTimelineRuler();
    }
    
    updatePlayheadPosition() {
        if (this.duration > 0) {
            const percentage = (this.currentTime / this.duration) * 100;
            this.playhead.style.left = `${percentage}%`;
        }
    }
    
    updateCurrentTimeDisplay() {
        this.currentTimeEl.textContent = this.formatTime(this.currentTime);
    }
    
    updateTotalTimeDisplay() {
        this.totalTimeEl.textContent = this.formatTime(this.duration);
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    setupTimelineRuler() {
        const ruler = document.getElementById('timeline-ruler');
        ruler.innerHTML = '';
        
        // 根据缩放级别创建刻度
        const scale = this.zoomLevel / 100;
        const totalPixels = this.duration * 20 * scale; // 假设每秒20像素
        
        for (let i = 0; i <= this.duration; i += 5) { // 每5秒一个标记
            const mark = document.createElement('div');
            mark.className = 'ruler-mark';
            mark.style.minWidth = `${100 * scale}px`;
            mark.setAttribute('data-time', this.formatTime(i));
            ruler.appendChild(mark);
        }
    }
    
    zoomTimeline(amount) {
        this.zoomLevel = Math.max(25, Math.min(200, this.zoomLevel + amount));
        document.getElementById('zoom-level').textContent = `${this.zoomLevel}%`;
        this.setupTimelineRuler(); // 重新设置尺子
    }
    
    addMediaToTimeline(mediaFile) {
        const clipId = `clip_${Date.now()}`;
        const duration = mediaFile.type.startsWith('video/') ? this.duration : 10; // 图片默认10秒
        
        const clip = {
            id: clipId,
            file: mediaFile,
            startTime: this.clips.length > 0 ? Math.max(...this.clips.map(c => c.startTime + c.duration)) : 0,
            duration: duration,
            type: mediaFile.type.startsWith('video/') ? 'video' : 
                   mediaFile.type.startsWith('image/') ? 'image' : 'unknown',
            volume: 100,
            opacity: 100,
            speed: 1.0,
            effects: [],
            position: { x: 0, y: 0 },
            size: { width: 100, height: 100 }
        };
        
        this.clips.push(clip);
        this.renderClip(clip);
        
        // 更新时间轴显示
        this.duration = Math.max(this.duration, clip.startTime + clip.duration);
        this.updateTotalTimeDisplay();
        this.setupTimelineRuler();
        
        return clip;
    }
    
    renderClip(clip) {
        let trackContainer;
        
        switch(clip.type) {
            case 'video':
            case 'image':
                trackContainer = document.getElementById('video-track');
                break;
            case 'audio':
                trackContainer = document.getElementById('audio-track');
                break;
            default:
                return;
        }
        
        const clipEl = document.createElement('div');
        clipEl.className = `clip ${clip.type}`;
        clipEl.id = clip.id;
        clipEl.textContent = clip.file.name.substring(0, 15) + (clip.file.name.length > 15 ? '...' : '');
        
        // 计算位置和大小
        const scale = this.zoomLevel / 100;
        const startPosition = (clip.startTime / this.duration) * 100;
        const widthPercentage = (clip.duration / this.duration) * 100;
        
        clipEl.style.left = `${startPosition}%`;
        clipEl.style.width = `${widthPercentage}%`;
        
        // 添加拖拽和调整大小功能
        this.makeClipDraggable(clipEl, clip);
        
        trackContainer.appendChild(clipEl);
    }
    
    makeClipDraggable(clipEl, clip) {
        let isResizingLeft = false;
        let isResizingRight = false;
        let dragStartX = 0;
        let originalStart = 0;
        let originalDuration = 0;
        
        // 添加调整大小手柄
        const leftHandle = document.createElement('div');
        leftHandle.className = 'clip-handle left';
        clipEl.appendChild(leftHandle);
        
        const rightHandle = document.createElement('div');
        rightHandle.className = 'clip-handle right';
        clipEl.appendChild(rightHandle);
        
        // 鼠标按下事件
        clipEl.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('clip-handle')) {
                isResizingLeft = e.target.classList.contains('left');
                isResizingRight = e.target.classList.contains('right');
            } else {
                this.selectClip(clip);
            }
            
            this.isDragging = true;
            dragStartX = e.clientX;
            originalStart = clip.startTime;
            originalDuration = clip.duration;
            
            e.preventDefault();
        });
        
        // 鼠标移动事件
        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging || !this.selectedClip) return;
            
            const deltaX = e.clientX - dragStartX;
            const timePerPixel = this.duration / document.getElementById('video-track').offsetWidth;
            const deltaTime = deltaX * timePerPixel;
            
            if (isResizingLeft) {
                // 调整左侧手柄
                const newStart = Math.max(0, originalStart + deltaTime);
                const newDuration = originalDuration - deltaTime;
                
                if (newDuration > 0.1) { // 最小持续时间为0.1秒
                    clip.startTime = newStart;
                    clip.duration = newDuration;
                    this.updateClipDisplay(clip);
                }
            } else if (isResizingRight) {
                // 调整右侧手柄
                const newDuration = Math.max(0.1, originalDuration + deltaTime);
                clip.duration = newDuration;
                this.updateClipDisplay(clip);
            } else {
                // 拖拽整个片段
                const newStart = Math.max(0, originalStart + deltaTime);
                clip.startTime = newStart;
                this.updateClipDisplay(clip);
            }
        });
        
        // 鼠标释放事件
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            isResizingLeft = false;
            isResizingRight = false;
        });
    }
    
    updateClipDisplay(clip) {
        const clipEl = document.getElementById(clip.id);
        if (!clipEl) return;
        
        const startPosition = (clip.startTime / this.duration) * 100;
        const widthPercentage = (clip.duration / this.duration) * 100;
        
        clipEl.style.left = `${startPosition}%`;
        clipEl.style.width = `${widthPercentage}%`;
    }
    
    selectClip(clip) {
        // 取消之前选中的片段
        if (this.selectedClip) {
            const prevSelected = document.getElementById(this.selectedClip.id);
            if (prevSelected) prevSelected.classList.remove('selected');
        }
        
        // 选中新片段
        this.selectedClip = clip;
        const clipEl = document.getElementById(clip.id);
        if (clipEl) clipEl.classList.add('selected');
        
        // 更新属性面板
        this.updatePropertiesPanel(clip);
    }
    
    updatePropertiesPanel(clip) {
        document.getElementById('clip-duration').value = `${clip.duration}秒`;
        document.getElementById('clip-volume').value = clip.volume;
        document.getElementById('volume-value').textContent = `${clip.volume}%`;
        document.getElementById('clip-opacity').value = clip.opacity;
        document.getElementById('opacity-value').textContent = `${clip.opacity}%`;
        document.getElementById('clip-speed').value = clip.speed;
    }
    
    updateClipVolume(volume) {
        if (this.selectedClip) {
            this.selectedClip.volume = parseInt(volume);
            document.getElementById('volume-value').textContent = `${volume}%`;
        }
    }
    
    updateClipOpacity(opacity) {
        if (this.selectedClip) {
            this.selectedClip.opacity = parseInt(opacity);
            document.getElementById('opacity-value').textContent = `${opacity}%`;
        }
    }
    
    updateClipSpeed(speed) {
        if (this.selectedClip) {
            this.selectedClip.speed = parseFloat(speed);
            this.playbackRate = parseFloat(speed);
            if (this.isPlaying) {
                this.previewVideo.playbackRate = this.playbackRate;
            }
        }
    }
    
    addTextOverlay() {
        const textContent = document.getElementById('text-overlay').value || '示例文字';
        const fontSize = document.getElementById('text-size').value;
        const fontFamily = document.getElementById('text-font').value;
        const color = document.getElementById('text-color').value;
        
        const clipId = `text_${Date.now()}`;
        const clip = {
            id: clipId,
            type: 'text',
            text: textContent,
            fontSize: fontSize,
            fontFamily: fontFamily,
            color: color,
            startTime: this.currentTime,
            duration: 5, // 文字默认持续5秒
            position: { x: 50, y: 80 }, // 百分比位置
            opacity: 100
        };
        
        this.clips.push(clip);
        this.renderTextClip(clip);
        
        // 更新时间轴显示
        this.duration = Math.max(this.duration, clip.startTime + clip.duration);
        this.updateTotalTimeDisplay();
        this.setupTimelineRuler();
    }
    
    renderTextClip(clip) {
        const trackContainer = document.getElementById('text-track');
        const clipEl = document.createElement('div');
        clipEl.className = `clip text`;
        clipEl.id = clip.id;
        clipEl.textContent = `文字: ${clip.text.substring(0, 8)}${clip.text.length > 8 ? '...' : ''}`;
        
        // 计算位置和大小
        const scale = this.zoomLevel / 100;
        const startPosition = (clip.startTime / this.duration) * 100;
        const widthPercentage = (clip.duration / this.duration) * 100;
        
        clipEl.style.left = `${startPosition}%`;
        clipEl.style.width = `${widthPercentage}%`;
        
        trackContainer.appendChild(clipEl);
        
        // 使文字片段也可选
        clipEl.addEventListener('click', () => this.selectClip(clip));
    }
    
    setupTimelineDrag() {
        const timelineArea = document.querySelector('.timeline-area');
        timelineArea.addEventListener('click', (e) => {
            if (e.target.classList.contains('timeline-area') || e.target.classList.contains('timeline-tracks')) {
                // 点击时间轴空白处，跳转到对应时间
                const rect = timelineArea.getBoundingClientRect();
                const clickX = e.clientX - rect.left - 80; // 减去轨道名称宽度
                const percentage = Math.max(0, Math.min(1, clickX / (rect.width - 80)));
                const newTime = percentage * this.duration;
                
                this.previewVideo.currentTime = newTime;
                this.currentTime = newTime;
                this.updatePlayheadPosition();
                this.updateCurrentTimeDisplay();
            }
        });
    }
    
    saveProject() {
        const projectData = {
            projectName: this.projectName,
            clips: this.clips,
            currentTime: this.currentTime,
            duration: this.duration,
            zoomLevel: this.zoomLevel
        };
        
        localStorage.setItem('webcut_project', JSON.stringify(projectData));
        alert('项目已保存！');
    }
    
    loadProject() {
        const projectData = localStorage.getItem('webcut_project');
        if (projectData) {
            const data = JSON.parse(projectData);
            this.projectName = data.projectName;
            this.clips = data.clips;
            this.currentTime = data.currentTime;
            this.duration = data.duration;
            this.zoomLevel = data.zoomLevel;
            
            document.getElementById('project-name').textContent = this.projectName;
            document.getElementById('zoom-level').textContent = `${this.zoomLevel}%`;
            
            // 重新渲染所有片段
            this.renderAllClips();
        }
    }
    
    renderAllClips() {
        // 清空现有片段
        ['video-track', 'audio-track', 'text-track'].forEach(trackId => {
            const track = document.getElementById(trackId);
            track.innerHTML = '';
        });
        
        // 重新渲染所有片段
        this.clips.forEach(clip => {
            if (clip.type === 'text') {
                this.renderTextClip(clip);
            } else {
                this.renderClip(clip);
            }
        });
        
        this.setupTimelineRuler();
    }
    
    exportProject() {
        // 这里应该集成浏览器端的视频合成库
        // 由于纯浏览器端无法直接合成视频，这里只提供概念实现
        alert('正在导出视频...\n\n注意：完整版WebCut需要使用FFmpeg.wasm或其他浏览器端视频处理库来实现真正的视频导出功能。');
    }
    
    renameProject() {
        const newName = prompt('请输入新项目名称:', this.projectName);
        if (newName) {
            this.projectName = newName;
            document.getElementById('project-name').textContent = newName;
        }
    }
    
    // 设置预览视频源
    setPreviewSource(file) {
        const url = URL.createObjectURL(file);
        this.previewVideo.src = url;
        
        // 当视频加载元数据后，更新时间轴
        this.previewVideo.onloadedmetadata = () => {
            this.duration = this.previewVideo.duration;
            this.updateTotalTimeDisplay();
            this.setupTimelineRuler();
        };
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.videoEditor = new VideoEditor();
    
    // 初始化音量和透明度显示
    document.getElementById('clip-volume').addEventListener('input', (e) => {
        document.getElementById('volume-value').textContent = `${e.target.value}%`;
    });
    
    document.getElementById('clip-opacity').addEventListener('input', (e) => {
        document.getElementById('opacity-value').textContent = `${e.target.value}%`;
    });
    
    // 设置默认项目名称
    document.getElementById('project-name').textContent = window.videoEditor.projectName;
});