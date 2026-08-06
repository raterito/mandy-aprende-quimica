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

const ADVANCED_TOPICS = [
  { level: 2, id: "atomic-particles", title: "Partículas del átomo", text: "El núcleo contiene protones con carga positiva y neutrones sin carga. Los electrones, con carga negativa, ocupan la región que rodea al núcleo.", prompt: "¿Qué partículas se encuentran en el núcleo del átomo?", options: ["Protones y neutrones", "Electrones y protones", "Solo electrones", "Moléculas e iones"], answer: "Protones y neutrones" },
  { level: 2, id: "ions", title: "Átomos e iones", text: "Un átomo neutro tiene igual cantidad de protones y electrones. Cuando gana o pierde electrones se convierte en un ion con carga eléctrica.", prompt: "¿Cómo se forma un ion?", options: ["Al ganar o perder electrones", "Al cambiar sus protones", "Al cambiar de período", "Al enfriarse"], answer: "Al ganar o perder electrones" },
  { level: 2, id: "valence", title: "Valencia", text: "La valencia describe la capacidad de combinación de un elemento y se relaciona con los electrones que puede ganar, perder o compartir al formar enlaces.", prompt: "¿Con qué se relaciona la valencia?", options: ["Con la capacidad de formar enlaces", "Con la temperatura de ebullición", "Con el número de neutrones", "Con el nombre del elemento"], answer: "Con la capacidad de formar enlaces" },
  { level: 2, id: "oxidation-number", title: "Número de oxidación", text: "El número de oxidación representa la carga aparente que tendría un átomo al asignar los electrones de sus enlaces. Puede ser positivo, negativo o cero.", prompt: "¿Qué representa el número de oxidación?", options: ["Una carga aparente del átomo", "La cantidad de moléculas", "El grupo de la tabla", "La masa del núcleo"], answer: "Una carga aparente del átomo" },
  { level: 2, id: "transition-metals", title: "Metales de transición", text: "Ocupan la zona central de la tabla, principalmente los grupos 3 al 12. Muchos conducen bien la electricidad y pueden presentar varios estados de oxidación.", prompt: "¿Dónde se ubican principalmente los metales de transición?", options: ["En el centro de la tabla", "Solo en la primera columna", "Fuera de la tabla", "En la última fila únicamente"], answer: "En el centro de la tabla" },
  { level: 2, id: "electron-configuration", title: "Configuración electrónica", text: "La configuración electrónica indica cómo se distribuyen los electrones en niveles y subniveles de energía alrededor del núcleo.", prompt: "¿Qué describe la configuración electrónica?", options: ["La distribución de los electrones", "La distribución de los protones", "El tamaño de una molécula", "La velocidad de una reacción"], answer: "La distribución de los electrones" },

  { level: 3, id: "ionic-bond", title: "Enlace iónico", text: "Se forma por atracción entre iones de cargas opuestas, normalmente después de que un metal transfiere electrones a un no metal.", prompt: "¿Qué mantiene unido un enlace iónico?", options: ["La atracción entre cargas opuestas", "El intercambio de protones", "La ausencia de electrones", "La gravedad"], answer: "La atracción entre cargas opuestas" },
  { level: 3, id: "covalent-bond", title: "Enlace covalente", text: "Se forma cuando dos átomos, generalmente no metálicos, comparten uno o más pares de electrones.", prompt: "¿Qué hacen los átomos en un enlace covalente?", options: ["Comparten electrones", "Comparten protones", "Pierden el núcleo", "Cambian su número atómico"], answer: "Comparten electrones" },
  { level: 3, id: "molecules-compounds", title: "Moléculas y compuestos", text: "Una molécula es un conjunto de átomos enlazados. Un compuesto contiene átomos de al menos dos elementos diferentes en proporciones definidas.", prompt: "¿Qué debe contener un compuesto?", options: ["Al menos dos elementos diferentes", "Un solo protón", "Solamente metales", "Siempre agua"], answer: "Al menos dos elementos diferentes" },
  { level: 3, id: "chemical-formulas", title: "Fórmulas químicas", text: "Una fórmula muestra qué elementos forman una sustancia y cuántos átomos de cada uno contiene. En H₂O hay dos H por cada O.", prompt: "¿Qué indica el subíndice 2 en H₂O?", options: ["Dos átomos de hidrógeno", "Dos átomos de oxígeno", "Dos moléculas de agua", "Carga positiva dos"], answer: "Dos átomos de hidrógeno" },
  { level: 3, id: "cations-anions", title: "Cationes y aniones", text: "Un catión tiene carga positiva porque perdió electrones. Un anión tiene carga negativa porque ganó electrones.", prompt: "¿Qué tipo de ion tiene carga negativa?", options: ["Anión", "Catión", "Protón", "Neutrón"], answer: "Anión" },
  { level: 3, id: "electronegativity", title: "Electronegatividad", text: "Es la tendencia de un átomo a atraer hacia sí los electrones compartidos en un enlace químico.", prompt: "¿Qué mide la electronegatividad?", options: ["La atracción de electrones en un enlace", "La cantidad de neutrones", "La masa de una muestra", "La rapidez de fusión"], answer: "La atracción de electrones en un enlace" },

  { level: 4, id: "chemical-reactions", title: "Reacciones químicas", text: "En una reacción, unas sustancias se transforman en otras porque sus átomos se reorganizan y forman enlaces diferentes.", prompt: "¿Qué sucede con los átomos durante una reacción química?", options: ["Se reorganizan", "Desaparecen", "Se convierten en energía por completo", "Cambian su número de protones"], answer: "Se reorganizan" },
  { level: 4, id: "reactants-products", title: "Reactivos y productos", text: "Los reactivos son las sustancias iniciales y se escriben a la izquierda de la flecha. Los productos son las sustancias formadas y aparecen a la derecha.", prompt: "¿Dónde se escriben normalmente los productos?", options: ["A la derecha de la flecha", "A la izquierda de la flecha", "Sobre los subíndices", "Fuera de la ecuación"], answer: "A la derecha de la flecha" },
  { level: 4, id: "mass-conservation", title: "Conservación de la masa", text: "En una reacción química ordinaria los átomos no se crean ni se destruyen. Por eso debe haber la misma cantidad de cada tipo de átomo antes y después.", prompt: "¿Por qué se balancean las ecuaciones químicas?", options: ["Para conservar la cantidad de cada átomo", "Para cambiar los elementos", "Para eliminar productos", "Para aumentar la temperatura"], answer: "Para conservar la cantidad de cada átomo" },
  { level: 4, id: "equation-balancing", title: "Balanceo de ecuaciones", text: "Balancear consiste en ajustar los coeficientes delante de las fórmulas hasta tener igual número de átomos de cada elemento en ambos lados. Nunca se cambian los subíndices.", prompt: "¿Qué se modifica para balancear una ecuación?", options: ["Los coeficientes", "Los subíndices", "Los símbolos químicos", "Los números atómicos"], answer: "Los coeficientes" },
  { level: 4, id: "reaction-types", title: "Tipos de reacción", text: "Entre los tipos básicos están síntesis, descomposición, desplazamiento y combustión. Se distinguen por la manera en que se reorganizan reactivos y productos.", prompt: "¿Cuál es un tipo básico de reacción química?", options: ["Síntesis", "Valencia", "Electronegatividad", "Isótopo"], answer: "Síntesis" },
  { level: 4, id: "coefficients-subscripts", title: "Coeficientes y subíndices", text: "El coeficiente multiplica toda la fórmula y señala cuántas unidades participan. El subíndice pertenece a la fórmula e indica cuántos átomos hay dentro de cada unidad.", prompt: "En 2H₂O, ¿qué indica el coeficiente 2?", options: ["Dos moléculas de agua", "Dos átomos de oxígeno", "Carga eléctrica dos", "Dos elementos diferentes"], answer: "Dos moléculas de agua" },

  { level: 5, id: "atomic-mass", title: "Masa atómica", text: "La masa atómica de la tabla es un promedio ponderado de las masas de los isótopos naturales de un elemento y se expresa en unidades de masa atómica.", prompt: "¿Qué representa la masa atómica tabulada?", options: ["Un promedio de sus isótopos", "Solo la cantidad de protones", "La masa de una molécula", "La carga del átomo"], answer: "Un promedio de sus isótopos" },
  { level: 5, id: "molecular-mass", title: "Masa molecular", text: "Se obtiene sumando las masas atómicas de todos los átomos indicados en la fórmula de una molécula.", prompt: "¿Cómo se calcula la masa molecular?", options: ["Sumando las masas de sus átomos", "Restando los protones", "Contando solo elementos distintos", "Midiendo el volumen"], answer: "Sumando las masas de sus átomos" },
  { level: 5, id: "mole", title: "Mol", text: "El mol es la unidad para cantidad de sustancia. Un mol contiene aproximadamente 6,022 × 10²³ entidades, llamado número de Avogadro.", prompt: "¿Aproximadamente cuántas entidades contiene un mol?", options: ["6,022 × 10²³", "118", "1.000", "3 × 10⁸"], answer: "6,022 × 10²³" },
  { level: 5, id: "molar-mass", title: "Masa molar", text: "Es la masa de un mol de una sustancia y se expresa habitualmente en gramos por mol (g/mol).",
    prompt: "¿En qué unidad suele expresarse la masa molar?", options: ["g/mol", "mol/L", "°C", "m/s"], answer: "g/mol" },
  { level: 5, id: "stoichiometry", title: "Estequiometría", text: "Utiliza las proporciones de una ecuación balanceada para relacionar cantidades de reactivos consumidos y productos formados.", prompt: "¿Qué necesita la estequiometría para calcular proporciones correctas?", options: ["Una ecuación balanceada", "Solo la tabla vacía", "Cambiar los subíndices", "Ignorar los productos"], answer: "Una ecuación balanceada" },
  { level: 5, id: "isotopes-radioactivity", title: "Isótopos y radiactividad", text: "Los isótopos tienen igual número de protones y diferente número de neutrones. Algunos núcleos inestables emiten radiación al transformarse.", prompt: "¿En qué se diferencian los isótopos de un elemento?", options: ["En su cantidad de neutrones", "En su cantidad de protones", "En su símbolo", "En su grupo"], answer: "En su cantidad de neutrones" },

  { level: 6, id: "chemical-equilibrium", title: "Equilibrio químico", text: "En una reacción reversible, el equilibrio ocurre cuando las velocidades de la reacción directa e inversa son iguales. Las concentraciones permanecen constantes, pero las reacciones continúan.", prompt: "¿Qué se iguala en el equilibrio químico?", options: ["Las velocidades directa e inversa", "Las masas de todas las sustancias", "Los números atómicos", "El pH y la temperatura"], answer: "Las velocidades directa e inversa" },
  { level: 6, id: "acids-bases", title: "Ácidos y bases", text: "En una descripción básica, los ácidos pueden donar protones H⁺ y las bases pueden aceptarlos. Al reaccionar pueden producir una neutralización.", prompt: "Según Brønsted-Lowry, ¿qué puede donar un ácido?", options: ["Un protón H⁺", "Un neutrón", "Un núcleo", "Un mol"], answer: "Un protón H⁺" },
  { level: 6, id: "ph-scale", title: "Escala de pH", text: "El pH expresa la acidez de una disolución. A 25 °C, un pH menor que 7 es ácido, 7 es neutro y mayor que 7 es básico.", prompt: "A 25 °C, ¿qué indica un pH menor que 7?", options: ["Una disolución ácida", "Una disolución básica", "Una sustancia sin átomos", "Equilibrio obligatorio"], answer: "Una disolución ácida" },
  { level: 6, id: "redox", title: "Oxidación y reducción", text: "La oxidación implica pérdida de electrones y la reducción implica ganancia. Ambos procesos ocurren juntos en una reacción redox.", prompt: "¿Qué ocurre durante la oxidación?", options: ["Se pierden electrones", "Se ganan electrones", "Se crean protones", "Se eliminan átomos"], answer: "Se pierden electrones" },
  { level: 6, id: "synthetic-elements", title: "Elementos sintéticos", text: "Son elementos producidos artificialmente mediante reacciones nucleares. Muchos son inestables, radiactivos y existen durante tiempos muy breves.", prompt: "¿Cómo se producen los elementos sintéticos?", options: ["Mediante reacciones nucleares", "Mezclando agua y sal", "Enfriando gases nobles", "Balanceando ecuaciones"], answer: "Mediante reacciones nucleares" },
  { level: 6, id: "chemistry-review", title: "Mapa de la química", text: "La estructura atómica explica propiedades y enlaces; los enlaces forman sustancias; las sustancias reaccionan conservando átomos y sus cantidades se relacionan mediante el mol.", prompt: "¿Qué principio conecta una ecuación balanceada con el cálculo de cantidades?", options: ["La conservación de los átomos", "La desaparición de la materia", "El cambio de símbolos", "La creación de elementos"], answer: "La conservación de los átomos" }
];

