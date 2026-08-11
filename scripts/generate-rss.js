#!/usr/bin/env node
/* ============================================================
   RSS FEED GENERATOR
   ============================================================
   Builds rss.xml at the root of the site from js/articles-data.js
   and js/tactical-lab-data.js. rss.xml is what lets someone
   "subscribe" to your site in a feed reader (Feedly, NetNewsWire,
   the RSS feature built into some browsers, etc.) -- it's a plain
   XML file listing your latest pieces, updated automatically
   whenever you regenerate it.

   Run this any time you add, edit, or remove an article or
   Tactical Lab entry:

       node scripts/generate-rss.js

   This is a manual step on purpose -- the site has no build
   process, so nothing regenerates rss.xml for you. If you forget
   to run it, the site itself is unaffected; the feed just goes
   stale until the next time you run it. A safe habit: run it
   together with scripts/generate-articles.js whenever you've
   changed content.
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE_URL = "https://sdjournalism.github.io";
const FEED_ITEM_LIMIT = 30; // most feed readers only want the recent stuff

function loadDataFile(relPath, varName) {
  const code = fs.readFileSync(path.join(ROOT, relPath), "utf8");
  // eslint-disable-next-line no-new-func
  const fn = new Function(`${code}\nreturn ${varName};`);
  return fn();
}

const articles = loadDataFile("js/articles-data.js", "articles");
const tacticalLabEntries = loadDataFile("js/tactical-lab-data.js", "tacticalLabEntries");
const siteConfig = loadDataFile("js/contact-info.js", "siteConfig");

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(dateStr) {
  // Treat the date as midnight UTC so it's stable regardless of
  // where this script is run from.
  return new Date(`${dateStr}T00:00:00Z`).toUTCString();
}

// Articles and Tactical Lab entries share the same shape once
// normalised to { title, link, pubDate, description, category }.
const articleItems = articles.map(a => ({
  title: a.title,
  link: `${SITE_URL}/articles/${a.id}.html`,
  pubDate: rfc822(a.date),
  description: a.excerpt,
  category: a.type
}));

const labItems = tacticalLabEntries
  .filter(e => !e.comingSoon) // no page to link to yet
  .map(e => ({
    title: `${e.title} (Tactical Lab)`,
    link: `${SITE_URL}/tactical-lab/${e.id}.html`,
    pubDate: rfc822(e.date),
    description: e.excerpt,
    category: e.category
  }));

const items = [...articleItems, ...labItems]
  .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
  .slice(0, FEED_ITEM_LIMIT);

const itemsXml = items.map(item => `  <item>
    <title>${escapeXml(item.title)}</title>
    <link>${item.link}</link>
    <guid isPermaLink="true">${item.link}</guid>
    <pubDate>${item.pubDate}</pubDate>
    <category>${escapeXml(item.category)}</category>
    <description>${escapeXml(item.description)}</description>
  </item>`).join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(siteConfig.name)} -- ${escapeXml(siteConfig.tagline)}</title>
  <link>${SITE_URL}/</link>
  <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  <description>${escapeXml(siteConfig.tagline)} -- match reports, tactical analysis and Tactical Lab breakdowns.</description>
  <language>en-gb</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${itemsXml}
</channel>
</rss>
`;

fs.writeFileSync(path.join(ROOT, "rss.xml"), rss, "utf8");
console.log(`Wrote rss.xml -- ${items.length} item(s) (${articleItems.length} articles, ${labItems.length} Tactical Lab).`);
