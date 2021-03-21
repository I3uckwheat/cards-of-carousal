import React from 'react';
import PropTypes from 'prop-types';

import OptionList from './OptionList';

const propTypes = {
  accordionState: PropTypes.string.isRequired,
  onEnabledClick: PropTypes.func.isRequired,
  onNotEnabledClick: PropTypes.func.isRequired,
};

function PlayerKicker({ accordionState, onEnabledClick, onNotEnabledClick }) {
  const hostState = {
    gameState: 'waiting-for-lobby',
    lobbyID: '',
    players: {
      player1: {
        name: 'BENDER',
      },
      player2: {
        name: 'BRIGGS',
      },
      player3: {
        name: 'BRANDON',
      },
      player4: {
        name: 'BRENDA',
      },
      player5: {
        name: 'BEERCAN',
      },
    },
    playerIDs: ['player1', 'player2', 'player3', 'player4', 'player5'],
  };

  const playerList = Object.entries(hostState.players)
    .sort((a, b) => b[0] < a[0])
    .map((player) => player[1].name);

  // placeholder function
  function kickPlayer(event, player) {
    // eslint-disable-next-line
    console.log(`Kick ${player}`);
  }

  return (
    <OptionList
      listContent={playerList}
      state={accordionState}
      onEnabledOptionListClick={onEnabledClick}
      onNotEnabledOptionListClick={onNotEnabledClick}
      onListItemClick={kickPlayer}
      openText="KICK WHO?"
      closedText="KICK PLAYER"
    />
  );
}

PlayerKicker.propTypes = propTypes;

export default PlayerKicker;
