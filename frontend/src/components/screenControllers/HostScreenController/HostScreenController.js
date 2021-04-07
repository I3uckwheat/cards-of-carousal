import React, { useContext } from 'react';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import HostPregameScreen from '../../screens/HostPregameScreen/HostPregameScreen';
import WinnerSelectScreen from '../../screens/WinnerSelectScreen/WinnerSelectScreen';

const propTypes = {};

export default function HostScreenController() {
  const {
    state: { gameState },
  } = useContext(HostContext);

  switch (gameState) {
    case 'selecting-winner':
      return <WinnerSelectScreen />;

    case 'waiting-for-lobby':
    case 'waiting-for-players':
    case 'waiting-for-deck':
      return <HostPregameScreen />;
    default:
      throw new Error(`Unrecognized game state: ${gameState}`);
  }
}

HostScreenController.propTypes = propTypes;
