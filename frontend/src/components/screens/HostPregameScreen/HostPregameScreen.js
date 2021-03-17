import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import HostLayout from '../../layouts/HostLayout';
import PlayerList from '../../PlayerList/PlayerList';
import GameSettings from '../../GameSettings/GameSettings';
import HostSettingsMenu from '../../HostSettingsMenu/HostSettingsMenu.js';
import JoinCode from '../../JoinCode/JoinCode';
import Button from '../../Buttons/Button';

const LeftPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .player-list-wrapper {
    overflow-x: auto;
    border-bottom: 1px solid var(--primary-text-color);
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

  .start-carousing {
    font-size: 0.875rem;
    padding: 16px 34px;
  }

  .close-game {
    font-size: 0.625rem;
    padding: 8px 20px;
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
  const { state, dispatch } = useContext(HostContext);
  const { players, playerIDs, lobbyID } = state;

  const handleClickStart = () => {
    // check if there are any players
    if (Object.keys(state.players).length) {
      dispatch({
        type: 'SET_GAME_STATE',
        payload: { gameState: 'waiting-for-deck' },
      });
      dispatch({
        type: 'SET_NEW_CZAR',
        payload: {},
      });
    }
    // TODO: add else statement to warn that you cannot play a game with no players
  };

  const handleClickClose = () => {
    dispatch({ type: 'CLOSE_GAME' });
    window.location.reload();
  };

  return (
    <LeftPanelWrapper>
      <div className="player-list-wrapper">
        <PlayerList playerList={{ players, playerIDs }} />
      </div>
      <div className="bottom-left-wrapper">
        <div className="buttons-wrapper">
          <Button className="host-pregame-button" onClick={handleClickStart}>
            <div className="start-carousing">START CAROUSING</div>
          </Button>
          <Button className="host-pregame-button" onClick={handleClickClose}>
            <div className="close-game">CLOSE GAME</div>
          </Button>
        </div>
        <div className="join-code-wrapper">
          <JoinCode code={lobbyID} />
        </div>
      </div>
    </LeftPanelWrapper>
  );
}

function RightPanel() {
  const { state, dispatch } = useContext(HostContext);
  const { gameSettings } = state;

  const onChangeSettings = (settings) => {
    dispatch({
      type: 'SET_GAME_SETTINGS',
      payload: { gameSettings: settings },
    });
  };

  return (
    <RightPanelWrapper>
      <div className="top">
        <div className="game-description">
          <p>Cards of Carousal is a game for lorem ipsum dolor.</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
            doloribus quaerat incidunt excepturi odit eos!
          </p>
          <p>
            Qui delectus laboriosam aperiam maxime optio, architecto asperiores,
            at ullam.
          </p>
        </div>
      </div>
      <div className="bottom">
        <GameSettings options={gameSettings} onChange={onChangeSettings} />
      </div>
    </RightPanelWrapper>
  );
}

function HostPregameScreen() {
  const { dispatch } = useContext(HostContext);

  useEffect(() => {
    dispatch({ type: 'CREATE_LOBBY', payload: {} });
  }, []);

  return (
    <HostLayout
      className="primary-background"
      left={<LeftPanel />}
      right={<RightPanel />}
      modal={<HostSettingsMenu />}
    />
  );
}

export default HostPregameScreen;
