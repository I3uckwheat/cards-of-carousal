import styled from 'styled-components';
import React from 'react';

const FooterWrapper = styled.footer`
  margin-top: auto;
  height: 140px;
  font-size: 2rem;
  font-weight: 400;
  padding-right: 1rem;
  background-color: var(--secondary-background-color);
  color: var(--secondary-text-color);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  font-weight: 400;

  .credit-1 {
    padding: 0 1rem 0 1rem;
  }

  .credit-2 {
    padding: 0 1rem 1rem 1rem;
  }

  /*small size hosting screen */
  @media (max-width: 970px) {
    text-align: center;
    font-size: 1.5rem;
  }

  /*largest desktop player mode */
  @media (max-width: 785px) {
    align-items: center;
    justify-content: center;
    height: 120px;
    background-color: transparent;
    color: var(--accent-text-color);
    text-align: center;
    font-size: 1.2rem;
    padding-bottom: 2rem;

    .credit-1 {
      line-height: 1.5rem;
      padding: 0 20rem 1rem 20rem;
    }

    .credit-2 {
      line-height: 1.5rem;
      width: 320px;
      margin: 0 auto;
      padding-bottom: 1.75rem;
    }
  }

  /*iphone 5*/
  @media (max-width: 320px) {
    font-size: 1rem;
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <div className="credit-1">
        Card content thanks to: https://cardsagainsthumanity.com
      </div>
      <div className="credit-2">
        Made by Odin students, with love: https://www.theodinproject.com
      </div>
    </FooterWrapper>
  );
}

export default Footer;
