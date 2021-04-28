import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AlertModal from './AlertModal';

describe('Alert Modal', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<AlertModal />);

      expect(screen.getByText('SOMETHING WENT WRONG')).toBeInTheDocument();
      expect(
        screen.getByText('An unrecoverable error occured'),
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

  describe('reloading', () => {
    // let windowSpy;

    // beforeEach(() => {
    //   windowSpy = jest.spyOn(window, 'location').mockImplementation(() => ({
    //     reload: jest.fn(),
    //   }));
    // });

    // afterEach(() => {
    //   windowSpy.mockRestore();
    // });

    it('reloads when the modal is clicked anywhere', () => {
      // window.location properties are read-only, we have to redefine this object to spy on reload
      Object.defineProperty(window, 'location', {
        value: { reload: jest.fn() },
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
    });
  });
});
