import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Modal from './Modal';

afterEach(cleanup);

describe('Modal', () => {
  const handleClick = jest.fn();
  const handleChildClick = jest.fn();
  const consoleSpy = jest.spyOn(console, 'error');

  document.body.innerHTML = `
    <div id="modal-root"></div>
  `;

  // ----------------------------------------------------------------------------
  // rendering
  describe('rendering', () => {
    it('renders a child', () => {
      const { getByText } = render(
        <Modal onClickOutside={handleClick}>
          <div>hello</div>
        </Modal>,
      );
      expect(getByText('hello')).toBeTruthy();
    });

    it('renders multiple children', () => {
      const { getByText } = render(
        <Modal onClickOutside={handleClick}>
          <div>hello</div>
          <div>world</div>
        </Modal>,
      );
      expect(getByText('hello')).toBeTruthy();
      expect(getByText('world')).toBeTruthy();
    });

    it("does NOT render when children haven't been passed", () => {
      render(<Modal onClickOutside={handleClick} />);
      expect(consoleSpy).toHaveBeenCalled();
    });

    it("does NOT render when onOutsideClick prop hasn't been passed", () => {
      render(
        <Modal>
          <div>test</div>
        </Modal>,
      );
      expect(consoleSpy).toHaveBeenCalled();
    });
  });
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // events
  describe('events', () => {
    it('clicking the overlay triggers the callback', () => {
      render(
        <Modal onClickOutside={handleClick}>
          <div />
        </Modal>,
      );

      userEvent.click(screen.getByTestId('overlay'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('clicking the overlay does NOT trigger click events on children', () => {
      render(
        <Modal onClickOutside={handleClick}>
          <div onClick={handleChildClick} type="button" aria-hidden="true" />
        </Modal>,
      );

      userEvent.click(screen.getByTestId('overlay'));
      expect(handleChildClick).not.toHaveBeenCalled();
    });

    it('clicking children does NOT trigger the overlay callback', () => {
      render(
        <Modal onClickOutside={handleClick}>
          <div
            type="button"
            onClick={handleChildClick}
            data-testid="modal-child"
            aria-hidden="true"
          />
        </Modal>,
      );

      userEvent.click(screen.getByTestId('modal-child'));
      expect(handleChildClick).toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // snapshot
  describe('snapshot', () => {
    // mock createPortal for snapshot
    beforeEach(() => {
      ReactDOM.createPortal = jest.fn((element) => element);
    });

    it('matches', () => {
      const tree = renderer
        .create(
          <Modal onClickOutside={handleClick}>
            <div>
              <h1>hello world</h1>
              <button type="button">click me</button>
            </div>
          </Modal>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
  // ----------------------------------------------------------------------------
});
