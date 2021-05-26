import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HostContext } from '../../contexts/HostContext/HostContext';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import config from '../../config';
import AlertModal from '../Modal/AlertModal';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.shape({
    maxPlayers: PropTypes.number.isRequired,
    winningScore: PropTypes.number.isRequired,
    selectedPacks: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

const StyledGameSettings = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--secondary-background-color);
  color: var(--secondary-text-color);
  overflow-y: auto;

  h1 {
    position: static;
  }

  @media only screen and (min-width: 1460px) {
    h1 {
      position: absolute;
      right: 0;
      top: 0;
      margin-left: auto;
    }
  }

  @media only screen and (min-width: 980px) {
    h1 {
      margin-left: auto;
      font-size: 4rem;
      line-height: 4rem;
      margin-top: -0.5rem;
      justify-content: center;
    }
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 0 24px 60px;

  .number-input-wrapper label {
    display: flex;
    width: 400px;
    justify-content: space-between;
    font-weight: bold;
  }

  input[type='number'] {
    font-weight: bold;
    text-align: center;
    width: 80px;
  }

  .select-wrapper {
    flex-direction: column;
  }

  .select-wrapper h2 {
    font-size: 1rem;
    font-weight: bold;
    height: 30px;
  }

  .select-wrapper .loader-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .card-packs {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
    grid-template-rows: auto;
    border: none;
    margin: 0;
    padding: 0 0 16px 0;
  }

  .card-packs label {
    margin-right: 12px;
    align-items: center;
    display: flex;
    margin-bottom: auto;
  }

  input[type='checkbox'] {
    margin: 4px 11px auto 0;
  }
`;

function GameSettings({ options, onChange }) {
  const [cardPacks, setCardPacks] = useState([]);
  const [minimumPlayerLimit, setMinimumPlayerLimit] = useState(
    config.maxPlayers.min,
  );
  const [error, setError] = useState('');
  const { state, dispatch } = useContext(HostContext);

  async function getPackNames() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/deck`);
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: 'PACKS_RECEIVED', payload: {} });
      return data;
    }
    throw new Error('Failed to fetch packs');
  }
  useEffect(async () => {
    dispatch({ type: 'GET_PACKS', payload: {} });
    try {
      const packNames = await getPackNames();
      return setCardPacks(packNames);
    } catch {
      return setError('failed-to-fetch-packs');
    }
  }, []);

  useEffect(() => {
    const playerCount = state.playerIDs.length + state.newPlayerStaging.length;
    setMinimumPlayerLimit(() =>
      playerCount > config.maxPlayers.min ? playerCount : config.maxPlayers.min,
    );
  }, [state.playerIDs, state.newPlayerStaging]);

  function numInRange(n, min, max) {
    if (Math.min(n, min) !== min) return min;
    if (Math.max(n, max) !== max) return max;
    return n;
  }

  function numberOptionHandler(event) {
    const { name, value: newValue } = event.target;

    onChange({
      ...options,
      [name]: numInRange(Number(newValue), config[name].min, config[name].max),
    });
  }

  function cardPackOptionHandler(event) {
    const cardPackItem = event.target;

    if (cardPackItem.checked) {
      onChange({
        ...options,
        selectedPacks: [
          ...options.selectedPacks,
          Number(cardPackItem.dataset.index),
        ],
      });
    } else {
      onChange({
        ...options,
        selectedPacks: options.selectedPacks.filter(
          (index) => index !== Number(cardPackItem.dataset.index),
        ),
      });
    }
  }

  return (
    <StyledGameSettings>
      <h1>GAME SETTINGS</h1>

      <StyledForm>
        <div className="number-input-wrapper">
          <label htmlFor="maxPlayers">
            MAX PLAYERS
            <input
              onChange={numberOptionHandler}
              type="number"
              id="maxPlayers"
              name="maxPlayers"
              value={options.maxPlayers}
              min={minimumPlayerLimit}
              max={config.maxPlayers.max}
            />
          </label>

          <label htmlFor="winningScore">
            WINNING SCORE
            <input
              onChange={numberOptionHandler}
              type="number"
              id="winningScore"
              name="winningScore"
              value={options.winningScore}
              min={config.winningScore.min}
              max={config.winningScore.max}
            />
          </label>
        </div>

        <div className="select-wrapper">
          <h2>SELECT CARD PACKS</h2>
          {state.loading.includes('getting-packs') ? (
            <div className="loader-wrapper">
              <LoadingIndicator secondary />
            </div>
          ) : (
            <div className="card-packs">
              {cardPacks.map((name, index) => (
                <label htmlFor={name} key={name}>
                  <input
                    onChange={cardPackOptionHandler}
                    id={name}
                    type="checkbox"
                    name={name}
                    checked={options.selectedPacks.includes(index)}
                    data-index={index}
                  />
                  {name}
                </label>
              ))}
            </div>
          )}
        </div>
      </StyledForm>
      {error && (
        <AlertModal
          bigText="Failed to get card packs"
          smallText="Please try again later"
          buttonText="Click anywhere to restart"
          onClick={() => window.location.reload()}
        />
      )}
    </StyledGameSettings>
  );
}

GameSettings.propTypes = propTypes;
export default GameSettings;
