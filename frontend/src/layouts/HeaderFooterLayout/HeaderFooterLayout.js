import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Footer from './Footer/Footer';

const propTypes = {
  isWelcoming: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const Header = styled.header`
  width: 100%;
  background-color: var(--secondary-background-color);
  color: var(--secondary-text-color);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 420px;

  .welcome-to {
    font-size: 66px;
    font-weight: 500;
    line-height: 100%;
    margin-bottom: -20px;
  }
  .CoC {
    font-size: 175px;
    font-weight: 700;
    line-height: 100%;
    margin-bottom: -21px;
  }

  @media (max-width: 2560px) {
    height: 300px;
    .welcome-to {
      font-size: 45px;
      margin-bottom: -19px;
    }
    .CoC {
      font-size: 120px;
      margin-bottom: -18px;
    }
  }

  @media (max-width: 2000px) {
    height: 262px;
    .welcome-to {
      font-size: 36px;
      margin-bottom: -15px;
    }
    .CoC {
      font-size: 96px;
      margin-bottom: -16px;
    }
  }

  /* @media (max-width: 1440p) {

  } */

  @media (max-width: 1439px) {
    height: 200px;
    .welcome-to {
      font-size: 28px;
      margin-bottom: -10px;
    }
    .CoC {
      font-size: 75px;
      margin-bottom: -12px;
    }
  }

  @media (max-width: 785px) {
    height: 150px;
    .welcome-to {
      font-size: 20px;
      margin-bottom: -7px;
    }
    .CoC {
      font-size: 56px;
      margin-bottom: -9px;
    }
  }

  @media (max-width: 566px) {
    .welcome-to {
      display: none;
    }
  }

  @media (max-width: 480px) {
    height: 133px;

    .CoC {
      font-size: 48px;
      margin-bottom: -7px;
    }
  }

  // Landscape mobile
  @media (max-height: 500px) {
    height: 80px;
    .welcome-to {
      display: none;
    }
    .CoC {
      font-size: 56px;
      margin-bottom: -9px;
    }
  }
`;

function HeaderFooterLayout({ isWelcoming, children }) {
  return (
    <div>
      <Header>
        {isWelcoming && <p className="welcome-to">WELCOME TO</p>}
        <h1 className="CoC">CARDS OF CAROUSAL</h1>
      </Header>
      {children}
      <Footer isWelcoming={isWelcoming} />
    </div>
  );
}

HeaderFooterLayout.propTypes = propTypes;

export default HeaderFooterLayout;
