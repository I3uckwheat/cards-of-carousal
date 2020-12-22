import Lobby from './Lobby.js';

export default class LobbyList {
  lobbies;

  constructor() {
    this.lobbies = {};
  }

  createLobby = (hostSocket) => {
    const lobby = new Lobby(hostSocket);
    this.lobbies[lobby.id] = lobby;

    return lobby.id;
  }

  joinLobby = (lobbyId, webSocket) => {
    if (this.lobbies[lobbyId]) {
      this.lobbies[lobbyId].addPlayer(webSocket);
      return 'connected';
    }

    return 'no-lobby';
  }

  closeLobby = (lobbyId) => {
    // TODO: close socket connections
    delete this.lobbies[lobbyId];
  }
}
