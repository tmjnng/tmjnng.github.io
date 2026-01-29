// QuestionGenerator: 题目生成器
// 模板引擎 + 随机系数生成数学题目

import { seededRandom } from '../utils/mathEval.js';

export class QuestionGenerator {
    constructor(templates) {
        this.templates = templates;
        this.templateMap = new Map(templates.map(t => [t.id, t]));
    }

    /**
     * 根据模板ID生成题目
     * @param {string} templateId - 模板ID
     * @param {number} seed - 随机种子（可选，用于错题重做）
     * @returns {object} 生成的题目
     */
    generate(templateId, seed = null) {
        const template = this.templateMap.get(templateId);
        if (!template) throw new Error(`Template ${templateId} not found`);

        // 如果有seed，使用seed生成确定性随机数
        const rng = seed ? seededRandom(seed) : Math.random;

        // 生成变量
        const vars = {};
        if (template.variables) {
            for (const [key, config] of Object.entries(template.variables)) {
                vars[key] = this.generateVariable(config, rng);
            }
        }

        // 检查约束，不满足则重新生成（最多10次）
        let attempts = 0;
        while (template.constraint && !this.checkConstraint(vars, template.constraint) && attempts < 10) {
            for (const [key, config] of Object.entries(template.variables)) {
                vars[key] = this.generateVariable(config, rng);
            }
            attempts++;
        }

        // 调用生成函数或默认模板替换
        if (template.generate) {
            return template.generate(vars);
        } else {
            return this.defaultGenerate(template, vars);
        }
    }

    /**
     * 生成单个变量值
     * @param {object} config - 变量配置
     * @param {function} rng - 随机数生成函数
     * @returns {number} 生成的值
     */
    generateVariable(config, rng) {
        const [min, max] = config.range;
        let value;

        if (config.divisible) {
            const step = config.divisible[0];
            const minStep = Math.ceil(min / step);
            const maxStep = Math.floor(max / step);
            value = (Math.floor(rng() * (maxStep - minStep + 1)) + minStep) * step;
        } else if (config.decimal) {
            const factor = Math.pow(10, config.decimal);
            value = Math.floor(rng() * (max - min + 1) * factor + min * factor) / factor;
        } else {
            value = Math.floor(rng() * (max - min + 1)) + min;
        }

        return value;
    }

    /**
     * 检查变量约束条件
     * @param {object} vars - 变量对象
     * @param {string} constraint - 约束表达式
     * @returns {boolean} 是否满足约束
     */
    checkConstraint(vars, constraint) {
        try {
            // 简单约束解析，如 "width < length"
            const func = new Function('vars', `with(vars) { return ${constraint}; }`);
            return func(vars);
        } catch {
            return true;
        }
    }

    /**
     * 默认模板生成（简单字符串替换）
     * @param {object} template - 模板对象
     * @param {object} vars - 变量对象
     * @returns {object} 生成的题目
     */
    defaultGenerate(template, vars) {
        let question = template.template;
        for (const [key, value] of Object.entries(vars)) {
            question = question.replace(new RegExp(`{${key}[^}]*}`, 'g'), value);
        }
        return { question, vars };
    }

    /**
     * 批量生成题目
     * @param {string} templateId - 模板ID
     * @param {number} count - 生成数量
     * @returns {array} 题目数组
     */
    generateBatch(templateId, count) {
        const questions = [];
        for (let i = 0; i < count; i++) {
            questions.push(this.generate(templateId));
        }
        return questions;
    }
}
