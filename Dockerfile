FROM node:20-alpine
WORKDIR /app
COPY . .    

RUN npm install

COPY .env ./

CMD ["npm", "run", "start:dev"]