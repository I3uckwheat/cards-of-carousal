import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Footer from './Footer/Footer';

const propTypes = {
  isWelcoming: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  isWelcoming: false,
  children: '',
};

const Header = styled.header`
  width: 100%;
  background-color: var(--secondary-background-color);
  color: var(--secondary-text-color);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: min(20vh, 400px);

  .welcome-to {
    font-size: clamp(18px, 1.7vw, 42px);
    font-weight: 500;
    line-height: 100%;
    margin-bottom: max(-0.7vw, -10px);
  }
  .CoC {
    font-size: clamp(48px, 4.5vw, 110px);
    font-weight: 700;
    line-height: 100%;
    margin-bottom: max(-0.98vw, -18px);
    padding-right: 5px;
  }

  @media (max-width: 600px) {
    .CoC {
      margin-bottom: -7px;
    }
  }

  @media (max-width: 490px), (orientation: landscape) and (max-height: 500px) {
    .welcome-to {
      display: none;
    }
  }

  @media (orientation: landscape) and (max-height: 500px) {
    height: 80px;
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
