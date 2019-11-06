FROM node:12-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.build.json ./

RUN npm install
RUN npm run build

COPY . .

USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]