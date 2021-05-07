import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import HostLayout from './HostLayout';
import { HostContext } from '../contexts/HostContext/HostContext';

describe('HostLayout', () => {
  let state;
  const leftComponent = <p>Im a left component</p>;
  const rightComponent = <p>Im a right component</p>;
  const modalComponent = <p>Im a modal component</p>;

  beforeEach(() => {
    state = {
      error: {
        hasError: false,
        message: {
          bigText: '',
          smallText: '',
          buttonText: '',
        },
        errorCallbackType: '',
      },
    };
  });

  // --------------------------------------------------------------------------
  // Rendering Tests
  it('renders the header text', () => {
    render(
      <HostContext.Provider value={{ state }}>
        <HostLayout
          left={leftComponent}
          right={rightComponent}
          modal={modalComponent}
        />
      </HostContext.Provider>,
    );

    expect(screen.getByText('CARDS OF CAROUSAL')).toBeInTheDocument();
  });

  it('renders the text present in the left component', () => {
    render(
      <HostContext.Provider value={{ state }}>
        <HostLayout
          left={leftComponent}
          right={rightComponent}
          modal={modalComponent}
        />
      </HostContext.Provider>,
    );

    expect(screen.getByText('Im a left component')).toBeInTheDocument();
  });

  it('renders the text present in the right component', () => {
    render(
      <HostContext.Provider value={{ state }}>
        <HostLayout
          left={leftComponent}
          right={rightComponent}
          modal={modalComponent}
        />
      </HostContext.Provider>,
    );

    expect(screen.getByText('Im a right component')).toBeInTheDocument();
  });

  it('renders the hamburger menu button', () => {
    render(
      <HostContext.Provider value={{ state }}>
        <HostLayout
          left={leftComponent}
          right={rightComponent}
          modal={modalComponent}
        />
      </HostContext.Provider>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not render the modal until the hamburger menu button is clicked', () => {
    render(
      <HostContext.Provider value={{ state }}>
        <HostLayout
          left={leftComponent}
          right={rightComponent}
          modal={modalComponent}
        />
      </HostContext.Provider>,
    );

    expect(screen.queryByText('Im a modal component')).not.toBeInTheDocument();
  });

  it('renders the modal component when the hamburger menu button is clicked', () => {
    document.body.innerHTML = `
    <div id="modal-root"></div>
  `;

    render(
      <HostContext.Provider value={{ state }}>
        <HostLayout
          left={leftComponent}
          right={rightComponent}
          modal={modalComponent}
        />
      </HostContext.Provider>,
    );

    userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Im a modal component')).toBeTruthy();
  });

  it('does not render the modal when the hamburger menu button is clicked a second time', () => {
    render(
      <HostContext.Provider value={{ state }}>
        <HostLayout
          left={leftComponent}
          right={rightComponent}
          modal={modalComponent}
        />
      </HostContext.Provider>,
    );

    userEvent.click(screen.getByRole('button'));
    userEvent.click(screen.getByRole('button'));

    expect(screen.queryByText('Im a modal component')).not.toBeInTheDocument();
  });

  // --------------------------------------------------------------------------
  // PropType Tests

  it('logs an error when attempting to render without the left component', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <HostContext.Provider value={{ state }}>
        <HostLayout right={rightComponent} modal={modalComponent} />
      </HostContext.Provider>,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error when attempting to render the left component as a non node', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <HostContext.Provider value={{ state }}>
        <HostLayout
          left={() => {}}
          right={rightComponent}
          modal={modalComponent}
        />
      </HostContext.Provider>,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error when attempting to render without the right component', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <HostContext.Provider value={{ state }}>
        <HostLayout left={leftComponent} modal={modalComponent} />
      </HostContext.Provider>,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error when attempting to render the right component as a non node', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <HostContext.Provider value={{ state }}>
        <HostLayout
          left={leftComponent}
          right={() => {}}
          modal={modalComponent}
        />
      </HostContext.Provider>,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error when attempting to render without the modal component', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <HostContext.Provider value={{ state }}>
        <HostLayout left={leftComponent} right={rightComponent} />
      </HostContext.Provider>,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error when attempting to render the modal component as a non node', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <HostContext.Provider value={{ state }}>
        <HostLayout
          left={leftComponent}
          right={rightComponent}
          modal={() => {}}
        />
      </HostContext.Provider>,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('does not log any error when all of the needed props are provided', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <HostContext.Provider value={{ state }}>
        <HostLayout
          left={leftComponent}
          right={rightComponent}
          modal={modalComponent}
        />
      </HostContext.Provider>,
    );

    expect(consoleSpy).not.toHaveBeenCalled();
  });

  // --------------------------------------------------------------------------
  // Snapshot Test

  it('matches the snapshot when rendered', () => {
    const tree = renderer
      .create(
        <HostContext.Provider value={{ state }}>
          <HostLayout
            left={leftComponent}
            right={rightComponent}
            modal={modalComponent}
          />
        </HostContext.Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
