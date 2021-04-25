import socketInstance from '../../socket/socket';

function joinLobby(payload) {
  socketInstance.joinLobby(payload.lobbyId, payload.playerName);
}

function submitCards(payload) {
  socketInstance.sendMessage({ event: 'player-submit', payload });
}

function previewWinner(payload) {
  socketInstance.sendMessage({ event: 'preview-winner', payload });
}

function submitWinner(payload) {
  socketInstance.sendMessage({ event: 'select-winner', payload });
}

export default async function playerReducerMiddleware(
  { type, payload },
  dispatch,
) {
  switch (type) {
    case `JOIN_LOBBY`:
      joinLobby(payload);
      break;

    case `SUBMIT_CARDS`:
      submitCards(payload);
      break;

    case 'PREVIEW_WINNER':
      previewWinner(payload);
      break;

    case 'SUBMIT_WINNER':
      submitWinner(payload);
      break;

    default:
      break;
  }
  dispatch({ type, payload });
}
