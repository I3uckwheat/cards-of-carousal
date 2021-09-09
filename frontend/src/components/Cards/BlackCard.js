import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import LayeredCards from './LayeredCards';

const propTypes = {
  pickCount: PropTypes.number.isRequired,
  children: PropTypes.string,
  winnerScreen: PropTypes.bool,
};

const defaultProps = {
  children: '',
  winnerScreen: false,
};

const BLANK_LENGTH = 8;

const StyledBlackCard = styled.div`
  position: relative;
  width: 390px;
  height: 540px;
  background-color: var(--secondary-background-color);
  color: var(--secondary-text-color);
  border-radius: 18px;
  font-weight: 700;
  font-size: 36px;
  padding: 45px 21px 0 21px;
  box-shadow: 4px 4px 24px rgba(0, 0, 0, 0.3);

  ${(props) =>
    props.winnerDisplay &&
    css`
      width: 276px;
      height: 363px;
      font-size: 24px;
    `}

  .pickText {
    font-size: 24px;
    margin-right: 7px;
  }

  .layeredCards {
    position: absolute;
    bottom: 18px;
    left: 18px;
  }

  .pickCount {
    position: absolute;
    bottom: 8px;
    right: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Circled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary-text-color);
  background: var(--primary-background-color);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 14px;
`;

function parseForMarkdown(string, blankLength) {
  return (
    string
      // https://regexr.com/5ltnd
      // This regex finds all instances of the newline character \n
      // Then it gets replaced with the markdown equivalent \n\n
      .replace(/\n/g, '\n\n')

      // https://regexr.com/5td92
      // These regex find all underscores used for markdown purposes
      // Then it replaces them with their asterisk variant
      .replace(/(___)([^\s_]+)(___)/g, `***$2***`)
      .replace(/(__)([^\s_]+)(__)/g, `**$2**`)
      .replace(/(_)([^\s_]+)(_)/g, `*$2*`)

      // https://regexr.com/5ltng
      // This regex finds all remaining instances of underscores
      // Then it gets replaced with a long blank line (multiple escaped underscores)
      .replace(/_/g, `${'\\_'.repeat(blankLength)}`)
  );
}

function BlackCard({ pickCount, children, winnerScreen }) {
  return (
    <StyledBlackCard data-testid="black-card" winnerDisplay={winnerScreen}>
      <Markdown options={{ wrapper: 'div' }}>
        {parseForMarkdown(children, BLANK_LENGTH)}
      </Markdown>
      <div className="layeredCards">
        <LayeredCards />
      </div>
      <div className="pickCount">
        <span className="pickText">PICK</span>
        <Circled>{pickCount}</Circled>
      </div>
    </StyledBlackCard>
  );
}

BlackCard.propTypes = propTypes;

BlackCard.defaultProps = defaultProps;

export default BlackCard;
