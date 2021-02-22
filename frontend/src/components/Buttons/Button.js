import styled from 'styled-components';
import { bool } from 'prop-types';

const propTypes = {
  isActive: bool.isRequired,
};

const defaultProps = {
  isActive: false,
};

/** To change the font-size or font-weight of the button's text,
 * pass in the child with it's own style (ie a styled p tag or styled component).
 * To set the width and height of the button, create a CSS class and use it. */
const Button = styled.button`
  display: block;
  border: 2px solid #000;
  font-size: 12px;
  font-weight: bold;
  padding: 0.7em;
  background: ${(props) =>
    props.isActive
      ? 'var(--primary-background-color)'
      : 'var(--secondary-background-color)'};
  color: ${(props) =>
    props.isActive
      ? '#var(--primary-text-color)'
      : 'var(--secondary-text-color)'};

  :hover,
  :active,
  :focus {
    background: var(--accent-background-color);
    cursor: pointer;
  }
`;

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
