import styled from 'styled-components';
import { bool } from 'prop-types';

const Button = styled.button`
  width: 200px;
  border: 2px solid #000;
  font-size: 19px;
  padding: .7rem;
  background: ${props => props.isActive ? '#fff' : '#333'};
  color: ${props => props.isActive ? '#000' : '#fff'};

  :hover, :active, :focus {
    background: #8C8C8C;    
    cursor: pointer;
  }
`;

Button.propTypes = {
  isActive: bool.isRequired,
};

export default Button;