CONCEPT_QUESTIONS.forEach((question) => { question.level = 1; });
CONCEPT_GUIDES.forEach((guide) => { guide.level = 1; });
ADVANCED_TOPICS.forEach((topic) => {
  CONCEPT_QUESTIONS.push({
    id: topic.id, level: topic.level, prompt: topic.prompt,
    options: topic.options, answer: topic.answer, explanation: topic.text
  });
  CONCEPT_GUIDES.push({ id: topic.id, level: topic.level, title: topic.title, text: topic.text });
});

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
let progressSteps = 0;
let sessionCorrectKeys = new Set();
let audioContext = null;

function playAnswerSound(correct) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    audioContext ||= new AudioContextClass();
    if (audioContext.state === "suspended") audioContext.resume();

    const startTime = audioContext.currentTime;
    const notes = correct
      ? [{ frequency: 523.25, delay: 0 }, { frequency: 659.25, delay: 0.08 }, { frequency: 783.99, delay: 0.16 }]
      : [{ frequency: 246.94, delay: 0 }, { frequency: 196, delay: 0.13 }];

    notes.forEach(({ frequency, delay }) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const noteStart = startTime + delay;
      const noteEnd = noteStart + (correct ? 0.16 : 0.22);

      oscillator.type = correct ? "sine" : "triangle";
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.13, noteStart + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteEnd);
    });
  } catch (error) {
    console.debug("El navegador no pudo reproducir el efecto de sonido", error);
  }
}

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
  renderConceptGuide();
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
  renderConceptGuide();
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
  if (profile.id === activeProfile?.id) {
    renderPeriodicTable();
    renderConceptGuide();
  }
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
  const level = activeProfile?.unlockedLevel || 1;
  const addTopicButton = (container, topic) => {
    const button = document.createElement("button");
    button.className = "guide-button";
    button.textContent = topic.title;
    button.addEventListener("click", () => showGuideTopic(topic, button));
    container.append(button);
  };
  CONCEPT_GUIDES.filter((topic) => topic.level === level)
    .forEach((topic) => addTopicButton(guide, topic));

  if (level > 1) {
    const previous = document.createElement("details");
    const summary = document.createElement("summary");
    const previousButtons = document.createElement("div");
    previous.className = "previous-topics";
    summary.textContent = "Temas anteriores";
    previousButtons.className = "previous-topic-buttons";
    CONCEPT_GUIDES.filter((topic) => topic.level < level)
      .forEach((topic) => addTopicButton(previousButtons, topic));
    previous.append(summary, previousButtons);
    guide.append(previous);
  }
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
  $("conceptGuide").classList.toggle("is-hidden", !visible);
  document.querySelector(".board-heading > div").classList.toggle("is-hidden", !visible);
  document.querySelector(".board-heading").classList.toggle("is-collapsed", !visible);
  if (!visible) {
    closeGuideCard();
    closeElementInfo();
  }
  const helpNotice = gameActive && !visible ? " (ayuda: 50 % de puntos)" : "";
  $("toggleBoardBtn").textContent = visible ? "Ocultar información" : `Mostrar información${helpNotice}`;
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
  progressSteps = 0;
  sessionCorrectKeys = new Set();
  setBoardVisibility(true);
  $("toggleBoardBtn").hidden = true;
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
  progressSteps = 0;
  sessionCorrectKeys = new Set();
  mistakes = [];
  summaryCard.hidden = true;
  questions = buildAdaptiveQuestions();
  gameActive = true;
  $("toggleBoardBtn").hidden = false;
  closeGuideCard();
  closeElementInfo();
  document.querySelectorAll(".guide-button").forEach((button) => button.classList.remove("active"));
  setBoardVisibility(false);
  showNextQuestion();
}

