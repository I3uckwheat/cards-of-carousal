import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PlayerMessageScreen from '../PlayerMessageScreen/PlayerMessageScreen';
import Button from '../../components/Buttons/Button';

const propTypes = {
  bigText: PropTypes.string,
  smallText: PropTypes.string,
  buttonText: PropTypes.string,
};

const defaultProps = {
  bigText: 'Something went wrong',
  smallText: '',
  buttonText: 'Click to restart',
};

const RestartButton = styled(Button)`
  background-color: var(--primary-background-color);
  color: var(--secondary-color);
  min-width: 100px;
  margin: 32px auto 0 auto;
  border-radius: 2px;
  text-transform: uppercase;

  @media screen and (min-width: 801px) {
    min-width: 116px;
    height: 40px;
    margin: 40px auto 0 auto;
  }

  @media screen and (min-width: 1151px) {
    font-size: 1rem;
    line-height: 1rem;
    min-width: 144px;
    height: 50px;
    margin: 48px auto 0 auto;
  }

  @media screen and (min-width: 1400px) {
    font-size: 1.25rem;
    line-height: 1.25rem;
    min-width: 152px;
    height: 58px;
  }

  @media screen and (min-width: 2560px) {
    font-size: 1.5rem;
    line-height: 1.5rem;
    min-width: 164px;
    height: 66px;
  }
`;

export default function PlayerErrorScreen({ bigText, smallText, buttonText }) {
  return (
    <PlayerMessageScreen bigText={bigText} smallText={smallText}>
      <RestartButton
        data-testid="restart"
        type="button"
        onClick={() => window.location.reload()}
      >
        {buttonText}
      </RestartButton>
    </PlayerMessageScreen>
  );
}

PlayerErrorScreen.propTypes = propTypes;
PlayerErrorScreen.defaultProps = defaultProps;
