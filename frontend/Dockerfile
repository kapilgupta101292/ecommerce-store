# use node image as the base image.
FROM node:12

# create and change to Working directory
WORKDIR /usr/src/app

# install app dependencies

COPY package*.json ./

# install dependencies
RUN npm ci

# copy sources
COPY . .

# build app
RUN npm run build

# expose port 3000 for the server
EXPOSE 3000

# run npm script
CMD [ "npm", "run", "start" ]