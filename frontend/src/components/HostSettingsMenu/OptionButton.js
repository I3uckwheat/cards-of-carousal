import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

const StyledOptionButton = styled.button`
  color: #dddddd;

  ${(props) =>
    props.isActive &&
    css`
      color: var(--primary-text-color);
    `}

  background-color: var(--primary-background-color);
  display: flex;
  flex-direction: column;
  border: none;
  padding: 30px 0 20px 25px;

  text-align: left;
  font-size: 1.5rem;
  font-weight: 700;
`;

function OptionButton({
  isActive: optionButtonIsActive,
  onClick: optionClick,
  children,
}) {
  return (
    <StyledOptionButton
      isActive={optionButtonIsActive}
      onClick={optionButtonIsActive ? optionClick : undefined}
    >
      {children}
    </StyledOptionButton>
  );
}

OptionButton.propTypes = propTypes;

export default OptionButton;
