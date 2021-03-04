import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Header = styled.header`
  width: 100%;
  background-color: var(--secondary-background-color);
  color: var(--secondary-text-color);
`;

Header.propTypes = propTypes;

const StyledGameSettings = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 372px;
  width: 100%;
  background-color: var(--secondary-background-color);
  color: var(--secondary-text-color);
  
`;

const StyledH1 = styled.h1`
  margin-left: auto;
  font-size: 4rem;
  line-height: 4rem;
  margin-top: -0.5rem;
  justify-content: center;
  /* align-items: flex-end; */
  /* flex-direction: row-reverse; */
`;

const StyledForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: auto;
  padding-left: 8rem;
  width: 20rem;

  label {
    margin-bottom: 2rem;
    display: flex;
    font-weight: bold;
    width: auto;
  }

  input {
    display: flex;
    margin-left: 2rem;
    font-weight: bold;
    text-align: center;
  }
`;

function GameSettings() {
  return (
    <StyledGameSettings>
      <StyledH1>
        GAME SETTINGS
      </StyledH1>
      <StyledForm>
        <form>
          <label htmlFor="mplayers" id="mplayers">
            MAX PLAYERS
            <input type="number" id="mplayers" name="mplayers" value="5" /><br/>
            </label>
            <label htmlFor="wscore" id="wscore">
            WINNING SCORE
            <input type="number" id="wscore" name="wscore" value="5"/>
            </label>
            <p>SELECT CARD PACKS</p>
        </form>
      </StyledForm>
    </StyledGameSettings>
    
  )
}

export default GameSettings;
