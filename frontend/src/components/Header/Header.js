import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const HeaderStyles = styled.header`
  width: 100%;
`;

export default function Header({ children }) {
  return (
    <HeaderStyles>
      {children}
    </HeaderStyles>
  );
}

Header.propTypes = propTypes;
