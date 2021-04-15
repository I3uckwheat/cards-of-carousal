import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import HostLayout from '../../layouts/HostLayout';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import PlayerList from '../../PlayerList/PlayerList';
import HostSettingsMenu from '../../HostSettingsMenu/HostSettingsMenu.js';
import JoinCode from '../../JoinCode/JoinCode';
import BlackCard from '../../Cards/BlackCard';

const LeftPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .player-list-wrapper {
    overflow-x: auto;
    flex-grow: 1;
  }

  .buttons-wrapper {
    display: block;
    margin-bottom: 20px;
  }

  .bottom-left-wrapper {
    margin: 20px auto 32px;
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .join-code-wrapper {
    display: flex;
    justify-content: center;
  }

  .host-pregame-button {
    padding: 0;
    background-color: var(--primary-background-color);
    color: var(--primary-text-color);
    margin: auto auto 12px;
  }
`;

const RightPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  .card-display {
    height: 100%;

    margin-top: 64px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .czar-display {
    font-size: 24px;
    font-weight: 600;

    line-height: 24px;

    .czar-name {
      margin-bottom: 48px;
      padding-left: 16px;

      font-size: 36px;
      font-weight: 600;
    }
  }
`;

function LeftPanel() {
  const { state } = useContext(HostContext);
  const { players, playerIDs, lobbyID } = state;

  return (
    <LeftPanelWrapper>
      <div className="player-list-wrapper">
        <PlayerList playerList={{ players, playerIDs }} />
      </div>
      <div className="bottom-left-wrapper">
        <div className="join-code-wrapper">
          <JoinCode loading={state.loading} code={lobbyID} />
        </div>
      </div>
    </LeftPanelWrapper>
  );
}

function RightPanel() {
  const { state } = useContext(HostContext);

  const { selectedBlackCard, players, playerIDs } = state;

  const czar = players[playerIDs.find((player) => players[player].isCzar)];

  return (
    <RightPanelWrapper>
      <div className="card-display">
        <div className="czar-display">
          <p>CZAR:</p>
          <p data-testid="czar-name" className="czar-name">
            {czar.name.toUpperCase()}
          </p>
        </div>

        <BlackCard pickCount={selectedBlackCard.pick} data-test-id="black-card">
          {selectedBlackCard.text}
        </BlackCard>
      </div>
    </RightPanelWrapper>
  );
}

function HostBlackCardScreen() {
  const { state, dispatch } = useContext(HostContext);

  const { players, playerIDs, selectedBlackCard } = state;

  useEffect(async () => {
    if (state.gameState === 'waiting-to-receive-cards') {
      await dispatch({
        type: 'SEND_CARDS_TO_PLAYERS',
        payload: { players, playerIDs, selectedBlackCard },
      });
      await dispatch({
        type: 'NOTIFY_CZAR',
        payload: {
          players,
          playerIDs,
        },
      });
    }
  }, [state.gameState]);
  return (
    <HostLayout
      className="primary-background"
      left={<LeftPanel />}
      right={<RightPanel />}
      modal={<HostSettingsMenu />}
    />
  );
}

export default HostBlackCardScreen;
