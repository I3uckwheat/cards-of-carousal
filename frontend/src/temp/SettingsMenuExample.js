import React from 'react';
import styled from 'styled-components';

const SettingsModal = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 25%;
  background-color: black;
  display: flex;
  flex-direction: column;

  .settings-text {
    font-size: 3rem;
    line-height: 3rem;
    margin-bottom: -0.6rem;
    color: white;
    display: flex;
    flex-direction: column-reverse;
    flex: 1;
  }

  .white-box {
    background-color: white;
    flex: 7;
  }
`;

export default function SettingsMenuExample() {
  return (
    <SettingsModal>
      <h3 className="settings-text">SETTINGS</h3>
      <div className="white-box" />
    </SettingsModal>
  );
}
