// grade8/templates.js - 八年级数学题目模板库

export const templates = [
    {
        id: 'g8-polygon-1',
        type: 'fillblank',
        template: 'n边形的内角和是多少度？',
        variables: { n: { range: [3, 10] } },
        generate: function(vars) {
            const result = (vars.n - 2) * 180;
            return {
                question: `${vars.n}边形的内角和是多少度？`,
                answer: result,
                explanation: `内角和 = (${vars.n} - 2) × 180° = ${result}°`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g8-power-1',
        type: 'fillblank',
        template: 'a^{m} × a^{n} = ?',
        variables: { a: { range: [2, 5] }, m: { range: [2, 5] }, n: { range: [2, 5] } },
        generate: function(vars) {
            const exp = vars.m + vars.n;
            return {
                question: `${vars.a}^{${vars.m}} × ${vars.a}^{${vars.n}} = `,
                answer: `${vars.a}^{${exp}}`,
                explanation: `同底数幂相乘，底数不变，指数相加：${vars.a}^{${vars.m}} × ${vars.a}^{${vars.n}} = ${vars.a}^{${exp}}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g8-power-2',
        type: 'fillblank',
        template: '(a^{m})^{n} = ?',
        variables: { a: { range: [2, 5] }, m: { range: [2, 4] }, n: { range: [2, 3] } },
        generate: function(vars) {
            const exp = vars.m * vars.n;
            return {
                question: `(${vars.a}^{${vars.m}})^{${vars.n}} = `,
                answer: `${vars.a}^{${exp}}`,
                explanation: `幂的乘方，底数不变，指数相乘：(${vars.a}^{${vars.m}})^{${vars.n}} = ${vars.a}^{${exp}}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g8-power-3',
        type: 'fillblank',
        template: '(ab)^{n} = ?',
        variables: { a: { range: [2, 5] }, b: { range: [2, 5] }, n: { range: [2, 3] } },
        generate: function(vars) {
            return {
                question: `(${vars.a} × ${vars.b})^{${vars.n}} = `,
                answer: `${vars.a}^{${vars.n}} × ${vars.b}^{${vars.n}}`,
                explanation: `积的乘方等于各因式乘方的积：(${vars.a} × ${vars.b})^{${vars.n}} = ${vars.a}^{${vars.n}} × ${vars.b}^{${vars.n}}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g8-mul-1',
        type: 'fillblank',
        template: '({a}x + {b})({c}x + {d}) = ?',
        variables: { a: { range: [1, 3] }, b: { range: [1, 5] }, c: { range: [1, 3] }, d: { range: [1, 5] } },
        generate: function(vars) {
            const ac = vars.a * vars.c;
            const ad = vars.a * vars.d;
            const bc = vars.b * vars.c;
            const bd = vars.b * vars.d;
            const mid = ad + bc;
            return {
                question: `(${vars.a}x + ${vars.b})(${vars.c}x + ${vars.d}) = `,
                answer: `${ac}x² + ${mid}x + ${bd}`,
                explanation: `(${vars.a}x + ${vars.b})(${vars.c}x + ${vars.d}) = ${ac}x² + ${ad}x + ${bc}x + ${bd} = ${ac}x² + ${mid}x + ${bd}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g8-formula-1',
        type: 'fillblank',
        template: '({a} + {b})({a} - {b}) = ?',
        variables: { a: { range: [2, 10] }, b: { range: [1, 5] } },
        generate: function(vars) {
            const result = vars.a * vars.a - vars.b * vars.b;
            return {
                question: `(${vars.a} + ${vars.b})(${vars.a} - ${vars.b}) = `,
                answer: result,
                explanation: `平方差公式：(${vars.a} + ${vars.b})(${vars.a} - ${vars.b}) = ${vars.a}² - ${vars.b}² = ${vars.a * vars.a} - ${vars.b * vars.b} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g8-formula-2',
        type: 'fillblank',
        template: '({a} + {b})² = ?',
        variables: { a: { range: [2, 10] }, b: { range: [1, 5] } },
        generate: function(vars) {
            const a2 = vars.a * vars.a;
            const ab2 = 2 * vars.a * vars.b;
            const b2 = vars.b * vars.b;
            return {
                question: `(${vars.a} + ${vars.b})² = `,
                answer: `${a2} + ${ab2}x + ${b2}`,
                explanation: `完全平方公式：(${vars.a} + ${vars.b})² = ${vars.a}² + 2×${vars.a}×${vars.b} + ${vars.b}² = ${a2} + ${ab2} + ${b2}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g8-frac-1',
        type: 'fillblank',
        template: '\\frac{a}{b} × \\frac{c}{d} = ?',
        variables: { a: { range: [1, 5] }, b: { range: [2, 5] }, c: { range: [1, 5] }, d: { range: [2, 5] } },
        generate: function(vars) {
            const num = vars.a * vars.c;
            const den = vars.b * vars.d;
            return {
                question: `$\\frac{${vars.a}}{${vars.b}} \\times \\frac{${vars.c}}{${vars.d}} = $`,
                answer: `\\frac{${num}}{${den}}`,
                explanation: `$\\frac{${vars.a}}{${vars.b}} \\times \\frac{${vars.c}}{${vars.d}} = \\frac{${num}}{${den}}$`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g8-frac-2',
        type: 'fillblank',
        template: '\\frac{a}{b} + \\frac{c}{b} = ?',
        variables: { a: { range: [1, 5] }, b: { range: [2, 5] }, c: { range: [1, 5] } },
        generate: function(vars) {
            const num = vars.a + vars.c;
            return {
                question: `$\\frac{${vars.a}}{${vars.b}} + \\frac{${vars.c}}{${vars.b}} = $`,
                answer: `\\frac{${num}}{${vars.b}}`,
                explanation: `同分母分式相加：$\\frac{${vars.a}}{${vars.b}} + \\frac{${vars.c}}{${vars.b}} = \\frac{${num}}{${vars.b}}$`
            };
        },
        validation: 'exact'
    }
];
