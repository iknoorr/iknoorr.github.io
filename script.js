// ---------- 3 a.m. mode (dark theme toggle) ----------
const root = document.documentElement;
const toggle = document.getElementById("mode-toggle");

function setTheme(theme) {
  if (theme === "night") {
    root.setAttribute("data-theme", "night");
    toggle.textContent = "Day mode";
    toggle.setAttribute("aria-pressed", "true");
  } else {
    root.removeAttribute("data-theme");
    toggle.textContent = "3 a.m. mode";
    toggle.setAttribute("aria-pressed", "false");
  }
}

try {
  setTheme(localStorage.getItem("theme") === "night" ? "night" : "day");
} catch (e) {
  setTheme("day");
}

toggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "night" ? "day" : "night";
  setTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable, ignore */ }
});

// ---------- Live clocks: Mumbai and New York ----------
function formatTime(timeZone) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function updateClocks() {
  document.getElementById("clock-mumbai").textContent = formatTime("Asia/Kolkata");
  document.getElementById("clock-ny").textContent = formatTime("America/New_York");
}
updateClocks();
setInterval(updateClocks, 30000);

// ---------- Topics I could talk about for hours ----------
const chips = document.querySelectorAll(".chip");
const panel = document.getElementById("topic-panel");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.setAttribute("aria-pressed", "false"));
    chip.setAttribute("aria-pressed", "true");
    panel.textContent = chip.dataset.text;
  });
});

// ---------- A question for 3 a.m. ----------
const questions = [
  "What's a decision you keep circling but haven't made?",
  "What would you do this year if nobody was watching?",
  "Which version of yourself are you outgrowing?",
  "What was the last thing that made you lose track of time?",
  "Who do you call first when things go wrong, and why them?",
  "What's a small thing you secretly care way too much about?",
  "If your career had a plot twist, what would it be?",
  "What's the best thing you ever cooked without a recipe?",
  "What would you tell yourself two years ago?",
  "If you had to leave tomorrow, where would you go?",
  "What have you been pretending not to know?",
  "What's your best café find, and what do you order there?",
];

const questionEl = document.getElementById("question");
const questionBtn = document.getElementById("question-btn");
let lastIndex = -1;

questionBtn.addEventListener("click", () => {
  let i;
  do { i = Math.floor(Math.random() * questions.length); } while (i === lastIndex);
  lastIndex = i;
  questionEl.textContent = questions[i];
  questionBtn.textContent = "Another one";
});

// ---------- Hide the photos section if no photos were added ----------
window.addEventListener("load", () => {
  const section = document.getElementById("photos");
  if (section && section.querySelectorAll("figure").length === 0) {
    section.hidden = true;
    const link = document.getElementById("nav-photos");
    if (link) link.hidden = true;
  }
});
