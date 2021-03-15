import React from 'react';
import { PlayerProvider } from '../../../contexts/PlayerContext/PlayerContext';
import PlayerScreen from './PlayerScreen';

const propTypes = {};

export default function PlayerScreenController() {
  return (
    <PlayerProvider>
      <PlayerScreen />
    </PlayerProvider>
  );
}

PlayerScreenController.propTypes = propTypes;
