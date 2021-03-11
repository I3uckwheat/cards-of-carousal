/* eslint-disable */
import React, { useState } from 'react';
import CzarHand from '../components/CzarHand/CzarHand';

const cards = [
  [
    "Card One has a REALLLLLLLLY long title and it's going to be rendered small asdfasdfasdfasdfasfasdfasfasdfasdfasfasdfasdfasdfasdfasdfasfasfd",
    'Card Two',
    'Card Three',
  ],
  ['Card Four', 'Card Five', 'Card Six'],
  ['Card Seven', 'Card Eight', 'Card Nine'],
];

export default function CzarHandExample() {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div>
      <CzarHand
        selectedGroup={selectedCard}
        cards={cards}
        onSelect={(selected) => setSelectedCard(selected)}
      />
    </div>
  );
}
