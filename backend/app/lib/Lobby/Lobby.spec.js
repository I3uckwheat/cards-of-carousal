const Lobby = require('./Lobby');

let createSocket = (id) => {
  return {
    id,
    on: jest.fn(),
    send: jest.fn(),
    close: jest.fn(),
  };
};

describe('Lobby', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('constructor', () => {
    it('gives the lobby a unique ID and sends message through the socket', () => {
      let hostSocket = createSocket("socketId");
      let onCloseCallBack = jest.fn();
      let lobby = new Lobby(hostSocket, onCloseCallBack);
      let messageObject = {
        event: 'create-lobby',
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
    let hostSocket = createSocket("socketId");
    let onCloseCallBack = jest.fn();
    let lobby = new Lobby(hostSocket, onCloseCallBack);
    let playerSocket = createSocket('player1Id');
    let messageObject = {
      event: '',
      payload: {},
      sender: 'server',
    };
    
    describe('addPlayer', () => {
      it('can add a player and sends message through the socket', () => {
        messageObject.event = 'player-connect';
        messageObject.payload = { playerId: playerSocket.id };
        lobby.addPlayer(playerSocket);
        expect(playerSocket.on).toBeCalledWith('message', expect.any(Function));
        expect(playerSocket.on).toBeCalledWith('close', expect.any(Function));
        expect(hostSocket.send).toBeCalledWith(JSON.stringify(messageObject));
      });
    });
    
    describe('closeLobby', () => {
      it('can close a lobby and send message through the socket for each player', () => {
        let playerSocketTwo = createSocket('player2Id');
        messageObject.event = 'lobby-closed';
        messageObject.payload = {};

        lobby.addPlayer(playerSocket);
        lobby.addPlayer(playerSocketTwo);
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
