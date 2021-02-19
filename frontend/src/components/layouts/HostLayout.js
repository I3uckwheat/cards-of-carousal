import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HamburgerMenu from '../Buttons/HamburgerMenu/HamburgerMenu.js';
import Header from '../Header/Header.js';
import Modal from '../Modal/Modal.js';

const propTypes = {
  left: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
  modal: PropTypes.node.isRequired,
};

const HostLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .header-and-hamburger {
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  .host-layout-header {
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
  }

  .host-layout-header-text {
    font-size: 40px;
    margin-bottom: -10px;
    vertical-align: bottom;
    line-height: 44px;
  }

  .hamburger-container {
    display: flex;
    flex-direction: row-reverse;
    flex: 2;
    margin: 30px 30px -30px -30px;
  }

  .components {
    display: flex;
    flex-direction: row;
    flex: 9;
    justify-content: space-around;
    align-items: center;
  }

  .component-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: space-around;
    height: 100%;
    width: 100%;
  }

  .left {
    flex: 1;
    background-color: white;
  }

  .right {
    flex: 2;
  }
`;

function HostLayout({ left, right, modal }) {
  const [hamburgerMenuActive, setHamburgerMenuActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleModalClick() {
    setHamburgerMenuActive(!hamburgerMenuActive);
    setShowModal(!showModal);
  }

  return (
    <HostLayoutContainer className="primary-background">
      {showModal && (
        <Modal onClickOutside={() => setShowModal(!showModal)}>{modal}</Modal>
      )}
      <div className="header-and-hamburger">
        <Header className="host-layout-header">
          <h2 className="host-layout-header-text">CARDS OF CAROUSAL</h2>
        </Header>
        <div className="hamburger-container">
          <HamburgerMenu
            isActive={hamburgerMenuActive}
            onClick={handleModalClick}
          />
        </div>
      </div>
      <div className="components">
        <div className="component-container left">{left}</div>
        <div className="component-container right">{right}</div>
      </div>
    </HostLayoutContainer>
  );
}

HostLayout.propTypes = propTypes;

export default HostLayout;