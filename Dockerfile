FROM node:7.9.0

WORKDIR /usr/src

COPY package.json .
RUN npm install
COPY . .

CMD node pod-starter.js