FROM node:20-alpine AS builder

WORKDIR /app

# 1. Deklaracja argumentów przekazanych z docker-compose
ARG VITE_API_URL
ARG VITE_DIRECTUS_URL
ARG VITE_CHAT_PROVIDER
ARG VITE_OPENROUTER_API_KEY
ARG VITE_OPENAI_API_KEY
ARG VITE_OPENAI_MODEL

# 2. Przekazanie ich jako zmienne środowiskowe dla procesu budowania
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_DIRECTUS_URL=$VITE_DIRECTUS_URL
ENV VITE_CHAT_PROVIDER=$VITE_CHAT_PROVIDER
ENV VITE_OPENROUTER_API_KEY=$VITE_OPENROUTER_API_KEY
ENV VITE_OPENAI_API_KEY=$VITE_OPENAI_API_KEY
ENV VITE_OPENAI_MODEL=$VITE_OPENAI_MODEL

COPY react-app/package*.json ./
RUN npm install

COPY react-app/ .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
