const fs = require('fs');

const existingQuestions = JSON.parse(fs.readFileSync('questions.json', 'utf8')).questions;

function generateQuestion(level, type, template, variants, correctIndex, explanation) {
  return {
    level,
    type,
    question: template.replace('______', ''),
    option_a: variants[0],
    option_b: variants[1],
    option_c: variants[2],
    option_d: variants[3],
    correct_answer: ['A', 'B', 'C', 'D'][correctIndex],
    explanation
  };
}

const vocabN5 = [
  { kanji: '甘い', hiragana: 'あまい', meaning: '甜的', distractors: ['あつい', 'さむい', 'からい'] },
  { kanji: '寒い', hiragana: 'さむい', meaning: '冷的', distractors: ['あつい', 'あたたかい', 'すずしい'] },
  { kanji: '学生', hiragana: 'がくせい', meaning: '学生', distractors: ['せんせい', 'かいしゃいん', 'しゃいん'] },
  { kanji: '本', hiragana: 'ほん', meaning: '书', distractors: ['かさ', 'くつ', 'ばしょ'] },
  { kanji: '先生', hiragana: 'せんせい', meaning: '老师', distractors: ['がくせい', 'かいしゃいん', 'しゃいん'] },
  { kanji: '大きい', hiragana: 'おおきい', meaning: '大的', distractors: ['ちいさい', 'たかい', 'ひくい'] },
  { kanji: '水', hiragana: 'みず', meaning: '水', distractors: ['さけ', 'コーヒー', 'お茶'] },
  { kanji: '家', hiragana: 'いえ', meaning: '家', distractors: ['がっこう', 'だいがく', 'かいしゃ'] },
  { kanji: '新しい', hiragana: 'あたらしい', meaning: '新的', distractors: ['ふるい', 'たかい', 'ひくい'] },
  { kanji: '友達', hiragana: 'ともだち', meaning: '朋友', distractors: ['かぞく', 'せんせい', 'がくせい'] },
];

const vocabN4 = [
  { kanji: '難しい', hiragana: 'むずかしい', meaning: '困难的', distractors: ['やさしい', 'おもしろい', 'つまらない'] },
  { kanji: '仕事', hiragana: 'しごと', meaning: '工作', distractors: ['がっこう', 'しゅくだい', 'べんきょう'] },
  { kanji: '人気', hiragana: 'にんき', meaning: '受欢迎', distractors: ['しんき', 'れいき', 'きょうみ'] },
  { kanji: '電話', hiragana: 'でんわ', meaning: '电话', distractors: ['でんしゃ', 'でんき', 'でんぱ'] },
  { kanji: '内容', hiragana: 'ないよう', meaning: '内容', distractors: ['なかよし', 'なにより', 'なかなか'] },
];

const vocabN3 = [
  { kanji: '素晴らしい', hiragana: 'すばらしい', meaning: '出色的', distractors: ['おいしい', 'まずい', 'かわいい'] },
  { kanji: '複雑', hiragana: 'ふくざつ', meaning: '复杂的', distractors: ['かんたん', 'むずかしい', 'やさしい'] },
  { kanji: '計画', hiragana: 'けいかく', meaning: '计划', distractors: ['けいおん', 'けいさつ', 'けいび'] },
  { kanji: '詳細', hiragana: 'しょうさい', meaning: '详细', distractors: ['たんじょう', 'せいかつ', 'せいさく'] },
  { kanji: '意見', hiragana: 'いけん', meaning: '意见', distractors: ['いこく', 'いじん', 'いしゃ'] },
];

const vocabN2 = [
  { kanji: '実行', hiragana: 'じっこう', meaning: '执行', distractors: ['じっせき', 'じっしつ', 'じったい'] },
  { kanji: '影響', hiragana: 'えいきょう', meaning: '影响', distractors: ['えいぎょう', 'えいせい', 'えいよう'] },
  { kanji: '効果', hiragana: 'こうか', meaning: '效果', distractors: ['こうきょう', 'こうしょ', 'こうそう'] },
  { kanji: '決意', hiragana: 'けつい', meaning: '决心', distractors: ['けつりょく', 'けつご', 'けつりょ'] },
  { kanji: '解決', hiragana: 'かいけつ', meaning: '解决', distractors: ['かいご', 'かいきょ', 'かいじゅ'] },
];

const vocabN1 = [
  { kanji: '複雑', hiragana: 'ふくざつ', meaning: '复杂', distractors: ['かんたん', 'むずかしい', 'やさしい'] },
  { kanji: '影響', hiragana: 'えいきょう', meaning: '影响', distractors: ['えいぎょう', 'えいせい', 'えいよう'] },
  { kanji: '実行', hiragana: 'じっこう', meaning: '执行', distractors: ['じっせき', 'じっしつ', 'じったい'] },
  { kanji: '決定', hiragana: 'けってい', meaning: '决定', distractors: ['けっか', 'けっせき', 'けっこう'] },
  { kanji: '環境', hiragana: 'かんきょう', meaning: '环境', distractors: ['かんしょう', 'かんたん', 'かんな'] },
];

