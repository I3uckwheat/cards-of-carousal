import React, { useState, useContext } from 'react';
import socketInstance from '../socket/socket';
import { StoreContext } from '../contexts/myContext/context';

function SocketTest() {
  const { state } = useContext(StoreContext);
  const { socketIsActive, lobbyId } = state;
  const [lobbyInput, setLobbyInput] = useState('');
  const [socketMessageInput, setSocketMessageInput] = useState('');
  const [isHosting, setIsHosting] = useState(false);

  const handleCreateLobby = () => {
    socketInstance.createLobby();
    setIsHosting(true);
  };

  const handleJoinLobby = (e) => {
    e.preventDefault();
    socketInstance.joinLobby(lobbyInput);
    setLobbyInput('');
  };

  const handleLobbyInputChange = (e) => {
    setLobbyInput(e.target.value.toUpperCase());
  };

  const handleSocketMessageChange = (e) => {
    setSocketMessageInput(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    socketInstance.sendMessage({
      event: 'message',
      payload: socketMessageInput,
    });
    setSocketMessageInput('');
  };

  return (
    <div>
      {!socketIsActive && (
        <div>
          <button type="button" onClick={handleCreateLobby}>
            Create Lobby
          </button>
          <form onSubmit={handleJoinLobby}>
            <input
              type="text"
              onChange={handleLobbyInputChange}
              value={lobbyInput}
            />
            <button type="submit">Join Lobby</button>
          </form>
        </div>
      )}
      <p>
        Socket status:
        <b>{socketIsActive ? ' Active' : ' Inactive'}</b>
      </p>
      {socketIsActive && (
        <>
          <p>
            Client type:
            <b>{isHosting ? ' HOST' : ' PLAYER'}</b>
          </p>
          {isHosting && (
            <p>
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              Lobby: <b>{lobbyId}</b>
            </p>
          )}
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              onChange={handleSocketMessageChange}
              value={socketMessageInput}
              placeholder="Send a socket message"
            />
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
}

export default SocketTest;
