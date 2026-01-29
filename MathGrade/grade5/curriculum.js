// grade5/curriculum.js - 五年级数学课程数据
// 人教版小学数学五年级上册知识点

export const curriculum = {
    grade: 5,
    name: '五年级数学',
    chapters: [
        {
            id: 'g5-ch1',
            title: '小数乘法',
            nodes: [
                {
                    id: 'g5-1-1',
                    title: '小数乘整数',
                    type: 'exercise',
                    content: '学习小数乘整数的计算方法。',
                    templateIds: ['g5-decimal-mul-1'],
                    difficulty: 1,
                    estimatedTime: 12
                },
                {
                    id: 'g5-1-2',
                    title: '小数乘小数',
                    type: 'exercise',
                    content: '学习小数乘小数的计算方法。',
                    templateIds: ['g5-decimal-mul-2'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g5-ch2',
            title: '位置',
            nodes: [
                {
                    id: 'g5-2-1',
                    title: '用数对表示位置',
                    type: 'concept',
                    content: '学习用数对表示物体的位置，理解数对的含义。',
                    difficulty: 1,
                    estimatedTime: 10
                }
            ]
        },
        {
            id: 'g5-ch3',
            title: '小数除法',
            nodes: [
                {
                    id: 'g5-3-1',
                    title: '除数是整数的小数除法',
                    type: 'exercise',
                    content: '学习除数是整数的小数除法。',
                    templateIds: ['g5-decimal-div-1'],
                    difficulty: 1,
                    estimatedTime: 12
                },
                {
                    id: 'g5-3-2',
                    title: '一个数除以小数',
                    type: 'exercise',
                    content: '学习一个数除以小数的计算方法。',
                    templateIds: ['g5-decimal-div-2'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g5-3-3',
                    title: '商的近似数',
                    type: 'exercise',
                    content: '学习用"四舍五入"法取商的近似数。',
                    templateIds: ['g5-decimal-approx'],
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g5-ch4',
            title: '可能性',
            nodes: [
                {
                    id: 'g5-4-1',
                    title: '可能性的大小',
                    type: 'concept',
                    content: '体验事件发生的等可能性以及游戏规则的公平性。',
                    difficulty: 1,
                    estimatedTime: 10
                }
            ]
        },
        {
            id: 'g5-ch5',
            title: '简易方程',
            nodes: [
                {
                    id: 'g5-5-1',
                    title: '用字母表示数',
                    type: 'concept',
                    content: '学习用字母表示数、运算定律和计算公式。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g5-5-2',
                    title: '方程的意义',
                    type: 'concept',
                    content: '认识方程，理解方程与等式的关系。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g5-5-3',
                    title: '解方程',
                    type: 'exercise',
                    content: '学习解简易方程的方法。',
                    templateIds: ['g5-equation-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g5-5-4',
                    title: '实际问题与方程',
                    type: 'exercise',
                    content: '学习列方程解决实际问题。',
                    templateIds: ['g5-equation-2'],
                    difficulty: 2,
                    estimatedTime: 18
                }
            ]
        },
        {
            id: 'g5-ch6',
            title: '多边形的面积',
            nodes: [
                {
                    id: 'g5-6-1',
                    title: '平行四边形的面积',
                    type: 'exercise',
                    content: '学习平行四边形面积公式的推导和应用。',
                    formulas: ['S = ah'],
                    templateIds: ['g5-area-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g5-6-2',
                    title: '三角形的面积',
                    type: 'exercise',
                    content: '学习三角形面积公式的推导和应用。',
                    formulas: ['S = ah ÷ 2'],
                    templateIds: ['g5-area-2'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g5-6-3',
                    title: '梯形的面积',
                    type: 'exercise',
                    content: '学习梯形面积公式的推导和应用。',
                    formulas: ['S = (a + b)h ÷ 2'],
                    templateIds: ['g5-area-3'],
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g5-ch7',
            title: '数学广角——植树问题',
            nodes: [
                {
                    id: 'g5-7-1',
                    title: '植树问题',
                    type: 'exercise',
                    content: '学习植树问题的三种情况：两端都栽、两端都不栽、一端栽一端不栽。',
                    templateIds: ['g5-tree-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        }
    ]
};
