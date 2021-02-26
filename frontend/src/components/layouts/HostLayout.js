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
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;

  display: flex;
  flex-direction: column;

  .hamburger-container {
    position: absolute;
    right: 17px;
    top: 11px;
    z-index: 10100;
  }

  .host-layout-header {
    display: flex;
    align-items: flex-end;
    height: 130px;
  }

  .host-layout-header h2 {
    position: relative;
    bottom: -4px;
    font-size: 2.5rem;
    line-height: 2rem;
  }

  .components {
    display: flex;
    height: 100%;
  }

  .components .left {
    display: flex;
    flex-direction: column;
    background-color: var(--primary-background-color);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  }

  .components .right {
    flex-grow: 1;
  }

  @media (min-width: 2000px) {
    .components .left {
      min-width: 500px;
    }

    .components .host-layout-header h2 {
      font-size: 3.5rem;
      margin-bottom: -35px;
      line-height: 7rem;
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

      <div className="hamburger-container">
        <HamburgerMenu
          isActive={hamburgerMenuActive}
          onClick={handleModalClick}
        />
      </div>

      <div className="components">
        <div className="left">
          <Header className="host-layout-header">
            <h2>CARDS OF CAROUSAL</h2>
          </Header>
          {left}
        </div>

        <div className="right">{right}</div>
      </div>
    </HostLayoutContainer>
  );
}

HostLayout.propTypes = propTypes;

export default HostLayout;
