// CanvasBoard: 草稿板组件
// 支持绘画、橡皮擦、保存PNG等功能

export class CanvasBoard {
    constructor({ container, triggerButton }) {
        this.container = container;
        this.triggerButton = triggerButton;
        this.isDrawing = false;
        this.ctx = null;
        this.canvas = null;
        this.init();
    }

    init() {
        // 创建canvas元素
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#000';

        this.container.appendChild(this.canvas);

        // 工具栏
        this.toolbar = document.createElement('div');
        this.toolbar.className = 'canvas-toolbar';
        this.toolbar.innerHTML = `
            <button data-color="#000">⚫</button>
            <button data-color="#e74c3c">🔴</button>
            <button data-color="#3498db">🔵</button>
            <button data-tool="eraser">🧼</button>
            <button data-action="clear">🗑️</button>
            <button data-action="save">💾</button>
            <button data-action="close">❌</button>
        `;
        this.container.appendChild(this.toolbar);

        // 事件绑定
        this.bindEvents();

        // 触发按钮
        this.triggerButton.addEventListener('click', () => this.show());

        // 窗口大小变化时调整canvas
        window.addEventListener('resize', () => {
            if (!this.container.classList.contains('hidden')) {
                this.resizeCanvas();
            }
        });
    }

    bindEvents() {
        // 绘画事件
        const startDraw = (e) => {
            this.isDrawing = true;
            const { x, y } = this.getPos(e);
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
        };

        const draw = (e) => {
            if (!this.isDrawing) return;
            const { x, y } = this.getPos(e);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        };

        const endDraw = () => {
            this.isDrawing = false;
        };

        this.canvas.addEventListener('pointerdown', startDraw);
        this.canvas.addEventListener('pointermove', draw);
        this.canvas.addEventListener('pointerup', endDraw);
        this.canvas.addEventListener('pointerleave', endDraw);

        // 工具栏事件
        this.toolbar.addEventListener('click', (e) => {
            if (e.target.dataset.color) {
                this.ctx.strokeStyle = e.target.dataset.color;
                this.ctx.globalCompositeOperation = 'source-over';
                this.ctx.lineWidth = 3;
            } else if (e.target.dataset.tool === 'eraser') {
                this.ctx.globalCompositeOperation = 'destination-out';
                this.ctx.lineWidth = 20;
            } else if (e.target.dataset.action === 'clear') {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            } else if (e.target.dataset.action === 'save') {
                const link = document.createElement('a');
                link.download = '草稿.png';
                link.href = this.canvas.toDataURL();
                link.click();
            } else if (e.target.dataset.action === 'close') {
                this.hide();
            }
        });
    }

    getPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    resizeCanvas() {
        // 保存当前内容
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        tempCtx.drawImage(this.canvas, 0, 0);

        // 调整大小
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // 恢复内容
        this.ctx.drawImage(tempCanvas, 0, 0);
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    }

    show() {
        this.container.classList.remove('hidden');
        this.resizeCanvas();
    }

    hide() {
        this.container.classList.add('hidden');
    }
}
