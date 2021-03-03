import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Header = styled.header`
  width: 100%;
  background-color: var(--secondary-background-color);
  color: var(--secondary-text-color);
`;

Header.propTypes = propTypes;

export default Header;
