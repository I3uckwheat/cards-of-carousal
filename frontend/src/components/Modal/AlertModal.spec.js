import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AlertModal from './AlertModal';

// Need to mock the Modal or createPortal errors are thrown: [Error: Target container is not a DOM element.]
// eslint-disable-next-line react/prop-types
jest.mock('../../components/Modal/Modal', () => ({ children }) => (
  <div>{children}</div>
));

describe('Alert Modal', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<AlertModal />);

      expect(screen.getByText('SOMETHING WENT WRONG')).toBeInTheDocument();
      expect(
        screen.getByText('An unrecoverable error occurred'),
      ).toBeInTheDocument();
      expect(screen.getByText('Click anywhere to restart')).toBeInTheDocument();
    });
  });

  describe('props', () => {
    it('renders bigText passed in as all upper case', () => {
      render(<AlertModal bigText="some big text" />);

      expect(screen.getByText('SOME BIG TEXT')).toBeInTheDocument();
    });

    it('renders smallText passed in as written', () => {
      render(<AlertModal smallText="Some small text" />);

      expect(screen.getByText('Some small text')).toBeInTheDocument();
    });

    it('renders buttonText passed in as written', () => {
      render(<AlertModal buttonText="Some button text" />);

      expect(screen.getByText('Some button text')).toBeInTheDocument();
    });
  });

  describe('onClick', () => {
    it('reloads when the modal is clicked anywhere and on onClick is not passed in', () => {
      const { reload } = window.location;

      // window.location properties are read-only, we have to redefine this object to spy on reload
      Object.defineProperty(window, 'location', {
        writable: true,
        value: { ...window.location, reload: jest.fn() },
      });

      render(
        <AlertModal
          bigText="BIG TEXT"
          smallText="small text"
          buttonText="button text"
        />,
      );

      userEvent.click(screen.getByText('BIG TEXT'));
      userEvent.click(screen.getByText('small text'));
      userEvent.click(screen.getByText('button text'));

      expect(window.location.reload).toHaveBeenCalledTimes(3);

      window.location.reload = reload;
    });

    it('calls the onClick that is passed in and the user clicks anywhere', () => {
      const handleClick = jest.fn();

      render(
        <AlertModal
          bigText="BIG TEXT"
          smallText="small text"
          buttonText="button text"
          onClick={handleClick}
        />,
      );

      userEvent.click(screen.getByText('BIG TEXT'));
      userEvent.click(screen.getByText('small text'));
      userEvent.click(screen.getByText('button text'));

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('does not reload when a custom onClick function is passed in', () => {
      const { reload } = window.location;
      const handleClick = jest.fn();

      // window.location properties are read-only, we have to redefine this object to spy on reload
      Object.defineProperty(window, 'location', {
        writable: true,
        value: { ...window.location, reload: jest.fn() },
      });

      render(
        <AlertModal
          bigText="BIG TEXT"
          smallText="small text"
          buttonText="button text"
          onClick={handleClick}
        />,
      );

      userEvent.click(screen.getByText('BIG TEXT'));
      userEvent.click(screen.getByText('small text'));
      userEvent.click(screen.getByText('button text'));

      expect(window.location.reload).not.toHaveBeenCalled();

      window.location.reload = reload;
    });
  });
});
