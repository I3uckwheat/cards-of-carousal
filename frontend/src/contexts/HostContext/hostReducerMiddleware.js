import socketInstance from '../../socket/socket';
// TODO tests coming in hotfix
function closeGame() {
  socketInstance.closeSocket();
}

function createLobby() {
  socketInstance.createLobby();
}

function sendPlayerConnectedMessage(payload) {
  socketInstance.sendMessage({
    event: 'update',
    recipients: [payload.playerId],
    payload: {
      gameState: 'connected',
      message: {
        big: "You've joined the lobby",
        small: 'Please wait for the host to start the game',
      },
    },
  });
}

function sendKickPlayerMessage(payload) {
  socketInstance.sendMessage({
    recipients: [payload.playerId],
    event: 'update',
    payload: {
      message: {
        big: "You've been kicked!",
        small: 'Take off, you hoser!',
      },
    },
  });
}

export default async function hostReducerMiddleware(
  { type, payload },
  dispatch,
) {
  switch (type) {
    case `CLOSE_GAME`:
      closeGame();
      break;

    case 'CREATE_LOBBY':
      createLobby();
      break;

    case 'PLAYER_CONNECTED':
      sendPlayerConnectedMessage(payload);
      break;

    case 'KICK_PLAYER':
      sendKickPlayerMessage(payload);
      break;
    default:
      break;
  }
  dispatch({ type, payload });
}
