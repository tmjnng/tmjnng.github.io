// ConceptVisualizer: 知识点图示渲染组件
// 使用SVG/Canvas渲染数学概念的图示

export class ConceptVisualizer {
    constructor() {
        this.svgNS = 'http://www.w3.org/2000/svg';
    }

    render(container, type, config = {}) {
        container.innerHTML = '';
        
        const visualizers = {
            'number-line': () => this.renderNumberLine(container, config),
            'fraction': () => this.renderFraction(container, config),
            'clock': () => this.renderClock(container, config),
            'geometry-shape': () => this.renderGeometryShape(container, config),
            'place-value': () => this.renderPlaceValue(container, config),
            'comparison': () => this.renderComparison(container, config),
            'circle': () => this.renderCircle(container, config),
            'rectangle': () => this.renderRectangle(container, config),
            'triangle': () => this.renderTriangle(container, config),
            'multiplication': () => this.renderMultiplication(container, config),
            'division': () => this.renderDivision(container, config),
            'angle': () => this.renderAngle(container, config),
            'coordinate': () => this.renderCoordinate(container, config),
            'bar-chart': () => this.renderBarChart(container, config),
            'pie-chart': () => this.renderPieChart(container, config),
            'number-bonds': () => this.renderNumberBonds(container, config),
            'ten-frame': () => this.renderTenFrame(container, config),
            'base-ten-blocks': () => this.renderBaseTenBlocks(container, config),
            'number-grid': () => this.renderNumberGrid(container, config),
            '3d-shape': () => this.render3DShape(container, config),
            'pattern': () => this.renderPattern(container, config),
            'graph': () => this.renderGraph(container, config),
            'number-line-fraction': () => this.renderNumberLineFraction(container, config)
        };

        if (visualizers[type]) {
            return visualizers[type]();
        }

        return null;
    }

    renderNumberLine(container, config) {
        const { min = 0, max = 10, highlight = [], step = 1 } = config;
        
        const svg = this.createSVG(600, 100);
        const startX = 50;
        const endX = 550;
        const y = 50;
        const totalSteps = (max - min) / step;
        const stepWidth = (endX - startX) / totalSteps;

        const line = this.createLine(startX, y, endX, y, '#333', 3);
        svg.appendChild(line);

        const arrow = this.createPolygon([
            [endX, y], [endX - 10, y - 5], [endX - 10, y + 5]
        ], '#333');
        svg.appendChild(arrow);

        for (let i = 0; i <= totalSteps; i++) {
            const x = startX + i * stepWidth;
            const value = min + i * step;
            
            const tick = this.createLine(x, y - 8, x, y + 8, '#333', 2);
            svg.appendChild(tick);

            const text = this.createText(x, y + 25, value.toString(), '#333', 'middle');
            svg.appendChild(text);

            if (highlight.includes(value)) {
                const circle = this.createCircle(x, y, 8, '#4CAF50', '#4CAF50');
                svg.insertBefore(circle, tick);
            }
        }

        container.appendChild(svg);
        return svg;
    }

    renderFraction(container, config) {
        const { numerator = 1, denominator = 4, type = 'circle' } = config;
        
        const svg = this.createSVG(200, 200);
        const cx = 100;
        const cy = 100;
        const radius = 80;

        if (type === 'circle') {
            const angleStep = (2 * Math.PI) / denominator;
            
            for (let i = 0; i < denominator; i++) {
                const startAngle = i * angleStep - Math.PI / 2;
                const endAngle = (i + 1) * angleStep - Math.PI / 2;
                
                const path = this.createArcPath(cx, cy, radius, startAngle, endAngle);
                const isFilled = i < numerator;
                
                path.setAttribute('fill', isFilled ? '#4CAF50' : '#E0E0E0');
                path.setAttribute('stroke', '#333');
                path.setAttribute('stroke-width', '2');
                
                svg.appendChild(path);
            }
        } else if (type === 'rectangle') {
            const width = 160;
            const height = 80;
            const x = (200 - width) / 2;
            const y = (200 - height) / 2;
            const partWidth = width / denominator;

            for (let i = 0; i < denominator; i++) {
                const rect = this.createRect(
                    x + i * partWidth, y, partWidth, height,
                    i < numerator ? '#4CAF50' : '#E0E0E0',
                    '#333', 2
                );
                svg.appendChild(rect);
            }
        }

        container.appendChild(svg);
        return svg;
    }

