import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TallyGroup from './TallyGroup';

const propTypes = {
  score: PropTypes.number.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  faded: PropTypes.bool.isRequired,
};

const Container = styled.div`
  display: flex;
`;

const Text = styled.span`
  color: ${(props) => {
    if (props.faded) {
      return 'var(--accent-text-color)';
    }
    return props.color === 'primary'
      ? 'var(--primary-text-color)'
      : 'var(--secondary-text-color)';
  }};
  font-size: 24px;
  font-weight: 900;
`;

function TallyCount({ score, color, faded }) {
  const displayAsText = score > 10;

  return (
    <Container>
      {displayAsText && <Text faded={faded}>{score}</Text>}

      {!displayAsText && score <= 5 && (
        <TallyGroup tallyCount={score} color={color} faded={faded} />
      )}

      {!displayAsText && score > 5 && (
        <>
          <TallyGroup tallyCount={5} color={color} faded={faded} />
          <TallyGroup tallyCount={score - 5} color={color} faded={faded} />
        </>
      )}
    </Container>
  );
}

TallyCount.propTypes = propTypes;

export default TallyCount;
