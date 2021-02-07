import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Header = styled.header`
  width: 100%;
  background-color: black;
  color: white;
`;

Header.propTypes = propTypes;

export default Header;
