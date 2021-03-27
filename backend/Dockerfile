FROM node:14.16.0-alpine

RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend

COPY . /usr/src/backend
RUN yarn install

EXPOSE 3001
CMD ["yarn", "start"]