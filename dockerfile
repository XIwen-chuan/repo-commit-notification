FROM node:14.15.0 as builder
COPY . .
RUN npm config set -g registry https://registry.npm.taobao.org
RUN npm install
RUN npm run compile
RUN npm run server

WORKDIR /