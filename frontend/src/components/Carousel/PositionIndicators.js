import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import blackCard from './blackCard.svg';
import whiteCard from './whiteCard.svg';

const propTypes = {
  slides: PropTypes.arrayOf(PropTypes.node).isRequired,
  currentIndex: PropTypes.number.isRequired,
  selectThisSlide: PropTypes.func.isRequired,
};

const StyledPositionIndicators = styled.div`
  display: flex;
  justify-content: center;

  .positionButton {
    border: none;
    background-color: transparent;
  }
`;

function PositionIndicators({ slides, currentIndex, selectThisSlide }) {
  return (
    <StyledPositionIndicators>
      {slides.map((slide, index) => (
        <button
          className="positionButton"
          type="button"
          onClick={() => selectThisSlide(index)}
          key={slide.type.name}
        >
          <img
            src={slides[index] === slides[currentIndex] ? blackCard : whiteCard}
            alt="positionIndicator"
          />
        </button>
      ))}
    </StyledPositionIndicators>
  );
}

PositionIndicators.propTypes = propTypes;

export default PositionIndicators;
