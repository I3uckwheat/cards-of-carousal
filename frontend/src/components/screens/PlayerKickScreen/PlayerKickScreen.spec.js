import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayerKickScreen from './PlayerKickScreen';

describe('Player kick screen', () => {
  describe('render', () => {
    it('should render', () => {
      render(<PlayerKickScreen smallText="" bigText="You've been kicked" />);

      expect(screen.getByText("YOU'VE BEEN KICKED")).toBeInTheDocument();
      expect(screen.getByText('restart')).toBeInTheDocument();
    });
  });

  describe('buttons', () => {
    it('reloads when restart button is clicked', async () => {
      // window.location properties are read-only, we have to redefine this object to spy on reload
      Object.defineProperty(window, 'location', {
        value: { reload: jest.fn() },
      });

      render(<PlayerKickScreen bigText="" smallText="" />);

      await act(async () => userEvent.click(screen.getByText('restart')));

      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });
  });

  describe('prop validation', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    afterAll(() => {
      spy.mockRestore();
    });

    it('warns no props', () => {
      render(<PlayerKickScreen />);

      // expecting 4 console errors because PlayerKickScreen expects 2 and
      // it's child, PlayerMessageScreen, also expects 2.
      expect(spy).toHaveBeenCalledTimes(4);
    });
  });
});
