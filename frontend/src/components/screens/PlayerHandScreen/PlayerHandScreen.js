import React, { useState, useContext, useEffect } from 'react';
import { PlayerContext } from '../../../contexts/PlayerContext/PlayerContext';

import CardHandLayout from '../../CardHandLayout/CardHandLayout';
import PlayerHand from '../../PlayerHand/PlayerHand';

export default function PlayerHandScreen() {
  const { state, dispatch } = useContext(PlayerContext); // gives provider object for `value` - playerContext line 59

  const [selected, setSelected] = useState([]);

  const handleClear = () => setSelected([]);

  // handleSubmit PlayerProvider handleMessage({event=SUBMIT_CARDS, payload=CardID array})?
  const handleSubmit = () => {
    dispatch({
      type: 'SUBMIT_CARDS',
      payload: selected,
    });
  };

  // function for limited how many are selected based on the  'cardsNeededForSelection'
  const updateSelected = (selectedCards) => {
    if (selectedCards.length <= state.selectCardCount)
      setSelected(selectedCards);
  };

  return (
    <>
      <CardHandLayout
        title={{
          top: 'PLAYER,',
          bottom: `SUBMIT ${state.selectCardCount} CARDS`,
        }}
        onClear={handleClear}
        onSubmit={handleSubmit}
      >
        <PlayerHand
          cards={state.cards}
          selected={selected}
          onSelect={(selectedCards) => updateSelected(selectedCards)}
        />
      </CardHandLayout>
    </>
  );
}
