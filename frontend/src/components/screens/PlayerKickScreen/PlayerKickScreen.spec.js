import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayerKickScreen from './PlayerKickScreen';

describe('Player kick screen', () => {
  describe('render', () => {
    it('should render', () => {
      render(<PlayerKickScreen />);

      expect(screen.getByText("YOU'VE BEEN KICKED!")).toBeInTheDocument();
      expect(screen.getByText('restart')).toBeInTheDocument();
    });
  });

  describe('buttons', () => {
    it('reloads when restart button is clicked', async () => {
      // window.location properties are read-only, we have to redefine this object to spy on reload
      Object.defineProperty(window, 'location', {
        value: { reload: jest.fn() },
      });

      render(<PlayerKickScreen />);

      await act(async () => userEvent.click(screen.getByText('restart')));

      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });
  });
});
