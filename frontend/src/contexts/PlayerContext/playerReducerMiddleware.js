import socketInstance from '../../socket/socket';

function submitCards(payload) {
  socketInstance.sendMessage({ event: 'player-submit', payload });
}

export default async function playerReducerMiddleware(
  { type, payload },
  dispatch,
) {
  switch (type) {
    case `SUBMIT_CARDS`:
      submitCards(payload);
      break;

    default:
      break;
  }
  dispatch({ type, payload });
}
