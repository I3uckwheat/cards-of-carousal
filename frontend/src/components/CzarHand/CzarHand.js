/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CardWrapper from '../CardWrapper/CardWrapper';
import WhiteCard from '../Cards/WhiteCard';

const CzarHandStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  overflow-x: scroll;

  .czar-hand > div {
    margin: 0 16px;
  }
`;

const propTypes = {
  cards: PropTypes.arrayOf(PropTypes.array).isRequired,
  selectedGroup: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function CzarHand({ cards, selectedGroup, onSelect }) {
  // cards MUST stay flipped until new set of cards are passed in
  const [unFlippedGroups, setUnflippedGroups] = useState([]);

  const handleClick = (index) => {
    if (!unFlippedGroups.includes(index)) {
      setUnflippedGroups([...unFlippedGroups, index]);
    }
    onSelect(index);
  };

  return (
    <CzarHandStyles className="czar-hand">
      {cards.map((group, index) => (
        <CardWrapper
          selection={index === selectedGroup ? 'winner' : null}
          onClick={() => handleClick(index)}
        >
          {group.map((card) => (
            <WhiteCard flipped={!unFlippedGroups.includes(index)}>
              {card}
            </WhiteCard>
          ))}
        </CardWrapper>
      ))}
    </CzarHandStyles>
  );
}

CzarHand.propTypes = propTypes;

export default CzarHand;
