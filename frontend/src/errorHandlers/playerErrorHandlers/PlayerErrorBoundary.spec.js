import React from 'react';
import { render, screen } from '@testing-library/react';
import PlayerErrorBoundary from './PlayerErrorBoundary';

jest.mock('../../screens/PlayerErrorScreen/PlayerErrorScreen.js', () => ({
  __esModule: true,
  default: () => <div data-testid="player-error-screen">Error Screen</div>,
}));

describe('error boundary', () => {
  let spy;

  // we need to mock the console.error or else jest will error out
  // https://github.com/facebook/react/issues/11098#issuecomment-523977830
  beforeEach(() => {
    spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('renders the error screen if an error is thrown in a child component', async () => {
    const TestComponent = () => {
      throw new Error('test');
    };

    render(
      <PlayerErrorBoundary>
        <TestComponent />
      </PlayerErrorBoundary>,
    );

    expect(screen.getByTestId('player-error-screen')).toBeInTheDocument();
  });

  it('renders children if an error is not thrown', async () => {
    const TestComponent = () => <div data-testid="child">Child component</div>;

    render(
      <PlayerErrorBoundary>
        <TestComponent />
      </PlayerErrorBoundary>,
    );

    expect(screen.queryByTestId('player-error-screen')).toBeNull();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('does not render children if an error is thrown in a child component', async () => {
    const TestComponent = () => {
      throw new Error('test');
    };

    render(
      <PlayerErrorBoundary>
        <TestComponent />
        <div data-test-id="do-not-render">I am not here!</div>
      </PlayerErrorBoundary>,
    );

    expect(screen.queryByTestId('do-not-render')).toBeNull();
  });
});
