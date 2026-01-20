// 数据库管理类 - 使用IndexedDB
class JLPTDatabase {
    constructor() {
        this.db = null;
        this.isInitialized = false;
        this.initCallbacks = [];
        this.questionsLoadedCallbacks = [];
        this.initDatabase();
    }

    // 初始化数据库
    initDatabase() {
        const request = indexedDB.open('jlpt_exam', 3);

        request.onerror = (event) => {
            console.error('数据库打开失败:', event.target.error);
        };

        request.onsuccess = (event) => {
            console.log('数据库连接成功');
            this.db = event.target.result;
            this.isInitialized = true;
            
            // 检查是否需要加载数据
            this.checkQuestionsExist((hasQuestions) => {
                if (!hasQuestions) {
                    console.log('数据库中没有问题，开始加载...');
                    this.loadQuestionsFromJSON();
                } else {
                    console.log('数据库中已有问题，跳过加载');
                    // 通知题目加载完成（使用已有数据）
                    this.questionsLoadedCallbacks.forEach(callback => callback());
                    this.questionsLoadedCallbacks = [];
                }
            });
            
            // 调用所有初始化完成的回调
            console.log('数据库初始化完成，调用回调函数');
            this.initCallbacks.forEach(callback => callback());
            this.initCallbacks = [];
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

            // 清除旧数据以便重新加载
            // 在onupgradeneeded事件中，使用event.target.transaction获取事务
            const transaction = event.target.transaction;
            const questionsStore = transaction.objectStore('questions');
            questionsStore.clear().onsuccess = (event) => {
                console.log('旧问题数据已清除');
            };
        };
    }

    // 清除问题数据
    clearQuestions() {
        if (!this.db) return;
        
        const transaction = this.db.transaction(['questions'], 'readwrite');
        const store = transaction.objectStore('questions');
        const clearRequest = store.clear();

        clearRequest.onerror = (event) => {
            console.error('清除问题数据失败:', event.target.error);
        };

        clearRequest.onsuccess = (event) => {
            console.log('旧问题数据已清除');
        };
    }

    // 插入示例数据
    insertSampleData() {
        if (!this.db) return;
        
        const transaction = this.db.transaction(['questions'], 'readonly');
        const store = transaction.objectStore('questions');
        const countRequest = store.count();

        countRequest.onsuccess = (event) => {
            if (event.target.result === 0) {
                // 只有在数据库已有但没有问题数据时才加载
                this.loadQuestionsFromJSON();
            } else {
                console.log(`数据库中已有 ${event.target.result} 个问题`);
            }
        };
    }

    // 从JSON文件加载问题
    loadQuestionsFromJSON() {
        if (!this.db) return;
        
        console.log('开始从JSON文件加载问题...');
        
        // 从JSON文件加载题目
        fetch('js/questions.json')
            .then(response => {
                console.log('JSON文件响应状态:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('JSON数据加载成功，问题数量:', data.questions ? data.questions.length : 0);
                if (data.questions && Array.isArray(data.questions)) {
                    this.insertQuestions(data.questions);
                } else {
                    console.error('JSON数据格式不正确');
                    this.insertFallbackQuestions();
                }
            })
            .catch(error => {
                console.error('加载问题JSON失败:', error);
                // 如果JSON加载失败，使用备用数据
                this.insertFallbackQuestions();
            });
    }

    // 插入问题数据
    insertQuestions(questions) {
        if (!this.db || !questions || questions.length === 0) {
            console.log('没有问题数据需要插入');
            return;
        }
        
        console.log('准备插入', questions.length, '个问题到数据库');
        
        const transaction = this.db.transaction(['questions'], 'readwrite');
        const store = transaction.objectStore('questions');

        let successCount = 0;
        let errorCount = 0;

        // 插入所有问题
        questions.forEach((question, index) => {
            const request = store.add(question);
            request.onsuccess = () => {
                successCount++;
            };
            request.onerror = (event) => {
                errorCount++;
                console.error(`插入问题 ${index} 失败:`, event.target.error);
            };
        });

        transaction.oncomplete = () => {
            console.log(`问题插入完成 - 成功: ${successCount}, 失败: ${errorCount}`);
            // 通知题目加载完成
            this.questionsLoadedCallbacks.forEach(callback => callback());
            this.questionsLoadedCallbacks = [];
        };

        transaction.onerror = (event) => {
            console.error('批量插入问题失败:', event.target.error);
        };
    }

    // 备用问题数据（当JSON加载失败时使用）
    insertFallbackQuestions() {
        if (!this.db) return;
        
        console.log('使用备用问题数据...');
        
        const fallbackQuestions = [
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
                level: 'N4',
                type: 'vocab',
                question: 'この問題は <strong>難しい</strong> です。',
                option_a: 'むずかしい',
                option_b: 'やさしい',
                option_c: 'おもしろい',
                option_d: 'つまらない',
                correct_answer: 'A',
                explanation: '「難しい」的平假名是「むずかしい」，意思是困难的。'
            },
            {
                level: 'N3',
                type: 'vocab',
                question: 'このレストランの料理は <strong>素晴らしい</strong> です。',
                option_a: 'すばらしい',
                option_b: 'おいしい',
                option_c: 'まずい',
                option_d: 'かわいい',
                correct_answer: 'A',
                explanation: '「素晴らしい」的平假名是「すばらしい」，意思是出色的、精彩的。'
            }
        ];

        this.insertQuestions(fallbackQuestions);
    }

