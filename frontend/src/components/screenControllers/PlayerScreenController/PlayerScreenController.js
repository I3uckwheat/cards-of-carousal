import React, { useContext } from 'react';
import { PlayerContext } from '../../../contexts/PlayerContext/PlayerContext';
import PlayerJoinScreen from '../../screens/PlayerJoinScreen/PlayerJoinScreen';
import PlayerHandScreen from '../../screens/PlayerHandScreen/PlayerHandScreen';
import CzarHandScreen from '../../screens/CzarHandScreen/CzarHandScreen';


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
    case 'select-winner':
      return <CzarHandScreen />;
    default:
      throw new Error(`Unrecognized game state: ${gameState}`);
  }
}

PlayerScreenController.propTypes = propTypes;
