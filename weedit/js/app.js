document.addEventListener('DOMContentLoaded', function() {
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const copyBtn = document.getElementById('copy-btn');
    const templateBtns = document.querySelectorAll('.template-btn');
    
    // 初始化编辑器
    initEditor();
    
    // 初始化事件监听
    initEventListeners();
    
    // 初始化本地存储
    loadDraft();
    
    // 开始自动保存定时器
    startAutoSave();
    
    /**
     * 初始化编辑器
     */
    function initEditor() {
        if (!editor) {
            console.error('编辑器元素未找到');
            return;
        }
        
        // 设置默认内容
        if (!editor.innerHTML || !editor.innerHTML.trim()) {
            editor.innerHTML = '<p>在此输入内容...</p>';
        }
        
        // 初始预览
        updatePreview();
    }
    
    /**
     * 初始化事件监听
     */
    function initEventListeners() {
        if (!editor) {
            console.error('编辑器元素未找到，无法绑定事件');
            return;
        }
        
        // 编辑器内容变化时更新预览
        editor.addEventListener('input', function() {
            updatePreview();
        });
        
        // 安全粘贴功能
        editor.addEventListener('paste', handlePaste);
        
        // 样式模板按钮点击事件
        templateBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const template = this.dataset.template;
                insertTemplate(template);
            });
        });
        
        // 复制按钮点击事件
        copyBtn.addEventListener('click', copyToClipboard);
    }
    
    /**
     * 安全粘贴处理
     */
    function handlePaste(e) {
        e.preventDefault();
        
        // 获取粘贴的HTML内容
        let html = e.clipboardData.getData('text/html');
        
        if (!html) {
            // 如果没有HTML内容，使用纯文本
            const text = e.clipboardData.getData('text');
            document.execCommand('insertText', false, text);
            return;
        }
        
        // 清洗HTML内容
        const cleanedHtml = sanitizeForChat(html);
        
        // 插入清洗后的内容
        document.execCommand('insertHTML', false, cleanedHtml);
        
        // 更新预览
        updatePreview();
    }
    
    /**
     * 插入样式模板
     */
    function insertTemplate(type) {
        let templateHTML = '';
        
        switch (type) {
            case 'h1':
                templateHTML = '<h1 style="font-size:24px; font-weight:bold; margin:20px 0;">请输入标题</h1>';
                break;
            case 'p':
                templateHTML = '<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">请输入正文</p>';
                break;
            case 'blockquote':
                templateHTML = '<blockquote style="border-left:4px solid #1890ff; padding-left:16px; margin:16px 0; color:#666;">请输入引用内容</blockquote>';
                break;
            case 'hr':
                templateHTML = '<hr style="margin:24px 0; border:none; border-top:1px solid #e0e0e0;">';
                break;
            case 'small':
                templateHTML = '<small style="font-size:14px; color:#999;">请输入注释</small>';
                break;
        }
        
        // 插入模板
        document.execCommand('insertHTML', false, templateHTML);
        
        // 更新预览
        updatePreview();
    }
    
    /**
     * HTML清洗与标准化
     */
    function sanitizeForChat(htmlString) {
        // 处理空字符串或undefined
        if (!htmlString || htmlString === undefined || htmlString === null) {
            return '';
        }
        
        // 创建临时DOM元素
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
        
        // 允许的标签
        const allowedTags = ['p', 'h1', 'h2', 'h3', 'img', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'hr', 'small', 'br'];
        
        // 递归清洗节点
        function cleanNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                return node;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const tagName = node.tagName.toLowerCase();
                
                // 检查是否为允许的标签
                if (!allowedTags.includes(tagName)) {
                    // 对于不允许的标签，保留其内容
                    const fragment = document.createDocumentFragment();
                    while (node.firstChild) {
                        fragment.appendChild(cleanNode(node.firstChild));
                    }
                    return fragment;
                }
                
                // 移除class和id属性
                node.removeAttribute('class');
                node.removeAttribute('id');
                
                // 处理样式，确保内联样式
                if (node.style.length === 0) {
                    if (tagName === 'h1') {
                        node.style.cssText = 'font-size:24px; font-weight:bold; margin:20px 0;';
                    } else if (tagName === 'h2') {
                        node.style.cssText = 'font-size:20px; font-weight:bold; margin:16px 0;';
                    } else if (tagName === 'h3') {
                        node.style.cssText = 'font-size:18px; font-weight:bold; margin:12px 0;';
                    } else if (tagName === 'p') {
                        node.style.cssText = 'font-size:16px; line-height:1.8; margin-bottom:16px;';
                    } else if (tagName === 'blockquote') {
                        node.style.cssText = 'border-left:4px solid #1890ff; padding-left:16px; margin:16px 0; color:#666;';
                    } else if (tagName === 'hr') {
                        node.style.cssText = 'margin:24px 0; border:none; border-top:1px solid #e0e0e0;';
                    } else if (tagName === 'small') {
                        node.style.cssText = 'font-size:14px; color:#999;';
                    }
                }
                
                // 递归处理子节点
                let child = node.firstChild;
                while (child) {
                    const nextChild = child.nextSibling;
                    const cleanedChild = cleanNode(child);
                    if (cleanedChild !== child) {
                        node.replaceChild(cleanedChild, child);
                    }
                    child = nextChild;
                }
                
                return node;
            }
            
            return node;
        }
        
        // 清洗DOM
        const cleanedNode = cleanNode(tempDiv);
        
        // 返回清洗后的HTML
        let result = '';
        if (cleanedNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            // 如果是DocumentFragment，需要特殊处理
            const tempContainer = document.createElement('div');
            tempContainer.appendChild(cleanedNode);
            result = tempContainer.innerHTML;
        } else {
            result = cleanedNode.innerHTML;
        }
        
        return result;
    }
    
    /**
     * 更新预览
     */
    function updatePreview() {
        if (!editor || !preview) {
            console.error('编辑器或预览元素未找到');
            return;
        }
        
        try {
            const editorContent = editor.innerHTML || '';
            const cleanedContent = sanitizeForChat(editorContent);
            
            // 创建预览内容容器
            preview.innerHTML = `
                <div class="preview-content">
                    ${cleanedContent}
                </div>
            `;
        } catch (error) {
            console.error('更新预览时发生错误:', error);
        }
    }
    
    /**
     * 一键复制功能
     */
    function copyToClipboard() {
        const editorContent = editor.innerHTML;
        const cleanedContent = sanitizeForChat(editorContent);
        
        // 使用现代Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(cleanedContent)
                .then(() => {
                    showNotification('复制成功！');
                })
                .catch(err => {
                    console.error('复制失败:', err);
                    // 降级方案
                    fallbackCopyTextToClipboard(cleanedContent);
                });
        } else {
            // 降级方案
            fallbackCopyTextToClipboard(cleanedContent);
        }
    }
    
    /**
     * 降级复制方案
     */
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        
        // 确保文本区域不在可视区域内
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        
        // 选择文本
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showNotification('复制成功！');
            } else {
                showNotification('复制失败，请手动复制');
            }
        } catch (err) {
            console.error('复制失败:', err);
            showNotification('复制失败，请手动复制');
        } finally {
            document.body.removeChild(textArea);
        }
    }
    
    /**
     * 显示通知
     */
    function showNotification(message) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #333;
            color: #fff;
            padding: 12px 24px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        `;
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        // 添加通知到页面
        document.body.appendChild(notification);
        
        // 3秒后移除通知
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                document.body.removeChild(notification);
                document.head.removeChild(style);
            }, 300);
        }, 3000);
    }
    
    /**
     * 保存草稿到本地存储
     */
    function saveDraft() {
        const content = editor.innerHTML;
        const today = new Date().toISOString().split('T')[0];
        const key = `wechat-editor-draft-${today}`;
        
        localStorage.setItem(key, content);
    }
    
    /**
     * 从本地存储加载草稿
     */
    function loadDraft() {
        const today = new Date().toISOString().split('T')[0];
        const key = `wechat-editor-draft-${today}`;
        const savedContent = localStorage.getItem(key);
        
        if (savedContent) {
            editor.innerHTML = savedContent;
            updatePreview();
        }
    }
    
    /**
     * 开始自动保存定时器
     */
    function startAutoSave() {
        setInterval(saveDraft, 30000); // 每30秒自动保存
    }
});