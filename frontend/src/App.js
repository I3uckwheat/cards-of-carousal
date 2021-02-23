import React, { useState } from 'react';

import './reset.css';
import './App.css';

import Header from './components/Header/Header';
import Button from './components/Buttons/Button';
import HamburgerMenu from './components/Buttons/HamburgerMenu/HamburgerMenu';
import SocketTest from './components/SocketTest';
import PlayerList from './components/PlayerList/PlayerList';
import DisplayJoinCode from './components/JoinCode/JoinCode';
import BlackCardExample from './temp/BlackCardExample';
import WhiteCardExample from './temp/WhiteCardExample';

import Modal from './components/Modal/Modal';
import playerList from './temp/playerList';
import ModalExample from './temp/ModalExample';
import SingleBlackCardExample from './temp/SingleBlackCardExample.js';
import PlayerMessageScreen from './components/screens/PlayerMessageScreen/PlayerMessageScreen';
import HostLayout from './components/layouts/HostLayout';
import SettingsMenuExample from './temp/SettingsMenuExample';

function App() {
  const [showSocketTest, setShowSocketTest] = useState(false);
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [showHamburgerMenu, setHamburgerMenu] = useState(false);
  const [hamburgerMenuActive, setHamburgerMenuActive] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showJoinCode, setJoinCode] = useState(false);
  const [showBlackCards, setShowBlackCards] = useState(false);
  const [showWhiteCards, setShowWhiteCards] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPlayerMessageScreen, setShowPlayerMessageScreen] = useState(false);
  const [showHostLayout, setShowHostLayout] = useState(false);

  return (
    <div className="App primary-background">
      {!showHostLayout && (
        <div className="buttons-grid">
          <button
            type="button"
            onClick={() => {
              setShowSocketTest(!showSocketTest);
            }}
          >
            Show SocketTest
          </button>

          <button
            type="button"
            onClick={() => {
              setShowPlayerList(!showPlayerList);
            }}
          >
            Show PlayerList
          </button>

          <button
            type="button"
            onClick={() => {
              setHamburgerMenu(!showHamburgerMenu);
            }}
          >
            Show HamburgerMenu
          </button>
          <Button isActive>
            <p style={{ fontSize: '20px' }}>Click me!</p>
          </Button>
          <Button>
            <p style={{ fontSize: '25px' }}>Do not click me!</p>
          </Button>
          <Button onClick={() => setShowHeader(!showHeader)}>
            Show Header
          </Button>

          <button
            type="button"
            onClick={() => {
              setJoinCode(!showJoinCode);
            }}
          >
            Show JoinCode
          </button>

          <Button
            type="button"
            onClick={() => {
              setShowBlackCards(!showBlackCards);
            }}
          >
            Show Black Cards
          </Button>

          <Button
            isActive
            type="button"
            onClick={() => {
              setShowWhiteCards(!showWhiteCards);
            }}
          >
            Show White Cards
          </Button>
          <Button type="button" onClick={() => setShowModal(!showModal)}>
            Show Modal
          </Button>
          <Button
            type="button"
            onClick={() => setShowPlayerMessageScreen(!showPlayerMessageScreen)}
          >
            Show Player Message Screen
          </Button>

          <button
            type="button"
            onClick={() => {
              setShowHostLayout(!showHostLayout);
            }}
          >
            show host layout
          </button>
        </div>
      )}

      {showHeader && (
        <Header className="header">
          <div
            style={{
              display: 'flex',
              height: '100%',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
            }}
          >
            <h1 style={{ lineHeight: '2rem', marginBottom: '-.9rem' }}>
              WELCOME TO
            </h1>
            <h2
              style={{
                fontSize: '6rem',
                marginBottom: '-1rem',
                verticalAlign: 'bottom',
                lineHeight: '6rem',
              }}
            >
              CARDS OF CAROUSAL
            </h2>
          </div>
        </Header>
      )}

      {showSocketTest && <SocketTest />}

      {showPlayerList && <PlayerList playerList={playerList} />}

      {showJoinCode && <DisplayJoinCode code="XYA3Z" />}

      {showHamburgerMenu && (
        <div style={{ backgroundColor: 'grey' }}>
          <HamburgerMenu
            isActive={hamburgerMenuActive}
            onClick={() => {
              setHamburgerMenuActive(!hamburgerMenuActive);
              // eslint-disable-next-line no-console
              console.log('hamburger menu clicked');
            }}
          />
        </div>
      )}

      {showBlackCards && <BlackCardExample />}

      {showWhiteCards && <WhiteCardExample />}
      {showBlackCards && <BlackCardExample />}

      {showModal && (
        <Modal onClickOutside={() => setShowModal(!showModal)}>
          <ModalExample toggleModal={() => setShowModal(!showModal)} />
        </Modal>
      )}

      {showPlayerMessageScreen && (
        <PlayerMessageScreen
          bigText="you've joined the lobby"
          smallText="Please wait for the host to start the game."
        />
      )}

      {showHostLayout && (
        <HostLayout
          left={
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <PlayerList playerList={playerList} />
              <button
                style={{
                  width: '60%',
                  height: '10%',
                }}
                type="button"
                onClick={() => {
                  setShowHostLayout(!showHostLayout);
                }}
              >
                hide host layout
              </button>
              <DisplayJoinCode code="XYA3Z" />
            </div>
          }
          right={<SingleBlackCardExample />}
          modal={<SettingsMenuExample />}
        />
      )}
    </div>
  );
}

export default App;
