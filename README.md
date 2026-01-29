# TerminalCV Site

A terminal-style CV/resume site built with [Hugo](https://gohugo.io/) and the [TerminalCV theme](https://github.com/coolapso/hugo-theme-terminalcv). **Configured for GitHub Pages** — push to `main` and the site deploys automatically.

## Prerequisites

- [Hugo (extended)](https://gohugo.io/installation/) — required to run and build the site
- Git

## Quick start

### 1. Get the theme

**Option A — Run the setup script (easiest):**

```powershell
.\setup.ps1
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

1. **Create a new repo** on GitHub (e.g. `terminalcv-site` or `yourusername.github.io` for a user site).
2. **Push this project** to the repo (branch `main`):
   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```
   **If Git says "password not supported":** GitHub no longer accepts account passwords. Use a [Personal Access Token](https://github.com/settings/tokens) as the password when prompted, or use SSH: `git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO.git` then `git push -u origin main`.
3. **Enable GitHub Pages:** Repo → **Settings** → **Pages** → under "Build and deployment", set **Source** to **GitHub Actions**.
4. The workflow (`.github/workflows/gh-pages.yml`) runs on every push to `main`: it builds Hugo and deploys to the `gh-pages` branch. Your site will be at:
   - **Project site:** `https://YOUR_USERNAME.github.io/YOUR_REPO/`
   - **User/org site** (if repo name is `YOUR_USERNAME.github.io`): `https://YOUR_USERNAME.github.io/`

No need to add the theme as a submodule — the workflow fetches it if missing. To use a submodule instead, run `git submodule add https://github.com/coolapso/hugo-theme-terminalcv.git themes/terminalcv` before pushing.

## Theme

- [TerminalCV on GitHub](https://github.com/coolapso/hugo-theme-terminalcv)
- [Live demo](https://coolapso.sh)

If you added the theme as a submodule, update it with:

```powershell
git submodule update --remote themes/terminalcv
```

## License

Your content is yours. The TerminalCV theme is MIT licensed.
