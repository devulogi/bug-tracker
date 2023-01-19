FROM node:19-alpine
WORKDIR /app
COPY package.json app
RUN npm install
COPY . /app --exclude-from=.dockerignore
CMD ["npm", "run", "start:dev"]
