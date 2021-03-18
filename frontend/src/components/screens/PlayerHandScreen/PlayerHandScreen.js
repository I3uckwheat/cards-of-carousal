
import React, { useState, useContext } from 'react';
// import styled from 'styled-components';

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
  const updateSelected = (index) => {
console.log(index)
  // want to add newly clicked card to setSelected[] if it is less than amount needed
if (selected.length < state.selectCardCount) setSelected(index)


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
          onSelect={(index)=>updateSelected(index) } 
        />
      </CardHandLayout>
    </>
  );
}
