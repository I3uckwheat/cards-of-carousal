import React from 'react';
import CardWrapper from '../components/CardWrapper/CardWrapper';
import WhiteCard from '../components/Cards/WhiteCard';

function CardWrapperExample() {
  return (
    <div
      style={{
        display: 'flex',
        width: '90%',
        height: '100vh',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <CardWrapper>
          <WhiteCard>No value passed into selection prop</WhiteCard>
        </CardWrapper>
      </div>
      <div>
        <CardWrapper selection="winner">
          <WhiteCard>Winner string passed into selection prop</WhiteCard>
        </CardWrapper>
      </div>
      <div>
        <CardWrapper selection={1}>
          <WhiteCard>Positive number passed into selection prop</WhiteCard>
        </CardWrapper>
      </div>
      <div>
        <CardWrapper selection="winner">
          <WhiteCard>Group of winning cards</WhiteCard>
          <WhiteCard>Group of winning cards</WhiteCard>
          <WhiteCard>Group of winning cards</WhiteCard>
        </CardWrapper>
      </div>
    </div>
  );
}

export default CardWrapperExample;
