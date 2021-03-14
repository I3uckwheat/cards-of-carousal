import React from 'react';
import HostProvider from '../../../contexts/HostContext/HostContext';
import HostScreen from './HostScreen';

const propTypes = {};

export default function HostScreenController() {
  return (
    <HostProvider>
      <HostScreen />
    </HostProvider>
  );
}

HostScreenController.propTypes = propTypes;
