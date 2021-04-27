import { render, screen } from '@testing-library/react';
import React from 'react';
import { PlayerContext } from '../../contexts/PlayerContext/PlayerContext';

import PlayerScreenController from './PlayerScreenController';
import PlayerJoinScreen from '../../screens/PlayerJoinScreen/PlayerJoinScreen';
import PlayerMessageScreen from '../../screens/PlayerMessageScreen/PlayerMessageScreen';
import CzarHandScreen from '../../screens/CzarHandScreen/CzarHandScreen';
import PlayerErrorScreen from '../../screens/PlayerErrorScreen/PlayerErrorScreen';

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

const MockCzarHandScreen = () => <div data-testid="czar-hand-screen" />;
jest.mock('../../screens/CzarHandScreen/CzarHandScreen.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const MockPlayerErrorScreen = () => <div data-testid="player-error-screen" />;
jest.mock('../../screens/PlayerErrorScreen/PlayerErrorScreen.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Player screen controller', () => {
  describe('gameState switch', () => {
    describe('default', () => {
      it('throws an error', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        const dispatch = jest.fn();
        const state = { gameState: '' };

        expect(() =>
          render(
            <PlayerContext.Provider value={{ state, dispatch }}>
              <PlayerScreenController />
            </PlayerContext.Provider>,
          ),
        ).toThrowError();

        expect(consoleSpy).toHaveBeenCalled();
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

    describe('submitting-cards', () => {
      it('renders PlayerMessageScreen', () => {
        PlayerMessageScreen.mockImplementation(MockPlayerMessageScreen);

        const dispatch = jest.fn();
        const state = {
          gameState: 'submitting-cards',
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

    describe('cards-submitted', () => {
      it('renders PlayerMessageScreen', () => {
        PlayerMessageScreen.mockImplementation(MockPlayerMessageScreen);

        const dispatch = jest.fn();
        const state = {
          gameState: 'cards-submitted',
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

    describe('lobby-closed', () => {
      it('renders PlayerMessageScreen', () => {
        PlayerMessageScreen.mockImplementation(MockPlayerMessageScreen);

        const dispatch = jest.fn();
        const state = {
          gameState: 'lobby-closed',
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

    describe('select-winner', () => {
      it('renders CzarHandScreen', () => {
        CzarHandScreen.mockImplementation(MockCzarHandScreen);

        const dispatch = jest.fn();
        const state = {
          gameState: 'select-winner',
        };

        render(
          <PlayerContext.Provider value={{ state, dispatch }}>
            <PlayerScreenController />
          </PlayerContext.Provider>,
        );

        expect(screen.getByTestId('czar-hand-screen')).toBeInTheDocument();
      });
    });

    describe('player-kicked', () => {
      it('renders PlayerErrorScreen', () => {
        PlayerErrorScreen.mockImplementation(MockPlayerErrorScreen);

        const dispatch = jest.fn();
        const state = {
          gameState: 'player-kicked',
          message: { big: '', small: '' },
        };

        render(
          <PlayerContext.Provider value={{ state, dispatch }}>
            <PlayerScreenController />
          </PlayerContext.Provider>,
        );

        expect(screen.getByTestId('player-error-screen')).toBeInTheDocument();
      });
    });

    describe('showing-end-round-messages', () => {
      it('renders PlayerMessageScreen', () => {
        PlayerMessageScreen.mockImplementation(MockPlayerMessageScreen);

        const dispatch = jest.fn();
        const state = {
          gameState: 'showing-end-round-messages',
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
