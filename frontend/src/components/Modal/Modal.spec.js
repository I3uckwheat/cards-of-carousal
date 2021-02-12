import React from 'react';
import { render } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  it.skip('renders children', () => {
    const handleClose = jest.fn();

    const { getByText } = render(
      <Modal onClickOutside={handleClose}>
        <div>test</div>
      </Modal>,
      { container: document.body },
    );

    expect(getByText('test')).toBeTruthy();
  });
});
