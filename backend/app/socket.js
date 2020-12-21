/* eslint-disable no-param-reassign */
import WS from 'ws';
import { nanoid } from 'nanoid';

// import lobbyList from './lib/LobbyList.js';
import SocketRouter from './lib/SocketRouter.js';

const WebSocketServer = WS.Server;
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

const socketRouter = new SocketRouter(console.log);
// socketRouter.addRoute('GET /lobby', (req, webSocket) => lobbyList.createLobby(webSocket));
socketRouter.addRoute('GET /lobby', (req, webSocket) => console.log(`create lobby with host: ${webSocket.id}`));
socketRouter.addRoute('GET /lobby/:id', (req, webSocket) => console.log(`attach socketId: "${webSocket.id}" to lobbyId: "${req.params.id}"`));

wss.on('connection', async (webSocket, request) => {
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
