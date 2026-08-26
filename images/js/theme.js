/* ============================================================
   DARK MODE -- toggle, system/time-based auto-switching, persistence.
   ============================================================
   The flash-prevention snippet (a tiny inline <script> right
   after <meta charset> on every page) already applies the right
   theme before the page paints, using the same priority as below:
     1. a saved manual choice (the footer toggle), if there is one
     2. the visitor's OS/browser dark-mode setting, if it reports one
     3. otherwise, dark from 9pm to 7am on the visitor's own device
        clock -- for the rare browser that exposes neither

   This file wires up two things -- call both once their targets
   exist on the page:
     initThemeToggle("theme-toggle")  -- the footer button
     initAutoTheme()                  -- keeps the auto (non-
                                          manual) theme correct if a
                                          tab is left open across the
                                          9pm/7am mark, or if the
                                          visitor changes their OS
                                          setting mid-session
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

// Reads the OS/browser's own dark-mode setting, if the browser
// exposes one. Returns "dark", "light", or null (old browsers, or
// a device with no preference set either way) -- null means "fall
// back to timeBasedTheme() instead".
function systemTheme() {
  try {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  } catch (e) {}
  return null;
}

function autoTheme() {
  return systemTheme() || timeBasedTheme();
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
    applyTheme(autoTheme());
  }
  tick();
  setInterval(tick, 60000);
}
