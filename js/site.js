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

// Average adult reading speed, used to turn a word count into a
// "X min read" estimate. 225 wpm is the commonly used figure for
// this kind of on-page estimate.
const WORDS_PER_MINUTE = 225;

// Articles carry their full body text in `content` (an array of
// paragraph strings), so their read time is worked out automatically
// from real word counts -- no extra field to maintain.
function articleReadTime(article) {
  const words = (article.content || []).join(" ").trim().split(/\s+/).filter(Boolean).length;
  if (!words) return "";
  return `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} min read`;
}

// Tactical Lab pieces live as hand-built HTML pages rather than a
// content array, so their read time comes from the optional
// `readTime` field on the entry (see the field guide at the top of
// tactical-lab-data.js for how to set it).
function labReadTime(entry) {
  return entry.readTime ? `${entry.readTime} min read` : "";
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
  const readTime = articleReadTime(article);
  return `
    <a class="card" href="articles/${article.id}.html">
      ${saveToggleHTML(saveKeyForArticle(article))}
      ${thumb}
      ${ghostNum}
      <div class="meta-row">
        <span class="type-pill">${article.type}</span>
        <span>${article.competition}</span>
        <span>&middot;</span>
        <span>${formatDate(article.date)}</span>
        ${readTime ? `<span>&middot;</span><span class="read-time">${readTime}</span>` : ""}
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
  // A "." inside a number (like "£65.4m") doesn't end a sentence --
  // only count it as a full stop if the next character isn't a digit.
  const match = text.match(/^(?:[^.!?]|\.(?=\d))*[.!?]/);
  return match ? match[0].trim() : text;
}

// Fills el with `text`, then -- if it overflows el's own fixed CSS height --
// trims it word by word (checking against el.scrollHeight each time) until
// it fits, adding a "..." at the end. Used instead of -webkit-line-clamp
// for the homepage quote panel, because line-clamp doesn't reliably
// recompute when JS swaps the text content of an already-laid-out box: it
// can leave a stale line count behind and show a jagged partial line
// instead of a clean cut. Measuring real pixel overflow and trimming words
// ourselves always lands on a clean boundary, whatever the text or font.
function fitTextToHeight(el, text) {
  el.textContent = text;
  if (el.scrollHeight <= el.clientHeight + 1) return;
  const words = text.split(/\s+/);
  let lo = 0;
  let hi = words.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi + 1) / 2);
    el.textContent = words.slice(0, mid).join(" ") + "…";
    if (el.scrollHeight <= el.clientHeight + 1) {
      lo = mid;
    } else {
      hi = mid - 1;
    }
  }
  el.textContent = words.slice(0, lo).join(" ") + "…";
}

// Powers the "By the numbers" panel on the Articles page only. Deliberately
// reads from `articles` (articles-data.js) alone -- Tactical Lab pieces
// live in a separate `tacticalLabEntries` array (tactical-lab-data.js) and
// should never be counted in these totals.
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

  const pool = shuffleArray(sortedArticles().filter(a => a.excerpt)).slice(0, 7);
  if (pool.length === 0) return;

  let current = 0;

  function show(index) {
    textEl.style.opacity = "0";
    attrEl.style.opacity = "0";
    setTimeout(() => {
      const article = pool[index];
      fitTextToHeight(textEl, firstSentence(article.excerpt));
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

// 1 lead card (left) + 6 list rows (right) -- six rows keeps the
// right-hand column's total height roughly matching the taller lead
// card on the left, so the section doesn't end with a big gap of
// empty space under the shorter side.
const MAGAZINE_ROW_COUNT = 6;

function renderMagazine(leadId, listId) {
  const leadEl = document.getElementById(leadId);
  const listEl = document.getElementById(listId);
  if (!leadEl || !listEl) return;

  const picked = shuffleArray(articles).slice(0, MAGAZINE_ROW_COUNT + 1);
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

/* ============================================================
   NEWSLETTER SIGNUP
   ============================================================
   Uses Buttondown (buttondown.com) -- a free tool that both hosts
   your subscriber list AND lets you write and send the actual
   emails, so it's more than just a signup box. The form below
   posts straight to Buttondown; nothing on this site stores or
   sees the email addresses people type in.

   Set siteConfig.newsletter.buttondownUsername in contact-info.js
   before telling anyone about this -- see the instructions there.
   Until that's set, the form is replaced with a quiet placeholder
   note instead of a broken signup box.
   ============================================================ */

function newsletterFormHTML(idPrefix) {
  const username = siteConfig.newsletter && siteConfig.newsletter.buttondownUsername;
  if (!username || username === "PLACEHOLDER-USERNAME") {
    return `<p class="newsletter-note">Newsletter signups open soon.</p>`;
  }
  return `
    <form action="https://buttondown.com/api/emails/embed-subscribe/${username}"
          method="post" target="popupwindow" class="newsletter-form"
          onsubmit="window.open('https://buttondown.com/confirm-subscription?tag=${username}', 'popupwindow')">
      <input type="email" name="email" id="${idPrefix}-email" aria-label="Email address" placeholder="you@email.com" required>
      <input type="hidden" value="1" name="embed">
      <button type="submit" class="newsletter-submit">Subscribe</button>
    </form>
  `;
}

// Big promo box -- used on the homepage.
function renderNewsletterSignup(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <span class="eyebrow">Stay in the loop</span>
    <h2>Get every new piece by email</h2>
    <p class="contact-note" style="margin-bottom:18px;">No algorithm, no noise -- just an email whenever I publish a new article or Tactical Lab piece.</p>
    ${newsletterFormHTML("newsletter")}
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

// Renders field-notes.html's full glossary list, A-Z, from
// js/field-notes-data.js. Each entry gets id="<slug>" so
// initJargonLinks() (below) can deep-link straight to it.
function renderFieldNotes(containerId) {
  const el = document.getElementById(containerId);
  if (!el || typeof fieldNotes === "undefined") return;

  el.className = "field-notes-grid";
  const sorted = [...fieldNotes].sort((a, b) => a.term.localeCompare(b.term));
  el.innerHTML = sorted.map(entry => `
    <div class="field-note-card" id="${entry.id}">
      <h2 class="field-note-term">${entry.term}</h2>
      <p class="field-note-definition">${entry.definition}</p>
    </div>
  `).join("");
}

/* ============================================================
   DETAIL-PAGE HELPERS
   ============================================================
   Everything below powers a handful of features that appear on
   every article and Tactical Lab detail page: the reading progress
   bar, the breadcrumb trail, the "this piece is X old" banner, the
   search-engine structured data, the Download PDF button, and the
   "actually related" cards at the bottom of the page.

   All of it is automatic -- these functions read data that's
   already on the page (or already in articles-data.js /
   tactical-lab-data.js) and build/insert their own HTML. There's
   nothing to hand-edit per page; new articles and Tactical Lab
   pieces get all of this for free as soon as they're added to
   their data file.
   ============================================================ */

// Works out which article or Tactical Lab entry the current page
// is, by matching the URL against the id (articles) or slug
// (Tactical Lab) used in the data files. Returns null on any page
// that isn't a detail page (or if the matching data file wasn't
// loaded on this page).
function getCurrentContentMeta() {
  const path = window.location.pathname;

  const articleMatch = path.match(/\/articles\/(\d+)\.html$/);
  if (articleMatch && typeof articles !== "undefined") {
    const id = parseInt(articleMatch[1], 10);
    const item = articles.find(a => a.id === id);
    if (item) return { kind: "article", item };
  }

  const labMatch = path.match(/\/tactical-lab\/([^/]+)\.html$/);
  if (labMatch && typeof tacticalLabEntries !== "undefined") {
    const slug = labMatch[1];
    const item = tacticalLabEntries.find(e => e.id === slug);
    if (item) return { kind: "lab", item };
  }

  return null;
}

function initReadingProgress() {
  const detailEl = document.querySelector(".detail.open");
  if (!detailEl) return;

  const bar = document.createElement("div");
  bar.className = "reading-progress-bar";
  const fill = document.createElement("div");
  fill.className = "reading-progress-fill";
  bar.appendChild(fill);
  document.body.prepend(bar);

  function update() {
    const total = detailEl.offsetHeight - window.innerHeight;
    const scrolled = -detailEl.getBoundingClientRect().top;
    const pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
    fill.style.width = pct + "%";
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

function initBreadcrumb() {
  const detailEl = document.querySelector(".detail.open");
  const backLink = document.querySelector(".close-detail");
  const titleEl = detailEl ? detailEl.querySelector("h3") : null;
  if (!detailEl || !backLink || !titleEl) return;

  const inLab = /\/tactical-lab\//.test(window.location.pathname);
  const hubHref = inLab ? "../tactical-lab.html" : "../articles.html";
  const hubLabel = inLab ? "Tactical Lab" : "Articles";

  const nav = document.createElement("nav");
  nav.className = "breadcrumb-nav";
  nav.setAttribute("aria-label", "Breadcrumb");
  nav.innerHTML = `
    <a href="../index.html">Home</a>
    <span class="breadcrumb-sep">/</span>
    <a href="${hubHref}">${hubLabel}</a>
    <span class="breadcrumb-sep">/</span>
    <span class="breadcrumb-current">${titleEl.textContent}</span>
  `;
  backLink.insertAdjacentElement("afterend", nav);
}

function initStalenessBanner() {
  const meta = getCurrentContentMeta();
  if (!meta || !meta.item.date) return;

  const detailEl = document.querySelector(".detail.open");
  const titleEl = detailEl ? detailEl.querySelector("h3") : null;
  if (!titleEl) return;

  const published = new Date(meta.item.date + "T00:00:00");
  const days = Math.floor((Date.now() - published.getTime()) / 86400000);
  if (days < 7) return;

  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  let label;
  if (weeks < 4) {
    label = weeks === 1 ? "over a week old" : `over ${weeks} weeks old`;
  } else if (months < 2) {
    label = "over a month old";
  } else {
    label = `over ${months} months old`;
  }

  const banner = document.createElement("div");
  banner.className = "staleness-banner";
  banner.innerHTML = `<span class="staleness-icon" aria-hidden="true">&#9201;</span><span>This piece is ${label} -- some details may have moved on since publication.</span>`;
  titleEl.insertAdjacentElement("afterend", banner);
}

