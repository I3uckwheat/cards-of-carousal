import React from 'react';
import styled from 'styled-components';

import Carousel from '../Carousel/Carousel';

const StyledPregameWelcomeText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--primary-background-color);
  align-self: center;
  margin: 24px;
  padding: 8px;
  border-radius: 5px;
  font-size: 1.8rem;
  font-weight: 700;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);

  h2 {
    line-height: 2rem;
  }

  p {
    margin: 10px;
    font-size: 1.1rem;
  }

  ol {
    margin: 10px;
  }

  li {
    margin: 0;
    font-size: 1.1rem;
  }

  .howToWin {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .snarkyText {
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
  }
`;

function Welcome() {
  return (
    <>
      <p>Cards of Carousal is your grandma&apos;s favorite online card game!</p>
      <p>
        Imagine if your indecency and crude taste in jokes was an advantage in
        life. It isn&apos;t, but in Cards of Carousal it can be!
      </p>
      <p>
        Long and short of this deal; one person (the Czar of the round) reads
        the black card on this screen. Everyone else submits a white card trying
        to be the Czar&apos;s favorite jester. More directions on the next page
        if you&apos;re still confused.
      </p>
    </>
  );
}

function Setup() {
  return (
    <>
      <h2>How to play:</h2>
      <ol>
        <li>
          All players get on a voice chat together / gather around a tv with a
          web browser if in person
        </li>
        <li>
          One player streams this screen to all the others / has this on the
          shared screen
        </li>
        <li>
          All players go to this site in a web browser, hit the join button, and
          input the &quot;JOIN CODE&quot; shown in the bottom left of this
          screen
        </li>
        <li>
          The host selects the card packs to play with, what the winning score
          should be, and sets a max player limit (if desired)
        </li>
        <li>
          Once ready to start, the host clicks the &quot;START CAROUSING&quot;
          button on this screen
        </li>
      </ol>
    </>
  );
}

function Rules1() {
  return (
    <>
      <h2>Rules:</h2>
      <p className="snarkyText">
        (if you want to follow them, I&apos;m not your dad)
      </p>
      <ol>
        <li>
          Each round 1 player is selected as the Czar, and the other players
          will be jesters
        </li>
        <li>A black card with a sentence will appear on this screen</li>
        <li>
          Jesters will each receive a hand of white cards with a unique
          word/phrase
        </li>
        <li>The Czar reads the text on the black card out loud</li>
        <li>
          Jesters submit a number of their white cards equal to the &quot;PICK
          X&quot; number on the bottom right of the black card
        </li>
      </ol>
    </>
  );
}

function Rules2() {
  return (
    <>
      <h2>Rules 2 - Eccentric Caribou: </h2>
      <ol start="6">
        <li>
          The Czar reads each submission out loud, in the context of the black
          card
        </li>
        <li>
          The Czar picks their favorite submission, the winning jester gets one
          point
        </li>
        <li>Next player becomes Czar and a new round starts</li>
        <div className="howToWin">
          <h3>The first player to reach the winning score wins!</h3>
          <p className="snarkyText">(duh)</p>
        </div>
      </ol>
    </>
  );
}

export default function PregameWelcomeText() {
  return (
    <StyledPregameWelcomeText>
      <Carousel
        slides={[<Welcome />, <Setup />, <Rules1 />, <Rules2 />]}
        interval={2000}
      />
    </StyledPregameWelcomeText>
  );
}
