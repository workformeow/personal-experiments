# Node.js Configuration

Shared config for small Node.js + TypeScript projects.

## Files

- `.prettierrc`: formatting
- `eslint.config.mjs`: type-aware lint and import order
- `tsconfig.json`: strict TS, `@/*` → `src/*`
- `.nvmrc`: Node version
- `.gitattributes`: LF on every OS
- `.gitignore` / `.dockerignore`
- `Dockerfile` / `docker-compose.yml`

## Setup

1. Copy the files into the project root.
2. Install dev dependencies:

```bash
npm install -D typescript tsx tsc-alias @types/node prettier eslint @eslint/js typescript-eslint eslint-config-prettier eslint-plugin-import-x eslint-plugin-n eslint-plugin-unused-imports globals
```

3. Add to `package.json`:

```json
{
  "type": "module",
  "engines": { "node": ">=26" },
  "scripts": {
    "dev": "tsx --watch src/main.ts",
    "start": "node --enable-source-maps dist/main.js",
    "build": "npm run clean && tsc && tsc-alias --resolve-full-paths",
    "clean": "node -e \"require('node:fs').rmSync('dist',{recursive:true,force:true})\"",
    "lint": "eslint .",
    "fix": "eslint . --fix && prettier --write .",
    "typecheck": "tsc --noEmit",
    "check": "npm run lint && npm run typecheck && npm run build"
  }
}
```

4. Run `nvm use`, then `npm run dev`.