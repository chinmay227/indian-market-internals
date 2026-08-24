# Research Dashboard Deployment

Target URL: `https://research.cmbtrades.trade`

The site is a static GitHub Pages dashboard under `docs/`. It is intentionally isolated from the trading application and public performance site.

## GitHub Pages source

Configure the repository Pages settings as:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/docs`

The site entry point is `docs/index.html`.

## Custom domain

The repository contains:

`docs/CNAME`

with:

`research.cmbtrades.trade`

In GitHub repository Settings → Pages, set the Custom domain field to:

`research.cmbtrades.trade`

After DNS resolves, enable `Enforce HTTPS`.

## DNS

At the DNS provider authoritative for `cmbtrades.trade`, create:

- Type: `CNAME`
- Host/Name: `research`
- Target/Value: `chinmay227.github.io`

Do not change the existing records for `app.cmbtrades.trade` or `performance.cmbtrades.trade`.

## Architecture

```text
research.cmbtrades.trade
        ↓ CNAME
chinmay227.github.io
        ↓ GitHub Pages
main / docs
        ↓
index.html + Plotly + compact validated JSON
```

The dashboard has no backend process, database, API keys, or production trading dependencies.

## Data policy

Only compact, already-validated research aggregates are published in `docs/assets/data/dashboard_data.json`. The full research Parquet datasets and production trading data are not part of the public website.

## Updating the site

Update the validated research outputs, regenerate the compact dashboard data / figures, and commit changes under `docs/`. GitHub Pages then republishes from the same branch and folder.
