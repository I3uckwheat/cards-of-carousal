import React, { useState } from 'react';
import HamburgerMenu from './components/Buttons/HamburgerMenu/HamburgerMenu';
import SocketTest from './components/SocketTest';

import './App.css';

function App() {
  const [showSocketTest, setShowSocketTest] = useState(false);
  const [showHamburgerMenu, setHamburgerMenu] = useState(false);

  const onClickTest = () => console.log('onClick was called!');
  const onInactiveTest = () => console.log('onInactive was also called!');

  return (
    <div className="App">
      <div className="buttons-grid">
        <button type="button" onClick={() => { setShowSocketTest(!showSocketTest); }}>
          Show SocketTest
        </button>
        <button type="button" onClick={() => { setHamburgerMenu(!showHamburgerMenu); }}>
          Show HamburgerMenu
        </button>
      </div>

      {showSocketTest && <SocketTest />}
      {showHamburgerMenu
      && <HamburgerMenu isActive={false} onClick={onClickTest} onInactive={onInactiveTest} />}
    </div>
  );
}

export default App;
