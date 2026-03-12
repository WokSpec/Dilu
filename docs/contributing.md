# Dilu — Contributing

## Overview

Contributing to Dilu is divided into two areas: contributing to the launcher dashboard itself, or contributing a new project template.

---

## Launcher Dashboard

The dashboard is a Next.js 15 application.

```bash
# Clone and install
git clone https://github.com/WokSpec/Dilu
cd Dilu
npm install

# Run dev server
npm run dev
```

---

## Contributing a Template

Templates are located in `src/templates/`. Each template is a standalone, buildable project.

### 1. Template Structure
Every template must include:
- `template.json`: Metadata about the template (name, variables, integrations).
- `src/`: The template's own source code.
- `README.md`: Instructions for the user once deployed.

### 2. Variable Injection
Dilu uses a double-brace syntax for variable injection: `{{PROJECT_NAME}}`, `{{STRIPE_KEY}}`, etc.

### 3. Testing a Template Locally
To test how your template will look when deployed:

```bash
# Simulate a launch of the 'landing-page' template
npm run test:template --name=landing-page
```

---

## Coding Standards

1. **TypeScript**: Fully typed props and states.
2. **OpenNext**: Be mindful of Cloudflare Workers runtime limitations (no `fs`, limited Node.js modules).
3. **Vanilla CSS**: Prefer Vanilla CSS for dashboard and template styling for maximum compatibility.

---

## Pull Request Process

- Branch off `main` with `feat/template-name` or `fix/launcher-bug`.
- Run `npm run typecheck` and `npm run lint` before submitting.
