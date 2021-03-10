import React from 'react';
import renderer from 'react-test-renderer';

import HostScreenController from './HostScreenController';

describe('Host screen controller', () => {
  describe('render', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<HostScreenController />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
