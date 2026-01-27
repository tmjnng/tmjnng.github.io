// 多语言数据结构
const i18n = {
  en: {
    pageTitle: "Development Tools",
    navHome: "Home",
    navArchives: "Archives",
    navTools: "Tools",
    navDbDesigner: "Database Designer",
    navDrawSystem: "Lottery System",
    navExam: "JLPT Practice",
    navMiniPen: "Code Editor",
    navSnapPicEdit: "Image Editor",
    searchPlaceholder: "Search",
    toolsTitle: "Development Tools",
    toolsDescription: "Provides commonly used development tools such as JSON formatting, XML formatting, MD5 encryption, AES encryption and decryption, etc.",
    
    // IP相关
    ipLoading: "Getting IP...",
    ipFailed: "IP: Failed to get",
    ipPrefix: "IP: ",
    
    // 工具名称
    jsonFormatter: "JSON Formatter",
    xmlFormatter: "XML Formatter",
    md5Encryptor: "MD5 Encryptor",
    aesEncryptor: "AES Encrypt/Decrypt",
    base64Tool: "Base64 Encode/Decode",
    bcryptTool: "BCrypt Encrypt",
    hmacSha256Tool: "HMAC-SHA256",
    urlTool: "URL Encode/Decode",
    timestampTool: "Timestamp Converter",
    colorTool: "Color Converter",
    sqlFormatter: "SQL Formatter",
    unicodeTool: "Unicode Converter",
    webTool: "HTML/CSS/JS Tools",
    randomTool: "Random String Generator",
    regexTool: "Regex Tester",
    qrcodeTool: "QR Code Generator",

    // 输入框占位符
    jsonPlaceholder: "Please enter JSON string...",
    xmlPlaceholder: "Please enter XML string...",
    md5Placeholder: "Please enter text to encrypt...",
    aesKeyPlaceholder: "Key (16/24/32 bits)",
    aesInputPlaceholder: "Please enter text to encrypt/decrypt...",
    base64Placeholder: "Please enter text to encode/decode...",
    urlPlaceholder: "Please enter URL to encode/decode...",
    timestampPlaceholder: "Please enter timestamp or date...",
    colorPlaceholder: "Please enter color value (#RRGGBB)...",
    sqlPlaceholder: "Please enter SQL query...",
    unicodePlaceholder: "Please enter text to convert...",
    webPlaceholder: "Please enter code to process...",
    randomLengthPlaceholder: "Length",
    qrcodeInputPlaceholder: "Please enter text or link...",
    randomUppercase: "Uppercase (A-Z)",
    randomLowercase: "Lowercase (a-z)",
    randomNumbers: "Numbers (0-9)",
    randomSymbols: "Symbols (!@#$...)",

    // 二维码生成器
    qrcodeSize: "Size",
    qrcodeGenerate: "Generate",
    qrcodeClear: "Clear",
    qrcodeDownload: "Download",
    qrcodeError: "Error",
    qrcodeErrorInput: "Please enter text or link",
    qrcodeErrorDownload: "Please generate QR code first",

    // 正则表达式测试器
    regexPatternPlaceholder: "Please enter regex pattern (e.g., \\d+)",
    regexTestTextPlaceholder: "Please enter test text...",
    regexFlagGlobal: "Global match (g)",
    regexFlagIgnoreCase: "Ignore case (i)",
    regexFlagMultiline: "Multiline (m)",
    regexFlagDotAll: "Single line (s)",
    regexTest: "Test",
    regexClear: "Clear",
    regexNoMatch: "No matches found",
    regexMatchResults: "Match Results",
    regexMatches: "matches",
    regexMatchContent: "Match content",
    regexPosition: "Position",
    regexCaptureGroups: "Capture groups",
    regexHighlight: "Highlight display",
    regexError: "Error",
    regexErrorPattern: "Please enter regex pattern",
    regexErrorTestText: "Please enter test text",

    // 按钮文本
    format: "Format",
    minify: "Minify",
    encrypt: "Encrypt",
    decrypt: "Decrypt",
    encode: "Encode",
    decode: "Decode",
    verify: "Verify",
    generateHash: "Generate Hash",
    verifyHash: "Verify Hash",
    timestampToDate: "Timestamp → Date",
    dateToTimestamp: "Date → Timestamp",
    hexToRgb: "HEX → RGB",
    rgbToHex: "RGB → HEX",
    copyResult: "Copy Result",
    convert: "Convert",
    process: "Process",
    generate: "Generate",

    // Unicode模式选项
    unicodeEscape: "Unicode Escape",
    unicodeUnescape: "Unicode Unescape",
    htmlEntity: "HTML Entity",
    htmlEntityDecode: "HTML Entity Decode",
    unicodeHex: "Unicode Hex",
    unicodeHexDecode: "Unicode Hex Decode",
    utf8Hex: "UTF-8 Hex",
    utf8HexDecode: "UTF-8 Hex Decode",
    urlEncode: "URL Encode",
    urlDecode: "URL Decode",

    // Web工具选项
    htmlMode: "HTML",
    cssMode: "CSS",
    jsMode: "JavaScript",
    obfuscate: "Obfuscate",
    webFormat: "Format",
    webMinify: "Minify",

    // 错误信息
    jsonError: "JSON format error: ",
    xmlError: "XML format error",
    sqlError: "SQL format error",
    base64Error: "Base64 format error",
    urlError: "URL encoding format error",
    invalidTimestamp: "Invalid timestamp",
    invalidDateFormat: "Invalid date format",
    conversionFailed: "Conversion failed: ",
    invalidHexColor: "Invalid HEX color format",
    invalidRgbColor: "Invalid RGB color format",
    rgbRangeError: "RGB values must be between 0-255",
    keyLengthError: "Key length must be 16, 24, or 32 bits",
    loadingCrypto: "Loading encryption library, please try again later...",
    cryptoError: "Encryption failed: ",
    
    // 页脚
    footerCopyright: "© 2026 Development Tools",
    
    // 模式选择
    cbcMode: "CBC Mode",
    ecbMode: "ECB Mode"
  },
  
  zh: {
    pageTitle: "开发工具集",
    navHome: "首页",
    navArchives: "归档",
    navTools: "工具集",
    navDbDesigner: "数据库设计",
    navDrawSystem: "抽奖系统",
    navExam: "日语刷题",
    navMiniPen: "代码编辑器",
    navSnapPicEdit: "图片编辑器",
    searchPlaceholder: "搜索",
    toolsTitle: "开发工具集",
    toolsDescription: "提供JSON格式化、XML格式化、MD5加密、AES加密解密等开发常用工具",
    
    // IP相关
    ipLoading: "获取IP中...",
    ipFailed: "IP: 获取失败",
    ipPrefix: "IP: ",
    
    // 工具名称
    jsonFormatter: "JSON格式化",
    xmlFormatter: "XML格式化",
    md5Encryptor: "MD5加密",
    aesEncryptor: "AES加密解密",
    base64Tool: "Base64编码解码",
    bcryptTool: "BCrypt加密",
    hmacSha256Tool: "HMAC-SHA256",
    urlTool: "URL编码解码",
    timestampTool: "时间戳转换",
    colorTool: "颜色转换",
    sqlFormatter: "SQL格式化",
    unicodeTool: "Unicode编码转换",
    webTool: "HTML/CSS/JS 工具",
    randomTool: "随机字符串生成",
    regexTool: "正则表达式测试器",
    qrcodeTool: "二维码生成器",

    // 输入框占位符
    jsonPlaceholder: "请输入JSON字符串...",
    xmlPlaceholder: "请输入XML字符串...",
    md5Placeholder: "请输入要加密的文本...",
    aesKeyPlaceholder: "密钥 (16/24/32位)",
    aesInputPlaceholder: "请输入要加密/解密的文本...",
    base64Placeholder: "请输入要编码/解码的内容...",
    urlPlaceholder: "请输入要编码/解码的URL...",
    timestampPlaceholder: "请输入时间戳或日期...",
    colorPlaceholder: "请输入颜色值 (#RRGGBB)...",
    sqlPlaceholder: "请输入SQL查询语句...",
    unicodePlaceholder: "请输入要转换的文本...",
    webPlaceholder: "请输入要处理的代码...",
    randomLengthPlaceholder: "长度",
    qrcodeInputPlaceholder: "请输入文本或链接...",
    randomUppercase: "大写字母 (A-Z)",
    randomLowercase: "小写字母 (a-z)",
    randomNumbers: "数字 (0-9)",
    randomSymbols: "特殊符号 (!@#$...)",

    // 二维码生成器
    qrcodeSize: "大小",
    qrcodeGenerate: "生成",
    qrcodeClear: "清除",
    qrcodeDownload: "下载",
    qrcodeError: "错误",
    qrcodeErrorInput: "请输入文本或链接",
    qrcodeErrorDownload: "请先生成二维码",

    // 正则表达式测试器
    regexPatternPlaceholder: "请输入正则表达式 (例如: \\d+)",
    regexTestTextPlaceholder: "请输入测试文本...",
    regexFlagGlobal: "全局匹配 (g)",
    regexFlagIgnoreCase: "忽略大小写 (i)",
    regexFlagMultiline: "多行匹配 (m)",
    regexFlagDotAll: "单行匹配 (s)",
    regexTest: "测试",
    regexClear: "清除",
    regexNoMatch: "未找到匹配项",
    regexMatchResults: "匹配结果",
    regexMatches: "个匹配",
    regexMatchContent: "匹配内容",
    regexPosition: "位置",
    regexCaptureGroups: "捕获组",
    regexHighlight: "高亮显示",
    regexError: "错误",
    regexErrorPattern: "请输入正则表达式",
    regexErrorTestText: "请输入测试文本",

    // 按钮文本
    format: "格式化",
    minify: "压缩",
    encrypt: "加密",
    decrypt: "解密",
    encode: "编码",
    decode: "解码",
    verify: "验证",
    generateHash: "生成哈希",
    verifyHash: "验证哈希",
    timestampToDate: "时间戳→日期",
    dateToTimestamp: "日期→时间戳",
    hexToRgb: "HEX→RGB",
    rgbToHex: "RGB→HEX",
    copyResult: "复制结果",
    convert: "转换",
    process: "处理",
    generate: "生成",

    // Unicode模式选项
    unicodeEscape: "Unicode转义序列",
    unicodeUnescape: "Unicode转义解码",
    htmlEntity: "HTML实体编码",
    htmlEntityDecode: "HTML实体解码",
    unicodeHex: "Unicode十六进制",
    unicodeHexDecode: "Unicode十六进制解码",
    utf8Hex: "UTF-8十六进制",
    utf8HexDecode: "UTF-8十六进制解码",
    urlEncode: "URL编码",
    urlDecode: "URL解码",

    // Web工具选项
    htmlMode: "HTML",
    cssMode: "CSS",
    jsMode: "JavaScript",
    obfuscate: "混淆",
    webFormat: "格式化",
    webMinify: "压缩",

    // 错误信息
    jsonError: "JSON格式错误: ",
    xmlError: "XML格式错误",
    sqlError: "SQL格式错误",
    base64Error: "Base64格式错误",
    urlError: "URL编码格式错误",
    invalidTimestamp: "无效的时间戳",
    invalidDateFormat: "无效的日期格式",
    conversionFailed: "转换失败: ",
    invalidHexColor: "无效的HEX颜色格式",
    invalidRgbColor: "无效的RGB颜色格式",
    rgbRangeError: "RGB值必须在0-255之间",
    keyLengthError: "密钥长度必须为16、24或32位",
    loadingCrypto: "正在加载加密库，请稍后重试...",
    cryptoError: "加密失败: ",
    
    // 页脚
    footerCopyright: "© 2026 开发工具集",
    
    // 模式选择
    cbcMode: "CBC模式",
    ecbMode: "ECB模式"
  },
  
  ja: {
    pageTitle: "開発ツール集",
    navHome: "ホーム",
    navArchives: "アーカイブ",
    navTools: "ツール集",
    navDbDesigner: "データベース設計",
    navDrawSystem: "抽選システム",
    navExam: "日本語練習",
    navMiniPen: "コードエディタ",
    navSnapPicEdit: "画像エディタ",
    searchPlaceholder: "検索",
    toolsTitle: "開発ツール集",
    toolsDescription: "JSONフォーマット、XMLフォーマット、MD5暗号化、AES暗号化/復号など、開発によく使われるツールを提供します。",
    
    // IP相关
    ipLoading: "IPを取得中...",
    ipFailed: "IP: 取得失敗",
    ipPrefix: "IP: ",
    
    // 工具名称
    jsonFormatter: "JSONフォーマッター",
    xmlFormatter: "XMLフォーマッター",
    md5Encryptor: "MD5暗号化ツール",
    aesEncryptor: "AES暗号化/復号",
    base64Tool: "Base64エンコード/デコード",
    bcryptTool: "BCrypt暗号化",
    hmacSha256Tool: "HMAC-SHA256",
    urlTool: "URLエンコード/デコード",
    timestampTool: "タイムスタンプコンバーター",
    colorTool: "カラーコンバーター",
    sqlFormatter: "SQLフォーマッター",
    unicodeTool: "Unicodeコンバーター",
    webTool: "HTML/CSS/JS ツール",
    randomTool: "ランダム文字列生成",
    regexTool: "正規表現テスター",
    qrcodeTool: "QRコードジェネレーター",

    // 输入框占位符
    jsonPlaceholder: "JSON文字列を入力してください...",
    xmlPlaceholder: "XML文字列を入力してください...",
    md5Placeholder: "暗号化するテキストを入力してください...",
    aesKeyPlaceholder: "キー (16/24/32ビット)",
    aesInputPlaceholder: "暗号化/復号するテキストを入力してください...",
    base64Placeholder: "エンコード/デコードするテキストを入力してください...",
    urlPlaceholder: "エンコード/デコードするURLを入力してください...",
    timestampPlaceholder: "タイムスタンプまたは日付を入力してください...",
    colorPlaceholder: "カラー値を入力してください (#RRGGBB)...",
    sqlPlaceholder: "SQLクエリを入力してください...",
    unicodePlaceholder: "変換するテキストを入力してください...",
    webPlaceholder: "処理するコードを入力してください...",
    randomLengthPlaceholder: "長さ",
    qrcodeInputPlaceholder: "テキストまたはリンクを入力してください...",
    randomUppercase: "大文字 (A-Z)",
    randomLowercase: "小文字 (a-z)",
    randomNumbers: "数字 (0-9)",
    randomSymbols: "記号 (!@#$...)",

    // 二维码生成器
    qrcodeSize: "サイズ",
    qrcodeGenerate: "生成",
    qrcodeClear: "クリア",
    qrcodeDownload: "ダウンロード",
    qrcodeError: "エラー",
    qrcodeErrorInput: "テキストまたはリンクを入力してください",
    qrcodeErrorDownload: "まずQRコードを生成してください",

    // 正则表达式测试器
    regexPatternPlaceholder: "正規表現を入力してください (例: \\d+)",
    regexTestTextPlaceholder: "テストテキストを入力してください...",
    regexFlagGlobal: "グローバルマッチ (g)",
    regexFlagIgnoreCase: "大文字小文字を区別しない (i)",
    regexFlagMultiline: "マルチライン (m)",
    regexFlagDotAll: "シングルライン (s)",
    regexTest: "テスト",
    regexClear: "クリア",
    regexNoMatch: "マッチが見つかりません",
    regexMatchResults: "マッチ結果",
    regexMatches: "件のマッチ",
    regexMatchContent: "マッチ内容",
    regexPosition: "位置",
    regexCaptureGroups: "キャプチャグループ",
    regexHighlight: "ハイライト表示",
    regexError: "エラー",
    regexErrorPattern: "正規表現を入力してください",
    regexErrorTestText: "テストテキストを入力してください",

    // 按钮文本
    format: "フォーマット",
    minify: "ミニファイ",
    encrypt: "暗号化",
    decrypt: "復号",
    encode: "エンコード",
    decode: "デコード",
    verify: "検証",
    generateHash: "ハッシュ生成",
    verifyHash: "ハッシュ検証",
    timestampToDate: "タイムスタンプ→日付",
    dateToTimestamp: "日付→タイムスタンプ",
    hexToRgb: "HEX→RGB",
    rgbToHex: "RGB→HEX",
    copyResult: "結果をコピー",
    convert: "変換",
    process: "処理",
    generate: "生成",

    // Unicode模式选项
    unicodeEscape: "Unicodeエスケープ",
    unicodeUnescape: "Unicodeエスケープ解除",
    htmlEntity: "HTMLエンティティ",
    htmlEntityDecode: "HTMLエンティティ解除",
    unicodeHex: "Unicode HEX",
    unicodeHexDecode: "Unicode HEX解除",
    utf8Hex: "UTF-8 HEX",
    utf8HexDecode: "UTF-8 HEX解除",
    urlEncode: "URLエンコード",
    urlDecode: "URLデコード",

    // Web工具选项
    htmlMode: "HTML",
    cssMode: "CSS",
    jsMode: "JavaScript",
    obfuscate: "難読化",
    webFormat: "フォーマット",
    webMinify: "ミニファイ",

    // 错误信息
    jsonError: "JSONフォーマットエラー: ",
    xmlError: "XMLフォーマットエラー",
    sqlError: "SQLフォーマットエラー",
    base64Error: "Base64フォーマットエラー",
    urlError: "URLエンコードフォーマットエラー",
    invalidTimestamp: "無効なタイムスタンプ",
    invalidDateFormat: "無効な日付フォーマット",
    conversionFailed: "変換失敗: ",
    invalidHexColor: "無効なHEXカラーフォーマット",
    invalidRgbColor: "無効なRGBカラーフォーマット",
    rgbRangeError: "RGB値は0-255の間でなければなりません",
    keyLengthError: "キーの長さは16、24、または32ビットでなければなりません",
    loadingCrypto: "暗号化ライブラリをロード中です、しばらくしてから再試行してください...",
    cryptoError: "暗号化失敗: ",
    
    // 页脚
    footerCopyright: "© 2026 開発ツール集",
    
    // 模式选择
    cbcMode: "CBCモード",
    ecbMode: "ECBモード"
  }
};

