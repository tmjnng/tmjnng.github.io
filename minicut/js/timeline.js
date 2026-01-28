// MiniCut - 时间轴管理模块

class TimelineManager {
    constructor(editor) {
        this.editor = editor;
        this.tracks = {
            video: [],
            audio: [],
            text: []
        };
        this.playheadPosition = 0;
        this.scrollPosition = 0;
        this.isScrolling = false;
        
        this.initTimelineControls();
    }
    
    initTimelineControls() {
        // 时间轴滚动事件
        const timelineTracks = document.querySelector('.timeline-tracks');
        timelineTracks.addEventListener('scroll', (e) => {
            this.scrollPosition = timelineTracks.scrollLeft;
        });
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }
    
    handleKeyboardShortcuts(e) {
        // 空格键 - 播放/暂停
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            if (this.editor.isPlaying) {
                this.editor.pause();
            } else {
                this.editor.play();
            }
        }
        
        // J K L 快捷键（类似Premiere Pro）
        if (e.code === 'KeyJ') { // 倒退播放
            this.editor.previewVideo.playbackRate = -1;
            this.editor.previewVideo.play();
        }
        if (e.code === 'KeyK') { // 暂停
            this.editor.pause();
            this.editor.previewVideo.playbackRate = 1;
        }
        if (e.code === 'KeyL') { // 正常播放
            this.editor.previewVideo.playbackRate = 1;
            this.editor.play();
        }
        
        // 左右箭头键 - 跳转时间
        if (e.code === 'ArrowLeft') {
            this.seekRelative(-5); // 后退5秒
        }
        if (e.code === 'ArrowRight') {
            this.seekRelative(5); // 前进5秒
        }
        
