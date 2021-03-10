// test by importing PlayerHandLayoutExample from temp into App.js
import React from 'react';
import PropTypes, { string } from 'prop-types';
import styled from 'styled-components';

import Button from '../Buttons/Button';
import Header from '../Header/Header';

const propTypes = {
  title: PropTypes.objectOf(string).isRequired,
  children: PropTypes.node.isRequired,
};

const LayoutContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;

  display: flex;
  flex-direction: column;

  .header-container {
    display: flex;
    flex-direction: row;
  }
  .header-txt {
    margin: 10px 70px -10px -2px;
    line-height: 2.5rem;
  }

  h1 span {
    display: block;
  }

  .button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .btn {
    text-align: center;
    padding: 0 10px 0 10px;
    height: 30px;
    width: 90px;
    margin-right: 15px;
    border: none;
  }

  /*This will need to be edited to look right horizontally, it scrolls, but idk if flex is best */
  .card-container {
    /* display: flex;
    flex-direction: row; */
    margin-top: 20px;
    overflow: auto;
  }
  /*When it is above this size */
  @media (min-width: 640px) {
    .header-container {
      height: 100px;
    }
    .header-txt {
      margin: 26px 70px 0px -2px;
      line-height: 2.5rem;
      font-size: 1.3rem;
    }

    @media (min-width: 700px) {
      .header-txt {
        margin: 26px 120px 0px -2px;
      }
    }

    @media (min-width: 800px) {
      .header-txt {
        margin: 26px 210px 0px -2px;
      }
    }
  }
`;

export default function PlayerHandLayout({ title, children }) {
  // will need to add more props later just using this for lazy setup

  return (
    <LayoutContainer>
      <Header className="header-container">
        <div className="header-txt">
          <h1>
            {title.top}
            <span>{title.bottom}</span>
          </h1>
        </div>

        <div className="button-container">
          <Button className="btn" isActive>
            SUBMIT
          </Button>
          <Button className="btn" isActive>
            CLEAR
          </Button>
        </div>
      </Header>

      <div className="card-container">{children}</div>
    </LayoutContainer>
  );
}

PlayerHandLayout.propTypes = propTypes;
