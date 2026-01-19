// 简单的数据库测试脚本
// 在浏览器控制台中运行此脚本来测试数据库功能

console.log('开始测试数据库功能...');

// 检查数据库状态
if (typeof checkDBStatus === 'function') {
    checkDBStatus();
}

// 测试获取N5级别的问题
if (typeof db !== 'undefined') {
    console.log('测试获取N5级别问题...');
    db.getQuestionsByLevel('N5', (questions) => {
        console.log('获取到N5问题数量:', questions.length);
        if (questions.length > 0) {
            console.log('第一个问题:', questions[0]);
        } else {
            console.log('没有获取到问题，尝试重新加载...');
            if (typeof reloadQuestions === 'function') {
                reloadQuestions();
            }
        }
    });
} else {
    console.error('数据库对象未定义');
}