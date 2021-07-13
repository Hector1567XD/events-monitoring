FROM node:13

WORKDIR /app

# Cache del Package .json
COPY package.json package.json
RUN npm install

#COPY ["package.json", "package-lock.json*", "./"]
#RUN npm install --no-package-lock
# RUN npm install --production --silent && mv node_modules ../ #(Reference)

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
