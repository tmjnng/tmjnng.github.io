// ProgressTracker: 进度追踪器
// 自动按年级隔离存储学习进度

export class ProgressTracker {
    constructor(grade) {
        this.grade = grade;
        this.prefix = `math_g${grade}_`;
    }

    set(key, value) {
        localStorage.setItem(this.prefix + key, JSON.stringify(value));
    }

    get(key) {
        const item = localStorage.getItem(this.prefix + key);
        return item ? JSON.parse(item) : null;
    }

    /**
     * 设置节点掌握度
     * @param {string} nodeId - 节点ID
     * @param {string} status - 状态：'mastered' | 'learning' | 'struggling' | null
     */
    setNodeMastery(nodeId, status) {
        const mastery = this.get('mastery') || {};
        mastery[nodeId] = {
            status,
            timestamp: Date.now()
        };
        this.set('mastery', mastery);
    }

    /**
     * 获取节点掌握度
     * @param {string} nodeId - 节点ID
     * @returns {string} 状态字符串
     */
    getNodeMastery(nodeId) {
        const mastery = this.get('mastery') || {};
        return mastery[nodeId]?.status || 'new';
    }

    /**
     * 添加错题
     * @param {object} questionData - 题目数据
     */
    addWrongQuestion(questionData) {
        const wrongBook = this.get('wrongBook') || [];
        wrongBook.push({
            ...questionData,
            timestamp: Date.now(),
            reviewCount: 0
        });
        this.set('wrongBook', wrongBook);
    }

    /**
     * 获取错题本
     * @returns {array} 错题列表
     */
    getWrongBook() {
        return this.get('wrongBook') || [];
    }

    /**
     * 清除错题
     * @param {number} index - 错题索引
     */
    clearWrongQuestion(index) {
        const wrongBook = this.get('wrongBook') || [];
        wrongBook.splice(index, 1);
        this.set('wrongBook', wrongBook);
    }

    /**
     * 获取整体进度
     * @param {object} curriculum - 课程数据
     * @returns {object} 进度统计
     */
    getOverallProgress(curriculum) {
        const mastery = this.get('mastery') || {};
        let total = 0;
        let completed = 0;
        let learning = 0;
        let struggling = 0;

        curriculum.chapters.forEach(ch => {
            ch.nodes.forEach(node => {
                total++;
                const status = mastery[node.id]?.status;
                if (status === 'mastered') completed++;
                else if (status === 'learning') learning++;
                else if (status === 'struggling') struggling++;
            });
        });

        return { 
            total, 
            completed, 
            learning,
            struggling,
            percentage: total ? (completed / total * 100).toFixed(1) : 0 
        };
    }

    /**
     * 获取学习时长统计
     * @returns {object} 学习时长数据
     */
    getStudyTime() {
        return this.get('studyTime') || { total: 0, daily: {} };
    }

    /**
     * 记录学习时长
     * @param {number} minutes - 学习分钟数
     */
    addStudyTime(minutes) {
        const studyTime = this.getStudyTime();
        studyTime.total += minutes;
        
        const today = new Date().toISOString().split('T')[0];
        studyTime.daily[today] = (studyTime.daily[today] || 0) + minutes;
        
        this.set('studyTime', studyTime);
    }

    /**
     * 获取连续学习天数
     * @returns {number} 连续天数
     */
    getStreak() {
        const studyTime = this.getStudyTime();
        const daily = studyTime.daily || {};
        
        const dates = Object.keys(daily).sort().reverse();
        if (dates.length === 0) return 0;
        
        let streak = 0;
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        
        // 检查今天或昨天是否有学习记录
        if (!daily[today] && !daily[yesterday]) return 0;
        
        let checkDate = daily[today] ? today : yesterday;
        
        for (const date of dates) {
            if (date === checkDate) {
                streak++;
                // 计算前一天
                const d = new Date(checkDate);
                d.setDate(d.getDate() - 1);
                checkDate = d.toISOString().split('T')[0];
            } else if (date < checkDate) {
                break;
            }
        }
        
        return streak;
    }
}
