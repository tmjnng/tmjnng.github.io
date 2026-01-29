// FormulaRenderer: KaTeX公式渲染封装
// 提供LaTeX公式的渲染功能

import katex from 'katex';

export class FormulaRenderer {
    /**
     * 渲染LaTeX公式到指定容器
     * @param {HTMLElement} container - 目标容器
     * @param {string} latex - LaTeX公式字符串
     * @param {boolean} displayMode - 是否为显示模式（独立行）
     * @returns {HTMLElement} 渲染后的元素
     */
    static render(container, latex, displayMode = false) {
        try {
            const el = document.createElement('span');
            if (displayMode) el.className = 'katex-display';

            katex.render(latex, el, {
                throwOnError: false,
                displayMode: displayMode,
                strict: false
            });

            container.appendChild(el);
            return el;
        } catch (e) {
            console.error('KaTeX render error:', e);
            const fallback = document.createElement('code');
            fallback.textContent = latex;
            container.appendChild(fallback);
            return fallback;
        }
    }

    /**
     * 渲染包含LaTeX的混合文本
     * 自动识别$...$（行内）和$$...$$（独立行）格式
     * @param {string} text - 包含LaTeX的文本
     * @returns {DocumentFragment} 渲染后的文档片段
     */
    static renderString(text) {
        const parts = text.split(/(\$\$?[\s\S]*?\$\$?)/);
        const fragment = document.createDocumentFragment();

        parts.forEach(part => {
            if (part.startsWith('$$') && part.endsWith('$$')) {
                const latex = part.slice(2, -2);
                const el = document.createElement('span');
                el.className = 'katex-display';
                try {
                    katex.render(latex, el, { throwOnError: false, displayMode: true });
                } catch (e) {
                    el.textContent = latex;
                }
                fragment.appendChild(el);
            } else if (part.startsWith('$') && part.endsWith('$')) {
                const latex = part.slice(1, -1);
                const el = document.createElement('span');
                try {
                    katex.render(latex, el, { throwOnError: false, displayMode: false });
                } catch (e) {
                    el.textContent = latex;
                }
                fragment.appendChild(el);
            } else {
                fragment.appendChild(document.createTextNode(part));
            }
        });

        return fragment;
    }

    /**
     * 清空容器并渲染LaTeX
     * @param {HTMLElement} container - 目标容器
     * @param {string} latex - LaTeX公式
     * @param {boolean} displayMode - 是否为显示模式
     */
    static renderClean(container, latex, displayMode = false) {
        container.innerHTML = '';
        return this.render(container, latex, displayMode);
    }
}
