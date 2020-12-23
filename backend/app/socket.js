import WebSocket from 'ws';
import { nanoid } from 'nanoid';

import LobbyList from './lib/LobbyList.js';
import SocketRouter from './lib/SocketRouter.js';

const lobbyList = new LobbyList();

const socketRouter = new SocketRouter(console.log); // TODO: Handle 404

socketRouter.addRoute('GET /lobby', (_, webSocket) => {
  lobbyList.createLobby(webSocket);
});

socketRouter.addRoute('GET /lobby/:id', (req, webSocket) => {
  const result = lobbyList.joinLobby(req.params.id, webSocket);
  if (result === 'no-lobby') {
    webSocket.send('no-lobby');
    webSocket.close();
  }
});

const wss = new WebSocket.Server({
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

wss.on('connection', async (webSocket, request) => {
  // eslint-disable-next-line no-param-reassign
  webSocket.id = await nanoid();
  socketRouter.handleRequest(webSocket, request);

  // TODO: Ping-pong to check for dead clients
  // webSocket.isAlive = true;
  // webSocket.on('pong', () => {
  //   webSocket.isAlive = true;
  // });
});

// TODO: Ping-pong to check for dead clients
// setInterval(() => {
//   // eslint-disable-next-line consistent-return
//   wss.clients.forEach((webSocket) => {
//     if (webSocket.isAlive === false) return webSocket.terminate();

//     webSocket.isAlive = false;
//     webSocket.ping();
//   });
// }, 3000);

// eslint-disable-next-line no-console
console.log(`Socket listening on ${process.env.SOCKET_PORT}`);
