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
                    content: '只含有一个未知数，且未知数的最高次数是2的整式方程叫做一元二次方程。一般形式：ax² + bx + c = 0 (a≠0)。',
                    formulas: ['ax^2 + bx + c = 0 (a \\neq 0)'],
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
                    content: '学习一元二次方程根的判别式Δ = b² - 4ac，根据判别式判断方程根的情况。',
                    formulas: ['\\Delta = b^2 - 4ac'],
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
                    content: '形如y = ax² + bx + c (a≠0)的函数叫做二次函数。',
                    formulas: ['y = ax^2 + bx + c (a \\neq 0)'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g9-2-2',
                    title: '二次函数y=ax²的图象',
                    type: 'concept',
                    content: '学习二次函数y=ax²的图象特征，抛物线的开口方向、顶点、对称轴。',
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g9-2-3',
                    title: '二次函数y=a(x-h)²+k的图象',
                    type: 'concept',
                    content: '学习二次函数的顶点式，理解平移变换。',
                    formulas: ['y = a(x-h)^2 + k', '顶点坐标(h, k)'],
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
                    content: '理解二次函数与一元二次方程的关系，抛物线与x轴的交点。',
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
                    content: '认识旋转，了解旋转中心、旋转方向、旋转角的概念。',
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
                    content: '学习圆的基本性质：垂径定理、圆心角、圆周角。',
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g9-4-2',
                    title: '点和圆的位置关系',
                    type: 'concept',
                    content: '学习点与圆的位置关系：点在圆内、圆上、圆外。',
                    formulas: ['d < r：点在圆内', 'd = r：点在圆上', 'd > r：点在圆外'],
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
                    content: '学习弧长公式和扇形面积公式。',
                    formulas: ['l = \\frac{n\\pi R}{180}', 'S = \\frac{n\\pi R^2}{360} = \\frac{1}{2}lR'],
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
