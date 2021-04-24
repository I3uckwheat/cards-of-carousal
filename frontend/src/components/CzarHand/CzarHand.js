import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CardWrapper from '../CardWrapper/CardWrapper';
import WhiteCard from '../Cards/WhiteCard';

const propTypes = {
  cardsData: PropTypes.arrayOf(
    PropTypes.shape({
      playerID: PropTypes.string.isRequired,
      cards: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
  selectedGroup: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

function CzarHand({ cardsData, selectedGroup, onSelect }) {
  const [unFlippedGroups, setUnflippedGroups] = useState([]);

  const handleClick = (index, playerID) => {
    if (!unFlippedGroups.includes(index)) {
      setUnflippedGroups([...unFlippedGroups, index]);
    }

    onSelect(index, playerID);
  };

  return (
    <>
      {cardsData.map(({ playerID, cards }, index) => (
        <CardWrapper
          key={playerID}
          selection={index === selectedGroup ? 'winner' : null}
          onClick={() => handleClick(index, playerID)}
        >
          {cards.map((card) => (
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

CzarHand.defaultProps = {
  selectedGroup: null,
};

export default CzarHand;
