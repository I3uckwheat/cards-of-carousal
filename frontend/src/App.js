import React from 'react';
// import SocketTest from './components/SocketTest';
import PlayerList from './components/PlayerList';

function App() {
  const players = {
    playerID1: {
      name: 'Bender',
      score: 3,
      czar: false,
      submittedCards: [1, 4],
    },
    playerID2: {
      name: 'Bacon',
      score: 5,
      czar: true,
      submittedCards: [],
    },
    playerID3: {
      name: 'Briggs',
      score: 0,
      czar: false,
      submittedCards: [5, 6],
    },
    playerID4: {
      name: 'Pedro',
      score: 10,
      czar: false,
      submittedCards: [2, 5],
    },
    playerID5: {
      name: 'Foo',
      score: 9,
      czar: false,
      submittedCards: [2, 5],
    },
    playerID6: {
      name: 'Bar',
      score: 15,
      czar: false,
      submittedCards: [],
    },
  };

  return (
    <div className="App">
      {/* <SocketTest /> */}

      <PlayerList players={players} />
    </div>
  );
}

export default App;
