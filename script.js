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

const EXTRA_ELEMENT_DATA = [
  ["Sc","Escandio",3,4],["Ti","Titanio",4,4],["V","Vanadio",5,4],["Cr","Cromo",6,4],["Mn","Manganeso",7,4],["Fe","Hierro",8,4],["Co","Cobalto",9,4],["Ni","Níquel",10,4],["Cu","Cobre",11,4],["Zn","Zinc",12,4],["Ga","Galio",13,4],["Ge","Germanio",14,4],["As","Arsénico",15,4],["Se","Selenio",16,4],["Br","Bromo",17,4],["Kr","Kriptón",18,4],
  ["Rb","Rubidio",1,5],["Sr","Estroncio",2,5],["Y","Itrio",3,5],["Zr","Circonio",4,5],["Nb","Niobio",5,5],["Mo","Molibdeno",6,5],["Tc","Tecnecio",7,5],["Ru","Rutenio",8,5],["Rh","Rodio",9,5],["Pd","Paladio",10,5],["Ag","Plata",11,5],["Cd","Cadmio",12,5],["In","Indio",13,5],["Sn","Estaño",14,5],["Sb","Antimonio",15,5],["Te","Telurio",16,5],["I","Yodo",17,5],["Xe","Xenón",18,5],
  ["Cs","Cesio",1,6],["Ba","Bario",2,6],["La","Lantano",3,6,3,8],["Ce","Cerio",3,6,4,8],["Pr","Praseodimio",3,6,5,8],["Nd","Neodimio",3,6,6,8],["Pm","Prometio",3,6,7,8],["Sm","Samario",3,6,8,8],["Eu","Europio",3,6,9,8],["Gd","Gadolinio",3,6,10,8],["Tb","Terbio",3,6,11,8],["Dy","Disprosio",3,6,12,8],["Ho","Holmio",3,6,13,8],["Er","Erbio",3,6,14,8],["Tm","Tulio",3,6,15,8],["Yb","Iterbio",3,6,16,8],["Lu","Lutecio",3,6,17,8],["Hf","Hafnio",4,6],["Ta","Tantalio",5,6],["W","Wolframio",6,6],["Re","Renio",7,6],["Os","Osmio",8,6],["Ir","Iridio",9,6],["Pt","Platino",10,6],["Au","Oro",11,6],["Hg","Mercurio",12,6],["Tl","Talio",13,6],["Pb","Plomo",14,6],["Bi","Bismuto",15,6],["Po","Polonio",16,6],["At","Astato",17,6],["Rn","Radón",18,6],
  ["Fr","Francio",1,7],["Ra","Radio",2,7],["Ac","Actinio",3,7,3,9],["Th","Torio",3,7,4,9],["Pa","Protactinio",3,7,5,9],["U","Uranio",3,7,6,9],["Np","Neptunio",3,7,7,9],["Pu","Plutonio",3,7,8,9],["Am","Americio",3,7,9,9],["Cm","Curio",3,7,10,9],["Bk","Berkelio",3,7,11,9],["Cf","Californio",3,7,12,9],["Es","Einsteinio",3,7,13,9],["Fm","Fermio",3,7,14,9],["Md","Mendelevio",3,7,15,9],["No","Nobelio",3,7,16,9],["Lr","Lawrencio",3,7,17,9],["Rf","Rutherfordio",4,7],["Db","Dubnio",5,7],["Sg","Seaborgio",6,7],["Bh","Bohrio",7,7],["Hs","Hassio",8,7],["Mt","Meitnerio",9,7],["Ds","Darmstadtio",10,7],["Rg","Roentgenio",11,7],["Cn","Copernicio",12,7],["Nh","Nihonio",13,7],["Fl","Flerovio",14,7],["Mc","Moscovio",15,7],["Lv","Livermorio",16,7],["Ts","Teneso",17,7],["Og","Oganesón",18,7]
];

const LEVELS = [
  { min: 1, max: 20 }, { min: 21, max: 40 }, { min: 41, max: 60 },
  { min: 61, max: 80 }, { min: 81, max: 100 }, { min: 101, max: 118 }
];
const UNLOCK_THRESHOLD = 80;

const FAMILY_NAMES = {
  alcalino: "Metal alcalino", alcalinoterreo: "Alcalinotérreo", metal: "Metal",
  metaloide: "Metaloide", "no-metal": "No metal", halogeno: "Halógeno", noble: "Gas noble",
  transicion: "Metal de transición", lantanido: "Lantánido", actinido: "Actínido"
};

