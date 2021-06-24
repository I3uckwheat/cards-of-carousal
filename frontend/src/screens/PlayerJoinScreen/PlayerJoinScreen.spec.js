import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import PlayerJoinScreen from './PlayerJoinScreen';
import {
  PlayerContext,
  PlayerProvider,
} from '../../contexts/PlayerContext/PlayerContext';
import requestFullscreen from '../../helpers/requestFullscreen';

jest.mock('../../helpers/requestFullscreen');

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

  describe('user inputs', () => {
    describe('name', () => {
      it('ignores all special characters', () => {
        const dispatch = jest.fn();
        const state = {};

        render(
          <PlayerContext.Provider value={{ state, dispatch }}>
            <PlayerJoinScreen />
          </PlayerContext.Provider>,
        );

        userEvent.type(
          screen.getByPlaceholderText('name'),
          '!@#$%¨&*()-foo!@#bar!@#$',
        );
        expect(screen.getByDisplayValue('foobar')).toBeInTheDocument();
      });

      it('ignores mid-sentence spaces', () => {
        const dispatch = jest.fn();
        const state = {};

        render(
          <PlayerContext.Provider value={{ state, dispatch }}>
            <PlayerJoinScreen />
          </PlayerContext.Provider>,
        );

        userEvent.type(screen.getByPlaceholderText('name'), 'foo bar');
        expect(screen.getByDisplayValue('foobar')).toBeInTheDocument();
      });

      it('ignores leading and trailing spaces', () => {
        const dispatch = jest.fn();
        const state = {};

        render(
          <PlayerContext.Provider value={{ state, dispatch }}>
            <PlayerJoinScreen />
          </PlayerContext.Provider>,
        );

        userEvent.type(screen.getByPlaceholderText('name'), '  foo  ');
        expect(screen.getByDisplayValue('foo')).toBeInTheDocument();
      });
    });

    describe('join code', () => {
      it('transforms all lowercase input to uppercase', () => {
        const dispatch = jest.fn();
        const state = {};

        render(
          <PlayerContext.Provider value={{ state, dispatch }}>
            <PlayerJoinScreen />
          </PlayerContext.Provider>,
        );

        userEvent.type(screen.getByPlaceholderText('join code'), 'abcd');
        expect(screen.getByDisplayValue('ABCD')).toBeInTheDocument();
      });

      it('transforms mixed case input to all uppercase', () => {
        const dispatch = jest.fn();
        const state = {};

        render(
          <PlayerContext.Provider value={{ state, dispatch }}>
            <PlayerJoinScreen />
          </PlayerContext.Provider>,
        );

        userEvent.type(screen.getByPlaceholderText('join code'), 'aBcD');
        expect(screen.getByDisplayValue('ABCD')).toBeInTheDocument();
      });

      it('ignores special characters', () => {
        const dispatch = jest.fn();
        const state = {};

        render(
          <PlayerContext.Provider value={{ state, dispatch }}>
            <PlayerJoinScreen />
          </PlayerContext.Provider>,
        );

        userEvent.type(
          screen.getByPlaceholderText('join code'),
          '!@#$FOO!@!@#$',
        );
        expect(screen.getByDisplayValue('FOO')).toBeInTheDocument();
      });

      it('ignores leading and trailing space characters', () => {
        const dispatch = jest.fn();
        const state = {};

        render(
          <PlayerContext.Provider value={{ state, dispatch }}>
            <PlayerJoinScreen />
          </PlayerContext.Provider>,
        );

        userEvent.type(screen.getByPlaceholderText('join code'), '  ABCD  ');
        expect(screen.getByDisplayValue('ABCD')).toBeInTheDocument();
      });
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

    it('requests to go fullscreen when the JOIN button is clicked', () => {
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

      expect(requestFullscreen).toHaveBeenCalledTimes(1);
    });
  });
});
