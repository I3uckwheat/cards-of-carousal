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

    font-size: 5.2rem;
    font-weight: 700;
    line-height: 4.2rem;

    transform: rotate(-5deg);
    margin-bottom: 190px;
  }

  .definition {
    font-size: 4rem;
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

    width: 317px;
    height: 82px;

    font-size: 3.6rem;
  }

  .OR {
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--secondary-background-color);
    color: var(--secondary-text-color);

    border-radius: 50%;
    padding: 16px;

    font-size: 2.3rem;
    font-weight: 700;

    width: 82px;
    height: 82px;
    margin-left: 93px;
    margin-right: 93px;
  }

  @media (max-width: 1920px) {
    .definition-container {
      font-size: 4.5rem;
      line-height: 3.7rem;

      margin-bottom: 150px;
    }

    .definition {
      font-size: 3.5rem;
    }

    .button {
      width: 290px;
      height: 74px;

      font-size: 3.2rem;
    }

    .OR {
      width: 74px;
      height: 74px;
      margin-left: 93px;
      margin-right: 93px;

      font-size: 2rem;
    }
  }

  @media (max-width: 1440px) {
    .definition-container {
      font-size: 3.2rem;
      line-height: 2.6rem;

      margin-bottom: 90px;
    }

    .definition {
      font-size: 2.5rem;
    }

    .button {
      width: 256px;
      height: 66px;

      font-size: 2.5rem;
    }

    .OR {
      width: 66px;
      height: 66px;
      margin-left: 93px;
      margin-right: 93px;

      font-size: 1.8rem;
    }
  }

  @media (max-width: 950px) {
    .definition-container {
      font-size: 2.4rem;
      line-height: 1.8rem;
    }

    .definition {
      font-size: 1.85rem;
    }

    .button {
      width: 200px;
      height: 51px;

      font-size: 2rem;
    }

    .OR {
      width: 51px;
      height: 51px;
      margin-left: 70px;
      margin-right: 70px;

      font-size: 1.4rem;
    }
  }

  /*if less than 700px, or on mobile landscape, do this.... */
  @media (max-width: 700px), (max-width: 900px) and (max-height: 500px) {
    .definition-container {
      display: none;
    }

    .host-button {
      display: none;
    }

    .OR {
      display: none;
    }
  }

  /* Screens above 1440p */
  @media (min-width: 2561px) {
    .definition-container {
      font-size: 6.5rem;
      line-height: 4.8rem;

      margin-bottom: 300px;
    }

    .definition {
      font-size: 5rem;
    }

    .button {
      width: 490px;
      height: 126px;

      font-size: 5.2rem;
    }

    .OR {
      width: 126px;
      height: 126px;
      margin-left: 93px;
      margin-right: 93px;

      font-size: 3.8rem;
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
