# MCRI — Matter Career Readiness Institute

Landing page for the MCRI (Matter Career Readiness Institute), a post-secondary institution in Victoria Falls, Zimbabwe, powered by the Jamf Community Education Initiatives team.

**Staging:** [robatjamf.github.io/mcri](https://robatjamf.github.io/mcri/)

## Stack

- [Astro](https://astro.build/) v6
- [Tailwind CSS](https://tailwindcss.com/) v4
- Hosted on GitHub Pages with custom domain (CNAME)

## Development

```bash
pnpm install
pnpm dev
```

## Verification

```bash
pnpm lint
pnpm check
npm test
pnpm build
```

## Build & Deploy

Deploys automatically to GitHub Pages on push to `main` via GitHub Actions.

```bash
pnpm build
```

Deployment notes: [docs/deployment.md](docs/deployment.md)

## Backstage

This project is registered in Backstage via `catalog-info.yaml` as a `website` component under `jamf-concept-projects`.
