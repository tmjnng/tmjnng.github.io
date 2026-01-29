// grade4/templates.js - 四年级数学题目模板库

export const templates = [
    {
        id: 'g4-read-1',
        type: 'fillblank',
        template: '写出下面各数：{a}',
        variables: { a: { range: [10000, 999999] } },
        generate: function(vars) {
            return {
                question: `写出下面各数：${vars.a}`,
                answer: vars.a,
                explanation: `${vars.a} 读作：${vars.a.toLocaleString('zh-CN')}。`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g4-compare-1',
        type: 'choice',
        template: '比较大小：{a} ○ {b}',
        variables: { a: { range: [10000, 999999] }, b: { range: [10000, 999999] } },
        generate: function(vars) {
            let correct;
            if (vars.a > vars.b) correct = '>';
            else if (vars.a < vars.b) correct = '<';
            else correct = '=';
            return {
                question: `比较大小：${vars.a} ○ ${vars.b}`,
                options: ['>', '<', '='],
                answer: correct,
                explanation: `${vars.a} ${correct} ${vars.b}`
            };
        },
        shuffleOptions: false,
        validation: 'exact'
    },
    {
        id: 'g4-mul-1',
        type: 'fillblank',
        template: '{a} × {b} = ?',
        variables: { a: { range: [100, 999] }, b: { range: [10, 99] } },
        generate: function(vars) {
            const result = vars.a * vars.b;
            return {
                question: `${vars.a} × ${vars.b} = `,
                answer: result,
                explanation: `${vars.a} × ${vars.b} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g4-mul-2',
        type: 'fillblank',
        template: '{a} × {b} = ?',
        variables: { a: { range: [100, 500] }, b: { range: [20, 50], divisible: [10] } },
        generate: function(vars) {
            const result = vars.a * vars.b;
            return {
                question: `${vars.a} × ${vars.b} = `,
                answer: result,
                explanation: `${vars.a} × ${vars.b} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g4-div-1',
        type: 'fillblank',
        template: '{a} ÷ {b} = ?',
        variables: { a: { range: [80, 360], divisible: [10] }, b: { range: [2, 9] } },
        constraint: 'a % b === 0',
        generate: function(vars) {
            const result = vars.a / vars.b;
            return {
                question: `${vars.a} ÷ ${vars.b} = `,
                answer: result,
                explanation: `${vars.a} ÷ ${vars.b} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g4-div-2',
        type: 'fillblank',
        template: '{a} ÷ {b} = ?',
        variables: { a: { range: [200, 999] }, b: { range: [10, 50] } },
        constraint: 'a % b === 0',
        generate: function(vars) {
            const result = vars.a / vars.b;
            return {
                question: `${vars.a} ÷ ${vars.b} = `,
                answer: result,
                explanation: `${vars.a} ÷ ${vars.b} = ${result}`
            };
        },
        validation: 'exact'
    }
];
