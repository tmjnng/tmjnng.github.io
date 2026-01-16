# 开发规范

## 1. 目录结构
```
tool/
├── js/                 # 工具JavaScript文件
│   ├── aes-tools.js    # AES加密工具
│   ├── json-tools.js   # JSON工具
│   ├── base64-tools.js # Base64工具
│   └── ...             # 其他工具文件
├── test/               # 测试文件目录
│   ├── test_all_tools.html # 综合测试页面
│   ├── run_tests.js         # 自动化测试脚本
│   └── ...                  # 其他测试文件
└── index.html          # 工具集主页面
```

## 2. 开发环境
- **主要开发环境**：Windows
- **命令优先级**：优先使用Windows PowerShell/CMD命令
- **路径规范**：使用Windows风格路径（如 `C:\path\to\file`）
- **跨平台考虑**：代码应尽量保持跨平台兼容性，但命令和脚本优先考虑Windows环境

## 3. 测试文件规范
- **所有测试文件必须放在 `tool/test/` 目录下**
- 不要在 `tool/test/` 目录外生成测试文件
- 测试文件名应遵循 `test_*.html` 或 `*_test.js` 命名规范

## 4. 代码规范
- 使用 ES6+ 语法
- 遵循 JavaScript 标准编码规范
- 函数和变量命名使用驼峰式
- 代码注释清晰明了

## 5. 功能规范
- 所有工具应使用 Web Crypto API 进行加密操作
- 支持多种加密模式和填充方式
- 保持与其他网站工具的兼容性
- 提供友好的用户界面

## 6. 测试规范
- 每个功能模块应有对应的测试用例
- 使用 `test_all_tools.html` 进行浏览器端测试
- 使用 `run_tests.js` 进行命令行自动化测试
- 测试结果应与其他网站工具的结果一致
- **Windows环境测试命令**：
  - 启动本地服务器：`python -m http.server 8080`
  - 运行自动化测试：`node run_tests.js`
  - 检查端口占用：`netstat -ano | findstr :8080`
  - 创建目录：`New-Item -ItemType Directory -Path test` (PowerShell)

## 7. 部署规范
- 确保所有工具文件路径正确
- 测试通过后再部署
- 保持代码库的整洁

## 8. 注意事项
- 不要在根目录下创建测试文件
- 定期清理临时测试文件
- 遵循上述规范进行开发