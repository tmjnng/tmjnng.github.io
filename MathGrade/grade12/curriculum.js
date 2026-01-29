// grade12/curriculum.js - 高三数学课程数据
// 人教版高中数学选修知识点（高考复习）

export const curriculum = {
    grade: 12,
    name: '高三数学',
    chapters: [
        {
            id: 'g12-ch1',
            title: '导数及其应用',
            nodes: [
                {
                    id: 'g12-1-1',
                    title: '变化率与导数',
                    type: 'concept',
                    content: '理解平均变化率和瞬时变化率的概念，理解导数的概念。',
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g12-1-2',
                    title: '导数的计算',
                    type: 'exercise',
                    content: '掌握基本初等函数的导数公式和导数的运算法则。',
                    formulas: ['(x^n)\' = nx^(n-1)', '(sin x)\' = cos x', '(cos x)\' = -sin x'],
                    templateIds: ['g12-deriv-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g12-1-3',
                    title: '导数在研究函数中的应用',
                    type: 'exercise',
                    content: '利用导数研究函数的单调性、极值和最值。',
                    templateIds: ['g12-deriv-2'],
                    difficulty: 3,
                    estimatedTime: 20
                }
            ]
        },
        {
            id: 'g12-ch2',
            title: '圆锥曲线与方程',
            nodes: [
                {
                    id: 'g12-2-1',
                    title: '椭圆',
                    type: 'exercise',
                    content: '掌握椭圆的定义、标准方程和几何性质。',
                    formulas: ['x²/a² + y²/b² = 1 (a > b > 0)'],
                    templateIds: ['g12-ellipse-1'],
                    difficulty: 3,
                    estimatedTime: 18
                },
                {
                    id: 'g12-2-2',
                    title: '双曲线',
                    type: 'exercise',
                    content: '掌握双曲线的定义、标准方程和几何性质。',
                    formulas: ['x²/a² - y²/b² = 1'],
                    difficulty: 3,
                    estimatedTime: 18
                },
                {
                    id: 'g12-2-3',
                    title: '抛物线',
                    type: 'exercise',
                    content: '掌握抛物线的定义、标准方程和几何性质。',
                    formulas: ['y² = 2px (p > 0)'],
                    templateIds: ['g12-parabola-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g12-ch3',
            title: '计数原理',
            nodes: [
                {
                    id: 'g12-3-1',
                    title: '分类加法计数原理与分步乘法计数原理',
                    type: 'concept',
                    content: '理解两个计数原理，并能应用解决简单问题。',
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g12-3-2',
                    title: '排列',
                    type: 'exercise',
                    content: '理解排列的概念，掌握排列数公式。',
                    formulas: ['A_n^m = n!/(n-m)!'],
                    templateIds: ['g12-perm-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g12-3-3',
                    title: '组合',
                    type: 'exercise',
                    content: '理解组合的概念，掌握组合数公式。',
                    formulas: ['C_n^m = n!/(m!(n-m)!)'],
                    templateIds: ['g12-comb-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g12-3-4',
                    title: '二项式定理',
                    type: 'exercise',
                    content: '掌握二项式定理，能展开二项式。',
                    formulas: ['(a+b)^n = ΣC_n^k a^(n-k)b^k'],
                    templateIds: ['g12-binom-1'],
                    difficulty: 3,
                    estimatedTime: 18
                }
            ]
        },
        {
            id: 'g12-ch4',
            title: '概率与统计',
            nodes: [
                {
                    id: 'g12-4-1',
                    title: '条件概率',
                    type: 'concept',
                    content: '理解条件概率的概念，掌握条件概率公式。',
                    formulas: ['P(B|A) = P(AB)/P(A)'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g12-4-2',
                    title: '离散型随机变量及其分布列',
                    type: 'concept',
                    content: '理解离散型随机变量的概念，掌握分布列的求法。',
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g12-4-3',
                    title: '数学期望与方差',
                    type: 'exercise',
                    content: '掌握离散型随机变量的数学期望和方差的计算。',
                    formulas: ['E(X) = Σx_i p_i', 'D(X) = E(X²) - [E(X)]²'],
                    templateIds: ['g12-expect-1'],
                    difficulty: 3,
                    estimatedTime: 18
                }
            ]
        },
        {
            id: 'g12-ch5',
            title: '高考数学综合复习',
            nodes: [
                {
                    id: 'g12-5-1',
                    title: '函数与导数综合',
                    type: 'exercise',
                    content: '函数与导数的综合应用，含参数讨论。',
                    difficulty: 4,
                    estimatedTime: 25
                },
                {
                    id: 'g12-5-2',
                    title: '解析几何综合',
                    type: 'exercise',
                    content: '圆锥曲线与直线的综合问题。',
                    difficulty: 4,
                    estimatedTime: 25
                },
                {
                    id: 'g12-5-3',
                    title: '数列综合',
                    type: 'exercise',
                    content: '等差数列与等比数列的综合应用。',
                    difficulty: 3,
                    estimatedTime: 20
                }
            ]
        }
    ]
};
