// grade2/templates.js - 二年级数学题目模板库
// 包含各知识点的题目生成模板

export const templates = [
    // ========== 长度单位换算 ==========
    {
        id: 'g2-length-1',
        type: 'fillblank',
        template: '{a}米 = ?厘米',
        variables: {
            a: { range: [1, 5] }
        },
        generate: function(vars) {
            const result = vars.a * 100;
            return {
                question: `${vars.a}米 = `,
                answer: result,
                explanation: `1米 = 100厘米，${vars.a}米 = ${vars.a} × 100 = ${result}厘米`
            };
        },
        validation: 'exact'
    },

    // ========== 100以内加减法 ==========
    {
        id: 'g2-add-1',
        type: 'fillblank',
        template: '{a} + {b} = ?',
        variables: {
            a: { range: [10, 50] },
            b: { range: [10, 40] }
        },
        constraint: 'a + b <= 99',
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
        id: 'g2-add-2',
        type: 'fillblank',
        template: '{a} + {b} = ?',
        variables: {
            a: { range: [25, 65] },
            b: { range: [15, 45] }
        },
        constraint: 'a + b <= 99 && (a % 10 + b % 10) >= 10',
        generate: function(vars) {
            const sum = vars.a + vars.b;
            return {
                question: `${vars.a} + ${vars.b} = `,
                answer: sum,
                explanation: `${vars.a} + ${vars.b} = ${sum}（个位相加满十向十位进一）`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g2-sub-1',
        type: 'fillblank',
        template: '{a} - {b} = ?',
        variables: {
            a: { range: [30, 99] },
            b: { range: [10, 40] }
        },
        constraint: 'a > b && (a % 10) >= (b % 10)',
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
        id: 'g2-sub-2',
        type: 'fillblank',
        template: '{a} - {b} = ?',
        variables: {
            a: { range: [40, 99] },
            b: { range: [15, 45] }
        },
        constraint: 'a > b && (a % 10) < (b % 10)',
        generate: function(vars) {
            const diff = vars.a - vars.b;
            return {
                question: `${vars.a} - ${vars.b} = `,
                answer: diff,
                explanation: `${vars.a} - ${vars.b} = ${diff}（个位不够减，从十位退一当十）`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g2-mixed-1',
        type: 'fillblank',
        template: '{a} + {b} - {c} = ?',
        variables: {
            a: { range: [20, 50] },
            b: { range: [10, 30] },
            c: { range: [10, 30] }
        },
        constraint: 'a + b - c > 0',
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

    // ========== 乘法口诀 ==========
    {
        id: 'g2-mul-5',
        type: 'fillblank',
        template: '{a} × 5 = ?',
        variables: {
            a: { range: [1, 9] }
        },
        generate: function(vars) {
            const result = vars.a * 5;
            return {
                question: `${vars.a} × 5 = `,
                answer: result,
                explanation: `${vars.a} × 5 = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g2-mul-234',
        type: 'fillblank',
        template: '{a} × {b} = ?',
        variables: {
            a: { range: [2, 4] },
            b: { range: [1, 9] }
        },
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
        id: 'g2-mul-6',
        type: 'fillblank',
        template: '{a} × 6 = ?',
        variables: {
            a: { range: [1, 9] }
        },
        generate: function(vars) {
            const result = vars.a * 6;
            return {
                question: `${vars.a} × 6 = `,
                answer: result,
                explanation: `${vars.a} × 6 = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g2-mul-7',
        type: 'fillblank',
        template: '{a} × 7 = ?',
        variables: {
            a: { range: [1, 9] }
        },
        generate: function(vars) {
            const result = vars.a * 7;
            return {
                question: `${vars.a} × 7 = `,
                answer: result,
                explanation: `${vars.a} × 7 = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g2-mul-8',
        type: 'fillblank',
        template: '{a} × 8 = ?',
        variables: {
            a: { range: [1, 9] }
        },
        generate: function(vars) {
            const result = vars.a * 8;
            return {
                question: `${vars.a} × 8 = `,
                answer: result,
                explanation: `${vars.a} × 8 = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g2-mul-9',
        type: 'fillblank',
        template: '{a} × 9 = ?',
        variables: {
            a: { range: [1, 9] }
        },
        generate: function(vars) {
            const result = vars.a * 9;
            return {
                question: `${vars.a} × 9 = `,
                answer: result,
                explanation: `${vars.a} × 9 = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g2-mul-app',
        type: 'fillblank',
        template: '每个盘子有{a}个苹果，{b}个盘子一共有多少个苹果？',
        variables: {
            a: { range: [2, 9] },
            b: { range: [2, 9] }
        },
        generate: function(vars) {
            const result = vars.a * vars.b;
            return {
                question: `每个盘子有${vars.a}个苹果，${vars.b}个盘子一共有多少个苹果？`,
                answer: result,
                explanation: `${vars.a} × ${vars.b} = ${result}个`
            };
        },
        validation: 'exact'
    },

    // ========== 时间计算 ==========
    {
        id: 'g2-time-1',
        type: 'fillblank',
        template: '现在是{a}时{b}分，过{c}分后是几时几分？',
        variables: {
            a: { range: [1, 11] },
            b: { range: [0, 50], divisible: [10] },
            c: { range: [10, 40], divisible: [10] }
        },
        constraint: 'b + c < 60',
        generate: function(vars) {
            const newMin = vars.b + vars.c;
            return {
                question: `现在是${vars.a}时${vars.b}分，过${vars.c}分后是几时几分？`,
                answer: `${vars.a}时${newMin}分`,
                explanation: `${vars.a}时${vars.b}分 + ${vars.c}分 = ${vars.a}时${newMin}分`
            };
        },
        validation: 'exact'
    }
];
