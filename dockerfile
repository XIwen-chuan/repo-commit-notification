FROM node
WORKDIR /app
COPY package*.json /app/
COPY src /app/src
RUN npm install
RUN npm run compile
COPY . .
EXPOSE 3000
CMD npm run serve