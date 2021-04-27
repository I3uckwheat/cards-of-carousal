import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayerErrorScreen from './PlayerErrorScreen';
import { PlayerContext } from '../../contexts/PlayerContext/PlayerContext';

describe('Player error screen', () => {
  describe('render', () => {
    it('renders with default props', () => {
      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerErrorScreen />
        </PlayerContext.Provider>,
      );

      expect(screen.getByText('SOMETHING WENT WRONG')).toBeInTheDocument();
      expect(screen.getByText('Click to restart')).toBeInTheDocument();
    });
  });

  describe('props', () => {
    it('renders big text when passed in', () => {
      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerErrorScreen bigText="this is some big text" />
        </PlayerContext.Provider>,
      );

      expect(screen.getByText('THIS IS SOME BIG TEXT')).toBeInTheDocument();
    });

    it('renders small text when passed in', () => {
      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerErrorScreen smallText="this is some small text" />
        </PlayerContext.Provider>,
      );

      expect(screen.getByText('this is some small text')).toBeInTheDocument();
    });

    it('renders button text', () => {
      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerErrorScreen buttonText="this is some button text" />
        </PlayerContext.Provider>,
      );

      expect(screen.getByTestId('restart')).toHaveTextContent(
        'this is some button text',
      );
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
          <PlayerErrorScreen />
        </PlayerContext.Provider>,
      );

      await act(async () => userEvent.click(screen.getByTestId('restart')));

      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });

    it('does NOT reload when restart button has NOT been clicked', async () => {
      Object.defineProperty(window, 'location', {
        value: { reload: jest.fn() },
      });

      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerErrorScreen />
        </PlayerContext.Provider>,
      );

      await act(async () =>
        userEvent.click(screen.getByText('SOMETHING WENT WRONG')),
      );

      expect(window.location.reload).not.toHaveBeenCalled();
    });
  });
});
