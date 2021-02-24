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

    p span {
      display: block;
    }

    a {
      color: var(--accent-text-color);
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
      <p>
        Card content thanks to:{' '}
        <span>
          <a href="https://cardsagainsthumanity.com">
            https://cardsagainsthumanity.com
          </a>
        </span>
      </p>
      <p>
        Made by Odin students, with love:{' '}
        <span>
          <a href="https://www.theodinproject.com">
            https://www.theodinproject.com
          </a>
        </span>
      </p>
    </FooterWrapper>
  );
}

export default Footer;
