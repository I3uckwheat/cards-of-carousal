import React from 'react';
import { render, screen } from '@testing-library/react';

import PlayerList from './PlayerList';

describe('PlayerList', () => {
  it('renders PlayerList component given a simple playerList object', () => {
    const playerList = {
      players: {
        playerID1: {
          name: 'Bender',
          score: 3,
          czar: false,
          submittedCards: [1, 4],
        },
        playerID2: {
          name: 'Bacon',
          score: 5,
          czar: true,
          submittedCards: [3, 4],
        },
      },
      playersIDs: ['playerID1', 'playerID2'],
    };

    render(<PlayerList playerList={playerList} />);

    playerList.playersIDs.map((playerID) => (
      expect(screen.getByText(playerList.players[playerID].name)).toBeInTheDocument()
    ));
  });

  it('If player has submitted his cards or player is czar, render the icon fully visible', () => {
    const players = {
      playerID1: {
        name: 'Bender',
        score: 3,
        czar: false,
        submittedCards: [1, 4],
      },
      playerID2: {
        name: 'Bacon',
        score: 5,
        czar: true,
        submittedCards: [],
      },
    };

    render(<PlayerList players={players} />);

    expect(screen.getByTestId(`icon-${players.playerID1.name}`)).toBeVisible();
    expect(screen.getByTestId(`icon-${players.playerID2.name}`)).toBeVisible();
  });

  it('If player has NOT submitted his cards, render the icon with visibility hidden', () => {
    const players = {
      playerID1: {
        name: 'Bender',
        score: 3,
        czar: false,
        submittedCards: [],
      },
    };

    render(<PlayerList players={players} />);

    expect(screen.getByTestId(`icon-${players.playerID1.name}`)).not.toBeVisible();
  });

  it('If player score is higher than 10, display his score by text', () => {
    const players = {
      playerID1: {
        name: 'Bender',
        score: 15,
        czar: false,
        submittedCards: [],
      },
      playerID2: {
        name: 'Bender2',
        score: 11,
        czar: false,
        submittedCards: [],
      },
    };
    render(<PlayerList players={players} />);

    expect(screen.getByText(players.playerID1.score)).toBeInTheDocument();
    expect(screen.getByText(players.playerID2.score)).toBeInTheDocument();
  });

  it('If score is lower than 10, display the correct tally count', () => {
    const players = {
      playerID1: {
        name: 'Bender',
        score: 7,
        czar: false,
        submittedCards: [],
      },
    };
    render(<PlayerList players={players} />);

    expect(screen.getAllByTestId('tally')).toHaveLength(players.playerID1.score);
  });

  // TODO: test('If player is czar, render the its row with the proper colors', () => {})
});
