import { render, screen } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import {
  PlayerContext,
  PlayerProvider,
} from '../../../contexts/PlayerContext/PlayerContext';

import PlayerScreenController from './PlayerScreenController';
import PlayerJoinScreen from '../../screens/PlayerJoinScreen/PlayerJoinScreen';
import PlayerMessageScreen from '../../screens/PlayerMessageScreen/PlayerMessageScreen';

const MockPlayerJoinScreen = () => <div data-testid="player-join-screen" />;
jest.mock('../../screens/PlayerJoinScreen/PlayerJoinScreen.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const MockPlayerMessageScreen = () => (
  <div data-testid="player-message-screen" />
);
jest.mock('../../screens/PlayerMessageScreen/PlayerMessageScreen.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Player screen controller', () => {
  describe('render', () => {
    it.skip('renders correctly', () => {
      const tree = renderer
        .create(
          <PlayerProvider>
            <PlayerScreenController />
          </PlayerProvider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('gameState switch', () => {
    describe('default', () => {
      it('throws an error', () => {
        // Prevent writing error in console during this render.
        // eslint-disable-next-line no-console
        const err = console.error;
        // eslint-disable-next-line no-console
        console.error = jest.fn();

        const dispatch = jest.fn();
        const state = { gameState: '' };

        let actual;
        try {
          render(
            <PlayerContext.Provider value={{ state, dispatch }}>
              <PlayerScreenController />
            </PlayerContext.Provider>,
          );
        } catch (e) {
          actual = e.message;
        }
        const expected = 'Unrecognized game state: ';
        expect(actual).toEqual(expected);

        // Restore writing to console.
        // eslint-disable-next-line no-console
        console.error = err;
      });
    });

    describe('enter-code', () => {
      it('renders PlayerJoinScreen', () => {
        PlayerJoinScreen.mockImplementation(MockPlayerJoinScreen);

        const dispatch = jest.fn();
        const state = { gameState: 'enter-code' };

        render(
          <PlayerContext.Provider value={{ state, dispatch }}>
            <PlayerScreenController />
          </PlayerContext.Provider>,
        );

        expect(screen.getByTestId('player-join-screen')).toBeInTheDocument();
      });
    });

    describe('pending-connection', () => {
      it('renders PlayerMessageScreen', () => {
        PlayerMessageScreen.mockImplementation(MockPlayerMessageScreen);

        const dispatch = jest.fn();
        const state = {
          gameState: 'pending-connection',
          message: { big: '', small: '' },
        };

        render(
          <PlayerContext.Provider value={{ state, dispatch }}>
            <PlayerScreenController />
          </PlayerContext.Provider>,
        );

        expect(screen.getByTestId('player-message-screen')).toBeInTheDocument();
      });
    });

    describe('connected', () => {
      it('renders PlayerMessageScreen', () => {
        PlayerMessageScreen.mockImplementation(MockPlayerMessageScreen);

        const dispatch = jest.fn();
        const state = {
          gameState: 'connected',
          message: { big: '', small: '' },
        };

        render(
          <PlayerContext.Provider value={{ state, dispatch }}>
            <PlayerScreenController />
          </PlayerContext.Provider>,
        );

        expect(screen.getByTestId('player-message-screen')).toBeInTheDocument();
      });
    });
  });
});
