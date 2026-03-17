# GitHub Pages Deployment

This site is staged on GitHub Pages at [https://robatjamf.github.io/mcri/](https://robatjamf.github.io/mcri/).

## Required Repository Settings

1. In GitHub, open `Settings` -> `Pages`.
2. Set the source to `GitHub Actions`.
3. Keep the default branch as `main` for the deployment trigger.

## Deployment Workflow

The workflow at `.github/workflows/deploy.yml` now runs:

1. `pnpm lint`
2. `pnpm check`
3. `npm test`
4. `pnpm build`
5. upload the Pages artifact from `dist/`
6. deploy to GitHub Pages

Pushes to `main` and manual workflow dispatches both publish the current site build.

## Action Runtime Strategy

The workflow uses:

- `actions/checkout@v5`
- `actions/configure-pages@v5`
- `actions/setup-node@v5`
- `actions/upload-pages-artifact@v4`

This avoids the Node 20 deprecation path for the actions that triggered the warning and keeps the Pages deployment flow aligned with GitHub's recommended workflow.

## Local Verification

Run the same checks locally before pushing:

```bash
pnpm lint
pnpm check
npm test
pnpm build
```

## Later Custom-Domain Cutover

When the repo-path staging site is approved:

1. Change `site` in `astro.config.mjs` from `https://robatjamf.github.io` to the final custom domain origin.
2. Remove or adjust `base` if the site will be served from the domain root instead of `/mcri`.
3. Restore `public/CNAME` with the custom domain value.
4. Update DNS to point the domain at GitHub Pages.
5. Re-run the full local verification set and then deploy from `main`.
