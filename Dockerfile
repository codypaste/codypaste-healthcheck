FROM node:alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ADD ./service/package.json /usr/src/app/package.json

RUN npm install --quiet --production --no-progress --registry=${registry:-https://registry.npmjs.org} && npm cache clean --force
RUN npm install -g prisma@1.28.3

ADD ./service /usr/src/app

CMD ["npm", "start"]