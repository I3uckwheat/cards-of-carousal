import React from 'react';
import PlayerHandLayout from '../components/PlayerHandLayout/PlayerHandLayout';
import WhiteCard from '../components/Cards/WhiteCard';

const myTitle = {
  top: "YOU'RE THE CZAR,",
  bottom: 'PICK A WINNER',
};

// const myTitle = {
//   top: "PLAYER,",
//   bottom: 'PICK 2 CARDS',
// };

export default function LayoutExample() {
  return (
    <PlayerHandLayout title={myTitle} onClear={() => {}} onSubmit={() => {}}>
      <WhiteCard>Grace</WhiteCard>
      <WhiteCard>Sully</WhiteCard>
      <WhiteCard>Briggs</WhiteCard>
      <WhiteCard>Bender</WhiteCard>
      <WhiteCard>Tati</WhiteCard>
      <WhiteCard>Applyd</WhiteCard>
      <WhiteCard>Rubiks</WhiteCard>
      <WhiteCard>Pkepler</WhiteCard>
      <WhiteCard>James</WhiteCard>
      <WhiteCard>Oreo</WhiteCard>
    </PlayerHandLayout>
  );
}
