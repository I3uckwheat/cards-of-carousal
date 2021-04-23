import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import HostLayout from '../../layouts/HostLayout';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import PlayerList from '../../PlayerList/PlayerList';
import InGameSettingsModal from '../../HostSettingsMenu/InGameSettingsModal.js';
import JoinCode from '../../JoinCode/JoinCode';
import BlackCard from '../../Cards/BlackCard';
import WhiteCard from '../../Cards/WhiteCard';

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

    margin-top: 36px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .czar-display {
    font-size: 24px;
    font-weight: 600;

    line-height: 24px;

    .winner-name {
      margin-bottom: 48px;
      padding-left: 16px;

      font-size: 36px;
      font-weight: 600;
    }
  }
`;

const WhiteCardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: 80%;

  margin: 0 auto;
  margin-top: 32px;
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
          <JoinCode code={lobbyID} />
        </div>
      </div>
    </LeftPanelWrapper>
  );
}

function RightPanel() {
  const { state } = useContext(HostContext);

  const { selectedBlackCard, players, czarSelection } = state;

  const winner = players[czarSelection];

  return (
    <RightPanelWrapper>
      <div className="card-display">
        <div className="czar-display">
          <p>WINNER:</p>
          <p data-testid="winner-name" className="winner-name">
            {winner.name.toUpperCase()}
          </p>
        </div>

        <BlackCard pickCount={selectedBlackCard.pick} data-test-id="black-card">
          {selectedBlackCard.text.toUpperCase()}
        </BlackCard>
      </div>
      <WhiteCardWrapper>
        {/* TODO: Add resize of card text or alter display of white cards to better fit the screen */}
        {winner.submittedCards.map((card) => (
          <WhiteCard key={winner.cards[card].text}>
            {winner.cards[card].text}
          </WhiteCard>
        ))}
      </WhiteCardWrapper>
    </RightPanelWrapper>
  );
}

function HostWinnerScreen() {
  const { state, dispatch } = useContext(HostContext);

  const { players, playerIDs, czarSelection } = state;

  useEffect(async () => {
    const winnerName =
      players[playerIDs.find((id) => id === czarSelection)].name;
    const czar = playerIDs.find((id) => players[id].isCzar);
    const losers = playerIDs.filter(
      (playerID) => !players[playerID].isCzar && playerID !== czarSelection,
    );

    await dispatch({
      type: 'SEND_END_OF_ROUND_MESSAGES',
      payload: {
        winnerName,
        winnerId: czarSelection,
        losers,
        czar,
      },
    });
  }, []);

  return (
    <HostLayout
      className="primary-background"
      left={<LeftPanel />}
      right={<RightPanel />}
      modal={<InGameSettingsModal />}
    />
  );
}

export default HostWinnerScreen;
