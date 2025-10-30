// State management
let timerInterval = null;
let isPaused = false;
let targetTime = null;
let remainingTime = 0;
let currentMode = 'date';
let initialDuration = 0;

// DOM elements
const dateModeBtn = document.getElementById('dateModeBtn');
const durationModeBtn = document.getElementById('durationModeBtn');
const dateInputs = document.getElementById('dateInputs');
const durationInputs = document.getElementById('durationInputs');
const targetDateInput = document.getElementById('targetDate');
const targetTimeInput = document.getElementById('targetTime');
const durationHoursInput = document.getElementById('durationHours');
const durationMinutesInput = document.getElementById('durationMinutes');
const durationSecondsInput = document.getElementById('durationSeconds');
const timerDisplay = document.getElementById('timerDisplay');
const daysDisplay = document.getElementById('days');
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const statusMessage = document.getElementById('statusMessage');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const resetBtn = document.getElementById('resetBtn');
const stopBtn = document.getElementById('stopBtn');

// Initialize with default date (7 days from now)
function initializeDefaultDate() {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    today.setHours(0, 0, 0, 0);
    
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    targetDateInput.value = `${year}-${month}-${day}`;
    targetTimeInput.value = '00:00';
}

// Mode switching
function switchMode(mode) {
    currentMode = mode;
    
    if (mode === 'date') {
        dateModeBtn.classList.add('active');
        durationModeBtn.classList.remove('active');
        dateInputs.classList.remove('hidden');
        durationInputs.classList.add('hidden');
    } else {
        durationModeBtn.classList.add('active');
        dateModeBtn.classList.remove('active');
        durationInputs.classList.remove('hidden');
        dateInputs.classList.add('hidden');
    }
    
    // Stop and reset if switching modes while timer is running
    if (timerInterval) {
        stopTimer();
    }
}

// Calculate target time based on mode
function calculateTargetTime() {
    if (currentMode === 'date') {
        const dateValue = targetDateInput.value;
        const timeValue = targetTimeInput.value;
        
        if (!dateValue || !timeValue) {
            alert('Please select a date and time');
            return null;
        }
        
        const [year, month, day] = dateValue.split('-').map(Number);
        const [hours, minutes] = timeValue.split(':').map(Number);
        
        const target = new Date(year, month - 1, day, hours, minutes, 0, 0);
        
        if (target.getTime() <= Date.now()) {
            alert('Please select a future date and time');
            return null;
        }
        
        return target.getTime();
    } else {
        const hours = parseInt(durationHoursInput.value) || 0;
        const minutes = parseInt(durationMinutesInput.value) || 0;
        const seconds = parseInt(durationSecondsInput.value) || 0;
        
        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        
        if (totalSeconds <= 0) {
            alert('Please set a duration greater than 0');
            return null;
        }
        
        initialDuration = totalSeconds * 1000;
        return Date.now() + initialDuration;
    }
}

// Format number with leading zero
function padZero(num) {
    return String(num).padStart(2, '0');
}

// Update timer display
function updateDisplay(days, hours, minutes, seconds) {
    daysDisplay.textContent = padZero(days);
    hoursDisplay.textContent = padZero(hours);
    minutesDisplay.textContent = padZero(minutes);
    secondsDisplay.textContent = padZero(seconds);
}

// Calculate time remaining
function calculateTimeRemaining() {
    const now = Date.now();
    remainingTime = targetTime - now;
    
    if (remainingTime <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            total: 0
        };
    }
    
    const totalSeconds = Math.floor(remainingTime / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return {
        days,
        hours,
        minutes,
        seconds,
        total: totalSeconds
    };
}

// Update timer color based on remaining time
function updateTimerColor(totalSeconds) {
    timerDisplay.classList.remove('normal', 'warning', 'critical');
    
    if (totalSeconds <= 10) {
        timerDisplay.classList.add('critical');
    } else if (totalSeconds <= 60) {
        timerDisplay.classList.add('warning');
    } else {
        timerDisplay.classList.add('normal');
    }
}

// Update status message
function updateStatus(message, isComplete = false) {
    statusMessage.textContent = message;
    if (isComplete) {
        statusMessage.classList.add('complete');
    } else {
        statusMessage.classList.remove('complete');
    }
}

