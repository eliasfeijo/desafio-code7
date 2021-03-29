FROM node:14.16.0-alpine

WORKDIR /usr/src/backend

COPY . /usr/src/backend
RUN yarn install

EXPOSE 3001

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

CMD /wait && yarn start