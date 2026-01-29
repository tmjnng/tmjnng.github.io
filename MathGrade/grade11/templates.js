// grade11/templates.js - 高二数学题目模板库

export const templates = [
    {
        id: 'g11-area-1',
        type: 'fillblank',
        template: '圆柱的底面半径是r，高是h，表面积是多少？(π取3.14)',
        variables: { r: { range: [2, 5] }, h: { range: [5, 10] } },
        generate: function(vars) {
            const result = (2 * 3.14 * vars.r * vars.r + 2 * 3.14 * vars.r * vars.h).toFixed(2);
            return {
                question: `圆柱的底面半径是${vars.r}，高是${vars.h}，表面积是多少？(π取3.14)`,
                answer: result,
                explanation: `S = 2πr² + 2πrh = 2×3.14×${vars.r}² + 2×3.14×${vars.r}×${vars.h} = ${result}`
            };
        },
        validation: 'tolerance',
        tolerance: 0.01
    },
    {
        id: 'g11-volume-1',
        type: 'fillblank',
        template: '圆锥的底面半径是r，高是h，体积是多少？(π取3.14)',
        variables: { r: { range: [2, 5] }, h: { range: [6, 12] } },
        generate: function(vars) {
            const result = (3.14 * vars.r * vars.r * vars.h / 3).toFixed(2);
            return {
                question: `圆锥的底面半径是${vars.r}，高是${vars.h}，体积是多少？(π取3.14)`,
                answer: result,
                explanation: `V = (1/3)πr²h = (1/3)×3.14×${vars.r}²×${vars.h} = ${result}`
            };
        },
        validation: 'tolerance',
        tolerance: 0.01
    },
    {
        id: 'g11-line-1',
        type: 'fillblank',
        template: '求过点({a}, {b})，斜率为{c}的直线方程',
        variables: { a: { range: [1, 5] }, b: { range: [1, 5] }, c: { range: [1, 3] } },
        generate: function(vars) {
            const intercept = vars.b - vars.c * vars.a;
            const sign = intercept >= 0 ? '+' : '';
            return {
                question: `求过点(${vars.a}, ${vars.b})，斜率为${vars.c}的直线方程`,
                answer: `y = ${vars.c}x ${sign}${intercept}`,
                explanation: `点斜式：y - ${vars.b} = ${vars.c}(x - ${vars.a})，整理得 y = ${vars.c}x ${sign}${intercept}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g11-distance-1',
        type: 'fillblank',
        template: '求点({a}, {b})到直线3x + 4y + 5 = 0的距离',
        variables: { a: { range: [1, 5] }, b: { range: [1, 5] } },
        generate: function(vars) {
            const num = Math.abs(3 * vars.a + 4 * vars.b + 5);
            const result = (num / 5).toFixed(2);
            return {
                question: `求点(${vars.a}, ${vars.b})到直线3x + 4y + 5 = 0的距离`,
                answer: result,
                explanation: `d = |3×${vars.a} + 4×${vars.b} + 5| / √(3²+4²) = ${num} / 5 = ${result}`
            };
        },
        validation: 'tolerance',
        tolerance: 0.01
    },
    {
        id: 'g11-circle-1',
        type: 'fillblank',
        template: '求圆心为({a}, {b})，半径为{c}的圆的方程',
        variables: { a: { range: [1, 5] }, b: { range: [1, 5] }, c: { range: [2, 5] } },
        generate: function(vars) {
            return {
                question: `求圆心为(${vars.a}, ${vars.b})，半径为${vars.c}的圆的方程`,
                answer: `(x-${vars.a})² + (y-${vars.b})² = ${vars.c * vars.c}`,
                explanation: `圆的标准方程：(x-${vars.a})² + (y-${vars.b})² = ${vars.c}² = ${vars.c * vars.c}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g11-arith-1',
        type: 'fillblank',
        template: '等差数列的首项是{a}，公差是{d}，求第{n}项',
        variables: { a: { range: [1, 10] }, d: { range: [2, 5] }, n: { range: [5, 10] } },
        generate: function(vars) {
            const result = vars.a + (vars.n - 1) * vars.d;
            return {
                question: `等差数列的首项是${vars.a}，公差是${vars.d}，求第${vars.n}项`,
                answer: result,
                explanation: `a_${vars.n} = a₁ + (${vars.n}-1)d = ${vars.a} + ${vars.n-1}×${vars.d} = ${result}`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g11-geo-1',
        type: 'fillblank',
        template: '等比数列的首项是{a}，公比是{q}，求第{n}项',
        variables: { a: { range: [1, 5] }, q: { range: [2, 3] }, n: { range: [3, 5] } },
        generate: function(vars) {
            const result = vars.a * Math.pow(vars.q, vars.n - 1);
            return {
                question: `等比数列的首项是${vars.a}，公比是${vars.q}，求第${vars.n}项`,
                answer: result,
                explanation: `a_${vars.n} = a₁ × q^(${vars.n}-1) = ${vars.a} × ${vars.q}^${vars.n-1} = ${result}`
            };
        },
        validation: 'exact'
    }
];
