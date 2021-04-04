FROM node:lts-alpine

WORKDIR /backend

# Copy the Package JSON files and install packages
COPY package.json package-lock.json .
RUN npm install

# Copy the rest of the files
COPY . .

# Set some sane default ENV Vars
ENV EXPRESS_PORT=4000
ENV SOCKET_PORT=4003

# Start the server when the container starts
CMD ["node", "start.js"]
