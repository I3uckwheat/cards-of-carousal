import React, { useContext } from 'react';
import styled from 'styled-components';

import HostLayout from '../../layouts/HostLayout';
import InGameSettingsModal from '../../HostSettingsMenu/InGameSettingsModal';
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

  .czar-title {
    display: flex;
    flex-direction: column;
    margin: 25px 0;
    line-height: 1em;

    font-size: 56px;
    font-weight: 900;
    text-transform: uppercase;

    span {
      font-size: 24px;
      text-indent: -20px;
      margin-bottom: -8px;
      line-height: 1em;
    }
  }

  .white-cards {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 20px;
    place-items: center;
    justify-content: center;
    padding: 40px 0;
    width: 100%;
    max-height: 250px;
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
  const { state } = useContext(HostContext);
  const { players } = state;

  const currentCzar = Object.values(players).find((player) => player.isCzar);

  const highlightedPlayer =
    state.players[state.playerIDs[currentCzar.submittedCards[0]]];

  return (
    <RightPanelWrapper>
      <h1 className="czar-title">
        <span>Czar:</span>
        {currentCzar.name}
      </h1>

      <BlackCard pickCount={state.selectedBlackCard.pick}>
        {state.selectedBlackCard.text}
      </BlackCard>

      <div className="white-cards">
        {highlightedPlayer?.submittedCards.map((cardIndex) => (
          <WhiteCard key={cardIndex}>
            {highlightedPlayer.cards[cardIndex].text}
          </WhiteCard>
        ))}
      </div>
    </RightPanelWrapper>
  );
}

function WinnerSelectScreen() {
  return (
    <HostLayout
      className="primary-background"
      left={<LeftPanel />}
      right={<RightPanel />}
      modal={<InGameSettingsModal />}
    />
  );
}

export default WinnerSelectScreen;
