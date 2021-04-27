import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayerKickScreen from './PlayerKickScreen';
import { PlayerContext } from '../../contexts/PlayerContext/PlayerContext';

describe('Player kick screen', () => {
  describe('render', () => {
    it('should render', () => {
      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerKickScreen />
        </PlayerContext.Provider>,
      );

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

      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerKickScreen />
        </PlayerContext.Provider>,
      );

      await act(async () => userEvent.click(screen.getByText('restart')));

      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });

    it('does NOT reload when restart button has NOT been clicked', async () => {
      Object.defineProperty(window, 'location', {
        value: { reload: jest.fn() },
      });

      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerKickScreen />
        </PlayerContext.Provider>,
      );

      await act(async () =>
        userEvent.click(screen.getByText("YOU'VE BEEN KICKED!")),
      );

      expect(window.location.reload).not.toHaveBeenCalled();
    });
  });
});
