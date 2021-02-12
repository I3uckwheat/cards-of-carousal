import React from 'react';
import WhiteCard from '../components/Cards/WhiteCard';

function WhiteCardExample() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100vw',
        justifyContent: 'space-evenly',
        paddingTop: '20px',
      }}
    >
      <div style={{ padding: '10px' }}>
        <WhiteCard>
          Stacked card SVG hidden when string too long. Extra text. Extra text.
          Extra text. Extra text. Extra text. Extra text. Extra text.
        </WhiteCard>
      </div>
      <div style={{ padding: '10px' }}>
        <WhiteCard>I want to do it by myseeeeeeeelf!</WhiteCard>
      </div>
      <div style={{ padding: '10px' }}>
        <WhiteCard>
          This card is overflowing and the text is smaller ---- Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </WhiteCard>
      </div>
      <div style={{ padding: '10px' }}>
        <WhiteCard>A baby that smokes and plays the ukulele</WhiteCard>
      </div>
    </div>
  );
}

export default WhiteCardExample;
