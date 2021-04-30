import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../Buttons/Button';

const propTypes = {
  bigText: PropTypes.string,
  smallText: PropTypes.string,
  buttonText: PropTypes.string,
};

const defaultProps = {
  bigText: 'SOMETHING WENT WRONG',
  smallText: 'An unrecoverable error occurred',
  buttonText: 'Click anywhere to restart',
};

const AlertWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 300px;
  max-width: 600px;
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
    padding: 12px;
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
    padding: 8px;
  }

  .small-text {
    font-size: 1.5rem;
  }

  .button-text {
    font-size: 1rem;
    padding: 8px;
  }

  @media (max-width: 620px) {
    max-height: 180px;
    max-width: 360px;
    width: 90%;

    .bottom {
      padding: 10px;
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
  }
`;

export default function AlertModal({ bigText, smallText, buttonText }) {
  const reload = () => window.location.reload();

  return (
    <AlertWrapper onClick={reload} className="primary-background-modal">
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
  );
}

AlertModal.propTypes = propTypes;
AlertModal.defaultProps = defaultProps;
