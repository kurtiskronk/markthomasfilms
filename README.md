# Mark Thomas Films — Custom Code

Custom CSS and JavaScript for the Mark Thomas Films Squarespace site.

The source code is maintained locally in Nova, stored in GitHub, and automatically deployed to Cloudflare Workers as static assets.

---

# QUICK REFERENCE

## Making a normal update

Edit files locally, then run:

```bash
markthomasfilms push
```

The command will:

1. Sync with GitHub.
2. Rebuild `dist/markthomasfilms.css`.
3. Stage all changes.
4. Ask for a commit message.
5. Commit.
6. Push to GitHub.

GitHub then automatically triggers a Cloudflare deployment.

No manual Cloudflare upload is required.

---

# ADDING A NEW JAVASCRIPT FILE

Create the file inside:

```text
/js/
```

Example:

```text
/js/gallery.js
```

Then **add it to the `jsFiles` array in `loader.js`**:

```js
const jsFiles = [
		'js/films-tag-context.js',
		'js/films.js',
		'js/form.js',
		'js/site.js',
		'js/gallery.js'
];
```

## IMPORTANT

JavaScript execution order matters.

If one file depends on another, place the dependency first.

Example:

```text
films-tag-context.js
				↓
films.js
```

After adding the file:

```bash
markthomasfilms push
```

Cloudflare will automatically deploy it.

---

# ADDING A NEW CSS FILE

Create the file inside:

```text
/css/
```

Example:

```text
/css/gallery.css
```

That is all.

You do **not** add CSS files to `loader.js`.

The local `markthomasfilms push` command automatically combines every:

```text
/css/*.css
```

file into:

```text
/dist/markthomasfilms.css
```

The combined stylesheet is what the website loads.

---

# HOW THE SITE LOADS THE CODE

Squarespace Code Injection loads:

```text
https://markthomasfilms.mark-a7f.workers.dev/loader.js
```

`loader.js` then loads:

```text
/dist/markthomasfilms.css

/js/films-tag-context.js
/js/films.js
/js/form.js
/js/site.js
```

The runtime path is:

```text
Squarespace
		↓
Cloudflare loader.js
		↓
Cloudflare static CSS + JavaScript
```

There is no runtime GitHub API request and no jsDelivr dependency.

---

# REPOSITORY STRUCTURE

```text
markthomasfilms/
│
├── loader.js
├── wrangler.jsonc
├── README.md
│
├── css/
│   ├── films.css
│   ├── forms.css
│   ├── reviews.css
│   └── site.css
│
├── js/
│   ├── films-tag-context.js
│   ├── films.js
│   ├── form.js
│   └── site.js
│
└── dist/
		└── markthomasfilms.css
```

`dist/markthomasfilms.css` is generated automatically.

Normally, edit files in `/css/`, not the generated file in `/dist/`.

---

# CLOUDFLARE DEPLOYMENT

GitHub repository:

```text
kurtiskronk/markthomasfilms
```

Cloudflare Worker:

```text
markthomasfilms
```

Current asset host:

```text
https://markthomasfilms.mark-a7f.workers.dev
```

Cloudflare is connected directly to the GitHub repository and deploys whenever `main` is updated.

## Cloudflare build command

```bash
rm -rf public && mkdir -p public && cp -R js dist public/ && cp loader.js public/
```

This creates a temporary deployment containing:

```text
public/
├── loader.js
├── js/
└── dist/
```

## Cloudflare deploy command

```bash
npx wrangler deploy
```

## Wrangler configuration

`wrangler.jsonc`:

```json
{
	"name": "markthomasfilms",
	"compatibility_date": "2026-09-03",
	"assets": {
		"directory": "./public/"
	}
}
```

---

# LOCAL COMMAND

The custom shell command is defined in:

```text
~/.zshrc
```

Main command:

```bash
markthomasfilms push
```

Other available commands:

```bash
markthomasfilms pull
markthomasfilms status
```

If `.zshrc` is edited, reload it with:

```bash
source ~/.zshrc
```

---

# IMPORTANT RULES

## JavaScript

New JS file:

```text
/js/new-file.js
```

→ **must also be added to `loader.js`.**

## CSS

New CSS file:

```text
/css/new-file.css
```

→ automatically included in the CSS bundle.

No loader change required.

## Generated CSS

Do not manually maintain:

```text
/dist/markthomasfilms.css
```

Edit the source files under:

```text
/css/
```

and let:

```bash
markthomasfilms push
```

rebuild the bundle.

## GitHub

Avoid editing files directly on GitHub unless necessary.

If something is changed directly on GitHub, pull before making the next local push:

```bash
markthomasfilms pull
```

This prevents local and remote branches from diverging.

---

# TESTING AFTER A DEPLOYMENT

Cloudflare deployment normally starts automatically after:

```bash
markthomasfilms push
```

The latest files can be checked directly:

```text
https://markthomasfilms.mark-a7f.workers.dev/loader.js

https://markthomasfilms.mark-a7f.workers.dev/js/films.js

https://markthomasfilms.mark-a7f.workers.dev/dist/markthomasfilms.css
```

If a recent change is not showing on the website:

1. Confirm the GitHub push succeeded.
2. Check the Cloudflare deployment status.
3. Open the file directly at the Workers URL.
4. Check Chrome DevTools → Network.
5. Confirm the expected file is listed in `loader.js`.

---

# SQUARESPACE CODE INJECTION

Squarespace should only need the Cloudflare loader:

```html
<link
	rel="preconnect"
	href="https://markthomasfilms.mark-a7f.workers.dev"
	crossorigin
>

<script
	src="https://markthomasfilms.mark-a7f.workers.dev/loader.js"
	defer>
</script>
```

Do not add the individual JavaScript files to Squarespace.

`loader.js` handles them.

---

# OLD ARCHITECTURE

The site previously used:

```text
Squarespace
→ loader.js
→ GitHub API
→ current commit SHA
→ assets.json
→ jsDelivr
```

That architecture was replaced because cold loads were noticeably slower.

The current Cloudflare setup removes the GitHub API, `assets.json`, and jsDelivr from the website's runtime loading path.

If old files such as `assets.json` remain in the repository, they are not required by the current loader.

---

# TL;DR FOR FUTURE ME

New JavaScript file:

```text
Create it in /js/
→ add it to loader.js
→ run markthomasfilms push
```

New CSS file:

```text
Create it in /css/
→ run markthomasfilms push
```

Normal update:

```text
Edit locally in Nova
→ markthomasfilms push
→ GitHub
→ Cloudflare auto-deploys
→ Squarespace loads the updated files
```