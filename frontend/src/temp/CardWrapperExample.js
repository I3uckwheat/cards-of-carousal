import React from 'react';
import CardWrapper from '../components/CardWrapper/CardWrapper';
import WhiteCard from '../components/Cards/WhiteCard';

function CardWrapperExample() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}
    >
      <div>
        <p>Wrapper With Truthy Select Prop</p>
        <CardWrapper select="winner">
          <WhiteCard>I want to do it by myseeeeeeeelf!</WhiteCard>
        </CardWrapper>
      </div>
      <div>
        <p>Wrapper With Falsy Select Prop</p>
        <CardWrapper select={0}>
          <WhiteCard>I want to do it by myseeeeeeeelf!</WhiteCard>
        </CardWrapper>
      </div>
      <div>
        <p>Wrapper With Winner Select Prop</p>
        <CardWrapper select={0}>
          <WhiteCard>I want to do it by myseeeeeeeelf!</WhiteCard>
        </CardWrapper>
      </div>
    </div>
  );
}

export default CardWrapperExample;
