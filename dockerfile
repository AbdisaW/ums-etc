FROM node:24

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*
WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm" ,"start"]