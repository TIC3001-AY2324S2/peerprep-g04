FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 3003

COPY . .

CMD ["npm", "start"]