import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PlayerJoinScreen from './PlayerJoinScreen';
import { PlayerProvider } from '../../../contexts/PlayerContext/PlayerContext';

describe('PlayerJoin', () => {
  describe('render', () => {
    it('should render', () => {
      render(
        <PlayerProvider>
          <PlayerJoinScreen />
        </PlayerProvider>,
      );

      expect(screen.getByTestId('player-join-container')).toBeInTheDocument();
    });
  });

  describe('snapshot', () => {
    it('matches', () => {
      const tree = renderer
        .create(
          <PlayerProvider>
            <PlayerJoinScreen />
          </PlayerProvider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
