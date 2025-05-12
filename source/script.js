// TODO Remove break input.

let workDuration = 25;
let breakDuration = 5;
let timerInterval;
let isRunning = false;
let isPaused = false;
let currentTime = 0;
const endSound = new Audio('01_bedside.ogg');

document.getElementById('start-button').addEventListener('click', startTimer);
document.getElementById('pause-button').addEventListener('click', pauseTimer);
document.getElementById('stop-button').addEventListener('click', stopTimer);

function startTimer() {
  workDuration = parseInt(document.getElementById('work-duration').value);
  currentTime = workDuration * 60;
  isRunning = true;
  isPaused = false;
  timerInterval = setInterval(updateTimer, 1000);
  document.getElementById('start-button').disabled = true;
  document.getElementById('pause-button').disabled = false;
  document.getElementById('stop-button').disabled = false;
}

function pauseTimer() {
  isPaused = true;
  clearInterval(timerInterval);
  document.getElementById('pause-button').disabled = true;
  document.getElementById('start-button').disabled = false;
}

function stopTimer() {
  isRunning = false;
  isPaused = false;
  clearInterval(timerInterval);
  currentTime = 0;
  document.getElementById('timer-display').textContent = '00:00';
  document.getElementById('start-button').disabled = false;
  document.getElementById('pause-button').disabled = true;
  document.getElementById('stop-button').disabled = true;
}

function updateTimer() {
  if (isRunning && !isPaused) {
    currentTime--;
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    document.getElementById('timer-display').textContent = `${padZero(minutes)}:${padZero(seconds)}`;
    if (currentTime === 0) {
      isRunning = false;
      clearInterval(timerInterval);
      endSound.play();
    }
  }
}

function padZero(number) {
  return (number < 10 ? '0' : '') + number;
}

