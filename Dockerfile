FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

RUN npm ci --omit=dev || npm install --omit=dev

COPY . .

ENV HP_HOST=0.0.0.0
ENV HP_PORT=1234
ENV PORT=1234

EXPOSE 1234

CMD ["node", "server.mjs"]

