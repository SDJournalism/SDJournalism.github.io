/* ============================================================
   SITE ENGINE -- you shouldn't need to edit this file.
   It reads siteConfig (contact-info.js) and articles
   (articles-data.js) and builds the page content.
   ============================================================ */

function sortedArticles() {
  return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function readVerb(type) {
  if (type === "Match Preview") return "preview";
  if (type === "Match Report") return "report";
  if (type === "Scouting Report") return "scouting report";
  if (type === "Opinion") return "opinion";
  return "analysis";
}

function articleCardHTML(article, index) {
  const scoreline = article.scoreline
    ? `<div class="scoreline">${article.scoreline}</div>`
    : "";
  const thumb = article.image
    ? `<div class="card-thumb">
        <img src="${article.image}" alt="${article.title}" loading="lazy">
        ${article.imageLink ? `<span class="photo-credit">${article.imageCredit || "Photo credit"}</span>` : ""}
      </div>`
    : "";
  const ghostNum = article.image
    ? ""
    : `<span class="ghost-num">${String(index + 1).padStart(2, "0")}</span>`;
  return `
    <a class="card" href="articles/${article.id}.html">
      ${thumb}
      ${ghostNum}
      <div class="meta-row">
        <span class="type-pill">${article.type}</span>
        <span>${article.competition}</span>
        <span>&middot;</span>
        <span>${formatDate(article.date)}</span>
        ${article.premium ? `<span class="premium-pill">Premium</span>` : ""}
      </div>
      <h3>${article.title}</h3>
      ${scoreline}
      <p class="excerpt">${article.excerpt}</p>
      <span class="read-link">Read ${readVerb(article.type)} &rarr;</span>
    </a>
  `;
}

function firstSentence(text) {
  const match = text.match(/^[^.!?]*[.!?]/);
  return match ? match[0].trim() : text;
}

function computeStats() {
  const articleCount = articles.length;
  const uniquePlayers = new Set(articles.flatMap(a => a.players || [])).size;
  const uniqueTeams = new Set(articles.flatMap(a => a.teams || [])).size;
  const uniqueCompetitions = new Set(articles.map(a => a.competition).filter(Boolean)).size;
  const totalWords = articles.reduce((sum, a) => sum + a.content.join(" ").split(/\s+/).length, 0);

  const teamCounts = {};
  articles.forEach(a => (a.teams || []).forEach(t => { teamCounts[t] = (teamCounts[t] || 0) + 1; }));
  const topTeamEntry = Object.entries(teamCounts).sort((a, b) => b[1] - a[1])[0];

  const stats = [
    { value: articleCount, label: "Articles Published" },
    { value: uniquePlayers, label: "Players Covered" },
    { value: uniqueTeams, label: "Teams Covered" },
    { value: uniqueCompetitions, label: "Competitions Covered" },
    { value: totalWords.toLocaleString(), label: "Words Published" }
  ];

  if (topTeamEntry) {
    stats.push({ value: topTeamEntry[0], label: "Most Covered Club" });
  }

  return stats;
}

function renderStatsPanel(valueId, labelId) {
  const valueEl = document.getElementById(valueId);
  const labelEl = document.getElementById(labelId);
  if (!valueEl || !labelEl) return;

  const stats = computeStats();
  if (stats.length === 0) return;

  let current = 0;

  function show(index) {
    valueEl.style.opacity = "0";
    labelEl.style.opacity = "0";
    setTimeout(() => {
      const stat = stats[index];
      valueEl.textContent = stat.value;
      labelEl.textContent = stat.label;
      valueEl.style.opacity = "1";
      labelEl.style.opacity = "1";
    }, 200);
  }

  function next() {
    current = (current + 1) % stats.length;
    show(current);
  }

  let timer;
  if (stats.length > 1) {
    timer = setInterval(next, 6000);
  }

  show(current);
}

function renderQuotePanel(textId, attrId, dotsId, panelId) {
  const textEl = document.getElementById(textId);
  const attrEl = document.getElementById(attrId);
  const dotsEl = document.getElementById(dotsId);
  const panelEl = panelId ? document.getElementById(panelId) : null;
  if (!textEl || !attrEl || !dotsEl) return;

  const pool = sortedArticles().filter(a => a.excerpt);
  if (pool.length === 0) return;

  let current = 0;

  function show(index) {
    textEl.style.opacity = "0";
    attrEl.style.opacity = "0";
    setTimeout(() => {
      const article = pool[index];
      textEl.textContent = firstSentence(article.excerpt);
      attrEl.textContent = article.title;
      attrEl.href = `articles/${article.id}.html`;
      textEl.style.opacity = "1";
      attrEl.style.opacity = "1";
      dotsEl.querySelectorAll(".quote-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }, 200);
  }

  function goTo(index) {
    current = ((index % pool.length) + pool.length) % pool.length;
    show(current);
    resetTimer();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  dotsEl.innerHTML = pool.map((_, i) => `<button class="quote-dot" data-index="${i}" aria-label="Show quote ${i + 1}"></button>`).join("");
  dotsEl.querySelectorAll(".quote-dot").forEach(dot => {
    dot.addEventListener("click", () => goTo(parseInt(dot.dataset.index, 10)));
  });

  const prevBtn = document.getElementById("quote-prev");
  const nextBtn = document.getElementById("quote-next");
  if (prevBtn) prevBtn.addEventListener("click", prev);
  if (nextBtn) nextBtn.addEventListener("click", next);

  if (pool.length <= 1) {
    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "none";
  }

  if (panelEl) {
    let touchStartX = 0;
    panelEl.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    panelEl.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const delta = touchEndX - touchStartX;
      if (Math.abs(delta) > 40) {
        if (delta < 0) next(); else prev();
      }
    }, { passive: true });
  }

  let timer;
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }

  show(current);
  resetTimer();
}

function renderTicker(trackId) {
  const el = document.getElementById(trackId);
  if (!el) return;
  const recent = sortedArticles().slice(0, 6);
  if (recent.length === 0) return;

  const itemHTML = a => `<a class="ticker-item" href="articles/${a.id}.html"><span class="ticker-label">${a.type}</span> ${a.title}</a><span class="ticker-sep">&bull;</span>`;
  el.innerHTML = recent.map(itemHTML).join("") + recent.map(itemHTML).join("");
}

function magazineLeadHTML(article) {
  const thumb = article.image
    ? `<div class="card-thumb">
        <img src="${article.image}" alt="${article.title}" loading="lazy">
        ${article.imageLink ? `<span class="photo-credit">${article.imageCredit || "Photo credit"}</span>` : ""}
      </div>`
    : "";
  return `
    <a class="card magazine-lead-card" href="articles/${article.id}.html">
      ${thumb}
      <div class="meta-row">
        <span class="type-pill">${article.type}</span>
        <span>${article.competition}</span>
        <span>&middot;</span>
        <span>${formatDate(article.date)}</span>
        ${article.premium ? `<span class="premium-pill">Premium</span>` : ""}
      </div>
      <h2>${article.title}</h2>
      <p class="excerpt">${article.excerpt}</p>
      <span class="read-link">Read ${readVerb(article.type)} &rarr;</span>
    </a>
  `;
}

function magazineRowHTML(article) {
  const thumb = article.image
    ? `<div class="magazine-row-thumb"><img src="${article.image}" alt="${article.title}" loading="lazy"></div>`
    : "";
  return `
    <a class="magazine-row" href="articles/${article.id}.html">
      ${thumb}
      <div class="magazine-row-body">
        <div class="meta-row small">
          <span class="type-pill">${article.type}</span>
          <span>${formatDate(article.date)}</span>
        </div>
        <h4>${article.title}</h4>
      </div>
    </a>
  `;
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderMagazine(leadId, listId) {
  const leadEl = document.getElementById(leadId);
  const listEl = document.getElementById(listId);
  if (!leadEl || !listEl) return;

  const picked = shuffleArray(articles).slice(0, 4);
  if (picked.length === 0) return;

  const [lead, ...rest] = picked;
  leadEl.innerHTML = magazineLeadHTML(lead);
  listEl.innerHTML = rest.map(magazineRowHTML).join("");
}

function renderLatest(containerId, count) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const latest = sortedArticles().slice(0, count || 3);
  el.innerHTML = latest.map((a, i) => articleCardHTML(a, i)).join("");
}

function renderPatreonStrip(containerId) {
  const el = document.getElementById(containerId);
  if (!el || !siteConfig.patreon) return;
  el.innerHTML = `
    <span class="patreon-strip-text">Support my work on Patreon &mdash; premium articles, early access &amp; more.</span>
    <a class="mailto-btn" href="${siteConfig.patreon}" target="_blank" rel="noopener">Join &rarr;</a>
  `;
}

function renderAboutStats(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const articleCount = articles.length;
  const uniquePlayers = new Set(articles.flatMap(a => a.players || [])).size;
  const uniqueTeams = new Set(articles.flatMap(a => a.teams || [])).size;

  const teamCounts = {};
  articles.forEach(a => (a.teams || []).forEach(t => { teamCounts[t] = (teamCounts[t] || 0) + 1; }));
  const topTeamEntry = Object.entries(teamCounts).sort((a, b) => b[1] - a[1])[0];

  el.innerHTML = `
    <div class="stat-item"><span class="stat-number">${articleCount}</span><span class="stat-label">Articles Published</span></div>
    <div class="stat-item"><span class="stat-number">${uniquePlayers}</span><span class="stat-label">Players Covered</span></div>
    <div class="stat-item"><span class="stat-number">${uniqueTeams}</span><span class="stat-label">Teams Covered</span></div>
    ${topTeamEntry ? `<div class="stat-item"><span class="stat-number">${topTeamEntry[0]}</span><span class="stat-label">Most Covered Club</span></div>` : ""}
  `;
}

function renderAboutTeaser(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const pick = shuffleArray(articles)[0];
  if (!pick) return;
  el.innerHTML = magazineRowHTML(pick);
}

function renderAboutQuote(textId, authorId) {
  const textEl = document.getElementById(textId);
  const authorEl = document.getElementById(authorId);
  if (!textEl || !authorEl || !siteConfig.aboutQuote) return;
  textEl.textContent = siteConfig.aboutQuote.text;
  authorEl.textContent = `-- ${siteConfig.aboutQuote.author}`;
}

function renderPatreonPromo(containerId) {
  const el = document.getElementById(containerId);
  if (!el || !siteConfig.patreonPerks) return;

  el.innerHTML = `
    <span class="eyebrow">Membership</span>
    <h2>Support my work on Patreon</h2>
    <p class="contact-note" style="margin-bottom:18px;">Join for full access to premium coverage, including:</p>
    <ul class="perk-list">
      ${siteConfig.patreonPerks.map(perk => `<li>${perk}</li>`).join("")}
    </ul>
    <a class="mailto-btn" href="${siteConfig.patreon}" target="_blank" rel="noopener">Join on Patreon &rarr;</a>
  `;
}

function renderSupportTags(containerId, sectionId) {
  const el = document.getElementById(containerId);
  const section = document.getElementById(sectionId);
  if (!el || !section || !siteConfig.support) return;

  const labels = { kofi: "Ko-fi", buymeacoffee: "Buy Me a Coffee", paypal: "PayPal" };
  const links = Object.keys(siteConfig.support)
    .filter(key => siteConfig.support[key])
    .map(key => ({ key, label: labels[key] || key, url: siteConfig.support[key] }));

  if (links.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  el.innerHTML = links
    .map(link => `<a class="tag" href="${link.url}" target="_blank" rel="noopener">${iconSpan(link.key)} ${link.label}</a>`)
    .join("");
}

/* ---------- Icons for contact/support tags ---------- */

const ICONS = {
  linkedin: `<svg viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><text x="12" y="16.5" font-family="IBM Plex Mono, monospace" font-size="10" font-weight="600" text-anchor="middle" fill="currentColor">in</text></svg>`,
  twitter: `<svg viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="7" y1="7" x2="17" y2="17" stroke="currentColor" stroke-width="1.8"/><line x1="17" y1="7" x2="7" y2="17" stroke="currentColor" stroke-width="1.8"/></svg>`,
  email: `<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 6.5l9 6.5 9-6.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  phone: `<svg viewBox="0 0 24 24"><path d="M6 3c-1.7 0-3 1.3-3 3 0 8.3 6.7 15 15 15 1.7 0 3-1.3 3-3v-2.4c0-.5-.3-.9-.8-1l-3.6-.9c-.4-.1-.9 0-1.1.4l-1.1 1.6c-2.1-1-3.8-2.7-4.8-4.8l1.6-1.1c.4-.3.5-.7.4-1.1l-.9-3.6c-.1-.5-.5-.8-1-.8H6z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  paypal: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" stroke-width="1.6"/><text x="12" y="16.5" font-family="IBM Plex Mono, monospace" font-size="12" font-weight="600" text-anchor="middle" fill="currentColor">P</text></svg>`,
  kofi: `<svg viewBox="0 0 24 24"><path d="M4 7h13v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V7z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="4" x2="8" y2="6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><line x1="11.5" y1="3" x2="11.5" y2="6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  buymeacoffee: `<svg viewBox="0 0 24 24"><path d="M4 7h13v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V7z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="4" x2="8" y2="6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><line x1="11.5" y1="3" x2="11.5" y2="6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  fpl: `<svg viewBox="0 0 24 24"><path d="M7 3h10v4a5 5 0 0 1-5 5 5 5 0 0 1-5-5V3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 4H4v2a3 3 0 0 0 3 3" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M17 4h3v2a3 3 0 0 1-3 3" fill="none" stroke="currentColor" stroke-width="1.4"/><line x1="12" y1="12" x2="12" y2="17" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="20" x2="16" y2="20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="12" y1="17" x2="12" y2="20" stroke="currentColor" stroke-width="1.5"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8.5 9.5c0 4 2 6 6 6l1-2-2.5-1-1 1c-1-.5-1.5-1-2-2l1-1-1-2.5-2 .5z" fill="currentColor" stroke="none"/></svg>`,
  share: `<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="6" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8.2" y1="10.8" x2="15.8" y2="7.2" stroke="currentColor" stroke-width="1.5"/><line x1="8.2" y1="13.2" x2="15.8" y2="16.8" stroke="currentColor" stroke-width="1.5"/></svg>`
};

function iconSpan(key) {
  return `<span class="tag-icon">${ICONS[key] || ""}</span>`;
}

function renderFplLink(containerId) {
  const el = document.getElementById(containerId);
  if (!el || !siteConfig.fplLeague || siteConfig.fplLeague === "#") return;
  el.insertAdjacentHTML("beforeend", `<a class="tag" href="${siteConfig.fplLeague}" target="_blank" rel="noopener">${iconSpan("fpl")} Join My FPL League</a>`);
}

function renderContactTags(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <a class="tag" href="${siteConfig.linkedin}" target="_blank" rel="noopener">${iconSpan("linkedin")} LinkedIn</a>
    <a class="tag" href="${siteConfig.twitter}" target="_blank" rel="noopener">${iconSpan("twitter")} Twitter / X</a>
    <a class="tag" href="mailto:${siteConfig.email}">${iconSpan("email")} Email</a>
    <a class="tag" href="tel:${siteConfig.phone.replace(/\s+/g, "")}">${iconSpan("phone")} Call</a>
  `;
}

function renderKicker() {
  document.querySelectorAll(".js-tagline").forEach(el => {
    el.textContent = siteConfig.tagline;
  });
  document.querySelectorAll(".js-site-name").forEach(el => {
    el.textContent = siteConfig.name;
  });
}

const SITEMAP_PAGES = [
  { key: "index", label: "Home", href: "index.html" },
  { key: "articles", label: "Articles", href: "articles.html" },
  { key: "tactical-lab", label: "Tactical Lab", href: "tactical-lab.html" },
  { key: "about", label: "About", href: "about.html" },
  { key: "contact", label: "Contact", href: "contact.html" }
];

function renderMegaFooter(containerId, currentPage) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const sitemapLinks = SITEMAP_PAGES
    .filter(p => p.key !== currentPage)
    .map(p => `<a href="${p.href}">${p.label}</a>`)
    .join("");

  el.innerHTML = `
    <div class="wrap mega-footer-grid">
      <div class="footer-col footer-brand">
        <a href="index.html" class="footer-name-btn">${siteConfig.name}</a>
        <p class="footer-tagline">${siteConfig.heroHeadline}</p>
      </div>
      <div class="footer-col">
        <span class="eyebrow">Site Map</span>
        <nav class="footer-links">${sitemapLinks}</nav>
      </div>
      <div class="footer-col">
        <span class="eyebrow">Community</span>
        <nav class="footer-links">
          <a href="${siteConfig.twitter}" target="_blank" rel="noopener">Twitter</a>
          <a href="${siteConfig.patreon}" target="_blank" rel="noopener">Support Me</a>
          <a href="mailto:${siteConfig.email}">Contact Me</a>
        </nav>
      </div>
    </div>
    <div class="wrap mega-footer-bottom">
      <span>${siteConfig.name} &copy; ${new Date().getFullYear()}</span>
      <div class="mega-footer-bottom-right">
        <a href="mailto:${siteConfig.email}">${siteConfig.email}</a>
        ${THEME_TOGGLE_HTML}
      </div>
    </div>
  `;
}

const THEME_TOGGLE_HTML = `
  <button class="theme-toggle-btn" id="theme-toggle" type="button" aria-label="Toggle dark mode">
    <svg class="theme-icon-sun" viewBox="0 0 24 24" width="13" height="13"><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><line x1="12" y1="1.5" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22.5"/><line x1="1.5" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22.5" y2="12"/><line x1="4.4" y1="4.4" x2="6.1" y2="6.1"/><line x1="17.9" y1="17.9" x2="19.6" y2="19.6"/><line x1="4.4" y1="19.6" x2="6.1" y2="17.9"/><line x1="17.9" y1="6.1" x2="19.6" y2="4.4"/></g></svg>
    <svg class="theme-icon-moon" viewBox="0 0 24 24" width="13" height="13"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
    <span class="theme-toggle-label">Dark mode</span>
  </button>
`;

/* ---------- Articles page ---------- */

const PREMIER_LEAGUE_CLUBS = [
  "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton & Hove Albion",
  "Chelsea", "Coventry City", "Crystal Palace", "Everton", "Fulham",
  "Hull City", "Ipswich Town", "Leeds United", "Liverpool", "Manchester City",
  "Manchester United", "Newcastle United", "Nottingham Forest", "Sunderland", "Tottenham Hotspur"
];

const COMPETITIONS = ["Premier League", "FA Cup", "EFL Cup", "Champions League", "Europa League", "Conference League", "Other"];

const SEARCH_PLACEHOLDERS = {
  "All": "Search all articles...",
  "Match Preview": "Search match previews...",
  "Match Report": "Search match reports...",
  "Scouting Report": "Search scouting reports...",
  "Analysis": "Search analysis...",
  "Opinion": "Search opinion pieces..."
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

let currentFilter = "All";
let currentSearch = "";
let currentTeam = "All";
let currentCompetition = "All";

function renderArticleList() {
  const el = document.getElementById("article-grid");
  if (!el) return;
  const term = currentSearch.trim().toLowerCase();
  const all = sortedArticles().filter(a => {
    const matchesFilter = currentFilter === "All" || a.type === currentFilter;
    const matchesSearch = !term || a.title.toLowerCase().includes(term) || a.excerpt.toLowerCase().includes(term);
    const matchesTeam = currentTeam === "All" || (a.teams || []).includes(currentTeam);
    const matchesCompetition = currentCompetition === "All" ||
      (currentCompetition === "Other"
        ? !COMPETITIONS.slice(0, -1).includes(a.competition)
        : a.competition === currentCompetition);
    return matchesFilter && matchesSearch && matchesTeam && matchesCompetition;
  });
  el.innerHTML = all.length
    ? all.map((a, i) => articleCardHTML(a, i)).join("")
    : `<p class="no-results">No articles match "${escapeHtml(currentSearch)}". Try a different search.</p>`;

  updateFilterControlsVisibility();
}

function updateFilterControlsVisibility() {
  const resetBtn = document.getElementById("reset-filters");
  const searchClearBtn = document.getElementById("search-clear");
  const hasActiveFilters = currentFilter !== "All" || currentTeam !== "All" ||
    currentCompetition !== "All" || currentSearch.trim() !== "";
  if (resetBtn) resetBtn.hidden = !hasActiveFilters;
  if (searchClearBtn) searchClearBtn.hidden = currentSearch === "";
}

function setupSearch() {
  const input = document.getElementById("article-search");
  const clearBtn = document.getElementById("search-clear");
  if (input) {
    input.addEventListener("input", () => {
      currentSearch = input.value;
      renderArticleList();
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      currentSearch = "";
      if (input) {
        input.value = "";
        input.focus();
      }
      renderArticleList();
    });
  }
}

function setupResetFilters() {
  const resetBtn = document.getElementById("reset-filters");
  if (!resetBtn) return;

  resetBtn.addEventListener("click", () => {
    currentFilter = "All";
    currentTeam = "All";
    currentCompetition = "All";
    currentSearch = "";

    document.querySelectorAll(".filter-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.filter === "All");
    });

    const teamEl = document.getElementById("team-filter");
    const competitionEl = document.getElementById("competition-filter");
    const searchEl = document.getElementById("article-search");
    if (teamEl) teamEl.value = "All";
    if (competitionEl) competitionEl.value = "All";
    if (searchEl) searchEl.value = "";

    const eyebrowEl = document.getElementById("articles-eyebrow");
    const headingEl = document.getElementById("articles-heading");
    const descEl = document.getElementById("articles-description");
    const copy = FILTER_HEADINGS["All"];
    if (copy && eyebrowEl && headingEl) {
      eyebrowEl.textContent = copy.eyebrow;
      headingEl.innerHTML = copy.heading;
    }
    if (copy && descEl) descEl.textContent = copy.description;
    if (searchEl) searchEl.placeholder = SEARCH_PLACEHOLDERS["All"];

    renderArticleList();
  });
}

function renderTeamFilter(selectId) {
  const el = document.getElementById(selectId);
  if (!el) return;
  el.innerHTML = `<option value="All">All Teams</option>` +
    PREMIER_LEAGUE_CLUBS.map(t => `<option value="${t}">${t}</option>`).join("");
  el.addEventListener("change", () => {
    currentTeam = el.value;
    renderArticleList();
  });
}

function renderCompetitionFilter(selectId) {
  const el = document.getElementById(selectId);
  if (!el) return;
  el.innerHTML = `<option value="All">All Competitions</option>` +
    COMPETITIONS.map(c => `<option value="${c}">${c}</option>`).join("");
  el.addEventListener("change", () => {
    currentCompetition = el.value;
    renderArticleList();
  });
}

const FILTER_HEADINGS = {
  "All": {
    eyebrow: "All articles",
    heading: "Match previews, reports, analysis, scouting &amp; opinion",
    description: "Every piece published so far, covering the Premier League and Europe's top competitions."
  },
  "Match Preview": {
    eyebrow: "Match Previews",
    heading: "Looking ahead to every fixture",
    description: "Team news, form and tactical previews before a ball is kicked."
  },
  "Match Report": {
    eyebrow: "Match Reports",
    heading: "Recaps from every fixture",
    description: "What actually happened, broken down after full-time."
  },
  "Scouting Report": {
    eyebrow: "Scouting Reports",
    heading: "Identifying the Next Stars",
    description: "Emerging talent, assessed on ability and potential."
  },
  "Analysis": {
    eyebrow: "Analysis",
    heading: "Tactical breakdowns &amp; deep dives",
    description: "Systems, patterns and decisions, examined in detail."
  },
  "Opinion": {
    eyebrow: "Opinion",
    heading: "Takes, arguments &amp; perspective",
    description: "Where I stand on the game's biggest talking points."
  }
};

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const eyebrowEl = document.getElementById("articles-eyebrow");
  const headingEl = document.getElementById("articles-heading");
  const descEl = document.getElementById("articles-description");
  const searchEl = document.getElementById("article-search");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderArticleList();

      const copy = FILTER_HEADINGS[currentFilter];
      if (copy && eyebrowEl && headingEl) {
        eyebrowEl.textContent = copy.eyebrow;
        headingEl.innerHTML = copy.heading;
      }
      if (copy && descEl) descEl.textContent = copy.description;
      if (searchEl && SEARCH_PLACEHOLDERS[currentFilter]) {
        searchEl.placeholder = SEARCH_PLACEHOLDERS[currentFilter];
      }
    });
  });
}

/* ============================================================
   TACTICAL LAB
   ============================================================ */

/* ---------- Formation-morph diagram ----------
   A pitch of 11 dots (index 0 = GK) that smoothly repositions
   itself between formations on a timer. Coordinates are in real
   pitch metres (0-68 wide, 0-105 long, 0 = attacking/opponent's
   goal end) so they line up with the SVG markings below -- the
   JS just converts metres to a left/top percentage and lets the
   CSS transition on .formation-dot do the actual animating.

   Player "identity" (dot index) is kept consistent across every
   formation on purpose: dot 4, for example, starts as a right-back
   in the 4-3-3, tucks into an auxiliary role, then overlaps all
   the way to a wide forward by the 3-2-5. That's what lets the
   diagram visually explain a buzzword like "Invert" or "Overload"
   rather than just relabelling a static shape. */

const PITCH_SVG_MARKUP = `<svg class="pitch-lines" viewBox="0 0 68 105" preserveAspectRatio="none">
  <rect x="1" y="1" width="66" height="103" fill="none" stroke="rgba(245,246,241,0.35)" stroke-width="0.5"/>
  <line x1="1" y1="52.5" x2="67" y2="52.5" stroke="rgba(245,246,241,0.35)" stroke-width="0.5"/>
  <circle cx="34" cy="52.5" r="9.15" fill="none" stroke="rgba(245,246,241,0.35)" stroke-width="0.5"/>
  <circle cx="34" cy="52.5" r="0.4" fill="rgba(245,246,241,0.35)"/>
  <rect x="13.84" y="0" width="40.32" height="16.5" fill="none" stroke="rgba(245,246,241,0.35)" stroke-width="0.5"/>
  <rect x="24.84" y="0" width="18.32" height="5.5" fill="none" stroke="rgba(245,246,241,0.35)" stroke-width="0.5"/>
  <rect x="13.84" y="88.5" width="40.32" height="16.5" fill="none" stroke="rgba(245,246,241,0.35)" stroke-width="0.5"/>
  <rect x="24.84" y="99.5" width="18.32" height="5.5" fill="none" stroke="rgba(245,246,241,0.35)" stroke-width="0.5"/>
  <circle cx="34" cy="11" r="0.4" fill="rgba(245,246,241,0.35)"/>
  <circle cx="34" cy="94" r="0.4" fill="rgba(245,246,241,0.35)"/>
</svg>`;

/* Landscape version of the same pitch, used for the smaller
   in-article diagrams so they make better use of a wide column
   instead of standing tall and narrow. Attacking direction runs
   left-to-right: x=0 (own goal) is left, x=105 is right. */
const PITCH_SVG_MARKUP_HORIZONTAL = `<svg class="pitch-lines" viewBox="0 0 105 68" preserveAspectRatio="none">
  <rect x="1" y="1" width="103" height="66" fill="none" stroke="rgba(245,246,241,0.35)" stroke-width="0.5"/>
  <line x1="52.5" y1="1" x2="52.5" y2="67" stroke="rgba(245,246,241,0.35)" stroke-width="0.5"/>
  <circle cx="52.5" cy="34" r="9.15" fill="none" stroke="rgba(245,246,241,0.35)" stroke-width="0.5"/>
  <circle cx="52.5" cy="34" r="0.4" fill="rgba(245,246,241,0.35)"/>
  <rect x="1" y="13.84" width="16.5" height="40.32" fill="none" stroke="rgba(245,246,241,0.35)" stroke-width="0.5"/>
  <rect x="1" y="24.84" width="5.5" height="18.32" fill="none" stroke="rgba(245,246,241,0.35)" stroke-width="0.5"/>
  <rect x="87.5" y="13.84" width="16.5" height="40.32" fill="none" stroke="rgba(245,246,241,0.35)" stroke-width="0.5"/>
  <rect x="98.5" y="24.84" width="5.5" height="18.32" fill="none" stroke="rgba(245,246,241,0.35)" stroke-width="0.5"/>
  <circle cx="12" cy="34" r="0.4" fill="rgba(245,246,241,0.35)"/>
  <circle cx="93" cy="34" r="0.4" fill="rgba(245,246,241,0.35)"/>
</svg>`;

const FORMATION_FRAMES = [
  {
    name: "4-3-3",
    buzzwords: ["Base Shape"],
    dots: [
      { x: 34, y: 97, gk: true },
      { x: 10, y: 78 }, { x: 26, y: 82 }, { x: 42, y: 82 }, { x: 58, y: 78 },
      { x: 20, y: 55 }, { x: 34, y: 50 }, { x: 48, y: 55 },
      { x: 12, y: 22 }, { x: 34, y: 14 }, { x: 56, y: 22 }
    ]
  },
  {
    name: "3-2-4-1",
    buzzwords: ["Invert", "Overload"],
    dots: [
      { x: 34, y: 97, gk: true },
      { x: 17, y: 80 }, { x: 34, y: 75 }, { x: 51, y: 80 }, { x: 58, y: 32 },
      { x: 24, y: 55 }, { x: 44, y: 55 }, { x: 26, y: 28 },
      { x: 10, y: 32 }, { x: 34, y: 12 }, { x: 42, y: 28 }
    ]
  },
  {
    name: "3-2-5",
    buzzwords: ["Rotate", "Progress"],
    dots: [
      { x: 34, y: 97, gk: true },
      { x: 17, y: 80 }, { x: 34, y: 75 }, { x: 51, y: 80 }, { x: 62, y: 26 },
      { x: 24, y: 55 }, { x: 44, y: 55 }, { x: 22, y: 18 },
      { x: 6, y: 26 }, { x: 34, y: 12 }, { x: 46, y: 18 }
    ]
  }
];

function initFormationDiagram(pitchId, nameId, buzzId, frames, intervalMs, stageListId, orientation) {
  const pitchEl = document.getElementById(pitchId);
  const nameEl = document.getElementById(nameId);
  const buzzEl = document.getElementById(buzzId);
  let stageListEl = stageListId ? document.getElementById(stageListId) : null;
  if (!pitchEl || !frames || frames.length === 0) return;

  // initFormationDiagram can be called more than once on the same elements
  // (e.g. swapping the example shown when a filter tab is clicked) -- stop
  // any previous run's timer and strip its stage-list click listener so
  // they don't stack up and fight over the same dots.
  if (pitchEl._diagramTimer) {
    clearInterval(pitchEl._diagramTimer);
    pitchEl._diagramTimer = null;
  }
  if (stageListEl) {
    const freshStageListEl = stageListEl.cloneNode(false);
    stageListEl.replaceWith(freshStageListEl);
    stageListEl = freshStageListEl;
  }

  const horizontal = orientation === "horizontal";
  pitchEl.classList.toggle("horizontal", horizontal);
  pitchEl.innerHTML = horizontal ? PITCH_SVG_MARKUP_HORIZONTAL : PITCH_SVG_MARKUP;
  const dotEls = frames[0].dots.map(d => {
    const el = document.createElement("div");
    el.className = "formation-dot" + (d.gk ? " is-gk" : "") + (d.opponent ? " is-opponent" : "");
    pitchEl.appendChild(el);
    return el;
  });

  if (stageListEl) {
    stageListEl.innerHTML = frames
      .map((f, i) => `<button type="button" class="stage-item" data-index="${i}">${f.name}</button>`)
      .join("");
  }

  function toPercent(d) {
    if (horizontal) {
      // Own goal (y=105) sits on the left, attacking direction runs left-to-right.
      return { left: (1 - d.y / 105) * 100 + "%", top: (d.x / 68) * 100 + "%" };
    }
    return { left: (d.x / 68) * 100 + "%", top: (d.y / 105) * 100 + "%" };
  }

  function show(index) {
    const frame = frames[index];
    frame.dots.forEach((d, i) => {
      const el = dotEls[i];
      if (!el) return;
      const pos = toPercent(d);
      el.style.left = pos.left;
      el.style.top = pos.top;
    });
    if (nameEl) nameEl.textContent = frame.name;
    if (buzzEl) {
      buzzEl.innerHTML = frame.buzzwords
        .map((w, i) => `<span class="buzzword-chip" style="animation-delay:${i * 0.15}s">${w}</span>`)
        .join("");
    }
    if (stageListEl) {
      stageListEl.querySelectorAll(".stage-item").forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
      });
    }
  }

  let current = 0;
  let timer = null;

  // Same idea as the homepage ticker's slower mobile duration: a change
  // that reads comfortably on a big screen feels rushed in a small
  // phone-width panel, so small screens get more time per frame.
  const isSmallScreen = window.matchMedia && window.matchMedia("(max-width: 600px)").matches;
  const effectiveInterval = (intervalMs || 4200) * (isSmallScreen ? 1.7 : 1);

  function startTimer() {
    if (frames.length <= 1) return;
    clearInterval(timer);
    timer = setInterval(() => {
      current = (current + 1) % frames.length;
      show(current);
    }, effectiveInterval);
  }

  function jumpTo(index) {
    current = ((index % frames.length) + frames.length) % frames.length;
    show(current);
    startTimer();
  }

  if (stageListEl) {
    stageListEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".stage-item");
      if (!btn) return;
      jumpTo(parseInt(btn.dataset.index, 10));
    });
  }

  show(current);
  startTimer();
}

/* ---------- Lab entry grid (reuses .article-grid / .card look) ---------- */

function sortedLabEntries() {
  return [...tacticalLabEntries];
}

function labThumbHTML(entry) {
  if (!entry.image) return "";
  return `<div class="card-thumb">
      <img src="${entry.image}" alt="${entry.title}" loading="lazy">
      ${entry.imageLink ? `<span class="photo-credit">${entry.imageCredit || "Photo credit"}</span>` : ""}
    </div>`;
}

function labCardHTML(entry) {
  if (entry.comingSoon) {
    return `
      <div class="card coming-soon">
        ${labThumbHTML(entry)}
        <div class="meta-row">
          <span class="type-pill">${entry.category}</span>
          <span class="coming-soon-badge">Coming Soon</span>
        </div>
        <h3>${entry.title}</h3>
        <p class="excerpt">${entry.excerpt}</p>
        <span class="read-link">In the works &rarr;</span>
      </div>
    `;
  }
  return `
    <a class="card" href="tactical-lab/${entry.id}.html">
      ${labThumbHTML(entry)}
      <div class="meta-row">
        <span class="type-pill">${entry.category}</span>
        ${entry.team ? `<span>${entry.team}</span>` : ""}
      </div>
      <h3>${entry.title}</h3>
      <p class="excerpt">${entry.excerpt}</p>
      <span class="read-link">Read the breakdown &rarr;</span>
    </a>
  `;
}

let currentLabFilter = "All";
let currentLabSearch = "";
let currentLabTeam = "All";
let currentLabCompetition = "All";

function renderLabGrid(gridId) {
  const el = document.getElementById(gridId);
  if (!el) return;
  const term = currentLabSearch.trim().toLowerCase();
  const all = sortedLabEntries().filter(e => {
    const matchesFilter = currentLabFilter === "All" || e.category === currentLabFilter;
    const matchesSearch = !term || e.title.toLowerCase().includes(term) || e.excerpt.toLowerCase().includes(term);
    const matchesTeam = currentLabTeam === "All" || e.team === currentLabTeam;
    const matchesCompetition = currentLabCompetition === "All" ||
      (currentLabCompetition === "Other"
        ? Boolean(e.competition) && !COMPETITIONS.slice(0, -1).includes(e.competition)
        : e.competition === currentLabCompetition);
    return matchesFilter && matchesSearch && matchesTeam && matchesCompetition;
  });
  el.innerHTML = all.length
    ? all.map(labCardHTML).join("")
    : `<p class="no-results">Nothing matches "${escapeHtml(currentLabSearch)}". Try a different search or filter.</p>`;

  updateLabFilterControlsVisibility();
}

function updateLabFilterControlsVisibility() {
  const resetBtn = document.getElementById("lab-reset-filters");
  const searchClearBtn = document.getElementById("lab-search-clear");
  const hasActiveFilters = currentLabFilter !== "All" || currentLabTeam !== "All" ||
    currentLabCompetition !== "All" || currentLabSearch.trim() !== "";
  if (resetBtn) resetBtn.hidden = !hasActiveFilters;
  if (searchClearBtn) searchClearBtn.hidden = currentLabSearch === "";
}

const LAB_FILTER_HEADINGS = {
  "All": {
    eyebrow: "Visual Tactical Analysis",
    heading: "Tactical Lab",
    description: "Formations, systems and player roles, broken down as moving diagrams instead of walls of text."
  },
  "Manager DNA": {
    eyebrow: "Manager DNA",
    heading: "The systems and principles behind the coaches",
    description: "A head coach's tactical identity and signature patterns, visualised rather than described."
  },
  "Player Blueprints": {
    eyebrow: "Player Blueprints",
    heading: "The movement patterns that define a player",
    description: "The receiving angles, off-the-ball runs and decisions that define an individual's game."
  },
  "Tactical Vault": {
    eyebrow: "Tactical Vault",
    heading: "Classic systems from Premier League history",
    description: "Title-winning and era-defining systems from Premier League history, rebuilt as moving diagrams."
  }
};

const LAB_SEARCH_PLACEHOLDERS = {
  "All": "Search Tactical Lab...",
  "Manager DNA": "Search Manager DNA...",
  "Player Blueprints": "Search Player Blueprints...",
  "Tactical Vault": "Search the Tactical Vault..."
};

function setupLabFilters(gridId) {
  const buttons = document.querySelectorAll(".lab-filter-btn");
  const eyebrowEl = document.getElementById("lab-eyebrow");
  const headingEl = document.getElementById("lab-heading");
  const descEl = document.getElementById("lab-description");
  const searchEl = document.getElementById("lab-search");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentLabFilter = btn.dataset.filter;
      renderLabGrid(gridId);

      const copy = LAB_FILTER_HEADINGS[currentLabFilter];
      if (copy && eyebrowEl && headingEl) {
        eyebrowEl.textContent = copy.eyebrow;
        headingEl.textContent = copy.heading;
      }
      if (copy && descEl) descEl.textContent = copy.description;
      if (searchEl && LAB_SEARCH_PLACEHOLDERS[currentLabFilter]) {
        searchEl.placeholder = LAB_SEARCH_PLACEHOLDERS[currentLabFilter];
      }
    });
  });
}

function setupLabSearch(gridId) {
  const input = document.getElementById("lab-search");
  const clearBtn = document.getElementById("lab-search-clear");
  if (input) {
    input.addEventListener("input", () => {
      currentLabSearch = input.value;
      renderLabGrid(gridId);
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      currentLabSearch = "";
      if (input) {
        input.value = "";
        input.focus();
      }
      renderLabGrid(gridId);
    });
  }
}

function renderLabTeamFilter(selectId, gridId) {
  const el = document.getElementById(selectId);
  if (!el) return;
  el.innerHTML = `<option value="All">All Teams</option>` +
    PREMIER_LEAGUE_CLUBS.map(t => `<option value="${t}">${t}</option>`).join("");
  el.addEventListener("change", () => {
    currentLabTeam = el.value;
    renderLabGrid(gridId);
  });
}

function renderLabCompetitionFilter(selectId, gridId) {
  const el = document.getElementById(selectId);
  if (!el) return;
  el.innerHTML = `<option value="All">All Competitions</option>` +
    COMPETITIONS.map(c => `<option value="${c}">${c}</option>`).join("");
  el.addEventListener("change", () => {
    currentLabCompetition = el.value;
    renderLabGrid(gridId);
  });
}

function setupLabResetFilters(gridId) {
  const resetBtn = document.getElementById("lab-reset-filters");
  if (!resetBtn) return;

  resetBtn.addEventListener("click", () => {
    currentLabFilter = "All";
    currentLabTeam = "All";
    currentLabCompetition = "All";
    currentLabSearch = "";

    document.querySelectorAll(".lab-filter-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.filter === "All");
    });

    const teamEl = document.getElementById("lab-team-filter");
    const competitionEl = document.getElementById("lab-competition-filter");
    const searchEl = document.getElementById("lab-search");
    if (teamEl) teamEl.value = "All";
    if (competitionEl) competitionEl.value = "All";
    if (searchEl) searchEl.value = "";

    const eyebrowEl = document.getElementById("lab-eyebrow");
    const headingEl = document.getElementById("lab-heading");
    const descEl = document.getElementById("lab-description");
    const copy = LAB_FILTER_HEADINGS["All"];
    if (copy && eyebrowEl && headingEl) {
      eyebrowEl.textContent = copy.eyebrow;
      headingEl.textContent = copy.heading;
    }
    if (copy && descEl) descEl.textContent = copy.description;
    if (searchEl) searchEl.placeholder = LAB_SEARCH_PLACEHOLDERS["All"];

    renderLabGrid(gridId);
  });
}
