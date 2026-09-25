# Stage 1: Build the React application with Vite
FROM node:20-alpine AS build
WORKDIR /app

# Accept Vite build-time environment arguments
ARG VITE_BACKEND_URL
ARG VITE_REACT_FRONT_END_URL
ARG VITE_REACT_SUBDOMAIN

# Pass them to environment so Vite can bake them into dist
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_REACT_FRONT_END_URL=$VITE_REACT_FRONT_END_URL
ENV VITE_REACT_SUBDOMAIN=$VITE_REACT_SUBDOMAIN

# Cache dependencies
COPY package*.json ./
RUN npm ci || npm install

# Copy source and build production bundle
COPY . .
RUN npm run build

# Stage 2: Serve statically with lightweight Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Clean default static assets
RUN rm -rf ./*

# Copy built distribution
COPY --from=build /app/dist .

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