function formatCountdown(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const parts = [];
  if (days) parts.push(`${days}d`);
  if (days || hours) parts.push(`${hours}h`);
  parts.push(`${String(minutes).padStart(2, "0")}m`);
  parts.push(`${String(seconds).padStart(2, "0")}s`);
  return parts.join(" ");
}

// Only does anything on Match Preview pieces that have a "kickoff"
// field set in articles-data.js (see the field guide at the top of
// that file). Ticks live every second, and switches itself over to
// a static "has passed" message on its own once kick-off arrives --
// nothing to come back and update by hand once a match has been
// played.
function initKickoffCountdown() {
  const meta = getCurrentContentMeta();
  if (!meta || meta.kind !== "article") return;
  const item = meta.item;
  if (item.type !== "Match Preview" || !item.kickoff) return;

  const kickoffDate = new Date(item.kickoff);
  if (isNaN(kickoffDate.getTime())) return;

  const detailEl = document.querySelector(".detail.open");
  const titleEl = detailEl ? detailEl.querySelector("h3") : null;
  if (!titleEl) return;

  const box = document.createElement("div");
  box.className = "kickoff-countdown";
  titleEl.insertAdjacentElement("afterend", box);

  let timer;
  function update() {
    const diff = kickoffDate.getTime() - Date.now();
    if (diff <= 0) {
      box.innerHTML = `<span class="kickoff-icon" aria-hidden="true">&#9917;</span><span>Kick-off has passed -- this preview is now historical.</span>`;
      if (timer) clearInterval(timer);
      return;
    }
    box.innerHTML = `<span class="kickoff-icon" aria-hidden="true">&#9917;</span><span>Kicks off in <strong>${formatCountdown(diff)}</strong></span>`;
  }

  update();
  timer = setInterval(update, 1000);
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Scans an article/Tactical Lab piece's body paragraphs for the
// first mention of each term in js/field-notes-data.js and turns
// just that first mention into a link to its Field Notes entry.
// Only the FIRST occurrence of each term gets linked (not every
// mention), and it never touches text that's already inside a link
// (like a citation), so it can't break an existing citation-link.
function initJargonLinks() {
  if (typeof fieldNotes === "undefined") return;
  const container = document.querySelector(".detail.open .body-text");
  if (!container) return;

  // Longest term first, so e.g. "Front Three" can't get half-matched
  // by a shorter term that happens to share a word with it.
  const terms = [...fieldNotes].sort((a, b) => b.term.length - a.term.length);
  const linked = new Set();

  container.querySelectorAll("p").forEach(p => {
    if (linked.size === terms.length) return;

    terms.forEach(entry => {
      if (linked.has(entry.id)) return;

      const regex = new RegExp(`\\b(${escapeRegExp(entry.term)})\\b`, "i");
      const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (node.parentElement && node.parentElement.closest("a")) continue;
        const match = node.textContent.match(regex);
        if (!match) continue;

        const idx = match.index;
        const matchedText = match[0];
        const before = node.textContent.slice(0, idx);
        const after = node.textContent.slice(idx + matchedText.length);

        const link = document.createElement("a");
        link.href = `../field-notes.html#${entry.id}`;
        link.className = "jargon-term";
        link.title = `Field Notes: ${entry.term}`;
        link.textContent = matchedText;

        const parent = node.parentNode;
        parent.insertBefore(document.createTextNode(before), node);
        parent.insertBefore(link, node);
        parent.insertBefore(document.createTextNode(after), node);
        parent.removeChild(node);

        linked.add(entry.id);
        break;
      }
    });
  });
}

function injectArticleSchema() {
  if (!document.querySelector(".detail.open")) return;

  const getMeta = (selector) => {
    const el = document.querySelector(selector);
    return el ? el.getAttribute("content") : "";
  };

  const title = getMeta('meta[property="og:title"]') || document.title;
  const description = getMeta('meta[name="description"]');
  const image = getMeta('meta[property="og:image"]');
  const url = getMeta('meta[property="og:url"]') || window.location.href;
  const authorName = (typeof siteConfig !== "undefined" && siteConfig.name) || "Samuel Davies";
  const meta = getCurrentContentMeta();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Person", name: authorName }
  };
  if (image) schema.image = [image];
  if (meta && meta.item.date) schema.datePublished = meta.item.date;

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function initPdfButton() {
  const tagRow = document.querySelector(".share-row .tag-row");
  if (!tagRow) return;

  const btn = document.createElement("button");
  btn.className = "tag";
  btn.type = "button";
  btn.id = "pdf-download-btn";
  btn.innerHTML = `<span class="tag-icon"><svg viewBox="0 0 24 24"><path d="M12 3v12m0 0l-5-5m5 5l5-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span> Download PDF`;
  btn.addEventListener("click", () => window.print());
  tagRow.appendChild(btn);
}

