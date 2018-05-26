FROM alpine:3.7 as SystemOS
RUN apk add --no-cache nodejs nodejs-npm
EXPOSE 8080

FROM SystemOS 
ENV DB_HOST=
ENV DB_USER=
ENV DB_PASS=

COPY './package.json' '/app/package.json'
COPY './src/' '/app/src/'
RUN npm i -g pm2
RUN cd app && npm i

CMD cd app && npm run container