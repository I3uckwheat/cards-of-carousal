import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  selection: PropTypes.oneOf([1, 2, 3, 'winner', null, undefined]),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  selection: null,
};

const CardWrapperStyles = styled.button`
  background: none;
  border: none;
  text-align: left;

  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;

  padding: 16px 0px;

  border-bottom: 5px solid;
  border-bottom-color: ${(props) =>
    props.underline ? 'var(--secondary-background-color)' : 'transparent'};

  .badge {
    z-index: 10;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    height: 27px;
    width: 27px;
    right: -10px;
    top: 5px;

    border-radius: 50%;

    font-size: 16px;

    background-color: var(--secondary-background-color);
    color: var(--secondary-text-color);
    font-weight: 600;

    @media (min-width: 1025px) {
      top: 0;
      right: -15px;
      height: 40px;
      width: 40px;

      font-size: 30px;
    }
  }
`;

export default function CardWrapper({
  children,
  selection,
  onClick: handleClick,
}) {
  const shouldDisplayStar = selection === 'winner';
  const badge = (
    <div className="badge">{shouldDisplayStar ? '★' : selection}</div>
  );

  return (
    <CardWrapperStyles
      onClick={handleClick}
      data-testid="card-wrapper"
      underline={selection}
    >
      {selection && badge}
      {children}
    </CardWrapperStyles>
  );
}

CardWrapper.propTypes = propTypes;
CardWrapper.defaultProps = defaultProps;
