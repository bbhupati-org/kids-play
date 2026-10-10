const view = document.querySelector("#app-view");
const starCount = document.querySelector("#star-count");
const celebration = document.querySelector("#celebration");
const navButtons = [...document.querySelectorAll(".nav-button")];
const storageKey = "little-trail-progress-v1";
const roundLength = 5;

const stories = [
  {
    id: "puddle", title: "Pip and the Puddle", art: "🐸", length: "3 min read", moral: "A little kindness can brighten someone else's day.", friend: "🐦", detail: "🌿",
    pages: [
      "After a long rain, Pip found a shiny puddle under the ferns. He hopped around it, making tiny rings in the water. It was the perfect pond for one little frog.",
      "A tired robin landed nearby. Her feathers were dusty, and she had flown a very long way. “May I have a drink?” she asked. Pip looked at his perfect pond, then at his thirsty new friend.",
      "“Of course!” said Pip. He made room beside the water. Robin drank, then helped Pip float a leaf boat. The puddle felt bigger when they shared it. Pip learned that kindness can make a small thing feel wonderful."
    ]
  },
  {
    id: "moon", title: "The Moonlit Picnic", art: "🦊", length: "3 min read", moral: "The best treats are the ones we share.", friend: "🦉", detail: "✨",
    pages: [
      "Fox packed a picnic for the moonrise: three red apples, a warm bun, and one little jar of honey. “I have just enough for me,” Fox thought, and hurried up the hill.",
      "At the hilltop, Owl had brought a starry blanket and Hare had carried a tiny lantern. They had no snacks, but they had saved a cozy spot for Fox. The moon peeked over the pine trees.",
      "Fox opened the basket. One apple for Owl, one for Hare, and one for Fox. They broke the bun into three pieces and shared the honey. It tasted sweeter together. On the walk home, Fox discovered that sharing makes room for more friends."
    ]
  },
  {
    id: "seed", title: "A Seed's Big Day", art: "🐻", length: "3 min read", moral: "Big things grow when we give them time and care.", friend: "🦋", detail: "🌻",
    pages: [
      "Bear found a tiny seed beside the path. “You are so small,” he said. The seed tucked itself into the soft earth and waited while gentle rain pattered overhead.",
      "The next day, Bear came back with a sip of water. Then he came back again. A little green shoot appeared. “Growing takes time,” Bear whispered, and kept the weeds away.",
      "By summer, a golden sunflower stood taller than Bear. Butterflies visited its sunny face, and Bear saved a few new seeds for next year. He smiled: patient care had helped one small seed become a whole garden."
    ]
  }
];
stories.push(...fableStories);

function storySceneMarkup(story, pageIndex = 0) {
  const detail = story.moments?.[pageIndex] ?? (story.id === "puddle"
    ? pageIndex === 0 ? "💧" : pageIndex === 1 ? "🍃" : "⛵"
    : story.id === "moon"
      ? pageIndex === 0 ? "🧺" : pageIndex === 1 ? "🏮" : "🍯"
      : pageIndex === 0 ? "🌰" : pageIndex === 1 ? "🌱" : "🌻");
  return `<div class="storybook-scene story-${story.id} biome-${story.biome || "meadow"} chapter-${pageIndex + 1}" aria-hidden="true">
    <span class="scene-sun"></span><span class="scene-cloud cloud-one"></span><span class="scene-cloud cloud-two"></span>
    <span class="scene-hill hill-far"></span><span class="scene-hill hill-near"></span>
    <span class="scene-tree tree-left">🌲</span><span class="scene-tree tree-right">🌳</span>
    <span class="scene-water"><i></i><i></i><i></i></span>
    <span class="scene-creature">${story.art}</span><span class="scene-friend">${story.friend}</span>
    <span class="scene-detail">${detail}</span><span class="scene-butterfly">🦋</span>
    <span class="scene-grass grass-left">🌾</span><span class="scene-grass grass-right">🌼</span>
  </div>`;
}

const soundChoices = [
  { id: "birds", label: "Morning birds", emoji: "🐦", hint: "Little forest greetings" },
  { id: "rain", label: "Soft rain", emoji: "🌧️", hint: "Pitter-patter on leaves" },
  { id: "frog", label: "Froggy pond", emoji: "🐸", hint: "A bubbly pond song" },
  { id: "wind", label: "Breezy trees", emoji: "🌳", hint: "Wind through the branches" },
  { id: "ocean", label: "Ocean waves", emoji: "🌊", hint: "A hush along the shore" },
  { id: "crickets", label: "Night crickets", emoji: "🦗", hint: "A tiny twilight chorus" }
];

const discoveryCatalog = [
  { id: "romanesco", name: "Romanesco", image: "assets/vegetables/cauliflower.jpg", creator: "Monkeystyle3000", credit: "CC BY 2.0", source: "https://www.flickr.com/photos/132295270@N07/47109511002" },
  { id: "carrot", name: "Carrot", image: "assets/vegetables/candidate-carrot-1.jpg", creator: "color line", credit: "CC BY 2.0", source: "https://www.flickr.com/photos/36131061@N00/35819369" },
  { id: "pumpkin", name: "Pumpkin", image: "assets/vegetables/pumpkin.jpg", creator: "poppet with a camera", credit: "CC BY 2.0", source: "https://www.flickr.com/photos/30070299@N06/9776737945" },
  { id: "bell-pepper", name: "Red bell pepper", image: "assets/vegetables/bell-pepper.jpg", creator: "cobblucas", credit: "CC BY 2.0", source: "https://www.flickr.com/photos/25962164@N04/4783962793" },
  { id: "okra", name: "Okra", image: "assets/vegetables/okra.jpg", creator: "shankar s.", credit: "CC BY 2.0", source: "https://www.flickr.com/photos/77742560@N06/7637732356" },
  { id: "celery", name: "Celery", image: "assets/vegetables/celery.jpg", creator: "TheDeliciousLife", credit: "CC BY 2.0", source: "https://www.flickr.com/photos/33715728@N05/4249693470" },
  { id: "potato", name: "Potato", image: "assets/vegetables/potato.jpg", creator: "16:9clue", credit: "CC BY 2.0", source: "https://www.flickr.com/photos/53255320@N07/6762195603" },
  { id: "cucumber", name: "Cucumber", image: "assets/vegetables/cucumber.jpg", creator: "David Davies", credit: "CC BY-SA 2.0", source: "https://www.flickr.com/photos/44124390461@N01/4782586685" },
  { id: "broccoli", name: "Broccoli", image: "assets/vegetables/broccoli.jpg", creator: "sk8geek", credit: "CC BY-SA 2.0", source: "https://www.flickr.com/photos/26170836@N05/5478500913" }
];
const paintColors = ["#f04f54", "#f28c38", "#f5cb45", "#52a85b", "#388fc1", "#715ac8", "#e77fae", "#4b453d"];
const paintStamps = ["🌼", "🌻", "🍓", "🍎", "🥕", "🦋", "🐞", "🌈"];
const paintTemplateUrl = "assets/coloring/garden-friend.svg";

let progress = loadProgress();
let currentView = "home";
let mathRound = [];
let questionIndex = 0;
let roundCorrect = 0;
let mathDifficulty = "easy";
let mathOperation = "mixed";
let mathTable = 2;
let mathMode = "round";
let guessTarget = 0;
let guessLimit = 0;
let guessCount = 0;
let guessLow = 1;
let guessHigh = 10;
let sudokuPuzzle = [];
let sudokuSolution = [];
let sudokuBoard = [];
let sudokuSelected = -1;
let sudokuNotice = "Choose an empty square.";
let mathCompleted = false;
let discoveryMode = "find";
let discoveryTarget = null;
let discoveryFound = [];
let discoveryMessage = "";
let storySpeech = null;
let audioContext = null;
let soundTimer = null;

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    return {
      stars: Number.isFinite(saved.stars) ? saved.stars : 0,
      stories: Array.isArray(saved.stories) ? saved.stories : [],
      sounds: Array.isArray(saved.sounds) ? saved.sounds : [],
      soundStar: saved.soundStar === true,
      paintStar: saved.paintStar === true,
      rounds: Number.isFinite(saved.rounds) ? saved.rounds : 0
    };
  } catch {
    return { stars: 0, stories: [], sounds: [], soundStar: false, paintStar: false, rounds: 0 };
  }
}

