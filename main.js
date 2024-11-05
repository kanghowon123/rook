import "./style.css";

// 가위바위보 옵션 상수
const SCISSORS = 0;
const ROCK = 1;
const PAPER = 2;
const choices = ["가위", "바위", "보"];
const emojis = ["✌️", "✊", "🖐"];

// 타이머 및 애니메이션 변수
let timer = 5;
let timerInterval;
let computerEmojiInterval; // (이름 바꿈 호)
let userEmojiInterval; // (호)
let currentComputerEmojiIndex = 0; // (이름 바꿈)
let currentuserEmojiIndex = 0; // (호)
let gameRunning = true;

// DOM 요소 가져오기
const resultDiv = document.getElementById("result");
const timerDiv = document.getElementById("timer");
const computerDiv = document.getElementById("computer"); // (호)
const userDiv = document.getElementById("user"); // (호)

const resetButton = document.getElementById("reset"); // 초기화 버튼

// 버튼에 이벤트 리스너 추가
document.getElementById("rock").addEventListener("click", () => playGame(ROCK));
document.getElementById("scissors").addEventListener("click", () => playGame(SCISSORS));
document.getElementById("paper").addEventListener("click", () => playGame(PAPER));
resetButton.addEventListener("click", resetGame); // 초기화 버튼 이벤트

// 게임 시작 함수
function playGame(playerChoice) {
  if (!gameRunning) return; // 게임이 이미 끝난 상태면 실행하지 않음

  // 애니메이션 멈추기
  clearInterval(computerEmojiInterval);
  clearInterval(userEmojiInterval); //(호)
  gameRunning = false; // 게임 상태 업데이트

  const computerChoice = currentComputerEmojiIndex; // 현재 애니메이션 상태의 인덱스를 컴퓨터 선택으로 간주
  const result = determineWinner(playerChoice, computerChoice);
  // 결과 표시
  resultDiv.textContent = `컴퓨터: ${choices[computerChoice]}, 당신: ${choices[playerChoice]} - ${result}`;
  userDiv.textContent = emojis[playerChoice]; //(호)
  // 타이머 초기화
  clearInterval(timerInterval);
}

// 승리 판별 함수
function determineWinner(player, computer) {
  if (player === computer) return "비김!";
  if (
    (player === ROCK && computer === SCISSORS) ||
    (player === SCISSORS && computer === PAPER) ||
    (player === PAPER && computer === ROCK)
  ) {
    return "당신의 승리!";
  } else {
    return "컴퓨터의 승리!";
  }
}

function random(){
  return Math.floor(Math.random() * emojis.length);
}

// 애니메이션 함수  컴퓨터 함수이름바꿈(호)
function startComputerEmojiAnimation() {
  computerEmojiInterval = setInterval(() => {
    currentComputerEmojiIndex = random();
    computerDiv.textContent = emojis[currentComputerEmojiIndex];
  }, 200);
}
// 애니메이션 함수 유저 함수(호)
function startUserEmojiAnimation() {
  userEmojiInterval = setInterval(() => {
    currentuserEmojiIndex = random();
    userDiv.textContent = emojis[currentuserEmojiIndex];
  }, 200);
}

// 타이머 함수
function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    timerDiv.textContent = `남은 시간: ${timer}초`;
    if (timer === 0) {
      clearInterval(timerInterval);
      clearInterval(computerEmojiInterval);
      clearInterval(userEmojiInterval); //(호)
      resultDiv.textContent = "시간 초과! 게임이 종료되었습니다.";
      gameRunning = false;
    }
  }, 1000);
}

// 게임 초기화 함수
function resetGame() {
  // 변수 초기화
  timer = 5;
  currentComputerEmojiIndex = 0;
  gameRunning = true;

  // 초기 상태로 UI 업데이트
  resultDiv.textContent = "게임 결과가 여기에 표시됩니다.";
  timerDiv.textContent = `남은 시간: ${timer}초`;

  // 타이머와 애니메이션 다시 시작
  clearInterval(timerInterval);
  clearInterval(computerEmojiInterval);
  clearInterval(userEmojiInterval);
  startTimer();
  startComputerEmojiAnimation();
  startUserEmojiAnimation(); //호
}

// 초기 타이머 및 애니메이션 시작
startTimer();
startComputerEmojiAnimation();
startUserEmojiAnimation(); //호
