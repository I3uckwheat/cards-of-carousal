import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import star from '../../assets/star-1.svg';

const propTypes = {
  selection: PropTypes.oneOf([1, 2, 3, 'winner', null, undefined]).isRequired,
  children: PropTypes.node.isRequired,
};

const CardWrapperStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  padding: 1rem 0;
  border-bottom: ${(props) => (props.underline ? '5px solid black' : 'none')};
  width: max-content;
  position: relative;
  height: auto;

  .badge {
    border-radius: 50%;
    height: 27px;
    width: 27px;
    z-index: 10;
    position: absolute;
    right: -10px;
    top: 5px;
    background-color: #000;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
`;

export default function CardWrapper({ children, selection }) {
  const shouldDisplayStar = selection === 'winner';
  const badge = (
    <div className="badge">
      {shouldDisplayStar ? (
        <img src={star} alt="Star" data-testid="star" />
      ) : (
        selection
      )}
    </div>
  );

  return (
    <CardWrapperStyles data-testid="card-wrapper" underline={selection}>
      {selection && badge}
      {children}
    </CardWrapperStyles>
  );
}

CardWrapper.propTypes = propTypes;
