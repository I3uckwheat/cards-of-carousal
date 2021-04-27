import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlayerMessageScreen from '../../screens/PlayerMessageScreen/PlayerMessageScreen';
import Button from '../../components/Buttons/Button';
import { PlayerProvider } from '../../contexts/PlayerContext/PlayerContext';

const RestartButton = styled(Button)`
  background-color: var(--primary-background-color);
  color: var(--secondary-color);
  width: 100px;
  margin: 32px auto 0 auto;
  border-radius: 2px;
  text-transform: uppercase;

  @media screen and (min-width: 801px) {
    width: 116px;
    height: 40px;
    margin: 40px auto 0 auto;
  }

  @media screen and (min-width: 1151px) {
    font-size: 1rem;
    line-height: 1rem;
    width: 144px;
    height: 50px;
    margin: 48px auto 0 auto;
  }

  @media screen and (min-width: 1400px) {
    font-size: 1.25rem;
    line-height: 1.25rem;
    width: 152px;
    height: 58px;
  }

  @media screen and (min-width: 2560px) {
    font-size: 1.5rem;
    line-height: 1.5rem;
    width: 164px;
    height: 66px;
  }
`;

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // we use this to set the state from an error message
    // details can be passed in if we choose in the future
    // the return value will set the state of this component
    return {
      hasError: true,
    };
  }

  // You can also log the error to an error reporting service
  // componentDidCatch(error, errorInfo) {
  //   logErrorToMyService(error, errorInfo);
  // }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? (
      // render the error screen
      <PlayerProvider>
        <PlayerMessageScreen
          bigText="Something went wrong"
          smallText="An unrecoverable error occured"
        >
          <RestartButton type="button" onClick={() => window.location.reload()}>
            Return home
          </RestartButton>
        </PlayerMessageScreen>
      </PlayerProvider>
    ) : (
      // everything is okay
      children
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};
