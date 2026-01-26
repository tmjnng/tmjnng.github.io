class DrawSystem {
    constructor() {
        this.participants = [];
        this.prizes = [];
        this.prizeLevels = [];
        this.winners = [];
        this.isDrawing = false;

        this.init();
    }

    init() {
        this.loadData();
        this.bindEvents();
        this.renderAll();
    }

    loadData() {
        try {
            const savedData = localStorage.getItem('drawSystemData');
            if (savedData) {
                const data = JSON.parse(savedData);
                this.participants = data.participants || [];
                this.prizes = data.prizes || [];
                this.prizeLevels = data.prizeLevels || [];
                this.winners = data.winners || [];
            } else {
                this.initDefaultData();
            }
        } catch (error) {
            console.error('加载数据失败:', error);
            this.initDefaultData();
        }
    }

    initDefaultData() {
        this.prizeLevels = [
            { id: 'level_1', name: '特等奖', color: '#FFD700', order: 1 },
            { id: 'level_2', name: '一等奖', color: '#C0C0C0', order: 2 },
            { id: 'level_3', name: '二等奖', color: '#CD7F32', order: 3 },
            { id: 'level_4', name: '三等奖', color: '#667eea', order: 4 },
            { id: 'level_5', name: '参与奖', color: '#48bb78', order: 5 }
        ];
        this.saveData();
    }

    saveData() {
        const data = {
            participants: this.participants,
            prizes: this.prizes,
            prizeLevels: this.prizeLevels,
            winners: this.winners
        };
        localStorage.setItem('drawSystemData', JSON.stringify(data));
    }

    bindEvents() {
        document.getElementById('btn-draw').addEventListener('click', () => this.startDraw());
        document.getElementById('btn-reset').addEventListener('click', () => this.resetAll());

        document.getElementById('participant-file').addEventListener('change', (e) => this.handleFileImport(e, 'participant'));
        document.getElementById('prize-file').addEventListener('change', (e) => this.handleFileImport(e, 'prize'));

        document.getElementById('draw-level').addEventListener('change', (e) => {
            this.updateDrawCountLimit(e.target.value);
        });
    }

    handleFileImport(event, type) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const ext = file.name.split('.').pop().toLowerCase();

            try {
                if (ext === 'json') {
                    const data = JSON.parse(content);
                    this.importData(data, type);
                } else if (ext === 'csv' || ext === 'txt') {
                    const data = this.parseCSV(content);
                    this.importData(data, type);
                }
                this.renderAll();
                alert('导入成功');
            } catch (error) {
                alert('导入失败：' + error.message);
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    }

    parseCSV(content) {
        const lines = content.trim().split('\n');
        const data = [];
        lines.forEach((line, index) => {
            if (index === 0) return;
            const parts = line.split(',').map(p => p.trim().replace(/^["']|["']$/g, ''));
            if (parts.length >= 1) {
                data.push({ name: parts[0], id: `item_${Date.now()}_${index}` });
            }
        });
        return data;
    }

    importData(data, type) {
        if (!Array.isArray(data)) {
            if (type === 'participant' && data.participants) {
                data = data.participants;
            } else if (type === 'prize' && data.prizes) {
                data = data.prizes;
            } else {
                throw new Error('数据格式不正确');
            }
        }

        if (type === 'participant') {
            data.forEach(item => {
                if (!this.participants.find(p => p.name === item.name)) {
                    this.participants.push({
                        id: item.id || `participant_${Date.now()}_${this.participants.length}`,
                        name: item.name,
                        phone: item.phone || '',
                        department: item.department || '',
                        createdAt: new Date().toISOString()
                    });
                }
            });
        } else if (type === 'prize') {
            data.forEach(item => {
                if (!this.prizes.find(p => p.name === item.name)) {
                    this.prizes.push({
                        id: item.id || `prize_${Date.now()}_${this.prizes.length}`,
                        name: item.name,
                        levelId: item.levelId || this.prizeLevels[0]?.id,
                        count: item.count || 1,
                        given: 0,
                        description: item.description || ''
                    });
                }
            });
        }

        this.saveData();
    }

    updateDrawCountLimit(levelId) {
        const levelPrizes = this.prizes.filter(p => p.levelId === levelId);
        const totalAvailable = levelPrizes.reduce((sum, p) => sum + (p.count - p.given), 0);
        const countInput = document.getElementById('draw-count');
        countInput.max = totalAvailable;
        if (parseInt(countInput.value) > totalAvailable) {
            countInput.value = totalAvailable;
        }
    }

    startDraw() {
        if (this.isDrawing) return;

        const levelId = document.getElementById('draw-level').value;
        const count = parseInt(document.getElementById('draw-count').value);

        if (!levelId) {
            alert('请选择奖品级别');
            return;
        }

        const levelPrizes = this.prizes.filter(p => p.levelId === levelId);
        const availablePrizes = levelPrizes.filter(p => p.count - p.given > 0);
        const availableCount = availablePrizes.reduce((sum, p) => sum + (p.count - p.given), 0);

        if (availableCount === 0) {
            alert('该级别奖品已全部送出');
            return;
        }

        const eligibleParticipants = this.participants.filter(p =>
            !this.winners.find(w => w.participantId === p.id)
        );

        if (eligibleParticipants.length === 0) {
            alert('没有可抽奖的参与者');
            return;
        }

        const actualCount = Math.min(count, availableCount, eligibleParticipants.length);
        this.isDrawing = true;
        document.getElementById('btn-draw').disabled = true;

        this.animateDraw(eligibleParticipants, availablePrizes, actualCount);
    }

    animateDraw(participants, prizes, count) {
        const display = document.getElementById('draw-display');
        let animationCount = 0;
        const totalAnimations = count * 10;
        const winners = [];

        const animate = () => {
            const randomParticipant = participants[Math.floor(Math.random() * participants.length)];
            display.innerHTML = `
                <div class="winner-display">
                    <div class="winner-info">
                        <div class="winner-name">${randomParticipant.name}</div>
                    </div>
                </div>
            `;

            animationCount++;

            if (animationCount < totalAnimations) {
                setTimeout(animate, 100);
            } else {
                for (let i = 0; i < count; i++) {
                    const remainingParticipants = participants.filter(p =>
                        !winners.find(w => w.id === p.id)
                    );

                    if (remainingParticipants.length === 0) break;

                    const winnerIndex = Math.floor(Math.random() * remainingParticipants.length);
                    const winner = remainingParticipants[winnerIndex];

                    const prizeIndex = Math.floor(Math.random() * prizes.length);
                    const prize = prizes[prizeIndex];

                    if (prize.count - prize.given > 0) {
                        const winnerRecord = {
                            id: `winner_${Date.now()}_${i}`,
                            participantId: winner.id,
                            participantName: winner.name,
                            prizeId: prize.id,
                            prizeName: prize.name,
                            levelId: prize.levelId,
                            levelName: this.getLevelName(prize.levelId),
                            wonAt: new Date().toISOString()
                        };

                        winners.push(winnerRecord);
                        this.winners.push(winnerRecord);

                        const prizeIndexInArray = this.prizes.findIndex(p => p.id === prize.id);
                        if (prizeIndexInArray !== -1) {
                            this.prizes[prizeIndexInArray].given++;
                        }
                    }
                }

                this.saveData();
                this.renderAll();
                this.showWinners(winners);
                this.isDrawing = false;
                document.getElementById('btn-draw').disabled = false;
            }
        };

        animate();
    }

    showWinners(winners) {
        const display = document.getElementById('draw-display');
        if (winners.length === 1) {
            const winner = winners[0];
            display.innerHTML = `
                <div class="winner-animation">
                    <div class="winner-info">
                        <div class="winner-name">🎉 ${winner.participantName} 🎉</div>
                        <div class="winner-prize">获得: ${winner.prizeName}</div>
                    </div>
                </div>
            `;
        } else {
            const winnerNames = winners.map(w => w.participantName).join('、');
            const prizeNames = [...new Set(winners.map(w => w.prizeName))].join('、');
            display.innerHTML = `
                <div class="winner-animation">
                    <div class="winner-info">
                        <div class="winner-name">🎉 ${winnerNames} 🎉</div>
                        <div class="winner-prize">获得: ${prizeNames}</div>
                    </div>
                </div>
            `;
        }
    }

    getLevelName(levelId) {
        const level = this.prizeLevels.find(l => l.id === levelId);
        return level ? level.name : '未知级别';
    }

    resetAll() {
        if (confirm('确定要重置所有数据吗？此操作不可撤销！')) {
            localStorage.removeItem('drawSystemData');
            this.participants = [];
            this.prizes = [];
            this.prizeLevels = [];
            this.winners = [];
            this.initDefaultData();
            this.renderAll();
        }
    }

    addParticipant() {
        const name = prompt('请输入姓名:');
        if (name && name.trim()) {
            this.participants.push({
                id: `participant_${Date.now()}`,
                name: name.trim(),
                phone: '',
                department: '',
                createdAt: new Date().toISOString()
            });
            this.saveData();
            this.renderAll();
        }
    }

    deleteParticipant(id) {
        if (confirm('确定要删除该名单吗？')) {
            this.participants = this.participants.filter(p => p.id !== id);
            this.saveData();
            this.renderAll();
        }
    }

    addPrize() {
        const name = prompt('请输入奖品名称:');
        if (name && name.trim()) {
            const levelId = document.getElementById('draw-level').value || this.prizeLevels[0]?.id;
            const count = parseInt(prompt('请输入奖品数量:', '1') || '1');

            this.prizes.push({
                id: `prize_${Date.now()}`,
                name: name.trim(),
                levelId: levelId,
                count: count,
                given: 0,
                description: ''
            });
            this.saveData();
            this.renderAll();
        }
    }

    deletePrize(id) {
        if (confirm('确定要删除该奖品吗？')) {
            this.prizes = this.prizes.filter(p => p.id !== id);
            this.saveData();
            this.renderAll();
        }
    }

    addPrizeLevel() {
        const name = prompt('请输入级别名称:');
        if (name && name.trim()) {
            this.prizes.push({
                id: `level_${Date.now()}`,
                name: name.trim(),
                color: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
                order: this.prizeLevels.length + 1
            });
            this.saveData();
            this.renderAll();
        }
    }

    deletePrizeLevel(id) {
        if (confirm('确定要删除该级别吗？相关的奖品也将被删除。')) {
            this.prizeLevels = this.prizeLevels.filter(l => l.id !== id);
            this.prizes = this.prizes.filter(p => p.levelId !== id);
            this.saveData();
            this.renderAll();
        }
    }

    exportResults() {
        const data = {
            exportTime: new Date().toISOString(),
            participants: this.participants,
            prizes: this.prizes,
            prizeLevels: this.prizeLevels,
            winners: this.winners
        };

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `抽奖结果_${new Date().toLocaleDateString()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    renderAll() {
        this.renderParticipants();
        this.renderPrizeLevels();
        this.renderPrizes();
        this.renderWinners();
        this.renderDrawLevel();
        this.updateStats();
    }

    renderParticipants() {
        const container = document.getElementById('participant-list');
        if (this.participants.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">👥</div>
                    <div class="empty-state-text">暂无名单，点击"导入名单"或"添加名单"开始</div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.participants.map(p => {
            const isWinner = this.winners.find(w => w.participantId === p.id);
            return `
                <div class="list-item ${isWinner ? 'winner' : ''}">
                    <div class="list-item-content">
                        <div class="list-item-name">${this.escapeHtml(p.name)}</div>
                        <div class="list-item-meta">${p.department || ''} ${isWinner ? '✅ 已中奖' : ''}</div>
                    </div>
                    <div class="list-item-actions">
                        <button class="list-item-btn delete" onclick="drawSystem.deleteParticipant('${p.id}')">删除</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderPrizeLevels() {
        const container = document.getElementById('prize-level-list');
        if (this.prizeLevels.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🏆</div>
                    <div class="empty-state-text">暂无奖品级别</div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.prizeLevels.map(level => `
            <div class="list-item">
                <div class="list-item-content">
                    <div class="list-item-name" style="color: ${level.color}">${this.escapeHtml(level.name)}</div>
                    <div class="list-item-meta">顺序: ${level.order}</div>
                </div>
                <div class="list-item-actions">
                    <button class="list-item-btn delete" onclick="drawSystem.deletePrizeLevel('${level.id}')">删除</button>
                </div>
            </div>
        `).join('');
    }

    renderPrizes() {
        const container = document.getElementById('prize-list');
        if (this.prizes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🎁</div>
                    <div class="empty-state-text">暂无奖品，点击"导入奖品"或"添加奖品"开始</div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.prizes.map(p => {
            const level = this.prizeLevels.find(l => l.id === p.levelId);
            const remaining = p.count - p.given;
            return `
                <div class="list-item">
                    <div class="list-item-content">
                        <div class="list-item-name">${this.escapeHtml(p.name)}</div>
                        <div class="list-item-meta">
                            ${level ? `<span style="color: ${level.color}">${level.name}</span>` : ''} |
                            剩余: ${remaining}/${p.count}
                        </div>
                    </div>
                    <div class="list-item-actions">
                        <button class="list-item-btn delete" onclick="drawSystem.deletePrize('${p.id}')">删除</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderWinners() {
        const container = document.getElementById('winner-list');
        if (this.winners.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🏅</div>
                    <div class="empty-state-text">暂无中奖记录</div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.winners.slice().reverse().map(w => `
            <div class="list-item winner">
                <div class="list-item-content">
                    <div class="list-item-name">${this.escapeHtml(w.participantName)}</div>
                    <div class="list-item-meta">${w.prizeName} | ${w.levelName}</div>
                </div>
            </div>
        `).join('');
    }

    renderDrawLevel() {
        const select = document.getElementById('draw-level');
        select.innerHTML = this.prizeLevels.map(level => {
            const prizeCount = this.prizes
                .filter(p => p.levelId === level.id)
                .reduce((sum, p) => sum + (p.count - p.given), 0);
            return `<option value="${level.id}">${this.escapeHtml(level.name)} (${prizeCount})</option>`;
        }).join('');

        this.updateDrawCountLimit(select.value);
    }

    updateStats() {
        document.getElementById('participant-count').textContent = this.participants.length;
        document.getElementById('winner-count').textContent = this.winners.length;
        document.getElementById('remaining-count').textContent = this.participants.length - this.winners.length;
        document.getElementById('prize-count').textContent = this.prizes.length;
        document.getElementById('prize-given-count').textContent = this.winners.length;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

let drawSystem;
document.addEventListener('DOMContentLoaded', () => {
    drawSystem = new DrawSystem();
    window.drawSystem = drawSystem;
});
