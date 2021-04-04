#
# Frontend Dockerfile
#
# Uses a multi-stage build to build frontend and serve the
# static files via an Nginx Container
#

# Stage 1: Build the frontend
FROM node:lts-alpine AS builder

WORKDIR /frontend
COPY package.json package-lock.json /frontend/
RUN npm install
COPY . .

ENV REACT_APP_SOCKET_URL=wss://socket.carousal.cards
ENV REACT_APP_API_URL=https://api.carousal.cards

RUN npm run build

# Stage 2: Serve the build directory
FROM nginx:alpine as server
COPY --from=builder /frontend/build /usr/share/nginx/html
