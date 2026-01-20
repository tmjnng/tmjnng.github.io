/**
 * 转换词汇题为填空题格式
 * 
 * 逻辑：
 * - 检测题目中是否有 <strong> 标签
 * - 如果 <strong> 内的内容等于正确答案 → 挖空（替换为空白）
 * - 如果 <strong> 内的内容不等于正确答案 → 保持原样
 * - 语法题和阅读理解题保持原样
 */

const fs = require('fs');

function convertToFillInBlank(inputFile, outputFile) {
    console.log(`正在读取文件: ${inputFile}`);
    
    const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    let vocabConverted = 0;
    let vocabSkipped = 0;
    let grammarUnchanged = 0;
    let totalQuestions = 0;
    
    const questions = data.questions.map(question => {
        totalQuestions++;
        
        // 只处理词汇题
        if (question.type !== 'vocab') {
            grammarUnchanged++;
            return question;
        }
        
        // 获取正确答案
        const correctOption = question.correct_answer;
        const correctAnswer = question[`option_${correctOption.toLowerCase()}`];
        
        // 检查题目中是否有<strong>标签
        const strongMatch = question.question.match(/<strong>(.*?)<\/strong>/);
        
        if (strongMatch) {
            const strongContent = strongMatch[1];
            
            // 只有 <strong> 内容等于正确答案时才挖空
            if (strongContent === correctAnswer) {
                question.question = question.question.replace(
                    /<strong>.*?<\/strong>/,
                    '<strong>　　　</strong>'
                );
                vocabConverted++;
            } else {
                vocabSkipped++;
            }
        }
        
        return question;
    });
    
    const result = { questions };
    
    fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf8');
    
    console.log(`转换完成!`);
    console.log(`总问题数: ${totalQuestions}`);
    console.log(`词汇题已挖空: ${vocabConverted}`);
    console.log(`词汇题未挖空（答案不匹配）: ${vocabSkipped}`);
    console.log(`语法题保持不变: ${grammarUnchanged}`);
    console.log(`输出文件: ${outputFile}`);
    
    return {
        totalQuestions,
        vocabConverted,
        vocabSkipped,
        grammarUnchanged
    };
}

// 主程序
console.log('=== 词汇题转填空题工具 ===\n');

// 转换 questions.json
console.log('--- 处理 questions.json ---');
try {
    convertToFillInBlank('questions.json', 'questions-fillblank.json');
} catch (err) {
    console.error(`转换 questions.json 失败: ${err.message}`);
}

console.log('\n');

// 转换 questions-expanded.json
console.log('--- 处理 questions-expanded.json ---');
try {
    convertToFillInBlank('questions-expanded.json', 'questions-expanded-fillblank.json');
} catch (err) {
    console.error(`转换 questions-expanded.json 失败: ${err.message}`);
}

console.log('\n=== 所有转换完成 ===');
