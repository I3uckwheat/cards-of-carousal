import React, { useContext } from 'react';
import { HostContext } from '../../contexts/HostContext/HostContext';
import HostPregameScreen from '../../screens/HostPregameScreen/HostPregameScreen';
import WinnerSelectScreen from '../../screens/WinnerSelectScreen/WinnerSelectScreen';
import HostBlackCardScreen from '../../screens/HostBlackCardScreen/HostBlackCardScreen';
import HostWinnerScreen from '../../screens/HostWinnerScreen/HostWinnerScreen';

const propTypes = {};

export default function HostScreenController() {
  const {
    state: { gameState },
  } = useContext(HostContext);

  switch (gameState) {
    case 'waiting-for-lobby':
    case 'waiting-for-players':
    case 'waiting-for-deck':
      return <HostPregameScreen />;

    case 'waiting-to-receive-cards':
    case 'czar-select-winner':
      return <HostBlackCardScreen />;

    case 'showing-winning-cards':
      return <HostWinnerScreen />;
    case 'selecting-winner':
      return <WinnerSelectScreen />;

    default:
      throw new Error(`Unrecognized game state: ${gameState}`);
  }
}

HostScreenController.propTypes = propTypes;
