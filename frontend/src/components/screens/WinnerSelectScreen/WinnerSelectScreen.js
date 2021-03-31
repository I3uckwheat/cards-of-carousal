import React, { useContext } from 'react';
import styled from 'styled-components';

import HostLayout from '../../layouts/HostLayout';
import HostSettingsMenu from '../../HostSettingsMenu/HostSettingsMenu';
import PlayerList from '../../PlayerList/PlayerList';
import JoinCode from '../../JoinCode/JoinCode';
import { HostContext } from '../../../contexts/HostContext/HostContext';

const LeftPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-shrink: 1 0;

  .player-list-wrapper {
    overflow-x: auto;
    border-bottom: 1px solid var(--primary-text-color);
    flex-grow: 1;
  }

  .join-code-wrapper {
    margin: 20px auto 32px;
  }
`;

const RightPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .game-description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--primary-background-color);
    align-self: center;
    margin: 24px;
    padding: 8px;
    border-radius: 5px;
    font-size: 1.8rem;
    font-weight: 700;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  }

  .game-description p {
    margin: 16px 0;
  }

  .top {
    display: flex;
    height: 60%;
  }

  .bottom {
    height: 40%;
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
      <div className="join-code-wrapper">
        <JoinCode code={lobbyID} />
      </div>
    </LeftPanelWrapper>
  );
}

function RightPanel() {
  return (
    <RightPanelWrapper>
      <h1>hello world</h1>
    </RightPanelWrapper>
  );
}

function WinnerSelectScreen() {
  return (
    <HostLayout
      className="primary-background"
      left={<LeftPanel />}
      right={<RightPanel />}
      modal={<HostSettingsMenu />}
    />
  );
}

export default WinnerSelectScreen;
