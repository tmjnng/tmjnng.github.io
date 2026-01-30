// grade6/templates_fixed.js - 六年级数学题目模板库（修复版）
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
                answer = "\\frac{" + simpNum + "}{" + simpDen + "}";
            }
            
            return {
                question: "$\\frac{" + vars.a + "}{" + vars.b + "} \\times " + vars.c + " = $",
                answer: answer,
                explanation: "$\\frac{" + vars.a + "}{" + vars.b + "} \\times " + vars.c + " = \\frac{(" + vars.a + " \\times " + vars.c + ")}{" + vars.b + "} = " + answer + "$"
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
                answer = "\\frac{" + simpNum + "}{" + simpDen + "}";
            }
            
            return {
                question: "$\\frac{" + vars.a + "}{" + vars.b + "} \\times \\frac{" + vars.c + "}{" + vars.d + "} = $",
                answer: answer,
                explanation: "$\\frac{" + vars.a + "}{" + vars.b + "} \\times \\frac{" + vars.c + "}{" + vars.d + "} = \\frac{" + numerator + "}{" + denominator + "} = " + answer + "$"
            };
        },
        validation: 'exact'
    }
];
