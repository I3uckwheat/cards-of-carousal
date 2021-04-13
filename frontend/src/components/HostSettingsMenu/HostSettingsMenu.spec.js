import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import HostSettingsMenu from './HostSettingsMenu';
import HostProvider from '../../contexts/HostContext/HostContext';

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

    it('renders settings sub-components of type: accordion', () => {
      function testComponent() {
        return <p>TEST TEXT</p>;
      }

      render(
        <HostProvider>
          <HostSettingsMenu
            settingsComponentList={[
              { type: 'accordion', component: testComponent },
            ]}
          />
        </HostProvider>,
      );

      expect(screen.getByText('TEST TEXT')).toBeInTheDocument();
    });

    it('renders settings sub-components of type: button', () => {
      function testComponent() {
        return <p>TEST TEXT</p>;
      }

      render(
        <HostProvider>
          <HostSettingsMenu
            settingsComponentList={[
              { type: 'button', component: testComponent },
            ]}
          />
        </HostProvider>,
      );

      expect(screen.getByText('TEST TEXT')).toBeInTheDocument();
    });

    it("throws an error and does not render when a sub-component type isn't expected", () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      function ComponentNotDefinedInTheSwitch() {
        return <p>I SHOULD NOT SHOW UP</p>;
      }

      expect(() => {
        render(
          <HostProvider>
            <HostSettingsMenu
              settingsComponentList={[
                { type: 'foo', component: ComponentNotDefinedInTheSwitch },
              ]}
            />
          </HostProvider>,
        );
      }).toThrow();

      expect(consoleSpy).toHaveBeenCalled();

      expect(
        screen.queryByText('I SHOULD NOT SHOW UP'),
      ).not.toBeInTheDocument();
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
    it('closes a given accordion component when a click occurs outside of that accordion', () => {
      function accordionComponent({ accordionState, onClickActions }) {
        return (
          <button type="button" onClick={onClickActions[accordionState]}>
            {accordionState === 'open' ? 'OPEN TEXT' : 'CLOSED TEXT'}
          </button>
        );
      }

      render(
        <HostProvider>
          <HostSettingsMenu
            settingsComponentList={[
              { type: 'accordion', component: accordionComponent },
            ]}
          />
        </HostProvider>,
      );

      // open the option list and verify that it is open
      userEvent.click(screen.getByRole('button', { name: 'CLOSED TEXT' }));
      expect(screen.getByText('OPEN TEXT')).toBeInTheDocument();

      // click on the settings header and verify that the option list is now closed
      userEvent.click(screen.getByText('SETTINGS'));
      expect(screen.queryByText('OPEN TEXT')).not.toBeInTheDocument();
    });

    it('disables all settings buttons when an accordion is open', () => {
      function accordionComponent({ accordionState, onClickActions }) {
        return (
          <button type="button" onClick={onClickActions[accordionState]}>
            {accordionState === 'open' ? 'OPEN TEXT' : 'CLOSED TEXT'}
          </button>
        );
      }

      const enabledButtonClick = jest.fn();

      function buttonComponent({ isEnabled, onDisabledClick }) {
        return (
          <button
            type="button"
            isEnabled
            onClick={isEnabled ? enabledButtonClick : onDisabledClick}
          >
            TEST BUTTON
          </button>
        );
      }

      render(
        <HostProvider>
          <HostSettingsMenu
            settingsComponentList={[
              { type: 'accordion', component: accordionComponent },
              { type: 'button', component: buttonComponent },
            ]}
          />
        </HostProvider>,
      );

      // click the test button once and verify that its function fires
      userEvent.click(screen.getByRole('button', { name: 'TEST BUTTON' }));
      expect(enabledButtonClick).toHaveBeenCalledTimes(1);

      // open the accordion
      userEvent.click(screen.getByRole('button', { name: 'CLOSED TEXT' }));
      expect(screen.getByText('OPEN TEXT')).toBeInTheDocument();

      // click the test button again and verify that its function doesn't fire
      userEvent.click(screen.getByRole('button', { name: 'TEST BUTTON' }));
      expect(enabledButtonClick).toHaveBeenCalledTimes(1);
    });

    it('closes an open accordion when a settings button is clicked', () => {
      function accordionComponent({ accordionState, onClickActions }) {
        return (
          <button type="button" onClick={onClickActions[accordionState]}>
            {accordionState === 'open' ? 'OPEN TEXT' : 'CLOSED TEXT'}
          </button>
        );
      }

      const enabledButtonClick = jest.fn();

      function buttonComponent({ isEnabled, onDisabledClick }) {
        return (
          <button
            type="button"
            isEnabled
            onClick={isEnabled ? enabledButtonClick : onDisabledClick}
          >
            TEST BUTTON
          </button>
        );
      }

      render(
        <HostProvider>
          <HostSettingsMenu
            settingsComponentList={[
              { type: 'accordion', component: accordionComponent },
              { type: 'button', component: buttonComponent },
            ]}
          />
        </HostProvider>,
      );

      // open the accordion
      userEvent.click(screen.getByRole('button', { name: 'CLOSED TEXT' }));
      expect(screen.getByText('OPEN TEXT')).toBeInTheDocument();

      // click the test button and verify that the accordion is closed
      userEvent.click(screen.getByRole('button', { name: 'TEST BUTTON' }));
      expect(screen.queryByText('OPEN TEXT')).not.toBeInTheDocument();
    });

    it('disables all other settings accordions when an accordion is open', () => {
      function accordionComponent({ accordionState, onClickActions }) {
        return (
          <button type="button" onClick={onClickActions[accordionState]}>
            {accordionState === 'open' ? 'OPEN TEXT 1' : 'CLOSED TEXT 1'}
          </button>
        );
      }

      function secondAccordionComponent({ accordionState, onClickActions }) {
        return (
          <button type="button" onClick={onClickActions[accordionState]}>
            {accordionState === 'open' ? 'OPEN TEXT 2' : 'CLOSED TEXT 2'}
          </button>
        );
      }

      render(
        <HostProvider>
          <HostSettingsMenu
            settingsComponentList={[
              { type: 'accordion', component: accordionComponent },
              { type: 'accordion', component: secondAccordionComponent },
            ]}
          />
        </HostProvider>,
      );

      // open the first accordion
      userEvent.click(screen.getByRole('button', { name: 'CLOSED TEXT 1' }));
      expect(screen.getByText('OPEN TEXT 1')).toBeInTheDocument();

      // click the second accordion and verify that it doesn't open
      userEvent.click(screen.getByRole('button', { name: 'CLOSED TEXT 2' }));
      expect(screen.queryByText('OPEN TEXT 2')).not.toBeInTheDocument();
    });

    it('closes an open accordion when another accordion is clicked', () => {
      function accordionComponent({ accordionState, onClickActions }) {
        return (
          <button type="button" onClick={onClickActions[accordionState]}>
            {accordionState === 'open' ? 'OPEN TEXT 1' : 'CLOSED TEXT 1'}
          </button>
        );
      }

      function secondAccordionComponent({ accordionState, onClickActions }) {
        return (
          <button type="button" onClick={onClickActions[accordionState]}>
            {accordionState === 'open' ? 'OPEN TEXT 2' : 'CLOSED TEXT 2'}
          </button>
        );
      }

      render(
        <HostProvider>
          <HostSettingsMenu
            settingsComponentList={[
              { type: 'accordion', component: accordionComponent },
              { type: 'accordion', component: secondAccordionComponent },
            ]}
          />
        </HostProvider>,
      );

      // open the first accordion
      userEvent.click(screen.getByRole('button', { name: 'CLOSED TEXT 1' }));
      expect(screen.getByText('OPEN TEXT 1')).toBeInTheDocument();

      // click the second accordion and verify that the first accordion closes
      userEvent.click(screen.getByRole('button', { name: 'CLOSED TEXT 2' }));
      expect(screen.queryByText('OPEN TEXT 1')).not.toBeInTheDocument();
    });
  });

  describe('propTypes', () => {
    it('logs an error when not given the settingsComponentList prop', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(
          <HostProvider>
            <HostSettingsMenu />
          </HostProvider>,
        );
      }).toThrow();

      expect(consoleSpy).toHaveBeenCalled();
    });

    it("logs an error when given a settingsComponentList prop that isn't an array", () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(
          <HostProvider>
            <HostSettingsMenu settingsComponentList={false} />
          </HostProvider>,
        );
      }).toThrow();

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when given a settingsComponentList prop that contains a non-object in the array', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(
          <HostProvider>
            <HostSettingsMenu settingsComponentList={[false]} />
          </HostProvider>,
        );
      }).toThrow();

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when given a settingsComponentList prop that contains an object without a type in the array', () => {
      function ComponentNotDefinedInTheSwitch() {
        return <p>I SHOULD NOT SHOW UP</p>;
      }

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(
          <HostProvider>
            <HostSettingsMenu
              settingsComponentList={[
                { component: ComponentNotDefinedInTheSwitch },
              ]}
            />
          </HostProvider>,
        );
      }).toThrow();

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('logs an error when given a settingsComponentList prop that contains an object without a component in the array', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        render(
          <HostProvider>
            <HostSettingsMenu settingsComponentList={[{ type: 'button' }]} />
          </HostProvider>,
        );
      }).toThrow();

      expect(consoleSpy).toHaveBeenCalled();
    });

    it('does not log an error when given a settingsComponentList prop that contains only objects with type and component in the array', () => {
      function ComponentNotDefinedInTheSwitch() {
        return <p>I SHOULD NOT SHOW UP</p>;
      }

      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <HostProvider>
          <HostSettingsMenu
            settingsComponentList={[
              { type: 'button', component: ComponentNotDefinedInTheSwitch },
            ]}
          />
        </HostProvider>,
      );

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
