FROM node:alpine as build
WORKDIR /dashboard
COPY . .
RUN yarn
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /dashboard/dist /usr/share/nginx/html
COPY --from=build /dashboard/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]