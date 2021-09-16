import React, { useContext } from 'react';
import styled from 'styled-components';
import { HostContext } from '../../contexts/HostContext/HostContext';
import BlackCard from '../../assets/black-card-icon.svg';
import OffsetWhiteCardStack from '../../assets/offset-white-card-stack-icon.svg';
import TallyCount from '../TallyMarker/TallyCount';

const PlayerTable = styled.div`
  display: flex;
  flex-direction: column;

  width: 486px;
  padding: 40px;
  background-color: var(--primary-background-color);

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
      props.isCzar
        ? 'var(--secondary-background-color);'
        : 'var(--primary-background-color)'};

    h1 {
      text-transform: uppercase;
      font-size: 24px;
      font-weight: 900;
      letter-spacing: 1px;
      line-height: 1.5em;
      color: ${(props) => {
        if (props.isCzar) {
          return 'var(--secondary-text-color)';
        }
        if (props.isInStaging) {
          return 'var(--accent-text-color)';
        }
        return 'var(--primary-text-color)';
      }};
    }

    span {
      color: ${(props) =>
        props.isCzar
          ? 'var(--secondary-text-color)'
          : 'var(--primary-text-color)'};
      font-size: 24px;
      font-weight: 900;
    }
  }
`;
function PlayerList() {
  const { state } = useContext(HostContext);
  const { playerIDs, players } = state;

  const playersArray = [...playerIDs.map((id) => players[id])];

  return (
    <PlayerTable data-testid="playerList-container">
      {playersArray.map((player) => {
        const showIcon = player.submittedCards.length > 0 || player.isCzar;
        const playerIcon = player.isCzar ? BlackCard : OffsetWhiteCardStack;
        const playerKey =
          playerIDs.find((id) => players[id] === player) || player.playerId;

        return (
          <PlayerRow
            key={playerKey}
            isCzar={player.isCzar}
            isInStaging={!player.isPlaying}
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
              <TallyCount
                score={player.score}
                color={player.isCzar ? 'secondary' : 'primary'}
              />
            </div>
          </PlayerRow>
        );
      })}
    </PlayerTable>
  );
}

export default PlayerList;