function generateVocabQuestions(level, vocabList, count) {
  const questions = [];
  const particles = ['は', 'が', 'を', 'に', 'で', 'と', 'から', 'まで', 'へ'];
  
  const templatesByWord = {};
  
  vocabList.forEach(vocab => {
    templatesByWord[vocab.kanji] = [];
    
    if (['甘い', '寒い', '暑い', '高い', '安い', '大きい', '小さい', '美しい', '新しい', '古い', '面白い', 'つまらない', '難しい', 'やさしい', 'おいしい', '暗い', '明るい', '赤い', '青い', '黒い', '白い', '広い', '狭い', '速い', '遅い'].includes(vocab.kanji)) {
      templatesByWord[vocab.kanji].push(
        `この${vocab.kanji === '甘い' || vocab.kanji === 'おいしい' || vocab.kanji === '赤い' ? 'りんご' : 
          vocab.kanji === '寒い' || vocab.kanji === '高い' || vocab.kanji === '大きい' ? '建物' : 
          vocab.kanji === '新しい' ? '時計' : 
          vocab.kanji === '面白い' ? '本' : 
          vocab.kanji === '暑い' ? '天気' :
          vocab.kanji === '暗い' ? '部屋' :
          'もの'}は <strong>${vocab.kanji}</strong> です。`
      );
      templatesByWord[vocab.kanji].push(
        `今日は${vocab.kanji === '寒い' || vocab.kanji === '暑い' ? '' : vocab.kanji} <strong>${vocab.kanji}</strong> です。`
      );
    } else if (['学生', '先生', '会社員', '医者', '弁護士'].includes(vocab.kanji)) {
      templatesByWord[vocab.kanji].push(
        `私は <strong>${vocab.kanji}</strong> です。`
      );
      templatesByWord[vocab.kanji].push(
        `あの人は <strong>${vocab.kanji}</strong> です。`
      );
    } else if (['本', '水', 'コーヒー', 'お茶', 'パン', 'ご飯', '肉', '魚', '野菜', '果物'].includes(vocab.kanji)) {
      templatesByWord[vocab.kanji].push(
        `これは <strong>${vocab.kanji}</strong> です。`
      );
      templatesByWord[vocab.kanji].push(
        `私は <strong>${vocab.kanji}</strong> を飲みます。`
      );
    } else if (['友達', '家族', '両親', '兄弟'].includes(vocab.kanji)) {
      templatesByWord[vocab.kanji].push(
        `私は <strong>${vocab.kanji}</strong> と遊びます。`
      );
      templatesByWord[vocab.kanji].push(
        `あの人は私の <strong>${vocab.kanji}</strong> です。`
      );
    } else {
      templatesByWord[vocab.kanji].push(
        `これは <strong>${vocab.kanji}</strong> です。`
      );
      templatesByWord[vocab.kanji].push(
        `あの人は <strong>${vocab.kanji}</strong> です。`
      );
      templatesByWord[vocab.kanji].push(
        `私は <strong>${vocab.kanji}</strong> を勉強しています。`
      );
    }
  });
  
  for (let i = 0; i < count; i++) {
    const vocab = vocabList[i % vocabList.length];
    const template = templatesByWord[vocab.kanji][i % templatesByWord[vocab.kanji].length];
    
    let options = [vocab.hiragana, ...vocab.distractors];
    options = shuffleArray(options);
    const correctIndex = options.indexOf(vocab.hiragana);
    
    const question = {
      level,
      type: 'vocab',
      question: template,
      option_a: options[0],
      option_b: options[1],
      option_c: options[2],
      option_d: options[3],
      correct_answer: ['A', 'B', 'C', 'D'][correctIndex],
      explanation: `「${vocab.kanji}」的平假名是「${vocab.hiragana}」，意思是${vocab.meaning}。`
    };
    
    questions.push(question);
  }
  
  return questions;
}

