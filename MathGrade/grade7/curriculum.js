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
                    content: '认识正数和负数，理解相反意义的量。正数是大于0的数，负数是小于0的数。正数和负数可以表示具有相反意义的量，如温度零上和零下、收入和支出等。',
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '数轴',
                            description: '正数和负数在数轴上的表示',
                            config: { min: -5, max: 5, step: 1, highlight: [-3, 0, 3] }
                        }
                    ],
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
                    content: '认识数轴，能用数轴上的点表示有理数。数轴是规定了原点、正方向和单位长度的直线。原点表示0，原点右边的点表示正数，左边的点表示负数。',
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '数轴',
                            description: '数轴的三要素：原点、正方向、单位长度',
                            config: { min: -5, max: 5, step: 1 }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g7-1-4',
                    title: '相反数',
                    type: 'concept',
                    content: '理解相反数的概念，会求一个数的相反数。只有符号不同的两个数叫做互为相反数，如5和-5。0的相反数是0。在数轴上，互为相反数的两个点位于原点两侧，且到原点的距离相等。',
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '相反数',
                            description: '相反数在数轴上的表示',
                            config: { min: -5, max: 5, step: 1, highlight: [-3, 3] }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 8
                },
                {
                    id: 'g7-1-5',
                    title: '绝对值',
                    type: 'concept',
                    content: '理解绝对值的概念，会求一个数的绝对值。一个数的绝对值是数轴上表示这个数的点与原点的距离。正数的绝对值是它本身，负数的绝对值是它的相反数，0的绝对值是0。',
                    formulas: ['|a| = a (a > 0)', '|a| = 0 (a = 0)', '|a| = -a (a < 0)'],
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '绝对值',
                            description: '绝对值在数轴上的表示',
                            config: { min: -5, max: 5, step: 1, highlight: [-3, 0, 3] }
                        }
                    ],
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
                    content: '理解一元一次方程的概念。只含有一个未知数，且未知数的次数是1的方程叫做一元一次方程。一般形式：ax + b = 0 (a≠0)。',
                    visualizations: [
                        {
                            type: 'graph',
                            title: '一元一次方程',
                            description: '一元一次方程的图像是一条直线',
                            config: { equation: 'y = 2x + 1', points: [[-2, -3], [-1, -1], [0, 1], [1, 3], [2, 5]] }
                        }
                    ],
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
                    content: '理解角的概念，掌握角的度量。角是由两条有公共端点的射线组成的图形。角的度量单位是度，用符号"°"表示。1周角=360°，1平角=180°，1直角=90°。',
                    visualizations: [
                        {
                            type: 'angle',
                            title: '角',
                            description: '角的度量',
                            config: { degrees: 45, type: 'acute' }
                        }
                    ],
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
