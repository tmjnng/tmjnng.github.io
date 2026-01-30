document.addEventListener('DOMContentLoaded', function() {
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const wordCountEl = document.getElementById('word-count');
    const saveStatusEl = document.getElementById('save-status');
    
    let undoStack = [];
    let redoStack = [];
    let isDarkMode = false;
    let currentLang = 'zh';
    let historyList = [];
    let selectedImages = [];
    
    const translations = {
        zh: {
            title: '微信公众号图文排版工具',
            templateH1: '标题1',
            templateH2: '标题2',
            templateH3: '标题3',
            templateP: '正文',
            templateBlockquote: '引用',
            templateCode: '代码',
            templateTable: '表格',
            templateHr: '分割线',
            templateSmall: '注释',
            undo: '撤销',
            redo: '重做',
            clear: '清空',
            history: '历史',
            image: '图片',
            export: '导出',
            theme: '主题',
            copy: '复制',
            wordCount: '字数',
            autoSave: '自动保存中...',
            editor: '编辑区',
            preview: '预览区',
            historyTitle: '历史记录',
            insertImage: '插入图片',
            cancel: '取消',
            insert: '插入',
            copySuccess: '复制成功！',
            copyFailed: '复制失败，请手动复制',
            clearConfirm: '确定要清空编辑器吗？',
            exportSuccess: '导出成功！',
            undoEmpty: '没有可撤销的操作',
            redoEmpty: '没有可重做的操作',
            noHistory: '暂无历史记录',
            saved: '已保存',
            templates: '模板',
            templatesTitle: '文章模板',
            templateApply: '模板已应用'
        },
        en: {
            title: 'WeChat Article Editor',
            templateH1: 'Heading 1',
            templateH2: 'Heading 2',
            templateH3: 'Heading 3',
            templateP: 'Paragraph',
            templateBlockquote: 'Quote',
            templateCode: 'Code',
            templateTable: 'Table',
            templateHr: 'Divider',
            templateSmall: 'Note',
            undo: 'Undo',
            redo: 'Redo',
            clear: 'Clear',
            history: 'History',
            image: 'Image',
            export: 'Export',
            theme: 'Theme',
            copy: 'Copy',
            wordCount: 'Words',
            autoSave: 'Auto saving...',
            editor: 'Editor',
            preview: 'Preview',
            historyTitle: 'History',
            insertImage: 'Insert Image',
            cancel: 'Cancel',
            insert: 'Insert',
            copySuccess: 'Copied successfully!',
            copyFailed: 'Copy failed, please copy manually',
            clearConfirm: 'Are you sure to clear the editor?',
            exportSuccess: 'Exported successfully!',
            undoEmpty: 'Nothing to undo',
            redoEmpty: 'Nothing to redo',
            noHistory: 'No history yet',
            saved: 'Saved',
            templates: 'Templates',
            templatesTitle: 'Article Templates',
            templateApply: 'Template applied'
        },
        ja: {
            title: 'WeChat記事エディター',
            templateH1: '見出し1',
            templateH2: '見出し2',
            templateH3: '見出し3',
            templateP: '本文',
            templateBlockquote: '引用',
            templateCode: 'コード',
            templateTable: '表',
            templateHr: '区切り線',
            templateSmall: '注釈',
            undo: '元に戻す',
            redo: 'やり直し',
            clear: 'クリア',
            history: '履歴',
            image: '画像',
            export: 'エクスポート',
            theme: 'テーマ',
            copy: 'コピー',
            wordCount: '文字数',
            autoSave: '自動保存中...',
            editor: 'エディター',
            preview: 'プレビュー',
            historyTitle: '履歴',
            insertImage: '画像を挿入',
            cancel: 'キャンセル',
            insert: '挿入',
            copySuccess: 'コピー成功！',
            copyFailed: 'コピー失敗、手動でコピーしてください',
            clearConfirm: 'エディターをクリアしますか？',
            exportSuccess: 'エクスポート成功！',
            undoEmpty: '元に戻す操作がありません',
            redoEmpty: 'やり直す操作がありません',
            noHistory: '履歴がありません',
            saved: '保存済み',
            templates: 'テンプレート',
            templatesTitle: '記事テンプレート',
            templateApply: 'テンプレートを適用しました'
        }
    };
    
    // 10款文章模板
    const articleTemplates = {
        1: {
            name: '商务简报',
            content: `<h1 style="font-size:24px; font-weight:bold; margin:20px 0; color:#1890ff;">📊 企业月度简报</h1>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">尊敬的合作伙伴：</p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">感谢您一直以来的支持与信任。以下是本月度工作简报，请您查阅。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">一、本月业绩概览</h2>
<table style="width:100%; border-collapse:collapse; margin:16px 0;">
<tr><th style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;">指标</th><th style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;">数值</th><th style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;">环比</th></tr>
<tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">营收</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">100万</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">+15%</td></tr>
<tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">客户数</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">500</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">+8%</td></tr>
</table>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">二、重点工作</h2>
<ul style="margin-bottom:16px; padding-left:24px;">
<li style="margin-bottom:8px;">完成产品升级迭代</li>
<li style="margin-bottom:8px;">拓展新市场渠道</li>
<li style="margin-bottom:8px;">优化客户服务流程</li>
</ul>
<blockquote style="border-left:4px solid #1890ff; padding-left:16px; margin:16px 0; color:#666;">我们将继续秉承专业、创新、共赢的理念，为您提供更优质的服务。</blockquote>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">如有任何疑问，请随时与我们联系。</p>
<small style="font-size:14px; color:#999;">© 2026 公司名称 | 联系邮箱：contact@company.com</small>`
        },
        2: {
            name: '科技资讯',
            content: `<h1 style="font-size:24px; font-weight:bold; margin:20px 0; color:#722ed1;">🚀 科技前沿：AI技术新突破</h1>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;"><strong>发布时间：</strong>2026年1月30日 | <strong>阅读时间：</strong>5分钟</p>
<hr style="margin:24px 0; border:none; border-top:1px solid #e0e0e0;">
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">近日，人工智能领域迎来重大突破。最新研究表明，新一代AI模型在多个基准测试中创下新纪录。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">技术亮点</h2>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">本次技术突破主要体现在以下几个方面：</p>
<ul style="margin-bottom:16px; padding-left:24px;">
<li style="margin-bottom:8px;"><strong>处理速度提升300%</strong> - 新架构大幅优化了计算效率</li>
<li style="margin-bottom:8px;"><strong>准确率突破99%</strong> - 在图像识别任务中达到人类水平</li>
<li style="margin-bottom:8px;"><strong>能耗降低50%</strong> - 绿色AI技术助力碳中和</li>
</ul>
<pre style="background-color:#f5f5f5; padding:16px; border-radius:4px; overflow-x:auto; margin:16px 0; font-family:monospace; font-size:14px; line-height:1.6;">// 示例代码
const ai = new AIModel();
ai.train(data);
const result = ai.predict(input);
console.log(result.accuracy); // 99.2%</pre>
<blockquote style="border-left:4px solid #722ed1; padding-left:16px; margin:16px 0; color:#666;">这项技术将彻底改变我们与机器交互的方式。 —— 技术专家</blockquote>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">未来，这项技术将在医疗、教育、金融等领域发挥重要作用。让我们拭目以待！</p>
<small style="font-size:14px; color:#999;">关注我们的公众号，获取更多科技资讯</small>`
        },
        3: {
            name: '美食探店',
            content: `<h1 style="font-size:24px; font-weight:bold; margin:20px 0; color:#fa541c;">🍜 探店 | 藏在巷子里的宝藏面馆</h1>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">📍 地址：市中心美食街88号 | 💰 人均：35元</p>
<hr style="margin:24px 0; border:none; border-top:1px solid #e0e0e0;">
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">今天带大家探访一家藏在老巷子里的面馆，虽然位置隐蔽，但每天排队的人络绎不绝。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">🌟 招牌推荐</h2>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;"><strong>红烧牛肉面</strong> - 汤底浓郁，牛肉软烂入味，面条劲道有嚼劲。每一口都是满满的幸福感！</p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;"><strong>特色小笼包</strong> - 皮薄馅大，汤汁丰富。轻轻咬开，鲜美的汤汁在口中爆开，绝了！</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">📝 探店心得</h2>
<blockquote style="border-left:4px solid #fa541c; padding-left:16px; margin:16px 0; color:#666;">这家店的灵魂在于汤底，据说是老板祖传秘方，熬制8小时以上。每一碗面都承载着匠心。</blockquote>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">环境虽然简单，但干净整洁。老板人很热情，还会根据你的口味推荐菜品。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">💡 小贴士</h2>
<ul style="margin-bottom:16px; padding-left:24px;">
<li style="margin-bottom:8px;">建议错峰用餐，避开饭点高峰期</li>
<li style="margin-bottom:8px;">可以免费加面，大胃王福音</li>
<li style="margin-bottom:8px;">记得试试老板自制的辣椒油，香而不燥</li>
</ul>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">总之，这是一家值得专程去吃的面馆！强烈推荐给大家～</p>
<small style="font-size:14px; color:#999;">关注我的美食探店日记，发现更多美味</small>`
        },
        4: {
            name: '旅行游记',
            content: `<h1 style="font-size:24px; font-weight:bold; margin:20px 0; color:#52c41a;">🌿 云南七日游 | 寻找心中的香格里拉</h1>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">📅 旅行时间：2026年1月 | 🗺️ 路线：昆明-大理-丽江-香格里拉</p>
<hr style="margin:24px 0; border:none; border-top:1px solid #e0e0e0;">
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">云南，一个让人魂牵梦绕的地方。这里有蓝天白云，有雪山草甸，有古城小巷，更有那份难得的宁静与美好。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">Day 1-2：昆明，春城之约</h2>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">第一站来到昆明，这座四季如春的城市。翠湖边的红嘴鸥，滇池的落日，都让人流连忘返。</p>
<blockquote style="border-left:4px solid #52c41a; padding-left:16px; margin:16px 0; color:#666;">走在昆明的街头，空气中弥漫着花香，仿佛整个城市都是一个巨大的花园。</blockquote>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">Day 3-4：大理，风花雪月</h2>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">大理古城的慢生活，洱海的波光粼粼，苍山的云雾缭绕。在这里，时间仿佛静止了。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">Day 5-7：香格里拉，心中的日月</h2>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">终于来到此行最期待的地方——香格里拉。普达措国家公园的原始森林，松赞林寺的庄严肃穆，都让我深深震撼。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">💰 费用参考</h2>
<table style="width:100%; border-collapse:collapse; margin:16px 0;">
<tr><th style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;">项目</th><th style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;">费用</th></tr>
<tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">交通</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">2000元</td></tr>
<tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">住宿</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">1500元</td></tr>
<tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">餐饮</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">1000元</td></tr>
</table>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">七天的旅程，让我找到了心中的香格里拉。这里不仅有绝美的风景，更有那份难得的宁静与纯粹。</p>
<small style="font-size:14px; color:#999;">关注我，一起探索更多美好风景</small>`
        },
        5: {
            name: '读书笔记',
            content: `<h1 style="font-size:24px; font-weight:bold; margin:20px 0; color:#fa8c16;">📚 读书笔记 | 《活着》——生命的韧性</h1>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">作者：余华 | 推荐指数：⭐⭐⭐⭐⭐</p>
<hr style="margin:24px 0; border:none; border-top:1px solid #e0e0e0;">
<blockquote style="border-left:4px solid #fa8c16; padding-left:16px; margin:16px 0; color:#666;">人是为了活着本身而活着，而不是为了活着之外的任何事物所活着。</blockquote>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">读完《活着》，内心久久不能平静。福贵的一生，是苦难的一生，也是坚韧的一生。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">📖 内容概要</h2>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">小说讲述了福贵从富家少爷到贫苦农民的一生。他经历了内战、三反五反、大跃进、文化大革命等社会变革，目睹了所有亲人的离世，最后只剩下一头老牛相伴。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">💭 我的感悟</h2>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;"><strong>1. 生命的韧性</strong></p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">福贵经历了那么多苦难，却依然坚强地活着。这种生命的韧性，让我深深震撼。</p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;"><strong>2. 珍惜当下</strong></p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">书中亲人的一个个离去，让我更加珍惜身边的人。生命无常，我们要好好把握当下。</p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;"><strong>3. 简单的幸福</strong></p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">福贵最后与老牛相依为命，却也能在平凡中找到快乐。幸福其实很简单。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">📝 金句摘录</h2>
<ul style="margin-bottom:16px; padding-left:24px;">
<li style="margin-bottom:8px;">没有什么比时间更具有说服力了，因为时间无需通知我们就可以改变一切。</li>
<li style="margin-bottom:8px;">最初我们来到这个世界，是因为不得不来；最终我们离开这个世界，是因为不得不走。</li>
<li style="margin-bottom:8px;">生活是属于每个人自己的感受，不属于任何别人的看法。</li>
</ul>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">这是一本值得每个人阅读的书。它让我们思考生命的意义，学会珍惜和感恩。</p>
<small style="font-size:14px; color:#999;">每月一本好书，让阅读成为习惯</small>`
        },
        6: {
            name: '节日祝福',
            content: `<h1 style="font-size:28px; font-weight:bold; margin:20px 0; color:#eb2f96; text-align:center;">🎉 新年快乐 🎉</h1>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px; text-align:center;">恭贺新禧 · 万事如意 · 阖家欢乐</p>
<hr style="margin:24px 0; border:none; border-top:2px solid #eb2f96;">
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">亲爱的朋友们：</p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">值此新春佳节之际，向您和您的家人致以最诚挚的祝福！</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0; color:#eb2f96;">🧧 新年祝福</h2>
<blockquote style="border-left:4px solid #eb2f96; padding-left:16px; margin:16px 0; color:#666; background-color:#fff0f6; padding:16px; border-radius:4px;">
<p style="margin:0;">祝您在新的一年里：</p>
<p style="margin:8px 0 0 0;">🏮 身体健康，阖家幸福</p>
<p style="margin:8px 0 0 0;">💰 财源广进，事业腾飞</p>
<p style="margin:8px 0 0 0;">🎊 心想事成，万事如意</p>
</blockquote>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0; color:#eb2f96;">🎁 特别活动</h2>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">为庆祝新年，我们特别准备了以下活动：</p>
<ul style="margin-bottom:16px; padding-left:24px;">
<li style="margin-bottom:8px;">🎊 新年大礼包，限时免费领取</li>
<li style="margin-bottom:8px;">🧧 红包雨，整点发放</li>
<li style="margin-bottom:8px;">🎁 满减优惠，最高可减100元</li>
</ul>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">活动时间：即日起至正月十五</p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px; text-align:center;"><strong>再次祝您新年快乐，万事如意！</strong></p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px; text-align:right;">您的朋友 敬上</p>
<small style="font-size:14px; color:#999; text-align:center; display:block;">2026年新春</small>`
        },
        7: {
            name: '健康生活',
            content: `<h1 style="font-size:24px; font-weight:bold; margin:20px 0; color:#13c2c2;">🌱 健康生活 | 科学养生指南</h1>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">💪 关注健康，从今天开始</p>
<hr style="margin:24px 0; border:none; border-top:1px solid #e0e0e0;">
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">健康是人生最大的财富。今天和大家分享一些科学养生的实用建议。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">🥗 饮食健康</h2>
<blockquote style="border-left:4px solid #13c2c2; padding-left:16px; margin:16px 0; color:#666;">你是你吃出来的。合理的饮食结构是健康的基础。</blockquote>
<ul style="margin-bottom:16px; padding-left:24px;">
<li style="margin-bottom:8px;"><strong>多吃蔬菜水果</strong> - 每天摄入300-500克蔬菜和200-350克水果</li>
<li style="margin-bottom:8px;"><strong>适量蛋白质</strong> - 鱼、肉、蛋、奶、豆制品合理搭配</li>
<li style="margin-bottom:8px;"><strong>少油少盐</strong> - 每天食盐不超过6克，烹调油25-30克</li>
<li style="margin-bottom:8px;"><strong>多喝水</strong> - 每天饮水1500-1700毫升</li>
</ul>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">🏃 运动健身</h2>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">世界卫生组织建议，成年人每周至少进行150分钟中等强度有氧运动。</p>
<table style="width:100%; border-collapse:collapse; margin:16px 0;">
<tr><th style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;">运动类型</th><th style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;">推荐频率</th><th style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;">好处</th></tr>
<tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">快走/慢跑</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">每周5次</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">心肺功能</td></tr>
<tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">力量训练</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">每周2-3次</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">肌肉骨骼</td></tr>
<tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">瑜伽/拉伸</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">每周2-3次</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">柔韧性</td></tr>
</table>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">😴 睡眠管理</h2>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">良好的睡眠是健康的保障。建议成年人每天睡眠7-8小时。</p>
<ul style="margin-bottom:16px; padding-left:24px;">
<li style="margin-bottom:8px;">规律作息，固定睡眠时间</li>
<li style="margin-bottom:8px;">睡前1小时避免使用电子产品</li>
<li style="margin-bottom:8px;">保持卧室安静、黑暗、凉爽</li>
<li style="margin-bottom:8px;">避免睡前大量进食和饮酒</li>
</ul>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">健康的生活方式需要长期坚持。让我们一起，从今天开始，为自己的健康负责！</p>
<small style="font-size:14px; color:#999;">关注健康，享受生活</small>`
        },
        8: {
            name: '教育培训',
            content: `<h1 style="font-size:24px; font-weight:bold; margin:20px 0; color:#2f54eb;">📚 课程介绍 | Python编程入门</h1>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">零基础入门 · 实战项目 · 就业指导</p>
<hr style="margin:24px 0; border:none; border-top:1px solid #e0e0e0;">
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">想要学习编程，却不知从何开始？我们的Python编程入门课程，专为零基础学员设计，带你轻松入门编程世界。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">🎯 课程特色</h2>
<ul style="margin-bottom:16px; padding-left:24px;">
<li style="margin-bottom:8px;"><strong>零基础友好</strong> - 从最基本的概念讲起，无需任何编程基础</li>
<li style="margin-bottom:8px;"><strong>项目实战</strong> - 10+实战项目，学以致用</li>
<li style="margin-bottom:8px;"><strong>名师授课</strong> - 资深工程师一对一答疑</li>
<li style="margin-bottom:8px;"><strong>就业指导</strong> - 简历优化、面试辅导、就业推荐</li>
</ul>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">📋 课程大纲</h2>
<table style="width:100%; border-collapse:collapse; margin:16px 0;">
<tr><th style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;">阶段</th><th style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;">内容</th><th style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;">课时</th></tr>
<tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">第一阶段</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">Python基础语法</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">20课时</td></tr>
<tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">第二阶段</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">数据结构与算法</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">15课时</td></tr>
<tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">第三阶段</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">Web开发实战</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">25课时</td></tr>
<tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">第四阶段</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">数据分析与可视化</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">20课时</td></tr>
</table>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">💻 实战项目</h2>
<pre style="background-color:#f5f5f5; padding:16px; border-radius:4px; overflow-x:auto; margin:16px 0; font-family:monospace; font-size:14px; line-height:1.6;"># 项目示例：简易计算器
def calculator():
    print("欢迎使用Python计算器！")
    # 更多代码...

calculator()</pre>
<blockquote style="border-left:4px solid #2f54eb; padding-left:16px; margin:16px 0; color:#666;">通过本课程的学习，学员将掌握Python编程的核心技能，能够独立完成项目开发。</blockquote>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">🎁 报名方式</h2>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">现在报名，享受早鸟优惠价！</p>
<ul style="margin-bottom:16px; padding-left:24px;">
<li style="margin-bottom:8px;">📞 咨询电话：400-123-4567</li>
<li style="margin-bottom:8px;">📧 邮箱：course@example.com</li>
<li style="margin-bottom:8px;">🌐 网址：www.example.com</li>
</ul>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;"><strong>名额有限，先到先得！</strong></p>
<small style="font-size:14px; color:#999;">开启编程之旅，成就更好的自己</small>`
        },
        9: {
            name: '时尚穿搭',
            content: `<h1 style="font-size:24px; font-weight:bold; margin:20px 0; color:#f5222d;">👗 时尚穿搭 | 春日穿搭指南</h1>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">春暖花开，穿出你的时尚感</p>
<hr style="margin:24px 0; border:none; border-top:1px solid #e0e0e0;">
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">春天来了，衣橱也该换季了！今天和大家分享几套春日穿搭，让你在这个季节美出新高度。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">🌸 Look 1：温柔知性风</h2>
<blockquote style="border-left:4px solid #f5222d; padding-left:16px; margin:16px 0; color:#666;">米色针织衫 + 白色阔腿裤 + 小白鞋 = 温柔知性</blockquote>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">这套搭配适合日常通勤，既舒适又不失优雅。米色和白色的组合，给人一种温柔干净的感觉。</p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;"><strong>搭配要点：</strong></p>
<ul style="margin-bottom:16px; padding-left:24px;">
<li style="margin-bottom:8px;">选择质地柔软的针织衫，更显温柔</li>
<li style="margin-bottom:8px;">阔腿裤可以修饰腿型，显高显瘦</li>
<li style="margin-bottom:8px;">配饰选择简约的金属项链，提升精致感</li>
</ul>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">🌿 Look 2：清新文艺风</h2>
<blockquote style="border-left:4px solid #52c41a; padding-left:16px; margin:16px 0; color:#666;">碎花连衣裙 + 牛仔外套 + 帆布鞋 = 清新文艺</blockquote>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">春天怎么能少了碎花元素？这套搭配充满了春日的气息，适合周末出游或约会。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">💼 Look 3：干练职场风</h2>
<blockquote style="border-left:4px solid #1890ff; padding-left:16px; margin:16px 0; color:#666;">西装外套 + 衬衫 + 九分裤 + 高跟鞋 = 干练职场</blockquote>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">职场穿搭讲究干练专业。选择剪裁合身的西装，搭配简约的衬衫，展现职业女性的魅力。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">🎨 配色建议</h2>
<table style="width:100%; border-collapse:collapse; margin:16px 0;">
<tr><th style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;">风格</th><th style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;">推荐配色</th></tr>
<tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">温柔风</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">米色、粉色、白色</td></tr>
<tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">清新风</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">浅蓝、薄荷绿、淡黄</td></tr>
<tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">职场风</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">黑、白、灰、藏青</td></tr>
</table>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">穿搭是一门艺术，最重要的是穿出自己的风格。希望这些搭配能给你一些灵感！</p>
<small style="font-size:14px; color:#999;">关注我，获取更多穿搭灵感</small>`
        },
        10: {
            name: '个人随笔',
            content: `<h1 style="font-size:24px; font-weight:bold; margin:20px 0; color:#595959;">✍️ 随笔 | 关于成长的一些思考</h1>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">2026年1月30日 | 心情：平静</p>
<hr style="margin:24px 0; border:none; border-top:1px solid #e0e0e0;">
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">最近常常在想，成长到底是什么？</p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">小时候以为，成长就是长高、长大，就是可以自己做决定，不用再听父母的话。后来才发现，成长远比这复杂得多。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">成长是学会接受</h2>
<blockquote style="border-left:4px solid #595959; padding-left:16px; margin:16px 0; color:#666;">接受生活的不完美，接受自己的平凡，接受有些事情无论如何努力也无法改变。</blockquote>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">这不是妥协，而是一种智慧。当我们学会接受，内心反而会变得更加平静和强大。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">成长是学会独处</h2>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">以前害怕一个人，总觉得孤独是可耻的。现在反而享受独处的时光。</p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">一个人读书、一个人散步、一个人发呆。在这些独处的时刻里，我听到了内心真实的声音。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">成长是学会感恩</h2>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">开始懂得感恩父母的养育之恩，感恩朋友的陪伴之情，感恩生活中每一个温暖的瞬间。</p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">当我们心怀感恩，会发现这个世界其实充满了美好。</p>
<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">写在最后</h2>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">成长是一场漫长的修行，没有终点，只有过程。</p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">愿我们都能在成长的路上，成为更好的自己。</p>
<p style="font-size:16px; line-height:1.8; margin-bottom:16px; text-align:right;">—— 致每一个正在成长的你</p>
<small style="font-size:14px; color:#999;">记录生活，记录成长</small>`
        }
    };

    initEditor();
    initEventListeners();
    loadDraft();
    loadHistory();
    loadTheme();
    startAutoSave();
    
    function initEditor() {
        if (!editor) {
            console.error('编辑器元素未找到');
            return;
        }
        
        if (!editor.innerHTML || !editor.innerHTML.trim()) {
            editor.innerHTML = '<p>在此输入内容...</p>';
        }
        
        saveState();
        updatePreview();
        updateWordCount();
    }
    
    function initEventListeners() {
        if (!editor) {
            console.error('编辑器元素未找到，无法绑定事件');
            return;
        }
        
        editor.addEventListener('input', handleInput);
        editor.addEventListener('paste', handlePaste);
        editor.addEventListener('keydown', handleKeydown);
        
        document.querySelectorAll('.template-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const template = this.dataset.template;
                insertTemplate(template);
            });
        });
        
        document.getElementById('copy-btn').addEventListener('click', copyToClipboard);
        document.getElementById('undo-btn').addEventListener('click', undo);
        document.getElementById('redo-btn').addEventListener('click', redo);
        document.getElementById('clear-btn').addEventListener('click', clearEditor);
        document.getElementById('history-btn').addEventListener('click', toggleHistory);
        document.getElementById('close-history').addEventListener('click', toggleHistory);
        document.getElementById('image-btn').addEventListener('click', openImageModal);
        document.getElementById('cancel-image').addEventListener('click', closeImageModal);
        document.getElementById('insert-image').addEventListener('click', insertImages);
        document.getElementById('export-btn').addEventListener('click', exportHTML);
        document.getElementById('templates-btn').addEventListener('click', toggleTemplates);
        document.getElementById('close-templates').addEventListener('click', toggleTemplates);
        
        // 模板卡片点击事件
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', function() {
                const templateId = this.dataset.templateId;
                applyArticleTemplate(templateId);
            });
        });
        document.getElementById('theme-btn').addEventListener('click', toggleTheme);
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                setLanguage(this.dataset.lang);
            });
        });
    }
    
    function handleInput() {
        updatePreview();
        updateWordCount();
        updateUndoRedoButtons();
    }
    
    function handleKeydown(e) {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'z') {
                e.preventDefault();
                undo();
            } else if (e.key === 'y') {
                e.preventDefault();
                redo();
            } else if (e.key === 's') {
                e.preventDefault();
                saveDraft();
                showNotification(translations[currentLang].saved);
            }
        }
    }
    
    function handlePaste(e) {
        e.preventDefault();
        
        let html = e.clipboardData.getData('text/html');
        
        if (!html) {
            const text = e.clipboardData.getData('text');
            document.execCommand('insertText', false, text);
            saveState();
            return;
        }
        
        const cleanedHtml = sanitizeForChat(html);
        document.execCommand('insertHTML', false, cleanedHtml);
        saveState();
        updatePreview();
    }
    
    function insertTemplate(type) {
        let templateHTML = '';
        
        switch (type) {
            case 'h1':
                templateHTML = '<h1 style="font-size:24px; font-weight:bold; margin:20px 0;">请输入标题</h1>';
                break;
            case 'h2':
                templateHTML = '<h2 style="font-size:20px; font-weight:bold; margin:16px 0;">请输入副标题</h2>';
                break;
            case 'h3':
                templateHTML = '<h3 style="font-size:18px; font-weight:bold; margin:12px 0;">请输入三级标题</h3>';
                break;
            case 'p':
                templateHTML = '<p style="font-size:16px; line-height:1.8; margin-bottom:16px;">请输入正文</p>';
                break;
            case 'blockquote':
                templateHTML = '<blockquote style="border-left:4px solid #1890ff; padding-left:16px; margin:16px 0; color:#666;">请输入引用内容</blockquote>';
                break;
            case 'code':
                templateHTML = '<pre style="background-color:#f5f5f5; padding:16px; border-radius:4px; overflow-x:auto; margin:16px 0; font-family:monospace; font-size:14px; line-height:1.6;">请输入代码</pre>';
                break;
            case 'table':
                templateHTML = '<table style="width:100%; border-collapse:collapse; margin:16px 0;"><tr><th style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;">表头1</th><th style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;">表头2</th></tr><tr><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">内容1</td><td style="border:1px solid #e0e0e0; padding:8px 12px; text-align:left;">内容2</td></tr></table>';
                break;
            case 'hr':
                templateHTML = '<hr style="margin:24px 0; border:none; border-top:1px solid #e0e0e0;">';
                break;
            case 'small':
                templateHTML = '<small style="font-size:14px; color:#999;">请输入注释</small>';
                break;
        }
        
        document.execCommand('insertHTML', false, templateHTML);
        saveState();
        updatePreview();
    }
    
    function sanitizeForChat(htmlString) {
        if (!htmlString || htmlString === undefined || htmlString === null) {
            return '';
        }
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
        
        const allowedTags = ['p', 'h1', 'h2', 'h3', 'img', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'hr', 'small', 'br', 'pre', 'code', 'table', 'th', 'td', 'tr'];
        
        function cleanNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                return node;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const tagName = node.tagName.toLowerCase();
                
                if (!allowedTags.includes(tagName)) {
                    const fragment = document.createDocumentFragment();
                    while (node.firstChild) {
                        fragment.appendChild(cleanNode(node.firstChild));
                    }
                    return fragment;
                }
                
                node.removeAttribute('class');
                node.removeAttribute('id');
                
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
                    } else if (tagName === 'pre') {
                        node.style.cssText = 'background-color:#f5f5f5; padding:16px; border-radius:4px; overflow-x:auto; margin:16px 0; font-family:monospace; font-size:14px; line-height:1.6;';
                    } else if (tagName === 'code') {
                        node.style.cssText = 'background-color:#f5f5f5; padding:2px 6px; border-radius:3px; font-family:monospace; font-size:14px;';
                    } else if (tagName === 'table') {
                        node.style.cssText = 'width:100%; border-collapse:collapse; margin:16px 0;';
                    } else if (tagName === 'th') {
                        node.style.cssText = 'border:1px solid #e0e0e0; padding:8px 12px; text-align:left; background-color:#f5f5f5; font-weight:600;';
                    } else if (tagName === 'td') {
                        node.style.cssText = 'border:1px solid #e0e0e0; padding:8px 12px; text-align:left;';
                    }
                }
                
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
        
        const cleanedNode = cleanNode(tempDiv);
        
        let result = '';
        if (cleanedNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            const tempContainer = document.createElement('div');
            tempContainer.appendChild(cleanedNode);
            result = tempContainer.innerHTML;
        } else {
            result = cleanedNode.innerHTML;
        }
        
        return result;
    }
    
    function updatePreview() {
        if (!editor || !preview) {
            console.error('编辑器或预览元素未找到');
            return;
        }
        
        try {
            const editorContent = editor.innerHTML || '';
            const cleanedContent = sanitizeForChat(editorContent);
            
            preview.innerHTML = `
                <div class="preview-content">
                    ${cleanedContent}
                </div>
            `;
        } catch (error) {
            console.error('更新预览时发生错误:', error);
        }
    }
    
    function updateWordCount() {
        if (!editor || !wordCountEl) {
            return;
        }
        
        const text = editor.innerText || '';
        const count = text.replace(/\s/g, '').length;
        wordCountEl.textContent = count;
    }
    
    function saveState() {
        const content = editor.innerHTML;
        undoStack.push(content);
        if (undoStack.length > 50) {
            undoStack.shift();
        }
        redoStack = [];
        updateUndoRedoButtons();
    }
    
    function undo() {
        if (undoStack.length <= 1) {
            showNotification(translations[currentLang].undoEmpty);
            return;
        }
        
        redoStack.push(undoStack.pop());
        const content = undoStack[undoStack.length - 1];
        editor.innerHTML = content;
        updatePreview();
        updateWordCount();
        updateUndoRedoButtons();
    }
    
    function redo() {
        if (redoStack.length === 0) {
            showNotification(translations[currentLang].redoEmpty);
            return;
        }
        
        const content = redoStack.pop();
        undoStack.push(content);
        editor.innerHTML = content;
        updatePreview();
        updateWordCount();
        updateUndoRedoButtons();
    }
    
    function updateUndoRedoButtons() {
        document.getElementById('undo-btn').disabled = undoStack.length <= 1;
        document.getElementById('redo-btn').disabled = redoStack.length === 0;
    }
    
    function clearEditor() {
        if (confirm(translations[currentLang].clearConfirm)) {
            editor.innerHTML = '<p>在此输入内容...</p>';
            saveState();
            updatePreview();
            updateWordCount();
        }
    }
    
    function copyToClipboard() {
        const editorContent = editor.innerHTML;
        const cleanedContent = sanitizeForChat(editorContent);
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(cleanedContent)
                .then(() => {
                    showNotification(translations[currentLang].copySuccess);
                })
                .catch(err => {
                    console.error('复制失败:', err);
                    fallbackCopyTextToClipboard(cleanedContent);
                });
        } else {
            fallbackCopyTextToClipboard(cleanedContent);
        }
    }
    
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showNotification(translations[currentLang].copySuccess);
            } else {
                showNotification(translations[currentLang].copyFailed);
            }
        } catch (err) {
            console.error('复制失败:', err);
            showNotification(translations[currentLang].copyFailed);
        } finally {
            document.body.removeChild(textArea);
        }
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    function saveDraft() {
        const content = editor.innerHTML;
        const today = new Date().toISOString().split('T')[0];
        const key = `wechat-editor-draft-${today}`;
        
        localStorage.setItem(key, content);
        saveStatusEl.textContent = translations[currentLang].saved;
        
        addToHistory(content);
    }
    
    function loadDraft() {
        const today = new Date().toISOString().split('T')[0];
        const key = `wechat-editor-draft-${today}`;
        const savedContent = localStorage.getItem(key);
        
        if (savedContent) {
            editor.innerHTML = savedContent;
            updatePreview();
            updateWordCount();
        }
    }
    
    function startAutoSave() {
        setInterval(() => {
            saveStatusEl.textContent = translations[currentLang].autoSave;
            saveDraft();
        }, 30000);
    }
    
    function toggleHistory() {
        const panel = document.getElementById('history-panel');
        panel.classList.toggle('hidden');
        renderHistoryList();
    }
    
    function addToHistory(content) {
        const now = new Date();
        const historyItem = {
            id: Date.now(),
            content: content,
            timestamp: now.toISOString(),
            displayTime: now.toLocaleString()
        };
        
        historyList.unshift(historyItem);
        if (historyList.length > 20) {
            historyList.pop();
        }
        
        saveHistory();
    }
    
    function saveHistory() {
        localStorage.setItem('wechat-editor-history', JSON.stringify(historyList));
    }
    
    function loadHistory() {
        const savedHistory = localStorage.getItem('wechat-editor-history');
        if (savedHistory) {
            historyList = JSON.parse(savedHistory);
        }
    }
    
    function renderHistoryList() {
        const listEl = document.getElementById('history-list');
        
        if (historyList.length === 0) {
            listEl.innerHTML = `<div style="text-align:center; padding:20px; color:#999;">${translations[currentLang].noHistory}</div>`;
            return;
        }
        
        listEl.innerHTML = historyList.map(item => `
            <div class="history-item" data-id="${item.id}">
                <div class="history-item-time">${item.displayTime}</div>
                <div class="history-item-preview">${item.content.replace(/<[^>]*>/g, '').substring(0, 50)}...</div>
            </div>
        `).join('');
        
        listEl.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const historyItem = historyList.find(h => h.id === id);
                if (historyItem) {
                    editor.innerHTML = historyItem.content;
                    saveState();
                    updatePreview();
                    updateWordCount();
                    showNotification(translations[currentLang].saved);
                }
            });
        });
    }
    
    function openImageModal() {
        document.getElementById('image-modal').classList.remove('hidden');
    }
    
    function closeImageModal() {
        document.getElementById('image-modal').classList.add('hidden');
        document.getElementById('image-input').value = '';
        selectedImages = [];
    }
    
    function insertImages() {
        const input = document.getElementById('image-input');
        const files = input.files;
        
        if (files.length === 0) {
            closeImageModal();
            return;
        }
        
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgHTML = `<img src="${e.target.result}" style="max-width:100%; height:auto; margin:16px 0; border-radius:4px;">`;
                document.execCommand('insertHTML', false, imgHTML);
            };
            reader.readAsDataURL(file);
        });
        
        saveState();
        updatePreview();
        closeImageModal();
    }
    
    function exportHTML() {
        const content = editor.innerHTML;
        const cleanedContent = sanitizeForChat(content);
        
        const fullHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>微信文章</title>
</head>
<body>
    <div class="preview-content">
        ${cleanedContent}
    </div>
</body>
</html>`;
        
        const blob = new Blob([fullHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `wechat-article-${Date.now()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification(translations[currentLang].exportSuccess);
    }
    
    function toggleTheme() {
        isDarkMode = !isDarkMode;
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        document.getElementById('theme-btn').textContent = isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('wechat-editor-theme', isDarkMode ? 'dark' : 'light');
    }
    
    function loadTheme() {
        const savedTheme = localStorage.getItem('wechat-editor-theme');
        if (savedTheme === 'dark') {
            isDarkMode = true;
            document.body.setAttribute('data-theme', 'dark');
            document.getElementById('theme-btn').textContent = '☀️';
        }
    }
    
    function toggleTemplates() {
        const panel = document.getElementById('templates-panel');
        panel.classList.toggle('hidden');
    }
    
    function applyArticleTemplate(templateId) {
        const template = articleTemplates[templateId];
        if (!template) return;
        
        // 确认是否覆盖当前内容
        const editorContent = editor.innerHTML.trim();
        const hasContent = editorContent && editorContent !== '<p>在此输入内容...</p>' && editorContent !== '<p><br></p>';
        
        if (hasContent) {
            if (!confirm('应用模板将覆盖当前内容，是否继续？')) {
                return;
            }
        }
        
        // 应用模板
        editor.innerHTML = template.content;
        saveState();
        updatePreview();
        updateWordCount();
        
        // 关闭模板面板
        toggleTemplates();
        
        // 显示通知
        showNotification(translations[currentLang].templateApply + ': ' + template.name);
    }
    
    function setLanguage(lang) {
        currentLang = lang;
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        const t = translations[lang];
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key]) {
                el.textContent = t[key];
            }
        });
        
        localStorage.setItem('wechat-editor-lang', lang);
    }
});
