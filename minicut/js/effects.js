// MiniCut - 特效处理模块

class EffectsManager {
    constructor(editor) {
        this.editor = editor;
        this.effects = {
            fadeIn: this.applyFadeIn.bind(this),
            fadeOut: this.applyFadeOut.bind(this),
            motionBlur: this.applyMotionBlur.bind(this),
            colorCorrection: this.applyColorCorrection.bind(this),
            saturation: this.applySaturation.bind(this),
            contrast: this.applyContrast.bind(this),
            brightness: this.applyBrightness.bind(this),
            vignette: this.applyVignette.bind(this),
            tiltShift: this.applyTiltShift.bind(this),
            glitch: this.applyGlitch.bind(this)
        };
        this.activeEffects = new Map(); // 存储活动的特效
        
        this.initEffectControls();
    }
    
    initEffectControls() {
        // 绑定特效开关事件
        document.getElementById('fade-in').addEventListener('change', (e) => {
            this.toggleEffect('fadeIn', e.target.checked);
        });
        
        document.getElementById('fade-out').addEventListener('change', (e) => {
            this.toggleEffect('fadeOut', e.target.checked);
        });
        
        document.getElementById('motion-blur').addEventListener('change', (e) => {
            this.toggleEffect('motionBlur', e.target.checked);
        });
        
        // 颜色校正控制
        this.setupColorCorrectionControls();
    }
    
    setupColorCorrectionControls() {
        // 这里可以添加更多的颜色校正控制
        // 如饱和度、对比度、亮度滑块等
    }
    
    toggleEffect(effectName, enabled) {
        if (!this.editor.selectedClip) {
            console.warn('没有选中的片段，无法应用特效');
            return;
        }
        
        const clip = this.editor.selectedClip;
        
        if (enabled) {
            // 添加特效到片段
            if (!clip.effects) {
                clip.effects = [];
            }
            
            if (!clip.effects.includes(effectName)) {
                clip.effects.push(effectName);
            }
            
            // 应用特效
            this.applyEffectToClip(clip, effectName);
        } else {
            // 移除特效
            if (clip.effects) {
                const index = clip.effects.indexOf(effectName);
                if (index > -1) {
                    clip.effects.splice(index, 1);
                }
            }
            
            // 移除特效影响
            this.removeEffectFromClip(clip, effectName);
        }
    }
    
    applyEffectToClip(clip, effectName) {
        if (this.effects[effectName]) {
            this.effects[effectName](clip);
        }
    }
    
    removeEffectFromClip(clip, effectName) {
        // 移除特效的逆操作或重置
        // 根据不同的特效类型进行相应处理
        this.updatePreview();
    }
    
    applyFadeIn(clip) {
        // 模拟淡入效果
        console.log(`应用淡入效果到片段: ${clip.id}`);
        
        // 在实际实现中，这里会修改视频帧的透明度
        // 从0逐渐增加到1
        this.updatePreview();
    }
    
    applyFadeOut(clip) {
        // 模拟淡出效果
        console.log(`应用淡出效果到片段: ${clip.id}`);
        
        // 在实际实现中，这里会修改视频帧的透明度
        // 从1逐渐减少到0
        this.updatePreview();
    }
    
    applyMotionBlur(clip) {
        // 模拟运动模糊效果
        console.log(`应用运动模糊效果到片段: ${clip.id}`);
        
        // 在实际实现中，这里会对视频帧应用运动模糊滤镜
        this.updatePreview();
    }
    
    applyColorCorrection(clip, settings = {}) {
        // 颜色校正效果
        console.log(`应用颜色校正效果到片段: ${clip.id}`, settings);
        
        // 在实际实现中，这里会调整视频的颜色参数
        this.updatePreview();
    }
    
    applySaturation(clip, value = 1.0) {
        // 饱和度调整
        console.log(`应用饱和度调整到片段: ${clip.id}, 值: ${value}`);
        
        // 在实际实现中，这里会调整视频的饱和度
        this.updatePreview();
    }
    
    applyContrast(clip, value = 1.0) {
        // 对比度调整
        console.log(`应用对比度调整到片段: ${clip.id}, 值: ${value}`);
        
        // 在实际实现中，这里会调整视频的对比度
        this.updatePreview();
    }
    
    applyBrightness(clip, value = 0) {
        // 亮度调整
        console.log(`应用亮度调整到片段: ${clip.id}, 值: ${value}`);
        
        // 在实际实现中，这里会调整视频的亮度
        this.updatePreview();
    }
    
    applyVignette(clip) {
        // 暗角效果
        console.log(`应用暗角效果到片段: ${clip.id}`);
        
        // 在实际实现中，这里会对视频边缘应用暗角效果
        this.updatePreview();
    }
    
    applyTiltShift(clip) {
        // 移轴摄影效果
        console.log(`应用移轴效果到片段: ${clip.id}`);
        
        // 在实际实现中，这里会应用移轴摄影效果
        this.updatePreview();
    }
    
    applyGlitch(clip) {
        // 故障效果
        console.log(`应用故障效果到片段: ${clip.id}`);
        
        // 在实际实现中，这里会应用视频故障效果
        this.updatePreview();
    }
    
    updatePreview() {
        // 更新预览以反映特效变化
        // 在实际实现中，这里会重新渲染预览视频
        if (this.editor.previewVideo && this.editor.previewVideo.src) {
            // 特效将在视频播放时应用
        }
    }
    
    // 应用多个特效到片段
    applyMultipleEffects(clip, effectList) {
        for (const effectName of effectList) {
            this.applyEffectToClip(clip, effectName);
        }
    }
    