function saveProgress() {
  localStorage.setItem(storageKey, JSON.stringify(progress));
  starCount.textContent = String(progress.stars);
}

function announceReward(title, detail) {
  celebration.innerHTML = `<strong>⭐ ${title}</strong><p>${detail}</p>`;
  celebration.hidden = false;
  window.clearTimeout(announceReward.timer);
  announceReward.timer = window.setTimeout(() => { celebration.hidden = true; }, 3600);
}

function earnStar(title, detail) {
  progress.stars += 1;
  saveProgress();
  announceReward(title, detail);
}

function setView(name) {
  stopSpeech();
  if (currentView === "paint" && name !== "paint") {
    paintingInstance?.destroy();
    paintingInstance = null;
  }
  currentView = name;
  navButtons.forEach((button) => {
    const isActive = button.dataset.view === name || (name === "story-reader" && button.dataset.view === "stories");
    button.classList.toggle("is-active", isActive);
    if (isActive) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  if (name === "home") renderHome();
  if (name === "math") renderMathHub();
  if (name === "stories") renderStories();
  if (name === "sounds") renderSounds();
  if (name === "discover") renderDiscovery();
  if (name === "paint") renderPainting();
  view.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderHome() {
  const adventures = progress.rounds + progress.stories.length + (progress.sounds.length === soundChoices.length ? 1 : 0) + (progress.paintStar ? 1 : 0);
  const pct = Math.min(100, (adventures / 8) * 100);
  view.innerHTML = `
    <div class="home-view">
      <section class="welcome-band" aria-labelledby="welcome-title">
        <div class="welcome-copy">
          <p class="eyebrow">Your little world of wonder</p>
          <h1 id="welcome-title">Ready for today's adventures?</h1>
          <p>Count, imagine, and listen your way along the trail. Every little try is something to be proud of.</p>
        </div>
        <div class="welcome-art meadow-illustration" aria-hidden="true">
          <span class="scene-sun"></span><span class="hero-cloud cloud-one">☁️</span><span class="hero-cloud cloud-two">☁️</span>
          <span class="hero-hill hill-far"></span><span class="hero-hill hill-near"></span><span class="hero-stream"><i></i><i></i></span>
          <span class="hero-tree tree-left">🌲</span><span class="hero-tree tree-right">🌳</span>
          <span class="hero-animal fox">🦊</span><span class="hero-animal rabbit">🐇</span><span class="hero-animal bird">🐦</span>
          <span class="hero-flower flower-left">🌼</span><span class="hero-flower flower-right">🌸</span><span class="hero-lily">🪷</span>
        </div>
      </section>

      <div class="section-heading"><h2>Pick a path</h2><p>What sounds fun right now?</p></div>
      <section class="activity-grid" aria-label="Learning activities">
        <button class="activity-card math" data-open="math">
          <h3>Number meadow</h3><p>Add, subtract, multiply, divide, fill times tables, and solve number puzzles.</p><span class="activity-tag">FOUR OPERATIONS + PUZZLES</span><span class="activity-art" aria-hidden="true">🐞</span>
        </button>
        <button class="activity-card story" data-open="stories">
          <h3>Story nook</h3><p>Meet forest friends and listen to a story together.</p><span class="activity-tag">READ & LISTEN</span><span class="activity-art" aria-hidden="true">📚</span>
        </button>
        <button class="activity-card sound" data-open="sounds">
          <h3>Sound garden</h3><p>What do the birds, rain, and night-time bugs say?</p><span class="activity-tag">TAP TO EXPLORE</span><span class="activity-art" aria-hidden="true">🦉</span>
        </button>
        <button class="activity-card discovery" data-open="discover">
          <h3>Vegetable pictures</h3><p>Learn real vegetable names with photo cards and spoken words.</p><span class="activity-tag">LOOK, LISTEN, LEARN</span><span class="activity-art" aria-hidden="true">🥕</span>
        </button>
        <button class="activity-card paint" data-open="paint">
          <h3>Paint & play</h3><p>Make a colorful picture with brushes, stickers, and happy colors.</p><span class="activity-tag">YOUR ART STUDIO</span><span class="activity-art" aria-hidden="true">🎨</span>
        </button>
      </section>

      <section class="progress-strip" aria-label="Trail progress">
        <div class="progress-label"><span class="badge" aria-hidden="true">🌱</span><span><strong>Your trail is growing</strong><small>${progress.stars} stars in your pocket</small></span></div>
        <div class="progress-meter"><div class="progress-meter-track" role="progressbar" aria-label="Adventures completed" aria-valuemin="0" aria-valuemax="8" aria-valuenow="${Math.min(adventures, 8)}"><div class="progress-meter-fill" style="width:${pct}%"></div></div><span>${Math.min(adventures, 8)} of 8 adventures</span></div>
      </section>
    </div>`;
  starCount.textContent = String(progress.stars);
  view.querySelectorAll("[data-open]").forEach((button) => button.addEventListener("click", () => setView(button.dataset.open)));
}

const mathLevels = {
  easy: { label: "Easy", max: 10, factor: 5, guessMax: 20, guesses: 7, sudokuBlanks: 4 },
  medium: { label: "Medium", max: 50, factor: 10, guessMax: 50, guesses: 8, sudokuBlanks: 6 },
  hard: { label: "Hard", max: 100, factor: 12, guessMax: 100, guesses: 9, sudokuBlanks: 8 }
};
const operationSymbols = { add: "+", subtract: "−", multiply: "×", divide: "÷" };
const operationLabels = { add: "Addition", subtract: "Subtraction", multiply: "Multiplication", divide: "Division" };

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderMathHub() {
  const level = mathLevels[mathDifficulty];
  view.innerHTML = `
    <div class="activity-view math-hub">
      <button class="back-button" data-home><span aria-hidden="true">←</span> Back to my meadow</button>
      <div class="panel-heading"><div><p class="eyebrow">Number meadow</p><h1>Choose your math adventure</h1></div><p>Pick a level, then solve, fill, guess, or think your way to a star.</p></div>
      <section class="math-setup" aria-label="Math settings">
        <div class="math-setup-heading"><div><strong>1. Choose your level</strong><small>Start easy and climb when you're ready.</small></div><span class="level-stamp">${level.label}</span></div>
        <div class="level-picker" role="group" aria-label="Difficulty level">${Object.entries(mathLevels).map(([id, item]) => `<button type="button" data-level="${id}" aria-pressed="${mathDifficulty === id}"><span>${item.label}</span><small>${id === "easy" ? "Little numbers" : id === "medium" ? "Growing skills" : "Big brain"}</small></button>`).join("")}</div>
        <div class="math-options">
          <label>Operations round<select data-operation>${[["mixed", "All four, mixed"], ...Object.entries(operationLabels).map(([id, label]) => [id, label])].map(([id, label]) => `<option value="${id}" ${mathOperation === id ? "selected" : ""}>${label}</option>`).join("")}</select></label>
          <label>Times table<select data-table>${Array.from({ length: 11 }, (_, index) => index + 2).map((number) => `<option value="${number}" ${mathTable === number ? "selected" : ""}>${number} times table</option>`).join("")}</select></label>
        </div>
      </section>
      <div class="section-heading math-mode-heading"><h2>2. Pick a game</h2><p>Every finished game earns a star.</p></div>
      <section class="math-mode-grid" aria-label="Math games">
        <button class="math-mode-card mode-operations" data-start-mode="round"><span class="mode-icon" aria-hidden="true">➕</span><strong>Four operations</strong><small>Add, subtract, multiply, and divide. Choose one or mix them all.</small><span class="mode-tag">5 QUESTIONS</span></button>
        <button class="math-mode-card mode-tables" data-start-mode="tables"><span class="mode-icon" aria-hidden="true">✖️</span><strong>Fill the table</strong><small>Complete the ${mathTable} times table one answer at a time.</small><span class="mode-tag">10 BLANKS</span></button>
        <button class="math-mode-card mode-guess" data-start-mode="guess"><span class="mode-icon" aria-hidden="true">🔎</span><strong>Guess my number</strong><small>Use higher-or-lower clues to find the secret number.</small><span class="mode-tag">NUMBER CLUES</span></button>
        <button class="math-mode-card mode-sudoku" data-start-mode="sudoku"><span class="mode-icon" aria-hidden="true">🔢</span><strong>Mini Sudoku</strong><small>Fill the little number grid. No repeats in a row, column, or box.</small><span class="mode-tag">4 × 4 LOGIC</span></button>
      </section>
    </div>`;
  view.querySelector("[data-home]").addEventListener("click", () => setView("home"));
  view.querySelectorAll("[data-level]").forEach((button) => button.addEventListener("click", () => {
    mathDifficulty = button.dataset.level;
    renderMathHub();
  }));
  view.querySelectorAll("[data-start-mode]").forEach((button) => button.addEventListener("click", () => {
    mathOperation = view.querySelector("[data-operation]").value;
    mathTable = Number(view.querySelector("[data-table]").value);
    startMath(button.dataset.startMode);
  }));
}

function makeQuestion(operation = mathOperation) {
  const level = mathLevels[mathDifficulty];
  const selectedOperation = operation === "mixed"
    ? Object.keys(operationSymbols)[randomInteger(0, 3)]
    : operation;
  if (selectedOperation === "add") {
    const first = randomInteger(0, level.max);
    const second = randomInteger(0, level.max);
    return { first, second, operation: selectedOperation, answer: first + second };
  }
  if (selectedOperation === "subtract") {
    const first = randomInteger(0, level.max);
    const second = randomInteger(0, first);
    return { first, second, operation: selectedOperation, answer: first - second };
  }
  if (selectedOperation === "multiply") {
    const first = randomInteger(2, level.factor);
    const second = randomInteger(2, level.factor);
    return { first, second, operation: selectedOperation, answer: first * second };
  }
  const divisor = randomInteger(2, level.factor);
  const quotient = randomInteger(2, level.factor);
  return { first: divisor * quotient, second: divisor, operation: selectedOperation, answer: quotient };
}

function makeAnswerChoices(answer) {
  const choices = new Set([answer]);
  for (let distance = 1; choices.size < 3; distance += 1) {
    if (answer - distance >= 0) choices.add(answer - distance);
    if (choices.size < 3) choices.add(answer + distance);
  }
  return [...choices].sort(() => Math.random() - 0.5);
}

function startMath(mode = "round") {
  mathMode = mode;
  mathCompleted = false;
  questionIndex = 0;
  roundCorrect = 0;
  if (mode === "guess") {
    startNumberGuess();
    return;
  }
  if (mode === "sudoku") {
    startSudoku();
    return;
  }
  const count = mode === "tables" ? 10 : roundLength;
  mathRound = Array.from({ length: count }, (_, index) => mode === "tables"
    ? { first: mathTable, second: index + 1, operation: "multiply", answer: mathTable * (index + 1) }
    : makeQuestion());
  renderMathQuestion();
}

function renderMathQuestion() {
  const question = mathRound[questionIndex];
  const total = mathRound.length;
  const isTable = mathMode === "tables";
  const symbol = operationSymbols[question.operation];
  const countable = mathDifficulty === "easy" && ["add", "subtract"].includes(question.operation) && question.first <= 10 && question.second <= 10;
  const objectMarkup = !countable ? "" : question.operation === "subtract"
    ? Array.from({ length: question.first }, (_, index) => `<span class="${index >= question.answer ? "removed-object" : ""}">🍃</span>`).join("")
    : `<span>${"✨".repeat(question.first)}</span><span class="object-join" aria-hidden="true">+</span><span>${"✨".repeat(question.second)}</span>`;
  const tableMarkup = isTable ? `<div class="table-board" aria-label="${mathTable} times table">${mathRound.map((row, index) => `<div class="table-row ${index === questionIndex ? "is-current" : index < questionIndex ? "is-done" : ""}"><span>${mathTable} × ${row.second}</span><span>=</span><strong>${index < questionIndex ? row.answer : index === questionIndex ? "?" : "· · ·"}</strong></div>`).join("")}</div>` : "";
  const hint = isTable ? `Fill the missing answer in the ${mathTable} times table.` : question.operation === "subtract" ? "How many are left?" : question.operation === "divide" ? "Share into equal groups. How many in each?" : question.operation === "multiply" ? "Count equal groups." : "How many altogether?";
  view.innerHTML = `
    <div class="activity-view">
      <button class="back-button" data-back><span aria-hidden="true">←</span> Back to math games</button>
      <div class="panel-heading"><div><p class="eyebrow">${isTable ? `${mathTable} times table` : "Number meadow"} · ${mathLevels[mathDifficulty].label}</p><h1>${isTable ? "Fill in the missing answers" : "Let's solve it together!"}</h1></div><p>${isTable ? "Finish every row to complete your table." : "Choose the answer that fits the number puzzle."}</p></div>
      <section class="math-panel" aria-label="${isTable ? "Times table fill-in game" : "Four operations math game"}">
        <div class="round-top"><span>Question ${questionIndex + 1} of ${total}</span><div class="round-track"><span style="width:${(questionIndex / total) * 100}%"></span></div><span>⭐ ${progress.stars}</span></div>
        ${tableMarkup}
        <div class="question">
          <div>
            ${objectMarkup ? `<div class="objects" aria-hidden="true">${objectMarkup}</div>` : ""}
            <p class="equation">${question.first} ${symbol} ${question.second} = ?</p>
            <p class="question-hint">${hint}</p>
          </div>
        </div>
        <div class="answer-list" role="group" aria-label="Choose an answer">${makeAnswerChoices(question.answer).map((choice) => `<button class="answer-button" data-answer="${choice}">${choice}</button>`).join("")}</div>
        <p class="feedback" aria-live="polite"></p>
      </section>
    </div>`;
  view.querySelector("[data-back]").addEventListener("click", renderMathHub);
  view.querySelectorAll("[data-answer]").forEach((button) => button.addEventListener("click", () => checkAnswer(button, question.answer)));
}

function checkAnswer(button, answer) {
  const feedback = view.querySelector(".feedback");
  const buttons = [...view.querySelectorAll("[data-answer]")];
  buttons.forEach((item) => { item.disabled = true; });
  if (Number(button.dataset.answer) !== answer) {
    button.classList.add("wrong");
    feedback.textContent = `Good try! The answer is ${answer}. Let's keep going.`;
  } else {
    button.classList.add("correct");
    roundCorrect += 1;
    feedback.textContent = ["You got it!", "Lovely thinking!", "That's right!", "A bright answer!", "Wonderful work!"][Math.floor(Math.random() * 5)];
  }
  window.setTimeout(() => {
    questionIndex += 1;
    if (questionIndex < mathRound.length) renderMathQuestion();
    else finishMath();
  }, 650);
}

function finishMath() {
  const total = mathRound.length;
  showMathComplete("Number trail complete!", `You solved ${roundCorrect} of ${total} questions. Every try helps your number skills grow!`, roundCorrect === total ? "🏆" : "🌟");
}

function showMathComplete(title, detail, icon = "🌟") {
  if (mathCompleted) return;
  mathCompleted = true;
  progress.rounds += 1;
  earnStar("Math trail star!", detail);
  view.innerHTML = `
    <div class="activity-view">
      <section class="story-reader math-result" style="text-align:center">
        <div class="story-reader-art" aria-hidden="true">${icon}</div>
        <p class="eyebrow">${mathLevels[mathDifficulty].label} level complete</p>
        <h2>${title}</h2>
        <p class="story-copy">${detail}</p>
        <div class="story-controls" style="justify-content:center"><button class="primary-button" data-again>Play again</button><button class="secondary-button" data-home>Choose another game</button></div>
      </section>
    </div>`;
  view.querySelector("[data-again]").addEventListener("click", () => startMath(mathMode));
  view.querySelector("[data-home]").addEventListener("click", renderMathHub);
}

function startNumberGuess() {
  const level = mathLevels[mathDifficulty];
  guessTarget = randomInteger(1, level.guessMax);
  guessLimit = level.guesses;
  guessCount = 0;
  guessLow = 1;
  guessHigh = level.guessMax;
  renderNumberGuess("I'm thinking of a number. Can you find it?");
}

function renderNumberGuess(message) {
  const max = mathLevels[mathDifficulty].guessMax;
  view.innerHTML = `
    <div class="activity-view">
      <button class="back-button" data-back><span aria-hidden="true">←</span> Back to math games</button>
      <div class="panel-heading"><div><p class="eyebrow">Guess my number · ${mathLevels[mathDifficulty].label}</p><h1>What number am I?</h1></div><p>Use each clue to make your next guess smarter.</p></div>
      <section class="math-panel guess-panel">
        <div class="guess-range"><span>LOW</span><strong>${guessLow}</strong><i>↔</i><strong>${guessHigh}</strong><span>HIGH</span></div>
        <p class="guess-message" aria-live="polite">${message}</p>
        <form class="guess-form"><label for="guess-input">Pick a number from 1 to ${max}</label><div><input id="guess-input" name="guess" type="number" inputmode="numeric" min="1" max="${max}" required autofocus><button class="primary-button" type="submit">Guess</button></div></form>
        <p class="guess-attempts">${guessLimit - guessCount} guesses left</p>
      </section>
    </div>`;
  view.querySelector("[data-back]").addEventListener("click", renderMathHub);
  view.querySelector(".guess-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = view.querySelector("[name=guess]");
    const guess = Number(input.value);
    if (!Number.isInteger(guess) || guess < guessLow || guess > guessHigh) {
      renderNumberGuess(`Choose a whole number from ${guessLow} to ${guessHigh}.`);
      return;
    }
    guessCount += 1;
    if (guess === guessTarget) {
      showMathComplete("You found my number!", `You guessed ${guessTarget} in ${guessCount} ${guessCount === 1 ? "try" : "tries"}. Great clue-spotting!`, "🔎");
      return;
    }
    if (guess < guessTarget) guessLow = Math.max(guessLow, guess + 1);
    else guessHigh = Math.min(guessHigh, guess - 1);
    if (guessCount >= guessLimit) {
      showMathComplete("Number mystery solved!", `The secret number was ${guessTarget}. You used every clue and finished the puzzle!`, "💡");
      return;
    }
    renderNumberGuess(`${guess < guessTarget ? "Higher" : "Lower"}! ${guess} is not it. Try inside the new range.`);
  });
}

function shuffleItems(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const other = randomInteger(0, index);
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  return shuffled;
}

function makeSudokuSolution() {
  const base = [[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]];
  const bands = shuffleItems([0, 1]);
  const rows = bands.flatMap((band) => shuffleItems([0, 1]).map((offset) => band * 2 + offset));
  const stacks = shuffleItems([0, 1]);
  const columns = stacks.flatMap((stack) => shuffleItems([0, 1]).map((offset) => stack * 2 + offset));
  const symbols = shuffleItems([1, 2, 3, 4]);
  let solution = rows.map((row) => columns.map((column) => symbols[base[row][column] - 1]));
  if (Math.random() < .5) solution = solution[0].map((_, column) => solution.map((row) => row[column]));
  return solution;
}

function sudokuConflicts(board) {
  const conflicts = new Set();
  const markDuplicates = (indexes) => {
    const values = new Map();
    indexes.forEach((index) => {
      if (!board[index]) return;
      const matches = values.get(board[index]) || [];
      matches.push(index);
      values.set(board[index], matches);
    });
    values.forEach((matches) => { if (matches.length > 1) matches.forEach((index) => conflicts.add(index)); });
  };
  for (let row = 0; row < 4; row += 1) markDuplicates(Array.from({ length: 4 }, (_, column) => row * 4 + column));
  for (let column = 0; column < 4; column += 1) markDuplicates(Array.from({ length: 4 }, (_, row) => row * 4 + column));
  for (let boxRow = 0; boxRow < 2; boxRow += 1) {
    for (let boxColumn = 0; boxColumn < 2; boxColumn += 1) {
      markDuplicates([0, 1, 2, 3].map((offset) => (boxRow * 2 + Math.floor(offset / 2)) * 4 + boxColumn * 2 + (offset % 2)));
    }
  }
  return conflicts;
}

function countSudokuSolutions(board, limit = 2) {
  const empty = board.indexOf(0);
  if (empty < 0) return 1;
  let count = 0;
  const row = Math.floor(empty / 4);
  const column = empty % 4;
  for (let value = 1; value <= 4; value += 1) {
    board[empty] = value;
    if (sudokuConflicts(board).size === 0) count += countSudokuSolutions(board, limit - count);
    board[empty] = 0;
    if (count >= limit) break;
  }
  return count;
}

function createSudokuPuzzle() {
  const solution = makeSudokuSolution();
  const puzzle = solution.flat();
  const targetBlanks = mathLevels[mathDifficulty].sudokuBlanks;
  let blankCount = 0;
  for (const index of shuffleItems(Array.from({ length: 16 }, (_, item) => item))) {
    if (blankCount >= targetBlanks) break;
    const value = puzzle[index];
    puzzle[index] = 0;
    if (countSudokuSolutions(puzzle) === 1) blankCount += 1;
    else puzzle[index] = value;
  }
  return { solution: solution.flat(), puzzle, blankCount };
}

function startSudoku() {
  const game = createSudokuPuzzle();
  sudokuSolution = game.solution;
  sudokuPuzzle = game.puzzle;
  sudokuBoard = [...sudokuPuzzle];
  sudokuSelected = sudokuPuzzle.findIndex((value) => value === 0);
  sudokuNotice = `${game.blankCount} empty squares. Fill each row, column, and 2 × 2 box with 1–4.`;
  renderSudoku();
}

function renderSudoku() {
  const conflicts = sudokuConflicts(sudokuBoard);
  const cells = sudokuBoard.map((value, index) => `<button type="button" class="sudoku-cell ${sudokuPuzzle[index] ? "is-given" : "is-editable"} ${sudokuSelected === index ? "is-selected" : ""} ${conflicts.has(index) ? "is-conflict" : ""}" data-sudoku-cell="${index}" aria-label="Row ${Math.floor(index / 4) + 1}, column ${(index % 4) + 1}${value ? `, ${value}` : ", empty"}" ${sudokuPuzzle[index] ? "disabled" : ""}>${value || ""}</button>`).join("");
  view.innerHTML = `
    <div class="activity-view">
      <button class="back-button" data-back><span aria-hidden="true">←</span> Back to math games</button>
      <div class="panel-heading"><div><p class="eyebrow">Mini Sudoku · ${mathLevels[mathDifficulty].label}</p><h1>Fill the number garden</h1></div><p>Use 1, 2, 3, and 4 once in each row, column, and little box.</p></div>
      <section class="math-panel sudoku-panel">
        <div class="sudoku-layout"><div class="sudoku-board" role="grid" aria-label="Four by four Sudoku">${cells}</div>
          <div class="sudoku-tools"><p class="sudoku-message" aria-live="polite">${sudokuNotice}</p><div class="sudoku-keypad" role="group" aria-label="Choose a number">${[1, 2, 3, 4].map((number) => `<button type="button" data-sudoku-value="${number}">${number}</button>`).join("")}</div>
            <button type="button" class="secondary-button" data-sudoku-hint>Show a hint</button><button type="button" class="primary-button" data-sudoku-check>Check my grid</button>
          </div></div>
      </section>
    </div>`;
  view.querySelector("[data-back]").addEventListener("click", renderMathHub);
  view.querySelectorAll("[data-sudoku-cell]").forEach((button) => button.addEventListener("click", () => {
    sudokuSelected = Number(button.dataset.sudokuCell);
    sudokuNotice = "Choose a number for the highlighted square.";
    renderSudoku();
  }));
  view.querySelectorAll("[data-sudoku-value]").forEach((button) => button.addEventListener("click", () => {
    if (sudokuSelected < 0 || sudokuPuzzle[sudokuSelected]) return;
    sudokuBoard[sudokuSelected] = Number(button.dataset.sudokuValue);
    sudokuNotice = "Keep going. Look for repeats in each row, column, and box.";
    renderSudoku();
  }));
  view.querySelector("[data-sudoku-hint]").addEventListener("click", () => {
    if (sudokuSelected < 0 || sudokuPuzzle[sudokuSelected]) sudokuSelected = sudokuPuzzle.findIndex((value, index) => !value && !sudokuBoard[index]);
    if (sudokuSelected >= 0) sudokuBoard[sudokuSelected] = sudokuSolution[sudokuSelected];
    sudokuNotice = "A helpful number is filled in. See how it fits the row and column.";
    renderSudoku();
  });
  view.querySelector("[data-sudoku-check]").addEventListener("click", () => {
    if (sudokuBoard.includes(0)) {
      sudokuNotice = "A few squares are still empty. Keep filling the grid.";
      renderSudoku();
    } else if (sudokuConflicts(sudokuBoard).size) {
      sudokuNotice = "Some numbers repeat. The glowing squares show where to check.";
      renderSudoku();
    } else {
      showMathComplete("Sudoku solved!", "Every row, column, and box is complete. Brilliant number spotting!", "🔢");
    }
  });
}

function renderStories() {
  view.innerHTML = `
    <div class="activity-view">
      <button class="back-button" data-back><span aria-hidden="true">←</span> Back to my meadow</button>
      <div class="panel-heading"><div><p class="eyebrow">Story nook</p><h1>Choose a little tale</h1></div><p>Pick from ${stories.length} animal adventures, read a page, and discover its little lesson.</p></div>
      <div class="story-library-tools">
        <label class="story-search"><span>Find a story</span><input type="search" data-story-search placeholder="Try fox, sharing, courage…" autocomplete="off"></label>
        <div class="story-filters" role="group" aria-label="Filter stories"><button type="button" data-story-filter="all" aria-pressed="true">All <span>${stories.length}</span></button><button type="button" data-story-filter="unread" aria-pressed="false">Unread <span>${stories.length - progress.stories.length}</span></button></div>
      </div>
      <p class="story-result-count" aria-live="polite"></p>
      <div class="story-list" aria-label="Stories"></div>
      <p class="story-source">Fresh retellings inspired by <a href="https://www.gutenberg.org/ebooks/11339" target="_blank" rel="noreferrer">Aesop's Fables</a>, V. S. Vernon Jones translation (1912), Project Gutenberg eBook 11339.</p>
    </div>`;
  view.querySelector("[data-back]").addEventListener("click", () => setView("home"));
  let selectedFilter = "all";
  const searchInput = view.querySelector("[data-story-search]");
  const storyList = view.querySelector(".story-list");
  const resultCount = view.querySelector(".story-result-count");
  function drawStoryList() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const matches = stories.filter((story) => {
      const unread = !progress.stories.includes(story.id);
      return (selectedFilter !== "unread" || unread)
        && (!query || `${story.title} ${story.moral}`.toLocaleLowerCase().includes(query));
    });
    resultCount.textContent = `${matches.length} ${matches.length === 1 ? "story" : "stories"}${selectedFilter === "unread" ? " to discover" : ""}`;
    storyList.innerHTML = matches.length
      ? matches.map((story) => `<button class="story-choice" data-story="${story.id}">${storySceneMarkup(story)}<span class="story-choice-copy"><strong>${story.title}</strong><small>${story.length}${progress.stories.includes(story.id) ? " · ⭐ collected" : " · A little animal tale"}</small></span></button>`).join("")
      : `<p class="empty-state">No stories found. Try another word or choose All.</p>`;
    storyList.querySelectorAll("[data-story]").forEach((button) => button.addEventListener("click", () => openStory(button.dataset.story)));
  }
  searchInput.addEventListener("input", drawStoryList);
  view.querySelectorAll("[data-story-filter]").forEach((button) => button.addEventListener("click", () => {
    selectedFilter = button.dataset.storyFilter;
    view.querySelectorAll("[data-story-filter]").forEach((filter) => filter.setAttribute("aria-pressed", String(filter === button)));
    drawStoryList();
  }));
  drawStoryList();
}

function openStory(id) {
  currentView = "story-reader";
  const story = stories.find((item) => item.id === id);
  let pageIndex = 0;
  let finished = false;
  navButtons.forEach((button) => {
    const active = button.dataset.view === "stories";
    button.classList.toggle("is-active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  function drawPage() {
    const isLast = pageIndex === story.pages.length - 1;
    const alreadyRewarded = progress.stories.includes(story.id);
    view.innerHTML = `
      <div class="activity-view">
        <button class="back-button" data-back><span aria-hidden="true">←</span> All stories</button>
        <article class="story-reader">
          ${storySceneMarkup(story, pageIndex)}
          <div class="story-page-meta"><p class="eyebrow">${story.biome ? "An animal fable" : "A little forest tale"}</p><span>Page ${pageIndex + 1} of ${story.pages.length}</span></div>
          <div class="story-page-track" aria-label="Story progress"><span style="width:${((pageIndex + 1) / story.pages.length) * 100}%"></span></div>
          <h2>${story.title}</h2>
          <p class="story-copy">${story.pages[pageIndex]}</p>
          ${isLast ? `<p class="story-moral"><span aria-hidden="true">🌱</span><span><small>THE LITTLE LESSON</small><strong>${story.moral}</strong></span></p>` : ""}
          <div class="story-controls">
            <button class="primary-button" data-read>${storySpeech ? "Reading aloud…" : "🔊 Read aloud"}</button>
            <button class="secondary-button" data-stop>Stop voice</button>
            ${isLast ? `<button class="primary-button" data-finish ${finished ? "disabled" : ""}>${alreadyRewarded ? "Story complete ✓" : "Finish story ⭐"}</button>` : `<button class="secondary-button" data-next>Next page →</button>`}
          </div>
        </article>
      </div>`;
    view.querySelector("[data-back]").addEventListener("click", () => { stopSpeech(); renderStories(); });
    view.querySelector("[data-read]").addEventListener("click", speakPage);
    view.querySelector("[data-stop]").addEventListener("click", stopSpeech);
    view.querySelector("[data-next]")?.addEventListener("click", () => { stopSpeech(); pageIndex += 1; drawPage(); });
    view.querySelector("[data-finish]")?.addEventListener("click", () => {
      finished = true;
      if (!progress.stories.includes(story.id)) {
        progress.stories.push(story.id);
        earnStar("Story star earned!", `You finished “${story.title}”. A lovely story explorer!`);
      }
      drawPage();
    });
  }
  function speakPage() {
    if (!("speechSynthesis" in window)) {
      view.querySelector(".story-copy").textContent += " (Read-aloud voice is not available in this browser.)";
      return;
    }
    stopSpeech();
    storySpeech = new SpeechSynthesisUtterance(story.pages[pageIndex]);
    storySpeech.rate = 0.88;
    storySpeech.pitch = 1.08;
    storySpeech.onend = () => {
      storySpeech = null;
      const readButton = view.querySelector("[data-read]");
      if (readButton) readButton.textContent = "🔊 Read aloud";
    };
    window.speechSynthesis.speak(storySpeech);
    view.querySelector("[data-read]").textContent = "Reading aloud…";
  }
  drawPage();
  view.focus({ preventScroll: true });
}

function stopSpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  storySpeech = null;
  const readButton = view.querySelector("[data-read]");
  if (readButton) readButton.textContent = "🔊 Read aloud";
}

let paintingInstance = null;

function renderPainting() {
  paintingInstance?.destroy();
  paintingInstance = null;
  view.innerHTML = `
    <div class="activity-view painting-view">
      <button class="back-button" data-back><span aria-hidden="true">←</span> Back to my meadow</button>
      <div class="panel-heading"><div><p class="eyebrow">Little art studio</p><h1>Paint a happy picture</h1></div><p>Color a garden friend, draw your own picture, or add a sticker.</p></div>
      <section class="paint-tools" aria-label="Painting tools">
        <div class="paint-tool-row"><span class="paint-tool-label">Page</span><div class="paint-brush-sizes" role="group" aria-label="Choose a drawing page"><button type="button" data-paint-mode="coloring" aria-pressed="true">Coloring page</button><button type="button" data-paint-mode="free" aria-pressed="false">Free draw</button></div></div>
        <div class="paint-tool-row"><span class="paint-tool-label">Colors</span><div class="paint-colors" role="group" aria-label="Choose a paint color">${paintColors.map((color, index) => `<button type="button" class="paint-swatch ${index === 0 ? "is-selected" : ""}" data-paint-color="${color}" style="--swatch:${color}" aria-label="Color ${index + 1}" aria-pressed="${index === 0}"></button>`).join("")}</div></div>
        <div class="paint-tool-row paint-actions"><span class="paint-tool-label">Brush</span><div class="paint-brush-sizes" role="group" aria-label="Brush size"><button type="button" data-brush-size="6" aria-pressed="false">Fine</button><button type="button" data-brush-size="14" aria-pressed="true">Medium</button><button type="button" data-brush-size="26" aria-pressed="false">Big</button></div><button type="button" class="paint-tool-button" data-paint-fill aria-pressed="false">▧ Fill</button><button type="button" class="paint-tool-button" data-paint-eraser aria-pressed="false">⌫ Eraser</button><button type="button" class="paint-tool-button" data-paint-undo disabled>↶ Undo</button><button type="button" class="paint-tool-button" data-paint-clear>Clear</button></div>
        <div class="paint-tool-row"><span class="paint-tool-label">Stickers</span><div class="paint-stickers" role="group" aria-label="Choose a picture sticker">${paintStamps.map((stamp) => `<button type="button" data-paint-stamp="${stamp}" aria-label="Add ${stamp} sticker">${stamp}</button>`).join("")}</div><button type="button" class="paint-tool-button" data-paint-brush aria-pressed="true">✎ Draw</button></div>
      </section>
      <div class="paint-paper-wrap"><canvas class="paint-paper" aria-label="Blank painting canvas. Draw with a finger, mouse, or pen." role="img"></canvas></div>
      <div class="paint-footer"><span class="paint-message" aria-live="polite">Your picture starts here.</span><div><button type="button" class="secondary-button" data-paint-save>↓ Save picture</button><button type="button" class="primary-button" data-paint-done>I'm done! ⭐</button></div></div>
    </div>`;

  view.querySelector("[data-back]").addEventListener("click", () => setView("home"));
  const canvas = view.querySelector(".paint-paper");
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const state = { color: paintColors[0], size: 14, tool: "brush", mode: "coloring", stamp: null, drawing: false, last: null, history: [], observer: null, ratio: 1 };
  const message = view.querySelector(".paint-message");
  const undoButton = view.querySelector("[data-paint-undo]");
  const templateImage = new Image();
  let templateReady = false;
  let templateObjectUrl = null;

  function drawWhitePaper() {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
  }

  function drawPaper() {
    drawWhitePaper();
    if (state.mode === "coloring" && templateReady) {
      const scale = Math.min(canvas.clientWidth / templateImage.naturalWidth, canvas.clientHeight / templateImage.naturalHeight);
      const width = templateImage.naturalWidth * scale;
      const height = templateImage.naturalHeight * scale;
      context.drawImage(templateImage, (canvas.clientWidth - width) / 2, (canvas.clientHeight - height) / 2, width, height);
    }
  }

  function capture() {
    state.history.push(context.getImageData(0, 0, canvas.width, canvas.height));
    if (state.history.length > 10) state.history.shift();
    undoButton.disabled = state.history.length < 2;
  }

  function resetHistory() {
    state.history = [];
    drawPaper();
    capture();
  }
  drawPaper();

  function resizeCanvas() {
    if (!canvas.clientWidth || !canvas.clientHeight) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.round(canvas.clientWidth * ratio);
    const height = Math.round(canvas.clientHeight * ratio);
    if (canvas.width === width && canvas.height === height) return;
    const previous = document.createElement("canvas");
    previous.width = canvas.width;
    previous.height = canvas.height;
    if (previous.width && previous.height) previous.getContext("2d").drawImage(canvas, 0, 0);
    canvas.width = width;
    canvas.height = height;
    state.ratio = ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawWhitePaper();
    if (previous.width && previous.height) context.drawImage(previous, 0, 0, canvas.clientWidth, canvas.clientHeight);
    state.history = [];
    capture();
  }

  function pointFromEvent(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function drawLine(from, to) {
    context.save();
    context.globalCompositeOperation = "source-over";
    context.strokeStyle = state.tool === "eraser" ? "#ffffff" : state.color;
    context.lineWidth = state.tool === "eraser" ? state.size * 2.5 : state.size;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
    context.restore();
  }

  function fillRegion(point) {
    const x = Math.floor(point.x * canvas.width / canvas.clientWidth);
    const y = Math.floor(point.y * canvas.height / canvas.clientHeight);
    const image = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = image.data;
    const start = (y * canvas.width + x) * 4;
    const seed = [pixels[start], pixels[start + 1], pixels[start + 2]];
    if (Math.max(...seed) < 110) return false;
    const color = state.color.match(/[\da-f]{2}/gi).map((part) => parseInt(part, 16));
    if (seed.every((channel, index) => channel === color[index])) return false;
    const matches = (pixel) => Math.abs(pixels[pixel] - seed[0]) < 44 && Math.abs(pixels[pixel + 1] - seed[1]) < 44 && Math.abs(pixels[pixel + 2] - seed[2]) < 44;
    const stack = [[x, y]];
    while (stack.length) {
      const [seedX, seedY] = stack.pop();
      let left = seedX;
      let pixel = (seedY * canvas.width + left) * 4;
      while (left >= 0 && matches(pixel)) { left--; pixel -= 4; }
      left++;
      let right = seedX;
      pixel = (seedY * canvas.width + right) * 4;
      while (right < canvas.width && matches(pixel)) { right++; pixel += 4; }
      right--;
      for (let fillX = left; fillX <= right; fillX++) {
        const fillAt = (seedY * canvas.width + fillX) * 4;
        pixels[fillAt] = color[0];
        pixels[fillAt + 1] = color[1];
        pixels[fillAt + 2] = color[2];
        pixels[fillAt + 3] = 255;
      }
      for (const nextY of [seedY - 1, seedY + 1]) {
        if (nextY < 0 || nextY >= canvas.height) continue;
        let fillX = left;
        while (fillX <= right) {
          let nextPixel = (nextY * canvas.width + fillX) * 4;
          while (fillX <= right && !matches(nextPixel)) { fillX++; nextPixel += 4; }
          if (fillX <= right) stack.push([fillX, nextY]);
          while (fillX <= right && matches(nextPixel)) { fillX++; nextPixel += 4; }
        }
      }
    }
    context.putImageData(image, 0, 0);
    return true;
  }

  function pointerDown(event) {
    event.preventDefault();
    canvas.setPointerCapture(event.pointerId);
    const point = pointFromEvent(event);
    if (state.tool === "fill") {
      if (fillRegion(point)) {
        capture();
        message.textContent = "Color filled in! Pick another spot.";
      } else {
        message.textContent = "Try tapping inside a closed shape.";
      }
      return;
    }
    if (state.tool === "stamp" && state.stamp) {
      context.save();
      context.font = `${Math.max(34, state.size * 3)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(state.stamp, point.x, point.y);
      context.restore();
      capture();
      message.textContent = `${state.stamp} sticker added!`;
      return;
    }
    state.drawing = true;
    state.last = point;
    drawLine(point, { x: point.x + .1, y: point.y + .1 });
    message.textContent = state.tool === "eraser" ? "Rub out a little or a lot." : "Lovely colors! Keep going.";
  }

  function pointerMove(event) {
    if (!state.drawing) return;
    event.preventDefault();
    const point = pointFromEvent(event);
    drawLine(state.last, point);
    state.last = point;
  }

  function pointerUp() {
    if (!state.drawing) return;
    state.drawing = false;
    state.last = null;
    capture();
  }

  canvas.addEventListener("pointerdown", pointerDown);
  canvas.addEventListener("pointermove", pointerMove);
  canvas.addEventListener("pointerup", pointerUp);
  canvas.addEventListener("pointercancel", pointerUp);
  if ("ResizeObserver" in window) {
    state.observer = new ResizeObserver(resizeCanvas);
    state.observer.observe(canvas);
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  templateImage.onload = () => {
    templateReady = true;
    if (state.mode === "coloring" && state.history.length <= 1) resetHistory();
  };
  fetch(paintTemplateUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Coloring page unavailable");
      return response.text();
    })
    .then((svg) => {
      templateObjectUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
      templateImage.src = templateObjectUrl;
    })
    .catch(() => { message.textContent = "Coloring page unavailable. Free draw is ready instead."; });

  view.querySelectorAll("[data-paint-mode]").forEach((button) => button.addEventListener("click", () => {
    state.mode = button.dataset.paintMode;
    view.querySelectorAll("[data-paint-mode]").forEach((mode) => mode.setAttribute("aria-pressed", String(mode === button)));
    state.tool = "brush";
    state.stamp = null;
    view.querySelector("[data-paint-fill]").setAttribute("aria-pressed", "false");
    view.querySelector("[data-paint-eraser]").setAttribute("aria-pressed", "false");
    view.querySelector("[data-paint-brush]").setAttribute("aria-pressed", "true");
    resetHistory();
    message.textContent = state.mode === "coloring" ? "Choose a color and fill a shape." : "A fresh page for your own drawing.";
  }));

  view.querySelectorAll("[data-paint-color]").forEach((button) => button.addEventListener("click", () => {
    state.color = button.dataset.paintColor;
    state.tool = "brush";
    state.stamp = null;
    view.querySelectorAll("[data-paint-color]").forEach((swatch) => swatch.setAttribute("aria-pressed", String(swatch === button)));
    view.querySelectorAll("[data-paint-color]").forEach((swatch) => swatch.classList.toggle("is-selected", swatch === button));
    view.querySelector("[data-paint-eraser]").setAttribute("aria-pressed", "false");
    view.querySelector("[data-paint-brush]").setAttribute("aria-pressed", "true");
    view.querySelector("[data-paint-fill]").setAttribute("aria-pressed", "false");
    message.textContent = "Color picked. Make a mark!";
  }));
  view.querySelectorAll("[data-brush-size]").forEach((button) => button.addEventListener("click", () => {
    state.size = Number(button.dataset.brushSize);
    view.querySelectorAll("[data-brush-size]").forEach((size) => size.setAttribute("aria-pressed", String(size === button)));
  }));
  view.querySelector("[data-paint-eraser]").addEventListener("click", (event) => {
    state.tool = "eraser";
    state.stamp = null;
    event.currentTarget.setAttribute("aria-pressed", "true");
    view.querySelector("[data-paint-fill]").setAttribute("aria-pressed", "false");
    view.querySelector("[data-paint-brush]").setAttribute("aria-pressed", "false");
  });
  view.querySelector("[data-paint-brush]").addEventListener("click", (event) => {
    state.tool = "brush";
    state.stamp = null;
    event.currentTarget.setAttribute("aria-pressed", "true");
    view.querySelector("[data-paint-eraser]").setAttribute("aria-pressed", "false");
    view.querySelector("[data-paint-fill]").setAttribute("aria-pressed", "false");
  });
  view.querySelector("[data-paint-fill]").addEventListener("click", (event) => {
    state.tool = "fill";
    state.stamp = null;
    event.currentTarget.setAttribute("aria-pressed", "true");
    view.querySelector("[data-paint-brush]").setAttribute("aria-pressed", "false");
    view.querySelector("[data-paint-eraser]").setAttribute("aria-pressed", "false");
    message.textContent = "Tap inside a shape to fill it with color.";
  });
  view.querySelectorAll("[data-paint-stamp]").forEach((button) => button.addEventListener("click", () => {
    state.tool = "stamp";
    state.stamp = button.dataset.paintStamp;
    view.querySelector("[data-paint-brush]").setAttribute("aria-pressed", "false");
    view.querySelector("[data-paint-eraser]").setAttribute("aria-pressed", "false");
    view.querySelector("[data-paint-fill]").setAttribute("aria-pressed", "false");
    message.textContent = `Tap your picture to place ${state.stamp}.`;
  }));
  undoButton.addEventListener("click", () => {
    if (state.history.length < 2) return;
    state.history.pop();
    context.putImageData(state.history[state.history.length - 1], 0, 0);
    undoButton.disabled = state.history.length < 2;
    message.textContent = "Last mark undone.";
  });
  view.querySelector("[data-paint-clear]").addEventListener("click", () => {
    resetHistory();
    message.textContent = state.mode === "coloring" ? "Coloring page reset." : "A fresh sheet, ready for a new picture.";
  });
  view.querySelector("[data-paint-save]").addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "little-trail-picture.png";
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    link.remove();
    message.textContent = "Your picture is saved!";
  });
  view.querySelector("[data-paint-done]").addEventListener("click", () => {
    if (!progress.paintStar) {
      progress.paintStar = true;
      earnStar("Artist star!", "You made a picture in the Little Art Studio!");
    } else {
      saveProgress();
      announceReward("Beautiful picture!", "Keep making colorful things.");
    }
    message.textContent = "Artist star earned. Your picture is ready to save!";
  });

  paintingInstance = { destroy() {
    state.observer?.disconnect();
    if (templateObjectUrl) URL.revokeObjectURL(templateObjectUrl);
    window.removeEventListener("resize", resizeCanvas);
    canvas.removeEventListener("pointerdown", pointerDown);
    canvas.removeEventListener("pointermove", pointerMove);
    canvas.removeEventListener("pointerup", pointerUp);
    canvas.removeEventListener("pointercancel", pointerUp);
  } };
}

function renderSounds() {
  view.innerHTML = `
    <div class="activity-view">
      <button class="back-button" data-back><span aria-hidden="true">←</span> Back to my meadow</button>
      <div class="panel-heading"><div><p class="eyebrow">Sound garden</p><h1>Listen to the little wild</h1></div><p>Tap a sound to hear a tiny soundscape. Try every one to earn a sound explorer star.</p></div>
      <section class="sound-grid" aria-label="Nature and animal sounds">${soundChoices.map((sound) => `<button class="sound-pad" data-sound="${sound.id}"><span class="sound-emoji" aria-hidden="true">${sound.emoji}</span><strong>${sound.label}</strong><small>${progress.sounds.includes(sound.id) ? "Heard ✓" : sound.hint}</small></button>`).join("")}</section>
      <div class="sound-progress"><strong>${progress.sounds.length} of ${soundChoices.length}</strong> sounds explored${progress.sounds.length === soundChoices.length ? " · Sound explorer star collected!" : " · Hear them all to complete your safari."}</div>
    </div>`;
  view.querySelector("[data-back]").addEventListener("click", () => setView("home"));
  view.querySelectorAll("[data-sound]").forEach((button) => button.addEventListener("click", () => playSound(button.dataset.sound)));
}

function visibleDiscoveryItems() {
  return discoveryCatalog;
}

function resetDiscoveryRound() {
  discoveryFound = [];
  const items = visibleDiscoveryItems();
  discoveryTarget = items[Math.floor(Math.random() * items.length)] || null;
}

function renderDiscovery() {
  discoveryMode = "find";
  resetDiscoveryRound();
  discoveryMessage = "Tap a vegetable photo to hear its name.";
  view.innerHTML = `
    <div class="activity-view discovery-view">
      <button class="back-button" data-back><span aria-hidden="true">←</span> Back to my meadow</button>
      <div class="panel-heading"><div><p class="eyebrow">Vegetable picture garden</p><h1>Find it. Tap it. Say it.</h1></div><p>Look at real vegetable photos. Tap a picture to hear the vegetable's name.</p></div>
      <div class="discovery-controls">
        <div class="discovery-modes" role="group" aria-label="Picture activity"><button type="button" data-discovery-mode="find" aria-pressed="true">Find it</button><button type="button" data-discovery-mode="explore" aria-pressed="false">Learn names</button></div>
      </div>
      <section class="discovery-callout" aria-live="polite"><div><small class="discovery-count">0 of ${discoveryCatalog.length} vegetables found</small><strong class="discovery-prompt"></strong></div><span class="discovery-message"></span><button class="secondary-button" data-play-again hidden>Play another round</button></section>
      <div class="vegetable-photo-grid" aria-label="Vegetable photo cards">${discoveryCatalog.map((item) => `<button type="button" class="vegetable-photo-card ${discoveryFound.includes(item.id) ? "is-found" : ""}" data-vegetable="${item.id}" aria-label="${item.name}${discoveryFound.includes(item.id) ? ", found" : ""}"><span class="vegetable-photo"><img src="${item.image}" alt="Real ${item.name.toLowerCase()} vegetable" loading="lazy"><span class="photo-speak" aria-hidden="true">🔊</span></span><strong>${item.name}</strong></button>`).join("")}</div>
      <details class="vegetable-photo-credit"><summary>Photo credits and licenses</summary><ul>${discoveryCatalog.map((item) => `<li>${item.name}: ${item.creator ? `${item.creator}, ` : ""}${item.credit} · <a href="${item.source}" target="_blank" rel="noreferrer">Photo source</a></li>`).join("")}</ul></details>
      <div class="discovery-sound-status" aria-live="polite"></div>
    </div>`;

  view.querySelector("[data-back]").addEventListener("click", () => setView("home"));
  view.querySelectorAll("[data-discovery-mode]").forEach((button) => button.addEventListener("click", () => {
    discoveryMode = button.dataset.discoveryMode;
    if (discoveryMode === "find") resetDiscoveryRound();
    discoveryMessage = discoveryMode === "find" ? "Tap the vegetable I'm looking for." : "Tap any photo to hear its name.";
    view.querySelectorAll("[data-discovery-mode]").forEach((mode) => mode.setAttribute("aria-pressed", String(mode === button)));
    updateDiscoveryCallout();
  }));
  view.querySelector("[data-play-again]").addEventListener("click", () => {
    resetDiscoveryRound();
    discoveryMessage = "A fresh round! Find the vegetable name.";
    view.querySelectorAll(".vegetable-photo-card").forEach((card) => card.classList.remove("is-found"));
    updateDiscoveryCallout();
  });
  view.querySelectorAll("[data-vegetable]").forEach((button) => button.addEventListener("click", () => selectDiscoveryItem(button.dataset.vegetable)));
  updateDiscoveryCallout();
}

function updateDiscoveryCallout() {
  const callout = view.querySelector(".discovery-callout");
  if (!callout) return;
  const prompt = callout.querySelector(".discovery-prompt");
  const count = callout.querySelector(".discovery-count");
  const message = callout.querySelector(".discovery-message");
  const again = callout.querySelector("[data-play-again]");
  prompt.textContent = discoveryMode === "find"
    ? discoveryTarget ? `Can you find the ${discoveryTarget.name.toLowerCase()}?` : "You found them all!"
    : "Tap a picture to learn its name";
  count.textContent = discoveryMode === "find" ? `${discoveryFound.length} of ${visibleDiscoveryItems().length} vegetables found` : `${visibleDiscoveryItems().length} vegetables to learn`;
  message.textContent = discoveryMessage;
  again.hidden = discoveryMode !== "find" || Boolean(discoveryTarget);
}

function selectDiscoveryItem(id) {
  const item = discoveryCatalog.find((entry) => entry.id === id);
  if (!item) return;
  if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
    window.speechSynthesis.cancel();
    const voice = new SpeechSynthesisUtterance(item.name);
    voice.rate = 0.82;
    voice.pitch = 1.12;
    window.speechSynthesis.speak(voice);
  }
  const soundStatus = view.querySelector(".discovery-sound-status");
  if (soundStatus) soundStatus.textContent = `This is a ${item.name}.`;
  if (discoveryMode !== "find" || !discoveryTarget) {
    discoveryMessage = `This is a ${item.name}.`;
    updateDiscoveryCallout();
    return;
  }
  if (item.id !== discoveryTarget.id) {
    discoveryMessage = `That's a ${item.name}. Can you find the ${discoveryTarget.name.toLowerCase()}?`;
    updateDiscoveryCallout();
    return;
  }
  discoveryFound.push(item.id);
  view.querySelector(`[data-vegetable="${item.id}"]`)?.classList.add("is-found");
  if (discoveryFound.length === visibleDiscoveryItems().length) {
    discoveryTarget = null;
    discoveryMessage = `Wonderful listening! You found all ${discoveryFound.length} vegetables.`;
    progress.rounds += 1;
    earnStar("Vegetable star!", "You found and named every vegetable picture.");
  } else {
    const remaining = visibleDiscoveryItems().filter((entry) => !discoveryFound.includes(entry.id));
    discoveryTarget = remaining[Math.floor(Math.random() * remaining.length)];
    discoveryMessage = `You found the ${item.name}! Great looking. Now find the ${discoveryTarget.name.toLowerCase()}.`;
  }
  updateDiscoveryCallout();
}

async function playSound(id) {
  window.clearTimeout(soundTimer);
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    announceReward("Sound not available", "This browser does not support the sound garden yet.");
    return;
  }
  if (!audioContext) audioContext = new AudioContextClass();
  if (audioContext.state === "suspended") await audioContext.resume();
  const now = audioContext.currentTime;
  const tone = (frequency, start, duration, wave = "sine", volume = .06) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(frequency, now + start);
    gain.gain.setValueAtTime(.0001, now + start);
    gain.gain.exponentialRampToValueAtTime(volume, now + start + .02);
    gain.gain.exponentialRampToValueAtTime(.0001, now + start + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(now + start);
    oscillator.stop(now + start + duration + .03);
  };
  const noise = (start, duration, filterType, frequency, volume) => {
    const buffer = audioContext.createBuffer(1, Math.ceil(audioContext.sampleRate * duration), audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;
    const source = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    source.buffer = buffer;
    filter.type = filterType;
    filter.frequency.value = frequency;
    gain.gain.value = volume;
    source.connect(filter).connect(gain).connect(audioContext.destination);
    source.start(now + start);
  };

  if (id === "birds") [0, .25, .53, 1.03, 1.27].forEach((start, index) => tone(1500 + (index % 2) * 420, start, .12, "sine", .035));
  if (id === "rain") { noise(0, 2.2, "highpass", 800, .08); noise(.4, 1.7, "lowpass", 500, .035); }
  if (id === "frog") [0, .48, .96].forEach((start) => { tone(230, start, .24, "triangle", .09); tone(310, start + .08, .19, "triangle", .06); });
  if (id === "wind") { noise(0, 2.4, "lowpass", 420, .08); tone(330, .35, .8, "sine", .012); }
  if (id === "ocean") { noise(0, 2.5, "lowpass", 300, .12); tone(190, .15, 1.7, "sine", .02); }
  if (id === "crickets") [0, .4, .82, 1.2, 1.62].forEach((start) => { tone(3200, start, .16, "sine", .025); tone(2950, start + .19, .12, "sine", .018); });

  if (!progress.sounds.includes(id)) {
    progress.sounds.push(id);
    saveProgress();
  }
  if (progress.sounds.length === soundChoices.length && !progress.soundStar) {
    progress.soundStar = true;
    earnStar("Sound explorer star!", "You listened to every sound in the garden. What sharp ears!");
  }
  renderSounds();
}

document.querySelector(".brand").addEventListener("click", (event) => {
  event.preventDefault();
  setView("home");
});
navButtons.forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
renderHome();
saveProgress();