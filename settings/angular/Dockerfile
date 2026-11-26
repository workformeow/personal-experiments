# ── Build: install deps and compile Angular ──
FROM node:26-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
# Keep the npm cache between builds, so a rebuild skips re-downloading packages
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
# Fixed output path: no need to edit this file per project name
RUN npm run build -- --output-path=dist/app

# ── Run: static files served by nginx ──
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/app/browser /usr/share/nginx/html
EXPOSE 80