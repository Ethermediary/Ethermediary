# pull official base image
FROM node:13.12.0-alpine

RUN apk add --no-cache git

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package* ./
RUN npm install

# add app
COPY . ./

EXPOSE 8001

# start app
CMD ["npm", "start"]
