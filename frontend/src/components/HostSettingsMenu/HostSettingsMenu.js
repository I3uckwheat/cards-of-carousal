import React from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';

const SettingsMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 30%;
  background-color: var(--primary-background-color);
  display: flex;
  flex-direction: column;

  .host-settings-header {
    display: flex;
    align-items: flex-end;
    height: 130px;
  }

  .host-settings-header h3 {
    font-size: 3.5rem;
    line-height: 2.1rem;
    color: var(--secondary-text-color);
  }

  .settings-item {
    color: var(--primary-text-color);
    background-color: transparent;
    border: none;

    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .option-button {
    padding: 30px 0 20px 25px;
  }

  .option-list {
    padding: 20px 25px;
  }
`;

export default function HostSettingsMenu() {
  return (
    <SettingsMenu>
      <Header className="host-settings-header">
        <h3>SETTINGS</h3>
      </Header>
      <button type="button" className="settings-item option-button">
        SKIP UNUSED SELECTIONS
      </button>
      <button type="button" className="settings-item option-list">
        KICK PLAYER
      </button>
    </SettingsMenu>
  );
}
