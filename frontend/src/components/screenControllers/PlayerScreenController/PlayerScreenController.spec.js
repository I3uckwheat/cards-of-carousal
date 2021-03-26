import { render, screen } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import {
  PlayerContext,
  PlayerProvider,
} from '../../../contexts/PlayerContext/PlayerContext';

import PlayerJoinScreen from '../../screens/PlayerJoinScreen/PlayerJoinScreen';
import PlayerScreenController from './PlayerScreenController';

const MockPlayerJoinScreen = () => <div data-testid="player-join-screen" />;
jest.mock('../../screens/PlayerJoinScreen/PlayerJoinScreen.js', () => ({
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
  });
});
