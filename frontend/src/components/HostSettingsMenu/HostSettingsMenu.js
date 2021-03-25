import React, { useState } from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';

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

function useSettingsMenuHandler(components) { 
  const initialState = components.map(() => 'enabled');
  const [accordionSettings, setAccordionSettings] = useState(initialState);

  const anyAreOpen = accordionSettings.some(
    (setting) => setting.state === 'open',
  );

  function resetAccordions() {
    setAccordionSettings(initialState);
  }

  function handleAccordionClick(settingIndex) {
    const newSettings = accordionSettings.map((setting, index) => index === settingIndex ? 'open' : 'disabled');
    setAccordionSettings(newSettings);
  }

  function makePopulatedAccordion(Accordion, index) {
    return (
      <Accordion
        key={Accordion.name}
        accordionState={accordionSettings[index]}
        onClickActions={{
          open: resetAccordions,
          enabled: () => handleAccordionClick(index),
          disabled: resetAccordions
        }}
      />
    )
  }

  function makePopulatedButton(Button) {
    return <Button
      key={Button.name}
      isEnabled={!anyAreOpen}
      onDisabledClick={resetAccordions}
    />
  }

  const hydratedComponents = components.map((Component, index) => {
    switch(Component.name) {
      case 'PlayerKicker':
        return makePopulatedAccordion(Component, index);

      case 'JoinCodeHider':
        return makePopulatedButton(Component);

      default: 
        throw new Error(`Please add ${Component.name} to HostSettingsMenu.js in the useSettingsMenuHandler`)
    }
  });

  return [
    hydratedComponents,
    resetAccordions
  ]
}

function HostSettingsMenu({settingsComponentList}) {
  const [components, resetAccordions] = useSettingsMenuHandler(settingsComponentList)

  function onOutsideClick(event) {
    if (event.currentTarget === event.target) {
      resetAccordions();
    }
  }

  return (
    <SettingsMenu onClick={onOutsideClick}>
      <Header className="host-settings-header" onClick={resetAccordions}>
        <h3>SETTINGS</h3>
      </Header>

      {components}
    </SettingsMenu>
  );
}

export default HostSettingsMenu;
