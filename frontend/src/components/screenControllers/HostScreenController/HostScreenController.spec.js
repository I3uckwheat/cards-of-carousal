import React from 'react';
import renderer from 'react-test-renderer';
import HostProvider from '../../../contexts/HostContext/HostContext';

import HostScreenController from './HostScreenController';

describe('Host screen controller', () => {
  describe('render', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(
          <HostProvider>
            <HostScreenController />
          </HostProvider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
