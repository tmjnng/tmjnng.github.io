// grade10/curriculum.js - 高一数学课程数据
// 人教版高中数学必修一知识点

export const curriculum = {
    grade: 10,
    name: '高一数学',
    chapters: [
        {
            id: 'g10-ch1',
            title: '集合与函数概念',
            nodes: [
                {
                    id: 'g10-1-1',
                    title: '集合的含义与表示',
                    type: 'concept',
                    content: '理解集合的含义，掌握集合的表示方法。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g10-1-2',
                    title: '集合间的基本关系',
                    type: 'concept',
                    content: '理解子集、真子集、集合相等的概念。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g10-1-3',
                    title: '集合的基本运算',
                    type: 'exercise',
                    content: '掌握交集、并集、补集的运算。',
                    templateIds: ['g10-set-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g10-1-4',
                    title: '函数的概念',
                    type: 'concept',
                    content: '理解函数的概念，掌握函数的表示方法。',
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g10-1-5',
                    title: '函数的单调性',
                    type: 'concept',
                    content: '理解函数单调性的概念，会判断函数的单调性。',
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g10-ch2',
            title: '基本初等函数',
            nodes: [
                {
                    id: 'g10-2-1',
                    title: '指数与指数幂的运算',
                    type: 'exercise',
                    content: '掌握指数幂的运算性质。',
                    formulas: ['a^m × a^n = a^(m+n)', '(a^m)^n = a^(mn)'],
                    templateIds: ['g10-exp-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g10-2-2',
                    title: '指数函数及其性质',
                    type: 'concept',
                    content: '理解指数函数的概念和性质。',
                    formulas: ['y = a^x (a > 0, a ≠ 1)'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g10-2-3',
                    title: '对数与对数运算',
                    type: 'exercise',
                    content: '理解对数的概念，掌握对数的运算性质。',
                    formulas: ['log_a(MN) = log_a M + log_a N'],
                    templateIds: ['g10-log-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g10-2-4',
                    title: '对数函数及其性质',
                    type: 'concept',
                    content: '理解对数函数的概念和性质。',
                    formulas: ['y = log_a x (a > 0, a ≠ 1)'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g10-2-5',
                    title: '幂函数',
                    type: 'concept',
                    content: '理解幂函数的概念和性质。',
                    formulas: ['y = x^a'],
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g10-ch3',
            title: '函数的应用',
            nodes: [
                {
                    id: 'g10-3-1',
                    title: '方程的根与函数的零点',
                    type: 'concept',
                    content: '理解函数零点的概念，掌握零点存在性定理。',
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g10-3-2',
                    title: '用二分法求方程的近似解',
                    type: 'exercise',
                    content: '掌握用二分法求方程近似解的方法。',
                    templateIds: ['g10-bisect-1'],
                    difficulty: 3,
                    estimatedTime: 15
                }
            ]
        }
    ]
};