// Scores every OTHER article and Tactical Lab entry against the
// current one by shared teams/players (a mention in a Tactical Lab
// title counts as a player match, since those entries don't carry
// a separate players list), then falls back to whatever's most
// recent if there simply isn't enough overlap to fill 3 cards --
// so a page never ends up with an empty Related section.
function computeRelated(meta) {
  const current = meta.item;
  const currentTeams = new Set(meta.kind === "article" ? (current.teams || []) : (current.team ? [current.team] : []));
  const currentPlayers = meta.kind === "article" ? (current.players || []) : [];
  const currentTitle = (current.title || "").toLowerCase();

  const nodes = [];
  if (typeof articles !== "undefined") {
    articles.forEach(a => {
      nodes.push({ kind: "article", id: a.id, title: a.title, image: a.image, pill: a.type, date: a.date, teams: a.teams || [], players: a.players || [] });
    });
  }
  if (typeof tacticalLabEntries !== "undefined") {
    tacticalLabEntries.forEach(e => {
      if (e.comingSoon) return;
      nodes.push({ kind: "lab", id: e.id, title: e.title, image: e.image, pill: e.category, date: e.date, teams: e.team ? [e.team] : [], players: [] });
    });
  }

  const candidates = nodes.filter(n => !(n.kind === meta.kind && String(n.id) === String(current.id)));

  candidates.forEach(n => {
    let score = 0;
    n.teams.forEach(t => { if (currentTeams.has(t)) score += 2; });
    currentPlayers.forEach(p => { if (n.title.toLowerCase().includes(p.toLowerCase())) score += 3; });
    n.players.forEach(p => { if (currentTitle.includes(p.toLowerCase())) score += 3; });
    n.score = score;
  });

  candidates.sort((a, b) => (b.score !== a.score) ? b.score - a.score : new Date(b.date) - new Date(a.date));

  return candidates.slice(0, 3);
}

function relatedCardHTML(node, fromKind) {
  const sameKind = node.kind === fromKind;
  const href = sameKind
    ? `${node.id}.html`
    : (node.kind === "article" ? `../articles/${node.id}.html` : `../tactical-lab/${node.id}.html`);
  const thumb = node.image
    ? `<div class="related-thumb"><img src="../images/${node.image.replace(/^images\//, "")}" alt="${node.title}" loading="lazy"></div>`
    : "";
  return `
    <a class="related-card" href="${href}">
      ${thumb}
      <span class="type-pill">${node.pill}</span>
      <span class="related-title">${node.title}</span>
    </a>
  `;
}

function renderSmartRelated() {
  const meta = getCurrentContentMeta();
  if (!meta) return;
  const grid = document.querySelector(".related-section .related-grid");
  if (!grid) return;
  const related = computeRelated(meta);
  if (related.length === 0) return;
  grid.innerHTML = related.map(n => relatedCardHTML(n, meta.kind)).join("");
}

const SITEMAP_PAGES = [
  { key: "index", label: "Home", href: "index.html" },
  { key: "articles", label: "Articles", href: "articles.html" },
  { key: "tactical-lab", label: "Tactical Lab", href: "tactical-lab.html" },
  { key: "about", label: "About", href: "about.html" },
  { key: "work-with-me", label: "Work With Me", href: "work-with-me.html" },
  { key: "contact", label: "Contact", href: "contact.html" }
];

