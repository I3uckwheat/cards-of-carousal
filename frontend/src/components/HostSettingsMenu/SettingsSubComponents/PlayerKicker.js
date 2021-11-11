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
    .map((playerId) => ({
      text: players[playerId].name.toUpperCase(),
      value: playerId,
    }))
    .sort((a, b) => b > a);

  function kickPlayer(targetId) {
    const czarId =
      playerIDs.length > 0 &&
      playerIDs.find((playerId) => players[playerId].isCzar);

    dispatch({
      type: 'KICK_PLAYER',
      payload: { playerId: targetId, czarId },
    });
  }

  return (
    <OptionList
      listContent={playerList}
      state={accordionState}
      // if you get a "cannot read property 'undefined' of undefined" error on
      // the below line and a bunch of propType errors in your console check
      // that you assigned it the right component type
      onClick={onClickActions[accordionState]}
      onItemClick={kickPlayer}
      openText="KICK WHO?"
      closedText="KICK PLAYER"
    />
  );
}

PlayerKicker.propTypes = propTypes;

export default PlayerKicker;
