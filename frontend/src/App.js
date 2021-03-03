import React, { useState } from 'react';

import './reset.css';
import './App.css';

import WelcomeScreen from './components/screens/WelcomeScreen/WelcomeScreen';
import Host from './components/screenControllers/Host/Host';
import Player from './components/screenControllers/Player/Player';

function App() {
  const [showHostScreenController, setShowHostScreenController] = useState(
    false,
  );
  const [showPlayerScreenController, setShowPlayerScreenController] = useState(
    false,
  );

  if (showHostScreenController) {
    return (
      <Host left={<p>left</p>} right={<p>right</p>} modal={<p>modal</p>} />
    );
  }

  if (showPlayerScreenController) {
    return <Player />;
  }

  return (
    <WelcomeScreen
      handleJoinClick={() => setShowPlayerScreenController(true)}
      handleHostClick={() => setShowHostScreenController(true)}
    />
  );
}

export default App;
