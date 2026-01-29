# TerminalCV Site

A terminal-style CV/resume site built with [Hugo](https://gohugo.io/) and the [TerminalCV theme](https://github.com/coolapso/hugo-theme-terminalcv). **Configured for GitHub Pages** — push to `main` and the site deploys automatically.

> **If your live site shows this README instead of the Terminal CV:** In this repo go to **Settings → Pages**. Under "Build and deployment", set **Branch** to **gh-pages** (not main), Folder **/ (root)**, then Save. The built site is on `gh-pages`; `main` only has source files.

## Prerequisites

- [Hugo (extended)](https://gohugo.io/installation/) — required to run and build the site
- Git

## Quick start

### 1. Get the theme

**Option A — Run the setup script (easiest):**

```powershell
.\setup.ps1
```

On Linux/macOS (bash):

```bash
./setup.sh
```

**Option B — Git submodule (if you use Git):**

From the project folder:

```powershell
git submodule add https://github.com/coolapso/hugo-theme-terminalcv.git themes/terminalcv
```

If you cloned this repo and the theme folder is empty:

```powershell
git submodule update --init --recursive
```

### 2. Run locally

```powershell
hugo server
```

Open **http://localhost:1313** in your browser.

### 3. Build for production

```powershell
hugo --minify
```

Output is in the `public/` folder.

## Customize your CV

Edit **`config.yml`** in the project root. All content (name, bio, work, education, skills, social links, projects, etc.) is configured there. No need to edit theme files.

## Deploy to GitHub Pages

1. **Create a new repo** on GitHub (e.g. `personal_site` or `yourusername.github.io` for a user site).
2. **Push this project** to the repo (branch `main`):
   ```powershell
   git remote add origin https://github.com/Kolajy/personal_site.git
   git branch -M main
   git push -u origin main
   ```
   **If Git says "password not supported":** GitHub no longer accepts account passwords. Use a [Personal Access Token](https://github.com/settings/tokens) as the password when prompted, or use SSH: `git remote set-url origin git@github.com:Kolajy/personal_site.git` then `git push -u origin main`.
3. **Enable GitHub Pages:** Repo → **Settings** → **Pages**:
   - **Build and deployment:** Source = **Deploy from a branch**, Branch = **gh-pages**, Folder = **/ (root)** → Save. (Using **main** here will show the README instead of your site.)
   - **Custom domain (optional):** Enter your domain (e.g. `www.jaylok.com`) and save; then add the CNAME or A record at your DNS provider as GitHub shows.
4. The workflow (`.github/workflows/gh-pages.yml`) runs on every push to `main`: it builds Hugo and pushes the site to the `gh-pages` branch. That branch is what Pages serves. Your site will be at:
   - **Project site:** `https://kolajy.github.io/personal_site/`
   - **User/org site** (if repo name is `YOUR_USERNAME.github.io`): `https://YOUR_USERNAME.github.io/`

No need to add the theme as a submodule — the workflow fetches it if missing. To use a submodule instead, run `git submodule add https://github.com/coolapso/hugo-theme-terminalcv.git themes/terminalcv` before pushing.

### Troubleshooting: "404 There isn't a GitHub Pages site here"

1. **Enable Pages and set the branch:** Repo → **Settings** → **Pages** → **Build and deployment** → Source: **Deploy from a branch** → Branch: **gh-pages** → Folder: **/ (root)** → Save.
2. **Create the gh-pages branch:** The workflow creates it when it runs. Push to `main` to trigger it:
   ```powershell
   git push -u origin main
   ```
3. **Check the workflow:** Repo → **Actions** → open the latest "GitHub Pages" run. It must **succeed** (green). If it fails, open the run and fix the error; the "Deploy to GitHub Pages" step must complete so that `gh-pages` gets the built site.
4. **Wait a minute** after the workflow succeeds, then open your site (e.g. `https://kolajy.github.io/personal_site/` or your custom domain).

### Troubleshooting: "Domain does not resolve" (NotServedByPagesError)

1. **Use only one domain in GitHub:** In **Settings → Pages → Custom domain**, enter **either** `www.jaylok.com` **or** `jaylok.com` (not both). Try `www.jaylok.com` first.
2. **DNS at your registrar** (where you bought jaylok.com):
   - **www:** Add a **CNAME** record: name = `www`, target = `kolajy.github.io` (no `https://`, no path).
   - **Apex (jaylok.com):** Add **four A records**: name = `@`, value = `185.199.108.153` (and same for `.109`, `.110`, `.111`).
3. **Check DNS:** Use [whatsmydns.net](https://www.whatsmydns.net) — search for `www.jaylok.com` (should show CNAME to kolajy.github.io) and `jaylok.com` (should show the four GitHub IPs). If not, fix records and wait for propagation (up to 24–48 hours).
4. **Re-check in GitHub:** After DNS looks correct, remove the custom domain in Settings → Pages, save, wait 2–3 minutes, then add it again and save.
5. **CNAME file:** This repo includes `static/CNAME` with `www.jaylok.com` so the deployed site has it; push to `main` so the workflow redeploys.

## Theme

- [TerminalCV on GitHub](https://github.com/coolapso/hugo-theme-terminalcv)
- [Live demo](https://coolapso.sh)

If you added the theme as a submodule, update it with:

```powershell
git submodule update --remote themes/terminalcv
```

## License

Your content is yours. The TerminalCV theme is MIT licensed.
