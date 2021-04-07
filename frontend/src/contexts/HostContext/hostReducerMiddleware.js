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
  try {
    const apiURL = process.env.REACT_APP_API_URL;
    const query = selectedPacks.join(',');
    const cardsRequest = await fetch(`${apiURL}/deck/cards?packs=${query}`);
    const cards = await cardsRequest.json();
    return cards;
  } catch (err) {
    throw new Error(err);
  }
}

function dealWhiteCards({ deck, playerIDs, selectedBlackCard }) {
  const removedCards = [];
  const newWhiteCards = [...deck.white];
  const numberOfTotalDraws = selectedBlackCard.pick * playerIDs.length;

  // Draw all cards needed to deal, and remove them from the deck
  for (let i = 0; i < numberOfTotalDraws; i += 1) {
    // select random card
    const selection = Math.floor(Math.random() * newWhiteCards.length);
    // this both pushes the random card into the "drawn" pile, and removes the card
    // from the new white card array
    removedCards.push(newWhiteCards.splice(selection, 1)[0]);
  }

  // pass the correct number of random cards to each player
  playerIDs.forEach((player) => {
    const cardsToDeal = [];
    for (let i = 0; i < selectedBlackCard.pick; i += 1) {
      cardsToDeal.push(removedCards.pop());
    }
    socketInstance.sendMessage({
      event: 'deal-white-cards',
      payload: cardsToDeal,
      recipients: [player],
    });
  });

  // update the state with the new white cards pile
  return {
    ...deck,
    white: newWhiteCards,
  };
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

    case 'SET_DECK': {
      const deck = await getDeck(payload);
      return dispatch({
        type: 'SET_DECK',
        payload: { deck },
      });
    }

    case 'DEAL_WHITE_CARDS': {
      const deck = dealWhiteCards(payload);
      return dispatch({
        type: 'SET_DECK',
        payload: { deck },
      });
    }
    default:
      break;
  }
  return dispatch({ type, payload });
}
