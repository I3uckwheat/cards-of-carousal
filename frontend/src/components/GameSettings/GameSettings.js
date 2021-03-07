import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 24px auto 24px 60px;

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

  input[type='checkbox'] {
    margin-right: 12px;
    margin-left: 0;
  }

  .select-wrapper {
    flex-direction: column;
  }

  .select-wrapper h2 {
    font-size: 1rem;
    font-weight: bold;
  }

  // TODO Make breakpoints down to one column for the grid, and up-to however many on large screens
  .card-packs {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    border: none;
    margin: 0;
    padding: 0 0 16px 0;
  }
  }

  .card-packs label {
    margin-right: 12px;
    align-items: center;
    display: flex;
    margin-bottom: auto;
  }

  input[type='checkbox'] {
    margin-right: 11px;
    margin-bottom: auto;
    margin-top: 4px;
  }

`;

async function getPackNames() {
  const response = await fetch('http://localhost:4000/deck');
  const data = await response.json();
  return data;
}

function GameSettings({ options, onChange }) {
  const [cardPacks, setCardPacks] = useState([]);

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
              min="2"
              max="12"
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
              min="1"
              max="15"
            />
          </label>
        </div>

        <div className="select-wrapper">
          <h2>SELECT CARD PACKS</h2>

          <fieldset className="card-packs">
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
          </fieldset>
        </div>
      </StyledForm>
    </StyledGameSettings>
  );
}

GameSettings.propTypes = propTypes;
export default GameSettings;
