import React, { useState } from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import OptionList from './OptionList';

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

  .settings-button {
    color: var(--primary-text-color);
    background-color: transparent;
    border: none;
    padding: 30px 0 20px 25px;

    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

function HostSettingsMenu() {
  const [accordionIsActive, setAccordionIsActive] = useState(false);

  // playerList temporarily hard coded until the contexts are in place
  const playerList = ['BENDER', 'BRIGGS', 'BRANDON', 'BRENDA', 'BACON'];

  // placeholder function
  function kickPlayer(player) {
    // eslint-disable-next-line
    console.log(`Kick ${player}`);
  }

  return (
    <SettingsMenu>
      <Header className="host-settings-header">
        <h3>SETTINGS</h3>
      </Header>

      {/* temporary placeholder button for OptionButton */}
      <button type="button" className="settings-button">
        SKIP UNUSED SELECTIONS
      </button>

      <OptionList
        listContent={playerList}
        isActive={accordionIsActive}
        isActiveCallback={() => setAccordionIsActive(!accordionIsActive)}
        onListItemClick={kickPlayer}
        activeText="KICK WHO?"
        inactiveText="KICK PLAYER"
      />
    </SettingsMenu>
  );
}

export default HostSettingsMenu;
