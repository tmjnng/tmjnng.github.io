// grade9/templates.js - 九年级数学题目模板库
// 包含各知识点的题目生成模板

export const templates = [
    // ========== 一元二次方程 ==========
    {
        id: 'g9-quad-1',
        type: 'fillblank',
        template: '解方程：x² = a',
        variables: {
            a: { range: [4, 81], divisible: [4, 9, 16, 25] }
        },
        generate: function(vars) {
            const result = Math.sqrt(vars.a);
            return {
                question: `解方程：$x^2 = ${vars.a}$`,
                answer: `x = \\pm ${result}`,
                explanation: `$x^2 = ${vars.a}$，所以 $x = \\pm \\sqrt{${vars.a}} = \\pm ${result}$`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g9-quad-2',
        type: 'fillblank',
        template: '用配方法解方程：x² + ax + b = 0',
        variables: {
            a: { range: [2, 10], divisible: [2] },
            b: { range: [1, 20] }
        },
        generate: function(vars) {
            const halfA = vars.a / 2;
            const c = halfA * halfA - vars.b;
            const result = Math.sqrt(c);
            return {
                question: `用配方法解方程：$x^2 + ${vars.a}x + ${vars.b} = 0$`,
                answer: `x = -${halfA} \\pm ${result}`,
                explanation: `$x^2 + ${vars.a}x + ${vars.b} = 0$，配方得 $(x + ${halfA})^2 = ${c}$，所以 $x = -${halfA} \\pm ${result}$`
            };
        },
        validation: 'exact'
    },
    {
        id: 'g9-quad-3',
        type: 'fillblank',
        template: '用公式法解方程：ax² + bx + c = 0',
        variables: {
            a: { range: [1, 3] },
            b: { range: [2, 10], divisible: [2] },
            c: { range: [1, 10] }
        },
        constraint: 'b*b - 4*a*c > 0',
        generate: function(vars) {
            const delta = vars.b * vars.b - 4 * vars.a * vars.c;
            const sqrtDelta = Math.sqrt(delta);
            const x1 = (-vars.b + sqrtDelta) / (2 * vars.a);
            const x2 = (-vars.b - sqrtDelta) / (2 * vars.a);
            return {
                question: `用公式法解方程：$${vars.a}x^2 + ${vars.b}x + ${vars.c} = 0$`,
                answer: `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`,
                explanation: `$\\Delta = ${vars.b}^2 - 4 \\times ${vars.a} \\times ${vars.c} = ${delta}$，$x = \\frac{-${vars.b} \\pm \\sqrt{${delta}}}{2 \\times ${vars.a}}$`
            };
        },
        validation: 'tolerance',
        tolerance: 0.01
    },
    {
        id: 'g9-quad-4',
        type: 'fillblank',
        template: '用因式分解法解方程：x² - ax + b = 0',
        variables: {
            a: { range: [3, 10] },
            b: { range: [2, 20] }
        },
        constraint: 'a > 0 && b > 0',
        generate: function(vars) {
            // 寻找两个数m和n，使得m+n=a，m*n=b
            let m = 1, n = vars.b;
            for (let i = 1; i <= vars.b; i++) {
                if (vars.b % i === 0) {
                    const j = vars.b / i;
                    if (i + j === vars.a) {
                        m = i;
                        n = j;
                        break;
                    }
                }
            }
            return {
                question: `用因式分解法解方程：$x^2 - ${vars.a}x + ${vars.b} = 0$`,
                answer: `x₁ = ${m}, x₂ = ${n}`,
                explanation: `$x^2 - ${vars.a}x + ${vars.b} = (x - ${m})(x - ${n}) = 0$，所以 $x = ${m}$ 或 $x = ${n}$`
            };
        },
        validation: 'exact'
    },

    // ========== 二次函数 ==========
    {
        id: 'g9-quad-func-1',
        type: 'fillblank',
        template: '求抛物线y = ax² + bx + c的顶点坐标',
        variables: {
            a: { range: [1, 3] },
            b: { range: [2, 8], divisible: [2] },
            c: { range: [1, 5] }
        },
        generate: function(vars) {
            const h = -vars.b / (2 * vars.a);
            const k = vars.c - vars.b * vars.b / (4 * vars.a);
            return {
                question: `求抛物线 $y = ${vars.a}x^2 + ${vars.b}x + ${vars.c}$ 的顶点坐标`,
                answer: `(${h.toFixed(1)}, ${k.toFixed(1)})`,
                explanation: `对称轴 $x = -\\frac{${vars.b}}{2 \\times ${vars.a}} = ${h}$，顶点纵坐标 $y = ${k.toFixed(2)}$`
            };
        },
        validation: 'tolerance',
        tolerance: 0.1
    },

    // ========== 旋转 ==========
    {
        id: 'g9-rotate-1',
        type: 'fillblank',
        template: '点P(a, b)关于原点对称的点的坐标是？',
        variables: {
            a: { range: [1, 5] },
            b: { range: [1, 5] }
        },
        generate: function(vars) {
            return {
                question: `点P(${vars.a}, ${vars.b})关于原点对称的点的坐标是？`,
                answer: `(${-vars.a}, ${-vars.b})`,
                explanation: `关于原点对称的点，横纵坐标都变为相反数，所以是(${-vars.a}, ${-vars.b})`
            };
        },
        validation: 'exact'
    },

    // ========== 圆 ==========
    {
        id: 'g9-circle-1',
        type: 'fillblank',
        template: '半径为R的圆中，圆心角为n°的弧长是多少？(π取3.14)',
        variables: {
            R: { range: [3, 10] },
            n: { range: [30, 180], divisible: [30] }
        },
        generate: function(vars) {
            const l = (vars.n * 3.14 * vars.R / 180).toFixed(2);
            return {
                question: `半径为${vars.R}的圆中，圆心角为${vars.n}°的弧长是多少？(\\pi取3.14)`,
                answer: l,
                explanation: `$l = \\frac{${vars.n} \\times 3.14 \\times ${vars.R}}{180} = ${l}$`
            };
        },
        validation: 'tolerance',
        tolerance: 0.01
    },
    {
        id: 'g9-circle-2',
        type: 'fillblank',
        template: '半径为R的圆中，圆心角为n°的扇形面积是多少？(π取3.14)',
        variables: {
            R: { range: [3, 10] },
            n: { range: [30, 180], divisible: [30] }
        },
        generate: function(vars) {
            const s = (vars.n * 3.14 * vars.R * vars.R / 360).toFixed(2);
            return {
                question: `半径为${vars.R}的圆中，圆心角为${vars.n}°的扇形面积是多少？(\\pi取3.14)`,
                answer: s,
                explanation: `$S = \\frac{${vars.n} \\times 3.14 \\times ${vars.R}^2}{360} = ${s}$`
            };
        },
        validation: 'tolerance',
        tolerance: 0.01
    },

    // ========== 概率 ==========
    {
        id: 'g9-prob-1',
        type: 'fillblank',
        template: '袋中有a个红球和b个白球，随机摸出一个球，摸到红球的概率是多少？',
        variables: {
            a: { range: [2, 5] },
            b: { range: [2, 5] }
        },
        generate: function(vars) {
            const total = vars.a + vars.b;
            // 约分
            const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
            const divisor = gcd(vars.a, total);
            const simpNum = vars.a / divisor;
            const simpDen = total / divisor;
            
            return {
                question: `袋中有${vars.a}个红球和${vars.b}个白球，随机摸出一个球，摸到红球的概率是多少？`,
                answer: `\\frac{${simpNum}}{${simpDen}}`,
                explanation: `总共有${total}个球，红球有${vars.a}个，概率为$\\frac{${vars.a}}{${total}} = \\frac{${simpNum}}{${simpDen}}$`
            };
        },
        validation: 'exact'
    }
];
