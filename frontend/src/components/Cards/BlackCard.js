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
  background-color: black;
  color: white;
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
  color: black;
  background: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 14px;
`;

function BlackCard({ pickCount, children }) {
  // 1. Makes sure newlines are doubled for markdown
  // 2. Escapes and increases number of underscores displayed for each blank in the text
  function parseForMarkdown(string, blankLength) {
    return string
      .replace(/\n/g, '\n\n')
      .replace(/(^|(\s))_(\s)/g, `$1${'\\_'.repeat(blankLength)} `)
      .replace(/(\s)_(([.,'?!:;()+-])|$)/g, ` ${'\\_'.repeat(blankLength)}$2`);
  }

  return (
    <StyledBlackCard data-testid="black-card">
      <Markdown options={{ wrapper: 'div' }}>{parseForMarkdown(children, BLANK_LENGTH)}</Markdown>
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