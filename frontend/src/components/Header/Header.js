import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Header = styled.header`
  width: 100%;
  background-color:var(--secondary-color);
  color: var(--primary-color);
`;

Header.propTypes = propTypes;

export default Header;
