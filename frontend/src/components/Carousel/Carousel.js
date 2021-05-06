import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PositionIndicators from './PositionIndicators';

const propTypes = {
  slides: PropTypes.arrayOf(PropTypes.node).isRequired,
  interval: PropTypes.number.isRequired,
};

const StyledCarousel = styled.div`
  width: 100%;
  height: 100%;
`;
function Carousel({ slides, interval }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isCarouselActive, setIsCarouselActive] = useState(true);

  function nextSlide() {
    setCurrentSlideIndex(
      currentSlideIndex + 1 < slides.length ? currentSlideIndex + 1 : 0,
    );
  }

  function selectSlide(index) {
    setCurrentSlideIndex(index);
    setIsCarouselActive(false);
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
      <PositionIndicators
        slides={slides}
        currentIndex={currentSlideIndex}
        selectThisSlide={selectSlide}
      />
    </StyledCarousel>
  );
}

Carousel.propTypes = propTypes;

export default Carousel;
