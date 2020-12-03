FROM node:12

WORKDIR /usr/app/backend

COPY package*.json ./

RUN npm i
COPY . .

CMD ["npm", "run", "start"]
