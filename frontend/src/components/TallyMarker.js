import React from 'react';
import PropTypes from 'prop-types';

function TallyMarker({ isCzar, tallyCount }) {
  return (
    <svg tallyCount={tallyCount} width="42" height="30" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="ScoreTally">
        {tallyCount >= 1 && <path id="tally1" d="M32.4285 3.19775V29.5701" stroke={isCzar ? 'white' : 'black'} strokeWidth="2" data-testid="tally" />}
        {tallyCount >= 2 && <path id="tally2" d="M25.4439 3.51099L23.2217 29.5966" stroke={isCzar ? 'white' : 'black'} strokeWidth="2" data-testid="tally" />}
        {tallyCount >= 3 && <path id="tally3" d="M16.5548 3.51099L14.3326 29.5966" stroke={isCzar ? 'white' : 'black'} strokeWidth="2" data-testid="tally" />}
        {tallyCount >= 4 && <path id="tally4" d="M7.66589 3.51099L5.44367 29.5966" stroke={isCzar ? 'white' : 'black'} strokeWidth="2" data-testid="tally" />}
        {tallyCount >= 5 && <path id="tally5" d="M0.916168 0.599211L40.9161 29.1692" stroke={isCzar ? 'white' : 'black'} strokeWidth="2" data-testid="tally" />}
      </g>
    </svg>
  );
}

TallyMarker.propTypes = {
  isCzar: PropTypes.bool.isRequired,
  tallyCount: PropTypes.number.isRequired,
};

export default TallyMarker;
