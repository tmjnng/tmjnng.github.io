// ExercisePanel: 习题面板组件
// 刷题界面容器，显示题目、答题、反馈

import { FormulaRenderer } from './FormulaRenderer.js';
import { compareAnswer } from '../utils/mathEval.js';

export class ExercisePanel {
    constructor({ node, templates, container, storage, onComplete }) {
        this.node = node;
        this.templates = templates || [];
        this.container = container;
        this.storage = storage;
        this.onComplete = onComplete;
        
        this.currentQuestion = null;
        this.questionIndex = 0;
        this.questions = [];
        this.results = [];
        this.wrongQuestions = [];
    }

    render() {
        this.container.innerHTML = '';

        // 生成题目
        this.generateQuestions();

        // 创建面板
        this.panel = document.createElement('div');
        this.panel.className = 'exercise-panel';
        this.container.appendChild(this.panel);

        // 显示第一题
        this.showQuestion(0);
    }

    generateQuestions() {
        this.questions = [];
        
        if (this.node.templateIds && this.node.templateIds.length > 0) {
            // 使用模板生成题目
            this.node.templateIds.forEach(templateId => {
                const template = this.templates.find(t => t.id === templateId);
                if (template) {
                    const question = this.generateFromTemplate(template);
                    if (question) {
                        this.questions.push(question);
                    }
                }
            });
        }

        // 如果没有题目，显示提示
        if (this.questions.length === 0) {
            this.questions.push({
                type: 'info',
                content: '该知识点暂无习题，请先学习概念内容。'
            });
        }
    }

    generateFromTemplate(template) {
        try {
            const vars = {};
            
            // 生成变量
            if (template.variables) {
                for (const [key, config] of Object.entries(template.variables)) {
                    const [min, max] = config.range;
                    if (config.divisible) {
                        const step = config.divisible[0];
                        const minStep = Math.ceil(min / step);
                        const maxStep = Math.floor(max / step);
                        vars[key] = (Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep) * step;
                    } else if (config.decimal) {
                        const factor = Math.pow(10, config.decimal);
                        vars[key] = Math.floor(Math.random() * (max - min + 1) * factor + min * factor) / factor;
                    } else {
                        vars[key] = Math.floor(Math.random() * (max - min + 1)) + min;
                    }
                }
            }

            // 调用生成函数
            if (template.generate) {
                return template.generate(vars);
            }

            // 默认模板替换
            let question = template.template;
            for (const [key, value] of Object.entries(vars)) {
                question = question.replace(new RegExp(`{${key}[^}]*}`, 'g'), value);
            }

            return {
                question,
                answer: 'unknown',
                vars
            };
        } catch (e) {
            console.error('生成题目失败:', e);
            return null;
        }
    }

