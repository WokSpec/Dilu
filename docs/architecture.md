# Dilu — Architecture

## Overview

Dilu is a no-code platform for launching products with zero infrastructure overhead. Built on **Next.js (App Router)** and deployed as a **Cloudflare Worker**, it provides a high-performance, edge-first environment for creating marketing sites, SaaS starters, and community hubs.

---

## Core System Architecture

```
                User Request
                   │
         ┌─────────▼─────────┐
         │  Cloudflare Edge   │  (Dilu Worker)
         │  Next.js Runtime   │  (Launcher & Dashboard)
         └────────┬───────────┘
                  │
       ┌──────────┼──────────────┐
       │          │              │
  ┌────▼───┐  ┌───▼──┐  ┌───────▼───────┐
  │  D1 DB │  │  KV  │  │   Cloudflare  │
  │(SQLite)│  │(User)│  │    Pages API  │
  └────────┘  └──────┘  └───────┬───────┘
                                │
                          ┌─────▼─────┐
                          │ User App  │ (Deployed)
                          └───────────┘
```

---

## Deployment Engine

Dilu is not just a website; it is a **Meta-Platform**. When a user "launches" a project:

1. **Template Selection**: A pre-built, production-ready project template is selected.
2. **Dynamic Generation**: Dilu injects the user's specific content and configuration into the template's source.
3. **Automated Provisioning**: Dilu uses the **Cloudflare Pages API** to create a new project on the fly.
4. **Edge Deployment**: The generated code is bundled and deployed to Cloudflare's global edge network.

---

## Integration Layer (OAuth)

A key feature of Dilu is "No API Key" integration. It handles complex auth flows centrally.

- **Centralized OAuth**: Users connect services like Stripe, Discord, or Shopify once at the Dilu dashboard.
- **Token Proxy**: When the user's deployed app needs to communicate with an integrated service, it calls a Dilu-provided proxy endpoint.
- **Security**: This ensures that users never have to handle sensitive client secrets or refresh tokens manually.

---

## Data Model (D1)

- **`projects`**: Metadata for every project launched (slug, template_id, status).
- **`integrations`**: Secure storage of OAuth tokens linked to specific projects.
- **`custom_domains`**: Mapping of user-provided domains to Cloudflare Page subdomains.

---

## Templates System

Dilu templates are high-quality, standalone projects located in the `src/templates` directory.

- **`landing-page`**: Optimized for conversion with built-in analytics.
- **`saas-starter`**: Pre-configured with Auth.js and Stripe billing.
- **`discord-community`**: Integrated with the Discord API for role management.

Each template is **Fully Versioned** and **Isolated**, meaning updates to Dilu itself do not break existing deployments.

---

## Key Design Decisions

**Why Cloudflare Workers for the Launcher?**  
The "Launch" operation is compute-intensive (bundling, API calls). Standard serverless functions often hit execution time limits. Workers, combined with Cloudflare's global infrastructure, allow for near-instant provisioning of user sites.

**Why No-Code?**  
Most products die in the configuration phase. By abstracting away the `wrangler.toml`, `package.json`, and deployment secrets, Dilu moves the "Time to Live" from hours to seconds.

**WokSpec Ecosystem Synergy**  
Dilu projects come pre-integrated with **Eral** for AI support and **WokAPI** for billing, providing a cohesive environment for startups to grow into.
