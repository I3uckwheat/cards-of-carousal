import React, { useState } from 'react';

import './reset.css';
import './App.css';

import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen';
import HostScreenController from './screenControllers/HostScreenController/HostScreenController';
import PlayerScreenController from './screenControllers/PlayerScreenController/PlayerScreenController';
import { PlayerProvider } from './contexts/PlayerContext/PlayerContext';
import HostProvider from './contexts/HostContext/HostContext';
import PlayerErrorBoundary from './errorHandlers/playerErrorHandlers/PlayerErrorBoundary';
import HostErrorBoundary from './errorHandlers/hostErrorHandlers/HostErrorBoundary';

function App() {
  const [screenControllerType, setScreenControllerType] = useState('welcome');

  switch (screenControllerType) {
    case 'player':
      return (
        <PlayerErrorBoundary>
          <PlayerProvider>
            <PlayerScreenController />
          </PlayerProvider>
        </PlayerErrorBoundary>
      );
    case 'host':
      return (
        <HostErrorBoundary>
          <HostProvider>
            <HostScreenController />
          </HostProvider>
        </HostErrorBoundary>
      );
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
