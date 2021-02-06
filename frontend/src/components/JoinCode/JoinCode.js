import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const JoinCodeComponent = styled.div`
  display: flex;
  flex-direction: column;
  line-height : 29px;

  .joinCode-title {
    font-size: 18px;
    color: var(--secondary-color);
    background-color: var(--primary-color);
    font-weight: 700;
    width: 97px;
    height: 21px; 
  }

  .joinCode {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 56px;
    font-weight: bold;
    color: var(--primary-color);
    background-color: var(--secondary-color);
    width: 305px;
    height: 70px; 
  }
`;

function DisplayJoinCode({ code }) {
  return (
    <JoinCodeComponent>
      <p className="joinCode-title">JOIN CODE:</p>
      <p className="joinCode">{ code }</p>
    </JoinCodeComponent>
  );
}

DisplayJoinCode.propTypes = {
  code: PropTypes.string.isRequired,
};

export default DisplayJoinCode;
