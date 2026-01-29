// grade10/templates.js - 高一数学题目模板库

export const templates = [
    {
        id: 'g10-set-1',
        type: 'fillblank',
        template: '已知集合A = {1, 2, {a}}，B = {2, 3, {b}}，求A ∩ B',
        variables: { a: { range: [3, 5] }, b: { range: [1, 2] } },
        generate: function(vars) {
            return {
                question: `已知集合A = {1, 2, ${vars.a}}，B = {2, 3, ${vars.b}}，求A ∩ B`,
                answer: '{2}',
                explanation: 'A ∩ B 表示A与B的交集，即同时属于A和B的元素。两个集合都有元素2，所以A ∩ B = {2}'
            };
        },
        validation: 'exact'
    },
    {
        id: 'g10-exp-1',
        type: 'fillblank',
        template: '化简：a^{m} × a^{n} ÷ a^{p}',
        variables: { a: { range: [2, 3] }, m: { range: [3, 5] }, n: { range: [2, 4] }, p: { range: [1, 3] } },
        generate: function(vars) {
            const exp = vars.m + vars.n - vars.p;
            return {
                question: `化简：${vars.a}^{${vars.m}} × ${vars.a}^{${vars.n}} ÷ ${vars.a}^{${vars.p}} = `,
                answer: `${vars.a}^{${exp}}`,
                explanation: `同底数幂相乘除，指数相加减：${vars.a}^{${vars.m}} × ${vars.a}^{${vars.n}} ÷ ${vars.a}^{${vars.p}} = ${vars.a}^{${vars.m}+${vars.n}-${vars.p}} = ${vars.a}^{${exp}}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g10-log-1',
        type: 'fillblank',
        template: '计算：log₂{a} + log₂{b}',
        variables: { a: { range: [2, 8] }, b: { range: [2, 8] } },
        constraint: 'a * b <= 64',
        generate: function(vars) {
            const product = vars.a * vars.b;
            const result = Math.log2(product);
            return {
                question: `计算：log₂${vars.a} + log₂${vars.b} = `,
                answer: result % 1 === 0 ? result : result.toFixed(2),
                explanation: `log₂${vars.a} + log₂${vars.b} = log₂(${vars.a}×${vars.b}) = log₂${product} = ${result % 1 === 0 ? result : result.toFixed(2)}`
            };
        },
        validation: 'tolerance',
        tolerance: 0.01
    },
    {
        id: 'g10-bisect-1',
        type: 'fillblank',
        template: '用二分法求方程x² = {a}在区间(0, {b})内的近似解（精确到0.1）',
        variables: { a: { range: [4, 16], divisible: [4] }, b: { range: [4, 6] } },
        generate: function(vars) {
            const result = Math.sqrt(vars.a).toFixed(1);
            return {
                question: `用二分法求方程x² = ${vars.a}在区间(0, ${vars.b})内的近似解（精确到0.1）`,
                answer: result,
                explanation: `x² = ${vars.a}，x = √${vars.a} ≈ ${result}`
            };
        },
        validation: 'exact'
    }
];
