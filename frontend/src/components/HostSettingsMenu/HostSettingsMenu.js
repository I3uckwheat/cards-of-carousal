import React, { useState } from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import OptionList from './OptionList';
import OptionButton from './OptionButton';

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
`;

function HostSettingsMenu() {
  const [accordionIsActive, setAccordionIsActive] = useState(false);

  // playerList temporarily hard coded until the contexts are in place
  const playerList = ['BENDER', 'BRIGGS', 'BRANDON', 'BRENDA', 'BACON'];

  // placeholder function
  function skipUnusedSelections() {
    // eslint-disable-next-line
    console.log('skipping unused selections');
  }

  // placeholder function
  function kickPlayer(event, player) {
    // eslint-disable-next-line
    console.log(`Kick ${player}`);
    event.stopPropagation();
  }

  function toggleAccordion(event) {
    setAccordionIsActive(!accordionIsActive);
    event.stopPropagation();
  }

  return (
    <SettingsMenu onClick={() => setAccordionIsActive(false)}>
      <Header className="host-settings-header">
        <h3>SETTINGS</h3>
      </Header>

      <OptionButton
        isActive={!accordionIsActive}
        onClick={skipUnusedSelections}
      >
        SKIP UNUSED SELECTIONS
      </OptionButton>

      <OptionList
        listContent={playerList}
        isActive={accordionIsActive}
        onAccordionClick={toggleAccordion}
        onListItemClick={kickPlayer}
        activeText="KICK WHO?"
        inactiveText="KICK PLAYER"
      />
    </SettingsMenu>
  );
}

export default HostSettingsMenu;
