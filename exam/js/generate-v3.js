const fs = require('fs');

const existingQuestions = JSON.parse(fs.readFileSync('questions.json', 'utf8')).questions;

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const vocabTemplates = {
  N5: [
    { word: '私', reading: 'わたし', meaning: '我', dists: ['あなた', 'かれ', 'かのじょ'] },
    { word: 'あなた', reading: 'あなた', meaning: '你', dists: ['わたし', 'かれ', 'かのじょ'] },
    { word: '高い', reading: 'たかい', meaning: '高的/贵的', dists: ['ひくい', 'やすい', 'おおきい'] },
    { word: '大きい', reading: 'おおきい', meaning: '大的', dists: ['ちいさい', 'たかい', 'ひくい'] },
    { word: '新しい', reading: 'あたらしい', meaning: '新的', dists: ['ふるい', 'おおきい', 'ちいさい'] },
    { word: '面白い', reading: 'おいしい', meaning: '有趣的', dists: ['つまらない', 'おおきい', 'ちいさい'] },
    { word: '学生', reading: 'がくせい', meaning: '学生', dists: ['せんせい', 'かいしゃいん', 'しゃいん'] },
    { word: '今日', reading: 'きょう', meaning: '今天', dists: ['あした', 'きのう', 'せんしゅう'] },
  ],
  N4: [
    { word: '忙しない', reading: 'いそがしい', meaning: '忙碌的', dists: ['ひま', 'おおきい', 'ちいさい'] },
    { word: '有名', reading: 'ゆうめい', meaning: '有名的', dists: ['しらない', 'おおきい', 'ちいさい'] },
    { word: '安全', reading: 'あんぜん', meaning: '安全的', dists: ['きけん', 'おおきい', 'ちいさい'] },
    { word: '必要', reading: 'ひつよう', meaning: '必要的', dists: ['不要', 'おおきい', 'ちいさい'] },
    { word: '内容', reading: 'ないよう', meaning: '内容', dists: ['なかみ', 'おおきい', 'ちいさい'] },
  ],
  N3: [
    { word: '計画', reading: 'けいかく', meaning: '计划', dists: ['けいおん', 'けいさつ', 'けいび'] },
    { word: '詳細', reading: 'しょうさい', meaning: '详细', dists: ['たんじょう', 'せいかつ', 'せいさく'] },
    { word: '意見', reading: 'いけん', meaning: '意见', dists: ['いこく', 'いじん', 'いしゃ'] },
    { word: '成長', reading: 'せいちょう', meaning: '成长', dists: ['せいかつ', 'せいさく', 'せいじ'] },
    { word: '環境', reading: 'かんきょう', meaning: '环境', dists: ['かんしょう', 'かんたん', 'かんな'] },
  ],
  N2: [
    { word: '実行', reading: 'じっこう', meaning: '执行', dists: ['じっせき', 'じっしつ', 'じったい'] },
    { word: '影響', reading: 'えいきょう', meaning: '影响', dists: ['えいぎょう', 'えいせい', 'えいよう'] },
    { word: '効果', reading: 'こうか', meaning: '效果', dists: ['こうきょう', 'こうしょ', 'こうそう'] },
    { word: '解決', reading: 'かいけつ', meaning: '解决', dists: ['かいご', 'かいきょ', 'かいじゅ'] },
    { word: '改良', reading: 'かいりょう', meaning: '改良', dists: ['かいごう', 'かいぶつ', 'かいほう'] },
  ],
  N1: [
    { word: '複雑', reading: 'ふくざつ', meaning: '复杂', dists: ['ふくせん', 'ふくしょく', 'ふくせい'] },
    { word: '関連', reading: 'かんれん', meaning: '关联', dists: ['かんけい', 'かんかく', 'かんどう'] },
    { word: '実現', reading: 'じつげん', meaning: '实现', dists: ['じつさい', 'じつよう', 'じつぶつ'] },
    { word: '影響', reading: 'えいきょう', meaning: '影响', dists: ['えいぎょう', 'えいせい', 'えいよう'] },
    { word: '考察', reading: 'こうさつ', meaning: '考察', dists: ['こう察', 'こうさく', 'こうりつ'] },
  ]
};

const sentenceTemplates = {
  adjectives: [
    'この<word>は<strong>______</strong>です。',
    '今日は<strong>______</strong>です。',
    'あの人は<strong>______</strong>です。',
    'この問題は<strong>______</strong>です。',
  ],
  occupations: [
    '私は<strong>______</strong>です。',
    'あの人は<strong>______</strong>です。',
    '彼は<strong>______</strong>ですか。',
  ],
  time: [
    '今日は<strong>______</strong>です。',
    '明日は<strong>______</strong>です。',
    '昨日<strong>______</strong>行きました。',
  ],
  general: [
    'これは<strong>______</strong>です。',
    'あの人りは<strong>______</strong>です。',
    '私は<strong>______</strong>が好きです。',
  ]
};

