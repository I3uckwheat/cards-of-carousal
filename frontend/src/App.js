import React from 'react';
import BlackCard from './components/Cards/BlackCard';
import SocketTest from './components/SocketTest';

function App() {
  return (
    <div className="App">
      <SocketTest />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <BlackCard pickCount={2}>_Prompt_ cards\nformatted with _.</BlackCard>
      </div>
    </div>
  );
}

export default App;