// Timer tick function
function tick() {
    const time = calculateTimeRemaining();
    
    updateDisplay(time.days, time.hours, time.minutes, time.seconds);
    updateTimerColor(time.total);
    
    if (time.total <= 0) {
        completeCountdown();
    }
}

// Start countdown
function startTimer() {
    // Prevent starting if already running
    if (timerInterval) {
        return;
    }
    
    targetTime = calculateTargetTime();
    if (!targetTime) {
        return;
    }
    
    isPaused = false;
    
    // Update button states
    startBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    resumeBtn.classList.add('hidden');
    resetBtn.disabled = false;
    stopBtn.disabled = false;
    
    // Disable inputs
    disableInputs();
    
    updateStatus('Countdown in progress...');
    
    // Start interval
    tick(); // Initial tick
    timerInterval = setInterval(tick, 1000);
}

// Pause countdown
function pauseTimer() {
    if (!timerInterval) {
        return;
    }
    
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = true;
    
    // Calculate and store remaining time
    const time = calculateTimeRemaining();
    remainingTime = time.total * 1000;
    
    // Update button states
    pauseBtn.classList.add('hidden');
    resumeBtn.classList.remove('hidden');
    
    updateStatus('Countdown paused');
}

// Resume countdown
function resumeTimer() {
    if (timerInterval || !isPaused) {
        return;
    }
    
    // Recalculate target time based on remaining time
    targetTime = Date.now() + remainingTime;
    isPaused = false;
    
    // Update button states
    resumeBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    
    updateStatus('Countdown in progress...');
    
    // Restart interval
    tick();
    timerInterval = setInterval(tick, 1000);
}

// Reset countdown
function resetTimer() {
    // Clear interval if running
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    isPaused = false;
    targetTime = null;
    remainingTime = 0;
    
    // Reset display
    updateDisplay(0, 0, 0, 0);
    timerDisplay.classList.remove('normal', 'warning', 'critical');
    
    // Reset button states
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    resumeBtn.classList.add('hidden');
    resetBtn.disabled = true;
    stopBtn.disabled = true;
    
    // Enable inputs
    enableInputs();
    
    updateStatus('Ready to start');
}

// Stop countdown
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    isPaused = false;
    targetTime = null;
    remainingTime = 0;
    
    // Reset display
    updateDisplay(0, 0, 0, 0);
    timerDisplay.classList.remove('normal', 'warning', 'critical');
    
    // Reset button states
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    resumeBtn.classList.add('hidden');
    resetBtn.disabled = true;
    stopBtn.disabled = true;
    
    // Enable inputs
    enableInputs();
    
    updateStatus('Countdown stopped');
}

// Complete countdown
function completeCountdown() {
    // Clear interval
    clearInterval(timerInterval);
    timerInterval = null;
    
    // Update display to zeros
    updateDisplay(0, 0, 0, 0);
    
    // Update button states
    startBtn.classList.add('hidden');
    pauseBtn.classList.add('hidden');
    resumeBtn.classList.add('hidden');
    resetBtn.disabled = false;
    stopBtn.disabled = true;
    
    // Enable inputs
    enableInputs();
    
    updateStatus('🎉 COUNTDOWN COMPLETE! 🎉', true);
}

// Disable input fields
function disableInputs() {
    targetDateInput.disabled = true;
    targetTimeInput.disabled = true;
    durationHoursInput.disabled = true;
    durationMinutesInput.disabled = true;
    durationSecondsInput.disabled = true;
    dateModeBtn.disabled = true;
    durationModeBtn.disabled = true;
}

// Enable input fields
function enableInputs() {
    targetDateInput.disabled = false;
    targetTimeInput.disabled = false;
    durationHoursInput.disabled = false;
    durationMinutesInput.disabled = false;
    durationSecondsInput.disabled = false;
    dateModeBtn.disabled = false;
    durationModeBtn.disabled = false;
}

// Event listeners
dateModeBtn.addEventListener('click', () => switchMode('date'));
durationModeBtn.addEventListener('click', () => switchMode('duration'));
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resumeBtn.addEventListener('click', resumeTimer);
resetBtn.addEventListener('click', resetTimer);
stopBtn.addEventListener('click', stopTimer);

// Initialize
initializeDefaultDate();
updateDisplay(0, 0, 0, 0);