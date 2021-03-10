// test by importing PlayerHandLayoutExample from temp into App.js
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../Buttons/Button';
import Header from '../Header/Header';

const propTypes = {
  title: PropTypes.string.isRequired,
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

  h1 span {
    display: block;
  }

  .card-container {
    display: flex;
    flex-direction: row;
  }
`;

export default function PlayerHandLayout({ title }) {
  // will need to add more props later just using this for lazy setup

  return (
    <LayoutContainer>
      <Header className="header-container">
        <h1>
          {title.top}
          <span>{title.bottom}</span>
        </h1>
        <Button isActive>SUBMIT</Button>
        <Button isActive>CLEAR</Button>
      </Header>
      <div className="card-container" />
    </LayoutContainer>
  );
}

PlayerHandLayout.propTypes = propTypes;