function generateGrammarQuestions(level, count) {
  const questions = [];
  
  const grammarPatterns = [
    {
      templates: [
        `私は毎朝コーヒー <strong>______</strong> 飲みます。`,
        `私は昨日映画 <strong>______</strong> 見ました。`,
        `私は日本語 <strong>______</strong> 勉強しています。`,
        `私は友達 <strong>______</strong> 会います。`,
      ],
      correct: 'と',
      distractors: ['は', 'が', 'に'],
      explanation: '「と」表示一起做某事的对象。'
    },
    {
      templates: [
        `私は毎朝コーヒー <strong>______</strong> 飲みます。`,
        `私は昨日映画 <strong>______</strong> 見ました。`,
        `私は日本語 <strong>______</strong> 勉強しています。`,
        `私は本 <strong>______</strong> 読みます。`,
      ],
      correct: 'を',
      distractors: ['は', 'が', 'に'],
      explanation: '「を」表示动作的对象。'
    },
    {
      templates: [
        `これ <strong>______</strong> 私の本です。`,
        `この部屋 <strong>______</strong> 大きいです。`,
        `私 <strong>______</strong> 学生です。`,
        `東京 <strong>______</strong> 有名です。`,
      ],
      correct: 'は',
      distractors: ['が', 'を', 'に'],
      explanation: '「は」表示主题。'
    },
    {
      templates: [
        `私は8時 <strong>______</strong> 起きます。`,
        `私は毎週日曜日 <strong>______</strong> 買い物をします。`,
        `私は明日東京 <strong>______</strong> 行きます。`,
        `私は学校 <strong>______</strong> 行きます。`,
      ],
      correct: 'に',
      distractors: ['は', 'を', 'で'],
      explanation: '「に」表示具体的时间点或移动的方向。'
    },
    {
      templates: [
        `私は電車 <strong>______</strong> 通勤します。`,
        `私は昨日公園 <strong>______</strong> 散歩しました。`,
        `この店は何 <strong>______</strong> 有名ですか？`,
        `私は日本 <strong>______</strong> 来ました。`,
      ],
      correct: 'で',
      distractors: ['は', 'を', 'に'],
      explanation: '「で」表示动作发生的地点、交通工具或手段。'
    },
    {
      templates: [
        `この本は李さん <strong>______</strong> です。`,
        `このペンは私 <strong>______</strong> です。`,
        `あの人は先生 <strong>______</strong> です。`,
        `この会社は母 <strong>______</strong> です。`,
      ],
      correct: 'の',
      distractors: ['は', 'が', 'に'],
      explanation: '「の」表示所属关系。'
    },
    {
      templates: [
        `私は日本語 <strong>______</strong> 好きです。`,
        `私は猫 <strong>______</strong> 嫌いです。`,
        `私は水 <strong>______</strong> 飲みたいです。`,
        `私は犬 <strong>______</strong> 恐いです。`,
      ],
      correct: 'が',
      distractors: ['は', 'を', 'に'],
      explanation: '「が」表示好恶的对象。'
    },
    {
      templates: [
        `私は3時 <strong>______</strong> 勉強します。`,
        `日本に来て <strong>______</strong> もう3年になります。`,
        `学校 <strong>______</strong> 家まで歩きます。`,
      ],
      correct: 'まで',
      distractors: ['から', 'に', 'で'],
      explanation: '「まで」表示动作持续到某个时间点或地点。'
    },
  ];
  
  for (let i = 0; i < count; i++) {
    const pattern = grammarPatterns[i % grammarPatterns.length];
    const template = pattern.templates[Math.floor(Math.random() * pattern.templates.length)];
    
    let options = [pattern.correct, ...pattern.distractors];
    options = shuffleArray(options);
    const correctIndex = options.indexOf(pattern.correct);
    
    questions.push({
      level,
      type: 'grammar',
      question: template,
      option_a: options[0],
      option_b: options[1],
      option_c: options[2],
      option_d: options[3],
      correct_answer: ['A', 'B', 'C', 'D'][correctIndex],
      explanation: pattern.explanation
    });
  }
  
  return questions;
}

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const targetCounts = {
  N5: 1000,
  N4: 1000,
  N3: 1000,
  N2: 1000,
  N1: 1000
};

const currentCounts = {};
existingQuestions.forEach(q => {
  currentCounts[q.level] = (currentCounts[q.level] || 0) + 1;
});

console.log('当前题目数量:', currentCounts);

const newQuestions = [...existingQuestions];

for (const level of ['N5', 'N4', 'N3', 'N2', 'N1']) {
  const currentCount = currentCounts[level] || 0;
  const targetCount = targetCounts[level];
  const needed = targetCount - currentCount;
  
  if (needed > 0) {
    console.log(`为 ${level} 级别生成 ${needed} 道题目...`);
    
    let vocabQuestions, grammarQuestions;
    const vocabCount = Math.floor(needed * 0.6);
    const grammarCount = needed - vocabCount;
    
    switch (level) {
      case 'N5':
        vocabQuestions = generateVocabQuestions(level, vocabN5, vocabCount);
        break;
      case 'N4':
        vocabQuestions = generateVocabQuestions(level, vocabN4, vocabCount);
        break;
      case 'N3':
        vocabQuestions = generateVocabQuestions(level, vocabN3, vocabCount);
        break;
      case 'N2':
        vocabQuestions = generateVocabQuestions(level, vocabN2, vocabCount);
        break;
      case 'N1':
        vocabQuestions = generateVocabQuestions(level, vocabN1, vocabCount);
        break;
    }
    
    grammarQuestions = generateGrammarQuestions(level, grammarCount);
    
    newQuestions.push(...vocabQuestions, ...grammarQuestions);
  }
}

fs.writeFileSync('questions.json', JSON.stringify({ questions: newQuestions }, null, 2), 'utf8');

console.log('题目生成完成!');
const finalCounts = {};
newQuestions.forEach(q => {
  finalCounts[q.level] = (finalCounts[q.level] || 0) + 1;
});
console.log('最终题目数量:', finalCounts);
