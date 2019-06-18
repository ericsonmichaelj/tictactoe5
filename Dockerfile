FROM alpine
LABEL maintainer="ericson.michael.j@gmail.com"
RUN apk add --update nodejs nodejs-npm
COPY . /src 
WORKDIR /src
RUN npm install
EXPOSE 8080
ENTRYPOINT ["node", "./server.js"]
