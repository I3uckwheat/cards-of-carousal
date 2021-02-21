import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import WhiteCard from '../Cards/WhiteCard';

const propTypes = {
  select: (PropTypes.number || PropTypes.oneOf(['winner'])).isRequired,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
  border-bottom: ${(props) => (props.select ? '5px solid black' : 'none')};
  width: max-content;
`;
export default function CardWrapper({ select }) {
  return (
    <Wrapper select={select}>
      <WhiteCard />
    </Wrapper>
  );
}

CardWrapper.propTypes = propTypes;
