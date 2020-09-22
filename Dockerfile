FROM node:10-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV REACT_APP_TWITTER_API_KEY=""
ENTRYPOINT ["npm", "start"]