FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 3003

ENV AMQP_URL=amqp://guest:guest@rabbitmq:5672

COPY . .

CMD ["npm", "start"]