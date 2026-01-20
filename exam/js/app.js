// 主应用类
class JLPTExamApp {
    constructor() {
        this.currentLevel = null;
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.timer = null;
        this.remainingTime = 1800; // 30分钟，用于考试模式
        this.isExamMode = false; // 默认不是考试模式
        this.isDatabaseReady = false;
        
        // 新增：练习模式设置
        this.practiceMode = 'normal'; // 'normal' 或 'wrong'
        this.selectedType = 'all';
        this.skipCompleted = true;

        // 等待数据库初始化完成
        db.onInitialized(() => {
            this.isDatabaseReady = true;
            console.log('数据库初始化完成，可以开始使用');
            this.updateWrongQuestionCounts();
        });

        // 等待题目加载完成
        db.onQuestionsLoaded(() => {
            console.log('题目加载完成，更新题目数量显示');
            this.updateQuestionCounts();
        });

        this.initEventListeners();
        this.loadStatistics();
    }

    // 初始化事件监听器
    initEventListeners() {
        // 导航按钮事件
        document.getElementById('level-btn').addEventListener('click', () => this.showPanel('level-select'));
        document.getElementById('practice-btn').addEventListener('click', () => {
            this.isExamMode = false;
            this.showPanel('practice-panel');
        });
        document.getElementById('exam-btn').addEventListener('click', () => {
            this.isExamMode = true;
            this.showPanel('exam-panel');
        });
        document.getElementById('stats-btn').addEventListener('click', () => {
            this.showPanel('stats-panel');
            this.loadStatistics();
        });

        // 级别选择事件
        document.querySelectorAll('.level-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const level = e.currentTarget.dataset.level;
                this.selectLevel(level);
            });
        });

        // 模式切换标签页
        document.querySelectorAll('.mode-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                this.switchPracticeMode(mode);
            });
        });

        // 题型选择
        document.getElementById('question-type').addEventListener('change', (e) => {
            this.selectedType = e.target.value;
            this.updateQuestionCounts();
        });

        // 跳过已做题
        document.getElementById('skip-completed').addEventListener('change', (e) => {
            this.skipCompleted = e.target.checked;
        });

        // 重置进度按钮
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetProgress();
        });

        // 问题导航事件
        document.getElementById('prev-btn').addEventListener('click', () => this.prevQuestion());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('submit-btn').addEventListener('click', () => this.submitAnswer());

        document.getElementById('exam-prev-btn').addEventListener('click', () => this.prevQuestion());
        document.getElementById('exam-next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('exam-submit-btn').addEventListener('click', () => this.submitExam());

        // 答案选择事件
        document.addEventListener('change', (e) => {
            if (e.target.name === 'answer' || e.target.name === 'exam-answer') {
                this.selectAnswer(e.target.value);
            }
        });
    }

    // 切换练习模式
    switchPracticeMode(mode) {
        this.practiceMode = mode;
        
        // 更新标签页状态
        document.querySelectorAll('.mode-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.mode === mode);
        });

        // 显示/隐藏相应的控件
        const typeSelector = document.getElementById('type-selector');
        const wrongModeInfo = document.getElementById('wrong-mode-info');
        
        if (mode === 'wrong') {
            typeSelector.style.display = 'none';
            wrongModeInfo.style.display = 'block';
        } else {
            typeSelector.style.display = 'block';
            wrongModeInfo.style.display = 'none';
        }
    }

    // 选择级别
    selectLevel(level) {
        console.log('选择级别:', level, '模式:', this.practiceMode);
        
        if (!this.isDatabaseReady) {
            alert('数据库正在初始化中，请稍候再试');
            console.error('尝试在数据库未准备好时选择级别');
            return;
        }

        this.currentLevel = level;
        this.currentQuestionIndex = 0;
        this.userAnswers = {};

        if (this.practiceMode === 'wrong') {
            // 错题集模式
            db.getWrongQuestions(level, 'all', (questions) => {
                if (questions.length === 0) {
                    alert('该级别暂无错题，继续保持！');
                    return;
                }
                this._loadQuestionsAndStart(questions);
            });
        } else {
            // 普通练习模式
            db.getQuestionsByLevelAndType(level, this.selectedType, { skipCompleted: this.skipCompleted }, (questions) => {
                if (questions.length === 0) {
                    alert('没有找到符合条件的题目，请尝试调整设置。');
                    return;
                }
                this._loadQuestionsAndStart(questions);
            });
        }
    }

    // 加载问题并开始练习/考试的内部方法
    _loadQuestionsAndStart(questions) {
        this.currentQuestions = questions;
        this.displayCurrentQuestion();

        // 根据当前模式显示对应的面板
        if (this.isExamMode) {
            this.startExamTimer();
            this.showPanel('exam-panel');
        } else {
            // 练习模式不需要计时器，初始化时间为0
            this.remainingTime = 0;
            this.updateExamTimer();
            this.showPanel('practice-panel');
        }
    }

    // 重置学习进度
    resetProgress() {
        if (!confirm('确定要重置所有学习进度吗？这将清除所有答题记录。')) {
            return;
        }

        const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
        let completed = 0;

        levels.forEach(level => {
            db.resetLevelProgress(level, () => {
                completed++;
                if (completed === levels.length) {
                    alert('学习进度已重置');
                    this.updateQuestionCounts();
                    this.updateWrongQuestionCounts();
                    this.loadStatistics();
                }
            });
        });
    }

    // 更新错题数量显示
    updateWrongQuestionCounts() {
        const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
        
        levels.forEach(level => {
            db.getWrongQuestionCount(level, (count) => {
                const countElement = document.querySelector(`.wrong-count[data-level="${level}"]`);
                if (countElement) {
                    countElement.textContent = `错题: ${count}`;
                }
            });
        });
    }

    // 显示当前问题
    displayCurrentQuestion() {
        if (this.currentQuestions.length === 0) {
            return;
        }

        const question = this.currentQuestions[this.currentQuestionIndex];
        const panel = this.isExamMode ? 'exam-panel' : 'practice-panel';
        const prefix = this.isExamMode ? 'exam-' : '';

        // 更新问题计数
        document.getElementById(`${prefix}current-question`).textContent = this.currentQuestionIndex + 1;
        document.getElementById(`${prefix}total-questions`).textContent = this.currentQuestions.length;

        // 更新问题类型
        const questionType = document.querySelector(`#${panel} .question-type`);
        questionType.textContent = question.type === 'vocab' ? '词汇' : '语法';
        questionType.style.backgroundColor = question.type === 'vocab' ? '#e74c3c' : '#9b59b6';

        // 更新问题内容
        document.querySelector(`#${panel} .question-text`).innerHTML = question.question;

        // 更新选项
        const options = document.querySelectorAll(`#${panel} .options .option`);
        const optionValues = ['option_a', 'option_b', 'option_c', 'option_d'];
        const optionKeys = ['A', 'B', 'C', 'D'];

        options.forEach((option, index) => {
            const input = option.querySelector('input');
            const text = option.querySelector('.option-text');

            input.value = optionKeys[index];
            input.checked = this.userAnswers[this.currentQuestionIndex] === optionKeys[index];
            text.textContent = question[optionValues[index]];

            // 重置样式
            option.classList.remove('selected', 'correct', 'incorrect');
        });

        // 更新导航按钮状态
        this.updateNavigationButtons();
    }

    // 更新导航按钮状态
    updateNavigationButtons() {
        const prefix = this.isExamMode ? 'exam-' : '';
        const prevBtn = document.getElementById(`${prefix}prev-btn`);
        const nextBtn = document.getElementById(`${prefix}next-btn`);

        prevBtn.disabled = this.currentQuestionIndex === 0;
        nextBtn.disabled = this.currentQuestionIndex === this.currentQuestions.length - 1;
    }

    // 选择答案
    selectAnswer(value) {
        this.userAnswers[this.currentQuestionIndex] = value;

        // 高亮选中的选项
        const panel = this.isExamMode ? 'exam-panel' : 'practice-panel';
        const options = document.querySelectorAll(`#${panel} .options .option`);

        options.forEach(option => {
            const input = option.querySelector('input');
            if (input.value === value) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
    }

    // 上一题
    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayCurrentQuestion();
        }
    }

    // 下一题
    nextQuestion() {
        if (this.currentQuestionIndex < this.currentQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.displayCurrentQuestion();
        }
    }

    // 提交答案
    submitAnswer() {
        const question = this.currentQuestions[this.currentQuestionIndex];
        const userAnswer = this.userAnswers[this.currentQuestionIndex];

        if (!userAnswer) {
            alert('请选择一个答案！');
            return;
        }

        const isCorrect = userAnswer === question.correct_answer;

        // 更新数据库记录
        db.recordAnswer(question.id, userAnswer, isCorrect ? 1 : 0);
        db.updateUserProgress(this.currentLevel, isCorrect);

        // 显示答案反馈
        this.showAnswerFeedback(isCorrect, question.correct_answer);

        // 如果是最后一题，显示结果
        if (this.currentQuestionIndex === this.currentQuestions.length - 1) {
            setTimeout(() => this.showResults(), 2000);
        } else {
            setTimeout(() => this.nextQuestion(), 1000);
        }
    }

    // 显示答案反馈
    showAnswerFeedback(isCorrect, correctAnswer) {
        const panel = this.isExamMode ? 'exam-panel' : 'practice-panel';
        const options = document.querySelectorAll(`#${panel} .options .option`);

        options.forEach(option => {
            const input = option.querySelector('input');
            if (input.value === correctAnswer) {
                option.classList.add('correct');
            } else if (input.checked) {
                option.classList.add('incorrect');
            }
        });
    }

    // 提交考试
    submitExam() {
        if (confirm('确定要提交考试吗？')) {
            this.stopTimer();
            this.calculateExamResults();
        }
    }

    // 计算考试结果
    calculateExamResults() {
        let correctCount = 0;
        const totalCount = this.currentQuestions.length;

        // 计算正确答案数量
        this.currentQuestions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correct_answer) {
                correctCount++;
            }
        });

        const score = Math.round((correctCount / totalCount) * 100);

        // 显示结果
        alert(`考试结束！\n总题数: ${totalCount}\n正确题数: ${correctCount}\n得分: ${score}分`);

        // 更新数据库记录
        this.currentQuestions.forEach((question, index) => {
            const isCorrect = this.userAnswers[index] === question.correct_answer;
            db.recordAnswer(question.id, this.userAnswers[index], isCorrect ? 1 : 0);
            db.updateUserProgress(this.currentLevel, isCorrect);
        });

        // 显示统计面板
        this.showPanel('stats-panel');
        this.loadStatistics();
    }

    // 显示结果
    showResults() {
        let correctCount = 0;
        const totalCount = this.currentQuestions.length;

        // 计算正确答案数量
        this.currentQuestions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correct_answer) {
                correctCount++;
            }
        });

        const score = Math.round((correctCount / totalCount) * 100);

        // 错题集模式的结果提示
        let message = `练习结束！\n总题数: ${totalCount}\n正确题数: ${correctCount}\n正确率: ${score}%`;
        if (this.practiceMode === 'wrong') {
            if (score === 100) {
                message += '\n\n恭喜！所有错题都已掌握！';
            } else {
                message += '\n\n继续加油！错题会反复出现直到你完全掌握。';
            }
        }

        alert(message);

        // 重置状态
        this.userAnswers = {};
        this.currentQuestionIndex = 0;
        
        // 错题集模式下，如果还有错题，可以继续练习
        if (this.practiceMode === 'wrong' && score < 100) {
            this.selectLevel(this.currentLevel);
        } else {
            this.showPanel('level-select');
        }
    }

    // 启动考试计时器
    startExamTimer() {
        this.stopTimer();
        this.remainingTime = 1800; // 30分钟
        this.updateExamTimer();

        this.timer = setInterval(() => {
            this.remainingTime--;
            this.updateExamTimer();

            // 时间结束
            if (this.remainingTime <= 0) {
                this.stopTimer();
                this.calculateExamResults();
            }
        }, 1000);
    }

    // 更新考试计时器显示
    updateExamTimer() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (this.isExamMode) {
            document.getElementById('exam-time').textContent = timeString;
        } else {
            document.getElementById('time').textContent = timeString;
        }
    }

    // 停止计时器
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    // 显示指定面板
    showPanel(panelId) {
        // 隐藏所有面板
        document.querySelectorAll('.panel').forEach(panel => {
            panel.classList.remove('active');
        });

        // 显示指定面板
        document.getElementById(panelId).classList.add('active');

        // 更新导航按钮状态
        document.querySelectorAll('.nav .btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // 激活对应的导航按钮
        const navBtnMap = {
            'level-select': 'level-btn',
            'practice-panel': 'practice-btn',
            'exam-panel': 'exam-btn',
            'stats-panel': 'stats-btn'
        };

        if (navBtnMap[panelId]) {
            document.getElementById(navBtnMap[panelId]).classList.add('active');
        }

        // 如果是考试模式，启动计时器
        if (panelId === 'exam-panel') {
            this.startExamTimer();
        } else {
            this.stopTimer();
        }
    }

    // 加载统计信息
    loadStatistics() {
        db.getUserStatistics(stats => {
            document.getElementById('total-practiced').textContent = stats.total_practiced;
            document.getElementById('correct-rate').textContent = stats.correct_rate + '%';
            document.getElementById('today-practiced').textContent = stats.today_practiced;
            document.getElementById('best-score').textContent = stats.best_score;

            // 更新进度条
            const progress = document.querySelector('.progress');
            progress.style.width = stats.correct_rate + '%';
        });
    }

    // 更新各级别的题目数量显示
    updateQuestionCounts() {
        db.getQuestionCountsByLevelAndType(this.selectedType, counts => {
            Object.keys(counts).forEach(level => {
                const levelCard = document.querySelector(`.level-card[data-level="${level}"]`);
                if (levelCard) {
                    const countElement = levelCard.querySelector('.question-count');
                    if (countElement) {
                        countElement.textContent = `${counts[level]}题`;
                    }
                }
            });
        });
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new JLPTExamApp();
});