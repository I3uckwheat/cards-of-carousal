/* eslint-disable */
function createLobby(state) {
  return {
    ...state,
    gameState: 'waiting-for-players',
  };
}

function playerConnected(state, { playerId, playerName }) {
  return {
    ...state,
    players: {
      ...state.players,
      [playerId]: {
        name: playerName,
        score: 0,
        isCzar: false,
        submittedCards: [0],
        cards: [],
      },
    },
    playerIDs: [...state.playerIDs, playerId],
  };
}

function updatePlayerCards(state, { selectedCards, playerId }) {
  return {
    ...state,
    players: {
      ...state.players,
      [playerId]: {
        ...state.players[playerId],
        submittedCards: selectedCards,
      },
    },
  };
}

function removePlayer(state, { playerId }) {
  // Removes the value playerId from the original playerIDs array
  const newPlayerIds = state.playerIDs.filter(
    (playerID) => playerID !== playerId,
  );

  // Removes the property [playerId] from the original players object
  const { [playerId]: disconnectedPlayer, ...newPlayers } = {
    ...state.players,
  };

  return {
    ...state,
    players: newPlayers,
    playerIDs: newPlayerIds,
  };
}

function selectWinner(state, payload) {
  // TODO: HANDLE MESSAGE
  // eslint-disable-next-line no-console
  console.log(state, payload);
}
function setLobbyId(state, { id }) {
  return {
    ...state,
    lobbyID: id,
  };
}

function startGame(state) {
  // remove dummy submitted cards
  const newPlayers = Object.entries(state.players).reduce((acc, [key, val]) => {
    acc[key] = { ...val };
    acc[key].submittedCards = [];
    return acc;
  }, {});
  return {
    ...state,
    gameState: 'waiting-for-deck',
    players: newPlayers,
  };
}

function setGameSettings(state, { gameSettings }) {
  return {
    ...state,
    gameSettings,
  };
}

function setNextCzar(state) {
  // if there is currently a czar, set the czar to the next player in the array
  // else, pick a random czar
  const { players, playerIDs } = state;

  if (playerIDs.length) {
    // find the current czar
    const currentCzar = playerIDs.find((player) => players[player].isCzar);

    // set the new czar to the old one + 1 in the array, or zero if at the end
    const nextIndex =
      playerIDs.indexOf(currentCzar) < playerIDs.length - 1
        ? playerIDs.indexOf(currentCzar) + 1
        : 0;

    // set the czar to the next one in order, or pick at random
    const newCzar = currentCzar
      ? playerIDs[nextIndex]
      : playerIDs[Math.floor(Math.random() * playerIDs.length)];

    // set the new czar in the players object.
    const newPlayers = Object.entries(players).reduce((acc, [key, val]) => {
      acc[key] = { ...val };
      acc[key].isCzar = false;
      return acc;
    }, {});

    return {
      ...state,
      players: {
        ...newPlayers,
        [newCzar]: {
          ...newPlayers[newCzar],
          isCzar: true,
        },
      },
    };
  }

  // If there are no players, return unaltered state
  return { ...state };
}

function closeGame(state) {
  return {
    ...state,
  };
}

function setBlackCard(state) {
  const selectedCard =
    state.deck.black[Math.floor(Math.random() * state.deck.black.length)];

  const updatedBlackCards = state.deck.black.filter(
    (card) => card.text !== selectedCard.text,
  );

  return {
    ...state,
    deck: {
      ...state.deck,
      black: updatedBlackCards,
    },
    selectedBlackCard: selectedCard,
  };
}
function setDeck(state, { deck }) {
  return {
    ...state,
    deck,
  };
}

function HostReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'CREATE_LOBBY':
      return createLobby(state);

    case 'PLAYER_CONNECTED':
      return playerConnected(state, payload);

    case 'PLAYER_DISCONNECTED':
      return removePlayer(state, payload);

    case 'PLAYER_SUBMIT':
      return updatePlayerCards(state, payload);

    case 'KICK_PLAYER':
      return removePlayer(state, payload);

    case 'SELECT_WINNER':
      // TODO: HANDLE PAYLOAD AND TEST
      return selectWinner(state, payload);

    case 'SET_LOBBY_ID':
      return setLobbyId(state, payload);

    case 'START_GAME':
      return startGame(state);

    case 'SET_GAME_SETTINGS':
      return setGameSettings(state, payload);

    case 'SET_NEXT_CZAR':
      return setNextCzar(state);

    case 'CLOSE_GAME':
      return closeGame(state);

    case 'SELECT_BLACK_CARD':
      return setBlackCard(state);
    case 'SET_DECK':
      return setDeck(state, payload);

    default:
      return { ...state };
  }
}

export default HostReducer;
