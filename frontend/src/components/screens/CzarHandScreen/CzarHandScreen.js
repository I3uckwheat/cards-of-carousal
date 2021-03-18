import React, { useContext, useState } from 'react';
import { PlayerContext } from '../../../contexts/PlayerContext/PlayerContext';

import CardHandLayout from '../../CardHandLayout/CardHandLayout';
import CzarHand from '../../CzarHand/CzarHand';

export default function CzarHandScreen() {
  const { state, dispatch } = useContext(PlayerContext);
  const [selection, setSelection] = useState(null);

  const submit = () => {
    dispatch({ type: 'SUBMIT_WINNER', payload: selection });
  };

  return (
    <CardHandLayout
      onClear={() => setSelection(null)}
      onSubmit={() => submit(selection)}
      title={{
        top: "YOU'RE THE CZAR",
        bottom: 'PICK A WINNER',
      }}
    >
      <CzarHand
        cards={state.cards}
        selectedGroup={selection}
        onSelect={(selected) => setSelection(selected)}
      />
    </CardHandLayout>
  );
}
