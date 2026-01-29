// grade3/templates.js - 三年级数学题目模板库
// 包含各知识点的题目生成模板

export const templates = [
    // ========== 时、分、秒 ==========
    {
        id: 'time-calc-1',
        type: 'fillblank',
        template: '现在是{a|1,12}时{b|0,59}分，经过{c|10,120}分钟后是几时几分？',
        variables: {
            a: { range: [1, 12], unit: '时' },
            b: { range: [0, 59], unit: '分' },
            c: { range: [10, 120], unit: '分', divisible: [10] }
        },
        generate: function(vars) {
            const startTotal = vars.a * 60 + vars.b;
            const endTotal = startTotal + vars.c;
            const endHour = Math.floor(endTotal / 60) % 24;
            const endMin = endTotal % 60;

            return {
                question: `现在是${vars.a}时${vars.b}分，经过${vars.c}分钟后是几时几分？`,
                answer: `${endHour}时${endMin}分`,
                display: `${vars.a}时${vars.b}分 + ${vars.c}分 = ${endHour}时${endMin}分`,
                steps: [
                    `开始时间：${vars.a}时${vars.b}分`,
                    `经过${vars.c}分后：${vars.b} + ${vars.c} = ${vars.b + vars.c}分`,
                    `进位：${vars.b + vars.c}分 = ${Math.floor((vars.b + vars.c)/60)}时${(vars.b + vars.c) % 60}分`,
                    `结果：${endHour}时${endMin}分`
                ]
            };
        },
        validation: 'exact',
        points: 5,
        hint: '先算分钟数相加，满60要向小时进1'
    },
    {
        id: 'time-calc-2',
        type: 'choice',
        template: '小明从家到学校要走{a|15,45}分钟，他必须在{b|7,8}时{c|0,59}分前到校，他最晚应该什么时候从家出发？',
        variables: {
            a: { range: [15, 45] },
            b: { range: [7, 8] },
            c: { range: [0, 59] }
        },
        generate: function(vars) {
            const arriveTotal = vars.b * 60 + vars.c;
            const startTotal = arriveTotal - vars.a;
            const startHour = Math.floor(startTotal / 60);
            const startMin = startTotal % 60;
            const correctAnswer = `${startHour}时${startMin}分`;
            
            // 生成干扰项
            const wrong1 = `${startHour}时${startMin + 10}分`;
            const wrong2 = `${startHour + 1}时${startMin}分`;
            const wrong3 = `${Math.max(6, startHour - 1)}时${startMin}分`;
            
            return {
                question: `小明从家到学校要走${vars.a}分钟，他必须在${vars.b}时${vars.c}分前到校，他最晚应该什么时候从家出发？`,
                options: [correctAnswer, wrong1, wrong2, wrong3],
                answer: correctAnswer,
                explanation: `到校时间${vars.b}时${vars.c}分减去路上时间${vars.a}分钟 = ${correctAnswer}`
            };
        },
        shuffleOptions: true,
        validation: 'exact'
    },
    {
        id: 'time-calc-3',
        type: 'fillblank',
        template: '1时30分 = {a}分',
        variables: {},
        generate: function() {
            return {
                question: '1时30分 = (    )分',
                answer: '90',
                explanation: '1时 = 60分，60分 + 30分 = 90分'
            };
        },
        validation: 'exact'
    },

    // ========== 加减法 ==========
    {
        id: 'add-2digit-1',
        type: 'fillblank',
        template: '{a|10,99} + {b|10,99} = ?',
        variables: {
            a: { range: [10, 99] },
            b: { range: [10, 99] }
        },
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
        id: 'add-2digit-2',
        type: 'fillblank',
        template: '{a|50,99} + {b|10,50} = ?',
        variables: {
            a: { range: [50, 99] },
            b: { range: [10, 50] }
        },
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
        id: 'sub-2digit-1',
        type: 'fillblank',
        template: '{a|50,99} - {b|10,49} = ?',
        variables: {
            a: { range: [50, 99] },
            b: { range: [10, 49] }
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
    {
        id: 'sub-2digit-2',
        type: 'fillblank',
        template: '{a|80,99} - {b|20,79} = ?',
        variables: {
            a: { range: [80, 99] },
            b: { range: [20, 79] }
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
    {
        id: 'add-3digit-1',
        type: 'fillblank',
        template: '{a|100,500} + {b|100,500} = ?',
        variables: {
            a: { range: [100, 500] },
            b: { range: [100, 500] }
        },
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
        id: 'sub-3digit-1',
        type: 'fillblank',
        template: '{a|300,900} - {b|100,299} = ?',
        variables: {
            a: { range: [300, 900] },
            b: { range: [100, 299] }
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
    {
        id: 'add-3digit-2',
        type: 'fillblank',
        template: '{a|200,400} + {b|300,600} = ?',
        variables: {
            a: { range: [200, 400] },
            b: { range: [300, 600] }
        },
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
        id: 'add-3digit-3',
        type: 'fillblank',
        template: '{a|450,999} + {b|100,550} = ?',
        variables: {
            a: { range: [450, 999] },
            b: { range: [100, 550] }
        },
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
        id: 'sub-3digit-2',
        type: 'fillblank',
        template: '{a|500,999} - {b|100,499} = ?',
        variables: {
            a: { range: [500, 999] },
            b: { range: [100, 499] }
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
    {
        id: 'sub-3digit-3',
        type: 'fillblank',
        template: '{a|600,999} - {b|200,599} = ?',
        variables: {
            a: { range: [600, 999] },
            b: { range: [200, 599] }
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

    // ========== 单位换算 ==========
    {
        id: 'unit-length-1',
        type: 'fillblank',
        template: '{a|1,9}米 = {b}厘米',
        variables: {
            a: { range: [1, 9] }
        },
        generate: function(vars) {
            return {
                question: `${vars.a}米 = (    )厘米`,
                answer: vars.a * 100,
                explanation: `1米 = 100厘米，${vars.a}米 = ${vars.a} × 100 = ${vars.a * 100}厘米`
            };
        },
        validation: 'exact'
    },
    {
        id: 'unit-mass-1',
        type: 'fillblank',
        template: '{a|1,5}吨 = {b}千克',
        variables: {
            a: { range: [1, 5] }
        },
        generate: function(vars) {
            return {
                question: `${vars.a}吨 = (    )千克`,
                answer: vars.a * 1000,
                explanation: `1吨 = 1000千克，${vars.a}吨 = ${vars.a} × 1000 = ${vars.a * 1000}千克`
            };
        },
        validation: 'exact'
    },

    // ========== 倍的认识 ==========
    {
        id: 'multiple-1',
        type: 'fillblank',
        template: '小明有{a|2,9}个苹果，小红有{b|2,6}倍于小明的苹果，小红有几个苹果？',
        variables: {
            a: { range: [2, 9] },
            b: { range: [2, 6] }
        },
        generate: function(vars) {
            const result = vars.a * vars.b;
            return {
                question: `小明有${vars.a}个苹果，小红有${vars.b}倍于小明的苹果，小红有几个苹果？`,
                answer: result,
                explanation: `${vars.a} × ${vars.b} = ${result}个`
            };
        },
        validation: 'exact'
    },
    {
        id: 'multiple-2',
        type: 'fillblank',
        template: '小红有{a|12,48}个苹果，是小明的{b|2,6}倍，小明有几个苹果？',
        variables: {
            a: { range: [12, 48], divisible: [2, 3, 4, 6] },
            b: { range: [2, 6] }
        },
        generate: function(vars) {
            const result = vars.a / vars.b;
            return {
                question: `小红有${vars.a}个苹果，是小明的${vars.b}倍，小明有几个苹果？`,
                answer: result,
                explanation: `${vars.a} ÷ ${vars.b} = ${result}个`
            };
        },
        validation: 'exact'
    },
    {
        id: 'multiple-3',
        type: 'fillblank',
        template: '小明有{a|3,8}个苹果，小红的苹果数是他的{b|3,8}倍，小红有几个苹果？',
        variables: {
            a: { range: [3, 8] },
            b: { range: [3, 8] }
        },
        generate: function(vars) {
            const result = vars.a * vars.b;
            return {
                question: `小明有${vars.a}个苹果，小红的苹果数是他的${vars.b}倍，小红有几个苹果？`,
                answer: result,
                explanation: `${vars.a} × ${vars.b} = ${result}个`
            };
        },
        validation: 'exact'
    },
    {
        id: 'multiple-4',
        type: 'choice',
        template: '动物园有{a|12,36}只猴子，猴子的数量是长颈鹿的{b|2,6}倍，长颈鹿有几只？',
        variables: {
            a: { range: [12, 36], divisible: [2, 3, 4, 6] },
            b: { range: [2, 6] }
        },
        generate: function(vars) {
            const result = vars.a / vars.b;
            const wrong1 = result + 2;
            const wrong2 = result - 1;
            const wrong3 = vars.a * vars.b;
            
            return {
                question: `动物园有${vars.a}只猴子，猴子的数量是长颈鹿的${vars.b}倍，长颈鹿有几只？`,
                options: [result, wrong1, wrong2, wrong3],
                answer: result,
                explanation: `${vars.a} ÷ ${vars.b} = ${result}只`
            };
        },
        shuffleOptions: true,
        validation: 'exact'
    },

    // ========== 乘法 ==========
    {
        id: 'multiply-1',
        type: 'fillblank',
        template: '{a|2,9}0 × {b|2,9} = ?',
        variables: {
            a: { range: [2, 9] },
            b: { range: [2, 9] }
        },
        generate: function(vars) {
            const num1 = vars.a * 10;
            const result = num1 * vars.b;
            return {
                question: `${num1} × ${vars.b} = `,
                answer: result,
                explanation: `${num1} × ${vars.b} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'multiply-2',
        type: 'fillblank',
        template: '{a|2,9}00 × {b|2,9} = ?',
        variables: {
            a: { range: [2, 9] },
            b: { range: [2, 9] }
        },
        generate: function(vars) {
            const num1 = vars.a * 100;
            const result = num1 * vars.b;
            return {
                question: `${num1} × ${vars.b} = `,
                answer: result,
                explanation: `${num1} × ${vars.b} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'multiply-3',
        type: 'fillblank',
        template: '{a|12,99} × {b|2,5} = ?',
        variables: {
            a: { range: [12, 99] },
            b: { range: [2, 5] }
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
        id: 'multiply-4',
        type: 'fillblank',
        template: '{a|23,99} × {b|3,9} = ?',
        variables: {
            a: { range: [23, 99] },
            b: { range: [3, 9] }
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
        id: 'multiply-5',
        type: 'fillblank',
        template: '{a|100,299} × {b|2,5} = ?',
        variables: {
            a: { range: [100, 299] },
            b: { range: [2, 5] }
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
        id: 'multiply-6',
        type: 'fillblank',
        template: '{a|2,9}0 × {b|2,9} = ?',
        variables: {
            a: { range: [2, 9] },
            b: { range: [2, 9] }
        },
        generate: function(vars) {
            const num1 = vars.a * 10;
            const result = num1 * vars.b;
            return {
                question: `${num1} × ${vars.b} = `,
                answer: result,
                explanation: `${num1} × ${vars.b} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'multiply-7',
        type: 'fillblank',
        template: '{a|2,9}05 × {b|2,5} = ?',
        variables: {
            a: { range: [2, 9] },
            b: { range: [2, 5] }
        },
        generate: function(vars) {
            const num1 = vars.a * 100 + 5;
            const result = num1 * vars.b;
            return {
                question: `${num1} × ${vars.b} = `,
                answer: result,
                explanation: `${num1} × ${vars.b} = ${result}`
            };
        },
        validation: 'exact'
    },

    // ========== 周长 ==========
    {
        id: 'perimeter-rect',
        type: 'fillblank',
        template: '一个长方形长{a|5,15}cm，宽{b|2,a-1}cm，周长是？',
        variables: {
            a: { range: [5, 15] },
            b: { range: [2, 14] }
        },
        constraint: 'b < a',
        generate: function(vars) {
            const perimeter = 2 * (vars.a + vars.b);
            return {
                question: `一个长方形长${vars.a}cm，宽${vars.b}cm，周长是(    )cm`,
                answer: perimeter,
                explanation: `周长 = (长 + 宽) × 2 = (${vars.a} + ${vars.b}) × 2 = ${perimeter}cm`
            };
        },
        validation: 'exact'
    },
    {
        id: 'perimeter-square',
        type: 'fillblank',
        template: '一个正方形边长{a|3,12}cm，周长是？',
        variables: {
            a: { range: [3, 12] }
        },
        generate: function(vars) {
            const perimeter = 4 * vars.a;
            return {
                question: `一个正方形边长${vars.a}cm，周长是(    )cm`,
                answer: perimeter,
                explanation: `周长 = 边长 × 4 = ${vars.a} × 4 = ${perimeter}cm`
            };
        },
        validation: 'exact'
    },
    {
        id: 'perimeter-mixed',
        type: 'choice',
        template: '一个长方形长{a|8,20}cm，宽{b|3,7}cm，周长是？',
        variables: {
            a: { range: [8, 20] },
            b: { range: [3, 7] }
        },
        generate: function(vars) {
            const perimeter = 2 * (vars.a + vars.b);
            const wrong1 = vars.a + vars.b;
            const wrong2 = vars.a * vars.b;
            const wrong3 = 2 * vars.a + vars.b;
            
            return {
                question: `一个长方形长${vars.a}cm，宽${vars.b}cm，周长是(    )cm`,
                options: [perimeter, wrong1, wrong2, wrong3],
                answer: perimeter,
                explanation: `周长 = (长 + 宽) × 2 = (${vars.a} + ${vars.b}) × 2 = ${perimeter}cm`
            };
        },
        shuffleOptions: true,
        validation: 'exact'
    },

    // ========== 分数 ==========
    {
        id: 'fraction-compare-1',
        type: 'choice',
        template: '比较大小：\\frac{1}{a} 和 \\frac{1}{b}',
        variables: {
            a: { range: [2, 9] },
            b: { range: [2, 9] }
        },
        constraint: 'a !== b',
        generate: function(vars) {
            const frac1 = `\\frac{1}{${vars.a}}`;
            const frac2 = `\\frac{1}{${vars.b}}`;
            let correct, symbol;
            
            if (vars.a < vars.b) {
                correct = '>';
                symbol = '>';
            } else {
                correct = '<';
                symbol = '<';
            }
            
            return {
                question: `比较大小：$\\frac{1}{${vars.a}}$ 和 $\\frac{1}{${vars.b}}$`,
                options: ['>', '<', '='],
                answer: correct,
                explanation: `分子相同，分母小的分数大，所以 $\\frac{1}{${vars.a}}} ${symbol} \\frac{1}{${vars.b}}$`
            };
        },
        shuffleOptions: false,
        validation: 'exact'
    },
    {
        id: 'fraction-add-1',
        type: 'fillblank',
        template: '\\frac{1}{a} + \\frac{2}{a} = ?',
        variables: {
            a: { range: [3, 9] }
        },
        generate: function(vars) {
            return {
                question: `$\\frac{1}{${vars.a}} + \\frac{2}{${vars.a}} = $`,
                answer: `\\frac{3}{${vars.a}}`,
                explanation: `同分母分数相加，分母不变，分子相加：$\\frac{1+2}{${vars.a}} = \\frac{3}{${vars.a}}$`
            };
        },
        validation: 'exact'
    },
    {
        id: 'fraction-sub-1',
        type: 'fillblank',
        template: '\\frac{3}{a} - \\frac{1}{a} = ?',
        variables: {
            a: { range: [4, 9] }
        },
        generate: function(vars) {
            return {
                question: `$\\frac{3}{${vars.a}} - \\frac{1}{${vars.a}} = $`,
                answer: `\\frac{2}{${vars.a}}`,
                explanation: `同分母分数相减，分母不变，分子相减：$\\frac{3-1}{${vars.a}} = \\frac{2}{${vars.a}}$`
            };
        },
        validation: 'exact'
    },

    // ========== 集合 ==========
    {
        id: 'set-1',
        type: 'fillblank',
        template: '班级有{a|20,40}人，参加数学小组的有{b|8,15}人，参加语文小组的有{c|8,15}人，两个小组都参加的有{d|3,7}人，有多少人参加了兴趣小组？',
        variables: {
            a: { range: [20, 40] },
            b: { range: [8, 15] },
            c: { range: [8, 15] },
            d: { range: [3, 7] }
        },
        constraint: 'b + c - d <= a',
        generate: function(vars) {
            const result = vars.b + vars.c - vars.d;
            return {
                question: `班级有${vars.a}人，参加数学小组的有${vars.b}人，参加语文小组的有${vars.c}人，两个小组都参加的有${vars.d}人，有多少人参加了兴趣小组？`,
                answer: result,
                explanation: `${vars.b} + ${vars.c} - ${vars.d} = ${result}人（容斥原理：参加数学的 + 参加语文的 - 都参加的）`
            };
        },
        validation: 'exact'
    },
    {
        id: 'set-2',
        type: 'choice',
        template: '水果店昨天卖出{a|15,30}个苹果，今天卖出{b|15,30}个苹果，两天都卖出{c|5,12}个，两天共卖出多少个苹果？',
        variables: {
            a: { range: [15, 30] },
            b: { range: [15, 30] },
            c: { range: [5, 12] }
        },
        generate: function(vars) {
            const result = vars.a + vars.b - vars.c;
            const wrong1 = vars.a + vars.b;
            const wrong2 = vars.a + vars.c;
            const wrong3 = vars.b + vars.c;
            
            return {
                question: `水果店昨天卖出${vars.a}个苹果，今天卖出${vars.b}个苹果，两天都卖出${vars.c}个，两天共卖出多少个苹果？`,
                options: [result, wrong1, wrong2, wrong3],
                answer: result,
                explanation: `${vars.a} + ${vars.b} - ${vars.c} = ${result}个（容斥原理）`
            };
        },
        shuffleOptions: true,
        validation: 'exact'
    }
];