    renderClock(container, config) {
        const { hour = 3, minute = 0, type = 'hour' } = config;
        
        const svg = this.createSVG(200, 200);
        const cx = 100;
        const cy = 100;
        const radius = 90;

        const circle = this.createCircle(cx, cy, radius, '#FFF', '#333', 3);
        svg.appendChild(circle);

        for (let i = 1; i <= 12; i++) {
            const angle = (i * 30 - 90) * Math.PI / 180;
            const x1 = cx + (radius - 15) * Math.cos(angle);
            const y1 = cy + (radius - 15) * Math.sin(angle);
            const x2 = cx + (radius - 5) * Math.cos(angle);
            const y2 = cy + (radius - 5) * Math.sin(angle);
            
            const tick = this.createLine(x1, y1, x2, y2, '#333', 2);
            svg.appendChild(tick);

            const textX = cx + (radius - 25) * Math.cos(angle);
            const textY = cy + (radius - 25) * Math.sin(angle);
            const text = this.createText(textX, textY, i.toString(), '#333', 'middle');
            svg.appendChild(text);
        }

        const hourAngle = ((hour % 12) * 30 + minute * 0.5 - 90) * Math.PI / 180;
        const hourHand = this.createLine(
            cx, cy,
            cx + 50 * Math.cos(hourAngle),
            cy + 50 * Math.sin(hourAngle),
            '#333', 4
        );
        svg.appendChild(hourHand);

        const minuteAngle = (minute * 6 - 90) * Math.PI / 180;
        const minuteHand = this.createLine(
            cx, cy,
            cx + 70 * Math.cos(minuteAngle),
            cy + 70 * Math.sin(minuteAngle),
            '#666', 3
        );
        svg.appendChild(minuteHand);

        const centerDot = this.createCircle(cx, cy, 5, '#333');
        svg.appendChild(centerDot);

        container.appendChild(svg);
        return svg;
    }

    renderGeometryShape(container, config) {
        const { shape = 'square', size = 100, label = '' } = config;
        
        const svg = this.createSVG(200, 200);
        const cx = 100;
        const cy = 100;
        const halfSize = size / 2;

        let element;
        const colors = {
            'square': '#4CAF50',
            'rectangle': '#2196F3',
            'triangle': '#FF9800',
            'circle': '#9C27B0'
        };

        switch (shape) {
            case 'square':
                element = this.createRect(
                    cx - halfSize, cy - halfSize, size, size,
                    colors[shape], '#333', 2
                );
                break;
            case 'rectangle':
                element = this.createRect(
                    cx - size, cy - halfSize / 2, size * 2, halfSize,
                    colors[shape], '#333', 2
                );
                break;
            case 'triangle':
                const points = [
                    [cx, cy - halfSize],
                    [cx - halfSize, cy + halfSize / 2],
                    [cx + halfSize, cy + halfSize / 2]
                ];
                element = this.createPolygon(points, colors[shape], '#333', 2);
                break;
            case 'circle':
                element = this.createCircle(cx, cy, halfSize, colors[shape], '#333', 2);
                break;
        }

        svg.appendChild(element);

        if (label) {
            const text = this.createText(cx, cy + size / 2 + 20, label, '#333', 'middle');
            svg.appendChild(text);
        }

        container.appendChild(svg);
        return svg;
    }

