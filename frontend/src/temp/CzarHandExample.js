import React from 'react';
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
  return (
    <div>
      <CzarHand selectedGroup={1} cards={cards} />
    </div>
  );
}
