FROM node:lts-alpine

EXPOSE 8888

COPY ./server /root/server

WORKDIR /root/server

RUN npm install

ENTRYPOINT ["npm", "run"]
CMD ["start"]