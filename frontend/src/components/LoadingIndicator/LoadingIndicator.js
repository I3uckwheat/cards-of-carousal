import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propType = {
  secondary: PropTypes.bool,
};

const defaultProps = {
  secondary: false,
};

const Loader = styled.div`
  .loading {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .loading div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: ${(props) =>
      props.color
        ? 'var(--primary-background-color)'
        : 'var(--secondary-background-color)'};
    animation: loading 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  .loading div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }
  .loading div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }
  .loading div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }
  @keyframes loading {
    0% {
      top: 8px;
      height: 64px;
    }
    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }
`;

export default function LoadingIndicator({ secondary }) {
  return (
    <Loader color={secondary ? 1 : 0} data-testid="loader">
      <div className="loading">
        <div />
        <div />
        <div />
      </div>
    </Loader>
  );
}

LoadingIndicator.propTypes = propType;
LoadingIndicator.defaultProps = defaultProps;