    showQuestion(index) {
        this.questionIndex = index;
        const q = this.questions[index];

        this.panel.innerHTML = '';

        // 进度条
        const progress = document.createElement('div');
        progress.className = 'exercise-progress';
        progress.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(index / this.questions.length) * 100}%"></div>
            </div>
            <span class="progress-text">${index + 1} / ${this.questions.length}</span>
        `;
        this.panel.appendChild(progress);

        // 题目内容
        const content = document.createElement('div');
        content.className = 'question-content';

        if (q.type === 'info') {
            content.innerHTML = `<p>${q.content}</p>`;
        } else {
            // 题目文本
            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            
            // 尝试渲染LaTeX
            if (q.question) {
                const rendered = FormulaRenderer.renderString(q.question);
                questionText.appendChild(rendered);
            }
            content.appendChild(questionText);

            // 选项（选择题）
            if (q.options) {
                const optionsDiv = document.createElement('div');
                optionsDiv.className = 'question-options';
                
                q.options.forEach((opt, i) => {
                    const optBtn = document.createElement('button');
                    optBtn.className = 'option-btn';
                    optBtn.dataset.index = i;
                    
                    // 渲染选项中的LaTeX
                    const optContent = document.createElement('span');
                    const rendered = FormulaRenderer.renderString(opt.toString());
                    optContent.appendChild(rendered);
                    optBtn.appendChild(optContent);
                    
                    optBtn.addEventListener('click', () => this.checkAnswer(i));
                    optionsDiv.appendChild(optBtn);
                });
                
                content.appendChild(optionsDiv);
            } else {
                // 填空题
                const inputDiv = document.createElement('div');
                inputDiv.className = 'question-input';
                inputDiv.innerHTML = `
                    <input type="text" class="answer-input" placeholder="请输入答案...">
                    <button class="btn-submit">提交</button>
                `;
                
                const input = inputDiv.querySelector('.answer-input');
                const submitBtn = inputDiv.querySelector('.btn-submit');
                
                submitBtn.addEventListener('click', () => this.checkAnswer(input.value));
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.checkAnswer(input.value);
                });
                
                content.appendChild(inputDiv);
                
                // 自动聚焦
                setTimeout(() => input.focus(), 100);
            }

            // 提示
            if (q.hint) {
                const hintDiv = document.createElement('div');
                hintDiv.className = 'question-hint';
                hintDiv.innerHTML = `<strong>提示：</strong>${q.hint}`;
                content.appendChild(hintDiv);
            }
        }

        this.panel.appendChild(content);

        // 导航按钮
        const nav = document.createElement('div');
        nav.className = 'exercise-nav';
        
        if (index > 0) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'btn-prev';
            prevBtn.textContent = '上一题';
            prevBtn.addEventListener('click', () => this.showQuestion(index - 1));
            nav.appendChild(prevBtn);
        }

        if (index < this.questions.length - 1) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'btn-next';
            nextBtn.textContent = '下一题';
            nextBtn.addEventListener('click', () => this.showQuestion(index + 1));
            nav.appendChild(nextBtn);
        } else {
            const finishBtn = document.createElement('button');
            finishBtn.className = 'btn-finish';
            finishBtn.textContent = '完成练习';
            finishBtn.addEventListener('click', () => this.finish());
            nav.appendChild(finishBtn);
        }

        this.panel.appendChild(nav);
    }

    checkAnswer(answer) {
        const q = this.questions[this.questionIndex];
        const isCorrect = compareAnswer(answer.toString(), q.answer.toString());

        // 保存结果
        this.results[this.questionIndex] = isCorrect;

        if (!isCorrect) {
            this.wrongQuestions.push({
                ...q,
                userAnswer: answer
            });
        }

        // 显示反馈
        this.showFeedback(isCorrect, q);
    }

    showFeedback(isCorrect, q) {
        const feedback = document.createElement('div');
        feedback.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;
        
        if (isCorrect) {
            feedback.innerHTML = `
                <div class="feedback-icon">✓</div>
                <div class="feedback-text">回答正确！</div>
            `;
        } else {
            // 创建反馈容器
            feedback.innerHTML = `
                <div class="feedback-icon">✗</div>
                <div class="feedback-text">回答错误</div>
                <div class="feedback-answer">正确答案：<span id="correct-answer"></span></div>
                ${q.explanation ? `<div class="feedback-explanation">${q.explanation}</div>` : ''}
            `;
            
            // 渲染正确答案中的LaTeX公式
            const answerSpan = feedback.querySelector('#correct-answer');
            if (answerSpan && q.answer) {
                const renderedAnswer = FormulaRenderer.renderString(q.answer.toString());
                answerSpan.appendChild(renderedAnswer);
            }
        }

        // 替换当前内容显示反馈
        const content = this.panel.querySelector('.question-content');
        content.innerHTML = '';
        content.appendChild(feedback);

        // 2秒后自动下一题
        if (this.questionIndex < this.questions.length - 1) {
            setTimeout(() => {
                this.showQuestion(this.questionIndex + 1);
            }, 2000);
        }
    }

    finish() {
        const correctCount = this.results.filter(r => r).length;
        const accuracy = correctCount / this.questions.length;

        // 显示总结
        this.panel.innerHTML = '';
        
        const summary = document.createElement('div');
        summary.className = 'exercise-summary';
        summary.innerHTML = `
            <h2>练习完成！</h2>
            <div class="summary-stats">
                <div class="stat">
                    <span class="stat-value">${this.questions.length}</span>
                    <span class="stat-label">总题数</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${correctCount}</span>
                    <span class="stat-label">正确</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${(accuracy * 100).toFixed(0)}%</span>
                    <span class="stat-label">正确率</span>
                </div>
            </div>
            <div class="summary-message">${this.getSummaryMessage(accuracy)}</div>
            <button class="btn-back">返回学习</button>
        `;

        summary.querySelector('.btn-back').addEventListener('click', () => {
            if (this.onComplete) {
                this.onComplete({
                    accuracy,
                    correctCount,
                    total: this.questions.length,
                    wrongQuestions: this.wrongQuestions
                });
            }
        });

        this.panel.appendChild(summary);
    }

    getSummaryMessage(accuracy) {
        if (accuracy >= 0.9) return '🎉 太棒了！你已经完全掌握了这个知识点！';
        if (accuracy >= 0.7) return '👍 做得不错！再练习一下就能完全掌握了。';
        if (accuracy >= 0.5) return '💪 继续加油！建议再复习一下概念内容。';
        return '📚 建议重新学习概念，然后再来练习。';
    }
}
