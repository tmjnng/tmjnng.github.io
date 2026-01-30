// grade9/curriculum.js - 九年级数学课程数据
// 人教版初中数学九年级上册知识点

export const curriculum = {
    grade: 9,
    name: '九年级数学',
    chapters: [
        {
            id: 'g9-ch1',
            title: '一元二次方程',
            nodes: [
                {
                    id: 'g9-1-1',
                    title: '一元二次方程的概念',
                    type: 'concept',
                    content: '只含有一个未知数，且未知数的最高次数是2的整式方程叫做一元二次方程。一般形式：ax² + bx + c = 0 (a≠0)，其中a是二次项系数，b是一次项系数，c是常数项。',
                    formulas: ['ax^2 + bx + c = 0 (a \\neq 0)'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '一元二次方程',
                            description: '一元二次方程的图像是抛物线',
                            config: { equation: 'y = x² - 2x - 3', points: [[-2, 5], [-1, 0], [0, -3], [1, -4], [2, -3], [3, 0], [4, 5]] }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g9-1-2',
                    title: '直接开平方法',
                    type: 'exercise',
                    content: '学习用直接开平方法解形如x² = p或(mx + n)² = p的一元二次方程。',
                    templateIds: ['g9-quad-1'],
                    difficulty: 1,
                    estimatedTime: 12
                },
                {
                    id: 'g9-1-3',
                    title: '配方法',
                    type: 'exercise',
                    content: '学习用配方法解一元二次方程。',
                    templateIds: ['g9-quad-2'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g9-1-4',
                    title: '公式法',
                    type: 'exercise',
                    content: '学习用求根公式解一元二次方程。',
                    formulas: ['x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'],
                    templateIds: ['g9-quad-3'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g9-1-5',
                    title: '因式分解法',
                    type: 'exercise',
                    content: '学习用因式分解法解一元二次方程。',
                    templateIds: ['g9-quad-4'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g9-1-6',
                    title: '根的判别式',
                    type: 'concept',
                    content: '学习一元二次方程根的判别式Δ = b² - 4ac，根据判别式判断方程根的情况。当Δ>0时，方程有两个不相等的实数根；当Δ=0时，方程有两个相等的实数根；当Δ<0时，方程没有实数根。',
                    formulas: ['\\Delta = b^2 - 4ac'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '根的判别式',
                            description: '判别式与抛物线位置关系',
                            config: { equation: 'y = ax² + bx + c', points: [[-1, 0], [0, 1], [1, 0]] }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g9-ch2',
            title: '二次函数',
            nodes: [
                {
                    id: 'g9-2-1',
                    title: '二次函数的概念',
                    type: 'concept',
                    content: '形如y = ax² + bx + c (a≠0)的函数叫做二次函数。二次函数的图像是一条抛物线。当a>0时，抛物线开口向上；当a<0时，抛物线开口向下。',
                    formulas: ['y = ax^2 + bx + c (a \\neq 0)'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '二次函数',
                            description: '二次函数的图像是抛物线',
                            config: { equation: 'y = x²', points: [[-3, 9], [-2, 4], [-1, 1], [0, 0], [1, 1], [2, 4], [3, 9]] }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g9-2-2',
                    title: '二次函数y=ax²的图象',
                    type: 'concept',
                    content: '学习二次函数y=ax²的图象特征，抛物线的开口方向、顶点、对称轴。顶点在原点(0,0)，对称轴是y轴。|a|越大，开口越小；|a|越小，开口越大。',
                    visualizations: [
                        {
                            type: 'graph',
                            title: '二次函数y=ax²',
                            description: '抛物线的开口方向和大小',
                            config: { equation: 'y = ax²', points: [[-2, 4], [-1, 1], [0, 0], [1, 1], [2, 4]] }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g9-2-3',
                    title: '二次函数y=a(x-h)²+k的图象',
                    type: 'concept',
                    content: '学习二次函数的顶点式，理解平移变换。y=a(x-h)²+k的顶点坐标是(h,k)，对称轴是x=h。h决定左右平移，k决定上下平移。',
                    formulas: ['y = a(x-h)^2 + k', '顶点坐标(h, k)'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '二次函数顶点式',
                            description: '抛物线的平移变换',
                            config: { equation: 'y = (x-1)² + 2', points: [[-1, 6], [0, 3], [1, 2], [2, 3], [3, 6]] }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g9-2-4',
                    title: '二次函数y=ax²+bx+c的图象',
                    type: 'exercise',
                    content: '学习用配方法将一般式化为顶点式，求顶点坐标和对称轴。',
                    formulas: ['x = -\\frac{b}{2a}', 'y = \\frac{4ac - b^2}{4a}'],
                    templateIds: ['g9-quad-func-1'],
                    difficulty: 3,
                    estimatedTime: 18
                },
                {
                    id: 'g9-2-5',
                    title: '二次函数与一元二次方程',
                    type: 'concept',
                    content: '理解二次函数与一元二次方程的关系，抛物线与x轴的交点。二次函数y=ax²+bx+c的图像与x轴的交点的横坐标就是一元二次方程ax²+bx+c=0的根。',
                    visualizations: [
                        {
                            type: 'graph',
                            title: '二次函数与一元二次方程',
                            description: '抛物线与x轴的交点',
                            config: { equation: 'y = x² - 4', points: [[-3, 5], [-2, 0], [-1, -3], [0, -4], [1, -3], [2, 0], [3, 5]] }
                        }
                    ],
                    difficulty: 3,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g9-ch3',
            title: '旋转',
            nodes: [
                {
                    id: 'g9-3-1',
                    title: '图形的旋转',
                    type: 'concept',
                    content: '认识旋转，了解旋转中心、旋转方向、旋转角的概念。旋转是图形绕某一点转动一定角度的运动，旋转不改变图形的形状和大小，只改变位置。',
                    visualizations: [
                        {
                            type: 'geometry-shape',
                            title: '旋转',
                            description: '图形的旋转示例',
                            config: { shape: 'triangle', size: 80, label: '旋转' }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g9-3-2',
                    title: '中心对称',
                    type: 'concept',
                    content: '认识中心对称，了解中心对称图形的性质。',
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g9-3-3',
                    title: '关于原点对称的点的坐标',
                    type: 'exercise',
                    content: '学习关于原点对称的点的坐标特征。',
                    formulas: ['P(x, y)关于原点对称的点P\'(-x, -y)'],
                    templateIds: ['g9-rotate-1'],
                    difficulty: 2,
                    estimatedTime: 10
                }
            ]
        },
        {
            id: 'g9-ch4',
            title: '圆',
            nodes: [
                {
                    id: 'g9-4-1',
                    title: '圆的有关性质',
                    type: 'concept',
                    content: '学习圆的基本性质：垂径定理、圆心角、圆周角。垂径定理：垂直于弦的直径平分这条弦，并且平分弦所对的两条弧。圆心角定理：在同圆或等圆中，相等的圆心角所对的弧相等，所对的弦也相等。',
                    visualizations: [
                        {
                            type: 'circle',
                            title: '圆',
                            description: '圆的基本性质',
                            config: { radius: 60, showCenter: true, showRadius: true }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g9-4-2',
                    title: '点和圆的位置关系',
                    type: 'concept',
                    content: '学习点与圆的位置关系：点在圆内、圆上、圆外。设圆的半径为r，点到圆心的距离为d，则：d<r时，点在圆内；d=r时，点在圆上；d>r时，点在圆外。',
                    formulas: ['d < r：点在圆内', 'd = r：点在圆上', 'd > r：点在圆外'],
                    visualizations: [
                        {
                            type: 'circle',
                            title: '点和圆的位置关系',
                            description: '点在圆内、圆上、圆外',
                            config: { radius: 60, showCenter: true, showRadius: true }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g9-4-3',
                    title: '直线和圆的位置关系',
                    type: 'concept',
                    content: '学习直线与圆的位置关系：相交、相切、相离。',
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g9-4-4',
                    title: '切线的判定与性质',
                    type: 'concept',
                    content: '学习切线的判定定理和性质定理。',
                    difficulty: 3,
                    estimatedTime: 15
                },
                {
                    id: 'g9-4-5',
                    title: '弧长和扇形面积',
                    type: 'exercise',
                    content: '学习弧长公式和扇形面积公式。弧长公式：l = nπR/180，其中n是圆心角的度数，R是半径。扇形面积公式：S = nπR²/360 = lR/2，其中l是弧长，R是半径。',
                    formulas: ['l = \\frac{n\\pi R}{180}', 'S = \\frac{n\\pi R^2}{360} = \\frac{1}{2}lR'],
                    visualizations: [
                        {
                            type: 'circle',
                            title: '扇形',
                            description: '扇形的弧长和面积',
                            config: { radius: 60, showCenter: true, showRadius: true }
                        }
                    ],
                    templateIds: ['g9-circle-1', 'g9-circle-2'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g9-ch5',
            title: '概率初步',
            nodes: [
                {
                    id: 'g9-5-1',
                    title: '随机事件',
                    type: 'concept',
                    content: '认识必然事件、不可能事件、随机事件。',
                    difficulty: 1,
                    estimatedTime: 8
                },
                {
                    id: 'g9-5-2',
                    title: '概率',
                    type: 'concept',
                    content: '学习概率的定义，理解概率的取值范围。',
                    formulas: ['P(A) = \\frac{m}{n}'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g9-5-3',
                    title: '用列举法求概率',
                    type: 'exercise',
                    content: '学习用列表法和树状图法求概率。',
                    templateIds: ['g9-prob-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        }
    ]
};
