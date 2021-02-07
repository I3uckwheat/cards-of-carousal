import React from 'react';
import styled from 'styled-components';
import WhiteCardSVG from './assets/WhiteCard.svg';
import BlackCardSVG from './assets/BlackCard.svg';

const WhiteCard = styled.div`
  position: absolute;
  bottom: 4px;
  left: 9px;
  width: 32px;
  height: 42px;
`;

function LayeredCards() {
  return (
    <div style={{ position: 'relative' }}>
      <WhiteCard>
        <img
          src={WhiteCardSVG}
          alt="white card"
          data-testid="layerCard"
        />
      </WhiteCard>
      <img src={BlackCardSVG} alt="black card" data-testid="layerCard" />
    </div>
  );
}

export default LayeredCards;
