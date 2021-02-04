import React from 'react';
import PropTypes from 'prop-types';
import TallyMarker from '../TallyMarker/TallyMarker';

import { Container, Text } from './styles';

const propTypes = {
  score: PropTypes.number.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']).isRequired,
};

function TallyMarkers({ score, color }) {
  const displayAsText = score > 10;

  return (
    <Container>
      {displayAsText && <Text>{score}</Text>}

      {!displayAsText && score <= 5 && <TallyMarker tallyCount={score} color={color} />}

      {!displayAsText && score > 5
        && (
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
