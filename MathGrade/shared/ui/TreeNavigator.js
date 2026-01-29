// TreeNavigator: 左侧树形导航组件
// 渲染课程目录树，支持折叠、搜索、状态显示

export class TreeNavigator {
    constructor({ curriculum, container, onSelect, storage }) {
        this.curriculum = curriculum;
        this.container = container;
        this.onSelect = onSelect;
        this.storage = storage;
        this.render();
    }

    render() {
        this.container.innerHTML = '';

        // 标题
        const title = document.createElement('h3');
        title.textContent = '课程目录';
        this.container.appendChild(title);

        // 搜索框
        const searchBox = document.createElement('input');
        searchBox.type = 'text';
        searchBox.placeholder = '搜索知识点...';
        searchBox.className = 'search-box';
        searchBox.addEventListener('input', (e) => this.filter(e.target.value));
        this.container.appendChild(searchBox);

        // 树形列表
        const tree = document.createElement('ul');
        tree.className = 'chapter-list';

        this.curriculum.chapters.forEach((chapter, idx) => {
            const chLi = document.createElement('li');
            chLi.className = 'chapter-item';
            chLi.innerHTML = `
                <div class="chapter-title">第${idx + 1}章 ${chapter.title}</div>
                <ul class="node-list"></ul>
            `;

            const nodeList = chLi.querySelector('.node-list');
            chapter.nodes.forEach(node => {
                const nodeLi = document.createElement('li');
                nodeLi.className = 'node-item';
                nodeLi.dataset.id = node.id;

                const status = this.storage.getNodeMastery(node.id);
                const statusIcon = this.getStatusIcon(status);

                nodeLi.innerHTML = `
                    <span class="status-icon">${statusIcon}</span>
                    <span class="node-title">${node.title}</span>
                    ${node.difficulty ? '<span class="diff">' + '★'.repeat(node.difficulty) + '</span>' : ''}
                `;

                nodeLi.addEventListener('click', () => {
                    this.onSelect(node, chapter.title);
                    this.markActive(node.id);
                });

                nodeList.appendChild(nodeLi);
            });

            // 折叠展开功能
            const titleDiv = chLi.querySelector('.chapter-title');
            titleDiv.addEventListener('click', () => {
                nodeList.classList.toggle('collapsed');
                titleDiv.classList.toggle('collapsed');
            });

            tree.appendChild(chLi);
        });

        this.container.appendChild(tree);
    }

    getStatusIcon(status) {
        const icons = {
            'mastered': '🟢',
            'learning': '🟡',
            'struggling': '🔴',
            'new': '⚪'
        };
        return icons[status] || '⚪';
    }

    markActive(nodeId) {
        this.container.querySelectorAll('.node-item').forEach(el => {
            el.classList.remove('active');
            if (el.dataset.id === nodeId) {
                el.classList.add('active');
            }
        });
    }

    filter(keyword) {
        const items = this.container.querySelectorAll('.node-item');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(keyword.toLowerCase()) ? 'flex' : 'none';
        });
    }

    updateProgress() {
        // 重新渲染状态图标
        this.container.querySelectorAll('.node-item').forEach(el => {
            const nodeId = el.dataset.id;
            const status = this.storage.getNodeMastery(nodeId);
            el.querySelector('.status-icon').textContent = this.getStatusIcon(status);
        });
    }
}
