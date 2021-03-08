import React, { useRef, useEffect } from 'react';
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

export default function Modal({ children, onClickOutside }) {
  const overlayRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && event.target === overlayRef.current) {
        onClickOutside();
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return createPortal(
    <Overlay ref={overlayRef} data-testid="overlay">
      {children}
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = propTypes;
