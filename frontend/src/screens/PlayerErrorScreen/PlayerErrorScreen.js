import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PlayerMessageScreen from '../PlayerMessageScreen/PlayerMessageScreen';
import Button from '../../components/Buttons/Button';
import config from '../../config';

const propTypes = {
  bigText: PropTypes.string,
  smallText: PropTypes.string,
  buttonText: PropTypes.string,
  onClickButton: PropTypes.func,
};

const defaultProps = {
  bigText: 'Something went wrong',
  smallText: '',
  buttonText: 'Click to restart',
  onClickButton: () => window.location.reload(),
};

const {
  largeMobileWidth,
  smallDesktopWidth,
} = config.breakpoint.playerBreakpoints;

const RestartButton = styled(Button)`
  background-color: var(--primary-background-color);
  color: var(--secondary-color);
  min-width: 100px;
  margin: 32px auto 0 auto;
  border-radius: 2px;
  text-transform: uppercase;

  @media screen and (min-width: ${largeMobileWidth}) {
    min-width: 116px;
    height: 40px;
    margin: 40px auto 0 auto;
  }

  @media screen and (min-width: ${smallDesktopWidth}) {
    font-size: 1.5rem;
    line-height: 1.5rem;
    min-width: 164px;
    height: 66px;
  }
`;

export default function PlayerErrorScreen({
  bigText,
  smallText,
  buttonText,
  onClickButton: handleClickButton,
}) {
  return (
    <PlayerMessageScreen bigText={bigText} smallText={smallText}>
      <RestartButton
        data-testid="restart"
        type="button"
        onClick={handleClickButton}
      >
        {buttonText}
      </RestartButton>
    </PlayerMessageScreen>
  );
}

PlayerErrorScreen.propTypes = propTypes;
PlayerErrorScreen.defaultProps = defaultProps;
