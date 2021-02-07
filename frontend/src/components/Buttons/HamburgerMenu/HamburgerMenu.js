import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import inactiveHamburger from './inactiveHamburger.svg';
import activeHamburger from './activeHamburger.svg';

const propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const HamburgerMenuButton = styled.button`
  background-image: url(${(props) => props.hamburgerImage});
  background-size: cover;
  background-color: transparent;
  border: 0;
  width: 25.41px;
  height: 25.41px;
`;

function HamburgerMenu({ isActive, onClick: handleClick }) {
  return (
    <HamburgerMenuButton
      onClick={handleClick}
      hamburgerImage={isActive ? activeHamburger : inactiveHamburger}
    />
  );
}

HamburgerMenu.propTypes = propTypes;

export default HamburgerMenu;
