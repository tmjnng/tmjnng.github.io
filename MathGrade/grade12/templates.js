// grade12/templates.js - 高三数学题目模板库

export const templates = [
    {
        id: 'g12-deriv-1',
        type: 'fillblank',
        template: '求函数f(x) = x^{n}的导数',
        variables: { n: { range: [2, 5] } },
        generate: function(vars) {
            const coef = vars.n;
            const exp = vars.n - 1;
            return {
                question: `求函数f(x) = x^${vars.n}的导数`,
                answer: `${coef}x^${exp}`,
                explanation: `f'(x) = ${vars.n}x^${vars.n-1} = ${coef}x^${exp}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g12-deriv-2',
        type: 'fillblank',
        template: '求函数f(x) = x³ - {a}x² + {b}x在x = 1处的导数值',
        variables: { a: { range: [3, 6] }, b: { range: [4, 8] } },
        generate: function(vars) {
            const result = 3 - 2 * vars.a + vars.b;
            return {
                question: `求函数f(x) = x³ - ${vars.a}x² + ${vars.b}x在x = 1处的导数值`,
                answer: result,
                explanation: `f'(x) = 3x² - ${2*vars.a}x + ${vars.b}，f'(1) = 3 - ${2*vars.a} + ${vars.b} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g12-ellipse-1',
        type: 'fillblank',
        template: '椭圆的长轴长是2a = {a}，短轴长是2b = {b}，求焦距2c',
        variables: { a: { range: [6, 10], divisible: [2] }, b: { range: [4, 8], divisible: [2] } },
        constraint: 'a > b',
        generate: function(vars) {
            const a = vars.a / 2;
            const b = vars.b / 2;
            const c = Math.sqrt(a * a - b * b);
            const result = (2 * c).toFixed(2);
            return {
                question: `椭圆的长轴长是${vars.a}，短轴长是${vars.b}，求焦距`,
                answer: result,
                explanation: `a = ${a}, b = ${b}, c = √(a²-b²) = √(${a*a}-${b*b}) = ${c.toFixed(2)}, 2c = ${result}`
            };
        },
        validation: 'tolerance',
        tolerance: 0.01
    },
    {
        id: 'g12-parabola-1',
        type: 'fillblank',
        template: '抛物线y² = {a}x的焦点坐标是？',
        variables: { a: { range: [4, 12], divisible: [4] } },
        generate: function(vars) {
            const p = vars.a / 4;
            return {
                question: `抛物线y² = ${vars.a}x的焦点坐标是？`,
                answer: `(${p}, 0)`,
                explanation: `y² = 2px，2p = ${vars.a}，p = ${p}，焦点坐标为(${p}, 0)`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g12-perm-1',
        type: 'fillblank',
        template: '从{n}个不同元素中取出{m}个元素的排列数是多少？',
        variables: { n: { range: [5, 7] }, m: { range: [2, 3] } },
        constraint: 'n > m',
        generate: function(vars) {
            let result = 1;
            for (let i = 0; i < vars.m; i++) {
                result *= (vars.n - i);
            }
            return {
                question: `从${vars.n}个不同元素中取出${vars.m}个元素的排列数是多少？`,
                answer: result,
                explanation: `A_${vars.n}^${vars.m} = ${vars.n}×${vars.n-1}${vars.m === 3 ? '×' + (vars.n-2) : ''} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g12-comb-1',
        type: 'fillblank',
        template: '从{n}个不同元素中取出{m}个元素的组合数是多少？',
        variables: { n: { range: [5, 6] }, m: { range: [2, 3] } },
        constraint: 'n > m',
        generate: function(vars) {
            let numerator = 1;
            let denominator = 1;
            for (let i = 0; i < vars.m; i++) {
                numerator *= (vars.n - i);
                denominator *= (i + 1);
            }
            const result = numerator / denominator;
            return {
                question: `从${vars.n}个不同元素中取出${vars.m}个元素的组合数是多少？`,
                answer: result,
                explanation: `C_${vars.n}^${vars.m} = A_${vars.n}^${vars.m}/${vars.m}! = ${numerator}/${denominator} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g12-binom-1',
        type: 'fillblank',
        template: '(a + b)^{n}展开式中第3项的二项式系数是？',
        variables: { n: { range: [4, 6] } },
        generate: function(vars) {
            const result = (vars.n * (vars.n - 1)) / 2;
            return {
                question: `(a + b)^${vars.n}展开式中第3项的二项式系数是？`,
                answer: result,
                explanation: `第3项的二项式系数为C_${vars.n}^2 = ${vars.n}×${vars.n-1}/2 = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g12-expect-1',
        type: 'fillblank',
        template: '随机变量X的分布列为P(X=1)={p1}, P(X=2)={p2}, P(X=3)={p3}，求E(X)',
        variables: { p1: { range: [2, 4] }, p2: { range: [3, 5] }, p3: { range: [2, 4] } },
        constraint: 'p1 + p2 + p3 === 10',
        generate: function(vars) {
            const e = (1 * vars.p1 + 2 * vars.p2 + 3 * vars.p3) / 10;
            return {
                question: `随机变量X的分布列为P(X=1)=${vars.p1/10}, P(X=2)=${vars.p2/10}, P(X=3)=${vars.p3/10}，求E(X)`,
                answer: e.toFixed(2),
                explanation: `E(X) = 1×${vars.p1/10} + 2×${vars.p2/10} + 3×${vars.p3/10} = ${e.toFixed(2)}`
            };
        },
        validation: 'tolerance',
        tolerance: 0.01
    }
];
