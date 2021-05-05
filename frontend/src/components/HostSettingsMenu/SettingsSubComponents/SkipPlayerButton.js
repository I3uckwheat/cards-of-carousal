import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { HostContext } from '../../../contexts/HostContext/HostContext';
import OptionButton from './OptionButton';

const propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  onDisabledClick: PropTypes.func.isRequired,
};

function SkipPlayerButton({ isEnabled, onDisabledClick }) {
  const {
    state: { gameState, playerIDs, players },
    dispatch,
  } = useContext(HostContext);

  const [hasMinimumPlayersSubmitted, setHasMinimumPlayersSubmitted] = useState(
    false,
  );

  useEffect(() => {
    const determineSubmittedPlayers = () => {
      const submittedPlayers = playerIDs.filter(
        (playerID) =>
          !players[playerID].isCzar &&
          players[playerID].submittedCards.length > 0,
      );
      return submittedPlayers.length >= 2;
    };
    setHasMinimumPlayersSubmitted(determineSubmittedPlayers());
  }, [players]);

  function handleClick() {
    dispatch({
      type: 'SKIP_UNSUBMITTED_PLAYERS',
      payload: { players, playerIDs },
    });
  }

  return (
    <OptionButton
      isEnabled={
        isEnabled &&
        hasMinimumPlayersSubmitted &&
        gameState === 'waiting-to-receive-cards'
      }
      onEnabledClick={handleClick}
      onDisabledClick={onDisabledClick}
    >
      SKIP UNSUBMITTED PLAYERS
    </OptionButton>
  );
}

SkipPlayerButton.propTypes = propTypes;

export default SkipPlayerButton;
