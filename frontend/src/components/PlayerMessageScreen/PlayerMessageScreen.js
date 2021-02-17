import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cardTrioDiagonal from '../../assets/card-trio-diagonal.svg';
import blackCardDiagonal from '../../assets/black-card-diagonal.svg';

const propTypes = {
  bigText: PropTypes.string.isRequired,
  smallText: PropTypes.string.isRequired,
};

const Background = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-size: 120% auto;
  background-repeat: no-repeat;
  background-position: -100px 77%;
`;

const TextContainer = styled.div`
  display: flex;
  position: relative;
  text-align: center;
  flex-direction: column;
  top: 26.6%;
`;

const BigText = styled.h1`
  font-weight: 900;
  /* Responsive font size */
  font-size: calc(20px + 3.5vw);
`;

const SmallText = styled.p`
  /* Responsive font size */
  font-size: calc(7px + 2vw);
`;

const FooterContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
`;

function PlayerMessageScreen({ bigText, smallText }) {
  return (
    <Background className="primary-background">
      <TextContainer>
        <BigText>{bigText && bigText.toUpperCase()}</BigText>
        <SmallText>{smallText}</SmallText>
      </TextContainer>

      <FooterContainer>
        <img
          style={{ height: '10vw' }}
          src={cardTrioDiagonal}
          alt="three stacked card icons"
        />
        <img
          style={{ marginLeft: 'auto', height: '10vw' }}
          src={blackCardDiagonal}
          alt="one black card icon"
        />
      </FooterContainer>
    </Background>
  );
}

PlayerMessageScreen.propTypes = propTypes;

export default PlayerMessageScreen;
