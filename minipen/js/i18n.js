const i18n = {
  en: {
    pageTitle: "MiniPen - Online Code Editor",
    appTitle: "MiniPen",
    toolbar: {
      new: "New",
      save: "Save",
      export: "Export",
      import: "Import",
      fullscreen: "Fullscreen Preview",
      run: "Run",
      clear: "Clear"
    },
    panels: {
      html: "HTML",
      css: "CSS",
      javascript: "JavaScript",
      preview: "Live Preview",
      console: "Console"
    },
    buttons: {
      collapse: "Collapse",
      expand: "Expand",
      refresh: "Refresh",
      close: "Close"
    },
    editors: {
      htmlPlaceholder: "Enter HTML code here...",
      cssPlaceholder: "Enter CSS code here...",
      jsPlaceholder: "Enter JavaScript code here..."
    },
    console: {
      title: "Console",
      log: "log",
      error: "error",
      warn: "warn",
      info: "info"
    },
    messages: {
      confirmClear: "Are you sure you want to clear all editors?",
      confirmNew: "Are you sure you want to create a new project? Unsaved changes will be lost.",
      saved: "Project has been saved to local storage",
      imported: "Project has been successfully imported",
      importFailed: "Import failed: Invalid JSON file",
      codeRun: "Code has been run",
      loaded: "Saved project has been loaded"
    },
    defaultCode: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
</head>
<body>
    <div class="container">
        <h1>Welcome to MiniPen</h1>
        <p>This is an online code editor that supports HTML, CSS, and JavaScript.</p>
        <button id="myButton">Click Me</button>
        <div id="result"></div>
    </div>
</body>
</html>`,
      css: `* {
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
}`,
      js: `document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('myButton');
    const result = document.getElementById('result');
    
    button.addEventListener('click', function() {
        const messages = [
            'Hello!',
            'Welcome to MiniPen!',
            'This is a great tool!',
            'Keep exploring!'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        result.textContent = randomMessage;
        
        console.log('Button clicked!');
        console.log('Random message:', randomMessage);
    });
    
    console.log('Page loaded!');
});`
    }
  },

  zh: {
    pageTitle: "MiniPen - 在线代码编辑器",
    appTitle: "MiniPen",
    toolbar: {
      new: "新建",
      save: "保存",
      export: "导出",
      import: "导入",
      fullscreen: "全屏预览",
      run: "运行",
      clear: "清空"
    },
    panels: {
      html: "HTML",
      css: "CSS",
      javascript: "JavaScript",
      preview: "实时预览",
      console: "控制台"
    },
    buttons: {
      collapse: "折叠",
      expand: "展开",
      refresh: "刷新",
      close: "关闭"
    },
    editors: {
      htmlPlaceholder: "在此输入HTML代码...",
      cssPlaceholder: "在此输入CSS代码...",
      jsPlaceholder: "在此输入JavaScript代码..."
    },
    console: {
      title: "控制台",
      log: "log",
      error: "error",
      warn: "warn",
      info: "info"
    },
    messages: {
      confirmClear: "确定要清空所有编辑器吗？",
      confirmNew: "确定要新建项目吗？当前未保存的更改将丢失。",
      saved: "项目已保存到本地存储",
      imported: "项目已成功导入",
      importFailed: "导入失败：无效的JSON文件",
      codeRun: "代码已运行",
      loaded: "已加载保存的项目"
    },
    defaultCode: {
      html: `<!DOCTYPE html>
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
</html>`,
      css: `* {
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
}`,
      js: `document.addEventListener('DOMContentLoaded', function() {
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
});`
    }
  },

  ja: {
    pageTitle: "MiniPen - オンラインコードエディタ",
    appTitle: "MiniPen",
    toolbar: {
      new: "新規作成",
      save: "保存",
      export: "エクスポート",
      import: "インポート",
      fullscreen: "フルスクリーンプレビュー",
      run: "実行",
      clear: "クリア"
    },
    panels: {
      html: "HTML",
      css: "CSS",
      javascript: "JavaScript",
      preview: "リアルタイムプレビュー",
      console: "コンソール"
    },
    buttons: {
      collapse: "折りたたむ",
      expand: "展開",
      refresh: "更新",
      close: "閉じる"
    },
    editors: {
      htmlPlaceholder: "ここにHTMLコードを入力してください...",
      cssPlaceholder: "ここにCSSコードを入力してください...",
      jsPlaceholder: "ここにJavaScriptコードを入力してください..."
    },
    console: {
      title: "コンソール",
      log: "log",
      error: "error",
      warn: "warn",
      info: "info"
    },
    messages: {
      confirmClear: "すべてのエディタをクリアしますか？",
      confirmNew: "新規プロジェクトを作成しますか？未保存の変更は失われます。",
      saved: "プロジェクトがローカルストレージに保存されました",
      imported: "プロジェクトが正常にインポートされました",
      importFailed: "インポート失敗：無効なJSONファイル",
      codeRun: "コードが実行されました",
      loaded: "保存されたプロジェクトが読み込まれました"
    },
    defaultCode: {
      html: `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>マイページ</title>
</head>
<body>
    <div class="container">
        <h1>MiniPenへようこそ</h1>
        <p>これはオンラインコードエディタで、HTML、CSS、JavaScriptをサポートしています。</p>
        <button id="myButton">クリックしてください</button>
        <div id="result"></div>
    </div>
</body>
</html>`,
      css: `* {
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
}`,
      js: `document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('myButton');
    const result = document.getElementById('result');
    
    button.addEventListener('click', function() {
        const messages = [
            'こんにちは！',
            'MiniPenへようこそ！',
            'これは素晴らしいツールです！',
            '探索を続けてください！'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        result.textContent = randomMessage;
        
        console.log('ボタンがクリックされました！');
        console.log('ランダムメッセージ:', randomMessage);
    });
    
    console.log('ページの読み込みが完了しました！');
});`
    }
  }
};

let currentLang = 'zh';

function updateLanguage(lang) {
  currentLang = lang;
  const langData = i18n[lang];
  
  document.title = langData.pageTitle;
  document.querySelector('.toolbar-left h1').textContent = langData.appTitle;
  
  document.getElementById('btn-new').textContent = langData.toolbar.new;
  document.getElementById('btn-save').textContent = langData.toolbar.save;
  document.getElementById('btn-export').textContent = langData.toolbar.export;
  document.getElementById('btn-import').textContent = langData.toolbar.import;
  document.getElementById('btn-fullscreen').textContent = langData.toolbar.fullscreen;
  document.getElementById('btn-run').textContent = langData.toolbar.run;
  document.getElementById('btn-clear').textContent = langData.toolbar.clear;
  
  document.querySelector('.panel-title[data-panel="html"]').textContent = langData.panels.html;
  document.querySelector('.panel-title[data-panel="css"]').textContent = langData.panels.css;
  document.querySelector('.panel-title[data-panel="js"]').textContent = langData.panels.javascript;
  document.querySelector('.preview-title').textContent = langData.panels.preview;
  document.querySelector('.console-title').textContent = langData.panels.console;
  
  document.getElementById('html-editor').placeholder = langData.editors.htmlPlaceholder;
  document.getElementById('css-editor').placeholder = langData.editors.cssPlaceholder;
  document.getElementById('js-editor').placeholder = langData.editors.jsPlaceholder;
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (langData[key]) {
      el.textContent = langData[key];
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  updateLanguage('zh');
});