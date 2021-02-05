import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import inactiveHamburger from './inactiveHamburger.svg';
import activeHamburger from './activeHamburger.svg';

const propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onInactive: PropTypes.func.isRequired,
};

const HamburgerMenuButton = styled.button`
  background-image: url(${(props) => props.hamburgerImage});
  background-size: cover;
  background-color: transparent;
  border: 0;
  width: 25.41px;
  height: 25.41px;
`;

function HamburgerMenu({ isActive, onClick, onInactive }) {
  const [activeStatus, setActiveStatus] = useState(isActive);

  return (
    <div className="HamburgerMenu">
      <HamburgerMenuButton
        onClick={() => {
          setActiveStatus(!activeStatus);
          onClick();
          if (activeStatus) { onInactive(); }
        }}
        hamburgerImage={activeStatus ? activeHamburger : inactiveHamburger}
      />
    </div>
  );
}

HamburgerMenu.propTypes = propTypes;

export default HamburgerMenu;