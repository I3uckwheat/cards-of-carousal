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
        <div>
          <CardWrapper select="winner">
            <WhiteCard>I want to do it by myseeeeeeeelf!</WhiteCard>
          </CardWrapper>
        </div>
        <div>
          <CardWrapper select={0}>
            <WhiteCard>I want to do it by myseeeeeeeelf!</WhiteCard>
          </CardWrapper>
        </div>
        <div>
          <CardWrapper select={1}>
            <WhiteCard>I want to do it by myseeeeeeeelf!</WhiteCard>
          </CardWrapper>
        </div>
      </div>
      <div>
        <CardWrapper select="winner">
          <WhiteCard>I want to do it by myseeeeeeeelf!</WhiteCard>
          <WhiteCard>I want to do it by myseeeeeeeelf!</WhiteCard>
          <WhiteCard>I want to do it by myseeeeeeeelf!</WhiteCard>
        </CardWrapper>
      </div>
    </div>
  );
}

export default CardWrapperExample;
