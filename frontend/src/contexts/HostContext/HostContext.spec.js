import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
// import socketInstance from '../../socket/socket';
import HostProvider, { HostContext } from './HostContext';

jest.mock('../../socket/socket', () => ({
  emitter: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  joinLobby: jest.fn(),
}));

describe('Context', () => {
  it('renders children passed to the provider', () => {
    render(
      <HostProvider>
        <p>Hello world</p>
      </HostProvider>,
    );

    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('warns when not given children', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    render(<HostProvider />);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('sets the default values', () => {
    // this is a reusable test component that bypasses the context provider used in the app
    // so we can test the context with a dummy provider. This is just to test "state" and "dispatch"
    const TestComponent = () => {
      const { state } = useContext(HostContext);

      return (
        <>
          <div data-testid="game-state">{state.gameState}</div>
          <div data-testid="lobby-id">{state.lobbyID}</div>

          <div>
            {Object.keys(state.players).map((player) => (
              <span data-testid="player">{player}</span>
            ))}
          </div>

          <div>
            {state.playerIDs.map((playerID) => (
              <span data-testid="playerID">{playerID}</span>
            ))}
          </div>
        </>
      );
    };

    render(
      <HostProvider>
        <TestComponent />
      </HostProvider>,
    );

    expect(screen.getByTestId('game-state')).toHaveTextContent(
      'waiting-for-lobby',
    );
    expect(screen.getByTestId('lobby-id')).toHaveTextContent('');
    expect(screen.queryAllByTestId('player').length).toBe(0);
    expect(screen.queryAllByTestId('playerID').length).toBe(0);
  });
});
