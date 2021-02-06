import React from 'react';
import WhiteCardSVG from './assets/WhiteCard.svg';
import BlackCardSVG from './assets/BlackCard.svg';
import AbsolutePosition from './AbsolutePosition';

function LayeredCards() {
  return (
    <div style={{ position: 'relative' }}>
      <AbsolutePosition bottom="4px" left="9px" width="32px" height="42px">
        <img
          src={WhiteCardSVG}
          alt="white card"
          data-testid="layerCard"
        />
      </AbsolutePosition>
      <img src={BlackCardSVG} alt="black card" data-testid="layerCard" />
    </div>
  );
}

export default LayeredCards;
