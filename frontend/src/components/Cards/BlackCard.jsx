import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div`
  width: 390px;
  height: 540px;
  background-color: black;
  color: white;
  border-radius: 18px;
  font-weight: 700;
  font-size: 36px;
  padding: 45px 21px 0 21px;
  box-shadow: 4px 4px 24px rgba(0, 0, 0, 0.3);
`;

function BlackCard({ pickCount, children }) {
  return (
    <Card>
      {children}
      {pickCount}
    </Card>
  );
}

BlackCard.propTypes = {
  pickCount: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default BlackCard;
