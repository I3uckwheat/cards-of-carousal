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

  describe('fullscreen api', () => {
    it('requests to go fullscreen when the host button is clicked', () => {
      // tests don't include this browser function, but we are going to manually mock/restore it anyway
      const { requestFullscreen } = document.documentElement;

      // mock the requestFullscreen API
      document.documentElement.requestFullscreen = jest.fn();

      const { getByText } = render(<App />);
      fireEvent.click(getByText('HOST'));

      expect(document.documentElement.requestFullscreen).toHaveBeenCalledTimes(
        1,
      );

      // restore mocked browser document method
      document.documentElement.requestFullscreen = requestFullscreen;
    });
  });
});
