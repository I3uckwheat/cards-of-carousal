import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import OptionButton from './OptionButton';
import { HostContext } from '../../../contexts/HostContext/HostContext';

const propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  onDisabledClick: PropTypes.func.isRequired,
};

function JoinCodeHider({ isEnabled, onDisabledClick }) {
  const { state, dispatch } = useContext(HostContext);
  const hidden = state.gameSettings.hideJoinCode;

  return (
    <OptionButton
      isEnabled={isEnabled}
      onEnabledClick={() => dispatch({ type: 'TOGGLE_JOIN_CODE_VISIBILITY' })}
      onDisabledClick={onDisabledClick}
    >
      {hidden ? 'SHOW JOIN CODE' : 'HIDE JOIN CODE'}
    </OptionButton>
  );
}

JoinCodeHider.propTypes = propTypes;

export default JoinCodeHider;
