import React from 'react';
import styled from 'styled-components';
import Header from '../../Header/Header';
import Button from '../../Buttons/Button';
import Footer from '../../Footer/Footer';

const WelcomeScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: var(--primary-background-color);

  .header {
    height: 190px;
  }

  .header-text {
    position: relative;
    bottom: -122px;
  }

  .welcome-to {
    font-size: 2rem;
    line-height: 0.2rem;
    font-weight: 500;

    margin-top: 0px;
    margin-bottom: -14px;
  }

  .CoC {
    font-size: 5rem;
    line-height: 6.8rem;
    font-weight: 700;

    margin-bottom: -5px;
    vertical-align: bottom;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  .definition-container {
    display: flex;
    flex-direction: column;

    font-size: 3rem;
    font-weight: 700;
    line-height: 2rem;

    transform: rotate(-5deg);
    margin-bottom: 90px;
  }

  .definition {
    font-size: 2rem;
    font-weight: 400;
  }

  .definition-container p {
    display: inline-block;
  }

  .button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 6rem;
    font-weight: 900;

    width: 256px;
    height: 48px;

    font-size: 2.5rem;
  }

  .OR {
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--secondary-background-color);
    color: var(--secondary-text-color);

    border-radius: 50%;
    padding: 16px;

    font-size: 4rem;
    font-weight: 700;

    width: 72px;
    height: 72px;
    margin-left: 93px;
    margin-right: 93px;

    font-size: 2.25rem;
  }

  /*if less than 890px do this.... */
  @media (max-width: 820px) {
    .header-text {
      bottom: -134px;
    }

    .welcome-to {
      font-size: 1.5rem;
      line-height: 0.2rem;
    }

    .CoC {
      font-size: 4rem;
      line-height: 6rem;
    }

    .definition-container {
      font-size: 2.2rem;
      line-height: 1.8rem;

      transform: rotate(-5deg);
      margin-bottom: 90px;
    }

    .definition {
      font-size: 1.7rem;
    }

    .btn {
      font-size: 6rem;
      font-weight: 900;

      width: 200px;
      height: 48px;

      font-size: 2.5rem;
    }

    .OR {
      border-radius: 50%;
      padding: 16px;

      font-size: 4rem;

      width: 60px;
      height: 60px;
      margin-left: 70px;
      margin-right: 70px;

      font-size: 2rem;
    }
  }

  /*if less than 700px do this.... */
  @media (max-width: 700px) {
    .header {
      height: 190px;
    }

    .header-text {
      bottom: -133px;
    }
    .welcome-to {
      font-size: 1.5rem;
      line-height: 0.2rem;

      margin-top: 0px;
      margin-bottom: -14px;
    }

    .CoC {
      font-size: 4rem;
      line-height: 6rem;
      margin-bottom: -15px;
    }

    .definition-container {
      display: none;
      margin-bottom: 48px;
    }

    .btn {
      width: 224px;
    }

    .host-btn {
      display: none;
    }

    .OR {
      display: none;
    }
  }

  /*if less than 655px do this.... */
  @media (max-width: 655px) {
    .header-text {
      bottom: -86px;
    }

    .welcome-to {
      display: none;
    }

    .CoC {
      line-height: 3.5rem;
    }
  }

  /*if less than 320px do this.... */
  @media (max-width: 320px) {
    .header {
      height: 130px;
    }

    .header-text {
      bottom: -30px;
    }

    .CoC {
      font-size: 3rem;
      line-height: 3.5rem;

      margin-bottom: 12px;
    }
  }

  /*if greater than 2450px do this.... */
  @media (min-width: 2450px) {
    .header {
      height: 400px;
    }

    .header-text {
      bottom: -260px;
    }

    .welcome-to {
      font-size: 3rem;
      line-height: 3.8rem;
    }

    .CoC {
      font-size: 8rem;
      line-height: 6.5rem;
    }

    .definition-container {
      font-size: 6.5rem;
      line-height: 5.5rem;
      margin-bottom: 300px;
    }

    .definition {
      font-size: 6rem;
    }

    .OR {
      font-size: 4.5rem;

      width: 150px;
      height: 150px;
      margin-left: 120px;
      margin-right: 120px;
    }

    .btn {
      width: 600px;
      height: 150px;
      border: solid black 4px;
      font-size: 5rem;
    }
  }

  /* .header-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 400px;
  }

  .welcome-to {
    font-size: 3.5rem;
    line-height: 5rem;

    margin-top: 0px;
    margin-bottom: -14px;
  }

  .CoC {
    font-size: 9rem;
    line-height: 6.5rem;

    margin-bottom: -5px;
    vertical-align: bottom;
  }

  main {
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
    line-height: 6rem;

    transform: rotate(-5deg);
    margin-bottom: 280px;
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

  .btn {
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

    font-size: 4rem;
    font-weight: 700;
  }

  @media (max-width: 2000px) {
    .header-container {
      height: 190px;
    }

    .welcome-to {
      font-size: 2rem;
      line-height: 2rem;
      margin-bottom: -16px;
    }

    .CoC {
      font-size: 6rem;
      line-height: 6rem;
      margin-bottom: -16px;
    }

    .definition-container {
      font-size: 3.2rem;
      font-weight: 700;
      line-height: 3.3rem;
      margin-bottom: 144px;
    }

    .definition {
      font-size: 2.75rem;
    }

    .btn {
      width: 256px;
      height: 48px;

      font-size: 2.5rem;
    }

    .OR {
      width: 72px;
      height: 72px;
      margin-left: 93px;
      margin-right: 93px;

      font-size: 2.25rem;
    }
  }

  @media (max-width: 970px) {
    .definition-container {
      margin-bottom: 80px;
    }

    .CoC {
      font-size: 4rem;
      line-height: 5rem;
      margin-bottom: -21px;
    }
  }

  @media (max-width: 785px) {
    .header-container {
      height: 180px;
    }

    .CoC {
      font-size: 4rem;
      line-height: 4.5rem;
      margin-bottom: -15px;
    }

    .definition-container {
      display: none;
      margin-bottom: 48px;
    }

    .btn {
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

  @media (max-width: 320px) {
    .header-container {
      height: 130px;
    }

    .CoC {
      font-size: 3rem;
      line-height: 3.5rem;

      margin-bottom: 12px;
      vertical-align: bottom;
    }
  } */
`;

function WelcomeScreen() {
  return (
    <WelcomeScreenWrapper className="primary-background">
      <Header className="header">
        <div className="header-text">
          <p className="welcome-to">WELCOME TO</p>
          <h1 className="CoC">CARDS OF CAROUSAL</h1>
        </div>
      </Header>
      <main>
        <div className="definition-container">
          <p className="word">
            CAROUSAL <span className="definition">(n)</span>
          </p>
          <p className="definition">
            a wild, drunken party or celebration : a drunken revel
          </p>
        </div>

        <div className="button-container">
          <Button type="button" isActive className="btn">
            <p>JOIN</p>
          </Button>

          <div className="OR">OR</div>

          <Button type="button" isActive className="btn host-btn">
            <p>HOST</p>
          </Button>
        </div>
      </main>
      <Footer />
    </WelcomeScreenWrapper>
  );
}

export default WelcomeScreen;
