import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameSettings from './GameSettings';
import { HostContext } from '../../contexts/HostContext/HostContext';
import config from '../../config';

// Need to mock the Modal or createPortal errors are thrown: [Error: Target container is not a DOM element.]
// eslint-disable-next-line react/prop-types
jest.mock('../Modal/Modal', () => ({ children }) => <div>{children}</div>);

function setupFetchMock(jsonValue = ['hello', 'world']) {
  jest.spyOn(window, 'fetch').mockImplementation(async () => ({
    json: async () => jsonValue,
    ok: true,
  }));
}

describe('GameSettings', () => {
  let state = {
    loading: [],
    playerIDs: [],
    newPlayerStaging: [],
  };

  beforeEach(() => {
    state = {
      loading: [],
      playerIDs: [],
      newPlayerStaging: [],
    };
    setupFetchMock();
  });

  describe('render', () => {
    it('renders', async () => {
      const dispatch = jest.fn();
      const onChange = () => {};
      const options = {
        maxPlayers: 5,
        winningScore: 6,
        selectedPacks: [],
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );
      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

      expect(screen.getByText('MAX PLAYERS')).toBeInTheDocument();
      expect(screen.getByText('SELECT CARD PACKS')).toBeInTheDocument();
      expect(screen.getByText('WINNING SCORE')).toBeInTheDocument();
      expect(screen.getByText('GAME SETTINGS')).toBeInTheDocument();
    });

    it('renders with proper values returned by the api request', async () => {
      const dispatch = jest.fn();
      const onChange = () => {};
      const options = {
        maxPlayers: 5,
        winningScore: 6,
        selectedPacks: [],
      };

      setupFetchMock(['goodbye', 'cruel', 'world']);

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );
      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

      expect(screen.getByText('goodbye')).toBeInTheDocument();
      expect(screen.getByText('cruel')).toBeInTheDocument();
      expect(screen.getByText('world')).toBeInTheDocument();
    });

    it('displays a loading indicator while the pack names are being requested', async () => {
      const dispatch = jest.fn();
      const onChange = () => {};
      const options = {
        maxPlayers: 5,
        winningScore: 6,
        selectedPacks: [],
      };

      state = {
        loading: ['getting-packs'],
        playerIDs: [],
        newPlayerStaging: [],
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );

      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('dispatches the GET_PACKS action on mount', async () => {
      const dispatch = jest.fn();
      const onChange = () => {};
      const options = {
        maxPlayers: 5,
        winningScore: 6,
        selectedPacks: [],
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );

      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

      expect(dispatch).toHaveBeenCalledWith({ type: 'GET_PACKS', payload: {} });
    });

    it('dispatches the PACKS_RECEIVED action when the packs have been fetched', async () => {
      const dispatch = jest.fn();
      const onChange = () => {};
      const options = {
        maxPlayers: 5,
        winningScore: 6,
        selectedPacks: [],
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );

      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PACKS_RECEIVED',
        payload: {},
      });
    });

    it('dispatches an error if the fetch fails', async () => {
      const fetchSpy = jest
        .spyOn(window, 'fetch')
        .mockImplementation(async () => ({
          json: async () => new Error('Failed to fetch'),
          ok: false,
        }));

      const dispatch = jest.fn();
      const onChange = () => {};
      const options = {
        maxPlayers: 5,
        winningScore: 6,
        selectedPacks: [],
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );

      await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1));

      expect(screen.getByText('FAILED TO GET CARD PACKS')).toBeInTheDocument();
      expect(screen.getByText('Please try again later')).toBeInTheDocument();
      expect(screen.getByText('Click anywhere to restart')).toBeInTheDocument();

      fetchSpy.mockRestore();
    });
  });

  describe('options', () => {
    it('renders with the proper value set for maxPlayers', async () => {
      const dispatch = jest.fn();
      const onChange = () => {};
      const options = {
        maxPlayers: 121,
        winningScore: 6,
        selectedPacks: [],
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );
      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
      expect(screen.getByLabelText('MAX PLAYERS')).toHaveValue(121);
    });

    it('renders with the proper value set for winningScore', async () => {
      const dispatch = jest.fn();
      const onChange = () => {};
      const options = {
        maxPlayers: 5,
        winningScore: 87,
        selectedPacks: [],
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );
      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
      expect(screen.getByLabelText('WINNING SCORE')).toHaveValue(87);
    });

    it('renders with the proper boxes checked for selectedPacks', async () => {
      const dispatch = jest.fn();
      const onChange = () => {};
      const options = {
        maxPlayers: 5,
        winningScore: 6,
        selectedPacks: [3, 0],
      };

      const mockPacks = [
        'pack-zero',
        'pack-one',
        'pack-two',
        'pack-three',
        'pack-four',
        'pack-five',
      ];

      setupFetchMock(mockPacks);

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );
      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

      ['pack-zero', 'pack-three'].forEach((pack) => {
        expect(screen.getByLabelText(pack)).toBeChecked();
      });

      ['pack-one', 'pack-two', 'pack-four', 'pack-five'].forEach((pack) => {
        expect(screen.getByLabelText(pack)).not.toBeChecked();
      });
    });

    it('renders with no boxes checked when selectedPacks is empty', async () => {
      const dispatch = jest.fn();
      const onChange = () => {};
      const options = {
        maxPlayers: 5,
        winningScore: 6,
        selectedPacks: [],
      };

      const mockPacks = [
        'pack-zero',
        'pack-one',
        'pack-two',
        'pack-three',
        'pack-four',
        'pack-five',
      ];

      setupFetchMock(mockPacks);

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );
      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

      mockPacks.forEach((pack) => {
        expect(screen.getByLabelText(pack)).not.toBeChecked();
      });
    });
  });

  describe('onChange', () => {
    it('runs when MAX PLAYERS is changed and passes the new value back', async () => {
      const dispatch = jest.fn();
      const onChange = jest.fn();
      const options = {
        maxPlayers: 1,
        winningScore: 6,
        selectedPacks: [],
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );
      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

      // Simulate user appending "2"
      userEvent.type(screen.getByLabelText('MAX PLAYERS'), '2');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({
        maxPlayers: 12,
        winningScore: 6,
        selectedPacks: [],
      });
    });

    it('prevents a value larger than the maximum to be set in MAX PLAYERS', async () => {
      const dispatch = jest.fn();
      const onChange = jest.fn();
      const options = {
        maxPlayers: 5,
        winningScore: 5,
        selectedPacks: [],
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );
      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

      // Simulate user appending "9"
      userEvent.type(screen.getByLabelText('MAX PLAYERS'), '9');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({
        maxPlayers: config.maxPlayers.max,
        winningScore: 5,
        selectedPacks: [],
      });
    });

    it('prevents a value smaller than the minimum to be set in MAX PLAYERS', async () => {
      const dispatch = jest.fn();
      const onChange = jest.fn();
      const options = {
        maxPlayers: -1,
        winningScore: 5,
        selectedPacks: [],
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );
      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

      // Simulate user appending "0"
      userEvent.type(screen.getByLabelText('MAX PLAYERS'), '0');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({
        maxPlayers: config.maxPlayers.min,
        winningScore: 5,
        selectedPacks: [],
      });
    });

    it('runs when WINNING SCORE is changed and passes the new value back', async () => {
      const dispatch = jest.fn();
      const onChange = jest.fn();
      const options = {
        maxPlayers: 5,
        winningScore: 1,
        selectedPacks: [],
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );
      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

      // Simulate user appending "3"
      userEvent.type(screen.getByLabelText('WINNING SCORE'), '3');
      expect(onChange).toHaveBeenCalledTimes(1);

      expect(onChange).toHaveBeenCalledWith({
        maxPlayers: 5,
        winningScore: 13,
        selectedPacks: [],
      });
    });

    it('prevents a value larger than the maximum to be set in WINNING SCORE', async () => {
      const dispatch = jest.fn();
      const onChange = jest.fn();
      const options = {
        maxPlayers: 5,
        winningScore: 5,
        selectedPacks: [],
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );
      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

      // Simulate user appending "9"
      userEvent.type(screen.getByLabelText('WINNING SCORE'), '9');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({
        maxPlayers: 5,
        winningScore: config.winningScore.max,
        selectedPacks: [],
      });
    });

    it('prevents a value smaller than the minimum to be set in WINNING SCORE', async () => {
      const dispatch = jest.fn();
      const onChange = jest.fn();
      const options = {
        maxPlayers: 5,
        winningScore: -1,
        selectedPacks: [],
      };

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );
      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

      // Simulate user appending "0"
      userEvent.type(screen.getByLabelText('WINNING SCORE'), '0');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({
        maxPlayers: 5,
        winningScore: config.winningScore.min,
        selectedPacks: [],
      });
    });

    it('runs when checkbox is changed', async () => {
      const dispatch = jest.fn();
      const onChange = jest.fn();
      const options = {
        maxPlayers: 5,
        winningScore: 6,
        selectedPacks: [],
      };

      setupFetchMock(['pack-one', 'pack-two']);

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );
      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
      userEvent.click(screen.getByLabelText('pack-one'));
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('calls the callback when the cardPack index in selectedPacks when a pack is checked', async () => {
      const dispatch = jest.fn();
      const onChange = jest.fn();
      const options = {
        maxPlayers: 5,
        winningScore: 6,
        selectedPacks: [],
      };

      setupFetchMock(['pack-one', 'pack-two']);

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );
      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
      userEvent.click(screen.getByLabelText('pack-one'));
      expect(onChange).toHaveBeenCalledTimes(1);

      expect(onChange).toHaveBeenCalledWith({
        maxPlayers: 5,
        winningScore: 6,
        selectedPacks: [0],
      });
    });

    it('calls the callback when the cardPack index in selectedPacks when a pack is unchecked', async () => {
      const dispatch = jest.fn();
      const onChange = jest.fn();
      const options = {
        maxPlayers: 5,
        winningScore: 6,
        selectedPacks: [1, 0],
      };

      setupFetchMock(['pack-one', 'pack-two']);

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <GameSettings onChange={onChange} options={options} />
        </HostContext.Provider>,
      );
      await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
      userEvent.click(screen.getByLabelText('pack-two'));
      expect(onChange).toHaveBeenCalledTimes(1);

      expect(onChange).toHaveBeenCalledWith({
        maxPlayers: 5,
        winningScore: 6,
        selectedPacks: [0],
      });
    });
  });
});
