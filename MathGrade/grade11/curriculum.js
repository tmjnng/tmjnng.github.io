// grade11/curriculum.js - 高二数学课程数据
// 人教版高中数学必修二/选修知识点

export const curriculum = {
    grade: 11,
    name: '高二数学',
    chapters: [
        {
            id: 'g11-ch1',
            title: '空间几何体',
            nodes: [
                {
                    id: 'g11-1-1',
                    title: '空间几何体的结构',
                    type: 'concept',
                    content: '认识柱、锥、台、球的结构特征。棱柱：有两个面互相平行，其余各面都是四边形，并且每相邻两个四边形的公共边都互相平行。棱锥：有一个面是多边形，其余各面都是有一个公共顶点的三角形。棱台：用一个平行于棱锥底面的平面去截棱锥，底面与截面之间的部分。球：空间中到定点的距离等于定长的所有点组成的图形。',
                    visualizations: [
                        {
                            type: '3d-shape',
                            title: '空间几何体',
                            description: '柱、锥、台、球的结构',
                            config: { shape: 'cube', size: 80 }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g11-1-2',
                    title: '空间几何体的三视图和直观图',
                    type: 'concept',
                    content: '掌握空间几何体的三视图和直观图的画法。三视图包括主视图、俯视图和左视图。主视图是从正面看到的图形，俯视图是从上面看到的图形，左视图是从左面看到的图形。三视图遵循"长对正、高平齐、宽相等"的原则。',
                    visualizations: [
                        {
                            type: '3d-shape',
                            title: '三视图',
                            description: '主视图、俯视图、左视图',
                            config: { shape: 'cube', size: 80 }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g11-1-3',
                    title: '空间几何体的表面积',
                    type: 'exercise',
                    content: '掌握柱、锥、台的表面积公式。棱柱的表面积等于侧面积加上两个底面积。圆柱的表面积S=2πr²+2πrh。棱锥的表面积等于侧面积加上底面积。圆锥的表面积S=πr²+πrl（l为母线长）。',
                    formulas: ['S圆柱 = 2πr² + 2πrh', 'S圆锥 = πr² + πrl'],
                    visualizations: [
                        {
                            type: '3d-shape',
                            title: '表面积',
                            description: '圆柱、圆锥的表面积',
                            config: { shape: 'cylinder', size: 80 }
                        }
                    ],
                    templateIds: ['g11-area-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g11-1-4',
                    title: '空间几何体的体积',
                    type: 'exercise',
                    content: '掌握柱、锥、台的体积公式。柱体（棱柱、圆柱）的体积V=Sh（S为底面积，h为高）。锥体（棱锥、圆锥）的体积V=(1/3)Sh。台体（棱台、圆台）的体积V=(1/3)(S上+S下+√(S上S下))h。球的体积V=(4/3)πr³。',
                    formulas: ['V柱 = Sh', 'V锥 = (1/3)Sh', 'V球 = (4/3)πr³'],
                    visualizations: [
                        {
                            type: '3d-shape',
                            title: '体积',
                            description: '柱、锥、球的体积',
                            config: { shape: 'sphere', size: 80 }
                        }
                    ],
                    templateIds: ['g11-volume-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g11-ch2',
            title: '点、直线、平面之间的位置关系',
            nodes: [
                {
                    id: 'g11-2-1',
                    title: '空间点、直线、平面之间的位置关系',
                    type: 'concept',
                    content: '理解空间点、直线、平面的位置关系。',
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g11-2-2',
                    title: '直线、平面平行的判定及其性质',
                    type: 'concept',
                    content: '掌握直线与平面平行的判定和性质。',
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g11-2-3',
                    title: '直线、平面垂直的判定及其性质',
                    type: 'concept',
                    content: '掌握直线与平面垂直的判定和性质。',
                    difficulty: 3,
                    estimatedTime: 18
                }
            ]
        },
        {
            id: 'g11-ch3',
            title: '直线与方程',
            nodes: [
                {
                    id: 'g11-3-1',
                    title: '直线的倾斜角与斜率',
                    type: 'concept',
                    content: '理解直线的倾斜角和斜率的概念。倾斜角：x轴正向与直线向上的方向所成的角，范围是[0,π)。斜率：倾斜角α的正切值，记作k=tanα。当倾斜角α=90°时，斜率不存在。',
                    formulas: ['k = tan α'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '直线的斜率',
                            description: '倾斜角与斜率的关系',
                            config: { equation: 'y = kx + b', points: [[-2, -2], [-1, -1], [0, 0], [1, 1], [2, 2]] }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g11-3-2',
                    title: '直线的方程',
                    type: 'exercise',
                    content: '掌握直线的点斜式、斜截式、一般式方程。点斜式：y-y₀=k(x-x₀)（已知斜率和一点）。斜截式：y=kx+b（已知斜率和y截距）。一般式：Ax+By+C=0（A、B不同时为0）。',
                    formulas: ['y - y₀ = k(x - x₀)', 'y = kx + b', 'Ax + By + C = 0'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '直线方程',
                            description: '不同形式的直线方程',
                            config: { equation: 'y = kx + b', points: [[-2, 0], [0, 2], [2, 4]] }
                        }
                    ],
                    templateIds: ['g11-line-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g11-3-3',
                    title: '直线的交点坐标与距离公式',
                    type: 'exercise',
                    content: '掌握两直线交点坐标的求法和点到直线的距离公式。两直线交点坐标：解两直线的方程组。点到直线的距离公式：点P(x₀,y₀)到直线Ax+By+C=0的距离d=|Ax₀+By₀+C|/√(A²+B²)。',
                    formulas: ['d = |Ax₀ + By₀ + C| / √(A² + B²)'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '点到直线的距离',
                            description: '距离公式的几何意义',
                            config: { equation: 'y = kx + b', points: [[-2, -2], [0, 0], [2, 2]] }
                        }
                    ],
                    templateIds: ['g11-distance-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g11-ch4',
            title: '圆与方程',
            nodes: [
                {
                    id: 'g11-4-1',
                    title: '圆的方程',
                    type: 'exercise',
                    content: '掌握圆的标准方程和一般方程。标准方程：(x-a)²+(y-b)²=r²，其中圆心为(a,b)，半径为r。一般方程：x²+y²+Dx+Ey+F=0，其中圆心为(-D/2,-E/2)，半径r=√((D/2)²+(E/2)²-F)（要求(D/2)²+(E/2)²-F>0）。',
                    formulas: ['(x-a)² + (y-b)² = r²', 'x² + y² + Dx + Ey + F = 0'],
                    visualizations: [
                        {
                            type: 'circle',
                            title: '圆的方程',
                            description: '圆心、半径与方程的关系',
                            config: { radius: 60, showCenter: true, showRadius: true }
                        }
                    ],
                    templateIds: ['g11-circle-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g11-4-2',
                    title: '直线与圆的位置关系',
                    type: 'concept',
                    content: '掌握直线与圆的位置关系的判定方法。设圆的半径为r，圆心到直线的距离为d。当d>r时，直线与圆相离；当d=r时，直线与圆相切；当d<r时，直线与圆相交。',
                    visualizations: [
                        {
                            type: 'circle',
                            title: '直线与圆的位置关系',
                            description: '相离、相切、相交',
                            config: { radius: 60, showCenter: true, showRadius: true }
                        }
                    ],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g11-ch5',
            title: '数列',
            nodes: [
                {
                    id: 'g11-5-1',
                    title: '数列的概念',
                    type: 'concept',
                    content: '理解数列的概念和表示方法。数列是按照一定顺序排列的一列数。数列中的每一个数叫做这个数列的项，排在第一位的数称为第1项（首项），排在第二位的数称为第2项，...，排在第n位的数称为第n项。数列的一般形式可以写成a₁,a₂,a₃,...,aₙ,...，简记为{aₙ}。',
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '数列',
                            description: '数列的表示',
                            config: { min: 0, max: 10, step: 1 }
                        }
                    ],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g11-5-2',
                    title: '等差数列',
                    type: 'exercise',
                    content: '掌握等差数列的通项公式和前n项和公式。等差数列：从第二项起，每一项与它的前一项的差等于同一个常数（公差d）。通项公式：aₙ=a₁+(n-1)d。前n项和公式：Sₙ=n(a₁+aₙ)/2=n/2[2a₁+(n-1)d]。',
                    formulas: ['a_n = a₁ + (n-1)d', 'S_n = n(a₁ + a_n)/2'],
                    visualizations: [
                        {
                            type: 'number-line',
                            title: '等差数列',
                            description: '等差数列的项',
                            config: { min: 0, max: 10, step: 2 }
                        }
                    ],
                    templateIds: ['g11-arith-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g11-5-3',
                    title: '等比数列',
                    type: 'exercise',
                    content: '掌握等比数列的通项公式和前n项和公式。等比数列：从第二项起，每一项与它的前一项的比等于同一个常数（公比q，q≠0）。通项公式：aₙ=a₁×q^(n-1)。前n项和公式：当q=1时，Sₙ=na₁；当q≠1时，Sₙ=a₁(1-q^n)/(1-q)。',
                    formulas: ['a_n = a₁ × q^(n-1)', 'S_n = a₁(1-q^n)/(1-q)'],
                    visualizations: [
                        {
                            type: 'graph',
                            title: '等比数列',
                            description: '等比数列的增长',
                            config: { equation: 'y = a₁q^(n-1)', points: [[1, 1], [2, 2], [3, 4], [4, 8], [5, 16]] }
                        }
                    ],
                    templateIds: ['g11-geo-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        }
    ]
};