// 当前语言，默认英语
let currentLang = 'en';

// 更新页面语言
function updateLanguage(lang) {
  currentLang = lang;
  const langData = i18n[lang];
  
  // 更新页面标题
  document.title = langData.pageTitle;
  
  // 更新导航栏
  document.querySelector('#logo').textContent = langData.pageTitle;
  document.querySelectorAll('.main-nav-link')[0].textContent = langData.navHome;
  document.querySelectorAll('.main-nav-link')[1].textContent = langData.navArchives;
  document.querySelectorAll('.main-nav-link')[2].textContent = langData.navTools;
  document.querySelectorAll('.main-nav-link')[3].textContent = langData.navDbDesigner;
  document.querySelectorAll('.main-nav-link')[4].textContent = langData.navDrawSystem;
  document.querySelectorAll('.main-nav-link')[5].textContent = langData.navExam;
  document.querySelectorAll('.main-nav-link')[6].textContent = langData.navMiniPen;
  document.querySelectorAll('.main-nav-link')[7].textContent = langData.navSnapPicEdit;
  
  // 更新搜索框
  document.querySelector('.search-form-input').placeholder = langData.searchPlaceholder;
  
  // 更新页面标题和描述
  document.querySelector('.tool-header h1').textContent = langData.toolsTitle;
  document.querySelector('.tool-header p').textContent = langData.toolsDescription;
  
  // 更新工具卡片
  const toolCards = document.querySelectorAll('.tool-card');
  const toolNames = [
    langData.jsonFormatter,
    langData.xmlFormatter,
    langData.sqlFormatter,
    langData.md5Encryptor,
    langData.aesEncryptor,
    langData.base64Tool,
    langData.bcryptTool,
    langData.hmacSha256Tool,
    langData.urlTool,
    langData.timestampTool,
    langData.colorTool,
    langData.unicodeTool,
    langData.webTool,
    langData.randomTool
  ];
  
  toolCards.forEach((card, index) => {
    if (toolNames[index]) {
      card.querySelector('h3').textContent = toolNames[index];
    }
  });
  
  // 更新输入框占位符
  document.getElementById('json-input').placeholder = langData.jsonPlaceholder;
  document.getElementById('xml-input').placeholder = langData.xmlPlaceholder;
  document.getElementById('sql-input').placeholder = langData.sqlPlaceholder;
  document.getElementById('md5-input').placeholder = langData.md5Placeholder;
  document.getElementById('aes-key').placeholder = langData.aesKeyPlaceholder;
  document.getElementById('aes-input').placeholder = langData.aesInputPlaceholder;
  document.getElementById('base64-input').placeholder = langData.base64Placeholder;
  document.getElementById('url-input').placeholder = langData.urlPlaceholder;
  document.getElementById('timestamp-input').placeholder = langData.timestampPlaceholder;
  document.getElementById('color-input').placeholder = langData.colorPlaceholder;
  document.getElementById('unicode-input').placeholder = langData.unicodePlaceholder;
  document.getElementById('web-input').placeholder = langData.webPlaceholder;
  
  // 更新按钮文本
  document.querySelectorAll('.tool-card')[0].querySelectorAll('button')[0].textContent = langData.format;
  document.querySelectorAll('.tool-card')[0].querySelectorAll('button')[1].textContent = langData.minify;
  document.querySelectorAll('.tool-card')[0].querySelectorAll('button')[2].textContent = langData.copyResult;
  
  document.querySelectorAll('.tool-card')[1].querySelectorAll('button')[0].textContent = langData.format;
  document.querySelectorAll('.tool-card')[1].querySelectorAll('button')[1].textContent = langData.minify;
  document.querySelectorAll('.tool-card')[1].querySelectorAll('button')[2].textContent = langData.copyResult;
  
  // SQL格式化工具按钮
  document.querySelectorAll('.tool-card')[2].querySelectorAll('button')[0].textContent = langData.format;
  document.querySelectorAll('.tool-card')[2].querySelectorAll('button')[1].textContent = langData.minify;
  document.querySelectorAll('.tool-card')[2].querySelectorAll('button')[2].textContent = langData.copyResult;
  
  document.querySelectorAll('.tool-card')[3].querySelectorAll('button')[0].textContent = langData.encrypt;
  document.querySelectorAll('.tool-card')[3].querySelectorAll('button')[1].textContent = langData.copyResult;
  
  document.querySelectorAll('.tool-card')[4].querySelectorAll('button')[0].textContent = langData.encrypt;
  document.querySelectorAll('.tool-card')[4].querySelectorAll('button')[1].textContent = langData.decrypt;
  document.querySelectorAll('.tool-card')[4].querySelectorAll('button')[2].textContent = langData.copyResult;
  
  document.querySelectorAll('.tool-card')[5].querySelectorAll('button')[0].textContent = langData.encode;
  document.querySelectorAll('.tool-card')[5].querySelectorAll('button')[1].textContent = langData.decode;
  document.querySelectorAll('.tool-card')[5].querySelectorAll('button')[2].textContent = langData.copyResult;
  
  // BCrypt加密工具按钮
  document.querySelectorAll('.tool-card')[6].querySelectorAll('button')[0].textContent = langData.encrypt;
  document.querySelectorAll('.tool-card')[6].querySelectorAll('button')[1].textContent = langData.verify;
  document.querySelectorAll('.tool-card')[6].querySelectorAll('button')[2].textContent = langData.copyResult;
  
  // HMAC-SHA256工具按钮
  document.querySelectorAll('.tool-card')[7].querySelectorAll('button')[0].textContent = langData.generateHash;
  document.querySelectorAll('.tool-card')[7].querySelectorAll('button')[1].textContent = langData.verifyHash;
  document.querySelectorAll('.tool-card')[7].querySelectorAll('button')[2].textContent = langData.copyResult;
  
  document.querySelectorAll('.tool-card')[8].querySelectorAll('button')[0].textContent = langData.encode;
  document.querySelectorAll('.tool-card')[8].querySelectorAll('button')[1].textContent = langData.decode;
  document.querySelectorAll('.tool-card')[8].querySelectorAll('button')[2].textContent = langData.copyResult;
  
  document.querySelectorAll('.tool-card')[9].querySelectorAll('button')[0].textContent = langData.timestampToDate;
  document.querySelectorAll('.tool-card')[9].querySelectorAll('button')[1].textContent = langData.dateToTimestamp;
  document.querySelectorAll('.tool-card')[9].querySelectorAll('button')[2].textContent = langData.copyResult;
  
  document.querySelectorAll('.tool-card')[10].querySelectorAll('button')[0].textContent = langData.hexToRgb;
  document.querySelectorAll('.tool-card')[10].querySelectorAll('button')[1].textContent = langData.rgbToHex;
  document.querySelectorAll('.tool-card')[10].querySelectorAll('button')[2].textContent = langData.copyResult;
  
  // Unicode工具按钮
  document.querySelectorAll('.tool-card')[11].querySelectorAll('button')[0].textContent = langData.convert;
  document.querySelectorAll('.tool-card')[11].querySelectorAll('button')[1].textContent = langData.copyResult;
  
  // Web工具按钮
  document.querySelectorAll('.tool-card')[12].querySelectorAll('button')[0].textContent = langData.process;
  document.querySelectorAll('.tool-card')[12].querySelectorAll('button')[1].textContent = langData.copyResult;
  
  // 随机字符串生成工具按钮
  document.querySelectorAll('.tool-card')[13].querySelectorAll('button')[0].textContent = langData.generate;
  document.querySelectorAll('.tool-card')[13].querySelectorAll('button')[1].textContent = langData.copyResult;
  
  // 更新data-i18n属性的元素
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (langData[key]) {
      el.textContent = langData[key];
    }
  });
  
  // 更新页脚
  document.querySelector('#footer-info').innerHTML = `${langData.footerCopyright}<br>Powered by <a href="https://hexo.io/" target="_blank">Hexo</a>`;
  
  // 更新IP显示
  const ipDisplay = document.getElementById('external-ip');
  if (ipDisplay && ipDisplay.textContent === '获取IP中...') {
    ipDisplay.textContent = langData.ipLoading;
  } else if (ipDisplay && ipDisplay.textContent === 'IP: 获取失败') {
    ipDisplay.textContent = langData.ipFailed;
  } else if (ipDisplay && ipDisplay.textContent.startsWith('IP: ')) {
    const ip = ipDisplay.textContent.substring(4);
    ipDisplay.textContent = `${langData.ipPrefix}${ip}`;
  }
}

// 语言选择器事件监听
document.addEventListener('DOMContentLoaded', function() {
  const selector = document.getElementById('language-selector');
  selector.addEventListener('change', function() {
    updateLanguage(this.value);
  });
  
  // 初始化默认语言（英语）
  updateLanguage('en');
});