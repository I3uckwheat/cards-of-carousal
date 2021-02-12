const LobbyList = require('./LobbyList');
const Lobby = require('../Lobby/Lobby');

jest.mock('../Lobby/Lobby', () =>
  jest.fn().mockImplementation(() => ({
    id: 'test',
    players: [],
    addPlayer: jest.fn(function addPlayer(player) {
      this.players.push(player);
    }),
  })),
);

describe('LobbyList', () => {
  let testPlayer;
  let lobbyList;

  beforeEach(() => {
    jest.clearAllMocks();
    lobbyList = new LobbyList();
    testPlayer = { id: 'joined' };
  });

  it('creates a lobby', () => {
    const createLobby = jest.spyOn(lobbyList, 'createLobby');

    expect(lobbyList.lobbies).toEqual({});

    lobbyList.createLobby({});

    expect(createLobby).toHaveBeenCalled();
    expect(lobbyList.lobbies).not.toEqual({});
    expect(lobbyList.lobbies.test.id).toBe('test');
  });

  it('joins a lobby', () => {
    expect(Lobby).not.toHaveBeenCalled();

    lobbyList.createLobby({});
    const connection = lobbyList.joinLobby('test', testPlayer);

    expect(lobbyList.lobbies.test.addPlayer).toHaveBeenCalled();
    expect(lobbyList.lobbies.test.players.length).toBe(1);
    expect(lobbyList.lobbies.test.players[0]).toBe(testPlayer);
    expect(connection).toBe('connected');
  });

  it('does not allow joining lobbies that do not exist', () => {
    lobbyList.createLobby({});
    const connection = lobbyList.joinLobby('foo', testPlayer);

    expect(lobbyList.lobbies.test.addPlayer).not.toHaveBeenCalled();
    expect(lobbyList.lobbies.test.players.length).toBe(0);
    expect(lobbyList.lobbies.test.players[0]).toBeUndefined();
    expect(connection).toBe('no-lobby');
  });

  it('closes a lobby', () => {
    const closeMock = jest.fn();

    lobbyList.createLobby({});
    lobbyList.lobbies.test.closeLobby = closeMock;
    lobbyList.joinLobby('test', testPlayer);

    expect(lobbyList.lobbies.test.players.length).toBe(1);

    lobbyList.closeLobby('test');

    expect(closeMock).toHaveBeenCalledTimes(1);
    expect(lobbyList.lobbies.test).toBeUndefined();
    expect(Object.keys(lobbyList.lobbies).length).toBe(0);
  });

  it('throws an error when closing a lobby that does not exist', () => {
    const mockThrow = () => lobbyList.closeLobby('test');

    expect(Object.keys(lobbyList.lobbies).length).toBe(0);
    expect(mockThrow).toThrow();
  });
});
