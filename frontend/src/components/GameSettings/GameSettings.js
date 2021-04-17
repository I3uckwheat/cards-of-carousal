import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import config from '../../config';

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
    margin-left: auto;
    font-size: 4rem;
    line-height: 4rem;
    margin-top: -0.5rem;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
  }

  @media only screen and (max-width: 980px) {
    h1 {
      position: static;
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

  async function getPackNames() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/deck`);
    const data = await response.json();
    return data;
  }
  useEffect(async () => {
    const packNames = await getPackNames();
    setCardPacks(packNames);
  }, []);

  function numberOptionHandler(event) {
    const { name, value: newValue } = event.target;
    onChange({
      ...options,
      [name]: Number(newValue),
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
              min={config.maxPlayers.min}
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
        </div>
      </StyledForm>
    </StyledGameSettings>
  );
}

GameSettings.propTypes = propTypes;
export default GameSettings;
