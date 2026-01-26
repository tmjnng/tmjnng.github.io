const i18n = {
  en: {
    pageTitle: "Database Designer - Web Database Design Tool",
    appTitle: "Database Designer",
    toolbar: {
      new: "New",
      save: "Save",
      export: "Export",
      import: "Import",
      addTable: "Add Table",
      addField: "Add Field",
      addRelation: "Add Relation",
      delete: "Delete"
    },
    panels: {
      tableList: "Table Structure",
      propertyPanel: "Property Editor",
      canvas: "Canvas"
    },
    tables: {
      empty: "No tables yet. Click 'Add Table' to create one.",
      tableProperties: "Table Properties",
      editTable: "Edit Table",
      addField: "Add Field",
      fieldList: "Field List",
      fieldProperties: "Field Properties",
      editField: "Edit Field"
    },
    fields: {
      name: "Field Name",
      type: "Data Type",
      length: "Length",
      default: "Default Value",
      nullable: "Allow NULL",
      primary: "Primary Key",
      unique: "Unique",
      comment: "Comment"
    },
    modal: {
      editTable: "Edit Table",
      tableName: "Table Name",
      tableComment: "Comment",
      editField: "Edit Field",
      fieldName: "Field Name",
      cancel: "Cancel",
      save: "Save"
    },
    messages: {
      confirmNew: "Are you sure you want to create a new design? Unsaved changes will be lost.",
      confirmDelete: "Are you sure you want to delete the selected element?",
      saved: "Design has been saved to local storage",
      imported: "Design has been successfully imported",
      importFailed: "Import failed: Invalid JSON file",
      exportFormat: "Please select export format:\n1. JSON\n2. SQL",
      exportSuccess: "Design exported successfully",
      atLeastTwoTables: "At least two tables are required to create a relation"
    },
    dataTypes: {
      INT: "INT",
      VARCHAR: "VARCHAR",
      TEXT: "TEXT",
      DATE: "DATE",
      DATETIME: "DATETIME",
      BOOLEAN: "BOOLEAN",
      FLOAT: "FLOAT"
    }
  },

  zh: {
    pageTitle: "Database Designer - Web版数据库设计工具",
    appTitle: "Database Designer",
    toolbar: {
      new: "新建",
      save: "保存",
      export: "导出",
      import: "导入",
      addTable: "添加表",
      addField: "添加字段",
      addRelation: "添加关系",
      delete: "删除"
    },
    panels: {
      tableList: "表结构",
      propertyPanel: "属性编辑",
      canvas: "画布"
    },
    tables: {
      empty: "暂无表，点击'添加表'创建一个。",
      tableProperties: "表属性",
      editTable: "编辑表",
      addField: "添加字段",
      fieldList: "字段列表",
      fieldProperties: "字段属性",
      editField: "编辑字段"
    },
    fields: {
      name: "字段名",
      type: "数据类型",
      length: "长度",
      default: "默认值",
      nullable: "允许为空",
      primary: "主键",
      unique: "唯一",
      comment: "注释"
    },
    modal: {
      editTable: "编辑表",
      tableName: "表名",
      tableComment: "注释",
      editField: "编辑字段",
      fieldName: "字段名",
      cancel: "取消",
      save: "保存"
    },
    messages: {
      confirmNew: "确定要新建设计吗？当前未保存的更改将丢失。",
      confirmDelete: "确定要删除选中的元素吗？",
      saved: "设计已保存到本地存储",
      imported: "设计已成功导入",
      importFailed: "导入失败：无效的JSON文件",
      exportFormat: "请选择导出格式：\n1. JSON\n2. SQL",
      exportSuccess: "设计导出成功",
      atLeastTwoTables: "至少需要两个表才能创建关系"
    },
    dataTypes: {
      INT: "INT",
      VARCHAR: "VARCHAR",
      TEXT: "TEXT",
      DATE: "DATE",
      DATETIME: "DATETIME",
      BOOLEAN: "BOOLEAN",
      FLOAT: "FLOAT"
    }
  },

  ja: {
    pageTitle: "Database Designer - Web版データベース設計ツール",
    appTitle: "Database Designer",
    toolbar: {
      new: "新規作成",
      save: "保存",
      export: "エクスポート",
      import: "インポート",
      addTable: "テーブル追加",
      addField: "フィールド追加",
      addRelation: "リレーション追加",
      delete: "削除"
    },
    panels: {
      tableList: "テーブル構造",
      propertyPanel: "プロパティ編集",
      canvas: "キャンバス"
    },
    tables: {
      empty: "テーブルがありません。「テーブル追加」をクリックして作成してください。",
      tableProperties: "テーブルプロパティ",
      editTable: "テーブル編集",
      addField: "フィールド追加",
      fieldList: "フィールドリスト",
      fieldProperties: "フィールドプロパティ",
      editField: "フィールド編集"
    },
    fields: {
      name: "フィールド名",
      type: "データ型",
      length: "長さ",
      default: "デフォルト値",
      nullable: "NULLを許可",
      primary: "主キー",
      unique: "一意",
      comment: "コメント"
    },
    modal: {
      editTable: "テーブル編集",
      tableName: "テーブル名",
      tableComment: "コメント",
      editField: "フィールド編集",
      fieldName: "フィールド名",
      cancel: "キャンセル",
      save: "保存"
    },
    messages: {
      confirmNew: "新規作成しますか？未保存の変更は失われます。",
      confirmDelete: "選択した要素を削除しますか？",
      saved: "設計がローカルストレージに保存されました",
      imported: "設計が正常にインポートされました",
      importFailed: "インポート失敗：無効なJSONファイル",
      exportFormat: "エクスポート形式を選択してください：\n1. JSON\n2. SQL",
      exportSuccess: "設計が正常にエクスポートされました",
      atLeastTwoTables: "リレーションを作成するには少なくとも2つのテーブルが必要です"
    },
    dataTypes: {
      INT: "INT",
      VARCHAR: "VARCHAR",
      TEXT: "TEXT",
      DATE: "DATE",
      DATETIME: "DATETIME",
      BOOLEAN: "BOOLEAN",
      FLOAT: "FLOAT"
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
  document.getElementById('btn-add-table').textContent = langData.toolbar.addTable;
  document.getElementById('btn-add-field').textContent = langData.toolbar.addField;
  document.getElementById('btn-add-relation').textContent = langData.toolbar.addRelation;
  document.getElementById('btn-delete').textContent = langData.toolbar.delete;
  
  document.querySelector('#table-list h3').textContent = langData.panels.tableList;
  document.querySelector('#property-panel h3').textContent = langData.panels.propertyPanel;
  
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