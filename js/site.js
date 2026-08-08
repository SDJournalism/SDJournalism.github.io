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
  if (type === "Match Report") return "report";
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
  el.innerHTML = `
    <div class="stat-item"><span class="stat-number">${articleCount}</span><span class="stat-label">Articles Published</span></div>
    <div class="stat-item"><span class="stat-number">${uniquePlayers}</span><span class="stat-label">Players Covered</span></div>
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

function renderFooter() {
  document.querySelectorAll(".js-footer-email").forEach(el => {
    el.textContent = siteConfig.email;
    el.href = `mailto:${siteConfig.email}`;
  });
  document.querySelectorAll(".js-footer-name").forEach(el => {
    el.textContent = siteConfig.name;
  });
  document.querySelectorAll(".js-year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------- Articles page ---------- */

const PREMIER_LEAGUE_CLUBS = [
  "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton & Hove Albion",
  "Chelsea", "Coventry City", "Crystal Palace", "Everton", "Fulham",
  "Hull City", "Ipswich Town", "Leeds United", "Liverpool", "Manchester City",
  "Manchester United", "Newcastle United", "Nottingham Forest", "Sunderland", "Tottenham Hotspur"
];

const COMPETITIONS = ["Premier League", "FA Cup", "EFL Cup", "Champions League", "Other"];

const SEARCH_PLACEHOLDERS = {
  "All": "Search all articles...",
  "Match Report": "Search match reports...",
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
        ? !COMPETITIONS.slice(0, 4).includes(a.competition)
        : a.competition === currentCompetition);
    return matchesFilter && matchesSearch && matchesTeam && matchesCompetition;
  });
  el.innerHTML = all.length
    ? all.map((a, i) => articleCardHTML(a, i)).join("")
    : `<p class="no-results">No articles match "${escapeHtml(currentSearch)}". Try a different search.</p>`;
}

function setupSearch() {
  const input = document.getElementById("article-search");
  if (!input) return;
  input.addEventListener("input", () => {
    currentSearch = input.value;
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
  "All": { eyebrow: "All articles", heading: "Match reports, analysis &amp; opinion" },
  "Match Report": { eyebrow: "Match Reports", heading: "Recaps from every fixture" },
  "Analysis": { eyebrow: "Analysis", heading: "Tactical breakdowns &amp; deep dives" },
  "Opinion": { eyebrow: "Opinion", heading: "Takes, arguments &amp; perspective" }
};

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const eyebrowEl = document.getElementById("articles-eyebrow");
  const headingEl = document.getElementById("articles-heading");
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
      if (searchEl && SEARCH_PLACEHOLDERS[currentFilter]) {
        searchEl.placeholder = SEARCH_PLACEHOLDERS[currentFilter];
      }
    });
  });
}
