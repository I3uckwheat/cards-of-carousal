import React, { useContext } from 'react';
import { PlayerContext } from '../../../contexts/PlayerContext/PlayerContext';
import PlayerJoinScreen from '../../screens/PlayerJoinScreen/PlayerJoinScreen';

const propTypes = {};

export default function PlayerScreenController() {
  const {
    state: { gameState },
  } = useContext(PlayerContext);
  switch (gameState) {
    case 'enter-code':
      return <PlayerJoinScreen />;
    default:
      throw new Error(`Unrecognized game state: ${gameState}`);
  }
}

PlayerScreenController.propTypes = propTypes;
