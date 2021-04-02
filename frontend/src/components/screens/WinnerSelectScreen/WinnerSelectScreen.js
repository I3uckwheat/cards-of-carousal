import React, { useContext } from 'react';
import styled from 'styled-components';

import HostLayout from '../../layouts/HostLayout';
import HostSettingsMenu from '../../HostSettingsMenu/HostSettingsMenu';
import PlayerList from '../../PlayerList/PlayerList';
import JoinCode from '../../JoinCode/JoinCode';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import BlackCard from '../../Cards/BlackCard';
import WhiteCard from '../../Cards/WhiteCard';

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
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const CzarTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 0;

  span,
  .czar-name {
    font-weight: 900;
    text-transform: uppercase;
    line-height: 1em;
  }

  span {
    font-size: 24px;
    text-indent: -16px;
    margin-bottom: -8px;
  }

  .czar-name {
    font-size: 56px;
  }
`;

const WhiteCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 20px;
  place-items: center;
  justify-content: center;
  padding: 40px 0;
  width: 100%;
  height: 250px;
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
  const { state } = useContext(HostContext);
  const { players } = state;

  const currentCzar = Object.values(players).find((player) => player.isCzar);

  return (
    <RightPanelWrapper>
      <CzarTitle>
        <span>Czar:</span>
        <h1 className="czar-name">{currentCzar.name}</h1>
      </CzarTitle>

      <BlackCard pickCount={2}>
        He alone, who owns the _(s), gains the _(s).
      </BlackCard>

      <WhiteCards>
        <div className="foo">
          <WhiteCard>Text for test</WhiteCard>
        </div>
        <WhiteCard>Text for test</WhiteCard>
        <WhiteCard>Text for test</WhiteCard>
      </WhiteCards>
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
