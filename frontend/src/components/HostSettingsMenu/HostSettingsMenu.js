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
  width: 250px;
  background-color: var(--primary-background-color);
  display: flex;
  flex-direction: column;

  .host-settings-header {
    display: flex;
    align-items: flex-end;
    height: 50px;
  }

  .host-settings-header h3 {
    font-size: 1.5rem;
    line-height: 0.9rem;
    color: var(--secondary-text-color);
  }

  @media (min-width: 800px) {
    width: 400px;

    .host-settings-header {
      height: 130px;
    }

    .host-settings-header h3 {
      font-size: 3.5rem;
      line-height: 2.2rem;
    }
  }

  @media (min-width: 2000px) {
    width: 600px;

    .host-settings-header h3 {
      font-size: 5rem;
      line-height: 3rem;
    }
  }

  @media (min-width: 3500px) {
    width: 1100px;

    .host-settings-header {
      height: 200px;
    }

    .host-settings-header h3 {
      font-size: 8rem;
      line-height: 5rem;
    }
  }
`;

function HostSettingsMenu() {
  const [optionListIsOpen, setOptionListIsOpen] = useState(false);

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

  function toggleOptionList(event) {
    setOptionListIsOpen(!optionListIsOpen);
    event.stopPropagation();
  }

  return (
    <SettingsMenu onClick={() => setOptionListIsOpen(false)}>
      <Header className="host-settings-header">
        <h3>SETTINGS</h3>
      </Header>

      <OptionButton
        isEnabled={!optionListIsOpen}
        onClick={skipUnusedSelections}
      >
        SKIP UNUSED SELECTIONS
      </OptionButton>

      <OptionList
        listContent={playerList}
        isOpen={optionListIsOpen}
        onOptionListClick={toggleOptionList}
        onListItemClick={kickPlayer}
        openText="KICK WHO?"
        closedText="KICK PLAYER"
      />
    </SettingsMenu>
  );
}

export default HostSettingsMenu;
