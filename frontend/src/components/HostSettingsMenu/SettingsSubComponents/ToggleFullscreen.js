import React from 'react';
import PropTypes from 'prop-types';

import OptionButton from './OptionButton';

const propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  onDisabledClick: PropTypes.func.isRequired,
};

function ToggleFullscreen({ isEnabled, onDisabledClick }) {
  return (
    <OptionButton
      isEnabled={isEnabled}
      onEnabledClick={() => {
        const docEl = document.documentElement;

        const requestFullscreen =
          docEl.requestFullscreen ||
          docEl.mozRequestFullScreen ||
          docEl.webkitRequestFullScreen ||
          docEl.msRequestFullscreen;

        const fullscreenIsActive = !!document.fullscreenElement;

        if (requestFullscreen) {
          if (fullscreenIsActive) document.exitFullscreen();
          else requestFullscreen.call(docEl);
        }
      }}
      onDisabledClick={onDisabledClick}
    >
      TOGGLE FULLSCREEN
    </OptionButton>
  );
}

ToggleFullscreen.propTypes = propTypes;

export default ToggleFullscreen;
