import playerReducerMiddleware from './playerReducerMiddleware';
import socketInstance from '../../socket/socket';

jest.mock('../../socket/socket', () => ({
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

  describe('SUBMIT_CARDS', () => {
    it('sends a message to the host with the submitted card indexes', () => {
      const dispatch = jest.fn();

      const result = playerReducerMiddleware(
        {
          type: 'SUBMIT_CARDS',
          payload: { selectedCards: [1, 2, 3] },
        },
        dispatch,
      );

      expect(result).not.toBe({});
      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'player-submit',
        payload: { selectedCards: [1, 2, 3] },
      });
    });
  });

  describe('PREVIEW_WINNER', () => {
    it('sends a message to the host with the index of the selected group of cards', () => {
      const dispatch = jest.fn();

      const result = playerReducerMiddleware(
        {
          type: 'PREVIEW_WINNER',
          payload: { selectedGroupIndex: [1] },
        },
        dispatch,
      );

      expect(result).not.toBe({});
      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'preview-winner',
        payload: { selectedGroupIndex: [1] },
      });
    });
  });
});