    // 移除多个特效
    removeMultipleEffects(clip, effectList) {
        for (const effectName of effectList) {
            this.removeEffectFromClip(clip, effectName);
        }
    }
    
    // 获取可用特效列表
    getAvailableEffects() {
        return Object.keys(this.effects);
    }
    
    // 创建预设特效组合
    createPreset(name, effectsList) {
        return {
            name: name,
            effects: effectsList,
            createdAt: new Date()
        };
    }
    
    // 应用预设特效
    applyPreset(clip, preset) {
        if (Array.isArray(preset.effects)) {
            this.applyMultipleEffects(clip, preset.effects);
        }
    }
    
    // 获取常用预设
    getCommonPresets() {
        return {
            cinematic: this.createPreset('电影感', ['saturation', 'contrast', 'vignette']),
            vintage: this.createPreset('复古', ['saturation', 'brightness', 'colorCorrection']),
            blackAndWhite: this.createPreset('黑白', ['saturation', 'contrast', 'brightness']),
            vibrant: this.createPreset('鲜艳', ['saturation', 'contrast', 'brightness'])
        };
    }
    
    // 调整片段的转场效果
    addTransition(clip, transitionType, duration = 1.0) {
        if (!clip.transitions) {
            clip.transitions = {};
        }
        
        clip.transitions[transitionType] = {
            type: transitionType,
            duration: duration,
            applied: true
        };
        
        console.log(`为片段 ${clip.id} 添加转场效果: ${transitionType}, 持续时间: ${duration}秒`);
    }
    
    // 移除转场效果
    removeTransition(clip, transitionType) {
        if (clip.transitions && clip.transitions[transitionType]) {
            delete clip.transitions[transitionType];
        }
    }
    
    // 应用转场效果
    applyTransition(clip, transitionType) {
        if (clip.transitions && clip.transitions[transitionType]) {
            console.log(`应用转场效果: ${transitionType} 到片段 ${clip.id}`);
            // 实际转场效果会在片段之间播放时应用
        }
    }
    
    // 获取所有转场类型
    getTransitionTypes() {
        return [
            'fade',      // 淡入淡出
            'slide',     // 滑动
            'wipe',      // 擦除
            'zoom',      // 缩放
            'slideZoom', // 滑动缩放
            'cube',      // 立方体
            'flip'       // 翻转
        ];
    }
    
    // 创建转场预设
    createTransitionPreset(name, transition, duration) {
        return {
            name: name,
            transition: transition,
            duration: duration
        };
    }
    
    // 应用转场预设
    applyTransitionPreset(clip, preset) {
        this.addTransition(clip, preset.transition, preset.duration);
    }
    
    // 导出特效设置
    exportEffects() {
        const exportedEffects = {};
        
        for (const clip of this.editor.clips) {
            if (clip.effects && clip.effects.length > 0) {
                exportedEffects[clip.id] = {
                    effects: [...clip.effects],
                    transitions: clip.transitions ? {...clip.transitions} : {}
                };
            }
        }
        
        return exportedEffects;
    }
    
    // 导入特效设置
    importEffects(effectsData) {
        for (const clipId in effectsData) {
            const clip = this.editor.clips.find(c => c.id === clipId);
            if (clip) {
                // 应用特效
                clip.effects = [...effectsData[clipId].effects];
                
                // 应用转场
                if (effectsData[clipId].transitions) {
                    clip.transitions = {...effectsData[clipId].transitions};
                }
                
                // 重新应用特效
                for (const effect of clip.effects) {
                    this.applyEffectToClip(clip, effect);
                }
            }
        }
    }
    
    // 重置片段的所有特效
    resetClipEffects(clip) {
        if (clip.effects) {
            // 移除所有特效
            for (const effect of clip.effects) {
                this.removeEffectFromClip(clip, effect);
            }
            clip.effects = [];
        }
        
        if (clip.transitions) {
            clip.transitions = {};
        }
    }
    
    // 批量应用特效到多个片段
    batchApplyEffect(clipIds, effectName) {
        for (const clipId of clipIds) {
            const clip = this.editor.clips.find(c => c.id === clipId);
            if (clip) {
                this.toggleEffect(effectName, true);
            }
        }
    }
    
    // 获取当前片段的特效信息
    getClipEffectsInfo(clip) {
        return {
            effects: clip.effects || [],
            transitions: clip.transitions || {},
            hasEffects: !!(clip.effects && clip.effects.length > 0),
            hasTransitions: !!(clip.transitions && Object.keys(clip.transitions).length > 0)
        };
    }
    
    // 更新选中片段的特效
    updateSelectedClipEffects() {
        if (this.editor.selectedClip) {
            // 更新UI以反映当前特效状态
            this.updateEffectUI(this.editor.selectedClip);
        }
    }
    
    // 更新特效UI
    updateEffectUI(clip) {
        const effectsInfo = this.getClipEffectsInfo(clip);
        
        // 更新复选框状态
        document.getElementById('fade-in').checked = effectsInfo.effects.includes('fadeIn');
        document.getElementById('fade-out').checked = effectsInfo.effects.includes('fadeOut');
        document.getElementById('motion-blur').checked = effectsInfo.effects.includes('motionBlur');
    }
}

// 扩展主编辑器以集成特效管理功能
document.addEventListener('DOMContentLoaded', () => {
    if (window.videoEditor) {
        window.videoEditor.effectsManager = new EffectsManager(window.videoEditor);
        
        // 重写选中片段的方法，集成特效UI更新
        const originalSelectClip = window.videoEditor.selectClip;
        window.videoEditor.selectClip = function(clip) {
            originalSelectClip.call(this, clip);
            
            // 更新特效UI
            if (this.effectsManager) {
                this.effectsManager.updateEffectUI(clip);
            }
        };
    }
});