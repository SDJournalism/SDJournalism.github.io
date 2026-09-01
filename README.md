# Samuel Davies -- Portfolio Website

A simple 4-page website: Home, Articles, About, Contact.

## Viewing it on your computer

Just double-click `index.html` and it will open in your browser. Click
around -- every page works locally, nothing needs to be "installed."

## Adding your real photo

1. Save a photo of yourself as `profile.jpg`.
2. Put it inside the `images` folder, replacing nothing (the file just
   needs to be named exactly `profile.jpg`).
3. Refresh the About page -- your photo replaces the placeholder
   automatically.

## Adding a new article

1. Open `js/articles-data.js` in any text editor.
2. Read the instructions at the top of the file.
3. Copy one article block, paste it near the top of the list, give it
   a new `id` number, and fill in your own title, date and text.
4. Save the file, then run this from a terminal in this folder:
   ```
   node scripts/generate-articles.js
   ```
   That builds (or rebuilds) every page in `articles/`, including your
   new one, from a single template -- so it always has every current
   site feature (dark mode, the Saved bookmark button, reactions, the
   Related Articles section, etc.) without you having to remember to
   add any of it by hand. It rewrites ALL article pages every time it
   runs, so if you've hand-tweaked any individual `articles/N.html`
   file directly (a custom photo caption, a manually-picked "related
   articles" list, etc.), running this will overwrite that tweak back
   to what the data file says. When in doubt, it's safe to run --
   just check `git diff` (or re-check the pages) afterwards if you
   want to see exactly what changed.
5. Refresh the Articles page.

Set `"featured": true` on an article to make it appear on the home
page too.

Tactical Lab pieces don't have a generator like this -- each one gets
a hand-built page (there's more unique, one-off content in those:
custom pitch diagrams, stat cards, etc.). If you're asking me to add
one in a future session, I'll make sure it includes everything on the
checklist below by hand.

## Checklist -- what every article/Tactical Lab page needs

`generate-articles.js` handles all of this automatically for
articles. For a hand-built Tactical Lab page (or if an article page
is ever hand-edited instead of regenerated), make sure it still has:

- `<link rel="manifest" href="../manifest.json">` and
  `<meta name="theme-color" content="#14224B">` in the `<head>`
- A `Saved` link in the `<nav class="site-nav">`
- The "reactions + Save for later" block (`class="engage-row"`,
  right before the `share-row`) and an `initEngageRow();` call in
  the page's closing `<script>`
- `<script src="../js/site.js"></script>` loaded before `theme.js`,
  with `renderMegaFooter(...)`, `renderKicker()`, `initThemeToggle(...)`
  and `initAutoTheme()` called in the closing script (this is what
  builds the footer -- there's no hardcoded footer HTML any more)

Read time is automatic for articles (it's counted from your
`content` text). For Tactical Lab, set the `readTime` field by hand
on the entry in `js/tactical-lab-data.js` -- see the instructions at
the top of that file.

## Keeping your RSS feed up to date

`rss.xml` is a file that lets people "subscribe" to your site in a feed
reader, so they get notified the moment you publish something new. It
doesn't update itself -- after adding, editing or removing an article
or Tactical Lab entry, run this from a terminal in this folder:

```
node scripts/generate-rss.js
```

That rebuilds `rss.xml` from whatever is currently in
`js/articles-data.js` and `js/tactical-lab-data.js`. Upload the new
`rss.xml` to GitHub along with your other changes.

## Updating your contact details

Open `js/contact-info.js` and change your email, phone number,
LinkedIn or Twitter link. This one file updates the whole site
automatically -- you don't need to edit anything else.

The `tagline` field controls the small text under your name in the
top-left corner of every page. The `bio` field controls both your
intro paragraph on the Home page and your full bio on the About
page -- edit it once in `contact-info.js` and both update.

## Putting it on the internet for free

You don't need to pay for hosting. Two easy, free options:

### Option A: GitHub Pages
1. Create a free account at github.com.
2. Create a new repository (e.g. `my-portfolio`).
3. Upload all the files in this folder to that repository (there's an
   "upload files" button on the repository page -- drag the whole
   folder's contents in).
4. Go to the repository's Settings > Pages, and set it to publish
   from the `main` branch, root folder.
5. GitHub gives you a free web address like
   `https://yourname.github.io/my-portfolio`.

### Option B: Netlify Drop
1. Go to app.netlify.com/drop.
2. Drag this whole folder onto the page.
3. Netlify gives you a free live web address instantly.
4. You can create a free account afterwards to keep the site and
   update it later.

Either way, whenever you want to update the site (new article, new
contact info), you just re-upload the changed files.

## New site features (added August 2026)

A few things were added to the site that mostly take care of
themselves -- here's what each one is and whether you need to do
anything.

### Big pull quotes in articles

Every article on the site now has one of these -- a single
best-worded line, pulled out and styled big. All 39 existing
articles were done by hand directly in both `js/articles-data.js`
and their `articles/N.html` page, so this didn't require running
the generator or touching the 5 articles that can't be safely
regenerated.

For a NEW article going forward, write the line a SECOND time as
its own paragraph in `js/articles-data.js`, starting with `>> `,
right after the paragraph it came from. For example, if a paragraph
already contains: he said "it's now or never" -- add a new
paragraph straight after it that just says: `>> It's now or never.`
This takes effect automatically when the article is generated with
`scripts/generate-articles.js`. Use it sparingly -- just the one
single best-worded, most important line per article.

### Recent Form on match reports (automatic, real data)

Every Match Report page automatically shows a small "Recent Form"
box for both teams -- their REAL last five results as W/D/L dots,
across all competitions, not just matches covered on this site.

This works in two parts:

1. `scripts/fetch-form-guide.js` is a script that talks to the free
   football-data.org API and saves the last five results for a list
   of clubs into `form-guide-data.json` at the top of the site.
2. A GitHub Action (`.github/workflows/update-form-guide.yml`) runs
   that script automatically four times a day, so the file -- and
   the widget -- stay up to date without anyone touching anything.
   `js/site.js`'s `initFormGuide()` just reads that file.

For this to work, a free API key from football-data.org needs to be
saved as a GitHub Actions secret named `FOOTBALL_DATA_API_KEY` (in
the GitHub repo: Settings -> Secrets and variables -> Actions -> New
repository secret). The key itself never appears anywhere in the
site's code or on GitHub Pages -- only inside that one private
secret, which only the scheduled robot job can read.

Two things to know:
- The free API plan doesn't cover domestic cups (Carabao Cup,
  Community Shield) or lower-league football -- only the big
  leagues (Premier League, Championship, Champions League, La Liga,
  Bundesliga, Serie A, Ligue 1, Eredivisie, Primeira Liga). If a
  team in a match report isn't covered, the widget just doesn't
  show for that page rather than showing something wrong.
- To add a new team so the widget can find it, add its name (spelled
  exactly the way it's spelled in the `scoreline` field) to the
  `SITE_TEAMS` list at the top of `scripts/fetch-form-guide.js`.
  Always spell a team's name the same way everywhere (e.g. always
  "Manchester United", never sometimes "Man Utd").

### Quick search (Cmd/Ctrl+K)

Every page can be searched with the Cmd/Ctrl+K keyboard shortcut --
deliberately no visible button anywhere, it's a keyboard-only
feature. It searches across every article and Tactical Lab piece by
title and summary. Automatic, nothing to maintain.

### Focus mode

The footer now has a "Focus mode" button next to the text-size and
dark-mode toggles. It hides the top nav bar (and, on an article or
Tactical Lab page, the related-articles/share/reactions blocks) for
quieter reading. Automatic, persisted per visitor, nothing to
maintain.

### Work With Me page

There's now a dedicated `work-with-me.html` page for the freelance
pitch (previously part of the About page). It's linked from the nav
and footer on every page automatically -- like the mega-footer, that
link is added by JavaScript (`js/site.js`), not hand-written into
every HTML file, so you never need to add it yourself to a new
article or Tactical Lab page.

## File structure, in plain terms

```
index.html            -- Home page
articles.html         -- All articles + full article view
about.html             -- About page
work-with-me.html      -- Freelance/commission pitch page
contact.html            -- Contact page
css/style.css           -- All the visual styling (colours, fonts, layout)
js/contact-info.js      -- EDIT THIS to change your contact details
js/articles-data.js     -- EDIT THIS to add/change articles
js/site.js              -- Behind-the-scenes code, no need to touch
images/profile.jpg      -- Add your own photo here (not included yet)
form-guide-data.json    -- Recent Form data, auto-updated -- don't edit by hand
scripts/fetch-form-guide.js          -- Fetches real form data (run by GitHub Actions)
.github/workflows/update-form-guide.yml -- Schedules the above to run automatically
```
