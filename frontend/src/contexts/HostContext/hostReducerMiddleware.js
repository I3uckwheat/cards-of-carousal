import socketInstance from '../../socket/socket';

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
      removeLoading: 'joining-lobby',
    },
  });
}

function sendCardsSubmittedMessage(payload) {
  socketInstance.sendMessage({
    event: 'update',
    recipients: [payload.playerId],
    payload: {
      gameState: 'cards-submitted',
      message: {
        big: 'WAIT FOR OTHER PLAYERS',
        small: 'Yell at them to hurry up if you wish',
      },
      removeLoading: 'submitting-cards',
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

async function getDeck({ selectedPacks }) {
  const apiURL = process.env.REACT_APP_API_URL;
  const queryString = selectedPacks.join(',');
  const query = `${apiURL}/deck/cards?packs=${queryString}`;
  try {
    const cardsRequest = await fetch(query);
    const cards = await cardsRequest.json();
    return cards;
  } catch {
    throw new Error(`Error fetching cards. Query: ${query}`);
  }
}

function sendCardsToPlayers({ selectedBlackCard, players, playerIDs }) {
  playerIDs.forEach((playerID) => {
    if (!players[playerID].isCzar) {
      socketInstance.sendMessage({
        event: 'deal-white-cards',
        payload: {
          cards: players[playerID].cards.map((card) => card.text),
          selectCardCount: selectedBlackCard.pick,
        },
        recipients: [playerID],
      });
    }
  });
}

function sendShuffleJoinCodeMessage() {
  socketInstance.sendMessage({
    event: 'shuffle-join-code',
    payload: {},
  });
}

function notifyCzar({ players, playerIDs }) {
  const czar = playerIDs.find((player) => players[player].isCzar);

  if (czar) {
    socketInstance.sendMessage({
      event: 'update',
      payload: {
        gameState: 'waiting-for-player-card-submissions',
        message: {
          big: "You're the Czar",
          small: 'Wait for the players to select their cards',
        },
      },
      recipients: [czar],
    });
  } else {
    throw new Error('Czar not found!');
  }
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

    case 'PLAYER_SUBMIT':
      sendCardsSubmittedMessage(payload);
      break;

    case 'KICK_PLAYER':
      sendKickPlayerMessage(payload);
      break;

    case 'SET_DECK': {
      const deck = await getDeck(payload);
      return dispatch({
        type: 'SET_DECK',
        payload: { deck },
      });
    }

    case 'SEND_CARDS_TO_PLAYERS':
      return sendCardsToPlayers(payload);

    case 'SHUFFLE_JOIN_CODE':
      sendShuffleJoinCodeMessage();
      break;

    case 'NOTIFY_CZAR':
      notifyCzar(payload);
      break;

    default:
      break;
  }
  return dispatch({ type, payload });
}
