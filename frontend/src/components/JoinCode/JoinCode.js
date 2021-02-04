import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height : 29px;
`;

const JoinCodeTitle = styled.p`
  font-size: 18px;
  color: var(--secondary-color);
  background-color: var(--primary-color);
  font-weight: 700;
  width: 97px;
  height: 21px; 
`;

const JoinCode = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  font-weight: bold;
  color: var(--primary-color);
  background-color: var(--secondary-color);
  width: 305px;
  height: 70px; 
`;

function DisplayJoinCode({ code }) {
  return (
    <Wrapper>
      <JoinCodeTitle>JOIN CODE:</JoinCodeTitle>
      <JoinCode>{ code }</JoinCode>
    </Wrapper>
  );
}

DisplayJoinCode.propTypes = {
  code: PropTypes.string.isRequired,
};

export default DisplayJoinCode;
