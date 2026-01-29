// grade7/templates.js - 七年级数学题目模板库

export const templates = [
    {
        id: 'g7-add-1',
        type: 'fillblank',
        template: '({a}) + ({b}) = ?',
        variables: { a: { range: [-20, 20] }, b: { range: [-20, 20] } },
        generate: function(vars) {
            const result = vars.a + vars.b;
            return {
                question: `(${vars.a}) + (${vars.b}) = `,
                answer: result,
                explanation: `${vars.a} + (${vars.b}) = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g7-sub-1',
        type: 'fillblank',
        template: '({a}) - ({b}) = ?',
        variables: { a: { range: [-20, 20] }, b: { range: [-20, 20] } },
        generate: function(vars) {
            const result = vars.a - vars.b;
            return {
                question: `(${vars.a}) - (${vars.b}) = `,
                answer: result,
                explanation: `${vars.a} - (${vars.b}) = ${vars.a} + (${-vars.b}) = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g7-mul-1',
        type: 'fillblank',
        template: '({a}) × ({b}) = ?',
        variables: { a: { range: [-10, 10] }, b: { range: [-10, 10] } },
        constraint: 'a !== 0 && b !== 0',
        generate: function(vars) {
            const result = vars.a * vars.b;
            return {
                question: `(${vars.a}) × (${vars.b}) = `,
                answer: result,
                explanation: `${vars.a} × ${vars.b} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g7-div-1',
        type: 'fillblank',
        template: '({a}) ÷ ({b}) = ?',
        variables: { a: { range: [-100, 100] }, b: { range: [-10, 10] } },
        constraint: 'b !== 0 && a % b === 0',
        generate: function(vars) {
            const result = vars.a / vars.b;
            return {
                question: `(${vars.a}) ÷ (${vars.b}) = `,
                answer: result,
                explanation: `${vars.a} ÷ ${vars.b} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g7-pow-1',
        type: 'fillblank',
        template: '({a})^{b} = ?',
        variables: { a: { range: [-5, 5] }, b: { range: [2, 3] } },
        constraint: 'a !== 0',
        generate: function(vars) {
            const result = Math.pow(vars.a, vars.b);
            return {
                question: `(${vars.a})^{vars.b} = `,
                answer: result,
                explanation: `${vars.a}的${vars.b}次方 = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g7-combine-1',
        type: 'fillblank',
        template: '化简：{a}x + {b}x = ?',
        variables: { a: { range: [1, 10] }, b: { range: [1, 10] } },
        generate: function(vars) {
            const result = vars.a + vars.b;
            return {
                question: `化简：${vars.a}x + ${vars.b}x = `,
                answer: `${result}x`,
                explanation: `${vars.a}x + ${vars.b}x = ${result}x`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g7-bracket-1',
        type: 'fillblank',
        template: '化简：{a}(x + {b}) = ?',
        variables: { a: { range: [2, 5] }, b: { range: [2, 10] } },
        generate: function(vars) {
            const ab = vars.a * vars.b;
            return {
                question: `化简：${vars.a}(x + ${vars.b}) = `,
                answer: `${vars.a}x + ${ab}`,
                explanation: `${vars.a}(x + ${vars.b}) = ${vars.a}x + ${ab}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g7-equation-1',
        type: 'fillblank',
        template: '解方程：x + {a} = {b}',
        variables: { a: { range: [5, 20] }, b: { range: [25, 50] } },
        constraint: 'b > a',
        generate: function(vars) {
            const result = vars.b - vars.a;
            return {
                question: `解方程：x + ${vars.a} = ${vars.b}`,
                answer: `x = ${result}`,
                explanation: `移项得：x = ${vars.b} - ${vars.a} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g7-equation-2',
        type: 'fillblank',
        template: '解方程：{a}x + {b} = {c}',
        variables: { a: { range: [2, 5] }, b: { range: [5, 15] }, c: { range: [20, 40] } },
        constraint: '(c - b) % a === 0 && c > b',
        generate: function(vars) {
            const result = (vars.c - vars.b) / vars.a;
            return {
                question: `解方程：${vars.a}x + ${vars.b} = ${vars.c}`,
                answer: `x = ${result}`,
                explanation: `移项得：${vars.a}x = ${vars.c - vars.b}，所以 x = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g7-equation-3',
        type: 'fillblank',
        template: '一个数的{a}倍加上{b}等于{c}，求这个数。',
        variables: { a: { range: [2, 5] }, b: { range: [5, 15] }, c: { range: [20, 40] } },
        constraint: '(c - b) % a === 0 && c > b',
        generate: function(vars) {
            const result = (vars.c - vars.b) / vars.a;
            return {
                question: `一个数的${vars.a}倍加上${vars.b}等于${vars.c}，求这个数。`,
                answer: result,
                explanation: `设这个数为x，则${vars.a}x + ${vars.b} = ${vars.c}，解得x = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g7-angle-1',
        type: 'fillblank',
        template: '一个角是{a}°，它的余角是多少度？',
        variables: { a: { range: [10, 80] } },
        generate: function(vars) {
            const result = 90 - vars.a;
            return {
                question: `一个角是${vars.a}°，它的余角是多少度？`,
                answer: result,
                explanation: `余角 = 90° - ${vars.a}° = ${result}°`
            };
        },
        validation: 'exact'
    }
];
