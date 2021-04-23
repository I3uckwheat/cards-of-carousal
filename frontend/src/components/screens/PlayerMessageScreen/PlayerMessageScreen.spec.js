import React from 'react';
import { render, screen } from '@testing-library/react';
import PlayerMessageScreen from './PlayerMessageScreen';
import { PlayerContext } from '../../../contexts/PlayerContext/PlayerContext';

describe('Player message screen', () => {
  describe('Rendering', () => {
    it('renders text from props', () => {
      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerMessageScreen
            bigText="TEST BIG TEXT"
            smallText="Test small text"
          />
        </PlayerContext.Provider>,
      );

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.getByText('TEST BIG TEXT')).toBeInTheDocument();
      expect(screen.getByText('Test small text')).toBeInTheDocument();
    });

    it('renders big text as all capital letters', () => {
      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerMessageScreen
            bigText="this should be capital"
            smallText="sMaLl CaN hAvE AnY cAsE"
          />
        </PlayerContext.Provider>,
      );
      expect(screen.getByText('THIS SHOULD BE CAPITAL')).toBeInTheDocument();
      expect(screen.getByText('sMaLl CaN hAvE AnY cAsE')).toBeInTheDocument();
    });

    it('accepts children', () => {
      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerMessageScreen bigText="big text" smallText="small text">
            <p>test test test</p>
          </PlayerMessageScreen>
        </PlayerContext.Provider>,
      );
      expect(screen.getByText('test test test')).toBeInTheDocument();
    });

    it('displays a loading indicator when the loading array contains "joining-lobby"', () => {
      render(
        <PlayerContext.Provider
          value={{ state: { loading: ['joining-lobby'] } }}
        >
          <PlayerMessageScreen
            bigText="TEST BIG TEXT"
            smallText="Test small text"
          />
        </PlayerContext.Provider>,
      );
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('displays a loading indicator when the loading array contains "submitting-cards"', () => {
      render(
        <PlayerContext.Provider
          value={{ state: { loading: ['submitting-cards'] } }}
        >
          <PlayerMessageScreen
            bigText="TEST BIG TEXT"
            smallText="Test small text"
          />
        </PlayerContext.Provider>,
      );
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('does not display a loading indicator when the loading array does not contain the right strings', () => {
      render(
        <PlayerContext.Provider
          value={{ state: { loading: ['submitting-cars', 'test', 'aaaa'] } }}
        >
          <PlayerMessageScreen
            bigText="TEST BIG TEXT"
            smallText="Test small text"
          />
        </PlayerContext.Provider>,
      );
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });

  describe('prop validation', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    afterAll(() => {
      spy.mockRestore();
    });

    it('warns twice no props', () => {
      render(
        <PlayerContext.Provider value={{ state: { loading: [] } }}>
          <PlayerMessageScreen />
        </PlayerContext.Provider>,
      );
      expect(spy).toHaveBeenCalledTimes(2);
    });
    // ideally we'd have three tests here, but there is a bug with propType warnings repeating:
    // https://github.com/facebook/react/issues/7047
  });
});
