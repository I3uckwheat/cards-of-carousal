import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const propTypes = {
  listContent: PropTypes.arrayOf(PropTypes.string).isRequired,
  isActive: PropTypes.bool.isRequired,
  onAccordionClick: PropTypes.func.isRequired,
  onListItemClick: PropTypes.func.isRequired,
  activeText: PropTypes.string.isRequired,
  inactiveText: PropTypes.string.isRequired,
};

const OptionListButton = styled.button`
  color: var(--primary-text-color);
  background-color: var(--primary-background-color);

  ${(props) =>
    props.isActive &&
    css`
      color: var(--secondary-text-color);
      background-color: var(--secondary-background-color);
    `}

  display: flex;
  flex-direction: column;
  border: none;
  padding: 20px 25px;
  width: 100%;

  text-align: left;
  font-size: 1.5rem;
  font-weight: 700;
`;

const OptionListItemButton = styled(OptionListButton)`
  font-size: 1.3rem;
  padding: 10px 50px;
`;

function OptionList({
  listContent,
  isActive: optionListIsActive,
  onAccordionClick: onOptionListClick,
  onListItemClick,
  activeText,
  inactiveText,
}) {
  return (
    <div>
      <OptionListButton
        type="button"
        onClick={onOptionListClick}
        isActive={optionListIsActive}
      >
        {optionListIsActive ? activeText : inactiveText}
      </OptionListButton>
      {optionListIsActive &&
        listContent.map((listItem) => (
          <OptionListItemButton
            type="button"
            key={listItem}
            onClick={(event) => onListItemClick(event, listItem)}
          >
            {listItem}
          </OptionListItemButton>
        ))}
    </div>
  );
}

OptionList.propTypes = propTypes;

export default OptionList;
