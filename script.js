const STORAGE_KEY = "chemistry-profiles-v2";
const LEGACY_STORAGE_KEY = "chemistry-profiles";
const ACTIVE_PROFILE_KEY = "chemistry-active-profile";
const ROUND_COUNT = 8;

const ELEMENTS = [
  { number: 1, symbol: "H", name: "Hidrógeno", group: 1, period: 1, family: "no-metal", fact: "Es el elemento más ligero y abundante del universo." },
  { number: 2, symbol: "He", name: "Helio", group: 18, period: 1, family: "noble", fact: "Se usa para refrigeración extrema y para presurizar sistemas espaciales." },
  { number: 3, symbol: "Li", name: "Litio", group: 1, period: 2, family: "alcalino", fact: "Es clave en muchas baterías recargables." },
  { number: 4, symbol: "Be", name: "Berilio", group: 2, period: 2, family: "alcalinoterreo", fact: "Es ligero, rígido y se usa en aleaciones especiales." },
  { number: 5, symbol: "B", name: "Boro", group: 13, period: 2, family: "metaloide", fact: "Ayuda a fabricar vidrio resistente al calor." },
  { number: 6, symbol: "C", name: "Carbono", group: 14, period: 2, family: "no-metal", fact: "Es la base de las moléculas orgánicas y de la vida conocida." },
  { number: 7, symbol: "N", name: "Nitrógeno", group: 15, period: 2, family: "no-metal", fact: "Constituye cerca del 78 % de la atmósfera terrestre." },
  { number: 8, symbol: "O", name: "Oxígeno", group: 16, period: 2, family: "no-metal", fact: "Es esencial para la respiración de muchos seres vivos." },
  { number: 9, symbol: "F", name: "Flúor", group: 17, period: 2, family: "halogeno", fact: "Sus compuestos se utilizan en dentífricos y materiales resistentes." },
  { number: 10, symbol: "Ne", name: "Neón", group: 18, period: 2, family: "noble", fact: "Emite un brillo rojizo anaranjado en letreros luminosos." },
  { number: 11, symbol: "Na", name: "Sodio", group: 1, period: 3, family: "alcalino", fact: "Combinado con cloro forma la sal de mesa." },
  { number: 12, symbol: "Mg", name: "Magnesio", group: 2, period: 3, family: "alcalinoterreo", fact: "Arde con una luz blanca muy intensa." },
  { number: 13, symbol: "Al", name: "Aluminio", group: 13, period: 3, family: "metal", fact: "Es ligero, resistente y muy reciclable." },
  { number: 14, symbol: "Si", name: "Silicio", group: 14, period: 3, family: "metaloide", fact: "Es fundamental en chips y dispositivos electrónicos." },
  { number: 15, symbol: "P", name: "Fósforo", group: 15, period: 3, family: "no-metal", fact: "Forma parte del ADN y participa en la energía celular." },
  { number: 16, symbol: "S", name: "Azufre", group: 16, period: 3, family: "no-metal", fact: "Es importante para proteínas y fertilizantes." },
  { number: 17, symbol: "Cl", name: "Cloro", group: 17, period: 3, family: "halogeno", fact: "Sus compuestos se emplean para desinfectar agua." },
  { number: 18, symbol: "Ar", name: "Argón", group: 18, period: 3, family: "noble", fact: "Protege materiales calientes de reacciones con el aire." },
  { number: 19, symbol: "K", name: "Potasio", group: 1, period: 4, family: "alcalino", fact: "Ayuda al funcionamiento de nervios y músculos." },
  { number: 20, symbol: "Ca", name: "Calcio", group: 2, period: 4, family: "alcalinoterreo", fact: "Es un componente importante de huesos y dientes." }
];

const FAMILY_NAMES = {
  alcalino: "Metal alcalino", alcalinoterreo: "Alcalinotérreo", metal: "Metal",
  metaloide: "Metaloide", "no-metal": "No metal", halogeno: "Halógeno", noble: "Gas noble"
};

