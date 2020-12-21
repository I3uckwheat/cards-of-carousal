/* eslint-disable no-param-reassign */
import { Server as WebSocketServer } from 'ws';
import LobbyList from './lib/LobbyList.js';

const lobbyList = new LobbyList();

const wss = new WebSocketServer({
  // TODO: Enable when CORS is implemented

  // verifyClient: (info, done) => {
  //   // CORS check
  //   const originRegex = new RegExp(`${process.env.CORS_ORIGIN_DOMAIN}$`);
  //   const { origin } = info.req.headers;
  //   if (!origin || !originRegex.test(info.req.headers.origin)) {
  //     return done(false);
  //   }
  //   return done(true);
  // },
  port: process.env.SOCKET_PORT,
});

wss.on('connection', (webSocket) => {
  webSocket.isAlive = true;
  webSocket.on('pong', () => {
    webSocket.isAlive = true;
  });
});

setInterval(() => {
  // eslint-disable-next-line consistent-return
  wss.clients.forEach((webSocket) => {
    if (webSocket.isAlive === false) return webSocket.terminate();

    webSocket.isAlive = false;
    webSocket.ping();
  });
}, 3000);

// eslint-disable-next-line no-console
console.log(`Socket listening on ${process.env.SOCKET_PORT}`);
