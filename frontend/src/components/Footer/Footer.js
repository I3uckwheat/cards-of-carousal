import styled from 'styled-components';
import React from 'react';

const FooterWrapper = styled.footer`
  height: 140px;
  font-size: 2rem;
  font-weight: 400;
  padding-right: 16px;
  padding-bottom: 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

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

  a:hover {
    text-decoration: underline;
  }

  /*small size hosting screen */
  @media (max-width: 970px) {
    text-align: center;
    font-size: 1.5rem;
  }

  /*largest desktop player mode */
  @media (max-width: 785px) {
    height: 120px;
    background-color: transparent;

    p {
      color: var(--accent-text-color);
      text-align: center;
      font-size: 1.2rem;
      padding-bottom: 32px;
    }

    a {
      color: var(--accent-text-color);
      display: block;
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
