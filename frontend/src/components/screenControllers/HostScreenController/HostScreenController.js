import React, { useContext } from 'react';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import HostScreenExample from '../../../temp/HostScreenExample';

const propTypes = {};

export default function HostScreenController() {
  const {
    state: { gameState },
  } = useContext(HostContext);
  switch (gameState) {
    case 'waiting-for-lobby':
      return <HostScreenExample />;
    default:
      throw new Error(`Unrecognized game state: ${gameState}`);
  }
}

HostScreenController.propTypes = propTypes;
