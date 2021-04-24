import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  slides: PropTypes.arrayOf(PropTypes.node).isRequired,
  interval: PropTypes.number.isRequired,
};

const StyledCarousel = styled.div`
  button {
    background-color: var(--primary-background-color);
    border: solid black 2px;
    margin: 20px;
  }

  .slideshowControls {
    display: flex;
    justify-content: center;
  }
`;

function Carousel({ slides, interval }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isCarouselActive, setIsCarouselActive] = useState(true);

  function nextSlide() {
    setCurrentSlideIndex(
      currentSlideIndex + 1 < slides.length ? currentSlideIndex + 1 : 0,
    );
  }

  function toggleCarouselIsActive() {
    setIsCarouselActive(!isCarouselActive);
  }

  function previousSlide() {
    setCurrentSlideIndex(
      currentSlideIndex === 0 ? slides.length - 1 : currentSlideIndex - 1,
    );
  }

  useEffect(() => {
    if (isCarouselActive) {
      const autoCarouselRotation = setInterval(() => nextSlide(), interval);
      return () => clearInterval(autoCarouselRotation);
    }

    return null;
  }, [currentSlideIndex, isCarouselActive]);

  return (
    <StyledCarousel>
      {slides[currentSlideIndex]}
      <div className="slideshowControls">
        <button type="button" onClick={previousSlide}>
          LAST
        </button>
        <button type="button" onClick={toggleCarouselIsActive}>
          {isCarouselActive ? 'OKAY STOP CHANGING' : 'START CHANGING AGAIN'}
        </button>
        <button type="button" onClick={nextSlide}>
          NEXT
        </button>
      </div>
    </StyledCarousel>
  );
}

Carousel.propTypes = propTypes;

export default Carousel;
