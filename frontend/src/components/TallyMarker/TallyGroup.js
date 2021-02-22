import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  tallyCount: PropTypes.number.isRequired,
};

const StyledPath = styled.path`
  stroke: ${(props) =>
    props.color === 'primary'
      ? 'var(--primary-text-color)'
      : 'var(--secondary-text-color)'};
`;

const tallyPaths = [
  'M32.4285 3.19775V29.5701',
  'M25.4439 3.51099L23.2217 29.5966',
  'M16.5548 3.51099L14.3326 29.5966',
  'M7.66589 3.51099L5.44367 29.5966',
  'M0.916168 0.599211L40.9161 29.1692',
];

function TallyGroup({ color, tallyCount }) {
  return (
    <svg
      data-testid="tally-svg"
      width="42"
      height="30"
      viewBox="0 0 42 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {tallyPaths.slice(0, tallyCount).map((tallyPath) => (
          <StyledPath
            key={tallyPath}
            color={color}
            d={tallyPath}
            strokeWidth="2"
            data-testid="tally"
          />
        ))}
      </g>
    </svg>
  );
}

TallyGroup.propTypes = propTypes;

export default TallyGroup;
