import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import HostLayout from '../../layouts/HostLayout';
import PlayerList from '../../PlayerList/PlayerList';
import GameSettings from '../../GameSettings/GameSettings';
import PregameSettingsModal from '../../HostSettingsMenu/PregameSettingsModal';
import JoinCode from '../../JoinCode/JoinCode';
import Button from '../../Buttons/Button';
import PregameWelcomeText from '../../PregameWelcomeText/PregameWelcomeText';
import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';

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

  .top {
    display: flex;
    justify-content: center;
    height: 60%;
    overflow-y: auto;
  }

  .bottom {
    height: 40%;
  }
`;

function LeftPanel() {
  const { state, dispatch } = useContext(HostContext);
  const { players, playerIDs, lobbyID } = state;

  const handleClickStart = async () => {
    // check if there are any players and if packs are selected
    if (playerIDs.length && state.gameSettings.selectedPacks.length) {
      const { selectedPacks } = state.gameSettings;
      dispatch({ type: 'GET_DECK', payload: {} });
      await dispatch({
        type: 'SET_DECK',
        payload: { selectedPacks },
      });
      await dispatch({
        type: 'START_GAME',
        payload: {},
      });
      await dispatch({
        type: 'SET_NEXT_CZAR',
        payload: {},
      });
      await dispatch({
        type: 'SELECT_BLACK_CARD',
        payload: {},
      });
      await dispatch({ type: 'DEAL_WHITE_CARDS', payload: {} });
    }
    // TODO: add else statement to warn that you cannot play a game with no players
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
          <JoinCode
            loading={state.loading.includes('join-code')}
            code={lobbyID}
          />
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
        {state.loading.includes('getting-deck') ? (
          <LoadingIndicator />
        ) : (
          <PregameWelcomeText />
        )}
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
      modal={<PregameSettingsModal />}
    />
  );
}

export default HostPregameScreen;
