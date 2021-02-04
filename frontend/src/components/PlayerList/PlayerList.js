import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import TallyMarker from '../TallyMarker/TallyMarker';

function PlayerList({ players }) {
  const playersArr = Object.values(players);

  return (
    <Container>
      {playersArr.map((player) => {
        const showIcon = player.submittedCards.length > 0;

        const isAboveDisplayLimit = player.score > 10;
        const showAdditionalTally = !isAboveDisplayLimit && player.score > 5;

        return (
          <PlayerRow key={player.name} isCzar={player.czar}>
            <SmallCardsIcon isCzar={player.czar} showIcon={showIcon} data-testid={`icon-${player.name}`} />

            <div className="player-info">
              <h1>{player.name}</h1>
              {isAboveDisplayLimit ? <span>{player.score}</span>
                : (
                  <div>
                    <TallyMarker
                      color={player.czar ? 'white' : 'black'}
                      tallyCount={player.score > 5 ? player.score - 5 : player.score}
                    />

                    {showAdditionalTally && <TallyMarker color={player.czar ? 'white' : 'black'} tallyCount={5} />}
                  </div>
                )}
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

  position: relative;
  z-index: 1;

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

    background-color: ${(props) => (props.isCzar ? 'var(--secondary-color)' : 'var(--primary-color)')};

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

// TODO: Swap this for actual SVG files
const SmallCardsIcon = styled.div`
  visibility: ${(props) => (props.showIcon || props.isCzar ? 'visible' : 'hidden')};

  width: 32px;
  height: 43px;
  margin: ${(props) => (props.isCzar ? '0' : '0 6px')};
  background-color: ${(props) => (props.isCzar ? 'var(--secondary-color)' : 'var(--primary-color)')};
  border: 2px solid var(--secondary-color);
  border-radius: 3px;

  display: block;
  position: relative;

  &::before {
    display: ${(props) => (props.isCzar ? 'none' : 'block')};
    content: '';

    position: absolute;
    z-index: -1;
    top: 5px;
    left: -12px;

    width: 32px;
    height: 43px;
    background-color: var(--primary-color);
    border: 2px solid var(--secondary-color);
    border-radius: 3px;
  }
`;
