import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import LayeredCards from './LayeredCards';

const BLANK_LENGTH = 8;

const Card = styled.div`
  position: relative;
  width: 390px;
  height: 540px;
  background-color: black;
  color: white;
  border-radius: 18px;
  font-family: Roboto;
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
  function parseBlanks() {
    return children
      .split(' ')
      .reduce(
        (text, str) => (str === '_'
          ? `${text} ${`\\${str}`.repeat(BLANK_LENGTH)}`
          : `${text}  ${str}`),
        '',
      );
  }

  return (
    <Card>
      <Markdown>{parseBlanks(children)}</Markdown>
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
    </Card>
  );
}

BlackCard.propTypes = {
  pickCount: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default BlackCard;
