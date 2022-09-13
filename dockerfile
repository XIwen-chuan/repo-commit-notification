FROM node:14.15.0 as builder
COPY . .
RUN npm config set -g registry https://registry.npm.taobao.org
RUN npm install
RUN npm run build
FROM nginx:alpine as server

COPY --from=builder nginx.conf /etc/nginx/nginx.conf
COPY --from=builder dist /var/www/balabala/
WORKDIR /var/www/balabala/