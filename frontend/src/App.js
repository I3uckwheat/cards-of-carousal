import React from 'react';
import BlackCard from './components/Cards/BlackCard';
import SocketTest from './components/SocketTest';

function App() {
  return (
    <div className="App">
      <SocketTest />
      <BlackCard pickCount={2}>
        &quot;_Prompt_ cards\nformatted with _.&quot;
        &quot;I want a _ **and** _ sandwich! No corners!&quot;
      </BlackCard>
    </div>
  );
}

export default App;
