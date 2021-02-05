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

  it('displays activeHamburger when isActive is set to false and the button has been clicked', () => {
    render(<HamburgerMenu isActive={false} onClick={() => {}} onInactive={() => {}} />);

    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveStyle(`background-image: url(${activeHamburger})`);
  });

  it('displays inactiveHamburger when isActive is set to true and the button has been clicked', () => {
    render(<HamburgerMenu isActive onClick={() => {}} onInactive={() => {}} />);

    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveStyle(`background-image: url(${inactiveHamburger})`);
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

  it('does not call the onInactive callback when it has not been clicked', () => {
    const onInactive = jest.fn();

    render(<HamburgerMenu isActive={false} onClick={() => {}} onInactive={onInactive} />);

    expect(onInactive).not.toHaveBeenCalled();
  });

  it('does not call the onInactive callback when toggled to active', () => {
    const onInactive = jest.fn();

    render(<HamburgerMenu isActive={false} onClick={() => {}} onInactive={onInactive} />);

    userEvent.click(screen.getByRole('button'));
    expect(onInactive).not.toHaveBeenCalled();
  });

  it('calls the onInactive callback when toggled to inactive', () => {
    const onInactive = jest.fn();

    render(<HamburgerMenu isActive onClick={() => {}} onInactive={onInactive} />);

    userEvent.click(screen.getByRole('button'));
    expect(onInactive).toHaveBeenCalledTimes(1);
  });
});
