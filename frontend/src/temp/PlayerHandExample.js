import React, { useState } from 'react';

import PlayerHand from '../components/PlayerHand/PlayerHand';

const whiteCards = ['Briggs', 'Bender', 'Grace', 'hi', 'bye'];

function PlayerHandExample() {
  const [selectedCards, setSelectedCards] = useState([0, 1]);
  return (
    <div
      style={{
        display: 'flex',
        width: '90%',
        height: '100vh',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
      className="App primary-background"
    >
      <PlayerHand
        cards={whiteCards}
        selected={selectedCards}
        // eslint-disable-next-line no-console
        onSelect={(arr) => {
          setSelectedCards(arr);
          console.log(arr);
        }}
      />
    </div>
  );
}

export default PlayerHandExample;
