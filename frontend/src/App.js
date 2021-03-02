import React from 'react';

import './reset.css';
import './App.css';

import WelcomeScreen from './components/screens/WelcomeScreen/WelcomeScreen';

function App() {
  return (
    <WelcomeScreen handleJoinClick={() => ''} handleHostClick={() => ''} />
  );
}

export default App;
