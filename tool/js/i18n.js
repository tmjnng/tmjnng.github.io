// 多语言数据结构
const i18n = {
  en: {
    pageTitle: "Development Tools",
    navHome: "Home",
    navArchives: "Archives",
    navTools: "Tools",
    searchPlaceholder: "Search",
    toolsTitle: "Development Tools",
    toolsDescription: "Provides commonly used development tools such as JSON formatting, XML formatting, MD5 encryption, AES encryption and decryption, etc.",
    
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
    searchPlaceholder: "搜索",
    toolsTitle: "开发工具集",
    toolsDescription: "提供JSON格式化、XML格式化、MD5加密、AES加密解密等开发常用工具",
    
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
    searchPlaceholder: "検索",
    toolsTitle: "開発ツール集",
    toolsDescription: "JSONフォーマット、XMLフォーマット、MD5暗号化、AES暗号化/復号など、開発によく使われるツールを提供します。",
    
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
    langData.unicodeTool
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
  
  // 更新Unicode模式选项
  const unicodeModeSelect = document.getElementById('unicode-mode');
  if (unicodeModeSelect) {
    const options = unicodeModeSelect.options;
    options[0].text = langData.unicodeEscape;
    options[1].text = langData.unicodeUnescape;
    options[2].text = langData.htmlEntity;
    options[3].text = langData.htmlEntityDecode;
    options[4].text = langData.unicodeHex;
    options[5].text = langData.unicodeHexDecode;
    options[6].text = langData.utf8Hex;
    options[7].text = langData.utf8HexDecode;
    options[8].text = langData.urlEncode;
    options[9].text = langData.urlDecode;
  }
  
  // 更新AES模式选项
  document.querySelectorAll('#aes-mode option')[0].textContent = langData.cbcMode;
  document.querySelectorAll('#aes-mode option')[1].textContent = langData.ecbMode;
  
  // 更新页脚
  document.querySelector('#footer-info').innerHTML = `${langData.footerCopyright}<br>Powered by <a href="https://hexo.io/" target="_blank">Hexo</a>`;
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