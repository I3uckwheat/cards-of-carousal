import Lobby from '../Lobby/Lobby.js';

export default class LobbyList {
  lobbies = {};

  createLobby = (hostSocket) => {
    const lobby = new Lobby(hostSocket, this.#handleLobbyClose);

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

  #handleLobbyClose = (lobbyId) => {
    delete this.lobbies[lobbyId];
  }

  closeLobby = (lobbyId) => {
    this.lobbies[lobbyId].closeLobby();
    delete this.lobbies[lobbyId];
  }
}
