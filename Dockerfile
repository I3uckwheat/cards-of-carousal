FROM node:lts-alpine

# Copy the Package JSON files and install packages
COPY backend/package.json backend/package-lock.json /backend/
COPY frontend/package.json frontend/package-lock.json /frontend/

RUN cd /backend \
  && npm install \
  && cd /frontend \
  && npm install

COPY backend/ /backend/
COPY frontend/ /frontend/
ENV EXPRESS_PORT=4000
ENV SOCKET_PORT=4003
ENV REACT_APP_SOCKET_URL=ws://localhost:4003
