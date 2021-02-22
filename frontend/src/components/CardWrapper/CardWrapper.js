import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import star from '../../assets/star-1.svg';

const propTypes = {
  select: PropTypes.oneOf([1, 2, 3, 'winner', null]),
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  select: null,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  padding: 1rem 0;
  border-bottom: ${(props) => (props.select ? '5px solid black' : 'none')};
  width: max-content;
  position: relative;
  height: auto;
`;

const Circle = styled.div`
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
`;
export default function CardWrapper({ children, select }) {
  return (
    <Wrapper data-testid="card-wrapper" select={select}>
      {select && (
        <Circle>
          {typeof select === 'number' ? (
            select
          ) : (
            <img src={star} alt="Star" data-testid="star" />
          )}
        </Circle>
      )}
      {children}
    </Wrapper>
  );
}

CardWrapper.propTypes = propTypes;
CardWrapper.defaultProps = defaultProps;
