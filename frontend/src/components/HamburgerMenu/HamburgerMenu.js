import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import inactiveHamburger from './inactiveHamburger.svg';
import activeHamburger from './activeHamburger.svg';

function HamburgerMenu(props) {
  const { isActive, onClick, onInactive } = props;

  const [activeStatus, setActiveStatus] = useState(isActive);

  const HamburgerMenuButton = styled.button`
    background-image: url(${activeStatus ? activeHamburger : inactiveHamburger});
    background-size: cover;
    background-color: transparent;
    border: 0;
    width: 25.41px;
    height: 25.41px;
  `;

  return (
    <div className="HamburgerMenu">
      <HamburgerMenuButton
        onClick={() => {
          setActiveStatus(!activeStatus);
          onClick();
          if (activeStatus) { onInactive(); }
        }}
      />
    </div>
  );
}

HamburgerMenu.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onInactive: PropTypes.func.isRequired,
};

export default HamburgerMenu;
