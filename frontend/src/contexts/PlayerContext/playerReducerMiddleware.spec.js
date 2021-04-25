import playerReducerMiddleware from './playerReducerMiddleware';
import socketInstance from '../../socket/socket';

jest.mock('../../socket/socket', () => ({
  joinLobby: jest.fn(),
  sendMessage: jest.fn(),
}));

describe('playerReducerMiddleware', () => {
  it('calls the given dispatch with the given type & payload object', () => {
    const dispatch = jest.fn();

    playerReducerMiddleware(
      { type: 'FOO', payload: { bar: 'bash' } },
      dispatch,
    );

    expect(dispatch).toBeCalledWith({ type: 'FOO', payload: { bar: 'bash' } });
  });

  describe('Action types', () => {
    describe('JOIN_LOBBY', () => {
      it('calls the joinLobby method on the socket with the lobbyId and playerName from the payload', () => {
        const dispatch = jest.fn();

        playerReducerMiddleware(
          {
            type: 'JOIN_LOBBY',
            payload: { lobbyId: 'ABCD', playerName: 'foo' },
          },
          dispatch,
        );

        expect(socketInstance.joinLobby).toHaveBeenCalledWith('ABCD', 'foo');
      });
    });

    describe('SUBMIT_CARDS', () => {
      it("calls the sendMessage method on the socket with event: 'player-submit', and payload: submitted cards indexes", () => {
        const dispatch = jest.fn();

        playerReducerMiddleware(
          {
            type: 'SUBMIT_CARDS',
            payload: { selectedCards: [1, 2, 3] },
          },
          dispatch,
        );

        expect(socketInstance.sendMessage).toHaveBeenCalledWith({
          event: 'player-submit',
          payload: { selectedCards: [1, 2, 3] },
        });
      });
    });

    describe('PREVIEW_WINNER', () => {
      it("calls the sendMessage method on the socket with event: 'preview-winner', and payload: highlighted player ID", () => {
        const dispatch = jest.fn();

        playerReducerMiddleware(
          {
            type: 'PREVIEW_WINNER',
            payload: { highlightedPlayerID: 'foo' },
          },
          dispatch,
        );

        expect(socketInstance.sendMessage).toHaveBeenCalledWith({
          event: 'preview-winner',
          payload: { highlightedPlayerID: 'foo' },
        });
      });
    });

    describe('SUBMIT_WINNER', () => {
      it("calls the sendMessage method on the socket with event: 'select-winner', and payload: empty", () => {
        const dispatch = jest.fn();

        playerReducerMiddleware(
          {
            type: 'SUBMIT_WINNER',
            payload: {},
          },
          dispatch,
        );

        expect(socketInstance.sendMessage).toHaveBeenCalledWith({
          event: 'select-winner',
          payload: {},
        });
      });
    });
  });
});
