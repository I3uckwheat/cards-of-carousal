import React from 'react';
import PropTypes from 'prop-types';

import OptionButton from './OptionButton';
import requestFullscreen from '../../../helpers/requestFullscreen';

const propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  onDisabledClick: PropTypes.func.isRequired,
};

function ToggleFullscreen({ isEnabled, onDisabledClick }) {
  return (
    <OptionButton
      isEnabled={isEnabled}
      onEnabledClick={() => {
        const fullscreenIsActive = !!document.fullscreenElement;
        return fullscreenIsActive
          ? document.exitFullscreen()
          : requestFullscreen();
      }}
      onDisabledClick={onDisabledClick}
    >
      TOGGLE FULLSCREEN
    </OptionButton>
  );
}

ToggleFullscreen.propTypes = propTypes;

export default ToggleFullscreen;
