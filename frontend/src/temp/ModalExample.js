import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  height: 70vh;
  border-radius: 24px;
  padding: 48px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  && h1 {
    font-size: 48px;
  }

  && p {
    font-size: 24px;
    padding-bottom: 24px;
  }

  && button {
    background-color: green;
    color: white;
    text-transform: uppercase;
    border-radius: 12px;
    border: none;
    outline: none;
    padding: 12px;
    cursor: pointer;
  }
`;

export default function ModalExample({ toggleModal }) {
  return (
    <Container>
      <div>
        <h1>Modal Example</h1>
        <p>
          Velit incididunt nostrud quis mollit ex sunt laboris aute. Magna nisi
          eismod non dolor ea.
        </p>
        <button type="button" onClick={toggleModal}>
          Confirm
        </button>
      </div>
    </Container>
  );
}

ModalExample.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
