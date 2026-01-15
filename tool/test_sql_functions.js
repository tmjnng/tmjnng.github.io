// 测试SQL格式化和压缩功能

function sqlFormatter(sql) {
  sql = sql.trim();
  sql = sql.replace(/\s+/g, ' ');
  
  const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TABLE', 'VIEW', 'INDEX', 'TRIGGER', 'PROCEDURE', 'FUNCTION', 'BEGIN', 'END', 'IF', 'ELSE', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END CASE'];
  
  let formatted = sql;
  let indentLevel = 0;
  const indentSize = 2;
  
  formatted = formatted.replace(/\(/g, ' (\n' + ' '.repeat(++indentLevel * indentSize));
  formatted = formatted.replace(/\)/g, '\n' + ' '.repeat(--indentLevel * indentSize) + ')');
  
  for (const keyword of keywords) {
    const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
    formatted = formatted.replace(regex, (match) => '\n' + ' '.repeat(indentLevel * indentSize) + match.toUpperCase());
  }
  
  formatted = formatted.replace(/,/g, ',\n' + ' '.repeat((indentLevel + 1) * indentSize));
  formatted = formatted.replace(/\n(\s*)(AND|OR)/gi, '\n$1  $2');
  formatted = formatted.replace(/\n+/g, '\n');
  
  return formatted.trim();
}

function sqlMinifier(sql) {
  sql = sql.replace(/--.*$/gm, '');
  sql = sql.replace(/\/\*[\s\S]*?\*\//g, '');
  sql = sql.trim();
  sql = sql.replace(/\s+/g, ' ');
  return sql;
}

// 测试用例
const testCases = [
  {
    name: '简单SELECT语句',
    input: 'select id, name, email from users where age > 18 and status = \'active\' order by name;'
  },
  {
    name: '带JOIN的复杂语句',
    input: 'select u.id, u.name, p.title, p.content from users u join posts p on u.id = p.user_id where u.status = \'active\' and p.created_at > \'2023-01-01\' order by p.created_at desc limit 10;'
  },
  {
    name: '带子查询的语句',
    input: 'select id, name from users where id in (select user_id from orders where total > 1000) and created_at > \'2023-01-01\';'
  },
  {
    name: '带注释的语句',
    input: '-- 这是一个注释\nselect id, name -- 这是列注释\nfrom users /* 表注释 */ where status = \'active\';'
  }
];

// 运行测试
console.log('SQL格式化和压缩功能测试\n');

testCases.forEach((testCase, index) => {
  console.log(`=== 测试用例 ${index + 1}: ${testCase.name} ===`);
  console.log('输入:');
  console.log(testCase.input);
  
  try {
    const formatted = sqlFormatter(testCase.input);
    const minified = sqlMinifier(testCase.input);
    
    console.log('\n格式化结果:');
    console.log(formatted);
    
    console.log('\n压缩结果:');
    console.log(minified);
  } catch (e) {
    console.error('\n错误:', e.message);
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
});

console.log('测试完成!');