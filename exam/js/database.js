// 数据库管理类 - 使用IndexedDB
class JLPTDatabase {
    constructor() {
        this.db = null;
        this.initDatabase();
    }

    // 初始化数据库
    initDatabase() {
        const request = indexedDB.open('jlpt_exam', 1);

        request.onerror = (event) => {
            console.error('数据库打开失败:', event.target.error);
        };

        request.onsuccess = (event) => {
            this.db = event.target.result;
            this.insertSampleData();
        };

        request.onupgradeneeded = (event) => {
            this.db = event.target.result;

            // 创建对象存储空间
            if (!this.db.objectStoreNames.contains('questions')) {
                const questionsStore = this.db.createObjectStore('questions', { keyPath: 'id', autoIncrement: true });
                questionsStore.createIndex('level', 'level', { unique: false });
                questionsStore.createIndex('type', 'type', { unique: false });
            }

            if (!this.db.objectStoreNames.contains('user_progress')) {
                const progressStore = this.db.createObjectStore('user_progress', { keyPath: 'id', autoIncrement: true });
                progressStore.createIndex('level', 'level', { unique: true });
            }

            if (!this.db.objectStoreNames.contains('answer_records')) {
                const recordsStore = this.db.createObjectStore('answer_records', { keyPath: 'id', autoIncrement: true });
                recordsStore.createIndex('question_id', 'question_id', { unique: false });
                recordsStore.createIndex('answer_time', 'answer_time', { unique: false });
            }
        };
    }

    // 插入示例数据
    insertSampleData() {
        const transaction = this.db.transaction(['questions'], 'readonly');
        const store = transaction.objectStore('questions');
        const countRequest = store.count();

        countRequest.onsuccess = (event) => {
            if (event.target.result === 0) {
                this.insertQuestions();
            }
        };
    }

    // 插入问题数据
    insertQuestions() {
        const transaction = this.db.transaction(['questions'], 'readwrite');
        const store = transaction.objectStore('questions');

        // N5级别词汇题
        const n5VocabQuestions = [
            {
                level: 'N5',
                type: 'vocab',
                question: 'このりんごは <strong>甘い</strong> です。',
                option_a: 'あまい',
                option_b: 'しおからい',
                option_c: 'からい',
                option_d: 'すっぱい',
                correct_answer: 'A',
                explanation: '「甘い」的平假名是「あまい」，意思是甜的。'
            },
            {
                level: 'N5',
                type: 'vocab',
                question: '今日は <strong>寒い</strong> です。',
                option_a: 'あたたかい',
                option_b: 'さむい',
                option_c: 'あつい',
                option_d: 'すずしい',
                correct_answer: 'B',
                explanation: '「寒い」的平假名是「さむい」，意思是冷的。'
            },
            {
                level: 'N5',
                type: 'vocab',
                question: '私は <strong>学生</strong> です。',
                option_a: 'せんせい',
                option_b: 'がくせい',
                option_c: 'かいしゃいん',
                option_d: 'しゃいん',
                correct_answer: 'B',
                explanation: '「学生」的平假名是「がくせい」，意思是学生。'
            },
            {
                level: 'N5',
                type: 'vocab',
                question: 'これは <strong>本</strong> です。',
                option_a: 'ほん',
                option_b: 'かさ',
                option_c: 'くつ',
                option_d: 'ばしょ',
                correct_answer: 'A',
                explanation: '「本」的平假名是「ほん」，意思是书。'
            },
            {
                level: 'N5',
                type: 'vocab',
                question: 'ありがとう <strong>ございます</strong>。',
                option_a: 'こんにちは',
                option_b: 'おはようございます',
                option_c: 'ございます',
                option_d: 'さようなら',
                correct_answer: 'C',
                explanation: '「ありがとうございます」是谢谢的意思，「ございます」是敬语形式。'
            }
        ];

        // N5级别语法题
        const n5GrammarQuestions = [
            {
                level: 'N5',
                type: 'grammar',
                question: '日本に来て <strong>から</strong> もう3年になります。',
                option_a: 'で',
                option_b: 'から',
                option_c: 'に',
                option_d: 'を',
                correct_answer: 'B',
                explanation: '「から」表示起点，这里表示从来到日本开始已经3年了。'
            },
            {
                level: 'N5',
                type: 'grammar',
                question: '私は毎朝コーヒー <strong>を</strong> 飲みます。',
                option_a: 'は',
                option_b: 'が',
                option_c: 'を',
                option_d: 'に',
                correct_answer: 'C',
                explanation: '「を」表示动作的对象，这里表示喝咖啡。'
            },
            {
                level: 'N5',
                type: 'grammar',
                question: 'これ <strong>は</strong> 私の本です。',
                option_a: 'は',
                option_b: 'が',
                option_c: 'を',
                option_d: 'に',
                correct_answer: 'A',
                explanation: '「は」表示主题，这里表示这是我的书。'
            },
            {
                level: 'N5',
                type: 'grammar',
                question: '昨日、私は映画 <strong>を</strong> 見ました。',
                option_a: 'は',
                option_b: 'が',
                option_c: 'を',
                option_d: 'に',
                correct_answer: 'C',
                explanation: '「を」表示动作的对象，这里表示看电影。'
            },
            {
                level: 'N5',
                type: 'grammar',
                question: '明日、友達 <strong>と</strong> 遊びます。',
                option_a: 'は',
                option_b: 'が',
                option_c: 'を',
                option_d: 'と',
                correct_answer: 'D',
                explanation: '「と」表示一起做某事的对象，这里表示和朋友一起玩。'
            }
        ];

        // 合并所有问题
        const allQuestions = [...n5VocabQuestions, ...n5GrammarQuestions];

        // 插入所有问题
        allQuestions.forEach(question => {
            const request = store.add(question);
            request.onerror = (event) => {
                console.error('插入问题失败:', event.target.error);
            };
        });
    }

