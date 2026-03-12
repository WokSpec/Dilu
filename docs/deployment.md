# Dilu — Deployment

## Overview

Dilu is a meta-platform that deploys other projects to Cloudflare Pages. Its own launcher dashboard is also deployed as a **Cloudflare Pages** project using the **Next.js** adapter.

---

## Infrastructure Requirements

1. **Cloudflare D1**: `dilu-db` for project metadata.
2. **Cloudflare KV**: `DILU_USERS` for session data.
3. **Cloudflare Pages API**: Dilu requires an API token with permissions to manage Pages projects on behalf of the user.

---

## Build Process

Dilu uses `@opennextjs/cloudflare` for its own deployment.

```bash
# Build the launcher dashboard
npm run build:cf
```

This runs the Next.js build and assembles the Cloudflare-compatible bundle in `.deploy/`.

---

## Deploying the Launcher

```bash
# Deploy to Cloudflare Pages
npx wrangler pages deploy .deploy --project-name wokspec-dilu
```

---

## CI/CD

Automatic deployments are handled via GitHub Actions.

**Secrets required:**
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

---

## Template Provisioning

Templates are built as separate static assets and stored in Cloudflare KV or a bucket during the build process. When a user launches a project, Dilu fetches the template, replaces the variables, and pushes it to Cloudflare via the Pages API.
