// grade3/curriculum.js - 三年级数学课程数据
// 人教版小学数学三年级上册知识点

export const curriculum = {
    grade: 3,
    name: '三年级数学',
    chapters: [
        {
            id: 'g3-ch1',
            title: '时、分、秒',
            nodes: [
                {
                    id: 'g3-1-1',
                    title: '秒的认识',
                    type: 'concept',
                    content: '计量很短的时间，常用秒。秒是比分更小的时间单位。钟面上最长最细的针是秒针，秒针走1小格是1秒，走1圈是60秒。1分=60秒，1时=60分=3600秒。',
                    formulas: ['1分 = 60秒', '1时 = 60分', '1时 = 3600秒'],
                    visualizations: [
                        {
                            type: 'clock',
                            title: '钟表',
                            description: '秒针、分针、时针的关系',
                            config: { hour: 1, minute: 30, type: 'hour' }
                        }
                    ],
                    examples: [
                        {
                            problem: '小明跑50米用了10(    )',
                            answer: '秒',
                            type: 'fillblank'
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g3-1-2',
                    title: '时间的计算',
                    type: 'exercise',
                    content: '学习时间单位之间的换算和时间的加减计算。',
                    templateIds: ['time-calc-1', 'time-calc-2', 'time-calc-3'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g3-ch2',
            title: '万以内的加法和减法(一)',
            nodes: [
                {
                    id: 'g3-2-1',
                    title: '两位数加两位数',
                    type: 'exercise',
                    content: '掌握两位数加两位数的口算方法。',
                    templateIds: ['add-2digit-1', 'add-2digit-2'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g3-2-2',
                    title: '两位数减两位数',
                    type: 'exercise',
                    content: '掌握两位数减两位数的口算方法。',
                    templateIds: ['sub-2digit-1', 'sub-2digit-2'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g3-2-3',
                    title: '几百几十加减几百几十',
                    type: 'exercise',
                    content: '学习几百几十数的加减法计算。',
                    templateIds: ['add-3digit-1', 'sub-3digit-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g3-ch3',
            title: '测量',
            nodes: [
                {
                    id: 'g3-3-1',
                    title: '毫米、分米的认识',
                    type: 'concept',
                    content: '认识长度单位毫米和分米。1厘米=10毫米，1分米=10厘米。毫米是很小的长度单位，用来测量很薄的物体；分米是比厘米大的单位，用来测量较长的物体。',
                    formulas: ['1厘米 = 10毫米', '1分米 = 10厘米', '1米 = 10分米'],
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '长度单位',
                            description: '毫米、厘米、分米的关系',
                            config: { min: 0, max: 10, step: 1 }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g3-3-2',
                    title: '千米的认识',
                    type: 'concept',
                    content: '千米是计量较长距离的单位。1千米=1000米。',
                    formulas: ['1千米 = 1000米'],
                    difficulty: 1,
                    estimatedTime: 8
                },
                {
                    id: 'g3-3-3',
                    title: '吨的认识',
                    type: 'concept',
                    content: '吨是计量较重物体质量的单位。1吨=1000千克。',
                    formulas: ['1吨 = 1000千克', '1千克 = 1000克'],
                    difficulty: 1,
                    estimatedTime: 8
                },
                {
                    id: 'g3-3-4',
                    title: '单位换算练习',
                    type: 'exercise',
                    content: '练习长度单位和质量单位的换算。',
                    templateIds: ['unit-length-1', 'unit-mass-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g3-ch4',
            title: '万以内的加法和减法(二)',
            nodes: [
                {
                    id: 'g3-4-1',
                    title: '三位数加三位数',
                    type: 'exercise',
                    content: '掌握三位数加三位数的笔算方法，包括进位加法。',
                    templateIds: ['add-3digit-2', 'add-3digit-3'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g3-4-2',
                    title: '三位数减三位数',
                    type: 'exercise',
                    content: '掌握三位数减三位数的笔算方法，包括退位减法。',
                    templateIds: ['sub-3digit-2', 'sub-3digit-3'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g3-4-3',
                    title: '加减法验算',
                    type: 'concept',
                    content: '学习加法和减法的验算方法，确保计算正确。',
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g3-ch5',
            title: '倍的认识',
            nodes: [
                {
                    id: 'g3-5-1',
                    title: '倍的概念',
                    type: 'concept',
                    content: '一个数里面有几个另一个数，就说一个数是另一个数的几倍。比如6里面有3个2，就说6是2的3倍。求倍数用除法计算。',
                    formulas: ['A是B的几倍 = A ÷ B'],
                    visualizations: [
                        {
                            type: 'multiplication',
                            title: '倍数关系',
                            description: '3个2组成6',
                            config: { rows: 3, cols: 2 }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g3-5-2',
                    title: '求一个数是另一个数的几倍',
                    type: 'exercise',
                    content: '练习求倍数关系的应用题。',
                    templateIds: ['multiple-1', 'multiple-2'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g3-5-3',
                    title: '求一个数的几倍是多少',
                    type: 'exercise',
                    content: '练习已知倍数求数量的应用题。',
                    templateIds: ['multiple-3', 'multiple-4'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g3-ch6',
            title: '多位数乘一位数',
            nodes: [
                {
                    id: 'g3-6-1',
                    title: '口算乘法',
                    type: 'exercise',
                    content: '整十、整百数乘一位数的口算方法。',
                    templateIds: ['multiply-1', 'multiply-2'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g3-6-2',
                    title: '笔算乘法(不进位)',
                    type: 'exercise',
                    content: '学习多位数乘一位数(不进位)的笔算方法。',
                    templateIds: ['multiply-3'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g3-6-3',
                    title: '笔算乘法(进位)',
                    type: 'exercise',
                    content: '学习多位数乘一位数(进位)的笔算方法。',
                    templateIds: ['multiply-4', 'multiply-5'],
                    difficulty: 3,
                    estimatedTime: 18
                },
                {
                    id: 'g3-6-4',
                    title: '乘数中间或末尾有0的乘法',
                    type: 'exercise',
                    content: '学习特殊情况的乘法计算。',
                    templateIds: ['multiply-6', 'multiply-7'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g3-ch7',
            title: '长方形和正方形',
            nodes: [
                {
                    id: 'g3-7-1',
                    title: '四边形',
                    type: 'concept',
                    content: '有4条直的边和4个角的封闭图形叫四边形。长方形和正方形都是特殊的四边形。长方形有4个直角，对边相等；正方形有4个直角，4条边都相等。',
                    visualizations: [
                        {
                            type: 'geometry-shape',
                            title: '四边形',
                            description: '常见的四边形',
                            config: { shape: 'rectangle', size: 100, label: '长方形' }
                        },
                        {
                            type: 'geometry-shape',
                            title: '正方形',
                            description: '特殊的四边形',
                            config: { shape: 'square', size: 100, label: '正方形' }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 8
                },
                {
                    id: 'g3-7-2',
                    title: '周长',
                    type: 'concept',
                    content: '封闭图形一周的长度叫周长。长方形的周长=（长+宽）×2，正方形的周长=边长×4。计算周长时，要把图形所有边的长度加起来。',
                    formulas: ['长方形周长 = (长 + 宽) × 2', '正方形周长 = 边长 × 4'],
                    visualizations: [
                        {
                            type: 'rectangle',
                            title: '长方形周长',
                            description: '长方形的周长计算',
                            config: { width: 8, height: 4, showLabels: true }
                        },
                        {
                            type: 'geometry-shape',
                            title: '正方形',
                            description: '正方形的周长计算',
                            config: { shape: 'square', size: 80, label: '边长=5' }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g3-7-3',
                    title: '长方形和正方形的周长计算',
                    type: 'exercise',
                    content: '练习长方形和正方形周长的计算。',
                    templateIds: ['perimeter-rect', 'perimeter-square', 'perimeter-mixed'],
                    difficulty: 2,
                    estimatedTime: 18
                }
            ]
        },
        {
            id: 'g3-ch8',
            title: '分数的初步认识',
            nodes: [
                {
                    id: 'g3-8-1',
                    title: '几分之一',
                    type: 'concept',
                    content: '把一个物体或图形平均分成几份，每份就是它的几分之一。比如把一个圆平均分成4份，每份就是它的四分之一，写作1/4。',
                    formulas: ['\\frac{1}{n} 表示把整体平均分成n份，取其中1份'],
                    visualizations: [
                        {
                            type: 'fraction',
                            title: '分数表示',
                            description: '用圆形表示1/4',
                            config: { numerator: 1, denominator: 4, type: 'circle' }
                        },
                        {
                            type: 'fraction',
                            title: '分数表示',
                            description: '用矩形表示1/4',
                            config: { numerator: 1, denominator: 4, type: 'rectangle' }
                        },
                        {
                            type: 'number-line-fraction',
                            title: '数轴上的分数',
                            description: '在数轴上表示1/4',
                            config: { numerator: 1, denominator: 4 }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 12
                },
                {
                    id: 'g3-8-2',
                    title: '几分之几',
                    type: 'concept',
                    content: '把一个物体或图形平均分成若干份，取其中的几份就是几分之几。比如把一个圆平均分成8份，取其中的3份，就是八分之三，写作3/8。',
                    visualizations: [
                        {
                            type: 'fraction',
                            title: '分数表示',
                            description: '用圆形表示3/8',
                            config: { numerator: 3, denominator: 8, type: 'circle' }
                        },
                        {
                            type: 'fraction',
                            title: '分数表示',
                            description: '用矩形表示3/8',
                            config: { numerator: 3, denominator: 8, type: 'rectangle' }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g3-8-3',
                    title: '分数比较大小',
                    type: 'exercise',
                    content: '学习同分母分数和同分子分数比较大小的方法。',
                    templateIds: ['fraction-compare-1', 'fraction-compare-2'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g3-8-4',
                    title: '分数的简单计算',
                    type: 'exercise',
                    content: '学习同分母分数的加减法。',
                    templateIds: ['fraction-add-1', 'fraction-sub-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g3-ch9',
            title: '数学广角——集合',
            nodes: [
                {
                    id: 'g3-9-1',
                    title: '集合的概念',
                    type: 'concept',
                    content: '了解简单的集合思想，能用集合图表示事物之间的关系。',
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g3-9-2',
                    title: '集合问题',
                    type: 'exercise',
                    content: '练习用集合思想解决实际问题。',
                    templateIds: ['set-1', 'set-2'],
                    difficulty: 3,
                    estimatedTime: 18
                }
            ]
        }
    ]
};
