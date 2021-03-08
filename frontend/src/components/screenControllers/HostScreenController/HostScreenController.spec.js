import React from 'react';
import renderer from 'react-test-renderer';

import HostScreenController from './HostScreenController';

describe('Host screen controller', () => {
  describe('render', () => {
    it('renders correctly', () => {
      const left = <p>left</p>;
      const right = <p>right</p>;
      const modal = <p>modal</p>;

      const tree = renderer
        .create(
          <HostScreenController left={left} right={right} modal={modal} />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
