import React, { useState } from 'react';

import './reset.css';
import './App.css';

import WelcomeScreen from './components/screens/WelcomeScreen/WelcomeScreen';
import Host from './components/screenControllers/Host/Host';
import Player from './components/screenControllers/Player/Player';

function App() {
  const [screenControllerType, setScreenControllerType] = useState('welcome');

  switch (screenControllerType) {
    case 'player':
      return <Player />;
    case 'host':
      return (
        <Host left={<p>left</p>} right={<p>right</p>} modal={<p>modal</p>} />
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
