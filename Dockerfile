FROM node:7.9.0

WORKDIR /usr/src

COPY package.json .
RUN npm install

COPY server.js .
COPY tenant-query.js .

CMD node server.js