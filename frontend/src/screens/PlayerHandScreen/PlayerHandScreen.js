import React, { useState, useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext/PlayerContext';

import CardHandLayout from '../../layouts/CardHandLayout/CardHandLayout';
import PlayerHand from '../../components/PlayerHand/PlayerHand';

export default function PlayerHandScreen() {
  const { state, dispatch } = useContext(PlayerContext);

  const [selected, setSelected] = useState([]);

  const handleClear = () => setSelected([]);

  const handleSubmit = () => {
    dispatch({
      type: 'SUBMIT_CARDS',
      payload: { selectedCards: selected },
    });
  };

  // limits how many cards can be selected based on the 'cardsNeededForSelection'
  const updateSelected = (selectedCards) => {
    if (selectedCards.length <= state.selectCardCount) {
      setSelected(selectedCards);
    }
  };

  return (
    <>
      <CardHandLayout
        title={{
          top: 'PLAYER,',
          bottom: `SUBMIT ${state.selectCardCount} CARD${
            state.selectCardCount !== 1 ? 'S' : ''
          }`,
        }}
        onClear={handleClear}
        onSubmit={handleSubmit}
        numberSelected={selected.length}
      >
        <PlayerHand
          cards={state.cards}
          selectedCards={selected}
          onSelect={(selectedCards) => updateSelected(selectedCards)}
        />
      </CardHandLayout>
    </>
  );
}
