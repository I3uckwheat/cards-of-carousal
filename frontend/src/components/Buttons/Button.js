import styled, { css } from 'styled-components';
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
  border: 2px solid var(--primary-text-color);
  font-size: 12px;
  font-weight: bold;
  padding: 0.7em;
  background: var(--secondary-background-color);
  color: var(--secondary-text-color);
  ${props => props.isActive && css`
    background: var(--primary-background-color);
    color: var(--primary-text-color);
  `}

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
