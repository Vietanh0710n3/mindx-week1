# ===========================
# 1. Build NestJS
# ===========================
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ===========================
# 2. Run NestJS
# ===========================
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/main.js"]
