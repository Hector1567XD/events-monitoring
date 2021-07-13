FROM node:13

WORKDIR /app

# Cache del Package .json
COPY package.json package.json
RUN npm install

COPY . .

EXPOSE 3000

RUN npm install -g nodemon

CMD [ "npm", "start" ]
