import React, { useState } from 'react';
import SocketTest from './components/SocketTest';
import DisplayJoinCode from './components/JoinCode/JoinCode';

function App() {
  const [showSocketTest, setShowSocketTest] = useState(false);
  const [showJoinCode, setJoinCode] = useState(false);

  return (
    <div className="App">
      <div className="buttons-grid">
        <button type="button" onClick={() => { setShowSocketTest(!showSocketTest); }}>
          Show SocketTest
        </button>
        <button type="button" onClick={() => { setJoinCode(!showJoinCode); }}>
          Show JoinCode
        </button>
      </div>

      {showSocketTest && <SocketTest />}
      {showJoinCode && <DisplayJoinCode code="XYA3Z" />}
    </div>
  );
}

export default App;
