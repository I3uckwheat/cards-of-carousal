import React from 'react';
import CardStackOffsetDark from '../../assets/cards-stack-offset-dark-icon.svg';

function LayeredCards() {
  return (
    <div style={{ position: 'relative' }}>
      <img
        src={CardStackOffsetDark}
        alt="offset black and white card stack"
        data-testid="layerCard"
      />
    </div>
  );
}

export default LayeredCards;
