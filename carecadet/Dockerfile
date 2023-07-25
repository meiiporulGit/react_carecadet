# pull official base image
FROM node:16.15.1-alpine
# FROM node:14.17.6-alpine
# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
RUN npm install react-scripts -g 

# add app
COPY . ./

# start app
CMD ["npm", "start"]