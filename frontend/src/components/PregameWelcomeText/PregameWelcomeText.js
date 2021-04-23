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

function Rules() {
  return (
    <>
      <h2>Rules:</h2>
      <p className="snarkyText">
        (if you want to follow them, I&apos;m not your dad)
      </p>
      <ol>
        <li>
          Each turn one player will be the &quot;Czar&quot; and read the black
          card (on this screen) out loud.
        </li>
        <li>
          Everyone else submits their white card that fills the blank or answers
          the black card in (what they think is, but probably isn&apos;t) the
          funniest way. The number of cards submitted by each player must match
          the &quot;PICK X&quot; number in the bottom right of the black card.
        </li>
        <li>
          The Czar reads all of the submissions (black card + white card
          together each time) out loud and picks the card they think is the
          best; whoever submitted it gets one point.
        </li>
        <li>
          Another player then becomes the new Czar and the process starts over.
        </li>
      </ol>
      <div className="howToWin">
        <h3>The first player to reach the winning score wins!</h3>
        <p className="snarkyText">(duh)</p>
      </div>
    </>
  );
}

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

export default function PregameWelcomeText() {
  return (
    <StyledPregameWelcomeText>
      <Carousel slides={[<Welcome />, <Rules />]} speed={2000} />
    </StyledPregameWelcomeText>
  );
}
