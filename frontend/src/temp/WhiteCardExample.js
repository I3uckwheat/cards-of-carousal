import React from 'react';
import WhiteCard from '../components/Cards/WhiteCard';

function WhiteCardExample() {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      width: '100vw',
      justifyContent: 'space-evenly',
      paddingTop: '20px',
    }}
    >
      <div style={{ padding: '10px' }}>
        <WhiteCard>
          Overflow scrollbars on desktop will be black. Overflow scrollbars on mobile will be
          regular mobile scrollbars. Extra text to make this overflow.
          Extra text to make this overflow.
          Extra text to make this overflow.
        </WhiteCard>
      </div>
      <div style={{ padding: '10px' }}>
        <WhiteCard>
          {'break-word, is that what we want? ->'}
        </WhiteCard>
      </div>
      <div style={{ padding: '10px' }}>
        <WhiteCard>
          I want to do it by myseeeeeeeelf!
        </WhiteCard>
      </div>
      <div style={{ padding: '10px' }}>
        <WhiteCard>
          This card is overflowing and the text is smaller ----
          Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </WhiteCard>
      </div>
      <div style={{ padding: '10px' }}>
        <WhiteCard>
          {"Do we want these layered cards in the corner on large \
            size WhiteCards? In the Figma they're hidden"}
        </WhiteCard>
      </div>
    </div>
  );
}

export default WhiteCardExample;