function renderMegaFooter(containerId, currentPage) {
  const el = document.getElementById(containerId);
  if (!el) return;

  // The footer is rendered on both root pages (index.html, articles.html...)
  // and pages one folder deep (articles/1.html, tactical-lab/<id>.html), but
  // this function always builds the same root-relative links (e.g.
  // "index.html"). From inside a subfolder that would wrongly resolve to
  // "articles/index.html". Detecting the depth here and prefixing with
  // "../" when needed means every page that calls renderMegaFooter gets
  // working links automatically, without having to pass anything extra in.
  const inSubfolder = /\/(articles|tactical-lab)\/[^/]+$/.test(window.location.pathname);
  const prefix = inSubfolder ? "../" : "";

  const sitemapLinks = SITEMAP_PAGES
    .filter(p => p.key !== currentPage)
    .map(p => `<a href="${prefix}${p.href}">${p.label}</a>`)
    .join("");

  el.innerHTML = `
    <div class="wrap mega-footer-grid">
      <div class="footer-col footer-brand">
        <a href="${prefix}index.html" class="footer-name-btn">${siteConfig.name}</a>
        <p class="footer-tagline">${siteConfig.heroHeadline}</p>
      </div>
      <div class="footer-col footer-col-subscribe">
        <span class="eyebrow">Subscribe</span>
        <p class="footer-newsletter-note">Get new pieces by email.</p>
        ${newsletterFormHTML("footer-newsletter")}
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
          <a href="${prefix}rss.xml">RSS Feed</a>
        </nav>
      </div>
      <div class="footer-col">
        <span class="eyebrow">Support</span>
        <nav class="footer-links">
          <a href="mailto:${siteConfig.email}">Help</a>
          <a href="${prefix}faq.html">FAQs</a>
        </nav>
      </div>
    </div>
    <div class="wrap mega-footer-bottom">
      <span>${siteConfig.name} &copy; ${new Date().getFullYear()}</span>
      <div class="mega-footer-bottom-right">
        <a href="mailto:${siteConfig.email}">${siteConfig.email}</a>
        ${textSizeToggleHTML()}
        ${focusModeToggleHTML()}
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

/* ============================================================
   TEXT SIZE TOGGLE
   ============================================================
   Cycles the whole page between normal / large / larger sizing,
   for anyone who finds the default text small. Saved per-browser
   (localStorage) so it stays put next time this visitor returns.

   Unlike the dark mode toggle, this doesn't need an "init" call
   added to every page's script block -- it listens for clicks on
   the whole page (event delegation) and applies the saved size
   itself as soon as this file loads, so the button just works
   wherever renderMegaFooter() puts it.

   Implementation note: this stylesheet sets font sizes in px, not
   rem, throughout -- so instead of scaling a root rem value (which
   would do nothing here), this uses the CSS `zoom` property, which
   scales the whole page the same way a phone/trackpad pinch-zoom
   does. Supported in all current major browsers.
   ============================================================ */

const TEXT_SIZE_STEPS = ["", "lg", "xl"];
const TEXT_SIZE_LABELS = { "": "A", lg: "A+", xl: "A++" };

function currentTextSize() {
  return document.documentElement.getAttribute("data-text-size") || "";
}

function applyTextSize(size) {
  if (size) {
    document.documentElement.setAttribute("data-text-size", size);
  } else {
    document.documentElement.removeAttribute("data-text-size");
  }
  const label = TEXT_SIZE_LABELS[size] || "A";
  document.querySelectorAll(".text-size-value").forEach(el => { el.textContent = label; });
}

function storedTextSize() {
  try {
    const v = localStorage.getItem("sd-text-size") || "";
    return TEXT_SIZE_STEPS.includes(v) ? v : "";
  } catch (e) {
    return "";
  }
}

function cycleTextSize() {
  const idx = TEXT_SIZE_STEPS.indexOf(currentTextSize());
  const next = TEXT_SIZE_STEPS[(idx + 1) % TEXT_SIZE_STEPS.length];
  applyTextSize(next);
  try { localStorage.setItem("sd-text-size", next); } catch (e) {}
}

function textSizeToggleHTML() {
  const label = TEXT_SIZE_LABELS[currentTextSize()] || "A";
  return `
    <button class="text-size-toggle-btn" id="text-size-toggle" type="button" aria-label="Change text size (currently ${label})">
      <span class="text-size-toggle-label">Text size</span>
      <span class="text-size-value">${label}</span>
    </button>
  `;
}

// Applied immediately (not wrapped in DOMContentLoaded) so the page
// is already the right size by the time renderMegaFooter() builds
// the button and reads currentTextSize() for its starting label.
applyTextSize(storedTextSize());

document.addEventListener("click", (e) => {
  const btn = e.target.closest("#text-size-toggle");
  if (!btn) return;
  cycleTextSize();
});

/* ============================================================
   FOCUS MODE (footer toggle, sitewide)
   ------------------------------------------------------------
   Hides the top nav bar and, on an article/Tactical Lab page,
   the related-articles, share and reactions/save blocks too -- a
   quieter, distraction-free reading view. Persisted the same way
   as dark mode and text size, and lives right next to those two
   toggles in the footer (see renderMegaFooter). Self-initializing,
   no per-page setup needed.
   ============================================================ */

function isFocusModeOn() {
  try { return localStorage.getItem("sd-focus-mode") === "on"; } catch (e) { return false; }
}

function applyFocusMode(on) {
  if (on) document.documentElement.setAttribute("data-focus", "on");
  else document.documentElement.removeAttribute("data-focus");

  const btn = document.getElementById("focus-mode-toggle");
  if (!btn) return;
  const label = btn.querySelector(".focus-toggle-label");
  if (label) label.textContent = on ? "Exit focus mode" : "Focus mode";
  btn.setAttribute("aria-pressed", String(on));
}

function focusModeToggleHTML() {
  const on = isFocusModeOn();
  return `
    <button class="focus-toggle-btn" id="focus-mode-toggle" type="button" aria-pressed="${on}" aria-label="Toggle focus mode (hides the nav bar for distraction-free reading)">
      <span class="focus-toggle-label">${on ? "Exit focus mode" : "Focus mode"}</span>
    </button>
  `;
}

applyFocusMode(isFocusModeOn());

document.addEventListener("click", (e) => {
  const btn = e.target.closest("#focus-mode-toggle");
  if (!btn) return;
  const next = !isFocusModeOn();
  try { localStorage.setItem("sd-focus-mode", next ? "on" : "off"); } catch (err) {}
  applyFocusMode(next);
});

/* ============================================================
   SAVE FOR LATER + REACTIONS
   ============================================================
   Both features live entirely in the visitor's own browser
   (localStorage) -- there's no backend, so nothing is shared
   between devices or visitors. That also means a reaction count
   like "24 people found this useful" would have to be faked, so
   these buttons only ever show what THIS visitor picked, never a
   public tally.

   Every saveable/reactable thing gets a "content key" of the form
   "article-13" or "lab-maresca-inverted-pivot" -- built from the
   page's own URL by contentKeyFromPath(), or from the article/lab
   entry object when rendering a card. Nothing needs to be typed
   into the article/lab data files for this to work.
   ============================================================ */

function contentKeyFromPath(pathname) {
  const path = pathname || window.location.pathname;
  const m = path.match(/\/(articles|tactical-lab)\/([^/]+)\.html$/);
  if (!m) return null;
  return `${m[1] === "articles" ? "article" : "lab"}-${m[2]}`;
}

function saveKeyForArticle(article) { return `article-${article.id}`; }
function saveKeyForLabEntry(entry) { return `lab-${entry.id}`; }

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback; // storage unavailable -- e.g. private browsing
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) { /* fail silently, same reasoning as above */ }
}

/* ---------- Save for later ---------- */

function getSavedKeys() {
  return readJSON("sd-saved", []);
}

function isSaved(key) {
  return getSavedKeys().includes(key);
}

function toggleSaved(key) {
  const saved = getSavedKeys();
  const i = saved.indexOf(key);
  if (i === -1) {
    saved.unshift(key); // most recently saved shows first on the Saved page
  } else {
    saved.splice(i, 1);
  }
  writeJSON("sd-saved", saved);
  return saved.includes(key);
}

function updateSaveBtnVisual(btn, saved) {
  btn.classList.toggle("is-saved", saved);
  btn.setAttribute("aria-pressed", String(saved));
  const icon = btn.querySelector(".save-icon");
  if (icon) icon.textContent = saved ? "★" : "☆"; // filled / outline star
  else btn.textContent = saved ? "★" : "☆"; // card buttons have no inner span
  const label = btn.querySelector(".save-btn-label");
  if (label) label.textContent = saved ? "Saved" : "Save for later";
  btn.setAttribute("aria-label", saved ? "Remove from saved" : "Save for later");
}

// One delegated click handler for the whole page, set up once when
// site.js first runs. This is what makes the little bookmark star
// on every card work without having to "re-wire" anything after
// Show More, filtering or search redraws the grid -- it's always
// listening on the page itself, not on the (constantly replaced)
// buttons.
function saveToggleHTML(key) {
  const saved = isSaved(key);
  return `<button class="save-toggle-btn${saved ? " is-saved" : ""}" data-save-key="${key}" type="button" aria-label="${saved ? "Remove from saved" : "Save for later"}" aria-pressed="${saved}">${saved ? "★" : "☆"}</button>`;
}

// The "Saved" nav link (present in the static HTML on every page)
// only shows once there's actually something saved -- otherwise a
// visitor who's never used the feature sees an empty, pointless
// page. Runs once when the page loads, and again after every
// save/unsave so the link appears or disappears immediately without
// needing a reload.
function syncSavedNavVisibility() {
  const show = getSavedKeys().length > 0;
  document.querySelectorAll(".nav-saved-link").forEach(el => { el.hidden = !show; });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-save-key]");
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  const nowSaved = toggleSaved(btn.dataset.saveKey);
  updateSaveBtnVisual(btn, nowSaved);
  syncSavedNavVisibility();
});

syncSavedNavVisibility();

/* ---------- Reactions ---------- */

const REACTIONS = [
  { value: "fire", emoji: "🔥", label: "Fire" },
  { value: "wow", emoji: "😮", label: "Wow" },
  { value: "class", emoji: "👏", label: "Class" }
];

function getReaction(key) {
  return readJSON("sd-reactions", {})[key] || null;
}

function setReaction(key, value) {
  const all = readJSON("sd-reactions", {});
  all[key] = all[key] === value ? undefined : value; // clicking the active one again clears it
  if (all[key] === undefined) delete all[key];
  writeJSON("sd-reactions", all);
  return all[key] || null;
}

// Called once per detail page (see initEngageRow below). Reaction
// rows aren't repeated/redrawn like cards are, so plain
// addEventListener per button (rather than delegation) is fine here.
function initReactionRow(key) {
  const row = document.getElementById("reaction-row");
  if (!row) return;
  const sync = (active) => {
    row.querySelectorAll(".reaction-btn").forEach(btn => {
      const on = btn.dataset.value === active;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", String(on));
    });
  };
  sync(getReaction(key));
  row.querySelectorAll(".reaction-btn").forEach(btn => {
    btn.addEventListener("click", () => sync(setReaction(key, btn.dataset.value)));
  });
}

// Call this once, on every article/Tactical Lab detail page, after
// the "engage row" (reactions + Save for later) markup near the
// bottom of the page exists in the DOM. It works out which
// article/entry the page is for from the URL, so no arguments are
// needed and the same call works on every page.
function initEngageRow() {
  const key = contentKeyFromPath();
  if (!key) return;
  initReactionRow(key);
  const saveBtn = document.getElementById("save-btn");
  if (saveBtn) {
    saveBtn.dataset.saveKey = key;
    updateSaveBtnVisual(saveBtn, isSaved(key));
  }
}

/* ---------- Saved page (saved.html) ----------
   Looks up each saved key against `articles` and `tacticalLabEntries`
   and reuses the exact same card templates the Articles and
   Tactical Lab pages use, so a saved card looks and behaves
   identically (including its own bookmark star) wherever it's
   shown. Keys pointing at content that's since been removed from
   the data files are just skipped. */
function renderSavedGrid(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const cards = getSavedKeys().map(key => {
    if (key.startsWith("article-")) {
      const id = Number(key.slice("article-".length));
      const article = (typeof articles !== "undefined" ? articles : []).find(a => a.id === id);
      return article ? articleCardHTML(article, 0) : null;
    }
    if (key.startsWith("lab-")) {
      const labId = key.slice("lab-".length);
      const entry = (typeof tacticalLabEntries !== "undefined" ? tacticalLabEntries : []).find(e => e.id === labId);
      return entry ? labCardHTML(entry) : null;
    }
    return null;
  }).filter(Boolean);

  el.innerHTML = cards.length
    ? cards.join("")
    : `<p class="no-results">Nothing saved yet. Browse <a href="articles.html">Articles</a> or the <a href="tactical-lab.html">Tactical Lab</a> and tap the &#9734; on any card to bookmark it here.</p>`;

  const clearWrap = document.getElementById("clear-saved-wrap");
  if (clearWrap) clearWrap.hidden = cards.length === 0;
}

