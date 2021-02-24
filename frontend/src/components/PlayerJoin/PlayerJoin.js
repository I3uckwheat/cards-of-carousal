import React, { useState } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Button from '../Buttons/Button';
import Header from '../Header/Header';

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

  @media screen and (max-width: 785px) {
    grid-template-rows: 180px 1fr 120px;
  }

  @media screen and (max-width: 320px) {
    grid-template-rows: 130px 1fr 140px;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .player-join-form-container {
      width: 100%;
      max-width: 80vw;
      margin: 0 auto;
      text-align: center;
      margin-top: -8rem;

      form {
        display: grid;
        grid-template-columns: 55% 45%;
        grid-template-rows: 1fr 30px 1fr;
      }
    }

    input {
      text-transform: uppercase;
      border: none;
      border-bottom: 2px solid var(--primary-text-color);
      background: transparent;
      ::placeholder {
        color: var(--primary-text-color);
        font-weight: 500;
      }
    }

    // name input
    input:nth-of-type(1) {
      margin-right: 0.5rem;
    }

    // join code input
    input:nth-of-type(2) {
      margin-left: 0.5rem;
    }
  }

  footer {
    background-color: var(--secondary-background-color);
    color: var(--secondary-text-color);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    font-weight: 500;

    // credits
    div:nth-of-type(1) {
      padding: 0 1rem 0 1rem;
    }

    div:nth-of-type(2) {
      padding: 0 1rem 1rem 1rem;
    }

    @media screen and (max-width: 506px) {
      background: none;
      color: var(--accent-color);
      text-align: center;

      // reducing the width of the first credit container so both credits wrap at the same breakpoint
      div:nth-of-type(1) {
        line-height: 1.5rem;
        width: 320px;
        margin: 0 auto;
        padding-bottom: 1.75rem;
      }

      div:nth-of-type(2) {
        line-height: 1.5rem;
        padding-bottom: 1rem;
      }
    }
  }
`;

const PlayerJoinHeader = styled(Header)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  // CoC logo
  h1 {
    text-transform: uppercase;
    font-size: 6rem;
    margin-bottom: -1rem;
    line-height: 6rem;
    vertical-align: bottom;

    @media screen and (max-width: 970px) {
      font-size: 4rem;
      margin-bottom: -1.3rem;
      line-height: 5rem;
    }

    @media screen and (max-width: 785px) {
      font-size: 4rem;
      margin-bottom: -0.95rem;
      line-height: 4.5rem;
    }

    @media screen and (max-width: 320px) {
      font-size: 3rem;
      margin-bottom: -0.75rem;
      line-height: 3.5rem;
    }
  }
`;

const PlayerJoinButton = styled(Button)`
  margin: 0 auto;
  padding: 18px 64px;
  font-size: 24px;
  background-color: var(--secondary-background-color);
  border-radius: 2px;
  grid-column: 1 / 3;
  grid-row: 3;
`;

export default function PlayerJoin() {
  const [name, setName] = useState('');
  const [joinCode, setJoinCode] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // TODO - handle form submission
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
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="join code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />
            <PlayerJoinButton type="submit">
              Let&apos;s Carouse!
            </PlayerJoinButton>
          </form>
        </div>
      </main>
      <footer>
        <div>Card content thanks to: https://cardsagainsthumanity.com</div>
        <div>
          Made by Odin students, with love: https://www.theodinproject.com
        </div>
      </footer>
    </Container>
  );
}

PlayerJoin.propTypes = propTypes;
