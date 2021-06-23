FROM node:10.24-alpine as builder

RUN npm i npm@latest -g

WORKDIR /app/web

COPY package.json .
COPY package-lock.json .
RUN npm install --quiet --no-progress && npm cache clean --force
COPY . .

RUN npm run build

# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
FROM nginx:1.16.0-alpine
COPY --from=builder /app/web/build /usr/share/nginx/swabx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx-prod.conf /etc/nginx/conf.d/app.conf
COPY nginx/live /usr/share/nginx/live
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
