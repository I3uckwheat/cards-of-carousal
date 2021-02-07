import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  tallyCount: PropTypes.number.isRequired,
};

const StyledPath = styled.path`
  stroke: ${(props) => (props.color === 'primary' ? 'var(--primary-color)' : 'var(--secondary-color)')};
`;

function TallyMarker({ color, tallyCount }) {
  return (
    <svg data-testid="tally-svg" width="42" height="30" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        {tallyCount >= 1 && <StyledPath color={color} d="M32.4285 3.19775V29.5701" strokeWidth="2" data-testid="tally" />}
        {tallyCount >= 2 && <StyledPath color={color} d="M25.4439 3.51099L23.2217 29.5966" strokeWidth="2" data-testid="tally" />}
        {tallyCount >= 3 && <StyledPath color={color} d="M16.5548 3.51099L14.3326 29.5966" strokeWidth="2" data-testid="tally" />}
        {tallyCount >= 4 && <StyledPath color={color} d="M7.66589 3.51099L5.44367 29.5966" strokeWidth="2" data-testid="tally" />}
        {tallyCount >= 5 && <StyledPath color={color} d="M0.916168 0.599211L40.9161 29.1692" strokeWidth="2" data-testid="tally" />}
      </g>
    </svg>
  );
}

TallyMarker.propTypes = propTypes;

export default TallyMarker;
