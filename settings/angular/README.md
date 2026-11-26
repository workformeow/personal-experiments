# Angular Configuration

Shared config for Angular projects: lint and format after `ng new`, and Docker so anyone can run the app with only Docker installed.

## Files

- `.prettierrc`: formatting (Angular HTML parser, Tailwind class sorting)
- `eslint.config.mjs`: type-aware lint, Angular rules, template a11y, import order
- `.gitignore` / `.dockerignore`
- `Dockerfile` / `nginx.conf` / `docker-compose.yml`: build with Node, serve with nginx
- `proxy.conf.json`: forwards `/api` to `localhost:3000` during `ng serve`

## Setup

1. Copy the files into the project root.
2. Install dev dependencies:

```bash
npm install -D eslint @eslint/js typescript-eslint angular-eslint eslint-config-prettier eslint-plugin-import-x eslint-plugin-unused-imports prettier prettier-plugin-tailwindcss
```

3. Add to `package.json` scripts:

```json
"lint": "eslint .",
"fix": "eslint . --fix && prettier --write ."
```

4. In `angular.json`, under `serve.options`, add `"proxyConfig": "proxy.conf.json"`.

## Calling an API

Call relative paths (`/api/products`), so no `environment.ts` is needed:

- `ng serve`: `proxy.conf.json` forwards to `localhost:3000`
- Docker: `nginx.conf` forwards to the `api` service in the same compose project

Both strip `/api` before forwarding. Without an `api` service, `/api` answers 502 and the app still runs.

## Run with Docker

```bash
docker compose up -d --build
```

Open http://localhost:4200 (change with `WEB_PORT` in `.env`).