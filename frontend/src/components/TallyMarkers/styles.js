import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Text = styled.span`
  color: ${(props) => (props.color === 'primary' ? 'var(--primary-color)' : 'var(--secondary-color)')};
  font-size: 24px;
  font-weight: 900;
`;
