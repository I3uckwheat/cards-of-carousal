import React, { useContext, useState } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext/PlayerContext';

import CardHandLayout from '../../layouts/CardHandLayout/CardHandLayout';
import CzarHand from '../../components/CzarHand/CzarHand';

export default function CzarHandScreen() {
  const { state, dispatch } = useContext(PlayerContext);
  const [selection, setSelection] = useState(null);

  const submit = () => {
    dispatch({ type: 'SUBMIT_WINNER', payload: { id: selection } });
  };

  const submitPreview = (selectedIndex, selectedPlayerId) => {
    setSelection(selectedIndex);

    dispatch({
      type: 'PREVIEW_WINNER',
      payload: { highlightedPlayerID: selectedPlayerId },
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
      numberSelected={selection === null ? 0 : 1}
    >
      <CzarHand
        cardsData={state.submittedCards}
        selectedGroup={selection}
        onSelect={submitPreview}
      />
    </CardHandLayout>
  );
}
