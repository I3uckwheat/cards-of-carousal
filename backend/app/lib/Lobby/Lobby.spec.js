const Lobby = require('./Lobby');

const createSocket = (id) => ({
  id,
  on: jest.fn(),
  send: jest.fn(),
  close: jest.fn(),
});

describe('Lobby', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('calls host socket initialization functions and sends lobby-created message', () => {
      const lobbyId = 'AAAA';
      const hostSocket = createSocket('socketId');
      const onCloseCallBack = jest.fn();
      const shuffleIdCallback = jest.fn();
      const lobby = new Lobby(
        lobbyId,
        hostSocket,
        onCloseCallBack,
        shuffleIdCallback,
      );
      const messageObject = {
        event: 'lobby-created',
        payload: { id: lobby.id },
        sender: 'server',
      };
      expect(hostSocket.on).toBeCalledWith('message', expect.any(Function));
      expect(hostSocket.on).toBeCalledWith('close', expect.any(Function));
      expect(hostSocket.send).toBeCalledWith(JSON.stringify(messageObject));
    });
  });

  describe('has multiple players', () => {
    const lobbyId = 'AAAA';
    const hostSocket = createSocket('socketId');
    const onCloseCallBack = jest.fn();
    const shuffleIdCallback = jest.fn();
    const lobby = new Lobby(
      lobbyId,
      hostSocket,
      onCloseCallBack,
      shuffleIdCallback,
    );
    const playerSocket = createSocket('player1Id');
    const messageObject = {
      event: '',
      payload: {},
      sender: 'server',
    };

    describe('addPlayer', () => {
      it('can add a player and sends message through the socket', () => {
        messageObject.event = 'player-connected';
        messageObject.payload = {
          playerName: 'foo',
          playerId: playerSocket.id,
        };
        lobby.addPlayer(playerSocket, 'foo');
        expect(playerSocket.on).toBeCalledWith('message', expect.any(Function));
        expect(playerSocket.on).toBeCalledWith('close', expect.any(Function));
        expect(hostSocket.send).toBeCalledWith(JSON.stringify(messageObject));
      });

      it('if no player name is provided, uses the default empty string', () => {
        messageObject.payload = {
          playerName: '',
          playerId: playerSocket.id,
        };
        lobby.addPlayer(playerSocket);
        expect(hostSocket.send).toBeCalledWith(JSON.stringify(messageObject));
      });
    });

    describe('closeLobby', () => {
      it('can close a lobby and send message through the socket for each player', () => {
        const playerSocketTwo = createSocket('player2Id');
        messageObject.event = 'lobby-closed';
        messageObject.payload = {};

        lobby.addPlayer(playerSocket, 'playerOneName');
        lobby.addPlayer(playerSocketTwo, 'playerTwoName');
        lobby.closeLobby();

        expect(playerSocket.send).toBeCalledWith(JSON.stringify(messageObject));
        expect(playerSocket.close).toBeCalledWith(1000, messageObject.event);
        expect(playerSocketTwo.send).toBeCalledWith(
          JSON.stringify(messageObject),
        );
        expect(playerSocketTwo.close).toBeCalledWith(1000, messageObject.event);
        expect(onCloseCallBack).toBeCalledWith(lobby.id);
      });
    });
  });
});
