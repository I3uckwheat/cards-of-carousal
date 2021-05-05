import socketInstance from '../../socket/socket';
import shuffleArray from '../../helpers/shuffleArray';

function closeGame() {
  socketInstance.closeSocket();
}

function createLobby() {
  socketInstance.createLobby();
}

// TEST ME
function sendPlayerConnectedMessage(payload) {
  socketInstance.sendMessage({
    event: 'update',
    recipients: payload.players,
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

// TEST ME
function playerConnected(payload) {
  const message = payload.playerJoinedMidRound
    ? {
        big: 'A round is in progress',
        small: 'You will begin playing at the start of the next round',
      }
    : {
        big: 'Attempting to join lobby',
        small: 'Please wait',
      };
  socketInstance.sendMessage({
    event: 'update',
    recipients: [payload.playerId],
    payload: {
      gameState: 'connected',
      message,
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

function sendEndOfRoundMessages(payload) {
  const { losers, winnerName, winnerId, czar } = payload;

  socketInstance.sendMessage({
    recipients: [...losers],
    event: 'update',
    payload: {
      gameState: 'showing-end-round-messages',
      message: {
        big: `${winnerName} won this round`,
        small: 'Better luck next time, loser',
      },
    },
  });

  socketInstance.sendMessage({
    recipients: [winnerId],
    event: 'update',
    payload: {
      gameState: 'showing-end-round-messages',
      message: {
        big: 'Hey! You won!',
        small: 'Finally, now wait for the next round!',
      },
    },
  });

  socketInstance.sendMessage({
    recipients: [czar],
    event: 'update',
    payload: {
      gameState: 'showing-end-round-messages',
      message: {
        big: `You selected ${winnerName}`,
        small: "Now it's your turn to win",
      },
    },
  });
}

function sendKickPlayerMessage(payload) {
  socketInstance.sendMessage({
    recipients: [payload.playerId],
    event: 'update',
    payload: {
      gameState: 'player-kicked',
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

function sendCardsToPlayers({
  selectedBlackCard,
  players,
  playerIDs,
  newPlayer,
}) {
  // the fourth object property is passed in from the host reducer to tell this dispatcher
  // that there is a round in progress and current players submitted cards should not be wiped

  playerIDs.forEach((playerID) => {
    if (!players[playerID].isCzar) {
      socketInstance.sendMessage({
        event: 'deal-white-cards',
        payload: {
          cards: players[playerID].cards.map((card) => card.text),
          selectCardCount: selectedBlackCard.pick,
          shouldPreserveGameState: newPlayer && newPlayer !== playerID,
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

function czarSelectWinner({ players, playerIDs }) {
  // identify czar/not czar
  const czar = playerIDs.find((playerID) => players[playerID].isCzar);
  const notCzars = playerIDs.filter((playerID) => !players[playerID].isCzar);

  // gather all players submitted cards
  const submittedCardsOrdered = notCzars.map((playerID) => ({
    playerID,
    cards: players[playerID].submittedCards.map(
      (card) => players[playerID].cards[card].text,
    ),
  }));

  // shuffle the cards
  const submittedCardsShuffled = shuffleArray(submittedCardsOrdered);

  socketInstance.sendMessage({
    event: 'update',
    payload: {
      gameState: 'select-winner',
      submittedCards: submittedCardsShuffled,
      selectCardCount: 1,
    },
    recipients: [czar],
  });

  socketInstance.sendMessage({
    event: 'update',
    payload: {
      gameState: 'waiting-for-czar',
      message: {
        big: 'the czar is selecting',
        small: 'For best results, watch the host screen',
      },
    },
    recipients: notCzars,
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
      playerConnected(payload);
      break;

    case 'SEND_PLAYER_CONNECTED_MESSAGES':
      return sendPlayerConnectedMessage(payload);

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

    case 'CZAR_SELECT_WINNER':
      czarSelectWinner(payload);
      break;

    case 'SEND_END_OF_ROUND_MESSAGES':
      sendEndOfRoundMessages(payload);
      break;

    default:
      break;
  }
  return dispatch({ type, payload });
}
