import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CardWrapper from '../CardWrapper/CardWrapper';
import WhiteCard from '../Cards/WhiteCard';

const propTypes = {
  cards: PropTypes.arrayOf(PropTypes.array).isRequired,
  selectedGroup: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function CzarHand({ cards, selectedGroup, onSelect }) {
  const [unFlippedGroups, setUnflippedGroups] = useState([]);

  const handleClick = (index) => {
    if (!unFlippedGroups.includes(index)) {
      setUnflippedGroups([...unFlippedGroups, index]);
    }
    onSelect(index);
  };

  return (
    <>
      {cards.map((group, index) => (
        <CardWrapper
          key={group.toString()}
          selection={index === selectedGroup ? 'winner' : null}
          onClick={() => handleClick(index)}
        >
          {group.map((card) => (
            <WhiteCard key={card} flipped={!unFlippedGroups.includes(index)}>
              {card}
            </WhiteCard>
          ))}
        </CardWrapper>
      ))}
    </>
  );
}

CzarHand.propTypes = propTypes;

export default CzarHand;