        // 删除键 - 删除选中的片段
        if (e.code === 'Delete' && this.editor.selectedClip) {
            this.deleteSelectedClip();
        }
    }
    
    seekRelative(seconds) {
        const newTime = Math.max(0, Math.min(this.editor.duration, this.editor.currentTime + seconds));
        this.editor.previewVideo.currentTime = newTime;
        this.editor.currentTime = newTime;
        this.editor.updatePlayheadPosition();
        this.editor.updateCurrentTimeDisplay();
    }
    
    deleteSelectedClip() {
        if (this.editor.selectedClip) {
            const clipId = this.editor.selectedClip.id;
            
            // 从编辑器的片段列表中移除
            this.editor.clips = this.editor.clips.filter(clip => clip.id !== clipId);
            
            // 从DOM中移除
            const clipEl = document.getElementById(clipId);
            if (clipEl) {
                clipEl.remove();
            }
            
            // 清除选中状态
            this.editor.selectedClip = null;
            
            // 更新时间轴显示
            this.updateTimelineDisplay();
        }
    }
    
    updateTimelineDisplay() {
        // 重新计算项目总时长
        this.editor.duration = this.calculateProjectDuration();
        this.editor.updateTotalTimeDisplay();
        this.editor.setupTimelineRuler();
    }
    
    calculateProjectDuration() {
        let maxDuration = 0;
        
        for (const clip of this.editor.clips) {
            const end = clip.startTime + clip.duration;
            if (end > maxDuration) {
                maxDuration = end;
            }
        }
        
        return maxDuration || 10; // 默认至少10秒
    }
    
    // 添加片段到指定轨道
    addClipToTrack(clip, trackType) {
        if (!this.tracks[trackType]) {
            console.error(`Invalid track type: ${trackType}`);
            return false;
        }
        
        // 检查轨道冲突
        if (this.hasConflictInTrack(clip, trackType)) {
            // 尝试找到可用的位置
            clip.startTime = this.findAvailableSlot(clip, trackType);
        }
        
        this.tracks[trackType].push(clip);
        return true;
    }
    
    hasConflictInTrack(clip, trackType) {
        for (const existingClip of this.tracks[trackType]) {
            const clipEnd = clip.startTime + clip.duration;
            const existingEnd = existingClip.startTime + existingClip.duration;
            
            // 检查时间范围是否重叠
            if ((clip.startTime < existingEnd) && (clipEnd > existingClip.startTime)) {
                return true;
            }
        }
        return false;
    }
    
    findAvailableSlot(clip, trackType) {
        // 简单的实现：找到最后一个片段之后的位置
        if (this.tracks[trackType].length === 0) {
            return 0;
        }
        
        const lastClip = this.tracks[trackType][this.tracks[trackType].length - 1];
        return lastClip.startTime + lastClip.duration;
    }
    
    // 分割片段
    splitClip(clip, splitTime) {
        if (!clip || splitTime <= clip.startTime || splitTime >= clip.startTime + clip.duration) {
            return null;
        }
        
        const originalStartTime = clip.startTime;
        const originalDuration = clip.duration;
        
        // 更新原片段的持续时间
        clip.duration = splitTime - clip.startTime;
        
        // 创建新片段
        const newClip = {
            ...clip,
            id: `clip_${Date.now()}_split`,
            startTime: splitTime,
            duration: originalDuration - clip.duration,
            isSplitPart: true
        };
        
        // 添加新片段到轨道
        this.addClipToTrack(newClip, clip.type);
        
        return [clip, newClip];
    }
    
    // 合并相邻片段
    mergeClips(clip1, clip2) {
        if (!clip1 || !clip2 || clip1.type !== clip2.type) {
            return false;
        }
        
        // 检查片段是否相邻
        const areAdjacent = Math.abs((clip1.startTime + clip1.duration) - clip2.startTime) < 0.1 ||
                           Math.abs((clip2.startTime + clip2.duration) - clip1.startTime) < 0.1;
        
        if (!areAdjacent) {
            return false;
        }
        
        // 创建合并后的片段
        const mergedClip = {
            ...clip1,
            startTime: Math.min(clip1.startTime, clip2.startTime),
            duration: clip1.duration + clip2.duration
        };
        
        // 从轨道中移除原片段
        this.removeClipFromTrack(clip1);
        this.removeClipFromTrack(clip2);
        
        // 添加合并后的片段
        this.addClipToTrack(mergedClip, clip1.type);
        
        return mergedClip;
    }
    
    removeClipFromTrack(clip) {
        for (const trackType in this.tracks) {
            const index = this.tracks[trackType].findIndex(c => c.id === clip.id);
            if (index !== -1) {
                this.tracks[trackType].splice(index, 1);
                break;
            }
        }
    }
    
    // 调整片段速度
    changeClipSpeed(clip, factor) {
        if (!clip) return;
        
        const oldDuration = clip.duration;
        clip.duration = clip.duration / factor;
        clip.speed = clip.speed * factor;
        
        // 更新片段显示
        this.updateClipInTimeline(clip);
    }
    
    updateClipInTimeline(clip) {
        const clipEl = document.getElementById(clip.id);
        if (!clipEl) return;
        
        const scale = this.editor.zoomLevel / 100;
        const startPosition = (clip.startTime / this.editor.duration) * 100;
        const widthPercentage = (clip.duration / this.editor.duration) * 100;
        
        clipEl.style.left = `${startPosition}%`;
        clipEl.style.width = `${widthPercentage}%`;
    }
    
    // 调整片段音量
    changeClipVolume(clip, volumePercent) {
        if (!clip) return;
        
        clip.volume = volumePercent;
        
        // 在视频播放时应用音量变化
        if (this.editor.selectedClip === clip && this.editor.previewVideo) {
            this.editor.previewVideo.volume = volumePercent / 100;
        }
    }
    
    // 设置片段淡入淡出效果
    setFadeEffect(clip, fadeInDuration = 0, fadeOutDuration = 0) {
        if (!clip) return;
        
        clip.fadeIn = fadeInDuration;
        clip.fadeOut = fadeOutDuration;
        
        // 这里可以添加具体的淡入淡出实现逻辑
    }
    
    // 导出时间轴数据
    exportTimeline() {
        return {
            tracks: this.tracks,
            clips: this.editor.clips,
            duration: this.editor.duration,
            zoomLevel: this.editor.zoomLevel
        };
    }
    
    // 导入时间轴数据
    importTimeline(data) {
        if (data.tracks) {
            this.tracks = data.tracks;
        }
        
        if (data.clips) {
            this.editor.clips = data.clips;
        }
        
        if (data.duration) {
            this.editor.duration = data.duration;
        }
        
        if (data.zoomLevel) {
            this.editor.zoomLevel = data.zoomLevel;
        }
        
        // 重新渲染时间轴
        this.editor.renderAllClips();
    }
    
    // 获取指定时间的活动片段
    getActiveClipsAtTime(time) {
        const activeClips = [];
        
        for (const clip of this.editor.clips) {
            if (time >= clip.startTime && time <= clip.startTime + clip.duration) {
                activeClips.push(clip);
            }
        }
        
        return activeClips;
    }
    
    // 获取当前播放时间的片段
    getCurrentClips() {
        return this.getActiveClipsAtTime(this.editor.currentTime);
    }
    
    // 设置播放头位置
    setPlayheadPosition(time) {
        this.editor.previewVideo.currentTime = time;
        this.editor.currentTime = time;
        this.editor.updatePlayheadPosition();
        this.editor.updateCurrentTimeDisplay();
    }
    
    // 获取播放头当前位置
    getPlayheadPosition() {
        return this.editor.currentTime;
    }
    
    // 在指定时间插入片段
    insertClipAtTime(clip, time) {
        // 保存原始片段信息
        const originalStart = clip.startTime;
        const originalDuration = clip.duration;
        
        // 调整片段时间
        clip.startTime = time;
        
        // 检查是否有冲突
        if (this.hasConflictInTrack(clip, clip.type)) {
            // 如果有冲突，需要处理冲突（比如分割现有片段）
            this.handleInsertionConflict(clip);
        }
        
        // 添加到轨道
        this.addClipToTrack(clip, clip.type);
        
        return clip;
    }
    
    handleInsertionConflict(clip) {
        // 简单的冲突处理：将新片段放置在最后
        const lastClip = this.tracks[clip.type][this.tracks[clip.type].length - 1];
        if (lastClip) {
            clip.startTime = lastClip.startTime + lastClip.duration;
        } else {
            clip.startTime = 0;
        }
    }
    
    // 修剪片段（调整入点和出点）
    trimClip(clip, inPoint, outPoint) {
        if (!clip || inPoint >= outPoint) return false;
        
        // 计算新的开始时间和持续时间
        const newStartTime = clip.startTime + inPoint;
        const newDuration = outPoint - inPoint;
        
        // 保存原始值用于恢复
        clip.originalStartTime = clip.startTime;
        clip.originalDuration = clip.duration;
        
        // 应用新值
        clip.startTime = newStartTime;
        clip.duration = newDuration;
        
        // 更新显示
        this.updateClipInTimeline(clip);
        
        return true;
    }
    
    // 重置片段到原始状态
    resetClipToOriginal(clip) {
        if (clip.originalStartTime !== undefined && clip.originalDuration !== undefined) {
            clip.startTime = clip.originalStartTime;
            clip.duration = clip.originalDuration;
            
            // 清除原始值
            delete clip.originalStartTime;
            delete clip.originalDuration;
            
            // 更新显示
            this.updateClipInTimeline(clip);
        }
    }
}

// 扩展主编辑器以集成时间轴管理功能
document.addEventListener('DOMContentLoaded', () => {
    if (window.videoEditor) {
        window.videoEditor.timelineManager = new TimelineManager(window.videoEditor);
        
        // 重写添加媒体到时间轴的方法，集成时间轴管理
        const originalAddMediaToTimeline = window.videoEditor.addMediaToTimeline;
        window.videoEditor.addMediaToTimeline = function(mediaFile) {
            const clip = originalAddMediaToTimeline.call(this, mediaFile);
            
            // 使用时间轴管理器添加片段到轨道
            if (this.timelineManager) {
                this.timelineManager.addClipToTrack(clip, clip.type);
            }
            
            return clip;
        };
    }
});