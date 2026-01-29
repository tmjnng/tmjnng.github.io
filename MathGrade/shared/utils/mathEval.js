// mathEval: 安全数学计算工具
// 提供安全的表达式计算和答案比较功能

/**
 * 安全计算数学表达式
 * @param {string} expression - 数学表达式
 * @param {object} variables - 变量替换对象
 * @returns {number} 计算结果
 */
export function safeEvaluate(expression, variables = {}) {
    // 替换变量
    let expr = expression;
    for (const [key, value] of Object.entries(variables)) {
        expr = expr.replace(new RegExp(`\\b${key}\\b`, 'g'), value);
    }

    // 替换^为**
    expr = expr.replace(/\^/g, '**');

    // 只允许数字、运算符、括号、小数点、空格
    if (!/^[\d\+\-\*\/\(\)\.\s\*]+$/.test(expr)) {
        throw new Error('Invalid expression: ' + expr);
    }

    try {
        // 使用Function构造器比eval稍安全
        return new Function('return ' + expr)();
    } catch (e) {
        throw new Error('Calculation error: ' + e.message);
    }
}

/**
 * 比较用户答案和正确答案
 * @param {string|number} userAnswer - 用户答案
 * @param {string|number} correctAnswer - 正确答案
 * @param {number} tolerance - 数值容差（默认0.01）
 * @returns {boolean} 是否匹配
 */
export function compareAnswer(userAnswer, correctAnswer, tolerance = 0.01) {
    const user = parseFloat(userAnswer);
    const correct = parseFloat(correctAnswer);

    // 数值比较（支持容差）
    if (!isNaN(user) && !isNaN(correct)) {
        return Math.abs(user - correct) < tolerance;
    }

    // 字符串精确匹配（去除空格）
    return userAnswer.toString().trim().toLowerCase() === correctAnswer.toString().trim().toLowerCase();
}

/**
 * 格式化数字显示（保留有效位数）
 * @param {number} num - 数字
 * @param {number} decimals - 小数位数
 * @returns {string} 格式化后的字符串
 */
export function formatNumber(num, decimals = 2) {
    if (Number.isInteger(num)) {
        return num.toString();
    }
    return num.toFixed(decimals).replace(/\.?0+$/, '');
}

/**
 * 生成随机整数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 随机整数
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 生成指定倍数的随机数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @param {number} step - 步长/倍数
 * @returns {number} 随机数
 */
export function randomStep(min, max, step) {
    const minStep = Math.ceil(min / step);
    const maxStep = Math.floor(max / step);
    return (Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep) * step;
}

/**
 * 生成带指定小数位数的随机数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @param {number} decimals - 小数位数
 * @returns {number} 随机数
 */
export function randomDecimal(min, max, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.floor(Math.random() * (max - min + 1) * factor + min * factor) / factor;
}

/**
 * 带种子的随机数生成器（用于错题重做）
 * @param {number} seed - 随机种子
 * @returns {function} 随机数生成函数
 */
export function seededRandom(seed) {
    let s = seed;
    return function() {
        s = Math.sin(s * 12.9898 + 78.233) * 43758.5453;
        return s - Math.floor(s);
    };
}
