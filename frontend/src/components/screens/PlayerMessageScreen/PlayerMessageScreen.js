import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cardTrioDiagonal from '../../../assets/card-trio-diagonal.svg';
import blackCardDiagonal from '../../../assets/black-card-diagonal.svg';
import { PlayerContext } from '../../../contexts/PlayerContext/PlayerContext';
import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';

const propTypes = {
  bigText: PropTypes.string.isRequired,
  smallText: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const PlayerMessageScreenWrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--primary-background-color);
  background-size: 120% auto;
  background-repeat: no-repeat;
  background-position: -100px 77%;

  .text-container {
    display: flex;
    position: relative;
    text-align: center;
    flex-direction: column;
    margin: auto;
  }

  .big-text {
    font-weight: 900;
    font-size: 4.5rem;
    @media (max-width: 1150px) {
      font-size: 3.5rem;
    }
    @media (max-width: 800px) {
      font-size: 2.5rem;
    }
  }

  .small-text {
    font-size: 2rem;
    @media (max-width: 1150px) {
      font-size: 1.5rem;
    }
    @media (max-width: 800px) {
      font-size: 1rem;
    }
  }

  .footer {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .card-img {
    height: 10vw;
    &.right {
      margin-left: auto;
    }
  }
`;

function PlayerMessageScreen({ bigText, smallText, children }) {
  const { state } = useContext(PlayerContext);
  const loadingStates = ['joining-lobby', 'submitting-cards'];

  function isLoading() {
    return state.loading.some((loadingState) =>
      loadingStates.includes(loadingState),
    );
  }

  return (
    <PlayerMessageScreenWrapper className="primary-background">
      <div className="text-container">
        <h1 className="big-text">{bigText && bigText.toUpperCase()}</h1>
        <p className="small-text">{smallText}</p>
        {children}
        {isLoading() && <LoadingIndicator />}
      </div>
      <div className="footer">
        <img
          className="card-img"
          src={cardTrioDiagonal}
          alt="three stacked card icons"
        />
        <img
          className="card-img right"
          src={blackCardDiagonal}
          alt="one black card icon"
        />
      </div>
    </PlayerMessageScreenWrapper>
  );
}

PlayerMessageScreen.propTypes = propTypes;
PlayerMessageScreen.defaultProps = {
  children: null,
};

export default PlayerMessageScreen;
