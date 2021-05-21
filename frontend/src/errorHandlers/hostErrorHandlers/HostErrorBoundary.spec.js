import React from 'react';
import { render, screen } from '@testing-library/react';
import HostErrorBoundary from './HostErrorBoundary';

jest.mock('../../components/Modal/AlertModal.js', () => ({
  __esModule: true,
  default: () => <div data-testid="alert-modal">Error Modal</div>,
}));

jest.mock('../../components/Modal/Modal.js', () => ({
  __esModule: true,
  // eslint-disable-next-line react/prop-types
  default: ({ children }) => <div data-testid="modal">{children}</div>,
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
      <HostErrorBoundary>
        <TestComponent />
      </HostErrorBoundary>,
    );

    expect(screen.getByTestId('alert-modal')).toBeInTheDocument();
  });

  it('renders children if an error is not thrown', async () => {
    const TestComponent = () => <div data-testid="child">Child component</div>;

    render(
      <HostErrorBoundary>
        <TestComponent />
      </HostErrorBoundary>,
    );

    expect(screen.queryByTestId('alert-modal')).toBeNull();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('does not render children if an error is thrown in a child component', async () => {
    const TestComponent = () => {
      throw new Error('test');
    };

    render(
      <HostErrorBoundary>
        <TestComponent />
        <div data-test-id="do-not-render">I am not here!</div>
      </HostErrorBoundary>,
    );

    expect(screen.queryByTestId('do-not-render')).toBeNull();
  });
});
