import React from 'react';
import BlackCard from './components/Cards/BlackCard';
import SocketTest from './components/SocketTest';

function App() {
  const ex1 = "Knock, knock.\n\n(Who's there?)\n\n_.";
  const ex2 = "I left Hamilton because I heard about _'s obsession with _.";
  const ex3 = 'Hypothesis: _\nExperiment: _\nConclusion: _';
  const ex4 = 'He alone, who owns the _(s), gains the _(s).';
  return (
    <div className="App">
      <SocketTest />

      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <BlackCard pickCount={1}>{ex1}</BlackCard>
        <BlackCard pickCount={2}>{ex2}</BlackCard>
        <BlackCard pickCount={3}>{ex3}</BlackCard>
        <BlackCard pickCount={2}>{ex4}</BlackCard>
      </div>
    </div>
  );
}

export default App;
