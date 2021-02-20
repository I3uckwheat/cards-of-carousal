import React from 'react';
import styled from 'styled-components';
import Header from '../../Header/Header';

const WelcomeScreen = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-position: center;
  background-repeat: no-repeat;

  /*Header*/
  .header-container {
    display: flex;
    height: 190px;
    flex-direction: column;
    justify-content: flex-end;
  }

  .welcome-to {
    margin-top: 0px;
    line-height: 2rem;
    margin-bottom: -0.9rem;
  }

  .CoC {
    font-size: 6rem;
    margin-bottom: -1rem;
    vertical-align: bottom;
    line-height: 6rem;
  }

  /*Main Body*/
  .main-body-container {
    display: flex;
    flex-direction: column;
    margin: auto;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .definition-container {
    display: flex;
    flex-direction: column;
    font-size: 3.2rem;
    font-weight: 700;
    transform: rotate(-5deg);
    margin-bottom: 9rem;
    line-height: 3.3rem;
  }

  .definition {
    font-size: 2.75rem;
    font-weight: 400;
  }

  .button-container {
    display: flex;
    flex-direction: row;

    align-items: center;
    font-size: 2.5rem;
    font-weight: 900;
  }

  .join-btn {
    border: solid 2px var(--secondary-color);
    background-color: var(--primary-color);
    color: var(--secondary-color);
    border-radius: 3px; /*edit after*/
    width: 16rem;
  }

  .OR {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--secondary-color);
    color: var(--primary-color);
    border-radius: 50%;
    padding: 1rem;
    width: 4.5rem;
    height: 4.5rem;
    margin-left: 5.8rem;
    margin-right: 5.8rem;
    font-size: 2.25rem;
    font-weight: 700;
  }

  /*Footer*/
  .footer-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: auto;
    height: 140px;
    background-color: var(--secondary-color);
    color: var(--primary-color);
    font-size: 2rem;
    font-weight: 400;
  }

  .credit {
    margin-top: 0.5rem;
    margin-right: 1rem;
  }

  /****** Mobile Breakpoint ******/
  /*most newer mobile phone */
  @media (max-width: 420px) {
    /*Header*/
    .header-container {
      height: 180px;
    }

    .welcome-to {
      display: none;
    }

    .CoC {
      font-size: 4rem;
      margin-bottom: -0.95rem;
      vertical-align: bottom;
      line-height: 4.5rem;
    }

    .definition-container {
      display: none;
      margin-bottom: 3rem;
    }

    .join-btn {
      width: 14rem;
    }

    .host-btn {
      display: none;
    }

    .OR {
      display: none;
    }

    /*Footer*/
    .footer-container {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 120px;
      background-color: white; /*transparent after background fix and tilt*/
      color: var(--accent-color);
      text-align: center;
      font-size: 0.9rem;
    }

    .credit {
      line-height: 1rem;
      margin: 0.5rem;
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  /*iphone 5  */
  @media (max-width: 320px) {
    /*Header*/
    .header-container {
      height: 130px;
    }

    .CoC {
      font-size: 3rem;
      margin-bottom: -0.75rem;
      vertical-align: bottom;
      line-height: 3.5rem;
    }
  }
`;

function WelcomePage() {
  return (
    <WelcomeScreen className="primary-background">
      <Header className="header-container">
        <h1 className="welcome-to">WELCOME TO</h1>
        <h2 className="CoC">CARDS OF CAROUSAL</h2>
      </Header>
      <main className="main-body-container">
        <div className="main-content">
          <div className="definition-container">
            <div className="word">
              CAROUSAL <span className="definition">(n)</span>
            </div>
            <div className="definition">
              a wild, drunken party or celebration : a drunken revel
            </div>
          </div>
          <div className="button-container">
            <button type="button" className="join-btn">
              JOIN
            </button>
            <div className="OR">OR</div>
            <button type="button" className="join-btn host-btn">
              HOST
            </button>
          </div>
        </div>
      </main>
      <footer className="footer-container">
        <div className="credit">
          Card content thanks to: https://cardsagainsthumanity.com
        </div>
        <div className="credit">
          Made by Odin students, with love: https://www.theodinproject.com
        </div>
      </footer>
    </WelcomeScreen>
  );
}

export default WelcomePage;
