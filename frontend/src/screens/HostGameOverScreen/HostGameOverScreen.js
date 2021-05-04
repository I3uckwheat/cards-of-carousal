import React, { useContext } from 'react';
import styled from 'styled-components';

import { HostContext } from '../../contexts/HostContext/HostContext';
import HostLayout from '../../layouts/HostLayout';
import PlayerList from '../../components/PlayerList/PlayerList';
import InGameSettingsModal from '../../components/HostSettingsMenu/InGameSettingsModal.js';
import JoinCode from '../../components/JoinCode/JoinCode';

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
    line-height: 1em;
    text-transform: uppercase;

    .prelude {
      font-size: 28px;
      text-indent: -40px;
    }

    .title {
      font-size: 64px;
      font-weight: 900;
      text-align: right;
    }
  }

  .thanks-message {
    font-size: 46px;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    flex: 1;
  }

  .details {
    position: relative;
    width: 100%;
    flex: 2;

    .detail-white,
    .detail-black {
      position: absolute;
      bottom: 0;
    }

    .detail-white {
      left: 0;
      width: 150px;
    }

    .detail-black {
      right: 0;
      width: 110px;
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
          <JoinCode code={lobbyID} />
        </div>
      </div>
    </LeftPanelWrapper>
  );
}

function RightPanel() {
  return (
    <RightPanelWrapper>
      <h1 className="winner-display">
        <span className="prelude">And the winner is...</span>
        <p className="title">BACON</p>
      </h1>

      <p className="thanks-message">Thank you for playing 🖖</p>

      <div className="details">
        <img className="detail-white" src={WhiteCardsTrio} alt="" />
        <img className="detail-black" src={BlackCardDiagonal} alt="" />
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
