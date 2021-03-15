import React, { useContext } from 'react';
import { PlayerContext } from '../../../contexts/PlayerContext/PlayerContext';
import PlayerJoinScreen from '../../screens/PlayerJoinScreen/PlayerJoinScreen';

const propTypes = {};

export default function PlayerScreen() {
  const playerContext = useContext(PlayerContext);
  switch (playerContext.state.gameState) {
    case 'enter-code':
      return <PlayerJoinScreen />;
    default:
      throw new Error(
        `Unrecognized game state: ${playerContext.state.gameState}`,
      );
  }
}

PlayerScreen.propTypes = propTypes;
