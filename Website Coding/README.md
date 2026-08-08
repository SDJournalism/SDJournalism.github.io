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
4. Save the file and refresh the Articles page.

Set `"featured": true` on an article to make it appear on the home
page too.

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

## File structure, in plain terms

```
index.html            -- Home page
articles.html         -- All articles + full article view
about.html             -- About page
contact.html            -- Contact page
css/style.css           -- All the visual styling (colours, fonts, layout)
js/contact-info.js      -- EDIT THIS to change your contact details
js/articles-data.js     -- EDIT THIS to add/change articles
js/site.js              -- Behind-the-scenes code, no need to touch
images/profile.jpg      -- Add your own photo here (not included yet)
```
