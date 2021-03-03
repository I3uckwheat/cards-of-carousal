import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';

import WelcomeScreen from './WelcomeScreen';

describe('WelcomeScreen', () => {
  describe('render', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(
          <WelcomeScreen
            handleJoinClick={() => ''}
            handleHostClick={() => ''}
          />,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('events', () => {
    it('fires callback when "join" button is clicked', () => {
      const mockJoinBtnCallback = jest.fn();
      const { getByText } = render(
        <WelcomeScreen
          handleJoinClick={mockJoinBtnCallback}
          handleHostClick={() => ''}
        />,
      );

      fireEvent.click(getByText('JOIN'));
      expect(mockJoinBtnCallback).toHaveBeenCalledTimes(1);
    });

    it('fires callback when "host" button is clicked', () => {
      const mockHostBtnCallback = jest.fn();
      const { getByText } = render(
        <WelcomeScreen
          handleJoinClick={() => ''}
          handleHostClick={mockHostBtnCallback}
        />,
      );

      fireEvent.click(getByText('HOST'));
      expect(mockHostBtnCallback).toHaveBeenCalledTimes(1);
    });
  });
});
