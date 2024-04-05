FROM node:21

WORKDIR /app

COPY package.json yarn.lock ./
COPY src ./src
COPY tsconfig.json ./
COPY .env ./

RUN yarn install
RUN yarn build

EXPOSE 3001

CMD ["yarn", "start"]
