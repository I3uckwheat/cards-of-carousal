import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  onEnabledClick: PropTypes.func.isRequired,
  onDisabledClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

const StyledOptionButton = styled.button`
  color: #dddddd;

  ${(props) =>
    props.isEnabled &&
    css`
      color: var(--primary-text-color);
      :hover {
        background-color: var(--accent-background-color);
      }
    `}

  background-color: var(--primary-background-color);
  display: flex;
  flex-direction: column;
  border: none;
  padding: 30px 0 20px 25px;

  text-align: left;
  font-size: 1rem;
  font-weight: 700;

  @media (min-width: 800px) {
    font-size: 1.5rem;
  }

  @media (min-width: 2000px) {
    font-size: 2.5rem;
  }

  @media (min-width: 3500px) {
    font-size: 4.5rem;
  }
`;

function OptionButton({
  isEnabled: optionButtonisEnabled,
  onEnabledClick: enabledClick,
  onDisabledClick: disabledClick,
  children,
}) {
  return (
    <StyledOptionButton
      isEnabled={optionButtonisEnabled}
      onClick={optionButtonisEnabled ? enabledClick : disabledClick}
    >
      {children}
    </StyledOptionButton>
  );
}

OptionButton.propTypes = propTypes;

export default OptionButton;
