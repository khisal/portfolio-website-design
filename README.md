# Muhammad Khisal Khalid — Portfolio

Personal portfolio website, designed in [Claude Design](https://claude.ai/design) and deployed as a static site on GitHub Pages.

## Structure

- `index.html` — the site (single page)
- `assets/` — images used by the page
- `support.js`, `image-slot.js` — runtime scripts the exported design depends on
- `vendor/` — local copies of React 18 UMD builds so the site has no CDN dependency
- `project/uploads/` — original design source material (drafts, mockups); not used by the live site
- `.github/workflows/deploy.yml` — GitHub Pages deployment workflow
- `.nojekyll` — tells GitHub Pages to serve files as-is (no Jekyll processing)

## Deployment

The site deploys automatically via GitHub Actions on every push to `main`.

One-time setup: in the repository go to **Settings → Pages** and set **Source** to **GitHub Actions** (not "Deploy from a branch").

Live site: https://khisal.github.io/portfolio-website-design/

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```
