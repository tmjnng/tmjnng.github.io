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
                    content: '认识柱、锥、台、球的结构特征。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g11-1-2',
                    title: '空间几何体的三视图和直观图',
                    type: 'concept',
                    content: '掌握空间几何体的三视图和直观图的画法。',
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g11-1-3',
                    title: '空间几何体的表面积',
                    type: 'exercise',
                    content: '掌握柱、锥、台的表面积公式。',
                    templateIds: ['g11-area-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g11-1-4',
                    title: '空间几何体的体积',
                    type: 'exercise',
                    content: '掌握柱、锥、台的体积公式。',
                    formulas: ['V柱 = Sh', 'V锥 = (1/3)Sh'],
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
                    content: '理解直线的倾斜角和斜率的概念。',
                    formulas: ['k = tan α'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g11-3-2',
                    title: '直线的方程',
                    type: 'exercise',
                    content: '掌握直线的点斜式、斜截式、一般式方程。',
                    templateIds: ['g11-line-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g11-3-3',
                    title: '直线的交点坐标与距离公式',
                    type: 'exercise',
                    content: '掌握两直线交点坐标的求法和点到直线的距离公式。',
                    formulas: ['d = |Ax₀ + By₀ + C| / √(A² + B²)'],
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
                    content: '掌握圆的标准方程和一般方程。',
                    formulas: ['(x-a)² + (y-b)² = r²'],
                    templateIds: ['g11-circle-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g11-4-2',
                    title: '直线与圆的位置关系',
                    type: 'concept',
                    content: '掌握直线与圆的位置关系的判定方法。',
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
                    content: '理解数列的概念和表示方法。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g11-5-2',
                    title: '等差数列',
                    type: 'exercise',
                    content: '掌握等差数列的通项公式和前n项和公式。',
                    formulas: ['a_n = a₁ + (n-1)d', 'S_n = n(a₁ + a_n)/2'],
                    templateIds: ['g11-arith-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g11-5-3',
                    title: '等比数列',
                    type: 'exercise',
                    content: '掌握等比数列的通项公式和前n项和公式。',
                    formulas: ['a_n = a₁ × q^(n-1)'],
                    templateIds: ['g11-geo-1'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        }
    ]
};
