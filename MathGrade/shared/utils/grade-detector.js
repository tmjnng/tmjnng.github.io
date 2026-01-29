// grade-detector: 年级检测工具
// 自动从URL或body data-grade属性检测当前年级

/**
 * 从URL路径或body属性检测当前年级
 * @returns {string} 年级标识符 '1'-'12' 或 'university'
 */
export function detectGrade() {
    // 优先从body data-grade读取
    const bodyGrade = document.body?.dataset?.grade;
    if (bodyGrade) return bodyGrade;

    // 从URL路径解析，如 /grade3/ 或 /grade3/index.html
    const pathMatch = window.location.pathname.match(/grade(\d+|university)/i);
    if (pathMatch) {
        return pathMatch[1].toLowerCase();
    }

    // 默认返回3年级
    console.warn('无法检测年级，默认使用grade3');
    return '3';
}

/**
 * 获取年级显示名称
 * @param {string} grade - 年级标识符
 * @returns {string} 年级显示名称
 */
export function getGradeName(grade) {
    const names = {
        '1': '一年级',
        '2': '二年级',
        '3': '三年级',
        '4': '四年级',
        '5': '五年级',
        '6': '六年级',
        '7': '七年级',
        '8': '八年级',
        '9': '九年级',
        '10': '高一',
        '11': '高二',
        '12': '高三',
        'university': '大学'
    };
    return names[grade] || `${grade}年级`;
}

/**
 * 获取年级学段
 * @param {string} grade - 年级标识符
 * @returns {string} 学段名称
 */
export function getGradeLevel(grade) {
    const g = parseInt(grade);
    if (isNaN(g)) return 'university';
    if (g <= 2) return 'primary-kid';
    if (g <= 4) return 'primary';
    if (g <= 6) return 'primary-grad';
    if (g <= 8) return 'middle';
    if (g <= 9) return 'middle-exam';
    if (g <= 12) return 'high';
    return 'university';
}
