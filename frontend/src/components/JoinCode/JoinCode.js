import React from 'react';
import PropTypes, { string } from 'prop-types';
import styled from 'styled-components';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const propType = {
  loading: PropTypes.arrayOf(string).isRequired,
  code: PropTypes.string.isRequired,
};

const JoinCodeComponent = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 29px;

  .join-code-title {
    font-size: 18px;
    color: var(--primary-text-color);
    background-color: var(--primary-background-color);
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
    color: var(--secondary-text-color);
    background-color: var(--secondary-background-color);
    width: 305px;
    height: 70px;
  }
`;

function DisplayJoinCode({ loading, code }) {
  return (
    <JoinCodeComponent>
      <p className="join-code-title">JOIN CODE:</p>
      <p className="join-code" data-testid="join-code">
        {loading.includes('join-code') || !code ? (
          <LoadingIndicator secondary />
        ) : (
          code
        )}
      </p>
    </JoinCodeComponent>
  );
}

DisplayJoinCode.propTypes = propType;

export default DisplayJoinCode;
