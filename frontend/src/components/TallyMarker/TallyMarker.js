import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TallyMarker from './TallyGroup';

const propTypes = {
  score: PropTypes.number.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']).isRequired,
};

const Container = styled.div`
  display: flex;
`;

const Text = styled.span`
  color: ${(props) =>
    props.color === 'primary'
      ? 'var(--primary-color)'
      : 'var(--secondary-color)'};
  font-size: 24px;
  font-weight: 900;
`;

function TallyMarkers({ score, color }) {
  const displayAsText = score > 10;

  return (
    <Container>
      {displayAsText && <Text>{score}</Text>}

      {!displayAsText && score <= 5 && (
        <TallyMarker tallyCount={score} color={color} />
      )}

      {!displayAsText && score > 5 && (
        <>
          <TallyMarker tallyCount={score - 5} color={color} />
          <TallyMarker tallyCount={5} color={color} />
        </>
      )}
    </Container>
  );
}

TallyMarkers.propTypes = propTypes;

export default TallyMarkers;
