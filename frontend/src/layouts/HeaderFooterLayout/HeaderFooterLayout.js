import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Footer from './Footer/Footer';
import config from '../../config';

const propTypes = {
  isWelcoming: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  isWelcoming: false,
  children: '',
};

const { largeMobile } = config.breakpoint.playerBreakpoints;

const Header = styled.header`
  width: 100%;
  background-color: var(--secondary-background-color);
  color: var(--secondary-text-color);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 80px;

  .welcome-to {
    display: none;
  }

  .CoC {
    font-size: clamp(48px, 4.5vw, 110px);
    font-weight: 700;
    line-height: 100%;
    padding-right: 5px;
    margin-bottom: -7px;
  }

  @media (min-width: 491px) {
    .welcome-to {
      display: flex;
      font-size: clamp(18px, 1.7vw, 42px);
      margin-bottom: max(-0.7vw, -10px);
      font-weight: 500;
      line-height: 100%;
    }
  }

  @media (min-width: ${largeMobile}) {
    height: min(20vh, 400px);

    .CoC {
      margin-bottom: -8px;
      margin-bottom: max(-0.8vw, -20px);
    }
  }
`;

function HeaderFooterLayout({ isWelcoming, children }) {
  return (
    <>
      <Header data-testid="header">
        {isWelcoming && (
          <p data-testid="welcome-text" className="welcome-to">
            WELCOME TO
          </p>
        )}
        <h1 className="CoC">CARDS OF CAROUSAL</h1>
      </Header>
      {children}
      <Footer isWelcoming={isWelcoming} />
    </>
  );
}

HeaderFooterLayout.propTypes = propTypes;
HeaderFooterLayout.defaultProps = defaultProps;

export default HeaderFooterLayout;
