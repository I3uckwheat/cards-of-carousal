import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import TallyMarker from './TallyMarker';

function PlayerList({ players }) {
  const playersArr = Object.values(players);

  return (
    <Container>
      {playersArr.map((player) => {
        const showTally = player.score < 11;
        const showIcon = player.submittedCards.length > 0;

        return (
          <PlayerRow key={player.name} isCzar={player.czar}>
            <SmallCardsIcon isCzar={player.czar} showIcon={showIcon} />

            <div className="player-info">
              <h1>{player.name}</h1>
              {showTally ? (
                <div>
                  <TallyMarker
                    isCzar={player.czar}
                    tallyCount={player.score > 5 ? player.score - 5 : player.score % 6}
                  />
                  {player.score > 5 ? <TallyMarker isCzar={player.czar} tallyCount={5} /> : ''}
                </div>
              )
                : <span>{player.score}</span>}
            </div>
          </PlayerRow>
        );
      })}
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
  background-color: var(--primary-color);

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
      letter-spacing: 1px;
      line-height: 1.5em;
      color: ${(props) => (props.isCzar ? 'var(--primary-color)' : 'var(--secondary-color)')};
    }

    span {
      color: ${(props) => (props.isCzar ? 'var(--primary-color)' : 'var(--secondary-color)')};
      font-size: 24px;
      font-weight: 900;
    }
  }
`;

const SmallCardsIcon = styled.div`
  opacity: ${(props) => (props.showIcon || props.isCzar ? 1 : 0)};

  width: 32px;
  height: 43px;
  background-color: ${(props) => (props.isCzar ? 'var(--secondary-color)' : 'var(--primary-color)')};
  border: 2px solid var(--secondary-color);
  border-radius: 3px;
`;
