import React, { useContext } from 'react';
import { PlayerContext } from '../../../contexts/PlayerContext/PlayerContext';
import PlayerJoinScreen from '../../screens/PlayerJoinScreen/PlayerJoinScreen';
import PlayerHandScreen from '../../screens/PlayerHandScreen/PlayerHandScreen';

const propTypes = {};

export default function PlayerScreenController() {
  const {
    state: { gameState },
  } = useContext(PlayerContext);
  switch (gameState) {
    case 'enter-code':
      return <PlayerJoinScreen />;
    case 'player-select':
      return <PlayerHandScreen />;
    default:
      throw new Error(`Unrecognized game state: ${gameState}`);
  }
}

PlayerScreenController.propTypes = propTypes;
