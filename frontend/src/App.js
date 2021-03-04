import React, { useState } from 'react';

import './reset.css';
import './App.css';

import WelcomeScreen from './components/screens/WelcomeScreen/WelcomeScreen';
import HostScreenController from './components/screenControllers/HostScreenController/HostScreenController';
import PlayerScreenController from './components/screenControllers/PlayerScreenController/PlayerScreenController';

function App() {
  const [screenControllerType, setScreenControllerType] = useState('welcome');

  switch (screenControllerType) {
    case 'player':
      return <PlayerScreenController />;
    case 'host':
      return (
        <HostScreenController
          left={<p>left</p>}
          right={<p>right</p>}
          modal={<p>modal</p>}
        />
      );
    case 'welcome':
    default:
      return (
        <WelcomeScreen
          handleJoinClick={() => setScreenControllerType('player')}
          handleHostClick={() => setScreenControllerType('host')}
        />
      );
  }
}

export default App;
