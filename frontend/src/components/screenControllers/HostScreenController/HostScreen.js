import React, { useContext } from 'react';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import HostScreenExample from '../../../temp/HostScreenExample';

const propTypes = {};

export default function HostScreen() {
  const hostContext = useContext(HostContext);
  switch (hostContext.state.gameState) {
    case 'waiting-for-lobby':
      return <HostScreenExample />;
    default:
      return null;
  }
}

HostScreen.propTypes = propTypes;
