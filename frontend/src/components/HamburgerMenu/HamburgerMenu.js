import React, { useState } from 'react';
import PropTypes from 'prop-types';

function HamburgerMenu(props) {
  const { isActive } = props;
  const [activeStatus, setActiveStatus] = useState(isActive);

  return (
    <div className="HamburgerMenu">
      <button
        type="button"
        onClick={() => setActiveStatus(!activeStatus)}
      >
        {activeStatus ? 'X' : 'O'}
      </button>
    </div>
  );
}

HamburgerMenu.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default HamburgerMenu;
