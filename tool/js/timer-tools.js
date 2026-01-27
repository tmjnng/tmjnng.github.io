// 计时器相关变量
let timerInterval = null;
let timerSeconds = 0;
let timerMode = 'countdown';
let timerRunning = false;
let startTime = 0;

// 初始化计时器
function initTimer() {
  updateTimerDisplay();
  document.getElementById('timer-mode').addEventListener('change', function() {
    resetTimer();
  });
}

// 更新计时器显示
function updateTimerDisplay() {
  const display = document.getElementById('timer-display');
  const hours = Math.floor(timerSeconds / 3600);
  const minutes = Math.floor((timerSeconds % 3600) / 60);
  const seconds = timerSeconds % 60;
  
  display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 更新计时器状态
function updateTimerStatus(message) {
  const status = document.getElementById('timer-status');
  status.textContent = message;
}

// 开始计时器
function startTimer() {
  if (timerRunning) return;
  
  timerMode = document.getElementById('timer-mode').value;
  
  // 如果是倒计时模式，初始化时间
  if (timerMode === 'countdown' && !timerRunning) {
    const hours = parseInt(document.getElementById('timer-hours').value) || 0;
    const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
    const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
    timerSeconds = hours * 3600 + minutes * 60 + seconds;
  }
  
  // 如果是正向计时模式，记录开始时间
  if (timerMode === 'stopwatch' && !timerRunning) {
    startTime = Date.now() - (timerSeconds * 1000);
  }
  
  timerRunning = true;
  updateTimerStatus('正在运行...');
  
  // 开始计时
  timerInterval = setInterval(function() {
    if (timerMode === 'countdown') {
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        updateTimerStatus('计时结束！');
        showNotification('计时器', '计时结束！');
        return;
      }
      timerSeconds--;
    } else {
      // 正向计时模式
      timerSeconds = Math.floor((Date.now() - startTime) / 1000);
    }
    updateTimerDisplay();
  }, 1000);
}

// 暂停计时器
function pauseTimer() {
  if (!timerRunning) return;
  
  clearInterval(timerInterval);
  timerRunning = false;
  updateTimerStatus('已暂停');
}

// 重置计时器
function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerSeconds = 0;
  
  // 重置输入框
  document.getElementById('timer-hours').value = 0;
  document.getElementById('timer-minutes').value = 25;
  document.getElementById('timer-seconds').value = 0;
  
  updateTimerDisplay();
  updateTimerStatus('已重置');
}

// 设置计时器预设
function setTimerPreset(minutes) {
  resetTimer();
  document.getElementById('timer-minutes').value = minutes;
  document.getElementById('timer-hours').value = 0;
  document.getElementById('timer-seconds').value = 0;
  
  // 更新显示
  timerSeconds = minutes * 60;
  updateTimerDisplay();
}

// 显示通知
function showNotification(title, message) {
  const notificationEnabled = document.getElementById('timer-notification').checked;
  if (!notificationEnabled) return;
  
  // 检查浏览器是否支持通知
  if ('Notification' in window) {
    // 请求通知权限
    if (Notification.permission === 'granted') {
      new Notification(title, { body: message });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          new Notification(title, { body: message });
        }
      });
    }
  }
}

// 初始化
window.addEventListener('load', initTimer);
