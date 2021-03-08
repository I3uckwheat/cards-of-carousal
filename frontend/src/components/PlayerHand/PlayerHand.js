/* to test this component, import the 'PlayerHandExample' in 'Temp' into your App.js */
import React from 'react';
import PropTypes from 'prop-types';
import WhiteCard from '../Cards/WhiteCard';
import CardWrapper from '../CardWrapper/CardWrapper';

const propType = {
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default function PlayerHand({ cards, selected, onSelect }) {
  const handleClick = (index) => {
    const newArray = [...selected]; // could also do selected.splice() to make a new copy idk if theres a preference

    if (selected.includes(index)) {
      const indexOfSelected = selected.indexOf(index); // finds index in selected[] that  that contains the clicked card
      newArray.splice(indexOfSelected, 1);

      console.log('IN selected, position:', indexOfSelected);
    } else {
      newArray.push(index);

      console.log('not in selected');
    }
    onSelect([...newArray]);
  };

  return (
    // temporary styling for testing
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {cards.map((card, cardsIndex) => {
        const badge = selected.includes(cardsIndex)
          ? selected.indexOf(cardsIndex) + 1
          : null;
        return (
          <CardWrapper
            key={card}
            onClick={() => handleClick(cardsIndex)}
            selection={badge}
          >
            <WhiteCard>{card}</WhiteCard>
          </CardWrapper>
        );
      })}
    </div>
  );
}

PlayerHand.propTypes = propType;

/**
function PlayerHand({ cards, selected, onSelect }) {
 const handleClick = (index) => {
   const newArray = selected.slice();
 
   if (selected.includes(index)) {
     const indexOfSelected = selected.indexOf(index); // finds index in selected[] that  that contains the clicked card
     newArray.splice(indexOfSelected, 1);
     //   onSelect([...newArray]);
   } else {
       onSelect([...selected, index]);
   }
   // onSelect([...selected, index]); // spreading makes a copy
   onSelect([...newArray]);
 };
*/

/* ON SELECT CALLBACK
 
- Fires the onSelect callback when a card is touched, with the indexes of the selected cards
 
- I would like the onSelect callback to be passed an array of selected card indexes
 
- I would like to be able to select, and deselect cards before submitting, so I can change my mind before committing to a decision
 
 
-A function that checks if that number is in the selected[] and if it is in the selected[] array remove it.
 
function updateSelection ([...]) {
   checks if that number is in the selected[] and if it is in the selected[] array remove it else add it
}
 
*/

/* ON SELECT CALLBACK

function updateSelection ([...]) {
    if selected[] includes index new array with it sliced/spliced, 
    else, new copy with it 
}

*/