const CONCEPT_QUESTIONS = [
  {
    id: "periodic-table", prompt: "¿Qué es la tabla periódica?",
    options: ["Una organización de los elementos químicos", "Una lista de mezclas", "Una tabla de fórmulas matemáticas", "Un catálogo de planetas"],
    answer: "Una organización de los elementos químicos",
    explanation: "La tabla periódica organiza los elementos según su número atómico y sus propiedades."
  },
  {
    id: "atomic-number", prompt: "¿Qué indica el número atómico de un elemento?",
    options: ["La cantidad de protones", "La cantidad de moléculas", "Su temperatura", "El año en que fue descubierto"],
    answer: "La cantidad de protones",
    explanation: "El número atómico es la cantidad de protones en el núcleo y define al elemento."
  },
  {
    id: "symbol", prompt: "¿Qué representa el símbolo químico, como O o Na?",
    options: ["Una abreviatura universal del elemento", "Su estado físico", "Su número de neutrones", "El nombre de su descubridor"],
    answer: "Una abreviatura universal del elemento",
    explanation: "Cada elemento posee un símbolo de una o dos letras; la primera siempre es mayúscula."
  },
  {
    id: "groups", prompt: "¿Qué son los grupos de la tabla periódica?",
    options: ["Las columnas verticales", "Las filas horizontales", "Los números atómicos", "Los elementos artificiales"],
    answer: "Las columnas verticales",
    explanation: "Los grupos son columnas; sus elementos suelen compartir propiedades químicas."
  },
  {
    id: "periods", prompt: "¿Qué son los períodos de la tabla periódica?",
    options: ["Las filas horizontales", "Las columnas verticales", "Los símbolos químicos", "Las familias de gases"],
    answer: "Las filas horizontales",
    explanation: "Los períodos son filas y se relacionan con los niveles de energía de los electrones."
  },
  {
    id: "families", prompt: "¿Por qué algunos elementos se agrupan en familias?",
    options: ["Porque tienen propiedades semejantes", "Porque pesan exactamente lo mismo", "Porque fueron descubiertos juntos", "Porque tienen el mismo símbolo"],
    answer: "Porque tienen propiedades semejantes",
    explanation: "Una familia reúne elementos con comportamientos químicos parecidos, como los gases nobles."
  }
];

const $ = (id) => document.getElementById(id);
const profileForm = $("profileForm");
const profileNameInput = $("profileName");
const profileList = $("profileList");
const periodicBoard = $("periodicBoard");
const questionText = $("questionText");
const optionsContainer = $("optionsContainer");
const feedback = $("feedback");
const summaryCard = $("summaryCard");

let profiles = loadProfiles();
let activeProfile = getInitialProfile();
let score = 0;
let round = 0;
let streak = 0;
let bestStreak = 0;
let correctCount = 0;
let questions = [];
let currentQuestion = null;
let answerLocked = false;
let nextQuestionTimer = null;
let mistakes = [];

renderProfiles();
renderPeriodicTable();
renderLegend();
resetGame();
updateProfilePanel(!activeProfile);

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = profileNameInput.value.trim();
  if (!name) return;
  const profile = { id: makeId(), name, bestScore: 0, gamesPlayed: 0, progress: {} };
  profiles.push(profile);
  saveProfiles();
  renderProfiles();
  activateProfile(profile);
  profileNameInput.value = "";
});

$("startGameBtn").addEventListener("click", startGame);
$("restartGameBtn").addEventListener("click", () => activeProfile ? startGame() : resetGame());
$("toggleBoardBtn").addEventListener("click", toggleBoard);
$("toggleProfileBtn").addEventListener("click", () => updateProfilePanel(true));
$("closeProfileBtn").addEventListener("click", () => updateProfilePanel(false));

function makeId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
}

function loadProfiles() {
  try {
    const rawProfiles = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    const saved = JSON.parse(rawProfiles);
    return Array.isArray(saved) ? saved.map((profile) => ({ ...profile, progress: profile.progress || {} })) : [];
  } catch (error) {
    console.error("No se pudieron cargar los perfiles", error);
    return [];
  }
}

function saveProfiles() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

function getInitialProfile() {
  const savedId = localStorage.getItem(ACTIVE_PROFILE_KEY);
  return profiles.find((profile) => profile.id === savedId) || profiles[0] || null;
}

function updateProfilePanel(forceOpen) {
  const panel = document.querySelector(".profile-panel");
  const hasProfile = Boolean(activeProfile);
  const shouldOpen = forceOpen === true || !hasProfile;
  panel.hidden = !shouldOpen;
  $("profileShortcut").hidden = !hasProfile || shouldOpen;
  $("closeProfileBtn").hidden = !hasProfile;
  $("toggleProfileBtn").textContent = hasProfile ? `👤 ${activeProfile.name}` : "👤 Perfil";
  $("toggleProfileBtn").setAttribute("aria-expanded", String(shouldOpen));
}

