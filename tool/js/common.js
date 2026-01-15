// 通用函数库

// 复制结果到剪贴板
function copyResult(resultId) {
  const resultElement = document.getElementById(resultId);
  const textToCopy = resultElement.textContent;
  
  navigator.clipboard.writeText(textToCopy).then(function() {
    // 可以添加一个复制成功的提示
    // 例如：showNotification('复制成功');
  }, function(err) {
    console.error('复制失败:', err);
  });
}

// 显示通知（可选功能，可以扩展）
function showNotification(message) {
  // 创建一个通知元素
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  // 设置样式
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = '#4CAF50';
  notification.style.color = 'white';
  notification.style.padding = '15px 20px';
  notification.style.borderRadius = '4px';
  notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  notification.style.zIndex = '1000';
  notification.style.transition = 'opacity 0.3s ease';
  
  // 添加到页面
  document.body.appendChild(notification);
  
  // 3秒后自动移除
  setTimeout(function() {
    notification.style.opacity = '0';
    setTimeout(function() {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// 工具初始化函数
document.addEventListener('DOMContentLoaded', function() {
  // 可以在这里添加全局的工具初始化代码
  // 例如：加载默认配置、绑定通用事件等
});