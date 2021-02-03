import React from 'react';
import WhiteCardSVG from './assets/WhiteCard.svg';
import BlackCardSVG from './assets/BlackCard.svg';

function LayeredCards() {
  return (
    <div style={{ position: 'relative' }}>
      <img
        style={{
          position: 'absolute',
          bottom: '4px',
          left: '9px',
        }}
        src={WhiteCardSVG}
        alt="white card"
      />
      <img src={BlackCardSVG} alt="black card" />
    </div>
  );
}

export default LayeredCards;