function buildAdaptiveQuestions() {
  const level = activeProfile.unlockedLevel;
  const currentConcepts = CONCEPT_QUESTIONS.filter((item) => item.level === level);
  const previousConcepts = CONCEPT_QUESTIONS.filter((item) => item.level < level);
  const allCurrentTopicsAreNew = currentConcepts.every((item) =>
    !(activeProfile.progress[`concept:${item.id}`]?.attempts)
  );
  const currentTopicsNeedPractice = currentConcepts.some((item) =>
    (activeProfile.progress[`concept:${item.id}`]?.level || 0) < 2
  );
  const conceptCount = allCurrentTopicsAreNew ? 6 : currentTopicsNeedPractice ? 4 : 2;
  const currentConceptCount = conceptCount > 2 || !previousConcepts.length ? conceptCount : 1;
  const selectedConcepts = [
    ...selectAdaptive(currentConcepts, currentConceptCount, (item) => `concept:${item.id}`),
    ...selectAdaptive(previousConcepts, conceptCount - currentConceptCount, (item) => `concept:${item.id}`)
  ];
  const concepts = selectedConcepts
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
  return allCurrentTopicsAreNew ? [...concepts, ...elements] : shuffle([...concepts, ...elements]);
}

function createElementQuestion(element, index) {
  const types = ["symbol-to-name", "name-to-symbol", "number-to-name", "fact-to-name"];
  return { kind: "element", key: `element:${element.number}`, element, type: types[index % types.length] };
}

