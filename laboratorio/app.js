const ELEMENTS = [
  [1,"H","Hidrógeno"],[2,"He","Helio"],[3,"Li","Litio"],[4,"Be","Berilio"],
  [5,"B","Boro"],[6,"C","Carbono"],[7,"N","Nitrógeno"],[8,"O","Oxígeno"],
  [9,"F","Flúor"],[10,"Ne","Neón"],[11,"Na","Sodio"],[12,"Mg","Magnesio"],
  [13,"Al","Aluminio"],[14,"Si","Silicio"],[15,"P","Fósforo"],[16,"S","Azufre"],
  [17,"Cl","Cloro"],[18,"Ar","Argón"],[19,"K","Potasio"],[20,"Ca","Calcio"]
].map(([number, symbol, name]) => ({ number, symbol, name }));

const MODES = {
  flash: { icon: "⚡", title: "Símbolo relámpago", skill: "Velocidad", description: "Relaciona símbolos y nombres antes de que se acabe el tiempo.", color: "#fff0a8", symbol: "Na" },
  locate: { icon: "🎯", title: "Encuéntralo", skill: "Observación", description: "Localiza rápidamente el elemento correcto en el tablero.", color: "#c9f3f5", symbol: "O" },
  compare: { icon: "⚖️", title: "¿Cuál gana?", skill: "Razonamiento", description: "Compara elementos por su número atómico.", color: "#ffd4d1", symbol: ">" },
  memory: { icon: "🧩", title: "Memoria química", skill: "Memoria", description: "Encuentra las parejas de símbolos y nombres.", color: "#dcd2ff", symbol: "?" }
};

const $ = (id) => document.getElementById(id);
const screens = ["menuScreen", "countdownScreen", "gameScreen", "resultScreen"];
let currentMode = "flash";
let mixedMode = false;
let score = 0;
let streak = 0;
let bestStreak = 0;
let correct = 0;
let attempts = 0;
let timeLeft = 30;
let timer = null;
let locked = false;
let audioContext = null;
let memoryState = null;

function showScreen(id) {
  screens.forEach((screen) => { $(screen).hidden = screen !== id; });
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sample(items, amount) {
  return shuffle(items).slice(0, amount);
}

function renderMenu() {
  $("modeGrid").replaceChildren(...Object.entries(MODES).map(([id, mode]) => {
    const button = document.createElement("button");
    button.className = "mode-card";
    button.style.setProperty("--card-color", mode.color);
    button.dataset.symbol = mode.symbol;
    button.innerHTML = `<span class="icon">${mode.icon}</span><strong>${mode.title}</strong><small>${mode.description}</small>`;
    button.addEventListener("click", () => beginCountdown(id, false));
    return button;
  }));
  $("bestScore").textContent = localStorage.getItem("mandy-laboratorio-best") || "0";
}

async function beginCountdown(mode, isMixed) {
  currentMode = mode;
  mixedMode = isMixed;
  showScreen("countdownScreen");
  $("countdownMode").textContent = isMixed ? "Desafío mixto" : MODES[mode].title;
  for (let value = 3; value > 0; value -= 1) {
    $("countdownNumber").textContent = value;
    playTone(340 + value * 70, .08, "sine");
    await new Promise((resolve) => setTimeout(resolve, 650));
  }
  startGame();
}

function startGame() {
  score = streak = bestStreak = correct = attempts = 0;
  timeLeft = 30;
  locked = false;
  showScreen("gameScreen");
  updateHud();
  nextChallenge();
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft -= 1;
    updateHud();
    if (timeLeft <= 0) finishGame();
  }, 1000);
}

function updateHud() {
  $("scoreLabel").textContent = score;
  $("streakLabel").textContent = streak;
  $("timeLabel").textContent = timeLeft;
  $("timeBar").style.width = `${Math.max(0, timeLeft / 30 * 100)}%`;
  $("timeBar").style.background = timeLeft <= 8 ? "#ff766c" : "linear-gradient(90deg, #2ebbd1, #36b87d)";
}

function nextChallenge() {
  locked = false;
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  $("prompt").classList.remove("compare-prompt");
  if (mixedMode) currentMode = sample(Object.keys(MODES), 1)[0];
  const mode = MODES[currentMode];
  $("modeBadge").textContent = `${mode.icon} ${mode.title}`;
  if (currentMode === "flash") renderFlash();
  if (currentMode === "locate") renderLocate();
  if (currentMode === "compare") renderCompare();
  if (currentMode === "memory") renderMemory();
}

