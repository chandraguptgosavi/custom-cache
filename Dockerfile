FROM node:23-alpine

RUN corepack enable && corepack prepare yarn@4.2.2 --activate

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3001

CMD ["node", "dist/index.js"]
