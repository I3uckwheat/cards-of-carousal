import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Buttons/Button';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { PlayerContext } from '../../contexts/PlayerContext/PlayerContext';

const propTypes = {};

const PlayerJoinContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  height: 100%;
  background-color: var(--primary-background-color);
  grid-template-rows: 130px 1fr auto;
  grid-template-columns: 1fr;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .player-join-form-container {
    width: 100%;
    max-width: 1650px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
    margin-top: -88px;
  }

  .player-join-form {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 60px 60px 40px 1fr;
  }

  .player-join-name-input {
    grid-row: 1;
    grid-column: 1;
  }

  .player-join-code-input {
    grid-row: 2;
    grid-column: 1;
  }

  .player-join-name-input,
  .player-join-code-input {
    margin: 0 16px;
  }

  input {
    text-transform: uppercase;
    font-size: 1.2rem;
    border: none;
    border-bottom: 2px solid var(--primary-text-color);
    padding-top: 40px;
    background: transparent;
    padding-left: 0;
  }

  input::placeholder {
    color: var(--primary-text-color);
    font-size: 1.2rem;
  }

  @media screen and (min-width: 646px) {
    .player-join-form-container {
      padding-left: 40px;
      padding-right: 40px;
    }

    .player-join-form {
      grid-template-columns: 52% 48%;
      grid-template-rows: 60px 60px 40px 1fr;
    }

    .player-join-name-input {
      grid-row: 1;
      grid-column: 1 / 3;
    }

    .player-join-code-input {
      grid-row: 2;
      grid-column: 1 / 3;
    }

    .player-join-name-input,
    .player-join-code-input {
      margin: 0 16px;
    }
  }

  @media screen and (min-width: 786px) {
    // header, main, footer
    grid-template-rows: 180px 1fr auto;

    .player-join-form-container {
      max-width: 800px;
    }

    .player-join-form {
      grid-template-rows: 60px 60px 1fr;
    }

    .player-join-name-input {
      grid-row: 1;
      grid-column: 1;
    }

    .player-join-code-input {
      grid-row: 1;
      grid-column: 2;
    }
  }

  @media screen and (min-width: 970px) {
    input {
      font-size: 1.2rem;
      border-bottom: 2px solid var(--primary-text-color);
      padding-top: 40px;
    }

    input::placeholder {
      font-size: 1.2rem;
    }
  }

  @media screen and (min-width: 2000px) {
    .player-join-form-container {
      max-width: 1000px;
    }

    .player-join-form {
      grid-template-rows: 60px 88px 1fr;
    }

    input {
      font-size: 1.6rem;
      border-bottom: 2px solid var(--primary-text-color);
      padding-top: 36px;
    }

    input::placeholder {
      font-size: 1.6rem;
    }

    .player-join-name-input {
      margin-right: 16px;
    }

    .player-join-code-input {
      margin-left: 16px;
    }
  }

  // 4k
  @media screen and (min-width: 2560px) {
    .player-join-form-container {
      max-width: 1650px;
      padding: 20px 80px 20px 80px;
    }

    .player-join-form {
      grid-template-rows: 90px 160px 1fr;
    }

    input {
      font-size: 4.4rem;
      font-weight: 500;
      border-bottom: 4px solid var(--primary-text-color);
      padding-top: 24px;
      padding-left: 0;
    }

    input::placeholder {
      font-weight: 500;
      font-size: 4.4rem;
    }

    .player-join-name-input {
      margin-right: 32px;
    }

    .player-join-code-input {
      margin-left: 32px;
    }
  }

  // small mobile landscape orientation
  @media screen and (max-height: 320px) {
    .player-join-form-container {
      margin-top: -20px;
    }

    .player-join-form {
      /* grid-template-rows: 60px 60px 1fr; */
      grid-template-rows: 50px 40px 1fr;
    }

    input {
      padding-top: 30px;
    }
  }

  // medium mobile landscape orientation
  @media screen and (min-height: 321px) and (max-height: 375px) {
    grid-template-rows: 60px 1fr auto;

    .player-join-form-container {
      margin-top: -20px;
    }
  }

  // large mobile landscape orientation
  @media screen and (min-height: 376px) and (max-height: 414px) {
    .player-join-form-container {
      margin-top: -10px;
    }
  }

  //extra large mobile landscape orientation
  @media screen and (min-height: 415px) and (max-height: 567px) {
    .player-join-form-container {
      margin-top: 10px;
    }

    .player-join-form {
      grid-template-rows: 60px 60px 1fr;
    }

    input {
      padding-top: 40px;
    }
  }

  // all mobile size landscape orientation
  @media screen and (max-height: 567px) {
    // header, main, footer
    grid-template-rows: 60px 1fr auto;

    .player-join-form {
      grid-template-columns: 52% 48%;
    }

    .player-join-name-input {
      grid-row: 1;
      grid-column: 1;
    }

    .player-join-code-input {
      grid-row: 1;
      grid-column: 2;
    }
  }
`;

const PlayerJoinHeader = styled(Header)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  // CoC logo
  h1 {
    font-size: 3rem;
    line-height: 3.5rem;
    text-transform: uppercase;

    margin-bottom: -12px;
    vertical-align: bottom;
  }

  @media screen and(min-width: 786px) {
    h1 {
      font-size: 4rem;
      line-height: 4.5rem;

      margin-bottom: -15px;
    }
  }

  @media screen and (min-width: 970px) {
    h1 {
      line-height: 5rem;

      margin-bottom: -24px;
    }
  }

  @media screen and (min-width: 2560px) {
    h1 {
      font-size: 6rem;
      line-height: 6rem;

      margin-bottom: -16px;
    }
  }
`;

const PlayerJoinButton = styled(Button)`
  grid-row: 4;
  margin: 0 auto;

  width: 260px;
  height: 72px;

  border-radius: 2px;
  background-color: var(--secondary-background-color);
  font-size: 1.2rem;
  text-transform: uppercase;

  @media screen and (min-width: 646px) {
    grid-column: 1 / 3;
  }

  @media screen and (min-width: 786px) {
    grid-row: 4;
  }

  @media screen and (min-width: 970px) {
    font-size: 1.2rem;
    width: 288px;
    height: 80px;
  }

  @media screen and (min-width: 2000px) {
    font-size: 1.5rem;
    width: 360px;
    height: 100px;
  }

  @media screen and (min-width: 2560px) {
    font-size: 4rem;
    width: 900px;
    height: 225px;
  }

  // mobile landscape orientation
  @media screen and (max-height: 567px) {
    grid-column: 1 / 3;
    grid-row: 3;
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
      <PlayerJoinHeader>
        <h1>Cards of Carousal</h1>
      </PlayerJoinHeader>
      <main>
        <div className="player-join-form-container">
          <form onSubmit={(e) => handleSubmit(e)} className="player-join-form">
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
            <PlayerJoinButton
              data-testid="player-join-submit-button"
              type="submit"
            >
              Let&apos;s Carouse!
            </PlayerJoinButton>
          </form>
        </div>
      </main>
      <Footer />
    </PlayerJoinContainer>
  );
}

PlayerJoinScreen.propTypes = propTypes;
