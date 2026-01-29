// grade1/templates.js - 一年级数学题目模板库
// 包含各知识点的题目生成模板

export const templates = [
    // ========== 比大小 ==========
    {
        id: 'g1-compare-1',
        type: 'choice',
        template: '比较大小：{a} ○ {b}',
        variables: {
            a: { range: [1, 5] },
            b: { range: [1, 5] }
        },
        generate: function(vars) {
            let correct, symbol;
            if (vars.a > vars.b) {
                correct = '>';
                symbol = '>';
            } else if (vars.a < vars.b) {
                correct = '<';
                symbol = '<';
            } else {
                correct = '=';
                symbol = '=';
            }
            
            return {
                question: `比较大小：${vars.a} ○ ${vars.b}`,
                options: ['>', '<', '='],
                answer: correct,
                explanation: `${vars.a} ${symbol} ${vars.b}`
            };
        },
        shuffleOptions: false,
        validation: 'exact'
    },

    // ========== 5以内加减法 ==========
    {
        id: 'g1-add-1',
        type: 'fillblank',
        template: '{a} + {b} = ?',
        variables: {
            a: { range: [1, 4] },
            b: { range: [1, 5] }
        },
        constraint: 'a + b <= 5',
        generate: function(vars) {
            const sum = vars.a + vars.b;
            return {
                question: `${vars.a} + ${vars.b} = `,
                answer: sum,
                explanation: `${vars.a} + ${vars.b} = ${sum}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g1-add-2',
        type: 'fillblank',
        template: '小明有{a}个苹果，又拿来{b}个，一共有几个？',
        variables: {
            a: { range: [1, 3] },
            b: { range: [1, 4] }
        },
        constraint: 'a + b <= 5',
        generate: function(vars) {
            const sum = vars.a + vars.b;
            return {
                question: `小明有${vars.a}个苹果，又拿来${vars.b}个，一共有几个？`,
                answer: sum,
                explanation: `${vars.a} + ${vars.b} = ${sum}个`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g1-sub-1',
        type: 'fillblank',
        template: '{a} - {b} = ?',
        variables: {
            a: { range: [2, 5] },
            b: { range: [1, 4] }
        },
        constraint: 'a > b',
        generate: function(vars) {
            const diff = vars.a - vars.b;
            return {
                question: `${vars.a} - ${vars.b} = `,
                answer: diff,
                explanation: `${vars.a} - ${vars.b} = ${diff}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g1-sub-2',
        type: 'fillblank',
        template: '小红有{a}支铅笔，送给小明{b}支，还剩几支？',
        variables: {
            a: { range: [3, 5] },
            b: { range: [1, 2] }
        },
        constraint: 'a > b',
        generate: function(vars) {
            const diff = vars.a - vars.b;
            return {
                question: `小红有${vars.a}支铅笔，送给小明${vars.b}支，还剩几支？`,
                answer: diff,
                explanation: `${vars.a} - ${vars.b} = ${diff}支`
            };
        },
        validation: 'exact'
    },

    // ========== 6和7的加减法 ==========
    {
        id: 'g1-add-3',
        type: 'fillblank',
        template: '{a} + {b} = ?',
        variables: {
            a: { range: [1, 6] },
            b: { range: [1, 6] }
        },
        constraint: 'a + b <= 7',
        generate: function(vars) {
            const sum = vars.a + vars.b;
            return {
                question: `${vars.a} + ${vars.b} = `,
                answer: sum,
                explanation: `${vars.a} + ${vars.b} = ${sum}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g1-sub-3',
        type: 'fillblank',
        template: '{a} - {b} = ?',
        variables: {
            a: { range: [2, 7] },
            b: { range: [1, 6] }
        },
        constraint: 'a > b',
        generate: function(vars) {
            const diff = vars.a - vars.b;
            return {
                question: `${vars.a} - ${vars.b} = `,
                answer: diff,
                explanation: `${vars.a} - ${vars.b} = ${diff}`
            };
        },
        validation: 'exact'
    },

    // ========== 8和9的加减法 ==========
    {
        id: 'g1-add-4',
        type: 'fillblank',
        template: '{a} + {b} = ?',
        variables: {
            a: { range: [1, 8] },
            b: { range: [1, 8] }
        },
        constraint: 'a + b <= 9',
        generate: function(vars) {
            const sum = vars.a + vars.b;
            return {
                question: `${vars.a} + ${vars.b} = `,
                answer: sum,
                explanation: `${vars.a} + ${vars.b} = ${sum}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g1-sub-4',
        type: 'fillblank',
        template: '{a} - {b} = ?',
        variables: {
            a: { range: [2, 9] },
            b: { range: [1, 8] }
        },
        constraint: 'a > b',
        generate: function(vars) {
            const diff = vars.a - vars.b;
            return {
                question: `${vars.a} - ${vars.b} = `,
                answer: diff,
                explanation: `${vars.a} - ${vars.b} = ${diff}`
            };
        },
        validation: 'exact'
    },

    // ========== 10的加减法 ==========
    {
        id: 'g1-add-5',
        type: 'fillblank',
        template: '{a} + {b} = ?',
        variables: {
            a: { range: [1, 9] },
            b: { range: [1, 9] }
        },
        constraint: 'a + b <= 10',
        generate: function(vars) {
            const sum = vars.a + vars.b;
            return {
                question: `${vars.a} + ${vars.b} = `,
                answer: sum,
                explanation: `${vars.a} + ${vars.b} = ${sum}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g1-sub-5',
        type: 'fillblank',
        template: '10 - {a} = ?',
        variables: {
            a: { range: [1, 9] }
        },
        generate: function(vars) {
            const diff = 10 - vars.a;
            return {
                question: `10 - ${vars.a} = `,
                answer: diff,
                explanation: `10 - ${vars.a} = ${diff}`
            };
        },
        validation: 'exact'
    },

    // ========== 连加连减 ==========
    {
        id: 'g1-mixed-1',
        type: 'fillblank',
        template: '{a} + {b} - {c} = ?',
        variables: {
            a: { range: [1, 5] },
            b: { range: [1, 4] },
            c: { range: [1, 3] }
        },
        constraint: 'a + b - c >= 0',
        generate: function(vars) {
            const result = vars.a + vars.b - vars.c;
            return {
                question: `${vars.a} + ${vars.b} - ${vars.c} = `,
                answer: result,
                explanation: `${vars.a} + ${vars.b} = ${vars.a + vars.b}，${vars.a + vars.b} - ${vars.c} = ${result}`
            };
        },
        validation: 'exact'
    },

    // ========== 10加几 ==========
    {
        id: 'g1-add-6',
        type: 'fillblank',
        template: '10 + {a} = ?',
        variables: {
            a: { range: [1, 9] }
        },
        generate: function(vars) {
            const sum = 10 + vars.a;
            return {
                question: `10 + ${vars.a} = `,
                answer: sum,
                explanation: `10 + ${vars.a} = ${sum}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g1-sub-6',
        type: 'fillblank',
        template: '{a} - {b} = ?',
        variables: {
            a: { range: [11, 19] },
            b: { range: [1, 9] }
        },
        generate: function(vars) {
            const diff = vars.a - vars.b;
            return {
                question: `${vars.a} - ${vars.b} = `,
                answer: diff,
                explanation: `${vars.a} - ${vars.b} = ${diff}`
            };
        },
        validation: 'exact'
    },

    // ========== 20以内进位加法 ==========
    {
        id: 'g1-carry-1',
        type: 'fillblank',
        template: '9 + {a} = ?',
        variables: {
            a: { range: [2, 9] }
        },
        generate: function(vars) {
            const sum = 9 + vars.a;
            return {
                question: `9 + ${vars.a} = `,
                answer: sum,
                explanation: `凑十法：9 + 1 = 10，10 + ${vars.a - 1} = ${sum}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g1-carry-2',
        type: 'fillblank',
        template: '{a} + {b} = ?',
        variables: {
            a: { range: [6, 8] },
            b: { range: [5, 9] }
        },
        constraint: 'a + b > 10',
        generate: function(vars) {
            const sum = vars.a + vars.b;
            const need = 10 - vars.a;
            return {
                question: `${vars.a} + ${vars.b} = `,
                answer: sum,
                explanation: `凑十法：${vars.a} + ${need} = 10，10 + ${vars.b - need} = ${sum}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g1-carry-3',
        type: 'fillblank',
        template: '{a} + {b} = ?',
        variables: {
            a: { range: [2, 5] },
            b: { range: [7, 9] }
        },
        constraint: 'a + b > 10',
        generate: function(vars) {
            const sum = vars.a + vars.b;
            const need = 10 - vars.b;
            return {
                question: `${vars.a} + ${vars.b} = `,
                answer: sum,
                explanation: `凑十法：${need} + ${vars.b} = 10，${vars.a - need} + 10 = ${sum}`
            };
        },
        validation: 'exact'
    }
];
