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
`;


function GameSettings() {
  return (
    <StyledGameSettings>
      <StyledH1>
        GAME SETTINGS
      </StyledH1>
      <br />
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
    </StyledGameSettings>
    
  )
}

export default GameSettings;
