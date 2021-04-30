import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayerErrorScreen from './PlayerErrorScreen';
import { PlayerContext } from '../../contexts/PlayerContext/PlayerContext';

describe('Player error screen', () => {
  describe('render', () => {
    it('renders with default text props', () => {
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

  describe('button', () => {
    it('reloads when restart button is clicked and no onClickButton callback is passed in', async () => {
      const { reload } = window.location;

      // window.location properties are read-only, we have to redefine this object to spy on reload
      Object.defineProperty(window, 'location', {
        writable: true,
        value: { ...window.location, reload: jest.fn() },
      });

      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerErrorScreen />
        </PlayerContext.Provider>,
      );

      act(() => userEvent.click(screen.getByTestId('restart')));

      expect(window.location.reload).toHaveBeenCalledTimes(1);

      window.location.reload = reload;
    });

    it('calls a custom callback passed in as onClickButton', () => {
      const handleClick = jest.fn();
      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerErrorScreen onClickButton={handleClick} />
        </PlayerContext.Provider>,
      );

      act(() => userEvent.click(screen.getByTestId('restart')));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does NOT reload when an onClickButton function has been passed in', async () => {
      const handleClick = jest.fn();
      const { reload } = window.location;

      // window.location properties are read-only, we have to redefine this object to spy on reload
      Object.defineProperty(window, 'location', {
        writable: true,
        value: { ...window.location, reload: jest.fn() },
      });

      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerErrorScreen onClickButton={handleClick} />
        </PlayerContext.Provider>,
      );

      act(() => userEvent.click(screen.getByTestId('restart')));

      expect(window.location.reload).not.toHaveBeenCalled();

      window.location.reload = reload;
    });

    it('does NOT call the onClickButton callback when restart button has NOT been clicked', async () => {
      const handleClick = jest.fn();

      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerErrorScreen
            smallText="small text"
            onClickButton={handleClick}
          />
        </PlayerContext.Provider>,
      );

      act(() => {
        userEvent.click(screen.getByText('SOMETHING WENT WRONG'));
        userEvent.click(screen.getByText('small text'));
      });

      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
