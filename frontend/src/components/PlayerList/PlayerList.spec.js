import React from 'react';
import { render, screen } from '@testing-library/react';

import PlayerList from './PlayerList';

describe('PlayerList', () => {
  it('renders PlayerList component given a simple playerList object', () => {
    const playerList = {
      players: {
        playerID1: {
          name: 'Foo',
          score: 3,
          czar: false,
          submittedCards: [1, 4],
        },
        playerID2: {
          name: 'Bar',
          score: 5,
          czar: true,
          submittedCards: [],
        },
      },
      playersIDs: ['playerID1', 'playerID2'],
    };

    render(<PlayerList playerList={playerList} />);

    expect(screen.getByText(playerList.players.playerID1.name)).toBeInTheDocument();
    expect(screen.getByText(playerList.players.playerID2.name)).toBeInTheDocument();
  });

  it('If player has submitted his cards or player is czar, render the icon fully visible', () => {
    const playerList = {
      players: {
        playerID1: {
          name: 'Foo',
          score: 3,
          czar: false,
          submittedCards: [1, 4],
        },
        playerID2: {
          name: 'Bar',
          score: 5,
          czar: true,
          submittedCards: [],
        },
      },
      playersIDs: ['playerID1', 'playerID2'],
    };

    render(<PlayerList playerList={playerList} />);

    expect(screen.getByTestId(`icon-${playerList.players.playerID1.name}`)).toBeVisible();
    expect(screen.getByTestId(`icon-${playerList.players.playerID2.name}`)).toBeVisible();
  });

  it('If player has NOT submitted his cards, render the icon with visibility hidden', () => {
    const playerList = {
      players: {
        playerID1: {
          name: 'Foo',
          score: 3,
          czar: false,
          submittedCards: [],
        },
      },
      playersIDs: ['playerID1'],
    };

    render(<PlayerList playerList={playerList} />);

    expect(screen.getByTestId(`icon-${playerList.players.playerID1.name}`)).not.toBeVisible();
  });

  it('If player score is higher than 10, display his score by text', () => {
    const playerList = {
      players: {
        playerID1: {
          name: 'Foo',
          score: 11,
          czar: false,
          submittedCards: [],
        },
      },
      playersIDs: ['playerID1'],
    };

    render(<PlayerList playerList={playerList} />);

    expect(screen.getByText(playerList.players.playerID1.score)).toBeInTheDocument();
  });

  it('If score is lower than 10, display the correct tally count', () => {
    const playerList = {
      players: {
        playerID1: {
          name: 'Foo',
          score: 7,
          czar: false,
          submittedCards: [],
        },
      },
      playersIDs: ['playerID1'],
    };

    render(<PlayerList playerList={playerList} />);

    expect(screen.getAllByTestId('tally')).toHaveLength(playerList.players.playerID1.score);
  });

  it('If playersIDs is empty, PlayerList still renders as an empty container', () => {
    const playerList = {
      players: {},
      playersIDs: [],
    };

    render(<PlayerList playerList={playerList} />);

    expect(screen.getByTestId('playerList-container')).toBeInTheDocument();
  });

  it('If the player object goes in a different order than playersIDs, the component follow playersIDs order', () => {
    const playerList = {
      players: {
        playerID1: {
          name: 'Foo',
          score: 3,
          czar: false,
          submittedCards: [1, 4],
        },
        playerID2: {
          name: 'Bar',
          score: 5,
          czar: true,
          submittedCards: [],
        },
      },
      playersIDs: ['playerID2', 'playerID1'],
    };

    render(<PlayerList playerList={playerList} />);

    const player2 = screen.getByTestId('row-Bar');
    expect(screen.getByTestId('playerList-container').firstChild).toBe(player2);
  });

  // TODO: test('If player is czar, render the its row with the proper colors', () => {})
});
