FROM node:14-alpine as builder

WORKDIR /usr/share/app
COPY package.json .
RUN npm install 
COPY . .
RUN npm run build


FROM nginx:stable-alpine

COPY ./setup/container/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/share/app/build/ /usr/share/nginx/html