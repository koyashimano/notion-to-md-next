# syntax=docker/dockerfile:1
FROM node:18-alpine AS base

WORKDIR /app

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont

COPY fonts/ /usr/share/fonts/
RUN fc-cache -fv

ENV CHROME_EXECUTABLE_PATH=/usr/bin/chromium

# COPY .env .env
COPY prisma/schema.prisma ./prisma/

COPY package*.json ./
RUN npm install

COPY . .

# --- development stage ---
FROM base AS development
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "dev"]

# --- production stage ---
FROM base AS production
ENV NODE_ENV=production
RUN npm run build
RUN npm prune --production
EXPOSE 3000
CMD ["npm", "start"] 