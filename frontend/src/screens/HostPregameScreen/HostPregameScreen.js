import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import config from '../../config';
import { HostContext } from '../../contexts/HostContext/HostContext';
import HostLayout from '../../layouts/HostLayout';
import PlayerList from '../../components/PlayerList/PlayerList';
import GameSettings from '../../components/GameSettings/GameSettings';
import PregameSettingsModal from '../../components/HostSettingsMenu/PregameSettingsModal';
import JoinCode from '../../components/JoinCode/JoinCode';
import Button from '../../components/Buttons/Button';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import AlertModal from '../../components/Modal/AlertModal';
import PregameWelcomeText from '../../components/PregameWelcomeText/PregameWelcomeText';

const errorHandlerPropTypes = {
  errorString: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
};

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
    position: relative;
    display: flex;
    justify-content: center;
    height: 60%;
    overflow-y: auto;
  }

  .bottom {
    height: 40%;
  }
`;

function ErrorHandler({ errorString, setError }) {
  function reload() {
    return window.location.reload();
  }
  function closeModal() {
    return setError('');
  }

  switch (errorString) {
    case 'error-getting-cards':
      return (
        <AlertModal
          bigText="Failed to retrieve cards"
          smallText="Please try again later"
          buttonText="Click to restart"
          onClick={reload}
        />
      );
    case 'not-enough-players':
      return (
        <AlertModal
          bigText="Unable to start game"
          smallText="No offense, but this game requires friends to play."
          buttonText="Click anywhere to continue"
          onClick={closeModal}
        />
      );
    case 'no-card-packs-selected':
      return (
        <AlertModal
          bigText="Unable to start game"
          smallText="Please pick at least one card pack."
          buttonText="Click anywhere to continue"
          onClick={closeModal}
        />
      );
    default:
      return null;
  }
}

ErrorHandler.propTypes = errorHandlerPropTypes;

function LeftPanel() {
  const { state, dispatch } = useContext(HostContext);
  const { lobbyID, newPlayerStaging } = state;

  const [error, setError] = useState('');

  const handleClickStart = async () => {
    // check if there are any players and if packs are selected
    if (
      newPlayerStaging.length >= config.maxPlayers.min &&
      state.gameSettings.selectedPacks.length
    ) {
      const { selectedPacks } = state.gameSettings;

      dispatch({ type: 'GET_DECK', payload: {} });

      try {
        await dispatch({
          type: 'SET_DECK',
          payload: { selectedPacks },
        });
        dispatch({ type: 'ADD_PLAYERS_FROM_STAGING', payload: {} });
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
      } catch (err) {
        // The only cause of an error here would be a failure to retrieve card packs
        setError('error-getting-cards');
      }
    } else {
      // The only failure cases here are:
      //  a) not enough players, or b) card packs aren't selected
      const errorString =
        newPlayerStaging.length >= config.maxPlayers.min
          ? 'no-card-packs-selected'
          : 'not-enough-players';

      setError(errorString);
    }
  };

  const handleClickClose = async () => {
    await dispatch({ type: 'CLOSE_GAME', payload: {} });
    window.location.reload();
  };

  return (
    <LeftPanelWrapper>
      <div className="player-list-wrapper">
        <PlayerList />
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

      <ErrorHandler errorString={error} setError={setError} />
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