    renderPlaceValue(container, config) {
        const { number = 123, showLabels = true } = config;
        
        const svg = this.createSVG(400, 150);
        const digits = number.toString().split('');
        const startX = 50;
        const step = 100;

        const placeNames = ['', '', '十', '百', '千', '万', '十万', '百万', '千万', '亿'];

        digits.forEach((digit, index) => {
            const x = startX + (digits.length - 1 - index) * step;
            const y = 50;
            const placeIndex = digits.length - index;

            const rect = this.createRect(x, y, 80, 80, '#E3F2FD', '#2196F3', 2);
            svg.appendChild(rect);

            const digitText = this.createText(x + 40, y + 50, digit, '#333', 'middle', '48px');
            svg.appendChild(digitText);

            if (showLabels) {
                const labelText = this.createText(x + 40, y + 100, placeNames[placeIndex] || '', '#666', 'middle', '14px');
                svg.appendChild(labelText);
            }
        });

        container.appendChild(svg);
        return svg;
    }

    renderComparison(container, config) {
        const { left = 5, right = 3, operator = '>' } = config;
        
        const svg = this.createSVG(300, 150);
        const y = 75;

        const leftCircle = this.createCircle(60, y, 40, '#4CAF50', '#333', 2);
        svg.appendChild(leftCircle);

        const leftText = this.createText(60, y + 5, left.toString(), '#FFF', 'middle', '32px');
        svg.appendChild(leftText);

        const operatorText = this.createText(150, y + 5, operator, '#333', 'middle', '48px');
        svg.appendChild(operatorText);

        const rightCircle = this.createCircle(240, y, 40, '#FF9800', '#333', 2);
        svg.appendChild(rightCircle);

        const rightText = this.createText(240, y + 5, right.toString(), '#FFF', 'middle', '32px');
        svg.appendChild(rightText);

        container.appendChild(svg);
        return svg;
    }

    renderCircle(container, config) {
        const { radius = 5, showParts = ['radius', 'diameter', 'center'] } = config;
        
        const svg = this.createSVG(300, 300);
        const cx = 150;
        const cy = 150;
        const r = 100;

        const circle = this.createCircle(cx, cy, r, '#E3F2FD', '#2196F3', 2);
        svg.appendChild(circle);

        if (showParts.includes('center')) {
            const centerDot = this.createCircle(cx, cy, 5, '#F44336');
            svg.appendChild(centerDot);
            const centerLabel = this.createText(cx, cy + 20, 'O', '#F44336', 'middle');
            svg.appendChild(centerLabel);
        }

        if (showParts.includes('radius')) {
            const radiusLine = this.createLine(cx, cy, cx + r, cy, '#4CAF50', 2);
            svg.appendChild(radiusLine);
            const radiusLabel = this.createText(cx + r / 2, cy - 10, 'r', '#4CAF50', 'middle');
            svg.appendChild(radiusLabel);
        }

        if (showParts.includes('diameter')) {
            const diameterLine = this.createLine(cx - r, cy, cx + r, cy, '#FF9800', 2);
            svg.appendChild(diameterLine);
            const diameterLabel = this.createText(cx, cy - 15, 'd', '#FF9800', 'middle');
            svg.appendChild(diameterLabel);
        }

        container.appendChild(svg);
        return svg;
    }

    renderRectangle(container, config) {
        const { width = 8, height = 4, showLabels = true } = config;
        
        const svg = this.createSVG(400, 250);
        const scale = 20;
        const w = width * scale;
        const h = height * scale;
        const x = (400 - w) / 2;
        const y = (250 - h) / 2;

        const rect = this.createRect(x, y, w, h, '#E3F2FD', '#2196F3', 2);
        svg.appendChild(rect);

        if (showLabels) {
            const widthLabel = this.createText(x + w / 2, y - 10, `长 = ${width}`, '#333', 'middle');
            svg.appendChild(widthLabel);

            const heightLabel = this.createText(x - 10, y + h / 2, `宽 = ${height}`, '#333', 'middle');
            svg.appendChild(heightLabel);

            const perimeterText = this.createText(x + w / 2, y + h + 25, `周长 = (${width} + ${height}) × 2 = ${(width + height) * 2}`, '#333', 'middle');
            svg.appendChild(perimeterText);

            const areaText = this.createText(x + w / 2, y + h + 45, `面积 = ${width} × ${height} = ${width * height}`, '#333', 'middle');
            svg.appendChild(areaText);
        }

        container.appendChild(svg);
        return svg;
    }

