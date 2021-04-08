const { customAlphabet } = require('nanoid');
const Lobby = require('../Lobby/Lobby.js');

const customNanoId = customAlphabet('ABCDGHJKMNPRSTUVWXYZ', 4);

module.exports = class LobbyList {
  lobbies = {};

  createLobby = (hostSocket) => {
    const lobby = new Lobby(
      customNanoId(),
      hostSocket,
      this.#handleLobbyClose,
      this.shuffleLobbyIdById,
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

  shuffleLobbyIdById = (lobbyId) => {
    const newId = customNanoId();

    const lobby = this.lobbies[lobbyId];
    this.lobbies[newId] = lobby;
    lobby.updateId(newId);

    delete this.lobbies[lobbyId];
  };
};
