/* eslint-disable */
import React from 'react';

import './reset.css';
import './App.css';

import PlayerList from './components/PlayerList/PlayerList';
import DisplayJoinCode from './components/JoinCode/JoinCode';
import playerList from './temp/playerList';
import SingleBlackCardExample from './temp/SingleBlackCardExample.js';
import HostLayout from './components/layouts/HostLayout';
import HostSettingsMenu from './components/HostSettingsMenu/HostSettingsMenu';

function App() {
  return (
    <HostLayout
      left={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <PlayerList playerList={playerList} />
          <DisplayJoinCode code="XYA3Z" />
        </div>
      }
      right={<SingleBlackCardExample />}
      modal={<HostSettingsMenu />}
    />
  );
}

export default App;
