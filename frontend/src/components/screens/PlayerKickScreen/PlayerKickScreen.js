import React from 'react';
import styled from 'styled-components';

import PlayerMessageScreen from '../PlayerMessageScreen/PlayerMessageScreen';
import Button from '../../Buttons/Button';

const propTypes = {};

const RestartButton = styled(Button)`
  background-color: var(--primary-background-color);
  color: var(--secondary-color);
  width: 100px;
  margin: 32px auto 0 auto;
  border-radius: 2px;
  text-transform: uppercase;

  @media screen and (min-width: 801px) {
    width: 116px;
    height: 40px;
    margin: 40px auto 0 auto;
  }

  @media screen and (min-width: 1151px) {
    font-size: 14px;
    line-height: 14px;
    width: 132px;
    height: 44px;
    margin: 48px auto 0 auto;
  }
`;

export default function PlayerKickScreen() {
  return (
    <PlayerMessageScreen bigText="You've been kicked!" smallText="">
      <RestartButton type="button" onClick={() => window.location.reload()}>
        restart
      </RestartButton>
    </PlayerMessageScreen>
  );
}

PlayerKickScreen.propTypes = propTypes;
