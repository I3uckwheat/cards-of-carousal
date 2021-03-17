import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import HostProvider, {
  HostContext,
} from '../../../contexts/HostContext/HostContext';
import HostPregameScreen from './HostPregameScreen';

describe('Host Pregame Screen', () => {
  describe('rendering', () => {
    it('renders', () => {
      const testRender = render(
        <HostProvider>
          <HostPregameScreen />
        </HostProvider>,
      );

      expect(testRender).toMatchSnapshot();
    });

    it('does not change when clicking non-responsive elements', () => {
      const testRender = render(
        <HostProvider>
          <HostPregameScreen />
        </HostProvider>,
      );

      fireEvent.click(testRender.getByText('CARDS OF CAROUSAL'));
      fireEvent.click(testRender.getByText('GAME SETTINGS'));
      fireEvent.click(testRender.getByText('JOIN CODE:'));
      fireEvent.click(testRender.getByText('SELECT CARD PACKS'));
      fireEvent.click(
        testRender.getByText(
          'Cards of Carousal is a game for lorem ipsum dolor.',
        ),
      );

      expect(testRender).toMatchSnapshot();
    });
  });

  describe('lobby', () => {
    it('creates the lobby', () => {
      const state = {
        gameState: 'waiting-for-lobby',
        lobbyID: '',
        players: {},
        playerIDs: [],
        gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
      };
      const dispatch = jest.fn();

      expect(dispatch).not.toHaveBeenCalled();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('buttons', () => {
    it('reloads when the close game button is clicked', () => {
      // window.location properties are read-only, we have to redefine this object to spy on reload
      Object.defineProperty(window, 'location', {
        value: { reload: jest.fn() },
      });
      const testRender = render(
        <HostProvider>
          <HostPregameScreen />
        </HostProvider>,
      );

      fireEvent.click(testRender.getByText('CLOSE GAME'));

      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });

    it('calls a dispatch when the start button is pressed', () => {
      const state = {
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

      const dispatch = jest.fn();

      expect(dispatch).not.toHaveBeenCalled();

      const testRender = render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      // create lobby
      expect(dispatch).toHaveBeenCalledTimes(1);

      fireEvent.click(testRender.getByText('START CAROUSING'));

      // set game state, set new czar
      expect(dispatch).toHaveBeenCalledTimes(3);
    });

    it('does not call dispatch if no players are in the lobby when the start button is clicked', () => {
      const state = {
        gameState: 'waiting-for-lobby',
        lobbyID: '',
        players: {},
        playerIDs: [],
        gameSettings: { maxPlayers: 8, winningScore: 7, selectedPacks: [] },
      };
      const dispatch = jest.fn();

      expect(dispatch).not.toHaveBeenCalled();

      const testRender = render(
        <HostContext.Provider value={{ state, dispatch }}>
          <HostPregameScreen />
        </HostContext.Provider>,
      );

      // create lobby
      expect(dispatch).toHaveBeenCalledTimes(1);

      fireEvent.click(testRender.getByText('START CAROUSING'));

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
