// ======================
// HORIZON - Game 1 Logic
// ======================

const prompts = [
  "Name a word that ends in -ship",
  "Name a character from an anime",
  "Name a country that contains the letter P",
  "Name an actor who has appeared in an MCU film",
  "Name a planet or moon in our solar system (not Earth)",
  "Name a constellation",
  "Name a science fiction movie from before 2000"
];

// Simple rarity simulation (will later be replaced with real player data)
const rarityScores = {
  common: 15,
  uncommon: 35,
  rare: 60,
  deep: 85,
  krillion: 100
};

let currentPrompt = 0;
let totalScore = 0;
let timeLeft = 25;
let timerInterval = null;
let gameActive = false;

// DOM elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');
const beginBtn = document.getElementById('begin-btn');
const submitBtn = document.getElementById('submit-btn');
const answerInput = document.getElementById('answer-input');
const promptText = document.getElementById('prompt-text');
const promptNum = document.getElementById('prompt-num');
const timerDisplay = document.getElementById('timer');
const currentScoreEl = document.getElementById('current-score');
const currentDepthEl = document.getElementById('current-depth');
const feedback = document.getElementById('feedback');
const ship = document.getElementById('ship');
const playAgainBtn = document.getElementById('play-again-btn');

// Start game
beginBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', () => {
  resultsScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  resetGame();
});

submitBtn.addEventListener('click', submitAnswer);
answerInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') submitAnswer();
});

function startGame() {
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  currentPrompt = 0;
  totalScore = 0;
  updateScore();
  showPrompt();
}

function showPrompt() {
  if (currentPrompt >= prompts.length) {
    endGame();
    return;
  }

  gameActive = true;
  promptNum.textContent = currentPrompt + 1;
  promptText.textContent = prompts[currentPrompt];
  answerInput.value = '';
  answerInput.focus();
  feedback.textContent = '';
  feedback.className = 'feedback';

  timeLeft = 25;
  timerDisplay.textContent = timeLeft;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function submitAnswer() {
  if (!gameActive) return;
  const answer = answerInput.value.trim();
  if (!answer) return;

  clearInterval(timerInterval);
  gameActive = false;

  // Temporary scoring (later this will use real rarity data)
  const points = getTemporaryScore(answer);
  totalScore += points;
  updateScore();
  moveShip();

  feedback.className = 'feedback correct';
  feedback.innerHTML = `+${points} points<br>Depth: ${totalScore * 10}m`;

  setTimeout(() => {
    currentPrompt++;
    showPrompt();
  }, 1600);
}

function handleTimeout() {
  gameActive = false;
  feedback.className = 'feedback wrong';
  feedback.textContent = "Time's up. No points.";
  setTimeout(() => {
    currentPrompt++;
    showPrompt();
  }, 1500);
}

function getTemporaryScore(answer) {
  // Very basic placeholder rarity.
  // Later this will be replaced with real player answer frequency.
  const len = answer.length;
  if (len <= 4) return rarityScores.common;
  if (len <= 7) return rarityScores.uncommon;
  if (len <= 11) return rarityScores.rare;
  if (len <= 15) return rarityScores.deep;
  return rarityScores.krillion;
}

function updateScore() {
  currentScoreEl.textContent = totalScore;
  currentDepthEl.textContent = totalScore * 10;
}

function moveShip() {
  // Move ship based on score (0 → 700 points maps to left position)
  const progress = Math.min(totalScore / 700, 1);
  const leftPercent = 10 + (progress * 75);
  ship.style.left = leftPercent + '%';
}

function endGame() {
  gameScreen.classList.add('hidden');
  resultsScreen.classList.remove('hidden');

  document.getElementById('final-score').textContent = totalScore;
  document.getElementById('final-depth').textContent = totalScore * 10;

  // Show exoplanets reached
  const exo = document.getElementById('exoplanets-found');
  let html = '';
  if (totalScore >= 100) html += 'Exoplanet reached at 100 pts<br>';
  if (totalScore >= 200) html += 'Exoplanet reached at 200 pts<br>';
  if (totalScore >= 300) html += 'Exoplanet reached at 300 pts<br>';
  if (totalScore >= 400) html += 'Exoplanet reached at 400 pts<br>';
  if (totalScore >= 500) html += 'Exoplanet reached at 500 pts<br>';
  if (totalScore >= 600) html += 'Exoplanet reached at 600 pts<br>';
  if (totalScore >= 700) html += '<strong>Golden Exoplanet reached at 700 pts</strong>';
  exo.innerHTML = html || 'No exoplanets reached today';
}

function resetGame() {
  currentPrompt = 0;
  totalScore = 0;
  ship.style.left = '10%';
  clearInterval(timerInterval);
}
