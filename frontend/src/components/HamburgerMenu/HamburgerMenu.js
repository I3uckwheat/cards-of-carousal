import React, { useState } from 'react';
import PropTypes from 'prop-types';

function HamburgerMenu(props) {
  const { isActive, onClick, onInactive } = props;
  const [activeStatus, setActiveStatus] = useState(isActive);

  return (
    <div className="HamburgerMenu">
      <button
        type="button"
        onClick={() => {
          setActiveStatus(!activeStatus);
          onClick();
          if (activeStatus) { onInactive(); }
        }}
      >
        {activeStatus ? 'X' : 'O'}
      </button>
    </div>
  );
}

HamburgerMenu.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onInactive: PropTypes.func.isRequired,
};

export default HamburgerMenu;
