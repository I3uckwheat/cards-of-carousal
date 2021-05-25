import styled from 'styled-components';
import React from 'react';
import config from '../../../config';

const {
  largeMobile,
  smallDesktop,
  largeDesktop,
} = config.breakpoint.playerBreakpoints;

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;

  height: 50px;
  font-size: 1rem;
  font-weight: 400;

  padding-right: 10px;
  padding-bottom: 4px;

  background-color: var(--secondary-background-color);
  color: var(--secondary-text-color);

  p {
    text-align: right;
    position: relative;
    font-size: 13px;
  }

  a {
    color: var(--secondary-text-color);
    text-decoration: none;
  }

  @media (orientation: portrait) {
    height: 120px;
    background-color: transparent;
    color: var(--accent-text-color);

    p {
      text-align: center;
      padding-bottom: 32px;
    }

    a {
      color: var(--accent-text-color);
      display: block;
    }
  }

  @media (min-width: ${largeMobile}) {
    height: 90px;

    p,
    a {
      font-size: 26px;
    }
  }

  @media (min-width: ${smallDesktop}) {
    height: 110px;

    p,
    a {
      font-size: 30px;
    }
  }

  @media (min-width: ${largeDesktop}) {
    height: 122px;

    padding-right: 16px;
    padding-bottom: 2px;

    p,
    a {
      font-size: 36px;
    }
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
