import React from 'react';

import HostSettingsMenu from './HostSettingsMenu';
import PlayerKicker from './SettingsSubComponents/PlayerKicker';
import JoinCodeHider from './SettingsSubComponents/JoinCodeHider';
import JoinCodeShuffler from './SettingsSubComponents/JoinCodeShuffler';

export default function PreGameSettingsModal() {
  return (
    <HostSettingsMenu
      settingsComponentList={[
        // if you give a wrong 'type' here you will get a "cannot read property
        // 'undefined' of undefined" error in any accordions that you've typed
        // as 'button' and a bunch of propType errors
        { type: 'button', component: JoinCodeHider },
        { type: 'accordion', component: PlayerKicker },
        { type: 'button', component: JoinCodeShuffler },
      ]}
    />
  );
}
