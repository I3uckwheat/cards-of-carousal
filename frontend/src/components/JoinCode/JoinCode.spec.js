import React from 'react';
import { render, screen } from '@testing-library/react';
import DisplayJoinCode from './JoinCode';
import { HostContext } from '../../contexts/HostContext/HostContext';

describe('joinCode', () => {
  describe('rendering', () => {
    it('renders loading indicator when "code" is an empty string', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <DisplayJoinCode code="" />
        </HostContext.Provider>,
      );
      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.getByTestId('join-code')).toBeInTheDocument();
    });

    it('renders properly', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <DisplayJoinCode code="XYA3Z" />
        </HostContext.Provider>,
      );

      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.getByText('XYA3Z')).toBeInTheDocument();
    });

    it('displays a loading indicator when loading is true', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <DisplayJoinCode loading code="XYA3Z" />
        </HostContext.Provider>,
      );
      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.queryByText('XYA3Z')).not.toBeInTheDocument();
    });

    it('shows the join code when the hideJoinCode setting is false', () => {
      const state = {
        gameSettings: {
          hideJoinCode: false,
        },
      };

      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <DisplayJoinCode code="XYA3Z" />
        </HostContext.Provider>,
      );

      expect(screen.queryByText('XYA3Z')).toBeInTheDocument();
    });

    it('hides the join code when the hideJoinCode setting is true', () => {
      const state = {
        gameSettings: {
          hideJoinCode: true,
        },
      };

      const dispatch = jest.fn();

      render(
        <HostContext.Provider value={{ state, dispatch }}>
          <DisplayJoinCode code="XYA3Z" />
        </HostContext.Provider>,
      );

      expect(screen.queryByText('XYA3Z')).not.toBeInTheDocument();
    });
  });
});