function generateVocabQuestions(level, vocabList, count) {
  const questions = [];
  
  for (let i = 0; i < count; i++) {
    const vocab = vocabList[i % vocabList.length];
    let template;
    
    if (['高い', '大きい', '新しい', '面白い'].includes(vocab.word)) {
      template = sentenceTemplates.adjectives[i % sentenceTemplates.adjectives.length];
    } else if (['学生', '医者', '弁護士'].includes(vocab.word)) {
      template = sentenceTemplates.occupations[i % sentenceTemplates.occupations.length];
    } else if (['今日', '明日', '昨日'].includes(vocab.word)) {
      template = sentenceTemplates.time[i % sentenceTemplates.time.length];
    } else {
      template = sentenceTemplates.general[i % sentenceTemplates.general.length];
    }
    
    let options = [vocab.reading, ...vocab.dists];
    options = shuffleArray(options);
    
    const question = {
      level,
      type: 'vocab',
      question: template.replace('<word>', vocab.word),
      option_a: options[0],
      option_b: options[1],
      option_c: options[2],
      option_d: options[3],
      correct_answer: ['A', 'B', 'C', 'D'][options.indexOf(vocab.reading)],
      explanation: `「${vocab.word}」的平假名是「${vocab.reading}」，意思是${vocab.meaning}。`
    };
    
    questions.push(question);
  }
  
  return questions;
}

const grammarPatterns = {
  N5: [
    { pattern: '私は毎朝コーヒー<strong>______</strong>飲みます。', correct: 'を', options: ['は', 'が', 'を', 'に'], explain: '「を」表示动作的对象。' },
    { pattern: 'これ<strong>______</strong>私の本です。', correct: 'は', options: ['は', 'が', 'を', 'に'], explain: '「は」表示主题。' },
    { pattern: '私は8時<strong>______</strong>起きます。', correct: 'に', options: ['は', 'が', 'を', 'に'], explain: '「に」表示具体的时间点。' },
    { pattern: '明日、友達<strong>______</strong>遊びます。', correct: 'と', options: ['は', 'が', 'を', 'と'], explain: '「と」表示一起做某事的对象。' },
    { pattern: '私は日本語<strong>______</strong>好きです。', correct: 'が', options: ['は', 'が', 'を', 'に'], explain: '「が」表示好恶的对象。' },
    { pattern: '私は電車<strong>______</strong>通勤します。', correct: 'で', options: ['は', 'が', 'を', 'で'], explain: '「で」表示交通工具。' },
    { pattern: 'この本は李さん<strong>______</strong>です。', correct: 'の', options: ['は', 'が', 'の', 'に'], explain: '「の」表示所属关系。' },
    { pattern: '私は3時<strong>______</strong>勉強します。', correct: 'まで', options: ['まで', 'から', 'に', 'で'], explain: '「まで」表示动作持续到某个时间点。' },
    { pattern: '日本に来て<strong>______</strong>もう3年になります。', correct: 'から', options: ['まで', 'から', 'に', 'で'], explain: '「から」表示起点。' },
    { pattern: '私は母<strong>______</strong>花をあげます。', correct: 'に', options: ['は', 'が', 'に', 'を'], explain: '「に」表示动作的接受者。' },
  ],
  N4: [
    { pattern: '私は毎日30分<strong>______</strong>運動します。', correct: 'ごろ', options: ['ごろ', 'くらい', 'ばかり', 'まで'], explain: '「ごろ」表示大约的时间。' },
    { pattern: '雨が<strong>______</strong>なりました。', correct: '止い', options: ['降り', '降りて', '止い', '降っ'], explain: '「动词连用形+た」表示变化完成。' },
    { pattern: '昨日、映画を<strong>______</strong>行きました。', correct: '見に', options: ['見て', '見に', '見た', '見る'], explain: '「見に行く」表示去看的目的。' },
    { pattern: '私は李さん<strong>______</strong>背が高いです。', correct: 'より', options: ['より', 'ほど', 'から', 'まで'], explain: '「より」表示比较。' },
    { pattern: 'この問題は<strong>______</strong>難しいです。', correct: 'とても', options: ['とても', 'それほど', 'そんな', 'どう'], explain: '「とても」表示程度。' },
  ],
  N3: [
    { pattern: '私は雨が<strong>______</strong>ことを祈ります。', correct: '降らない', options: ['降らない', '降らなく', '降らなくて', '降らないで'], explain: '「ことを祈る」表示祈祷某事发生。' },
    { pattern: '私は<strong>______</strong>前に電話をかけます。', correct: '行く', options: ['行く', '行って', '行った', '行き'], explain: '「前に」表示在某个动作之前。' },
    { pattern: '私は<strong>______</strong>ながらテレビを見ます。', correct: '食べ', options: ['食べ', '食べて', '食べた', '食べる'], explain: '「ながら」表示同时进行两个动作。' },
    { pattern: '私は<strong>______</strong>たことがあります。', correct: '見た', options: ['見た', '見', '見て', '見よう'], explain: '「～たことがある」表示有过某种经历。' },
    { pattern: '昨日、李さんに<strong>______</strong>会いました。', correct: '会っ', options: ['会っ', '会', '会いて', '会える'], explain: '「に」表示动作的接受者。' },
  ],
  N2: [
    { pattern: 'この計画は<strong>______</strong>実施されました。', correct: '実際に', options: ['実際に', '現実', '実現', '実行'], explain: '「実際に」表示实际地。' },
    { pattern: '彼は問題を解決する<strong>______</strong>を示した。', correct: '能力', options: ['能力', '機能', '性能', '技能'], explain: '「能力」表示能力。' },
    { pattern: 'この問題は非常に<strong>______</strong>です。', correct: '複雑', options: ['複雑', '面倒', '困難', '難しい'], explain: '「複雑」表示复杂。' },
    { pattern: '環境に<strong>______</strong>影響を与えました。', correct: '大きな', options: ['大きな', '大きい', '強い', '高い'], explain: '「大きな」修饰名词。' },
    { pattern: '彼は<strong>______</strong>仕事をしています。', correct: '忙しい', options: ['忙しい', '困難な', '複雑な', '重要な'], explain: '「忙しい」表示忙碌的。' },
  ],
  N1: [
    { pattern: 'この問題は<strong>______</strong>解决するのは難しい。', correct: '複雑に', options: ['複雑に', '複雑な', '複雑で', '複雑'], explain: '「~的问题是复杂的」。' },
    { pattern: '彼は<strong>______</strong>、多くの人々に影響を与えた。', correct: '活躍', options: ['活躍', '活動', '運動', '行動'], explain: '「活躍」表示活跃。' },
    { pattern: 'この製品の内容は<strong>______</strong>改善されている。', correct: '継続的に', options: ['継続的に', '続いて', '続ける', '連続'], explain: '「継続的に」表示持续地。' },
    { pattern: 'この会社の業績は<strong>______</strong>向上している。', correct: '著しく', options: ['著しく', '大きく', '非常に', '極端に'], explain: '「著しく」表示显著地。' },
    { pattern: '彼は<strong>______</strong>、自分の信念を貫いた。', correct: '一貫して', options: ['一貫して', '一貫に', '一貫の', '一貫'], explain: '「一貫して」表示一贯地。' },
  ]
};

