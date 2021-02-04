import React, { useState } from 'react';

import './App.css';
import SocketTest from './components/SocketTest/SocketTest';
import PlayerList from './components/PlayerList/PlayerList';

import players from './temp/playerList';

function App() {
  const [showSocketTest, setShowSocketTest] = useState(false);
  const [showPlayerList, setShowPlayerList] = useState(false);

  return (
    <div>
      <div className="buttons-grid">
        <button type="button" onClick={() => { setShowSocketTest(!showSocketTest); }}>Show SocketTest</button>
        <button type="button" onClick={() => { setShowPlayerList(!showPlayerList); }}>Show PlayerList</button>
      </div>

      {showSocketTest && <SocketTest />}
      {showPlayerList && <PlayerList players={players} />}
    </div>
  );
}

export default App;
