FROM node
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run compile
FROM nginx:alpine as server
EXPOSE 3000
CMD npm run serve