import React from 'react';
import styled from 'styled-components';
import Header from '../../Header/Header';

const WelcomeScreen = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  /*Header*/
  .header-container {
    display: flex;
    height: 25.5vh;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
  }

  .welcome-to {
    lineheight: 2rem;
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
    justify-content: center;
    align-items: center;
    height: 62.5vh;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  /*Definition*/
  .definition-container {
    display: flex;
    flex-direction: column;
  }

  .noun {
    font-style: italic;
  }

  .definition {
  }

  /*buttons*/
  .button-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .join-host-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2px var(--secondary-color);
    background-color: var(--primary-color);
    color: var(--secondary-color);
    border-radius: 2px; /*edit after*/
    height: 8vh;
    width: 22vw;
  }

  .OR {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--secondary-color);
    color: var(--primary-color);
    border-radius: 50%;
    height: 8vh;
    width: 8vh;
    margin-left: 6.4vw;
    margin-right: 6.4vw;
  }

  /*Footer*/
  .footer-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    position: relative;
    height: 12vh;
    background-color: var(--secondary-color);
    color: var(--primary-color);
  }

  .credit {
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
              CAROUSAL<span className="noun">(n)</span>
            </div>
            <div className="definition">
              a wild, drunken party or celebration : a drunken revel
            </div>
          </div>
          <div className="button-container">
            <button type="button" className="join-host-btn">
              JOIN
            </button>
            <div className="OR">OR</div>
            <button type="button" className="join-host-btn">
              HOST
            </button>
          </div>
        </div>
      </main>
      <footer className="footer-container">
        <div className="credit">
          Card content from: https://cardsagainsthumanity.com
        </div>
        <div className="credit">
          Made by Odin students: https://www.theodinproject.com
        </div>
      </footer>
    </WelcomeScreen>
  );
}

export default WelcomePage;
