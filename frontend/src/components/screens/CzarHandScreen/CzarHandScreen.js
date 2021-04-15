import React, { useContext, useState } from 'react';
import { PlayerContext } from '../../../contexts/PlayerContext/PlayerContext';

import CardHandLayout from '../../CardHandLayout/CardHandLayout';
import CzarHand from '../../CzarHand/CzarHand';

export default function CzarHandScreen() {
  const { state, dispatch } = useContext(PlayerContext);
  const [selection, setSelection] = useState(null);

  const submit = () => {
    dispatch({ type: 'SUBMIT_WINNER', payload: { id: selection } });
  };

  const submitPreview = (selected) => {
    setSelection(selected);
    dispatch({
      type: 'PREVIEW_WINNER',
      payload: { selectedGroupIndex: selected },
    });
  };

  return (
    <CardHandLayout
      onClear={() => setSelection(null)}
      onSubmit={submit}
      title={{
        top: "YOU'RE THE CZAR,",
        bottom: 'PICK A WINNER',
      }}
    >
      <CzarHand
        cards={state.submittedCards.map(
          (submittedCardObj) => submittedCardObj.cards,
        )}
        selectedGroup={selection}
        onSelect={submitPreview}
      />
    </CardHandLayout>
  );
}
