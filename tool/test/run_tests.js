const axios = require('axios');

class ToolTester {
    constructor(baseUrl = 'http://localhost:8080') {
        this.baseUrl = baseUrl;
        this.results = [];
    }

    async testEndpoint(endpoint, testName) {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const response = await axios.get(url);
            
            this.results.push({
                test: testName,
                status: 'success',
                message: '访问成功'
            });
            console.log(`✅ ${testName}: 访问成功`);
        } catch (error) {
            this.results.push({
                test: testName,
                status: 'error',
                message: error.message
            });
            console.log(`❌ ${testName}: 访问失败 - ${error.message}`);
        }
    }

    async runAllTests() {
        console.log('开始测试工具集...');
        console.log(`测试基础URL: ${this.baseUrl}`);
        console.log('=' . repeat(50));

        // 测试工具页面
        await this.testEndpoint('/tool/index.html', '工具集主页面');
        await this.testEndpoint('/tool/test/test_all_tools.html', '综合测试页面');

        // 测试各个工具功能
        await this.testEndpoint('/tool/js/aes-tools.js', 'AES工具');
        await this.testEndpoint('/tool/js/json-tools.js', 'JSON工具');
        await this.testEndpoint('/tool/js/base64-tools.js', 'Base64工具');
        await this.testEndpoint('/tool/js/md5-tools.js', 'MD5工具');
        await this.testEndpoint('/tool/js/url-tools.js', 'URL工具');
        await this.testEndpoint('/tool/js/sql-tools.js', 'SQL工具');

        console.log('=' . repeat(50));
        console.log('测试完成!');
        console.log('\n测试结果:');
        
        this.results.forEach(result => {
            console.log(`${result.status === 'success' ? '✅' : '❌'} ${result.test}: ${result.message}`);
        });

        const successCount = this.results.filter(r => r.status === 'success').length;
        const totalCount = this.results.length;
        
        console.log(`\n总结: ${successCount}/${totalCount} 测试通过`);
        
        if (successCount < totalCount) {
            process.exit(1);
        }
    }
}

// 运行测试
async function main() {
    const tester = new ToolTester();
    await tester.runAllTests();
}

main();