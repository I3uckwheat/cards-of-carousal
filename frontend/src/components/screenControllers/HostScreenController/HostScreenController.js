import React from 'react';
import HostProvider from '../../../contexts/HostContext/HostContext';
import HostPregameScreen from '../../screens/HostPregameScreen/HostPregameScreen';

const propTypes = {};

export default function HostScreenController() {
  return (
    <HostProvider>
      <HostPregameScreen />
    </HostProvider>
  );
}

HostScreenController.propTypes = propTypes;
