function createLobby(state) {
  return {
    ...state,
    gameState: 'waiting-for-players',
  };
}

function getPacks(state) {
  return {
    ...state,
    loading: [...state.loading, 'getting-packs'],
  };
}

function packsReceived(state) {
  return {
    ...state,
    loading: state.loading.filter(
      (loadingVal) => loadingVal !== 'getting-packs',
    ),
  };
}

function clearSubmittedCards(state) {
  const newState = { ...state };
  const { playerIDs, players } = newState;
  playerIDs.forEach((playerID) => {
    players[playerID].submittedCards = [];
  });

  return newState;
}

function dealWhiteCards(state) {
  const {
    deck,
    playerIDs,
    players,
    gameSettings: { handSize },
  } = state;
  const newWhiteCards = [...deck.white];

  const neededCardsPerPlayer = playerIDs.map((playerID) => {
    const player = players[playerID];
    return {
      playerID,
      cardsNeeded: handSize - player.cards.length,
    };
  });

  const cardsGivenToPlayers = neededCardsPerPlayer.map(
    ({ playerID, cardsNeeded }) => {
      const newCards = [...players[playerID].cards];
      for (let i = 0; i < cardsNeeded; i += 1) {
        const selection = Math.floor(Math.random() * newWhiteCards.length);
        newCards.push(newWhiteCards.splice(selection, 1)[0]);
      }
      return {
        playerID,
        cards: newCards,
      };
    },
  );

  const newPlayers = cardsGivenToPlayers.reduce((acc, { playerID, cards }) => {
    acc[playerID] = {
      ...players[playerID],
      cards,
    };
    return acc;
  }, {});

  return {
    ...state,
    deck: {
      black: [...deck.black],
      white: newWhiteCards,
    },
    players: newPlayers,
    gameState: 'waiting-to-receive-cards',
  };
}

function playerConnected(state, { playerId, playerName }) {
  // push the new player to the staging array
  const newPlayer = {
    playerId,
    name: playerName,
    score: 0,
    isCzar: false,
    submittedCards: [0],
    cards: [],
  };
  return {
    ...state,
    newPlayerStaging: [...state.newPlayerStaging, newPlayer],
  };
}

function playerSubmitCards(state, { selectedCards, playerId }) {
  const newState = {
    ...state,
    players: {
      ...state.players,
      [playerId]: {
        ...state.players[playerId],
        submittedCards: selectedCards,
      },
    },
  };

  const { players, playerIDs } = newState;

  return {
    ...newState,
    gameState: playerIDs.every(
      (playerID) =>
        players[playerID].isCzar || players[playerID].submittedCards.length,
    )
      ? 'czar-select-winner'
      : newState.gameState,
  };
}

