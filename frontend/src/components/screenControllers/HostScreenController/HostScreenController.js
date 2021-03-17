import React, { useContext } from 'react';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import HostScreenExample from '../../../temp/HostScreenExample';

const propTypes = {};

export default function HostScreenController() {
  const hostContext = useContext(HostContext);
  switch (hostContext.state.gameState) {
    case 'waiting-for-lobby':
      return <HostScreenExample />;
    default:
      throw new Error(
        `Unrecognized game state: ${hostContext.state.gameState}`,
      );
  }
}

HostScreenController.propTypes = propTypes;
