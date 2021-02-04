import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const JoinCodeTitle = styled.p`
  font-size: 18px;
  color: var(--secondary-color);
  background-color: var(--primary-color);
  font-weight: 700;
  width: 97px;
  height: 21px; 
`;

const Code = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  font-weight: 700;
  color: var(--primary-color);
  background-color: var(--secondary-color);
  width: 305px;
  height: 70px; 
`;

// My test Stuff
function JoinCode() {
  return (
    <Wrapper>
      <JoinCodeTitle>JOIN CODE:</JoinCodeTitle>
      <Code>XYA3Z</Code>
    </Wrapper>
  );
}

export default JoinCode;
