import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import HostLayout from './HostLayout';

describe('HostLayout', () => {
  const leftComponent = <p>Im a left component</p>;
  const rightComponent = <p>Im a right component</p>;
  const modalComponent = <p>Im a modal component</p>;
  // --------------------------------------------------------------------------
  // Rendering Tests
  it('renders the header text', () => {
    render(
      <HostLayout
        left={leftComponent}
        right={rightComponent}
        modal={modalComponent}
      />,
    );

    expect(screen.getByText('CARDS OF CAROUSAL')).toBeInTheDocument();
  });

  it('renders the text present in the left component', () => {
    render(
      <HostLayout
        left={leftComponent}
        right={rightComponent}
        modal={modalComponent}
      />,
    );

    expect(screen.getByText('Im a left component')).toBeInTheDocument();
  });

  it('renders the text present in the right component', () => {
    render(
      <HostLayout
        left={leftComponent}
        right={rightComponent}
        modal={modalComponent}
      />,
    );

    expect(screen.getByText('Im a right component')).toBeInTheDocument();
  });

  it('renders the hamburger menu button', () => {
    render(
      <HostLayout
        left={leftComponent}
        right={rightComponent}
        modal={modalComponent}
      />,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not render the modal until the hamburger menu button is clicked', () => {
    render(
      <HostLayout
        left={leftComponent}
        right={rightComponent}
        modal={modalComponent}
      />,
    );

    expect(screen.queryByText('Im a modal component')).not.toBeInTheDocument();
  });

  it('renders the modal component when the hamburger menu button is clicked', () => {
    document.body.innerHTML = `
    <div id="modal-root"></div>
  `;

    render(
      <HostLayout
        left={leftComponent}
        right={rightComponent}
        modal={modalComponent}
      />,
    );

    userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Im a modal component')).toBeTruthy();
  });

  it('does not render the modal when the hamburger menu button is clicked a second time', () => {
    render(
      <HostLayout
        left={leftComponent}
        right={rightComponent}
        modal={modalComponent}
      />,
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

    render(<HostLayout right={rightComponent} modal={modalComponent} />);

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error when attempting to render the left component as a non node', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <HostLayout
        left={() => {}}
        right={rightComponent}
        modal={modalComponent}
      />,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error when attempting to render without the right component', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<HostLayout left={leftComponent} modal={modalComponent} />);

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error when attempting to render the right component as a non node', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <HostLayout
        left={leftComponent}
        right={() => {}}
        modal={modalComponent}
      />,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error when attempting to render without the modal component', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<HostLayout left={leftComponent} right={rightComponent} />);

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('logs an error when attempting to render the modal component as a non node', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <HostLayout
        left={leftComponent}
        right={rightComponent}
        modal={() => {}}
      />,
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('does not log any error when all of the needed props are provided', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <HostLayout
        left={leftComponent}
        right={rightComponent}
        modal={modalComponent}
      />,
    );

    expect(consoleSpy).not.toHaveBeenCalled();
  });
});
