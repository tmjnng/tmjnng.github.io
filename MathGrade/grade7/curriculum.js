// grade7/curriculum.js - 七年级数学课程数据
// 人教版初中数学七年级上册知识点

export const curriculum = {
    grade: 7,
    name: '七年级数学',
    chapters: [
        {
            id: 'g7-ch1',
            title: '有理数',
            nodes: [
                {
                    id: 'g7-1-1',
                    title: '正数和负数',
                    type: 'concept',
                    content: '认识正数和负数，理解相反意义的量。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g7-1-2',
                    title: '有理数',
                    type: 'concept',
                    content: '理解有理数的概念，能对有理数进行分类。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g7-1-3',
                    title: '数轴',
                    type: 'concept',
                    content: '认识数轴，能用数轴上的点表示有理数。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g7-1-4',
                    title: '相反数',
                    type: 'concept',
                    content: '理解相反数的概念，会求一个数的相反数。',
                    difficulty: 1,
                    estimatedTime: 8
                },
                {
                    id: 'g7-1-5',
                    title: '绝对值',
                    type: 'concept',
                    content: '理解绝对值的概念，会求一个数的绝对值。',
                    formulas: ['|a| = a (a > 0)', '|a| = 0 (a = 0)', '|a| = -a (a < 0)'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g7-1-6',
                    title: '有理数的加法',
                    type: 'exercise',
                    content: '掌握有理数加法法则。',
                    templateIds: ['g7-add-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g7-1-7',
                    title: '有理数的减法',
                    type: 'exercise',
                    content: '掌握有理数减法法则。',
                    formulas: ['a - b = a + (-b)'],
                    templateIds: ['g7-sub-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g7-1-8',
                    title: '有理数的乘法',
                    type: 'exercise',
                    content: '掌握有理数乘法法则。',
                    templateIds: ['g7-mul-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g7-1-9',
                    title: '有理数的除法',
                    type: 'exercise',
                    content: '掌握有理数除法法则。',
                    formulas: ['a ÷ b = a × (1/b) (b ≠ 0)'],
                    templateIds: ['g7-div-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g7-1-10',
                    title: '有理数的乘方',
                    type: 'exercise',
                    content: '理解乘方的意义，掌握有理数乘方运算。',
                    templateIds: ['g7-pow-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g7-ch2',
            title: '整式的加减',
            nodes: [
                {
                    id: 'g7-2-1',
                    title: '用字母表示数',
                    type: 'concept',
                    content: '能用字母表示数，理解字母表示数的一般性。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g7-2-2',
                    title: '单项式',
                    type: 'concept',
                    content: '理解单项式、系数、次数的概念。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g7-2-3',
                    title: '多项式',
                    type: 'concept',
                    content: '理解多项式、项、常数项、次数的概念。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g7-2-4',
                    title: '合并同类项',
                    type: 'exercise',
                    content: '掌握合并同类项的方法。',
                    templateIds: ['g7-combine-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g7-2-5',
                    title: '去括号',
                    type: 'exercise',
                    content: '掌握去括号法则。',
                    templateIds: ['g7-bracket-1'],
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g7-ch3',
            title: '一元一次方程',
            nodes: [
                {
                    id: 'g7-3-1',
                    title: '一元一次方程',
                    type: 'concept',
                    content: '理解一元一次方程的概念。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g7-3-2',
                    title: '等式的性质',
                    type: 'concept',
                    content: '掌握等式的基本性质。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g7-3-3',
                    title: '解一元一次方程(一)',
                    type: 'exercise',
                    content: '学习合并同类项与移项解方程。',
                    templateIds: ['g7-equation-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g7-3-4',
                    title: '解一元一次方程(二)',
                    type: 'exercise',
                    content: '学习去括号与去分母解方程。',
                    templateIds: ['g7-equation-2'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g7-3-5',
                    title: '实际问题与一元一次方程',
                    type: 'exercise',
                    content: '学习用一元一次方程解决实际问题。',
                    templateIds: ['g7-equation-3'],
                    difficulty: 3,
                    estimatedTime: 18
                }
            ]
        },
        {
            id: 'g7-ch4',
            title: '几何图形初步',
            nodes: [
                {
                    id: 'g7-4-1',
                    title: '几何图形',
                    type: 'concept',
                    content: '认识立体图形和平面图形。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g7-4-2',
                    title: '直线、射线、线段',
                    type: 'concept',
                    content: '理解直线、射线、线段的概念及表示方法。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g7-4-3',
                    title: '角',
                    type: 'concept',
                    content: '理解角的概念，掌握角的度量。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g7-4-4',
                    title: '角的比较与运算',
                    type: 'exercise',
                    content: '学习角的比较和运算。',
                    templateIds: ['g7-angle-1'],
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        }
    ]
};
