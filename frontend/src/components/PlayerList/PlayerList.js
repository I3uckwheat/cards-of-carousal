import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BlackCard from '../../assets/black-card-icon.svg';
import OffsetWhiteCardStack from '../../assets/offset-white-card-stack-icon.svg';
import TallyMarkers from '../TallyMarker/TallyMarker';

const propTypes = {
  playerList: PropTypes.shape({
    players: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        czar: PropTypes.bool.isRequired,
        submittedCards: PropTypes.arrayOf(PropTypes.number).isRequired,
      }),
    ).isRequired,

    playersIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const PlayerTable = styled.div`
  display: flex;
  flex-direction: column;

  width: 486px;
  padding: 40px;
  background-color: var(--primary-color);

  position: relative;

  & > div:not(:last-child) {
    margin-bottom: 24px;
  }
`;

const PlayerRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  .player-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    flex: 1;
    margin: ${(props) => (props.isCzar ? '0 12px 0 26px' : '0 24px 0 26px')};
    padding: ${(props) => (props.isCzar ? '7px 12px' : '7px 0')};
    border-bottom: ${(props) => (props.isCzar ? 0 : '1px solid #ccc')};
    border-radius: ${(props) => (props.isCzar ? '4px' : 0)};

    background-color: ${(props) =>
      props.isCzar ? 'var(--secondary-color)' : 'var(--primary-color)'};

    h1 {
      text-transform: uppercase;
      font-size: 24px;
      font-weight: 900;
      letter-spacing: 1px;
      line-height: 1.5em;
      color: ${(props) =>
        props.isCzar ? 'var(--primary-color)' : 'var(--secondary-color)'};
    }

    span {
      color: ${(props) =>
        props.isCzar ? 'var(--primary-color)' : 'var(--secondary-color)'};
      font-size: 24px;
      font-weight: 900;
    }
  }
`;
function PlayerList({ playerList }) {
  const playersArray = playerList.playersIDs.map(
    (id) => playerList.players[id],
  );

  return (
    <PlayerTable data-testid="playerList-container">
      {playersArray.map((player) => {
        const showIcon = player.submittedCards.length > 0 || player.czar;
        const playerIcon = player.czar ? BlackCard : OffsetWhiteCardStack;

        return (
          <PlayerRow
            key={player.name}
            isCzar={player.czar}
            data-testid={`row-${player.name}`}
          >
            <img
              src={playerIcon}
              alt="card icon"
              style={{ visibility: showIcon ? 'visible' : 'hidden' }}
              data-testid={`icon-${player.name}`}
            />

            <div className="player-info">
              <h1>{player.name}</h1>
              <TallyMarkers
                score={player.score}
                maxNumberOfMarkers={2}
                color={player.czar ? 'primary' : 'secondary'}
              />
            </div>
          </PlayerRow>
        );
      })}
    </PlayerTable>
  );
}

PlayerList.propTypes = propTypes;

export default PlayerList;
