import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import HostSettingsMenu from './HostSettingsMenu';
import HostProvider from '../../contexts/HostContext/HostContext';
import OptionList from './SettingsSubComponents/OptionList';
import OptionButton from './SettingsSubComponents/OptionButton';

/* eslint-disable react/prop-types */

describe('HostSettingsMenu', () => {
  describe('rendering', () => {
    it('renders the settings heading', () => {
      render(
        <HostProvider>
          <HostSettingsMenu settingsComponentList={[]} />
        </HostProvider>,
      );

      expect(screen.getByText('SETTINGS')).toBeInTheDocument();
    });

    it('matches the expected snapshot', () => {
      const tree = renderer
        .create(
          <HostProvider>
            <HostSettingsMenu settingsComponentList={[]} />
          </HostProvider>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    // temporary test pending overhall in next sprint
    xit('Closes the OptionList when a click is outside of OptionList', () => {
      const kickPlayerMock = jest.fn();

      function PlayerKicker({ accordionState, onClickActions }) {
        return (
          <OptionList
            listContent={['foo', 'bar']}
            state={accordionState}
            onClick={onClickActions[accordionState]}
            onItemClick={kickPlayerMock}
            openText="OPEN TEXT"
            closedText="CLOSED TEXT"
          />
        );
      }

      render(
        <HostProvider>
          <HostSettingsMenu settingsComponentList={[PlayerKicker]} />
        </HostProvider>,
      );

      // open the option list and verify that it is open
      userEvent.click(screen.getByRole('button', { name: 'CLOSED TEXT' }));
      expect(screen.getByText('OPEN TEXT')).toBeInTheDocument();

      // click on the settings header and verify that the option list is now closed
      userEvent.click(screen.getByText('SETTINGS'));
      expect(screen.queryByText('OPEN TEXT')).not.toBeInTheDocument();
    });

    // temporary test pending overhall in next sprint
    xit('makes clicking another button not work when an option list is open', () => {
      const kickPlayerMock = jest.fn();

      function PlayerKicker({ accordionState, onClickActions }) {
        return (
          <OptionList
            listContent={['foo', 'bar']}
            state={accordionState}
            onClick={onClickActions[accordionState]}
            onItemClick={kickPlayerMock}
            openText="OPEN TEXT"
            closedText="CLOSED TEXT"
          />
        );
      }

      const shuffleJoinCodeMock = jest.fn();

      function JoinCodeShuffler({ isEnabled, onDisabledClick }) {
        return (
          <OptionButton
            isEnabled={isEnabled}
            onEnabledClick={shuffleJoinCodeMock}
            onDisabledClick={onDisabledClick}
          >
            TEST BUTTON
          </OptionButton>
        );
      }

      render(
        <HostProvider>
          <HostSettingsMenu
            settingsComponentList={[PlayerKicker, JoinCodeShuffler]}
          />
        </HostProvider>,
      );

      // click the skip button once and verify that its function fires
      userEvent.click(screen.getByRole('button', { name: 'TEST BUTTON' }));
      expect(shuffleJoinCodeMock).toHaveBeenCalledTimes(1);

      // open the OptionList
      userEvent.click(screen.getByRole('button', { name: 'CLOSED TEXT' }));
      expect(screen.getByText('OPEN TEXT')).toBeInTheDocument();

      // click the skip button again and verify that its function doesn't fire
      userEvent.click(screen.getByRole('button', { name: 'TEST BUTTON' }));
      expect(shuffleJoinCodeMock).toHaveBeenCalledTimes(1);
    });
  });
});