    // 获取指定级别的问题
    getQuestionsByLevel(level, callback) {
        const transaction = this.db.transaction(['questions'], 'readonly');
        const store = transaction.objectStore('questions');
        const index = store.index('level');
        const range = IDBKeyRange.only(level);
        const request = index.openCursor(range);

        const questions = [];

        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                questions.push(cursor.value);
                cursor.continue();
            } else {
                // 随机排序
                for (let i = questions.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [questions[i], questions[j]] = [questions[j], questions[i]];
                }
                callback(questions);
            }
        };

        request.onerror = (event) => {
            console.error('获取问题失败:', event.target.error);
            callback([]);
        };
    }

    // 记录答题情况
    recordAnswer(questionId, userAnswer, isCorrect) {
        const transaction = this.db.transaction(['answer_records'], 'readwrite');
        const store = transaction.objectStore('answer_records');

        const record = {
            question_id: questionId,
            user_answer: userAnswer,
            is_correct: isCorrect,
            answer_time: new Date().toISOString()
        };

        const request = store.add(record);
        request.onerror = (event) => {
            console.error('记录答题失败:', event.target.error);
        };
    }

    // 更新用户进度
    updateUserProgress(level, isCorrect) {
        const transaction = this.db.transaction(['user_progress'], 'readwrite');
        const store = transaction.objectStore('user_progress');
        const index = store.index('level');
        const range = IDBKeyRange.only(level);
        const request = index.openCursor(range);

        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                // 更新已有记录
                const progress = cursor.value;
                progress.total_questions = (progress.total_questions || 0) + 1;
                progress.correct_answers = (progress.correct_answers || 0) + (isCorrect ? 1 : 0);
                progress.last_practice = new Date().toISOString();
                cursor.update(progress);
            } else {
                // 创建新记录
                const newProgress = {
                    level: level,
                    total_questions: 1,
                    correct_answers: isCorrect ? 1 : 0,
                    last_practice: new Date().toISOString()
                };
                store.add(newProgress);
            }
        };

        request.onerror = (event) => {
            console.error('更新进度失败:', event.target.error);
        };
    }

    // 获取用户统计信息
    getUserStatistics(callback) {
        const stats = {
            total_practiced: 0,
            correct_rate: 0,
            today_practiced: 0,
            best_score: 0
        };

        // 获取总练习数和正确率
        const progressTransaction = this.db.transaction(['user_progress'], 'readonly');
        const progressStore = progressTransaction.objectStore('user_progress');
        const progressRequest = progressStore.openCursor();

        let totalQuestions = 0;
        let totalCorrect = 0;

        progressRequest.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                totalQuestions += cursor.value.total_questions || 0;
                totalCorrect += cursor.value.correct_answers || 0;
                cursor.continue();
            } else {
                stats.total_practiced = totalQuestions;
                if (totalQuestions > 0) {
                    stats.correct_rate = Math.round((totalCorrect / totalQuestions) * 100);
                }

                // 获取今日练习数
                const recordsTransaction = this.db.transaction(['answer_records'], 'readonly');
                const recordsStore = recordsTransaction.objectStore('answer_records');
                const recordsIndex = recordsStore.index('answer_time');

                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const range = IDBKeyRange.lowerBound(today.toISOString());
                const recordsRequest = recordsIndex.count(range);

                recordsRequest.onsuccess = (event) => {
                    stats.today_practiced = event.target.result;
                    callback(stats);
                };
            }
        };

        progressRequest.onerror = (event) => {
            console.error('获取统计信息失败:', event.target.error);
            callback(stats);
        };
    }
}

// 初始化数据库
const db = new JLPTDatabase();