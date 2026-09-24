# Muhammad Khisal Khalid — Portfolio

Personal portfolio website, designed in [Claude Design](https://claude.ai/design) and deployed as a static site on GitHub Pages.

## Structure

- `index.html` — the portfolio (single page)
- `alivyo.html` — the Alivyo product page, linked from *Featured work*. It is a self-contained bundle: its markup, styles and images live inside the `<script type="__bundler/template">` block, which replaces the document at load, so edits to its outer `<head>` are discarded
- `assets/` — images used by the portfolio (`og-image.jpg` is the link-preview card)
- `support.js`, `image-slot.js` — runtime scripts the exported design depends on
- `vendor/` — local copies of React 18 UMD builds so the site has no CDN dependency
- `project/uploads/` — original design source material (drafts, mockups); not published
- `.github/workflows/deploy.yml` — GitHub Pages deployment workflow
- `.nojekyll` — tells GitHub Pages to serve files as-is (no Jekyll processing)

The workflow copies only the files the pages load into `_site/` and publishes that. If you add a new page or top-level folder, add it to the **Stage site files** step or it will not be deployed.

## Deployment

The site deploys automatically via GitHub Actions on every push to `main`.

One-time setup: in the repository go to **Settings → Pages** and set **Source** to **GitHub Actions** (not "Deploy from a branch").

Live site: https://khisal.github.io/portfolio-website-design/

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```
