class DatabaseDesigner {
    constructor() {
        this.tables = [];
        this.relations = [];
        this.selectedElement = null;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        
        this.initApp();
    }

    initApp() {
        this.bindEvents();
        this.initCanvas();
        this.updateTableList();
    }

    bindEvents() {
        // 工具栏按钮事件
        document.getElementById('btn-new').addEventListener('click', () => this.newDesign());
        document.getElementById('btn-save').addEventListener('click', () => this.saveDesign());
        document.getElementById('btn-export').addEventListener('click', () => this.exportDesign());
        document.getElementById('btn-import').addEventListener('click', () => this.importDesign());
        document.getElementById('btn-add-table').addEventListener('click', () => this.addTable());
        document.getElementById('btn-delete').addEventListener('click', () => this.deleteSelected());

        // 模态框事件
        document.querySelectorAll('.btn-cancel').forEach(btn => {
            btn.addEventListener('click', () => this.closeModals());
        });

        // 表表单提交
        document.getElementById('table-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTable();
        });

        // 字段表单提交
        document.getElementById('field-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveField();
        });

        // 画布事件
        const canvas = document.getElementById('canvas-container');
        canvas.addEventListener('click', (e) => {
            if (e.target === canvas) {
                this.deselectAll();
            }
        });
    }

    initCanvas() {
        const canvas = document.getElementById('canvas-container');
        canvas.style.position = 'relative';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.minHeight = '600px';
        canvas.style.backgroundColor = '#f5f5f5';
        canvas.style.border = '1px solid #ddd';
    }

    newDesign() {
        if (confirm('确定要新建设计吗？当前未保存的更改将丢失。')) {
            this.tables = [];
            this.relations = [];
            this.selectedElement = null;
            this.clearCanvas();
            this.updateTableList();
            this.updatePropertyPanel();
        }
    }

    saveDesign() {
        const design = {
            tables: this.tables,
            relations: this.relations,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('databaseDesign', JSON.stringify(design));
        alert('设计已保存到本地存储');
    }

    exportDesign() {
        const design = {
            tables: this.tables,
            relations: this.relations,
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(design, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `database-design-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    importDesign() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const design = JSON.parse(event.target.result);
                        this.tables = design.tables || [];
                        this.relations = design.relations || [];
                        this.clearCanvas();
                        this.renderTables();
                        this.renderRelations();
                        this.updateTableList();
                        this.updatePropertyPanel();
                        alert('设计已成功导入');
                    } catch (error) {
                        alert('导入失败：无效的JSON文件');
                    }
                };
                reader.readAsText(file);
            }
        });
        input.click();
    }

    addTable() {
        const tableId = `table_${Date.now()}`;
        const newTable = {
            id: tableId,
            name: `table_${this.tables.length + 1}`,
            comment: '',
            fields: [
                {
                    id: `field_${Date.now()}_1`,
                    name: 'id',
                    type: 'INT',
                    length: '',
                    default: '',
                    nullable: false,
                    primary: true,
                    unique: true,
                    comment: '主键'
                }
            ],
            position: {
                x: 50 + (this.tables.length * 20),
                y: 50 + (this.tables.length * 20)
            }
        };

        this.tables.push(newTable);
        this.renderTable(newTable);
        this.updateTableList();
        this.selectElement(newTable);
    }

    renderTable(table) {
        const canvas = document.getElementById('canvas-container');
        const tableElement = document.createElement('div');
        tableElement.id = table.id;
        tableElement.className = 'table-element';
        tableElement.style.position = 'absolute';
        tableElement.style.left = `${table.position.x}px`;
        tableElement.style.top = `${table.position.y}px`;
        tableElement.style.backgroundColor = '#fff';
        tableElement.style.border = '1px solid #ddd';
        tableElement.style.borderRadius = '4px';
        tableElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        tableElement.style.minWidth = '200px';
        tableElement.style.zIndex = '10';

        // 表头
        const tableHeader = document.createElement('div');
        tableHeader.className = 'table-header';
        tableHeader.style.backgroundColor = '#f0f0f0';
        tableHeader.style.padding = '8px';
        tableHeader.style.borderBottom = '1px solid #ddd';
        tableHeader.style.cursor = 'move';
        tableHeader.textContent = table.name;

        // 字段列表
        const fieldsContainer = document.createElement('div');
        fieldsContainer.className = 'fields-container';
        fieldsContainer.style.padding = '8px';

        table.fields.forEach(field => {
            const fieldElement = document.createElement('div');
            fieldElement.className = 'field-element';
            fieldElement.style.padding = '4px 0';
            fieldElement.style.borderBottom = '1px solid #f0f0f0';
            fieldElement.innerHTML = `
                <span style="font-weight: ${field.primary ? 'bold' : 'normal'};">
                    ${field.name}
                </span>
                <span style="font-size: 12px; color: #666; margin-left: 8px;">
                    ${field.type}${field.length ? `(${field.length})` : ''}
                </span>
            `;
            fieldElement.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectField(field, table);
            });
            fieldsContainer.appendChild(fieldElement);
        });

        // 添加字段按钮
        const addFieldBtn = document.createElement('div');
        addFieldBtn.className = 'add-field-btn';
        addFieldBtn.style.padding = '4px';
        addFieldBtn.style.textAlign = 'center';
        addFieldBtn.style.fontSize = '12px';
        addFieldBtn.style.color = '#0066cc';
        addFieldBtn.style.cursor = 'pointer';
        addFieldBtn.style.borderTop = '1px solid #f0f0f0';
        addFieldBtn.style.marginTop = '4px';
        addFieldBtn.textContent = '+ 添加字段';
        addFieldBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.addField(table);
        });

        fieldsContainer.appendChild(addFieldBtn);
        tableElement.appendChild(tableHeader);
        tableElement.appendChild(fieldsContainer);
        canvas.appendChild(tableElement);

        // 添加拖拽功能
        this.makeDraggable(tableElement, table);

        // 添加点击事件
        tableElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectElement(table);
        });
    }

    makeDraggable(element, table) {
        const header = element.querySelector('.table-header');
        let isDragging = false;
        let startX, startY;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - table.position.x;
            startY = e.clientY - table.position.y;
            element.style.zIndex = '100';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                table.position.x = e.clientX - startX;
                table.position.y = e.clientY - startY;
                element.style.left = `${table.position.x}px`;
                element.style.top = `${table.position.y}px`;
                this.renderRelations();
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                element.style.zIndex = '10';
            }
        });
    }

    renderTables() {
        this.clearCanvas();
        this.tables.forEach(table => {
            this.renderTable(table);
        });
        this.renderRelations();
    }

    renderRelations() {
        // 先清除所有关系线
        const existingRelations = document.querySelectorAll('.relation-line');
        existingRelations.forEach(line => line.remove());

        // 渲染新的关系线
        const canvas = document.getElementById('canvas-container');
        this.relations.forEach(relation => {
            const line = document.createElement('div');
            line.className = 'relation-line';
            line.style.position = 'absolute';
            line.style.backgroundColor = '#333';
            line.style.height = '2px';
            line.style.zIndex = '1';
            
            // 计算线条位置（简化版）
            const fromTable = this.tables.find(t => t.id === relation.fromTable);
            const toTable = this.tables.find(t => t.id === relation.toTable);
            
            if (fromTable && toTable) {
                const fromX = fromTable.position.x + 100;
                const fromY = fromTable.position.y + 50;
                const toX = toTable.position.x;
                const toY = toTable.position.y + 50;
                
                const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
                const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;
                
                line.style.width = `${length}px`;
                line.style.left = `${fromX}px`;
                line.style.top = `${fromY}px`;
                line.style.transformOrigin = '0 0';
                line.style.transform = `rotate(${angle}deg)`;
                
                canvas.appendChild(line);
            }
        });
    }

    clearCanvas() {
        const canvas = document.getElementById('canvas-container');
        canvas.innerHTML = '';
    }

    addField(table) {
        const fieldId = `field_${Date.now()}`;
        const newField = {
            id: fieldId,
            name: `field_${table.fields.length + 1}`,
            type: 'VARCHAR',
            length: '255',
            default: '',
            nullable: true,
            primary: false,
            unique: false,
            comment: ''
        };

        table.fields.push(newField);
        this.renderTables();
        this.selectField(newField, table);
    }

    updateTableList() {
        const container = document.getElementById('tables-container');
        container.innerHTML = '';

        this.tables.forEach(table => {
            const tableItem = document.createElement('div');
            tableItem.className = 'table-item';
            tableItem.style.padding = '8px';
            tableItem.style.borderBottom = '1px solid #f0f0f0';
            tableItem.style.cursor = 'pointer';
            tableItem.innerHTML = `
                <div style="font-weight: bold;">${table.name}</div>
                <div style="font-size: 12px; color: #666;">${table.fields.length} 个字段</div>
            `;
            tableItem.addEventListener('click', () => {
                this.selectElement(table);
            });
            container.appendChild(tableItem);
        });
    }

    updatePropertyPanel() {
        const panel = document.getElementById('property-content');
        
        if (!this.selectedElement) {
            panel.innerHTML = '<p>选择一个表或字段进行编辑</p>';
            return;
        }

        if (this.selectedElement.fields) {
            // 编辑表
            panel.innerHTML = `
                <h4>表属性</h4>
                <button onclick="designer.editTable()" style="margin: 4px; padding: 4px 8px;">编辑表</button>
                <button onclick="designer.addField(designer.selectedElement)" style="margin: 4px; padding: 4px 8px;">添加字段</button>
                <h5>字段列表</h5>
                <ul style="list-style: none; padding: 0;">
                    ${this.selectedElement.fields.map(field => `
                        <li style="padding: 4px; border-bottom: 1px solid #f0f0f0;">
                            ${field.name} (${field.type}) ${field.primary ? '(PK)' : ''}
                            <button onclick="designer.editField('${field.id}')" style="margin-left: 8px; padding: 2px 4px; font-size: 12px;">编辑</button>
                        </li>
                    `).join('')}
                </ul>
            `;
        } else if (this.selectedField) {
            // 编辑字段
            panel.innerHTML = `
                <h4>字段属性</h4>
                <button onclick="designer.editField('${this.selectedField.id}')" style="margin: 4px; padding: 4px 8px;">编辑字段</button>
                <div style="margin-top: 8px;">
                    <p><strong>字段名:</strong> ${this.selectedField.name}</p>
                    <p><strong>类型:</strong> ${this.selectedField.type}${this.selectedField.length ? `(${this.selectedField.length})` : ''}</p>
                    <p><strong>允许为空:</strong> ${this.selectedField.nullable ? '是' : '否'}</p>
                    <p><strong>主键:</strong> ${this.selectedField.primary ? '是' : '否'}</p>
                    <p><strong>唯一:</strong> ${this.selectedField.unique ? '是' : '否'}</p>
                    <p><strong>默认值:</strong> ${this.selectedField.default || '-'}</p>
                    <p><strong>注释:</strong> ${this.selectedField.comment || '-'}</p>
                </div>
            `;
        }
    }

    selectElement(element) {
        this.selectedElement = element;
        this.selectedField = null;
        this.highlightSelected();
        this.updatePropertyPanel();
    }

    selectField(field, table) {
        this.selectedElement = table;
        this.selectedField = field;
        this.highlightSelected();
        this.updatePropertyPanel();
    }

    highlightSelected() {
        // 清除所有高亮
        document.querySelectorAll('.table-element').forEach(el => {
            el.style.border = '1px solid #ddd';
        });

        // 高亮选中的表
        if (this.selectedElement && this.selectedElement.id) {
            const tableEl = document.getElementById(this.selectedElement.id);
            if (tableEl) {
                tableEl.style.border = '2px solid #0066cc';
            }
        }
    }

    deselectAll() {
        this.selectedElement = null;
        this.selectedField = null;
        this.highlightSelected();
        this.updatePropertyPanel();
    }

    deleteSelected() {
        if (!this.selectedElement) return;

        if (confirm('确定要删除选中的元素吗？')) {
            if (this.selectedField) {
                // 删除字段
                const table = this.selectedElement;
                table.fields = table.fields.filter(f => f.id !== this.selectedField.id);
            } else {
                // 删除表
                const tableId = this.selectedElement.id;
                this.tables = this.tables.filter(t => t.id !== tableId);
                this.relations = this.relations.filter(r => 
                    r.fromTable !== tableId && r.toTable !== tableId
                );
            }
            this.renderTables();
            this.updateTableList();
            this.deselectAll();
        }
    }

    editTable() {
        if (!this.selectedElement || !this.selectedElement.fields) return;

        const table = this.selectedElement;
        document.getElementById('table-name').value = table.name;
        document.getElementById('table-comment').value = table.comment || '';
        
        document.getElementById('table-modal').style.display = 'block';
    }

    editField(fieldId) {
        const table = this.selectedElement;
        const field = table.fields.find(f => f.id === fieldId);
        if (!field) return;

        document.getElementById('field-name').value = field.name;
        document.getElementById('field-type').value = field.type;
        document.getElementById('field-length').value = field.length || '';
        document.getElementById('field-default').value = field.default || '';
        document.getElementById('field-null').checked = field.nullable;
        document.getElementById('field-primary').checked = field.primary;
        document.getElementById('field-unique').checked = field.unique;
        document.getElementById('field-comment').value = field.comment || '';
        
        this.selectedField = field;
        document.getElementById('field-modal').style.display = 'block';
    }

    saveTable() {
        if (!this.selectedElement) return;

        const table = this.selectedElement;
        table.name = document.getElementById('table-name').value;
        table.comment = document.getElementById('table-comment').value;
        
        this.renderTables();
        this.updateTableList();
        this.closeModals();
    }

    saveField() {
        if (!this.selectedField || !this.selectedElement) return;

        const field = this.selectedField;
        field.name = document.getElementById('field-name').value;
        field.type = document.getElementById('field-type').value;
        field.length = document.getElementById('field-length').value;
        field.default = document.getElementById('field-default').value;
        field.nullable = document.getElementById('field-null').checked;
        field.primary = document.getElementById('field-primary').checked;
        field.unique = document.getElementById('field-unique').checked;
        field.comment = document.getElementById('field-comment').value;
        
        this.renderTables();
        this.closeModals();
    }

    closeModals() {
        document.getElementById('table-modal').style.display = 'none';
        document.getElementById('field-modal').style.display = 'none';
    }

    exportDesign() {
        document.getElementById('export-modal').style.display = 'block';
    }

    exportAsJSON() {
        const design = {
            tables: this.tables,
            relations: this.relations,
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(design, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `database-design-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    exportAsSQL() {
        const dbType = document.getElementById('db-type').value;
        let sql = '';

        const typeMapping = {
            generic: {
                INT: 'INT',
                VARCHAR: 'VARCHAR',
                TEXT: 'TEXT',
                DATE: 'DATE',
                DATETIME: 'DATETIME',
                BOOLEAN: 'BOOLEAN',
                FLOAT: 'FLOAT'
            },
            oracle: {
                INT: 'NUMBER(10)',
                VARCHAR: 'VARCHAR2',
                TEXT: 'CLOB',
                DATE: 'DATE',
                DATETIME: 'TIMESTAMP',
                BOOLEAN: 'NUMBER(1)',
                FLOAT: 'NUMBER(10,2)'
            },
            postgresql: {
                INT: 'INTEGER',
                VARCHAR: 'VARCHAR',
                TEXT: 'TEXT',
                DATE: 'DATE',
                DATETIME: 'TIMESTAMP',
                BOOLEAN: 'BOOLEAN',
                FLOAT: 'DOUBLE PRECISION'
            },
            mysql: {
                INT: 'INT',
                VARCHAR: 'VARCHAR',
                TEXT: 'TEXT',
                DATE: 'DATE',
                DATETIME: 'DATETIME',
                BOOLEAN: 'TINYINT(1)',
                FLOAT: 'FLOAT'
            },
            sqlserver: {
                INT: 'INT',
                VARCHAR: 'NVARCHAR',
                TEXT: 'NVARCHAR(MAX)',
                DATE: 'DATE',
                DATETIME: 'DATETIME',
                BOOLEAN: 'BIT',
                FLOAT: 'FLOAT'
            }
        };

        const mapping = typeMapping[dbType] || typeMapping.generic;

        this.tables.forEach(table => {
            sql += `CREATE TABLE ${table.name} (\n`;
            const fieldsSql = table.fields.map(field => {
                let fieldSql = `  ${field.name} ${mapping[field.type]}`;
                
                if (field.length && field.type === 'VARCHAR') {
                    if (dbType === 'oracle') {
                        fieldSql = `  ${field.name} VARCHAR2(${field.length})`;
                    } else {
                        fieldSql = `  ${field.name} VARCHAR(${field.length})`;
                    }
                }
                
                if (!field.nullable) {
                    fieldSql += ' NOT NULL';
                }
                
                if (field.default) {
                    if (dbType === 'oracle') {
                        fieldSql += ` DEFAULT '${field.default}'`;
                    } else {
                        fieldSql += ` DEFAULT '${field.default}'`;
                    }
                }
                
                if (field.unique) {
                    fieldSql += ' UNIQUE';
                }
                
                return fieldSql;
            }).join(',\n');
            
            const primaryFields = table.fields.filter(f => f.primary);
            if (primaryFields.length > 0) {
                const primarySql = `,\n  PRIMARY KEY (${primaryFields.map(f => f.name).join(', ')})`;
                sql += fieldsSql + primarySql;
            } else {
                sql += fieldsSql;
            }
            
            sql += '\n);\n\n';
        });

        this.relations.forEach(relation => {
            if (dbType === 'oracle') {
                sql += `ALTER TABLE ${relation.toTable} ADD CONSTRAINT fk_${relation.toTable}_${relation.fromTable} FOREIGN KEY (${relation.fromField}) REFERENCES ${relation.fromTable}(${relation.toField});\n`;
            } else if (dbType === 'postgresql') {
                sql += `ALTER TABLE ${relation.toTable} ADD CONSTRAINT fk_${relation.toTable}_${relation.fromTable} FOREIGN KEY (${relation.fromField}) REFERENCES ${relation.fromTable}(${relation.toField}) ON DELETE CASCADE;\n`;
            } else if (dbType === 'mysql') {
                sql += `ALTER TABLE ${relation.toTable} ADD CONSTRAINT fk_${relation.toTable}_${relation.fromTable} FOREIGN KEY (${relation.fromField}) REFERENCES ${relation.fromTable}(${relation.toField}) ON DELETE CASCADE ON UPDATE CASCADE;\n`;
            } else if (dbType === 'sqlserver') {
                sql += `ALTER TABLE ${relation.toTable} ADD CONSTRAINT fk_${relation.toTable}_${relation.fromTable} FOREIGN KEY (${relation.fromField}) REFERENCES ${relation.fromTable}(${relation.toField}) ON DELETE CASCADE;\n`;
            } else {
                sql += `ALTER TABLE ${relation.toTable} ADD FOREIGN KEY (${relation.fromField}) REFERENCES ${relation.fromTable}(${relation.toField});\n`;
            }
        });
        
        document.getElementById('export-modal').style.display = 'none';
        
        const dataStr = sql;
        const dataBlob = new Blob([dataStr], { type: 'text/plain' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        const dbTypeName = {
            generic: 'generic',
            oracle: 'oracle',
            postgresql: 'postgresql',
            mysql: 'mysql',
            sqlserver: 'sqlserver'
        }[dbType];
        link.download = `database-design-${dbTypeName}-${new Date().toISOString().split('T')[0]}.sql`;
        link.click();
        URL.revokeObjectURL(url);
    }

    importDesign() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const design = JSON.parse(event.target.result);
                        this.tables = design.tables || [];
                        this.relations = design.relations || [];
                        this.renderTables();
                        this.updateTableList();
                        this.deselectAll();
                        alert('设计已成功导入');
                    } catch (error) {
                        alert('导入失败：无效的JSON文件');
                    }
                };
                reader.readAsText(file);
            }
        });
        input.click();
    }

    saveDesign() {
        const design = {
            tables: this.tables,
            relations: this.relations,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('databaseDesign', JSON.stringify(design));
        alert('设计已保存到本地存储');
    }
}

// 初始化应用
let designer;
window.addEventListener('DOMContentLoaded', () => {
    designer = new DatabaseDesigner();
    window.designer = designer;
});
