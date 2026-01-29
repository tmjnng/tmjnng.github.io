// grade5/templates.js - 五年级数学题目模板库

export const templates = [
    {
        id: 'g5-decimal-mul-1',
        type: 'fillblank',
        template: '{a} × {b} = ?',
        variables: { a: { range: [10, 99], decimal: 1 }, b: { range: [2, 9] } },
        generate: function(vars) {
            const result = (vars.a * vars.b).toFixed(1);
            return {
                question: `${vars.a} × ${vars.b} = `,
                answer: result,
                explanation: `${vars.a} × ${vars.b} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g5-decimal-mul-2',
        type: 'fillblank',
        template: '{a} × {b} = ?',
        variables: { a: { range: [10, 99], decimal: 1 }, b: { range: [10, 99], decimal: 1 } },
        generate: function(vars) {
            const result = (vars.a * vars.b).toFixed(2);
            return {
                question: `${vars.a} × ${vars.b} = `,
                answer: result,
                explanation: `${vars.a} × ${vars.b} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g5-decimal-div-1',
        type: 'fillblank',
        template: '{a} ÷ {b} = ?',
        variables: { a: { range: [10, 99], decimal: 1 }, b: { range: [2, 9] } },
        generate: function(vars) {
            const result = (vars.a / vars.b).toFixed(2);
            return {
                question: `${vars.a} ÷ ${vars.b} = `,
                answer: result,
                explanation: `${vars.a} ÷ ${vars.b} ≈ ${result}`
            };
        },
        validation: 'tolerance',
        tolerance: 0.01
    },
    {
        id: 'g5-decimal-div-2',
        type: 'fillblank',
        template: '{a} ÷ {b} = ?',
        variables: { a: { range: [10, 99] }, b: { range: [10, 99], decimal: 1 } },
        generate: function(vars) {
            const result = (vars.a / vars.b).toFixed(2);
            return {
                question: `${vars.a} ÷ ${vars.b} = `,
                answer: result,
                explanation: `${vars.a} ÷ ${vars.b} ≈ ${result}`
            };
        },
        validation: 'tolerance',
        tolerance: 0.01
    },
    {
        id: 'g5-decimal-approx',
        type: 'fillblank',
        template: '{a} ÷ {b} ≈ ?（保留一位小数）',
        variables: { a: { range: [10, 99] }, b: { range: [3, 9] } },
        generate: function(vars) {
            const result = (vars.a / vars.b).toFixed(1);
            return {
                question: `${vars.a} ÷ ${vars.b} ≈ `,
                answer: result,
                explanation: `${vars.a} ÷ ${vars.b} ≈ ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g5-equation-1',
        type: 'fillblank',
        template: '解方程：x + {a} = {b}',
        variables: { a: { range: [5, 20] }, b: { range: [25, 50] } },
        constraint: 'b > a',
        generate: function(vars) {
            const result = vars.b - vars.a;
            return {
                question: `解方程：x + ${vars.a} = ${vars.b}`,
                answer: `x = ${result}`,
                explanation: `x = ${vars.b} - ${vars.a} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g5-equation-2',
        type: 'fillblank',
        template: '小明有{a}元，比小红多{b}元，小红有多少元？（用方程解）',
        variables: { a: { range: [30, 80] }, b: { range: [5, 20] } },
        generate: function(vars) {
            const result = vars.a - vars.b;
            return {
                question: `小明有${vars.a}元，比小红多${vars.b}元，小红有多少元？`,
                answer: result,
                explanation: `设小红有x元，x + ${vars.b} = ${vars.a}，x = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g5-area-1',
        type: 'fillblank',
        template: '平行四边形的底是{a}厘米，高是{b}厘米，面积是多少？',
        variables: { a: { range: [5, 15] }, b: { range: [4, 12] } },
        generate: function(vars) {
            const result = vars.a * vars.b;
            return {
                question: `平行四边形的底是${vars.a}厘米，高是${vars.b}厘米，面积是多少？`,
                answer: result,
                explanation: `S = ah = ${vars.a} × ${vars.b} = ${result}平方厘米`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g5-area-2',
        type: 'fillblank',
        template: '三角形的底是{a}厘米，高是{b}厘米，面积是多少？',
        variables: { a: { range: [6, 16] }, b: { range: [4, 12] } },
        generate: function(vars) {
            const result = vars.a * vars.b / 2;
            return {
                question: `三角形的底是${vars.a}厘米，高是${vars.b}厘米，面积是多少？`,
                answer: result,
                explanation: `S = ah ÷ 2 = ${vars.a} × ${vars.b} ÷ 2 = ${result}平方厘米`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g5-area-3',
        type: 'fillblank',
        template: '梯形的上底是{a}厘米，下底是{b}厘米，高是{c}厘米，面积是多少？',
        variables: { a: { range: [3, 8] }, b: { range: [5, 12] }, c: { range: [4, 10] } },
        generate: function(vars) {
            const result = (vars.a + vars.b) * vars.c / 2;
            return {
                question: `梯形的上底是${vars.a}厘米，下底是${vars.b}厘米，高是${vars.c}厘米，面积是多少？`,
                answer: result,
                explanation: `S = (a + b)h ÷ 2 = (${vars.a} + ${vars.b}) × ${vars.c} ÷ 2 = ${result}平方厘米`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g5-tree-1',
        type: 'fillblank',
        template: '在{a}米长的小路一边植树，每隔{b}米植一棵，两端都植，一共要植多少棵？',
        variables: { a: { range: [30, 100], divisible: [5, 10] }, b: { range: [5, 10] } },
        constraint: 'a % b === 0',
        generate: function(vars) {
            const result = vars.a / vars.b + 1;
            return {
                question: `在${vars.a}米长的小路一边植树，每隔${vars.b}米植一棵，两端都植，一共要植多少棵？`,
                answer: result,
                explanation: `间隔数 = ${vars.a} ÷ ${vars.b} = ${vars.a / vars.b}，棵数 = 间隔数 + 1 = ${result}`
            };
        },
        validation: 'exact'
    }
];
