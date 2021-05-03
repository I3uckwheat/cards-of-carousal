import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../../components/Buttons/Button';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout/HeaderFooterLayout';

const propTypes = {
  handleJoinClick: PropTypes.func.isRequired,
  handleHostClick: PropTypes.func.isRequired,
};

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

  .button {
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

    font-size: 2.25rem;
    font-weight: 700;

    width: 72px;
    height: 72px;
    margin-left: 93px;
    margin-right: 93px;
  }

  /*if less than 890px do this.... */
  @media (max-width: 820px) {
    .definition-container {
      font-size: 2.2rem;
      line-height: 1.8rem;

      margin-bottom: 90px;
    }

    .definition {
      font-size: 1.7rem;
    }

    .button {
      width: 200px;
      height: 48px;

      font-size: 2.5rem;
    }

    .OR {
      width: 60px;
      height: 60px;
      margin-left: 70px;
      margin-right: 70px;

      font-size: 2rem;
    }
  }

  /*if less than 700px do this.... */
  @media (max-width: 645px) {
    .definition-container {
      display: none;
    }

    .host-button {
      display: none;
    }

    .OR {
      display: none;
    }

    /*If greater than 2000px wide OR greater than 1500px tall */
    @media (min-width: 2000px), (min-height: 1500px) {
      .definition-container {
        font-size: 4.5rem;
        line-height: 3.5rem;
        margin-bottom: 250px;
      }

      .definition {
        font-size: 3.5rem;
      }

      .OR {
        font-size: 2.5rem;

        width: 100px;
        height: 100px;
        margin-left: 100px;
        margin-right: 100px;
      }

      .button {
        width: 500px;
        height: 100px;
        border: solid black 4px;
        font-size: 3rem;
      }
    }

    /*if greater than 2450px do this.... */
    @media (min-width: 2450px) {
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

      .button {
        width: 600px;
        height: 150px;
        border: solid black 4px;
        font-size: 5rem;
      }
    }
  }
`;

function WelcomeScreen({ handleJoinClick, handleHostClick }) {
  return (
    <WelcomeScreenWrapper className="primary-background">
      <HeaderFooterLayout isWelcoming>
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
            <Button
              type="button"
              isActive
              className="button"
              onClick={handleJoinClick}
            >
              <p>JOIN</p>
            </Button>

            <div className="OR">OR</div>

            <Button
              type="button"
              isActive
              className="button host-button"
              onClick={handleHostClick}
            >
              <p>HOST</p>
            </Button>
          </div>
        </main>
      </HeaderFooterLayout>
    </WelcomeScreenWrapper>
  );
}

export default WelcomeScreen;

WelcomeScreen.propTypes = propTypes;
