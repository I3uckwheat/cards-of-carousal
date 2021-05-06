import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { HostContext } from '../../contexts/HostContext/HostContext';

const propType = {
  loading: PropTypes.bool,
  code: PropTypes.string.isRequired,
};

const defaultProps = {
  loading: false,
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
  const { state } = useContext(HostContext);
  const hidden = state.gameSettings.hideJoinCode;

  return (
    <JoinCodeComponent>
      <p className="join-code-title">JOIN CODE:</p>
      <div className="join-code" data-testid="join-code">
        {!hidden &&
          (loading || !code ? <LoadingIndicator secondary /> : <p>{code}</p>)}
      </div>
    </JoinCodeComponent>
  );
}

DisplayJoinCode.propTypes = propType;

DisplayJoinCode.defaultProps = defaultProps;

export default DisplayJoinCode;
