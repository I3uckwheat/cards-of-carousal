import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Buttons/Button';
import Modal from './Modal';
import config from '../../config';

const propTypes = {
  bigText: PropTypes.string,
  smallText: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  bigText: 'SOMETHING WENT WRONG',
  smallText: 'An unrecoverable error occurred',
  buttonText: 'Click anywhere to restart',
  onClick: () => window.location.reload(),
};

const { smallDesktopWidth } = config.breakpoint.hostBreakpoints;

const AlertWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 180px;
  max-width: 360px;
  width: 90%;
  margin: auto;

  .main-box {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
    padding: 12px;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    flex-grow: 3;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 10px;
  }

  .button {
    background-color: var(--primary-background-color);
    color: var(--primary-text-color);
  }

  .button:hover,
  .button:active,
  .button:focus {
    background: var(--accent-background-color);
  }

  .big-text {
    font-size: 1.2rem;
    padding: 0;
  }

  .small-text {
    font-size: 1.2rem;
  }

  .button-text {
    font-size: 0.8rem;
    padding: 2px;
  }

  @media (min-width: ${smallDesktopWidth}) {
    max-height: 300px;
    max-width: 600px;
    width: auto;

    .bottom {
      padding: 12px;
    }

    .big-text {
      padding: 8px;
    }

    .small-text {
      font-size: 1.5rem;
    }

    .button-text {
      font-size: 1rem;
      padding: 8px;
    }
  }
`;

export default function AlertModal({
  bigText,
  smallText,
  buttonText,
  onClick: handleClick,
}) {
  return (
    <Modal onClickOutside={handleClick}>
      <AlertWrapper onClick={handleClick} className="primary-background-modal">
        <div className="main-box">
          <div className="top">
            <h1 className="big-text">{bigText.toUpperCase()}</h1>
          </div>
          <div className="bottom">
            <p className="small-text">{smallText}</p>
            <Button className="button">
              <p className="button-text">{buttonText}</p>
            </Button>
          </div>
        </div>
      </AlertWrapper>
    </Modal>
  );
}

AlertModal.propTypes = propTypes;
AlertModal.defaultProps = defaultProps;