    renderTriangle(container, config) {
        const { type = 'equilateral', side = 100 } = config;
        
        const svg = this.createSVG(250, 250);
        const cx = 125;
        const cy = 180;

        let points;
        switch (type) {
            case 'equilateral':
                const h = side * Math.sqrt(3) / 2;
                points = [
                    [cx, cy - h],
                    [cx - side / 2, cy],
                    [cx + side / 2, cy]
                ];
                break;
            case 'right':
                points = [
                    [cx - side / 2, cy - side],
                    [cx - side / 2, cy],
                    [cx + side / 2, cy]
                ];
                break;
            default:
                points = [
                    [cx, cy - side],
                    [cx - side / 2, cy],
                    [cx + side / 2, cy]
                ];
        }

        const triangle = this.createPolygon(points, '#FF9800', '#333', 2);
        svg.appendChild(triangle);

        const label = this.createText(cx, cy + 20, type, '#333', 'middle');
        svg.appendChild(label);

        container.appendChild(svg);
        return svg;
    }

    renderMultiplication(container, config) {
        const { rows = 3, cols = 4 } = config;
        
        const svg = this.createSVG(300, 200);
        const startX = 50;
        const startY = 30;
        const cellSize = 40;
        const gap = 5;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x = startX + j * (cellSize + gap);
                const y = startY + i * (cellSize + gap);
                const circle = this.createCircle(x + cellSize / 2, y + cellSize / 2, cellSize / 2 - 2, '#4CAF50', '#333', 1);
                svg.appendChild(circle);
            }
        }

        const formula = this.createText(150, 170, `${rows} × ${cols} = ${rows * cols}`, '#333', 'middle', '24px');
        svg.appendChild(formula);

        container.appendChild(svg);
        return svg;
    }

    renderDivision(container, config) {
        const { total = 12, groups = 3 } = config;
        
        const svg = this.createSVG(400, 200);
        const perGroup = total / groups;
        const startX = 30;
        const startY = 30;
        const circleSize = 20;
        const groupGap = 120;
        const itemGap = 25;

        for (let g = 0; g < groups; g++) {
            const groupX = startX + g * groupGap;
            
            for (let i = 0; i < perGroup; i++) {
                const x = groupX + (i % 4) * itemGap;
                const y = startY + Math.floor(i / 4) * itemGap;
                const circle = this.createCircle(x, y, circleSize / 2, '#2196F3', '#333', 1);
                svg.appendChild(circle);
            }

            const bracket = this.createBracket(groupX - 5, startY - 5, perGroup, circleSize, itemGap);
            svg.appendChild(bracket);
        }

        const formula = this.createText(200, 170, `${total} ÷ ${groups} = ${perGroup}`, '#333', 'middle', '24px');
        svg.appendChild(formula);

        container.appendChild(svg);
        return svg;
    }

    renderAngle(container, config) {
        const { degrees = 90, type = 'right' } = config;
        
        const svg = this.createSVG(250, 250);
        const cx = 125;
        const cy = 200;
        const length = 150;

        const horizontal = this.createLine(cx, cy, cx + length, cy, '#333', 2);
        svg.appendChild(horizontal);

        const radians = degrees * Math.PI / 180;
        const endX = cx + length * Math.cos(-radians);
        const endY = cy + length * Math.sin(-radians);
        const angled = this.createLine(cx, cy, endX, endY, '#333', 2);
        svg.appendChild(angled);

        const arcRadius = 40;
        const arc = this.createArcPath(cx, cy, arcRadius, 0, -radians);
        arc.setAttribute('fill', 'none');
        arc.setAttribute('stroke', '#4CAF50');
        arc.setAttribute('stroke-width', '2');
        svg.appendChild(arc);

        const label = this.createText(cx + 60, cy - 30, `${degrees}°`, '#4CAF50', 'middle');
        svg.appendChild(label);

        container.appendChild(svg);
        return svg;
    }

    renderCoordinate(container, config) {
        const { points = [[1, 2], [3, 4]] } = config;
        
        const svg = this.createSVG(300, 300);
        const cx = 150;
        const cy = 150;
        const scale = 30;

        const xAxis = this.createLine(20, cy, 280, cy, '#333', 2);
        svg.appendChild(xAxis);

        const yAxis = this.createLine(cx, 280, cx, 20, '#333', 2);
        svg.appendChild(yAxis);

        const xArrow = this.createPolygon([[280, cy], [270, cy - 5], [270, cy + 5]], '#333');
        svg.appendChild(xArrow);

        const yArrow = this.createPolygon([[cx, 20], [cx - 5, 30], [cx + 5, 30]], '#333');
        svg.appendChild(yArrow);

        points.forEach(([x, y]) => {
            const px = cx + x * scale;
            const py = cy - y * scale;
            const point = this.createCircle(px, py, 6, '#F44336');
            svg.appendChild(point);
            const label = this.createText(px + 10, py - 10, `(${x},${y})`, '#F44336', 'middle', '12px');
            svg.appendChild(label);
        });

        container.appendChild(svg);
        return svg;
    }

    renderBarChart(container, config) {
        const { data = [10, 20, 15, 25], labels = ['A', 'B', 'C', 'D'] } = config;
        
        const svg = this.createSVG(400, 250);
        const margin = { top: 20, right: 20, bottom: 40, left: 50 };
        const width = 400 - margin.left - margin.right;
        const height = 250 - margin.top - margin.bottom;
        const maxValue = Math.max(...data);
        const barWidth = width / data.length - 20;

        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * height;
            const x = margin.left + index * (width / data.length) + 10;
            const y = margin.top + height - barHeight;

            const bar = this.createRect(x, y, barWidth, barHeight, '#4CAF50', '#333', 1);
            svg.appendChild(bar);

            const valueLabel = this.createText(x + barWidth / 2, y - 5, value.toString(), '#333', 'middle');
            svg.appendChild(valueLabel);

            const categoryLabel = this.createText(x + barWidth / 2, margin.top + height + 20, labels[index], '#333', 'middle');
            svg.appendChild(categoryLabel);
        });

        container.appendChild(svg);
        return svg;
    }

    renderPieChart(container, config) {
        const { data = [30, 50, 20], labels = ['A', 'B', 'C'], colors = ['#4CAF50', '#2196F3', '#FF9800'] } = config;
        
        const svg = this.createSVG(300, 300);
        const cx = 150;
        const cy = 150;
        const radius = 100;
        const total = data.reduce((sum, val) => sum + val, 0);

        let currentAngle = 0;
        data.forEach((value, index) => {
            const angle = (value / total) * 2 * Math.PI;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;

            const path = this.createArcPath(cx, cy, radius, startAngle, endAngle);
            path.setAttribute('fill', colors[index % colors.length]);
            path.setAttribute('stroke', '#FFF');
            path.setAttribute('stroke-width', '2');
            svg.appendChild(path);

            const midAngle = startAngle + angle / 2;
            const labelX = cx + (radius * 0.6) * Math.cos(midAngle);
            const labelY = cy + (radius * 0.6) * Math.sin(midAngle);
            const label = this.createText(labelX, labelY, `${labels[index]}\n${((value / total) * 100).toFixed(0)}%`, '#FFF', 'middle', '12px');
            svg.appendChild(label);

            currentAngle = endAngle;
        });

        container.appendChild(svg);
        return svg;
    }

    renderNumberBonds(container, config) {
        const { number = 10, bonds = [[3, 7], [5, 5], [8, 2]] } = config;
        
        const svg = this.createSVG(400, 300);
        const centerX = 200;
        const centerY = 80;
        const radius = 35;

        const centerCircle = this.createCircle(centerX, centerY, radius, '#4CAF50', '#333', 3);
        svg.appendChild(centerCircle);

        const centerText = this.createText(centerX, centerY + 5, number.toString(), '#FFF', 'middle', '32px');
        svg.appendChild(centerText);

        bonds.forEach(([a, b], index) => {
            const angle = (index + 1) * (2 * Math.PI / (bonds.length + 1));
            const x = centerX + 150 * Math.cos(angle);
            const y = centerY + 150 * Math.sin(angle);

            const line = this.createLine(centerX, centerY, x, y, '#999', 2);
            svg.insertBefore(line, centerCircle);

            const circle = this.createCircle(x, y, radius, '#2196F3', '#333', 2);
            svg.appendChild(circle);

            const text = this.createText(x, y + 5, `${a}+${b}`, '#FFF', 'middle', '16px');
            svg.appendChild(text);
        });

        container.appendChild(svg);
        return svg;
    }

    renderTenFrame(container, config) {
        const { filled = 6 } = config;
        
        const svg = this.createSVG(250, 120);
        const startX = 25;
        const startY = 25;
        const cellSize = 40;
        const gap = 5;

        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 5; col++) {
                const index = row * 5 + col;
                const x = startX + col * (cellSize + gap);
                const y = startY + row * (cellSize + gap);
                
                const rect = this.createRect(x, y, cellSize, cellSize, index < filled ? '#4CAF50' : '#E0E0E0', '#333', 2);
                svg.appendChild(rect);
            }
        }

        const label = this.createText(125, 105, `${filled} / 10`, '#333', 'middle');
        svg.appendChild(label);

        container.appendChild(svg);
        return svg;
    }

    renderBaseTenBlocks(container, config) {
        const { hundreds = 1, tens = 2, ones = 5 } = config;
        
        const svg = this.createSVG(400, 200);
        let currentX = 20;
        const y = 50;

        for (let i = 0; i < hundreds; i++) {
            const block = this.createRect(currentX, y, 80, 80, '#4CAF50', '#333', 2);
            svg.appendChild(block);
            
            for (let row = 0; row < 10; row++) {
                for (let col = 0; col < 10; col++) {
                    const dot = this.createCircle(currentX + 8 + col * 7, y + 8 + row * 7, 2, '#FFF');
                    svg.appendChild(dot);
                }
            }
            currentX += 90;
        }

        for (let i = 0; i < tens; i++) {
            const block = this.createRect(currentX, y, 20, 80, '#2196F3', '#333', 2);
            svg.appendChild(block);
            
            for (let row = 0; row < 10; row++) {
                const dot = this.createCircle(currentX + 10, y + 8 + row * 7, 2, '#FFF');
                svg.appendChild(dot);
            }
            currentX += 30;
        }

        for (let i = 0; i < ones; i++) {
            const block = this.createRect(currentX, y, 20, 20, '#FF9800', '#333', 2);
            svg.appendChild(block);
            const dot = this.createCircle(currentX + 10, y + 10, 4, '#FFF');
            svg.appendChild(dot);
            currentX += 30;
        }

        const total = hundreds * 100 + tens * 10 + ones;
        const label = this.createText(200, 160, `= ${total}`, '#333', 'middle', '24px');
        svg.appendChild(label);

        container.appendChild(svg);
        return svg;
    }

    renderNumberGrid(container, config) {
        const { size = 10, highlight = [] } = config;
        
        const svg = this.createSVG(350, 350);
        const startX = 25;
        const startY = 25;
        const cellSize = 30;
        const gap = 2;

        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                const number = row * size + col + 1;
                const x = startX + col * (cellSize + gap);
                const y = startY + row * (cellSize + gap);
                
                const isHighlighted = highlight.includes(number);
                const rect = this.createRect(x, y, cellSize, cellSize, isHighlighted ? '#4CAF50' : '#E0E0E0', '#333', 1);
                svg.appendChild(rect);

                const text = this.createText(x + cellSize / 2, y + cellSize / 2 + 3, number.toString(), isHighlighted ? '#FFF' : '#333', 'middle', '14px');
                svg.appendChild(text);
            }
        }

        container.appendChild(svg);
        return svg;
    }

    render3DShape(container, config) {
        const { shape = 'cube', size = 100 } = config;
        
        const svg = this.createSVG(300, 300);
        const cx = 150;
        const cy = 150;
        const halfSize = size / 2;

        const frontFace = this.createRect(cx - halfSize, cy - halfSize / 2, size, halfSize, '#4CAF50', '#333', 2);
        svg.appendChild(frontFace);

        const topFace = this.createPolygon([
            [cx - halfSize, cy - halfSize / 2],
            [cx, cy - size],
            [cx + halfSize, cy - halfSize / 2],
            [cx, cy]
        ], '#81C784', '#333', 2);
        svg.appendChild(topFace);

        const sideFace = this.createPolygon([
            [cx + halfSize, cy - halfSize / 2],
            [cx + halfSize, cy + halfSize / 2],
            [cx, cy + size],
            [cx, cy]
        ], '#2E7D32', '#333', 2);
        svg.appendChild(sideFace);

        const label = this.createText(cx, cy + size + 30, shape, '#333', 'middle');
        svg.appendChild(label);

        container.appendChild(svg);
        return svg;
    }

    renderPattern(container, config) {
        const { sequence = [2, 4, 6, 8], showNext = true } = config;
        
        const svg = this.createSVG(400, 100);
        const startX = 30;
        const y = 50;
        const gap = 80;

        sequence.forEach((num, index) => {
            const x = startX + index * gap;
            const circle = this.createCircle(x, y, 30, '#4CAF50', '#333', 2);
            svg.appendChild(circle);

            const text = this.createText(x, y + 5, num.toString(), '#FFF', 'middle', '20px');
            svg.appendChild(text);

            if (index < sequence.length - 1) {
                const arrow = this.createPolygon([
                    [x + 35, y],
                    [x + 45, y - 5],
                    [x + 45, y + 5]
                ], '#999');
                svg.appendChild(arrow);
            }
        });

        if (showNext) {
            const nextX = startX + sequence.length * gap;
            const questionCircle = this.createCircle(nextX, y, 30, '#E0E0E0', '#333', 2);
            svg.appendChild(questionCircle);

            const questionText = this.createText(nextX, y + 5, '?', '#333', 'middle', '24px');
            svg.appendChild(questionText);
        }

        container.appendChild(svg);
        return svg;
    }

    renderGraph(container, config) {
        const { equation = 'y = x', points = [[-2, -2], [-1, -1], [0, 0], [1, 1], [2, 2]] } = config;
        
        const svg = this.createSVG(300, 300);
        const cx = 150;
        const cy = 150;
        const scale = 40;

        const xAxis = this.createLine(20, cy, 280, cy, '#333', 2);
        svg.appendChild(xAxis);

        const yAxis = this.createLine(cx, 280, cx, 20, '#333', 2);
        svg.appendChild(yAxis);

        if (points.length > 1) {
            const pathData = points.map(([x, y]) => {
                const px = cx + x * scale;
                const py = cy - y * scale;
                return `${points.indexOf([x, y]) === 0 ? 'M' : 'L'} ${px} ${py}`;
            }).join(' ');

            const path = document.createElementNS(this.svgNS, 'path');
            path.setAttribute('d', pathData);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', '#4CAF50');
            path.setAttribute('stroke-width', '2');
            svg.appendChild(path);
        }

        points.forEach(([x, y]) => {
            const px = cx + x * scale;
            const py = cy - y * scale;
            const point = this.createCircle(px, py, 4, '#F44336');
            svg.appendChild(point);
        });

        const label = this.createText(150, 280, equation, '#333', 'middle', '14px');
        svg.appendChild(label);

        container.appendChild(svg);
        return svg;
    }

    renderNumberLineFraction(container, config) {
        const { numerator = 1, denominator = 4 } = config;
        
        const svg = this.createSVG(600, 100);
        const startX = 50;
        const endX = 550;
        const y = 50;
        const stepWidth = (endX - startX) / denominator;

        const line = this.createLine(startX, y, endX, y, '#333', 3);
        svg.appendChild(line);

        const arrow = this.createPolygon([
            [endX, y],
            [endX - 10, y - 5],
            [endX - 10, y + 5]
        ], '#333');
        svg.appendChild(arrow);

        for (let i = 0; i <= denominator; i++) {
            const x = startX + i * stepWidth;
            const value = i / denominator;
            
            const tick = this.createLine(x, y - 8, x, y + 8, '#333', 2);
            svg.appendChild(tick);

            const text = this.createText(x, y + 25, value.toString(), '#333', 'middle');
            svg.appendChild(text);

            if (i === numerator) {
                const circle = this.createCircle(x, y, 8, '#4CAF50', '#4CAF50');
                svg.insertBefore(circle, tick);
            }
        }

        const label = this.createText(300, 85, `${numerator}/${denominator}`, '#4CAF50', 'middle', '16px');
        svg.appendChild(label);

        container.appendChild(svg);
        return svg;
    }

    createSVG(width, height) {
        const svg = document.createElementNS(this.svgNS, 'svg');
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        return svg;
    }

    createLine(x1, y1, x2, y2, color, width) {
        const line = document.createElementNS(this.svgNS, 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', width);
        return line;
    }

    createCircle(cx, cy, r, fill, stroke = null, strokeWidth = 0) {
        const circle = document.createElementNS(this.svgNS, 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);
        circle.setAttribute('fill', fill);
        if (stroke) {
            circle.setAttribute('stroke', stroke);
            circle.setAttribute('stroke-width', strokeWidth);
        }
        return circle;
    }

    createRect(x, y, width, height, fill, stroke = null, strokeWidth = 0) {
        const rect = document.createElementNS(this.svgNS, 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('fill', fill);
        if (stroke) {
            rect.setAttribute('stroke', stroke);
            rect.setAttribute('stroke-width', strokeWidth);
        }
        return rect;
    }

    createPolygon(points, fill, stroke = null, strokeWidth = 0) {
        const polygon = document.createElementNS(this.svgNS, 'polygon');
        const pointsStr = points.map(([x, y]) => `${x},${y}`).join(' ');
        polygon.setAttribute('points', pointsStr);
        polygon.setAttribute('fill', fill);
        if (stroke) {
            polygon.setAttribute('stroke', stroke);
            polygon.setAttribute('stroke-width', strokeWidth);
        }
        return polygon;
    }

    createText(x, y, content, color = '#333', anchor = 'start', fontSize = '14px') {
        const text = document.createElementNS(this.svgNS, 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('fill', color);
        text.setAttribute('text-anchor', anchor);
        text.setAttribute('font-size', fontSize);
        text.setAttribute('font-family', 'Arial, sans-serif');
        text.textContent = content;
        return text;
    }

    createArcPath(cx, cy, radius, startAngle, endAngle) {
        const x1 = cx + radius * Math.cos(startAngle);
        const y1 = cy + radius * Math.sin(startAngle);
        const x2 = cx + radius * Math.cos(endAngle);
        const y2 = cy + radius * Math.sin(endAngle);
        
        const largeArc = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;
        
        const path = document.createElementNS(this.svgNS, 'path');
        path.setAttribute('d', `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`);
        return path;
    }

    createBracket(x, y, count, size, gap) {
        const height = Math.ceil(count / 4) * (size + gap);
        const path = document.createElementNS(this.svgNS, 'path');
        path.setAttribute('d', `M ${x} ${y} L ${x - 5} ${y} L ${x - 5} ${y + height} L ${x} ${y + height}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#999');
        path.setAttribute('stroke-width', '2');
        return path;
    }
}
