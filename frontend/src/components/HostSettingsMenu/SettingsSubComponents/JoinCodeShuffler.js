import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import OptionButton from './OptionButton';
import { HostContext } from '../../../contexts/HostContext/HostContext';

const propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  onDisabledClick: PropTypes.func.isRequired,
};

function JoinCodeShuffler({ isEnabled, onDisabledClick }) {
  const { dispatch } = useContext(HostContext);

  function shuffleJoinCode() {
    dispatch({
      type: 'SHUFFLE_JOIN_CODE',
      payload: {},
    });
  }

  return (
    <OptionButton
      isEnabled={isEnabled}
      onEnabledClick={shuffleJoinCode}
      onDisabledClick={onDisabledClick}
    >
      SHUFFLE JOIN CODE
    </OptionButton>
  );
}

JoinCodeShuffler.propTypes = propTypes;

export default JoinCodeShuffler;