function removeSubmittedCards(state) {
  const { players, playerIDs } = state;
  const newPlayers = playerIDs.reduce((acc, playerId) => {
    const player = players[playerId];

    const newCards = player.cards?.filter(
      (card, index) => !player.submittedCards?.includes(index),
    );

    return {
      ...acc,
      [playerId]: {
        ...player,
        cards: newCards,
      },
    };
  }, {});

  return {
    ...state,
    players: newPlayers,
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

function czarSelectWinner(state) {
  return {
    ...state,
    gameState: 'selecting-winner',
  };
}

function previewWinner(state, { highlightedPlayerID }) {
  if (state.gameState === 'selecting-winner') {
    return {
      ...state,
      czarSelection: highlightedPlayerID,
    };
  }
  return {
    ...state,
  };
}

function selectWinner(state) {
  return {
    ...state,
    gameState: 'showing-winning-cards',
  };
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

function setBlackCard(state) {
  const { deck } = state;
  const selectedCard =
    deck.black[Math.floor(Math.random() * state.deck.black.length)];

  const updatedBlackCards = [...state.deck.black];
  updatedBlackCards.splice(updatedBlackCards.indexOf(selectedCard), 1);

  return {
    ...state,
    deck: {
      ...deck,
      black: updatedBlackCards,
    },
    selectedBlackCard: selectedCard,
  };
}

function getDeck(state) {
  return {
    ...state,
    loading: [...state.loading, 'getting-deck'],
  };
}

function setDeck(state, { deck }) {
  return {
    ...state,
    deck,
    loading: state.loading.filter(
      (loadingVal) => loadingVal !== 'getting-deck',
    ),
  };
}

function getJoinCode(state) {
  return {
    ...state,
    loading: [...state.loading, 'join-code'],
  };
}

function updateJoinCode(state, { lobbyID }) {
  return {
    ...state,
    lobbyID,
    loading: state.loading.filter((loadingVal) => loadingVal !== 'join-code'),
  };
}

function addPlayersFromStaging(state) {
  const newState = { ...state };

  state.newPlayerStaging.forEach((player) => {
    newState.playerIDs = [...newState.playerIDs, player.playerId];

    // remove the id from the player object
    const playerData = Object.entries(player).reduce((acc, [key, value]) => {
      if (key !== 'playerId') acc[key] = value;
      return acc;
    }, {});

    newState.players = {
      ...newState.players,
      [player.playerId]: playerData,
    };
  });

  return {
    ...newState,
    newPlayerStaging: [],
  };
}

function toggleJoinCode(state) {
  return {
    ...state,
    gameSettings: {
      ...state.gameSettings,
      hideJoinCode: !state.gameSettings.hideJoinCode,
    },
  };
}

function removeLastPlayerFromStaging(state) {
  return {
    ...state,
    newPlayerStaging: state.newPlayerStaging.slice(
      0,
      state.newPlayerStaging.length - 1,
    ),
  };
}

function HostReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'CREATE_LOBBY':
      return createLobby(state);

    case 'GET_PACKS':
      return getPacks(state);

    case 'PACKS_RECEIVED':
      return packsReceived(state);

    case 'PLAYER_CONNECTED':
      return playerConnected(state, payload);

    case 'PLAYER_DISCONNECTED':
      return removePlayer(state, payload);

    case 'PLAYER_SUBMIT':
      return playerSubmitCards(state, payload);

    case 'KICK_PLAYER':
      return removePlayer(state, payload);

    case 'SKIP_UNSUBMITTED_PLAYERS':
    case 'CZAR_SELECT_WINNER':
      return czarSelectWinner(state);

    case 'PREVIEW_WINNER':
      return previewWinner(state, payload);

    case 'SELECT_WINNER':
      return selectWinner(state, payload);

    case 'SET_LOBBY_ID':
      return setLobbyId(state, payload);

    case 'START_GAME':
      return startGame(state);

    case 'SET_GAME_SETTINGS':
      return setGameSettings(state, payload);

    case 'SET_NEXT_CZAR':
      return setNextCzar(state);

    case 'SELECT_BLACK_CARD':
      return setBlackCard(state);

    case 'GET_DECK':
      return getDeck(state);

    case 'SET_DECK':
      return setDeck(state, payload);

    case 'DEAL_WHITE_CARDS':
      return dealWhiteCards(clearSubmittedCards(state));

    case 'REMOVE_SUBMITTED_CARDS_FROM_PLAYER':
      return removeSubmittedCards(state);

    case 'SHUFFLE_JOIN_CODE':
      return getJoinCode(state);

    case 'UPDATE_JOIN_CODE':
      return updateJoinCode(state, payload);

    case 'ADD_PLAYERS_FROM_STAGING':
      return addPlayersFromStaging(state);

    case 'TOGGLE_JOIN_CODE_VISIBILITY':
      return toggleJoinCode(state);

    case 'TOO_MANY_PLAYERS':
      return removeLastPlayerFromStaging(state);

    default:
      return { ...state };
  }
}

export default HostReducer;
