import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import HostSettingsMenu from './HostSettingsMenu';
import HostProvider from '../../contexts/HostContext/HostContext';

describe('HostSettingsMenu', () => {
  describe('rendering', () => {
    it('renders the settings heading', () => {
      render(
        <HostProvider>
          <HostSettingsMenu />
        </HostProvider>,
      );

      expect(screen.getByText('SETTINGS')).toBeInTheDocument();
    });

    it('renders the hide join code button', () => {
      render(
        <HostProvider>
          <HostSettingsMenu />
        </HostProvider>,
      );

      expect(
        screen.getByRole('button', { name: 'HIDE JOIN CODE' }),
      ).toBeInTheDocument();
    });

    it('renders the kick player button', () => {
      render(
        <HostProvider>
          <HostSettingsMenu />
        </HostProvider>,
      );

      expect(
        screen.getByRole('button', { name: 'KICK PLAYER' }),
      ).toBeInTheDocument();
    });

    it('renders the shuffle join code button', () => {
      render(
        <HostProvider>
          <HostSettingsMenu />
        </HostProvider>,
      );

      expect(
        screen.getByRole('button', { name: 'SHUFFLE JOIN CODE' }),
      ).toBeInTheDocument();
    });

    it('matches the expected snapshot', () => {
      const tree = renderer
        .create(
          <HostProvider>
            <HostSettingsMenu />
          </HostProvider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    // temporary test pending overhall in next sprint
    it('Closes the OptionList when a click is outside of OptionList', () => {
      render(
        <HostProvider>
          <HostSettingsMenu />
        </HostProvider>,
      );

      // open the option list and verify that it is open
      userEvent.click(screen.getByRole('button', { name: 'KICK PLAYER' }));
      expect(screen.getByText('KICK WHO?')).toBeInTheDocument();

      // click on the settings header and verify that the option list is now closed
      userEvent.click(screen.getByText('SETTINGS'));
      expect(screen.queryByText('KICK WHO?')).not.toBeInTheDocument();
    });

    // temporary test pending overhall in next sprint
    it('makes clicking another button not work when the option list is open', () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});

      render(
        <HostProvider>
          <HostSettingsMenu />
        </HostProvider>,
      );

      // click the skip button once and verify that it logs to the console
      userEvent.click(screen.getByRole('button', { name: 'HIDE JOIN CODE' }));
      expect(consoleSpy).toHaveBeenCalledTimes(1);

      // open the OptionList
      userEvent.click(screen.getByRole('button', { name: 'KICK PLAYER' }));
      expect(screen.getByText('KICK WHO?')).toBeInTheDocument();

      // click the skip button again and verify that it doesn't log to the console this time
      userEvent.click(screen.getByRole('button', { name: 'HIDE JOIN CODE' }));
      expect(consoleSpy).toHaveBeenCalledTimes(1);
    });
  });
});
