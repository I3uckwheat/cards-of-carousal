import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function TallyMarker({ isCzar, tallyCount }) {
  return (
    <Svg tallyCount={tallyCount} width="42" height="30" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="ScoreTally">
        <path id="tally1" d="M7.66589 3.51099L5.44367 29.5966" stroke={isCzar ? 'white' : 'black'} strokeWidth="2" />
        <path id="tally2" d="M16.5548 3.51099L14.3326 29.5966" stroke={isCzar ? 'white' : 'black'} strokeWidth="2" />
        <path id="tally3" d="M25.4439 3.51099L23.2217 29.5966" stroke={isCzar ? 'white' : 'black'} strokeWidth="2" />
        <path id="tally4" d="M32.4285 3.19775V29.5701" stroke={isCzar ? 'white' : 'black'} strokeWidth="2" />
        <path id="tally5" d="M0.916168 0.599211L40.9161 29.1692" stroke={isCzar ? 'white' : 'black'} strokeWidth="2" />
      </g>
    </Svg>
  );
}

TallyMarker.propTypes = {
  isCzar: PropTypes.bool.isRequired,
  tallyCount: PropTypes.number.isRequired,
};

export default TallyMarker;

const Svg = styled.svg`
  #tally1 {
    opacity: ${(props) => (props.tallyCount >= 1 ? 1 : 0)};
  }

  #tally2 {
    opacity: ${(props) => (props.tallyCount >= 2 ? 1 : 0)};
  }

  #tally3 {
    opacity: ${(props) => (props.tallyCount >= 3 ? 1 : 0)};
  }

  #tally4 {
    opacity: ${(props) => (props.tallyCount >= 4 ? 1 : 0)};
  }
  
  #tally5 {
    opacity: ${(props) => (props.tallyCount === 5 ? 1 : 0)};
  }
`;
