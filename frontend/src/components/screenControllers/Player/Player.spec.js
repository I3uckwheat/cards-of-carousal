import React from 'react';
import renderer from 'react-test-renderer';

import Player from './Player';

describe('Player screen controller', () => {
  describe('snapshot', () => {
    it('should match', () => {
      const tree = renderer.create(<Player />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
