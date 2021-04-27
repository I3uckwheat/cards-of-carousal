import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerErrorScreen from '../../screens/PlayerErrorScreen/PlayerErrorScreen';
import { PlayerProvider } from '../../contexts/PlayerContext/PlayerContext';

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
        <PlayerErrorScreen />
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
