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
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;

  .positionButton {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  @media (min-width: 1600px) {
    .positionButton {
      margin: 0 4px;
    }
    img {
      height: 72px;
    }
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
            src={index === currentIndex ? blackCard : whiteCard}
            alt={
              index === currentIndex
                ? 'active position indicator'
                : 'inactive position indicator'
            }
          />
        </button>
      ))}
    </StyledPositionIndicators>
  );
}

PositionIndicators.propTypes = propTypes;

export default PositionIndicators;
