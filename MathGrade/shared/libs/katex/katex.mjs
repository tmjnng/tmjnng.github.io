// 本地KaTeX替代实现 - 简化版数学公式渲染
// 提供基本的数学符号和简单公式渲染功能

// 支持的基本数学符号
const symbols = {
    '\\frac': 'fraction',
    '\\times': '×',
    '\\div': '÷',
    '\\plus': '+',
    '\\minus': '-',
    '\\equals': '=',
    '\\neq': '≠',
    '\\gt': '>',
    '\\lt': '<',
    '\\geq': '≥',
    '\\leq': '≤',
    '\\pi': 'π',
    '\\sqrt': '√',
    '\\sum': '∑',
    '\\prod': '∏',
    '\\int': '∫',
    '\\infty': '∞',
    '\\partial': '∂',
    '\\nabla': '∇',
    '\\cdot': '·',
    '\\pm': '±',
    '\\mp': '∓',
    '\\cup': '∪',
    '\\cap': '∩',
    '\\in': '∈',
    '\\notin': '∉',
    '\\subset': '⊂',
    '\\subseteq': '⊆',
    '\\supset': '⊃',
    '\\supseteq': '⊇',
    '\\emptyset': '∅',
    '\\mathbb{R}': 'ℝ',
    '\\mathbb{N}': 'ℕ',
    '\\mathbb{Z}': 'ℤ',
    '\\mathbb{Q}': 'ℚ',
    '\\mathbb{C}': 'ℂ'
};

// 渲染数学公式
export function renderToString(formula, options = {}) {
    let result = formula;
    
    // 替换基本符号
    for (const [key, value] of Object.entries(symbols)) {
        const regex = new RegExp(key, 'g');
        result = result.replace(regex, value);
    }
    
    // 处理分数
    result = result.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, (match, numerator, denominator) => {
        return `\(${numerator}/${denominator}\)`;
    });
    
    // 处理上标
    result = result.replace(/\^(\{[^}]+\}|[^\\}])/g, (match, content) => {
        const cleanContent = content.replace(/[{}]/g, '');
        return `<sup>${cleanContent}</sup>`;
    });
    
    // 处理下标
    result = result.replace(/_(\{[^}]+\}|[^\\}])/g, (match, content) => {
        const cleanContent = content.replace(/[{}]/g, '');
        return `<sub>${cleanContent}</sub>`;
    });
    
    return result;
}

// 渲染到DOM元素
export function render(formula, element, options = {}) {
    const rendered = renderToString(formula, options);
    element.innerHTML = rendered;
}

// 导出必要的方法
export const katex = {
    render,
    renderToString
};

export default katex;