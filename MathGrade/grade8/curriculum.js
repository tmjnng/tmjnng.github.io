// grade8/curriculum.js - 八年级数学课程数据
// 人教版初中数学八年级上册知识点

export const curriculum = {
    grade: 8,
    name: '八年级数学',
    chapters: [
        {
            id: 'g8-ch1',
            title: '三角形',
            nodes: [
                {
                    id: 'g8-1-1',
                    title: '三角形的边',
                    type: 'concept',
                    content: '认识三角形，理解三角形三边关系。',
                    formulas: ['两边之和 > 第三边', '两边之差 < 第三边'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g8-1-2',
                    title: '三角形的高、中线与角平分线',
                    type: 'concept',
                    content: '理解三角形的高、中线、角平分线的概念。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g8-1-3',
                    title: '三角形的内角',
                    type: 'concept',
                    content: '掌握三角形内角和定理。',
                    formulas: ['三角形内角和 = 180°'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g8-1-4',
                    title: '三角形的外角',
                    type: 'concept',
                    content: '理解三角形外角的性质。',
                    formulas: ['外角 = 不相邻两内角之和'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g8-1-5',
                    title: '多边形的内角和',
                    type: 'exercise',
                    content: '掌握多边形内角和公式。',
                    formulas: ['内角和 = (n-2) × 180°'],
                    templateIds: ['g8-polygon-1'],
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g8-ch2',
            title: '全等三角形',
            nodes: [
                {
                    id: 'g8-2-1',
                    title: '全等三角形',
                    type: 'concept',
                    content: '理解全等三角形的概念和性质。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g8-2-2',
                    title: '三角形全等的判定(一)',
                    type: 'concept',
                    content: '掌握"边边边"(SSS)和"边角边"(SAS)判定方法。',
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g8-2-3',
                    title: '三角形全等的判定(二)',
                    type: 'concept',
                    content: '掌握"角边角"(ASA)和"角角边"(AAS)判定方法。',
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g8-2-4',
                    title: '直角三角形全等的判定',
                    type: 'concept',
                    content: '掌握直角三角形全等的"斜边、直角边"(HL)判定方法。',
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g8-ch3',
            title: '轴对称',
            nodes: [
                {
                    id: 'g8-3-1',
                    title: '轴对称',
                    type: 'concept',
                    content: '认识轴对称图形，理解轴对称的性质。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g8-3-2',
                    title: '线段的垂直平分线',
                    type: 'concept',
                    content: '理解线段垂直平分线的性质和判定。',
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g8-3-3',
                    title: '等腰三角形',
                    type: 'concept',
                    content: '掌握等腰三角形的性质和判定。',
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        },
        {
            id: 'g8-ch4',
            title: '整式的乘法与因式分解',
            nodes: [
                {
                    id: 'g8-4-1',
                    title: '同底数幂的乘法',
                    type: 'exercise',
                    content: '掌握同底数幂的乘法法则。',
                    formulas: ['a^m × a^n = a^(m+n)'],
                    templateIds: ['g8-power-1'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g8-4-2',
                    title: '幂的乘方',
                    type: 'exercise',
                    content: '掌握幂的乘方法则。',
                    formulas: ['(a^m)^n = a^(mn)'],
                    templateIds: ['g8-power-2'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g8-4-3',
                    title: '积的乘方',
                    type: 'exercise',
                    content: '掌握积的乘方法则。',
                    formulas: ['(ab)^n = a^n × b^n'],
                    templateIds: ['g8-power-3'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g8-4-4',
                    title: '整式的乘法',
                    type: 'exercise',
                    content: '掌握单项式乘单项式、单项式乘多项式、多项式乘多项式。',
                    templateIds: ['g8-mul-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g8-4-5',
                    title: '平方差公式',
                    type: 'exercise',
                    content: '掌握平方差公式。',
                    formulas: ['(a+b)(a-b) = a² - b²'],
                    templateIds: ['g8-formula-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g8-4-6',
                    title: '完全平方公式',
                    type: 'exercise',
                    content: '掌握完全平方公式。',
                    formulas: ['(a±b)² = a² ± 2ab + b²'],
                    templateIds: ['g8-formula-2'],
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g8-ch5',
            title: '分式',
            nodes: [
                {
                    id: 'g8-5-1',
                    title: '分式',
                    type: 'concept',
                    content: '理解分式的概念，掌握分式有意义的条件。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g8-5-2',
                    title: '分式的基本性质',
                    type: 'concept',
                    content: '掌握分式的基本性质，会进行约分和通分。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g8-5-3',
                    title: '分式的乘除',
                    type: 'exercise',
                    content: '掌握分式的乘除运算。',
                    templateIds: ['g8-frac-1'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g8-5-4',
                    title: '分式的加减',
                    type: 'exercise',
                    content: '掌握分式的加减运算。',
                    templateIds: ['g8-frac-2'],
                    difficulty: 2,
                    estimatedTime: 15
                }
            ]
        }
    ]
};
