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
                    content: '学习小数乘整数的计算方法。先按整数乘法算出积，再看因数中一共有几位小数，就从积的右边起数出几位点上小数点。',
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '小数乘法',
                            description: '小数乘整数示例',
                            config: { min: 0, max: 10, step: 0.5 }
                        }
                    ],
                    templateIds: ['g5-decimal-mul-1'],
                    difficulty: 1,
                    estimatedTime: 12
                },
                {
                    id: 'g5-1-2',
                    title: '小数乘小数',
                    type: 'exercise',
                    content: '学习小数乘小数的计算方法。先按整数乘法算出积，再看因数中一共有几位小数，就从积的右边起数出几位点上小数点。',
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '小数乘法',
                            description: '小数乘小数示例',
                            config: { min: 0, max: 5, step: 0.25 }
                        }
                    ],
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
                    content: '学习用数对表示物体的位置，理解数对的含义。数对通常表示为(列,行)，第一个数表示列，第二个数表示行。比如(3,2)表示第3列第2行。',
                    visualizations: [
                        {
                            type: 'coordinate',
                            title: '数对',
                            description: '用数对表示位置',
                            config: { points: [[1, 2], [3, 4], [5, 1]] }
                        }
                    ],
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
                    content: '学习用字母表示数、运算定律和计算公式。用字母表示数可以简明地表达数量关系、运算定律和计算公式。比如a+b=b+a表示加法交换律。',
                    visualizations: [
                        {
                            type: 'pattern',
                            title: '用字母表示规律',
                            description: '2,4,6,8,...可以用2n表示',
                            config: { sequence: [2, 4, 6, 8], showNext: true }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g5-5-2',
                    title: '方程的意义',
                    type: 'concept',
                    content: '认识方程，理解方程与等式的关系。含有未知数的等式叫做方程。方程必须同时满足两个条件：含有未知数，且是等式。比如x+3=5是一个方程。',
                    visualizations: [
                        {
                            type: 'graph',
                            title: '方程',
                            description: 'x+3=5的解',
                            config: { equation: 'x + 3 = 5', points: [[2, 0]] }
                        }
                    ],
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
                    content: '学习平行四边形面积公式的推导和应用。平行四边形的面积=底×高，可以通过割补法把平行四边形转化成长方形来推导。',
                    formulas: ['S = ah'],
                    visualizations: [
                        {
                            type: 'geometry-shape',
                            title: '平行四边形',
                            description: '平行四边形的面积=底×高',
                            config: { shape: 'rectangle', size: 100, label: '底×高' }
                        }
                    ],
                    templateIds: ['g5-area-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g5-6-2',
                    title: '三角形的面积',
                    type: 'exercise',
                    content: '学习三角形面积公式的推导和应用。三角形的面积=底×高÷2，可以通过把两个完全一样的三角形拼成一个平行四边形来推导。',
                    formulas: ['S = ah ÷ 2'],
                    visualizations: [
                        {
                            type: 'triangle',
                            title: '三角形',
                            description: '三角形的面积=底×高÷2',
                            config: { type: 'equilateral', side: 100 }
                        }
                    ],
                    templateIds: ['g5-area-2'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g5-6-3',
                    title: '梯形的面积',
                    type: 'exercise',
                    content: '学习梯形面积公式的推导和应用。梯形的面积=(上底+下底)×高÷2，可以通过把两个完全一样的梯形拼成一个平行四边形来推导。',
                    formulas: ['S = (a + b)h ÷ 2'],
                    visualizations: [
                        {
                            type: 'triangle',
                            title: '梯形',
                            description: '梯形的面积=(上底+下底)×高÷2',
                            config: { type: 'right', side: 100 }
                        }
                    ],
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