function generateGrammarQuestions(level, patternList, count) {
  const questions = [];
  
  for (let i = 0; i < count; i++) {
    const pattern = patternList[i % patternList.length];
    
    let options = shuffleArray([...pattern.options]);
    
    const question = {
      level,
      type: 'grammar',
      question: pattern.pattern,
      option_a: options[0],
      option_b: options[1],
      option_c: options[2],
      option_d: options[3],
      correct_answer: ['A', 'B', 'C', 'D'][options.indexOf(pattern.correct)],
      explanation: pattern.explain
    };
    
    questions.push(question);
  }
  
  return questions;
}

const currentCounts = {};
existingQuestions.forEach(q => {
  currentCounts[q.level] = (currentCounts[q.level] || 0) + 1;
});

console.log('当前题目数量:', currentCounts);

const newQuestions = [...existingQuestions];
const targetCounts = { N5: 1000, N4: 1000, N3: 1000, N2: 1000, N1: 1000 };
const vocabRatios = { N5: 0.8, N4: 0.8, N3: 0.8, N2: 0.8, N1: 0.8 };

for (const level of ['N5', 'N4', 'N3', 'N2', 'N1']) {
  const currentCount = currentCounts[level] || 0;
  const targetCount = targetCounts[level];
  const needed = targetCount - currentCount;
  
  if (needed > 0) {
    const vocabCount = Math.floor(needed * vocabRatios[level]);
    const grammarCount = needed - vocabCount;
    
    console.log(`为 ${level} 级别生成 ${vocabCount} 道词汇题和 ${grammarCount} 道语法题...`);
    
    const vocabQuestions = generateVocabQuestions(level, vocabTemplates[level], vocabCount);
    const grammarQuestions = generateGrammarQuestions(level, grammarPatterns[level], grammarCount);
    
    newQuestions.push(...vocabQuestions, ...grammarQuestions);
  }
}

fs.writeFileSync('questions.json', JSON.stringify({ questions: newQuestions }, null, 2), 'utf8');

console.log('题目生成完成!');
const finalCounts = {};
newQuestions.forEach(q => {
  finalCounts[q.level] = (finalCounts[q.level] || 0) + 1;
  const typeCount = finalCounts[q.level + '_type'] || {};
  typeCount[q.type] = (typeCount[q.type] || 0) + 1;
  finalCounts[q.level + '_type'] = typeCount;
});
console.log('最终题目数量:', finalCounts);
