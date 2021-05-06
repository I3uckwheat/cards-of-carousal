import styled from 'styled-components';
import React from 'react';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  height: 122px;
  font-size: 36px;
  font-weight: 400;

  padding-right: 16px;
  padding-bottom: 2px;

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

  @media (max-width: 1920px) {
    height: 110px;
    font-size: 30px;
  }

  /*average size hosting screen*/
  @media (max-width: 1440px) {
    height: 90px;
    font-size: 26px;
  }

  @media (max-width: 1300px) {
    height: 80px;
    font-size: 23px;
  }

  /*small size hosting screen */
  @media (max-width: 970px) {
    text-align: center;
    height: 70px;
    font-size: 18px;
  }

  /*largest desktop player mode */
  @media (max-width: 570px) and (min-height: 501px) {
    height: 120px;
    background-color: transparent;

    p {
      text-align: center;
      font-size: 13px;

      padding-bottom: 32px;
      color: var(--accent-text-color);
    }

    a {
      color: var(--accent-text-color);
      display: block;
    }
  }

  @media (max-height: 500px) {
    height: 50px;
    padding-bottom: 4px;
    padding-right: 10px;
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
    <FooterWrapper data-testid="footer">
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
