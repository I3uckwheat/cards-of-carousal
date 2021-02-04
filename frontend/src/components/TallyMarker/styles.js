import styled from 'styled-components';

const StyledPath = styled.path`
  stroke: ${(props) => (props.color === 'primary' ? 'var(--primary-color)' : 'var(--secondary-color)')};
`;

export default StyledPath;
