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
  try {
    const display = document.getElementById('timer-display');
    if (!display) return;
    
    // 确保timerSeconds是有效的数字
    const validSeconds = Math.max(0, parseInt(timerSeconds) || 0);
    
    const hours = Math.floor(validSeconds / 3600);
    const minutes = Math.floor((validSeconds % 3600) / 60);
    const seconds = validSeconds % 60;
    
    // 限制小时数，避免显示过大的数字
    const displayHours = Math.min(hours, 9999);
    
    display.textContent = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } catch (error) {
    console.error('更新显示失败:', error);
  }
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
    try {
      const hoursInput = document.getElementById('timer-hours');
      const minutesInput = document.getElementById('timer-minutes');
      const secondsInput = document.getElementById('timer-seconds');
      
      const hours = hoursInput ? parseInt(hoursInput.value) || 0 : 0;
      const minutes = minutesInput ? parseInt(minutesInput.value) || 0 : 0;
      const seconds = secondsInput ? parseInt(secondsInput.value) || 0 : 0;
      
      // 确保值在有效范围内
      const validHours = Math.max(0, Math.min(23, hours));
      const validMinutes = Math.max(0, Math.min(59, minutes));
      const validSeconds = Math.max(0, Math.min(59, seconds));
      
      timerSeconds = validHours * 3600 + validMinutes * 60 + validSeconds;
    } catch (error) {
      console.error('获取时间值失败:', error);
      timerSeconds = 0;
    }
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
  try {
    const hoursInput = document.getElementById('timer-hours');
    const minutesInput = document.getElementById('timer-minutes');
    const secondsInput = document.getElementById('timer-seconds');
    
    if (hoursInput) hoursInput.value = 0;
    if (minutesInput) minutesInput.value = 25;
    if (secondsInput) secondsInput.value = 0;
  } catch (error) {
    console.error('重置输入框失败:', error);
  }
  
  updateTimerDisplay();
  updateTimerStatus('已重置');
}

// 设置计时器预设
function setTimerPreset(minutes) {
  resetTimer();
  try {
    const minutesInput = document.getElementById('timer-minutes');
    const hoursInput = document.getElementById('timer-hours');
    const secondsInput = document.getElementById('timer-seconds');
    
    if (minutesInput) minutesInput.value = minutes;
    if (hoursInput) hoursInput.value = 0;
    if (secondsInput) secondsInput.value = 0;
    
    // 更新显示
    timerSeconds = minutes * 60;
    updateTimerDisplay();
  } catch (error) {
    console.error('设置预设时间失败:', error);
  }
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