function renderProfiles() {
  profileList.replaceChildren();
  if (!profiles.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Crea tu primer perfil para empezar.";
    profileList.append(empty);
    return;
  }

  profiles.forEach((profile) => {
    const card = document.createElement("div");
    card.className = `profile-card${activeProfile?.id === profile.id ? " active" : ""}`;
    const info = document.createElement("div");
    const name = document.createElement("strong");
    const stats = document.createElement("div");
    name.textContent = profile.name;
    stats.className = "muted";
    stats.textContent = `Dominio: ${getMasteryPercent(profile)}% · Mejor: ${profile.bestScore} · Partidas: ${profile.gamesPlayed}`;
    info.append(name, stats);

    const actions = document.createElement("div");
    actions.className = "profile-actions";
    const play = document.createElement("button");
    play.textContent = activeProfile?.id === profile.id ? "Activo" : "Jugar";
    play.addEventListener("click", () => activateProfile(profile));
    const remove = document.createElement("button");
    const reset = document.createElement("button");
    reset.className = "icon-button";
    reset.textContent = "↺";
    reset.title = `Reiniciar progreso de ${profile.name}`;
    reset.setAttribute("aria-label", reset.title);
    reset.addEventListener("click", () => resetProfileProgress(profile.id));
    remove.className = "icon-button";
    remove.textContent = "×";
    remove.title = `Eliminar perfil ${profile.name}`;
    remove.setAttribute("aria-label", remove.title);
    remove.addEventListener("click", () => deleteProfile(profile.id));
    actions.append(play, reset, remove);
    card.append(info, actions);
    profileList.append(card);
  });
}

function activateProfile(profile) {
  activeProfile = profile;
  localStorage.setItem(ACTIVE_PROFILE_KEY, profile.id);
  $("activeProfileLabel").textContent = `👋 ${profile.name}`;
  feedback.textContent = `${profile.name}, la química te espera. ¡Pulsa empezar!`;
  renderProfiles();
  updateProfilePanel(false);
}

function deleteProfile(id) {
  profiles = profiles.filter((profile) => profile.id !== id);
  if (activeProfile?.id === id) {
    activeProfile = profiles[0] || null;
    if (activeProfile) {
      localStorage.setItem(ACTIVE_PROFILE_KEY, activeProfile.id);
      $("activeProfileLabel").textContent = `👋 ${activeProfile.name}`;
    } else {
      localStorage.removeItem(ACTIVE_PROFILE_KEY);
      $("activeProfileLabel").textContent = "Sin perfil";
    }
    resetGame();
  }
  saveProfiles();
  renderProfiles();
  updateProfilePanel(Boolean(activeProfile));
}

function resetProfileProgress(id) {
  const profile = profiles.find((item) => item.id === id);
  if (!profile) return;
  profile.bestScore = 0;
  profile.gamesPlayed = 0;
  profile.progress = {};
  saveProfiles();
  renderProfiles();
  updateStats();
  feedback.textContent = `Se reinició el progreso de ${profile.name}.`;
}

function renderPeriodicTable() {
  periodicBoard.replaceChildren();
  ELEMENTS.forEach((element) => {
    const card = document.createElement("button");
    card.className = `element-card family-${element.family}`;
    card.style.gridColumn = element.group;
    card.style.gridRow = element.period;
    card.setAttribute("aria-label", `${element.name}, símbolo ${element.symbol}, número atómico ${element.number}`);
    card.innerHTML = `<span class="number">${element.number}</span><strong class="symbol">${element.symbol}</strong><span class="name">${element.name}</span>`;
    card.addEventListener("click", () => {
      feedback.textContent = `${element.name} (${element.symbol}) · ${FAMILY_NAMES[element.family]}. ${element.fact}`;
    });
    periodicBoard.append(card);
  });
}

function renderLegend() {
  $("legend").replaceChildren(...Object.entries(FAMILY_NAMES).map(([key, label]) => {
    const item = document.createElement("span");
    item.className = `family-${key}`;
    item.textContent = label;
    return item;
  }));
}

