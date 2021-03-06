import React, { useState } from 'react';
import GameSettings from '../components/GameSettings/GameSettings';

export default function GameSettingsExample() {
  const [gameSettings, setGameSettings] = useState({
    maxPlayers: 5,
    winningScore: 6,
    selectedPacks: [0, 1, 2, 3, 4],
  });

  return (
    <div style={{ height: '800px' }}>
      <GameSettings options={gameSettings} onChange={setGameSettings} />
    </div>
  );
}