function showNextQuestion() {
  if (round >= questions.length) return finishGame();
  $("questionCard").hidden = false;
  answerLocked = false;
  closeGuideCard();
  closeElementInfo();
  document.querySelectorAll(".guide-button").forEach((button) => button.classList.remove("active"));
  currentQuestion = questions[round];
  currentQuestion.helpUsed = !periodicBoard.closest(".periodic-scroll").classList.contains("is-hidden");
  $("questionTypeLabel").textContent = currentQuestion.isRetry ? "Repaso" : "Desafío";
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
  playAnswerSound(correct);

  if (correct) {
    sessionCorrectKeys.add(currentQuestion.key);
    progressSteps = sessionCorrectKeys.size;
    questions = questions.filter((question, index) => index <= round || question.key !== currentQuestion.key);
    let earnedPoints = 0;
    if (!currentQuestion.isRetry) {
      streak += 1;
      bestStreak = Math.max(bestStreak, streak);
      correctCount += 1;
      const bonus = Math.min(streak - 1, 4) * 2;
      const fullPoints = 10 + bonus;
      earnedPoints = currentQuestion.helpUsed ? Math.ceil(fullPoints / 2) : fullPoints;
      score += earnedPoints;
    }
    const explanation = isConcept ? currentQuestion.explanation : currentQuestion.element.fact;
    feedback.textContent = currentQuestion.isRetry
      ? `¡Repaso completado! · ${explanation}`
      : `¡Correcto! +${earnedPoints}${currentQuestion.helpUsed ? " con ayuda" : ""} · ${explanation}`;
  } else {
    selectedButton.classList.add("wrong");
    selectedButton.textContent = `✕ ${selectedButton.textContent}`;
    streak = 0;
    const reviewName = isConcept ? currentQuestion.prompt : `${currentQuestion.element.name} (${currentQuestion.element.symbol})`;
    if (!mistakes.includes(reviewName)) mistakes.push(reviewName);
    scheduleRetry(currentQuestion);
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

function scheduleRetry(question) {
  questions.push({ ...question, isRetry: true, helpUsed: false });
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
  feedback.textContent = `${activeProfile.name}, acertaste ${correctCount} de ${ROUND_COUNT} preguntas en el primer intento y completaste todos los repasos.`;
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
  $("roundLabel").textContent = `${progressSteps}/${ROUND_COUNT}`;
  $("progressBar").style.width = `${progressSteps / ROUND_COUNT * 100}%`;
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
  const availableConcepts = CONCEPT_QUESTIONS.filter((item) => item.level <= (profile.unlockedLevel || 1));
  const keys = [
    ...availableConcepts.map((item) => `concept:${item.id}`),
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
  const blockConcepts = CONCEPT_QUESTIONS.filter((item) => item.level === profile.unlockedLevel);
  const keys = [
    ...blockElements.map((item) => `element:${item.number}`),
    ...blockConcepts.map((item) => `concept:${item.id}`)
  ];
  const earned = keys.reduce((sum, key) => sum + Math.min(5, profile.progress?.[key]?.level || 0), 0);
  return Math.round(earned / (keys.length * 5) * 100);
}

function checkLevelUnlock() {
  if (!activeProfile || activeProfile.unlockedLevel >= LEVELS.length) return false;
  if (getBlockMastery(activeProfile) < UNLOCK_THRESHOLD) return false;
  activeProfile.unlockedLevel += 1;
  renderPeriodicTable();
  renderConceptGuide();
  renderProfiles();
  return true;
}

function updateLevelDisplay() {
  const level = activeProfile?.unlockedLevel || 1;
  const block = LEVELS[level - 1];
  const mastery = activeProfile ? getBlockMastery(activeProfile) : 0;
  const remaining = LEVELS.length - level;
  $("levelLabel").textContent = `Nivel ${level} de ${LEVELS.length} · «Elementos ${block.min}–${block.max}»`;
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
    const unseen = available.filter((item) =>
      !(activeProfile.progress[getKey(item)]?.attempts)
    );
    if (unseen.length) {
      const chosen = unseen[Math.floor(Math.random() * unseen.length)];
      selected.push(available.splice(available.indexOf(chosen), 1)[0]);
      continue;
    }

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
