const LobbyList = require('./LobbyList');
const Lobby = require('../Lobby/Lobby');

jest.mock('../Lobby/Lobby', () =>
  jest.fn().mockImplementation(() => ({
    id: 'test',
    players: [],
    addPlayer: jest.fn(function addPlayer(player) {
      this.players.push(player);
    }),
    updateId: jest.fn(),
  })),
);

jest.mock('nanoid', () => ({ customAlphabet: () => () => 'ABCD' }));

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
    const connection = lobbyList.joinLobby('test', 'playerName', testPlayer);

    expect(lobbyList.lobbies.test.addPlayer).toHaveBeenCalled();
    expect(lobbyList.lobbies.test.players.length).toBe(1);
    expect(lobbyList.lobbies.test.players[0]).toBe(testPlayer);
    expect(connection).toBe('connected');
  });

  it('does not allow joining lobbies that do not exist', () => {
    lobbyList.createLobby({});
    const connection = lobbyList.joinLobby('foo', 'playerName', testPlayer);

    expect(lobbyList.lobbies.test.addPlayer).not.toHaveBeenCalled();
    expect(lobbyList.lobbies.test.players.length).toBe(0);
    expect(lobbyList.lobbies.test.players[0]).toBeUndefined();
    expect(connection).toBe('no-lobby');
  });

  it('closes a lobby', () => {
    const closeMock = jest.fn();

    lobbyList.createLobby({});
    lobbyList.lobbies.test.closeLobby = closeMock;
    lobbyList.joinLobby('test', 'playerName', testPlayer);

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

  describe('shuffleLobbyIdById', () => {
    it('shuffles (using customNanoId) the key in lobbyList.lobbies for the lobby with the given id', () => {
      lobbyList.createLobby({});

      expect(Object.keys(lobbyList.lobbies).length).toBe(1);
      expect(lobbyList.lobbies).toHaveProperty('test');

      const testLobby = lobbyList.lobbies.test;

      lobbyList.shuffleLobbyIdById('test');

      expect(Object.keys(lobbyList.lobbies).length).toBe(1);
      expect(lobbyList.lobbies).not.toHaveProperty('test');
      expect(lobbyList.lobbies).toHaveProperty('ABCD');

      expect(lobbyList.lobbies.ABCD).toBe(testLobby);
    });

    it('calls updateId on the lobby with the new id', () => {
      lobbyList.createLobby({});

      const testLobby = lobbyList.lobbies.test;

      lobbyList.shuffleLobbyIdById('test');

      expect(testLobby.updateId).toHaveBeenCalledWith('ABCD');
    });
  });
});
