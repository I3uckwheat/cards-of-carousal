import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import LayeredCards from './LayeredCards';

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
  function parseForMarkdown(string) {
    return string
      .replace(/\n/g, '\n\n')
      .replace(/(^|(\s))_(\s)/g, `$1${'\\_'.repeat(BLANK_LENGTH)} `)
      .replace(/(\s)_(([.,'?!:;()+-])|$)/g, ` ${'\\_'.repeat(BLANK_LENGTH)}$2`);
  }

  return (
    <StyledBlackCard>
      <Markdown options={{ wrapper: 'div' }}>{parseForMarkdown(children)}</Markdown>
      <div style={{ position: 'absolute', bottom: '18px', left: '18px' }}>
        <LayeredCards />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '7px',
          right: '19px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '24px', marginRight: '7px' }}>PICK</span>
        <Circled>{pickCount}</Circled>
      </div>
    </StyledBlackCard>
  );
}

BlackCard.propTypes = {
  pickCount: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default BlackCard;
