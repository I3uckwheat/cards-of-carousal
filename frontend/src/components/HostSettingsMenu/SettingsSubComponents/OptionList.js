import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const propTypes = {
  listContent: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  state: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  openText: PropTypes.string.isRequired,
  closedText: PropTypes.string.isRequired,
};

const OptionListButton = styled.button`
  color: var(--primary-text-color);
  background-color: var(--primary-background-color);

  ${(props) =>
    props.state === 'open' &&
    css`
      color: var(--secondary-text-color);
      background-color: var(--secondary-background-color);
    `}

  ${(props) =>
    props.state === 'disabled' &&
    css`
      color: #dddddd;
      :hover {
        background-color: var(--primary-background-color);
      }
    `}

  display: flex;
  flex-direction: column;
  border: none;
  padding: 20px 25px;
  width: 100%;

  text-align: left;
  font-size: 1rem;
  font-weight: 700;

  cursor: pointer;

  :hover {
    background-color: var(--accent-background-color);
  }

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

const OptionListItemButton = styled(OptionListButton)`
  font-size: 0.8rem;
  padding: 10px 50px;

  @media (min-width: 800px) {
    font-size: 1.3rem;
  }

  @media (min-width: 2000px) {
    font-size: 2.1rem;
  }

  @media (min-width: 3500px) {
    font-size: 4rem;
  }
`;

function OptionList({
  listContent,
  state,
  onClick: handleClick,
  onItemClick,
  openText,
  closedText,
}) {
  return (
    <div>
      <OptionListButton type="button" onClick={handleClick} state={state}>
        {state === 'open' ? openText : closedText}
      </OptionListButton>
      {state === 'open' &&
        listContent.map(({ text, value }) => (
          <OptionListItemButton
            type="button"
            key={text + value}
            onClick={() => onItemClick(value)}
          >
            {text}
          </OptionListItemButton>
        ))}
    </div>
  );
}

OptionList.propTypes = propTypes;

export default OptionList;
