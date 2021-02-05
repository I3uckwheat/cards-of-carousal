import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import HamburgerMenu from './HamburgerMenu';

import inactiveHamburger from './inactiveHamburger.svg';
import activeHamburger from './activeHamburger.svg';

describe('HamburgerMenu', () => {
  it('displays inactiveHamburger when isActive is set to false', () => {
    render(<HamburgerMenu isActive={false} onClick={() => {}} onInactive={() => {}} />);

    expect(screen.getByRole('button')).toHaveStyle(`background-image: url(${inactiveHamburger})`);
  });

  it('displays activeHamburger when isActive is set to true', () => {
    render(<HamburgerMenu isActive onClick={() => {}} onInactive={() => {}} />);

    expect(screen.getByRole('button')).toHaveStyle(`background-image: url(${activeHamburger})`);
  });

  it('does not call the onClick callback when it has not been clicked', () => {
    const onClick = jest.fn();

    render(<HamburgerMenu isActive={false} onClick={onClick} onInactive={() => {}} />);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('calls the onClick callback when clicked', () => {
    const onClick = jest.fn();

    render(<HamburgerMenu isActive={false} onClick={onClick} onInactive={() => {}} />);

    userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls the onClick callback twice when clicked twice', () => {
    const onClick = jest.fn();

    render(<HamburgerMenu isActive={false} onClick={onClick} onInactive={() => {}} />);

    userEvent.click(screen.getByRole('button'));
    userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
