import React from 'react';
import BlackCard from '../components/Cards/BlackCard';

const ex1 = "Knock, knock.\n\n(Who's there?)\n\n_.";

function SingleBlackCardExample() {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <BlackCard pickCount={1}>{ex1}</BlackCard>
    </div>
  );
}

export default SingleBlackCardExample;
