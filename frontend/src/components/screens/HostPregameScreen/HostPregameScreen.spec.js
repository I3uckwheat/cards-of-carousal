import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { HostContext } from '../../../contexts/HostContext/HostContext';
import HostPregameScreen from './HostPregameScreen';

describe('Host Pregame Screen', () => {
  // This is the default state value provided by our context
  let state = {
    gameState: 'waiting-for-lobby',
    lobbyID: '',
    players: {},
    playerIDs: [],
    gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
  };
  const dispatch = jest.fn();

  afterEach(() => {
    // sometimes we need to change the state for test cases, this resets to initial value
    state = {
      gameState: 'waiting-for-lobby',
      lobbyID: '',
      players: {},
      playerIDs: [],
      gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
    };
  });

  describe('rendering', () => {
    it('renders', () => {
      const tree = renderer
        .create(
          <HostContext.Provider value={{ state, dispatch }}>
            <HostPregameScreen />
          </HostContext.Provider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('lobby', () => {
    it('creates the lobby', () => {
      expect(dispatch).not.toHaveBeenCalled();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: 'CREATE_LOBBY',
        payload: {},
      });
    });
  });

  describe('buttons', () => {
    it('reloads when the close game button is clicked', () => {
      // window.location properties are read-only, we have to redefine this object to spy on reload
      Object.defineProperty(window, 'location', {
        value: { reload: jest.fn() },
      });
      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      fireEvent.click(screen.getByText('CLOSE GAME'));

      expect(window.location.reload).toHaveBeenCalledTimes(1);
      // create lobby, close game
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[1][0]).toEqual({
        type: 'CLOSE_GAME',
        payload: {},
      });
    });

    it('calls a dispatch when the start button is pressed', () => {
      state = {
        gameState: 'waiting-for-lobby',
        lobbyID: '',
        players: {
          foo: {
            name: 'Bender',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
          },
          bar: {
            name: 'Briggs',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
          },
          baz: {
            name: 'Pedro',
            score: 0,
            isCzar: false,
            submittedCards: [],
            cards: [],
          },
        },
        playerIDs: [],
        gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      fireEvent.click(screen.getByText('START CAROUSING'));

      // FIX ME: create lobby, set game state, set new czar, get deck
      expect(dispatch).toHaveBeenCalledTimes(4);
      expect(dispatch.mock.calls[1][0]).toEqual({
        type: 'START_GAME',
        payload: {},
      });
      expect(dispatch.mock.calls[2][0]).toEqual({
        type: 'SET_NEXT_CZAR',
        payload: {},
      });
    });

    it('does not call dispatch if no players are in the lobby when the start button is clicked', () => {
      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      fireEvent.click(screen.getByText('START CAROUSING'));

      // only create lobby called
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
