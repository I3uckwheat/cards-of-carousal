import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import OptionList from './OptionList';
import { HostContext } from '../../contexts/HostContext/HostContext';

const propTypes = {
  accordionState: PropTypes.string.isRequired,
  onEnabledClick: PropTypes.func.isRequired,
  onNotEnabledClick: PropTypes.func.isRequired,
};

function PlayerKicker({ accordionState, onEnabledClick, onNotEnabledClick }) {
  const {
    state: { playerIDs, players },
    dispatch,
  } = useContext(HostContext);

  const playerList = playerIDs
    .map((playerId) => players[playerId].name)
    .sort((a, b) => b > a);

  function kickPlayer(playerName) {
    const targetPlayer = playerIDs.find(
      (playerId) => players[playerId].name === playerName,
    );

    dispatch({
      type: 'PLAYER_DISCONNECTED',
      payload: { playerId: targetPlayer },
    });
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
