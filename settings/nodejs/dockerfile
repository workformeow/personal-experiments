# ── Build: install all deps and compile TS ──
FROM node:26.13.1-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Run: compiled code + production deps only ──
FROM node:26.13.1-slim
WORKDIR /app
ENV NODE_ENV=development
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000

CMD ["node", "--enable-source-maps", "dist/main.js"]
