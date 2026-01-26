const i18n = {
  en: {
    pageTitle: "Lottery System",
    appTitle: "Lottery System",
    header: {
      resetAll: "Reset All Data",
      importSample: "Import Sample"
    },
    panels: {
      participantManagement: "Participant Management",
      prizeManagement: "Prize Management",
      prizeLevelManagement: "Prize Level Management",
      drawResult: "Draw Result"
    },
    participant: {
      import: "Import Participants",
      exportSample: "Sample",
      add: "Add Participant",
      name: "Name",
      phone: "Phone",
      email: "Email",
      department: "Department",
      actions: "Actions",
      delete: "Delete",
      empty: "No participants yet. Click 'Add Participant' to add one."
    },
    prize: {
      import: "Import Prizes",
      exportSample: "Sample",
      add: "Add Prize",
      name: "Prize Name",
      quantity: "Quantity",
      level: "Prize Level",
      actions: "Actions",
      delete: "Delete",
      empty: "No prizes yet. Click 'Add Prize' to add one."
    },
    prizeLevel: {
      import: "Import Prize Levels",
      exportSample: "Sample",
      add: "Add Prize Level",
      name: "Level Name",
      probability: "Probability (%)",
      color: "Color",
      actions: "Actions",
      delete: "Delete",
      empty: "No prize levels yet. Click 'Add Prize Level' to add one."
    },
    draw: {
      start: "Start Draw",
      reset: "Reset Result",
      winner: "Winner",
      prize: "Prize",
      level: "Level",
      noWinner: "No winner yet. Click 'Start Draw' to start.",
      selectLevel: "Select Prize Level",
      count: "Draw Count",
      placeholder: "Click 'Start Draw' to begin"
    },
    panels: {
      participantManagement: "Participant Management",
      prizeManagement: "Prize Management",
      prizeLevelManagement: "Prize Level Management",
      drawResult: "Draw Result",
      drawArea: "Draw Area"
    },
    messages: {
      confirmReset: "Are you sure you want to reset all data? This action cannot be undone.",
      confirmDelete: "Are you sure you want to delete this item?",
      confirmImport: "This will replace existing data. Are you sure?",
      importSuccess: "Import successful!",
      importFailed: "Import failed: Invalid file format",
      exportSuccess: "Export successful!",
      drawStarted: "Draw started!",
      drawCompleted: "Draw completed!",
      noParticipants: "Please add participants first!",
      noPrizes: "Please add prizes first!",
      noPrizeLevels: "Please add prize levels first!",
      fileFormatError: "File format error. Please use JSON, CSV, or TXT format.",
      selectPrizeLevel: "Please select a prize level",
      prizesAllGiven: "All prizes in this level have been given out",
      sampleImported: "Sample data imported successfully!\n\nPrize levels: 5\nParticipants: 8\nPrizes: 5 types"
    },
    buttons: {
      confirm: "Confirm",
      cancel: "Cancel",
      close: "Close",
      save: "Save",
      export: "Export"
    }
  },

  zh: {
    pageTitle: "抽奖系统",
    appTitle: "抽奖系统",
    header: {
      resetAll: "重置所有数据",
      importSample: "一键导入示例"
    },
    panels: {
      participantManagement: "名单管理",
      prizeManagement: "奖品管理",
      prizeLevelManagement: "奖品级别管理",
      drawResult: "抽奖结果"
    },
    participant: {
      import: "导入名单",
      exportSample: "示例",
      add: "添加名单",
      name: "姓名",
      phone: "电话",
      email: "邮箱",
      department: "部门",
      actions: "操作",
      delete: "删除",
      empty: "暂无名单，点击'添加名单'添加一个。"
    },
    prize: {
      import: "导入奖品",
      exportSample: "示例",
      add: "添加奖品",
      name: "奖品名称",
      quantity: "数量",
      level: "奖品级别",
      actions: "操作",
      delete: "删除",
      empty: "暂无奖品，点击'添加奖品'添加一个。"
    },
    prizeLevel: {
      import: "导入奖品级别",
      exportSample: "示例",
      add: "添加奖品级别",
      name: "级别名称",
      probability: "概率 (%)",
      color: "颜色",
      actions: "操作",
      delete: "删除",
      empty: "暂无奖品级别，点击'添加奖品级别'添加一个。"
    },
    draw: {
      start: "开始抽奖",
      reset: "重置结果",
      winner: "中奖者",
      prize: "奖品",
      level: "级别",
      noWinner: "暂无中奖者，点击'开始抽奖'开始。",
      selectLevel: "选择奖品级别",
      count: "抽取人数",
      placeholder: "点击'开始抽奖'开始"
    },
    panels: {
      participantManagement: "名单管理",
      prizeManagement: "奖品管理",
      prizeLevelManagement: "奖品级别",
      drawResult: "中奖记录",
      drawArea: "抽奖区域"
    },
    participant: {
      import: "导入名单",
      exportSample: "示例",
      add: "添加名单",
      name: "姓名",
      phone: "电话",
      email: "邮箱",
      department: "部门",
      actions: "操作",
      delete: "删除",
      empty: "暂无名单，点击'添加名单'添加一个。",
      total: "总人数: ",
      won: "已中奖: ",
      remaining: "剩余: "
    },
    prize: {
      import: "导入奖品",
      exportSample: "示例",
      add: "添加奖品",
      name: "奖品名称",
      quantity: "数量",
      level: "奖品级别",
      actions: "操作",
      delete: "删除",
      empty: "暂无奖品，点击'添加奖品'添加一个。",
      total: "总奖品: ",
      given: "已送出: "
    },
    prizeLevel: {
      import: "导入奖品级别",
      exportSample: "示例",
      add: "添加奖品级别",
      name: "级别名称",
      probability: "概率 (%)",
      color: "颜色",
      actions: "操作",
      delete: "删除",
      empty: "暂无奖品级别，点击'添加奖品级别'添加一个。"
    },
    messages: {
      confirmReset: "确定要重置所有数据吗？此操作无法撤销。",
      confirmDelete: "确定要删除此项吗？",
      confirmImport: "这将替换现有数据。确定要继续吗？",
      importSuccess: "导入成功！",
      importFailed: "导入失败：文件格式错误",
      exportSuccess: "导出成功！",
      drawStarted: "抽奖开始！",
      drawCompleted: "抽奖完成！",
      noParticipants: "请先添加名单！",
      noPrizes: "请先添加奖品！",
      noPrizeLevels: "请先添加奖品级别！",
      fileFormatError: "文件格式错误。请使用JSON、CSV或TXT格式。",
      selectPrizeLevel: "请选择奖品级别",
      prizesAllGiven: "该级别奖品已全部送出",
      sampleImported: "示例数据导入成功！\n\n奖品级别：5个\n名单人数：8人\n奖品数量：5种"
    },
    buttons: {
      confirm: "确定",
      cancel: "取消",
      close: "关闭",
      save: "保存",
      export: "导出"
    }
  },

  ja: {
    pageTitle: "抽選システム",
    appTitle: "抽選システム",
    header: {
      resetAll: "すべてのデータをリセット",
      importSample: "サンプルを一括インポート"
    },
    panels: {
      participantManagement: "参加者管理",
      prizeManagement: "景品管理",
      prizeLevelManagement: "景品レベル管理",
      drawResult: "抽選結果",
      drawArea: "抽選エリア"
    },
    participant: {
      import: "参加者をインポート",
      exportSample: "サンプル",
      add: "参加者を追加",
      name: "名前",
      phone: "電話番号",
      email: "メールアドレス",
      department: "部門",
      actions: "操作",
      delete: "削除",
      empty: "参加者がいません。「参加者を追加」をクリックして追加してください。",
      total: "総人数: ",
      won: "当選済み: ",
      remaining: "残り: "
    },
    prize: {
      import: "景品をインポート",
      exportSample: "サンプル",
      add: "景品を追加",
      name: "景品名",
      quantity: "数量",
      level: "景品レベル",
      actions: "操作",
      delete: "削除",
      empty: "景品がありません。「景品を追加」をクリックして追加してください。",
      total: "総景品: ",
      given: "配布済み: "
    },
    prizeLevel: {
      import: "景品レベルをインポート",
      exportSample: "サンプル",
      add: "景品レベルを追加",
      name: "レベル名",
      probability: "確率 (%)",
      color: "色",
      actions: "操作",
      delete: "削除",
      empty: "景品レベルがありません。「景品レベルを追加」をクリックして追加してください。"
    },
    draw: {
      start: "抽選開始",
      reset: "結果をリセット",
      winner: "当選者",
      prize: "景品",
      level: "レベル",
      noWinner: "当選者がいません。「抽選開始」をクリックして開始してください。",
      selectLevel: "景品レベルを選択",
      count: "抽選人数",
      placeholder: "「抽選開始」をクリックして開始"
    },
    messages: {
      confirmReset: "すべてのデータをリセットしますか？この操作は取り消せません。",
      confirmDelete: "この項目を削除しますか？",
      confirmImport: "既存のデータが置き換われます。続行しますか？",
      importSuccess: "インポート成功！",
      importFailed: "インポート失敗：ファイルフォーマットエラー",
      exportSuccess: "エクスポート成功！",
      drawStarted: "抽選開始！",
      drawCompleted: "抽選完了！",
      noParticipants: "まず参加者を追加してください！",
      noPrizes: "まず景品を追加してください！",
      noPrizeLevels: "まず景品レベルを追加してください！",
      fileFormatError: "ファイルフォーマットエラー。JSON、CSV、またはTXT形式を使用してください。",
      selectPrizeLevel: "景品レベルを選択してください",
      prizesAllGiven: "このレベルの景品はすべて配布されました",
      sampleImported: "サンプルデータが正常にインポートされました！\n\n景品レベル：5\n参加者：8\n景品：5種類"
    },
    buttons: {
      confirm: "確定",
      cancel: "キャンセル",
      close: "閉じる",
      save: "保存",
      export: "エクスポート"
    }
  }
};

let currentLang = 'zh';

function updateLanguage(lang) {
  currentLang = lang;
  const langData = i18n[lang];
  
  document.title = langData.pageTitle;
  document.querySelector('.header h1').textContent = langData.appTitle;
  
  document.getElementById('btn-reset').textContent = langData.header.resetAll;
  document.getElementById('btn-sample').textContent = langData.header.importSample;
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const keys = key.split('.');
    let value = langData;
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        value = null;
        break;
      }
    }
    if (value) {
      const childNodes = Array.from(el.childNodes);
      childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = value;
        }
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  updateLanguage('zh');
});