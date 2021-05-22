import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HamburgerMenu from '../components/Buttons/HamburgerMenu/HamburgerMenu.js';
import Modal from '../components/Modal/Modal.js';
import config from '../config';

const {
  smallDesktop,
  largeDesktop,
  extraLargeDesktop,
} = config.breakpoint.hostBreakpoints;

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
    height: 50px;
  }

  .host-layout-header h2 {
    position: relative;
    bottom: -1px;
    font-size: 1rem;
    line-height: 0.8rem;
  }

  .components {
    display: flex;
    height: 100%;
  }

  .components .left {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 200px;
    background-color: var(--primary-background-color);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  }

  .components .right {
    display: flex;
    flex-grow: 1;
    position: relative;
    min-width: 440px;
  }

  @media (min-width: ${smallDesktop}) {
    .host-layout-header {
      height: 130px;
    }

    .components .left {
      min-width: 420px;
    }

    .components .host-layout-header h2 {
      font-size: 2.5rem;
      margin-bottom: -4px;
      line-height: 2rem;
    }
  }

  @media (min-width: ${largeDesktop}) {
    .components .left {
      min-width: 700px;
    }

    .components .host-layout-header h2 {
      font-size: 3.5rem;
      margin-bottom: -35px;
      line-height: 7rem;
    }
  }

  @media (min-width: ${extraLargeDesktop}) {
    .host-layout-header {
      height: 200px;
    }

    .components .left {
      min-width: 1100px;
    }

    .components .host-layout-header h2 {
      font-size: 6rem;
      margin-bottom: -25px;
      line-height: 7rem;
    }
  }
`;

const Header = styled.header`
  width: 100%;
  background-color: var(--secondary-background-color);
  color: var(--secondary-text-color);
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
