// HORIZON — GAME 2: CLOSEST WINS
// Five numerical estimation questions. Each is worth up to 200 points.
// Scoring rewards relative accuracy: exact = 200; twice the true value = 100;
// an error equal to or greater than the true value = 0.

startBtn.addEventListener("click", startGame);
const questions = [
  {
    category: "SPACE & SCIENCE",
    question: "What is the average distance from Earth to the Moon?",
    hint: "Use the average distance, not the closest or farthest point.",
    unit: "kilometers",
    answer: 384400
  },
  {
    category: "ENGINEERING",
    question: "How tall is the Eiffel Tower, including its antenna?",
    hint: "Give your estimate in meters.",
    unit: "meters",
    answer: 330
  },
  {
    category: "HUMAN BODY",
    question: "How many bones are typically in an adult human body?",
    hint: "Enter a whole-number estimate.",
    unit: "bones",
    answer: 206
  },
  {
    category: "OUR PLANET",
    question: "About how many kilometers long is the Great Wall of China, including all of its branches?",
    hint: "A large number is expected.",
    unit: "kilometers",
    answer: 21196
  },
  {
    category: "SPACE & SCIENCE",
    question: "How old is Earth?",
    hint: "Enter your estimate in billions of years.",
    unit: "billion years",
    answer: 4.54
  }
];

let currentQuestion = 0;
let totalScore = 0;
let results = [];

const introScreen = document.getElementById("intro-screen");
const gameScreen = document.getElementById("game-screen");
const resultsScreen = document.getElementById("results-screen");
const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const estimateInput = document.getElementById("estimate-input");
const feedback = document.getElementById("feedback");

startBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", submitEstimate);
nextBtn.addEventListener("click", nextQuestion);
estimateInput.addEventListener("keydown", event => {
  if (event.key === "Enter") submitEstimate();
});

function startGame() {
  currentQuestion = 0;
  totalScore = 0;
  results = [];
  introScreen.classList.add("hidden");
  resultsScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question-number").textContent = currentQuestion + 1;
  document.getElementById("score").textContent = totalScore;
  document.getElementById("progress-fill").style.width =
    `${(currentQuestion / questions.length) * 100}%`;
  document.getElementById("category").textContent = q.category;
  document.getElementById("question-text").textContent = q.question;
  document.getElementById("unit-hint").textContent = q.hint;
  document.getElementById("unit-suffix").textContent = q.unit;
  estimateInput.value = "";
  estimateInput.disabled = false;
  submitBtn.disabled = false;
  submitBtn.classList.remove("hidden");
  document.getElementById("error-message").textContent = "";
  feedback.classList.add("hidden");
  estimateInput.focus();
}

function submitEstimate() {
  const raw = estimateInput.value.trim();
  const guess = Number(raw);
  const error = document.getElementById("error-message");

  if (raw === "" || !Number.isFinite(guess) || guess < 0) {
    error.textContent = "Enter a valid number greater than or equal to zero.";
    return;
  }

  const q = questions[currentQuestion];
  const difference = Math.abs(guess - q.answer);
  const accuracy = Math.max(0, 1 - difference / q.answer);
  const points = Math.round(accuracy * 200);

  totalScore += points;
  results.push({ question: q.question, guess, answer: q.answer, points, unit: q.unit });

  estimateInput.disabled = true;
  submitBtn.classList.add("hidden");
  document.getElementById("score").textContent = totalScore;
  document.getElementById("progress-fill").style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  document.getElementById("feedback-title").textContent =
    points === 200 ? "PERFECT ESTIMATE" : points >= 150 ? "INCREDIBLY CLOSE" : points >= 75 ? "NOT BAD" : "KEEP CALIBRATING";
  document.getElementById("feedback-copy").textContent =
    `Your estimate: ${formatNumber(guess)} ${q.unit}. Actual answer: ${formatNumber(q.answer)} ${q.unit}.`;
  document.getElementById("points-earned").textContent = `+${points} POINTS`;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "VIEW RESULTS" : "NEXT QUESTION";
  feedback.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  gameScreen.classList.add("hidden");
  resultsScreen.classList.remove("hidden");
  document.getElementById("final-score").textContent = totalScore;

  const message = totalScore >= 900 ? "Exceptional instincts. Your estimates were remarkably precise."
    : totalScore >= 700 ? "Great work. You have a strong sense of scale."
    : totalScore >= 400 ? "A solid run. Every estimate gets you closer."
    : "Every expert starts somewhere. Come back for the next daily challenge.";
  document.getElementById("result-message").textContent = message;

  const review = document.getElementById("answer-review");
  review.innerHTML = "";
  results.forEach((result, index) => {
    const row = document.createElement("div");
    row.className = "review-row";
    const label = document.createElement("span");
    label.textContent = `${index + 1}. You: ${formatNumber(result.guess)} ${result.unit}`;
    const score = document.createElement("strong");
    score.textContent = `${result.points}/200`;
    row.append(label, score);
    review.appendChild(row);
  });
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
}