function inferFamily(number, group) {
  if (number >= 57 && number <= 71) return "lantanido";
  if (number >= 89 && number <= 103) return "actinido";
  if (group === 1) return "alcalino";
  if (group === 2) return "alcalinoterreo";
  if (group === 17) return "halogeno";
  if (group === 18) return "noble";
  if (group >= 3 && group <= 12) return "transicion";
  if ([32, 33, 51, 52].includes(number)) return "metaloide";
  if (number === 34) return "no-metal";
  return "metal";
}

function familyName(family) {
  return FAMILY_NAMES[family] || "Elemento químico";
}

EXTRA_ELEMENT_DATA.forEach(([symbol, name, group, period, column, row], index) => {
  const number = index + 21;
  const family = inferFamily(number, group);
  ELEMENTS.push({
    number, symbol, name, group, period, family, column, row,
    fact: `Su símbolo es ${symbol}, su número atómico es ${number} y pertenece a la familia «${familyName(family)}».`
  });
});

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
    options: ["Las columnas", "Las filas", "Los números atómicos", "Los elementos artificiales"],
    answer: "Las columnas",
    explanation: "Los grupos son columnas; sus elementos suelen compartir propiedades químicas."
  },
  {
    id: "periods", prompt: "¿Qué son los períodos de la tabla periódica?",
    options: ["Las filas", "Las columnas", "Los símbolos químicos", "Las familias de gases"],
    answer: "Las filas",
    explanation: "Los períodos son filas y se relacionan con los niveles de energía de los electrones."
  },
  {
    id: "families", prompt: "¿Por qué algunos elementos se agrupan en familias?",
    options: ["Porque tienen propiedades semejantes", "Porque pesan exactamente lo mismo", "Porque fueron descubiertos juntos", "Porque tienen el mismo símbolo"],
    answer: "Porque tienen propiedades semejantes",
    explanation: "Una familia reúne elementos con comportamientos químicos parecidos, como los gases nobles."
  }
];

