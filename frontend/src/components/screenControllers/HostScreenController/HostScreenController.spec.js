import React from 'react';
import { render, screen } from '@testing-library/react';
import { HostContext } from '../../../contexts/HostContext/HostContext';

import HostScreenController from './HostScreenController';
import HostPregameScreen from '../../screens/HostPregameScreen/HostPregameScreen';

const MockHostPregameScreen = () => <div data-testid="host-pregame-screen" />;
jest.mock('../../screens/HostPregameScreen/HostPregameScreen.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Host screen controller', () => {
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

        expect(() =>
          render(
            <HostContext.Provider value={{ state, dispatch }}>
              <HostScreenController />
            </HostContext.Provider>,
          ),
        ).toThrowError();

        // Restore writing to console.
        // eslint-disable-next-line no-console
        console.error = err;
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
  });
});
