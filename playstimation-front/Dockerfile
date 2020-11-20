FROM node:14

WORKDIR /usr/app/frontend

COPY package*.json ./

RUN npm i
COPY . .

CMD ["npm", "run", "serve"]
