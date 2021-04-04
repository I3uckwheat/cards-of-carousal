#
# Dockerfile to build the backend
#

FROM node:lts-alpine

# Copy the Package JSON files and install packages
COPY backend/package.json backend/package-lock.json /backend/

RUN cd /backend \
  && npm install

# Copy the rest of the files
COPY backend /backend/

# Set some sane default ENV Vars
ENV EXPRESS_PORT=4000
ENV SOCKET_PORT=4003

# Start the server when the container starts
CMD ["node", "/backend/start.js"]
