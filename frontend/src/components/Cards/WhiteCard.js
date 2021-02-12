import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import StackedCards from '../../assets/cards-stack-offset-light-icon.svg';

const propTypes = {
  children: PropTypes.string,
};

const defaultProps = {
  children: '',
};

const StyledWhiteCard = styled.div`
    position: relative;
    border: 1px solid black;
    width: 148px;
    height: 206px;
    background-color: white;
    color: black;
    border-radius: 7px;
    font-weight: 500;
    font-size: ${(props) => (props.shrinkFont ? '11px' : '18px')};
    overflow-wrap: break-word;
    line-height: 21px;
    padding: ${(props) => (props.shrinkFont ? '17px 3px 5px 15px' : '17px 15px 0 15px')};
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);

    .whiteCardText {
        max-height: ${(props) => (props.shrinkFont ? '100%' : '150px')};
        padding-right: ${(props) => (props.shrinkFont ? '15px' : '0')};
        overflow-y: auto;
    }

    .whiteCardText div {
        padding-bottom: 20px;
    }

    .stackedCards {
        position: absolute;
        bottom: 7px;
        left: 11px;
        width: 32px;
    }

    @media (min-width: 1025px) {
        width: 267px;
        height: 363px;
        font-size: ${(props) => (props.shrinkFont ? '20px' : '36px')};
        line-height: 42px;
        padding: ${(props) => (props.shrinkFont ? '30px 10px 15px 27px' : '30px 27px 0 27px')};

        .whiteCardText {
          max-height: ${(props) => (props.shrinkFont ? '100%' : '280px')};
          padding-right: ${(props) => (props.shrinkFont ? '15px' : '0')};
        }

        .stackedCards {
          width: auto;
        }
    }
`;

function WhiteCard({ children }) {
  return (
    <StyledWhiteCard shrinkFont={children.length > 75} data-testid="white-card">
      <div className="whiteCardText">
        <div>{children}</div>
      </div>
      {!(children.length > 75) && (
      <div className="stackedCards" data-testid="stacked-cards">
        <img src={StackedCards} alt="stacked cards" />
      </div>
      )}
    </StyledWhiteCard>
  );
}

WhiteCard.propTypes = propTypes;

WhiteCard.defaultProps = defaultProps;

export default WhiteCard;
