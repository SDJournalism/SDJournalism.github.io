#!/usr/bin/env node
/* ============================================================
   SITEMAP GENERATOR
   ============================================================
   Builds sitemap.xml at the root of the site from js/articles-data.js
   and js/tactical-lab-data.js. A sitemap is a plain XML file that
   lists every page on your site so Google (and other search
   engines) can find and index all of them reliably, instead of
   just guessing by following links.

   Run this any time you add, edit, or remove an article or
   Tactical Lab entry:

       node scripts/generate-sitemap.js

   Same manual-step philosophy as generate-rss.js -- the site has
   no build process, so nothing regenerates sitemap.xml for you.
   A safe habit: run this together with generate-rss.js whenever
   you've changed content.
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE_URL = "https://sdjournalism.github.io";

function loadDataFile(relPath, varName) {
  const code = fs.readFileSync(path.join(ROOT, relPath), "utf8");
  // eslint-disable-next-line no-new-func
  const fn = new Function(`${code}\nreturn ${varName};`);
  return fn();
}

const articles = loadDataFile("js/articles-data.js", "articles");
const tacticalLabEntries = loadDataFile("js/tactical-lab-data.js", "tacticalLabEntries");

// Static pages that always exist. "saved.html" is a personal,
// visitor-specific bookmarks page with no fixed content of its own,
// so it's deliberately left out -- nothing there for a search
// engine to usefully index.
const STATIC_PAGES = [
  { loc: "/", changefreq: "daily", priority: "1.0" },
  { loc: "/articles.html", changefreq: "daily", priority: "0.9" },
  { loc: "/tactical-lab.html", changefreq: "weekly", priority: "0.9" },
  { loc: "/about.html", changefreq: "monthly", priority: "0.5" },
  { loc: "/contact.html", changefreq: "monthly", priority: "0.4" },
  { loc: "/faq.html", changefreq: "monthly", priority: "0.3" },
  { loc: "/field-notes.html", changefreq: "monthly", priority: "0.4" }
];

const articleUrls = articles.map(a => ({
  loc: `/articles/${a.id}.html`,
  lastmod: a.date,
  changefreq: "monthly",
  priority: "0.7"
}));

const labUrls = tacticalLabEntries
  .filter(e => !e.comingSoon)
  .map(e => ({
    loc: `/tactical-lab/${e.id}.html`,
    lastmod: e.date,
    changefreq: "monthly",
    priority: "0.7"
  }));

const urls = [...STATIC_PAGES, ...articleUrls, ...labUrls];

const urlsXml = urls.map(u => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ""}    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap, "utf8");
console.log(`Wrote sitemap.xml -- ${urls.length} url(s) (${STATIC_PAGES.length} static, ${articleUrls.length} articles, ${labUrls.length} Tactical Lab).`);
