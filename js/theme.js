/* ============================================================
   DARK MODE -- toggle, time-based auto-switching, persistence.
   ============================================================
   The flash-prevention snippet (a tiny inline <script> right
   after <meta charset> on every page) already applies the right
   theme before the page paints, using the same rules as below:
   a saved manual choice wins if there is one, otherwise it's
   dark from 9pm to 7am on the visitor's own device clock.

   This file wires up two things -- call both once their targets
   exist on the page:
     initThemeToggle("theme-toggle")  -- the footer button
     initAutoTheme()                  -- keeps the auto (non-
                                          manual) theme correct
                                          if a tab is left open
                                          across the 9pm/7am mark
   ============================================================ */

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  const btn = document.getElementById("theme-toggle");
  const label = btn && btn.querySelector(".theme-toggle-label");
  if (label) label.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function manualTheme() {
  try {
    const t = localStorage.getItem("sd-theme");
    return t === "dark" || t === "light" ? t : null;
  } catch (e) {
    return null;
  }
}

function timeBasedTheme() {
  const hour = new Date().getHours();
  return (hour >= 21 || hour < 7) ? "dark" : "light";
}

function initThemeToggle(buttonId) {
  const btn = document.getElementById(buttonId || "theme-toggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("sd-theme", next); } catch (e) {}
  });
}

function initAutoTheme() {
  function tick() {
    if (manualTheme()) return; // a manual choice always wins
    applyTheme(timeBasedTheme());
  }
  tick();
  setInterval(tick, 60000);
}
