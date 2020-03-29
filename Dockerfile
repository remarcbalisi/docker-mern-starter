FROM node:13.12.0-alpine3.10

WORKDIR /usr/src/app

RUN yarn --version

COPY package.json . /
     COPY yarn.lock ./

RUN yarn install --quiet
COPY . .
EXPOSE 3000
