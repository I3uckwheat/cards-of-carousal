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
  const initialState = [{ state: 'enabled' }, { state: 'enabled' }];
  const [accordionSettings, setAccordionSettings] = useState(initialState);

  const anyAreOpen = accordionSettings.some(
    (setting) => setting.state === 'open',
  );

  function resetAccordions() {
    setAccordionSettings(initialState);
  }

  function handleAccordionClick(settingIndex) {
    if (anyAreOpen) {
      resetAccordions();
    } else {
      const newSettings = accordionSettings.map((setting, index) => {
        const state = index === settingIndex ? 'open' : 'disabled';
        return { state };
      });

      setAccordionSettings(newSettings);
    }
  }

  function onOutsideClick(event) {
    if (event.currentTarget === event.target) {
      resetAccordions();
    }
  }

  // placeholder function
  function skipUnusedSelections() {
    // eslint-disable-next-line
    console.log('skipping unused selections');
  }

  return (
    <SettingsMenu onClick={onOutsideClick}>
      <Header className="host-settings-header" onClick={resetAccordions}>
        <h3>SETTINGS</h3>
      </Header>

      <OptionButton
        isEnabled={!anyAreOpen}
        onEnabledClick={skipUnusedSelections}
        onDisabledClick={resetAccordions}
      >
        SKIP UNUSED SELECTIONS
      </OptionButton>

      <OptionList
        listContent={['BENDER', 'BRIGGS', 'BRANDON', 'BRENDA', 'BACON']}
        state={accordionSettings[0].state}
        onOptionListClick={() => handleAccordionClick(0)}
        // eslint-disable-next-line
        onListItemClick={(event, item) => console.log(item)}
        openText="KICK WHO?"
        closedText="KICK PLAYER"
      />

      <OptionList
        listContent={['FOO', 'BAR', 'BASH']}
        state={accordionSettings[1].state}
        onOptionListClick={() => handleAccordionClick(1)}
        // eslint-disable-next-line
        onListItemClick={(event, item) => console.log(item)}
        openText="BAZ"
        closedText="BAM"
      />
    </SettingsMenu>
  );
}

export default HostSettingsMenu;
