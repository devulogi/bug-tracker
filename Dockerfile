FROM node:19-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . . --exclude-from=.dockerignore
CMD ["npm", "run", "start:dev"]
