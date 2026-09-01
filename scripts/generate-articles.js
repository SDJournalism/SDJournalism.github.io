#!/usr/bin/env node
/* ============================================================
   ARTICLE PAGE GENERATOR
   ============================================================
   Regenerates every articles/N.html page from js/articles-data.js
   and js/contact-info.js.

   Run this any time an article is added, edited, or removed:

       node scripts/generate-articles.js

   It rebuilds ALL article pages every time (not just new ones),
   because the "Related Articles" section on each page links to
   others, so everything needs to stay in sync.

   WHY THIS FILE LIVES IN THE REPO:
   Previously this generator only existed inside a single working
   session and had to be reconstructed from a written description
   each time -- which meant template changes (like the header logo
   or dark mode) could easily be forgotten when generating new
   articles in a future session. Now the template lives here, once,
   as a real file. Any future template change should be made in
   THIS script, and it will apply to every article from then on.
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE_URL = "https://sdjournalism.github.io";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* ---------- load articles-data.js / contact-info.js without
   turning them into proper modules (they're written for the
   browser, with plain top-level `const`s) ---------- */
function loadDataFile(relPath, varName) {
  const code = fs.readFileSync(path.join(ROOT, relPath), "utf8");
  // eslint-disable-next-line no-new-func
  const fn = new Function(`${code}\nreturn ${varName};`);
  return fn();
}

const articles = loadDataFile("js/articles-data.js", "articles");
const siteConfig = loadDataFile("js/contact-info.js", "siteConfig");

/* ---------- small helpers ---------- */

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function truncate(str, max) {
  if (str.length <= max) return str;
  return str.slice(0, max - 3) + "...";
}

function readVerb(type) {
  if (type === "Match Preview") return "preview";
  if (type === "Match Report") return "report";
  if (type === "Scouting Report") return "scouting report";
  if (type === "Opinion") return "opinion";
  return "analysis";
}

/* ---------- citation auto-linking ----------
   A content paragraph containing "(Source Name, Year)" gets that
   exact bracketed bit turned into a link. It's matched against
   sources[] by taking the part of a source's label before " -- "
   (or the whole label, if there's no " -- "), stripping
   apostrophes from both sides, and checking whether the label
   starts with the citation name. First matching source wins --
   if several sources share a name (e.g. two "The Athletic" pickups
   via different outlets), the citation links to whichever comes
   first in that article's sources[] list. If nothing matches, the
   citation is left as plain text and a warning is printed so it
   can be fixed by hand (usually a missing source or a typo). */
