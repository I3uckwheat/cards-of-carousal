import React from 'react';
import { render, screen } from '@testing-library/react';
import { HostContext } from '../../contexts/HostContext/HostContext';

import HostScreenController from './HostScreenController';
import HostPregameScreen from '../../screens/HostPregameScreen/HostPregameScreen';
import WinnerSelectScreen from '../../screens/WinnerSelectScreen/WinnerSelectScreen';
import HostBlackCardScreen from '../../screens/HostBlackCardScreen/HostBlackCardScreen';
import HostRoundWinnerScreen from '../../screens/HostRoundWinnerScreen/HostRoundWinnerScreen';
import HostGameOverScreen from '../../screens/HostGameOverScreen/HostGameOverScreen';

const MockHostPregameScreen = () => <div data-testid="host-pregame-screen" />;
jest.mock('../../screens/HostPregameScreen/HostPregameScreen.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const MockWinnerSelectScreen = () => <div data-testid="winner-select-screen" />;
jest.mock('../../screens/WinnerSelectScreen/WinnerSelectScreen.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const MockHostBlackCardScreen = () => (
  <div data-testid="host-blackcard-screen" />
);
jest.mock('../../screens/HostBlackCardScreen/HostBlackCardScreen.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const MockHostRoundWinnerScreen = () => (
  <div data-testid="host-round-winner-screen" />
);
jest.mock(
  '../../screens/HostRoundWinnerScreen/HostRoundWinnerScreen.js',
  () => ({
    __esModule: true,
    default: jest.fn(),
  }),
);

const MockHostGameOverScreen = () => (
  <div data-testid="host-game-over-screen" />
);
jest.mock('../../screens/HostGameOverScreen/HostGameOverScreen.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Host screen controller', () => {
  describe('gameState switch', () => {
    describe('default', () => {
      it('throws an error', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        const dispatch = jest.fn();
        const state = { gameState: '' };

        expect(() => {
          render(
            <HostContext.Provider value={{ state, dispatch }}>
              <HostScreenController />
            </HostContext.Provider>,
          );
        }).toThrowError();

        expect(consoleSpy).toHaveBeenCalled();
      });
    });

    describe('waiting-for-lobby', () => {
      it('renders HostPregameScreen', () => {
        HostPregameScreen.mockImplementation(MockHostPregameScreen);

        const dispatch = jest.fn();
        const state = { gameState: 'waiting-for-lobby' };

        render(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostScreenController />
          </HostContext.Provider>,
        );

        expect(screen.getByTestId('host-pregame-screen')).toBeInTheDocument();
      });
    });

    describe('waiting-for-players', () => {
      it('renders HostPregameScreen', () => {
        HostPregameScreen.mockImplementation(MockHostPregameScreen);

        const dispatch = jest.fn();
        const state = { gameState: 'waiting-for-players' };

        render(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostScreenController />
          </HostContext.Provider>,
        );

        expect(screen.getByTestId('host-pregame-screen')).toBeInTheDocument();
      });
    });

    describe('waiting-for-deck', () => {
      it('renders HostPregameScreen', () => {
        HostPregameScreen.mockImplementation(MockHostPregameScreen);

        const dispatch = jest.fn();
        const state = { gameState: 'waiting-for-deck' };

        render(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostScreenController />
          </HostContext.Provider>,
        );

        expect(screen.getByTestId('host-pregame-screen')).toBeInTheDocument();
      });
    });

    describe('waiting-for-player-card-submissions', () => {
      it('renders HostPregameScreen', () => {
        HostPregameScreen.mockImplementation(MockHostPregameScreen);

        const dispatch = jest.fn();
        const state = { gameState: 'waiting-for-player-card-submissions' };

        render(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostScreenController />
          </HostContext.Provider>,
        );

        expect(screen.getByTestId('host-pregame-screen')).toBeInTheDocument();
      });
    });

    describe('selecting-winner', () => {
      it('renders WinnerSelectScreen', () => {
        WinnerSelectScreen.mockImplementation(MockWinnerSelectScreen);

        const dispatch = jest.fn();
        const state = { gameState: 'selecting-winner' };

        render(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostScreenController />
          </HostContext.Provider>,
        );

        expect(screen.getByTestId('winner-select-screen')).toBeInTheDocument();
      });
    });

    describe('waiting-to-receive-cards', () => {
      it('renders HostBlackCardScreen', () => {
        HostBlackCardScreen.mockImplementation(MockHostBlackCardScreen);

        const dispatch = jest.fn();
        const state = { gameState: 'waiting-to-receive-cards' };

        render(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostScreenController />
          </HostContext.Provider>,
        );

        expect(screen.getByTestId('host-blackcard-screen')).toBeInTheDocument();
      });
    });

    describe('czar-select-winner', () => {
      it('renders HostBlackCardScreen', () => {
        HostBlackCardScreen.mockImplementation(MockHostBlackCardScreen);

        const dispatch = jest.fn();
        const state = { gameState: 'czar-select-winner' };

        render(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostScreenController />
          </HostContext.Provider>,
        );

        expect(screen.getByTestId('host-blackcard-screen')).toBeInTheDocument();
      });
    });

    describe('showing-winning-cards', () => {
      it('renders HostRoundWinnerScreen', () => {
        HostRoundWinnerScreen.mockImplementation(MockHostRoundWinnerScreen);

        const dispatch = jest.fn();
        const state = { gameState: 'showing-winning-cards' };

        render(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostScreenController />
          </HostContext.Provider>,
        );

        expect(
          screen.getByTestId('host-round-winner-screen'),
        ).toBeInTheDocument();
      });
    });

    describe('game-over', () => {
      it('renders HostGameOverScreen', () => {
        HostGameOverScreen.mockImplementation(MockHostGameOverScreen);

        const dispatch = jest.fn();
        const state = { gameState: 'game-over' };

        render(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostScreenController />
          </HostContext.Provider>,
        );

        expect(screen.getByTestId('host-game-over-screen')).toBeInTheDocument();
      });
    });
  });
});