function renderAnswers(options, correctValue) {
  const grid = document.createElement("div");
  grid.className = "answer-grid";
  options.forEach((value) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = value;
    button.addEventListener("click", () => judge(value === correctValue, button, correctValue));
    grid.append(button);
  });
  $("challengeArea").replaceChildren(grid);
}

function renderFlash() {
  const target = sample(ELEMENTS, 1)[0];
  const symbolPrompt = Math.random() < .5;
  const answer = symbolPrompt ? target.name : target.symbol;
  const optionCount = streak >= 4 ? 4 : 3;
  const distractors = sample(ELEMENTS.filter((item) => item !== target), optionCount - 1)
    .map((item) => symbolPrompt ? item.name : item.symbol);
  $("instruction").textContent = symbolPrompt ? "¿Cómo se llama este elemento?" : "¿Cuál es su símbolo?";
  $("prompt").textContent = symbolPrompt ? target.symbol : target.name;
  renderAnswers(shuffle([answer, ...distractors]), answer);
}

function renderLocate() {
  const target = sample(ELEMENTS, 1)[0];
  const count = streak >= 4 ? 20 : streak >= 2 ? 15 : 10;
  const choices = shuffle([target, ...sample(ELEMENTS.filter((item) => item !== target), count - 1)]);
  $("instruction").textContent = "Toca el elemento indicado";
  $("prompt").textContent = target.name;
  const grid = document.createElement("div");
  grid.className = "element-grid";
  choices.forEach((element) => {
    const button = document.createElement("button");
    button.className = "element-button";
    button.innerHTML = `${element.symbol}<small>${element.number}</small>`;
    button.addEventListener("click", () => judge(element === target, button, target.symbol));
    grid.append(button);
  });
  $("challengeArea").replaceChildren(grid);
}

function renderCompare() {
  const [first, second] = sample(ELEMENTS, 2);
  const wantsGreater = Math.random() < .5;
  const winner = wantsGreater
    ? (first.number > second.number ? first : second)
    : (first.number < second.number ? first : second);
  $("instruction").textContent = "Elige uno";
  const keyword = document.createElement("span");
  keyword.className = `compare-keyword ${wantsGreater ? "greater" : "lower"}`;
  keyword.textContent = wantsGreater ? "mayor" : "menor";
  $("prompt").replaceChildren(
    document.createTextNode("¿Cuál tiene "),
    keyword,
    document.createTextNode(" número atómico?")
  );
  $("prompt").classList.add("compare-prompt");
  const grid = document.createElement("div");
  grid.className = "answer-grid";
  shuffle([first, second]).forEach((element) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = element.name;
    button.addEventListener("click", () => judge(
      element === winner,
      button,
      `${winner.name}, número atómico ${winner.number}`
    ));
    grid.append(button);
  });
  $("challengeArea").replaceChildren(grid);
}

function renderMemory() {
  if (!memoryState || memoryState.complete) {
    const pairCount = streak >= 3 ? 4 : 3;
    const elements = sample(ELEMENTS, pairCount);
    memoryState = {
      complete: false,
      open: [],
      matched: 0,
      cards: shuffle(elements.flatMap((element) => [
        { pair: element.number, label: element.symbol },
        { pair: element.number, label: element.name }
      ]))
    };
  }
  $("instruction").textContent = "Encuentra cada símbolo y su nombre";
  $("prompt").textContent = "Memoria";
  const grid = document.createElement("div");
  grid.className = "memory-grid";
  memoryState.cards.forEach((card, index) => {
    const button = document.createElement("button");
    button.className = `memory-card${card.matched ? " matched" : ""}`;
    button.textContent = card.label;
    button.disabled = Boolean(card.matched);
    button.addEventListener("click", () => revealMemory(index, button));
    grid.append(button);
  });
  $("challengeArea").replaceChildren(grid);
}

