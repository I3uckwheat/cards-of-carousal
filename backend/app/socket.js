import WebSocket from "ws";
console.log('open')
console.log(process.env.SOCKET_PORT)

const wss = new WebSocket.Server({
  verifyClient: (info, done) => {
    // CORS check
    const originRegex = new RegExp(`${process.env.CORS_ORIGIN_DOMAIN}$`);
    const origin = info.req.headers.origin;
    if(!origin || !originRegex.test(info.req.headers.origin)) {
      return done(false);
    }
  },
  port: process.env.SOCKET_PORT
});

wss.on('connection', ws => {
  ws.isAlive = true;
  ws.on('pong', () => ws.isAlive = true); 
});

const interval = setInterval(function() {
  wss.clients.forEach(function(ws) {
    if(ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  })
}, 3000)

console.log(`Socket listening on ${process.env.SOCKET_PORT}`);
