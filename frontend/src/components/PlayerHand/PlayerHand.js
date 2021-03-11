/* to test this component, import the 'PlayerHandExample' in 'Temp' into your App.js */

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
    const newArray = [...selected];

    if (selected.includes(index)) {
      const indexOfSelected = selected.indexOf(index); // finds index in selected[] that  that contains the clicked card
      newArray.splice(indexOfSelected, 1);
    } else {
      newArray.push(index);
    }
    onSelect([...newArray]);
  };

  return (
    <div>
      {cards.map((card, cardsIndex) => {
        const badge = selected.includes(cardsIndex)
          ? selected.indexOf(cardsIndex) + 1
          : null;
        return (
          <CardWrapper
            key={card}
            onClick={() => handleClick(cardsIndex)}
            selection={badge}
          >
            <WhiteCard>{card}</WhiteCard>
          </CardWrapper>
        );
      })}
    </div>
  );
}

PlayerHand.propTypes = propType;
