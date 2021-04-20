import React, { useContext } from 'react';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import HostPregameScreen from '../../screens/HostPregameScreen/HostPregameScreen';
import WinnerSelectScreen from '../../screens/WinnerSelectScreen/WinnerSelectScreen';
import HostBlackCardScreen from '../../screens/HostBlackCardScreen/HostBlackCardScreen';
import WinnerScreen from '../../screens/HostWinnerScreen/HostWinnerScreen';

const propTypes = {};

export default function HostScreenController() {
  const {
    state: { gameState },
  } = useContext(HostContext);

  switch (gameState) {
    case 'waiting-for-lobby':
    case 'waiting-for-players':
    case 'waiting-for-deck':
    case 'waiting-for-player-card-submissions':
      return <HostPregameScreen />;

    case 'selecting-winner':
      return <WinnerSelectScreen />;

    case 'waiting-to-receive-cards':
    case 'czar-select-winner':
      return <HostBlackCardScreen />;

    case 'show-winning-card':
      return <WinnerScreen />;

    default:
      throw new Error(`Unrecognized game state: ${gameState}`);
  }
}

HostScreenController.propTypes = propTypes;