function setupClearSaved(gridId) {
  const btn = document.getElementById("clear-saved-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    writeJSON("sd-saved", []);
    renderSavedGrid(gridId);
  });
}

/* ---------- Articles page ---------- */

const PREMIER_LEAGUE_CLUBS = [
  "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton & Hove Albion",
  "Chelsea", "Coventry City", "Crystal Palace", "Everton", "Fulham",
  "Hull City", "Ipswich Town", "Leeds United", "Liverpool", "Manchester City",
  "Manchester United", "Newcastle United", "Nottingham Forest", "Sunderland", "Tottenham Hotspur"
];

const COMPETITIONS = ["Premier League", "FA Cup", "Carabao Cup", "Champions League", "Europa League", "Conference League", "Other"];

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

// How many cards a "Show More" grid reveals at a time, and how many
// are visible on first load / immediately after any filter, search
// or reset action changes the result set. Shared by both the
// Articles grid and the Tactical Lab grid so the two pages behave
// identically.
const CARDS_PER_PAGE = 9;
let articleVisibleCount = CARDS_PER_PAGE;

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
  const visible = all.slice(0, articleVisibleCount);
  el.innerHTML = all.length
    ? visible.map((a, i) => articleCardHTML(a, i)).join("")
    : `<p class="no-results">No articles match "${escapeHtml(currentSearch)}". Try a different search.</p>`;

  updateFilterControlsVisibility();
  updateShowMoreButton("article-show-more", all.length, articleVisibleCount);
}

// Shared by both grids: reveals the button while there's more to load,
// hides it once every matching card is already on screen (including
// when a filter narrows the result set below a page's worth of cards).
function updateShowMoreButton(btnId, totalCount, visibleCount) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.hidden = visibleCount >= totalCount;
}

function setupArticleShowMore() {
  const btn = document.getElementById("article-show-more");
  if (!btn) return;
  btn.addEventListener("click", () => {
    articleVisibleCount += CARDS_PER_PAGE;
    renderArticleList();
  });
}

function updateFilterControlsVisibility() {
  const resetBtn = document.getElementById("reset-filters");
  const searchClearBtn = document.getElementById("search-clear");
  const hasActiveFilters = currentFilter !== "All" || currentTeam !== "All" ||
    currentCompetition !== "All" || currentSearch.trim() !== "";
  // Use a class instead of the "hidden" attribute here (unlike the search-
  // clear button below) -- the reset button sits inline in the filter row,
  // so hiding it with display:none would shrink the row's width every time
  // filters go back to "All". The is-inactive class just makes it invisible
  // while still reserving its space, so the row stays a consistent size.
  if (resetBtn) resetBtn.classList.toggle("is-inactive", !hasActiveFilters);
  if (searchClearBtn) searchClearBtn.hidden = currentSearch === "";
}

