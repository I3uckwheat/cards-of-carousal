import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Button from '../Buttons/Button';
import Header from '../Header/Header';

const propTypes = {
  title: PropTypes.shape({
    top: PropTypes.string.isRequired,
    bottom: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
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
    justify-content: space-between;
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

  .button {
    text-align: center;
    padding: 0 10px 0 10px;
    height: 30px;
    width: 90px;
    margin-right: 15px;
    border: none;
  }

  .card-container {
    display: flex;
    max-width: 100%;
    margin: auto 0 auto 0;
    overflow: auto;
    padding-left: 20px;
  }

  .card-container > * {
    margin-right: 20px;
    flex-shrink: 0;
  }

  @media (min-height: 640px) {
    .header-container {
      height: 100px;
    }

    .header-txt {
      margin: 26px 70px 0px -2px;
      line-height: 2.5rem;
      font-size: 1.3rem;
    }

    .card-container {
      flex-wrap: wrap;
      justify-content: center;
      padding-top: 40px;
    }

    .card-container > * {
      margin-bottom: 40px;
    }

    .button-container {
      margin-right: 40px;
    }
  }
`;

export default function CardHandLayout({ title, children, onSubmit, onClear }) {
  return (
    <LayoutContainer>
      <Header className="header-container">
        <div className="header-txt">
          <h1>
            {title.top}
            <span>{title.bottom}</span>
          </h1>
        </div>

        <section className="button-container">
          <Button onClick={onSubmit} className="button" isActive>
            SUBMIT
          </Button>
          <Button onClick={onClear} className="button" isActive>
            CLEAR
          </Button>
        </section>
      </Header>

      <div className="card-container">{children}</div>
    </LayoutContainer>
  );
}

CardHandLayout.propTypes = propTypes;
