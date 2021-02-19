import React, { useState } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Button from '../Buttons/Button';
import Header from '../Header/Header';

const propTypes = {};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 190px 1fr 140;
  grid-template-columns: 1fr;

  && section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .player-join-form-container {
      margin: 0 auto;
    }

    input {
      text-transform: uppercase;
      border: none;
      border-bottom: 1.5px solid black;
      padding: 15px;
    }
  }

  && footer {
    background-color: var(--secondary-color);
  }
`;

const PlayerJoinHeader = styled(Header)``;
const PlayerJoinButton = styled(Button)``;

export default function PlayerJoin() {
  const [name, setName] = useState('');
  const [joinCode, setJoinCode] = useState('');

  return (
    <Container data-testid="player-join-container">
      <PlayerJoinHeader>
        <h1>Cards of Carousal</h1>
      </PlayerJoinHeader>
      <section>
        <div className="player-join-form-container">
          <form>
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
      </section>
      <footer>footer text</footer>
    </Container>
  );
}

PlayerJoin.propTypes = propTypes;
