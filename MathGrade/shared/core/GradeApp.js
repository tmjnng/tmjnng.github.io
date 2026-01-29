// GradeApp: 应用控制器基类
// 自动检测年级、初始化主题、挂载组件

import { GradeStorage } from '../utils/storage.js';
import { detectGrade, getGradeName } from '../utils/grade-detector.js';
import { TreeNavigator } from '../ui/TreeNavigator.js';
import { Breadcrumb } from '../ui/Breadcrumb.js';
import { CanvasBoard } from '../ui/CanvasBoard.js';
import { ExercisePanel } from '../ui/ExercisePanel.js';
import { FormulaRenderer } from '../ui/FormulaRenderer.js';

export class GradeApp {
    constructor(config) {
        this.grade = config.grade || detectGrade();
        this.curriculum = config.curriculum;
        this.templates = config.templates;
        this.container = config.container;

        // 自动注入年级主题
        document.body.dataset.grade = this.grade;

        // 初始化存储
        this.storage = new GradeStorage(this.grade);

        // 状态管理
        this.currentNode = null;
        this.treeNav = null;
        this.header = null;
        this.canvas = null;
    }

    async init() {
        // 1. 初始化主题
        this.initTheme();

        // 2. 渲染导航
        this.treeNav = new TreeNavigator({
            curriculum: this.curriculum,
            container: document.getElementById('sidebar'),
            onSelect: (node, chapterTitle) => this.loadNode(node, chapterTitle),
            storage: this.storage
        });

        // 3. 渲染头部
        this.header = new Breadcrumb({
            grade: this.grade,
            curriculumName: this.curriculum.name,
            container: document.getElementById('main-header')
        });

        // 4. 初始化草稿板
        const scratchBtn = this.createScratchButton();
        this.canvas = new CanvasBoard({
            container: document.getElementById('scratch-paper'),
            triggerButton: scratchBtn
        });

        // 5. 加载上次学习位置或默认第一个节点
        const lastNodeId = this.storage.get('lastNode');
        if (lastNodeId) {
            const node = this.findNodeById(lastNodeId);
            if (node) {
                const chapter = this.findChapterByNodeId(lastNodeId);
                this.loadNode(node, chapter?.title);
            }
        } else {
            // 加载第一个章节第一个节点
            const firstChapter = this.curriculum.chapters[0];
            if (firstChapter && firstChapter.nodes[0]) {
                this.loadNode(firstChapter.nodes[0], firstChapter.title);
            }
        }

        // 6. 初始化搜索
        this.initSearch();
    }

    initTheme() {
        // 根据年级设置CSS变量或类名
        const themes = {
            '1': 'primary-kid',
            '2': 'primary-kid',
            '3': 'primary',
            '4': 'primary',
            '5': 'primary',
            '6': 'primary-grad',
            '7': 'middle',
            '8': 'middle',
            '9': 'middle-exam',
            '10': 'high',
            '11': 'high',
            '12': 'high-exam',
            'university': 'academic'
        };
        document.body.classList.add(themes[this.grade] || 'default');
    }

    loadNode(node, chapterTitle = '') {
        this.currentNode = node;
        const content = document.getElementById('content');
        content.innerHTML = ''; // 清空

        // 更新面包屑
        this.header.updatePath(node, chapterTitle);

        if (node.type === 'concept') {
            this.renderConcept(node, content);
        } else if (node.type === 'exercise') {
            this.renderExercise(node, content);
        } else {
            // 默认为概念类型
            this.renderConcept(node, content);
        }

        // 保存进度
        this.storage.set('lastNode', node.id);
        this.treeNav.markActive(node.id);
    }

    renderConcept(node, container) {
        const card = document.createElement('div');
        card.className = 'concept-card';

        // 标题和难度
        card.innerHTML = `
            <h1>${node.title}</h1>
            <div class="meta">
                <span class="difficulty">${'★'.repeat(node.difficulty || 1)}</span>
                <span class="time">⏱️ ${node.estimatedTime || 10}分钟</span>
            </div>
            <div class="content">${node.content || ''}</div>
            <div class="formulas"></div>
            <button class="btn-practice">开始练习</button>
        `;

        // 渲染公式
        if (node.formulas && node.formulas.length > 0) {
            const formulaContainer = card.querySelector('.formulas');
            node.formulas.forEach(latex => {
                FormulaRenderer.render(formulaContainer, latex, true);
            });
        }

        // 示例
        if (node.examples) {
            const examplesDiv = document.createElement('div');
            examplesDiv.className = 'examples';
            node.examples.forEach(ex => {
                const exEl = document.createElement('div');
                exEl.className = 'example-item';
                exEl.innerHTML = `<strong>例：</strong>${ex.problem}`;
                if (ex.answer) {
                    exEl.innerHTML += `<br><strong>答：</strong>${ex.answer}`;
                }
                examplesDiv.appendChild(exEl);
            });
            card.appendChild(examplesDiv);
        }

        // 练习按钮
        card.querySelector('.btn-practice').addEventListener('click', () => {
            this.renderExercise(node, container);
        });

        container.appendChild(card);
    }

    renderExercise(node, container) {
        container.innerHTML = '';
        const panel = new ExercisePanel({
            node,
            templates: this.templates,
            container,
            storage: this.storage,
            onComplete: (result) => this.handleExerciseComplete(result)
        });
        panel.render();
    }

    handleExerciseComplete(result) {
        // 更新掌握度
        if (result.accuracy > 0.8) {
            this.storage.setNodeMastery(this.currentNode.id, 'mastered');
        } else if (result.accuracy > 0.5) {
            this.storage.setNodeMastery(this.currentNode.id, 'learning');
        } else {
            this.storage.setNodeMastery(this.currentNode.id, 'struggling');
            // 加入错题本
            result.wrongQuestions.forEach(q => {
                this.storage.addWrongQuestion(q);
            });
        }

        // 刷新导航状态
        this.treeNav.updateProgress();
    }

    findNodeById(id) {
        for (const chapter of this.curriculum.chapters) {
            const node = chapter.nodes.find(n => n.id === id);
            if (node) return node;
        }
        return null;
    }

    findChapterByNodeId(nodeId) {
        for (const chapter of this.curriculum.chapters) {
            const node = chapter.nodes.find(n => n.id === nodeId);
            if (node) return chapter;
        }
        return null;
    }

    initSearch() {
        // 搜索功能已在TreeNavigator中实现
    }

    createScratchButton() {
        const btn = document.createElement('button');
        btn.className = 'scratch-toggle';
        btn.innerHTML = '📝';
        btn.title = '草稿纸';
        document.body.appendChild(btn);
        return btn;
    }
}