const CONCEPT_GUIDES = [
  { id: "periodic-table", title: "Tabla periódica", text: "Es la organización de todos los elementos químicos conocidos. Están ordenados por su número atómico y por propiedades que se repiten de manera periódica." },
  { id: "atomic-number", title: "Número atómico", text: "Es el número pequeño asociado a cada elemento e indica cuántos protones hay en su núcleo. Ese número identifica al elemento: el hidrógeno tiene 1 y el helio tiene 2." },
  { id: "symbol", title: "Símbolos", text: "El símbolo es la abreviatura universal de un elemento. Tiene una o dos letras: la primera es mayúscula y, si existe una segunda, es minúscula; por ejemplo, O y Na." },
  { id: "groups", title: "Grupos", text: "Son las columnas de la tabla, numeradas del 1 al 18. Los elementos de un mismo grupo suelen tener propiedades químicas semejantes." },
  { id: "periods", title: "Períodos", text: "Son las filas de la tabla. El número del período se relaciona con la cantidad de niveles de energía ocupados por los electrones." },
  { id: "families", title: "Familias", text: "Son conjuntos de elementos con propiedades parecidas. Algunos ejemplos son los metales alcalinos, los halógenos y los gases nobles; los colores de esta tabla permiten reconocerlas." }
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
let gameActive = false;
let helpedAnswers = 0;

renderProfiles();
renderPeriodicTable();
renderLegend();
renderConceptGuide();
resetGame();
updateProfilePanel(!activeProfile);

$("elementInfoCard").addEventListener("click", (event) => {
  if (event.target === $("elementInfoCard")) $("elementInfoCard").close();
});
$("guideCard").addEventListener("click", (event) => {
  if (event.target === $("guideCard")) $("guideCard").close();
});
$("guideCard").addEventListener("close", () => {
  document.querySelectorAll(".guide-button").forEach((button) => button.classList.remove("active"));
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = profileNameInput.value.trim();
  if (!name) return;
  const profile = { id: makeId(), name, bestScore: 0, gamesPlayed: 0, progress: {}, unlockedLevel: 1 };
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

function getAvailableElements(profile = activeProfile) {
  const level = profile?.unlockedLevel || 1;
  return ELEMENTS.filter((element) => element.number <= LEVELS[level - 1].max);
}

function getCurrentBlock(profile = activeProfile) {
  return LEVELS[(profile?.unlockedLevel || 1) - 1];
}

function loadProfiles() {
  try {
    const rawProfiles = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    const saved = JSON.parse(rawProfiles);
    return Array.isArray(saved) ? saved.map((profile) => ({
      ...profile,
      progress: profile.progress || {},
      unlockedLevel: Math.min(LEVELS.length, Math.max(1, profile.unlockedLevel || 1))
    })) : [];
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
    stats.textContent = `Nivel ${profile.unlockedLevel || 1}/6 · Dominio: ${getMasteryPercent(profile)}% · Mejor: ${profile.bestScore}`;
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
  feedback.textContent = `${profile.name}, la química te espera.`;
  renderProfiles();
  renderPeriodicTable();
  updateLevelDisplay();
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
  renderPeriodicTable();
  updateLevelDisplay();
  updateProfilePanel(Boolean(activeProfile));
}

function resetProfileProgress(id) {
  const profile = profiles.find((item) => item.id === id);
  if (!profile) return;
  profile.bestScore = 0;
  profile.gamesPlayed = 0;
  profile.progress = {};
  profile.unlockedLevel = 1;
  saveProfiles();
  renderProfiles();
  if (profile.id === activeProfile?.id) renderPeriodicTable();
  updateStats();
  feedback.textContent = `Se reinició el progreso de ${profile.name}.`;
}

function renderPeriodicTable() {
  periodicBoard.replaceChildren();
  const availableElements = getAvailableElements();
  availableElements.forEach((element) => {
    const card = document.createElement("button");
    card.className = `element-card family-${element.family}`;
    card.style.gridColumn = element.column || element.group;
    card.style.gridRow = element.row || element.period;
    card.setAttribute("aria-label", `${element.name}, símbolo ${element.symbol}, número atómico ${element.number}`);
    card.innerHTML = `<span class="number">${element.number}</span><strong class="symbol">${element.symbol}</strong><span class="name">${element.name}</span>`;
    card.addEventListener("click", () => showElementInfo(element));
    periodicBoard.append(card);
  });
  periodicBoard.style.setProperty("--table-rows", Math.max(...availableElements.map((element) => element.row || element.period)));
  const max = activeProfile ? LEVELS[activeProfile.unlockedLevel - 1].max : 20;
  $("periodicTitle").textContent = `Elementos 1–${max}`;
}

function renderLegend() {
  $("legend").replaceChildren(...Object.entries(FAMILY_NAMES).map(([key, label]) => {
    const item = document.createElement("span");
    item.className = `family-${key}`;
    item.textContent = label;
    return item;
  }));
}

function renderConceptGuide() {
  const guide = $("conceptGuide");
  guide.replaceChildren();
  CONCEPT_GUIDES.forEach((topic) => {
    const button = document.createElement("button");
    button.className = "guide-button";
    button.textContent = topic.title;
    button.addEventListener("click", () => showGuideTopic(topic, button));
    guide.append(button);
  });
}

function showGuideTopic(topic, selectedButton) {
  const card = $("guideCard");
  card.replaceChildren();
  const heading = document.createElement("strong");
  const text = document.createElement("p");
  const close = document.createElement("button");
  heading.textContent = topic.title;
  text.textContent = topic.text;
  close.className = "icon-button";
  close.textContent = "Cerrar";
  close.addEventListener("click", () => card.close());
  card.append(heading, text, close);
  if (!card.open) card.showModal();
  document.querySelectorAll(".guide-button").forEach((button) => button.classList.toggle("active", button === selectedButton));
  markCurrentQuestionAsHelped("Guía consultada: esta pregunta entregará el 50 % de los puntos.");
}

function showElementInfo(element) {
  const card = $("elementInfoCard");
  card.replaceChildren();
  const heading = document.createElement("strong");
  const details = document.createElement("p");
  const fact = document.createElement("p");
  const close = document.createElement("button");
  heading.textContent = `${element.name} (${element.symbol})`;
  details.className = "element-details";
  details.textContent = `Número atómico ${element.number} · Grupo ${element.group} · Período ${element.period} · ${FAMILY_NAMES[element.family]}`;
  fact.textContent = element.fact;
  close.className = "icon-button";
  close.textContent = "Cerrar";
  close.addEventListener("click", () => card.close());
  card.append(heading, details, fact, close);
  if (!card.open) card.showModal();
  markCurrentQuestionAsHelped("Ficha consultada: esta pregunta entregará el 50 % de los puntos.");
}

function closeElementInfo() {
  const card = $("elementInfoCard");
  if (card.open) card.close();
}

function closeGuideCard() {
  const card = $("guideCard");
  if (card.open) card.close();
}

function markCurrentQuestionAsHelped(message) {
  if (!gameActive || !currentQuestion || answerLocked) return;
  currentQuestion.helpUsed = true;
  feedback.textContent = message;
}

function toggleBoard() {
  const boardIsHidden = periodicBoard.closest(".periodic-scroll").classList.contains("is-hidden");
  setBoardVisibility(boardIsHidden);
  if (gameActive && boardIsHidden && currentQuestion && !answerLocked) {
    markCurrentQuestionAsHelped("Tabla abierta como ayuda: esta pregunta entregará el 50 % de los puntos.");
  }
}

function setBoardVisibility(visible) {
  periodicBoard.closest(".periodic-scroll").classList.toggle("is-hidden", !visible);
  $("legend").classList.toggle("is-hidden", !visible);
  const helpNotice = gameActive && !visible ? " (ayuda: 50 % de puntos)" : "";
  $("toggleBoardBtn").textContent = visible ? "Ocultar tabla" : `Mostrar tabla${helpNotice}`;
  $("toggleBoardBtn").setAttribute("aria-expanded", String(visible));
}

function resetGame() {
  clearTimeout(nextQuestionTimer);
  closeElementInfo();
  closeGuideCard();
  score = round = streak = bestStreak = correctCount = 0;
  questions = [];
  mistakes = [];
  currentQuestion = null;
  answerLocked = false;
  gameActive = false;
  helpedAnswers = 0;
  setBoardVisibility(true);
  optionsContainer.replaceChildren();
  questionText.textContent = "";
  $("questionCard").hidden = true;
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
  helpedAnswers = 0;
  mistakes = [];
  summaryCard.hidden = true;
  questions = buildAdaptiveQuestions();
  gameActive = true;
  closeGuideCard();
  closeElementInfo();
  document.querySelectorAll(".guide-button").forEach((button) => button.classList.remove("active"));
  setBoardVisibility(false);
  showNextQuestion();
}

function buildAdaptiveQuestions() {
  const conceptCount = activeProfile.gamesPlayed === 0 ? 6 : activeProfile.gamesPlayed < 3 ? 4 : 2;
  const concepts = selectAdaptive(CONCEPT_QUESTIONS, conceptCount, (item) => `concept:${item.id}`)
    .map((item) => ({ ...item, kind: "concept", key: `concept:${item.id}` }));
  const elementCount = ROUND_COUNT - conceptCount;
  const block = getCurrentBlock();
  const currentElements = ELEMENTS.filter((item) => item.number >= block.min && item.number <= block.max);
  const previousElements = ELEMENTS.filter((item) => item.number < block.min);
  const currentCount = previousElements.length ? Math.ceil(elementCount * 0.75) : elementCount;
  const selectedElements = [
    ...selectAdaptive(currentElements, currentCount, (item) => `element:${item.number}`),
    ...selectAdaptive(previousElements, elementCount - currentCount, (item) => `element:${item.number}`)
  ];
  const elements = shuffle(selectedElements).map(createElementQuestion);
  return activeProfile.gamesPlayed === 0 ? [...concepts, ...elements] : shuffle([...concepts, ...elements]);
}

function createElementQuestion(element, index) {
  const types = ["symbol-to-name", "name-to-symbol", "number-to-name", "fact-to-name"];
  return { kind: "element", key: `element:${element.number}`, element, type: types[index % types.length] };
}

function showNextQuestion() {
  if (round >= ROUND_COUNT) return finishGame();
  $("questionCard").hidden = false;
  answerLocked = false;
  closeGuideCard();
  closeElementInfo();
  document.querySelectorAll(".guide-button").forEach((button) => button.classList.remove("active"));
  currentQuestion = questions[round];
  currentQuestion.helpUsed = !periodicBoard.closest(".periodic-scroll").classList.contains("is-hidden");
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
  if (currentQuestion.helpUsed) helpedAnswers += 1;

  if (correct) {
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);
    correctCount += 1;
    const bonus = Math.min(streak - 1, 4) * 2;
    const fullPoints = 10 + bonus;
    const earnedPoints = currentQuestion.helpUsed ? Math.ceil(fullPoints / 2) : fullPoints;
    score += earnedPoints;
    const explanation = isConcept ? currentQuestion.explanation : currentQuestion.element.fact;
    feedback.textContent = `¡Correcto! +${earnedPoints}${currentQuestion.helpUsed ? " con ayuda" : ""} · ${explanation}`;
  } else {
    selectedButton.classList.add("wrong");
    selectedButton.textContent = `✕ ${selectedButton.textContent}`;
    streak = 0;
    const reviewName = isConcept ? currentQuestion.prompt : `${currentQuestion.element.name} (${currentQuestion.element.symbol})`;
    mistakes.push(reviewName);
    feedback.textContent = `La respuesta era “${expected}”. ${isConcept ? currentQuestion.explanation : ""}`;
  }
  updateMastery(currentQuestion.key, correct, currentQuestion.helpUsed);
  const unlocked = checkLevelUnlock();
  if (unlocked) feedback.textContent += ` 🎉 ¡Desbloqueaste el nivel ${activeProfile.unlockedLevel}!`;
  saveProfiles();
  updateLevelDisplay();
  round += 1;
  updateStats();
  const readingTime = correct ? 1400 : 3200;
  nextQuestionTimer = setTimeout(showNextQuestion, readingTime);
}

function finishGame() {
  gameActive = false;
  setBoardVisibility(false);
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
  if (helpedAnswers) {
    const helpSummary = document.createElement("p");
    helpSummary.textContent = `Consultaste la tabla en ${helpedAnswers} pregunta${helpedAnswers === 1 ? "" : "s"}. Los aciertos con ayuda dieron la mitad de puntos y no aumentaron el dominio.`;
    summaryCard.append(helpSummary);
  }
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
  const mastery = activeProfile ? getMasteryPercent(activeProfile) : 0;
  $("masteryLabel").textContent = `🧠 ${mastery}%`;
  $("masteryLabel").setAttribute("aria-label", `Dominio general: ${mastery} por ciento`);
  $("roundLabel").textContent = `${Math.min(round, ROUND_COUNT)}/${ROUND_COUNT}`;
  $("progressBar").style.width = `${round / ROUND_COUNT * 100}%`;
  updateLevelDisplay();
}

function updateMastery(key, correct, helpUsed = false) {
  const previous = activeProfile.progress[key] || { level: 0, attempts: 0 };
  activeProfile.progress[key] = {
    level: correct
      ? helpUsed ? previous.level : Math.min(5, previous.level + 1)
      : Math.max(0, previous.level - 2),
    attempts: previous.attempts + 1
  };
}

function getMasteryPercent(profile) {
  const available = getAvailableElements(profile);
  const keys = [
    ...CONCEPT_QUESTIONS.map((item) => `concept:${item.id}`),
    ...available.map((item) => `element:${item.number}`)
  ];
  const totalTopics = keys.length;
  const earned = keys.reduce((sum, key) => sum + Math.min(5, profile.progress?.[key]?.level || 0), 0);
  return Math.round(earned / (totalTopics * 5) * 100);
}

function getBlockMastery(profile = activeProfile) {
  if (!profile) return 0;
  const block = getCurrentBlock(profile);
  const blockElements = ELEMENTS.filter((item) => item.number >= block.min && item.number <= block.max);
  const earned = blockElements.reduce((sum, item) => sum + Math.min(5, profile.progress?.[`element:${item.number}`]?.level || 0), 0);
  return Math.round(earned / (blockElements.length * 5) * 100);
}

function checkLevelUnlock() {
  if (!activeProfile || activeProfile.unlockedLevel >= LEVELS.length) return false;
  if (getBlockMastery(activeProfile) < UNLOCK_THRESHOLD) return false;
  activeProfile.unlockedLevel += 1;
  renderPeriodicTable();
  renderProfiles();
  return true;
}

function updateLevelDisplay() {
  const level = activeProfile?.unlockedLevel || 1;
  const block = LEVELS[level - 1];
  const mastery = activeProfile ? getBlockMastery(activeProfile) : 0;
  const remaining = LEVELS.length - level;
  $("levelLabel").textContent = `Nivel ${level} de ${LEVELS.length} · Elementos ${block.min}–${block.max}`;
  $("unlockLabel").textContent = remaining
    ? `${remaining} nivel${remaining === 1 ? "" : "es"} por desbloquear`
    : "Todos los niveles desbloqueados";
  $("levelProgressBar").style.width = `${mastery}%`;
  $("levelProgressText").textContent = level === LEVELS.length
    ? mastery >= UNLOCK_THRESHOLD
      ? `Dominio del bloque final: ${mastery}% · ¡Completaste todos los niveles!`
      : `Dominio del bloque final: ${mastery}% · Meta recomendada: ${UNLOCK_THRESHOLD}%`
    : `Dominio del bloque: ${mastery}% · Se desbloquea al ${UNLOCK_THRESHOLD}%`;
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
