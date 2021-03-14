import React, { useState } from 'react';
import styled from 'styled-components';
import HostLayout from '../../layouts/HostLayout';
import PlayerList from '../../PlayerList/PlayerList';
import GameSettings from '../../GameSettings/GameSettings';
import HostSettingsMenu from '../../HostSettingsMenu/HostSettingsMenu.js';
import playerListExample from '../../../temp/playerList';

const RightPanelWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;

  .top {
    height: 60%;
  }

  .bottom {
    height: 40%;
  }
`;

function HostPregameScreen() {
  const [playerList, setPlayerList] = useState(playerListExample);

  // eslint-disable-next-line no-unused-vars
  const onChangePlayerList = (newList) => {
    setPlayerList(newList);
  };

  return (
    <HostLayout
      className="primary-background"
      left={<PlayerList playerList={playerList} />}
      right={<RightPanel />}
      modal={<HostSettingsMenu />}
    />
  );
}

function RightPanel() {
  const [options, setOptions] = useState({
    maxPlayers: 8,
    winningScore: 7,
    selectedPacks: [],
  });
  const onChangeSettings = (settings) => {
    setOptions(settings);
  };
  return (
    <RightPanelWrapper>
      <div className="top">Test top</div>
      <div className="bottom">
        <GameSettings options={options} onChange={onChangeSettings} />
      </div>
    </RightPanelWrapper>
  );
}

export default HostPregameScreen;
