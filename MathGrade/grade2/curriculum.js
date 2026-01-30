// grade2/curriculum.js - 二年级数学课程数据
// 人教版小学数学二年级上册知识点

export const curriculum = {
    grade: 2,
    name: '二年级数学',
    chapters: [
        {
            id: 'g2-ch1',
            title: '长度单位',
            nodes: [
                {
                    id: 'g2-1-1',
                    title: '厘米的认识',
                    type: 'concept',
                    content: '认识长度单位厘米，知道1厘米大约有多长。量比较短的物体，可以用厘米作单位。比如铅笔的长度、书本的宽度等可以用厘米来测量。',
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '厘米刻度',
                            description: '厘米尺的刻度表示',
                            config: { min: 0, max: 10, step: 1 }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g2-1-2',
                    title: '米的认识',
                    type: 'concept',
                    content: '认识长度单位米，知道1米=100厘米。量比较长的物体，通常用米作单位。比如教室的长度、操场的宽度等可以用米来测量。',
                    formulas: ['1米 = 100厘米'],
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '米和厘米的关系',
                            description: '1米等于100厘米',
                            config: { min: 0, max: 100, step: 10 }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g2-1-3',
                    title: '长度单位换算',
                    type: 'exercise',
                    content: '学习米和厘米之间的换算。',
                    templateIds: ['g2-length-1'],
                    difficulty: 1,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g2-ch2',
            title: '100以内的加法和减法(二)',
            nodes: [
                {
                    id: 'g2-2-1',
                    title: '不进位加法',
                    type: 'exercise',
                    content: '学习两位数加两位数的不进位加法。',
                    templateIds: ['g2-add-1'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g2-2-2',
                    title: '进位加法',
                    type: 'exercise',
                    content: '学习两位数加两位数的进位加法。',
                    templateIds: ['g2-add-2'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g2-2-3',
                    title: '不退位减法',
                    type: 'exercise',
                    content: '学习两位数减两位数的不退位减法。',
                    templateIds: ['g2-sub-1'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g2-2-4',
                    title: '退位减法',
                    type: 'exercise',
                    content: '学习两位数减两位数的退位减法。',
                    templateIds: ['g2-sub-2'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g2-2-5',
                    title: '连加、连减和加减混合',
                    type: 'exercise',
                    content: '学习连加、连减和加减混合运算。',
                    templateIds: ['g2-mixed-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g2-ch3',
            title: '角的初步认识',
            nodes: [
                {
                    id: 'g2-3-1',
                    title: '认识角',
                    type: 'concept',
                    content: '认识角，知道角的各部分名称：顶点、边。角的大小与边的长短无关，与两边张开的大小有关。角是由一个顶点和两条边组成的图形。',
                    visualizations: [
                        {
                            type: 'angle',
                            title: '角',
                            description: '角的组成：顶点和两条边',
                            config: { degrees: 45, type: 'acute' }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g2-3-2',
                    title: '认识直角、锐角、钝角',
                    type: 'concept',
                    content: '认识直角、锐角和钝角。直角=90度，锐角<90度，钝角>90度。直角可以用三角板的直角来比一比，锐角比直角小，钝角比直角大。',
                    visualizations: [
                        {
                            type: 'angle',
                            title: '直角',
                            description: '直角=90度',
                            config: { degrees: 90, type: 'right' }
                        },
                        {
                            type: 'angle',
                            title: '锐角',
                            description: '锐角<90度',
                            config: { degrees: 45, type: 'acute' }
                        },
                        {
                            type: 'angle',
                            title: '钝角',
                            description: '钝角>90度',
                            config: { degrees: 120, type: 'obtuse' }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g2-ch4',
            title: '表内乘法(一)',
            nodes: [
                {
                    id: 'g2-4-1',
                    title: '乘法的初步认识',
                    type: 'concept',
                    content: '认识乘法，理解乘法是求几个相同加数和的简便运算。比如3+3+3+3=12，可以写成3×4=12，表示4个3相加。',
                    visualizations: [
                        {
                            type: 'multiplication',
                            title: '乘法',
                            description: '4个3相加等于12',
                            config: { rows: 4, cols: 3 }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g2-4-2',
                    title: '5的乘法口诀',
                    type: 'exercise',
                    content: '学习并熟记5的乘法口诀。',
                    templateIds: ['g2-mul-5'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g2-4-3',
                    title: '2、3、4的乘法口诀',
                    type: 'exercise',
                    content: '学习并熟记2、3、4的乘法口诀。',
                    templateIds: ['g2-mul-234'],
                    difficulty: 1,
                    estimatedTime: 12
                },
                {
                    id: 'g2-4-4',
                    title: '6的乘法口诀',
                    type: 'exercise',
                    content: '学习并熟记6的乘法口诀。',
                    templateIds: ['g2-mul-6'],
                    difficulty: 1,
                    estimatedTime: 10
                }
            ]
        },
        {
            id: 'g2-ch5',
            title: '观察物体(一)',
            nodes: [
                {
                    id: 'g2-5-1',
                    title: '从不同位置观察物体',
                    type: 'concept',
                    content: '学习从不同位置观察简单物体，辨认从不同位置看到的简单物体的形状。',
                    difficulty: 1,
                    estimatedTime: 10
                }
            ]
        },
        {
            id: 'g2-ch6',
            title: '表内乘法(二)',
            nodes: [
                {
                    id: 'g2-6-1',
                    title: '7的乘法口诀',
                    type: 'exercise',
                    content: '学习并熟记7的乘法口诀。',
                    templateIds: ['g2-mul-7'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g2-6-2',
                    title: '8的乘法口诀',
                    type: 'exercise',
                    content: '学习并熟记8的乘法口诀。',
                    templateIds: ['g2-mul-8'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g2-6-3',
                    title: '9的乘法口诀',
                    type: 'exercise',
                    content: '学习并熟记9的乘法口诀。',
                    templateIds: ['g2-mul-9'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g2-6-4',
                    title: '乘法应用题',
                    type: 'exercise',
                    content: '学习用乘法解决简单的实际问题。',
                    templateIds: ['g2-mul-app'],
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g2-ch7',
            title: '认识时间',
            nodes: [
                {
                    id: 'g2-7-1',
                    title: '认识几时几分',
                    type: 'concept',
                    content: '认识几时几分，能读写几时几分。分针走1小格是1分，走1圈是60分。时针走1大格是1小时，走1圈是12小时。',
                    visualizations: [
                        {
                            type: 'clock',
                            title: '钟表',
                            description: '几时几分的表示方法',
                            config: { hour: 3, minute: 15, type: 'hour' }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g2-7-2',
                    title: '时间计算',
                    type: 'exercise',
                    content: '学习简单的时间计算。',
                    templateIds: ['g2-time-1'],
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g2-ch8',
            title: '数学广角——搭配(一)',
            nodes: [
                {
                    id: 'g2-8-1',
                    title: '简单的排列',
                    type: 'concept',
                    content: '学习简单的排列问题，理解有序思考的方法。',
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g2-8-2',
                    title: '简单的组合',
                    type: 'concept',
                    content: '学习简单的组合问题，理解组合与排列的区别。',
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        }
    ]
};
