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
`;

const propTypes = {
  cards: PropTypes.arrayOf(PropTypes.array).isRequired,
  // selectedGroup: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function CzarHand({ cards, onSelect }) {
  const [unFlippedGroups, setUnflippedGroups] = useState([]);

  const handleClick = (e) => {
    // flips card to the front
    // onSelect( ** index ** )
  };

  return (
    <CzarHandStyles>
      {cards.map((group, index) => (
        <CardWrapper onClick={() => onSelect(index)}>
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
