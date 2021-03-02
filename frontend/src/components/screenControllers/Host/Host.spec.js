import React from 'react';
import renderer from 'react-test-renderer';

import Host from './Host';

describe('Host screen controller', () => {
  describe('snapshot', () => {
    it('should match', () => {
      const left = <p>left</p>;
      const right = <p>right</p>;
      const modal = <p>modal</p>;

      const tree = renderer
        .create(<Host left={left} right={right} modal={modal} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
