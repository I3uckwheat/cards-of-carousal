import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PositionIndicators from './PositionIndicators';

const propTypes = {
  slides: PropTypes.arrayOf(PropTypes.node).isRequired,
  interval: PropTypes.number.isRequired,
};

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
    <div>
      {slides[currentSlideIndex]}
      <PositionIndicators
        slides={slides}
        currentIndex={currentSlideIndex}
        selectThisSlide={selectSlide}
      />
    </div>
  );
}

Carousel.propTypes = propTypes;

export default Carousel;
