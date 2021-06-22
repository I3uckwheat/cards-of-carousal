import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Buttons/Button';
import { PlayerContext } from '../../contexts/PlayerContext/PlayerContext';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout/HeaderFooterLayout';
import config from '../../config';

const propTypes = {};

const {
  largeMobile,
  smallDesktop,
  largeDesktop,
} = config.breakpoint.playerBreakpoints;

const PlayerJoinContainer = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: var(--primary-background-color);

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  .player-join-form-container {
    width: 100%;
    max-width: 1650px;
    margin: 0 auto;
    text-align: center;
    margin-top: -50px;
  }

  .player-join-form-input-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .player-join-form {
    display: flex;
    flex-direction: column;
  }

  input {
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 700;
    border: none;
    border-bottom: 2px solid var(--primary-text-color);
    padding-top: 24px;
    background: transparent;
    padding-left: 0;
    width: 268px;
  }

  input::placeholder {
    color: var(--primary-text-color);
    font-size: 1.5rem;
  }

  @media screen and (min-width: ${largeMobile}) {
    .player-join-form-container {
      margin-top: 0;
    }
    .player-join-form-input-container {
      flex-direction: row;
    }
    .player-join-name-input {
      margin-right: 20px;
    }
  }

  @media screen and (min-width: 951px) {
    input,
    input::placeholder {
      font-size: 1.8rem;
    }
    input {
      width: 400px;
    }
    .player-join-name-input {
      margin-right: 50px;
    }
  }

  @media screen and (min-width: ${smallDesktop}) {
    input,
    input::placeholder {
      font-size: 2.5rem;
    }
    input {
      width: 500px;
    }
  }

  @media (min-width: ${largeDesktop}) {
    input,
    input::placeholder {
      font-size: 3rem;
    }
    input {
      width: 900px;
    }
  }

  // mobile landscape orientation
  @media screen and (max-height: 567px) and (min-width: ${largeMobile}) {
    .player-join-form-container {
      margin-top: 0;
    }
    .player-join-form-input-container {
      flex-direction: row;
    }
    input {
      width: 45%;
    }
    .player-join-name-input {
      margin-right: 20px;
    }
  }
`;

const PlayerJoinButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;

  width: 268px;
  height: 69px;

  border-radius: 2px;
  background-color: var(--secondary-background-color);
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-top: 50px;

  @media screen and (min-width: ${largeMobile}) {
    font-size: 1.5rem;
    width: 256px;
    height: 66px;
    margin-top: 100px;
  }

  @media screen and (min-width: ${smallDesktop}) {
    font-size: 2.25rem;
    width: 350px;
    height: 82px;
  }

  @media (min-width: ${largeDesktop}) {
    width: 490px;
    height: 126px;

    font-size: 3rem;
  }

  @media screen and (max-height: 567px) and (min-width: ${largeMobile}) {
    margin-top: 30px;
  }
`;

export default function PlayerJoinScreen() {
  const { dispatch } = useContext(PlayerContext);

  const [name, setName] = useState('');
  const [joinCode, setJoinCode] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: 'JOIN_LOBBY',
      payload: { lobbyId: joinCode, playerName: name },
    });
  }

  function handleNameChange(e) {
    const inputValue = e.target.value;

    // Filter user input to ignore special characters
    if (/\W+/g.test(inputValue)) return;

    // Only accepts alphanumeric and underscore characters
    setName(inputValue);
  }

  function handleJoinCodeChange(e) {
    const inputValue = e.target.value;

    // Filter user input to ignore numeric and special characters
    if (/[^A-Za-z]+/g.test(inputValue)) return;

    // Accepts uppercase and lowercase letter characters, but converts it all to uppercase
    setJoinCode(inputValue.toUpperCase());
  }

  return (
    <PlayerJoinContainer
      data-testid="player-join-container"
      className="primary-background"
    >
      <HeaderFooterLayout>
        <main>
          <div className="player-join-form-container">
            <form onSubmit={handleSubmit} className="player-join-form">
              <div className="player-join-form-input-container">
                <input
                  required
                  type="text"
                  maxLength="12"
                  placeholder="name"
                  value={name}
                  onChange={handleNameChange}
                  className="player-join-name-input"
                />
                <input
                  required
                  maxLength="4"
                  type="text"
                  placeholder="join code"
                  value={joinCode}
                  onChange={handleJoinCodeChange}
                  className="player-join-code-input"
                />
              </div>
              <PlayerJoinButton
                data-testid="player-join-submit-button"
                type="submit"
              >
                Let&apos;s Carouse!
              </PlayerJoinButton>
            </form>
          </div>
        </main>
      </HeaderFooterLayout>
    </PlayerJoinContainer>
  );
}

PlayerJoinScreen.propTypes = propTypes;
