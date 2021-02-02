import React from 'react';

import PropTypes from 'prop-types';

function PlayerList({ players }) {
  console.log(players);

  return (
    <div>
      <h1>hi mom</h1>
    </div>
  );
}

PlayerList.propTypes = {
  players: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      czar: PropTypes.bool.isRequired,
      submittedCards: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
  ).isRequired,
};

export default PlayerList;
