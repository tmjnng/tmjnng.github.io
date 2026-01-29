// Breadcrumb: 面包屑导航组件
// 显示当前位置导航路径

export class Breadcrumb {
    constructor({ grade, curriculumName, container }) {
        this.grade = grade;
        this.curriculumName = curriculumName;
        this.container = container;
        this.currentPath = [];
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        this.container.className = 'breadcrumb';
        
        // 年级首页链接
        const homeLink = document.createElement('a');
        homeLink.href = './index.html';
        homeLink.textContent = this.curriculumName;
        homeLink.className = 'breadcrumb-item';
        this.container.appendChild(homeLink);

        // 分隔符
        const separator = document.createElement('span');
        separator.className = 'breadcrumb-separator';
        separator.textContent = '>';
        this.container.appendChild(separator);

        // 当前节点
        this.currentSpan = document.createElement('span');
        this.currentSpan.className = 'breadcrumb-current';
        this.currentSpan.textContent = '请选择知识点';
        this.container.appendChild(this.currentSpan);
    }

    /**
     * 更新面包屑路径
     * @param {object} node - 当前节点
     * @param {string} chapterTitle - 章节标题
     */
    updatePath(node, chapterTitle = '') {
        this.currentSpan.textContent = node.title;
        this.currentNode = node;
        this.chapterTitle = chapterTitle;
    }

    /**
     * 获取完整路径文本
     * @returns {string} 路径文本
     */
    getFullPath() {
        if (this.chapterTitle) {
            return `${this.curriculumName} > ${this.chapterTitle} > ${this.currentNode?.title || ''}`;
        }
        return `${this.curriculumName} > ${this.currentNode?.title || ''}`;
    }
}
