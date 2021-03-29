import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import OptionList from './OptionList';
import { HostContext } from '../../../contexts/HostContext/HostContext';

const propTypes = {
  accordionState: PropTypes.string.isRequired,
  onClickActions: PropTypes.shape({
    open: PropTypes.func.isRequired,
    enabled: PropTypes.func.isRequired,
    disabled: PropTypes.func.isRequired,
  }).isRequired,
};

function PlayerKicker({ accordionState, onClickActions }) {
  const {
    state: { playerIDs, players },
    dispatch,
  } = useContext(HostContext);

  // this variable is needed for the OptionList API; it needs the player names
  // in an array of strings
  const playerList = playerIDs
    .map((playerId) => players[playerId].name.toUpperCase())
    .sort((a, b) => b > a);

  function kickPlayer(playerName) {
    const targetPlayer = playerIDs.find(
      (playerId) => players[playerId].name.toUpperCase() === playerName,
    );

    dispatch({
      type: 'KICK_PLAYER',
      payload: { playerId: targetPlayer },
    });
  }

  return (
    <OptionList
      listContent={playerList}
      state={accordionState}
      onClick={onClickActions[accordionState]}
      onItemClick={kickPlayer}
      openText="KICK WHO?"
      closedText="KICK PLAYER"
    />
  );
}

PlayerKicker.propTypes = propTypes;

export default PlayerKicker;
