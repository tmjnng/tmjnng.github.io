// grade6/curriculum.js - 六年级数学课程数据
// 人教版小学数学六年级上册知识点

export const curriculum = {
    grade: 6,
    name: '六年级数学',
    chapters: [
        {
            id: 'g6-ch1',
            title: '分数乘法',
            nodes: [
                {
                    id: 'g6-1-1',
                    title: '分数乘整数',
                    type: 'exercise',
                    content: '学习分数乘整数的计算方法：分子与整数相乘，分母不变。',
                    formulas: ['\\frac{a}{b} \\times c = \\frac{a \\times c}{b}'],
                    templateIds: ['g6-frac-mul-1'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g6-1-2',
                    title: '分数乘分数',
                    type: 'exercise',
                    content: '学习分数乘分数的计算方法：分子乘分子，分母乘分母。',
                    formulas: ['\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}'],
                    templateIds: ['g6-frac-mul-2'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g6-1-3',
                    title: '分数乘法应用题',
                    type: 'exercise',
                    content: '学习用分数乘法解决实际问题，如求一个数的几分之几是多少。',
                    templateIds: ['g6-frac-app-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g6-ch2',
            title: '位置与方向(二)',
            nodes: [
                {
                    id: 'g6-2-1',
                    title: '用方向和距离确定位置',
                    type: 'concept',
                    content: '学习用方向和距离两个条件来确定物体的位置。方向用东、南、西、北及偏角表示。',
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g6-2-2',
                    title: '路线图',
                    type: 'concept',
                    content: '学习描述简单的路线图，能根据路线图说出行走的方向和距离。',
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g6-ch3',
            title: '分数除法',
            nodes: [
                {
                    id: 'g6-3-1',
                    title: '倒数的认识',
                    type: 'concept',
                    content: '认识倒数，乘积是1的两个数互为倒数。求倒数的方法：交换分子分母的位置。',
                    formulas: ['a \\times \\frac{1}{a} = 1 (a \\neq 0)'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g6-3-2',
                    title: '分数除以整数',
                    type: 'exercise',
                    content: '学习分数除以整数的计算方法：等于分数乘这个整数的倒数。',
                    formulas: ['\\frac{a}{b} \\div c = \\frac{a}{b} \\times \\frac{1}{c} = \\frac{a}{b \\times c}'],
                    templateIds: ['g6-frac-div-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g6-3-3',
                    title: '一个数除以分数',
                    type: 'exercise',
                    content: '学习一个数除以分数的计算方法：等于这个数乘分数的倒数。',
                    formulas: ['a \\div \\frac{b}{c} = a \\times \\frac{c}{b} = \\frac{a \\times c}{b}'],
                    templateIds: ['g6-frac-div-2'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g6-3-4',
                    title: '分数除法应用题',
                    type: 'exercise',
                    content: '学习用分数除法解决实际问题，如已知一个数的几分之几是多少，求这个数。',
                    templateIds: ['g6-frac-app-2'],
                    difficulty: 3,
                    estimatedTime: 18
                }
            ]
        },
        {
            id: 'g6-ch4',
            title: '比',
            nodes: [
                {
                    id: 'g6-4-1',
                    title: '比的意义',
                    type: 'concept',
                    content: '认识比，两个数相除又叫做两个数的比。比由前项、比号、后项组成。',
                    formulas: ['a : b = a \\div b = \\frac{a}{b}'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g6-4-2',
                    title: '比的基本性质',
                    type: 'concept',
                    content: '比的前项和后项同时乘或除以相同的数(0除外)，比值不变。',
                    formulas: ['a : b = (a \\times c) : (b \\times c) = (a \\div c) : (b \\div c)'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g6-4-3',
                    title: '比的应用',
                    type: 'exercise',
                    content: '学习按比分配问题的解法。',
                    templateIds: ['g6-ratio-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g6-ch5',
            title: '圆',
            nodes: [
                {
                    id: 'g6-5-1',
                    title: '圆的认识',
                    type: 'concept',
                    content: '认识圆的各部分名称：圆心、半径、直径。圆心确定圆的位置，半径确定圆的大小。',
                    formulas: ['d = 2r', 'r = \\frac{d}{2}'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g6-5-2',
                    title: '圆的周长',
                    type: 'exercise',
                    content: '学习圆的周长公式，认识圆周率π。',
                    formulas: ['C = \\pi d = 2\\pi r'],
                    templateIds: ['g6-circle-c'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g6-5-3',
                    title: '圆的面积',
                    type: 'exercise',
                    content: '学习圆的面积公式。',
                    formulas: ['S = \\pi r^2'],
                    templateIds: ['g6-circle-s'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g6-5-4',
                    title: '圆环的面积',
                    type: 'exercise',
                    content: '学习圆环面积的计算方法。',
                    formulas: ['S_{环} = \\pi (R^2 - r^2)'],
                    templateIds: ['g6-circle-ring'],
                    difficulty: 3,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g6-ch6',
            title: '百分数(一)',
            nodes: [
                {
                    id: 'g6-6-1',
                    title: '百分数的意义',
                    type: 'concept',
                    content: '认识百分数，表示一个数是另一个数的百分之几的数叫做百分数。',
                    formulas: ['\\text{百分数} = \\frac{\\text{部分}}{\\text{整体}} \\times 100\\%'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g6-6-2',
                    title: '百分数与分数、小数的互化',
                    type: 'exercise',
                    content: '学习百分数、分数、小数之间的相互转化。',
                    templateIds: ['g6-percent-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g6-6-3',
                    title: '百分数应用题',
                    type: 'exercise',
                    content: '学习用百分数解决实际问题，如求百分率、求一个数的百分之几是多少。',
                    templateIds: ['g6-percent-2', 'g6-percent-3'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g6-ch7',
            title: '扇形统计图',
            nodes: [
                {
                    id: 'g6-7-1',
                    title: '扇形统计图的认识',
                    type: 'concept',
                    content: '认识扇形统计图，用整个圆表示总数，用圆内各个扇形的大小表示各部分数量占总数的百分比。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g6-7-2',
                    title: '选择合适的统计图',
                    type: 'concept',
                    content: '了解条形统计图、折线统计图、扇形统计图各自的特点，能根据需要选择合适的统计图。',
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g6-ch8',
            title: '数学广角——数与形',
            nodes: [
                {
                    id: 'g6-8-1',
                    title: '数与形',
                    type: 'concept',
                    content: '探索数与形之间的关系，体会数形结合的思想。',
                    formulas: ['1 + 3 + 5 + \\cdots + (2n-1) = n^2'],
                    difficulty: 3,
                    estimatedTime: 15
                }
            ]
        }
    ]
};
