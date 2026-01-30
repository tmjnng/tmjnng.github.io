// grade1/curriculum.js - 一年级数学课程数据
// 人教版小学数学一年级上册知识点

export const curriculum = {
    grade: 1,
    name: '一年级数学',
    chapters: [
        {
            id: 'g1-ch1',
            title: '准备课',
            nodes: [
                {
                    id: 'g1-1-1',
                    title: '数一数',
                    type: 'concept',
                    content: '学习用点数的方法数出物体的个数，认识1-10的数字。数数时要按一定的顺序，一个一个地数，数到最后一个物体所对应的数，就是这种物体的总数。',
                    visualizations: [
                        {
                            type: 'number-grid',
                            title: '数字表',
                            description: '1-10的数字排列，帮助认识数字顺序',
                            config: { size: 10, highlight: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g1-1-2',
                    title: '比多少',
                    type: 'concept',
                    content: '学习比较两种物体数量的多少。可以用一一对应的方法比较，也可以用数数的方法比较。如果一种物体比另一种物体多，就说这种物体比另一种物体"多"；如果少，就说"少"。',
                    visualizations: [
                        {
                            type: 'comparison',
                            title: '数量比较',
                            description: '比较两个数字的大小关系',
                            config: { left: 5, right: 3, operator: '>' }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                }
            ]
        },
        {
            id: 'g1-ch2',
            title: '位置',
            nodes: [
                {
                    id: 'g1-2-1',
                    title: '上、下、前、后',
                    type: 'concept',
                    content: '认识上、下、前、后四个方位。上是指位置在高处，下是指位置在低处；面对的方向是前，背对的方向是后。',
                    difficulty: 1,
                    estimatedTime: 8
                },
                {
                    id: 'g1-2-2',
                    title: '左、右',
                    type: 'concept',
                    content: '认识左、右两个方位。一般以观察者的左手边为左，右手边为右。',
                    difficulty: 1,
                    estimatedTime: 8
                }
            ]
        },
        {
            id: 'g1-ch3',
            title: '1-5的认识和加减法',
            nodes: [
                {
                    id: 'g1-3-1',
                    title: '1-5的认识',
                    type: 'concept',
                    content: '认识数字1、2、3、4、5，会读、会写，理解每个数字所表示的数量意义。数字1表示一个物体，数字2表示两个物体，以此类推。',
                    visualizations: [
                        {
                            type: 'number-grid',
                            title: '数字1-5',
                            description: '认识1-5的数字及其顺序',
                            config: { size: 5, highlight: [1, 2, 3, 4, 5] }
                        },
                        {
                            type: 'ten-frame',
                            title: '十格阵',
                            description: '用十格阵表示数字1-5',
                            config: { filled: 5 }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g1-3-2',
                    title: '比大小',
                    type: 'exercise',
                    content: '学习比较5以内数的大小，认识">"、"<"、"="符号。',
                    templateIds: ['g1-compare-1'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g1-3-3',
                    title: '第几',
                    type: 'concept',
                    content: '理解"第几"的含义，区分"几个"和"第几"。几个表示数量，第几表示顺序。',
                    difficulty: 1,
                    estimatedTime: 8
                },
                {
                    id: 'g1-3-4',
                    title: '分与合',
                    type: 'concept',
                    content: '学习5以内数的分解与组成。如5可以分成1和4、2和3等。理解数的组成可以帮助我们更好地进行加减法计算。',
                    visualizations: [
                        {
                            type: 'number-bonds',
                            title: '数的分解',
                            description: '5的分解方式',
                            config: { number: 5, bonds: [[1, 4], [2, 3], [3, 2], [4, 1]] }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 12
                },
                {
                    id: 'g1-3-5',
                    title: '加法',
                    type: 'exercise',
                    content: '学习5以内的加法，理解加法的含义：把两部分合起来。',
                    templateIds: ['g1-add-1', 'g1-add-2'],
                    difficulty: 1,
                    estimatedTime: 12
                },
                {
                    id: 'g1-3-6',
                    title: '减法',
                    type: 'exercise',
                    content: '学习5以内的减法，理解减法的含义：从总数里去掉一部分。',
                    templateIds: ['g1-sub-1', 'g1-sub-2'],
                    difficulty: 1,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g1-ch4',
            title: '认识图形(一)',
            nodes: [
                {
                    id: 'g1-4-1',
                    title: '认识立体图形',
                    type: 'concept',
                    content: '认识长方体、正方体、圆柱、球四种立体图形，能辨认这些图形。长方体有6个面，都是长方形；正方体有6个面，都是正方形；圆柱有两个圆形的底面和一个侧面；球是圆圆的，可以滚动。',
                    visualizations: [
                        {
                            type: '3d-shape',
                            title: '立体图形',
                            description: '常见的立体图形示例',
                            config: { shape: 'cube', size: 100 }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g1-4-2',
                    title: '图形的拼搭',
                    type: 'concept',
                    content: '用立体图形进行拼搭，感受不同图形的特征。',
                    difficulty: 1,
                    estimatedTime: 8
                }
            ]
        },
        {
            id: 'g1-ch5',
            title: '6-10的认识和加减法',
            nodes: [
                {
                    id: 'g1-5-1',
                    title: '6和7的认识',
                    type: 'concept',
                    content: '认识数字6和7，会读、会写，理解数的顺序和大小。6比5大1，7比6大1。6和7都可以用实物来表示，如6个苹果、7只小鸟等。',
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '数轴',
                            description: '在数轴上表示6和7的位置',
                            config: { min: 0, max: 10, highlight: [6, 7] }
                        },
                        {
                            type: 'ten-frame',
                            title: '十格阵',
                            description: '用十格阵表示6和7',
                            config: { filled: 7 }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g1-5-2',
                    title: '6和7的加减法',
                    type: 'exercise',
                    content: '学习6和7的加减法计算。',
                    templateIds: ['g1-add-3', 'g1-sub-3'],
                    difficulty: 1,
                    estimatedTime: 12
                },
                {
                    id: 'g1-5-3',
                    title: '8和9的认识',
                    type: 'concept',
                    content: '认识数字8和9，会读、会写，理解数的顺序和大小。8比7大1，9比8大1。8和9也可以用实物来表示，如8朵花、9只小猫等。',
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '数轴',
                            description: '在数轴上表示8和9的位置',
                            config: { min: 0, max: 10, highlight: [8, 9] }
                        },
                        {
                            type: 'ten-frame',
                            title: '十格阵',
                            description: '用十格阵表示8和9',
                            config: { filled: 9 }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g1-5-4',
                    title: '8和9的加减法',
                    type: 'exercise',
                    content: '学习8和9的加减法计算。',
                    templateIds: ['g1-add-4', 'g1-sub-4'],
                    difficulty: 1,
                    estimatedTime: 12
                },
                {
                    id: 'g1-5-5',
                    title: '10的认识',
                    type: 'concept',
                    content: '认识数字10，理解10是由1个十组成的。10是最小的两位数，也是我们日常生活中常用的数字，比如10个手指、10个脚趾。',
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '数轴',
                            description: '在数轴上表示10的位置',
                            config: { min: 0, max: 10, highlight: [10] }
                        },
                        {
                            type: 'ten-frame',
                            title: '十格阵',
                            description: '用十格阵表示10',
                            config: { filled: 10 }
                        },
                        {
                            type: 'base-ten-blocks',
                            title: '位值表示',
                            description: '用积木块表示10',
                            config: { hundreds: 0, tens: 1, ones: 0 }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g1-5-6',
                    title: '10的加减法',
                    type: 'exercise',
                    content: '学习10的加减法计算。',
                    templateIds: ['g1-add-5', 'g1-sub-5'],
                    difficulty: 1,
                    estimatedTime: 12
                },
                {
                    id: 'g1-5-7',
                    title: '连加连减',
                    type: 'exercise',
                    content: '学习连加、连减的计算方法，按从左到右的顺序计算。',
                    templateIds: ['g1-mixed-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g1-ch6',
            title: '11-20各数的认识',
            nodes: [
                {
                    id: 'g1-6-1',
                    title: '数数、读数',
                    type: 'concept',
                    content: '认识11-20各数，理解这些数的组成（1个十和几个一）。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g1-6-2',
                    title: '写数',
                    type: 'concept',
                    content: '学习11-20各数的写法。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g1-6-3',
                    title: '10加几和相应的减法',
                    type: 'exercise',
                    content: '学习10加几和十几减几、十几减10的计算。',
                    templateIds: ['g1-add-6', 'g1-sub-6'],
                    difficulty: 1,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g1-ch7',
            title: '认识钟表',
            nodes: [
                {
                    id: 'g1-7-1',
                    title: '认识整时',
                    type: 'concept',
                    content: '认识钟面，学会看整时。整时时，分针指向12，时针指向几就是几时。比如分针指向12，时针指向3，就是3时。',
                    visualizations: [
                        {
                            type: 'clock',
                            title: '钟表',
                            description: '整时的表示方法',
                            config: { hour: 3, minute: 0, type: 'hour' }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g1-7-2',
                    title: '认识半时',
                    type: 'concept',
                    content: '学会看半时。半时时，分针指向6，时针走过几就是几时半。比如分针指向6，时针在3和4之间，就是3时半。',
                    visualizations: [
                        {
                            type: 'clock',
                            title: '钟表',
                            description: '半时的表示方法',
                            config: { hour: 3, minute: 30, type: 'hour' }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g1-ch8',
            title: '20以内的进位加法',
            nodes: [
                {
                    id: 'g1-8-1',
                    title: '9加几',
                    type: 'exercise',
                    content: '学习9加几的进位加法，使用"凑十法"计算。',
                    templateIds: ['g1-carry-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g1-8-2',
                    title: '8、7、6加几',
                    type: 'exercise',
                    content: '学习8、7、6加几的进位加法。',
                    templateIds: ['g1-carry-2'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g1-8-3',
                    title: '5、4、3、2加几',
                    type: 'exercise',
                    content: '学习5、4、3、2加几的进位加法。',
                    templateIds: ['g1-carry-3'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        }
    ]
};
