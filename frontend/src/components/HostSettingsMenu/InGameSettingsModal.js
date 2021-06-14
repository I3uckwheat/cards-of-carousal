import React from 'react';

import HostSettingsMenu from './HostSettingsMenu';
import PlayerKicker from './SettingsSubComponents/PlayerKicker';
import JoinCodeHider from './SettingsSubComponents/JoinCodeHider';
import JoinCodeShuffler from './SettingsSubComponents/JoinCodeShuffler';
import SkipPlayerButton from './SettingsSubComponents/SkipPlayerButton';
import ToggleFullscreen from './SettingsSubComponents/ToggleFullscreen';

export default function PreGameSettingsModal() {
  return (
    <HostSettingsMenu
      settingsComponentList={[
        { type: 'button', component: SkipPlayerButton },
        { type: 'button', component: JoinCodeHider },
        { type: 'accordion', component: PlayerKicker },
        { type: 'button', component: JoinCodeShuffler },
        { type: 'button', component: ToggleFullscreen },
      ]}
    />
  );
}
