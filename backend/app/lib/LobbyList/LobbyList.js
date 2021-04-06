const Lobby = require('../Lobby/Lobby.js');

module.exports = class LobbyList {
  lobbies = {};

  createLobby = (hostSocket) => {
    const lobby = new Lobby(
      hostSocket,
      this.#handleLobbyClose,
      this.#setIdCallback,
    );

    this.lobbies[lobby.id] = lobby;

    return lobby.id;
  };

  joinLobby = (lobbyId, playerName, webSocket) => {
    if (this.lobbies[lobbyId]) {
      this.lobbies[lobbyId].addPlayer(webSocket, playerName);
      return 'connected';
    }

    return 'no-lobby';
  };

  #handleLobbyClose = (lobbyId) => {
    delete this.lobbies[lobbyId];
  };

  closeLobby = (lobbyId) => {
    if (this.lobbies[lobbyId]) {
      this.lobbies[lobbyId].closeLobby();
      delete this.lobbies[lobbyId];
    } else {
      throw new Error(`Lobby ${lobbyId} does not exist`);
    }
  };

  #setIdCallback = (lobby, newId) => {
    this.lobbies[newId] = lobby;
    delete this.lobbies[lobby.id];
  };
};
