import React from 'react';
import renderer from 'react-test-renderer';
import { PlayerProvider } from '../../../contexts/PlayerContext/PlayerContext';

import PlayerScreenController from './PlayerScreenController';

describe('Player screen controller', () => {
  describe('render', () => {
    it('renders correctly', () => {
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
});
