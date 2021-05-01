import styled from 'styled-components';
import React from 'react';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  height: 200px;
  font-size: 3.5rem;
  font-weight: 400;

  padding-right: 16px;
  padding-bottom: 10px;

  background-color: var(--secondary-background-color);
  color: var(--secondary-text-color);

  p {
    text-align: right;
    position: relative;
  }

  a {
    color: var(--secondary-text-color);
    text-decoration: none;
  }

  /*average size hosting screen*/
  @media (max-width: 2000px) {
    height: 140px;
    font-size: 2rem;
  }

  /*small size hosting screen */
  @media (max-width: 970px) {
    text-align: center;
    font-size: 1.5rem;
  }

  @media (max-height: 40vw) {
    height: 70px;
    font-size: 1.1rem;
  }

  /*largest desktop player mode */
  @media (max-width: 785px) and (min-height: 501px) {
    height: 120px;
    background-color: transparent;

    p {
      text-align: center;
      font-size: 1.2rem;

      padding-bottom: 32px;
      color: var(--accent-text-color);
    }

    a {
      color: var(--accent-text-color);
      display: block;
    }
  }

  @media (max-height: 500px) {
    height: 80px;
    p {
      font-size: 13px;
    }
  }

  /*iphone 5*/
  @media (max-width: 320px) {
    font-size: 1rem;
    padding-right: 0px;
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <p>
        Card content thanks to:{' '}
        <a href="https://cardsagainsthumanity.com">
          https://cardsagainsthumanity.com
        </a>
      </p>
      <p>
        Made by Odin students, with love:{' '}
        <a href="https://www.theodinproject.com">
          https://www.theodinproject.com
        </a>
      </p>
    </FooterWrapper>
  );
}

export default Footer;
