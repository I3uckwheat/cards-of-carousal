import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledGameSettings = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--secondary-background-color);
  color: var(--secondary-text-color);
`;

const StyledH1 = styled.h1`
  margin-left: auto;
  font-size: 4rem;
  line-height: 4rem;
  margin-top: -0.5rem;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 24px auto 24px 60px;

  .label {
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

function createDummyPacks() {
  const packs = {};
  for (let i = 0; i < 30; i += 1) {
    packs[i] = { name: `Card Pack ${i}` };
  }
  return packs;
}

function GameSettings() {
  const [cardPacks] = useState(createDummyPacks());
  // eslint-disable-next-line no-console
  // console.log(Object.values(cardPacks));
  return (
    <StyledGameSettings>
      <StyledH1>GAME SETTINGS</StyledH1>
      <form>
        <StyledForm>
          <div className="f input-wrapper">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="mplayers" id="mplayers" className="label">
              MAX PLAYERS
            </label>
            <input
              type="number"
              id="mplayers"
              name="mplayers"
              value="5"
              className="input"
            />
          </div>
          <div className="f input-wrapper">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="wscore" id="wscore" className="label">
              WINNING SCORE
            </label>
            <input
              type="number"
              id="wscore"
              name="wscore"
              value="5"
              className="input"
            />
          </div>
          <div className="select-wrapper f">
            <label htmlFor="packs" className="select-card">
              SELECT CARD PACKS
              <div className="card-packs f">
                {Object.values(cardPacks).map((pack) => (
                  <div className="f pack">
                    <label htmlFor="pack">{pack.name}</label>
                    <input
                      value={pack.name}
                      id="pack"
                      type="checkbox"
                      name="pack"
                    />
                  </div>
                ))}
              </div>
            </label>
          </div>
        </StyledForm>
      </form>
    </StyledGameSettings>
  );
}

export default GameSettings;
