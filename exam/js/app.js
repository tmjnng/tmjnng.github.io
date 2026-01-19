// 主应用类
class JLPTExamApp {
    constructor() {
        this.currentLevel = null;
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.timer = null;
        this.remainingTime = 1800; // 30分钟，用于考试模式
        this.isExamMode = true;

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
        if (panelId === 'exam-panel' && this.isExamMode) {
            this.startExamTimer();
        } else {
            this.stopTimer();
        }
    }

    // 选择级别
    selectLevel(level) {
        this.currentLevel = level;
        this.currentQuestionIndex = 0;
        this.userAnswers = {};

        // 获取该级别的问题
        db.getQuestionsByLevel(level, (questions) => {
            this.currentQuestions = questions;
            this.displayCurrentQuestion();

            // 根据当前模式显示对应的面板
            if (this.isExamMode) {
                this.showPanel('exam-panel');
            } else {
                this.showPanel('practice-panel');
            }
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

        alert(`练习结束！\n总题数: ${totalCount}\n正确题数: ${correctCount}\n正确率: ${score}%`);

        // 重置状态
        this.userAnswers = {};
        this.currentQuestionIndex = 0;
        this.showPanel('level-select');
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
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new JLPTExamApp();
});