    // 获取指定级别的问题
    getQuestionsByLevel(level, callback) {
        console.log('尝试获取级别', level, '的问题');

        if (!this.db || !this.isInitialized) {
            console.error('数据库连接未初始化，等待初始化完成...');
            // 等待数据库初始化完成后再获取
            this.onInitialized(() => {
                console.log('数据库初始化完成，重新获取问题');
                this.getQuestionsByLevel(level, callback);
            });
            return;
        }

        // 首先检查数据库中是否有问题
        this.checkQuestionsExist((hasQuestions) => {
            if (!hasQuestions) {
                console.log('数据库中没有问题，尝试重新加载...');
                this.loadQuestionsFromJSON();
                // 等待一段时间后重新尝试获取
                setTimeout(() => {
                    this.getQuestionsByLevel(level, callback);
                }, 1000);
                return;
            }

            // 如果有问题，则继续获取
            this._fetchQuestionsFromDB(level, callback);
        });
    }

    // 从数据库获取问题的内部方法
    _fetchQuestionsFromDB(level, callback) {
        try {
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
                    console.log('从数据库获取到', questions.length, '个级别', level, '的问题');
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
            
            transaction.onerror = (event) => {
                console.error('事务错误:', event.target.error);
                callback([]);
            };
        } catch (error) {
            console.error('获取问题时发生错误:', error);
            callback([]);
        }
    }

