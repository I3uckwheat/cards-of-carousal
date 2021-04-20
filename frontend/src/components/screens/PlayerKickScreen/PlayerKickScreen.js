import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PlayerMessageScreen from '../PlayerMessageScreen/PlayerMessageScreen';
import Button from '../../Buttons/Button';

const propTypes = {
  bigText: PropTypes.string.isRequired,
  smallText: PropTypes.string.isRequired,
};

const RestartButton = styled(Button)`
  background-color: var(--primary-background-color);
  color: var(--secondary-color);
  text-transform: uppercase;
`;

export default function PlayerKickScreen({ bigText, smallText }) {
  return (
    <PlayerMessageScreen bigText={bigText} smallText={smallText}>
      <RestartButton type="button" onClick={() => window.location.reload()}>
        restart
      </RestartButton>
    </PlayerMessageScreen>
  );
}

PlayerKickScreen.propTypes = propTypes;
