FROM node:12.18.4

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

# copy . .