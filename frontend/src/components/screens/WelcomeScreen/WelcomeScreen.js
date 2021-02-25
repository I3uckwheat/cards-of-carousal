import React from 'react';
import styled from 'styled-components';
import Header from '../../Header/Header';
import Button from '../../Buttons/Button';
import Footer from '../../Footer/Footer';

const WelcomeScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--primary-background-color);

  /*Header*/
  .header-container {
    display: flex;
    height: 400px;
    flex-direction: column;
    justify-content: flex-end;
  }

  .welcome-to {
    font-size: 3.5rem;
    margin-top: 0px;
    line-height: 5rem;
    margin-bottom: -14px;
  }

  .CoC {
    font-size: 9rem;
    margin-bottom: -5px;
    vertical-align: bottom;
    line-height: 6.5rem;
  }

  /*Main Body*/
  .main-body-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  .definition-container {
    display: flex;
    flex-direction: column;
    font-size: 9rem;
    font-weight: 700;
    transform: rotate(-5deg);
    margin-bottom: 280px;
    line-height: 6rem;
  }

  .definition {
    font-size: 7rem;
    font-weight: 400;
  }

  .button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .join-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 700px;
    height: 180px;
    font-size: 6rem;
    font-weight: 900;
  }

  .OR {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--secondary-background-color);
    color: var(--secondary-text-color);
    border-radius: 50%;
    padding: 16px;
    width: 180px;
    height: 180px;
    margin-left: 93px;
    margin-right: 93px;
    font-size: 2.25rem;
    font-weight: 700;
  }

  @media (max-width: 2000px) {
    /*Header*/
    .header-container {
      display: flex;
      height: 190px;
      flex-direction: column;
      justify-content: flex-end;
    }

    .welcome-to {
      font-size: 2rem;
      margin-top: 0px;
      line-height: 2rem;
      margin-bottom: -16px;
    }

    .CoC {
      font-size: 6rem;
      margin-bottom: -16px;
      line-height: 6rem;
    }

    .definition-container {
      font-size: 3.2rem;
      font-weight: 700;
      transform: rotate(-5deg);
      margin-bottom: 144px;
      line-height: 3.3rem;
    }

    .definition {
      font-size: 2.75rem;
      font-weight: 400;
    }

    .join-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 256px;
      height: 48px;
      font-size: 2.5rem;
      font-weight: 900;
    }

    .OR {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--secondary-background-color);
      color: var(--secondary-text-color);
      border-radius: 50%;
      padding: 16px;
      width: 72px;
      height: 72px;
      margin-left: 93px;
      margin-right: 93px;
      font-size: 2.25rem;
      font-weight: 700;
    }
  }
  /*small size hosting screen */
  @media (max-width: 970px) {
    .definition-container {
      margin-bottom: 80px;
    }

    .CoC {
      font-size: 4rem;
      margin-bottom: -21px;
      line-height: 5rem;
    }
  }

  /*largest desktop player mode */
  @media (max-width: 785px) {
    .header-container {
      height: 180px;
    }

    .CoC {
      font-size: 4rem;
      margin-bottom: -15px;
      line-height: 4.5rem;
    }

    .definition-container {
      display: none;
      margin-bottom: 48px;
    }

    .join-btn {
      width: 224px;
    }

    .host-btn {
      display: none;
    }

    .OR {
      display: none;
    }
  }

  @media (max-width: 645px) {
    .welcome-to {
      display: none;
    }
  }

  /*iphone 5*/
  @media (max-width: 320px) {
    .header-container {
      height: 130px;
    }

    .CoC {
      font-size: 3rem;
      margin-bottom: 12px;
      vertical-align: bottom;
      line-height: 3.5rem;
    }
  }
`;

function WelcomeScreen() {
  return (
    <WelcomeScreenWrapper className="primary-background">
      <Header className="header-container">
        <h1 className="welcome-to">WELCOME TO</h1>
        <h2 className="CoC">CARDS OF CAROUSAL</h2>
      </Header>
      <main className="main-body-container">
        <div className="definition-container">
          <div className="word">
            CAROUSAL <span className="definition">(n)</span>
          </div>
          <div className="definition">
            a wild, drunken party or celebration : a drunken revel
          </div>
        </div>
        <div className="button-container">
          <Button type="button" isActive className="join-btn">
            <p> JOIN</p>
          </Button>
          <div className="OR">OR</div>
          <Button type="button" isActive className=" join-btn host-btn">
            <p>HOST</p>
          </Button>
        </div>
      </main>
      <Footer />
    </WelcomeScreenWrapper>
  );
}

export default WelcomeScreen;
