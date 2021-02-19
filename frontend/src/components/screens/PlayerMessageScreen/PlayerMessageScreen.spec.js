import React from 'react';
import { render, screen } from '@testing-library/react';
import PlayerMessageScreen from './PlayerMessageScreen';

describe('Player message screen', () => {
  describe('Rendering', () => {
    it('renders text from props', () => {
      render(
        <PlayerMessageScreen
          bigText="TEST BIG TEXT"
          smallText="Test small text"
        />,
      );
      expect(screen.getByText('TEST BIG TEXT')).toBeInTheDocument();
      expect(screen.getByText('Test small text')).toBeInTheDocument();
    });

    it('renders big text as all capital letters', () => {
      render(
        <PlayerMessageScreen
          bigText="this should be capital"
          smallText="sMaLl CaN hAvE AnY cAsE"
        />,
      );
      expect(screen.getByText('THIS SHOULD BE CAPITAL')).toBeInTheDocument();
      expect(screen.getByText('sMaLl CaN hAvE AnY cAsE')).toBeInTheDocument();
    });
  });

  describe('prop validation', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    afterAll(() => {
      spy.mockRestore();
    });

    it('warns twice no props', () => {
      render(<PlayerMessageScreen />);
      expect(spy).toHaveBeenCalledTimes(2);
    });
    // ideally we'd have three tests here, but there is a bug with propType warnings repeating:
    // https://github.com/facebook/react/issues/7047
  });
});
