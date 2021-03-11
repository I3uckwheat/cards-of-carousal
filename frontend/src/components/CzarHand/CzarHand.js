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

  .card-group {
    background-color: black;
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

  const handleClick = (e) => {
    // flips card to the front
    // onSelect( ** index ** )
  };

  return (
    <CzarHandStyles>
      {cards.map((group, index) => (
        <CardWrapper
          selection={index === selectedGroup ? 'winner' : undefined}
          className="card-group"
          onClick={() => onSelect(index)}
        >
          {group.map((card) => (
            <WhiteCard flipped={unFlippedGroups.includes(index)}>
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
