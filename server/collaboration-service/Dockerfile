FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 3004

COPY . .

CMD ["npm", "start"]