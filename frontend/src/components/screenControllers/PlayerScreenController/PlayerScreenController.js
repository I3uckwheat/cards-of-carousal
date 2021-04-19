import React, { useContext } from 'react';
import { PlayerContext } from '../../../contexts/PlayerContext/PlayerContext';
import PlayerJoinScreen from '../../screens/PlayerJoinScreen/PlayerJoinScreen';
import PlayerMessageScreen from '../../screens/PlayerMessageScreen/PlayerMessageScreen';
import PlayerHandScreen from '../../screens/PlayerHandScreen/PlayerHandScreen';
import CzarHandScreen from '../../screens/CzarHandScreen/CzarHandScreen';

const propTypes = {};

export default function PlayerScreenController() {
  const {
    state: { gameState, message },
  } = useContext(PlayerContext);

  switch (gameState) {
    case 'enter-code':
      return <PlayerJoinScreen />;

    case 'pending-connection':
    case 'connected':
    case 'submitting-cards':
    case 'cards-submitted':
    case 'waiting-for-player-card-submissions':
    case 'waiting-for-czar':
    case 'lobby-closed':
      return (
        <PlayerMessageScreen bigText={message.big} smallText={message.small} />
      );

    case 'player-select':
      return <PlayerHandScreen />;

    case 'select-winner':
      return <CzarHandScreen />;

    default:
      throw new Error(`Unrecognized game state: ${gameState}`);
  }
}

PlayerScreenController.propTypes = propTypes;
