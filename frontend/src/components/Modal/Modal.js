import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  children: PropTypes.node.isRequired,
  onClickOutside: PropTypes.func.isRequired,
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: 9999;
`;

export default function Modal({ onClickOutside, children }) {
  return createPortal(
    <Overlay onClick={onClickOutside}>
      {children}
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = propTypes;
