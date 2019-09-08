FROM node:12

# Create app directory
WORKDIR /app

COPY package.json /app

RUN npm install

# Bundle app source
COPY . /app

CMD [ "npm", "start" ]

EXPOSE 4444