function toggleBoard() {
  const hidden = periodicBoard.closest(".periodic-scroll").classList.toggle("is-hidden");
  $("legend").classList.toggle("is-hidden", hidden);
  $("toggleBoardBtn").textContent = hidden ? "Mostrar tabla" : "Ocultar tabla";
  $("toggleBoardBtn").setAttribute("aria-expanded", String(!hidden));
}

function resetGame() {
  clearTimeout(nextQuestionTimer);
  score = round = streak = bestStreak = correctCount = 0;
  questions = [];
  mistakes = [];
  currentQuestion = null;
  answerLocked = false;
  optionsContainer.replaceChildren();
  questionText.textContent = activeProfile ? "Pulsa empezar para una nueva partida." : "Elige un perfil y empieza a jugar.";
  feedback.textContent = "Explora la tabla y descubre algo nuevo.";
  summaryCard.hidden = true;
  if (activeProfile) $("activeProfileLabel").textContent = `👋 ${activeProfile.name}`;
  updateStats();
}

function startGame() {
  if (!activeProfile) {
    feedback.textContent = "Primero crea o selecciona un perfil.";
    profileNameInput.focus();
    return;
  }
  clearTimeout(nextQuestionTimer);
  score = round = streak = bestStreak = correctCount = 0;
  mistakes = [];
  summaryCard.hidden = true;
  questions = buildAdaptiveQuestions();
  showNextQuestion();
}

function buildAdaptiveQuestions() {
  const conceptCount = activeProfile.gamesPlayed === 0 ? 6 : activeProfile.gamesPlayed < 3 ? 4 : 2;
  const concepts = selectAdaptive(CONCEPT_QUESTIONS, conceptCount, (item) => `concept:${item.id}`)
    .map((item) => ({ ...item, kind: "concept", key: `concept:${item.id}` }));
  const elements = selectAdaptive(ELEMENTS, ROUND_COUNT - conceptCount, (item) => `element:${item.number}`)
    .map(createElementQuestion);
  return activeProfile.gamesPlayed === 0 ? [...concepts, ...elements] : shuffle([...concepts, ...elements]);
}

function createElementQuestion(element, index) {
  const types = ["symbol-to-name", "name-to-symbol", "number-to-name", "fact-to-name"];
  return { kind: "element", key: `element:${element.number}`, element, type: types[index % types.length] };
}

function showNextQuestion() {
  if (round >= ROUND_COUNT) return finishGame();
  answerLocked = false;
  currentQuestion = questions[round];
  if (currentQuestion.kind === "concept") {
    questionText.textContent = currentQuestion.prompt;
    optionsContainer.replaceChildren();
    shuffle(currentQuestion.options).forEach((option) => addOptionButton(option));
    feedback.textContent = "Elige una respuesta.";
    updateStats();
    return;
  }
  const { element, type } = currentQuestion;
  const distractors = shuffle(ELEMENTS.filter((item) => item.number !== element.number)).slice(0, 3);
  const choices = shuffle([element, ...distractors]);
  const prompts = {
    "symbol-to-name": `¿Qué elemento tiene el símbolo ${element.symbol}?`,
    "name-to-symbol": `¿Cuál es el símbolo de ${element.name}?`,
    "number-to-name": `¿Qué elemento tiene el número atómico ${element.number}?`,
    "fact-to-name": `¿Qué elemento corresponde a esta pista? “${element.fact}”`
  };
  questionText.textContent = prompts[type];
  optionsContainer.replaceChildren();
  choices.forEach((choice) => addOptionButton(type === "name-to-symbol" ? choice.symbol : choice.name, choice));
  feedback.textContent = "Elige una respuesta.";
  updateStats();
}

function addOptionButton(label, value = label) {
  const button = document.createElement("button");
  button.className = "option-btn";
  button.textContent = label;
  button.addEventListener("click", () => answerQuestion(value, button));
  optionsContainer.append(button);
}

