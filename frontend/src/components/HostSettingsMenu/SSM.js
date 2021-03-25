import React from 'react';
import HostSettingsMenu from './HostSettingsMenu';
import PlayerKicker from './PlayerKicker';
import JoinCodeHider from './JoinCodeHider';

function SSM() {
  return (
    <HostSettingsMenu 
      settingsComponentList={[
        PlayerKicker,
        JoinCodeHider
      ]}
    />
  );
}

export default SSM;
