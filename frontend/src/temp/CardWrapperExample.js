import React from 'react';
import CardWrapper from '../components/CardWrapper/CardWrapper';
import WhiteCard from '../components/Cards/WhiteCard';

function CardWrapperExample() {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <CardWrapper>
          <WhiteCard>No value passed into select prop</WhiteCard>
        </CardWrapper>
      </div>
      <div>
        <CardWrapper select="winner">
          <WhiteCard>Winner string passed into select prop</WhiteCard>
        </CardWrapper>
      </div>
      <div>
        <CardWrapper select={1}>
          <WhiteCard>Positive number passed into select prop</WhiteCard>
        </CardWrapper>
      </div>
      <div>
        <CardWrapper select="winner">
          <WhiteCard>Group of winning cards</WhiteCard>
          <WhiteCard>Group of winning cards</WhiteCard>
          <WhiteCard>Group of winning cards</WhiteCard>
        </CardWrapper>
      </div>
    </div>
  );
}

export default CardWrapperExample;
