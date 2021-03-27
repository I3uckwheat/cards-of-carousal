import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import PlayerKicker from './PlayerKicker';
import HostProvider from '../../../contexts/HostContext/HostContext';

describe('PlayerKicker', () => {
  describe('rendering', () => {
    it('renders a button with the expected text when enabled', () => {
      render(
        <HostProvider>
          <PlayerKicker
            accordionState="enabled"
            onClickActions={{
              open: () => {},
              enabled: () => {},
              disabled: () => {},
            }}
          />
        </HostProvider>,
      );

      expect(
        screen.getByRole('button', { name: 'KICK PLAYER' }),
      ).toBeInTheDocument();
    });
  });

  describe('functionality', () => {});

  describe('propTypes', () => {
    it('logs an error when attempting to render without the accordionState Prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostProvider>
          <PlayerKicker
            onClickActions={{
              open: () => {},
              enabled: () => {},
              disabled: () => {},
            }}
          />
        </HostProvider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the accordionState Prop as a non string', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostProvider>
          <PlayerKicker
            accordionState
            onClickActions={{
              open: () => {},
              enabled: () => {},
              disabled: () => {},
            }}
          />
        </HostProvider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render without the onClickActions Prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(
          <HostProvider>
            <PlayerKicker accordionState="open" />
          </HostProvider>,
        );
      }).toThrow();

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onClickActions Prop without the open key', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostProvider>
          <PlayerKicker
            accordionState
            onClickActions={{
              enabled: () => {},
              disabled: () => {},
            }}
          />
        </HostProvider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onClickActions Prop without the enabled key', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostProvider>
          <PlayerKicker
            accordionState
            onClickActions={{
              open: () => {},
              disabled: () => {},
            }}
          />
        </HostProvider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when attempting to render the onClickActions Prop without the disabled key', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostProvider>
          <PlayerKicker
            accordionState
            onClickActions={{
              open: () => {},
              enabled: () => {},
            }}
          />
        </HostProvider>,
      );

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('does not log an error when all required props are given correctly', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostProvider>
          <PlayerKicker
            accordionState="enabled"
            onClickActions={{
              open: () => {},
              enabled: () => {},
              disabled: () => {},
            }}
          />
        </HostProvider>,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
