import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.35);
`;

export default function Modal({ showModal, setShowModal, children }) {
  return (
    showModal
    && createPortal(
      <Overlay onClick={() => setShowModal(!showModal)}>
        {children}
      </Overlay>,
      document.getElementById('root'),
    )
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  setShowModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};
