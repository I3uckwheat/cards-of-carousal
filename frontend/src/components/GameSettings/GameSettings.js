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

  .label {
    display: flex;
    width: 400px;
    justify-content: space-between;
    font-weight: bold;
  }

  .input {
    font-weight: bold;
    text-align: center;
    width: 80px;
  }

  .f {
    display: flex;
  }
  .select-card {
    font-weight: bold;
  }

  .input-wrapper {
    justify-content: space-between;
    width: 300px;
    align-items: center;
  }

  .select-wrapper {
    flex-direction: column;
  }

  .card-packs {
    flex-wrap: wrap;
  }

  .pack {
    flex-direction: row;
    flex-basis: 150px;
    justify-content: space-between;
    margin: 3px 16px;
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
        <div className="f input-wrapper">
          <label htmlFor="mplayers" id="mplayers" className="label">
            MAX PLAYERS
            <input
              type="number"
              id="mplayers"
              name="mplayers"
              value="5"
              className="input"
            />
          </label>
        </div>

        <div className="f input-wrapper">
          <label htmlFor="wscore" id="wscore" className="label">
            WINNING SCORE
            <input
              type="number"
              id="wscore"
              name="wscore"
              value="5"
              className="input"
            />
          </label>
        </div>

        <div className="select-wrapper f">
          <label htmlFor="packs" className="select-card">
            SELECT CARD PACKS
            <div className="card-packs f">
              {cardPacks.map((name) => (
                <div className="f pack">
                  <label htmlFor={name}>{name}</label>
                  <input value={name} id={name} type="checkbox" name="pack" />
                </div>
              ))}
            </div>
          </label>
        </div>
      </StyledForm>
    </StyledGameSettings>
  );
}

export default GameSettings;
