import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import WhiteCardSVG from './assets/WhiteCard.svg';
import BlackCardSVG from './assets/BlackCard.svg';

const defaultProps = {
  small: false,
};

const propTypes = {
  small: PropTypes.bool,
};

const WhiteCard = styled.div`
  position: absolute;
  bottom: ${(props) => (props.small ? '-6px' : '4px')};
  left: ${(props) => (props.small ? '6px' : '9px')};
  width: 32px;
  height: 42px;
`;

function LayeredCards({ small }) {
  return (
    <div style={{ position: 'relative' }}>
      <WhiteCard small={small}>
        <img
          src={WhiteCardSVG}
          alt="white card"
          data-testid="layerCard"
          width={small ? '25px' : '31px'}
          height={small ? '33px' : '41px'}
        />
      </WhiteCard>
      <img
        src={BlackCardSVG}
        alt="black card"
        data-testid="layerCard"
        width={small ? '25px' : '31px'}
        height={small ? '33px' : '41px'}
      />
    </div>
  );
}

LayeredCards.defaultProps = defaultProps;

LayeredCards.propTypes = propTypes;

export default LayeredCards;
