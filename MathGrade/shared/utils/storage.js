// GradeStorage: 年级隔离的本地存储管理器
// 为每个年级提供独立的存储空间，避免数据冲突

export class GradeStorage {
    constructor(grade) {
        this.grade = grade;
        this.prefix = `math_g${grade}_`;
    }

    set(key, value) {
        localStorage.setItem(this.prefix + key, JSON.stringify(value));
    }

    get(key) {
        const item = localStorage.getItem(this.prefix + key);
        try {
            return JSON.parse(item);
        } catch {
            return item;
        }
    }

    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }

    // 节点掌握度
    setNodeMastery(nodeId, status) {
        const mastery = this.get('mastery') || {};
        mastery[nodeId] = { status, updatedAt: Date.now() };
        this.set('mastery', mastery);
    }

    getNodeMastery(nodeId) {
        const mastery = this.get('mastery') || {};
        return mastery[nodeId]?.status || 'new';
    }

    // 错题本
    addWrongQuestion(question) {
        const book = this.get('wrongBook') || [];
        book.push({
            ...question,
            addedAt: Date.now(),
            reviewCount: 0
        });
        this.set('wrongBook', book);
    }

    getWrongBook() {
        return this.get('wrongBook') || [];
    }

    clearWrongQuestion(index) {
        const wrongBook = this.get('wrongBook') || [];
        wrongBook.splice(index, 1);
        this.set('wrongBook', wrongBook);
    }
}

// 跨年级统计（用于总览页）
export function getAllGradesOverview() {
    const grades = [];
    for (let g = 1; g <= 12; g++) {
        const prefix = `math_g${g}_`;
        const masteryKey = Object.keys(localStorage).find(k => k.startsWith(prefix + 'mastery'));
        if (masteryKey) {
            const mastery = JSON.parse(localStorage.getItem(masteryKey) || '{}');
            const total = Object.keys(mastery).length;
            const completed = Object.values(mastery).filter(m => m.status === 'mastered').length;
            grades.push({ grade: g, total, completed, percentage: (completed/total*100).toFixed(1) });
        }
    }
    return grades;
}
