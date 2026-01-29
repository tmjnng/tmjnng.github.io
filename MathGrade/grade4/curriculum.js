// grade4/curriculum.js - 四年级数学课程数据
// 人教版小学数学四年级上册知识点

export const curriculum = {
    grade: 4,
    name: '四年级数学',
    chapters: [
        {
            id: 'g4-ch1',
            title: '大数的认识',
            nodes: [
                {
                    id: 'g4-1-1',
                    title: '亿以内数的认识',
                    type: 'concept',
                    content: '认识亿以内的数，理解数位、数级的概念。',
                    difficulty: 1,
                    estimatedTime: 12
                },
                {
                    id: 'g4-1-2',
                    title: '数的读法和写法',
                    type: 'exercise',
                    content: '学习亿以内数的读法和写法。',
                    templateIds: ['g4-read-1'],
                    difficulty: 1,
                    estimatedTime: 12
                },
                {
                    id: 'g4-1-3',
                    title: '数的大小比较',
                    type: 'exercise',
                    content: '学习比较亿以内数的大小。',
                    templateIds: ['g4-compare-1'],
                    difficulty: 1,
                    estimatedTime: 10
                }
            ]
        },
        {
            id: 'g4-ch2',
            title: '公顷和平方千米',
            nodes: [
                {
                    id: 'g4-2-1',
                    title: '认识公顷',
                    type: 'concept',
                    content: '认识面积单位公顷，知道1公顷=10000平方米。',
                    formulas: ['1公顷 = 10000平方米'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g4-2-2',
                    title: '认识平方千米',
                    type: 'concept',
                    content: '认识面积单位平方千米，知道1平方千米=100公顷。',
                    formulas: ['1平方千米 = 100公顷 = 1000000平方米'],
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g4-ch3',
            title: '角的度量',
            nodes: [
                {
                    id: 'g4-3-1',
                    title: '线段、直线、射线',
                    type: 'concept',
                    content: '认识线段、直线、射线的特征，理解它们的区别。',
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g4-3-2',
                    title: '角的度量',
                    type: 'concept',
                    content: '学习用量角器量角，认识角的度量单位"度"。',
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g4-3-3',
                    title: '角的分类',
                    type: 'concept',
                    content: '认识锐角、直角、钝角、平角、周角。',
                    formulas: ['直角 = 90°', '平角 = 180°', '周角 = 360°'],
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g4-ch4',
            title: '三位数乘两位数',
            nodes: [
                {
                    id: 'g4-4-1',
                    title: '笔算乘法',
                    type: 'exercise',
                    content: '学习三位数乘两位数的笔算方法。',
                    templateIds: ['g4-mul-1'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g4-4-2',
                    title: '因数中间或末尾有0的乘法',
                    type: 'exercise',
                    content: '学习因数中间或末尾有0的乘法简便算法。',
                    templateIds: ['g4-mul-2'],
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g4-4-3',
                    title: '积的变化规律',
                    type: 'concept',
                    content: '探索积的变化规律。',
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g4-ch5',
            title: '平行四边形和梯形',
            nodes: [
                {
                    id: 'g4-5-1',
                    title: '平行与垂直',
                    type: 'concept',
                    content: '认识平行线和垂线，学习画平行线和垂线。',
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g4-5-2',
                    title: '平行四边形',
                    type: 'concept',
                    content: '认识平行四边形，了解其特征。',
                    difficulty: 2,
                    estimatedTime: 10
                },
                {
                    id: 'g4-5-3',
                    title: '梯形',
                    type: 'concept',
                    content: '认识梯形，了解等腰梯形和直角梯形。',
                    difficulty: 2,
                    estimatedTime: 10
                }
            ]
        },
        {
            id: 'g4-ch6',
            title: '除数是两位数的除法',
            nodes: [
                {
                    id: 'g4-6-1',
                    title: '口算除法',
                    type: 'exercise',
                    content: '学习除数是整十数的口算除法。',
                    templateIds: ['g4-div-1'],
                    difficulty: 1,
                    estimatedTime: 10
                },
                {
                    id: 'g4-6-2',
                    title: '笔算除法',
                    type: 'exercise',
                    content: '学习除数是两位数的笔算除法。',
                    templateIds: ['g4-div-2'],
                    difficulty: 2,
                    estimatedTime: 15
                },
                {
                    id: 'g4-6-3',
                    title: '商的变化规律',
                    type: 'concept',
                    content: '探索商的变化规律。',
                    difficulty: 2,
                    estimatedTime: 12
                }
            ]
        },
        {
            id: 'g4-ch7',
            title: '条形统计图',
            nodes: [
                {
                    id: 'g4-7-1',
                    title: '认识条形统计图',
                    type: 'concept',
                    content: '认识条形统计图，了解其特点和作用。',
                    difficulty: 1,
                    estimatedTime: 10
                }
            ]
        },
        {
            id: 'g4-ch8',
            title: '数学广角——优化',
            nodes: [
                {
                    id: 'g4-8-1',
                    title: '沏茶问题',
                    type: 'concept',
                    content: '学习合理安排时间的方法，理解优化思想。',
                    difficulty: 2,
                    estimatedTime: 12
                },
                {
                    id: 'g4-8-2',
                    title: '烙饼问题',
                    type: 'concept',
                    content: '学习烙饼问题的最优解法。',
                    difficulty: 3,
                    estimatedTime: 15
                }
            ]
        }
    ]
};
