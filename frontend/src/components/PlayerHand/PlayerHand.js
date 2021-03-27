import React from 'react';
import PropTypes from 'prop-types';
import WhiteCard from '../Cards/WhiteCard';
import CardWrapper from '../CardWrapper/CardWrapper';

const propType = {
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCards: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default function PlayerHand({ cards, selectedCards, onSelect }) {
  const handleClick = (cardIndex) => {
    const newArray = [...selectedCards];

    if (selectedCards.includes(cardIndex)) {
      const indexOfSelectedCard = selectedCards.indexOf(cardIndex); // finds index in selectedCards[] that  that contains the clicked card
      newArray.splice(indexOfSelectedCard, 1);
    } else {
      newArray.push(cardIndex);
    }
    onSelect([...newArray]);
  };

  return (
    <>
      {cards.map((card, cardsIndex) => {
        const badge = selectedCards.includes(cardsIndex)
          ? selectedCards.indexOf(cardsIndex) + 1
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
    </>
  );
}

PlayerHand.propTypes = propType;
