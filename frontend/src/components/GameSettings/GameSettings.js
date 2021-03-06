import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledGameSettings = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--secondary-background-color);
  color: var(--secondary-text-color);

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

  label {
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
    margin-left: 8px;
  }

  .select-wrapper {
    flex-direction: column;
  }

  .select-wrapper h2 {
    font-size: 1rem;
    font-weight: bold;
  }

  .card-packs {
    display: grid;
  }

  .card-packs label {
    display: block;
    margin: 8px 0;
  }
`;

async function getPackNames() {
  const response = await fetch('http://localhost:4000/deck');
  const data = await response.json();
  return data;
}

// function createDummyPacks() {
//   const packs = {};
//   for (let i = 0; i < 30; i += 1) {
//     packs[i] = { name: `Card Pack ${i}` };
//   }
//   return packs;
// }

function GameSettings() {
  const [cardPacks, setCardPacks] = useState([]);

  useEffect(async () => {
    const packNames = await getPackNames();
    setCardPacks(packNames);
  }, []);

  return (
    <StyledGameSettings>
      <h1>GAME SETTINGS</h1>

      <StyledForm>
        <label htmlFor="mplayers">
          MAX PLAYERS
          <input type="number" id="mplayers" name="mplayers" value="5" />
        </label>

        <label htmlFor="wscore">
          WINNING SCORE
          <input type="number" id="wscore" name="wscore" value="5" />
        </label>

        <div className="select-wrapper">
          <h2>SELECT CARD PACKS</h2>

          <div className="card-packs">
            {cardPacks.map((name) => (
              <label htmlFor={name}>
                {name}
                <input value={name} id={name} type="checkbox" name="pack" />
              </label>
            ))}
          </div>
        </div>
      </StyledForm>
    </StyledGameSettings>
  );
}

export default GameSettings;
