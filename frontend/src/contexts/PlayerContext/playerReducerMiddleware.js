import socketInstance from '../../socket/socket';

function submitCards(payload) {
  socketInstance.sendMessage({ event: 'player-submit', payload });
}

function previewWinner(payload) {
  socketInstance.sendMessage({ event: 'preview-winner', payload });
}

export default async function playerReducerMiddleware(
  { type, payload },
  dispatch,
) {
  switch (type) {
    case `SUBMIT_CARDS`:
      submitCards(payload);
      break;

    case 'PREVIEW_WINNER':
      previewWinner(payload);
      break;

    default:
      break;
  }
  dispatch({ type, payload });
}
