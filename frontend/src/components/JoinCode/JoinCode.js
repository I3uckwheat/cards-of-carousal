import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propType = {
  code: PropTypes.string.isRequired,
};

const JoinCodeComponent = styled.div`
  display: flex;
  flex-direction: column;
  line-height : 29px;

  .join-code-title {
    font-size: 18px;
    color: var(--secondary-color);
    background-color: var(--primary-color);
    font-weight: 700;
    width: 97px;
    height: 21px; 
  }

  .join-code {
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
      <p className="join-code-title">JOIN CODE:</p>
      <p className="join-code" data-testid="join-code">{ code }</p>
    </JoinCodeComponent>
  );
}

DisplayJoinCode.propTypes = propType;

export default DisplayJoinCode;
