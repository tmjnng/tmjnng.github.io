// grade6/templates.js - 六年级数学题目模板库
// 包含各知识点的题目生成模板

export const templates = [
    // ========== 分数乘法 ==========
    {
        id: 'g6-frac-mul-1',
        type: 'fillblank',
        template: '\\frac{a}{b} \\times c = ?',
        variables: {
            a: { range: [1, 9] },
            b: { range: [2, 9] },
            c: { range: [2, 9] }
        },
        generate: function(vars) {
            const numerator = vars.a * vars.c;
            // 约分
            const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
            const divisor = gcd(numerator, vars.b);
            const simpNum = numerator / divisor;
            const simpDen = vars.b / divisor;
            
            let answer;
            if (simpDen === 1) {
                answer = simpNum.toString();
            } else {
                answer = `\\frac{${simpNum}}{${simpDen}}`;
            }
            
            return {
                question: `$\\frac{${vars.a}}{${vars.b}} \\times ${vars.c} = $`,
                answer: answer,
                explanation: `$\\frac{${vars.a}}{${vars.b}} \\times ${vars.c} = \\frac{${vars.a} \\times ${vars.c}}{${vars.b}} = \\frac{${numerator}}{${vars.b}} = ${answer}$`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g6-frac-mul-2',
        type: 'fillblank',
        template: '\\frac{a}{b} \\times \\frac{c}{d} = ?',
        variables: {
            a: { range: [1, 5] },
            b: { range: [2, 9] },
            c: { range: [1, 5] },
            d: { range: [2, 9] }
        },
        generate: function(vars) {
            const numerator = vars.a * vars.c;
            const denominator = vars.b * vars.d;
            
            // 约分
            const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
            const divisor = gcd(numerator, denominator);
            const simpNum = numerator / divisor;
            const simpDen = denominator / divisor;
            
            let answer;
            if (simpDen === 1) {
                answer = simpNum.toString();
            } else {
                answer = `\\frac{${simpNum}}{${simpDen}}`;
            }
            
            return {
                question: `$\\frac{${vars.a}}{${vars.b}} \\times \\frac{${vars.c}}{${vars.d}} = $`,
                answer: answer,
                explanation: `$\\frac{${vars.a}}{${vars.b}} \\times \\frac{${vars.c}}{${vars.d}} = \\frac{${numerator}}{${denominator}} = ${answer}$`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g6-frac-app-1',
        type: 'fillblank',
        template: '一根绳子长a米，用去了它的\\frac{b}{c}，用去了多少米？',
        variables: {
            a: { range: [12, 48], divisible: [2, 3, 4, 6] },
            b: { range: [1, 3] },
            c: { range: [2, 4] }
        },
        constraint: 'b < c',
        generate: function(vars) {
            const result = vars.a * vars.b / vars.c;
            return {
                question: `一根绳子长${vars.a}米，用去了它的$\\frac{${vars.b}}{${vars.c}}$，用去了多少米？`,
                answer: result,
                explanation: `${vars.a} \\times \\frac{${vars.b}}{${vars.c}} = ${vars.a} \\div ${vars.c} \\times ${vars.b} = ${result}米`
            };
        },
        validation: 'exact'
    },

    // ========== 分数除法 ==========
    {
        id: 'g6-frac-div-1',
        type: 'fillblank',
        template: '\\frac{a}{b} \\div c = ?',
        variables: {
            a: { range: [2, 9] },
            b: { range: [2, 9] },
            c: { range: [2, 5] }
        },
        constraint: 'a % c === 0 || b % c !== 0',
        generate: function(vars) {
            const numerator = vars.a;
            const denominator = vars.b * vars.c;
            
            // 约分
            const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
            const divisor = gcd(numerator, denominator);
            const simpNum = numerator / divisor;
            const simpDen = denominator / divisor;
            
            let answer;
            if (simpDen === 1) {
                answer = simpNum.toString();
            } else {
                answer = `\\frac{${simpNum}}{${simpDen}}`;
            }
            
            return {
                question: `$\\frac{${vars.a}}{${vars.b}} \\div ${vars.c} = $`,
                answer: answer,
                explanation: `$\\frac{${vars.a}}{${vars.b}} \\div ${vars.c} = \\frac{${vars.a}}{${vars.b} \\times ${vars.c}} = \\frac{${numerator}}{${denominator}} = ${answer}$`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g6-frac-div-2',
        type: 'fillblank',
        template: 'a \\div \\frac{b}{c} = ?',
        variables: {
            a: { range: [4, 24], divisible: [2, 3, 4] },
            b: { range: [1, 3] },
            c: { range: [2, 4] }
        },
        generate: function(vars) {
            const result = vars.a * vars.c / vars.b;
            return {
                question: `${vars.a} \\div \\frac{${vars.b}}{${vars.c}} = `,
                answer: result,
                explanation: `${vars.a} \\div \\frac{${vars.b}}{${vars.c}} = ${vars.a} \\times \\frac{${vars.c}}{${vars.b}} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g6-frac-app-2',
        type: 'fillblank',
        template: '一个数的\\frac{a}{b}是c，这个数是多少？',
        variables: {
            a: { range: [1, 3] },
            b: { range: [2, 5] },
            c: { range: [6, 30], divisible: [2, 3] }
        },
        constraint: 'c % a === 0',
        generate: function(vars) {
            const result = vars.c * vars.b / vars.a;
            return {
                question: `一个数的$\\frac{${vars.a}}{${vars.b}}$是${vars.c}，这个数是多少？`,
                answer: result,
                explanation: `${vars.c} \\div \\frac{${vars.a}}{${vars.b}} = ${vars.c} \\times \\frac{${vars.b}}{${vars.a}} = ${result}`
            };
        },
        validation: 'exact'
    },

    // ========== 比的应用 ==========
    {
        id: 'g6-ratio-1',
        type: 'fillblank',
        template: '把a克糖按照b:c的比例分配给甲乙两人，甲得多少克？',
        variables: {
            a: { range: [30, 90], divisible: [3, 5] },
            b: { range: [1, 3] },
            c: { range: [1, 3] }
        },
        generate: function(vars) {
            const total = vars.b + vars.c;
            const result = vars.a * vars.b / total;
            return {
                question: `把${vars.a}克糖按照${vars.b}:${vars.c}的比例分配给甲乙两人，甲得多少克？`,
                answer: result,
                explanation: `总份数：${vars.b} + ${vars.c} = ${total}，甲得：${vars.a} \\times \\frac{${vars.b}}{${total}} = ${result}克`
            };
        },
        validation: 'exact'
    },

    // ========== 圆的周长和面积 ==========
    {
        id: 'g6-circle-c',
        type: 'fillblank',
        template: '圆的半径是r厘米，周长是多少厘米？(\\pi取3.14)',
        variables: {
            r: { range: [1, 10] }
        },
        generate: function(vars) {
            const result = (2 * 3.14 * vars.r).toFixed(2);
            return {
                question: `圆的半径是${vars.r}厘米，周长是多少厘米？(\\pi取3.14)`,
                answer: result,
                explanation: `$C = 2\\pi r = 2 \\times 3.14 \\times ${vars.r} = ${result}$厘米`
            };
        },
        validation: 'tolerance',
        tolerance: 0.01
    },
    {
        id: 'g6-circle-s',
        type: 'fillblank',
        template: '圆的半径是r厘米，面积是多少平方厘米？(\\pi取3.14)',
        variables: {
            r: { range: [1, 10] }
        },
        generate: function(vars) {
            const result = (3.14 * vars.r * vars.r).toFixed(2);
            return {
                question: `圆的半径是${vars.r}厘米，面积是多少平方厘米？(\\pi取3.14)`,
                answer: result,
                explanation: `$S = \\pi r^2 = 3.14 \\times ${vars.r}^2 = ${result}$平方厘米`
            };
        },
        validation: 'tolerance',
        tolerance: 0.01
    },
    {
        id: 'g6-circle-ring',
        type: 'fillblank',
        template: '圆环的外圆半径是R厘米，内圆半径是r厘米，圆环面积是多少？(\\pi取3.14)',
        variables: {
            R: { range: [5, 10] },
            r: { range: [2, 4] }
        },
        constraint: 'R > r',
        generate: function(vars) {
            const result = (3.14 * (vars.R * vars.R - vars.r * vars.r)).toFixed(2);
            return {
                question: `圆环的外圆半径是${vars.R}厘米，内圆半径是${vars.r}厘米，圆环面积是多少？(\\pi取3.14)`,
                answer: result,
                explanation: `$S = \\pi(R^2 - r^2) = 3.14 \\times (${vars.R}^2 - ${vars.r}^2) = 3.14 \\times ${vars.R * vars.R - vars.r * vars.r} = ${result}$平方厘米`
            };
        },
        validation: 'tolerance',
        tolerance: 0.01
    },

    // ========== 百分数 ==========
    {
        id: 'g6-percent-1',
        type: 'fillblank',
        template: '把\\frac{a}{b}化成百分数',
        variables: {
            a: { range: [1, 4] },
            b: { range: [2, 5] }
        },
        constraint: 'a < b',
        generate: function(vars) {
            const result = (vars.a / vars.b * 100).toFixed(1);
            return {
                question: `把$\\frac{${vars.a}}{${vars.b}}$化成百分数`,
                answer: result + '%',
                explanation: `$\\frac{${vars.a}}{${vars.b}} = ${vars.a} \\div ${vars.b} \\approx ${(vars.a / vars.b).toFixed(4)} = ${result}\\%$`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g6-percent-2',
        type: 'fillblank',
        template: 'a是b的百分之几？',
        variables: {
            a: { range: [20, 80], divisible: [2, 4, 5] },
            b: { range: [50, 100], divisible: [2, 5] }
        },
        constraint: 'a < b',
        generate: function(vars) {
            const result = (vars.a / vars.b * 100).toFixed(0);
            return {
                question: `${vars.a}是${vars.b}的百分之几？`,
                answer: result + '%',
                explanation: `${vars.a} \\div ${vars.b} \\times 100\\% = ${result}\\%`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g6-percent-3',
        type: 'fillblank',
        template: 'a的b%是多少？',
        variables: {
            a: { range: [50, 200], divisible: [10, 20, 25] },
            b: { range: [10, 50], divisible: [5, 10] }
        },
        generate: function(vars) {
            const result = vars.a * vars.b / 100;
            return {
                question: `${vars.a}的${vars.b}%是多少？`,
                answer: result,
                explanation: `${vars.a} \\times ${vars.b}\\% = ${vars.a} \\times ${vars.b / 100} = ${result}`
            };
        },
        validation: 'exact'
    }
];
