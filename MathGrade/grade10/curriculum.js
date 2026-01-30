// grade10/curriculum.js - 高一数学课程数据
// 人教版高中数学必修一知识点

export const curriculum = {
    grade: 10,
    name: '高一数学',
    chapters: [
        {
            id: 'g10-ch1',
            title: '集合与函数概念',
            nodes: [
                {
                    id: 'g10-1-1',
                    title: '集合的含义与表示',
                    type: 'concept',
                    content: '理解集合的含义，掌握集合的表示方法。集合是指具有某种特定性质的对象的总体，这些对象称为集合的元素。集合的表示方法有列举法、描述法和图示法（韦恩图）。集合中的元素具有确定性、互异性和无序性。',
                    visualizations: [
                        {
                            type: 'circle',
                            title: '集合',
                            description: '用韦恩图表示集合',
                            config: { radius: 60, showCenter: false, showRadius: false }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g10-1-2',
                    title: '集合间的基本关系',
                    type: 'concept',
                    content: '理解子集、真子集、集合相等的概念。如果集合A的任意一个元素都是集合B的元素，则称A是B的子集，记作A⊆B。如果A⊆B且A≠B，则称A是B的真子集，记作A⊂B。如果A⊆B且B⊆A，则A=B。',
                    visualizations: [
                        {
                            type: 'circle',
                            title: '子集关系',
                            description: 'A是B的子集',
                            config: { radius: 60, showCenter: false, showRadius: false }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g10-1-3',
                    title: '集合的基本运算',
                    type: 'exercise',
                    content: '掌握交集、并集、补集的运算。交集A∩B是由所有属于A且属于B的元素组成的集合；并集A∪B是由所有属于A或属于B的元素组成的集合；补集∁UA是由全集U中所有不属于A的元素组成的集合。',
                    formulas: ['A ∩ B = {x|x∈A且x∈B}', 'A ∪ B = {x|x∈A或x∈B}'],
                    visualizations: [
                        {
                            type: 'circle',
                            title: '集合运算',
                            description: '交集、并集的韦恩图',
                            config: { radius: 60, showCenter: false, showRadius: false }
                        }
                    ],
                    templateIds: ['g10-set-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g10-1-4',
                    title: '函数的概念',
                    type: 'concept',
                    content: '理解函数的概念，掌握函数的表示方法。函数是一种特殊的对应关系，对于集合A中的每一个元素x，在集合B中都有唯一确定的元素y与之对应，记作y=f(x)。其中x叫做自变量，x的取值范围叫做定义域，y的取值范围叫做值域。',
                    formulas: ['y = f(x)'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '函数',
                            description: '函数的图像表示',
                            config: { equation: 'y = f(x)', points: [[-2, 4], [-1, 1], [0, 0], [1, 1], [2, 4]] }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g10-1-5',
                    title: '函数的单调性',
                    type: 'concept',
                    content: '理解函数单调性的概念，会判断函数的单调性。对于函数f(x)，如果对于定义域内的任意x₁<x₂，都有f(x₁)<f(x₂)，则称f(x)在该区间上单调递增；如果都有f(x₁)>f(x₂)，则称f(x)在该区间上单调递减。',
                    visualizations: [
                        {
                            type: 'graph',
                            title: '函数的单调性',
                            description: '单调递增和单调递减',
                            config: { equation: 'y = x²', points: [[-3, 9], [-2, 4], [-1, 1], [0, 0], [1, 1], [2, 4], [3, 9]] }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g10-ch2',
            title: '基本初等函数',
            nodes: [
                {
                    id: 'g10-2-1',
                    title: '指数与指数幂的运算',
                    type: 'exercise',
                    content: '掌握指数幂的运算性质。正整数指数幂：a^n = a×a×...×a（n个a相乘）。零指数幂：a^0 = 1（a≠0）。负整数指数幂：a^(-n) = 1/a^n（a≠0）。分数指数幂：a^(m/n) = ⁿ√a^m（a>0）。',
                    formulas: ['a^m × a^n = a^(m+n)', '(a^m)^n = a^(mn)', '(ab)^n = a^n b^n'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '指数函数',
                            description: '指数幂的增长趋势',
                            config: { equation: 'y = a^x', points: [[-2, 0.25], [-1, 0.5], [0, 1], [1, 2], [2, 4]] }
                        }
                    ],
                    templateIds: ['g10-exp-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g10-2-2',
                    title: '指数函数及其性质',
                    type: 'concept',
                    content: '理解指数函数的概念和性质。指数函数y=a^x（a>0且a≠1）的定义域是R，值域是(0,+∞)。当a>1时，函数在R上单调递增；当0<a<1时，函数在R上单调递减。图像恒过点(0,1)。',
                    formulas: ['y = a^x (a > 0, a ≠ 1)'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '指数函数',
                            description: 'a>1和0<a<1的图像对比',
                            config: { equation: 'y = a^x', points: [[-2, 0.25], [-1, 0.5], [0, 1], [1, 2], [2, 4]] }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g10-2-3',
                    title: '对数与对数运算',
                    type: 'exercise',
                    content: '理解对数的概念，掌握对数的运算性质。如果a^x = N（a>0且a≠1），则x叫做以a为底N的对数，记作x = log_a N。对数恒等式：a^(log_a N) = N。换底公式：log_a b = log_c b / log_c a。',
                    formulas: ['log_a(MN) = log_a M + log_a N', 'log_a(M/N) = log_a M - log_a N', 'log_a M^n = n log_a M'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '对数函数',
                            description: '对数函数的图像',
                            config: { equation: 'y = log_a x', points: [[0.25, -2], [0.5, -1], [1, 0], [2, 1], [4, 2]] }
                        }
                    ],
                    templateIds: ['g10-log-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g10-2-4',
                    title: '对数函数及其性质',
                    type: 'concept',
                    content: '理解对数函数的概念和性质。对数函数y=log_a x（a>0且a≠1）的定义域是(0,+∞)，值域是R。当a>1时，函数在(0,+∞)上单调递增；当0<a<1时，函数在(0,+∞)上单调递减。图像恒过点(1,0)。',
                    formulas: ['y = log_a x (a > 0, a ≠ 1)'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '对数函数',
                            description: 'a>1和0<a<1的图像对比',
                            config: { equation: 'y = log_a x', points: [[0.25, -2], [0.5, -1], [1, 0], [2, 1], [4, 2]] }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g10-2-5',
                    title: '幂函数',
                    type: 'concept',
                    content: '理解幂函数的概念和性质。幂函数y=x^a（a是常数）的定义域取决于a的值。常见的幂函数有y=x（a=1）、y=x²（a=2）、y=x³（a=3）、y=1/x（a=-1）、y=√x（a=1/2）等。',
                    formulas: ['y = x^a'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '幂函数',
                            description: '不同指数的幂函数图像',
                            config: { equation: 'y = x^a', points: [[-2, 4], [-1, 1], [0, 0], [1, 1], [2, 4]] }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g10-ch3',
            title: '函数的应用',
            nodes: [
                {
                    id: 'g10-3-1',
                    title: '方程的根与函数的零点',
                    type: 'concept',
                    content: '理解函数零点的概念，掌握零点存在性定理。函数y=f(x)的零点就是方程f(x)=0的实数根，也是函数y=f(x)的图像与x轴交点的横坐标。零点存在性定理：如果函数y=f(x)在区间[a,b]上的图像是连续不断的一条曲线，并且有f(a)·f(b)<0，那么函数y=f(x)在区间(a,b)内有零点。',
                    visualizations: [
                        {
                            type: 'graph',
                            title: '函数零点',
                            description: '函数图像与x轴的交点',
                            config: { equation: 'y = f(x)', points: [[-2, 2], [-1, -1], [0, 0], [1, -1], [2, 2]] }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g10-3-2',
                    title: '用二分法求方程的近似解',
                    type: 'exercise',
                    content: '掌握用二分法求方程近似解的方法。',
                    templateIds: ['g10-bisect-1'],
                    difficulty: 3,
                    estimatedTime: 15
                }
            ]
        }
    ]
};
