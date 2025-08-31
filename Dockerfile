FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

ENV NODE_ENV=production
ENV HP_HOST=0.0.0.0

# Fly will inject PORT. Default fallback keeps local runs easy.
EXPOSE 8080
CMD ["node", "server.mjs"]