    // 获取指定级别和题型的问题
    getQuestionsByLevelAndType(level, type, options = {}, callback) {
        console.log('尝试获取级别', level, '类型', type, '的问题');

        if (!this.db || !this.isInitialized) {
            this.onInitialized(() => {
                this.getQuestionsByLevelAndType(level, type, options, callback);
            });
            return;
        }

        const transaction = this.db.transaction(['questions'], 'readonly');
        const store = transaction.objectStore('questions');
        const index = store.index('level');
        const range = IDBKeyRange.only(level);
        const request = index.openCursor(range);

        const questions = [];

        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                const question = cursor.value;
                // 按题型筛选
                if (!type || type === 'all' || question.type === type) {
                    questions.push(question);
                }
                cursor.continue();
            } else {
                console.log('获取到', questions.length, '个问题');
                
                // 过滤已做过的题目
                if (options.skipCompleted) {
                    this._filterCompletedQuestions(questions, (filteredQuestions) => {
                        this._shuffleAndCallback(filteredQuestions, callback);
                    });
                } else {
                    this._shuffleAndCallback(questions, callback);
                }
            }
        };

        request.onerror = (event) => {
            console.error('获取问题失败:', event.target.error);
            callback([]);
        };
    }

    // 过滤已完成的题目
    _filterCompletedQuestions(questions, callback) {
        if (!this.db) {
            callback(questions);
            return;
        }

        const transaction = this.db.transaction(['answer_records'], 'readonly');
        const store = transaction.objectStore('answer_records');
        const index = store.index('question_id');
        const request = index.getAll();

        request.onsuccess = () => {
            const records = request.result;
            const completedIds = new Set(records.map(r => r.question_id));
            const filtered = questions.filter(q => !completedIds.has(q.id));
            callback(filtered);
        };

        request.onerror = () => {
            callback(questions);
        };
    }

    // 随机排序并回调
    _shuffleAndCallback(questions, callback) {
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        callback(questions);
    }

    // 获取错题集
    getWrongQuestions(level, type, callback) {
        if (!this.db || !this.isInitialized) {
            callback([]);
            return;
        }

        // 先获取所有答题记录
        const recordsTransaction = this.db.transaction(['answer_records'], 'readonly');
        const recordsStore = recordsTransaction.objectStore('answer_records');
        const recordsRequest = recordsStore.getAll();

        recordsRequest.onsuccess = () => {
            const allRecords = recordsRequest.result;
            
            // 找出错题记录
            const wrongRecords = allRecords.filter(r => r.is_correct === 0 || r.is_correct === false);
            const wrongQuestionIds = [...new Set(wrongRecords.map(r => r.question_id))];

            if (wrongQuestionIds.length === 0) {
                callback([]);
                return;
            }

            // 获取对应的题目
            const questionsTransaction = this.db.transaction(['questions'], 'readonly');
            const questionsStore = questionsTransaction.objectStore('questions');
            const questionsRequest = questionsStore.getAll();

            questionsRequest.onsuccess = () => {
                const allQuestions = questionsRequest.result;
                
                // 过滤：指定级别和题型
                let filtered = allQuestions.filter(q => wrongQuestionIds.includes(q.id));
                
                if (level && level !== 'all') {
                    filtered = filtered.filter(q => q.level === level);
                }
                
                if (type && type !== 'all') {
                    filtered = filtered.filter(q => q.type === type);
                }

                // 随机排序
                for (let i = filtered.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
                }

                callback(filtered);
            };

            questionsRequest.onerror = () => {
                callback([]);
            };
        };

        recordsRequest.onerror = () => {
            callback([]);
        };
    }

    // 获取指定级别的错题数量
    getWrongQuestionCount(level, callback) {
        if (!this.db || !this.isInitialized) {
            callback(0);
            return;
        }

        const recordsTransaction = this.db.transaction(['answer_records'], 'readonly');
        const recordsStore = recordsTransaction.objectStore('answer_records');
        const recordsRequest = recordsStore.getAll();

        recordsRequest.onsuccess = () => {
            const allRecords = recordsRequest.result;
            const wrongRecords = allRecords.filter(r => r.is_correct === 0 || r.is_correct === false);
            const wrongQuestionIds = [...new Set(wrongRecords.map(r => r.question_id))];

            if (wrongQuestionIds.length === 0) {
                callback(0);
                return;
            }

            const questionsTransaction = this.db.transaction(['questions'], 'readonly');
            const questionsStore = questionsTransaction.objectStore('questions');
            const questionsRequest = questionsStore.getAll();

            questionsRequest.onsuccess = () => {
                const allQuestions = questionsRequest.result;
                const wrongQuestions = allQuestions.filter(q => 
                    wrongQuestionIds.includes(q.id) && q.level === level
                );
                callback(wrongQuestions.length);
            };

            questionsRequest.onerror = () => {
                callback(0);
            };
        };

        recordsRequest.onerror = () => {
            callback(0);
        };
    }

    // 检查题目是否已做过
    isQuestionCompleted(questionId, callback) {
        if (!this.db || !this.isInitialized) {
            callback(false);
            return;
        }

        const transaction = this.db.transaction(['answer_records'], 'readonly');
        const store = transaction.objectStore('answer_records');
        const index = store.index('question_id');
        const range = IDBKeyRange.only(questionId);
        const request = index.count(range);

        request.onsuccess = () => {
            callback(request.result > 0);
        };

        request.onerror = () => {
            callback(false);
        };
    }

    // 获取已完成的题目ID列表
    getCompletedQuestionIds(callback) {
        if (!this.db || !this.isInitialized) {
            callback([]);
            return;
        }

        const transaction = this.db.transaction(['answer_records'], 'readonly');
        const store = transaction.objectStore('answer_records');
        const request = store.getAll();

        request.onsuccess = () => {
            const records = request.result;
            const ids = [...new Set(records.map(r => r.question_id))];
            callback(ids);
        };

        request.onerror = () => {
            callback([]);
        };
    }

    // 重置指定级别的学习进度（保留题目数据）
    resetLevelProgress(level, callback) {
        if (!this.db) {
            if (callback) callback();
            return;
        }

        // 删除该级别的答题记录
        const recordsTransaction = this.db.transaction(['answer_records', 'user_progress'], 'readwrite');
        const recordsStore = recordsTransaction.objectStore('answer_records');
        const recordsRequest = recordsStore.clear();

        recordsRequest.onsuccess = () => {
            const progressStore = recordsTransaction.objectStore('user_progress');
            const progressIndex = progressStore.index('level');
            const progressRange = IDBKeyRange.only(level);
            const progressRequest = progressIndex.openCursor();

            progressRequest.onsuccess = () => {
                const cursor = progressRequest.result;
                if (cursor) {
                    cursor.delete();
                    cursor.continue();
                }
            };

            if (callback) callback();
        };

        recordsRequest.onerror = () => {
            if (callback) callback();
        };
    }

    // 记录答题情况
    recordAnswer(questionId, userAnswer, isCorrect) {
        if (!this.db) return;
        
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
        if (!this.db) return;
        
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

        if (!this.db) {
            callback(stats);
            return;
        }

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

    // 注册数据库初始化完成的回调
    onInitialized(callback) {
        if (this.isInitialized) {
            callback();
        } else {
            this.initCallbacks.push(callback);
        }
    }

    // 注册题目加载完成的回调
    onQuestionsLoaded(callback) {
        if (this.db && this.isInitialized) {
            // 数据库已初始化，检查是否已经有题目
            this.checkQuestionsExist((hasQuestions) => {
                if (hasQuestions) {
                    // 已有题目，立即执行回调
                    callback();
                } else {
                    // 没有题目，等待加载完成
                    this.questionsLoadedCallbacks.push(callback);
                }
            });
        } else {
            // 数据库未初始化，等待初始化和加载完成
            this.questionsLoadedCallbacks.push(callback);
        }
    }

    // 检查数据库中是否有问题
    checkQuestionsExist(callback) {
        if (!this.db || !this.isInitialized) {
            callback(false);
            return;
        }

        const transaction = this.db.transaction(['questions'], 'readonly');
        const store = transaction.objectStore('questions');
        const countRequest = store.count();

        countRequest.onsuccess = () => {
            const count = countRequest.result;
            console.log('数据库中现有问题数量:', count);
            callback(count > 0);
        };

        countRequest.onerror = () => {
            console.error('检查问题数量失败');
            callback(false);
        };
    }

    // 重新加载问题（用于调试或更新数据）
    reloadQuestions() {
        console.log('清除并重新加载问题...');
        this.clearQuestions();
        setTimeout(() => {
            this.loadQuestionsFromJSON();
        }, 500); // 增加延迟确保清除完成
    }

    // 获取每个级别的题目数量（按题型筛选）
    getQuestionCountsByLevelAndType(type, callback) {
        if (!this.db || !this.isInitialized) {
            callback({});
            return;
        }

        const counts = {
            N5: 0,
            N4: 0,
            N3: 0,
            N2: 0,
            N1: 0
        };

        const transaction = this.db.transaction(['questions'], 'readonly');
        const store = transaction.objectStore('questions');
        const request = store.getAll();

        request.onsuccess = () => {
            const allQuestions = request.result;
            
            Object.keys(counts).forEach(level => {
                let filtered = allQuestions.filter(q => q.level === level);
                if (type && type !== 'all') {
                    filtered = filtered.filter(q => q.type === type);
                }
                counts[level] = filtered.length;
            });

            console.log('各级别题目数量（类型:' + type + '）:', counts);
            callback(counts);
        };

        request.onerror = (event) => {
            console.error('获取题目数量失败:', event.target.error);
            callback(counts);
        };
    }

    // 获取每个级别的题目数量
    getQuestionCountsByLevel(callback) {
        this.getQuestionCountsByLevelAndType('all', callback);
    }
}

// 初始化数据库
const db = new JLPTDatabase();

// 为了调试，添加一个全局函数来手动重新加载问题
window.reloadQuestions = () => {
    console.log('手动重新加载问题...');
    db.reloadQuestions();
};

// 为了调试，添加一个全局函数来检查数据库状态
window.checkDBStatus = () => {
    console.log('数据库状态:', {
        db: !!db.db,
        isInitialized: db.isInitialized,
        readyState: db.db ? db.db.readyState : 'no db'
    });
    
    db.checkQuestionsExist((hasQuestions) => {
        console.log('数据库中有问题:', hasQuestions);
    });
};

// 为了调试，添加一个全局函数来清除并重新加载数据库
window.resetDatabase = () => {
    console.log('清除并重新加载数据库...');
    db.reloadQuestions();
};