function revealMemory(index, button) {
  if (locked || memoryState.open.includes(index)) return;
  button.classList.add("revealed");
  memoryState.open.push(index);
  if (memoryState.open.length < 2) return;
  locked = true;
  attempts += 1;
  const [firstIndex, secondIndex] = memoryState.open;
  const isMatch = memoryState.cards[firstIndex].pair === memoryState.cards[secondIndex].pair;
  if (isMatch) {
    memoryState.cards[firstIndex].matched = memoryState.cards[secondIndex].matched = true;
    memoryState.matched += 1;
    reward(true);
    setTimeout(() => {
      memoryState.open = [];
      locked = false;
      if (memoryState.matched === memoryState.cards.length / 2) {
        memoryState.complete = true;
        playCompletionJingle();
        $("feedback").textContent = "¡Serie completada! ✨";
        setTimeout(nextChallenge, 650);
      } else renderMemory();
    }, 400);
  } else {
    reward(false);
    setTimeout(() => {
      memoryState.open = [];
      locked = false;
      renderMemory();
    }, 650);
  }
}

function judge(isCorrect, button, expected) {
  if (locked) return;
  locked = true;
  attempts += 1;
  button.classList.add(isCorrect ? "correct" : "wrong");
  reward(isCorrect, expected);
  setTimeout(nextChallenge, isCorrect ? 430 : 1750);
}

function reward(isCorrect, expected = "") {
  if (isCorrect) {
    correct += 1;
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);
    score += 10 + Math.min(10, streak * 2);
    $("feedback").textContent = streak >= 4 ? `¡Racha x${streak}!` : "¡Muy bien!";
    $("feedback").className = "feedback good";
    flashCard("flash-good");
    playJingle(true);
  } else {
    streak = 0;
    $("feedback").textContent = expected ? `Era ${expected}` : "¡Casi! Inténtalo de nuevo";
    $("feedback").className = "feedback bad";
    flashCard("flash-bad");
    playJingle(false);
  }
  updateHud();
}

function flashCard(className) {
  const card = $("challengeCard");
  card.classList.remove("flash-good", "flash-bad");
  void card.offsetWidth;
  card.classList.add(className);
}

function playTone(frequency, duration, type = "sine", delay = 0) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    audioContext ||= new AudioContextClass();
    if (audioContext.state === "suspended") audioContext.resume();
    const start = audioContext.currentTime + delay;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(.12, start + .01);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(start + duration);
  } catch (_) { /* El juego continúa aunque el navegador bloquee el audio. */ }
}

function playJingle(isCorrect) {
  if (isCorrect) {
    playTone(523.25, .14);
    playTone(659.25, .16, "sine", .08);
  } else {
    playTone(246.94, .2, "triangle");
    playTone(196, .22, "triangle", .12);
  }
}

function playCompletionJingle() {
  playTone(659.25, .18, "sine");
  playTone(783.99, .2, "sine", .11);
  playTone(1046.5, .28, "sine", .23);
}

function finishGame() {
  if ($("gameScreen").hidden) return;
  clearInterval(timer);
  timer = null;
  locked = true;
  const accuracy = attempts ? Math.round(correct / attempts * 100) : 0;
  const previousBest = Number(localStorage.getItem("mandy-laboratorio-best") || 0);
  if (score > previousBest) localStorage.setItem("mandy-laboratorio-best", String(score));
  $("finalScore").textContent = score;
  $("correctStat").textContent = correct;
  $("accuracyStat").textContent = `${accuracy}%`;
  $("bestStreakStat").textContent = bestStreak;
  $("resultMedal").textContent = score >= 250 ? "🏆" : score >= 130 ? "🥇" : "🧪";
  $("resultTitle").textContent = score >= 250 ? "¡Cerebro brillante!" : score >= 130 ? "¡Gran experimento!" : "¡Buen entrenamiento!";
  $("resultMessage").textContent = accuracy >= 85
    ? "Tu precisión fue excelente. Prueba otra habilidad para completar tu perfil científico."
    : "Cada intento fortalece tu memoria química. ¡La próxima ronda será aún mejor!";
  showScreen("resultScreen");
}

function leaveGame() {
  clearInterval(timer);
  timer = null;
  memoryState = null;
  renderMenu();
  showScreen("menuScreen");
}

$("mixBtn").addEventListener("click", () => beginCountdown("flash", true));
$("exitBtn").addEventListener("click", leaveGame);
$("menuBtn").addEventListener("click", leaveGame);
$("retryBtn").addEventListener("click", () => beginCountdown(currentMode, mixedMode));
renderMenu();
