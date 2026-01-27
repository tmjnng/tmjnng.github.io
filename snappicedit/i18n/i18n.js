const i18n = {
  en: {
    upload: {
      title: "Image Upload"
    },
    resolution: {
      title: "Resolution",
      width: "Width:",
      height: "Height:",
      keepRatio: "Keep Aspect Ratio"
    },
    background: {
      title: "Background Color",
      transparent: "Transparent Background"
    },
    scale: {
      title: "Scale & Crop",
      mode: "Mode:",
      contain: "Fit (Contain)",
      cover: "Fill (Cover)"
    },
    watermark: {
      title: "Text Watermark",
      text: "Text:",
      font: "Font:",
      size: "Size:",
      color: "Color:",
      position: "Position:"
    },
    process: {
      title: "Image Processing",
      quality: "Quality:",
      format: "Output Format:"
    },
    advanced: {
      title: "Advanced Features",
      extractColors: "Extract Colors",
      chromaKey: "Chroma Key:",
      thumbnail: "Generate Thumbnail:",
      qrCode: "Add QR Code:"
    },
    export: {
      title: "Export Options",
      single: "Export Current Image",
      batch: "Batch Export"
    },
    preview: {
      title: "Real-time Preview"
    },
    buttons: {
      collapse: "Collapse",
      expand: "Expand"
    }
  },
  zh: {
    upload: {
      title: "图片上传"
    },
    resolution: {
      title: "分辨率设置",
      width: "宽度:",
      height: "高度:",
      keepRatio: "保持比例"
    },
    background: {
      title: "背景色",
      transparent: "透明背景"
    },
    scale: {
      title: "缩放和裁剪",
      mode: "模式:",
      contain: "等比缩放",
      cover: "居中裁剪"
    },
    watermark: {
      title: "文字水印",
      text: "文字:",
      font: "字体:",
      size: "大小:",
      color: "颜色:",
      position: "位置:"
    },
    process: {
      title: "图片处理",
      quality: "压缩质量:",
      format: "输出格式:"
    },
    advanced: {
      title: "高级功能",
      extractColors: "提取主色调",
      chromaKey: "自动抠图:",
      thumbnail: "生成缩略图:",
      qrCode: "添加二维码:"
    },
    export: {
      title: "导出选项",
      single: "导出当前图片",
      batch: "批量导出"
    },
    preview: {
      title: "实时预览"
    },
    buttons: {
      collapse: "折叠",
      expand: "展开"
    }
  },
  ja: {
    upload: {
      title: "画像のアップロード"
    },
    resolution: {
      title: "解像度設定",
      width: "幅:",
      height: "高さ:",
      keepRatio: "アスペクト比を維持"
    },
    background: {
      title: "背景色",
      transparent: "透明な背景"
    },
    scale: {
      title: "スケール & クロップ",
      mode: "モード:",
      contain: "フィット (コンテイン)",
      cover: "フィル (カバー)"
    },
    watermark: {
      title: "テキストウォーターマーク",
      text: "テキスト:",
      font: "フォント:",
      size: "サイズ:",
      color: "色:",
      position: "位置:"
    },
    process: {
      title: "画像処理",
      quality: "品質:",
      format: "出力形式:"
    },
    advanced: {
      title: "高度な機能",
      extractColors: "色を抽出",
      chromaKey: "クロマキー:",
      thumbnail: "サムネイルを生成:",
      qrCode: "QRコードを追加:"
    },
    export: {
      title: "エクスポートオプション",
      single: "現在の画像をエクスポート",
      batch: "一括エクスポート"
    },
    preview: {
      title: "リアルタイムプレビュー"
    },
    buttons: {
      collapse: "折りたたむ",
      expand: "展開"
    }
  }
};

let currentLang = 'en';

/**
 * 更新页面语言
 * @param {string} lang - 语言代码: 'en', 'zh', 'ja'
 */
function updateLanguage(lang) {
  if (!i18n[lang]) {
    console.warn(`Language ${lang} not supported`);
    return;
  }

  currentLang = lang;
  const langData = i18n[lang];

  // 更新带有data-i18n属性的元素
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getNestedValue(langData, key);
    if (value) {
      el.textContent = value;
    }
  });

  // 更新下拉选项
  updateSelectOptions();

  // 保存语言设置
  localStorage.setItem('snappicedit-lang', lang);

  // 如果应用实例存在，更新其语言设置
  if (window.app && window.app.currentLang) {
    window.app.currentLang = lang;
    window.app.updateCanvas();
  }
}

/**
 * 获取嵌套对象的值
 * @param {object} obj - 目标对象
 * @param {string} key - 嵌套键路径，如 'upload.title'
 * @returns {*} - 对应的值
 */
function getNestedValue(obj, key) {
  return key.split('.').reduce((acc, curr) => acc && acc[curr], obj);
}

/**
 * 更新下拉选项的文本
 */
function updateSelectOptions() {
  const langData = i18n[currentLang];

  // 更新缩放模式选项
  const scaleMode = document.getElementById('scale-mode');
  if (scaleMode) {
    const containOption = scaleMode.querySelector('option[value="contain"]');
    const coverOption = scaleMode.querySelector('option[value="cover"]');
    if (containOption && langData.scale) {
      containOption.textContent = langData.scale.contain || 'Fit (Contain)';
    }
    if (coverOption && langData.scale) {
      coverOption.textContent = langData.scale.cover || 'Fill (Cover)';
    }
  }
}

/**
 * 初始化语言设置
 */
function initLanguage() {
  // 从localStorage加载语言设置
  const savedLang = localStorage.getItem('snappicedit-lang');
  if (savedLang && i18n[savedLang]) {
    currentLang = savedLang;
    document.getElementById('language-selector').value = savedLang;
  }

  // 应用语言设置
  updateLanguage(currentLang);
}

// 导出函数
window.updateLanguage = updateLanguage;
window.initLanguage = initLanguage;
window.i18n = i18n;
window.currentLang = currentLang;

// 初始化语言
document.addEventListener('DOMContentLoaded', initLanguage);