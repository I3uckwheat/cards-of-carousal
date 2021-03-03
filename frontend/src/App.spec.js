import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  describe('snapshots', () => {
    it('should match - initially shows welcome screen', () => {
      const tree = renderer.create(<App />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should match after user has clicked the "join" button', () => {
      const { getByText, asFragment } = render(<App />);
      fireEvent.click(getByText('JOIN'));

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match after user has clicked the "host" button', () => {
      const { getByText, asFragment } = render(<App />);
      fireEvent.click(getByText('HOST'));

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
