import React from 'react';
import PropTypes from 'prop-types';

import OptionButton from './OptionButton';

const propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  onDisabledClick: PropTypes.func.isRequired,
};

// placeholder function
function hideJoinCode() {
  // eslint-disable-next-line
  console.log('PRETEND THE JOIN CODE IS HIDDEN');
}

function JoinCodeHider({ isEnabled, onDisabledClick }) {
  return (
    <OptionButton
      isEnabled={isEnabled}
      onEnabledClick={hideJoinCode}
      onDisabledClick={onDisabledClick}
    >
      HIDE JOIN CODE
    </OptionButton>
  );
}

JoinCodeHider.propTypes = propTypes;

export default JoinCodeHider;
