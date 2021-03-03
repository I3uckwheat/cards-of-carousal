import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import reducer from './HostReducer';

const propTypes = {
  children: PropTypes.node.isRequired,
};

export const HostContext = createContext();

const initialState = {
  gameState: 'waiting-for-lobby',
  lobbyID: '',
  players: {},
  playerIDs: [],
};

function HostProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HostContext.Provider value={{ state, dispatch }}>
      {children}
    </HostContext.Provider>
  );
}

HostProvider.propTypes = propTypes;

export default HostProvider;
