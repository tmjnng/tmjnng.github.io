class MiniPen {
    constructor() {
        this.htmlEditor = document.getElementById('html-editor');
        this.cssEditor = document.getElementById('css-editor');
        this.jsEditor = document.getElementById('js-editor');
        this.preview = document.getElementById('preview');
        this.consoleOutput = document.getElementById('console-output');
        
        this.debounceTimer = null;
        this.initApp();
    }

    initApp() {
        this.bindEvents();
        this.loadDefaultCode();
        this.initTimeDisplay();
        this.fetchExternalIP();
        this.initLanguageSelector();
        this.updatePreview();
    }

    bindEvents() {
        // 工具栏按钮事件
        document.getElementById('btn-new').addEventListener('click', () => this.newProject());
        document.getElementById('btn-save').addEventListener('click', () => this.saveProject());
        document.getElementById('btn-export').addEventListener('click', () => this.exportProject());
        document.getElementById('btn-import').addEventListener('click', () => this.importProject());
        document.getElementById('btn-fullscreen').addEventListener('click', () => this.toggleFullscreen());
        document.getElementById('btn-run').addEventListener('click', () => this.runCode());
        document.getElementById('btn-clear').addEventListener('click', () => this.clearEditors());

        // 预览控制按钮
        document.getElementById('btn-refresh').addEventListener('click', () => this.updatePreview());
        document.getElementById('btn-console').addEventListener('click', () => this.toggleConsole());
        document.getElementById('btn-close-console').addEventListener('click', () => this.toggleConsole());

        // 编辑器面板折叠
        document.querySelectorAll('.panel-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const panel = e.target.dataset.panel;
                this.togglePanel(panel);
            });
        });

        // 编辑器输入事件
        this.htmlEditor.addEventListener('input', () => this.debounceUpdate());
        this.cssEditor.addEventListener('input', () => this.debounceUpdate());
        this.jsEditor.addEventListener('input', () => this.debounceUpdate());

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 's') {
                    e.preventDefault();
                    this.saveProject();
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.runCode();
                }
            }
        });
    }

    loadDefaultCode() {
        this.htmlEditor.value = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的页面</title>
</head>
<body>
    <div class="container">
        <h1>欢迎使用 MiniPen</h1>
        <p>这是一个在线代码编辑器，支持HTML、CSS和JavaScript。</p>
        <button id="myButton">点击我</button>
        <div id="result"></div>
    </div>
</body>
</html>`;

        this.cssEditor.value = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    text-align: center;
    max-width: 500px;
}

h1 {
    color: #333;
    margin-bottom: 20px;
}

p {
    color: #666;
    margin-bottom: 20px;
    line-height: 1.6;
}

button {
    padding: 12px 30px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease;
}

button:hover {
    background: #764ba2;
}

#result {
    margin-top: 20px;
    padding: 15px;
    background: #f0f0f0;
    border-radius: 5px;
    min-height: 40px;
}`;

        this.jsEditor.value = `document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('myButton');
    const result = document.getElementById('result');
    
    button.addEventListener('click', function() {
        const messages = [
            '你好！',
            '欢迎来到MiniPen！',
            '这是一个很棒的工具！',
            '继续探索吧！'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        result.textContent = randomMessage;
        
        console.log('按钮被点击了！');
        console.log('随机消息:', randomMessage);
    });
    
    console.log('页面加载完成！');
});`;
    }

    debounceUpdate() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.updatePreview();
        }, 500);
    }

    updatePreview() {
        const html = this.htmlEditor.value;
        const css = this.cssEditor.value;
        const js = this.jsEditor.value;

        const previewDoc = this.preview.contentDocument || this.preview.contentWindow.document;
        
        const combinedCode = `
            <!DOCTYPE html>
            <html lang="zh-CN">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>
                    // 重写console方法以捕获输出
                    const originalConsole = {
                        log: console.log,
                        error: console.error,
                        warn: console.warn,
                        info: console.info
                    };
                    
                    console.log = function(...args) {
                        originalConsole.log.apply(console, args);
                        window.parent.postMessage({
                            type: 'console',
                            method: 'log',
                            args: args
                        }, '*');
                    };
                    
                    console.error = function(...args) {
                        originalConsole.error.apply(console, args);
                        window.parent.postMessage({
                            type: 'console',
                            method: 'error',
                            args: args
                        }, '*');
                    };
                    
                    console.warn = function(...args) {
                        originalConsole.warn.apply(console, args);
                        window.parent.postMessage({
                            type: 'console',
                            method: 'warn',
                            args: args
                        }, '*');
                    };
                    
                    console.info = function(...args) {
                        originalConsole.info.apply(console, args);
                        window.parent.postMessage({
                            type: 'console',
                            method: 'info',
                            args: args
                        }, '*');
                    };
                    
                    // 捕获错误
                    window.onerror = function(message, source, lineno, colno, error) {
                        window.parent.postMessage({
                            type: 'console',
                            method: 'error',
                            args: [message + ' at line ' + lineno]
                        }, '*');
                    };
                <\/script>
                <script>
                    try {
                        ${js}
                    } catch (error) {
                        console.error('执行错误:', error.message);
                    }
                <\/script>
            </body>
            </html>
        `;

        previewDoc.open();
        previewDoc.write(combinedCode);
        previewDoc.close();
    }

    runCode() {
        this.updatePreview();
        this.addConsoleMessage('代码已运行', 'info');
    }

    clearEditors() {
        if (confirm('确定要清空所有编辑器吗？')) {
            this.htmlEditor.value = '';
            this.cssEditor.value = '';
            this.jsEditor.value = '';
            this.updatePreview();
            this.clearConsole();
        }
    }

    newProject() {
        if (confirm('确定要新建项目吗？当前未保存的更改将丢失。')) {
            this.clearEditors();
            this.loadDefaultCode();
            this.updatePreview();
        }
    }

    saveProject() {
        const project = {
            html: this.htmlEditor.value,
            css: this.cssEditor.value,
            js: this.jsEditor.value,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('minipenProject', JSON.stringify(project));
        this.addConsoleMessage('项目已保存到本地存储', 'info');
    }

    exportProject() {
        const project = {
            html: this.htmlEditor.value,
            css: this.cssEditor.value,
            js: this.jsEditor.value,
            timestamp: new Date().toISOString()
        };

        const dataStr = JSON.stringify(project, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `minipen-project-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    importProject() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const project = JSON.parse(event.target.result);
                        if (project.html !== undefined) {
                            this.htmlEditor.value = project.html;
                        }
                        if (project.css !== undefined) {
                            this.cssEditor.value = project.css;
                        }
                        if (project.js !== undefined) {
                            this.jsEditor.value = project.js;
                        }
                        this.updatePreview();
                        this.addConsoleMessage('项目已成功导入', 'info');
                    } catch (error) {
                        this.addConsoleMessage('导入失败：无效的JSON文件', 'error');
                    }
                };
                reader.readAsText(file);
            }
        });
        input.click();
    }

    toggleFullscreen() {
        const previewContainer = document.getElementById('preview-frame');
        previewContainer.classList.toggle('fullscreen');
        
        const btn = document.getElementById('btn-fullscreen');
        const langData = i18n[currentLang];
        if (previewContainer.classList.contains('fullscreen')) {
            btn.textContent = langData.buttons.close || '退出全屏';
        } else {
            btn.textContent = langData.toolbar.fullscreen || '全屏预览';
        }
    }

    togglePanel(panel) {
        const panelElement = document.getElementById(`${panel}-panel`);
        panelElement.classList.toggle('collapsed');
        
        const toggleBtn = document.querySelector(`[data-panel="${panel}"]`);
        if (panelElement.classList.contains('collapsed')) {
            toggleBtn.textContent = '展开';
        } else {
            toggleBtn.textContent = '折叠';
        }
    }

    toggleConsole() {
        const consolePanel = document.getElementById('console-panel');
        consolePanel.classList.toggle('active');
    }

    clearConsole() {
        this.consoleOutput.innerHTML = '';
    }

    addConsoleMessage(message, type = 'info') {
        const messageElement = document.createElement('div');
        messageElement.className = `console-message ${type}`;
        
        const timestamp = new Date().toLocaleTimeString();
        messageElement.innerHTML = `<span style="color: #666;">[${timestamp}]</span> ${message}`;
        
        this.consoleOutput.appendChild(messageElement);
        this.consoleOutput.scrollTop = this.consoleOutput.scrollHeight;
    }

    initTimeDisplay() {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const timeString = `${hours}:${minutes}:${seconds}`;
            
            const timeDisplay = document.getElementById('current-time');
            if (timeDisplay) {
                timeDisplay.textContent = timeString;
            }
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    async fetchExternalIP() {
        const ipDisplay = document.getElementById('external-ip');
        if (!ipDisplay) return;

        const ipApis = [
            'https://api.ipify.org?format=json',
            'https://ipapi.co/json/',
            'https://api.ip.sb/geoip',
            'https://ip.seeip.org/jsonip'
        ];

        for (const apiUrl of ipApis) {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) continue;
                
                const data = await response.json();
                let ip = '';
                
                if (data.ip) {
                    ip = data.ip;
                } else if (data.query) {
                    ip = data.query;
                }
                
                if (ip) {
                    ipDisplay.textContent = `IP: ${ip}`;
                    return;
                }
            } catch (error) {
                console.warn(`API ${apiUrl} 获取IP失败:`, error);
                continue;
            }
        }

        console.error('所有IP API都失败');
        ipDisplay.textContent = 'IP: 获取失败';
    }
}

// 监听来自iframe的控制台消息
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'console') {
        const { method, args } = event.data;
        const miniPen = window.miniPen;
        if (miniPen) {
            const message = args.map(arg => {
                if (typeof arg === 'object') {
                    return JSON.stringify(arg);
                }
                return String(arg);
            }).join(' ');
            miniPen.addConsoleMessage(message, method);
        }
    }

    initLanguageSelector() {
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.addEventListener('change', function() {
                updateLanguage(this.value);
            });
        }
    }
}

// 初始化应用
let miniPen;
window.addEventListener('DOMContentLoaded', () => {
    miniPen = new MiniPen();
    window.miniPen = miniPen;
    
    // 尝试加载保存的项目
    const savedProject = localStorage.getItem('minipenProject');
    if (savedProject) {
        try {
            const project = JSON.parse(savedProject);
            if (project.html !== undefined) {
                miniPen.htmlEditor.value = project.html;
            }
            if (project.css !== undefined) {
                miniPen.cssEditor.value = project.css;
            }
            if (project.js !== undefined) {
                miniPen.jsEditor.value = project.js;
            }
            miniPen.updatePreview();
            miniPen.addConsoleMessage('已加载保存的项目', 'info');
        } catch (error) {
            console.error('加载保存的项目失败:', error);
        }
    }
});