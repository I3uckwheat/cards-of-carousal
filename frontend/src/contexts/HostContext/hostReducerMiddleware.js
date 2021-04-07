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

function dealWhiteCards({ deck, playerIDs, selectedBlackCard, cardsToDeal }) {
  const removedCards = [];
  const newWhiteCards = [...deck.white];
  const numberOfTotalDraws = cardsToDeal * playerIDs.length;

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
    const cardsToBeDealt = [];
    for (let i = 0; i < cardsToDeal; i += 1) {
      cardsToBeDealt.push(removedCards.pop());
    }
    socketInstance.sendMessage({
      event: 'deal-white-cards',
      payload: {
        cards: cardsToBeDealt,
        selectCardCount: selectedBlackCard.pick,
      },
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

    case 'DEAL_WHITE_CARDS': {
      // check if payload contains necessary properties
      const requiredProperties = [
        'deck',
        'playerIDs',
        'selectedBlackCard',
        'cardsToDeal',
      ];
      if (requiredProperties.every((property) => property in payload)) {
        const deck = dealWhiteCards(payload);
        return dispatch({
          type: 'SET_DECK',
          payload: { deck },
        });
      }
      throw new Error(
        `DEAL_WHITE_CARDS action requires the following properties in the payload: ${requiredProperties.join(
          ', ',
        )}. Received: ${Object.keys(payload).join(', ')}`,
      );
    }
    default:
      break;
  }
  return dispatch({ type, payload });
}
