import React, { useState } from 'react';
import styled from 'styled-components';
import CzarHand from '../components/CzarHand/CzarHand';

const CzarExampleStyles = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
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
    <CzarExampleStyles>
      <CzarHand
        selectedGroup={selectedCard}
        cards={cards}
        onSelect={(selected) => setSelectedCard(selected)}
      />
    </CzarExampleStyles>
  );
}
