import './style.css'

// 가위바위보 옵션 상수
const SCISSORS = 0;
const ROCK = 1;
const PAPER = 2;
const choices = ['가위', '바위', '보'];
const emojis = ['✌️', '✊', '🖐'];

// 타이머 및 애니메이션 변수
let timer = 10;
let timerInterval;
let emojiInterval;
let currentEmojiIndex = 0;
let gameRunning = true;

// DOM 요소 가져오기
const resultDiv = document.getElementById('result');
const timerDiv = document.getElementById('timer');
const emojiDiv = document.getElementById('emoji');
const resetButton = document.getElementById('reset'); // 초기화 버튼

// 버튼에 이벤트 리스너 추가
document.getElementById('rock').addEventListener('click', () => playGame(ROCK));
document
  .getElementById('scissors')
  .addEventListener('click', () => playGame(SCISSORS));
document
  .getElementById('paper')
  .addEventListener('click', () => playGame(PAPER));
resetButton.addEventListener('click', resetGame); // 초기화 버튼 이벤트

// 게임 시작 함수
function playGame(playerChoice) {
  if (!gameRunning) return; // 게임이 이미 끝난 상태면 실행하지 않음

  // 애니메이션 멈추기
  clearInterval(emojiInterval);
  gameRunning = false; // 게임 상태 업데이트

  const computerChoice = currentEmojiIndex; // 현재 애니메이션 상태의 인덱스를 컴퓨터 선택으로 간주
  const result = determineWinner(playerChoice, computerChoice);

  // 결과 표시
  resultDiv.textContent = `당신: ${choices[playerChoice]}, 컴퓨터: ${choices[computerChoice]} - ${result}`;

  // 타이머 초기화
  clearInterval(timerInterval);
}

// 승리 판별 함수
function determineWinner(player, computer) {
  if (player === computer) return '비김!';
  if (
    (player === ROCK && computer === SCISSORS) ||
    (player === SCISSORS && computer === PAPER) ||
    (player === PAPER && computer === ROCK)
  ) {
    return '당신의 승리!';
  } else {
    return '컴퓨터의 승리!';
  }
}

// 애니메이션 함수
function startEmojiAnimation() {
  emojiInterval = setInterval(() => {
    // currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length;
    currentEmojiIndex = Math.floor(Math.random() * emojis.length);
    console.log("🚀 ~ emojiInterval=setInterval ~ currentEmojiIndex:", currentEmojiIndex)
    emojiDiv.textContent = emojis[currentEmojiIndex];
  }, 500);
}

// 타이머 함수
function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    timerDiv.textContent = `남은 시간: ${timer}초`;
    if (timer === 0) {
      clearInterval(timerInterval);
      clearInterval(emojiInterval);
      resultDiv.textContent = '시간 초과! 게임이 종료되었습니다.';
      gameRunning = false;
    }
  }, 1000);
}

// 게임 초기화 함수
function resetGame() {
  // 변수 초기화
  timer = 10;
  currentEmojiIndex = 0;
  gameRunning = true;

  // 초기 상태로 UI 업데이트
  resultDiv.textContent = '게임 결과가 여기에 표시됩니다.';
  timerDiv.textContent = `남은 시간: ${timer}초`;
  emojiDiv.textContent = emojis[currentEmojiIndex];

  // 타이머와 애니메이션 다시 시작
  clearInterval(timerInterval);
  clearInterval(emojiInterval);
  startTimer();
  startEmojiAnimation();
}

// 초기 타이머 및 애니메이션 시작
startTimer();
startEmojiAnimation();
