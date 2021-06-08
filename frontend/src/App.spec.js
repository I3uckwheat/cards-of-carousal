import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';

import App from './App';

jest.mock('nosleep.js');

describe('App', () => {
  describe('snapshots', () => {
    it('should initially show the welcome screen', () => {
      const tree = renderer.create(<App />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should show the player screen after user has clicked the "join" button', () => {
      const { getByText, asFragment } = render(<App />);

      fireEvent.click(getByText('JOIN'));

      expect(asFragment()).toMatchSnapshot();
    });

    it('should show the host screen after user has clicked the "host" button', () => {
      const { getByText, asFragment } = render(<App />);
      fireEvent.click(getByText('HOST'));

      expect(asFragment()).toMatchSnapshot();
    });

    it('should show the welcome screen after user has clicked elements other than the "host" or "join" buttons', () => {
      const { getByText, asFragment } = render(<App />);

      fireEvent.click(getByText('CAROUSAL'));
      fireEvent.click(getByText('OR'));
      fireEvent.click(getByText('Card content thanks to:'));

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
