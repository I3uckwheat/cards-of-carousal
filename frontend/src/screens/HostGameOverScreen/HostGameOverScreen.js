import React, { useContext } from 'react';
import styled from 'styled-components';

import { HostContext } from '../../contexts/HostContext/HostContext';
import HostLayout from '../../layouts/HostLayout';
import PlayerList from '../../components/PlayerList/PlayerList';
import InGameSettingsModal from '../../components/HostSettingsMenu/InGameSettingsModal.js';
import Button from '../../components/Buttons/Button';

import WhiteCardsTrio from '../../assets/card-trio-diagonal.svg';
import BlackCardDiagonal from '../../assets/black-card-diagonal.svg';

const LeftPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .player-list-wrapper {
    overflow-x: auto;
    flex-grow: 1;
  }

  .buttons-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 32px auto 32px;

    .button.primary {
      font-size: 20px;
      margin-bottom: 16px;
    }
  }
`;

const RightPanelWrapper = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .winner-display {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 40px 0;

    flex: 2;
    text-transform: uppercase;

    .prelude {
      font-size: 28px;
      text-indent: -40px;
      line-height: 1em;
      margin-bottom: -12px;
    }

    .title {
      font-size: 64px;
      font-weight: 900;
      text-align: right;
      line-height: 1em;
    }
  }

  .thanks-message {
    font-size: 46px;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    flex: 1;
  }

  .decorations-wrapper {
    position: relative;
    width: 100%;
    flex: 2;

    .decoration-white-cards,
    .decoration-black-card {
      position: absolute;
      bottom: 0;
    }

    .decoration-white-cards {
      left: 0;
      width: 150px;
    }

    .decoration-black-card {
      right: 0;
      width: 110px;
    }
  }
`;

function LeftPanel() {
  const { state, dispatch } = useContext(HostContext);
  const { players, playerIDs } = state;

  const handleNewGameClick = async () => {
    // TODO: Ideally this would clean up player scores, gameWinner, czarSelection and then replicate the effects seen in HostPregameScreen's Start Button
    await dispatch({ type: 'CLOSE_GAME', payload: {} });
    window.location.reload();
  };

  const handleClickClose = async () => {
    await dispatch({ type: 'CLOSE_GAME', payload: {} });
    window.location.reload();
  };

  return (
    <LeftPanelWrapper>
      <div className="player-list-wrapper">
        <PlayerList playerList={{ players, playerIDs }} />
      </div>
      <div className="buttons-wrapper">
        <Button
          type="button"
          isActive
          className="button primary"
          onClick={handleNewGameClick}
        >
          <p>START NEW GAME</p>
        </Button>

        <Button
          type="button"
          isActive
          className="button"
          onClick={handleClickClose}
        >
          <p>CLOSE GAME</p>
        </Button>
      </div>
    </LeftPanelWrapper>
  );
}

function RightPanel() {
  const { state } = useContext(HostContext);
  const { players, gameWinner } = state;

  return (
    <RightPanelWrapper>
      <h1 className="winner-display">
        <span className="prelude">And the winner is...</span>
        <p className="title" data-testid="winner-name">
          {players[gameWinner].name}
        </p>
      </h1>

      <p className="thanks-message">Thank you for playing!</p>

      <div className="decorations-wrapper">
        <img
          className="decoration-white-cards"
          src={WhiteCardsTrio}
          alt="Three white cards"
        />
        <img
          className="decoration-black-card"
          src={BlackCardDiagonal}
          alt="Diagonal black card"
        />
      </div>
    </RightPanelWrapper>
  );
}

function HostGameOverScreen() {
  return (
    <HostLayout
      className="primary-background"
      left={<LeftPanel />}
      right={<RightPanel />}
      modal={<InGameSettingsModal />}
    />
  );
}

export default HostGameOverScreen;
