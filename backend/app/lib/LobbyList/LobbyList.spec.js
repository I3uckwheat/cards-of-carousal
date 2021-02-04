/* eslint-disable no-unused-vars */
const LobbyList = require('./LobbyList');

jest.mock('./LobbyList');

describe('LobbyList', () => {
  beforeEach(() => {
    LobbyList.mockClear();
  });
  it('calls the constructor', () => {
    expect(LobbyList).not.toHaveBeenCalled();
    const lobbyList = new LobbyList();
    expect(LobbyList).toHaveBeenCalledTimes(1);
  });
});
