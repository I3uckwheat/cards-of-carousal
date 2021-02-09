import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LayeredCards from './LayeredCards';

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
    padding: 17px 15px 0 15px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);

    .shadow {
        position: relative;
        overflow: hidden;
    }

    .shadow:after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        box-shadow: inset 0 -20px 10px -10px white;
        pointer-events: none;
    }

    .whiteCardText {
        max-height: 145px;
        padding-right: 17px;
        width: 108%;
        overflow-y: auto;
    }

    .whiteCardText div {
        padding-bottom: 20px;
    }

    .layeredCards {
        position: absolute;
        bottom: 0px;
        left: 7px;
        transform: scale(0.78);
    }

    @media (min-width: 1025px) {
        width: 267px;
        height: 363px;
        font-size: ${(props) => (props.shrinkFont ? '20px' : '36px')};
        line-height: 42px;
        padding: 30px 27px 0 27px;

        .whiteCardText {
            max-height: 280px;
        }
    }
`;

function WhiteCard({ children }) {
  return (
    <StyledWhiteCard shrinkFont={children.length > 75}>
      <div className="shadow">
        <div className="whiteCardText">
          <div>{children}</div>
        </div>
      </div>
      <div className="layeredCards">
        <LayeredCards />
      </div>
    </StyledWhiteCard>
  );
}

WhiteCard.propTypes = propTypes;

WhiteCard.defaultProps = defaultProps;

export default WhiteCard;
