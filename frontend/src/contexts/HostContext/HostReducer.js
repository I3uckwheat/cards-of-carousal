/* eslint-disable no-use-before-define */
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

  // get all active players (not disconnected or waiting to join)
  const activePlayerIDs = playerIDs.filter(
    (playerID) => players[playerID].status === 'playing',
  );

  const neededCardsPerPlayer = activePlayerIDs.map((playerID) => {
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
    players: { ...players, ...newPlayers }, // keep players that are not currently active
    gameState: 'waiting-to-receive-cards',
    czarSelection: '',
  };
}

function playerConnected(state, { playerId, playerName }) {
  // push the new player to the players object, but do not put them in play yet
  const newPlayer = {
    name: playerName,
    score: 0,
    isCzar: false,
    submittedCards: [0],
    cards: [],
    status: 'staging',
  };
  return {
    ...state,
    players: {
      ...state.players,
      [playerId]: newPlayer,
    },
    playerIDs: [...state.playerIDs, playerId],
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

  newState.gameState = playerIDs.every(
    (playerID) =>
      players[playerID].isCzar ||
      players[playerID].submittedCards.length ||
      players[playerID].status !== 'playing',
  )
    ? 'czar-select-winner'
    : newState.gameState;

  return newState;
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

function disconnectPlayer(state, { playerId }) {
  const removingCzar = state.players[playerId]?.isCzar;

  // add conditional to check if the player is disconnecting due to duplicate name
  if (!state.playerIDs.includes(playerId)) {
    return state;
  }

  const newState = {
    ...state,
    players: {
      ...state.players,
      [playerId]: {
        ...state.players[playerId],
        status: 'disconnected',
      },
    },
  };

  if (
    removingCzar &&
    state.playerIDs.filter((id) =>
      ['playing', 'staging'].includes(state.players[id].status),
    ).length > 1 &&
    !['game-over', 'showing-winning-cards'].includes(state.gameState)
  ) {
    return dealWhiteCards(
      clearSubmittedCards(
        addPlayersFromStaging(
          removeSubmittedCards(setNextCzar(setBlackCard(newState))),
        ),
      ),
    );
  }
  return newState;
}

function kickPlayer(state, { playerId }) {
  const removingCzar = state.players[playerId]?.isCzar;

  // Removes the value playerId from the original playerIDs array
  const newPlayerIds = state.playerIDs.filter(
    (playerID) => playerID !== playerId,
  );

  // Removes the property [playerId] from the original players object
  const { [playerId]: disconnectedPlayer, ...newPlayers } = {
    ...state.players,
  };

  const newState = {
    ...state,
    players: newPlayers,
    playerIDs: newPlayerIds,
  };

  if (
    removingCzar &&
    newPlayerIds.filter((id) =>
      ['playing', 'staging'].includes(state.players[id].status),
    ).length > 1 &&
    !['game-over', 'showing-winning-cards'].includes(state.gameState)
  ) {
    return dealWhiteCards(
      clearSubmittedCards(
        addPlayersFromStaging(
          removeSubmittedCards(setNextCzar(setBlackCard(newState))),
        ),
      ),
    );
  }
  return newState;
}

function kickPlayers(state, { players }) {
  let newState = { ...state };
  players.forEach((playerId) => {
    newState = kickPlayer(newState, { playerId });
  });
  return newState;
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

function winnerSelected(state) {
  const roundWinner = state.players[state.czarSelection];

  return {
    ...state,
    gameState: 'showing-winning-cards',
    players: {
      ...state.players,
      [state.czarSelection]: {
        ...roundWinner,
        score: roundWinner.score + 1,
      },
    },
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
  // if there is currently a czar, set the czar to the next connected player in the array
  // else, pick a random czar
  const { players, playerIDs } = state;

  if (playerIDs.length) {
    // find the current czar
    const currentCzar = playerIDs.find((player) => players[player].isCzar);
    // create a list of valid selections for next czar
    const connectedPlayerIDs = playerIDs.filter(
      (id) => players[id].status === 'playing',
    );

    // set the new czar to the old one + 1 in the array, or zero if at the end
    const nextIndex =
      connectedPlayerIDs.indexOf(currentCzar) < connectedPlayerIDs.length - 1
        ? connectedPlayerIDs.indexOf(currentCzar) + 1
        : 0;

    // set the czar to the next one in order, or pick at random
    const newCzar = currentCzar
      ? connectedPlayerIDs[nextIndex]
      : connectedPlayerIDs[
          Math.floor(Math.random() * connectedPlayerIDs.length)
        ];

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

  newState.playerIDs.forEach((player) => {
    if (newState.players[player].status === 'staging') {
      newState.players[player].status = 'playing';
    }
  });

  return {
    ...newState,
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

function gameOver(state, { gameWinner }) {
  return {
    ...state,
    gameState: 'game-over',
    gameWinner,
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
      return disconnectPlayer(state, payload);

    case 'PLAYER_SUBMIT':
      return playerSubmitCards(state, payload);

    case 'KICK_PLAYER':
      return kickPlayer(state, payload);

    case 'SKIP_UNSUBMITTED_PLAYERS':
    case 'CZAR_SELECT_WINNER':
      return czarSelectWinner(state);

    case 'PREVIEW_WINNER':
      return previewWinner(state, payload);

    case 'WINNER_SELECTED':
      return winnerSelected(state);

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
      return kickPlayers(state, payload);

    case 'GAME_OVER':
      return gameOver(state, payload);

    default:
      return { ...state };
  }
}

export default HostReducer;
