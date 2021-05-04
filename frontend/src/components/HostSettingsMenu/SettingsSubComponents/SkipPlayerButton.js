import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { HostContext } from '../../../contexts/HostContext/HostContext';
import OptionButton from './OptionButton';

const propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  onDisabledClick: PropTypes.func.isRequired,
};

function SkipPlayerButton({ isEnabled, onDisabledClick }) {
  const { dispatch } = useContext(HostContext);

  function handleClick() {
    dispatch({
      type: 'SKIP_UNSUBMITTED_PLAYERS',
      payload: {},
    });
  }

  return (
    <OptionButton
      isEnabled={isEnabled}
      onEnabledClick={handleClick}
      onDisabledClick={onDisabledClick}
    >
      SKIP UNSUBMITTED PLAYERS
    </OptionButton>
  );
}

SkipPlayerButton.propTypes = propTypes;

export default SkipPlayerButton;