function normalizeForMatch(str) {
  return str.replace(/['’]/g, "").trim();
}

function sourceLabelPrefix(label) {
  return label.includes(" -- ") ? label.split(" -- ")[0] : label;
}

function linkCitations(text, sources, articleId) {
  return text.replace(/\(([^,()]+),\s*(\d{4})\)/g, (match, name, year) => {
    const target = normalizeForMatch(name);
    const source = (sources || []).find(s =>
      normalizeForMatch(sourceLabelPrefix(s.label)).startsWith(target)
    );
    if (!source) {
      console.warn(`  ! Article ${articleId}: no matching source for citation "${match}" -- left as plain text`);
      return match;
    }
    return `<a href="${source.url}" target="_blank" rel="noopener nofollow" class="citation-link">(${name.trim()}, ${year})</a>`;
  });
}

/* ---------- body paragraphs -> subheadings, pull quotes or <p> ----------
   Any paragraph that's 8 words or fewer AND doesn't end in a
   period auto-renders as a bold subheading instead of body text.

   A paragraph that starts with ">> " instead renders as a big
   styled pull quote (see .body-pullquote in css/style.css) -- write
   the quote text after the ">> ", exactly as it should appear. This
   is meant to be a SECOND copy of a line that already appears in a
   normal paragraph nearby, added purely for visual effect -- not a
   replacement for it. Use this VERY sparingly: one, maybe two per
   article, only for the single best-worded, most important line. */
function isSubheading(line) {
  const words = line.trim().split(/\s+/).filter(Boolean);
  return words.length > 0 && words.length <= 8 && !line.trim().endsWith(".");
}

function isPullQuote(line) {
  return line.trim().startsWith(">>");
}

function renderBody(article) {
  const paragraphs = article.premium ? article.content.slice(0, 1) : article.content;

  const html = paragraphs.map(line => {
    if (isPullQuote(line)) {
      const quote = line.trim().replace(/^>>\s*/, "");
      return `      <blockquote class="body-pullquote">${linkCitations(quote, article.sources, article.id)}</blockquote>`;
    }
    if (isSubheading(line)) {
      return `      <h4 class="body-subheading">${line}</h4>`;
    }
    return `      <p>${linkCitations(line, article.sources, article.id)}</p>`;
  }).join("\n");

  if (!article.premium) return html;

  return `${html}
      <div class="premium-lock">
        <span class="eyebrow">Premium Article</span>
        <p>The rest of this article is available to Patreon supporters. Join to keep reading, plus get early access to future pieces and more.</p>
        <a class="mailto-btn" href="${siteConfig.patreon}" target="_blank" rel="noopener">Join on Patreon &rarr;</a>
      </div>`;
}

/* ---------- related articles ----------
   Scores every other article by shared teams/players (worth the
   most), then shared type or competition (worth less), and takes
   the top 3. Ties break on most recent first. If fewer than 3
   articles score above zero, the remaining slots are filled with
   the next most recent other articles. */
function scoreRelated(article, other) {
  let score = 0;
  const sharedTeams = (article.teams || []).filter(t => (other.teams || []).includes(t));
  const sharedPlayers = (article.players || []).filter(p => (other.players || []).includes(p));
  score += sharedTeams.length * 3;
  score += sharedPlayers.length * 3;
  if (article.type === other.type) score += 1;
  if (article.competition === other.competition) score += 1;
  return score;
}

function relatedArticles(article, all) {
  const others = all.filter(a => a.id !== article.id);
  const scored = others
    .map(a => ({ article: a, score: scoreRelated(article, a) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.article.date) - new Date(a.article.date);
    });
  return scored.slice(0, 3).map(s => s.article);
}

/* ---------- HTML fragment builders ---------- */

const THEME_INIT_SCRIPT = `<script>
(function(){
  try {
    var t = localStorage.getItem("sd-theme");
    var dark;
    if (t === "dark" || t === "light") {
      dark = t === "dark";
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      dark = true;
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      dark = false;
    } else {
      var h = new Date().getHours();
      dark = h >= 21 || h < 7;
    }
    if (dark) document.documentElement.setAttribute("data-theme", "dark");
  } catch (e) {}
})();
</script>`;

function renderHead(article) {
  const description = truncate(article.excerpt, 200);
  const imageUrl = `${SITE_URL}/${article.image}`;
  const pageUrl = `${SITE_URL}/articles/${article.id}.html`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
${THEME_INIT_SCRIPT}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${article.title} -- Samuel Davies</title>
<meta name="description" content="${description}">

<link rel="icon" type="image/svg+xml" href="../images/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="../images/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="../images/favicon-180.png">
<link rel="manifest" href="../manifest.json">
<meta name="theme-color" content="#14224B">

<meta property="og:type" content="article">
<meta property="og:title" content="${article.title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">
<meta property="og:url" content="${pageUrl}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${article.title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${imageUrl}">

<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-F6G9RSG4MN"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag("js", new Date());
  gtag("config", "G-F6G9RSG4MN");
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="../css/style.css">
</head>`;
}

function renderMasthead() {
  return `<header class="masthead">
  <div class="wrap masthead-inner">
    <a class="logo" href="../index.html">
      <img src="../images/logo-badge.png" alt="" class="logo-badge">
      <span class="logo-name">
        <span class="js-site-name">Samuel Davies</span>
        <span class="kicker js-tagline">${siteConfig.tagline}</span>
      </span>
    </a>
    <nav class="site-nav">
      <a href="../index.html">Home</a>
      <a href="../articles.html" class="active">Articles</a>
      <a href="../tactical-lab.html">Tactical Lab</a>
      <a href="../about.html">About</a>
      <a href="../contact.html">Contact</a>
      <a href="../saved.html" class="nav-saved-link">Saved</a>
    </nav>
  </div>
</header>`;
}

function renderSourcesList(sources) {
  if (!sources || sources.length === 0) return "";
  return `    <div class="sources-list">
        <span class="eyebrow">Sources</span>
        <ul>
${sources.map(s => `          <li><a href="${s.url}" target="_blank" rel="noopener nofollow">${s.label}</a></li>`).join("\n")}
        </ul>
      </div>`;
}

function renderRelatedSection(article, all) {
  const related = relatedArticles(article, all);
  if (related.length === 0) return "";
  return `    <div class="related-section">
        <span class="eyebrow">Related Articles</span>
        <div class="related-grid">
${related.map(r => `          <a class="related-card" href="${r.id}.html">
            <div class="related-thumb"><img src="../${r.image}" alt="${r.title}" loading="lazy"></div>
            <span class="type-pill">${r.type}</span>
            <span class="related-title">${r.title}</span>
          </a>`).join("\n")}
        </div>
      </div>`;
}

function renderEngageRow() {
  return `    <div class="engage-row">
      <div class="reaction-row" id="reaction-row">
        <span class="reaction-prompt">What did you make of this?</span>
        <div class="reaction-btns">
          <button class="reaction-btn" data-value="fire" type="button" aria-label="React fire" aria-pressed="false"><span class="reaction-emoji">\u{1F525}</span><span class="reaction-label">Fire</span></button>
          <button class="reaction-btn" data-value="wow" type="button" aria-label="React wow" aria-pressed="false"><span class="reaction-emoji">\u{1F62E}</span><span class="reaction-label">Wow</span></button>
          <button class="reaction-btn" data-value="class" type="button" aria-label="React class" aria-pressed="false"><span class="reaction-emoji">\u{1F44F}</span><span class="reaction-label">Class</span></button>
        </div>
      </div>
      <button class="save-btn" id="save-btn" type="button" aria-pressed="false">
        <span class="save-icon">☆</span><span class="save-btn-label">Save for later</span>
      </button>
    </div>`;
}

function renderShareRow(article) {
  const pageUrl = `${SITE_URL}/articles/${article.id}.html`;
  const shareText = `${article.title} -- by Samuel Davies`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${pageUrl}`)}`;

  return `    <div class="share-row">
      <span class="eyebrow">Share this article</span>
      <div class="tag-row">
        <a class="tag" href="${twitterUrl}" target="_blank" rel="noopener"><span class="tag-icon"><svg viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="7" y1="7" x2="17" y2="17" stroke="currentColor" stroke-width="1.8"/><line x1="17" y1="7" x2="7" y2="17" stroke="currentColor" stroke-width="1.8"/></svg></span> Share to X</a>
        <a class="tag" href="${whatsappUrl}" target="_blank" rel="noopener"><span class="tag-icon"><svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8.5 9.5c0 4 2 6 6 6l1-2-2.5-1-1 1c-1-.5-1.5-1-2-2l1-1-1-2.5-2 .5z" fill="currentColor" stroke="none"/></svg></span> WhatsApp</a>
        <button class="tag" id="share-more-btn" type="button"><span class="tag-icon"><svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="6" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8.2" y1="10.8" x2="15.8" y2="7.2" stroke="currentColor" stroke-width="1.5"/><line x1="8.2" y1="13.2" x2="15.8" y2="16.8" stroke="currentColor" stroke-width="1.5"/></svg></span> <span id="share-more-label">More</span></button>
      </div>
    </div>`;
}

// The footer is no longer hardcoded here -- it's built at runtime by
// renderMegaFooter() in js/site.js (see the script block below), the
// same way every other page on the site builds its footer. That way
// a footer change in site.js applies everywhere at once, including
// pages this generator makes, without this file needing to know
// what the footer looks like at all.
function renderFooter() {
  return `<footer class="mega-footer" id="mega-footer"></footer>`;
}

function renderArticlePage(article, all) {
  const imageCaptionLink = article.imageLink
    ? `<a href="${article.imageLink}" target="_blank" rel="noopener nofollow">${article.imageCredit}</a>`
    : article.imageCredit;

  const premiumPill = article.premium ? ` <span class="premium-pill">Premium</span>` : "";
  const scorelineHtml = article.scoreline
    ? `\n    <p style="font-family:var(--font-mono); font-size:13px; color:var(--ink-soft); margin:8px 0 0;">${article.scoreline}</p>`
    : "";

  const shareData = `{ title: "${article.title}", text: "${article.title} -- by Samuel Davies", url: "${SITE_URL}/articles/${article.id}.html" }`;

  return `${renderHead(article)}
<body>
<a href="#main-content" class="skip-link">Skip to content</a>

${renderMasthead()}

<div id="main-content" class="wrap">
  <a href="../articles.html" class="close-detail" style="display:inline-block; margin: 24px 0 0;">&larr; Back to Articles</a>

  <div class="detail open" style="margin-top: 16px;">
    <figure class="detail-image">
        <img src="../${article.image}" alt="${article.title}">
        <figcaption>${imageCaptionLink}</figcaption>
      </figure>
    <span class="eyebrow">${article.type} &middot; ${article.competition} &middot; ${formatDate(article.date)}</span>${premiumPill}${scorelineHtml}
    <h3>${article.title}</h3>

    <div class="body-text">
${renderBody(article)}
    </div>

${renderSourcesList(article.sources)}
${renderRelatedSection(article, all)}

${renderEngageRow()}

${renderShareRow(article)}
  </div>
</div>

${renderFooter()}

<script src="../js/contact-info.js"></script>
<script src="../js/articles-data.js"></script>
<script src="../js/tactical-lab-data.js"></script>
<script src="../js/field-notes-data.js"></script>
<script src="../js/site.js"></script>
<script src="../js/theme.js"></script>
<script>
  document.getElementById("share-more-btn").addEventListener("click", () => {
    const shareData = ${shareData};
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareData.url).then(() => {
        const label = document.getElementById("share-more-label");
        const original = label.textContent;
        label.textContent = "Copied!";
        setTimeout(() => { label.textContent = original; }, 2000);
      });
    }
  });
  renderMegaFooter("mega-footer", "articles");
  renderKicker();
  initThemeToggle("theme-toggle");
  initAutoTheme();
  initEngageRow();
  initReadingProgress();
  initBreadcrumb();
  initJargonLinks();
  initStalenessBanner();
  initKickoffCountdown();
  injectArticleSchema();
  initPdfButton();
  renderSmartRelated();
</script>
</body>
</html>
`;
}

/* ---------- run ---------- */

const outDir = path.join(ROOT, "articles");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

articles.forEach(article => {
  const html = renderArticlePage(article, articles);
  const outPath = path.join(outDir, `${article.id}.html`);
  fs.writeFileSync(outPath, html, "utf8");
  console.log(`Wrote articles/${article.id}.html`);
});

console.log(`\nDone -- ${articles.length} article page(s) generated.`);
