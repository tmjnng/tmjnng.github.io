// Node.js测试脚本 - 测试MD5函数

// 一个已知正确的MD5实现
function md5(string) {
    function md5cycle(x, k) {
        let a = x[0], b = x[1], c = x[2], d = x[3];

        a = ff(a, b, c, d, k[0], 7, 0xd76aa478);
        d = ff(d, a, b, c, k[1], 12, 0xe8c7b756);
        c = ff(c, d, a, b, k[2], 17, 0x242070db);
        b = ff(b, c, d, a, k[3], 22, 0xc1bdceee);
        a = ff(a, b, c, d, k[4], 7, 0xf57c0faf);
        d = ff(d, a, b, c, k[5], 12, 0x4787c62a);
        c = ff(c, d, a, b, k[6], 17, 0xa8304613);
        b = ff(b, c, d, a, k[7], 22, 0xfd469501);
        a = ff(a, b, c, d, k[8], 7, 0x698098d8);
        d = ff(d, a, b, c, k[9], 12, 0x8b44f7af);
        c = ff(c, d, a, b, k[10], 17, 0xffff5bb1);
        b = ff(b, c, d, a, k[11], 22, 0x895cd7be);
        a = ff(a, b, c, d, k[12], 7, 0x6b901122);
        d = ff(d, a, b, c, k[13], 12, 0xfd987193);
        c = ff(c, d, a, b, k[14], 17, 0xa679438e);
        b = ff(b, c, d, a, k[15], 22, 0x49b40821);

        a = gg(a, b, c, d, k[1], 5, 0xf61e2562);
        d = gg(d, a, b, c, k[6], 9, 0xc040b340);
        c = gg(c, d, a, b, k[11], 14, 0x265e5a51);
        b = gg(b, c, d, a, k[0], 20, 0xe9b6c7aa);
        a = gg(a, b, c, d, k[5], 5, 0xd62f105d);
        d = gg(d, a, b, c, k[10], 9, 0x02441453);
        c = gg(c, d, a, b, k[15], 14, 0xd8a1e681);
        b = gg(b, c, d, a, k[4], 20, 0xe7d3fbc8);
        a = gg(a, b, c, d, k[9], 5, 0x21e1cde6);
        d = gg(d, a, b, c, k[14], 9, 0xc33707d6);
        c = gg(c, d, a, b, k[3], 14, 0xf4d50d87);
        b = gg(b, c, d, a, k[8], 20, 0x455a14ed);
        a = gg(a, b, c, d, k[13], 5, 0xa9e3e905);
        d = gg(d, a, b, c, k[2], 9, 0xfcefa3f8);
        c = gg(c, d, a, b, k[7], 14, 0x676f02d9);
        b = gg(b, c, d, a, k[12], 20, 0x8d2a4c8a);

        a = hh(a, b, c, d, k[5], 4, 0xfffa3942);
        d = hh(d, a, b, c, k[8], 11, 0x8771f681);
        c = hh(c, d, a, b, k[11], 16, 0x6d9d6122);
        b = hh(b, c, d, a, k[14], 23, 0xfde5380c);
        a = hh(a, b, c, d, k[1], 4, 0xa4beea44);
        d = hh(d, a, b, c, k[4], 11, 0x4bdecfa9);
        c = hh(c, d, a, b, k[7], 16, 0xf6bb4b60);
        b = hh(b, c, d, a, k[10], 23, 0xbebfbc70);
        a = hh(a, b, c, d, k[13], 4, 0x289b7ec6);
        d = hh(d, a, b, c, k[0], 11, 0xeaa127fa);
        c = hh(c, d, a, b, k[3], 16, 0xd4ef3085);
        b = hh(b, c, d, a, k[6], 23, 0x04881d05);
        a = hh(a, b, c, d, k[9], 4, 0xd9d4d039);
        d = hh(d, a, b, c, k[12], 11, 0xe6db99e5);
        c = hh(c, d, a, b, k[15], 16, 0x1fa27cf8);
        b = hh(b, c, d, a, k[2], 23, 0xc4ac5665);

        a = ii(a, b, c, d, k[0], 6, 0xf4292244);
        d = ii(d, a, b, c, k[7], 10, 0x432aff97);
        c = ii(c, d, a, b, k[14], 15, 0xab9423a7);
        b = ii(b, c, d, a, k[5], 21, 0xfc93a039);
        a = ii(a, b, c, d, k[12], 6, 0x655b59c3);
        d = ii(d, a, b, c, k[3], 10, 0x8f0ccc92);
        c = ii(c, d, a, b, k[10], 15, 0xffeff47d);
        b = ii(b, c, d, a, k[1], 21, 0x85845dd1);
        a = ii(a, b, c, d, k[8], 6, 0x6fa87e4f);
        d = ii(d, a, b, c, k[15], 10, 0xfe2ce6e0);
        c = ii(c, d, a, b, k[6], 15, 0xa3014314);
        b = ii(b, c, d, a, k[13], 21, 0x4e0811a1);
        a = ii(a, b, c, d, k[4], 6, 0xf7537e82);
        d = ii(d, a, b, c, k[11], 10, 0xbd3af235);
        c = ii(c, d, a, b, k[2], 15, 0x2ad7d2bb);
        b = ii(b, c, d, a, k[9], 21, 0xeb86d391);

        x[0] = (x[0] + a) & 0xFFFFFFFF;
        x[1] = (x[1] + b) & 0xFFFFFFFF;
        x[2] = (x[2] + c) & 0xFFFFFFFF;
        x[3] = (x[3] + d) & 0xFFFFFFFF;
    }

    function cmn(q, a, b, x, s, t) {
        a = (a + q + x + t) & 0xFFFFFFFF;
        return ((a << s) | (a >>> (32 - s))) + b & 0xFFFFFFFF;
    }

    function ff(a, b, c, d, x, s, t) {
        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    function gg(a, b, c, d, x, s, t) {
        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    function hh(a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function ii(a, b, c, d, x, s, t) {
        return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    function str2blks_MD5(str) {
        let nblk = ((str.length + 8) >> 6) + 1;
        let blks = new Array(nblk * 16);
        for (let i = 0; i < nblk * 16; i++) blks[i] = 0;
        for (let i = 0; i < str.length; i++)
            blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
        blks[str.length >> 2] |= 0x80 << ((str.length % 4) * 8);
        blks[nblk * 16 - 2] = str.length * 8;
        return blks;
    }

    function add(x, y) {
        return (x + y) & 0xFFFFFFFF;
    }

    let x = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];
    let blks = str2blks_MD5(string);

    for (let i = 0; i < blks.length; i += 16) {
        md5cycle(x, blks.slice(i, i + 16));
    }

    function binl2hex(binarray) {
        const hex_tab = '0123456789abcdef';
        let str = '';
        for (let i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                   hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        }
        return str;
    }

    return binl2hex(x);
}

// 测试用例
const testCases = [
    { input: "hello world", expected: "5eb63bbbe01eeed093cb22bb8f5acdc3" },
    { input: "", expected: "d41d8cd98f00b204e9800998ecf8427e" },
    { input: "123456", expected: "e10adc3949ba59abbe56e057f20f883e" },
    { input: "MD5 encryption", expected: "5c89e4c830e269f49b5501b7e8a648d1" },
    { input: "abc", expected: "900150983cd24fb0d6963f7d28e17f72" },
    { input: "1234567890", expected: "e807f1fcf82d132f9bb018ca6738a19f" }
];

// 运行测试
console.log('MD5 Test Results:');
console.log('================');

let allPassed = true;

testCases.forEach((testCase, index) => {
    const actual = md5(testCase.input);
    const passed = actual === testCase.expected;
    allPassed = allPassed && passed;

    console.log(`Test ${index + 1}:`);
    console.log(`Input: "${testCase.input}"`);
    console.log(`Expected: ${testCase.expected}`);
    console.log(`Actual:   ${actual}`);
    console.log(`Result: ${passed ? 'PASS' : 'FAIL'}`);
    console.log('---');
});

console.log(`Overall: ${allPassed ? 'All tests passed!' : 'Some tests failed!'}`);

// 使用Node.js内置的crypto模块进行对比（如果可用）
if (typeof require !== 'undefined') {
    try {
        const crypto = require('crypto');
        console.log('\nComparing with Node.js crypto module:');
        console.log('==================================');
        
        testCases.forEach((testCase, index) => {
            const nodejsMD5 = crypto.createHash('md5').update(testCase.input).digest('hex');
            const ourMD5 = md5(testCase.input);
            const passed = ourMD5 === nodejsMD5;
            
            console.log(`Test ${index + 1}:`);
            console.log(`Input: "${testCase.input}"`);
            console.log(`Node.js: ${nodejsMD5}`);
            console.log(`Our MD5: ${ourMD5}`);
            console.log(`Result: ${passed ? 'PASS' : 'FAIL'}`);
            console.log('---');
        });
    } catch (e) {
        console.log('\nNode.js crypto module not available for comparison.');
    }
}