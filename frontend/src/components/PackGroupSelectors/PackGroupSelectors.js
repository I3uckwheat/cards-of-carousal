import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../Buttons/Button';
import config from '../../config';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.shape({
    maxPlayers: PropTypes.number.isRequired,
    winningScore: PropTypes.number.isRequired,
    selectedPacks: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

const SelectorContainer = styled.div`
  display: flex;
  margin-bottom: 10px;

  Button {
    margin-right: 5px;
    width: 100px;
    font-size: 16px;
    padding: 5px;
  }
`;

function PackGroupSelectors({ onChange, options }) {
  function resetPacksOptionHandler() {
    const { initialSelectedPack } = config;
    onChange({
      ...options,
      selectedPacks: initialSelectedPack,
    });
  }

  function SFWPackOptionHandler() {
    onChange({
      ...options,
      selectedPacks: [94],
    });
  }

  return (
    <SelectorContainer>
      <Button type="button" onClick={SFWPackOptionHandler} isActive>
        SFW Only
      </Button>
      <Button type="button" onClick={resetPacksOptionHandler} isActive>
        Reset
      </Button>
    </SelectorContainer>
  );
}

PackGroupSelectors.propTypes = propTypes;

export default PackGroupSelectors;
