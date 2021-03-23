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
    it('gives the lobby a unique ID and sends message through the socket', () => {
      const hostSocket = createSocket('socketId');
      const onCloseCallBack = jest.fn();
      const lobby = new Lobby(hostSocket, onCloseCallBack);
      const messageObject = {
        event: 'lobby-created',
        payload: { id: lobby.id },
        sender: 'server',
      };
      expect(lobby.id).toBeTruthy();
      expect(hostSocket.on).toBeCalledWith('message', expect.any(Function));
      expect(hostSocket.on).toBeCalledWith('close', expect.any(Function));
      expect(hostSocket.send).toBeCalledWith(JSON.stringify(messageObject));
    });
  });

  describe('has multiple players', () => {
    const hostSocket = createSocket('socketId');
    const onCloseCallBack = jest.fn();
    const lobby = new Lobby(hostSocket, onCloseCallBack);
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
