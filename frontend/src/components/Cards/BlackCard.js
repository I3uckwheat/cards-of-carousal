import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import LayeredCards from './LayeredCards';

const propTypes = {
  pickCount: PropTypes.number.isRequired,
  children: PropTypes.string,
};

const defaultProps = {
  children: '',
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
      // https://regexr.com/5ltng
      // This regex finds all instances of underscores surrounded by white space
      // Then it gets replaced with a long blank line (multiple escaped underscores)
      .replace(/(^|(\s))_(\s)/g, `$1${'\\_'.repeat(blankLength)} `)
      // https://regexr.com/5ltnm
      // This regex either finds an underscore next to white space and punctuation, or an underscore
      // that is next to whitespace and is the last character in the string (represented by $)
      // Then it gets replaced with a long blank line (multiple escaped underscores)
      .replace(/(\s)_(([.,'?!:;()+-])|$)/g, ` ${'\\_'.repeat(blankLength)}$2`)
  );
}

function BlackCard({ pickCount, children }) {
  return (
    <StyledBlackCard data-testid="black-card">
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
