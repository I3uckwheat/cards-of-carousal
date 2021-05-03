import React, { useContext } from 'react';
import { HostContext } from '../../contexts/HostContext/HostContext';
import HostPregameScreen from '../../screens/HostPregameScreen/HostPregameScreen';
import WinnerSelectScreen from '../../screens/WinnerSelectScreen/WinnerSelectScreen';
import HostBlackCardScreen from '../../screens/HostBlackCardScreen/HostBlackCardScreen';
import HostRoundWinnerScreen from '../../screens/HostRoundWinnerScreen/HostRoundWinnerScreen';
import HostGameOverScreen from '../../screens/HostGameOverScreen/HostGameOverScreen';

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

    case 'waiting-to-receive-cards':
    case 'czar-select-winner':
      return <HostBlackCardScreen />;

    case 'selecting-winner':
      return <WinnerSelectScreen />;

    case 'showing-winning-cards':
      return <HostRoundWinnerScreen />;

    case 'game-over':
      return <HostGameOverScreen />;

    default:
      throw new Error(`Unrecognized game state: ${gameState}`);
  }
}

HostScreenController.propTypes = propTypes;