function answerQuestion(choice, selectedButton) {
  if (answerLocked) return;
  answerLocked = true;
  const isConcept = currentQuestion.kind === "concept";
  const correct = isConcept ? choice === currentQuestion.answer : choice.number === currentQuestion.element.number;
  const expected = isConcept
    ? currentQuestion.answer
    : currentQuestion.type === "name-to-symbol" ? currentQuestion.element.symbol : currentQuestion.element.name;
  [...optionsContainer.children].forEach((button) => {
    button.disabled = true;
    if (button.textContent === expected) {
      button.classList.add("correct");
      button.textContent = `✓ ${button.textContent}`;
    }
  });

  if (correct) {
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);
    correctCount += 1;
    const bonus = Math.min(streak - 1, 4) * 2;
    score += 10 + bonus;
    const explanation = isConcept ? currentQuestion.explanation : currentQuestion.element.fact;
    feedback.textContent = `¡Correcto! +${10 + bonus} · ${explanation}`;
  } else {
    selectedButton.classList.add("wrong");
    selectedButton.textContent = `✕ ${selectedButton.textContent}`;
    streak = 0;
    const reviewName = isConcept ? currentQuestion.prompt : `${currentQuestion.element.name} (${currentQuestion.element.symbol})`;
    mistakes.push(reviewName);
    feedback.textContent = `La respuesta era “${expected}”. ${isConcept ? currentQuestion.explanation : ""}`;
  }
  updateMastery(currentQuestion.key, correct);
  saveProfiles();
  round += 1;
  updateStats();
  nextQuestionTimer = setTimeout(showNextQuestion, 1400);
}

function finishGame() {
  activeProfile.gamesPlayed += 1;
  activeProfile.bestScore = Math.max(activeProfile.bestScore, score);
  saveProfiles();
  renderProfiles();
  questionText.textContent = "¡Partida terminada!";
  optionsContainer.replaceChildren();
  feedback.textContent = `${activeProfile.name}, conseguiste ${correctCount} de ${ROUND_COUNT} respuestas.`;
  summaryCard.replaceChildren();
  const title = document.createElement("h3");
  title.textContent = score >= 80 ? "🏆 ¡Dominio elemental!" : score >= 50 ? "⚗️ ¡Buen experimento!" : "🔬 Sigue investigando";
  const metrics = document.createElement("div");
  metrics.className = "summary-metrics";
  metrics.innerHTML = `<span><strong>${score}</strong>Puntos</span><span><strong>${Math.round(correctCount / ROUND_COUNT * 100)}%</strong>Aciertos</span><span><strong>${bestStreak}</strong>Mejor racha</span>`;
  summaryCard.append(title, metrics);
  if (mistakes.length) {
    const review = document.createElement("p");
    review.textContent = `Repasa: ${mistakes.join(" · ")}.`;
    summaryCard.append(review);
  }
  summaryCard.hidden = false;
  updateStats();
}

function updateStats() {
  $("scoreLabel").textContent = `⭐ ${score}`;
  $("streakLabel").textContent = `🔥 ${streak}`;
  $("masteryLabel").textContent = `🧠 ${activeProfile ? getMasteryPercent(activeProfile) : 0}%`;
  $("roundLabel").textContent = `${Math.min(round, ROUND_COUNT)}/${ROUND_COUNT}`;
  $("progressBar").style.width = `${round / ROUND_COUNT * 100}%`;
}

function updateMastery(key, correct) {
  const previous = activeProfile.progress[key] || { level: 0, attempts: 0 };
  activeProfile.progress[key] = {
    level: correct ? Math.min(5, previous.level + 1) : Math.max(0, previous.level - 2),
    attempts: previous.attempts + 1
  };
}

function getMasteryPercent(profile) {
  const totalTopics = CONCEPT_QUESTIONS.length + ELEMENTS.length;
  const earned = Object.values(profile.progress || {}).reduce((sum, item) => sum + Math.min(5, item.level || 0), 0);
  return Math.round(earned / (totalTopics * 5) * 100);
}

function selectAdaptive(items, count, getKey) {
  const available = [...items];
  const selected = [];
  while (selected.length < count && available.length) {
    const weights = available.map((item) => {
      const level = activeProfile.progress[getKey(item)]?.level || 0;
      return Math.max(1, 6 - level);
    });
    let target = Math.random() * weights.reduce((sum, weight) => sum + weight, 0);
    let chosenIndex = 0;
    for (let index = 0; index < weights.length; index += 1) {
      target -= weights[index];
      if (target <= 0) { chosenIndex = index; break; }
    }
    selected.push(available.splice(chosenIndex, 1)[0]);
  }
  return selected;
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
