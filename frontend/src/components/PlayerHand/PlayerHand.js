/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import WhiteCard from '../Cards/WhiteCard';
import CardWrapper from '../CardWrapper/CardWrapper';

const propType = {
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default function PlayerHand({ cards, selected, onSelect }) {
  const handleClick = (index) => {
    onSelect([...selected, index]); // spreading makes a copy
  };

  return (
    <div // temporary horizontal styling   Need to add styling that allows for horizontal scrolling
      style={{
        display: 'flex',
        width: '90%',
        height: '100vh',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {cards.map((card, index) => {
        const badge = selected.includes(index)
          ? selected.indexOf(index) + 1
          : null;
        return (
          <CardWrapper onClick={() => handleClick(index)} selection={badge}>
            <WhiteCard key={card}>{card}</WhiteCard>
          </CardWrapper>
        );
      })}
    </div>
  );
}

PlayerHand.propTypes = propType;

/* ON SELECT CALLBACK

- Fires the onSelect callback when a card is touched, with the indexes of the selected cards

- I would like the onSelect callback to be passed an array of selected card indexes

- I would like to be able to select, and deselect cards before submitting, so I can change my mind before committing to a decision


-A function that checks if that number is in the selected[] and if it is in the selected[] array remove it.

function updateSelection ([...]) {
    checks if that number is in the selected[] and if it is in the selected[] array remove it else add it
}

*/
