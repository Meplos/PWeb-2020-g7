FROM node:14

WORKDIR /usr/app/backend

COPY package*.json ./

RUN npm i
COPY . .

CMD ["npm", "run", "start"]
