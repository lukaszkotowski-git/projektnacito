# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
# create lockfile inside the image (host may not have npm) then install reproducibly
RUN npm install --package-lock-only --silent && npm ci --silent
COPY . ./
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# default nginx config serves index.html; add runtime env injection
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx","-g","daemon off;"]
