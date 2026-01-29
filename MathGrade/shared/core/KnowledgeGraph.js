// KnowledgeGraph: 知识图谱渲染器
// 接收年级数据渲染树形菜单

export class KnowledgeGraph {
    constructor({ curriculum, container, onSelect, storage }) {
        this.curriculum = curriculum;
        this.container = container;
        this.onSelect = onSelect;
        this.storage = storage;
    }

    /**
     * 渲染知识图谱
     */
    render() {
        this.container.innerHTML = '';
        
        const graph = document.createElement('div');
        graph.className = 'knowledge-graph';

        this.curriculum.chapters.forEach((chapter, idx) => {
            const chapterEl = this.renderChapter(chapter, idx);
            graph.appendChild(chapterEl);
        });

        this.container.appendChild(graph);
    }

    renderChapter(chapter, index) {
        const el = document.createElement('div');
        el.className = 'kg-chapter';
        
        const header = document.createElement('div');
        header.className = 'kg-chapter-header';
        header.innerHTML = `<span class="kg-chapter-num">第${index + 1}章</span> ${chapter.title}`;
        
        const nodes = document.createElement('div');
        nodes.className = 'kg-nodes';
        
        chapter.nodes.forEach(node => {
            const nodeEl = this.renderNode(node);
            nodes.appendChild(nodeEl);
        });

        // 折叠功能
        header.addEventListener('click', () => {
            nodes.classList.toggle('collapsed');
            header.classList.toggle('collapsed');
        });

        el.appendChild(header);
        el.appendChild(nodes);
        
        return el;
    }

    renderNode(node) {
        const el = document.createElement('div');
        el.className = 'kg-node';
        el.dataset.id = node.id;

        const status = this.storage.getNodeMastery(node.id);
        el.dataset.status = status;

        el.innerHTML = `
            <span class="kg-node-status"></span>
            <span class="kg-node-title">${node.title}</span>
            ${node.difficulty ? '<span class="kg-node-diff">' + '★'.repeat(node.difficulty) + '</span>' : ''}
        `;

        el.addEventListener('click', () => {
            this.onSelect(node);
        });

        return el;
    }

    /**
     * 更新节点状态
     * @param {string} nodeId - 节点ID
     */
    updateNodeStatus(nodeId) {
        const el = this.container.querySelector(`[data-id="${nodeId}"]`);
        if (el) {
            const status = this.storage.getNodeMastery(nodeId);
            el.dataset.status = status;
        }
    }

    /**
     * 获取学习进度统计
     * @returns {object} 进度统计
     */
    getProgress() {
        let total = 0;
        let completed = 0;
        let learning = 0;

        this.curriculum.chapters.forEach(chapter => {
            chapter.nodes.forEach(node => {
                total++;
                const status = this.storage.getNodeMastery(node.id);
                if (status === 'mastered') completed++;
                else if (status === 'learning') learning++;
            });
        });

        return { total, completed, learning, percentage: total ? (completed / total * 100).toFixed(1) : 0 };
    }
}
