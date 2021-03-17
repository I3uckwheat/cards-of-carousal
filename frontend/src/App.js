import React, { useState } from 'react';

import './reset.css';
import './App.css';

import WelcomeScreen from './components/screens/WelcomeScreen/WelcomeScreen';
import HostScreenController from './components/screenControllers/HostScreenController/HostScreenController';
import PlayerScreenController from './components/screenControllers/PlayerScreenController/PlayerScreenController';
import { PlayerProvider } from './contexts/PlayerContext/PlayerContext';

function App() {
  const [screenControllerType, setScreenControllerType] = useState('welcome');

  switch (screenControllerType) {
    case 'player':
      return (
        <PlayerProvider>
          <PlayerScreenController />
        </PlayerProvider>
      );
    case 'host':
      return <HostScreenController />;
    case 'welcome':
      return (
        <WelcomeScreen
          handleJoinClick={() => setScreenControllerType('player')}
          handleHostClick={() => setScreenControllerType('host')}
        />
      );
    default:
      throw new Error('Unhandled screenControllerType state');
  }
}

export default App;
