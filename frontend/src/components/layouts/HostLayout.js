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
    min-width: 167px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  }

  .host-layout-header-text {
    vertical-align: bottom;
    font-size: 7rem;
    margin-bottom: -1.3rem;
    line-height: 7rem;
  }

  .hamburger-container {
    display: flex;
    flex-direction: row-reverse;
    flex: 2;
    margin: 30px 30px -30px -30px;
    z-index: 10100;
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
    background-color: var(--primary-background-color);
    min-width: 167px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  }

  .right {
    flex: 2;
  }

  @media (max-width: 3400px) {
    .host-layout-header-text {
      font-size: 6rem;
      margin-bottom: -1.1rem;
      line-height: 6rem;
    }
  }

  @media (max-width: 3000px) {
    .host-layout-header-text {
      font-size: 5rem;
      margin-bottom: -1rem;
      line-height: 5rem;
    }
  }

  @media (max-width: 2500px) {
    .host-layout-header-text {
      font-size: 4rem;
      margin-bottom: -1rem;
      line-height: 4rem;
    }
  }

  @media (max-width: 2000px) {
    .host-layout-header-text {
      font-size: 3rem;
      margin-bottom: -0.7rem;
      line-height: 3rem;
    }
  }

  @media (max-width: 1500px) {
    .host-layout-header-text {
      font-size: 2rem;
      margin-bottom: -0.35rem;
      line-height: 2rem;
    }
  }

  @media (max-width: 600px) {
    .host-layout-header-text {
      font-size: 1.5rem;
      margin-bottom: -5px;
      line-height: 1.5rem;
    }
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
      {showModal && <Modal onClickOutside={handleModalClick}>{modal}</Modal>}
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
