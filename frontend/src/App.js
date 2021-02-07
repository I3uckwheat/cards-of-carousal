import React from 'react';
import Button from './components/Buttons/Button';
import './App.css';
import SocketTest from './components/SocketTest';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <div>
          <Button className="test" isActive><p style={{ fontSize: '20px' }}>Click me!</p></Button>
        </div>
        <Button><p style={{ fontSize: '25px' }}>Do not click me!</p></Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <SocketTest />
    </div>
  );
}

export default App;
