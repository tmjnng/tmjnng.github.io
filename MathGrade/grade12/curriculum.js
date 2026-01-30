// grade12/curriculum.js - 高三数学课程数据
// 人教版高中数学选修知识点（高考复习）

export const curriculum = {
    grade: 12,
    name: '高三数学',
    chapters: [
        {
            id: 'g12-ch1',
            title: '导数及其应用',
            nodes: [
                {
                    id: 'g12-1-1',
                    title: '变化率与导数',
                    type: 'concept',
                    content: '理解平均变化率和瞬时变化率的概念，理解导数的概念。平均变化率：函数f(x)在区间[x₁,x₂]上的平均变化率为[f(x₂)-f(x₁)]/(x₂-x₁)。瞬时变化率：当x₂趋近于x₁时，平均变化率的极限值。导数：函数y=f(x)在某点x₀处的导数记作f\'(x₀)，表示函数在该点的瞬时变化率，几何意义是曲线在该点处切线的斜率。',
                    formulas: ['f\'(x₀) = lim(Δx→0)[f(x₀+Δx)-f(x₀)]/Δx'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '导数',
                            description: '导数的几何意义',
                            config: { equation: 'y = f(x)', points: [[-2, 4], [-1, 1], [0, 0], [1, 1], [2, 4]] }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g12-1-2',
                    title: '导数的计算',
                    type: 'exercise',
                    content: '掌握基本初等函数的导数公式和导数的运算法则。基本导数公式：(x^n)\'=nx^(n-1)，(sin x)\'=cos x，(cos x)\'=-sin x，(e^x)\'=e^x，(ln x)\'=1/x。导数的四则运算法则：(u±v)\'=u\'±v\'，(uv)\'=u\'v+uv\'，(u/v)\'=(u\'v-uv\')/v²。',
                    formulas: ['(x^n)\' = nx^(n-1)', '(sin x)\' = cos x', '(cos x)\' = -sin x', '(e^x)\' = e^x', '(ln x)\' = 1/x'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '导数计算',
                            description: '函数与导函数的图像',
                            config: { equation: 'y = f(x)', points: [[-2, 4], [-1, 1], [0, 0], [1, 1], [2, 4]] }
                        }
                    ],
                    templateIds: ['g12-deriv-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g12-1-3',
                    title: '导数在研究函数中的应用',
                    type: 'exercise',
                    content: '利用导数研究函数的单调性、极值和最值。函数的单调性：当f\'(x)>0时，函数单调递增；当f\'(x)<0时，函数单调递减。函数的极值：当f\'(x₀)=0且f\'(x)在x₀左右两侧符号相反时，x₀是极值点。函数的最值：在闭区间上，函数的最值在极值点或端点处取得。',
                    visualizations: [
                        {
                            type: 'graph',
                            title: '导数的应用',
                            description: '函数的单调性、极值和最值',
                            config: { equation: 'y = f(x)', points: [[-3, 9], [-2, 4], [-1, 1], [0, 0], [1, 1], [2, 4], [3, 9]] }
                        }
                    ],
                    templateIds: ['g12-deriv-2'],
                    difficulty: 3,
                    estimatedTime: 20
                }
            ]
        },
        {
            id: 'g12-ch2',
            title: '圆锥曲线与方程',
            nodes: [
                {
                    id: 'g12-2-1',
                    title: '椭圆',
                    type: 'exercise',
                    content: '掌握椭圆的定义、标准方程和几何性质。椭圆：平面内与两个定点F₁、F₂的距离之和等于常数（大于|F₁F₂|）的点的轨迹。标准方程：x²/a²+y²/b²=1（a>b>0），其中a为长半轴，b为短半轴，c=√(a²-b²)为焦距的一半。几何性质：范围|x|≤a，|y|≤b；对称性关于x轴、y轴、原点对称；顶点(±a,0)、(0,±b)；焦点(±c,0)。',
                    formulas: ['x²/a² + y²/b² = 1 (a > b > 0)', 'c² = a² - b²'],
                    visualizations: [
                        {
                            type: 'circle',
                            title: '椭圆',
                            description: '椭圆的标准方程',
                            config: { radius: 60, showCenter: true, showRadius: true }
                        }
                    ],
                    templateIds: ['g12-ellipse-1'],
                    difficulty: 3,
                    estimatedTime: 18
                },
                {
                    id: 'g12-2-2',
                    title: '双曲线',
                    type: 'exercise',
                    content: '掌握双曲线的定义、标准方程和几何性质。双曲线：平面内与两个定点F₁、F₂的距离之差的绝对值等于常数（小于|F₁F₂|）的点的轨迹。标准方程：x²/a²-y²/b²=1，其中a为实半轴，b为虚半轴，c=√(a²+b²)为焦距的一半。几何性质：范围|x|≥a；对称性关于x轴、y轴、原点对称；顶点(±a,0)；焦点(±c,0)；渐近线y=±(b/a)x。',
                    formulas: ['x²/a² - y²/b² = 1', 'c² = a² + b²'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '双曲线',
                            description: '双曲线的标准方程',
                            config: { equation: 'x²/a² - y²/b² = 1', points: [[-3, 2.83], [-2, 1.73], [-1, 0], [1, 0], [2, 1.73], [3, 2.83]] }
                        }
                    ],
                    templateIds: ['g12-hyperbola-1'],
                    difficulty: 3,
                    estimatedTime: 18
                },
                {
                    id: 'g12-2-3',
                    title: '抛物线',
                    type: 'exercise',
                    content: '掌握抛物线的定义、标准方程和几何性质。抛物线：平面内与一个定点F和一条定直线l（F不在l上）的距离相等的点的轨迹。标准方程：y²=2px（p>0），其中p为焦准距，焦点F(p/2,0)，准线x=-p/2。几何性质：范围x≥0；对称性关于x轴对称；顶点(0,0)；离心率e=1。',
                    formulas: ['y² = 2px (p > 0)'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '抛物线',
                            description: '抛物线的标准方程',
                            config: { equation: 'y² = 2px', points: [[0, 0], [1, 1.41], [2, 2], [3, 2.45], [4, 2.83]] }
                        }
                    ],
                    templateIds: ['g12-parabola-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g12-ch3',
            title: '计数原理',
            nodes: [
                {
                    id: 'g12-3-1',
                    title: '分类加法计数原理与分步乘法计数原理',
                    type: 'concept',
                    content: '理解两个计数原理，并能应用解决简单问题。分类加法计数原理：完成一件事有两类不同方案，在第1类方案中有m₁种不同的方法，在第2类方案中有m₂种不同的方法，那么完成这件事共有N=m₁+m₂种不同的方法。分步乘法计数原理：完成一件事需要两个步骤，做第1步有m₁种不同的方法，做第2步有m₂种不同的方法，那么完成这件事共有N=m₁×m₂种不同的方法。',
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '计数原理',
                            description: '分类加法与分步乘法',
                            config: { min: 0, max: 10, step: 1 }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g12-3-2',
                    title: '排列',
                    type: 'exercise',
                    content: '理解排列的概念，掌握排列数公式。排列：从n个不同元素中取出m(m≤n)个元素，按照一定的顺序排成一列，叫做从n个不同元素中取出m个元素的一个排列。排列数公式：Aₙᵐ=n(n-1)(n-2)...(n-m+1)=n!/(n-m)!，其中n!=1×2×3×...×n。',
                    formulas: ['A_n^m = n!/(n-m)!'],
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '排列',
                            description: '排列的概念',
                            config: { min: 0, max: 5, step: 1 }
                        }
                    ],
                    templateIds: ['g12-perm-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g12-3-3',
                    title: '组合',
                    type: 'exercise',
                    content: '理解组合的概念，掌握组合数公式。组合：从n个不同元素中取出m(m≤n)个元素并成一组，叫做从n个不同元素中取出m个元素的一个组合。组合数公式：Cₙᵐ=Aₙᵐ/m!=n!/[m!(n-m)!]。组合数的性质：Cₙᵐ=Cₙⁿ⁻ᵐ，Cₙ₊₁ᵐ=Cₙᵐ+Cₙᵐ⁻¹。',
                    formulas: ['C_n^m = n!/(m!(n-m)!)'],
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '组合',
                            description: '组合的概念',
                            config: { min: 0, max: 5, step: 1 }
                        }
                    ],
                    templateIds: ['g12-comb-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g12-3-4',
                    title: '二项式定理',
                    type: 'exercise',
                    content: '掌握二项式定理，能展开二项式。二项式定理：(a+b)ⁿ=Cₙ⁰aⁿ+Cₙ¹aⁿ⁻¹b+...+Cₙᵏaⁿ⁻ᵏbᵏ+...+Cₙⁿbⁿ，其中Cₙᵏ叫做第k+1项的二项式系数。通项公式：Tₖ₊₁=Cₙᵏaⁿ⁻ᵏbᵏ。二项式系数的性质：对称性Cₙᵏ=Cₙⁿ⁻ᵏ，最大值当n为偶数时在中间一项，当n为奇数时在中间两项。',
                    formulas: ['(a+b)^n = ΣC_n^k a^(n-k)b^k'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '二项式定理',
                            description: '二项式系数的分布',
                            config: { equation: 'y = C(n,k)', points: [[0, 1], [1, 2], [2, 1]] }
                        }
                    ],
                    templateIds: ['g12-binom-1'],
                    difficulty: 3,
                    estimatedTime: 18
                }
            ]
        },
        {
            id: 'g12-ch4',
            title: '概率与统计',
            nodes: [
                {
                    id: 'g12-4-1',
                    title: '条件概率',
                    type: 'concept',
                    content: '理解条件概率的概念，掌握条件概率公式。条件概率：在事件A发生的条件下，事件B发生的概率叫做条件概率，记作P(B|A)。条件概率公式：P(B|A)=P(AB)/P(A)，其中P(A)>0。乘法公式：P(AB)=P(A)P(B|A)=P(B)P(A|B)。',
                    formulas: ['P(B|A) = P(AB)/P(A)'],
                    visualizations: [
                        {
                            type: 'circle',
                            title: '条件概率',
                            description: '条件概率的韦恩图',
                            config: { radius: 60, showCenter: false, showRadius: false }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g12-4-2',
                    title: '离散型随机变量及其分布列',
                    type: 'concept',
                    content: '理解离散型随机变量的概念，掌握分布列的求法。离散型随机变量：如果随机变量X的所有可能取值可以一一列举出来，则称X为离散型随机变量。分布列：将离散型随机变量X的所有可能取值及其对应的概率列成表格，称为X的分布列。分布列的性质：每个概率pᵢ≥0，所有概率之和等于1。',
                    visualizations: [
                        {
                            type: 'bar-chart',
                            title: '分布列',
                            description: '离散型随机变量的分布',
                            config: { data: [0.1, 0.2, 0.4, 0.2, 0.1], labels: ['1', '2', '3', '4', '5'] }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g12-4-3',
                    title: '数学期望与方差',
                    type: 'exercise',
                    content: '掌握离散型随机变量的数学期望和方差的计算。数学期望（均值）：E(X)=x₁p₁+x₂p₂+...+xₙpₙ=Σxᵢpᵢ，表示随机变量取值的平均水平。方差：D(X)=E[X-E(X)]²=E(X²)-[E(X)]²=Σ(xᵢ-E(X))²pᵢ，表示随机变量取值的离散程度。标准差：σ(X)=√D(X)。',
                    formulas: ['E(X) = Σx_i p_i', 'D(X) = E(X²) - [E(X)]²'],
                    visualizations: [
                        {
                            type: 'bar-chart',
                            title: '数学期望与方差',
                            description: '随机变量的分布与期望',
                            config: { data: [0.1, 0.2, 0.4, 0.2, 0.1], labels: ['1', '2', '3', '4', '5'] }
                        }
                    ],
                    templateIds: ['g12-expect-1'],
                    difficulty: 3,
                    estimatedTime: 18
                }
            ]
        },
        {
            id: 'g12-ch5',
            title: '高考数学综合复习',
            nodes: [
                {
                    id: 'g12-5-1',
                    title: '函数与导数综合',
                    type: 'exercise',
                    content: '函数与导数的综合应用，含参数讨论。',
                    difficulty: 4,
                    estimatedTime: 25
                },
                {
                    id: 'g12-5-2',
                    title: '解析几何综合',
                    type: 'exercise',
                    content: '圆锥曲线与直线的综合问题。',
                    difficulty: 4,
                    estimatedTime: 25
                },
                {
                    id: 'g12-5-3',
                    title: '数列综合',
                    type: 'exercise',
                    content: '等差数列与等比数列的综合应用。',
                    difficulty: 3,
                    estimatedTime: 20
                }
            ]
        }
    ]
};
