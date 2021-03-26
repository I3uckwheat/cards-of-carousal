import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import PlayerJoinScreen from './PlayerJoinScreen';
import {
  PlayerContext,
  PlayerProvider,
} from '../../../contexts/PlayerContext/PlayerContext';

describe('PlayerJoin', () => {
  describe('render', () => {
    it('should render', () => {
      render(
        <PlayerProvider>
          <PlayerJoinScreen />
        </PlayerProvider>,
      );

      expect(screen.getByTestId('player-join-container')).toBeInTheDocument();
    });
  });

  describe('snapshot', () => {
    it('matches', () => {
      const tree = renderer
        .create(
          <PlayerProvider>
            <PlayerJoinScreen />
          </PlayerProvider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('user input', () => {
    it('name input ignores special characters and spaces', () => {
      const dispatch = jest.fn();
      const state = {};

      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <PlayerJoinScreen />
        </PlayerContext.Provider>,
      );

      userEvent.type(screen.getByPlaceholderText('name'), 'foo!bar');
      expect(screen.getByDisplayValue('foobar')).toBeInTheDocument();
      userEvent.clear(screen.getByPlaceholderText('name'));

      userEvent.type(screen.getByPlaceholderText('name'), '!@#$%¨&*()-foo');
      expect(screen.getByDisplayValue('foo')).toBeInTheDocument();
      userEvent.clear(screen.getByPlaceholderText('name'));

      userEvent.type(screen.getByPlaceholderText('name'), 'f@o#o$');
      expect(screen.getByDisplayValue('foo')).toBeInTheDocument();
      userEvent.clear(screen.getByPlaceholderText('name'));

      userEvent.type(screen.getByPlaceholderText('name'), 'foo bar');
      expect(screen.getByDisplayValue('foobar')).toBeInTheDocument();
      userEvent.clear(screen.getByPlaceholderText('name'));
    });

    it('name input ignores all space characters including leading and trailing', () => {
      const dispatch = jest.fn();
      const state = {};

      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <PlayerJoinScreen />
        </PlayerContext.Provider>,
      );

      userEvent.type(screen.getByPlaceholderText('name'), 'foo bar');
      expect(screen.getByDisplayValue('foobar')).toBeInTheDocument();
      userEvent.clear(screen.getByPlaceholderText('name'));

      userEvent.type(screen.getByPlaceholderText('name'), '  foo');
      expect(screen.getByDisplayValue('foo')).toBeInTheDocument();
      userEvent.clear(screen.getByPlaceholderText('name'));

      userEvent.type(screen.getByPlaceholderText('name'), 'foo bar   ');
      expect(screen.getByDisplayValue('foobar')).toBeInTheDocument();
    });
  });

  describe('submit button', () => {
    it('dispatches JOIN_LOBBY action with user input values for name and join code', () => {
      const dispatch = jest.fn();
      const state = {};

      render(
        <PlayerContext.Provider value={{ state, dispatch }}>
          <PlayerJoinScreen />
        </PlayerContext.Provider>,
      );

      userEvent.type(screen.getByPlaceholderText('name'), 'PLAYER_NAME');
      userEvent.type(screen.getByPlaceholderText('join code'), 'ABCD');
      userEvent.click(screen.getByTestId('player-join-submit-button'));

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'JOIN_LOBBY',
        payload: {
          lobbyId: 'ABCD',
          playerName: 'PLAYER_NAME',
        },
      });
    });
  });
});
