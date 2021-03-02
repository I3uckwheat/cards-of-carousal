/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import WhiteCard from '../Cards/WhiteCard';
import CardWrapper from '../CardWrapper/CardWrapper';

const propType = {
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.number).isRequired,
  //   onSelect: PropTypes.func.isRequired,
};

export default function PlayerHand({ cards, selected }) {
  return (
    <div // temporary horizontal styling
      style={{
        display: 'flex',
        width: '90%',
        height: '100vh',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {cards.map((card, index) => {
        const selectedCardIndex = cards.indexOf(card);
        const badge = selected.includes(selectedCardIndex)
          ? selected.indexOf(selectedCardIndex) + 1
          : null;
        return (
          <CardWrapper selection={badge}>
            <WhiteCard key={index}>{card}</WhiteCard>
          </CardWrapper>
        );
      })}
    </div>
  );
}

PlayerHand.propTypes = propType;

/* GOALS

-select/deselect white cards
-receive a list of cards 
-notify wrapper of any changes in card selection
-display white cards selected by using wrapper
- cards bump down, if 2 are selected and 1 is unselected, 2 becomes 1 

<PlayerHand cards={[Cards]} selected={[Indexes]} onSelect={Function} />

[Cards] = ["Card One", "Card Two", "Card Three"]

SelectedCards = [2, 4] // Where 2, and 4 are indexes of selected cards
----------

nd then, if it is selected, updated that wrapper selection value

-------PLAN------

function PlayerHand({ cards, selected, onSelect }){  //do I need other props here?

    //Array.map to apply <CardWrapper selection={null}/> to all white cards    

    //function for onSelect, adds or removes picked card from SelectedCards[] and updates that cards cardWrapper selection value
        - If clicked push to SelectedCards[], <CardWrapper selection={index+1} />  
        - if card is already in selectedCards[] and it is selected, remove from array <CardWrapper selection={null} />  

    return(
            //cards with their appropriate wrappers
    )
}

*/
