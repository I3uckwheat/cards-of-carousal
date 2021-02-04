import React from 'react';

import PropTypes from 'prop-types';
// import TallyMarker from '../TallyMarker/TallyMarker';

import { PlayerTable, PlayerRow, SmallCardsIcon } from './styles';
import TallyMarkers from '../TallyMarkers/TallyMarkers';

const propTypes = {
  playerList: PropTypes.objectOf(
    {
      players: PropTypes.objectOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          score: PropTypes.number.isRequired,
          czar: PropTypes.bool.isRequired,
          submittedCards: PropTypes.arrayOf(PropTypes.number).isRequired,
        }),
      ),

      playersIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
    },
  ).isRequired,
};

function PlayerList({ playerList }) {
  const playersArray = playerList.playersIDs.map((id) => playerList.players[id]);

  return (
    <PlayerTable data-testid="playerList-container">
      {playersArray.map((player) => {
        const showIcon = player.submittedCards.length > 0;

        return (
          <PlayerRow key={player.name} isCzar={player.czar}>
            <SmallCardsIcon isCzar={player.czar} showIcon={showIcon} data-testid={`icon-${player.name}`} />

            <div className="player-info">
              <h1>{player.name}</h1>
              <TallyMarkers score={player.score} maxNumberOfMarkers={2} color={player.czar ? 'primary' : 'secondary'} />
            </div>
          </PlayerRow>
        );
      })}
    </PlayerTable>
  );
}

PlayerList.propTypes = propTypes;

export default PlayerList;
