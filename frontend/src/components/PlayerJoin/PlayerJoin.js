import React, { useState } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Button from '../Buttons/Button';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const propTypes = {};

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  background-color: var(--primary-background-color);
  grid-template-rows: 190px 1fr 140px;
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
  }

  .player-join-form {
    display: grid;
    grid-template-columns: 52% 48%;
    grid-template-rows: 90px 160px 1fr;
  }

  input {
    text-transform: uppercase;
    font-size: 4.4rem;
    font-weight: 500;

    border: none;
    border-bottom: 4px solid var(--primary-text-color);
    padding-top: 24px;
    background: transparent;

    ::placeholder {
      color: var(--primary-text-color);
      font-weight: 500;
      font-size: 4.4rem;
    }
  }

  .player-join-name-input {
    margin-right: 32px;
  }

  .player-join-code-input {
    margin-left: 32px;
  }

  // standard screen sizes
  @media screen and (max-width: 2000px) {
    .player-join-form-container {
      max-width: 1000px;
    }

    .player-join-form {
      grid-template-rows: 60px 100px 1fr;
    }

    input {
      font-size: 1.6rem;
      border-bottom: 2px solid var(--primary-text-color);
      padding-top: 36px;

      ::placeholder {
        font-size: 1.6rem;
      }
    }

    .player-join-name-input {
      margin-right: 16px;
    }

    .player-join-code-input {
      margin-left: 16px;
    }
  }

  @media screen and (max-width: 1024px) {
    .player-join-form-container {
      max-width: 800px;
    }

    .player-join-form {
      grid-template-rows: 60px 80px 1fr;
    }
  }

  @media screen and (max-width: 785px) {
    grid-template-rows: 180px 1fr 120px;
  }

  @media screen and (max-width: 320px) {
    grid-template-rows: 130px 1fr 140px;
  }
`;

const PlayerJoinHeader = styled(Header)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  // CoC logo
  h1 {
    font-size: 6rem;
    line-height: 6rem;
    text-transform: uppercase;

    margin-bottom: -16px;
    vertical-align: bottom;

    @media screen and (max-width: 970px) {
      font-size: 4rem;
      line-height: 5rem;

      margin-bottom: 20.8px;
    }

    @media screen and (max-width: 785px) {
      font-size: 4rem;
      line-height: 4.5rem;

      margin-bottom: -15.2px;
    }

    @media screen and (max-width: 320px) {
      font-size: 3rem;
      line-height: 3.5rem;

      margin-bottom: -12px;
    }
  }
`;

const PlayerJoinButton = styled(Button)`
  grid-column: 1 / 3;
  grid-row: 3;

  width: 900px;
  height: 250px;
  margin: 0 auto;

  border-radius: 2px;
  background-color: var(--secondary-background-color);

  text-transform: uppercase;
  font-size: 4rem;

  @media screen and (max-width: 2000px) {
    font-size: 1.5rem;
    width: 360px;
    height: 100px;
  }
`;

export default function PlayerJoin() {
  const [name, setName] = useState('');
  const [joinCode, setJoinCode] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // TODO - handle form submission by taking user to waiting screen
  }

  return (
    <Container
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
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="player-join-name-input"
            />
            <input
              type="text"
              placeholder="join code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="player-join-code-input"
            />
            <PlayerJoinButton type="submit">
              Let&apos;s Carouse!
            </PlayerJoinButton>
          </form>
        </div>
      </main>
      <Footer />
    </Container>
  );
}

PlayerJoin.propTypes = propTypes;
