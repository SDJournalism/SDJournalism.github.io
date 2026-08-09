/* ============================================================
   DARK MODE -- toggle + persistence.
   ============================================================
   The flash-prevention snippet (a tiny inline <script> right
   after <meta charset> on every page) already applies the saved
   theme before the page paints. This file just wires up the
   footer toggle button: call initThemeToggle() once the button
   exists on the page.
   ============================================================ */

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function initThemeToggle(buttonId) {
  const btn = document.getElementById(buttonId || "theme-toggle");
  if (!btn) return;
  const label = btn.querySelector(".theme-toggle-label");

  function updateLabel() {
    if (label) label.textContent = currentTheme() === "dark" ? "Light mode" : "Dark mode";
  }
  updateLabel();

  btn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("sd-theme", next); } catch (e) {}
    updateLabel();
  });
}
