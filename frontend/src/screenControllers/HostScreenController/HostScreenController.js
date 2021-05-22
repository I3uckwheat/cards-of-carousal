import React, { useContext } from 'react';
import styled from 'styled-components';
import { HostContext } from '../../contexts/HostContext/HostContext';
import HostPregameScreen from '../../screens/HostPregameScreen/HostPregameScreen';
import WinnerSelectScreen from '../../screens/WinnerSelectScreen/WinnerSelectScreen';
import HostBlackCardScreen from '../../screens/HostBlackCardScreen/HostBlackCardScreen';
import HostRoundWinnerScreen from '../../screens/HostRoundWinnerScreen/HostRoundWinnerScreen';
import HostGameOverScreen from '../../screens/HostGameOverScreen/HostGameOverScreen';
import config from '../../config';

const { smallDesktop } = config.breakpoint.hostBreakpoints;
const propTypes = {};

const ScreenTooSmall = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  overflow: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 10200;

  background-color: var(--primary-background-color);

  @media (min-width: ${smallDesktop}) and (min-height: 768px) {
    display: none;
  }
`;

function showScreen(gameState) {
  switch (gameState) {
    case 'waiting-for-lobby':
    case 'waiting-for-players':
    case 'waiting-for-deck':
      return <HostPregameScreen />;

    case 'waiting-to-receive-cards':
    case 'czar-select-winner':
      return <HostBlackCardScreen />;

    case 'selecting-winner':
      return <WinnerSelectScreen />;

    case 'showing-winning-cards':
      return <HostRoundWinnerScreen />;

    case 'game-over':
      return <HostGameOverScreen />;

    default:
      throw new Error(`Unrecognized game state: ${gameState}`);
  }
}

export default function HostScreenController() {
  const {
    state: { gameState },
  } = useContext(HostContext);

  return (
    <>
      <ScreenTooSmall>
        <h1>Your screen size isn&apos;t big enough to host a lobby</h1>
        <p>Sorry :(</p>
      </ScreenTooSmall>

      {showScreen(gameState)}
    </>
  );
}

HostScreenController.propTypes = propTypes;
