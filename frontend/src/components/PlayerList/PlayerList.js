import React from 'react';

import PropTypes from 'prop-types';
import TallyMarker from '../TallyMarker/TallyMarker';

import { PlayerTable, PlayerRow, SmallCardsIcon } from './styles';

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
    <PlayerTable>
      {playersArray.map((player) => {
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
    </PlayerTable>
  );
}

PlayerList.propTypes = propTypes;

export default PlayerList;
