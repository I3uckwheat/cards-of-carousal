import React, { useContext } from 'react';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import HostPregameScreen from '../../screens/HostPregameScreen/HostPregameScreen';

const propTypes = {};

export default function HostScreenController() {
  const {
    state: { gameState },
  } = useContext(HostContext);
  switch (gameState) {
    case 'waiting-for-lobby':
    case 'waiting-for-players':
      return <HostPregameScreen />;
    default:
      throw new Error(`Unrecognized game state: ${gameState}`);
  }
}

HostScreenController.propTypes = propTypes;
