import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PlayerContext } from '../../contexts/PlayerContext/PlayerContext';

import Button from '../../components/Buttons/Button';
import Header from '../../components/Header/Header';

const propTypes = {
  title: PropTypes.shape({
    top: PropTypes.string.isRequired,
    bottom: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  numberSelected: PropTypes.number.isRequired,
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

export default function CardHandLayout({
  title,
  children,
  onSubmit,
  onClear,
  numberSelected,
}) {
  const { state } = useContext(PlayerContext);

  const areAllCardsSelected = numberSelected === state.selectCardCount;

  function submitButtonText() {
    return areAllCardsSelected
      ? 'SUBMIT'
      : `${numberSelected}/${state.selectCardCount} SELECTED`;
  }

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
          <Button
            isActive={areAllCardsSelected}
            disabled={!areAllCardsSelected}
            onClick={onSubmit}
            className="button"
            data-testid="submit"
          >
            {submitButtonText()}
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
