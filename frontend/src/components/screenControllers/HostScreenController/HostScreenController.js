import React, { useContext, useEffect } from 'react';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import HostPregameScreen from '../../screens/HostPregameScreen/HostPregameScreen';

const propTypes = {};

export default function HostScreenController() {
  const { state, dispatch } = useContext(HostContext);
  const { gameState } = state;

  useEffect(() => {
    // all side-effects for game state go here
    switch (gameState) {
      case 'waiting-for-deck':
        dispatch({
          type: 'GET_CARD_PACKS',
          payload: { selectedPacks: state.gameSettings.selectedPacks },
        });
        break;
      case 'setting-new-round':
        // TODO: add getting black card here, BEFORE setting next czar
        dispatch({
          type: 'SET_NEXT_CZAR',
          payload: {},
        });
        dispatch({ type: 'GO_TO_PLAYER_SELECT_CARDS', payload: {} });
        break;
      // TODO: add player-select-cards dealing of cards effect here
      default:
        break;
    }
  }, [gameState]);

  switch (gameState) {
    case 'waiting-for-lobby':
    case 'waiting-for-players':
    case 'waiting-for-deck':
    case 'setting-new-round':
    case 'player-select-cards':
      return <HostPregameScreen />;
    default:
      throw new Error(`Unrecognized game state: ${gameState}`);
  }
}

HostScreenController.propTypes = propTypes;
