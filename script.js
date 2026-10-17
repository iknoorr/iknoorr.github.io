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

// Restore the visitor's last choice if the browser allows it
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