function setupSearch() {
  const input = document.getElementById("article-search");
  const clearBtn = document.getElementById("search-clear");
  if (input) {
    input.addEventListener("input", () => {
      currentSearch = input.value;
      articleVisibleCount = CARDS_PER_PAGE;
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
      articleVisibleCount = CARDS_PER_PAGE;
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
    articleVisibleCount = CARDS_PER_PAGE;

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
    articleVisibleCount = CARDS_PER_PAGE;
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
    articleVisibleCount = CARDS_PER_PAGE;
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
      articleVisibleCount = CARDS_PER_PAGE;
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

function initFormationDiagram(pitchId, nameId, buzzId, frames, intervalMs, stageListId, orientation, legendListId) {
  const pitchEl = document.getElementById(pitchId);
  const nameEl = document.getElementById(nameId);
  const buzzEl = document.getElementById(buzzId);
  let stageListEl = stageListId ? document.getElementById(stageListId) : null;
  const legendListEl = legendListId ? document.getElementById(legendListId) : null;
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

  // Numbered annotation badges, e.g. frame.annotations = [{ dotIndex: 4,
  // text: "..." }]. Reused across frames rather than recreated each time --
  // a frame with fewer annotations than the last just hides the extras.
  const badgeEls = [];
  function ensureBadges(count) {
    while (badgeEls.length < count) {
      const b = document.createElement("div");
      b.className = "diagram-annotation";
      pitchEl.appendChild(b);
      badgeEls.push(b);
    }
  }

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

    const anns = frame.annotations || [];
    ensureBadges(anns.length);
    badgeEls.forEach((b, i) => {
      if (i < anns.length) {
        const dot = frame.dots[anns[i].dotIndex];
        const pos = toPercent(dot);
        b.style.left = pos.left;
        b.style.top = pos.top;
        b.textContent = i + 1;
        b.style.display = "flex";
      } else {
        b.style.display = "none";
      }
    });
    if (legendListEl) {
      legendListEl.innerHTML = anns
        .map((a, i) => `<div class="annotation-legend-item"><span class="annotation-num">${i + 1}</span>${a.text}</div>`)
        .join("");
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
    // Store the live interval on the element itself so the NEXT call to
    // initFormationDiagram (e.g. clicking a different filter tab) can find
    // and clear it. Without this, old timers never got cancelled -- they
    // kept running in the background and overwriting the shared name/
    // buzzword text with frames from whichever example was last cycling,
    // which is why stale words (like "Bergkamp") could flash up on a
    // different tab.
    pitchEl._diagramTimer = timer;
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

/* ---------- Stat panel (Tactical Lab only) ----------
   Same physical mechanics as renderQuotePanel (arrows, dots,
   swipe) but deliberately has no setInterval -- it only ever
   advances when the reader clicks or swipes. Builds its own
   markup into a single container rather than requiring five
   separate element IDs per page. */

function renderStatPanel(containerId, stats) {
  const el = document.getElementById(containerId);
  if (!el || !stats || stats.length === 0) return;

  el.innerHTML = `
    <span class="eyebrow stat-panel-eyebrow">Key Figures</span>
    <div class="stat-panel-body">
      <button type="button" class="stat-arrow prev" aria-label="Previous figure">&larr;</button>
      <div class="stat-panel-content">
        <div class="stat-panel-value"></div>
        <div class="stat-panel-label"></div>
      </div>
      <button type="button" class="stat-arrow next" aria-label="Next figure">&rarr;</button>
    </div>
    <div class="stat-panel-dots"></div>
  `;

  const valueEl = el.querySelector(".stat-panel-value");
  const labelEl = el.querySelector(".stat-panel-label");
  const dotsEl = el.querySelector(".stat-panel-dots");
  const prevBtn = el.querySelector(".stat-arrow.prev");
  const nextBtn = el.querySelector(".stat-arrow.next");

  dotsEl.innerHTML = stats
    .map((_, i) => `<button type="button" class="stat-dot" data-index="${i}" aria-label="Show figure ${i + 1}"></button>`)
    .join("");

  let current = 0;

  function show(index) {
    current = ((index % stats.length) + stats.length) % stats.length;
    valueEl.style.opacity = "0";
    labelEl.style.opacity = "0";
    setTimeout(() => {
      valueEl.textContent = stats[current].value;
      labelEl.textContent = stats[current].label;
      valueEl.style.opacity = "1";
      labelEl.style.opacity = "1";
      dotsEl.querySelectorAll(".stat-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === current);
      });
    }, 150);
  }

  dotsEl.querySelectorAll(".stat-dot").forEach(dot => {
    dot.addEventListener("click", () => show(parseInt(dot.dataset.index, 10)));
  });
  prevBtn.addEventListener("click", () => show(current - 1));
  nextBtn.addEventListener("click", () => show(current + 1));

  if (stats.length <= 1) {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  }

  let touchStartX = 0;
  el.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  el.addEventListener("touchend", (e) => {
    const delta = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) > 40) {
      if (delta < 0) show(current + 1); else show(current - 1);
    }
  }, { passive: true });

  show(current);
}

/* ---------- Lab entry grid (reuses .article-grid / .card look) ---------- */

function sortedLabEntries() {
  return [...tacticalLabEntries].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
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
  const labRead = labReadTime(entry);
  return `
    <a class="card" href="tactical-lab/${entry.id}.html">
      ${saveToggleHTML(saveKeyForLabEntry(entry))}
      ${labThumbHTML(entry)}
      <div class="meta-row">
        <span class="type-pill">${entry.category}</span>
        ${entry.competition ? `<span>${entry.competition}</span>` : ""}
        ${entry.competition && entry.team ? `<span>&middot;</span>` : ""}
        ${entry.team ? `<span>${entry.team}</span>` : ""}
        ${labRead ? `<span>&middot;</span><span class="read-time">${labRead}</span>` : ""}
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
let labVisibleCount = CARDS_PER_PAGE;

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
  const visible = all.slice(0, labVisibleCount);
  el.innerHTML = all.length
    ? visible.map(labCardHTML).join("")
    : `<p class="no-results">Nothing matches "${escapeHtml(currentLabSearch)}". Try a different search or filter.</p>`;

  updateLabFilterControlsVisibility();
  updateShowMoreButton("lab-show-more", all.length, labVisibleCount);
}

function setupLabShowMore(gridId) {
  const btn = document.getElementById("lab-show-more");
  if (!btn) return;
  btn.addEventListener("click", () => {
    labVisibleCount += CARDS_PER_PAGE;
    renderLabGrid(gridId);
  });
}

function updateLabFilterControlsVisibility() {
  const resetBtn = document.getElementById("lab-reset-filters");
  const searchClearBtn = document.getElementById("lab-search-clear");
  const hasActiveFilters = currentLabFilter !== "All" || currentLabTeam !== "All" ||
    currentLabCompetition !== "All" || currentLabSearch.trim() !== "";
  if (resetBtn) resetBtn.classList.toggle("is-inactive", !hasActiveFilters);
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
    heading: "Archive systems from Premier League clubs and players",
    description: "Managers and players with Premier League pedigree, rebuilt as moving diagrams -- whichever competition the tactical moment itself came from."
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
      labVisibleCount = CARDS_PER_PAGE;
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
      labVisibleCount = CARDS_PER_PAGE;
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
      labVisibleCount = CARDS_PER_PAGE;
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
    labVisibleCount = CARDS_PER_PAGE;
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
    labVisibleCount = CARDS_PER_PAGE;
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
    labVisibleCount = CARDS_PER_PAGE;

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

/* ============================================================
   INSTALLABLE / OFFLINE SUPPORT (PWA)
   ============================================================
   Registers sw.js (the "service worker" -- a small background
   script the browser keeps around) so the site can be "installed"
   from the browser's address bar / share menu like an app, and so
   pages a visitor has already opened still load with no internet
   connection.

   This runs on its own as soon as site.js loads -- no per-page
   script call needed, same as the text size toggle above.
   ============================================================ */

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  // Service workers only work when a page is served over http/https
  // by a real server -- not when a file is opened by double-clicking
  // it (a "file://" address). Checking the protocol here means
  // double-clicking index.html to preview the site locally still
  // works exactly as before, with no console errors.
  if (window.location.protocol !== "http:" && window.location.protocol !== "https:") return;

  // Same "how deep is this page?" check renderMegaFooter() uses, so
  // this finds sw.js correctly whether the page is at the site root
  // (index.html) or one folder down (articles/1.html).
  const inSubfolder = /\/(articles|tactical-lab)\/[^/]+$/.test(window.location.pathname);
  const prefix = inSubfolder ? "../" : "";

  navigator.serviceWorker.register(prefix + "sw.js").catch(() => {
    // Fails quietly (e.g. an older browser) -- the site works fine
    // without it, this is a bonus, not a requirement.
  });
}

registerServiceWorker();

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================
   A small round button that appears in the bottom-right corner
   once the reader has scrolled down a bit, and smooth-scrolls
   back to the top of the page when clicked. Runs on its own as
   soon as site.js loads on every page -- no per-page script call
   needed, same as the text size toggle and service worker
   registration above. */

function initBackToTop() {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = "&uarr;";
  document.body.appendChild(btn);

  let visible = false;
  function update() {
    const shouldShow = window.scrollY > 500;
    if (shouldShow === visible) return;
    visible = shouldShow;
    btn.classList.toggle("is-visible", visible);
  }

  window.addEventListener("scroll", update, { passive: true });
  update();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

initBackToTop();

/* ============================================================
   CONTINUE WHERE YOU LEFT OFF
   ============================================================
   Remembers how far through an article or Tactical Lab piece a
   reader has scrolled, using the same kind of localStorage the
   Saved tab already relies on -- just one slot, for the single
   most recent piece still in progress. Two halves:

   1. On the article/lab page itself, scroll position is tracked
      quietly in the background. If the reader comes back to that
      exact page later with progress still saved, a small bar
      near the top offers to jump them back to where they left
      off (initResumeBar()).
   2. On the homepage, if a piece anywhere on the site is still in
      progress, a "Continue reading" card under the hero points
      back to it (initContinueReadingCard()).

   Both run automatically on every relevant page, no per-page
   script call needed. */

const CONTINUE_READING_KEY = "continueReadingProgress";

function readContinueReading() {
  try {
    const raw = localStorage.getItem(CONTINUE_READING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function writeContinueReading(entry) {
  try {
    localStorage.setItem(CONTINUE_READING_KEY, JSON.stringify(entry));
  } catch (e) {
    // Storage full or unavailable (e.g. private browsing) -- the
    // feature just quietly doesn't remember anything rather than
    // throwing an error the reader would never see anyway.
  }
}

function clearContinueReading() {
  try { localStorage.removeItem(CONTINUE_READING_KEY); } catch (e) {}
}

function continueReadingHref(entry) {
  const folder = entry.kind === "article" ? "articles" : "tactical-lab";
  return `${folder}/${entry.id}.html`;
}

function initContinueReadingTracker() {
  const detailEl = document.querySelector(".detail.open");
  if (!detailEl) return;
  const meta = getCurrentContentMeta();
  if (!meta) return;

  function currentPercent() {
    const total = detailEl.offsetHeight - window.innerHeight;
    const scrolled = -detailEl.getBoundingClientRect().top;
    return total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
  }

  let ticking = false;
  function save() {
    ticking = false;
    const percent = currentPercent();

    if (percent >= 92) {
      // Close enough to finished -- clear the saved slot so the
      // homepage stops nudging about a piece they've essentially
      // completed, but only if this page is the one it was tracking.
      const existing = readContinueReading();
      if (existing && existing.path === window.location.pathname) clearContinueReading();
      return;
    }
    if (percent < 8) return; // too early to be worth remembering yet

    writeContinueReading({
      kind: meta.kind,
      id: meta.item.id,
      title: meta.item.title,
      image: meta.item.image,
      percent,
      path: window.location.pathname,
      ts: Date.now()
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(save);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pagehide", save);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") save();
  });
}

function initResumeBar() {
  const detailEl = document.querySelector(".detail.open");
  if (!detailEl) return;

  const entry = readContinueReading();
  if (!entry || entry.path !== window.location.pathname) return;
  if (entry.percent < 8 || entry.percent > 90) return;

  const bar = document.createElement("div");
  bar.className = "resume-bar";
  bar.innerHTML = `
    <span>You were ${Math.round(entry.percent)}% through this piece.</span>
    <button type="button" class="resume-jump-btn">Jump back in &darr;</button>
    <button type="button" class="resume-dismiss-btn" aria-label="Dismiss">&times;</button>
  `;
  detailEl.prepend(bar);

  bar.querySelector(".resume-jump-btn").addEventListener("click", () => {
    const total = detailEl.offsetHeight - window.innerHeight;
    const target = detailEl.getBoundingClientRect().top + window.scrollY + (total * (entry.percent / 100));
    window.scrollTo({ top: target, behavior: "smooth" });
    bar.remove();
  });
  bar.querySelector(".resume-dismiss-btn").addEventListener("click", () => bar.remove());
}

function initContinueReadingCard() {
  const isHome = /\/(index\.html)?$/.test(window.location.pathname);
  if (!isHome) return;

  const entry = readContinueReading();
  if (!entry) return;

  const heroEl = document.querySelector(".hero");
  if (!heroEl) return;

  const card = document.createElement("section");
  card.className = "continue-reading-card";
  const thumb = entry.image
    ? `<div class="continue-reading-thumb"><img src="${entry.image}" alt="" loading="lazy"></div>`
    : "";
  card.innerHTML = `
    <a href="${continueReadingHref(entry)}" class="continue-reading-link">
      ${thumb}
      <div class="continue-reading-body">
        <span class="eyebrow">Continue reading</span>
        <span class="continue-reading-title">${entry.title}</span>
        <div class="continue-reading-track"><div class="continue-reading-fill" style="width:${Math.round(entry.percent)}%"></div></div>
      </div>
    </a>
    <button type="button" class="continue-reading-dismiss" aria-label="Dismiss">&times;</button>
  `;
  heroEl.insertAdjacentElement("afterend", card);

  card.querySelector(".continue-reading-dismiss").addEventListener("click", (e) => {
    e.preventDefault();
    clearContinueReading();
    card.remove();
  });
}

initContinueReadingTracker();
initResumeBar();
initContinueReadingCard();

/* ============================================================
   CLICK-TO-ENLARGE TACTICAL DIAGRAMS
   ============================================================
   Adds a small expand button to the big pitch-diagram panel on
   Tactical Lab pages (.formation-hero.article). Clicking it moves
   that same panel -- not a copy -- into a full-screen dark
   overlay, so the animated dots and cycling frames just keep
   running exactly as they were, only bigger. Closing (the button
   again, clicking the backdrop, or Escape) puts it straight back
   where it came from. Runs automatically on every page; it simply
   finds nothing to do on pages without a diagram. */

function initFormationLightbox() {
  const panels = document.querySelectorAll(".formation-hero.article");
  if (!panels.length) return;

  panels.forEach(panel => {
    const originalParent = panel.parentNode;
    const originalNextSibling = panel.nextSibling;
    let backdrop = null;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "formation-expand-btn";
    btn.setAttribute("aria-label", "Enlarge diagram");
    btn.innerHTML = "&#x26F6;";
    panel.appendChild(btn);

    function close() {
      panel.classList.remove("is-lightboxed");
      originalParent.insertBefore(panel, originalNextSibling);
      if (backdrop) { backdrop.remove(); backdrop = null; }
      document.removeEventListener("keydown", onKeydown);
      btn.setAttribute("aria-label", "Enlarge diagram");
      btn.focus();
    }

    function open() {
      backdrop = document.createElement("div");
      backdrop.className = "formation-lightbox-backdrop";
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) close();
      });
      document.body.appendChild(backdrop);
      backdrop.appendChild(panel);
      panel.classList.add("is-lightboxed");
      document.addEventListener("keydown", onKeydown);
      btn.setAttribute("aria-label", "Close enlarged diagram");
      btn.focus();
    }

    function onKeydown(e) {
      if (e.key === "Escape") close();
    }

    btn.addEventListener("click", () => {
      if (panel.classList.contains("is-lightboxed")) close();
      else open();
    });
  });
}

initFormationLightbox();

/* ============================================================
   FORM GUIDE (Match Report pages only)
   ------------------------------------------------------------
   Shows each of a match's two teams' real recent form -- their
   last 5 results across ALL competitions, not just what's been
   covered on this site. The data comes from a file called
   form-guide-data.json, which a robot ("GitHub Action") refreshes
   automatically a few times a day by pulling real results from a
   live football data service. This file lives in js/site.js's
   fetch below -- see scripts/fetch-form-guide.js and
   .github/workflows/update-form-guide.yml for how it's built.

   Runs automatically on every page; only actually does anything
   on a Match Report page. If either team isn't in that data file
   yet (for example a cup match against a club the free data
   service doesn't track), the whole widget is simply skipped for
   that page rather than showing incomplete info.

   Keep a team's name spelled exactly the same way in every
   scoreline (always "Manchester United", never sometimes "Man
   Utd") -- the fetch-form-guide.js script matches team names
   against a list of known spellings, and unrecognised spellings
   just won't get form data.
   ============================================================ */

function parseScoreline(scoreline) {
  if (!scoreline) return null;
  const m = scoreline.match(/^(.+?)\s+(\d+)\s*[-\u2013]\s*(\d+)\s+(.+)$/);
  if (!m) return null;
  return { teamA: m[1].trim(), scoreA: parseInt(m[2], 10), scoreB: parseInt(m[3], 10), teamB: m[4].trim() };
}

const FORM_RESULT_LABEL = { W: "Win", D: "Draw", L: "Loss" };
let formGuideDataPromise = null;

function loadFormGuideData() {
  if (!formGuideDataPromise) {
    formGuideDataPromise = fetch("/form-guide-data.json")
      .then(res => (res.ok ? res.json() : null))
      .catch(() => null);
  }
  return formGuideDataPromise;
}

function formGuideTeamHTML(teamName, results) {
  if (!results || !results.length) return "";
  const dotsHtml = results.map(result => {
    const title = FORM_RESULT_LABEL[result] || result;
    return `<span class="form-dot form-dot-${result}" title="${title}">${result}</span>`;
  }).join("");
  return `
    <div class="form-guide-team">
      <span class="form-guide-team-name">${escapeHtml(teamName)}</span>
      <span class="form-guide-dots">${dotsHtml}</span>
    </div>`;
}

function initFormGuide() {
  const meta = getCurrentContentMeta();
  if (!meta || meta.kind !== "article" || meta.item.type !== "Match Report") return;

  const parsed = parseScoreline(meta.item.scoreline);
  if (!parsed) return;

  loadFormGuideData().then(data => {
    const teams = (data && data.teams) || {};
    const resultsA = teams[parsed.teamA];
    const resultsB = teams[parsed.teamB];
    if (!resultsA || !resultsB) return;

    const teamsHtml = [
      formGuideTeamHTML(parsed.teamA, resultsA),
      formGuideTeamHTML(parsed.teamB, resultsB)
    ].join("");

    const bodyText = document.querySelector(".detail.open .body-text");
    if (!bodyText) return;

    bodyText.insertAdjacentHTML("beforebegin", `
      <div class="form-guide">
        <span class="eyebrow">Recent Form</span>
        ${teamsHtml}
        <p class="form-guide-note">Each team's last 5 results across all competitions -- updated automatically.</p>
      </div>
    `);
  });
}

initFormGuide();

/* ============================================================
   QUICK SEARCH (Cmd/Ctrl+K, sitewide)
   ------------------------------------------------------------
   Searches whatever article/Tactical Lab data the CURRENT page
   happens to have loaded (some pages only load one data file, or
   neither -- see the <script> tags at the bottom of each page).
   Self-initializing: builds its own header button and modal, no
   per-page setup needed.
   ============================================================ */

function quickSearchIndex() {
  const items = [];
  if (typeof articles !== "undefined") {
    articles.forEach(a => items.push({
      title: a.title,
      excerpt: a.excerpt || "",
      type: a.type,
      href: `articles/${a.id}.html`
    }));
  }
  if (typeof tacticalLabEntries !== "undefined") {
    tacticalLabEntries.forEach(e => {
      if (e.comingSoon) return;
      items.push({
        title: e.title,
        excerpt: e.excerpt || "",
        type: "Tactical Lab",
        href: `tactical-lab/${e.id}.html`
      });
    });
  }
  return items;
}

function quickSearchMatches(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return quickSearchIndex()
    .filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    )
    .slice(0, 8);
}

function initQuickSearch() {
  // No visible button anywhere -- Cmd/Ctrl+K only, on purpose.
  if (document.querySelector(".quick-search-backdrop")) return;

  const inSubfolder = /\/(articles|tactical-lab)\/[^/]+$/.test(window.location.pathname);
  const prefix = inSubfolder ? "../" : "";

  const backdrop = document.createElement("div");
  backdrop.className = "quick-search-backdrop";
  backdrop.innerHTML = `
    <div class="quick-search-modal" role="dialog" aria-modal="true" aria-label="Search">
      <div class="quick-search-input-row">
        <svg viewBox="0 0 24 24" width="16" height="16"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        <input type="text" class="quick-search-input" placeholder="Search articles and Tactical Lab..." aria-label="Search">
        <button type="button" class="quick-search-close">Esc</button>
      </div>
      <div class="quick-search-results"></div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const input = backdrop.querySelector(".quick-search-input");
  const resultsEl = backdrop.querySelector(".quick-search-results");
  let activeIndex = -1;

  function renderResults(matches) {
    activeIndex = matches.length ? 0 : -1;
    if (!input.value.trim()) {
      resultsEl.innerHTML = `<p class="quick-search-empty">Start typing to search every article and Tactical Lab piece.</p>`;
      return;
    }
    if (!matches.length) {
      resultsEl.innerHTML = `<p class="quick-search-empty">No matches.</p>`;
      return;
    }
    resultsEl.innerHTML = matches.map((m, i) => `
      <a class="quick-search-result${i === 0 ? " is-active" : ""}" href="${prefix}${m.href}">
        <span class="type-pill">${escapeHtml(m.type)}</span>
        <span class="quick-search-result-title">${escapeHtml(m.title)}</span>
      </a>
    `).join("");
  }

  function setActive(index) {
    const links = resultsEl.querySelectorAll(".quick-search-result");
    if (!links.length) return;
    activeIndex = (index + links.length) % links.length;
    links.forEach((el, i) => el.classList.toggle("is-active", i === activeIndex));
    links[activeIndex].scrollIntoView({ block: "nearest" });
  }

  function open() {
    backdrop.classList.add("open");
    input.value = "";
    renderResults([]);
    document.addEventListener("keydown", onKeydown);
    setTimeout(() => input.focus(), 10);
  }

  function close() {
    backdrop.classList.remove("open");
    document.removeEventListener("keydown", onKeydown);
  }

  function onKeydown(e) {
    if (e.key === "Escape") { close(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(activeIndex + 1); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive(activeIndex - 1); return; }
    if (e.key === "Enter") {
      const active = resultsEl.querySelector(".quick-search-result.is-active");
      if (active) { e.preventDefault(); window.location.href = active.getAttribute("href"); }
    }
  }

  input.addEventListener("input", () => renderResults(quickSearchMatches(input.value)));
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) close(); });
  backdrop.querySelector(".quick-search-close").addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (backdrop.classList.contains("open")) close(); else open();
    }
  });
}

initQuickSearch();

/* ============================================================
   "WORK WITH ME" NAV LINK (injected everywhere)
   ------------------------------------------------------------
   Added via JS, the same way the footer is, so every current page
   -- and any new article/Tactical Lab page created from now on --
   picks it up automatically without the <nav class="site-nav">
   block needing to be hand-edited in dozens of HTML files.
   ============================================================ */

(function injectWorkWithMeNavLink() {
  const nav = document.querySelector(".site-nav");
  if (!nav || nav.querySelector(".nav-work-link")) return;

  const inSubfolder = /\/(articles|tactical-lab)\/[^/]+$/.test(window.location.pathname);
  const href = `${inSubfolder ? "../" : ""}work-with-me.html`;
  const isActive = /\/work-with-me\.html$/.test(window.location.pathname);

  const link = document.createElement("a");
  link.href = href;
  link.className = "nav-work-link" + (isActive ? " active" : "");
  link.textContent = "Work With Me";

  const contactLink = Array.from(nav.querySelectorAll("a"))
    .find(a => /contact\.html$/.test(a.getAttribute("href") || ""));

  if (contactLink) nav.insertBefore(link, contactLink);
  else nav.appendChild(link);
})();
