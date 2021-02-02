import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

function PlayerList({ players }) {
  const playersArr = Object.values(players);

  return (
    <Container>
      {playersArr.map((player) => <h1>{player.name}</h1>)}

      <PlayerRow isCzar>
        <IconMockup isCzar />

        <div className="player-info">
          <h1>Foo</h1>
          <span>10</span>
        </div>
      </PlayerRow>

      <PlayerRow>
        <IconMockup />

        <div className="player-info">
          <h1>bar</h1>
          <span>5</span>
        </div>
      </PlayerRow>
    </Container>
  );
}

PlayerList.propTypes = {
  players: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      czar: PropTypes.bool.isRequired,
      submittedCards: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
  ).isRequired,
};

export default PlayerList;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 486px;
  padding: 40px;
  background-color: #e3e3e3;

  & > div:not(:last-child) {
    margin-bottom: 24px;
  }
`;

const PlayerRow = styled.div`
  display: flex;
  width: 100%;

  .player-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    flex: 1;
    margin: 0 12px 0 20px;
    padding: 0 12px;

    background-color: ${(props) => (props.isCzar ? 'var(--secondary-color)' : 'var(--primary-color)')};
    border-radius: 4px;

    h1 {
      text-transform: uppercase;
      font-size: 24px;
      font-weight: 900;
      color: ${(props) => (props.isCzar ? 'var(--primary-color)' : 'var(--secondary-color)')};
    }

    span {
      color: ${(props) => (props.isCzar ? 'var(--primary-color)' : 'var(--secondary-color)')};
    }
  }
`;

const IconMockup = styled.div`
  width: 32px;
  height: 43px;
  background-color: ${(props) => (props.isCzar ? 'var(--secondary-color)' : 'var(--primary-color)')};
  border: 2px solid var(--secondary-color);
  border-radius: 3px;
`;
