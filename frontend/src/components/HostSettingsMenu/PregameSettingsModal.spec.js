import React from 'react';
import { render, screen } from '@testing-library/react';

import PregameSettingsModal from './PregameSettingsModal';

/* eslint-disable react/prop-types */

jest.mock('./HostSettingsMenu', () => ({ settingsComponentList }) => (
  <div>
    {settingsComponentList.map(({ type, component }) => (
      <p key={component.name}>
        component: {component.name}, type: {type}
      </p>
    ))}
  </div>
));

describe('PregameSettingsModal', () => {
  it('passes the JoinCodeHider in settingsComponentList as a button', () => {
    render(<PregameSettingsModal />);

    expect(
      screen.getByText('component: JoinCodeHider, type: button'),
    ).toBeInTheDocument();
  });

  it('passes the PlayerKicker in settingsComponentList as an accordion', () => {
    render(<PregameSettingsModal />);

    expect(
      screen.getByText('component: PlayerKicker, type: accordion'),
    ).toBeInTheDocument();
  });

  it('passes the JoinCodeShuffler in settingsComponentList as a button', () => {
    render(<PregameSettingsModal />);

    expect(
      screen.getByText('component: JoinCodeShuffler, type: button'),
    ).toBeInTheDocument();
  });

  it('passes the ToggleFullscreen in settingsComponentList as a button', () => {
    render(<PregameSettingsModal />);

    expect(
      screen.getByText('component: ToggleFullscreen, type: button'),
    ).toBeInTheDocument();
  });
});
